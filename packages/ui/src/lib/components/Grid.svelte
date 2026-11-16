<!--
	Two-column card grid that collapses to one column on phones.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		columns?: 1 | 2 | 3;
		children: Snippet;
	}

	let { columns = 2, children }: Props = $props();
</script>

<div class="ui-grid" style:--cols={columns}>
	{@render children()}
</div>

<style>
	.ui-grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		gap: var(--ui-space-4);
		margin-top: var(--ui-space-6);
	}
	@media print {
		.ui-grid {
			display: block;
			margin-top: 0;
		}
	}
	@media (max-width: 650px) {
		.ui-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
