# Got Soap? — Owner Asset Brief (Photoshop task list)

**For:** Stacey · **Prepared by:** copy + marketing/content lens · **Date:** 2026-07-08
**Companions:** `docs/design.md` (tokens/registers), `docs/copy/copy-deck-v2.md` (the exact text on each card), `docs/copy/launch-campaign-v1.md` (how each asset is used)

## TL;DR — what to make tonight, in ROI order
Build the site never blocks on these — the implementers ship **token-based placeholders** for everything below and swap when your masters land. So make them in the order that earns the most, not the order they appear on the site:

1. **Verdict cards** (4 verdicts × 2 sizes = 8 files) ← **the single highest-ROI asset.** This IS the growth engine.
2. **Hero image** (widescreen re-stage of Poster 1) ← the first impression.
3. **Pledge badge** (1 file) ← the conversion share.
4. **Default site OG image** (1 file) ← so every un-carded link preview isn't broken.
5. **Favicon + "got soap?" mark** (small set) ← site chrome.
6. **Case-file card template** ← sustain-phase content + v2 generator; not launch-critical.
7. **Poster 5 `aa` crop** ← you're already on this.

**You do NOT need to make:** the CWAAA **seal** and **washcloth-ribbon** — those are SVGs the implementer builds (harvestable from the retired prototype). Don't spend Photoshop time on them.

---

## Why this order (the marketing/content reasoning)

**Verdict cards are the product, not decoration.** The entire viral loop is: take Sniff Test → get a verdict → *screenshot and share it* (or the bro chat does). Every share is a free impression and a link back. If the card doesn't read at a glance in a group chat, the loop leaks. Nothing else you make tonight moves the needle as hard. Old Spice/Dr. Squatch/Cards-tier brands live or die on the shareable unit; this is yours.

**The card must survive three viewing contexts:**
1. **Group-chat screenshot** (1:1-ish, small) — the verdict NAME has to dominate and be legible thumbnail-size.
2. **IG story/feed** (1080×1350, 4:5) — the format that matches your posters, so it feels like the campaign.
3. **Link preview** (1200×630) — when a verdict URL is pasted anywhere.

**Design rule for all share cards:** verdict name huge → roast line secondary → CWAAA stamp + `#GotSoap` + `gotsoap.netlify.app` small but present. The stamp is what sells the bit as "real." Don't let the branding crowd the name.

---

## Full spec table

Provide **high-quality PNG or JPG masters**; the build generates WebP/AVIF responsive derivatives — you don't export those. Keep masters under ~2 MB where possible.

### 1. Verdict cards — 4 verdicts × 2 sizes (P0, highest ROI)
Text for each is verbatim in `copy-deck-v2.md` §6.4. Register per verdict from design.md:

| Verdict | Register / palette | Card text (from deck) |
|---|---|---|
| **Certified Soap-Smoldering** | Porcelain — `steam-white` ground, `grout-black` ink | Name + "You wash. Daily. With soap. Unreasonably hot of you." |
| **Suds-Curious** | Marble/amber — `marble-amber` + warm | Name + "There's a clean man in there. We can hear him tapping. Let him out." |
| **Axe-Dependent** | Smoke — `smoke-slate` + `chrome-mist` | Name + "We could smell you from the results page." |
| **Public Thirst Hazard** | Smoke, heavier/darker | Name + "This has been a public thirst announcement. You were the announcement." |

- **Sizes:** `1200×630` (OG/link preview) **and** `1080×1350` (IG/social). = 8 files.
- **Must include:** verdict name (Oswald Bold, dominant), one roast line, the **CWAAA stamp** corner-wise in `cwaaa-stamp` red, `#GotSoap`, and `gotsoap.netlify.app`.
- **Filenames:** `verdict-soap-smoldering-og.jpg` / `verdict-soap-smoldering-social.jpg`, etc. (slugs: `soap-smoldering`, `suds-curious`, `axe-dependent`, `thirst-hazard`).
- **Legibility test:** shrink to 200px wide — can you still read the verdict name? If not, size it up.

### 2. Hero image — widescreen re-stage of Poster 1 (P0)
- **Text-free** (the live HTML "got soap?" headline sits on top; steam auto-clears over it).
- Same world as Poster 1 (porcelain tile + steam; ideally the same cowboy, re-composited wide).
- **Negative space** top-center/left for the headline + nav to breathe.
- **Sizes:** a wide master (≈`2400×1350`, 16:9) **and** a taller mobile crop (≈`1080×1440`) so it doesn't awkward-crop on phones. Implementer preloads it (it's the LCP image), so a clean high-qual JPG is ideal.
- **Filename:** `hero-confident-man-wide.jpg` + `hero-confident-man-portrait.jpg`.

### 3. Pledge badge (P0)
- **Size:** `1080×1080`.
- Washcloth-ribbon motif + "I took the pledge · Lather. Rinse. Respect. · #GotSoap." CWAAA register (manila/ink/stamp) since the pledge is CWAAA's surface.
- Shown on the SWORN success state + shared.
- **Filename:** `pledge-badge.png`.

### 4. Default site OG image (P1)
- **Size:** `1200×630`. One branded "got soap?" card (hero energy or the logotype on a register) for any link that isn't a poster or a verdict (home, /crisis, /about fallback).
- **Filename:** `og-default.jpg`.

### 5. Favicon + "got soap?" mark (P1)
- Favicon set (implementer can generate sizes from one clean `512×512` master + an SVG mark if you have one).
- The "got soap?" logotype mark as SVG or transparent PNG for nav/share.
- **Filenames:** `favicon-512.png`, `mark-gotsoap.svg` (or PNG).

### 6. Case-file card template (P2 — sustain content + v2 generator)
- **Size:** `1080×1080` (+ optional `1080×1350`).
- Manila CWAAA "case file" layout with slots: `CASE FILE RC-[n]`, handle/name, verdict stamp, the quote, `Status: REFORMED`. Build it as a reusable template (smart-object text layers) so "Recovery of the Week" posts are fast and the v2 "file your own" generator can mirror it.
- Text for the first 9 files is in `copy-deck-v2.md` §8.6a.
- **Filename:** `case-file-template.psd` + exported cards `case-file-rc-014.png`, etc.

### 7. Poster 5 `aa` minimalist crop (P2 — you're on it)
- Match the existing `aa` set: headline + CTA + hashtags only. Enables the matched share set and the v2 caption generator.

---

## Placeholder strategy (so the build moves tonight, without you)
Tell your parallel build agent (it's already in the copy contract):
- Ship **token-based placeholders** for verdict cards, hero, badge, and OG default using design.md tokens + Oswald — ugly-but-correct-dimensions, so every route, share flow, and OG preview works end-to-end.
- Wire real filenames now (per the table above) so swapping art later is a drop-in, not a re-plumb.
- Seal + ribbon SVGs: implementer builds from the prototype — not blocked on you.
- Verdict pages must ship with *some* card (even placeholder) so shared links preview correctly from day one; swap to your masters when ready.

## Priority summary for tonight
- **If you only finish one thing:** the 4 verdict cards at `1080×1350` (the share unit).
- **If you finish two:** add the hero.
- **Everything else** has a working placeholder and can follow this week before the Aug 1 launch.
