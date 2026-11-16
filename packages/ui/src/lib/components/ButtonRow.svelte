<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="ui-button-row" data-print="hide">{@render children()}</div>

<style>
	.ui-button-row {
		display: flex;
		gap: var(--ui-space-3);
		flex-wrap: wrap;
		margin: var(--ui-space-3) 0 var(--ui-space-5);
	}
</style>
