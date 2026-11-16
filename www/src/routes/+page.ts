import { sampleResume } from '#lib/resume/index.ts';
import type { PageLoad } from './$types';

// Static for now. When the gist is wired up, fetch it here (or in a +page.server.ts /
// remote function) and return it as `resume` — the page only depends on that shape.
export const prerender = true;

export const load: PageLoad = () => {
	return {
		resume: sampleResume,
		source: undefined as string | undefined
	};
};
