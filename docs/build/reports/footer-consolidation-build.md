# Footer consolidation — build report (Fable)

**Order:** Home copy & register consolidation (owner, 2026-07-16).
**Spec:** `docs/build/reports/footer-consolidation-spec.md`.
**Scope:** post-freeze, owner-approved copy/register change — no new voice authored; the one new string is the style-lock §7 PSA credit, format-verbatim.

```
gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]
20/20 gates pass · copy-gates 6/6 · npm run build clean (16 pages)
```

## What changed

### `src/content/copy.ts`
- **New `masthead` group** (root-cause fix — the hardcoded masthead is how a killed line
  survived a closed copy session): `ariaLabel`, `est: "Est. MMXXIV"`,
  `credit: "A public service announcement · Funded by Concerned Women Against Axe Abuse"`,
  `series: "Series One"`, `issue: "No. 26"`. The credit is the §3.1 institutional
  signature's exact line (page-internal echo — legal per style-lock §8). **Typographic
  note:** the credit carries a no-break space (U+00A0) before the middot so a wrapped
  flank line never opens with a hanging "·". Words unchanged; the hero's own
  `hero.signature` literal is untouched (verified U+0020 there).
- **`footer.credit`** → plain `COPYRIGHT` (`© Stacey Breckel 2025`), unlinked. The
  "· A satirical spec campaign by Hope2 Studio →" tell is deleted.
- **`footer.disclaimer`** → deleted from the footer group (relocated, see `about`).
- **`footer.fundedByLead`** (`"Funded by"`) and **`footer.socialLabels`**
  (Behance/Instagram/Facebook) added — previously hardcoded in `Footer.astro`.
- **`home.revealBeat`** → `line` only. `tail` and `cta` deleted (killed lines,
  style-lock §7).
- **`about.credit`** → `"© Stacey Breckel 2025. A satirical spec campaign by Hope2 Studio."`
  (the reveal, the page's voice). **`about.disclaimer`** (new) → the spec-verbatim legal
  line: `"Parody. Not affiliated with any brand, product, publication, or public-health
  organization. Models generated with openart.ai; art direction, compositing, and
  typography by hand."`
- **Sweep additions** (all verbatim moves from component markup, zero new voice):
  `home.hero.ariaLabel`, `home.case.{demand[3], creed, cta}`,
  `home.campaign.{kicker, cta}`, `home.confrontation.eyebrow`,
  `home.pledgeBand.{kicker, signoff}`.

### Components
- **`homev2/Masthead.astro`** — all strings now from `copy.ts` (`masthead.*`, `nav.mark`).
  The killed "A Public Hygiene Initiative" replaced by `masthead.credit`. `Est. MMXXIV`,
  `Series One`, `No. 26` intact. Added `.mh__credit { max-width: 44ch; text-wrap: balance }`
  and `.mh__issue { white-space: nowrap }`.
- **`homev2/Reveal.astro`** — rewritten as the closing THESIS beat: renders
  `home.revealBeat.line` as an `<h2>` (section named via `aria-labelledby`, so no new
  aria string), **no `/about` link, no tail**. Register/composition unchanged in spirit:
  quietest thing on the page, chrome-mist on grout-black.
- **`Footer.astro`** — © line renders as plain text (no anchor); disclaimer paragraph and
  its CSS removed; funded-by lead + social labels consumed from `copy.ts`. The folio
  credit `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` (→ /about) is unchanged.
- **`homev2/Case.astro`, `Campaign.astro`, `Confrontation.astro`, `Oath.astro`,
  `Hero.astro`** — swept strings replaced with `copy.ts` references (see list above).
- **`pages/about.astro`** — renders `about.disclaimer` after `about.credit` in the
  Credit & legal block.
- **`pages/index.astro`** — stale beat-7 comment updated (no §3.7 "quiet reveal → /about").

### Docs (copy lane, per the order's "log them in style-lock.md")
- **`docs/copy/style-lock.md`** — §7 kill list gains the spec-campaign tell (campaign
  surfaces), the reveal-beat tail, and "See who's behind it →"; new **§10** logs the
  consolidation decision set.
- **`docs/copy/copy-deck-v2.md`** — v2.2 change log; §1 footer block updated; new §1c
  (masthead fiction) and §1d (home section chrome); §3.6 reveal beat → thesis-only;
  §9.5 credit/disclaimer split. copy.ts and the deck stay in sync.

## Definition of done — evidence

1. **One `/about` link renders on the home.** Playwright against the built home:
   3 anchors with `href="/about"` exist in the DOM — the footer folio credit
   (**visible**) plus 2× "Production Notes" (**both hidden**: the closed §9.1 contents
   `<dialog>` and its no-JS inline fallback, `display:none` under `.has-js`). Only the
   maker credit is ever rendered. See FLAG 1.
2. **No satire tell/hint on the home.** `grep -rniE` for every style-lock kill-list
   string over `src/` → zero hits (comments were also reworded so a naive grep stays
   clean). Rendered home body text contains no "satirical", no "See who", no
   "Hygiene Initiative" (checked via `document.body.innerText` and `dist/index.html`).
   "satirical spec campaign" survives in `src` only inside the `about` copy group —
   its sanctioned home.
3. **Masthead** reads `A PUBLIC SERVICE ANNOUNCEMENT · FUNDED BY CONCERNED WOMEN AGAINST
   AXE ABUSE` with `EST. MMXXIV` / `SERIES ONE` / `NO. 26` intact (screenshot
   `assets/footer-consolidation/home-1440-top2.jpeg`).
4. **Reveal + disclaimer live at `/about`.** Credit & legal block renders both sentences
   (screenshot `about-1440-credit.jpeg`; text captured verbatim in verification).
5. **Gates:** 20/20 (fingerprint above), copy-gates 6/6 (CG1/CG2/CG6 hold — hashtags,
   funded-by gag, ©), `npm run build` clean, 16 pages.
6. **Viewports:** verified at 390×844 and 1440×900 (screenshots under
   `docs/build/reports/assets/footer-consolidation/`). At 390 the flanks are hidden by
   design; the sr-only funded-by line still covers AT.

## Hardcoded strings found by the sweep — disposition

**Moved to `copy.ts`:** masthead est/credit/series/issue + nameplate (`nav.mark`);
hero landmark aria-label; Case demand ×3, creed, route label; Campaign kicker + route
label; Confrontation eyebrow; Oath kicker + sign-off; Footer funded-by lead + social
labels; masthead landmark aria-label.

**Left in markup, flagged (structural chrome / gate-mandated):**
- `Footer.astro` folio credit literal — **gate G11 greps Footer.astro for the verbatim
  caps string**; the gate's own comment says it does not route through the copy lane.
  Moving it to copy.ts turns G11 red. Left by design.
- `BaseLayout.astro:139` "Skip to content" — structural wayfinding chrome (style-lock §4),
  global to all pages.
- `Masthead.astro` sr-only "Funded by {FUNDED_BY}." — assembled from the copy.ts constant
  plus a connective; kept so AT still gets the gag at widths where the flank is hidden.
- Aria-hidden ornaments (not copy): route-label arrows `→`, the Campaign kicker's " · "
  separator, the Reveal `✦`, the hero `↓`, and Case's `73% / 0% / 9/10` figures (design
  lifts of numbers inside the verbatim findings, `aria-hidden`).

