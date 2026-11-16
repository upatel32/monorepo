<!--
	Glowing indicator dot. `pulse` adds a slow breathing animation.
-->
<script lang="ts">
	import type { Tone } from '../types.ts';

	interface Props {
		tone?: Tone;
		pulse?: boolean;
		label?: string;
	}

	let { tone = 'lava', pulse = false, label }: Props = $props();
</script>

<span
	class={['ui-dot', `tone-${tone}`, { pulse }]}
	role={label ? 'img' : undefined}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}
></span>

<style>
	.ui-dot {
		--dot: var(--ui-lava);
		display: inline-block;
		flex: none;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dot);
		box-shadow:
			0 0 10px var(--dot),
			0 0 24px color-mix(in srgb, var(--dot) 55%, transparent);
	}
	.tone-gold {
		--dot: var(--ui-gold);
	}
	.tone-molten {
		--dot: var(--ui-molten);
	}
	.tone-dim {
		--dot: var(--ui-dim);
		box-shadow: none;
	}
	.pulse {
		animation: ui-pulse 2.4s ease-in-out infinite;
	}
	@keyframes ui-pulse {
		50% {
			opacity: 0.55;
			box-shadow: 0 0 4px var(--dot);
		}
	}
</style>
