<!--
	Small gold chip for skills / technologies. Renders a link when `href` is set.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		children: Snippet;
	}

	let { href, children }: Props = $props();
</script>

{#if href}
	<a class="ui-tag" {href}>{@render children()}</a>
{:else}
	<span class="ui-tag">{@render children()}</span>
{/if}

<style>
	.ui-tag {
		display: inline-block;
		padding: 3px 8px;
		margin: 3px;
		border: 1px solid #6b341f;
		background: #28160f;
		color: var(--ui-gold);
		font-size: var(--ui-text-2xs);
		line-height: 1.5;
	}
	a.ui-tag:hover {
		border-color: var(--ui-gold);
		color: var(--ui-incandescent);
	}
</style>
