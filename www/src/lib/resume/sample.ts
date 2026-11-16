import type { Resume } from './types.ts';

/**
 * Placeholder resume used until the gist is wired up.
 * Shape follows https://jsonresume.org/schema — replace freely.
 */
export const sampleResume: Resume = {
	$schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
	basics: {
		name: 'Alex Rivera',
		label: 'Product Engineer',
		email: 'hello@example.com',
		url: 'https://example.com',
		summary:
			'Product-minded engineer who turns rough sketches into fast, accessible interfaces. I like small teams, sharp tools and shipping things people actually use.',
		location: { city: 'San Francisco', region: 'CA', countryCode: 'US' },
		profiles: [
			{ network: 'GitHub', username: 'alexrivera', url: 'https://github.com/' },
			{ network: 'LinkedIn', username: 'in/alexrivera', url: 'https://www.linkedin.com/' },
			{ network: 'Bluesky', username: '@alex.example.com', url: 'https://bsky.app/' }
		]
	},
	work: [
		{
			name: 'Ember Labs',
			position: 'Senior Product Engineer',
			location: 'San Francisco, CA',
			url: 'https://example.com',
			startDate: '2022-04-01',
			summary:
				'Built human-centered product experiences from first sketch to production. Lead a small team shipping accessible, high-performance interfaces.',
			highlights: [
				'Shipped a shared design system used across 6 product surfaces',
				'Cut p75 page load from 3.1s to 1.2s with streaming SSR and asset budgets',
				'Mentored 4 engineers through their first on-call rotations'
			]
		},
		{
			name: 'Fieldwork',
			position: 'Frontend Engineer',
			location: 'Remote',
			startDate: '2019-06-01',
			endDate: '2022-03-31',
			summary:
				'Turned complex workflows into clear, dependable tools for teams working in the field.',
			highlights: [
				'Built an offline-first sync layer for crews with patchy connectivity',
				'Migrated a 200k-line codebase from JavaScript to TypeScript'
			]
		},
		{
			name: 'Studio Kiln',
			position: 'Web Developer',
			location: 'Oakland, CA',
			startDate: '2017-01-01',
			endDate: '2019-05-31',
			summary:
				'Agency work: marketing sites, e-commerce builds and the occasional art installation.'
		}
	],
	education: [
		{
			institution: 'University of Somewhere',
			area: 'Computer Science',
			studyType: 'B.S.',
			startDate: '2012',
			endDate: '2016',
			courses: ['HCI', 'Distributed Systems', 'Typography']
		}
	],
	certificates: [{ name: 'Web Accessibility Specialist', issuer: 'IAAP', date: '2021-09-01' }],
	skills: [
		{ name: 'Frontend', level: 'Expert', keywords: ['TypeScript', 'Svelte', 'React', 'CSS'] },
		{ name: 'Backend', level: '78', keywords: ['Node.js', 'Postgres', 'Cloudflare Workers'] },
		{ name: 'Design', level: 'Advanced', keywords: ['Design systems', 'Figma', 'Prototyping'] }
	],
	projects: [
		{
			name: 'resume.tty',
			description: 'This site. A JSON Resume rendered as a warm terminal.',
			type: 'side project',
			startDate: '2026',
			url: 'https://example.com',
			keywords: ['SvelteKit', 'Workers']
		},
		{
			name: 'kiln-timer',
			description:
				'A tiny CLI that tracks pottery firing schedules and pings you when to open the kiln.',
			type: 'open source',
			startDate: '2024',
			endDate: '2025',
			url: 'https://github.com/',
			keywords: ['Rust', 'CLI']
		}
	],
	languages: [
		{ language: 'English', fluency: 'Native' },
		{ language: 'Spanish', fluency: 'Professional' }
	],
	interests: [
		{ name: 'Making', keywords: ['Ceramics', 'Synths', 'Bouldering', 'Film photography'] }
	],
	meta: { version: 'v1.0.0', lastModified: '2026-11-16', available: true }
};
