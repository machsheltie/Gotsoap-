# Phase 2b — Poster geometry: DESKTOP — build report

**Executor:** Claude Fable 5 · **Date:** 2026-07-15
**Spec:** §5.1 (desktop poster geometry) · **Gates:** 2a's set, held — nothing new to turn
**Precondition met:** Sol ratified and closed out 2a before this phase started.

## Gate fingerprint (verbatim)

```
gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]
```

`npm run gates:phase 2` → exit 0 · 12/16 PASS · 4 DEFER (G7/G7b/G11 → phase 3, G8 → phase 5)
`npm run build` → 17 pages, complete.
`npm run distinguish` → PASS — **and see "The invariance proof" below.**

## What changed

Desktop composition added **inside each environment component**, all behind
`@media (min-width: 1024px)`. No shared desktop layout exists: the five stages use
five different structural mechanics —

| Environment | Desktop mechanic | Composition |
|---|---|---|
| Confident | grid INSIDE `.tile-wall` | hook in the left tile field, poster bay right above the sill, inspect bottom-left |
| Smoldering | full-width stage + article grid BELOW it | centered vanity triptych (wings at 7vw, visibly parted), hook-stand/inspect left column, framed ribbed caption panel right |
| Unholy | no grid — single center axis | tallest poster (86svh cap) under a widened masked shaft, versicle floating in the dark right gutter, staggered sermon below |
| Redemption | article grid: poster room + type aisle | confessional room left with its own edge jambs, the redemption line climbing from the bottom of the right aisle, program off-axis under the room |
| Thirst | article grid: verso/recto spread | text column (gilt drop-cap, inspect, rail) left, plate right — the marble leaf's resting strip lands BETWEEN them as the book gutter |

`SeriesNav.astro` (shared series-navigation primitive) gained its own desktop rail
rule — a row of destinations, not a stage layout.

Two mobile-range adjustments (below the breakpoint, made for §5.1 band correctness —
see Judgment call #2): `max-inline-size` caps raised so the vw fraction binds all the
way to 1023px, and `sizes` hints updated to the 1024 breakpoint.

## §5.1 sizing — the formula as implemented

Every poster caps at `min(<82–88svh per composition>, calc(100svh − masthead −
stage chrome), <width-derived guard>)`:

- **masthead:** the sticky Nav measures 56px (min-height) + 1px border; subtractions
  use 57px plus each stage's own padding/sill/controls allowance.
- **width guard:** the third term (`calc((100vw − <columns>) * 1.25)` or
  `calc(<vw> * 1.25)`) keeps tall-narrow windows from pushing a height-sized poster
  past its column. 1.25 = the 4:5 rectangle's height-per-width.
- Stages use `min-block-size`, never fixed heights; type columns can grow.

## Measurements (rendered, Chromium)

### 1440 × 900 — the resolution where the old shared split clipped

| Route | Poster svh | Fully in viewport at scroll 0 | Inspect ∩ poster | Notes |
|---|---|---|---|---|
| confident-man | **84.0** | ✓ (top 101, bottom 857) | none | sill below poster also in view |
| soap-smoldering | **83.0** | ✓ (104 → 851) | none | wings visible both sides |
| unholy | **83.1** | ✓ (128 → 876) | none | versicle gap **+294px** |
| redemption | **84.9** | ✓ (110 → 874) | none | ascension ∩ poster: none |
| thirst-announcement | **84.0** | ✓ (110 → 866) | none | leaf gutter gap **+172px** |

`scrollWidth == clientWidth` on all five. **Inherited issue #1 (masthead-ignored
clipping) is resolved with numbers**: every poster sits whole between the 56px nav
and the 900px fold.

### 1920 × 1080

84.0 / 83.0 / 85.9 / 85.0 / 84.0 svh — all in band, all fully in viewport, no
horizontal overflow. Unholy versicle gap +434.8px.

### 768 × 1024 (portrait tablet — mobile composition, by design)

Desktop grid confirmed inactive (`display: block`). Poster widths at the band after
the cap fix: redemption 85.0vw, thirst 89.2vw (leaf gap +3.8px); no overflow.

### 390 × 844 — the ratified mobile signatures, re-measured after 2b

Confident 88.1vw · Unholy versicle gap +10.4px · Thirst 87.5vw, leaf gap +1.9px —
**identical to the values in the 2a remediation report.** And per the phase order's
inherited issue #2: the Lightbox trigger's rect intersects **no** poster box on any
of the five routes at 390 × 844 (it lives in normal document flow in every
composition; nothing positions it over the artwork at any width).

## The invariance proof (the phase order's kill condition)

All five neutral renders were **recaptured** at 390 × 844 against the final 2b source
and `npm run distinguish` re-run:

```
LAYER 1 · SOURCE   worst pair 0.14   (ceiling 0.7; files grew to 310–361 lines)
LAYER 2 · RENDER   43.5 / 106.8 / 134.3 / 138.6 / 111.3 / 141.4 / 143.2 /
                   50.9 / 65.7 / 26.7   (floor 10)
```

The Layer 2 matrix is **numerically identical, pair for pair, to the ratified 2a
matrix** — the recaptured mobile renders are pixel-equivalent, which is the strongest
available proof that desktop work introduced no shared layout and altered nothing
below the breakpoint. Layer 1 moved 0.13 → 0.14 worst-pair with ~65 lines of desktop
CSS added per file — still 5× under the ceiling.

## Judgment calls

1. **Breakpoint 1024px, shared as a number across the five files.** A shared
   convention, not a shared layout: it keeps §12's 768 × 1024 test surface on the
   ratified mobile composition and gives the desktop grids room to breathe. Below it,
   the mobile signature simply scales — deliberate, not neglect.
2. **Mobile `max-inline-size` caps raised (640–660 → 840–930px).** Found at
   768 × 1024: the old caps pulled posters to ~80vw, below §5.1's 82–92 band, in the
   768–1023 range. The new caps sit just above each vw fraction at 1023px, so the
   band holds to the breakpoint; at 390 the caps are unreachable and the ratified
   renders are unchanged (proven above). This is a mobile-range edit made in a
   desktop phase — flagged so it isn't discovered as a surprise.
3. **Masthead as a 57px constant.** Nav pins `min-height: 56px` + 1px border and
   holds one row at ≥1024px. Each stage additionally carries its own generous chrome
   subtraction, so a wrapped nav on unusual viewports degrades the poster a few svh
   rather than clipping it.
4. **`fit-content` pictures.** Height-sized posters shrink-wrap so grid `auto`
   columns size to the true rendered width — no phantom full-width picture boxes
   under grid.

## Not done / for later phases

- Lightbox dialog still uses `92vh` internally (pre-existing shared primitive; not a
  `100vh` and G1-clean, but noted against §5.1's svh preference — proposed for the
  phase 6 polish sweep rather than a mid-phase edit to a ratified primitive).
- No changes to home, hub, quiz, pledge, or CWAAA surfaces.
