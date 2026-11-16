<!--
	Page footer: two slots, left and right.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		start: Snippet;
		end?: Snippet;
	}

	let { start, end }: Props = $props();
</script>

<footer class="ui-footer">
	<span>{@render start()}</span>
	{#if end}<span>{@render end()}</span>{/if}
</footer>

<style>
	.ui-footer {
		display: flex;
		justify-content: space-between;
		gap: var(--ui-space-3);
		border-top: 1px solid var(--ui-crust);
		margin-top: var(--ui-space-6);
		padding-top: 15px;
		color: var(--ui-dim);
		font-size: var(--ui-text-2xs);
		text-transform: uppercase;
	}
	@media (max-width: 650px) {
		.ui-footer {
			flex-direction: column;
		}
	}
</style>
