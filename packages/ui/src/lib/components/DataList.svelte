<!--
	Key / value rows, e.g. contact details.
	EMAIL ....... hello@example.com
-->
<script lang="ts">
	import type { DataItem } from '../types.ts';

	interface Props {
		items: DataItem[];
	}

	let { items }: Props = $props();
</script>

<dl class="ui-datalist">
	{#each items as item (item.label)}
		<div class="row">
			<dt>{item.label}</dt>
			<dd>
				{#if item.href}<a href={item.href}>{item.value}</a>{:else}{item.value}{/if}
			</dd>
		</div>
	{/each}
</dl>

<style>
	.ui-datalist {
		margin: 0;
	}
	.row {
		display: flex;
		align-items: baseline;
		gap: var(--ui-space-2);
		padding: 6px 0;
		border-bottom: 1px solid var(--ui-rule);
	}
	.row:last-child {
		border-bottom: 0;
	}
	dt {
		flex: none;
		color: var(--ui-dim);
		font-size: var(--ui-text-2xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	dd {
		margin: 0 0 0 auto;
		min-width: 0;
		text-align: right;
		overflow-wrap: anywhere;
		color: var(--ui-text);
	}
</style>
