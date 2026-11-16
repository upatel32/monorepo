<script lang="ts">
	import { Grid, SectionNav, type NavItem } from '@amber/ui';
	import {
		ContactCard,
		EducationCard,
		ExperienceCard,
		LanguagesInterestsCard,
		ProjectsCard,
		RawResumeCard,
		ResumeHero,
		SkillsCard
	} from '#lib/resume/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const resume = $derived(data.resume);
	const basics = $derived(resume.basics ?? {});

	const nav: NavItem[] = [
		{ href: '#experience', label: 'Experience' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#education', label: 'Education' },
		{ href: '#json', label: 'JSON' }
	];
</script>

<svelte:head>
	<title>{basics.name ?? 'Resume'} — {basics.label ?? 'Resume'}</title>
	{#if basics.summary}<meta name="description" content={basics.summary} />{/if}
</svelte:head>

<ResumeHero {basics} available={resume.meta?.available === true} />

<SectionNav items={nav} label="Resume sections" />

<Grid>
	<ExperienceCard work={resume.work ?? []} />
	<SkillsCard skills={resume.skills ?? []} />
	<div class="stack">
		<ContactCard {basics} />
		<LanguagesInterestsCard languages={resume.languages} interests={resume.interests} />
	</div>
	<ProjectsCard projects={resume.projects ?? []} />
	<EducationCard education={resume.education ?? []} certificates={resume.certificates ?? []} />
	<RawResumeCard {resume} source={data.source} />
</Grid>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-4);
		min-width: 0;
	}
</style>
