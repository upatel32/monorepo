/**
 * Zod schema for JSON Resume.
 * Mirrors https://github.com/jsonresume/jsonresume.org/blob/master/packages/schema/schema.json
 *
 * Like the upstream schema, every field is optional and unknown keys are allowed
 * (`z.looseObject`), so custom data such as `meta._hiddenWork` passes through untouched.
 * It goes further than the JSON Schema in two ways that catch common editing mistakes:
 *   - an entry's `endDate` must not be before its `startDate`
 *   - strings that are meant to be URLs / emails must actually be URLs / emails
 *
 * Keep this file free of `$app` / `#lib` imports: `scripts/validate-resume.ts` runs it directly with Node.
 */
import { z } from 'zod';

// ── Shared definitions ──────────────────────────────────────────────────────

/** "2014", "2014-06" or "2014-06-29" — later parts are optional. */
export const Iso8601 = z
	.string()
	.regex(
		/^([1-2][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])|[1-2][0-9]{3}-(0[1-9]|1[0-2])|[1-2][0-9]{3})$/,
		'Use an ISO 8601 date: YYYY, YYYY-MM or YYYY-MM-DD'
	);

const Url = z.url({ message: 'Must be a full URL, e.g. https://example.com' });
const Email = z.email({ message: 'Must be a valid email address' });
const Strings = z.array(z.string());

/** Tool- or author-specific data with no standard field yet. */
export const Custom = z.record(z.string(), z.unknown());

export const Location = z.looseObject({
	address: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string().optional(),
	/** ISO-3166-1 ALPHA-2, e.g. US */
	countryCode: z
		.string()
		.regex(/^[A-Za-z]{2}$/, 'Use a two-letter ISO-3166-1 country code, e.g. US')
		.optional(),
	region: z.string().optional()
});

/** Free text ("Menlo Park, CA") or a structured location. */
export const EntryLocation = z.union([z.string(), Location]);

/** Adds an "endDate must not be before startDate" check to dated entries. */
function dateOrder<T extends { startDate?: string; endDate?: string }>(
	entry: T,
	ctx: z.RefinementCtx
) {
	const { startDate, endDate } = entry;
	// Malformed dates already have their own issue; don't pile a misleading one on top.
	if (!Iso8601.safeParse(startDate).success || !Iso8601.safeParse(endDate).success) return;
	// Comparing ISO strings works for mixed precision: "2020" < "2020-05" < "2020-05-01".
	if (startDate && endDate && endDate < startDate) {
		ctx.addIssue({
			code: 'custom',
			path: ['endDate'],
			message: `endDate (${endDate}) is before startDate (${startDate})`
		});
	}
}

// ── Sections ────────────────────────────────────────────────────────────────

export const Profile = z.looseObject({
	network: z.string().optional(),
	username: z.string().optional(),
	url: Url.optional()
});

export const Basics = z.looseObject({
	name: z.string().optional(),
	label: z.string().optional(),
	image: z.string().optional(),
	email: Email.optional(),
	phone: z.string().optional(),
	url: Url.optional(),
	summary: z.string().optional(),
	location: Location.optional(),
	profiles: z.array(Profile).optional(),
	custom: Custom.optional()
});

export const Work = z
	.looseObject({
		name: z.string().optional(),
		location: EntryLocation.optional(),
		description: z.string().optional(),
		position: z.string().optional(),
		url: Url.optional(),
		startDate: Iso8601.optional(),
		endDate: Iso8601.optional(),
		summary: z.string().optional(),
		highlights: Strings.optional(),
		keywords: Strings.optional(),
		custom: Custom.optional()
	})
	.superRefine(dateOrder);

export const Volunteer = z
	.looseObject({
		organization: z.string().optional(),
		location: EntryLocation.optional(),
		position: z.string().optional(),
		url: Url.optional(),
		startDate: Iso8601.optional(),
		endDate: Iso8601.optional(),
		summary: z.string().optional(),
		highlights: Strings.optional(),
		custom: Custom.optional()
	})
	.superRefine(dateOrder);

export const Education = z
	.looseObject({
		institution: z.string().optional(),
		location: EntryLocation.optional(),
		url: Url.optional(),
		area: z.string().optional(),
		studyType: z.string().optional(),
		startDate: Iso8601.optional(),
		endDate: Iso8601.optional(),
		score: z.string().optional(),
		courses: Strings.optional(),
		summary: z.string().optional(),
		custom: Custom.optional()
	})
	.superRefine(dateOrder);

