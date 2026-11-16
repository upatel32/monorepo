<!--
	Bordered status pill with a glowing dot: ● AVAILABLE FOR OPPORTUNITIES
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Tone } from '../types.ts';
	import StatusDot from './StatusDot.svelte';

	interface Props {
		tone?: Tone;
		pulse?: boolean;
		children: Snippet;
	}

	let { tone = 'lava', pulse = true, children }: Props = $props();
</script>

<div class="ui-status" role="status">
	<StatusDot {tone} {pulse} />
	<span>{@render children()}</span>
</div>

<style>
	.ui-status {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		border: 1px solid var(--ui-crust);
		padding: 5px 9px;
		color: var(--ui-gold);
		background: #ff762008;
		text-transform: uppercase;
		font-size: var(--ui-text-xs);
		letter-spacing: 0.06em;
	}
</style>
