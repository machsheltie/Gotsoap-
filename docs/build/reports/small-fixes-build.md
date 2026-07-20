# Build report — Fable one-off: two small fixes (interior-copy sweep)

**Order:** `docs/build/reports/small-fixes-order.md` · **Date:** 2026-07-17 · **Branch:** `main`
**Scope:** standalone, no design decisions. Chrome-unification work is in flight in a
parallel session — I touched **no** harness/gate script (see §Gate promotion).

---

## Fix 1 — VerdictCard.astro chrome labels → copy.ts

`src/components/quiz/VerdictCard.astro` was props-driven for the verdict fields but
carried in-fiction chrome as hardcoded markup. Routed through the content module —
**routing, not rewriting** (every string is verbatim; the copy lane owns the words).

**New `copy.ts` group** (placed just before `pledge`, added to the default aggregate):

```ts
export const verdictCard = {
  eyebrow: "Sniff Test · Verdict",          // campaign chrome (🧼)
  stampMeta: "Field Assessment CW-7 · Filed", // CWAAA rubber-stamp caption (📋)
} as const;
```

**VerdictCard.astro** now imports `{ nav, verdictCard }` and reads:
| line | was (hardcoded) | now |
|---|---|---|
| eyebrow | `Sniff Test · Verdict` | `{verdictCard.eyebrow}` |
| stamp-meta | `Field Assessment CW-7 · Filed` | `{verdictCard.stampMeta}` |
| tag | `got soap?` | `{nav.mark}` |

### Judgment call — the `got soap?` wordmark (flag for Sol)
The order named exactly two strings. The audit also called the file "otherwise
correctly props-driven," but line 46 held a **third** hardcoded user-facing string: the
`got soap?` wordmark in `.vcard__tag`. The DoD says *"no hardcoded user-facing strings
remain."* I routed it to `nav.mark` because:
- `nav.mark === "got soap?"` verbatim → **byte-identical** rendered output (verified in
  `dist`: `vcard__tag …>got soap?`);
- it matches the established masthead pattern (`CampaignMasthead.astro` renders the
  nameplate as `{nav.mark}`).

Note the wordmark is still hardcoded as a literal elsewhere by design intent
(`Seo.astro` `siteName`, poster `alt`, verdict `metaTitle`) — those are out of this
file's scope and I left them. If Sol reads the wordmark as *artwork/logotype* rather
than copy and wants line 46 reverted to a literal, it's a one-line change with no
output difference either way.

---

## Fix 2 — kill-list grep over ALL of `src`

Audited every `src` file against `style-lock.md §7`'s kill list, **comment-stripped
first** (a killed line quoted in a comment is not a rendered string). The sweep ran from
a session-scratchpad script; that scratchpad is ephemeral and did not survive the
session, so the reusable logic is preserved verbatim in **Appendix A** below rather than
referenced as a live file.

**Strings checked:** "A public hygiene initiative", "Are you the fog?", "The receipts",
"Hang him…", "a satirical spec campaign" *(exempt on `/about`)*, "See who's behind it",
"Got Soap? is a satirical campaign by Hope2 Studio".

### Method note — line-alignment matters
`gates.mjs`'s `stripComments()` collapses multi-line comments to a single space, which
**drifts line numbers** — a naïve port mis-labeled the `/about` credit (a rendered
string) as a comment. The audit uses a line-preserving variant (blank comment bodies
with spaces, keep `\n`) so the rendered/comment verdict is trustworthy. Any real
killed-lines gate should classify on comment-stripped-but-line-aligned text for the same
reason, or it will produce false labels.

### Result — clean on campaign surfaces

| kill string | file:line | rendered? | verdict |
|---|---|---|---|
| "a satirical spec campaign …" | `src/content/copy.ts:540` | **RENDERED** | ✅ sanctioned — it's `about.credit`, imported & rendered **only** in `src/pages/about.astro:115` (`/about`), which §7/§10 explicitly exempt. |

- **Rendered hits on campaign surfaces: 0.**
- **Comment-only hits: 0.** (One transient comment hit — a doc comment I added quoting
  the killed masthead credit verbatim — was reworded so the codebase seeds no verbatim
  killed strings.)

Interior surfaces `/crisis`, `/pledge`, `/sniff-test`, verdicts, `/about` are all clean.

