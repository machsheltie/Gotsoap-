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

function resolveSlot(mod, path) {
  const root = mod.default ?? mod;
  const direct = resolveAt(root, path);
  if (direct !== undefined) return { value: direct, at: path };
  for (const [k, v] of Object.entries(root)) {
    if (v && typeof v === 'object') {
      const nested = resolveAt(v, path);
      if (nested !== undefined) return { value: nested, at: `${k}.${path}` };
    }
  }
  return undefined;
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

// Baseline deck (pinned).
let baseMod = null, baselineErr = null;
try {
  const baseSrc = git(['show', `${BASELINE_REF}:site/src/content/copy.ts`]);
  const tmp = mkdtempSync(join(tmpdir(), 'fidelity-base-'));
  const basePath = join(tmp, 'copy-baseline.ts');
  writeFileSync(basePath, baseSrc);
  baseMod = await import(pathToFileURL(basePath).href);
} catch (e) {
  baselineErr = `baseline deck unavailable (git show ${BASELINE_REF}): ${e.message.split('\n')[0]}`;
}

// Dist vs the INDEPENDENT manifest.
let distPages = [];
if (!existsSync(DIST)) fatal.push('dist/ absent — run `npm run build` first');
else {
  distPages = htmlFiles(DIST).map((p) => ({
    rel: relative(DIST, p).split(sep).join('/'),
    raw: readFileSync(p, 'utf8'),
  }));
  for (const p of distPages) p.text = norm(unescapeHtml(p.raw));
  for (const req of manifestRoutes) {
    const page = distPages.find((p) => p.rel === req);
    if (!page) fatal.push(`dist is PARTIAL/SUBSTITUTED — manifest route missing: ${req}`);
    else if (page.raw.length < 2000 || !/<html/i.test(page.raw))
      fatal.push(`dist page ${req} is not a real document (${page.raw.length} bytes)`);
  }
}
const extraPages = distPages.map((p) => p.rel).filter((r) => !manifestRoutes.includes(r));

if (fatal.length) {
  for (const f of fatal) console.error(`FATAL${banner}: ${f}`);
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
  console.error(`FATAL${banner}: plan section markers (## 1. … ## 8.) not found — truncated/substituted plan`);
  process.exit(EXIT_FAIL);
}
const body = planText.slice(start, end);

let section = '';
const seenSections = new Set();
const rows = [];
for (const line of body.split('\n')) {
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
  if (!seenSections.has(i)) { console.error(`FATAL${banner}: plan section §${i} missing — truncated plan`); process.exit(EXIT_FAIL); }
if (rows.length === 0) { console.error(`FATAL${banner}: zero rows parsed — vacuous`); process.exit(EXIT_FAIL); }
if (Number.isFinite(declaredRows) && rows.length !== declaredRows) {
  console.error(`FATAL${banner}: parsed ${rows.length} rows but the order declares ${declaredRows} — partial or padded plan`);
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
    let scope = null, scopeName = null;
    if (labeledPath) {
      const hit = resolveSlot(mod, labeledPath);
      if (!hit) { r.ok = false; r.notes.push(`labeled slot ${labeledPath} does not resolve in the deck`); }
      else { scope = walkStrings(hit.value, []); scopeName = hit.at; }
    } else if (rcSlot) {
      const f = files.find((x) => x.id === rcSlot[1]);
      if (!f) { r.ok = false; r.notes.push(`${rcSlot[1]} missing from roster`); }
      else { scope = [norm(f[rcSlot[2]])]; scopeName = `caseFiles[${rcSlot[1]}].${rcSlot[2]}`; }
    } else if (qSlot) {
      const q = root.sniffTest?.questions?.[Number(qSlot[1]) - 1];
      const idx = 'abcd'.indexOf(qSlot[2]);
      if (!q || !q.a?.[idx]) { r.ok = false; r.notes.push(`Q${qSlot[1]}(${qSlot[2]}) missing`); }
      else { scope = [norm(q.a[idx])]; scopeName = `sniffTest.questions[${Number(qSlot[1]) - 1}].a[${idx}]`; }
    }
    if (r.ok) {
      const slugByString = new Map(slugPairs.map((p) => [p.s, p.key]));
      const keyByString = new Map(keyPairs.map((p) => [p.s, p.key]));
      const field = /share payload/i.test(rowText) ? 'share' : /pledge cue/i.test(rowText) ? 'exit' : null;
      for (const s of strings) {
        // 1) the row's own labeled slot
        if (scope && scope.some((d) => d.includes(s))) { r.notes.push(`ok @ ${scopeName}`); continue; }
        // 2) slug-labeled verdicts field (share payloads / pledge cues)
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
        // 4) exact-value match at a §12-indexed slot
        const hit = exactAtIndexed(s);
        if (hit) { r.notes.push(`ok @ ${hit.at} (exact, §12-indexed)`); continue; }
        r.ok = false;
        r.notes.push(`NOT slot-bound: "${s.slice(0, 55)}…"${scope ? ` (absent from ${scopeName})` : ''}${deckStrings.some((d) => d.includes(s)) ? ' — exists elsewhere in deck: RELOCATION' : ''}`);
      }
      // The featured-file row also pins featuredId by its RC-id.
      if (!slotLabeled && !rcSlot && !qSlot && /featured/i.test(slotCell)) {
        const id = (rowText.match(/RC-\d+/) || [])[0];
        const idHit = id && slotIndex.find((e) => e.value === id);
        if (!idHit) { r.ok = false; r.notes.push(`no §12 slot carries featured id ${id}`); }
        else r.notes.push(`featured id ${id} @ ${idHit.at}`);
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
console.log(`\n  fidelity check v3${banner} — extraction from ${PLAN}`);
console.log(`  integrity: ${TEST_MODE ? 'tracked/clean checks SKIPPED (test mode)' : 'artifacts tracked+clean vs HEAD'} · ${rows.length}/${declaredRows} declared rows · manifest ${manifestRoutes.length} routes all present${extraPages.length ? ` · EXTRA pages: ${extraPages.join(', ')}` : ''} · §12 slots: ${slotIndex.length} · baseline ${baselineErr ? 'UNAVAILABLE' : BASELINE_REF}\n`);
let lastSection = '';
for (const r of results) {
  if (r.section !== lastSection) { console.log(`  — ${r.section}`); lastSection = r.section; }
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  [${r.class.padEnd(9)}] ${r.slot}`);
  if (!r.ok) for (const n of r.notes) console.log(`          ${n}`);
}
console.log(`\n  rows parsed: ${results.length} · landed: ${landed}/${results.length} · containment-only rows: 0 (binding is mandatory)`);
console.log(`  authoritative: ${TEST_MODE ? 'NO — TEST MODE' : 'yes (proof mode, overrides rejected)'}\n`);
process.exit(landed !== results.length ? EXIT_FAIL : EXIT_PASS);
