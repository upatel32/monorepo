<!--
	Big VT323 pixel headline with incandescent glow and optional blinking cursor.
	Pass `lines` for explicit line breaks, or children for free-form content.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		level?: 1 | 2 | 3;
		lines?: string[];
		cursor?: boolean;
		size?: 'xl' | 'lg' | 'md';
		children?: Snippet;
	}

	let { level = 1, lines, cursor = true, size = 'xl', children }: Props = $props();
</script>

<svelte:element this={`h${level}`} class={['ui-display', `size-${size}`]}>
	{#if lines}
		{#each lines as line, i (i)}{#if i > 0}<br />{/if}{line}{/each}
	{:else if children}
		{@render children()}
	{/if}{#if cursor}<span class="cursor" aria-hidden="true">_</span>{/if}
</svelte:element>

<style>
	.ui-display {
		font-family: var(--ui-font-pixel);
		font-weight: 400;
		letter-spacing: 0.025em;
		color: var(--ui-incandescent);
		text-shadow: var(--ui-glow-display);
		margin: 20px 0 24px;
		text-wrap: balance;
	}
	.size-xl {
		font-size: clamp(52px, 10vw, 94px);
		line-height: 0.83;
	}
	.size-lg {
		font-size: clamp(40px, 7vw, 64px);
		line-height: 0.9;
	}
	.size-md {
		font-size: 36px;
		line-height: 0.95;
		margin: 0;
	}
	.cursor {
		color: var(--ui-hot);
		animation: ui-blink 1.2s steps(2, start) infinite;
	}
	@keyframes ui-blink {
		to {
			visibility: hidden;
		}
	}
</style>