### Gate promotion — DEFERRED (harness not free)
The order recommends promoting this to a killed-lines gate *"if the harness is free"* and
warns *"do not hot-edit the harness while another session is in it — the last collision
broke the gate script."* Chrome unification is in flight, so I did **not** touch
`gates.mjs`/`copy-gates.mjs`. Drop-in-ready logic is preserved in **Appendix A** of this
report; recommend a copy-lane session lifts it into a real gate (as `CG7` in
`copy-gates.mjs`, or `G19` in `gates.mjs`) once the harness is uncontended. It's the 4th
eye-caught killed line — it belongs on the machine floor.

---

## Verification (evidence before claims)

| check | result |
|---|---|
| `npm run gates` | **20/20 green** |
| `npm run copy-gates` | **6/6 green** |
| `npm run build` | **clean — 16 pages** |
| kill-grep over `src` | 0 rendered campaign-surface hits, 0 comment hits |
| rendered output | `dist/sniff-test/*/index.html` shows both labels + `got soap?` wordmark verbatim |

No gate was weakened. No campaign copy was authored or re-voiced.

---

## Appendix A — killed-lines VALUE gate — **PROMOTED — live as CG7** (2026-07-20)

> **This appendix is no longer the artifact.** Per `cg7-promotion-order.md`, the gate
> below now lives in `site/scripts/copy-gates.mjs` as **CG7**, with its acceptance tests
> in `site/scripts/cg7-tests.mjs`. The live code is authoritative; this appendix remains
> as the design record. Promotion results are appended at the end of this report.

Preserved here because the original ran from an ephemeral session scratchpad.

**Why this is a value assertion, not a text scan.** Earlier revisions of this appendix
carried a source-text scanner (comment-strip + `export const` group tracking). Sol's
review broke it three times in three rounds — a block comment faking `export const
about = {`, a raw-vs-stripped tracking mismatch, and finally a template literal whose
*content* mimics module structure. Each fix moved the hole; only a real lexer ends that
arms race, and a gate script should not be a lexer. The review has ruled the
compiled-module/value assertion the required boundary, and this appendix now provides
exactly that. The gate asserts on two things no source-formatting trick can reach:

1. **The deck's actual values** — import `copy.ts` (it is dependency-free; `as const` is
   erasable), recursively walk every exported string, and flag any killed phrase. The
   single sanction is by **exact path**: the sentence *"a satirical spec campaign by
   Hope2 Studio"* may exist only at `about.credit` (equivalently `default.about.credit`
   via the aggregate). Exact-path matching — never suffix matching — so a smuggled
   `masthead.about.credit` is still a violation. Comments, template-literal decoys, and
   layout games are invisible at this layer: the walker sees what strings **are**, not
   what the source looks like.
2. **The rendered output** — sweep every `dist/**/*.html` for killed phrases. The
   sanctioned sentence is legal only in `dist/about/index.html`. This is the
   definitional check ("no killed line renders on a campaign surface") and it also
   catches strings that never passed through `copy.ts` at all.

```js
// killed-lines VALUE gate — asserts on the compiled copy module + built HTML.
// Usage: node scripts/killed-lines.mjs  (run from repo root, after `npm run build`)
// Node >=23 imports .ts natively; the pinned build Node 22.12 needs
//   node --experimental-strip-types scripts/killed-lines.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const COPY_TS = 'site/src/content/copy.ts';
const DIST = 'site/dist';

// style-lock.md §7 — rendered-surface kill list (case-insensitive).
const KILLED = [
  'Hang him in the locker room',
  'Are you the fog?',
  'The receipts',
  'A public hygiene initiative',
  'A satirical spec campaign by Hope2 Studio',
  'Got Soap? is a satirical campaign by Hope2 Studio.',
  "See who's behind it",
];
// The ONE sanctioned killed sentence and its ONLY legal homes (§7/§10).
const SANCTIONED_NEEDLE = 'a satirical spec campaign by hope2 studio';
const SANCTIONED_PATHS = new Set(['about.credit', 'default.about.credit']); // exact, never suffix-matched
const SANCTIONED_DIST = /[\\/]about[\\/]index\.html$/;

let violations = 0;

// ---- 1. Deck assertion: walk every string VALUE in the compiled module ----
const mod = await import(pathToFileURL(COPY_TS).href);
const seen = new Set();
function walk(node, path) {
  if (typeof node === 'string') {
    const lc = node.toLowerCase();
    for (const k of KILLED) {
      const needle = k.toLowerCase();
      if (!lc.includes(needle)) continue;
      const sanctioned = needle === SANCTIONED_NEEDLE && SANCTIONED_PATHS.has(path);
      if (sanctioned) console.log(`deck exempt     ${path}  «${k}»`);
      else { violations++; console.log(`DECK VIOLATION  ${path}  «${k}»`); }
    }
    return;
  }
  if (node === null || typeof node !== 'object') return;
  if (seen.has(node)) return; // the default aggregate re-exposes the named groups
  seen.add(node);
  for (const [key, val] of Object.entries(node)) walk(val, path ? `${path}.${key}` : key);
}
walk(mod, '');

// ---- 2. Rendered-output sweep: killed phrase in built HTML ----
function htmlFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) htmlFiles(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}
if (existsSync(DIST)) {
  for (const file of htmlFiles(DIST)) {
    const lc = readFileSync(file, 'utf8').toLowerCase();
    const rel = relative('.', file).replace(/\\/g, '/');
    for (const k of KILLED) {
      const needle = k.toLowerCase();
      if (!lc.includes(needle)) continue;
      const sanctioned = needle === SANCTIONED_NEEDLE && SANCTIONED_DIST.test(file);
      if (sanctioned) console.log(`dist exempt     ${rel}  «${k}»`);
      else { violations++; console.log(`DIST VIOLATION  ${rel}  «${k}»`); }
    }
  }
} else {
  console.log(`(dist not found at ${DIST} — run the build first for the rendered sweep)`);
}

console.log(`\nkilled-lines value gate: ${violations} violation(s)`);
process.exit(violations > 0 ? 1 : 0);
```

