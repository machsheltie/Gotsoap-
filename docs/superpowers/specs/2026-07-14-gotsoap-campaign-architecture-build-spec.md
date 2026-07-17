# ⛔ SUPERSEDED — DO NOT BUILD OR AUDIT FROM THIS FILE

> **This file was consolidated into the root `/specs.md` on 2026-07-15 and is retired.**
> The root `specs.md` is now the single canonical build spec. It carries everything
> below **plus** the 2026-07-15 owner amendment this file predates: the maker credit is
> **footer-only** (§3.7), not masthead + footer. If this file and `/specs.md` ever
> disagree, `/specs.md` wins. Build and audit against `/specs.md` only.
>
> Kept for history; not law.

---

# Got Soap? Campaign Architecture — Build Specification

**Status:** SUPERSEDED 2026-07-15 — see `/specs.md`. (Historical: approved; Unholy locked.)
**Date:** 2026-07-14
**Scope:** Home, `/psas`, `/psas/[slug]`, mechanic ownership, navigation, motion, performance, accessibility, and the Hope2 Studio reveal
**Governing documents:** `AGENTS.md` creative rules · `docs/design-north-star.md` Round 3 · `docs/prd/PRD-gotsoap-web-v1.md` · `docs/design.md` · `docs/copy/copy-deck-v2.md`

This specification ratifies the 2026-07-09 movement-pitch skeleton and replaces its open execution questions. It also supersedes any visual-execution note that would flatten the campaign into a gallery, a repeated desktop split, a mobile image-above-copy stack, or a restrained editorial archive.

## 1. Register guardrail

“Louder” means committed high-fashion camp in bright studio light: Vogue/GQ fragrance-ad gloss, broad daylight, wet porcelain, polished chrome, warm marble, and elite art direction. It never means tactical, militarized, grimy, distressed, or bunker-dark. Smoke belongs only to the posters that earn it; even there, it reads as rich editorial atmosphere.

The campaign and CWAAA remain separate fictional authors:

- The campaign smolders, accuses, seduces, and recruits.
- The share layer speaks to women as witnesses and distributors.
- CWAAA files, certifies, and documents.
- One surface has one author. The authors meet only at designed seams.

## 2. Governing architecture

**Home recruits. Routes convert. `/psas` proves range. Poster pages immerse. `/about` reveals the maker.**

| Route          | Sole job                                                     | Canonical content                                                                              | Prohibited duplication                                                         |
| -------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `/`            | Recruit the visitor into the movement                        | One flagship poster, manifesto, mechanic invitations, one CWAAA seam                           | No five-poster sequence, quiz, or live pledge form                             |
| `/psas`        | Prove the five-poster range at a glance                      | One physical placement environment containing all five untouched posters                       | No grid, staggered gallery, cover plus contents template, or `SPOT NO.` labels |
| `/psas/[slug]` | Immerse the visitor in one poster’s world                    | One untouched poster, one bespoke environment, case note, sharing, download, series navigation | No shared split-screen composition and no canonical-poster crop                |
| `/sniff-test`  | Run Field Assessment CW-7                                    | Seven-question quiz and verdict redirect                                                       | No duplicate quiz on home                                                      |
| `/pledge`      | Capture the declaration                                      | Form CW-1, the man’s oath, submission, SWORN state, badge, and sharing                         | No duplicate form on home                                                      |
| `/crisis`      | Establish CWAAA as a credible fictional sponsor              | Findings, founding myth, scale, ribbon program, and procedural exits                           | No campaign-smolder typography                                                 |
| `/about`       | Prove the strategy and craft, then convert business interest | Process, authorship, type, compositing, disclosure, contact, and Behance                       | No early reveal on campaign surfaces                                           |

## 3. Home: movement pitch with named signatures

Home uses normal vertical scrolling. Each beat has a different job, material, scale, and composition. No shared card shell or equal-height section pattern may control the sequence.

