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

	// Only link to sections that have something in them.
	const nav: NavItem[] = $derived(
		[
			{ href: '#experience', label: 'Experience', show: resume.work?.length },
			{ href: '#skills', label: 'Skills', show: resume.skills?.length },
			{ href: '#projects', label: 'Projects', show: resume.projects?.length },
			{
				href: '#education',
				label: 'Education',
				show: resume.education?.length || resume.certificates?.length
			},
			{ href: '#json', label: 'JSON', show: true }
		]
			.filter((item) => item.show)
			.map(({ href, label }) => ({ href, label }))
	);
</script>

<svelte:head>
	<title>{basics.name ?? 'Resume'} — {basics.label ?? 'Resume'}</title>
	{#if basics.summary}<meta name="description" content={basics.summary} />{/if}
</svelte:head>

<ResumeHero
	{basics}
	available={resume.meta?.available === true}
	contact={!!(data.hidden.email || data.hidden.phone)}
/>

<SectionNav items={nav} label="Resume sections" />

<Grid>
	<ExperienceCard work={resume.work ?? []} />
	<SkillsCard skills={resume.skills ?? []} />
	<div class="stack">
		<ContactCard {basics} hidden={data.hidden} />
		<LanguagesInterestsCard languages={resume.languages} interests={resume.interests} />
	</div>
	<ProjectsCard projects={resume.projects ?? []} />
	<EducationCard education={resume.education ?? []} certificates={resume.certificates ?? []} />
	<RawResumeCard {resume} source={data.source} status={data.status} fetchedAt={data.fetchedAt} />
</Grid>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--ui-space-4);
		min-width: 0;
	}
</style>
