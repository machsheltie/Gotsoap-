/**
 * gates.mjs — the machine half of the specs.md §14 acceptance gates.
 *
 * WHY THIS EXISTS
 * The build runs as a two-model loop: Fable executes, Sol audits. A reviewer
 * that spends its reasoning re-deriving "is there a 100vh in here?" is a
 * reviewer wasting the only thing it's good for. So every gate that a machine
 * can decide, a machine decides — here, deterministically, before Sol opens a
 * single file. Sol's budget goes to the gates a machine CANNOT decide: whether
 * five poster environments are genuinely five environments or one component
 * wearing five hats.
 *
 * Each gate below cites the specs.md clause it enforces. If a gate and the spec
 * disagree, the SPEC WINS and this file is the bug.
 *
 *   node scripts/gates.mjs          # source gates only
 *   node scripts/gates.mjs --build  # + payload gates against ./dist (run after `npm run build`)
 *
 * Exit 0 = every gate passed. Exit 1 = at least one FAIL.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const SRC = 'src';
const DIST = 'dist';
const CHECK_BUILD = process.argv.includes('--build');

/* ── phase scoping ────────────────────────────────────────────────────────────
 * A phase only owns some gates. Phase 1 cannot turn G8 green — the placement hub
 * is Phase 5 and ships a surface Phase 1 is forbidden to touch. Without scoping,
 * a correctly-completed phase still exits non-zero, and the reviewer rejects real
 * work on a technicality. (It did. This is the fix.)
 *
 *   node scripts/gates.mjs              all gates binding — the launch view
 *   node scripts/gates.mjs --phase 2    gates owned by phases 1–2 are binding;
 *                                       later-phase gates report DEFER, not FAIL
 *
 * Scoping is CUMULATIVE: at Phase 2, Phase 1's gates stay binding. You cannot
 * regress a gate you have already passed. */
const PHASE_OWNER = {
  G1: 1, G2: 1, G2b: 1, G3: 1, G9: 1, G12: 1,
  G4: 2, G5: 2, G15: 2,
  G6: 3, G7: 3, G7b: 3, G7c: 3, G11: 3, G16: 3, G17: 3,
  G10: 4,
  G8: 5, G18: 5,
  G13: 6,
  G14: 0, // always live: passes in dev, fatal under --prod
};

const phaseArg = process.argv.indexOf('--phase');
const PHASE = phaseArg > -1 ? Number(process.argv[phaseArg + 1]) : Infinity;

/* ── waivers ──────────────────────────────────────────────────────────────────
 * KNOWN debt, consciously owned by a scheduled workstream, that must not block an
 * UNRELATED phase. A waiver is not a snooze button: it is loud, dated, names the
 * owner, and the owning workstream MUST un-waive (delete the entry) and actually
 * pass the gate. Use only when a gate got smarter and retroactively surfaced debt
 * on a surface the current phase does not touch. Keep this list near-empty.
 *
 * (G7c was waived here 2026-07-15→16 while the home redo replaced the
 * canonical-poster Campaign wash; the redo shipped a CSS material ground and
 * un-waived it, as promised.) */
const WAIVED = {};

/* ── tiny harness ─────────────────────────────────────────────────────────── */

const results = [];
/** A gate outside the current phase's scope is REPORTED but never ENFORCED. */
const deferred = (id) => (PHASE_OWNER[id] ?? 0) > PHASE;
/** A consciously-waived gate is REPORTED loudly but never blocks. */
const waived = (id) => Object.prototype.hasOwnProperty.call(WAIVED, id);
const pass = (id, clause, msg) => results.push({ id, clause, msg, ok: true });
const fail = (id, clause, msg, hits = []) =>
  results.push({ id, clause, msg, hits, ok: false, defer: deferred(id), waive: waived(id) });

/** Every source file under src/, as { path, text, lines }. */
function sources(exts = ['.astro', '.ts', '.css', '.js']) {
  const out = [];
  (function walk(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (exts.includes(extname(p))) {
        const text = readFileSync(p, 'utf8');
        out.push({ path: relative('.', p).replace(/\\/g, '/'), text, lines: text.split('\n') });
      }
    }
  })(SRC);
  return out;
}

/** Grep the source tree. Returns [{ file, line, text }]. `where` filters paths. */
function grep(re, { where = () => true, files = sources() } = {}) {
  const hits = [];
  for (const f of files) {
    if (!where(f.path)) continue;
    f.lines.forEach((text, i) => {
      if (re.test(text)) hits.push({ file: f.path, line: i + 1, text: text.trim() });
      re.lastIndex = 0;
    });
  }
  return hits;
}

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null);