## Flags for Sol / the owner

1. **"Production Notes" → `/about` remains in the contents sheet.** specs.md §9.1 is
   explicit and law: "List route exits second: PSAs, Sniff Test, Pledge, Crisis, and
   Production Notes." The order's item 1 enumerated exactly two removals and did not name
   it; the copy deck §1b (ratified 2026-07-16, same day as the consolidation) also keeps
   it. It is neutral taxonomy, not a tell, and it never renders alongside the footer
   credit (dialog closed / no-JS fallback suppressed). If the owner wants the strict
   "one `/about` anchor in the DOM," §9.1 must be amended first — owner call, not mine.
2. **specs.md carries two lines this owner decision supersedes** (specs.md was
   consolidated 2026-07-15, before this order): §3.7 "The buried legal parody disclaimer
   stays in the footer regardless" and §3.7/§10's "Keep the existing quiet reveal beat" /
   "The footer/reveal link navigates to `/about`…". I did not edit specs.md (outside my
   `site/src` authority); it needs an owner amendment block mirroring the 2026-07-15
   precedent so the law file matches the shipped state.
3. **Out-of-scope observation:** `pages/psas/[slug].astro:68` puts
   "A satirical hygiene-PSA campaign poster." into JSON-LD (`about` field) on poster
   pages — machine-readable metadata, not rendered text, but it is a campaign surface
   saying "satirical". Same class of tell the owner just killed on the home. Not touched
   (outside this order); flagging for a ruling.
4. **`pages/about.astro`** has its own hardcoded eyebrows ("Why it exists", "Case study",
   "Credit & legal", Behance button label). /about is outside the home sweep's binding
   scope; noting for a future sweep if the owner wants the property site-wide.
5. **Recommended killed-lines gate** (spec "machine backstop") not added — the spec
   itself says "do not hot-edit `gates.mjs` while Fable is in it." Until the harness is
   free, kill-list enforcement stays a Sol grep (item 2 evidence above shows it clean).
