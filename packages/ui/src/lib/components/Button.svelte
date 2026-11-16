<!--
	Terminal button. Renders an <a> when `href` is set, otherwise a <button>.
	Label is wrapped in brackets: [ VIEW RESUME ].
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Common = {
		variant?: 'primary' | 'default' | 'secondary';
		brackets?: boolean;
		children: Snippet;
	};
	type Props = Common &
		(
			| ({ href: string } & Omit<HTMLAnchorAttributes, 'children'>)
			| ({ href?: undefined } & Omit<HTMLButtonAttributes, 'children'>)
		);

	let {
		variant = 'default',
		brackets = true,
		children,
		class: className,
		...rest
	}: Props = $props();
</script>

{#snippet label()}
	{brackets ? '[ ' : ''}{@render children()}{brackets ? ' ]' : ''}
{/snippet}

{#if rest.href !== undefined}
	<a class={['ui-btn', `v-${variant}`, className]} {...rest as HTMLAnchorAttributes}>
		{@render label()}
	</a>
{:else}
	<button
		type="button"
		class={['ui-btn', `v-${variant}`, className]}
		{...rest as HTMLButtonAttributes}
	>
		{@render label()}
	</button>
{/if}

<style>
	.ui-btn {
		display: inline-flex;
		align-items: center;
		gap: var(--ui-space-2);
		border: 1px solid var(--ui-crust-bright);
		padding: 8px 12px;
		background: #21130d;
		color: var(--ui-hot);
		cursor: pointer;
		box-shadow: 0 0 16px #ff65200c;
		font-size: var(--ui-text-sm);
		line-height: 1.4;
		text-transform: uppercase;
		white-space: nowrap;
		transition:
			background 0.15s,
			color 0.15s,
			box-shadow 0.15s;
	}
	.ui-btn:hover,
	.v-primary {
		background: var(--ui-lava);
		color: var(--ui-on-lava);
		border-color: var(--ui-hot);
		box-shadow: 0 0 22px #ff5e3152;
		text-shadow: none;
	}
	.v-primary:hover {
		background: var(--ui-hot);
		color: var(--ui-on-lava);
	}
	.v-secondary {
		color: var(--ui-muted);
		border-color: var(--ui-crust);
	}
	.ui-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		pointer-events: none;
	}
</style>
