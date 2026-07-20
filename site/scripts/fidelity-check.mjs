/**
 * fidelity-check.mjs — Phase 5 implementation fidelity checker (v2).
 *
 * v1 was HELD by Sol (adversarial review, 2026-07-20): it could be made to lie
 * with a fake six-page dist, a truncated plan, relocated strings, and edited
 * "inherited/unchanged" text. v2 closes each hole, in his order:
 *
 *  P1-1  ARTIFACT INTEGRITY — the plan's row total must equal the count the
 *        implementation order declares; §1–§7 must each yield rows; the plan
 *        and order must be git-TRACKED (a clean checkout can reproduce this);
 *        the dist page set is DERIVED FROM THE DECK (meta + verdicts routes)
 *        and every required page must exist and be a real HTML document.
 *        A substituted or partial artifact is a FATAL, not a smaller total.
 *  P1-2  SLOT BINDING — a row whose label names a deck slot asserts its text
 *        AT that slot (subtree containment, parent-scope fallback reported).
 *        RC-#### quote/status rows bind to the case file by id; "Qn answer
 *        (x)" rows bind to sniffTest.questions[n-1].a[x]. Text hidden in an
 *        unrelated key no longer satisfies a bound row. A labeled slot that
 *        no longer resolves is a FAILURE. Unbound rows are counted and named.
 *  P1-3  LIGHTBOX SEMANTICS — per poster page: the composed alt appears
 *        EXACTLY once as an <img alt="…"> attribute OUTSIDE any <dialog>;
 *        every <img> INSIDE a dialog has alt=""; the dialog carries a
 *        non-empty aria-label. Raw text mentions no longer count.
 *  P1-4  EXACT BASELINES — INHERIT/UNCHANGED rows byte-compare against the
 *        pre-implementation deck at BASELINE_REF (git show). If the baseline
 *        cannot be loaded, those rows FAIL — they never silently pass.
 *
 * Still EXTRACTION-based (order §4): every assertion derives from
 * `copy-correction-plan.md` / `copy-implementation-order.md` / the deck
 * module / git — never from a hand-copied list in this file.
 *
 *   node --experimental-strip-types scripts/fidelity-check.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const PLAN = process.env.FIDELITY_PLAN || '../docs/copy/copy-correction-plan.md';
const ORDER = process.env.FIDELITY_ORDER || '../docs/copy/copy-implementation-order.md';
const COPY_TS = process.env.FIDELITY_COPY_TS || 'src/content/copy.ts';
const DIST = process.env.FIDELITY_DIST || 'dist';
/** Pre-implementation deck commit — parent of the Phase-5 landing commit. */
const BASELINE_REF = process.env.FIDELITY_BASELINE_REF || '4d67a19';

/* ---------- helpers ------------------------------------------------------- */

