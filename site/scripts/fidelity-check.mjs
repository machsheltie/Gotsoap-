/**
 * fidelity-check.mjs — Phase 5 implementation fidelity checker (v3).
 *
 * v2 was HELD by Sol a second time: six invalid states still reported green.
 * v3 closes them, in his order:
 *
 *  1  PROOF MODE — the default run is authoritative and REJECTS every
 *     FIDELITY_* override (including paired plan/order substitutes and
 *     FIDELITY_BASELINE_REF=HEAD self-baselining), and requires the plan,
 *     order, deck, and manifest working-tree files to match git HEAD.
 *     FIDELITY_TEST_MODE=1 permits overrides for sabotage testing but brands
 *     every line of output NON-AUTHORITATIVE.
 *  2  INDEPENDENT ROUTE MANIFEST — dist completeness asserts against
 *     scripts/route-manifest.json, a fixed committed list, never against
 *     routes derived from the deck under verification. Extras are reported.
 *  3  ZERO CONTAINMENT-ONLY ROWS — every row string must bind to an exact
 *     slot: the row's labeled path, a slug-labeled verdicts field, a
 *     key-labeled field, or an EXACT-value match against the deck §12 slot
 *     index (parsed from copy-deck-v2.md — the deck-canonical addendum).
 *     A string that cannot be slot-bound FAILS its row. No parent-scope
 *     fallback exists.
 *  4  EXACT ROSTER — crisis.caseFiles.files must equal the five approved ids
 *     from the plan's roster row: no missing, no extras (RC-999 fails).
 *  5  DIALOG NAMES — each poster lightbox's accessible name must contain the
 *     actual poster title (meta-derived), not merely be non-empty.
 *  6  BASELINES — INHERIT/UNCHANGED byte-compare against the pinned
 *     pre-implementation deck (4d67a19); unavailable baseline = FAIL.
 *
 * Still EXTRACTION-based (order §4): assertions derive from the plan, the
 * order doc, the deck §12 index, the committed manifest, and git — never
 * from a hand-copied list of agreed strings in this file.
 *
 * v3.2 (Sol round 3):
 *  - PADDING: slot binding is EXACT, not containment. A string-leaf slot must
 *    equal the agreed text; agreed-text-plus-appendix fails. Fragment rows
 *    (the plan quotes part of a longer retained value, e.g. the welcome-email
 *    lines and the RC-031 partial quote) must sit at the END of their leaf and
 *    the un-quoted remainder must be attested by the BASELINE deck — so both
 *    appended and prepended padding fail. Baseline unavailable → fragment
 *    rows fail.
 *  - BRANDING: in test mode EVERY output line — section, PASS, FAIL, note,
 *    summary — carries the TEST MODE — NON-AUTHORITATIVE prefix, and both
 *    modes print the exit contract. Honest scope note: the exit codes are
 *    authoritative for DIRECT invocation; a shell pipeline replaces them with
 *    the last command's status unless `set -o pipefail` (bash) or
 *    `$LASTEXITCODE`-checking (PowerShell) is used — filtering the output can
 *    hide the code, never the per-line branding.
 *
 * v3.3 (Sol HOLD follow-through):
 *  - EXACT LEAF: branch-1 binding resolves each agreed string to one specific
 *    string leaf of the row's slot (full path reported), consumed at most
 *    once. Documented residual: a compound-slot row quoting several strings
 *    carries no per-string sub-path in the plan, so a swap of verbatim agreed
 *    values between that slot's own fields is undetectable from the plan.
 *
 * v3.4 (Sol HOLD, 2026-07-22 — T13/T14/T15/T17/T18 + findstr overlap):
 *  - TERMINAL BRANCH 1 (T13): a labeled row that misses its own slot FAILS.
 *    It never falls through to the global §12 lookup, which had let two
 *    swapped named slots vouch for each other's values.
 *  - QUOTE SCOPE (T14): surrounding-quote stripping applies ONLY to case-file
 *    quote leaves (path ends `.quote`), never to arbitrary fields.
 *  - INDEX BINDING (T18): pure-array slots bind index-aware — plan lines
 *    numbered "1. … 2. …" pin to their explicit indices; unnumbered array
 *    strings must bind in strictly increasing index order. Swaps fail.
 *  - FRAGMENT ANCHOR (T15): a fragment's residual head must be the EXACT
 *    prefix of the SAME leaf in the baseline slot (relative-path matched),
 *    not merely contained somewhere in the baseline deck. Parenthetical
 *    shape notes ("(3 lines → 2)") no longer enable fragment mode.
 *  - RENDERED OUTPUT (T17): every routed PRESENCE string must render on its
 *    plan-section's route(s) in dist (placeholder-segmented containment);
 *    transactional-email slots (welcomeEmail, newsletter) are exempt — they
 *    are sent, never built. A stale dist now fails even with a correct deck.
 *  - VOCABULARY SPLIT (findstr): "PASS"/"landed:" and the exclusive
 *    FIDELITY-PROOF-AUTHORITATIVE-PASS token are proof-mode-only; test mode
 *    reports SIM-OK / "sim rows green:" so no substring filter can dress a
 *    sabotage run as an authoritative pass.
 *
 * v3.5 (Sol HOLD round 2, 2026-07-22 — five near-misses vs c557a40):
 *  - ROOT ANCHOR: resolveSlot() is terminal when the path's first segment
 *    names a root object — the cross-root fallback no longer rescues a slot
 *    re-homed under another root (alias-preserving relocation fails). The
 *    fallback survives only for non-root shorthands, and must be UNIQUE.
 *  - EXACT ARITY: numbered plan lines declare an array's FULL membership;
 *    an unapproved extra member fails even when every index verifies.
 *  - NON-EMPTY HEAD: fragment rows must RETAIN a prefix — replacing the leaf
 *    with the quoted tail alone (head === '') fails.
 *  - SLUG-EXACT ROUTES: when a slot path segment (or slug label) names a
 *    route directory under the section prefix, the string must render on
 *    that page, not merely somewhere in the route family.
 *  - COMMENTS ≠ RENDERED: <!-- … --> is stripped before text extraction —
 *    hiding copy (or leaking a cut case file) inside a comment counts as
 *    not rendered.
 *
 * v3.6 (Sol HOLD round 3, 2026-07-23 — four near-misses vs 9584eaa):
 *  - BASELINE ROOT ANCHORS: the root-anchor set is the UNION of current and
 *    pinned-baseline deck roots — deleting a root wholesale and re-homing
 *    its object under another root no longer re-enables the fallback.
 *  - RAW ARITY: index-pinned arity counts actual array members, not string
 *    leaves — a numeric/object stowaway that walkLeaves skips still fails.
 *  - FULL HEAD: "through" rows are fully determined (baseline text up
 *    through the first quote + the remaining quotes, exact equality); worded
 *    fragment rows require the head to end with terminal punctuation exactly
 *    at a sentence boundary of the same baseline leaf — any partial prefix
 *    ("You ") fails.
 *  - INERT CONTAINERS: <template>/<script>/<style> content is stripped with
 *    comments before rendered-text extraction — agreed copy must ship in
 *    real DOM.
 *
 *   node --experimental-strip-types scripts/fidelity-check.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/* ---------- proof mode vs test mode (P1: refuse overrides) ----------------- */

