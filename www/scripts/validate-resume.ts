/**
 * Validate resume JSON against the zod schema.
 *
 *   yarn validate:resume                 # the live gist
 *   yarn validate:resume ./resume.json   # a local file
 *   yarn validate:resume https://…       # any URL that returns resume JSON
 *
 * For the gist, set GITHUB_TOKEN to read through the API (always current) rather than the
 * raw URL, which GitHub's CDN can serve up to ~5 minutes stale.
 * Exits with code 1 when the resume is invalid, so it can gate CI or a pre-deploy step.
 */
import { readFile } from 'node:fs/promises';
import { fetchResume, ResumeFetchError } from '../src/lib/resume/fetch.ts';
import { parseResume, type ResumeIssue } from '../src/lib/resume/schema.ts';
import { RESUME_GIST_URL } from '../src/lib/resume/source.ts';
import type { Resume } from '../src/lib/resume/types.ts';

function fail(message: string, issues: ResumeIssue[] = []): never {
	console.error(`✘ ${message}`);
	for (const { path, message } of issues) console.error(`  ${path || '(root)'}: ${message}`);
	process.exit(1);
}

async function fromArg(arg: string): Promise<Resume> {
	const text = /^https?:\/\//.test(arg)
		? await fetch(arg).then((r) => (r.ok ? r.text() : fail(`${arg} responded ${r.status}`)))
		: await readFile(arg, 'utf8');
	let json: unknown;
	try {
		json = JSON.parse(text);
	} catch (err) {
		fail(`Not valid JSON: ${(err as Error).message}`);
	}
	const result = parseResume(json);
	if (!result.success) fail(`${result.issues.length} problem(s):`, result.issues);
	return result.data;
}

const arg = process.argv[2];
console.log(`Validating ${arg ?? RESUME_GIST_URL}`);

let r: Resume;
if (arg) {
	r = await fromArg(arg);
} else {
	try {
		r = (await fetchResume({ token: process.env.GITHUB_TOKEN, timeoutMs: 15_000 })).resume;
	} catch (err) {
		fail((err as Error).message, err instanceof ResumeFetchError ? err.issues : []);
	}
}

const counts = (['work', 'volunteer', 'education', 'skills', 'projects'] as const)
	.map((k) => `${r[k]?.length ?? 0} ${k}`)
	.join(', ');
console.log(`✔ Valid resume for ${r.basics?.name ?? '(no name)'}: ${counts}`);
