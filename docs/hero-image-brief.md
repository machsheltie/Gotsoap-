# Hero Image Brief — the Widescreen Edition

**For:** Stacey (Photoshop session) · **Consumed by:** the home-page steam-clear hero
(design.md §8, PRD §5.1) · **Date:** 2026-07-08
**One-line brief:** a widescreen, **text-free** re-staging of Poster 1's world — the same
clean, confident man, the same porcelain-and-steam fragrance-ad drama — composed to share
the frame with live HTML type instead of baked type.

---

## 1. Why this image exists (so every choice serves it)

- The hero is the site's first three seconds. It has to *sell the bit* — this looks like a
  real, committed, expensively art-directed campaign — before a single word is read.
- It is NOT poster #6. The five posters are Series One, the untouchable artifacts. This is
  the campaign's *environment* extended to a new format — the kind of format-range piece a
  Liquid Death-type creative director reads as "she can take a campaign anywhere."
- On load, a CSS/canvas steam layer (implementer-built — you do not need to paint the fog)
  clears itself off this image in ~2 seconds while the live "got soap?" headline resolves.
  So the image itself should read as the **just-wiped, revealed state**: crisp, clean,
  freshly showered. The steam you paint INTO the image is atmosphere, not the overlay.

## 2. Concept & continuity

- **World:** Poster 1 ("A Clean Man Is A Confident Man") — bright porcelain tile, steam,
  soft top light. The porcelain register opens the walk; spots then alternate registers.
- **The man:** the same cowboy from Poster 1 for perfect continuity (preferred: reuse the
  model layer from `setup.psd` / `currentstep.psd` and rebuild the environment wide).
  Fallback: a new openart.ai render matched to Poster 1's look — same coloring, grooming,
  build, towel, wet-skin sheen. Continuity is the point: the visitor scrolls from the hero
  into Spot No. 1 and recognizes him.
- **Energy:** fragrance-ad seriousness, zero irony in the image itself — the smolder aimed
  at camera. The satire lives in the type and copy; the photo plays it dead straight
  (that's the Leibovitz lesson: production seriousness is the joke's delivery system).

## 3. Composition — the type shares this frame

The headline ("got soap?", Oswald SemiBold, lowercase, near-black `#0E0E10`) and a
"Because…" subhead are LIVE TEXT rendered by the site, positioned over the image's left
side. Compose for them:

```
DESKTOP MASTER (wide)                                 · nav bar (site chrome, dark strip)
┌─────────────────────────────────────────────────────────────────┐
│ ░ nav strip zone — keep top ~90px quiet ░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                 │
│   TYPE ZONE (left ~40–45%)              MODEL (right third,     │
│   bright, smooth porcelain +            waist-up or 3/4,        │
│   soft steam — LOW detail,              gaze at camera,         │
│   high value (steam-white → white)      steam wrapping behind   │
│   headline + subhead render here        and around him)         │
│                                                                 │
│ ░ lower-third: calmer band — scroll cue / hint may sit here ░░ │
└─────────────────────────────────────────────────────────────────┘
```

- **Model right-of-center, type zone left.** Reading order: the question first, then the
  answer to it standing there smoldering.
- **Gaze at camera** — the direct-address thirst-trap look, consistent with the posters.
- **The type zone is sacred:** smooth tile + soft steam gradient only, values in the
  `#ECEAE4`-to-white range, no busy grout intersections, water droplets, or hard shadows
  there. Near-black type needs ≥7:1 contrast across the whole zone.
- **Steam behavior:** denser at the frame edges and behind the model; thinnest in the type
  zone. Think "he just wiped the mirror" — clarity in the middle, breath at the edges.
- **Tile grid:** visible grout lines sell the world (the spot sections reprise a CSS
  tile-and-grout grid — the hero establishes it), but keep grout OUT of the type zone or
  ghosted very faint under steam.
- **No corner-tag mark needed here** — the live headline IS the logotype on this surface.
  (The corner-tag convention applies to other campaign imagery.)

## 4. Deliverables (two crops — the web serves both via art direction)

| Deliverable | Canvas | Safe area | Notes |
|---|---|---|---|
| **Wide master** | **3200 × 1800** (16:9) | keep all critical content (face, torso, type zone) inside a centered **21:9 band** (3200 × 1370) | Large desktops render the hero wider-and-shorter than 16:9 (~2.9:1 at 2560×880), so the top/bottom of the 16:9 frame will crop away. Face stays in the upper-middle of the band. |
| **Portrait crop** | **1350 × 2400** (9:16) | type zone moves ABOVE the model (upper ~35%), model centered below | This is what phones see (360–430px wide, near-full-height). Not a squeeze of the wide comp — recompose: steam-bright upper zone for the headline, man beneath it. |

- Work at these sizes or larger; downscale on export, never up.
- Keep the layered PSD (environment / model / steam / grade as separate groups) — future
  cutdowns (OG images, social) will come from it.

## 5. Technical & export

- **Color:** sRGB (convert on export if working in a wider space).
- **Export:** JPG quality ~80–85 for handoff (`hero-wide.jpg`, `hero-portrait.jpg`, saved
  in the project root alongside the posters). The build converts to AVIF/WebP + responsive
  sizes — hand off generous quality, let the pipeline do the squeezing.
- **Banding guard:** big soft steam gradients band badly under web compression — add ~1–2%
  fine monochromatic noise over the gradient areas before export.
- **Weight sanity:** the wide JPG should land under ~1.5 MB at quality 85; if it balloons,
  flatten micro-texture in the steam rather than dropping quality on the model.
- **LCP note (why the type zone matters twice):** this image is the page's LCP element and
  is preloaded. Smooth, low-detail steam zones compress beautifully — the composition that
  serves the type also serves the performance budget.

## 6. Hard rules (the expensive-to-get-wrong list)

1. **Zero baked type.** No headline, no "Because…", no CTA, no hashtags, no footer gag —
   the web renders all of it live. (This is what makes the hero responsive-safe; the
   prototype's cover-cropped Poster 1 was slicing your typography at every viewport.)
2. **Do not crop or re-typeset a canonical poster** to make this — it's a new composition
   in the same world.
3. **The image plays it straight.** No visual winks; commitment is the comedy engine.
4. **Face and eyes** stay inside every crop's safe area — check both deliverables.
5. If any Freepik/macrovector texture ends up in the comp, note it — attribution must ship
   on /about (PRD §8 licensing check).

## 7. Pre-flight checklist (before you call it done)

- [ ] Type zone: smooth, bright (`#ECEAE4`→white), no grout/droplets/hard shadows in it
- [ ] Squint test: silhouette + type zone still read at thumbnail size
- [ ] 21:9 center-band crop of the wide master loses nothing critical
- [ ] Portrait comp recomposed (type space on top), not squeezed
- [ ] Noise pass over steam gradients (banding guard)
- [ ] sRGB, JPG ~85, both files exported + PSD saved with grouped layers
- [ ] No text anywhere in the pixels

---

*Placeholder policy until this lands: the build uses a token-based placeholder (grout-black
ground, live type, CSS steam) — the site never blocks on the art (HANDOFF, PRD §8).*
