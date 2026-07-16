/**
 * distinguishability.mjs — the §14 marquee gate, as evidence instead of opinion.
 *
 * THE CLAUSE
 *   "The five 390 × 844 detail renders remain distinguishable when poster images
 *    are temporarily replaced by neutral rectangles."  — specs.md §14
 *
 * This is the gate the entire poster architecture rests on. §5.2 bans "one
 * configurable split-screen component"; §6 assigns each poster a distinct entry,
 * copy material, and type performance. If five routes collapse into one template
 * the moment you remove the photography, then the environments are decoration and
 * the spec was not built — it was re-skinned.
 *
 * Left as a judgment call, this gate is the defendant grading its own exam. So we
 * measure it, on two independent layers that fail for different reasons:
 *
 *   LAYER 1 — SOURCE.  Are the five .astro files actually five components?
 *     Normalizes away comments, whitespace, and the poster's own identifiers, then
 *     compares every pair by word-shingle Jaccard similarity. Catches the classic
 *     dodge: copy-paste one component five times and rename the nouns.
 *
 *   LAYER 2 — RENDER.  Do they LOOK like five places with the art removed?
 *     Reads the five 390×844 neutral-rectangle screenshots, converts to GRAYSCALE
 *     (a colour swap is not a signature — §6 demands structure), downsamples, and
 *     compares every pair by mean absolute pixel difference.
 *
 *   node scripts/distinguishability.mjs
 *
 * Layer 2 needs the screenshots. Produce them with Playwright at 390 × 844 with the
 * canonical posters neutralised, and save to:
 *     docs/build/reports/evidence/phase2-neutral-<slug>.png
 *
 *   await page.addStyleTag({ content:
 *     'img.poster-canonical{filter:grayscale(1)brightness(0)opacity(.28)!important}' });
 *
 * The thresholds below are CALIBRATABLE, and the matrices are always printed. The
 * numbers exist to make an argument checkable — they do not replace the argument.
 * If you think a pair is genuinely distinct and the metric disagrees, say so in the
 * build report and show the screenshots. Do not silently retune the threshold.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ENVS = [
  { slug: 'confident-man', comp: 'ConfidentEnvironment' },
  { slug: 'soap-smoldering', comp: 'SmolderingEnvironment' },
  { slug: 'unholy', comp: 'UnholyEnvironment' },
  { slug: 'redemption', comp: 'RedemptionEnvironment' },
  { slug: 'thirst-announcement', comp: 'ThirstEnvironment' },
];

const EVIDENCE = '../docs/build/reports/evidence';

/* Two environments more similar than this ARE the same component. */
const MAX_SOURCE_SIMILARITY = 0.7;
/* Two renders differing by less than this (of 255, grayscale) are one template. */
const MIN_RENDER_DIFF = 10;

let failures = 0;

/* ── Layer 1 — source ─────────────────────────────────────────────────────── */

/** Strip everything that lets a copy-paste disguise itself. */
function normalize(src, slug, comp) {
  return src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    // Kill the poster's own names — otherwise five identical files score as
    // "different" purely because the nouns changed. That is the dodge itself.
    .replace(new RegExp(slug, 'gi'), 'X')
    .replace(new RegExp(comp, 'gi'), 'X')
    .replace(/\b(confident|smoldering|unholy|redemption|thirst)\w*/gi, 'X')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Word-shingle Jaccard: order-insensitive, robust to reordering blocks. */
function shingles(text, n = 5) {
  const w = text.split(' ').filter(Boolean);
  const s = new Set();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(' '));
  return s;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

console.log('\n  §14 — the five environments must be five environments\n');
console.log('  LAYER 1 · SOURCE  (are they five components, or one renamed five times?)\n');

const missing = ENVS.filter((e) => !existsSync(join('src/components/psas', `${e.comp}.astro`)));
if (missing.length) {
  console.log(`  ✗ missing: ${missing.map((m) => `${m.comp}.astro`).join(', ')}`);
  console.log('    Nothing to compare. Build the five environments first.\n');
  process.exit(1);
}

const sigs = ENVS.map((e) => {
  const src = readFileSync(join('src/components/psas', `${e.comp}.astro`), 'utf8');
  return { ...e, sh: shingles(normalize(src, e.slug, e.comp)), loc: src.split('\n').length };
});

console.log('    ' + ENVS.map((e) => e.comp.slice(0, 6).padStart(7)).join(''));
for (let i = 0; i < sigs.length; i++) {
  let row = `    ${sigs[i].comp.slice(0, 4).padEnd(4)}`.padEnd(4);
  row = sigs[i].comp.slice(0, 4).padEnd(6);
  const cells = [];
  for (let j = 0; j < sigs.length; j++) {
    if (i === j) { cells.push('     — '); continue; }
    const s = jaccard(sigs[i].sh, sigs[j].sh);
    const bad = s > MAX_SOURCE_SIMILARITY;
    if (bad && j > i) failures++;
    cells.push((bad ? '!' : ' ') + s.toFixed(2).padStart(6));
  }
  console.log('  ' + row + cells.join(''));
}
console.log(`\n    threshold: pairs above ${MAX_SOURCE_SIMILARITY} are the same component wearing two hats.`);
console.log(`    lines: ${sigs.map((s) => `${s.comp.slice(0, 4)}=${s.loc}`).join('  ')}`);

/* ── Layer 2 — render ─────────────────────────────────────────────────────── */

console.log('\n  LAYER 2 · RENDER  (do they look like five places with the art removed?)\n');

const shots = ENVS.map((e) => join(EVIDENCE, `phase2-neutral-${e.slug}.png`));
const absent = shots.filter((p) => !existsSync(p));

if (absent.length) {
  console.log('  ✗ neutral-rectangle screenshots missing:');
  absent.forEach((p) => console.log(`      ${p}`));
  console.log('\n    §14 requires RENDERED evidence. You cannot self-assess this from CSS.');
  console.log('    Capture at 390 × 844 with the canonical posters neutralised, then re-run.\n');
  process.exit(1);
}

/* Grayscale on purpose: a colour swap is not a signature (§6). */
const pixels = await Promise.all(
  shots.map((p) =>
    sharp(p).grayscale().resize(48, 104, { fit: 'fill' }).raw().toBuffer(),
  ),
);

console.log('    ' + ENVS.map((e) => e.comp.slice(0, 6).padStart(7)).join(''));
for (let i = 0; i < pixels.length; i++) {
  const cells = [];
  for (let j = 0; j < pixels.length; j++) {
    if (i === j) { cells.push('     — '); continue; }
    let sum = 0;
    for (let k = 0; k < pixels[i].length; k++) sum += Math.abs(pixels[i][k] - pixels[j][k]);
    const diff = sum / pixels[i].length;
    const bad = diff < MIN_RENDER_DIFF;
    if (bad && j > i) failures++;
    cells.push((bad ? '!' : ' ') + diff.toFixed(1).padStart(6));
  }
  console.log('  ' + ENVS[i].comp.slice(0, 4).padEnd(6) + cells.join(''));
}
console.log(`\n    threshold: pairs below ${MIN_RENDER_DIFF} are one template with two photographs in it.`);

/* ── verdict ──────────────────────────────────────────────────────────────── */

if (failures) {
  console.log(`\n  FAIL — ${failures} pair(s) are not distinguishable.`);
  console.log('  These environments are decoration over a shared skeleton. §5.2 / §14.\n');
  process.exit(1);
}
console.log('\n  PASS — five environments, distinguishable with the art removed.\n');
