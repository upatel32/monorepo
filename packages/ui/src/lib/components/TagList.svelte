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
</style>
