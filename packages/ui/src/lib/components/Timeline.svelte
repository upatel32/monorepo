<!--
	Vertical "version history" rail. Fill with <TimelineEntry>s.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<ol class="ui-timeline">{@render children()}</ol>

<style>
	.ui-timeline {
		list-style: none;
		margin: 0 0 0 8px;
		padding: 0 0 0 20px;
		border-left: 1px solid var(--ui-crust-bright);
	}
	@media print {
		.ui-timeline {
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>
