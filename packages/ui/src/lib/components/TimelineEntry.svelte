<!--
	One timeline item.
	<TimelineEntry meta="2022—NOW · SAN FRANCISCO" title="Senior Engineer" org="Ember Labs" tags={[…]}>
		Body copy…
	</TimelineEntry>
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import TagList from './TagList.svelte';

	interface Props {
		/** Date range / location line */
		meta?: string;
		title: string;
		/** Rendered as "title @ org" */
		org?: string;
		orgHref?: string;
		tags?: string[];
		/** Bullet list under the body */
		highlights?: string[];
		marker?: string;
		children?: Snippet;
	}

	let {
		meta,
		title,
		org,
		orgHref,
		tags = [],
		highlights = [],
		marker = '+',
		children
	}: Props = $props();
</script>

<li class="ui-entry" style:--marker={`'${marker}'`}>
	{#if meta}<div class="meta">{meta}</div>{/if}
	<h3 class="title">
		{title}{#if org}
			{' '}<span class="at">@</span>{' '}<span class="org"
				>{#if orgHref}<a href={orgHref}>{org}</a>{:else}{org}{/if}</span
			>
		{/if}
	</h3>
	{#if children}<div class="body">{@render children()}</div>{/if}
	{#if highlights.length}
		<ul class="highlights">
			{#each highlights as h, i (i)}<li>{h}</li>{/each}
		</ul>
	{/if}
	<TagList {tags} />
</li>

<style>
	.ui-entry {
		position: relative;
		padding-bottom: 18px;
	}
	.ui-entry:last-child {
		padding-bottom: 0;
	}
	.ui-entry::before {
		content: var(--marker);
		position: absolute;
		left: -27px;
		top: 0;
		color: var(--ui-lava);
		background: var(--ui-panel);
		padding: 0 3px;
		line-height: 1.7;
	}
	.meta {
		color: var(--ui-dim);
		font-size: var(--ui-text-2xs);
		text-transform: uppercase;
	}
	.title {
		margin: 0;
		font-size: var(--ui-text-sm);
		font-weight: 500;
		color: var(--ui-incandescent);
	}
	.at {
		color: var(--ui-dim);
	}
	.body {
		color: var(--ui-muted);
		margin: 4px 0;
	}
	.body :global(p) {
		margin: 4px 0;
	}
	.highlights {
		margin: 6px 0 8px;
		padding: 0;
		list-style: none;
		color: var(--ui-muted);
	}
	.highlights li {
		position: relative;
		padding-left: 16px;
	}
	.highlights li::before {
		content: '>';
		position: absolute;
		left: 0;
		color: var(--ui-dim);
	}
	@media print {
		/* Title left, dates right, everything else full width below. */
		.ui-entry {
			display: grid;
			grid-template-columns: 1fr auto;
			column-gap: 12pt;
			padding-bottom: 9pt;
		}
		.ui-entry > :global(*) {
			grid-column: 1 / -1;
		}
		.ui-entry::before {
			content: none;
		}
		.title {
			grid-column: 1;
			grid-row: 1;
			font: 600 10pt / 1.3 var(--ui-font-print);
			break-after: avoid;
		}
		.meta {
			grid-column: 2;
			grid-row: 1;
			align-self: baseline;
			font: 8pt / 1.3 var(--ui-font-mono);
			letter-spacing: 0.02em;
			text-transform: none;
			color: var(--ui-dim);
			white-space: nowrap;
		}
		.at {
			font-size: 0;
		}
		.at::after {
			content: '·';
			font-size: 10pt;
			color: var(--ui-dim);
		}
		.org {
			font-weight: 400;
			color: var(--ui-lava);
		}
		.body {
			margin: 2pt 0 0;
			color: var(--ui-muted);
		}
		.body :global(p) {
			margin: 0;
		}
		.highlights {
			margin: 3pt 0 0;
			color: var(--ui-muted);
		}
		.highlights li {
			padding-left: 11pt;
			margin-top: 2pt;
			break-inside: avoid;
		}
		.highlights li::before {
			content: '•';
			color: var(--ui-lava);
		}
	}
</style>
