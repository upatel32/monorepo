/**
 * Remove the previous Cloudflare build output.
 *
 * `wrangler types` adds a `GlobalProps.mainModule` entry to worker-configuration.d.ts only when
 * .svelte-kit/cloudflare/_worker.js exists. The committed file is generated without a build
 * (as on a fresh checkout or in CI), so a leftover build made `wrangler types --check` report
 * "out of date" on every second local build or check. svelte-check also type-checks that
 * generated output and reports hundreds of bogus errors. Clearing it first fixes both.
 *
 * Nothing here is source: `vite build` regenerates it. Run `yarn build` again before `yarn preview`.
 */
import { rmSync } from 'node:fs';

for (const dir of ['.svelte-kit/cloudflare', '.svelte-kit/cloudflare-tmp', '.svelte-kit/output']) {
	rmSync(new URL(`../${dir}`, import.meta.url), { recursive: true, force: true });
}
