<!--
	Syntax-highlighted JSON. Pass any serialisable `value`, or a raw `source` string.
-->
<script lang="ts">
	interface Props {
		value?: unknown;
		source?: string;
		indent?: number;
		/** Max height before scrolling, e.g. "320px" */
		maxHeight?: string;
	}

	let { value, source, indent = 2, maxHeight }: Props = $props();

	const escape = (s: string) =>
		s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	const html = $derived.by(() => {
		const text = source ?? JSON.stringify(value, null, indent) ?? '';
		return escape(text).replace(
			/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
			(m, str: string | undefined, colon: string | undefined, lit, num) => {
				if (str)
					return colon ? `<span class="k">${str}</span>${colon}` : `<span class="s">${str}</span>`;
				if (lit) return `<span class="l">${m}</span>`;
				if (num) return `<span class="n">${m}</span>`;
				return m;
			}
		);
	});
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- input is escaped above -->
<pre class="ui-json" style:max-height={maxHeight}><code>{@html html}</code></pre>

<style>
	.ui-json {
		margin: 0;
		white-space: pre-wrap;
		overflow-wrap: anywhere;
		overflow: auto;
		padding: 14px;
		background: #100c0a;
		border: 1px solid var(--ui-rule);
		color: var(--ui-muted);
		font: var(--ui-text-2xs) / 1.7 var(--ui-font-mono);
	}
	.ui-json :global(.k) {
		color: var(--ui-gold);
	}
	.ui-json :global(.s) {
		color: var(--ui-hot);
	}
	.ui-json :global(.n),
	.ui-json :global(.l) {
		color: var(--ui-incandescent);
	}
</style>
