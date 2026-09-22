#!/usr/bin/env node
/**
 * launch-check.mjs — the two things that must be empty before CWAAA launches.
 *
 * This gate is RED ON PURPOSE until the owner supplies four facts and `/about`
 * exists. It is not wired into `npm run build`, because a red launch gate must
 * not stop ordinary work; run it deliberately with `npm run launch-check`.
 *
 * 1. PENDING FACTS. The legal four render owner-only facts as visible
 *    `[pending: …]` markers rather than inventing them (brief:
 *    .impeccable/surfaces/cwaaa-src-pages-privacy-astro.md §3, §8). Every
 *    marker carries data-pending, and this counts them. Shipping a privacy
 *    policy or a DMCA agent block with a fabricated address would be worse
 *    than shipping three pages, so the markers are the deliverable until the
 *    facts arrive.
 *
 * 2. DEAD INTERNAL LINKS. Every href the built site points at itself with
 *    must resolve to a built page. Three are known and documented, and all
 *    three come from the shared Nav and Footer, so every page inherits them
 *    rather than any one route introducing a bad link: `/tie-one-on` waits on
 *    CW-G03 cloth photography, `/chapters` on CW-G05–G08, and `/about` on the
 *    CW-D04 roster and the owner's creator-seam call. The legal four add none
 *    of their own and deliberately do not link to About.
 *
 * Run `npm run build` first: this reads dist/, not src/.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '..', 'dist');

if (!existsSync(dist)) {
  console.error('launch-check: no dist/. Run `npm run build` first.');
  process.exit(1);
}

/** Every .html file under dist/, depth-first. */
async function pages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await pages(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const html = await pages(dist);
const pending = [];
const dead = new Map();

/** A built route resolves as /foo/index.html, /foo.html, or a real asset. */
const resolves = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return existsSync(join(dist, 'index.html'));
  const rel = clean.replace(/^\/+/, '').replace(/\/+$/, '');
  return (
    existsSync(join(dist, rel)) ||
    existsSync(join(dist, `${rel}.html`)) ||
    existsSync(join(dist, rel, 'index.html'))
  );
};

for (const file of html) {
  const body = await readFile(file, 'utf8');
  const route = `/${relative(dist, file).replace(/\\/g, '/').replace(/(index)?\.html$/, '')}`;

  for (const m of body.matchAll(/data-pending="([^"]+)"/g)) {
    pending.push({ route, fact: m[1] });
  }
  for (const m of body.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;
    if (/\.(css|js|svg|png|jpe?g|webp|avif|woff2?|ico|xml|txt|json)$/i.test(href)) continue;
    if (!resolves(href)) {
      if (!dead.has(href)) dead.set(href, new Set());
      dead.get(href).add(route);
    }
  }
}

const facts = [...new Set(pending.map((p) => p.fact))].sort();
console.log(`launch-check — ${html.length} built pages\n`);

console.log(`PENDING FACTS — ${facts.length} open, ${pending.length} markers rendered`);
for (const fact of facts) {
  const where = [...new Set(pending.filter((p) => p.fact === fact).map((p) => p.route))];
  console.log(`  · ${fact}  →  ${where.join(', ')}`);
}

console.log(`\nDEAD INTERNAL LINKS — ${dead.size}`);
for (const [href, from] of dead) console.log(`  · ${href}  ←  ${[...from].join(', ')}`);

const blocked = facts.length > 0 || dead.size > 0;
console.log(
  blocked
    ? '\nNot launch-ready. Supply the facts above and build the missing routes.'
    : '\nLaunch-ready: no pending facts, no dead internal links.',
);
process.exit(blocked ? 1 : 0);
