# Phase 2a — Poster geometry: STRUCTURE — build report

**Executor:** Claude Fable 5 · **Date:** 2026-07-14
**Spec:** §5 (geometry), §6 (five mobile material signatures) · **Gates owned:** G4, G5, G15
**Scope discipline:** 2a stops at the evidence boundary. **No desktop CSS was written.**

## Gate fingerprint (verbatim)

```
gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]
```

`npm run gates:phase 2` → exit 0 · 12/16 PASS · 4 DEFER (G7, G7b, G11 → phase 3; G8 → phase 5)
`npm run build` → 17 pages, complete, no errors.
`npm run distinguish` → PASS on both layers (matrices below).

## What changed

### Created
| File | Role |
|---|---|
| `site/src/components/psas/ConfidentEnvironment.astro` (~250 loc) | §6 row 1 — Chrome Threshold Lift |
| `site/src/components/psas/SmolderingEnvironment.astro` (~277 loc) | §6 row 2 — Mirror Wings |
| `site/src/components/psas/UnholyEnvironment.astro` (~292 loc) | §6 row 3 — Cathedral Light Rise |
| `site/src/components/psas/RedemptionEnvironment.astro` (~300 loc) | §6 row 4 — Confessional Opening |
| `site/src/components/psas/ThirstEnvironment.astro` (~237 loc) | §6 row 5 — Marble Folio Turn |
| `site/src/components/psas/SeriesNav.astro` | shared **series-navigation** primitive (§5.2 share list; §9.2 vocabulary) |
| `site/src/components/psas/DownloadStation.astro` | shared **download** primitive (§5.2 share list; consumes `psas.downloadNotice` verbatim) |
| `site/src/scripts/entry-complete.ts` | the §6 scroll clause (see "Judgment calls" #2) |

### Rewritten
`site/src/pages/psas/[slug].astro` — 343 → **105 lines**. Now routing + SEO + JSON-LD +
content resolution + a literal dispatch table to the five environments. Zero `<style>`
block; zero stage CSS. The old shared split-screen composition is gone, not relocated —
no environment inherits its DOM.

### Evidence
`docs/build/reports/evidence/phase2-neutral-<slug>.png` × 5 — rendered at 390 × 844,
Chromium via Playwright, posters neutralised with exactly the filter documented in
`distinguishability.mjs` (`grayscale(1) brightness(0) opacity(.28)` on
`img.poster-canonical`). Entries were completed via the sanctioned path
(`.entry-done` on `[data-entry-stage]`) so every capture is the FINAL composition.
Two overlays were hidden during capture only: `astro-dev-toolbar` (dev-server chrome,
does not exist in production) and `aside.qc` (the ScratchSniff gag toast — see
Flags #1). Nothing else was altered.

## Distinguishability verdict (verbatim matrices)

```
LAYER 1 · SOURCE          Confid Smolde Unholy Redemp Thirst
  Conf       —    0.12   0.11   0.11   0.12
  Smol     0.12     —    0.10   0.11   0.12
  Unho     0.11   0.10     —    0.11   0.12
  Rede     0.11   0.11   0.11     —    0.13
  Thir     0.12   0.12   0.12   0.13     —
  (threshold 0.7 — worst pair 0.13)

LAYER 2 · RENDER          Confid Smolde Unholy Redemp Thirst
  Conf       —    42.7  109.1  133.3  139.1
  Smol     42.7     —   113.9  140.4  144.2
  Unho    109.1  113.9     —    52.7   65.9
  Rede    133.3  140.4   52.7     —    26.0
  Thir    139.1  144.2   65.9   26.0     —
  (threshold 10 — worst pair 26.0, 2.6× the floor)
```

The distinctness is structural, not chromatic (Layer 2 is grayscale): the two porcelain
rooms differ by content order (type-first vs poster-first) and dark-mass placement; the
two smoke rooms invert each other's light (Unholy = bright CENTER shaft, Redemption =
bright EDGE jambs); Thirst hangs everything on a single bright left gutter.

## The five signatures, as built (§6 row → implementation)

| Poster | Entry | Copy material | Type performance |
|---|---|---|---|
| Confident | `.rise` translateY(4svh)→0 emerging from behind a chrome `.sill` (flush below the poster's final bottom edge; `overflow: clip` hides the start position); `.steam-veil` opacity .94→.16 sharpens the tile — the veil is z-below all content and never covers the poster | `.plaque` — glazed porcelain, `margin-inline: … auto → 4vw` (offset lower-RIGHT), grout bed via layered box-shadow ring, black ink | `.hook` — pull in Oswald 700 at clamp(2.5rem, 11.5vw, 4.4rem), locked upper-LEFT, thin white steam-glow text-shadow |
| Smoldering | `.wing--left/right` translateX(±36vw)→0 retract from behind the poster (z-below), finish flanking it; `.settle` scale(.98)→1 | `.caption-strip` — opaque porcelain backing, ribbed-glass overlay as a z-0 `::after`, note stacked z-1 ABOVE the ribs so AA contrast is structural | `.hook` stacked at ≤13ch + `.chrome-baseline` bar + `.hook-mirror` — one aria-hidden scaleY(−1) duplicate, masked to fade away from the chrome. **h1 is sr-only** (no duplicate poster title); no numeral anywhere |
| Unholy | `.shaft` scaleX(.14)→1, lather-white gradient wider than the poster with soft masked flanks (reads as backlight spilling around the contained rectangle); `.lift` translateY(3svh)→0 | `.sermon-slab` — smoked steel, bled to the LEFT edge (`margin: … auto 0 0`), exactly ONE polished chrome rule (`.slab-rule`) | pull split at clause boundaries: 4 staggered chrome-gradient lines (`fit-content` boxes, varied indents) + the shortest clause as `.versicle` in `writing-mode: vertical-rl` in the true side gutter, outside the poster box |
| Redemption | `.jamb--left/right` translateX(0)→(∓74%), luminous warm-white panels parting BEHIND the poster and settling as glowing edge jambs; `.revealed` opacity snaps 0→1 at the 42–56% keyframe — the full rectangle at once, no wipe | `.program` — folded ivory (center-crease gradient), chrome head edge (`::before`), `rotate: -1.6deg` off-axis below the poster | `.ascension` — `column-reverse` stack: "HE SINNED." bottom-left ascending stepwise to "ANYONE CAN CHANGE." at the top right edge; placard underlines, warm ivory, no stamp, no serif |
| Thirst | `.marble-leaf` translateX(0)→(−91.5%): the veined warm-marble sheet covers the spread, sweeps aside, and its surviving 8.5%-wide strip with gilt rim IS the page gutter | `.rail` — narrow (≤72%/24rem) gold-and-marble editorial rail on the gutter line, double-gold `.folio-rule`, ink caption | `.gilt-quote` — `::first-letter` gold initial at 4.6em floating a ≤23ch continuation column; frames the poster from below, never enters it |

All entries: **transform/opacity only** (one uses the veil's opacity; none animate
filter, layout, or background). All base states = final composition (keyframes define
only `from`), so nothing can reverse on scroll-back, and reduced-motion resolves
instantly (per-file `prefers-reduced-motion` blocks — G12 — plus the base.css global
kill). Poster widths per composition: 88 / 84 / 82 / 85 / 90 (§5.1's 82–92 band; see
Judgment call #1 for units).

## Judgment calls (the things to interrogate)

1. **Poster widths are `%`, not `vw`.** §5.1 says "82–92vw". `vw` includes the
   scrollbar (CSS spec), so `90vw` + `margin-inline-start: auto` on Thirst produced a
   390.4px body — a real, measured sub-pixel horizontal overflow, and on classic-
   scrollbar systems it would be ~15px of cropped canonical art. Implemented as the
   same number in `%` of the full-bleed stage (= the visible viewport), which is what
   the clause means physically. The numbers are preserved verbatim; only the unit is
   corrected. If Sol reads §5.1 as literal-vw, this is a contest, not an oversight.

2. **`entry-complete.ts` is shared, and §5.2's share list doesn't name it.**
   The §6 clause "normal scrolling completes the transition" needs one behavior:
   first scroll ⇒ add `.entry-done` to `[data-entry-stage]`. The module owns no DOM,
   no CSS, no layout, no composition — each environment declares its own `.entry-done`
   rules against its own elements. Writing it five times inline would be five identical
   scripts (the exact copy-paste smell Layer 1 exists to catch) with zero added
   distinctness. I read §5.2's list as bounding shared *composition*, not forbidding a
   9-line behavior utility; contest it if that reading is wrong.

3. **Split-pull performances are aria-hidden with an sr-only intact copy**
   (Unholy sermon/versicle, Redemption ascension). §6 mandates typesetting that
   fragments and reorders a sentence visually; screen readers should never receive the
   fragments. The pull renders once, whole, in a `.sr-only` paragraph placed before the
   visual block; the performance is `aria-hidden="true"`. The words are the copy
   lane's, verbatim — splitting is at clause/sentence boundaries only, in frontmatter.

4. **Redemption's ascent is `flex-direction: column-reverse`.** "Ascends" is visual;
   with the intact sr-only copy carrying reading order (see #3), the visual stack is
   free to climb: sinner at the bottom, "Anyone can change." at the top edge.

5. **Transient occlusion during entries.** §6's own entries put environment layers over
   the poster's XY mid-animation (the marble leaf literally covers the spread before
   sweeping aside). I read §5.1's "may not cross its box" as governing the composed
   state: at rest, nothing overlaps the canonical rectangle in any environment (sill
   flush below; wings/jambs/shaft z-below and flanking; leaf strip at 0–8.5% vs poster
   left edge at 10%).

6. **Smoldering's h1 is `sr-only`.** §6 row 2 forbids a duplicate poster title in the
   performance; the poster names itself in baked type. Every other environment carries
   its visible h1 inside its own copy material (plaque / slab / program / rail) — five
   different homes for the same semantic slot.

## Verified at 390 × 844 (mobile-first, §6 / brief item 3)

All five routes were driven in Chromium at 390 × 844 and screenshotted before any of
this was called done. Defects found by that pass and fixed during the phase:

- Smoldering: reflection flipped about its top edge and painted over the hook
  (`transform-origin` removed — flip in place).
- Unholy: 63px horizontal page overflow (max-content staggered lines + indent);
  fixed with `fit-content`. Shaft was invisible behind the poster; widened past the
  poster with masked flanks. Chrome gradient floor brightened for legibility.
- Redemption: `--grain-fine` layered ABOVE the jamb gradient killed the luminosity
  (opaque noise tile); removed. Staircase deepened, then reversed to actually ascend.
- Thirst: the vw/scrollbar overflow of Judgment call #1.
- All: horizontal overflow re-measured 0 (`scrollWidth === clientWidth === 375`) on
  every route after fixes.

## Not done, and why

- **Desktop composition** — 2b by design. The pages are mobile-first and render
  acceptably (if unart-directed) at wider widths; no `@media (min-width)` exists in
  any environment. §5.1's desktop poster-height clause (82–88svh) is 2b's to satisfy.
- **Lighthouse/payload run** — G13 is phase 6; no new JS beyond ~0.3 KB
  `entry-complete.ts` per detail route.

## Flags for the arbiter / other lanes

1. **ScratchSniff toast vs §5.1 (pre-existing, unowned).** The site-wide `aside.qc`
   gag (BaseLayout) is a fixed overlay that visually crosses the canonical poster's
   box on detail routes until dismissed. It predates this phase and no phase in the
   PROTOCOL table owns it. If §5.1's "controls may not cross its box" covers global
   overlays, someone must own suppressing or repositioning it on `/psas/[slug]` —
   deferring it to nowhere is how violations ship.
2. **Copy lane** — nothing new; §7.2 items remain with the copy lane. No campaign
   copy was authored in this phase: all strings on the five routes come from
   `content/copy.ts` (`posterCopy[slug].pull/caseNote/alt`, `psas.downloadNotice`),
   `config/site.ts` titles, or §9.2's spec-fixed navigation vocabulary.