Verified against the live repo (Node 24; the 22.12 flag form is documented Node behavior,
not separately exercised here): baseline passes with exactly two exempt lines
(`about.credit`, `dist/about/index.html`); the template-literal decoy attack, the
`masthead.about.credit` path spoof, value smuggling into `masthead`/`home`, and a killed
line injected into a campaign page's built HTML each exit 1 at the correct location.

Known limits, stated plainly: importing the deck **executes** `copy.ts` (it is currently
side-effect-free and import-free; if it ever gains imports, Node's type-stripping must
cover them). The dist sweep is substring-based over rendered HTML, so a killed phrase
split across markup boundaries (e.g. a `<span>` mid-sentence) would evade it — no current
surface does this, and the deck assertion catches the deck-sourced cases regardless. The
superseded text scanner should not be promoted in any form; it is retained only in this
report's git history.

---

## CG7 promotion close-out (2026-07-20, per cg7-promotion-order.md)

**Shipped.** Appendix A's value gate is live as **CG7** in `site/scripts/copy-gates.mjs`;
acceptance tests live in `site/scripts/cg7-tests.mjs`. Scope held: promotion + runtime
hardening only — the ruled design (deck value walk + dist render sweep, exact-path
sanction, text scanner retired) was lifted unchanged.

### Runtime hardening (§2) — a gate that cannot run fails loud

- Unloadable deck → `FAIL CG7 … deck UNLOADABLE — the gate could not run and must not be
  green`, with the required Node version and flag named in the message. Exit 1.
- Vacuous walk (0 exports or 0 strings) → explicit FAIL, never a clean pass.
- Absent `dist/` → explicit FAIL ("run `npm run build` first") — an unrun render layer is
  never green. `npm run copy-gates` therefore requires a built `dist/`.
- `package.json` now runs `node --experimental-strip-types scripts/copy-gates.mjs` — the
  flag is required on Node 22.x and a verified no-op on ≥23.
- `CG7_COPY_TS` / `CG7_DIST` env overrides exist solely as acceptance-test seams.

### Pinned-runtime verification (§3) — Node 22.12.0, actually run

Verified on a real portable `v22.12.0` binary (no version manager on this machine):

| Run | Result |
|---|---|
| 22.12.0 **with** flag (the npm-script form) | **7/7 · exit 0** — flag form now verified, not asserted |
| 22.12.0 **without** flag | `FAIL CG7 … UNLOADABLE … ERR_UNKNOWN_FILE_EXTENSION` · **exit 1** — fails loud, never green |
| Full acceptance suite under 22.12.0 | **all 14 checks pass** (`cg7-tests.mjs` spawns children via `process.execPath`, so the suite genuinely ran on 22.12.0) |
| Full acceptance suite under 24.14.0 | all 14 checks pass |

No runtime split needed: the flag form works on the pinned Node, so dev, CI, and the
Netlify image can all run the same command (Netlify's build itself never runs the gate —
`netlify.toml` runs only `npm run build`).

