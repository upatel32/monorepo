/**
 * Server-side resume source with a stale-while-revalidate cache.
 *
 *   fresh (< FRESH_MS old)  → served from memory, no request to GitHub
 *   stale                   → served from memory immediately, refreshed in the background
 *   nothing cached yet      → fetched before rendering
 *   GitHub down / invalid   → last good copy, else the snapshot taken at build time
 *
 * The cache is per Worker isolate, so each isolate fetches at most once per FRESH_MS.
 * An invalid edit to the gist never reaches the page: it's logged and the last good copy stays up.
 */
import { env, waitUntil } from 'cloudflare:workers';
import { fetchResume, ResumeFetchError } from '#lib/resume/fetch.ts';
import type { Resume } from '#lib/resume/types.ts';
import snapshot from '#lib/resume/snapshot.json';

/** How long a fetched copy counts as fresh. Edits to the gist show up within about this long. */
const FRESH_MS = 60_000;

export type ResumeStatus = 'live' | 'cached' | 'stale' | 'snapshot';

export interface ResumeResult {
	resume: Resume;
	status: ResumeStatus;
	/** When this copy was fetched from GitHub (ISO string), or when the snapshot was taken. */
	fetchedAt: string;
}

interface Entry {
	resume: Resume;
	fetchedAt: number;
}

let cached: Entry | undefined;
let inflight: Promise<Entry> | undefined;

function token(): string | undefined {
	// Optional secret: `wrangler secret put GITHUB_TOKEN` in production, `.dev.vars` locally.
	return (env as { GITHUB_TOKEN?: string } | undefined)?.GITHUB_TOKEN || undefined;
}

/** One fetch at a time per isolate, however many requests arrive while it's running. */
function refresh(fetch: typeof globalThis.fetch): Promise<Entry> {
	inflight ??= fetchResume({ token: token(), fetch })
		.then(({ resume }) => (cached = { resume, fetchedAt: Date.now() }))
		.catch((err: unknown) => {
			const issues = err instanceof ResumeFetchError && err.issues;
			console.error(`[resume] refresh failed: ${(err as Error).message}`, issues || '');
			throw err;
		})
		.finally(() => (inflight = undefined));
	return inflight;
}

function fromSnapshot(): ResumeResult {
	const { resume, fetchedAt } = snapshot as unknown as { resume: Resume; fetchedAt: string };
	return { resume, status: 'snapshot', fetchedAt };
}

/** @param fetch pass SvelteKit's `fetch` from the load event */
export async function getResume(fetch: typeof globalThis.fetch): Promise<ResumeResult> {
	const now = Date.now();

	if (cached && now - cached.fetchedAt < FRESH_MS) {
		return { ...toResult(cached), status: 'cached' };
	}

	if (cached) {
		// Serve what we have now; swap in the new copy for the next request.
		waitUntil(refresh(fetch).catch(() => {}));
		return { ...toResult(cached), status: 'stale' };
	}

	try {
		return { ...toResult(await refresh(fetch)), status: 'live' };
	} catch {
		return fromSnapshot();
	}
}

function toResult(entry: Entry): Omit<ResumeResult, 'status'> {
	return { resume: entry.resume, fetchedAt: new Date(entry.fetchedAt).toISOString() };
}
