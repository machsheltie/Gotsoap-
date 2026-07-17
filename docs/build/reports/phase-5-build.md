# Phase 5 build report — the placement hub (`/psas`)

**Executor:** Claude Fable 5 (Lead Developer)
**Date:** 2026-07-16
**Spec:** `specs.md` §4 (with §2, §11, §12, §14 as they touch `/psas`)
**Gates owned:** G8, G14, G18

```
gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]
19/20 gates pass  ·  1 WAIVED debt (G7c)  ·  payload gates skipped (use --build)
Phase 5 is clean. Hand off to review.
```

(G7c is the pre-existing home-redo waiver, owned by `docs/build/reports/visual-redo-brief.md` — not phase-5 scope.)

`npm run build`: **16 pages, no errors** (11.43s). All hub derivatives generated:
portrait AVIF 10/14/19 KB (810/1080/1350w), wide AVIF 15–32 KB (1600–3200w), WebP
and JPEG fallbacks alongside — placeholder art, so §4.2 budgets (450/750 KB) pass
trivially; **re-measure at swap day** (noted below).

---

## What changed

| File | Change |
|---|---|
| `site/src/content/placement-hub.ts` | Added `export const PLACEMENT_HUB_WIDE_MEDIA = '(min-width: 768px)'` — the single art-direction boundary (G18), with a doc comment naming its two consumers. Coordinates untouched. |
| `site/src/pages/psas/index.astro` | **Full replacement.** The §2-banned staggered gallery is gone. The page is now one locker-room installation: one responsive `<picture>` composite, five hotspot anchors, a chrome route plaque, porcelain register throughout. |

No other file was touched. `PosterImage` is no longer imported on `/psas`.

## How each phase requirement is met

### §4.2 — one composite, not five posters (G8 ✓)
- One `<picture>`: three wide `<source>`s (AVIF/WebP/JPEG) on `media={PLACEMENT_HUB_WIDE_MEDIA}`, three portrait sources (AVIF/WebP + JPEG `<img>` fallback). Verified in `dist/psas/index.html`: exactly 3 × `media="(min-width: 768px)"`, zero `assets/posters/` references.
- Aspect-ratio reservation (§11): `width`/`height` attributes on **every `<source>`** (3200×1800 wide, 1350×2400 portrait) plus the `<img>`, so the browser reserves the aspect of whichever source it art-directs. Engines too old for source-level dimensions fall back to the img's portrait ratio pre-load.
- Composite is decorative: `alt=""` (§12); the five poster names live on the anchors and the plaque.

### §4.3 — hotspots from the content module
- Five real `<a>` elements, geometry read from `placementHub` at build time. Each anchor carries **both** coordinate sets as CSS custom properties (`--wx/--wy/--ww/--wh` and `--px/--py/--pw/--ph`); heights derive from `hotspotHeight()` — never hand-written.
- A build-time tripwire throws if the wide and portrait arrays ever disagree on slugs (protects the swap-day edit).
- Accessible name = full poster title (sr-only span inside the anchor), destination `/psas/<slug>` — verified in the rendered a11y tree.
- Focus: `outline: 3px solid var(--focus-ring)` (amber-ink under porcelain, ~4.8:1 on the light ground) + a 6px lather halo `box-shadow` so the ring holds contrast over any region of the composite, + the chrome hover ring at full opacity. Evidence: `evidence/phase5-hub-390-focus-ring.png`.

### §4 / G18 — one shared breakpoint (✓)
- The **same exported string** feeds the wide `<source media>` attributes and the client `matchMedia(PLACEMENT_HUB_WIDE_MEDIA)` call, which flips `data-source="wide|portrait"` on the stage; hotspot geometry is keyed off that attribute. No raw breakpoint literal exists anywhere in the hub (the string `768` does not appear in `psas/index.astro`).
- **Rendered boundary evidence (Playwright):** at 767×1024 → `currentSrc=placement-hub-portrait`, `data-source="portrait"`; at 768×1024 → `currentSrc=placement-hub-wide`, `data-source="wide"`. The picture and the hotspot selector cannot disagree at the boundary — they consume one constant.
- The wide floor layout below the image is keyed off `.hub:has(.hub__stage[data-source='wide'])` rather than a restated width query — deliberately, so even layout follows the same single selector.

### §4.3 — the route plaque
- Visible `<nav aria-label="Installation route list">` below the image, styled as a mounted brushed-chrome plate: token-derived metal gradient, beveled edge, four countersunk screwheads, engraved wordmark (`nav.mark`) and five engraved titles with groove separators. Evidence: `evidence/phase5-hub-390-plaque.png`, `phase5-hub-1440-floor.png`.
- Plain `<ul>` (not `<ol>`) and no visible numerals — §14 retires decorative sequence numerals from poster taxonomy.
- Every row is a native anchor, `min-block-size: 44px`, 3px focus outline. Keyboard reachable in DOM order; click-through verified (hotspot → `/psas/redemption` loaded).

