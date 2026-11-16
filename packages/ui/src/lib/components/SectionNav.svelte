<!--
	Numbered in-page nav ("01 / COLOR"). With `spy` (default) the link for the
	section currently in view is highlighted.
-->
<script lang="ts">
	import type { NavItem } from '../types.ts';

	interface Props {
		items: NavItem[];
		label?: string;
		/** Highlight the section in view (only for `#hash` links) */
		spy?: boolean;
		numbered?: boolean;
	}

	let { items, label = 'Sections', spy = true, numbered = true }: Props = $props();

	let active = $state<string | undefined>(undefined);
	const current = $derived(active ?? items[0]?.href);

	$effect(() => {
		if (!spy) return;
		const targets = items
			.filter((i) => i.href.startsWith('#'))
			.map((i) => document.getElementById(i.href.slice(1)))
			.filter((el): el is HTMLElement => !!el);
		if (!targets.length) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			// The active section is the last one whose top has passed 30% of the viewport.
			const line = window.innerHeight * 0.3;
			let id = targets[0].id;
			for (const t of targets) if (t.getBoundingClientRect().top <= line) id = t.id;
			// At the very bottom, the last section wins even if it is short.
			if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
				id = targets[targets.length - 1].id;
			}
			active = `#${id}`;
		};
		const onScroll = () => (frame ||= requestAnimationFrame(update));

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

<nav class="ui-nav" aria-label={label} data-print="hide">
	{#each items as item, i (item.href)}
		<a href={item.href} aria-current={current === item.href ? 'location' : undefined}>
			{numbered ? `${pad(i + 1)} / ` : ''}{item.label}
		</a>
	{/each}
</nav>

<style>
	.ui-nav {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		gap: 24px;
		border-block: 1px solid var(--ui-crust);
		padding: 12px 0;
		font-size: var(--ui-text-xs);
		text-transform: uppercase;
		background: color-mix(in srgb, var(--ui-basalt) 88%, transparent);
		backdrop-filter: blur(6px);
	}
	a {
		color: var(--ui-muted);
		white-space: nowrap;
	}
	a[aria-current] {
		color: var(--ui-hot);
		text-shadow: var(--ui-glow-sm);
	}
	@media (max-width: 650px) {
		.ui-nav {
			gap: 13px;
			overflow-x: auto;
			scrollbar-width: none;
		}
	}
</style>
