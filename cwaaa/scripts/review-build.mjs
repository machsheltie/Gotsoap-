#!/usr/bin/env node
/**
 * review-build.mjs — the owner's asset drop-in worksheet.
 *
 * `npm run build` is the public site: an unshipped photograph renders as an
 * honest absence and no production note reaches a visitor. This build sets
 * CW_SLOT_SPECS=1 instead, so every empty ImageSlot shows its graphics ID,
 * shot spec, and dashed safe zone from GRAPHICS-TO-MAKE.md.
 *
 * Why a script and not `CW_SLOT_SPECS=1 astro build`: npm scripts run through
 * cmd.exe on Windows, where the inline VAR=value prefix is not a thing. And
 * why Astro's own .mjs entry rather than `npx`: Node >= 18.20 refuses to
 * spawn a .cmd shim without a shell (CVE-2024-27980 hardening) and answers
 * EINVAL, which is the same trap the reader extraction script documents.
 *
 * Output goes to dist/ like any build. Never deploy the result.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/* astro/package.json does not export ./bin/*, so resolve the file directly. */
const here = dirname(fileURLToPath(import.meta.url));
const astroBin = join(here, '..', 'node_modules', 'astro', 'bin', 'astro.mjs');
if (!existsSync(astroBin)) {
  console.error(`review-build: cannot find Astro at ${astroBin}. Run npm install in cwaaa/.`);
  process.exit(1);
}

const child = spawn(process.execPath, [astroBin, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, CW_SLOT_SPECS: '1' },
});

child.on('exit', (code) => process.exit(code ?? 1));
