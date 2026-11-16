<!--
	Body text with tone. Use for paragraphs inside cards.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tone?: 'default' | 'muted' | 'dim' | 'bright';
		as?: 'p' | 'span' | 'div';
		size?: 'sm' | 'xs' | '2xs';
		children: Snippet;
	}

	let { tone = 'muted', as = 'p', size = 'sm', children }: Props = $props();
</script>

<svelte:element this={as} class={['ui-text', `t-${tone}`, `s-${size}`]}>
	{@render children()}
</svelte:element>

<style>
	.ui-text {
		margin: 0 0 0.75em;
		max-width: 68ch;
	}
	.ui-text:last-child {
		margin-bottom: 0;
	}
	.t-default {
		color: var(--ui-text);
	}
	.t-muted {
		color: var(--ui-muted);
	}
	.t-dim {
		color: var(--ui-dim);
	}
	.t-bright {
		color: var(--ui-incandescent);
	}
	.s-xs {
		font-size: var(--ui-text-xs);
	}
	.s-2xs {
		font-size: var(--ui-text-2xs);
	}
</style>
