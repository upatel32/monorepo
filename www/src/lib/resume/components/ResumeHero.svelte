<script lang="ts">
	import { Button, Hero, StatusBadge } from '@amber/ui';
	import type { Basics } from '../types.ts';
	import { formatLocation, meta } from '../format.ts';

	interface Props {
		basics: Basics;
		available?: boolean;
		/** Show a Contact button that jumps to the contact card */
		contact?: boolean;
	}

	let { basics, available = false, contact = false }: Props = $props();

	// Split the name across lines for the big pixel heading: "ADA LOVELACE" → ["ADA", "LOVELACE"]
	const title = $derived((basics.name ?? 'Anonymous').toUpperCase().split(/\s+/));
	const eyebrow = $derived(meta(basics.label, formatLocation(basics.location)));
</script>

<Hero {eyebrow} {title}>
	{#snippet lede()}
		{#if basics.summary}<p>{basics.summary}</p>{/if}
	{/snippet}
	{#snippet actions()}
		<Button variant="primary" href="#experience">View resume</Button>
		{#if contact}<Button href="#contact">Contact</Button>{/if}
		<Button variant="secondary" onclick={() => window.print()}>Print / PDF</Button>
	{/snippet}
	{#snippet aside()}
		{#if available}<StatusBadge>Available for opportunities</StatusBadge>{/if}
	{/snippet}
</Hero>
