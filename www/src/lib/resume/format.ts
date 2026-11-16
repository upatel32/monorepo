import type { EntryLocation } from './types.ts';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/** "2022-03-01" → "MAR 2022", "2022" → "2022" */
export function formatDate(iso?: string, { month = false } = {}): string {
	if (!iso) return '';
	const [y, m] = iso.split('-');
	if (!month || !m) return y;
	return `${MONTHS[Number(m) - 1] ?? ''} ${y}`.trim();
}

/** "2022—NOW", "2019—2022", or "2021" if start and end are the same year */
export function formatRange(start?: string, end?: string, opts?: { month?: boolean }): string {
	const s = formatDate(start, opts);
	const e = end ? formatDate(end, opts) : 'NOW';
	if (!s) return end ? e : '';
	return s === e ? s : `${s}—${e}`;
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

/**
 * JSON Resume skill levels are free text. Map common words to a meter value;
 * a number ("85" or "85%") is used as-is. Returns undefined if unknown.
 */
export function levelToPercent(level?: string): number | undefined {
	if (!level) return undefined;
	const n = parseFloat(level);
	if (!Number.isNaN(n)) return n;
	const table: Record<string, number> = {
		beginner: 30,
		novice: 30,
		intermediate: 55,
		proficient: 70,
		advanced: 80,
		expert: 92,
		master: 96
	};
	return table[level.trim().toLowerCase()];
}