### 3.1 Cold open — the steam threshold

- Use the owner-made, text-free widescreen and portrait restaging of Poster 1’s world.
- Keep the model and image visually straight; the live type carries the satire.
- Clear the steam with one directional sweep lasting 1.8–2.2 seconds.
- Play the sweep once per browser session. Store completion under `gotsoap:steam-cleared:v1` in `sessionStorage`.
- Render the clear state by default. A synchronous inline `<head>` script must run before body paint, check reduced-motion preference and `sessionStorage`, and add a `steam-first-visit` class to `<html>` only when motion is allowed and the session flag is absent. Hero CSS may show fog only under that class; do not wait for hydration.
- On return visits, storage errors, and no-JavaScript visits, retain the default clear state without a flash of steam.
- Scrolling completes the sweep and stores completion.
- Reduced motion receives a short crossfade and the clear state.
- If storage access fails, show the clear state. The effect must never block content.
- A token-only development stand-in is allowed. Production must not use a canonical poster, a blurred canonical poster, or any baked-type image behind live hero type.

### 3.2 The Case — **The Porcelain Evidence Wall**

The Case stages the crisis as billboard-scale evidence applied directly to a wet, high-key ceramic wall.

- Three findings occupy unequal architectural zones rather than rows or cards.
- Chrome figures sit on tile as if fabricated and installed, with grout and specular highlights establishing scale.
- Render every figure and complete finding as live HTML text. Apply chrome, scale, and highlight treatments with CSS; do not bake findings into an image. When the adjacent finding repeats a decorative figure, mark only that decorative duplicate `aria-hidden="true"` so assistive technology reads the number once.
- The manifesto runs across tile joints in a separate live-type zone; it never sits in a centered text column.
- A narrow highlight travels across the chrome figures through `transform` and opacity. It does not replay on every scroll reversal.
- Mobile composes the three findings as a tall wall: one figure clips against the left viewport edge, one spans the full width, and one locks to the right grout line. The copy remains adjacent to each figure, never in identical blocks.
- “Read the full findings” routes to `/crisis`.

### 3.3 The Campaign — one flagship intervention

- Show one untouched canonical poster as the movement’s flagship propaganda.
- Use `object-fit: contain` or intrinsic dimensions. Never crop, mask, or overlay the poster.
- Extend its register into the environment with CSS material and a lightweight derived atmospheric wash below the fold.
- Keep all live type outside the poster’s bounds.
- Route to `/psas` with one campaign-native action.
- **Unholy is the locked flagship.** Its maximum stopping power, quotable sermon cadence, and fragrance-ad drama best perform the home’s single propaganda role. Preserve its complete canonical poster and smoke-register environment; the choice does not alter route architecture.

### 3.4 The Confrontation — Sniff Test invitation

- Present one provocative question and a route to `/sniff-test`; do not run quiz state on home.
- Use a glossy mirror plane that reflects light, not a second steam-clearing gate.
- Load no quiz script or answer data on home.

### 3.5 The Oath — **The Gold Foil Summons**

The home invitation belongs to the campaign, not CWAAA. It recruits the witness and sends the man to Form CW-1.

- Stage the invitation as an oversized gold-foil fragrance insert crossing bright porcelain.
- Use embossed rules, a folded edge, and one perforated action line. Do not imitate a form or manila document.
- The action routes to `/pledge`; the home contains no fields.
- The copy lane must frame the invitation from her witness/recruiter perspective while preserving Form CW-1 as his first-person oath.
- Mobile turns the foil insert into a diagonal band that enters from the right, then settles into a full-width action plate. The transition uses `transform` only.

### 3.6 The Movement Is Real — **The Seal Takes the Page**

This is the home’s only CWAAA-authored surface.

