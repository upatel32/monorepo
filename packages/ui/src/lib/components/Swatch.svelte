<!--
	Palette swatch for style guides.
-->
<script lang="ts">
	interface Props {
		name: string;
		/** Any CSS colour, including var(--ui-lava) */
		color: string;
		/** Hex shown under the name (defaults to `color`) */
		code?: string;
		glow?: boolean;
	}

	let { name, color, code, glow = false }: Props = $props();
</script>

<figure class="ui-swatch">
	<div
		class="chip"
		style:background={color}
		style:box-shadow={glow ? `0 0 22px color-mix(in srgb, ${color} 50%, transparent)` : undefined}
	></div>
	<figcaption>
		<span class="name">{name}</span>
		<span class="code">{code ?? color}</span>
	</figcaption>
</figure>

<style>
	.ui-swatch {
		margin: 0;
		min-width: 0;
	}
	.chip {
		height: 70px;
		border: 1px solid #ffffff12;
		margin-bottom: 8px;
	}
	figcaption {
		display: flex;
		flex-direction: column;
		font-size: var(--ui-text-2xs);
		line-height: 1.5;
	}
	.name {
		color: var(--ui-muted);
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.code {
		color: var(--ui-dim);
		text-transform: uppercase;
	}
</style>
