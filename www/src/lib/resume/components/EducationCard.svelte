<script lang="ts">
	import { Card, Timeline, TimelineEntry } from '@amber/ui';
	import type { Certificate, Education } from '../types.ts';
	import { formatDate, formatRange, meta } from '../format.ts';

	interface Props {
		education: Education[];
		certificates?: Certificate[];
		id?: string;
	}

	let { education, certificates = [], id = 'education' }: Props = $props();
</script>

{#if education.length || certificates.length}
	<Card label="Education / certs" {id}>
		<Timeline>
			{#each education as edu, i (i)}
				<TimelineEntry
					meta={meta(formatRange(edu.startDate, edu.endDate), edu.score)}
					title={meta(edu.studyType, edu.area) || 'Studies'}
					org={edu.institution}
					orgHref={edu.url}
					tags={edu.courses}
				>
					{#if edu.summary}<p>{edu.summary}</p>{/if}
				</TimelineEntry>
			{/each}
			{#each certificates as cert, i (i)}
				<TimelineEntry
					marker="#"
					meta={formatDate(cert.date, { month: true })}
					title={cert.name ?? 'Certificate'}
					org={cert.issuer}
					orgHref={cert.url}
				/>
			{/each}
		</Timeline>
	</Card>
{/if}