- A warm cream/manila decree advances over the glossy campaign world as one physical sheet.
- The sheet carries a guilloché perimeter, oversized seal watermark, one recovery quotation, one stamp, and a link to `/crisis`.
- Paper texture stays refined: tooth, letterpress, and restrained foxing. No folders, redactions, hazard bars, or tactical labels.
- Mobile reveals the sheet from beneath the lower edge of the viewport. The seal watermark arrives first; the stamped recovery quotation follows within the same document.
- The next beat returns to the campaign register. No second CWAAA document follows.

### 3.7 Quiet reveal and production folio

- Keep `/about` subordinate but findable.
- Add this exact in-fiction credit to the masthead folio row and footer: **PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL**.
- Set the credit in small caps with middots and link it to `/about`.
- Keep the existing quiet reveal beat and proof-lift transition.
- The production credit identifies the maker during a 45-second skim; `/about` remains the full fourth-wall break.

## 4. `/psas`: the placement hub

`/psas` becomes one elite locker-room installation, not an archive layout. Bright wet ceramic, polished chrome, controlled steam, and studio lighting create the physical world named in `promo.txt`.

### 4.1 Art direction

- Stage all five untouched posters as installed campaign objects on one premium locker-room wall.
- Preserve each poster’s complete 4:5 rectangle and baked typography.
- Vary physical placement through believable installation: mounted to tile, secured behind glass, or fixed to a chrome rail. Do not distress, tear, or age the artwork.
- Keep all five recognizable in the first visual field at 1440 × 900 and 390 × 844.
- Use a separate wide and portrait Photoshop composition. The portrait is an independent arrangement, not a crop of the wide master.

### 4.2 Delivery model

Use one responsive `<picture>` as the environment:

- Export one shared art-direction query from `site/src/content/placement-hub.ts`: `PLACEMENT_HUB_WIDE_MEDIA = '(min-width: 768px)'`. Use that exact string for the wide `<source media>` attribute and the client `matchMedia()` call that selects hotspot coordinates. Do not duplicate the breakpoint in component CSS or client code.
- Wide source master: 3200 × 1800.
- Portrait source master: 1350 × 2400.
- Generate responsive AVIF, WebP, and JPG derivatives during the Astro build.
- Mobile AVIF at 1080–1350 pixels wide: maximum 450 KB.
- Desktop AVIF at 1920 pixels wide: maximum 750 KB.
- Do not load the five individual poster images on `/psas`; the composite proves range with one image request.

### 4.3 Interaction and accessibility

- Place five real anchor elements over poster locations. Store percentage coordinates by art-directed source in `site/src/content/placement-hub.ts`.
- Give every hotspot the poster’s full title and destination.
- At 390 × 844, the baked poster typography may read as visual texture rather than legible body copy. The hub’s job is recognition and range: all five poster worlds must remain individually identifiable, and each poster must have its own independently tappable hotspot of at least 44 × 44 CSS pixels. The installation plaque and detail routes carry readable titles and poster copy.
- Display a visible, keyboard-accessible five-title route list below the image as a chrome installation plaque. It is a fallback and navigation aid, not a table of contents hero.
- Hotspots receive a 3-pixel campaign focus outline with sufficient contrast.
- Zoomed, no-CSS, and screen-reader users can reach every poster through the route list.
- Use normal vertical scroll. Do not use horizontal drag, scroll snapping, or viewport lock.

## 5. `/psas/[slug]`: poster geometry

The environment fills the viewport; the canonical poster does not.

### 5.1 Invariants

- Render the canonical poster at its intrinsic 4:5 ratio.
- Use `object-fit: contain`. The canonical poster component must reject `cover` styling.
- Desktop poster height: no more than `calc(100svh - masthead - controls - stage-gutters)` and generally 82–88svh.
- Mobile poster width: 82–92vw, chosen per composition. Height remains automatic.
- Use `min-block-size` rather than fixed heights whenever text can grow.
- Use `svh` throughout campaign stages. Remove `100vh` from `site/src`.
- Live type, controls, and environmental effects may surround the poster but may not cross its box.
- Decorative background derivatives may crop because they are atmosphere, not canonical art.

