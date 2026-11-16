<!--
	Résumé header that only appears when printing / saving as PDF: name, title, one contact line
	and the summary. The web hero (giant pixel name, buttons) is hidden in print instead.

	Email/phone stay encoded until the browser is about to print, so they're still not in the HTML.
-->
<script lang="ts">
	import type { Basics } from '../types.ts';
	import { revealContact, type HiddenContact } from '../privacy.ts';
	import { formatLocation, prettyUrl } from '../format.ts';

	interface Props {
		basics: Basics;
		hidden?: HiddenContact;
	}

	let { basics, hidden = {} }: Props = $props();

	let revealed = $state<{ email?: string; phone?: string }>({});

	$effect(() => {
		const reveal = () => {
			revealed = {
				email: hidden.email && revealContact(hidden.email),
				phone: hidden.phone && revealContact(hidden.phone)
			};
		};
		// Name the PDF "Jane Doe - Resume.pdf" rather than after the page title.
		const original = document.title;
		const before = () => {
			reveal();
			if (basics.name) document.title = `${basics.name} - Resume`;
		};
		const after = () => (document.title = original);
		const media = matchMedia('print');
		const onMedia = (e: MediaQueryListEvent) => (e.matches ? before() : after());

		addEventListener('beforeprint', before);
		addEventListener('afterprint', after);
		media.addEventListener('change', onMedia);
		return () => {
			removeEventListener('beforeprint', before);
			removeEventListener('afterprint', after);
			media.removeEventListener('change', onMedia);
		};
	});

	const contact = $derived(
		[
			formatLocation(basics.location),
			revealed.email,
			revealed.phone,
			prettyUrl(basics.url),
			...(basics.profiles ?? []).map((p) => prettyUrl(p.url) || p.username)
		].filter((v): v is string => !!v)
	);
</script>

<header class="print-header" data-print="only">
	<h1>{basics.name ?? 'Resume'}</h1>
	{#if basics.label}<p class="label">{basics.label}</p>{/if}
	{#if contact.length}
		<ul class="contact">
			{#each contact as item (item)}<li>{item}</li>{/each}
		</ul>
	{/if}
	{#if basics.summary}<p class="summary">{basics.summary}</p>{/if}
</header>

<style>
	.print-header {
		margin-bottom: 14pt;
	}
	h1 {
		margin: 0;
		font: 600 20pt / 1.1 var(--ui-font-mono);
		letter-spacing: -0.01em;
		color: var(--ui-incandescent);
	}
	.label {
		margin: 2pt 0 0;
		font: 500 10.5pt / 1.3 var(--ui-font-mono);
		color: var(--ui-lava);
	}
	.contact {
		display: flex;
		flex-wrap: wrap;
		margin: 6pt 0 0;
		padding: 0;
		list-style: none;
		font: 8.5pt / 1.4 var(--ui-font-mono);
		color: var(--ui-muted);
	}
	.contact li + li::before {
		content: '·';
		margin: 0 0.6em;
		color: var(--ui-dim);
	}
	.summary {
		margin: 9pt 0 0;
		color: var(--ui-muted);
	}
</style>
