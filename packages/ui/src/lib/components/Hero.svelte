<!--
	Page hero: eyebrow, big display heading, lede and optional actions.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import Eyebrow from './Eyebrow.svelte';
	import DisplayHeading from './DisplayHeading.svelte';

	interface Props {
		eyebrow?: string;
		/** Each entry becomes its own line */
		title: string[];
		cursor?: boolean;
		lede?: Snippet;
		actions?: Snippet;
		aside?: Snippet;
	}

	let { eyebrow, title, cursor = true, lede, actions, aside }: Props = $props();
</script>

<section class="ui-hero">
	<div class="main">
		{#if eyebrow}<Eyebrow>{eyebrow}</Eyebrow>{/if}
		<DisplayHeading lines={title} {cursor} />
		{#if lede}<div class="lede">{@render lede()}</div>{/if}
		{#if actions}<div class="actions" data-print="hide">
				{@render actions()}
			</div>{/if}
	</div>
	{#if aside}<div class="aside">{@render aside()}</div>{/if}
</section>

<style>
	.ui-hero {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--ui-space-6);
		padding: 54px 0 34px;
	}
	.main {
		min-width: 0;
	}
	.lede {
		max-width: 590px;
		color: var(--ui-muted);
	}
	.lede :global(p) {
		margin: 0 0 0.75em;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--ui-space-3);
		margin-top: var(--ui-space-5);
	}
	.aside {
		flex: none;
	}
	@media (max-width: 650px) {
		.ui-hero {
			flex-direction: column;
			align-items: flex-start;
			padding: 42px 0 28px;
		}
	}
</style>