### Acceptance tests (§4) — all six, T2 is Sol's R5 attack verbatim

T1 green baseline (exactly two exempts) · T2 template-literal decoy → violation at
`masthead.smuggled` · T3 `masthead.about.credit` path spoof → violation · T4 double
smuggle → 2 violations · T5 killed line in campaign HTML → dist violation, `/about`
exempt · T6 unloadable deck → explicit UNLOADABLE failure. Red tests also assert **only
CG7 failed**, so a fixture can never leak into another gate's input unnoticed.

### Close-out numbers (§6)

`npm run copy-gates` **7/7** · `npm run gates` **20/20** unchanged · `npm run build`
clean, **16 pages** · CG7 walked **384 deck strings**, exempts exactly
`deck:about.credit` + `dist:dist/about/index.html`.

Disclosed limit (unchanged from the ruling): the dist sweep is substring-based, so a
killed phrase split across markup boundaries would evade it — no current surface does
this, and the deck assertion covers all deck-sourced cases regardless. The retired text
scanner was not promoted in any form.

---

## Round 8 — render-anchor fix + anchor-discipline class sweep (2026-07-20)

**Sol's R7 finding (instance #2), fixed.** `SANCTIONED_DIST` was a suffix regex
(`/[\/]about[\/]index\.html$/`), so `dist/campaign/about/index.html` would ride
`/about`'s exemption. Replaced with an exact, root-anchored, separator-normalized
comparison: `relative(DIST, file).split(sep).join('/') === 'about/index.html'`. No regex.
Ported as **T7**: a fixture holding both `about/index.html` and
`campaign/about/index.html` — the nested one is flagged, the root one exempt.

**Class sweep — and it found instance #3 before Sol could.** Audit of every path and
string comparison in CG7:

| # | Comparison | Verdict |
|---|---|---|
| 1 | deck sanction — walk path vs sanctioned path | **WAS DRIFTED (instance #3, fixed).** The path was compared as a joined string (`'about.credit'`), so a quoted key literally named `"about.credit"` smuggled into the default aggregate collided with the real `about`→`credit` chain and was falsely exempt. Now compared as a **key array, segment by segment** — key names are never flattened into a comparison. Ported as **T8**; display quotes dotted keys (`default."about.credit"`) so printed paths can't masquerade either. |
| 2 | render sanction — file vs `/about` page | **Fixed this round** (Sol's instance #2): exact dist-root-relative equality. |
| 3 | `needle === SANCTIONED_NEEDLE` | Exact equality — anchored. |
| 4 | `lc.includes(needle)` (deck + dist detection) | Deliberate substring **detection**. Error direction is fail-closed: over-matching creates violations, never exemptions. Already-disclosed limit (markup-split phrases evade the dist layer). |
| 5 | `n.endsWith('.html')` | Extension filter — suffix is the correct semantics for an extension, and it scopes what is **scanned**, not what is exempt. Scope note: the dist sweep reads HTML only; a killed line hardcoded into a client-side JS island would evade it — that path is policed by the hardcoded-copy rules (copy lives only in `copy.ts`) and the deck layer. |
| 6 | `seen.has(node)` dedup | Object-identity dedup, not a path comparison; it cannot **create** an exemption. Disclosed subtlety: an object alias (e.g. `masthead.aboutAlias = about`) re-routes already-walked sanctioned content under a new deck path without a fresh deck flag — but anything actually rendered from such an alias on a campaign page is caught by the render layer, which checks pages, not paths. |
| 7 | env overrides / display strings | Configuration and display only; comparisons never use the display form. |

**Statement:** after this sweep, no instance #3 of anchor drift remains in CG7 — the one
that existed (deck path flattening) is fixed and regression-locked by T8. Rows 4–6 are
disclosed scope boundaries, not anchor drift, and each has a named backstop.

**Test hardening:** `onlyCg7Failed` now asserted on every red test (T2–T8), so a fixture
leaking into another gate's input can never pass unnoticed.

**Re-verification:** all **25** acceptance checks (T1–T8) pass under **Node 22.12.0**
(portable binary, children via `process.execPath`) and **Node 24.14.0** ·
`npm run copy-gates` **7/7** · `npm run gates` **20/20** · build clean, 16 pages ·
CG7 walks 384 deck strings, exempts exactly `deck:about.credit` +
`dist:dist/about/index.html`.

Scope held per `cg7-promotion-order.md`: fix + harden only, no redesign.