### 5.2 Component boundary

Keep `[slug].astro` as the metadata and content orchestrator. Dispatch its visual stage to five explicit components:

- `ConfidentEnvironment.astro`
- `SmolderingEnvironment.astro`
- `UnholyEnvironment.astro`
- `RedemptionEnvironment.astro`
- `ThirstEnvironment.astro`

Share only asset, lightbox, share, download, and series-navigation primitives. Each environment owns its DOM and CSS. One configurable split-screen component is prohibited.

## 6. Five mobile material signatures

Each detail route must pass a 390 × 844 review before desktop polish begins. Each signature combines a distinct entry, copy material, and type performance. Environmental motion never alters the canonical poster.

| Poster                         | Mobile entry                                                                                                                        | Copy material                                                                              | Type performance                                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A Clean Man Is A Confident Man | **Chrome Threshold Lift:** the contained poster rises 4svh from behind a chrome shower sill while the wet-tile environment sharpens | A glazed porcelain plaque offset to the lower right, with a real grout edge and black ink  | A short campaign hook locks to the upper-left tile field in oversized black Oswald; a thin steam-glow shadow separates it from the ceramic        |
| Soap-Smoldering                | **Mirror Wings:** two fogged mirror planes retract behind the poster; the poster settles from 0.98 scale                            | A ribbed-glass caption strip with an opaque porcelain backing for AA contrast              | A narrow stacked hook reflects once in a chrome baseline beneath the poster; no giant numeral and no duplicate poster title                       |
| Unholy                         | **Cathedral Light Rise:** a lather-white light shaft expands behind the contained poster as it lifts 3svh                           | A smoked-steel sermon slab with one polished chrome rule, offset left rather than centered | A copy-lane pull quote runs as staggered chrome lines in the environmental gutter; one short line may use vertical writing outside the poster box |
| The Redemption Ad              | **Confessional Opening:** two luminous smoke panels part behind the poster, revealing the full rectangle at once                    | A folded ivory revival program with chrome edging, placed off-axis below the poster        | A short redemption line ascends in stepped lines along the opposite edge; the styling evokes a revival placard without a CWAAA stamp              |
| Public Thirst Announcement     | **Marble Folio Turn:** a warm marble edge sweeps aside to expose the full poster, then becomes the page gutter                      | A narrow gold-and-marble editorial rail with folio rule and caption                        | One gold pull quote uses an oversized initial and a narrow continuation column; the type frames the poster without entering it                    |

For reduced motion, every entry resolves immediately to its final composition. For normal motion, use only `clip-path`, `transform`, and opacity. Normal scrolling completes the transition; no animation reverses when the visitor scrolls back.

## 7. Conversion and copy ownership

### 7.1 Form CW-1 signer

- The man is the declarant. He swears to lather, retire body spray as a personality, respect the loofah, and stop mistaking deodorant for divine intervention.
- The woman is the witness, recruiter, and likely sharer. Campaign invitations and share mechanics may address her.
- CWAAA records his declaration.
- Keep one live pledge form at `/pledge` and one submission source of truth.

### 7.2 Copy-lane corrections

The copy lane must reconcile these strings before launch; design and implementation must not rewrite them ad hoc:

- `homev2/Hero.astro` cold-open `PROVOCATION`: replace the flagged institutional stand-in through the copy lane.
- `homev2/Hero.astro` institutional signature: approve or replace the flagged “A public hygiene initiative” line through the copy lane.
- `homev2/Confrontation.astro` `CONFRONT`: replace the flagged second-person stand-in through the copy lane.
- `meta.pledge.description`: remove the implication that the declarant joins “two million women.”
- Home Oath invitation: frame the action as sending or bringing him to his declaration, not asking her to swear his hygiene oath.
- `crisis.ribbon.body` and all “put your intent in writing” variants: confirm that “your” refers to the man who signs.
- Preserve the first-person oath in `pledge.oath`; it already has the correct signer.
- Preserve the dual-address rule in every share label and verdict-to-pledge handoff.

