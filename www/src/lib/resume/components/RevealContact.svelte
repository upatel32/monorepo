<!--
	Shows an encoded email / phone only after a click, so the address never appears in the HTML.
	Renders a link once revealed.
-->
<script lang="ts">
	import { revealContact } from '../privacy.ts';

	interface Props {
		/** From `HiddenContact` */
		code: string;
		kind: 'email' | 'phone';
	}

	let { code, kind }: Props = $props();

	let value = $state<string>();
	const href = $derived(value && (kind === 'email' ? `mailto:${value}` : `tel:${value}`));
</script>

{#if value}
	<a {href} rel="external">{value}</a>
{:else}
	<button type="button" class="reveal" onclick={() => (value = revealContact(code))}>
		[ reveal {kind} ]
	</button>
{/if}

<style>
	.reveal {
		padding: 0;
		border: 0;
		background: none;
		color: var(--ui-hot);
		cursor: pointer;
		font-size: inherit;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.reveal:hover {
		color: var(--ui-incandescent);
		text-shadow: 0 0 12px #ff702b;
	}
</style>
