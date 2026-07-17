/**
 * copy-gates.mjs — the machine floor for the copy lane.
 *
 * WHY
 * Copy is craft, and craft is what the Claude↔Sol copy dialectic is for. But a
 * handful of copy rules are NOT craft — they are acceptance-blocking invariants the
 * voice bible and copy contract fix verbatim (the hashtag stack, the funded-by gag,
 * the dual-address corrections). A dialectic that spends a round arguing "did we keep
 * the hashtag stack" is wasting the only thing two strong writers are good for.
 *
 * So the machine owns the invariants; the writers own the wit. Green here is NOT
 * "the copy is good" — a machine cannot judge funny. Green means "the copy has not
 * drifted off the non-negotiable rails." Good is the dialectic's job.
 *
 * Source of law: docs/copy/voice-bible.md · docs/copy/copy-contract-for-build.md
 * (its "Non-negotiable copy rules (acceptance-blocking)" list) · specs.md §7.2.
 *
 *   node scripts/copy-gates.mjs
 *
 * Exit 0 = invariants hold. Exit 1 = at least one drifted.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const results = [];
const pass = (id, law, msg) => results.push({ id, law, ok: true, msg });
const fail = (id, law, msg, hits = []) => results.push({ id, law, ok: false, msg, hits });

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);
function tree(dir, exts = ['.astro', '.ts']) {
  const out = [];
  (function w(d) {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      statSync(p).isDirectory() ? w(p) : exts.includes(extname(p)) && out.push({ path: relative('.', p).replace(/\\/g, '/'), text: readFileSync(p, 'utf8') });
    }
  })(dir);
  return out;
}
function grep(re, files) {
  const hits = [];
  for (const f of files) f.text.split('\n').forEach((t, i) => { if (re.test(t)) hits.push({ file: f.path, line: i + 1, text: t.trim() }); re.lastIndex = 0; });
  return hits;
}

const copy = read('src/content/copy.ts') || '';
const src = tree('src');

/* ── CG1 — the three hashtags, verbatim and in order (copy-contract rule 1) ── */
/* Stored as an array (`HASHTAGS = ["#GotSoap", ...]`) and joined with ` · ` at
 * render — so check the three exact tags, not a pre-joined string. */
{
  const TAGS = ['#GotSoap', '#SoapyThirstTrap', '#CleanManEnergy'];
  const missing = TAGS.filter((t) => !new RegExp(`["'\\s]${t.replace(/[$]/g, '\\$&')}["'\\s]`).test(copy) && !copy.includes(t));
  // Order check: the three appear in sequence in the HASHTAGS export.
  const inOrder = new RegExp(TAGS.map((t) => t.replace(/[$]/g, '\\$&')).join('[\\s\\S]{0,40}')).test(copy);
  if (missing.length) fail('CG1', 'contract §1', `hashtag(s) missing/misspelled: ${missing.join(', ')}`);
  else if (!inOrder) fail('CG1', 'contract §1', 'the three hashtags exist but not in the canonical order #GotSoap → #SoapyThirstTrap → #CleanManEnergy');
  else pass('CG1', 'contract §1', 'hashtag stack present, verbatim, in order');
}

/* ── CG2 — the funded-by sponsor gag, verbatim ────────────────────────────── */
{
  const EXACT = 'Funded by Concerned Women Against Axe Abuse';
  copy.includes(EXACT)
    ? pass('CG2', 'contract §1', 'funded-by gag present verbatim')
    : fail('CG2', 'contract §1', `sponsor gag missing or reworded — must read exactly \`${EXACT}\``);
}

/* ── CG3 — dual-address correction on the pledge description (specs §7.2) ──── */
/* The declarant is the MAN. He does not "join two million women." §7.2 requires
 * removing that implication. This is the exact string the spec calls out. */
{
  const bad = grep(/two million women/i, [{ path: 'src/content/copy.ts', text: copy }]);
  bad.length
    ? fail('CG3', '§7.2', 'pledge/meta copy still says the (male) declarant joins "two million women" — the §7.2 dual-address correction', bad)
    : pass('CG3', '§7.2', 'no mis-addressed "two million women" line');
}

/* ── CG4 — no unresolved copy-lane placeholders remain ────────────────────── */
/* The build flags strings it will not invent with an explicit marker. The copy
 * lane's job is to resolve them AND remove the marker. A surviving marker means a
 * placeholder shipped.
 *
 * HOLE FIXED 2026-07-17 (Sol, chrome-unification review finding 1): the marker
 * vocabulary writes "copy lane" with a space OR "COPY-LANE" with a hyphen, and
 * this regex only matched the spaced forms — so "FLAGGED FOR COPY-LANE
 * RATIFICATION" evaded the gate and produced a false green over an admitted
 * stand-in. The separator is now normalized ([-\s]) in both alternates. */
{
  const markers = grep(/COPY[-\s]LANE PLACEHOLDER|flagged for (the )?copy[-\s]lane|PLACEHOLDER \(institutional/i, src);
  markers.length
    ? fail('CG4', 'contract', `${markers.length} unresolved copy-lane placeholder marker(s) — resolve the string and remove the marker`, markers)
    : pass('CG4', 'contract', 'no unresolved copy-lane placeholders');
}

/* ── CG5 — zero lorem (contract "Before launch") ──────────────────────────── */
{
  const lorem = grep(/lorem ipsum|dolor sit amet|placeholder text/i, src);
  lorem.length
    ? fail('CG5', 'contract', 'lorem / placeholder text present', lorem)
    : pass('CG5', 'contract', 'no lorem');
}

/* ── CG6 — the copyright line survives (voice invariant) ──────────────────── */
{
  /© *Stacey Breckel 2025/.test(copy) || grep(/© *Stacey Breckel 2025/, src).length
    ? pass('CG6', 'contract §1', '© Stacey Breckel 2025 present')
    : fail('CG6', 'contract §1', '© Stacey Breckel 2025 line missing');
}

/* ── report ───────────────────────────────────────────────────────────────── */
const failed = results.filter((r) => !r.ok);
console.log('\n  copy invariants — the machine floor (craft is the dialectic\'s job)\n');
for (const r of results) {
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.id.padEnd(4)} ${r.law.padEnd(12)} ${r.msg}`);
  if (!r.ok) for (const h of r.hits.slice(0, 8)) console.log(`          ${h.file}:${h.line}  ${h.text.slice(0, 88)}`);
}
console.log(`\n  ${results.length - failed.length}/${results.length} invariants hold` + (failed.length ? `  ·  ${failed.length} DRIFTED: ${failed.map((f) => f.id).join(', ')}` : '') + '\n');
console.log('  Reminder: green ≠ good. A machine cannot judge funny. This only proves the\n  non-negotiables held while Claude and Sol argued the craft.\n');
if (failed.length) process.exit(1);
