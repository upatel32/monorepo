/**
 * Validate resume JSON against the zod schema.
 *
 *   yarn validate:resume                 # the live gist (via the GitHub API, so it's never stale)
 *   yarn validate:resume ./resume.json   # a local file
 *   yarn validate:resume https://…       # any URL that returns resume JSON
 *
 * Exits with code 1 when the resume is invalid, so it can gate CI or a pre-deploy step.
 */
import { readFile } from 'node:fs/promises';
import { parseResume } from '../src/lib/resume/schema.ts';
import { RESUME_API_URL, RESUME_GIST_FILE, RESUME_GIST_URL } from '../src/lib/resume/source.ts';

async function load(arg?: string): Promise<{ label: string; text: string }> {
	if (!arg) {
		const res = await fetch(RESUME_API_URL, {
			headers: { accept: 'application/vnd.github+json', 'user-agent': 'resume-validator' }
		});
		if (!res.ok) throw new Error(`GitHub API responded ${res.status} ${res.statusText}`);
		const gist = (await res.json()) as { files: Record<string, { content?: string }> };
		const file = gist.files[RESUME_GIST_FILE];
		if (!file?.content) throw new Error(`Gist has no ${RESUME_GIST_FILE} file`);
		return { label: RESUME_GIST_URL, text: file.content };
	}
	if (/^https?:\/\//.test(arg)) {
		const res = await fetch(arg);
		if (!res.ok) throw new Error(`${arg} responded ${res.status} ${res.statusText}`);
		return { label: arg, text: await res.text() };
	}
	return { label: arg, text: await readFile(arg, 'utf8') };
}

const { label, text } = await load(process.argv[2]);
console.log(`Validating ${label}`);

let json: unknown;
try {
	json = JSON.parse(text);
} catch (err) {
	console.error(`✘ Not valid JSON: ${(err as Error).message}`);
	process.exit(1);
}

const result = parseResume(json);
if (!result.success) {
	console.error(`✘ ${result.issues.length} problem(s):`);
	for (const { path, message } of result.issues) console.error(`  ${path || '(root)'}: ${message}`);
	process.exit(1);
}

const r = result.data;
const counts = (['work', 'volunteer', 'education', 'skills', 'projects'] as const)
	.map((k) => `${r[k]?.length ?? 0} ${k}`)
	.join(', ');
console.log(`✔ Valid resume for ${r.basics?.name ?? '(no name)'}: ${counts}`);
