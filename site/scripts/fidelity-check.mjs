/**
 * fidelity-check.mjs — Phase 5 implementation fidelity checker.
 *
 * CONTRACT (copy-implementation-order.md §4): EXTRACTION-based. This script
 * parses `docs/copy/copy-correction-plan.md` — the Phase 4/5 consensus artifact
 * — and turns every correction row into an assertion. There is NO hand-copied
 * list of strings anywhere in this file: if the implementer forgot a row, the
 * row is still parsed from the plan and still fails. "Assert on the artifact,
 * never on the author's account of the artifact."
 *
 * Assertion layers:
 *   deck — copy.ts is imported as a MODULE (CG7's strip-types technique) and
 *          every plan string must appear inside some exported string VALUE
 *          (normalized containment). Comments can never satisfy an assertion.
 *   dist — structural contracts assert against built HTML: the cut RC-071
 *          never renders, the home flagship pull slot is gone, and each poster
 *          alt appears EXACTLY once on its page (the lightbox a11y contract —
 *          a duplicated description or a vanished one both fail).
 *          For ordinary copy rows the dist column is reported as info: email/
 *          newsletter strings never render, so dist can inform but not veto.
 *
 * Row classes (derived from the ROW'S OWN TEXT, never hardcoded content):
 *   PRESENCE  — row carries bold-quoted agreed text  → containment in deck
 *   ABSENCE   — row says Delete/Omit                 → slot path undefined /
 *                                                      dist marker absent
 *   ROUTING   — row maps `a` → `b` label keys        → module values identical
 *   ROSTER    — row lists Keep/cut RC-ids            → kept present, cut absent
 *   INHERIT   — row says Inherited verbatim          → file exists, non-empty
 *   UNCHANGED — row says Unchanged                   → slot exists, non-empty
 *   CONTRACT  — structural rows                      → dist assertions above
 *
 * Vacuous-run rule (order §4, CG7 precedent): zero parsed rows, an unloadable
 * deck, or a missing dist/ is a FAILURE, never a clean pass.
 *
 *   node --experimental-strip-types scripts/fidelity-check.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const PLAN = process.env.FIDELITY_PLAN || '../docs/copy/copy-correction-plan.md';
const COPY_TS = process.env.FIDELITY_COPY_TS || 'src/content/copy.ts';
const DIST = process.env.FIDELITY_DIST || 'dist';

/* ---------- helpers ------------------------------------------------------- */

const norm = (s) =>
  s
    .normalize('NFC')
    .replace(/\\(["`'])/g, '$1') // TS escapes in source-adjacent text
    .replace(/\s+/g, ' ')
    .trim();

const unescapeHtml = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

function walkStrings(node, out = [], seen = new Set()) {
  if (typeof node === 'string') {
    out.push(norm(node));
    return out;
  }
  if (node === null || typeof node !== 'object') return out;
  if (seen.has(node)) return out;
  seen.add(node);
  for (const v of Object.values(node)) walkStrings(v, out, seen);
  return out;
}

/** Resolve a dotted path like `crisis.caseFiles.exitLine` or `about.why[2]`. */
function getPath(mod, path) {
  const segs = path
    .split('.')
    .flatMap((p) => p.split(/[[\]]/).filter(Boolean))
    .map((p) => (/^\d+$/.test(p) ? Number(p) : p));
  let cur = mod.default ?? mod;
  for (const s of segs) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[s];
  }
  return cur;
}

function htmlFiles(dir, out = []) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) htmlFiles(p, out);
    else if (n.endsWith('.html')) out.push(p);
  }
  return out;
}

/* ---------- load the three artifacts -------------------------------------- */

const failuresFatal = [];
if (!existsSync(PLAN)) {
  console.error(`FATAL: plan not found at ${PLAN}`);
  process.exit(1);
}
const planText = readFileSync(PLAN, 'utf8');

let deckStrings = [];
let mod = null;
try {
  mod = await import(pathToFileURL(COPY_TS).href);
  deckStrings = walkStrings(mod.default ?? mod);
} catch (e) {
  failuresFatal.push(`deck UNLOADABLE (${e.code || e.message}) — run with node --experimental-strip-types`);
}
if (mod && deckStrings.length === 0) failuresFatal.push('vacuous deck walk — zero strings');

let distPages = [];
if (!existsSync(DIST)) failuresFatal.push(`dist/ absent — run \`npm run build\` first`);
else
  distPages = htmlFiles(DIST).map((p) => ({
    rel: relative(DIST, p).split(sep).join('/'),
    text: norm(unescapeHtml(readFileSync(p, 'utf8'))),
  }));

if (failuresFatal.length) {
  for (const f of failuresFatal) console.error(`FATAL: ${f}`);
  process.exit(1);
}

