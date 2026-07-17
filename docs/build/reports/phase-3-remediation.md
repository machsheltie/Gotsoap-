# Phase 3 — Remediation report

**Executor:** Claude Fable 5 · **Date:** 2026-07-15
**Answers:** `phase-3-review.md` (6 FAIL + 1 CONCERN), reconciled per
`phase-3-remediation-order.md` against the **consolidated root `specs.md` (2026-07-15)**
and the two owner amendments (flagship = Unholy; maker credit = footer-only).
I re-read `specs.md` §3 and §13 in full before touching anything.

## Gate fingerprint (verbatim — the board grew to 19)

```
gate-set: 19 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G17 G16]
```

`npm run gates:phase 3` → **exit 0** (captured `$LASTEXITCODE`) · 18/19 PASS · 1 DEFER (G8 → phase 5)
G6, G7, G7b, **G7c**, **G11**, **G16**, **G17** all PASS.
`npm run build` → 16 pages, complete, no errors.
`npm run distinguish` → PASS, worst pair 26.7 against the 10 floor (re-run because BaseLayout, a shared layout, changed; neither `gates.mjs` nor `distinguishability.mjs` was touched by me).

## Finding-by-finding

| Sol # | Answer | What changed | Rendered evidence |
|---|---|---|---|
| **F1** flagship | **Fixed** | `config/site.ts` → `HOME_FLAGSHIP = 'unholy'`, comment now records the closed owner decision instead of calling it reserved. The swappable-prop plumbing did its job: the flip was one line and the beat's register, title, and wash followed (`register-smoke` now drives the environment). | Rendered home: `posterCount === 1`, `currentSrc = unholy.….avif`, complete 4:5 in frame — `evidence/phase3r-390-campaign-unholy.png`. G16 PASS |
| **F2** body bootstrap | **Fixed** | The first-visit decision now runs in a **synchronous `<head>` `is:inline` script in BaseLayout**, before body paint: it checks `prefers-reduced-motion` **and** `sessionStorage`, and adds `steam-first-visit` to `<html>` only when motion is allowed and the flag is absent. Hero fog CSS keys exclusively off `html.steam-first-visit .hero:not([data-hero])`; the clear state is the default; the body bootstrap is deleted. The head failsafe drops the class after 3s if the island never takes over — and **stores only when a hero exists**, so a visitor landing on `/pledge` first still gets their one sweep when they reach the home. `steam-hero.ts` gates on the class. | Timeline logs on the final build: first visit — class present at first script tick, `clearing` → `done` at clearing + 1901ms (full sweep, in the 1.8–2.2s window), stored. Return visit — no class, steam `opacity: 0` pre-paint. Reduced motion + fresh session — no class, never fogged. Non-home first page — class dropped, **nothing stored**. Mid-sweep scroll completion re-verified in the prior pass and the mechanism is unchanged |
| **F3** canonical-as-wash | **Fixed** | The Campaign wash is now a **purpose-built build-time derivative**: `getImage` over the flagship's `src/assets/posters/*.jpg` source at 640px webp q45, resolved by slug so the owner's flagship swap carries the atmosphere. No home file references `/downloads/<slug>.jpg` any more. | Wash resolves to `/_astro/unholy.….webp` = **24.8 KB** (vs the 1,103,940-byte canonical download Sol measured). Network capture across the full home scroll: **zero `/downloads/` requests**. G7c PASS |
| **F4** QC card over the poster | **Fixed** | `index.astro` passes `hideScratchSniff={true}` with an in-file comment naming the §3.3 reason — the same defect class removed from detail routes, now dead on the home too. | Rendered home: zero fixed-position overlays outside the masthead at any scroll position |
| **F5** deleted preview, no 301 | **Fixed** | `public/_redirects` created: `/movement-preview / 301`. Astro copies it into `dist/`, where Netlify honours it; the gate accepts either declaration form. The route remains absent from the sitemap. **Local preview note:** `astro preview` does not execute Netlify redirects, so the local response is still a 404 — the declaration is machine-checked (G17 PASS) and the actual 301 needs Sol's confirmation on the deploy, as the gate comment itself anticipates. | G17 PASS |
| **F6** credit not verbatim | **Reconciled per the owner amendment — not applied literally.** | The masthead credit is **deleted entirely** (Masthead.astro carries an in-file comment citing the 2026-07-15 amendment: no real-world credit above the fold). The **footer** credit's source string is now the literal `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` — real caps in markup; the `small-caps` CSS dress-up is removed since there are no lowercase glyphs for it to act on. Still linked to `/about`, middots intact. | Rendered footer text matches the literal byte-for-byte; masthead contains no `produced by` text. G11 (tightened, case-sensitive, fails-on-masthead) PASS |
| **F7** rail lock at 1920 | **Fixed, not argued.** Sol was right that a lock that only holds below the wall's `max-width` is a mobile styling, not architecture. | The emphasized grout line moved **inside `.case__wall`** so the line and the RAIL zone share one coordinate space, and both consume a single `--rail-inset` variable (the old section-relative `--rail-offset` and its per-breakpoint margin arithmetic are gone). | Measured gap rail-figure-right-edge → grout line: **2.5px at 390×844, 2.5px at 1440×900, 2.5px at 1920×1080** (the 2.5px is the figure's lock border sitting on the line; Sol had measured 229.9px at 1920). `evidence/phase3r-1920-case-rail.png` |

## One additional defect found and fixed during remediation

The flagship flip exposed a contrast problem Sol could not have seen (the beat rendered
Poster 5 when audited): my register-mixed caption gradient's dark stop went muddy on the
smoke ground — the second line of "This is what clean looks like." lost contrast. The
caption now uses the token-approved `.fx-gold` treatment (tuned for dark grounds, which
both permitted flagship registers sit on). `evidence/phase3r-390-campaign-caption.png`.

## New spec requirements inherited by the consolidation

- **§3.2 live-text Evidence Wall:** already satisfied as built — every figure and every
  complete finding is live HTML text with CSS chrome/scale/highlight treatments; The Case
  loads no images; the decorative duplicate figures (`.case__figure`) carry
  `aria-hidden="true"` so assistive tech reads each number once, inside the verbatim
  finding sentence.
- **§7.2 flagged home copy strings:** consumed as-is and flagged, not rewritten — the
  Hero institutional signature line, Campaign `PROPAGANDA`, Confrontation `CONFRONT`.
  Note for the copy lane: the Hero's big provocation now uses the **verbatim**
  `home.hero.sub` (the invented PROVOCATION line was retired during the phase build),
  so of §7.2's list only the signature line remains open in the Hero.

## Not contested

Nothing. All six FAILs were real; five trace to the stale spec mirror or my own misses,
and F6's divergence from Sol's literal instruction follows the owner amendment that
postdates the review, exactly as the remediation order directs. F7 is fixed rather than
answered because the wide-viewport separation was a genuine break of the named
architectural lock, not a defensible mobile-first choice.
