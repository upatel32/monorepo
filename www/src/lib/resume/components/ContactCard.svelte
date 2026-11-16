<script lang="ts">
	import { Card, DataList, type DataItem } from '@amber/ui';
	import type { Basics } from '../types.ts';
	import { formatLocation, prettyUrl } from '../format.ts';

	interface Props {
		basics: Basics;
		id?: string;
	}

	let { basics, id = 'contact' }: Props = $props();

	const items = $derived.by(() => {
		const rows: DataItem[] = [];
		if (basics.email)
			rows.push({ label: 'Email', value: basics.email, href: `mailto:${basics.email}` });
		if (basics.phone)
			rows.push({ label: 'Phone', value: basics.phone, href: `tel:${basics.phone}` });
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

{#if items.length}
	<Card label="Contact" {id}>
		<DataList {items} />
	</Card>
{/if}
