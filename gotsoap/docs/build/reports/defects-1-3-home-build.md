# Defects 1–3 (home visual-defect brief) — build report

**Lane:** Fable (lead developer) · **Date:** 2026-07-16
**Scope:** the front-end visual defect brief (home redo pass) — Defect 1 (display-type
clipping), Defect 2 (Unholy Campaign wash), Defect 3 (eyebrow rule collision).
Defect 4 (`/crisis` typewriter accent) was closed in a prior session
(`../../../../cwaaa/docs/history/defect-4-crisis-build.md`) and was sanity-checked rendering correctly at 1920.

**Verification fingerprint (fresh, run after all edits, `--build` included):**

```
gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]
21/21 gates pass
```

`npm run build` exits 0, 16 pages. G13: home first-party JS 1.4 KB gzip (budget 25).
**G7c passes UN-WAIVED — the waiver entry is deleted from `gates.mjs`, as the waiver
text promised.**

---

## Defect 1 — display-type descender clipping

**Root cause confirmed as briefed:** `background-clip: text` paints only the element's
padding box; with `line-height < 1.0` the box is shorter than the glyphs, so descenders
and tall numerals render transparent (and `.case__figure` additionally clips at
`overflow: hidden`, which it keeps for the shine pass).

**One recipe, applied per site — not per-glyph nudges:**
- clip-painted type: `line-height ≥ 1.05` **+** `padding-block` (paint room) **+**
  negative `margin-block` (hands the extra layout height back);
- non-clip display type: line-height floor only (nothing to un-clip).

| File | Element | Was | Now |
|---|---|---|---|
| `homev2/Masthead.astro` | `.mh__nameplate` (clip) | lh 0.85 | lh 1.1 + pad 0.12em / margin −0.12em |
| `homev2/Hero.astro` | `.hero__mark` (clip) | lh 0.90 | lh 1.08 + pad 0.12em / margin −0.1em |
| `homev2/Case.astro` | `.case__figure` (clip + overflow) | lh 0.82 | lh 1.06 + pad 0.1em / margin −0.1em |
| `homev2/Case.astro` | `.case__manifesto` | lh 0.94 | lh 1.05 (floor only) |
| `homev2/Campaign.astro` | `.camp__caption` (fx-gold) | lh 1.0 | lh 1.08 + pad 0.08em / margin −0.08em |
| `homev2/Confrontation.astro` | `.cf__q` (fx-chrome) | lh 0.90 | lh 1.06 + pad 0.1em / margin −0.08em |
| `homev2/Contents.astro` | `.ct__title` | lh 0.90 | lh 1.05 (floor only) |
| `homev2/Oath.astro` | `.oath__h` | lh 0.98 | lh 1.05 (floor only) |
| `quiz/Quiz.astro` | `.quiz__title`, `.quiz__beat-line` | 0.85 / 0.90 | 1.05 / 1.05 |
| `quiz/Question.astro` | `.q__prompt` | lh 0.95 | lh 1.05 |
| `quiz/VerdictCard.astro` | `.vcard__title` (fx-chrome/gold by register) | lh 1.0 | lh 1.06 + pad 0.08em / end-margin compensated |

**Deliberately not touched (out of the brief's scope, flagged for awareness):**
- `psas/UnholyEnvironment.astro` `.sermon-line` — clip type but lh 1.02 **and
  uppercase** (no descenders); Phase-2-ratified surface.
- `psas/ThirstEnvironment.astro` (lh 0.78) and `about.astro` (lh 0.85) — sub-1.0
  display leading but **no clip paint**, so ink overflows visibly rather than
  cropping. Phase-2 / Phase-6 surfaces. If the one-pass rule should extend there,
  that is a later-phase decision, not silently mine.

## Defect 2 — Campaign wash was the canonical poster

- Removed the entire `getImage()` pipeline (glob, error guard, wash derivative) and
  the `.camp__wash fx-poster-wash` node from `homev2/Campaign.astro`.
- Interim owner-confirmed ground shipped: **pure CSS smoke-register material** —
  grout-black pouring into smoke-slate (via the `--reg-bg` slot, so the owner's
  flagship swap smoke↔marble keeps working), a warm votive bloom behind the frame,
  a faint lather-light shaft (the Unholy §6 vocabulary), a low chrome horizon, and
  the existing `--grain-fine` plate. No image request, nothing derived from any
  poster. Stacey's purpose-built section background (asset queue item 4) replaces
  the material layer only.
- **`.fx-poster-wash` is retired from `tokens.css` entirely** — the helper had no
  remaining consumers and its doc comment taught the exact pattern G7c now forbids.
- **`.fx-gold` dark stop `#7c5716` → `#916a22`** (`tokens.css`). This is the AA fix
  the brief demanded: the caption is large text (≥30px/700), so 3:1 applies, and the
  old bottom stop measured **2.5:1 on smoke-slate and 2.96:1 on pure grout-black** —
  no ground dark enough exists for it. `#916a22` measures **3.35:1 on smoke-slate,
  3.9:1 on grout-black**. Top (`#f0cf8a`) and mid (`--marble-amber`) stops — the
  pour the owner likes — are untouched; the bevel is imperceptibly shallower.
  **Owner eyes requested** on the gold since this touches a liked effect.
- G7c un-waived and passing. Note on G7's line: it now reads "0 canonical posters"
  because the wash glob was the home's only *literal* poster path — the flagship
  still renders (via `PosterImage slug={HOME_FLAGSHIP}`; see the rendered evidence).
  §14 "exactly one canonical poster" remains true on screen; the gate greps paths,
  and one poster now arrives through the config indirection.

## Defect 3 — eyebrow rule collision: NOT REPRODUCIBLE in current source

The brief reports a divider rule crossing "THE FLAGSHIP · UNHOLY" at 1440. In the
current `Campaign.astro` no rule element shares the kicker's row, and a geometric
probe (every element with rendered height ≤ 8px tested for bounding-box intersection
with `#camp-kicker`) returns **0 hits at 1440 and at 1920**; screenshots confirm at
all three widths. The observation almost certainly dates to a pre-redo build state
(e.g. the deployed site). No code change was made for this defect — there is nothing
in the tree to fix. Sol: please re-verify against the worktree, not the deploy.

## Rendered verification (built output via `npm run preview`, Playwright)

Evidence in `gotsoap/docs/build/reports/evidence/defects-*.png`, three §12 widths:

| Surface | 390×844 | 1440×900 | 1920×1080 |
|---|---|---|---|
| Masthead nameplate g/p | ✔ `-390-top` | ✔ `-1440-hero` | ✔ `-1920-masthead` |
| Hero mark g/p | ✔ `-390-top` | ✔ `-1440-hero` | ✔ `-1920-hero` |
| Case 73% / 0% | ✔ `-390-case` | ✔ `-1440-case` | ✔ `-1920-case` |
| Case 9/10 rail | ✔ `-390-rail` | (in-flow) | ✔ `-1920-rail` |
| Campaign ground + gold + kicker | ✔ `-390-campaign` | ✔ `-1440-campaign` | ✔ `-1920-campaign` |
| Confrontation chrome q ("y") | ✔ `-390-confrontation` | ✔ `-1440-confrontation` | ✔ `-1920-confrontation` |
| Quiz title / verdict cards | ✔ `-390-quiz`, `-390-verdict-*` | — | — |
| /crisis (defect 4 sanity) | — | — | ✔ `-1920-crisis` |

Console: 0 errors on every page visited. No copy strings were authored or altered.