The production folio credit is approved verbatim and does not require copy-lane revision.

## 8. Sniff Test interaction

- Keep all seven questions in one route-level island.
- Show one question at a time inside a stable `min-block-size: 100svh` assessment shell.
- A tap or keyboard activation records the answer and advances without page scroll.
- Animate question changes with opacity and a short horizontal transform; keep the shell height stable.
- Move programmatic focus to the next question heading and announce progress through `aria-live`.
- Provide a visible Back action that restores the previous selection without changing the score twice.
- Keep scores internal. Redirect to one of four static verdict routes; show no numeric score.
- Use CSS transforms or a lightweight SVG stroke for any progress-droplet treatment. Do not use canvas.

## 9. Navigation contract

### 9.1 Home contents overlay

- Use a styled native `<dialog>` for the home contents sheet.
- List home anchors first: Case, Campaign, Confrontation, Oath, and Movement.
- List route exits second: PSAs, Sniff Test, Pledge, Crisis, and Production Notes.
- On open, move focus into the dialog and lock background scroll.
- Trap focus within the dialog, close on Escape, and return focus to the trigger.
- With JavaScript disabled, expose an inline anchor list instead of hiding navigation.

### 9.2 Poster-series navigation

- Use previous and next poster titles, “View the installation,” and “Return to the movement.”
- Remove `SPOT NO.`, numbered nav labels, and “All Spots.”
- Preserve browser Back behavior. Do not replace route navigation with an app-like state engine.

## 10. `/about`: proof-lift reveal

- The footer/reveal link navigates to `/about` through a print-proof lift when View Transitions are available.
- The departing campaign image and arriving case-study image share one transition name.
- The new page reveals crop marks, registration marks, process layers, and type annotations beneath the lifted campaign surface.
- Browsers without View Transitions use a normal navigation with the same opening composition.
- Reduced motion uses a hard cut.
- `/about` remains the only complete fourth-wall break and ends with contact and Behance.

## 11. Performance contract

### Home

- Load only the text-free hero eagerly.
- Lazy-load the flagship poster and every below-fold atmospheric derivative.
- Do not request all five canonical posters.
- Keep first-party home JavaScript at or below 25 KB gzip, excluding GoatCounter.
- Keep the mobile hero AVIF at or below 400 KB and the desktop hero AVIF at or below 700 KB.

### Placement hub

- Load one art-directed composite through `<picture>`.
- Do not load individual poster images until navigation reaches a detail route.
- Reserve the composite aspect ratio to prevent layout shift.

### Poster detail

- Load only the active poster eagerly.
- Lazy-load share-card or download-only assets.
- Prefetch no more than the next HTML route; do not prefetch the next full poster image on constrained connections.

### Motion

- Animate compositor-friendly properties.
- Apply `will-change` only during an active transition.
- Stop ambient motion when the document is hidden.
- Honor reduced motion across hero, hub, detail pages, quiz, pledge stamp, and proof lift.

## 12. Accessibility and responsive verification

- Meet WCAG 2.1 AA at 200% zoom and with text scaling.
- Keep poster alt text descriptive and campaign-aware.
- Keep all live text outside canonical poster bounds.
- Ensure every decorative composite uses empty alt text; the hub’s accessible links name the five posters.
- Test keyboard order, focus visibility, Escape behavior, focus return, quiz progress announcements, form errors, lightbox behavior, and series navigation.
- Verify at 390 × 844, 430 × 932, 768 × 1024, 1440 × 900, and 1920 × 1080.
- Use touch targets at least 44 × 44 CSS pixels.
- Maintain readable content and navigation with CSS, JavaScript, motion, or images disabled individually.

## 13. Implementation sequence

