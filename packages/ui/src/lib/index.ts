// Lava glow design system.
// Import '@amber/ui/styles.css' once at your app root, then use the components.

// Layout
export { default as Shell } from './components/Shell.svelte';
export { default as TopBar } from './components/TopBar.svelte';
export { default as SectionNav } from './components/SectionNav.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as Grid } from './components/Grid.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Footer } from './components/Footer.svelte';

// Typography
export { default as DisplayHeading } from './components/DisplayHeading.svelte';
export { default as Eyebrow } from './components/Eyebrow.svelte';
export { default as SectionLabel } from './components/SectionLabel.svelte';
export { default as Text } from './components/Text.svelte';
export { default as Glow } from './components/Glow.svelte';

// Controls & indicators
export { default as Button } from './components/Button.svelte';
export { default as ButtonRow } from './components/ButtonRow.svelte';
export { default as Tag } from './components/Tag.svelte';
export { default as TagList } from './components/TagList.svelte';
export { default as StatusDot } from './components/StatusDot.svelte';
export { default as StatusBadge } from './components/StatusBadge.svelte';
export { default as Meter } from './components/Meter.svelte';

// Data display
export { default as Timeline } from './components/Timeline.svelte';
export { default as TimelineEntry } from './components/TimelineEntry.svelte';
export { default as DataList } from './components/DataList.svelte';
export { default as NumberedList } from './components/NumberedList.svelte';
export { default as JsonView } from './components/JsonView.svelte';
export { default as Swatch } from './components/Swatch.svelte';

export type { NavItem, DataItem, Tone } from './types.ts';
