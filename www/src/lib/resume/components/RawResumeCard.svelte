<script lang="ts">
	import { Card, JsonView, StatusDot } from '@amber/ui';
	import type { Resume } from '../types.ts';

	interface Props {
		resume: Resume;
		source?: string;
		/** Where this copy came from: fetched just now, from the Worker cache, or the build snapshot */
		status?: 'live' | 'cached' | 'stale' | 'snapshot';
		/** ISO timestamp of the fetch */
		fetchedAt?: string;
		id?: string;
	}

	let { resume, source, status, fetchedAt, id = 'json' }: Props = $props();

	const synced = $derived(
		fetchedAt
			? new Date(fetchedAt).toISOString().replace('T', ' ').slice(0, 16) + ' UTC'
			: undefined
	);
</script>

<Card label="resume.json" {id} wide data-print="hide">
	{#snippet actions()}
		<span class="sync">
			{#if status}
				<StatusDot tone={status === 'snapshot' ? 'dim' : 'lava'} />
				<span>{status === 'snapshot' ? 'snapshot' : 'synced'}{synced ? ` ${synced}` : ''}</span>
			{/if}
			{#if source}<a href={source} rel="external">view source ↗</a>{/if}
		</span>
	{/snippet}
	<JsonView value={resume} maxHeight="360px" />
</Card>

<style>
	.sync {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--ui-dim);
		text-transform: uppercase;
	}
</style>
