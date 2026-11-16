<!--
	Small tracked-out kicker text. `brackets` wraps it as "[ TEXT ]".
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		brackets?: boolean;
		children: Snippet;
	}

	let { brackets = true, children }: Props = $props();
</script>

<div class="ui-eyebrow">
	{brackets ? '[ ' : ''}{@render children()}{brackets ? ' ]' : ''}
</div>

<style>
	.ui-eyebrow {
		color: var(--ui-lava);
		font-size: var(--ui-text-xs);
		letter-spacing: var(--ui-tracking-eyebrow);
		text-transform: uppercase;
	}
</style>
