<!-- Living style guide for @amber/ui. Not linked from the home page. -->
<script lang="ts">
	import {
		Button,
		ButtonRow,
		Card,
		DataList,
		DisplayHeading,
		Grid,
		Hero,
		JsonView,
		Meter,
		NumberedList,
		SectionNav,
		StatusBadge,
		StatusDot,
		Swatch,
		TagList,
		Text,
		Timeline,
		TimelineEntry
	} from '@amber/ui';

	const palette = [
		{ name: 'Basalt', color: '#100d0b' },
		{ name: 'Crust', color: '#482618' },
		{ name: 'Molten', color: '#eb492e' },
		{ name: 'Lava', color: '#ff6a24', glow: true },
		{ name: 'Hot', color: '#ff8a38' },
		{ name: 'Gold', color: '#ffbd66' },
		{ name: 'Muted', color: '#c1764f' },
		{ name: 'Dim', color: '#8f4c30' },
		{ name: 'Text', color: '#ffead8' },
		{ name: 'Incandescent', color: '#fff1cf', glow: true }
	];
</script>

<svelte:head><title>Design system</title></svelte:head>

<Hero eyebrow="Design system // @amber/ui" title={['LAVA', 'GLOW']}>
	{#snippet lede()}
		<p>
			A terminal interface forged in volcanic orange. Deep charcoal, glowing magma, and warm
			incandescent highlights.
		</p>
	{/snippet}
</Hero>

<SectionNav
	items={[
		{ href: '#palette', label: 'Color' },
		{ href: '#type', label: 'Type' },
		{ href: '#components', label: 'Components' },
		{ href: '#data', label: 'Data' },
		{ href: '#principles', label: 'Principles' }
	]}
/>

<Grid>
	<Card label="Lava-lake palette" id="palette" wide>
		<div class="palette">
			{#each palette as s (s.name)}
				<Swatch name={s.name.toUpperCase()} color={s.color} glow={s.glow} />
			{/each}
		</div>
	</Card>

	<Card label="Type system" id="type">
		<div class="typeline">
			<DisplayHeading level={3} size="md" cursor={false}>Aa 09</DisplayHeading>
			<Text as="span">VT323 / display</Text>
		</div>
		<div class="typeline">
			<Text as="span" tone="bright">IBM Plex Mono</Text><Text as="span">400 · 500 · 600</Text>
		</div>
		<Text>Mono for the interface. Pixel display type for a little heat.</Text>
		<Text tone="dim" size="xs">Tones: default · muted · dim · bright</Text>
	</Card>

	<Card label="Interface elements" id="components">
		<ButtonRow>
			<Button variant="primary">View resume</Button>
			<Button href="#components">Download PDF</Button>
			<Button variant="secondary">Contact</Button>
			<Button disabled>Disabled</Button>
		</ButtonRow>
		<StatusBadge>Available for opportunities</StatusBadge>
		<p class="dots">
			<StatusDot />
			<StatusDot tone="gold" />
			<StatusDot tone="molten" pulse />
			<StatusDot tone="dim" />
		</p>
		<TagList tags={['TypeScript', 'Svelte', 'Node.js', 'Workers']} />
		<Meter label="Frontend" value={92} />
		<Meter label="Backend" value={78} />
	</Card>

	<Card label="Timeline" wide>
		<Timeline>
			<TimelineEntry
				meta="2022—NOW · SAN FRANCISCO, CA"
				title="Senior Product Engineer"
				org="Ember Labs"
				highlights={['Bullet highlights render with a dim chevron']}
				tags={['React', 'Design systems']}
			>
				<p>Body copy sits in warm rust.</p>
			</TimelineEntry>
			<TimelineEntry marker="*" meta="2019—2022" title="Custom marker" org="Fieldwork" />
		</Timeline>
	</Card>

	<Card label="Data" id="data">
		<DataList
			items={[
				{ label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
				{ label: 'Location', value: 'San Francisco, CA' }
			]}
		/>
	</Card>

	<Card label="JSON view">
		<JsonView value={{ basics: { name: 'Ada', remote: true, years: 9 }, skills: ['svelte'] }} />
	</Card>

	<Card label="Design principles" id="principles" wide>
		<NumberedList
			items={[
				'Lava orange is the signal, not the wallpaper.',
				'Use incandescent cream for names and key headings.',
				'Dates and metadata recede into warm rust.',
				'Glow is atmospheric; contrast stays accessible.'
			]}
		/>
		<Text tone="dim" size="2xs">
			SCANLINES OPTIONAL (html[data-scanlines=off]) · REDUCED MOTION RESPECTED · PRINT FRIENDLY
		</Text>
	</Card>
</Grid>

<style>
	.palette {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 8px;
	}
	.typeline {
		display: flex;
		align-items: baseline;
		gap: 16px;
		border-bottom: 1px solid var(--ui-rule);
		padding: 8px 0;
	}
	.typeline :global(.ui-text) {
		margin: 0;
	}
	.dots {
		display: flex;
		gap: 12px;
		margin: 16px 0;
	}
</style>
