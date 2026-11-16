<script lang="ts">
	import { Card, Timeline, TimelineEntry } from '@amber/ui';
	import type { Work } from '../types.ts';
	import { formatLocation, formatRange, meta } from '../format.ts';

	interface Props {
		work: Work[];
		label?: string;
		id?: string;
	}

	let { work, label = 'Experience / version history', id = 'experience' }: Props = $props();
</script>

{#if work.length}
	<Card {label} printLabel="Experience" {id} wide>
		<Timeline>
			{#each work as job, i (i)}
				<TimelineEntry
					meta={meta(formatRange(job.startDate, job.endDate), formatLocation(job.location))}
					title={job.position ?? 'Role'}
					org={job.name}
					orgHref={job.url}
					highlights={job.highlights}
				>
					{#if job.summary}<p>{job.summary}</p>{/if}
				</TimelineEntry>
			{/each}
		</Timeline>
	</Card>
{/if}
