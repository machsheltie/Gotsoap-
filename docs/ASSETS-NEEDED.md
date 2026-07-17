# Got Soap? — Assets Needed (consolidated, canonical)

**For:** Stacey · **Consolidated:** 2026-07-17 · **Supersedes the scattered lists.**

This is the single current list. It reconciles `docs/asset-brief.md` (the original ROI task list,
2026-07-08) with `specs.md` → "Asset dependencies for Stacey" (the newer, hard-blocking assets the
build actually waits on). Where they disagreed, **the spec + the generated placeholders win** — those
are the real dimensions the code is built against.

> **Dimension correction (would have cost you a re-export):** the old `asset-brief.md` lists the hero
> at ≈2400×1350 + 1080×1440. That is **superseded.** The hero is **3200×1800 (wide) + 1350×2400
> (portrait)** per `specs.md §Asset dependencies` and the placeholders. Make it at the spec size.

Nothing blocks the *build* — every item below has a token placeholder or a CSS interim, and the code
swaps to your master when it lands. What these block is **shipping to production**: gate `G14`
hard-fails `npm run gates:prod` until the three ship-blockers are real.

---

## TIER 1 — Ship-blockers (gate G14 / `--prod` fails until these land)

| # | Asset | Exact size | Replaces placeholder | Unblocks | Notes |
|---|---|---|---|---|---|
| 1 | **Text-free hero — wide** | **3200 × 1800**, no baked type | `site/src/assets/placeholder/hero-wide.jpg` | Home ship (G14); satisfies G7b/§3.1 | Re-stage of Poster 1's world, text-free. Placeholder marks a **SUBJECT ZONE** (where the figure stands) — keep your figure roughly there so live type stays clear. Detailed brief: `docs/hero-image-brief.md`. |
| 2 | **Text-free hero — portrait** | **1350 × 2400**, no baked type | `…/placeholder/hero-portrait.jpg` | Home ship (mobile) | Portrait re-stage, not a crop of the wide. |
| 3 | **Placement-hub composite — wide** | **3200 × 1800** | `…/placeholder/placement-hub-wide.jpg` | `/psas` ship (G8, G14) | Elite locker-room wall with all **five untouched posters** installed. When it lands, re-measure each poster's position → update the 5 percentages in `site/src/content/placement-hub.ts` (that's the only code change; every hotspot re-aligns automatically). |
| 4 | **Placement-hub composite — portrait** | **1350 × 2400** | `…/placeholder/placement-hub-portrait.jpg` | `/psas` ship (mobile) | An **independent** arrangement, not a crop of the wide (§4.1). |
| 5 | **Flagship (Unholy) Campaign background** | ~**2560 × 1600** (background; flexible) | *CSS interim (no file yet)* | The home Campaign section's ship | Smoke register, **dark and uniform** enough that the gold `.fx-gold` headline + body clear **WCAG AA**. **Not** the Unholy poster reused (G7c blocks that). New file, e.g. `site/src/assets/atmosphere/campaign-unholy.jpg`. Added 2026-07-16. |

**If you make only Tier 1, the site can ship.** Order within the tier: hero (first impression) → placement composite → Campaign background.

---

## TIER 2 — Conversion / the viral loop (launch-critical, not gate-blocking)

| # | Asset | Exact size(s) | Count | Notes |
|---|---|---|---|---|
| 6 | **Verdict cards** ← highest ROI | **1200 × 630** (OG/link) **+ 1080 × 1350** (IG/social) | **8 files** (4 verdicts × 2) | THE growth engine — the shareable unit. Slugs: `soap-smoldering`, `suds-curious`, `axe-dependent`, `thirst-hazard`. Verdict **name** dominant (Oswald Bold), one roast line, CWAAA stamp + `#GotSoap` + `gotsoap.netlify.app` small. Text verbatim in `copy-deck-v2.md §6.4`. Legibility test: readable at 200px wide. Filenames: `verdict-<slug>-og.jpg` / `verdict-<slug>-social.jpg`. |
| 7 | **Pledge badge** | **1080 × 1080** | 1 | The conversion share (post-pledge). |
| 8 | **Default site OG image** | **1200 × 630** | 1 | One branded "got soap?" card for any link that isn't a poster or verdict (home, /crisis, /about fallback). |
| 9 | **Favicon + mark** | **512 × 512** master (+ SVG mark if you have one) | small set | Implementer generates the sizes. `favicon-512.png`, `mark-gotsoap.svg`. |

---

## TIER 3 — Sustain phase (not launch-critical)

| # | Asset | Size | Notes |
|---|---|---|---|
| 10 | **Case-file card template** | 1080 × 1080 (+ opt 1080 × 1350) | Reusable manila CWAAA "case file" (smart-object text layers) for "Recovery of the Week" posts + the v2 "file your own" generator. |
| 11 | **Poster 5 `aa` / minimalist crop** | per poster | You said you're already on this. Headline + CTA + hashtags only. |

---

## You do NOT need to make
- The **CWAAA seal** and **washcloth-ribbon** — those are SVGs the implementer builds (harvested from the retired prototype). Don't spend Photoshop time on them.
- Any placeholder — the build already has token stand-ins; you only make the masters above.

## Where the detail lives
- **Design/registers/colors:** `docs/design.md`. **Exact card text:** `docs/copy/copy-deck-v2.md`.
- **Hero Photoshop brief:** `docs/hero-image-brief.md`. **How each asset is used:** `docs/copy/launch-campaign-v1.md`.
- This file is the current **inventory**; those are the **briefs**. If a dimension here and elsewhere disagree, **this file wins** (it's the reconciliation).