1. Replace the conflicting execution notes in `docs/design.md` and retire the superseded open questions in the 2026-07-09 proposal.
2. Promote the movement-pitch architecture from `/movement-preview` to `/` after the text-free hero assets are ready. Delete the preview page, add a true Netlify 301 from `/movement-preview` to `/`, and verify that the stale route is absent from the generated sitemap.
3. Build the responsive placement hub with source-specific hotspots and a visible route plaque.
4. Replace the shared poster split with five explicit environment components; complete mobile signatures first.
5. Reconcile pledge wrapper copy through the copy lane and add the production folio credit.
6. Add once-per-session steam state, dialog focus behavior, quiz tap-to-advance, and proof-lift fallback.
7. Run visual, accessibility, payload, reduced-motion, and route-ownership verification.

## 14. Acceptance gates

- Home displays exactly one canonical poster—Unholy—and no live quiz or pledge form.
- `/psas` shows all five posters in one physical placement environment without loading five separate poster files.
- At 390 × 844, all five hub posters are individually identifiable and independently tappable through targets at least 44 × 44 CSS pixels; baked poster typography need not be legible in the composite because the installation plaque and detail routes carry readable text.
- The `<picture>` art-direction source and hotspot coordinate selector consume the same exported `PLACEMENT_HUB_WIDE_MEDIA` query.
- Every poster remains complete at every breakpoint; automated and visual checks find no canonical `object-fit: cover`.
- The five 390 × 844 detail renders remain distinguishable when poster images are temporarily replaced by neutral rectangles.
- Each detail route uses its named entry, copy material, and type performance.
- Form CW-1 has one signer: the man. Recruitment and sharing preserve the woman’s witness role.
- The home contains one CWAAA document seam.
- `SPOT NO.` and decorative sequence numerals are absent from campaign navigation and poster taxonomy.
- The text-free hero replaces every canonical-poster hero wash before production.
- Steam runs once per session, skips safely, and never delays access. A synchronous pre-paint `<head>` script controls the first-visit class; returning visits show no fog flash.
- The Porcelain Evidence Wall renders its figures and findings as live HTML text, remains intelligible with images disabled, and avoids duplicate screen-reader announcements.
- The three flagged home copy strings—the hero provocation, hero institutional signature, and Confrontation line—are resolved through the copy lane before launch.
- Home and `/psas` meet Lighthouse 90 or better on mobile under the PRD test profile.
- The contents dialog passes keyboard, focus-trap, Escape, focus-return, zoom, and no-JavaScript tests.
- `site/src` contains no `100vh` declarations.
- `/movement-preview` returns a true 301 to `/` and is absent from the sitemap.
- The production folio credit appears above the fold and in the footer without replacing the `/about` reveal.

## Asset dependencies for Stacey

1. Deliver the text-free Poster 1 world as `hero-wide` at 3200 × 1800 and `hero-portrait` at 1350 × 2400, with no baked type; production release is blocked until both exist.
2. Create the elite locker-room placement hub as independent 3200 × 1800 wide and 1350 × 2400 portrait Photoshop compositions containing all five untouched posters; production release is blocked until both exist.
3. Complete the existing owner-art queue from the PRD: final verdict cards, pledge badge, Poster 5 minimalist crop, and final favicon/mark assets where the current files remain stand-ins.

## Owner decisions resolved

1. **Home flagship: Unholy.** The owner selected it for maximum stopping power, sermon-scale copy energy, and the campaign’s sharpest provocation. This decision is closed.

## Approved-by-default implementation scope

1. Adopt Unholy as the flagship together with the route ownership, placement-hub model, shared art-direction breakpoint, five mobile signatures, live-text evidence wall, pre-paint session steam mechanism, exhaustive copy-lane gate, preview-route retirement, home signature moments, poster geometry, signer model, production credit, contextual navigation, performance budgets, accessibility contract, implementation sequence, and acceptance gates in this specification without another architecture approval round.
