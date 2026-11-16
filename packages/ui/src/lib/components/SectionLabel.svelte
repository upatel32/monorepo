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
	@media print {
		.ui-label {
			flex: 1;
			font: 600 8.5pt / 1.2 var(--ui-font-mono);
			letter-spacing: 0.14em;
			color: var(--ui-lava);
			border-bottom: 0.75pt solid var(--ui-lava);
			padding-bottom: 3pt;
		}
		.ui-label::before {
			content: none;
		}
	}
</style>