const TEST_MODE = process.env.FIDELITY_TEST_MODE === '1';
const overrides = Object.keys(process.env).filter(
  (k) => k.startsWith('FIDELITY_') && k !== 'FIDELITY_TEST_MODE' && process.env[k] !== undefined,
);
if (!TEST_MODE && overrides.length) {
  console.error(`FATAL: FIDELITY_* overrides are rejected in proof mode: ${overrides.join(', ')}`);
  console.error('       Set FIDELITY_TEST_MODE=1 for a NON-AUTHORITATIVE sabotage-test run.');
  process.exit(1);
}
const banner = TEST_MODE ? ' [TEST MODE — NON-AUTHORITATIVE]' : '';
/** EVERY emitted line is branded in test mode — a grep/findstr filter can hide
 * the exit code, but never the per-line provenance. */
const LP = TEST_MODE ? 'TEST MODE — NON-AUTHORITATIVE | ' : '';
const out = (s = '') => console.log(s.split('\n').map((l) => (LP + l).trimEnd()).join('\n'));
const err = (s) => console.error(s.split('\n').map((l) => (LP + l).trimEnd()).join('\n'));
/** Exit-code contract (Sol residual, 2026-07-20): proof mode exits 0 (pass) or
 * 1 (fail/fatal). Test mode NEVER exits 0 or 1 — it exits 3 (all rows landed,
 * non-authoritative) or 2 (failures/fatal) — so no pipeline, script, or human
 * can mistake a test-mode run for an authoritative pass. */
const EXIT_FAIL = TEST_MODE ? 2 : 1;
const EXIT_PASS = TEST_MODE ? 3 : 0;

const PLAN = (TEST_MODE && process.env.FIDELITY_PLAN) || '../docs/copy/copy-correction-plan.md';
const ORDER = (TEST_MODE && process.env.FIDELITY_ORDER) || '../docs/copy/copy-implementation-order.md';
const DECK_DOC = (TEST_MODE && process.env.FIDELITY_DECK_DOC) || '../docs/copy/copy-deck-v2.md';
const COPY_TS = (TEST_MODE && process.env.FIDELITY_COPY_TS) || 'src/content/copy.ts';
const DIST = (TEST_MODE && process.env.FIDELITY_DIST) || 'dist';
const MANIFEST = 'scripts/route-manifest.json'; // never overridable — the independent anchor
const BASELINE_REF = (TEST_MODE && process.env.FIDELITY_BASELINE_REF) || '4d67a19';

/* ---------- helpers ------------------------------------------------------- */

