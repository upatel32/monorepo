import type { EntryLocation } from './types.ts';

// Title case: the site uppercases dates with CSS, the printed résumé keeps them as-is.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2022-03-01" → "Mar 2022"; "2022" → "2022"; `{ month: false }` → year only */
export function formatDate(iso?: string, { month = true } = {}): string {
	if (!iso) return '';
	const [y, m] = iso.split('-');
	if (!month || !m) return y;
	return `${MONTHS[Number(m) - 1] ?? ''} ${y}`.trim();
}

/** "Mar 2022 – Present", "Jun 2019 – Mar 2022", or "May 2021" if start and end match */
export function formatRange(start?: string, end?: string, opts?: { month?: boolean }): string {
	const s = formatDate(start, opts);
	const e = end ? formatDate(end, opts) : 'Present';
	if (!s) return end ? e : '';
	return s === e ? s : `${s} – ${e}`;
}

/** Accepts free text ("Remote") or a structured location. */
export function formatLocation(loc?: EntryLocation): string {
	if (!loc) return '';
	if (typeof loc === 'string') return loc;
	return [loc.city, loc.region ?? loc.countryCode].filter(Boolean).join(', ');
}

/** Joins non-empty parts with " · " */
export function meta(...parts: (string | undefined | null | false)[]): string {
	return parts.filter(Boolean).join(' · ');
}

/** Strip protocol + trailing slash for display: "https://x.dev/" → "x.dev" */
export function prettyUrl(url?: string): string {
	return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
}
