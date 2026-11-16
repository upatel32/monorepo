/**
 * Fetch + validate the resume gist. Runtime-agnostic (Workers, Node, browser), so the
 * build scripts and the server share it. Caching lives in `#lib/server/resume.ts`.
 */
import { parseResume, type ResumeIssue } from './schema.ts';
import { RESUME_API_URL, RESUME_GIST_FILE, RESUME_RAW_URL } from './source.ts';
import type { Resume } from './types.ts';

export type ResumeOrigin = 'api' | 'raw';

export class ResumeFetchError extends Error {
	/** Present when the gist was reachable but its contents failed validation. */
	readonly issues?: ResumeIssue[];

	constructor(message: string, issues?: ResumeIssue[]) {
		super(message);
		this.name = 'ResumeFetchError';
		this.issues = issues;
	}
}

export interface FetchResumeOptions {
	/**
	 * GitHub token. With one, the GitHub API is used: always up to date, 5,000 requests/hour.
	 * Without one, the raw gist URL is used: no rate limit, but GitHub's CDN may serve a copy
	 * up to ~5 minutes old.
	 */
	token?: string;
	fetch?: typeof globalThis.fetch;
	/** Abort after this many ms so a slow GitHub can't hang a page render. */
	timeoutMs?: number;
}

export async function fetchResume({
	token,
	fetch = globalThis.fetch,
	timeoutMs = 4000
}: FetchResumeOptions = {}): Promise<{ resume: Resume; origin: ResumeOrigin }> {
	const signal = AbortSignal.timeout(timeoutMs);
	const headers = { 'user-agent': 'resume-site' };

	let text: string;
	let origin: ResumeOrigin;
	try {
		if (token) {
			origin = 'api';
			const res = await fetch(RESUME_API_URL, {
				signal,
				headers: {
					...headers,
					accept: 'application/vnd.github+json',
					authorization: `Bearer ${token}`
				}
			});
			if (!res.ok) throw new ResumeFetchError(`GitHub API responded ${res.status}`);
			const gist = (await res.json()) as {
				files?: Record<string, { content?: string; truncated?: boolean }>;
			};
			const file = gist.files?.[RESUME_GIST_FILE];
			if (!file?.content) throw new ResumeFetchError(`Gist has no ${RESUME_GIST_FILE}`);
			// The API truncates files over ~1MB; fall through to the raw URL in that case.
			text = file.truncated ? await getText(RESUME_RAW_URL, fetch, signal, headers) : file.content;
		} else {
			origin = 'raw';
			text = await getText(RESUME_RAW_URL, fetch, signal, headers);
		}
	} catch (err) {
		if (err instanceof ResumeFetchError) throw err;
		throw new ResumeFetchError(`Could not reach GitHub: ${(err as Error).message}`);
	}

	let json: unknown;
	try {
		json = JSON.parse(text);
	} catch (err) {
		throw new ResumeFetchError(`${RESUME_GIST_FILE} is not valid JSON: ${(err as Error).message}`);
	}

	const result = parseResume(json);
	if (!result.success) {
		throw new ResumeFetchError(
			`${RESUME_GIST_FILE} failed validation (${result.issues.length} problem(s))`,
			result.issues
		);
	}
	return { resume: result.data, origin };
}

async function getText(
	url: string,
	fetch: typeof globalThis.fetch,
	signal: AbortSignal,
	headers: Record<string, string>
) {
	const res = await fetch(url, { signal, headers });
	if (!res.ok) throw new ResumeFetchError(`${url} responded ${res.status}`);
	return res.text();
}
