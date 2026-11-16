<script lang="ts">
	import { Card, DataList, type DataItem } from '@amber/ui';
	import type { Basics } from '../types.ts';
	import type { HiddenContact } from '../privacy.ts';
	import { formatLocation, prettyUrl } from '../format.ts';
	import RevealContact from './RevealContact.svelte';

	interface Props {
		basics: Basics;
		/** Email / phone, encoded server-side so they aren't scrapeable */
		hidden?: HiddenContact;
		id?: string;
	}

	let { basics, hidden = {}, id = 'contact' }: Props = $props();

	const items = $derived.by(() => {
		const rows: DataItem[] = [];
		if (hidden.email) rows.push({ label: 'Email', value: '', render: email });
		if (hidden.phone) rows.push({ label: 'Phone', value: '', render: phone });
		if (basics.url) rows.push({ label: 'Web', value: prettyUrl(basics.url), href: basics.url });
		const loc = formatLocation(basics.location);
		if (loc) rows.push({ label: 'Location', value: loc });
		for (const p of basics.profiles ?? []) {
			if (!p.network) continue;
			rows.push({ label: p.network, value: p.username ?? prettyUrl(p.url), href: p.url });
		}
		return rows;
	});
</script>

{#snippet email()}<RevealContact code={hidden.email!} kind="email" />{/snippet}
{#snippet phone()}<RevealContact code={hidden.phone!} kind="phone" />{/snippet}

{#if items.length}
	<Card label="Contact" {id}>
		<DataList {items} />
	</Card>
{/if}
