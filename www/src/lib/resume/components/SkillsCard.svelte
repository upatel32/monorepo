<script lang="ts">
	import { Card, TagList, Text } from '@amber/ui';
	import type { Skill } from '../types.ts';

	interface Props {
		skills: Skill[];
		id?: string;
	}

	let { skills, id = 'skills' }: Props = $props();

	// Skills with keywords become labelled groups ("Frontend: React, CSS…");
	// standalone skills ("React") are shown together as one tag list.
	const groups = $derived(skills.filter((s) => s.name && s.keywords?.length));
	const standalone = $derived(
		skills.filter((s) => s.name && !s.keywords?.length).map((s) => s.name!)
	);
</script>

{#if groups.length || standalone.length}
	<Card label="Skills / technologies" {id}>
		{#if standalone.length}
			<TagList tags={standalone} label="Skills" />
		{/if}
		{#each groups as skill (skill.name)}
			<div class="group">
				<Text size="2xs" tone="dim">{skill.name}</Text>
				<TagList tags={skill.keywords ?? []} label={skill.name} />
			</div>
		{/each}
	</Card>
{/if}

<style>
	.group + .group,
	:global(.ui-taglist) + .group {
		margin-top: 14px;
	}
	.group :global(.ui-text) {
		margin-bottom: 2px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
</style>
