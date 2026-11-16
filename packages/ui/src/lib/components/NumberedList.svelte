<!--
	"01  Lava orange is the signal…" — glowing index numbers.
-->
<script lang="ts">
	interface Props {
		items: string[];
	}

	let { items }: Props = $props();
	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<ol class="ui-numbered">
	{#each items as item, i (i)}
		<li><span class="n">{pad(i + 1)}</span><span>{item}</span></li>
	{/each}
</ol>

<style>
	.ui-numbered {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		display: flex;
		gap: 1.5ch;
		margin: 0 0 0.75em;
	}
	.n {
		color: var(--ui-hot);
		text-shadow: var(--ui-glow-sm);
	}
</style>
