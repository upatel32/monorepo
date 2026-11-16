<script lang="ts">
	import { Card, Meter, TagList, Text } from '@amber/ui';
	import type { Skill } from '../types.ts';
	import { levelToPercent } from '../format.ts';

	interface Props {
		skills: Skill[];
		id?: string;
	}

	let { skills, id = 'skills' }: Props = $props();

	const meters = $derived(
		skills
			.map((s) => ({ name: s.name ?? '', value: levelToPercent(s.level) }))
			.filter((s): s is { name: string; value: number } => s.value !== undefined)
	);
</script>

{#if skills.length}
	<Card label="Skills / technologies" {id}>
		{#each meters as m (m.name)}
			<Meter label={m.name} value={m.value} />
		{/each}
		{#each skills as skill (skill.name)}
			{#if skill.keywords?.length}
				<div class="group">
					<Text size="2xs" tone="dim">{skill.name}</Text>
					<TagList tags={skill.keywords} label={skill.name} />
				</div>
			{/if}
		{/each}
	</Card>
{/if}

<style>
	.group {
		margin-top: 14px;
	}
	.group :global(.ui-text) {
		margin-bottom: 2px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
</style>
