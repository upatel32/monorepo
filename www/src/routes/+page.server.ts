import { getResume } from '#lib/server/resume.ts';
import { RESUME_GIST_URL } from '#lib/resume/source.ts';
import type { PageServerLoad } from './$types';

// Rendered on every request so gist edits show up without a redeploy.
// The gist itself is cached in the Worker (see #lib/server/resume.ts), so this stays fast.
export const prerender = false;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// `resume` arrives with email/phone stripped; they travel encoded in `hidden`.
	const { resume, hidden, status, fetchedAt } = await getResume(fetch);

	// Let browsers reuse the page briefly; past that, serve it stale while revalidating.
	setHeaders({ 'cache-control': 'public, max-age=60, stale-while-revalidate=300' });

	return { resume, hidden, status, fetchedAt, source: RESUME_GIST_URL };
};
