# Phase 2a — Remediation report

**Executor:** Claude Fable 5 · **Date:** 2026-07-14
**Answers:** `phase-2a-review.md` (Sol, VERDICT: FAIL — 2 FAIL, 1 CONCERN)

## Gate fingerprint after remediation (verbatim)

```
gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]
```

`npm run gates:phase 2` → exit 0 · 12/16 PASS · 4 DEFER (G7/G7b/G11 → phase 3, G8 → phase 5)
`npm run build` → 17 pages, complete.
`npm run distinguish` → PASS (fresh matrices below — evidence was **recaptured** after every fix).

## Findings answered

| # | Sol finding | Disposition | Fix | Evidence |
|---|---|---|---|---|
| 1 | FAIL §5.1 — Thirst marble leaf's `10px 0 28px` shadow enters the poster box at rest | **Accepted, fixed** | Static `box-shadow` removed from `.marble-leaf`. The sweep's depth shadow now lives on `.marble-leaf::after`, whose entry keyframe holds opacity 1 through 72% of the sweep and whose **base state is opacity 0** — at rest no painted pixel exists to cross the box. `entry-done` and reduced-motion branches cover the pseudo too. (`ThirstEnvironment.astro`) | Measured at 390×844: leaf right edge **31.9px**, poster left edge **33.8px** → **1.9px clear**; computed `box-shadow: none`; computed `::after` opacity **0** at rest |
| 2 | FAIL §5.1 — ScratchSniff first-visit card covers the poster box on mobile PSA routes | **Accepted, fixed** | `BaseLayout.astro` gains `hideScratchSniff` (documented against §5.1); `[slug].astro` passes it. A fixed overlay will cross the scrolling poster box at *some* scroll offset no matter where it's parked, so suppression on detail routes is the only positionless fix. The gag survives on every other non-immersive route. | `document.querySelector('aside.qc')` → **null** on all five detail routes (measured) |
| 3 | CONCERN §5.1 — `%` widths may fall below the 82–92vw band | **Conceded, reverted** | Sol's arithmetic was right and my crop rationale was wrong — the "cropped art" in my report was a screenshot-pipeline artifact; the true vw overflow was 0.4px subpixel. All four centered environments are back to literal vw (88/84/82/85). Thirst — the one genuinely infeasible case (right-flush 90vw + the 8.5% leaf gutter cannot coexist in a classic-scrollbar container) — uses `min(90vw, 91%)`: exactly 90vw on overlay-scrollbar (real mobile) viewports, degrading to ≈87.5vw (in band) only where vw physically exceeds the container. | Bounding-box table below |

## Poster bounding boxes (the measurements the review demanded)

Chromium, 390×844 viewport. This desktop environment renders a **classic scrollbar**
(`clientWidth` 375, `window.innerWidth` 390) — the worst case for the vw question. On
overlay-scrollbar mobile viewports the two denominators coincide and the widths are
exact by construction.

| Route | Poster rect (left → right) | Width px | **vw** (÷390) | % of visible (÷375) | `scrollWidth == clientWidth` | `aside.qc` |
|---|---|---|---|---|---|---|
| confident-man | 15.8 → 359.4 | 343.6 | **88.1** | 91.6 | ✓ 375 | absent |
| soap-smoldering | 23.6 → 351.6 | 327.9 | **84.1** | 87.4 | ✓ 375 | absent |
| unholy | 27.5 → 347.7 | 320.1 | **82.1** | 85.4 | ✓ 375 | absent |
| redemption | 21.7 → 353.5 | 331.8 | **85.1** | 88.5 | ✓ 375 | absent |
| thirst-announcement | 33.8 → 375.2 | 341.4 | **87.5** | 91.0 | ✓ 375 | absent |

Every poster is inside 82–92 in **both** denominators. (Thirst's right edge reads
375.2 vs a 375 container — a 0.2px sub-pixel rounding of the `min()` value, not a
crop; `scrollWidth` confirms no overflow.)

## Same-class defects found during remediation (not in Sol's review — disclosed)

Sol's finding #1 defines a class: *final-state paint crossing the canonical box*.
Scrubbing all five environments for that class found two more instances, both fixed:

1. **Confident sill shadow** (`ConfidentEnvironment.astro`). The chrome sill sits
   flush under the poster at `z-index: 2`; its old `0 7px 16px` shadow reached
   ~9px **upward** over the poster's bottom edge. Now `0 12px 12px -6px` — offset +
   negative spread cast it strictly downward (shadow top edge = sill top + 2px).
2. **Unholy versicle sat INSIDE the poster box** (`UnholyEnvironment.astro`) — worse
   than anything filed, and my build report claimed the opposite. Root cause: logical
   `inset-inline-end` / `inset-block-start` resolve against the element's **own**
   `writing-mode: vertical-rl` (inline-end = bottom, block-start = right), so
   "top 16%, right 8px" actually computed "right 16%, bottom 8px" — measured at
   left 290.2 vs poster right 347.7, i.e. **57.5px inside the box**. Fixed with
   physical `top`/`right` plus `line-height: 1`; now measured at left **358.0** vs
   poster right **347.7** → **10.4px clear** (and ~14px clear on overlay-scrollbar
   viewports).

## Recaptured evidence + fresh distinguishability

All five neutral renders were recaptured after the fixes (same protocol: 390×844,
neutralise filter from `distinguishability.mjs`, `.entry-done` forced, dev toolbar
hidden; `aside.qc` no longer needs hiding — it is absent from the live routes).

```
LAYER 1 · SOURCE   worst pair 0.13   (ceiling 0.7)
LAYER 2 · RENDER   Confid Smolde Unholy Redemp Thirst
  Conf       —    43.5  106.8  134.3  138.6
  Smol     43.5     —   111.3  141.4  143.2
  Unho    106.8  111.3     —    50.9   65.7
  Rede    134.3  141.4   50.9     —    26.7
  Thir    138.6  143.2   65.7   26.7     —
  (floor 10 — worst pair 26.7)
PASS — five environments, distinguishable with the art removed.
```

## Notes for close-out

- Line counts moved slightly (Conf 248, Smol 272, Unho 290, Rede 293, Thir 258);
  `[slug].astro` is 106 lines after the `hideScratchSniff` prop — G5 still green.
- The ScratchSniff suppression is scoped to `/psas/[slug]`. If the same §5.1 reading
  applies to the home flagship (§3.3, phase 3) and the placement-hub composite
  (§4, phase 5), those phases own their own suppression decisions on their surfaces —
  named here so it defers to somewhere, not nowhere.
