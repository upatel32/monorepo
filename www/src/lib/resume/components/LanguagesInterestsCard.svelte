<script lang="ts">
	import { Card, DataList, TagList, Text } from '@amber/ui';
	import type { Interest, Language } from '../types.ts';

	interface Props {
		languages?: Language[];
		interests?: Interest[];
		id?: string;
	}

	let { languages = [], interests = [], id = 'about' }: Props = $props();

	const langItems = $derived(
		languages.filter((l) => l.language).map((l) => ({ label: l.language!, value: l.fluency ?? '' }))
	);
	const interestTags = $derived(
		interests.flatMap((i) => (i.keywords?.length ? i.keywords : i.name ? [i.name] : []))
	);
</script>

{#if langItems.length || interestTags.length}
	<Card label="Off the clock" printLabel="Languages & interests" {id}>
		{#if langItems.length}<DataList items={langItems} />{/if}
		{#if interestTags.length}
			<div class="interests">
				<Text size="2xs" tone="dim">INTERESTS</Text>
				<TagList tags={interestTags} label="Interests" />
			</div>
		{/if}
	</Card>
{/if}

<style>
	.interests {
		margin-top: 14px;
	}
</style>
