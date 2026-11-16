/**
 * Build step: fetch the gist, validate it, and write src/lib/resume/snapshot.json.
 *
 * The snapshot is what the site serves if GitHub is unreachable when a Worker starts,
 * so every deploy ships with a known-good copy.
 *
 *   - gist invalid      → build fails (fix the gist, or the site would ship bad data)
 *   - GitHub unreachable → keep the existing snapshot and warn, so offline builds still work
 *
 * Set GITHUB_TOKEN to read through the API instead of the (up to ~5 min cached) raw URL.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fetchResume, ResumeFetchError } from '../src/lib/resume/fetch.ts';
import { redactContact } from '../src/lib/resume/privacy.ts';
import { RESUME_GIST_URL } from '../src/lib/resume/source.ts';

const out = new URL('../src/lib/resume/snapshot.json', import.meta.url);

try {
	const { resume, origin } = await fetchResume({
		token: process.env.GITHUB_TOKEN,
		timeoutMs: 15_000
	});
	// Stored redacted (email/phone encoded) so the address isn't sitting in plain text in the repo.
	const snapshot = {
		fetchedAt: new Date().toISOString(),
		source: RESUME_GIST_URL,
		...redactContact(resume)
	};
	await writeFile(out, JSON.stringify(snapshot, null, '\t') + '\n');
	console.log(`✔ Resume snapshot updated from ${origin} (${resume.basics?.name ?? 'no name'})`);
} catch (err) {
	if (err instanceof ResumeFetchError && err.issues) {
		console.error(`✘ ${err.message} — ${RESUME_GIST_URL}`);
		for (const { path, message } of err.issues) console.error(`  ${path || '(root)'}: ${message}`);
		process.exit(1);
	}
	const existing = await readFile(out, 'utf8').catch(() => undefined);
	if (!existing) {
		console.error(
			`✘ ${(err as Error).message}, and there is no existing snapshot to fall back on.`
		);
		process.exit(1);
	}
	const { fetchedAt } = JSON.parse(existing) as { fetchedAt: string };
	console.warn(`⚠ ${(err as Error).message}. Keeping the snapshot from ${fetchedAt}.`);
}
