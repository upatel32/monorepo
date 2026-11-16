<!--
	Inline glowing text, for numbers and small accents.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span class="ui-glow">{@render children()}</span>

<style>
	.ui-glow {
		color: var(--ui-hot);
		text-shadow: var(--ui-glow-sm);
	}
</style>
