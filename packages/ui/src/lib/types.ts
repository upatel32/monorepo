export interface NavItem {
	href: string;
	label: string;
}

import type { Snippet } from 'svelte';

export interface DataItem {
	label: string;
	value: string;
	href?: string;
	/** Custom content for the value cell (overrides `value` / `href`) */
	render?: Snippet;
}

export type Tone = 'lava' | 'gold' | 'molten' | 'dim';
