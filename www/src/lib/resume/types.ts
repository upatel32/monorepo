/**
 * JSON Resume types (https://jsonresume.org/schema).
 * Every field is optional in the spec, so components must tolerate gaps.
 * Dates are ISO 8601 strings: "2022", "2022-03" or "2022-03-01".
 */

export interface Location {
	address?: string;
	postalCode?: string;
	city?: string;
	countryCode?: string;
	region?: string;
}

export interface Profile {
	network?: string;
	username?: string;
	url?: string;
}

export interface Basics {
	name?: string;
	label?: string;
	image?: string;
	email?: string;
	phone?: string;
	url?: string;
	summary?: string;
	location?: Location;
	profiles?: Profile[];
}

export interface Work {
	name?: string;
	location?: string;
	description?: string;
	position?: string;
	url?: string;
	startDate?: string;
	endDate?: string;
	summary?: string;
	highlights?: string[];
}

export interface Volunteer {
	organization?: string;
	position?: string;
	url?: string;
	startDate?: string;
	endDate?: string;
	summary?: string;
	highlights?: string[];
}

export interface Education {
	institution?: string;
	url?: string;
	area?: string;
	studyType?: string;
	startDate?: string;
	endDate?: string;
	score?: string;
	courses?: string[];
}

export interface Award {
	title?: string;
	date?: string;
	awarder?: string;
	summary?: string;
}

export interface Certificate {
	name?: string;
	date?: string;
	url?: string;
	issuer?: string;
}

export interface Publication {
	name?: string;
	publisher?: string;
	releaseDate?: string;
	url?: string;
	summary?: string;
}

export interface Skill {
	name?: string;
	level?: string;
	keywords?: string[];
}

export interface Language {
	language?: string;
	fluency?: string;
}

export interface Interest {
	name?: string;
	keywords?: string[];
}

export interface Reference {
	name?: string;
	reference?: string;
}

export interface Project {
	name?: string;
	description?: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: string;
	endDate?: string;
	url?: string;
	roles?: string[];
	entity?: string;
	type?: string;
}

export interface ResumeMeta {
	canonical?: string;
	version?: string;
	lastModified?: string;
	/** Non-standard: shows the "available" badge when true */
	available?: boolean;
	[key: string]: unknown;
}

export interface Resume {
	$schema?: string;
	basics?: Basics;
	work?: Work[];
	volunteer?: Volunteer[];
	education?: Education[];
	awards?: Award[];
	certificates?: Certificate[];
	publications?: Publication[];
	skills?: Skill[];
	languages?: Language[];
	interests?: Interest[];
	references?: Reference[];
	projects?: Project[];
	meta?: ResumeMeta;
}
