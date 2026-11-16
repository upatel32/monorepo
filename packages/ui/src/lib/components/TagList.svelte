<!--
	A list of Tags from an array of strings.
-->
<script lang="ts">
	import Tag from './Tag.svelte';

	interface Props {
		tags: string[];
		label?: string;
	}

	let { tags, label = 'Tags' }: Props = $props();
</script>

{#if tags.length}
	<ul class="ui-taglist" aria-label={label}>
		{#each tags as tag (tag)}
			<li><Tag>{tag}</Tag></li>
		{/each}
	</ul>
{/if}

<style>
	.ui-taglist {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0 -3px;
		padding: 0;
	}
	@media print {
		/* Flowing text: "TypeScript · React · Node.js". The dot hangs off the previous item
		   (joined by a no-break space) so wrapped lines never start with a separator. */
		.ui-taglist {
			display: block;
			margin: 2pt 0 0;
		}
		li {
			display: inline;
		}
		li:not(:last-child)::after {
			content: '\00a0·';
			margin-right: 0.45em;
			color: var(--ui-dim);
		}
	}
</style>
