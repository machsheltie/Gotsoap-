#!/usr/bin/env node
/**
 * extract-site-text.mjs — give a reader what a VISITOR reads.
 *
 * WHY THIS EXISTS
 * A reader-sim handed `copy.ts` is reading a TypeScript module, not a website: no order, no
 * context, no sense of what you hit first and what you never scroll to. The felt experience —
 * which is the entire point of these personas — lives in the rendered page, in visitor order.
 *
 * So: rebuild `dist/`, strip the machinery, keep the words. Alt text and aria-labels are kept as
 * [image alt: …] / [label: …] because a real reader (and a screen-reader user) encounters them.
 *
 * Run from the repo root:
 *   node .claude/skills/gotsoap-readers/scripts/extract-site-text.mjs
 *
 * Prints the output directory. Hand that path to the reader-sim agents.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const SITE = existsSync('site/package.json') ? 'site' : '.';
const DIST = join(SITE, 'dist');

// Rebuild so the readers never review a stale site — a reaction to last week's copy is a lie.
// execFileSync with an arg array (no shell) — nothing here is interpolated, and it stays that way.
// HARD FAIL on build failure (2026-07-27): silently extracting a stale dist/ hands the blind
// readers last week's site as if it were this one — the compensating control would be reading
// the wrong artifact. No build, no extraction.
try {
  // Windows note: Node ≥18.20 refuses to execFile a .cmd without a shell
  // (CVE-2024-27980 hardening) — that EINVAL is what silently killed the
  // build step here and let the old fallback extract stale dist. The command
  // is a static literal; nothing user-controlled reaches the shell.
  if (process.platform === 'win32') execSync('npm run build', { cwd: SITE, stdio: 'ignore' });
  else execFileSync('npm', ['run', 'build'], { cwd: SITE, stdio: 'ignore' });
} catch {
  console.error('BUILD FAILED — refusing to extract: dist/ would be stale and the blind read would be a lie.');
  console.error('Fix the build, then re-run.');
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error(`no ${DIST}/ — run the build first`);
  process.exit(1);
}

const OUT = join(tmpdir(), 'gotsoap-sitetext');
mkdirSync(OUT, { recursive: true });

const pages = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    statSync(p).isDirectory() ? walk(p) : n.endsWith('.html') && pages.push(p);
  }
})(DIST);

for (const p of pages) {
  let h = readFileSync(p, 'utf8');

  // Machinery the reader never sees.
  h = h.replace(/<script[\s\S]*?<\/script>/gi, ' ')
       .replace(/<style[\s\S]*?<\/style>/gi, ' ')
       .replace(/<!--[\s\S]*?-->/g, ' ');

  // The reader DOES encounter these — keep them, marked.
  h = h.replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_m, a) => (a ? ` [image alt: ${a}] ` : ' [decorative image] '));
  h = h.replace(/aria-label="([^"]*)"/gi, ' [label: $1] ');

  // Declared value-bearing carriers (2026-07-27): the share sheet a visitor triggers, the
  // scratch-gag rotation, and the field↔alert wiring are all real user-facing copy that lived
  // only in attributes — the blind read could not observe them, so a transposed carrier was
  // invisible to the compensating control. Surface each, marked, right after its element.
  h = h.replace(/<[a-z][^>]*>/gi, (tag) => {
    let out = tag;
    for (const [attr, label] of [
      ['data-share-title', 'share title'],
      ['data-share-text', 'share text'],
      ['data-rotation', 'scratch-gag rotation'],
    ]) {
      const m = tag.match(new RegExp('\\s' + attr + '="([^"]*)"', 'i'));
      if (m && m[1] !== '') out += ` [${label}: ${m[1]}] `;
    }
    const ef = tag.match(/\sdata-error-for="([^"]*)"/i);
    if (ef) out += ` [alert for the ${ef[1]} field:] `;
    const sa = tag.match(/\sdata-share-action="([^"]*)"/i);
    if (sa) out += ` [${sa[1]}-action button:] `;
    return out;
  });

  // Block elements become line breaks so reading order survives.
  h = h.replace(/<(h[1-6]|p|li|div|section|header|footer|button|a|span|td|th|tr|dialog|figcaption)\b[^>]*>/gi, '\n')
       .replace(/<[^>]+>/g, ' ');

  h = h.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'")
       .replace(/&quot;/g, '"').replace(/&middot;/g, '·').replace(/&[a-z]+;/gi, ' ');

  h = h.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');
  h = h.replace(/\n{3,}/g, '\n\n');

  const route = '/' + relative(DIST, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
  const name = (relative(DIST, p).replace(/\\/g, '/').replace(/\//g, '_').replace(/\.html$/, '')) || 'index';
  writeFileSync(join(OUT, `${name}.txt`), `=== PAGE: ${route} ===\n\n${h}`);
}

console.log(`extracted ${pages.length} pages →\n${OUT}`);
console.log('\nHand that path to the reader-sim agents. Suggest they start at index.txt and follow their own curiosity.');
