<!--
	Page container: centred, max-width, responsive gutter.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		as?: 'main' | 'div' | 'section';
		children: Snippet;
	}

	let { as = 'main', children, class: className, ...rest }: Props = $props();
</script>

<svelte:element this={as} class={['ui-shell', className]} {...rest}>
	{@render children()}
</svelte:element>

<style>
	.ui-shell {
		max-width: var(--ui-shell-width);
		margin: auto;
		padding: 28px var(--ui-gutter) 80px;
	}
	@media print {
		.ui-shell {
			max-width: none;
			padding: 0;
		}
	}
	@media (max-width: 650px) {
		.ui-shell {
			padding-top: 20px;
			padding-bottom: 50px;
		}
	}
</style>
