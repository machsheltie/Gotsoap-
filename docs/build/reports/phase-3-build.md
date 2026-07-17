# Phase 3 — Home promotion — build report

**Executor:** Claude Fable 5 · **Date:** 2026-07-15
**Spec:** §3 (home: movement pitch), §3.1–§3.7 · **Gates owned:** G6, G7, G7b, G11
**Blocked-asset posture:** built against the §3.1 token-only stand-ins (`src/assets/placeholder/hero-*.jpg`); G14 keeps `--prod` fatal until Stacey's text-free hero lands.

## Gate fingerprint (verbatim)

```
gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]
```

`npm run gates:phase 3` → **exit 0** (captured `$LASTEXITCODE`) · 15/16 PASS · 1 DEFER (G8 → phase 5)
`npm run build` → 16 pages, complete, no errors.
`npx astro check` → 0 errors, 0 warnings (2 pre-existing hints: deprecated `execCommand` in ShareRow — not this phase's surface).

## What changed

### Promoted / deleted (§13 step 2)
| Action | File | Why |
|---|---|---|
| Rewritten | `src/pages/index.astro` | now renders the movement composition (Masthead + 7 beats), `hideNav`, WebSite JSON-LD, `meta.home` verbatim |
| Deleted | `src/pages/movement-preview.astro` | promoted to `/` |
| Deleted | `src/components/home/` (Hero, PledgeBand, SniffTestInsert, MovementLetterhead, RevealBeat) | condemned legacy home; grep-confirmed zero imports before deletion |
| Deleted | `src/components/BroadcastHud.astro` | orphaned (only self-references); the legacy single-viewport home's floating nav |
| Trimmed | `src/layouts/BaseLayout.astro` | `isImmersive` prop + `.immersive-mode` CSS removed — the viewport lock died with the legacy home (§3: normal scrolling). Stale `BroadcastHud` comment in `tokens.css` re-pointed at `homev2/Masthead` |

### The beats
| File | §  | What it is now |
|---|---|---|
| `homev2/Hero.astro` | §3.1 | Art-directed `<picture>` over the placeholder masters — portrait source at `(orientation: portrait)`, AVIF+WebP derivatives, eager + `fetchpriority=high`, **empty alt** (decorative composite, §12). Live type composed around the marked SUBJECT ZONE: landscape = left column, portrait = top band. Steam state machine + pre-paint bootstrap ported from the Phase-1-proven pattern; the old pure-CSS every-load one-shot is gone |
| `homev2/Case.astro` | §3.2 | **The Porcelain Evidence Wall.** The `rows.map` of equal `<li>` shells is gone. Three hand-built zones with distinct DOM and CSS: BROADSIDE (73%, clips the left viewport edge on mobile, copy at its right), FLUSH (0%, spans full width between grout rules, copy beneath), RAIL (9/10, locks to an emphasized right grout line, copy right-aligned approaching from the left). Manifesto runs across tile joints as stepped lines (tile-unit indents), never a centered column. One-shot specular pass per figure via the global `[data-reveal]` one-shot (`.is-revealed` is never removed → cannot replay on scroll reversal) |
| `homev2/Campaign.astro` | §3.3 | Flagship is a **swappable prop**: everything (poster, title, register, derived wash) derives from `HOME_FLAGSHIP` in `config/site.ts` (`'thirst-announcement' \| 'unholy'`); colours read `--reg-*` slots so the environment follows the poster's register on swap. Poster now `loading="lazy"` (§11 — only the hero loads eagerly; it was `eager` in the preview) |
| `homev2/Confrontation.astro` | §3.4 | The `/downloads/unholy.jpg` wash (a second/third canonical ref) replaced with a CSS-only smoke ground; mirror plane and amber key kept |
| `homev2/Oath.astro` | §3.5 | **The Gold Foil Summons.** Foil insert wider than the viewport crossing the porcelain at −3.25°; brushed-foil banding, embossed rule, folded edge, ONE perforated action line (punched holes exposing porcelain) whose tear-off stub routes to `/pledge`. No fields, no manila, no document imitation. Mobile: diagonal band enters from the right (`translateX(64%) rotate(-7deg)` → none), settles into a full-width action plate — **transform-only** (opacity pinned to 1 through the reveal), one-shot |
| `homev2/MovementReal.astro` | §3.6 | **The Seal Takes the Page.** The section ground is now campaign porcelain gloss; ONE manila sheet (`register-cwaaa` scoped to the sheet element — the quarantine boundary is the paper edge) advances over it: `Guilloche` perimeter (component reuse), oversized Seal watermark, one recovery quotation (RC-071 verbatim), one stamp, `/crisis` link. Mobile reveal-from-beneath (`translateY(min(24svh,14rem))` → none, transform-only); watermark arrives first (200ms), stamped quotation follows (700ms) within the same document |
| `homev2/Masthead.astro` | §3.7 | Folio row added beneath the nav links: hairline + credit, visible at every breakpoint (§14 above-the-fold). Nameplate href `/movement-preview` → `/` |
| `components/Footer.astro` | §3.7 | Folio credit between © and socials, quiet chrome (the reveal stays subordinate) |
| `scripts/steam-hero.ts` | §3.1 | Comments re-pointed (`homev2/Hero`, scroll now reachable); two behavioural fixes from rendered verification (below) |

### The folio credit (G11)
Authored **mixed-case** (`Produced by Hope2 Studio · Directed by Stacey Breckel`) with `font-variant-caps: small-caps` — that is the only way to *render* true small caps (§3.7 "set the credit in small caps"); an all-caps source has no lowercase letters for small-caps to act on. Middots preserved; linked to `/about` in both locations; the G11 regex is case-insensitive and matches.

## Rendered verification (390 × 844 first, Chromium via Playwright, against `dist/`)

### §3.1 steam contract — timeline logs on the FINAL build
| Path | Evidence |
|---|---|
| First view | `fogged` set pre-paint → `clearing` → `done`, key stored. Undisturbed sweep settles via `transitionend` at clearing + ~2010ms (inside the 1.8–2.2s window) |
| Scroll mid-sweep | scroll at clearing + ~1016ms → `done` on the next rendering frame + stored (`settledBy: 'scroll'`, i.e. well before the 1950ms natural end and the 2200ms failsafe) |
| Return visit (same session) | `data-hero` unset, steam `opacity: 0` **before first paint** (bootstrap early-returns on the stored key) |
| Reduced motion | `clip-path: none` on the overlay (no sweep); the crossfade resolves instantly because `base.css` globally clamps transition durations under reduced motion; settle + store confirmed |
| Storage failure | bootstrap `catch → return` leaves the clear state (code path; G9 checks the guard) |

**Two §3.1 defects found by this pass and fixed** (a source read would not have caught either):
1. Scroll/wheel/touchmove listeners were attached inside the double-rAF; when first paint is late (frames starved during initial load) they missed early scroll intent entirely. Now attached immediately in `run()`.
2. Both failsafes counted from *load*, not *sweep start*, so a late-starting sweep was truncated mid-wipe (observed: 557ms of a 1950ms sweep). The island failsafe is now 2200ms **from `clearing`** (+ a 4000ms absolute cap), and the bootstrap failsafe fires only if the island never took over (`=== 'fogged'`, 3000ms).

### §3.2 wall geometry (measured, 390 × 844)
- BROADSIDE figure left edge **−47.5px** (clips the viewport edge; was −3.9px until the negative-margin em-resolution fix — the margin moved from the flex container, where `em` = 16px, onto the figure itself)
- FLUSH figure width **340px of 390** (full wall width inside padding)
- RAIL figure right edge to grout line gap **2.5px** (locked)
- Copy adjacency differs per zone (right / beneath / left) — screenshots `phase3-390-case-broadside.png`, `phase3-390-case-rail.png`

### §3.3 / G7, rendered
`document.querySelectorAll('img.poster-canonical').length === 1` on `/` — exactly one canonical poster, complete at 4:5 (rendered ratio 0.800), uncropped, in its chrome frame.

**Defect found + fixed:** the poster rendered letterboxed inside a 1350px-tall box (a huge empty amber field above it on mobile). Cause: `.camp__poster { width:100%; height:auto }` was Astro-scoped to Campaign while the `img` is emitted by PosterImage (different scope id) — the rule never matched and the attribute height won. Fixed with `.camp__frame :global(img.poster-canonical)`. **This bug existed on `/movement-preview` too** — first caught by the 390 pass.

### Other beats
- §3.4: no wash, chrome question on lit smoke, one CTA — `phase3-390-confrontation.png`
- §3.5: settled full-width action plate with horizontal perforation at 390 (`phase3-390-oath.png`); crossing insert with vertical perforation + tear-off stub at 1440 (`phase3-1440-oath-fold.png`). Fold anchored inside the visible field on desktop (the true corner overhangs the viewport — third rendered-pass fix); it returns to the true corner on the full-width mobile plate. Fold bounding box measured in-viewport at both sizes
- §3.6: sheet + guilloché + watermark + stamp + quotation — `phase3-390-movement.png`; reveal classes confirmed applied
- §3.7 / G11: folio credit rendered and visible above the fold at 390 (`phase3-390-hero-top.png`) and present in the footer (DOM-checked)
- Hero subject-zone clearance: portrait — type block bottom 356px vs zone top 553px; landscape (1440×900) — type right 736px vs zone left 855px

Evidence copied to `docs/build/reports/evidence/phase3-*.png` (10 files).

## Judgment calls — Sol should look here first

1. **G7 now passes with "0 canonical posters"** because the flagship reference is dynamic (`HOME_FLAGSHIP` → template-literal wash path + PosterImage slug prop). The gate's literal-path grep cannot see dynamic references — reported against my own interest. The rendered count (exactly 1) is the real §3.3 evidence; if the arbiter wants the gate hardened, it could additionally grep for `HOME_FLAGSHIP` misuse outside Campaign. I did not touch `gates.mjs`.
2. **`wheel`/`touchmove` intent listeners kept** alongside `scroll`. Rationale updated in-file: with normal scrolling, `scroll` is primary (verified); the intent listeners cover the one boundary where the document cannot move (scrolling up at the very top). Redundant-but-harmless superset of §3.1.
3. **Hero art uses `object-fit: cover` + empty alt.** It is the environment restaging (no baked type), not the canonical rectangle — §5.1 lets decorative derivatives crop, §12 wants decorative composites at `alt=""`. G2's canonical-file filter correctly does not include `homev2/Hero.astro`.
4. **Hero provocation switched to verbatim copy** (`home.hero.sub`) replacing the preview's invented placeholder line — one less copy-lane debt. The institutional signature line ("A public hygiene initiative · funded by …") remains an inherited, flagged placeholder.
5. **Masthead measures ~186px tall at 390** (nameplate + wrapped links + folio row) while the `--masthead-h` token caps at 84px. The token only feeds the hero's `min-height` calc, so nothing clips or overlaps — the hero simply gets `min-height` slack — but the mismatch is real and cosmetic tightening is possible if Sol reads the tall masthead as a §3.7 proportion problem.
6. **Manifesto strings**: the demand is the documented reassembly of `crisis.founding[1]` (same treatment the preview shipped with, noted in-file); the creed is a verbatim clause of `crisis.founding[2]`.

## Copy-lane flags (consumed as-is; NOT rewritten)

- §7.2 corrections still pending upstream: the Oath invitation's signer framing (`home.pledgeBand.*` — the §3.5 witness/recruiter perspective), `meta.pledge.description`, `crisis.ribbon.body`.
- Institutional placeholders still flagged in-file: hero signature line, Campaign `PROPAGANDA` ("This is what clean looks like."), Confrontation `CONFRONT` ("Are you the fog?").

## Known non-blockers

- **G14**: 2 dev stand-in refs (the hero imports) — §3.1-permitted; `--prod` fails until the real art lands. By design.
- **G13** (payload) is Phase 6's; home JS gained nothing beyond the existing steam island.
- The headless verification environment produces sparse frames during initial load (~1s cadence); all timing anomalies chased during verification traced to that, and every contract path was re-proven with in-page timeline logs rather than screenshots alone.
