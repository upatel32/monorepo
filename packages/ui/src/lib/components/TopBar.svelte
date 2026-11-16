<!--
	Header strip: brand on the left, status/meta on the right.
	<TopBar brand="NAME" product="SITE" version="v1.0">STATUS TEXT</TopBar>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import StatusDot from './StatusDot.svelte';

	interface Props {
		/** Bright part of the wordmark */
		brand: string;
		/** Part after the slash */
		product?: string;
		version?: string;
		href?: string;
		/** Show the glowing "live" dot before the right-hand content */
		live?: boolean;
		children?: Snippet;
	}

	let { brand, product, version, href = '/', live = true, children }: Props = $props();
</script>

<header class="ui-topbar">
	<a class="brand" {href}>
		<b>{brand}</b>{#if product}<span class="dim">/</span>{product}{/if}
		{#if version}<span class="dim">{version}</span>{/if}
	</a>
	{#if children}
		<div class="meta">
			{#if live}<StatusDot />{/if}
			{@render children()}
		</div>
	{/if}
</header>

<style>
	.ui-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--ui-space-4);
		border-bottom: 1px solid var(--ui-crust);
		padding-bottom: 18px;
		color: var(--ui-muted);
		font-size: var(--ui-text-xs);
		letter-spacing: 0.08em;
	}
	.brand {
		color: var(--ui-hot);
		font-weight: 600;
	}
	.brand:hover {
		text-shadow: none;
		color: var(--ui-hot);
	}
	.brand b {
		color: var(--ui-incandescent);
		text-shadow: 0 0 15px #ff702b88;
	}
	.dim {
		color: var(--ui-dim);
	}
	.meta {
		display: flex;
		align-items: center;
		gap: 9px;
		text-align: right;
	}
	@media (max-width: 650px) {
		.ui-topbar {
			font-size: 9px;
		}
	}
</style>
