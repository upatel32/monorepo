<script lang="ts">
	import { Card, JsonView } from '@amber/ui';
	import type { Resume } from '../types.ts';

	interface Props {
		resume: Resume;
		source?: string;
		id?: string;
	}

	let { resume, source, id = 'json' }: Props = $props();
</script>

<Card label="resume.json" {id} wide data-print="hide">
	{#snippet actions()}
		{#if source}<a href={source} rel="external">view source ↗</a>{/if}
	{/snippet}
	<JsonView value={resume} maxHeight="360px" />
</Card>
