<script lang="ts">
	import { Card, Timeline, TimelineEntry } from '@amber/ui';
	import type { Project } from '../types.ts';
	import { formatRange, meta, prettyUrl } from '../format.ts';

	interface Props {
		projects: Project[];
		id?: string;
	}

	let { projects, id = 'projects' }: Props = $props();
</script>

{#if projects.length}
	<Card label="Projects / side quests" {id}>
		<Timeline>
			{#each projects as project, i (i)}
				<TimelineEntry
					marker="*"
					meta={meta(formatRange(project.startDate, project.endDate), project.type)}
					title={project.name ?? 'Untitled'}
					tags={project.keywords}
				>
					{#if project.description}<p>{project.description}</p>{/if}
					{#if project.url}<a href={project.url} rel="external">{prettyUrl(project.url)} ↗</a>{/if}
				</TimelineEntry>
			{/each}
		</Timeline>
	</Card>
{/if}
