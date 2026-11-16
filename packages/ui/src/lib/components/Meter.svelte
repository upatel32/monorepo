<!--
	Labelled lava gradient bar: FRONTEND ▓▓▓▓▓▓▓░ 92%
-->
<script lang="ts">
	interface Props {
		label: string;
		/** 0–100 */
		value: number;
		showValue?: boolean;
	}

	let { label, value, showValue = true }: Props = $props();
	const pct = $derived(Math.max(0, Math.min(100, Math.round(value))));
</script>

<div class="ui-meter">
	<span class="label">{label}</span>
	<div
		class="track"
		role="meter"
		aria-label={label}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={pct}
	>
		<div class="fill" style:width="{pct}%"></div>
	</div>
	{#if showValue}<span class="value">{pct}%</span>{/if}
</div>

<style>
	.ui-meter {
		display: flex;
		align-items: center;
		gap: var(--ui-space-3);
		margin: 9px 0;
	}
	.label {
		width: 95px;
		flex: none;
		color: var(--ui-muted);
		font-size: var(--ui-text-2xs);
		text-transform: uppercase;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.track {
		height: 7px;
		background: #35190f;
		flex: 1;
	}
	.fill {
		height: 100%;
		background: var(--ui-meter-gradient);
		box-shadow: 0 0 12px #ff641e66;
	}
	.value {
		width: 3.5ch;
		text-align: right;
		color: var(--ui-hot);
		text-shadow: var(--ui-glow-sm);
		font-size: var(--ui-text-2xs);
	}
	@media print {
		.track {
			border: 1px solid var(--ui-crust);
			background: none;
		}
		.fill {
			background: var(--ui-lava);
		}
	}
</style>