const norm = (s) => s.normalize('NFC').replace(/\\(["`'])/g, '$1').replace(/\s+/g, ' ').trim();
const unescapeHtml = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function walkStrings(node, out = [], seen = new Set()) {
  if (typeof node === 'string') { out.push(norm(node)); return out; }
  if (node === null || typeof node !== 'object') return out;
  if (seen.has(node)) return out;
  seen.add(node);
  for (const v of Object.values(node)) walkStrings(v, out, seen);
  return out;
}

/** Like walkStrings but keeps each leaf's full path, so slot binding can name
 * (and consume) the EXACT leaf it matched — no any-in-subtree ambiguity. */
function walkLeaves(node, at = '', out = [], seen = new Set()) {
  if (typeof node === 'string') { out.push({ at, value: norm(node) }); return out; }
  if (node === null || typeof node !== 'object') return out;
  if (seen.has(node)) return out;
  seen.add(node);
  for (const [k, v] of Object.entries(node)) walkLeaves(v, at ? `${at}.${k}` : k, out, seen);
  return out;
}

const segsOf = (path) =>
  path.split('.').flatMap((p) => p.split(/[[\]]/).filter(Boolean)).map((p) => (/^\d+$/.test(p) ? Number(p) : p));

function resolveAt(root, path) {
  let cur = root;
  for (const s of segsOf(path)) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[s];
  }
  return cur;
}

/** Root-anchor set (v3.6, Sol round 3): populated from the CURRENT deck's
 * roots UNION the pinned BASELINE deck's roots before any slot resolution.
 * Anchoring only on the current deck let an attacker delete the `labels`
 * root wholesale and re-home the object under `home.labels` — with the root
 * key gone, the unique-fallback re-engaged. The baseline is git-pinned, so
 * its root set cannot be edited away. */
const ROOT_ANCHORS = new Set();

function resolveSlot(mod, path) {
  const root = mod.default ?? mod;
  const direct = resolveAt(root, path);
  if (direct !== undefined) return { value: direct, at: path };
  // v3.5 (Sol round 2): a path whose FIRST segment names a root object is
  // root-anchored — a miss beneath that root is TERMINAL. The cross-root
  // fallback let `labels.cwaaa.copyLink` be satisfied by a copy re-homed
  // under `home.labels.…`. The fallback survives only for label shorthands
  // whose first segment is not a root key in the current OR baseline deck
  // (e.g. `welcomeEmail.body` lives under pledge), and even then the nested
  // hit must be UNIQUE.
  const first = segsOf(path)[0];
  if (root[first] !== undefined || ROOT_ANCHORS.has(first)) return undefined;
  const hits = [];
  for (const [k, v] of Object.entries(root)) {
    if (v && typeof v === 'object') {
      const nested = resolveAt(v, path);
      if (nested !== undefined) hits.push({ value: nested, at: `${k}.${path}` });
    }
  }
  return hits.length === 1 ? hits[0] : undefined;
}

/** Deep unique-key search for bare §12 tokens (e.g. `featuredCaption`). */
function findKeyPaths(node, key, path = [], hits = [], seen = new Set()) {
  if (node === null || typeof node !== 'object') return hits;
  if (seen.has(node)) return hits;
  seen.add(node);
  for (const [k, v] of Object.entries(node)) {
    if (k === key) hits.push({ at: [...path, k].join('.'), value: v });
    findKeyPaths(v, key, [...path, k], hits, seen);
  }
  return hits;
}

function htmlFiles(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const git = (args) => execFileSync('git', args, { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const tracked = (p) => { try { return git(['ls-files', '--', p]).trim().length > 0; } catch { return false; } };
const cleanVsHead = (p) => { try { return git(['status', '--porcelain', '--', p]).trim().length === 0; } catch { return false; } };

/* ---------- load artifacts, with integrity guards -------------------------- */

const fatal = [];

for (const [label, p] of [['plan', PLAN], ['order', ORDER], ['deck doc', DECK_DOC], ['route manifest', MANIFEST]]) {
  if (!existsSync(p)) { fatal.push(`${label} not found at ${p}`); continue; }
  if (!TEST_MODE) {
    if (!tracked(p)) fatal.push(`${label} is NOT git-tracked — irreproducible`);
    else if (!cleanVsHead(p)) fatal.push(`${label} differs from git HEAD — proof runs assert the committed consensus (commit it or use FIDELITY_TEST_MODE=1)`);
  }
}

let planText = '', declaredRows = NaN;
if (existsSync(PLAN)) planText = readFileSync(PLAN, 'utf8');
if (existsSync(ORDER)) {
  const m = readFileSync(ORDER, 'utf8').match(/All \*\*(\d+) correction rows\*\*/);
  if (!m) fatal.push('order doc declares no correction-row total — integrity anchor missing');
  else declaredRows = Number(m[1]);
}

let manifestRoutes = [];
if (existsSync(MANIFEST)) {
  try {
    manifestRoutes = JSON.parse(readFileSync(MANIFEST, 'utf8')).routes;
    if (!Array.isArray(manifestRoutes) || manifestRoutes.length === 0) fatal.push('route manifest is empty — vacuous');
  } catch (e) { fatal.push(`route manifest unparseable: ${e.message}`); }
}

let mod = null, deckStrings = [];
try {
  mod = await import(pathToFileURL(COPY_TS).href);
  deckStrings = walkStrings(mod.default ?? mod);
  if (deckStrings.length === 0) fatal.push('vacuous deck walk — zero strings');
} catch (e) {
  fatal.push(`deck UNLOADABLE (${e.code || e.message}) — run with node --experimental-strip-types`);
}

// Baseline deck (pinned) — loaded BEFORE any resolveSlot use so the
// root-anchor set (v3.6) is complete when the §12 index resolves.
let baseMod = null, baselineErr = null;
try {
  const baseSrc = git(['show', `${BASELINE_REF}:site/src/content/copy.ts`]);
  const tmp = mkdtempSync(join(tmpdir(), 'fidelity-base-'));
  // .mts: explicit ESM, so Node 22's "Reparsing as ES module" advisory never
  // fires for a temp-dir file outside the package's "type":"module" scope.
  const basePath = join(tmp, 'copy-baseline.mts');
  writeFileSync(basePath, baseSrc);
  baseMod = await import(pathToFileURL(basePath).href);
} catch (e) {
  baselineErr = `baseline deck unavailable (git show ${BASELINE_REF}): ${e.message.split('\n')[0]}`;
}
const baselineStrings = baseMod ? walkStrings(baseMod.default ?? baseMod) : [];
if (mod) for (const k of Object.keys(mod.default ?? mod)) ROOT_ANCHORS.add(k);
if (baseMod) for (const k of Object.keys(baseMod.default ?? baseMod)) ROOT_ANCHORS.add(k);

// Deck §12 slot index — the deck-canonical addendum names every changed slot.
let slotIndex = []; // {at, value}
if (mod && existsSync(DECK_DOC)) {
  const deckDoc = readFileSync(DECK_DOC, 'utf8');
  const s12 = deckDoc.indexOf('# 12.');
  if (s12 === -1) fatal.push('deck §12 addendum missing — slot index unavailable');
  else {
    const tokens = [...deckDoc.slice(s12).matchAll(/`([\w.[\]*-]+)`/g)]
      .map((m) => m[1])
      .filter((t) => !/\.(md|mjs|ts)$/.test(t) && t !== '*');
    const root = mod.default ?? mod;
    const seenAt = new Set();
    const add = (at, value) => { if (!seenAt.has(at)) { seenAt.add(at); slotIndex.push({ at, value }); } };
    for (const t of tokens) {
      if (t.includes('*')) {
        // e.g. verdicts.*.share / psas.sniffRoute.*
        const segs = t.split('.');
        const starIdx = segs.indexOf('*');
        const prefix = segs.slice(0, starIdx).join('.');
        const suffix = segs.slice(starIdx + 1).join('.');
        const base = resolveSlot(mod, prefix);
        if (base && typeof base.value === 'object') {
          for (const k of Object.keys(base.value)) {
            const v = suffix ? resolveAt(base.value[k], suffix) : base.value[k];
            if (v !== undefined) add(`${base.at}.${k}${suffix ? '.' + suffix : ''}`, v);
          }
        }
      } else if (t.includes('.') || t.includes('[')) {
        const hit = resolveSlot(mod, t);
        if (hit) add(hit.at, hit.value);
      } else {
        const hits = findKeyPaths(root, t);
        if (hits.length === 1) add(hits[0].at, hits[0].value);
        // non-unique bare tokens (e.g. `caseNote`) are skipped — their rows are slot-labeled
      }
    }
    if (slotIndex.length === 0) fatal.push('deck §12 slot index resolved to zero slots — vacuous');
  }
}

// Dist vs the INDEPENDENT manifest.
let distPages = [];
if (!existsSync(DIST)) fatal.push('dist/ absent — run `npm run build` first');
else {
  distPages = htmlFiles(DIST).map((p) => ({
    rel: relative(DIST, p).split(sep).join('/'),
    raw: readFileSync(p, 'utf8'),
  }));
  // v3.5 (Sol round 2): HTML comments are NOT rendered content — text hidden
  // in <!-- … --> must satisfy nothing (and a commented-out cut case file is
  // genuinely not rendered). v3.6 (round 3): neither are inert containers —
  // <template>/<script>/<style> content never reaches the user's eyes, so it
  // is stripped too (all agreed copy verifiably ships in real DOM).
  for (const p of distPages)
    p.text = norm(unescapeHtml(
      p.raw.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(template|script|style)\b[\s\S]*?<\/\1\s*>/gi, ' '),
    ));
  for (const req of manifestRoutes) {
    const page = distPages.find((p) => p.rel === req);
    if (!page) fatal.push(`dist is PARTIAL/SUBSTITUTED — manifest route missing: ${req}`);
    else if (page.raw.length < 2000 || !/<html/i.test(page.raw))
      fatal.push(`dist page ${req} is not a real document (${page.raw.length} bytes)`);
  }
}
const extraPages = distPages.map((p) => p.rel).filter((r) => !manifestRoutes.includes(r));

if (fatal.length) {
  for (const f of fatal) err(`FATAL: ${f}`);
  process.exit(EXIT_FAIL);
}

const distHits = (s) => distPages.filter((p) => p.text.includes(s)).map((p) => p.rel);
/** EXACT-value match against the §12 slot index. */
const exactAtIndexed = (s) =>
  slotIndex.find((e) => typeof e.value === 'string' && norm(e.value) === s);

/* ---------- parse the plan (§1–§7 only) ------------------------------------ */

const start = planText.indexOf('## 1.');
const end = planText.indexOf('## 8.');
if (start === -1 || end === -1) {
  err(`FATAL: plan section markers (## 1. … ## 8.) not found — truncated/substituted plan`);
  process.exit(EXIT_FAIL);
}
const body = planText.slice(start, end);

let section = '';
const seenSections = new Set();
const rows = [];
for (const line of body.split(/\r?\n/)) {
  const h = line.match(/^## (\d+)\. (.+)$/);
  if (h) { section = h[2].trim(); seenSections.add(Number(h[1])); continue; }
  if (!line.startsWith('|')) continue;
  if (/^\|\s*-+/.test(line) || /^\|[\s|:-]+$/.test(line)) continue;
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^(Key|Slot|Keep)$/i.test(cells[0]) && /^(Agreed final|Vector)/i.test(cells[1] || '')) continue;
  rows.push({ section, cells, raw: line });
}
for (let i = 1; i <= 7; i++)
  if (!seenSections.has(i)) { err(`FATAL: plan section §${i} missing — truncated plan`); process.exit(EXIT_FAIL); }
if (rows.length === 0) { err(`FATAL: zero rows parsed — vacuous`); process.exit(EXIT_FAIL); }
if (Number.isFinite(declaredRows) && rows.length !== declaredRows) {
  err(`FATAL: parsed ${rows.length} rows but the order declares ${declaredRows} — partial or padded plan`);
  process.exit(EXIT_FAIL);
}

/* ---------- classify + assert --------------------------------------------- */

const BOLD_QUOTED = /\*\*"([^]*?)"\*\*/g;
const results = [];
const root = mod.default ?? mod;
const files = root.crisis?.caseFiles?.files ?? [];
const posterTitle = (slug) =>
  (root.meta?.[`psas/${slug}`]?.title || '').replace(/\s*\|\s*got soap\?\s*$/i, '').trim();

for (const row of rows) {
  const [slotCell, agreedCell = ''] = row.cells;
  const rowText = row.cells.join(' | ');
  const strings = [...agreedCell.matchAll(BOLD_QUOTED)].map((m) => norm(m[1]));
  const r = { section: row.section, slot: slotCell.replace(/\*\*/g, '').slice(0, 62), class: '', ok: true, notes: [] };

  const isStructural = /^\*\*Structural/.test(slotCell) || /^\*\*Structural/.test(rowText);
  const saysDelete = /\*\*\s*(Delete|Omit)/i.test(agreedCell);
  const saysInherit = /Inherited verbatim/i.test(agreedCell);
  const saysUnchanged = /^Unchanged\b/i.test(agreedCell.replace(/\*\*/g, ''));
  const slotLabeled = /^`/.test(slotCell);
  const labeledPath = slotLabeled ? (slotCell.match(/^`([\w.[\]-]+)`/) || [])[1] : null;
  const rcSlot = slotCell.match(/^(RC-\d+) (quote|status)$/);
  const qSlot = slotCell.match(/^Q(\d+) answer \(([a-d])\)$/);
  const routingArrow = !saysDelete && strings.length === 0 && /`[\w.]+`\s*→\s*`[\w.]+`/.test(slotCell);
  const roster = /9 → \*\*5\*\*|9 → 5/.test(slotCell + agreedCell)
    ? {
        keep: [...(agreedCell.match(/Keep ([^·]+)/) || ['', ''])[1].matchAll(/RC-\d+/g)].map((m) => m[0]),
        cut: [...(agreedCell.match(/cut (.+)$/) || ['', ''])[1].matchAll(/RC-\d+/g)].map((m) => m[0]),
      }
    : null;
  // slug-labeled multi-string rows: "soap-smoldering: **"…"** · suds-curious: **"…"**"
  const slugPairs = [...agreedCell.matchAll(/([\w-]+):\s*\*\*"([^]*?)"\*\*/g)]
    .map((m) => ({ key: m[1], s: norm(m[2]) }))
    .filter((p) => root.verdicts && p.key in root.verdicts);
  // key-labeled pairs: `Lead **"…"** · CTA **"…"**`
  const keyPairs = [...agreedCell.matchAll(/(?:^|·|\s)([A-Z][a-zA-Z]{1,11})\s+\*\*"([^]*?)"\*\*/g)]
    .map((m) => ({ key: m[1].toLowerCase(), s: norm(m[2]) }));

  if (isStructural) {
    r.class = 'CONTRACT';
    const ids = [...rowText.matchAll(/RC-\d+/g)].map((m) => m[0]);
    if (/lightbox/i.test(rowText)) {
      const altRows = rows.filter((x) => x.section === row.section && /\.alt`/.test(x.cells[0]));
      if (altRows.length === 0) { r.ok = false; r.notes.push('no alt rows in section — contract unverifiable'); }
      for (const ar of altRows) {
        const slug = (ar.cells[0].match(/`posterCopy\.["']?([\w-]+)/) || [])[1];
        const alt = [...ar.cells[1].matchAll(BOLD_QUOTED)].map((m) => norm(m[1]))[0];
        const title = posterTitle(slug);
        const page = distPages.find((p) => p.rel === `psas/${slug}/index.html`);
        if (!page) { r.ok = false; r.notes.push(`${slug}: page missing`); continue; }
        if (!title) { r.ok = false; r.notes.push(`${slug}: no meta title — dialog name unverifiable`); continue; }
        const dialogs = page.raw.match(/<dialog[^>]*>[\s\S]*?<\/dialog>/g) || [];
        if (dialogs.length === 0) { r.ok = false; r.notes.push(`${slug}: no <dialog> — lightbox absent`); continue; }
        const outside = dialogs.reduce((h, d) => h.replace(d, ''), page.raw);
        const altAttr = `alt="${escAttr(alt)}"`;
        const outsideCount = outside.split(altAttr).length - 1;
        if (outsideCount !== 1) { r.ok = false; r.notes.push(`${slug}: composed alt appears ${outsideCount}× outside dialogs (must be 1)`); }
        for (const d of dialogs) {
          const imgs = d.match(/<img[^>]*>/g) || [];
          for (const img of imgs) {
            const m = img.match(/\salt(?:="([^"]*)")?(?=[\s/>])/);
            if (!m) { r.ok = false; r.notes.push(`${slug}: dialog <img> has NO alt attribute`); }
            else if ((m[1] ?? '') !== '') { r.ok = false; r.notes.push(`${slug}: dialog <img> alt non-empty — duplicate description`); }
          }
          if (imgs.length) {
            const label = d.match(/<dialog[^>]*aria-label="([^"]*)"/);
            const name = label ? unescapeHtml(label[1]) : '';
            if (!name.includes(title)) { r.ok = false; r.notes.push(`${slug}: dialog name "${name.slice(0, 40)}" does not contain the poster title "${title}"`); }
          }
        }
      }
      if (r.ok) r.notes.push('alt once outside dialogs · dialog imgs alt-empty · dialog names carry the real poster titles');
    } else if (ids.length) {
      for (const id of ids) {
        const hits = distHits(id);
        if (hits.length) { r.ok = false; r.notes.push(`${id} still renders in: ${hits.join(', ')}`); }
      }
      if (r.ok) r.notes.push(`${ids.join(', ')} absent from all rendered pages`);
    } else { r.ok = false; r.notes.push('structural row with no mechanical handle'); }
  } else if (roster) {
    r.class = 'ROSTER';
    const have = files.map((f) => f.id);
    const haveSet = new Set(have);
    for (const id of roster.keep) if (!haveSet.has(id)) { r.ok = false; r.notes.push(`kept ${id} MISSING`); }
    // EXACT equality — no extras (an unapproved RC-999 is a failure).
    const keepSet = new Set(roster.keep);
    for (const id of have) if (!keepSet.has(id)) { r.ok = false; r.notes.push(`UNAPPROVED file ${id} present — roster must equal the five agreed ids`); }
    if (files.length !== roster.keep.length) { r.ok = false; r.notes.push(`roster size ${files.length} ≠ approved ${roster.keep.length}`); }
    for (const id of roster.cut) {
      if (haveSet.has(id)) { r.ok = false; r.notes.push(`cut ${id} STILL IN deck`); }
      const hits = distHits(id);
      if (hits.length) { r.ok = false; r.notes.push(`cut ${id} still renders: ${hits.join(',')}`); }
    }
    if (r.ok) r.notes.push(`roster exactly equals [${roster.keep.join(', ')}]`);
  } else if (routingArrow) {
    r.class = 'ROUTING';
    for (const [, a, b] of slotCell.matchAll(/`([\w.]+)`\s*→\s*`([\w.]+)`/g)) {
      const va = resolveSlot(mod, a)?.value, vb = resolveSlot(mod, b)?.value;
      if (typeof va !== 'string' || va !== vb) { r.ok = false; r.notes.push(`${a} (${JSON.stringify(va)}) !== ${b} (${JSON.stringify(vb)})`); }
      else r.notes.push(`${a} === ${b} ("${va}")`);
    }
  } else if (saysDelete && strings.length === 0) {
    r.class = 'ABSENCE';
    if (labeledPath) {
      const hit = resolveSlot(mod, labeledPath);
      if (hit !== undefined) { r.ok = false; r.notes.push(`${labeledPath} still defined at ${hit.at}`); }
      else r.notes.push(`${labeledPath} gone from the deck`);
    } else if (/flagship pull/i.test(slotCell)) {
      const home = distPages.find((p) => p.rel === 'index.html');
      if (home && home.raw.includes('camp__pull')) { r.ok = false; r.notes.push('camp__pull still renders on home'); }
      else r.notes.push('home flagship pull slot absent from rendered home');
    } else { r.ok = false; r.notes.push('delete row with no derivable slot'); }
  } else if (saysInherit) {
    r.class = 'INHERIT';
    const id = (rowText.match(/RC-\d+/) || [])[0];
    const cur = files.find((x) => x.id === id);
    if (!cur) { r.ok = false; r.notes.push(`${id} missing from deck`); }
    else if (baselineErr) { r.ok = false; r.notes.push(`${baselineErr} — inherited-verbatim cannot be proven`); }
    else {
      const base = (baseMod.default ?? baseMod).crisis?.caseFiles?.files?.find((x) => x.id === id);
      if (!base) { r.ok = false; r.notes.push(`${id} absent from baseline ${BASELINE_REF}`); }
      else if (cur.quote !== base.quote || cur.status !== base.status || cur.name !== base.name) {
        r.ok = false; r.notes.push(`${id} differs from baseline ${BASELINE_REF} — "inherited verbatim" violated`);
      } else r.notes.push(`${id} byte-identical to baseline ${BASELINE_REF}`);
    }
  } else if (saysUnchanged && labeledPath) {
    r.class = 'UNCHANGED';
    const cur = resolveSlot(mod, labeledPath)?.value;
    if (typeof cur !== 'string') { r.ok = false; r.notes.push(`${labeledPath} missing`); }
    else if (baselineErr) { r.ok = false; r.notes.push(`${baselineErr} — unchanged cannot be proven`); }
    else {
      const base = resolveSlot(baseMod, labeledPath)?.value;
      if (cur !== base) { r.ok = false; r.notes.push(`${labeledPath} differs from baseline ${BASELINE_REF}`); }
      else r.notes.push(`${labeledPath} byte-identical to baseline ${BASELINE_REF}`);
    }
  } else if (strings.length) {
    r.class = 'PRESENCE';
    // Exact slot binding, in priority order. NO containment-only escape hatch.
    // scope: [{at, value}] leaves of the row's own slot, with full paths.
    let scope = null, scopeName = null, scopeRaw = null;
    if (labeledPath) {
      const hit = resolveSlot(mod, labeledPath);
      if (!hit) { r.ok = false; r.notes.push(`labeled slot ${labeledPath} does not resolve in the deck`); }
      else { scope = walkLeaves(hit.value, hit.at); scopeName = hit.at; scopeRaw = hit.value; }
    } else if (rcSlot) {
      const f = files.find((x) => x.id === rcSlot[1]);
      if (!f) { r.ok = false; r.notes.push(`${rcSlot[1]} missing from roster`); }
      else { scope = [{ at: `caseFiles[${rcSlot[1]}].${rcSlot[2]}`, value: norm(f[rcSlot[2]]) }]; scopeName = scope[0].at; }
    } else if (qSlot) {
      const q = root.sniffTest?.questions?.[Number(qSlot[1]) - 1];
      const idx = 'abcd'.indexOf(qSlot[2]);
      if (!q || !q.a?.[idx]) { r.ok = false; r.notes.push(`Q${qSlot[1]}(${qSlot[2]}) missing`); }
      else { scope = [{ at: `sniffTest.questions[${Number(qSlot[1]) - 1}].a[${idx}]`, value: norm(q.a[idx]) }]; scopeName = scope[0].at; }
    }
    if (r.ok) {
      const slugByString = new Map(slugPairs.map((p) => [p.s, p.key]));
      const keyByString = new Map(keyPairs.map((p) => [p.s, p.key]));
      const field = /share payload/i.test(rowText) ? 'share' : /pledge cue/i.test(rowText) ? 'exit' : null;
      // PADDING contract (v3.2): binding is EXACT — agreed-text-plus-appendix
      // is a FAIL. QUOTE-SCOPE (v3.4, Sol T14): literal surrounding "s are
      // stripped ONLY from actual case-file quote leaves (path ends in
      // `.quote` / the RC quote scope) — never from arbitrary fields, so
      // quote-wrapping a label is a visible mutation, not a free pass.
      const stripQ = (t) => t.replace(/^"/, '').replace(/"$/, '');
      const isQuoteLeaf = (at) => at === 'quote' || at.endsWith('.quote') || /\bquote\]?$/.test(at);
      const leafVal = (d) => (isQuoteLeaf(d.at) ? stripQ(d.value) : d.value);
      const relAt = (at) => (at === scopeName ? '' : at.startsWith(scopeName + '.') ? at.slice(scopeName.length + 1) : at);
      // ORDER (v3.4, Sol T18): when the row's slot is a pure ARRAY of strings,
      // binding is index-aware. Plan lines numbered "1. … 2. …" pin each
      // string to its explicit index; unnumbered array rows must bind in
      // strictly increasing index order. Swapped members can no longer both
      // bind via consume-once alone.
      const numPairs = [...agreedCell.matchAll(/(?:^|\s)(\d+)\.\s*\*\*"([^]*?)"\*\*/g)]
        .map((m) => ({ n: Number(m[1]), s: norm(m[2]) }));
      // Worded sub-labels inside a labeled row's agreed cell, e.g.
      // `pledge.badgeShare` … · share title **"…"** — used for exact sibling
      // binding in branch 1 (never as a global fallback).
      const subLabelByString = new Map(
        [...agreedCell.matchAll(/·\s*([a-zA-Z][\w -]{2,28}?)\s*\*\*"([^]*?)"\*\*/g)]
          .map((m) => [norm(m[2]), m[1].trim()]),
      );
      const arrayScope = !!scope && scope.length > 0 && scope.every((d) => /^\d+$/.test(relAt(d.at)));
      const indexPinned = arrayScope && numPairs.length === strings.length && numPairs.length > 0;
      // EXACT-LEAF binding (v3.3, Sol): each agreed string must equal one
      // specific string leaf of the row's slot — resolved to and reported at
      // its full path, and consumed at most once (one leaf can never satisfy
      // two agreed strings). No substring test survives anywhere in branch 1.
      const consumed = new Set();
      let cursor = -1; // last bound array index (order enforcement)
      const bindLeaf = (s) => {
        if (!scope) return null;
        const i = scope.findIndex((d, idx) =>
          !consumed.has(idx) && (!arrayScope || idx > cursor) && leafVal(d) === s);
        if (i === -1) return null;
        consumed.add(i);
        if (arrayScope) cursor = i;
        return scope[i].at;
      };
      // Fragment mode exists ONLY where the plan itself quotes part of a longer
      // line: an RC row saying "through … then", or a labeled slot whose label
      // carries a WORDED sub-part designator (e.g. `welcomeEmail.body` threat
      // line — parenthetical shape notes like "(3 lines → 2)" do NOT qualify)
      // and resolves to an array/object. A fragment must TERMINATE its leaf and
      // the residual head must be the EXACT PREFIX of the SAME leaf in the
      // BASELINE deck (v3.4, Sol T15 — containment anywhere in the baseline
      // attested nothing). Baseline slot unavailable → fragment rows fail.
      const labelTrailing = slotLabeled ? slotCell.replace(/^`[^`]+`/, '').trim() : '';
      const scopeIsCompound = labeledPath ? typeof resolveSlot(mod, labeledPath)?.value === 'object' : false;
      const fragAllowed =
        (rcSlot && /\bthrough\b/i.test(agreedCell)) ||
        (labeledPath && labelTrailing !== '' && !labelTrailing.startsWith('(') && scopeIsCompound);
      let baseLeafByRel = null; // relative leaf path -> baseline value, SAME slot
      if (fragAllowed && !baselineErr) {
        if (labeledPath) {
          const bHit = resolveSlot(baseMod, labeledPath);
          if (bHit) baseLeafByRel = new Map(walkLeaves(bHit.value, '').map((l) => [l.at, l.value]));
        } else if (rcSlot) {
          const bf = (baseMod.default ?? baseMod).crisis?.caseFiles?.files?.find((x) => x.id === rcSlot[1]);
          if (bf && typeof bf[rcSlot[2]] === 'string') baseLeafByRel = new Map([['', norm(bf[rcSlot[2]])]]);
        }
      }
      const fragmentBind = (ss) => {
        if (!scope || !fragAllowed || !baseLeafByRel) return null;
        const tail = ss.join(' ');
        for (let i = 0; i < scope.length; i++) {
          if (consumed.has(i) || (arrayScope && i <= cursor)) continue;
          const { at } = scope[i];
          const leaf = leafVal(scope[i]);
          const baseRaw = baseLeafByRel.get(relAt(at));
          if (baseRaw === undefined) continue; // no same-path baseline leaf → no proof
          const base = isQuoteLeaf(at) ? stripQ(baseRaw) : baseRaw;
          if (rcSlot && /\bthrough\b/i.test(agreedCell)) {
            // "through" rows (v3.6, Sol round 3): the plan's own wording pins
            // the FULL retained head — baseline text up THROUGH the first
            // quoted string, then the remaining quoted strings. The final
            // leaf is fully determined; require exact equality.
            const anchorEnd = base.indexOf(ss[0]);
            if (anchorEnd === -1) continue;
            const expected = base.slice(0, anchorEnd + ss[0].length) + (ss.length > 1 ? ' ' + ss.slice(1).join(' ') : '');
            if (leaf === expected) return `terminal fragment @ ${at} (baseline-through anchor — leaf fully determined)`;
            continue;
          }
          if (!leaf.endsWith(tail)) continue;
          const head = leaf.slice(0, leaf.length - tail.length).trim();
          // v3.5: head must be NON-EMPTY (tail-only leaf = retained prefix
          // deleted). v3.6 (Sol round 3): "You " attested because ANY
          // non-empty baseline prefix passed — the head must now be the FULL
          // unchanged prefix: it ends with terminal punctuation exactly at a
          // sentence boundary of the SAME baseline leaf. (Residual,
          // documented: a multi-sentence retained head truncated at an
          // earlier sentence boundary would pass; every live fragment row
          // retains a single-sentence head, which this pins completely.)
          const boundaryOk = base === head || base.startsWith(head + ' ');
          if (head !== '' && /[.!?…]$/.test(head) && boundaryOk)
            return `terminal fragment @ ${at} (head is the SAME baseline leaf's full sentence-bounded prefix)`;
        }
        return null;
      };
      const unresolved = [];
      if (indexPinned) {
        // Explicit index binding: plan line N ↔ slot[N-1], exact — and EXACT
        // ARITY (v3.5, Sol round 2): the numbered lines declare the FULL
        // membership of the array; an unapproved extra member fails even when
        // every declared index verifies. v3.6 (round 3): arity counts the RAW
        // array members, not just string leaves — a numeric/object stowaway
        // that walkLeaves skips still breaks arity.
        const rawArity = Array.isArray(scopeRaw) ? scopeRaw.length : scope.length;
        if (scope.length !== numPairs.length || rawArity !== numPairs.length) {
          r.ok = false;
          r.notes.push(`slot arity ${rawArity} member(s) / ${scope.length} string leaf(s) ≠ ${numPairs.length} numbered plan lines @ ${scopeName} — unapproved extra/missing member`);
        }
        for (const { n, s } of numPairs) {
          const target = scope.find((d) => relAt(d.at) === String(n - 1));
          if (!target) { r.ok = false; r.notes.push(`NOT slot-bound (exact): line ${n} has no leaf @ ${scopeName}[${n - 1}]`); continue; }
          if (leafVal(target) === s) r.notes.push(`ok @ ${target.at} (exact leaf, index-pinned)`);
          else { r.ok = false; r.notes.push(`NOT slot-bound (exact): "${s.slice(0, 55)}…" pinned to ${target.at} — leaf differs (ORDER/PADDING/RELOCATION)`); }
        }
      } else for (const s of strings) {
        if (scope) {
          // 1) the row's own labeled slot — EXACT leaf equality, consume-once,
          //    index-ordered for arrays. TERMINAL (v3.4, Sol T13): a labeled
          //    row that misses its own slot NEVER falls through to the global
          //    §12 lookup — that fallback let swapped named slots vouch for
          //    each other. Only two row-local paths remain: a sub-labeled
          //    SIBLING leaf (the plan's own wording names it, e.g.
          //    `pledge.badgeShare` · share title → pledge.badgeShareTitle:
          //    the sibling's key must carry the label word AND equal the
          //    agreed text exactly), or the row's fragment path.
          //    Fragment rows NEVER bind branch-1 (v3.5, Sol round 2): the
          //    plan quotes PART of a longer line there, so a leaf that
          //    exactly equals the quote means the retained head was deleted
          //    — only the fragment path (non-empty baseline-anchored head)
          //    can bind those rows.
          const leafAt = fragAllowed ? null : bindLeaf(s);
          if (leafAt) { r.notes.push(`ok @ ${leafAt} (exact leaf)`); continue; }
          const lab = subLabelByString.get(s);
          if (lab && labeledPath && labeledPath.includes('.')) {
            const parentHit = resolveSlot(mod, labeledPath.slice(0, labeledPath.lastIndexOf('.')));
            const labWord = lab.split(/\s+/).pop().toLowerCase();
            const sibs = parentHit
              ? walkLeaves(parentHit.value, parentHit.at).filter((d) =>
                  d.at.split('.').pop().toLowerCase().includes(labWord) && d.value === s)
              : [];
            if (sibs.length === 1) { r.notes.push(`ok @ ${sibs[0].at} (exact sibling, sub-label "${lab}")`); continue; }
            r.ok = false;
            r.notes.push(`NOT slot-bound (exact): sub-label "${lab}" has no unique sibling leaf of ${labeledPath} named *${labWord}* equal to the agreed text`);
            continue;
          }
          unresolved.push(s);
          continue;
        }
        // 2) slug-labeled verdicts field (share payloads / pledge cues) — exact
        const slug = slugByString.get(s);
        if (slug && field) {
          const v = root.verdicts?.[slug]?.[field];
          if (typeof v === 'string' && norm(v) === s) { r.notes.push(`ok @ verdicts.${slug}.${field} (exact)`); continue; }
          r.ok = false; r.notes.push(`verdicts.${slug}.${field} !== agreed text`); continue;
        }
        // 3) key-labeled field, exact-matched inside a §12-indexed object slot
        const kw = keyByString.get(s);
        if (kw) {
          const objHit = slotIndex.find((e) => e.value && typeof e.value === 'object' && typeof e.value[kw] === 'string' && norm(e.value[kw]) === s)
            || slotIndex.find((e) => typeof e.value === 'string' && e.at.endsWith(`.${kw}`) && norm(e.value) === s);
          if (objHit) { r.notes.push(`ok @ ${objHit.at}${objHit.value && typeof objHit.value === 'object' ? '.' + kw : ''} (exact)`); continue; }
          r.ok = false; r.notes.push(`no §12 slot has .${kw} === agreed text ("${s.slice(0, 40)}…")`); continue;
        }
        // 4) exact-value match at a §12-indexed slot — UNLABELED rows only
        const hit = exactAtIndexed(s);
        if (hit) { r.notes.push(`ok @ ${hit.at} (exact, §12-indexed)`); continue; }
        unresolved.push(s);
      }
      // 5) the fragment path — only for the plan's own partial-quote rows,
      // applied to ALL unresolved strings of the row as one ordered tail.
      if (unresolved.length) {
        const note = fragmentBind(unresolved);
        if (note) r.notes.push(note);
        else {
          r.ok = false;
          for (const s of unresolved)
            r.notes.push(`NOT slot-bound (exact${fragAllowed ? '/fragment' : ''}): "${s.slice(0, 55)}…"${scope ? ` @ ${scopeName}` : ''}${deckStrings.some((d) => d.includes(s)) ? ' — text present but not exact at slot: PADDING or RELOCATION' : ''}`);
        }
      }
      // The featured-file row also pins featuredId by its RC-id.
      if (!slotLabeled && !rcSlot && !qSlot && /featured/i.test(slotCell)) {
        const id = (rowText.match(/RC-\d+/) || [])[0];
        const idHit = id && slotIndex.find((e) => e.value === id);
        if (!idHit) { r.ok = false; r.notes.push(`no §12 slot carries featured id ${id}`); }
        else r.notes.push(`featured id ${id} @ ${idHit.at}`);
      }
      // RENDERED OUTPUT (v3.4, Sol T17): the deck being correct proves nothing
      // about dist — a stale build can drop agreed copy from the live pages.
      // Every PRESENCE string must render on its section's route(s), derived
      // from the plan's own section titles ("/pledge" → pledge/**; "Home" →
      // index.html; no route token → any manifest page). Placeholder tokens
      // like [name] split the string; every literal segment must appear on ONE
      // page. Exempt: transactional-email surfaces (welcomeEmail, newsletter)
      // — they are sent, never built.
      const NON_ROUTED_PREFIXES = ['welcomeEmail', 'newsletter'];
      const routed = !NON_ROUTED_PREFIXES.some((p) => (labeledPath || '').startsWith(p));
      if (routed) {
        const isHome = /^Home$/i.test(row.section);
        const secPrefixes = isHome ? null : (row.section.match(/\/[\w-]+/g) || []).map((t) => t.slice(1) + '/');
        const routePages = isHome
          ? distPages.filter((p) => p.rel === 'index.html')
          : secPrefixes.length === 0
            ? distPages // global chrome — any page
            : distPages.filter((p) => secPrefixes.some((x) => p.rel.startsWith(x)));
        // SLUG-EXACT binding (v3.5, Sol round 2): family-wide route scope let
        // a poster page's pull relocate to the section index. When a path
        // segment of the row's slot (or a string's own slug label) names a
        // route directory under the section prefix, the string must render on
        // THAT page — not merely somewhere in the family.
        const rowSegs = labeledPath ? labeledPath.split(/[.[\]"'`]+/).filter(Boolean) : [];
        const pagesFor = (s) => {
          if (!secPrefixes || secPrefixes.length === 0) return routePages;
          const segs = [...rowSegs, ...(slugByString.has(s) ? [slugByString.get(s)] : [])];
          for (const seg of segs) {
            const sub = routePages.filter((p) => secPrefixes.some((x) => p.rel.startsWith(x + seg + '/')));
            if (sub.length) return sub;
          }
          return routePages;
        };
        const segsRender = (page, s) =>
          s.split(/\[[^\]]+\]/).map((seg) => norm(seg)).filter((seg) => seg.length >= 4)
            .every((seg) => page.text.includes(seg));
        for (const s of strings) {
          const pages = pagesFor(s);
          if (!pages.some((p) => segsRender(p, s))) {
            r.ok = false;
            const where = isHome ? 'index.html'
              : pages !== routePages ? pages.map((p) => p.rel).join('|')
              : (row.section.match(/\/[\w-]+/g) || ['any route']).join('|');
            r.notes.push(`NOT RENDERED on ${where}: "${s.slice(0, 45)}…" — dist is stale, the surface dropped the agreed copy, or it renders off its slug-exact route`);
          }
        }
      }
    }
  } else {
    r.class = 'UNPARSED';
    r.ok = false;
    r.notes.push('row yielded no assertion — parse gap, not a pass');
  }
  results.push(r);
}

/* ---------- report -------------------------------------------------------- */

const landed = results.filter((r) => r.ok).length;
// findstr ORs space-separated terms, so `findstr "landed: 54/54"` also matches
// any line carrying "54/54" — the N/M count format is itself authoritative
// vocabulary. Test mode renders every count as "N of M".
const frac = (a, b) => (TEST_MODE ? `${a} of ${b}` : `${a}/${b}`);
out();
out(`  fidelity check v3.6${banner} — extraction from ${PLAN}`);
out(`  integrity: ${TEST_MODE ? 'tracked/clean checks SKIPPED (test mode)' : 'artifacts tracked+clean vs HEAD'} · ${frac(rows.length, declaredRows)} declared rows · manifest ${manifestRoutes.length} routes all present${extraPages.length ? ` · EXTRA pages: ${extraPages.join(', ')}` : ''} · §12 slots: ${slotIndex.length} · baseline ${baselineErr ? 'UNAVAILABLE' : BASELINE_REF}`);
out();
// VOCABULARY SPLIT (v3.4, Sol): test-mode output shares NO success vocabulary
// with proof mode. `validator | findstr "landed: 54/54"` used to match the
// branded test-mode summary (findstr ORs space-separated terms, so bare
// "54/54" counts matched too); now "landed:"/"PASS"/"N/M" counts and the
// proof token appear ONLY in proof mode — test mode says "SIM-OK"/"sim rows
// green: N of M". No substring filter can promote a sabotage run to an
// authoritative pass.
const OK_WORD = TEST_MODE ? 'SIM-OK  ' : 'PASS';
const BAD_WORD = TEST_MODE ? 'SIM-FAIL' : 'FAIL';
let lastSection = '';
for (const r of results) {
  if (r.section !== lastSection) { out(`  — ${r.section}`); lastSection = r.section; }
  out(`  ${r.ok ? OK_WORD : BAD_WORD}  [${r.class.padEnd(9)}] ${r.slot}`);
  if (!r.ok) for (const n of r.notes) out(`          ${n}`);
}
out();
out(`  rows parsed: ${results.length} · ${TEST_MODE ? 'sim rows green' : 'landed'}: ${frac(landed, results.length)} · binding: exact leaf, index-ordered, consume-once (padding/superstring/swap fail); fragments end-anchored to the same baseline leaf · rendered-output asserted per route`);
out(`  authoritative: ${TEST_MODE ? 'NO — TEST MODE' : 'yes (proof mode, overrides rejected)'}`);
out(`  exit contract: proof 0=landed · 1=failed/fatal/override — test mode 3=landed · 2=failed/fatal (never 0 or 1). Direct invocation only: a pipeline reports the LAST command's status — use pipefail (bash) or check $LASTEXITCODE (PowerShell).`);
if (!TEST_MODE && landed === results.length)
  out(`FIDELITY-PROOF-AUTHORITATIVE-PASS rows=${landed}/${results.length}`); // exclusive machine token — NEVER printed in test mode
out();
process.exit(landed !== results.length ? EXIT_FAIL : EXIT_PASS);
