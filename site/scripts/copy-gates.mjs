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
import { join, extname, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

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

/* ── CG7 — killed lines stay dead (style-lock.md §7) — VALUE gate ─────────── */
/* Promoted from small-fixes-build.md Appendix A (cg7-promotion-order.md). Two
 * layers, both required:
 *   deck   — import copy.ts and walk every exported string VALUE; killed phrases
 *            are violations. The single sanction is by EXACT path (about.credit /
 *            default.about.credit) — never suffix-matched, so a smuggled
 *            masthead.about.credit still violates.
 *   render — sweep dist/**\/*.html; the sanctioned sentence is legal only in
 *            dist/about/index.html. Catches strings that never touched copy.ts.
 *
 * RUNTIME: the deck layer imports a .ts module. Node >=23 strips types natively;
 * Node 22.6–22.x needs `node --experimental-strip-types` (the npm script passes
 * the flag, which Node >=23 accepts as a no-op). A deck that cannot be loaded or
 * that walks to zero content is a FAILURE, never a silent pass — this codebase
 * has already shipped one vacuous-green gate (G13's 0.0 KB hole).
 *
 * CG7_COPY_TS / CG7_DIST env overrides exist ONLY as acceptance-test seams
 * (scripts/cg7-tests.mjs); production runs use the defaults. */
{
  const KILLED = [
    'Hang him in the locker room',
    'Are you the fog?',
    'The receipts',
    'A public hygiene initiative',
    'A satirical spec campaign by Hope2 Studio',
    'Got Soap? is a satirical campaign by Hope2 Studio.',
    "See who's behind it",
  ];
  const SANCTIONED_NEEDLE = 'a satirical spec campaign by hope2 studio';
  /* Anchor discipline (round 8): every sanction comparison is EXACT, ROOT-ANCHORED,
   * and structure-preserving. Two instances of anchor drift were found and killed:
   *  - render (Sol, R7): a suffix regex exempted ANY .../about/index.html, so
   *    dist/campaign/about/index.html rode /about's exemption. Now: the file's
   *    dist-root-RELATIVE path, separator-normalized, compared with === .
   *  - deck (class sweep, R8): the walk path was compared as a joined STRING, so a
   *    quoted key literally named "about.credit" inside the default aggregate would
   *    collide with the real about→credit chain. Now: the path is compared as a key
   *    ARRAY, segment by segment — key names are never flattened into a comparison. */
  const SANCTIONED_DECK_PATHS = [['about', 'credit'], ['default', 'about', 'credit']];
  const SANCTIONED_DIST_REL = 'about/index.html';
  const COPY_TS = process.env.CG7_COPY_TS || 'src/content/copy.ts';
  const DIST = process.env.CG7_DIST || 'dist';

  const violations = []; // {where, text}
  const exempts = [];
  let exportCount = 0, stringCount = 0, deckLoaded = false;

  try {
    const mod = await import(pathToFileURL(COPY_TS).href);
    exportCount = Object.keys(mod).length;
    const seen = new Set();
    (function walkValues(node, path) {
      if (typeof node === 'string') {
        stringCount++;
        const lc = node.toLowerCase();
        // Display form only — keys containing '.' are quoted so the printed path can
        // never be mistaken for a nested chain. Comparisons NEVER use this string.
        const shown = path.map((k) => (k.includes('.') ? `"${k}"` : k)).join('.');
        for (const k of KILLED) {
          const needle = k.toLowerCase();
          if (!lc.includes(needle)) continue;
          const sanctioned = needle === SANCTIONED_NEEDLE &&
            SANCTIONED_DECK_PATHS.some((sp) => sp.length === path.length && sp.every((seg, i) => seg === path[i]));
          if (sanctioned) exempts.push(`deck:${shown}`);
          else violations.push({ where: `deck:${shown}`, text: `«${k}»` });
        }
        return;
      }
      if (node === null || typeof node !== 'object') return;
      if (seen.has(node)) return; // default aggregate re-exposes the named groups
      seen.add(node);
      for (const [key, val] of Object.entries(node)) walkValues(val, [...path, key]);
    })(mod, []);
    deckLoaded = true;
  } catch (e) {
    fail('CG7', 'style-lock §7', `deck UNLOADABLE — the gate could not run and must not be green. ` +
      `Requires Node >=23, or on 22.x: node --experimental-strip-types scripts/copy-gates.mjs. ` +
      `Import error: ${e.code || e.message}`);
  }

  if (deckLoaded && (exportCount === 0 || stringCount === 0)) {
    fail('CG7', 'style-lock §7', `vacuous deck walk (exports=${exportCount}, strings=${stringCount}) — ` +
      `a zero-content walk checked nothing and is a failure, not a clean pass`);
  } else if (deckLoaded) {
    if (!existsSync(DIST)) {
      fail('CG7', 'style-lock §7', `render layer cannot run — ${DIST}/ is absent. Run \`npm run build\` first; ` +
        `an unrun check must not be green (deck layer alone found ${violations.length} violation(s))`);
    } else {
      (function htmlWalk(d) {
        for (const n of readdirSync(d)) {
          const p = join(d, n);
          if (statSync(p).isDirectory()) htmlWalk(p);
          else if (n.endsWith('.html')) {
            const lc = readFileSync(p, 'utf8').toLowerCase();
            const rel = relative('.', p).replace(/\\/g, '/');
            // Root-anchored: exact dist-relative path, separator-normalized. Never a
            // suffix match — dist/campaign/about/index.html must NOT ride the exemption.
            const relDist = relative(DIST, p).split(sep).join('/');
            for (const k of KILLED) {
              const needle = k.toLowerCase();
              if (!lc.includes(needle)) continue;
              if (needle === SANCTIONED_NEEDLE && relDist === SANCTIONED_DIST_REL) exempts.push(`dist:${rel}`);
              else violations.push({ where: `dist:${rel}`, text: `«${k}»` });
            }
          }
        }
      })(DIST);
      violations.length
        ? fail('CG7', 'style-lock §7', `${violations.length} killed line(s) resurrected`,
            violations.map((v) => ({ file: v.where, line: '-', text: v.text })))
        : pass('CG7', 'style-lock §7', `killed lines stay dead (walked ${stringCount} deck strings; ` +
            `exempt: ${exempts.join(', ') || 'none'})`);
    }
  }
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
