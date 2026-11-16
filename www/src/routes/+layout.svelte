<script lang="ts">
	import '@amber/ui/styles.css';
	import './layout.css';
	import { Shell } from '@amber/ui';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Shell>
	{@render children()}
</Shell>