### §4 / §14 — 390×844 recognition (verified first, per §6 discipline)
- Rendered at 390×844 (`evidence/phase5-hub-390x844-fold.png`): all five poster worlds fully inside the first visual field, individually identifiable.
- Measured hotspot boxes at 390×844: 135×169, 128×159, 150×188, 120×150, 158×197 CSS px — every one independently tappable, ≥44×44 with wide margin. (Belt: the CSS also pins `min-inline-size/min-block-size: 44px` in case a future composite shrinks a poster.)
- At 1440×900: all five hotspots fully in the first field (largest 271×338), wide set active. Evidence: `phase5-hub-1440x900-fold.png`.
- Normal vertical scroll only — no snap, no drag, no viewport lock, no `100vh` (G1 clean).

### §12 — degradation matrix
- **No CSS:** anchors and plaque render as plain named links in source order (sr-only titles become visible text).
- **No JS:** the stage ships **without** `data-source` (verified in dist HTML — the attribute appears only inside the bundled selector script), and hotspots stay `display: none` until the selector chooses a coordinate set. Navigation is carried by the plaque — §4.3's designated fallback. **This is a deliberate judgment call flagged for review:** without the mandated `matchMedia()` selector there is no way to know which composition the `<picture>` chose, and a hotspot positioned for the wrong composition routes a tap to the *wrong poster* — strictly worse than the plaque. If Sol reads §4.3's "five real anchor elements" as requiring no-JS hotspots, the alternative is a build-time `@media` block interpolated from the same constant, which I read §4.2's "do not duplicate the breakpoint in component CSS" as prohibiting.
- **No images:** empty-alt composite disappears silently; hotspots and plaque still name and route all five posters.
- **Reduced motion:** hotspot-ring and arrow transitions off; the plaque's one-shot specular sweep (`transform`/`opacity` only, plays once on reveal) is disabled outright. Not live-emulated in this pass — branch is in the page CSS for Sol's inspection.

### §11 — performance
- Composite is the only eager image (`fetchpriority="high"`, it is the LCP); no poster files load until a detail route.
- Hub client JS is the ~200-byte selector module. Motion uses opacity/transform only; no `will-change` at rest.

## Decisions Sol should look at

1. **JS-gated hotspots** (rationale above, §12 row 2). The spec text mandates the matchMedia selector; I chose plaque-fallback over wrong-poster-risk for the no-JS case.
2. **`hideScratchSniff` on `/psas`** — new. The fixed gag toast would overlay the composite's poster regions on mobile (portrait arrangement spans nearly the full image height). Same §5.1 reasoning that already hides it on `/psas/[slug]`: nothing crosses a poster at rest — including posters inside the composite.
3. **Plaque wordmark** — the plate is engraved with `nav.mark` ("got soap?") as physical branding. Campaign-authored surface, no CWAAA blending.
4. **Wall-label strip above the stage** — compact (kicker + h1 + chrome rule), sized so all five posters still hold the 390×844 and 1440×900 first field (measured, not assumed). The installation, not the heading, is the hero.

## Copy consumed / flagged (not authored)

- Consumed verbatim: `psas.indexHeading` (h1), `psas.indexSub` (kicker), `psas.indexBody` (floor note), `meta.psas` (title/description), `nav.mark` (plaque engraving).
- **Flagged for the copy lane:** the plaque's `aria-label="Installation route list"` is a structural implementation default (same class as the contents-dialog framing strings flagged in phase 4). Re-voice freely; no component logic depends on the string.
- `psas.downloadNotice` is not used on the hub (downloads are detail-route mechanics).

## Known-red, and why that is correct

- **G14 under `--prod`:** `1 BLOCKING: G14 — 4 × placeholder still referenced` (2 hero refs + 2 hub refs). Correct and expected: the hub is **built, not shippable** until Stacey's real wide + portrait composites land. Swap procedure: drop in the two files, re-measure the five poster rectangles, edit the percentages in `src/content/placement-hub.ts` — nothing else changes; every anchor, ring, and route keeps working. **At swap, re-run `npm run gates:build`** and check the §4.2 payload budgets (450 KB mobile / 750 KB desktop AVIF) against real art — token stand-ins prove nothing about them.
- **G13 / Lighthouse:** phase-6 owned, deferred by scope.

## Environment note for the reviewer

Playwright on this machine scales the emulated window ≈0.8×, so **every** computed border/outline width reads at 80% (a forced inline `outline: 10px` computes 9.6px; the base 2px site ring reads 1.6px). The hub's focus outline therefore *reports* 2.4px in that environment while the stylesheet declares — and real devices render — 3px. Verified it is environmental, not cascade: the winning rule in the built CSS is `.hub__spot[data-astro-cid-…]:focus-visible { outline: 3px solid var(--focus-ring); … }`.

## Evidence

- `evidence/phase5-hub-390x844-fold.png` — mobile first field, five posters visible
- `evidence/phase5-hub-390-focus-ring.png` — keyboard focus on the Unholy hotspot
- `evidence/phase5-hub-390-plaque.png` — chrome plaque + floor note, mobile
- `evidence/phase5-hub-1440x900-fold.png` — desktop first field, wide arrangement (focus ring on frame 3 shows wide-set alignment)
- `evidence/phase5-hub-1440-floor.png` — desktop floor: note + plaque, asymmetric
- Console: 0 errors (single warning = GoatCounter declining localhost, correct)