/** Strip comments so a gate can't be satisfied by a commented-out token. Removes
 * HTML comments, Astro/JSX expression comments, JS block comments, and JS line
 * comments (sparing the `://` in URLs). Over-stripping can only produce a false RED
 * (a real token removed, gate fails, a human looks), never a false green — the safe
 * direction for a gate. Shared by G18; one definition lives here. */
const stripComments = (s) =>
  (s ?? '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/gm, '$1');

/* ── GATE 1 — no 100vh anywhere in src (§5.1, §14) ────────────────────────── */
/* Campaign stages use svh. 100vh breaks on mobile browser chrome and the spec
 * bans it outright, including in comments — a stale comment teaches the next
 * reader the wrong unit. */
{
  const hits = grep(/100vh/);
  hits.length
    ? fail('G1', '§5.1 / §14', `${hits.length} × \`100vh\` in src — spec requires svh throughout`, hits)
    : pass('G1', '§5.1 / §14', 'no 100vh in src');
}

/* ── GATE 2 — canonical posters never crop (§5.1, §14) ────────────────────── */
/* "The canonical poster component must reject `cover` styling." Decorative
 * background derivatives MAY crop (§5.1) — they're atmosphere, not artwork —
 * so `cover` is only fatal in files that render the canonical rectangle. */
{
  const canonical = (p) =>
    /PosterImage\.astro$/.test(p) || /Environment\.astro$/.test(p) || /psas\/\[slug\]\.astro$/.test(p);
  const fatal = grep(/object-fit:\s*cover/, { where: canonical });
  const elsewhere = grep(/object-fit:\s*cover/, { where: (p) => !canonical(p) });

  if (fatal.length) {
    fail('G2', '§5.1 / §14', `\`object-fit: cover\` on a canonical-poster surface — the artwork must never crop`, fatal);
  } else {
    const note = elsewhere.length
      ? ` (${elsewhere.length} × cover on decorative surfaces — allowed as atmosphere; Sol to confirm none are canonical)`
      : '';
    pass('G2', '§5.1 / §14', `no cover on canonical surfaces${note}`);
  }

  const poster = read(join(SRC, 'components/PosterImage.astro'));
  if (poster && !/object-fit:\s*contain/.test(poster)) {
    fail('G2b', '§5.1', 'PosterImage.astro does not declare `object-fit: contain`');
  } else if (poster) {
    pass('G2b', '§5.1', 'PosterImage.astro pins object-fit: contain');
  }
}

/* ── GATE 3 — SPOT NO. taxonomy is dead (§9.2, §14) ───────────────────────── */
/* Sequence numerals framed the posters as a gallery. The movement doesn't
 * number its propaganda. Note: hits in content/copy.ts route through the COPY
 * LANE, not Fable — but they still fail the gate. */
{
  const hits = grep(/SPOT NO\.|Spot No\.|All Spots|View spot/i);
  hits.length
    ? fail('G3', '§9.2 / §14', `${hits.length} × \`SPOT NO.\`-family label — decorative sequence numerals are retired`, hits)
    : pass('G3', '§9.2 / §14', 'no SPOT NO. taxonomy');
}

/* ── GATE 4 — five explicit poster environments exist (§5.2, §14) ─────────── */
{
  const need = ['Confident', 'Smoldering', 'Unholy', 'Redemption', 'Thirst'];
  const missing = need.filter((n) => !existsSync(join(SRC, `components/psas/${n}Environment.astro`)));
  missing.length
    ? fail('G4', '§5.2', `missing environment component(s): ${missing.map((n) => `${n}Environment.astro`).join(', ')}`)
    : pass('G4', '§5.2', 'all five environment components present');
}

/* ── GATE 5 — [slug].astro orchestrates, it does not compose (§5.2) ───────── */
/* "One configurable split-screen component is prohibited." The tell is a slug
 * route that still owns stage layout instead of dispatching to an environment. */
{
  const slug = read(join(SRC, 'pages/psas/[slug].astro'));
  if (!slug) {
    fail('G5', '§5.2', 'src/pages/psas/[slug].astro not found');
  } else {
    const problems = [];
    const imported = ['Confident', 'Smoldering', 'Unholy', 'Redemption', 'Thirst']
      .filter((n) => new RegExp(`${n}Environment`).test(slug));
    if (imported.length < 5) {
      problems.push(`dispatches to only ${imported.length}/5 environments`);
    }
    // A pure orchestrator has no stage CSS of its own.
    if (/grid-template|object-fit|aspect-ratio/.test(slug)) {
      problems.push('still owns stage layout CSS (grid-template / object-fit / aspect-ratio)');
    }
    const loc = slug.split('\n').length;
    if (loc > 140) problems.push(`${loc} lines — an orchestrator should be lean; this still looks like a shared composition`);

    problems.length
      ? fail('G5', '§5.2', `[slug].astro is not a pure orchestrator: ${problems.join('; ')}`)
      : pass('G5', '§5.2', '[slug].astro dispatches to five environments and owns no stage layout');
  }
}

/* ── GATE 6 — home runs no quiz and no pledge form (§2, §14) ───────────────── */
/* "Home displays exactly one canonical poster and no live quiz or pledge form."
 * Home may INVITE; it may not RUN the mechanic. */
{
  // Whatever `/` actually renders today — legacy home/ until Phase 3 promotes
  // homev2/. Scoping to homev2/ alone would let these gates pass vacuously
  // while the live home still breaks them.
  const homeFiles = sources().filter(
    (f) =>
      /pages\/index\.astro$/.test(f.path) ||
      /components\/homev2\//.test(f.path) ||
      /components\/home\//.test(f.path),
  );
  const hits = grep(/<form|PledgeForm|quiz\.ts|from ['"].*\/quiz\//i, { files: homeFiles });
  hits.length
    ? fail('G6', '§2 / §14', 'home runs a mechanic it may only invite (form or quiz island on home)', hits)
    : pass('G6', '§2 / §14', 'home carries no live form or quiz');
}

/* ── GATE 7 — home borrows ONE canonical poster (§3.3, §11, §14) ──────────── */
{
  // Whatever `/` actually renders today — legacy home/ until Phase 3 promotes
  // homev2/. Scoping to homev2/ alone would let these gates pass vacuously
  // while the live home still breaks them.
  const homeFiles = sources().filter(
    (f) =>
      /pages\/index\.astro$/.test(f.path) ||
      /components\/homev2\//.test(f.path) ||
      /components\/home\//.test(f.path),
  );
  /* HOLE FIXED 2026-07-14 — reported by Fable, against its own interest, in the
   * phase-1 build report. This gate grepped only `assets/posters/`, and so scored
   * a false PASS while the home loaded all five canonical posters from
   * `/downloads/*.jpg` in public/. ANY path to a canonical poster counts. */
  const SLUGS = 'confident-man|soap-smoldering|unholy|redemption|thirst-announcement';
  const anyPoster = new RegExp(`(?:assets/posters/|/downloads/)(${SLUGS})`);

  const hits = grep(anyPoster, { files: homeFiles });
  const distinct = new Set(hits.map((h) => (h.text.match(anyPoster) || [])[1]).filter(Boolean));

  distinct.size > 1
    ? fail('G7', '§3.3 / §11', `home references ${distinct.size} canonical posters (${[...distinct].join(', ')}) — the flagship is ONE`, hits)
    : pass('G7', '§3.3 / §11', `home references ${distinct.size} canonical poster${distinct.size === 1 ? ' (the flagship)' : 's'}`);

  /* G7c — the atmospheric wash may not BE the canonical poster, by any path.
   * §3.3 allows a *purpose-built derived* wash; it does NOT allow blurring the
   * canonical poster and calling it atmosphere.
   *
   * HOLE FIXED 2026-07-16: v1 only grepped `/downloads/<slug>`. Fable's F3 fix
   * slipped through it by switching the Campaign wash to a `getImage()`-derived
   * webp of the SAME canonical poster (`assets/posters/<slug>` → `_astro/…webp`) —
   * green gate, identical violation, muddy low-contrast ground behind the gold
   * text. So now: a wash MECHANISM (`fx-poster-wash` / `--wash-src`) that draws
   * from the canonical-poster source (`/downloads/<slug>`, `assets/posters/`,
   * `posterAssets` glob, or a `getImage(` fed from either) is a FAIL, regardless
   * of the output path. The fix is a dedicated atmosphere asset (a separate file,
   * or Stacey's purpose-built section background) or a pure CSS material ground —
   * never the flagship poster reused. NOTE: whether the ground gives the gold
   * text AA contrast is Sol's eye, not this grep. */
  const dl = grep(new RegExp(`/downloads/(?:${SLUGS})\\.(?:jpg|jpeg|png|webp|avif)`), { files: homeFiles });
  const washFiles = homeFiles.filter((f) => /fx-poster-wash|--wash-src|__wash\b/.test(f.text));
  const washFromPoster = washFiles.filter(
    (f) => /assets\/posters\/|posterAssets|getImage\s*\(/.test(f.text) || new RegExp(`/downloads/(?:${SLUGS})`).test(f.text),
  );
  if (dl.length) {
    fail('G7c', '§3.3 / §11', 'home loads a canonical poster download as atmosphere — the wash must be a purpose-built derived asset, not `/downloads/<slug>`', dl);
  } else if (washFromPoster.length) {
    fail('G7c', '§3.3 / §11', 'the atmospheric wash derives from the canonical poster (assets/posters or getImage of it) — a blurred flagship is not a "derived wash"; use a dedicated atmosphere asset or CSS material',
      washFromPoster.map((f) => ({ file: f.path, line: 0, text: 'fx-poster-wash / --wash-src fed from the canonical poster' })));
  } else {
    pass('G7c', '§3.3 / §11', 'no canonical poster reused as a wash');
  }

  /* G7b — the hero may never BE a canonical poster, blurred or otherwise.
   *   §3.1 "Production must not use a canonical poster, a blurred canonical
   *         poster, or any baked-type image behind live hero type."
   *   §14  "The text-free hero replaces every canonical-poster hero wash."
   * A derived atmospheric wash BELOW the fold is permitted (§3.3), so this only
   * fires on hero surfaces. The text-free asset — or its placeholder stand-in —
   * is the fix. */
  const heroFiles = homeFiles.filter((f) => /Hero\.astro$/.test(f.path));
  const heroWash = grep(new RegExp(`(?:assets/posters/|/downloads/)(?:${SLUGS})`), { files: heroFiles });
  heroWash.length
    ? fail('G7b', '§3.1 / §14', 'HERO is washed with a canonical poster — §3.1 forbids a canonical or blurred-canonical image behind live hero type', heroWash)
    : pass('G7b', '§3.1 / §14', 'no canonical-poster hero wash');
}

/* ── GATE 8 — /psas proves range with ONE composite (§4.2, §11, §14) ───────── */
/* "Do not load the five individual poster images on /psas; the composite proves
 * range with one image request." */
{
  const hub = read(join(SRC, 'pages/psas/index.astro'));
  if (!hub) {
    fail('G8', '§4.2', 'src/pages/psas/index.astro not found');
  } else {
    const posterImports = [...hub.matchAll(/assets\/posters\/[\w-]+\.\w+/g)].map((m) => m[0]);
    if (posterImports.length > 0) {
      fail('G8', '§4.2 / §11', `/psas loads ${posterImports.length} individual poster file(s) — it must load one art-directed composite`, posterImports.map((t) => ({ file: 'src/pages/psas/index.astro', line: 0, text: t })));
    } else if (!/<picture|placement-hub/.test(hub)) {
      fail('G8', '§4.2', '/psas loads no composite <picture> and no placement-hub source — the installation is missing');
    } else {
      pass('G8', '§4.2 / §11', '/psas ships one composite, not five posters');
    }
  }
}

/* ── GATE 9 — steam clears once per SESSION, not once per load (§3.1) ─────── */
/* "Play the sweep once per browser session. Store completion under
 * `gotsoap:steam-cleared:v1` in sessionStorage." A per-load sweep re-fogs the
 * visitor on every internal navigation — that's a tax, not a flourish. */
{
  const steam = read(join(SRC, 'scripts/steam-hero.ts'));
  if (!steam) {
    fail('G9', '§3.1', 'src/scripts/steam-hero.ts not found');
  } else {
    const problems = [];
    if (!/gotsoap:steam-cleared:v1/.test(steam)) problems.push('missing the `gotsoap:steam-cleared:v1` key');
    if (!/sessionStorage/.test(steam)) problems.push('does not use sessionStorage — the sweep will replay every load');
    if (!/try\s*{|catch/.test(steam)) problems.push('no guarded storage access — §3.1 requires the clear state when storage throws');
    problems.length
      ? fail('G9', '§3.1', `steam is not once-per-session: ${problems.join('; ')}`)
      : pass('G9', '§3.1', 'steam clears once per session and fails safe');
  }
}

/* ── GATE 10 — contents overlay is a native <dialog> (§9.1, §14) ──────────── */
{
  const hits = grep(/<dialog/);
  hits.length
    ? pass('G10', '§9.1', 'contents overlay uses a native <dialog>')
    : fail('G10', '§9.1 / §14', 'no native <dialog> found — the contents sheet must be a styled native dialog (focus trap, Escape, focus return come free)');
}

/* ── GATE 11 — the maker credit is FOOTER-ONLY (§3.7 amended, §14) ────────── */
/* OWNER AMENDMENT 2026-07-15: the masthead credit is retired — above the fold it
 * tips the satire before the campaign lands. The credit now lives in the footer
 * ONLY, linked to /about. So this gate flipped: footer presence is REQUIRED, and
 * a masthead credit is now a FAILURE, not a requirement. Approved verbatim; does
 * not route through the copy lane. */
{
  /* Two requirements now: (1) footer-only placement (2026-07-15 amendment), and
   * (2) the string is VERBATIM — literal upper-case in source, per §3.7 "this
   * exact credit". Sol F6: a lower-case source + `small-caps` CSS is not verbatim.
   * So the presence check is case-SENSITIVE. */
  const VERBATIM = /PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL/; // exact, case-sensitive
  const ANY = /produced by hope2 studio\s*·\s*directed by stacey breckel/i;

  const anyHits = grep(ANY);
  const inMasthead = anyHits.some((h) => /Masthead|Nav/i.test(h.file));
  const footerHits = anyHits.filter((h) => /Footer/i.test(h.file));
  const footerVerbatim = grep(VERBATIM, { files: sources().filter((f) => /Footer/i.test(f.path)) });

  if (inMasthead) {
    fail('G11', '§3.7 / §14', 'maker credit is in the MASTHEAD — retired by the 2026-07-15 amendment; it tips the satire above the fold. Footer only.',
      anyHits.filter((h) => /Masthead|Nav/i.test(h.file)));
  } else if (!footerHits.length) {
    fail('G11', '§3.7 / §14', 'maker credit missing from the footer — §3.7 requires it there, linked to /about', anyHits);
  } else if (!footerVerbatim.length) {
    fail('G11', '§3.7 / §14', 'footer credit is not VERBATIM — §3.7 says "this exact credit"; the source must read PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL in caps, not lower-case with small-caps CSS', footerHits);
  } else {
    pass('G11', '§3.7 / §14', 'maker credit is footer-only and verbatim');
  }
}

/* ── GATE 12 — every environment honours reduced motion (§6, §11) ─────────── */
/* "For reduced motion, every entry resolves immediately to its final
 * composition." An entry animation with no reduced-motion branch is a
 * vestibular hazard, and the spec treats it as non-negotiable. */
{
  const animated = sources(['.astro']).filter(
    (f) => /Environment\.astro$/.test(f.path) || /homev2\//.test(f.path),
  );
  const offenders = animated.filter(
    (f) => /@keyframes|animation:|transition:/.test(f.text) && !/prefers-reduced-motion/.test(f.text),
  );
  offenders.length
    ? fail('G12', '§6 / §11', `${offenders.length} animated component(s) with no prefers-reduced-motion branch`,
        offenders.map((f) => ({ file: f.path, line: 0, text: 'animates without a reduced-motion fallback' })))
    : pass('G12', '§6 / §11', 'every animated stage component honours reduced motion');
}

/* ── GATE 13 — home JS payload ≤ 25 KB gzip, excl. GoatCounter (§11) ──────── */
if (CHECK_BUILD) {
  if (!existsSync(DIST)) {
    fail('G13', '§11', 'dist/ not found — run `npm run build` before `npm run gates:build`');
  } else {
    const home = join(DIST, 'index.html');
    const html = read(home);
    if (!html) {
      fail('G13', '§11', 'dist/index.html not found');
    } else {
      // MEASUREMENT HOLE FIXED 2026-07-16 — reported by Fable in the phase-4 build
      // report against its own interest: this summed ONLY external `/_astro/*.js`,
      // but Astro inlines small scripts, so the home shipped zero external modules
      // and G13 read 0.0 KB — true but vacuous, a free pass at the Phase 6 audit.
      // Now counts external modules AND inlined `<script type="module">` bodies.
      let total = 0;
      const parts = [];

      // (a) External first-party modules.
      for (const r of [...html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1])) {
        const p = join(DIST, r);
        if (!existsSync(p)) continue;
        const gz = gzipSync(readFileSync(p)).length;
        total += gz;
        parts.push({ file: r, line: 0, text: `${(gz / 1024).toFixed(1)} KB gz (external)` });
      }

      // (b) Inlined module scripts — just as much first-party payload. Exclude the
      // GoatCounter/analytics snippet per §11 ("excluding GoatCounter").
      const inline = [...html.matchAll(/<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/g)]
        .map((m) => m[1])
        .filter((body) => body.trim() && !/goatcounter|gc\.zgo\.at/i.test(body));
      let inlineBytes = 0;
      for (const body of inline) inlineBytes += gzipSync(Buffer.from(body)).length;
      if (inline.length) {
        total += inlineBytes;
        parts.push({ file: `${inline.length} inline module block(s)`, line: 0, text: `${(inlineBytes / 1024).toFixed(1)} KB gz (inline)` });
      }

      const kb = total / 1024;
      kb > 25
        ? fail('G13', '§11', `home first-party JS is ${kb.toFixed(1)} KB gzip (external + inline) — budget is 25 KB`, parts)
        : pass('G13', '§11', `home first-party JS is ${kb.toFixed(1)} KB gzip (external + inline; budget 25 KB)`);
    }
  }
}

/* ── GATE 14 — no placeholder art survives to production (§3.1, §4.1) ──────── */
/* Token-only stand-ins are explicitly allowed DURING THE BUILD (§3.1) so that
 * Stacey's Photoshop queue never blocks Fable. They are not allowed to ship.
 *
 * A placeholder that can silently reach production is worse than no placeholder,
 * so this gate is loud on every run and fatal under --prod. It is the tripwire
 * between "unblocked" and "shipped a grey box".
 *
 *   node scripts/gates.mjs --prod   ← run this before any deploy
 */
{
  /* Comment-only hits are not asset usage. Reported by Fable in the phase-1
   * remediation: the gate was counting a doc comment as a live reference, so its
   * message overstated how much placeholder art was actually in play. Strip
   * comment lines before counting — a gate that cries wolf gets ignored. */
  const isComment = (t) => /^\s*(\*|\/\/|\/\*|<!--|#)/.test(t);
  const hits = grep(/assets\/placeholder\//, { where: (p) => !/gates\.mjs$/.test(p) })
    .filter((h) => !isComment(h.text));
  const PROD = process.argv.includes('--prod');

  if (!hits.length) {
    pass('G14', '§3.1 / §4.1', 'no placeholder art referenced — real assets are in place');
  } else if (PROD) {
    fail('G14', '§3.1 / §4.1', `${hits.length} × placeholder still referenced — PRODUCTION IS BLOCKED until the real art lands`, hits);
  } else {
    pass('G14', '§3.1 / §4.1',
      `dev stand-ins active (${hits.length} refs) — allowed by §3.1. \`--prod\` WILL FAIL until replaced.`);
  }
}

/* ── GATE 15 — the five environments are FIVE environments (§5.2, §14) ─────── */
/* The marquee gate, and the only one that can't be satisfied by reading the spec
 * back at itself. Delegated to scripts/distinguishability.mjs, which measures it
 * on two layers (source similarity + rendered neutral-rectangle difference).
 * Here we only report whether that check has been RUN and PASSED, so a phase
 * cannot close on an unmeasured claim. */
{
  const built = ['Confident', 'Smoldering', 'Unholy', 'Redemption', 'Thirst']
    .every((n) => existsSync(join(SRC, `components/psas/${n}Environment.astro`)));
  const EV = '../docs/build/reports/evidence';
  const shots = ['confident-man', 'soap-smoldering', 'unholy', 'redemption', 'thirst-announcement']
    .map((s) => join(EV, `phase2-neutral-${s}.png`));
  const haveShots = shots.every((p) => existsSync(p));

  if (!built) {
    fail('G15', '§5.2 / §14', 'five environments do not exist yet — nothing to distinguish');
  } else if (!haveShots) {
    fail('G15', '§5.2 / §14',
      'neutral-rectangle screenshots missing — §14 demands RENDERED evidence, not a self-assessment. Capture 390×844 with posters neutralised, then run `npm run distinguish`',
      shots.filter((p) => !existsSync(p)).map((p) => ({ file: p, line: 0, text: 'missing' })));
  } else {
    pass('G15', '§5.2 / §14', 'environments built + neutral renders captured — run `npm run distinguish` for the verdict');
  }
}

/* ── GATE 18 — one shared placement-hub breakpoint, not two (§4, §14) ─────── */
/* §4 names this anti-pattern outright: the `<picture>` art-direction source and the
 * JS hotspot-coordinate selector must consume the SAME exported breakpoint. Duplicate
 * it as a raw `768px` literal and the two disagree at the boundary — a tap lands on
 * the wrong poster. Gate the export + forbid a raw breakpoint literal in the hub. */
{
  const hub = read(join(SRC, 'content/placement-hub.ts'));
  const hubPage = read(join(SRC, 'pages/psas/index.astro'));
  const built = existsSync(join(SRC, 'components/psas')) && grep(/PLACEMENT_HUB_WIDE_MEDIA/, { where: (p) => /psas/.test(p) }).length > 0;

  if (!built && !/PLACEMENT_HUB_WIDE_MEDIA/.test(hub ?? '')) {
    fail('G18', '§4 / §14', 'placement hub not built yet — expected `PLACEMENT_HUB_WIDE_MEDIA` exported from placement-hub.ts and consumed by the hub');
  } else {
    const problems = [];
    if (!/export const PLACEMENT_HUB_WIDE_MEDIA\s*=\s*['"]\(min-width:\s*768px\)['"]/.test(hub ?? ''))
      problems.push("placement-hub.ts must export PLACEMENT_HUB_WIDE_MEDIA = '(min-width: 768px)'");
    /* HOLE FIXED 2026-07-16 — Sol's phase-5 CONCERN: this gate read hubPage and
     * never used it, so it proved the export and the absence of a raw literal but
     * NOT that either consumer drinks from the constant — a stray comment naming
     * the constant would have kept it green. Now both §4.2-named consumers are
     * checked in the page itself: the wide <source media> binding and the
     * matchMedia() coordinate selector. If a refactor legitimately moves the
     * selector out of the page, this goes red LOUDLY and the gate gets updated
     * consciously — a false red beats a silent false green. */
    if (!hubPage) {
      problems.push('src/pages/psas/index.astro not found — no hub page consumes the breakpoint');
    } else {
      /* HOLE FIXED 2026-07-16, round 2 — Sol's close-out counterexamples: the raw-source
       * predicates were satisfiable by commented-out code (`<!-- <source media={…}> -->`
       * + `// matchMedia(…)`) and by a media attribute on a non-<source> element. So:
       * test only comment-stripped source, and anchor the media binding inside a
       * `<source …>` tag — `[^>]*` cannot cross a tag boundary. */
      const live = stripComments(hubPage);
      if (!/<source\b[^>]*\bmedia=\{PLACEMENT_HUB_WIDE_MEDIA\}/.test(live))
        problems.push('no live `<source media={PLACEMENT_HUB_WIDE_MEDIA}>` in the hub page — the picture is not art-directed by the exported query (comments and media attributes on non-<source> elements do not count)');
      if (!/matchMedia\(\s*PLACEMENT_HUB_WIDE_MEDIA\s*\)/.test(live))
        problems.push('no live `matchMedia(PLACEMENT_HUB_WIDE_MEDIA)` call in the hub page — the hotspot coordinate selector is not driven by the exported query (comment mentions do not count)');
    }
    // A raw 768 breakpoint anywhere in the hub page = a duplicated breakpoint.
    const dup = grep(/768px/, { where: (p) => /psas\/index\.astro$/.test(p) });
    if (dup.length) problems.push('raw `768px` literal in the hub — reference the exported constant, do not duplicate the breakpoint');
    problems.length
      ? fail('G18', '§4 / §14', `placement-hub breakpoint is not single-sourced: ${problems.join('; ')}`, dup)
      : pass('G18', '§4 / §14', 'placement-hub breakpoint is single-sourced: exported once, consumed by <source media> and matchMedia(), no raw literal');
  }
}

/* ── GATE 17 — /movement-preview 301s to / (§13 step 2, §14) ──────────────── */
/* Sol F5: deleting the preview page is only half the contract. §13/§14 require a
 * TRUE 301 to `/`, else the promoted route 404s for anyone with the old link.
 * A machine can check the redirect rule exists; Sol confirms it actually 301s. */
{
  const netlify = read('netlify.toml');
  const redirects = read('public/_redirects');
  const has301 =
    (netlify && /movement-preview[\s\S]{0,200}?(301|status\s*=\s*301)/.test(netlify)) ||
    (redirects && /\/movement-preview\s+\/\s+301/.test(redirects));
  has301
    ? pass('G17', '§13 / §14', '/movement-preview has a 301 redirect declared')
    : fail('G17', '§13 / §14', 'no 301 from /movement-preview to / — a deleted page 404s the old link; §14 requires a true 301',
        [{ file: 'netlify.toml', line: 0, text: 'expected a [[redirects]] from = "/movement-preview" to = "/" status = 301' }]);
}

/* ── GATE 16 — the home flagship is Unholy (§3.3, owner decision 2026-07-15) ── */
/* The owner-reserved flagship choice is resolved: Unholy. `config/site.ts` still
 * reads 'thirst-announcement'. Encoding it as a gate so the decision can't silently
 * un-happen. Phase 3 owns the flip (the flagship renders in the promoted home). */
{
  const cfg = read(join(SRC, 'config/site.ts'));
  if (!cfg) {
    fail('G16', '§3.3', 'src/config/site.ts not found');
  } else {
    const m = cfg.match(/HOME_FLAGSHIP[^=]*=\s*['"]([\w-]+)['"]/);
    const val = m?.[1];
    val === 'unholy'
      ? pass('G16', '§3.3', 'home flagship is Unholy, per the owner decision')
      : fail('G16', '§3.3', `HOME_FLAGSHIP = '${val ?? '?'}' — owner decision 2026-07-15 is 'unholy'`,
          m ? [{ file: 'src/config/site.ts', line: 0, text: m[0] }] : []);
  }
}

/* ── report ───────────────────────────────────────────────────────────────── */

const passed = results.filter((r) => r.ok);
const blocking = results.filter((r) => !r.ok && !r.defer && !r.waive); // in scope, failing, not waived
const deferredRed = results.filter((r) => !r.ok && r.defer && !r.waive); // out of scope + failing
const waivedRed = results.filter((r) => !r.ok && r.waive); // consciously waived debt

console.log(
  `\n  specs.md §14 — machine gates` +
    (PHASE === Infinity ? '  ·  ALL PHASES BINDING' : `  ·  scoped to phase ${PHASE}`) +
    '\n',
);

for (const r of results) {
  const tag = r.ok ? '  PASS' : r.waive ? ' WAIVE' : r.defer ? ' DEFER' : '  FAIL';
  const owner = r.waive ? ` (WAIVED — ${WAIVED[r.id]})` : r.defer ? ` (phase ${PHASE_OWNER[r.id]} owns this)` : '';
  console.log(`${tag}  ${r.id.padEnd(4)} ${r.clause.padEnd(12)} ${r.msg}${owner}`);
  // A deferred or waived red is tracked work, not a fresh defect — don't bury the real failures.
  if (!r.ok && !r.defer && !r.waive && r.hits?.length) {
    for (const h of r.hits.slice(0, 12)) {
      console.log(`          ${h.file}${h.line ? `:${h.line}` : ''}  ${h.text.slice(0, 90)}`);
    }
    if (r.hits.length > 12) console.log(`          … and ${r.hits.length - 12} more`);
  }
}

/* Gate-set fingerprint. The harness gains gates as phases reveal holes — G7b and
 * G15 were both added mid-flight. That means a build report can be CORRECT when
 * written and STALE when reviewed, and the reviewer sees only a wrong number.
 * (This happened: Fable wrote "9/15", G15 landed, Sol read "9/16" and flagged a
 * bookkeeping error that was really a race in the protocol.)
 * Every report cites this line, so a stale count is self-evident instead of an
 * accusation. */
console.log(`\n  gate-set: ${results.length} gates [${results.map((r) => r.id).join(' ')}]`);

console.log(
  `  ${passed.length}/${results.length} gates pass` +
    (deferredRed.length ? `  ·  ${deferredRed.length} deferred to later phases (${deferredRed.map((r) => r.id).join(', ')})` : '') +
    (waivedRed.length ? `  ·  ${waivedRed.length} WAIVED debt (${waivedRed.map((r) => r.id).join(', ')})` : '') +
    (CHECK_BUILD ? '' : '  ·  payload gates skipped (use --build)'),
);

if (waivedRed.length) {
  console.log(`\n  ⚠ ${waivedRed.length} waived gate(s) — real debt, consciously not blocking this phase:`);
  for (const r of waivedRed) console.log(`      ${r.id}: ${WAIVED[r.id]}`);
}

if (blocking.length) {
  console.log(`\n  ${blocking.length} BLOCKING: ${blocking.map((f) => f.id).join(', ')}\n`);
  process.exit(1);
}
console.log(
  PHASE === Infinity
    ? '\n  All gates green. Ready for launch review.\n'
    : `\n  Phase ${PHASE} is clean. Hand off to review.\n`,
);