const norm = (s) =>
  s.normalize('NFC').replace(/\\(["`'])/g, '$1').replace(/\s+/g, ' ').trim();

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

/** Resolve a plan slot path against the deck: as-is from the default export,
 * else nested one level under any export group (plan sometimes omits the
 * group, e.g. `newsletter.subjectFormulas` → pledge.newsletter…). */
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

function htmlFiles(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/* ---------- load artifacts, with integrity guards (P1-1) ------------------- */

const fatal = [];
const tracked = (p) => {
  try { return execFileSync('git', ['ls-files', '--', p], { encoding: 'utf8' }).trim().length > 0; }
  catch { return false; }
};

if (!existsSync(PLAN)) fatal.push(`plan not found at ${PLAN}`);
if (!existsSync(ORDER)) fatal.push(`implementation order not found at ${ORDER}`);
if (!process.env.FIDELITY_PLAN && existsSync(PLAN) && !tracked(PLAN))
  fatal.push(`plan is NOT git-tracked — a clean checkout cannot reproduce this check`);
if (!process.env.FIDELITY_ORDER && existsSync(ORDER) && !tracked(ORDER))
  fatal.push(`implementation order is NOT git-tracked`);

let planText = '', declaredRows = NaN;
if (existsSync(PLAN)) planText = readFileSync(PLAN, 'utf8');
if (existsSync(ORDER)) {
  const m = readFileSync(ORDER, 'utf8').match(/All \*\*(\d+) correction rows\*\*/);
  if (!m) fatal.push('order doc does not declare a correction-row total — integrity anchor missing');
  else declaredRows = Number(m[1]);
}

let mod = null, deckStrings = [];
try {
  mod = await import(pathToFileURL(COPY_TS).href);
  deckStrings = walkStrings(mod.default ?? mod);
  if (deckStrings.length === 0) fatal.push('vacuous deck walk — zero strings');
} catch (e) {
  fatal.push(`deck UNLOADABLE (${e.code || e.message}) — run with node --experimental-strip-types`);
}

// Baseline deck for INHERIT/UNCHANGED (P1-4). Failure to load ≠ pass.
let baseMod = null, baselineErr = null;
try {
  const baseSrc = execFileSync('git', ['show', `${BASELINE_REF}:site/src/content/copy.ts`], {
    encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
  });
  const tmp = mkdtempSync(join(tmpdir(), 'fidelity-base-'));
  const basePath = join(tmp, 'copy-baseline.ts');
  writeFileSync(basePath, baseSrc);
  baseMod = await import(pathToFileURL(basePath).href);
} catch (e) {
  baselineErr = `baseline deck unavailable (git show ${BASELINE_REF}): ${e.message.split('\n')[0]}`;
}

// Required dist pages are DERIVED FROM THE DECK (meta routes + verdict slugs).
let distPages = [], requiredPages = [];
if (mod) {
  const root = mod.default ?? mod;
  const routeOf = (k) => (k === 'home' ? 'index.html' : k === 'notFound' ? '404.html' : `${k}/index.html`);
  requiredPages = [
    ...Object.keys(root.meta ?? {}).map(routeOf),
    ...Object.keys(root.verdicts ?? {}).map((s) => `sniff-test/${s}/index.html`),
  ];
}
if (!existsSync(DIST)) fatal.push('dist/ absent — run `npm run build` first');
else {
  distPages = htmlFiles(DIST).map((p) => ({
    rel: relative(DIST, p).split(sep).join('/'),
    raw: readFileSync(p, 'utf8'),
  }));
  for (const p of distPages) p.text = norm(unescapeHtml(p.raw));
  for (const req of requiredPages) {
    const page = distPages.find((p) => p.rel === req);
    if (!page) fatal.push(`dist is PARTIAL/SUBSTITUTED — required page missing: ${req}`);
    else if (page.raw.length < 2000 || !/<html/i.test(page.raw))
      fatal.push(`dist page ${req} is not a real document (${page.raw.length} bytes) — substituted artifact`);
  }
}

if (fatal.length) {
  for (const f of fatal) console.error(`FATAL: ${f}`);
  process.exit(1);
}

const inStrings = (list, s) => list.some((d) => d.includes(s));
const inDeck = (s) => inStrings(deckStrings, s);
const distHits = (s) => distPages.filter((p) => p.text.includes(s)).map((p) => p.rel);

/* ---------- parse the plan (§1–§7 only) ------------------------------------ */

const start = planText.indexOf('## 1.');
const end = planText.indexOf('## 8.');
if (start === -1 || end === -1) {
  console.error('FATAL: plan section markers (## 1. … ## 8.) not found — truncated/substituted plan');
  process.exit(1);
}
const body = planText.slice(start, end);

let section = '', sectionNo = 0;
const seenSections = new Set();
const rows = [];
for (const line of body.split('\n')) {
  const h = line.match(/^## (\d+)\. (.+)$/);
  if (h) { sectionNo = Number(h[1]); section = h[2].trim(); seenSections.add(sectionNo); continue; }
  if (!line.startsWith('|')) continue;
  if (/^\|\s*-+/.test(line) || /^\|[\s|:-]+$/.test(line)) continue;
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^(Key|Slot|Keep)$/i.test(cells[0]) && /^(Agreed final|Vector)/i.test(cells[1] || '')) continue;
  rows.push({ section, cells, raw: line });
}

for (let i = 1; i <= 7; i++)
  if (!seenSections.has(i)) { console.error(`FATAL: plan section §${i} missing — truncated plan`); process.exit(1); }
if (rows.length === 0) { console.error('FATAL: zero rows parsed — vacuous parse'); process.exit(1); }
if (Number.isFinite(declaredRows) && rows.length !== declaredRows) {
  console.error(`FATAL: parsed ${rows.length} rows but the implementation order declares ${declaredRows} — partial or padded plan`);
  process.exit(1);
}

/* ---------- classify + assert --------------------------------------------- */

const BOLD_QUOTED = /\*\*"([^]*?)"\*\*/g;
const results = [];
let unboundRows = 0;

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

  const root = mod.default ?? mod;
  const files = root.crisis?.caseFiles?.files ?? [];

  if (isStructural) {
    r.class = 'CONTRACT';
    const ids = [...rowText.matchAll(/RC-\d+/g)].map((m) => m[0]);
    if (/lightbox/i.test(rowText)) {
      // P1-3: real a11y semantics, not raw text counts.
      const altRows = rows.filter((x) => x.section === row.section && /\.alt`/.test(x.cells[0]));
      if (altRows.length === 0) { r.ok = false; r.notes.push('no alt rows in section — contract unverifiable'); }
      for (const ar of altRows) {
        const slug = (ar.cells[0].match(/`posterCopy\.["']?([\w-]+)/) || [])[1];
        const alt = [...ar.cells[1].matchAll(BOLD_QUOTED)].map((m) => norm(m[1]))[0];
        const page = distPages.find((p) => p.rel === `psas/${slug}/index.html`);
        if (!page) { r.ok = false; r.notes.push(`${slug}: page missing`); continue; }
        const dialogs = page.raw.match(/<dialog[^>]*>[\s\S]*?<\/dialog>/g) || [];
        if (dialogs.length === 0) { r.ok = false; r.notes.push(`${slug}: no <dialog> — lightbox absent`); continue; }
        const outside = dialogs.reduce((h, d) => h.replace(d, ''), page.raw);
        const altAttr = `alt="${escAttr(alt)}"`;
        const outsideCount = outside.split(altAttr).length - 1;
        if (outsideCount !== 1) { r.ok = false; r.notes.push(`${slug}: composed alt appears ${outsideCount}× as an <img alt> outside dialogs (must be exactly 1)`); }
        for (const d of dialogs) {
          const imgs = d.match(/<img[^>]*>/g) || [];
          for (const img of imgs) {
            // Astro renders alt="" as a bare `alt` attribute — both are the
            // empty (decorative) value. A MISSING alt attribute is a failure
            // in its own right; a non-empty one is the duplicate description.
            const m = img.match(/\salt(?:="([^"]*)")?(?=[\s/>])/);
            if (!m) { r.ok = false; r.notes.push(`${slug}: dialog <img> has NO alt attribute`); }
            else if ((m[1] ?? '') !== '') { r.ok = false; r.notes.push(`${slug}: dialog <img> alt is non-empty — duplicate description risk`); }
          }
          const label = d.match(/<dialog[^>]*aria-label="([^"]*)"/);
          if (imgs.length && (!label || !label[1].trim())) { r.ok = false; r.notes.push(`${slug}: dialog with imagery lacks an accessible name`); }
        }
      }
      if (r.ok) r.notes.push('per page: alt once outside dialogs · dialog imgs alt="" · dialogs named');
    } else if (ids.length) {
      for (const id of ids) {
        const hits = distHits(id);
        if (hits.length) { r.ok = false; r.notes.push(`${id} still renders in: ${hits.join(', ')}`); }
      }
      if (r.ok) r.notes.push(`${ids.join(', ')} absent from all rendered pages`);
    } else { r.ok = false; r.notes.push('structural row with no mechanical handle'); }
  } else if (roster) {
    r.class = 'ROSTER';
    const have = new Set(files.map((f) => f.id));
    for (const id of roster.keep) if (!have.has(id)) { r.ok = false; r.notes.push(`kept ${id} MISSING`); }
    for (const id of roster.cut) {
      if (have.has(id)) { r.ok = false; r.notes.push(`cut ${id} STILL IN deck`); }
      const hits = distHits(id);
      if (hits.length) { r.ok = false; r.notes.push(`cut ${id} still renders: ${hits.join(',')}`); }
    }
    if (r.ok) r.notes.push(`roster = [${[...have].join(', ')}]`);
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
    // P1-4: byte-exact against the baseline deck.
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
    // P1-2: bind to the named slot when the row provides one.
    let scope = null, scopeName = 'deck-wide';
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
      for (const s of strings) {
        if (scope && inStrings(scope, s)) continue;
        if (scope && labeledPath) {
          // Parent-scope fallback for multi-slot rows (e.g. badgeShare + its title).
          const parentPath = labeledPath.replace(/[.[][^.[\]]+\]?$/, '');
          const parent = parentPath && parentPath !== labeledPath ? resolveSlot(mod, parentPath) : null;
          if (parent && inStrings(walkStrings(parent.value, []), s)) { r.notes.push(`"${s.slice(0, 40)}…" bound at parent ${parent.at}`); continue; }
          r.ok = false; r.notes.push(`NOT AT SLOT ${scopeName}: "${s.slice(0, 60)}…"${inDeck(s) ? ' (exists elsewhere in deck — relocation)' : ''}`);
        } else if (!scope) {
          if (!inDeck(s)) { r.ok = false; r.notes.push(`NOT IN DECK: "${s.slice(0, 60)}…"`); }
        } else { r.ok = false; r.notes.push(`NOT AT SLOT ${scopeName}: "${s.slice(0, 60)}…"`); }
      }
      if (!scope) { unboundRows++; r.notes.push(`slot-unbound (label-only row) — deck-wide containment only`); }
      else if (r.ok) r.notes.push(`${strings.length} string(s) verified at ${scopeName}`);
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
console.log(`\n  fidelity check v2 — extraction from ${PLAN}`);
console.log(`  integrity: plan tracked · ${rows.length}/${declaredRows} declared rows · dist ${distPages.length} pages (all ${requiredPages.length} deck-derived routes present) · baseline ${baselineErr ? 'UNAVAILABLE' : BASELINE_REF}\n`);
let lastSection = '';
for (const r of results) {
  if (r.section !== lastSection) { console.log(`  — ${r.section}`); lastSection = r.section; }
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  [${r.class.padEnd(9)}] ${r.slot}`);
  if (!r.ok) for (const n of r.notes) console.log(`          ${n}`);
}
console.log(`\n  rows parsed: ${results.length} · landed: ${landed}/${results.length} · slot-bound: ${results.length - unboundRows} · unbound (containment-only): ${unboundRows}`);
console.log(`  deck strings: ${deckStrings.length} · dist pages: ${distPages.length}\n`);
if (landed !== results.length) process.exit(1);