export const Award = z.looseObject({
	title: z.string().optional(),
	date: Iso8601.optional(),
	awarder: z.string().optional(),
	summary: z.string().optional(),
	custom: Custom.optional()
});

export const Certificate = z.looseObject({
	name: z.string().optional(),
	date: Iso8601.optional(),
	url: Url.optional(),
	credentialId: z.string().optional(),
	issuer: z.string().optional(),
	expiryDate: Iso8601.optional(),
	summary: z.string().optional(),
	custom: Custom.optional()
});

export const Publication = z.looseObject({
	name: z.string().optional(),
	authors: Strings.optional(),
	publisher: z.string().optional(),
	releaseDate: Iso8601.optional(),
	volume: z.string().optional(),
	issue: z.string().optional(),
	pages: z.string().optional(),
	/** Persistent identifiers keyed by scheme: doi, isbn, arxiv, pmid … */
	identifiers: z.record(z.string(), z.string()).optional(),
	url: Url.optional(),
	summary: z.string().optional(),
	type: z.string().optional(),
	custom: Custom.optional()
});

export const Skill = z.looseObject({
	name: z.string().optional(),
	/** Free text, e.g. "Master". The site also accepts a number like "85". */
	level: z.string().optional(),
	keywords: Strings.optional(),
	custom: Custom.optional()
});

export const Language = z.looseObject({
	language: z.string().optional(),
	fluency: z.string().optional(),
	custom: Custom.optional()
});

export const Interest = z.looseObject({
	name: z.string().optional(),
	keywords: Strings.optional(),
	custom: Custom.optional()
});

export const Reference = z.looseObject({
	name: z.string().optional(),
	reference: z.string().optional(),
	relationship: z.string().optional(),
	organization: z.string().optional(),
	date: Iso8601.optional(),
	availableOnRequest: z.boolean().optional(),
	custom: Custom.optional()
});

export const Project = z
	.looseObject({
		name: z.string().optional(),
		summary: z.string().optional(),
		/** Deprecated alias of `summary`; `summary` wins when both are set. */
		description: z.string().optional(),
		highlights: Strings.optional(),
		keywords: Strings.optional(),
		startDate: Iso8601.optional(),
		endDate: Iso8601.optional(),
		url: Url.optional(),
		roles: Strings.optional(),
		entity: z.string().optional(),
		type: z.string().optional(),
		custom: Custom.optional()
	})
	.superRefine(dateOrder);

export const Meta = z.looseObject({
	canonical: Url.optional(),
	/** semver, e.g. v1.0.0 */
	version: z.string().optional(),
	/** ISO 8601, e.g. 2026-11-16T12:00:00 */
	lastModified: z.string().optional(),
	/** Site-specific (not in JSON Resume): shows the "available for opportunities" badge. */
	available: z.boolean().optional()
});

export const Resume = z.looseObject({
	$schema: Url.optional(),
	basics: Basics.optional(),
	/** Forward-looking career goal; distinct from basics.summary. */
	objective: z.string().optional(),
	work: z.array(Work).optional(),
	volunteer: z.array(Volunteer).optional(),
	education: z.array(Education).optional(),
	awards: z.array(Award).optional(),
	certificates: z.array(Certificate).optional(),
	publications: z.array(Publication).optional(),
	skills: z.array(Skill).optional(),
	languages: z.array(Language).optional(),
	interests: z.array(Interest).optional(),
	references: z.array(Reference).optional(),
	projects: z.array(Project).optional(),
	meta: Meta.optional(),
	custom: Custom.optional()
});

// ── Helpers ─────────────────────────────────────────────────────────────────

export type ResumeIssue = { path: string; message: string };

/** Turns zod issues into readable "work[2].endDate: …" lines. */
export function formatIssues(error: z.ZodError): ResumeIssue[] {
	return error.issues.map((issue) => ({
		path: issue.path.reduce<string>(
			(acc, key) =>
				typeof key === 'number' ? `${acc}[${key}]` : acc ? `${acc}.${String(key)}` : String(key),
			''
		),
		message: issue.message
	}));
}

/**
 * Validate unknown JSON (e.g. the gist contents).
 * Returns the typed resume, or a list of readable issues.
 */
export function parseResume(
	data: unknown
): { success: true; data: z.infer<typeof Resume> } | { success: false; issues: ResumeIssue[] } {
	const result = Resume.safeParse(data);
	return result.success
		? { success: true, data: result.data }
		: { success: false, issues: formatIssues(result.error) };
}
