<!--
	Card / section heading: "## LABEL" in tracked lava orange.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		level?: 2 | 3 | 4;
		children: Snippet;
	}

	let { level = 2, children }: Props = $props();
</script>

<svelte:element this={`h${level}`} class="ui-label">{@render children()}</svelte:element>

<style>
	.ui-label {
		color: var(--ui-lava);
		font-size: var(--ui-text-xs);
		font-weight: 400;
		letter-spacing: var(--ui-tracking-label);
		text-transform: uppercase;
		margin: 0;
	}
	.ui-label::before {
		content: '## ';
		color: var(--ui-dim);
	}
</style>
