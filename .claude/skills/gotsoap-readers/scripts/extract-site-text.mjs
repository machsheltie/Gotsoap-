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
 * HONEST LIMIT: this extract preserves SOURCE order, which is visual order only while no CSS
 * reorders it. The layout markers below (order-altering CSS detection) are a BEST-EFFORT
 * heuristic, not a guarantee — CSS-computed visual order is declared out of scope for static
 * copy tooling (owner decision 2026-07-29; see the fidelity checker's scope contract). Visual
 * order is verified by the owner's Chrome pass at the locked breakpoints (390/1440/1920).
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
const cssFiles = [];
(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n.endsWith('.html')) pages.push(p);
    else if (n.endsWith('.css')) cssFiles.push(p);
  }
})(DIST);

// VISUAL-ORDER HONESTY (2026-07-27): this extract preserves SOURCE order —
// CSS can flip shipped visual order (flex *-reverse, non-zero order,
// direction:rtl) without touching the DOM, and a text extract cannot see
// that. So blocks affected by order-altering CSS are MARKED, making the
// reversal observable to the blind read instead of silently misrepresented.
// Mirrors fidelity-check.mjs v3.10: brace tokenizer (sees @media/@supports/
// nested rules), the full primitive set (flex-direction/flex-flow/flex-wrap
// *-reverse, direction:rtl, writing-mode:*-rl, grid-auto-flow dense), and
// two taint kinds — SELF (the element is the reversed container) vs PARENT
// (`order` reorders the element among its siblings, so the PARENT is what
// reads out of order).
const SELF_TAINT = /(?:flex-direction|flex-flow|flex-wrap)\s*:[^;}]*(?:-reverse|(?:var|calc)\()|direction\s*:\s*(?:rtl|(?:var|calc)\()|writing-mode\s*:[^;}]*(?:-rl|(?:var|calc)\()|grid-auto-flow\s*:[^;}]*(?:dense|(?:var|calc)\()/i;
const PARENT_TAINT = /(?:^|[;{\s])order\s*:\s*(?:[-+]?0*[1-9]\d*|[-+]?\d*\.\d*[1-9]\d*|[^;}]*(?:var|calc)\()/i;
const emptyTaints = () => ({ classes: new Map(), ids: new Map(), global: { self: false, parent: false } });
// Frame-based tokenizer (mirrors fidelity-check.mjs v3.11): native nesting no
// longer loses outer declarations; selectors credit class AND id tokens; a
// tainted selector with neither becomes a GLOBAL page taint. var()/calc() in
// a flow/order property is tainted by over-approximation.
const reversalTaintsFrom = (css) => {
  const res = emptyTaints();
  const addTo = (map, k, kind) => {
    const e = map.get(k) || { self: false, parent: false };
    e[kind] = true;
    map.set(k, e);
  };
  const credit = (sel, decls) => {
    if (!sel || sel.startsWith('@')) return;
    const self = SELF_TAINT.test(decls), parent = PARENT_TAINT.test(decls);
    if (!self && !parent) return;
    const classes = [...sel.matchAll(/\.([A-Za-z_][\w-]*)/g)].map((m) => m[1]);
    const ids = [...sel.matchAll(/#([A-Za-z_][\w-]*)/g)].map((m) => m[1]);
    if (classes.length === 0 && ids.length === 0) {
      res.global.self = res.global.self || self;
      res.global.parent = res.global.parent || parent;
      return;
    }
    for (const c of classes) { if (self) addTo(res.classes, c, 'self'); if (parent) addTo(res.classes, c, 'parent'); }
    for (const c of ids) { if (self) addTo(res.ids, c, 'self'); if (parent) addTo(res.ids, c, 'parent'); }
  };
  css = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const stack = [];
  let buf = '';
  for (const ch of css) {
    if (ch === '{') {
      const cut = buf.lastIndexOf(';');
      const childSel = buf.slice(cut + 1).trim();
      if (cut >= 0 && stack.length) stack[stack.length - 1].decls += buf.slice(0, cut + 1);
      stack.push({ sel: childSel, decls: '' });
      buf = '';
      continue;
    }
    if (ch === '}') {
      const frame = stack.pop() || { sel: '', decls: '' };
      credit(frame.sel, frame.decls + buf);
      buf = '';
      continue;
    }
    buf += ch;
  }
  return res;
};
const mergeTaints = (into, from) => {
  for (const map of ['classes', 'ids'])
    for (const [k, kinds] of from[map]) {
      const e = into[map].get(k) || { self: false, parent: false };
      e.self = e.self || kinds.self;
      e.parent = e.parent || kinds.parent;
      into[map].set(k, e);
    }
  into.global.self = into.global.self || from.global.self;
  into.global.parent = into.global.parent || from.global.parent;
};
const globalTaints = emptyTaints();
for (const f of cssFiles) mergeTaints(globalTaints, reversalTaintsFrom(readFileSync(f, 'utf8')));
const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

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
  const pageTaints = emptyTaints();
  mergeTaints(pageTaints, globalTaints);
  for (const st of readFileSync(p, 'utf8').matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi))
    mergeTaints(pageTaints, reversalTaintsFrom(st[1]));
  // Pre-pass with an open-element stack: SELF taints mark the element itself;
  // PARENT taints (child `order`) mark the element's PARENT — that is the
  // block whose children read out of order.
  const markAt = new Map(); // opening-tag offset -> marker text
  {
    const stack = [];
    for (const m of h.matchAll(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi)) {
      const tag = m[1].toLowerCase();
      if (m[0][1] === '/') {
        while (stack.length && stack[stack.length - 1].tag !== tag) stack.pop();
        if (stack.length) stack.pop();
        continue;
      }
      const cls = (m[0].match(/\sclass="([^"]*)"/i) || [])[1];
      const idAttr = (m[0].match(/\sid="([^"]*)"/i) || [])[1];
      const style = (m[0].match(/\sstyle="([^"]*)"/i) || [])[1];
      let self = false, parent = false;
      if (cls) for (const t of cls.split(/\s+/)) {
        const k = pageTaints.classes.get(t);
        if (k) { self = self || k.self; parent = parent || k.parent; }
      }
      if (idAttr) {
        const k = pageTaints.ids.get(idAttr.trim());
        if (k) { self = self || k.self; parent = parent || k.parent; }
      }
      if (style) {
        if (SELF_TAINT.test(style)) self = true;
        if (PARENT_TAINT.test(style)) parent = true;
      }
      if (self) markAt.set(m.index, ' [layout: CSS alters this block’s VISUAL order/flow — the on-page arrangement differs from this text’s source order] ');
      const par = stack[stack.length - 1];
      if (parent && par) markAt.set(par.idx, ' [layout: children of this block are visually REORDERED by CSS `order` — on-page sequence differs from this text] ');
      if (!VOID_TAGS.has(tag) && !/\/>$/.test(m[0])) stack.push({ tag, idx: m.index });
    }
  }
  h = h.replace(/<[a-z][^>]*>/gi, (tag, offset) => {
    let out = tag;
    if (markAt.has(offset)) out += markAt.get(offset);
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
  const globalNote = (pageTaints.global.self || pageTaints.global.parent)
    ? '[layout note: a type-level CSS rule reorders elements on this page — visual order may differ from this text]\n\n'
    : '';
  writeFileSync(join(OUT, `${name}.txt`), `=== PAGE: ${route} ===\n\n${globalNote}${h}`);
}

console.log(`extracted ${pages.length} pages →\n${OUT}`);
console.log('\nHand that path to the reader-sim agents. Suggest they start at index.txt and follow their own curiosity.');
