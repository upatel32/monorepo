<!--
	Panel surface. `label` renders a "## LABEL" heading. `wide` spans both Grid columns.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import SectionLabel from './SectionLabel.svelte';

	interface Props extends HTMLAttributes<HTMLElement> {
		label?: string;
		wide?: boolean;
		as?: 'section' | 'article' | 'div' | 'aside';
		/** Extra content on the right of the label row (e.g. a link) */
		actions?: Snippet;
		children: Snippet;
	}

	let {
		label,
		wide = false,
		as = 'section',
		actions,
		children,
		class: className,
		...rest
	}: Props = $props();
</script>

<svelte:element this={as} class={['ui-card', { wide }, className]} {...rest}>
	{#if label || actions}
		<div class="head">
			{#if label}<SectionLabel>{label}</SectionLabel>{/if}
			{#if actions}<div class="actions">{@render actions()}</div>{/if}
		</div>
	{/if}
	{@render children()}
</svelte:element>

<style>
	.ui-card {
		min-width: 0;
		background: var(--ui-card-bg);
		border: 1px solid var(--ui-crust);
		padding: var(--ui-space-5);
		box-shadow: var(--ui-card-shadow);
		scroll-margin-top: 64px;
	}
	.wide {
		grid-column: 1 / -1;
	}
	.head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--ui-space-3);
		margin-bottom: 14px;
	}
	.actions {
		font-size: var(--ui-text-xs);
	}
	@media print {
		.ui-card {
			border: 0;
			padding: 0;
			break-inside: avoid;
		}
	}
</style>
