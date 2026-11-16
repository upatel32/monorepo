export interface NavItem {
	href: string;
	label: string;
}

export interface DataItem {
	label: string;
	value: string;
	href?: string;
}

export type Tone = 'lava' | 'gold' | 'molten' | 'dim';