const inDeck = (s) => deckStrings.some((d) => d.includes(s));
const distHits = (s) => distPages.filter((p) => p.text.includes(s)).map((p) => p.rel);
const countIn = (page, s) => {
  if (!page) return 0;
  let n = 0;
  for (let i = page.text.indexOf(s); i !== -1; i = page.text.indexOf(s, i + 1)) n++;
  return n;
};

/* ---------- parse the plan ------------------------------------------------ */

// Sections §1–§7 are the correction rows; §8+ (new work / deadlocks / verify) are not.
const start = planText.indexOf('## 1.');
const end = planText.indexOf('## 8.');
if (start === -1 || end === -1) {
  console.error('FATAL: plan section markers (## 1. … ## 8.) not found — parse impossible');
  process.exit(1);
}
const body = planText.slice(start, end);

let section = '';
const rows = [];
for (const line of body.split('\n')) {
  const h = line.match(/^## (\d+)\. (.+)$/);
  if (h) {
    section = h[2].trim();
    continue;
  }
  if (!line.startsWith('|')) continue;
  if (/^\|\s*-+/.test(line) || /^\|[\s|:-]+$/.test(line)) continue; // separator
  const cells = line.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  if (/^(Key|Slot|Keep)$/i.test(cells[0]) && /^(Agreed final|Vector)/i.test(cells[1] || '')) continue; // header
  rows.push({ section, cells, raw: line });
}

if (rows.length === 0) {
  console.error('FATAL: zero rows parsed from the plan — a vacuous parse is a failure');
  process.exit(1);
}

/* ---------- classify + assert --------------------------------------------- */

const BOLD_QUOTED = /\*\*"([^]*?)"\*\*/g; // bold segments wrapped in straight quotes
const KEYWORD = /\*\*\s*(Delete|Omit|delete|Inherited verbatim|Unchanged|Structural|Omit\b)/;

const results = [];
for (const row of rows) {
  const [slotCell, agreedCell = '', rationaleCell = ''] = row.cells;
  const rowText = row.cells.join(' | ');
  const strings = [...agreedCell.matchAll(BOLD_QUOTED)].map((m) => norm(m[1]));
  const slotPathMatch = slotCell.match(/`([\w.[\]-]+)`/);
  const slotPath = slotPathMatch ? slotPathMatch[1] : null;
  const r = { section: row.section, slot: slotCell.replace(/\*\*/g, '').slice(0, 60), class: '', ok: true, notes: [] };

  const isStructural = /^\*\*Structural/.test(slotCell) || /^\*\*Structural/.test(rowText);
  const saysDelete = /\*\*\s*(Delete|Omit)/i.test(agreedCell) || /^\*\*(Delete|Omit)\*\*/i.test(agreedCell);
  const saysInherit = /Inherited verbatim/i.test(agreedCell);
  const saysUnchanged = /^Unchanged\b/i.test(agreedCell.replace(/\*\*/g, ''));
  const routingArrow = !saysDelete && strings.length === 0 && /`[\w.]+`\s*→\s*`[\w.]+`/.test(slotCell);
  const rosterIds = /9 → \*\*5\*\*|9 → 5/.test(slotCell + agreedCell)
    ? {
        keep: [...(agreedCell.match(/Keep ([^·]+)/) || ['', ''])[1].matchAll(/RC-\d+/g)].map((m) => m[0]),
        cut: [...(agreedCell.match(/cut (.+)$/) || ['', ''])[1].matchAll(/RC-\d+/g)].map((m) => m[0]),
      }
    : null;

  if (isStructural) {
    r.class = 'CONTRACT';
    const ids = [...rowText.matchAll(/RC-\d+/g)].map((m) => m[0]);
    if (/lightbox/i.test(rowText)) {
      // The five alt rows in this section carry the composed descriptions; the
      // contract is: each appears EXACTLY once on its poster page.
      const altRows = rows.filter(
        (x) => x.section === row.section && /\.alt`/.test(x.cells[0]),
      );
      if (altRows.length === 0) {
        r.ok = false;
        r.notes.push('no alt rows found in section — contract unverifiable');
      }
      for (const ar of altRows) {
        const slug = (ar.cells[0].match(/`posterCopy\.["']?([\w-]+)/) || [])[1];
        const alt = [...ar.cells[1].matchAll(BOLD_QUOTED)].map((m) => norm(m[1]))[0];
        const page = distPages.find((p) => p.rel === `psas/${slug}/index.html`);
        const n = countIn(page, alt);
        if (n !== 1) {
          r.ok = false;
          r.notes.push(`alt for ${slug} appears ${n}× (must be exactly 1 — one description, never two)`);
        }
      }
      if (r.ok) r.notes.push('each poster alt renders exactly once on its page');
    } else if (ids.length) {
      // e.g. the RC-071 home-hardcode retirement: the cut id must not render anywhere.
      for (const id of ids) {
        const hits = distHits(id);
        if (hits.length) {
          r.ok = false;
          r.notes.push(`${id} still renders in: ${hits.join(', ')}`);
        } else r.notes.push(`${id} absent from all rendered pages`);
      }
    } else {
      r.ok = false;
      r.notes.push('structural row with no mechanical handle — must be verified by review');
    }
  } else if (rosterIds) {
    r.class = 'ROSTER';
    const files = getPath(mod, 'crisis.caseFiles.files') || [];
    const have = new Set(files.map((f) => f.id));
    for (const id of rosterIds.keep)
      if (!have.has(id)) { r.ok = false; r.notes.push(`kept file ${id} MISSING from deck`); }
    for (const id of rosterIds.cut)
      if (have.has(id)) { r.ok = false; r.notes.push(`cut file ${id} STILL IN deck`); }
    if (r.ok) r.notes.push(`roster = [${[...have].join(', ')}] — keeps present, cuts gone`);
    // The cut files must not render either.
    for (const id of rosterIds.cut) {
      const hits = distHits(id);
      if (hits.length) { r.ok = false; r.notes.push(`cut ${id} still renders: ${hits.join(',')}`); }
    }
  } else if (routingArrow) {
    r.class = 'ROUTING';
    const pairs = [...slotCell.matchAll(/`([\w.]+)`\s*→\s*`([\w.]+)`/g)];
    for (const [, a, b] of pairs) {
      const va = getPath(mod, a);
      const vb = getPath(mod, b);
      if (va === undefined || vb === undefined || va !== vb) {
        r.ok = false;
        r.notes.push(`${a} (${JSON.stringify(va)}) !== ${b} (${JSON.stringify(vb)})`);
      } else r.notes.push(`${a} === ${b} ("${va}")`);
    }
  } else if (saysDelete && strings.length === 0) {
    r.class = 'ABSENCE';
    if (slotPath) {
      const v = getPath(mod, slotPath);
      if (v !== undefined) { r.ok = false; r.notes.push(`${slotPath} still defined: ${JSON.stringify(v).slice(0, 60)}`); }
      else r.notes.push(`${slotPath} is gone from the deck`);
    } else if (/flagship pull/i.test(slotCell)) {
      const home = distPages.find((p) => p.rel === 'index.html');
      if (home && home.text.includes('camp__pull')) { r.ok = false; r.notes.push('camp__pull still renders on home'); }
      else r.notes.push('home flagship pull slot absent from rendered home');
    } else { r.ok = false; r.notes.push('delete row with no derivable slot'); }
  } else if (saysInherit) {
    r.class = 'INHERIT';
    const id = (rowText.match(/RC-\d+/) || [])[0];
    const files = getPath(mod, 'crisis.caseFiles.files') || [];
    const f = files.find((x) => x.id === id);
    if (!f || !f.quote || !f.status) { r.ok = false; r.notes.push(`${id} missing or empty`); }
    else r.notes.push(`${id} present with quote+status`);
  } else if (saysUnchanged && slotPath) {
    r.class = 'UNCHANGED';
    const v = getPath(mod, slotPath);
    if (typeof v !== 'string' || v.length < 10) { r.ok = false; r.notes.push(`${slotPath} missing/empty`); }
    else r.notes.push(`${slotPath} present (${v.length} chars)`);
  } else if (strings.length) {
    r.class = 'PRESENCE';
    for (const s of strings) {
      if (!inDeck(s)) { r.ok = false; r.notes.push(`NOT IN DECK: "${s.slice(0, 70)}…"`); }
    }
    if (r.ok) {
      const rendered = strings.filter((s) => distHits(s).length > 0).length;
      r.notes.push(`${strings.length} string(s) in deck · ${rendered}/${strings.length} also found in dist (info)`);
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
console.log(`\n  fidelity check — extraction from ${PLAN}\n`);
let lastSection = '';
for (const r of results) {
  if (r.section !== lastSection) {
    console.log(`  — ${r.section}`);
    lastSection = r.section;
  }
  console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  [${r.class.padEnd(9)}] ${r.slot}`);
  if (!r.ok) for (const n of r.notes) console.log(`          ${n}`);
}
console.log(`\n  rows parsed: ${results.length} · rows asserted: ${results.length} · rows landed: ${landed}/${results.length}`);
console.log(`  deck strings walked: ${deckStrings.length} · dist pages scanned: ${distPages.length}\n`);
if (landed !== results.length) process.exit(1);
