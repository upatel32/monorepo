import type { Handle } from '@sveltejs/kit/hooks';

/**
 * Fonts needed for the first screen. Preloading them lets the browser fetch them alongside the
 * CSS instead of discovering them only after the CSS is parsed, so they usually arrive before
 * first paint and the text never visibly swaps.
 */
const CRITICAL_FONTS = /(?:vt323-latin-400|ibm-plex-mono-latin-(?:400|500))-normal[^/]*\.woff2$/;

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		preload: ({ type, path }) =>
			type === 'js' || type === 'css' || (type === 'font' && CRITICAL_FONTS.test(path))
	});
