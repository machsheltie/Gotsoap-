# CWAAA — graphics to make for launch

**Prepared:** 2026-09-07 · **For:** Stacey · **Pairs with:** [PRD-TO-LAUNCH.md](PRD-TO-LAUNCH.md).

Start by approving the existing identity, then make the documentary home hero and the ribbon/program image family. Decide the launch story/chapter roster before producing its portraits, environments, and artifacts. The quantity of graphics must follow approved content, not a stock-image quota.

## What is established and what needs an interview

[Design](docs/design.md) establishes the roughly 50% documentary traces / 30% coherent physical artifacts / 20% live civic graphics hierarchy. [UI decisions](docs/ui-system.md) record the August font cast, while many sizes, color states, spacing, motion, and responsive rules remain open. The [world bible](docs/world-bible.md) governs artifact authorship and continuity.

Every image below needs a CW-D03/04/05 decision on its page slot, quantity, size, approved content, and reuse status. Dimensions marked **proposed** are production suggestions for that interview, not owner-approved design law. Do not begin a final layout just because a suggestion has a number.

**Existing identity sources to review:** `../site/src/assets/graphics/cwaaalogo.png`, `cwaaalogo-tight.png`, `cwaaaseal.png`, `cwaaaapproval.png`, and `mockup.png`; existing [Seal component](../site/src/components/cwaaa/Seal.astro) and [RibbonBadge component](../site/src/components/cwaaa/RibbonBadge.astro). Presence does not establish approval, source quality, or usage rights. Do not make Stacey recreate a usable seal that Claude can faithfully prepare from an approved source.

## Delivery conventions

- Proposed export handoff: `cwaaa/sources/graphics/<asset-id>/`. Preserve master PSDs and existing OneDrive assets in their established locations; record those source paths instead of relocating them.
- Deliver photos in sRGB, high-quality JPG; masks/cutouts as transparent PNG when required; clean approved marks as SVG. Claude creates responsive AVIF/WebP web derivatives and explicit dimensions in the eventual standalone app. Final runtime paths are locked in CW-D07 before integration.
- Keep editable artifact/type layers and original unretouched photographs. An image that includes a real fictional letter or packet must have complete approved copy, a plausible physical size and construction, one author, and any necessary date/version.
- Main headings, numerical Findings, navigation, captions, form labels, dates and identifiers on ordinary pages stay live HTML/CSS. Do not supply a full screenshot of a finished webpage as a graphic.
- Record license/source, required attribution, version, approval date, meaningful-image text alternative, and every output filename per ID. Avoid baked final-domain text until the domain is assigned.
- Use humane participant imagery. No mugshots, humiliation, punishment, before/after spectacle, smiling stock volunteer groups, fake government badges, ominous lighting or surveillance aesthetics.

## CW-G01 — coalition identity: review and prepare existing assets

**Priority:** launch-critical review; replacement only if approved sources fail. **Use:** navigation, identity seams, appropriate real artifacts, preview/icon derivation.

Review the existing logo, seal and approval mark with Stacey. Identify the approved primary mark, small-size variant, backgrounds, clear space, and permitted artifact uses. Distinguish coalition identity from a government badge. PT Serif remains the recorded identity-serif role; do not redesign it into another typeface merely to match body text.

**Deliverables:** proposed `cwaaa-mark.svg`, `cwaaa-seal.svg`, and transparent raster fallback as needed. Vector is preferred when an authentic approved source exists; do not auto-trace or rebuild lettering without review. **Raster dimensions, minimum size and clear space: interview required.**

**Claude:** prepare derivatives from the approved source, supply text equivalents, test small-size legibility and contrast. **Acceptance:** no fuzzy edges, wrong lettering, invented Office ownership, or redundant decorative seals.

## CW-G02 — documentary home hero: new scene

**Priority:** launch-critical. **Use:** home proposition interruption; optional approved crop reused in CW-G07.

Show a woman's hands tying a real red washcloth ribbon around the handle of a genuinely used black gym bag on a locker-room bench. Capture cloth weave, hem, imperfect ends, knot tension and the hand still completing the act. No posed face, branded bag, pristine stock setting, matching shirts or luxury-product sweep.

The photograph interrupts the monumental proposition rather than making a balanced image/text half split. An extracted cloth tail may extend past the photo only if the composition is approved; it never animates around the page. Keep `SOAP` immediately legible if the image overlaps it.

**Proposed export starting points:** `cwaaa-hero-wide.jpg` at 3200×1800 and `cwaaa-hero-portrait.jpg` at 1350×2400. **These are not locked CWAAA dimensions.** Claude must confirm the actual page geometry and safe zones with Stacey before final production. Make a genuine portrait composition if cropping the wide image breaks the hand/knot/bag relationship.

Keep the original frame and, only if needed, a clean hand/cloth mask as `cwaaa-hero-cloth-mask.png`. No baked headline. **Acceptance:** believable action and material, clear focal relationship on mobile, live proposition remains legible, no counterfeit stock-volunteer atmosphere.

## CW-G03 — Tie One On cloth and program imagery

**Priority:** launch-critical for the program route and home program moment. **Status:** new/reuse review; no complete approved production set established.

Build one coherent image family: a tied symbol in ordinary use, a cloth macro proving fiber/hem/knot, and any program instruction artifact required by the approved route. Context options already allowed by design include gym bag, doorknob, mirror, chapter table or vehicle handle. Choose the launch context and quantity in CW-D03/05; the options are not all mandatory shots.

**Proposed names:** `tie-one-on-context-<id>.jpg`, `tie-one-on-cloth-detail.jpg`, `tie-one-on-instructions-<version>.jpg`. **Aspect ratios/resolutions, shot count and printed sizes: interview required.** Lock the ratio from the approved page composition and its mobile treatment, then capture enough resolution for the largest crop. No redundant shoot if an approved CW-G02 source supplies a useful detail.

If a sewn label, hang tag, instruction slip, packaging band or distribution card appears, finish the entire object and its approved copy first. Keep editable print artwork and an uncropped source/photo alongside the web crop. Print dimensions, stock, folds, bleed and finishing depend on the actual artifact and require Stacey's decision; do not invent them as decorative metadata.

**Acceptance:** actual red cloth carries the program; instructions have an accessible text equivalent; no animated ribbon, office-supply confetti, incomplete pseudo-document, or global paper texture.

## CW-G04 — Recovery Stories image and object set

**Priority:** launch-critical where the approved story layouts use imagery. **Quantity:** exactly the approved launch roster from CW-D04, with reuse where the composition permits. Do not assume the historical nine-record deck is the launch roster.

For each approved story, choose a restrained portrait or environment and a personal object/human trace that belongs to that account. Photograph or compose humane change and ordinary life, never a suspect file. An object can carry a story without showing a face; determine casting and dignity boundaries in the interview.

**Proposed names:** `recovery-<id>-environment.jpg`, `recovery-<id>-portrait.jpg`, `recovery-<id>-object.jpg`, supplying only the slots actually approved for that story. **Sizes, ratios, image count and responsive crops: interview required.** Keep essential faces/hands/objects inside agreed safe zones; preserve full source images for recropping.

Testimony, `RC-NNN`, institutional labels and next actions remain HTML. If a handwritten or printed artifact is featured, approve its full text separately and provide the transcript. Use the local testimony type role for live long-form copy; do not bake a “case file” UI into the picture.

**Acceptance:** each image is grounded in the specific approved account, identities stay consistent, no real allegation is implied, and the mobile crop remains humane and comprehensible. No mugshot grid, police evidence, surveillance marks or generic smiling headshot carousel.

## CW-G05 — chapter life and 2024 founding artifacts

**Priority:** launch-critical for Chapters/About and approved home traces. **Quantity:** set by the launch chapter/origin roster, not one asset for every state.

Make a composed set from approved local environments, event/table details, ribbon packets, envelopes, correspondence, meeting notices, first program materials, and contemporary book-club/grievance notes. The About set establishes a 2024 origin; it must not manufacture aged sepia history or a 1961 CWAAA founding.

**Proposed names:** `chapter-<id>-<subject>.jpg` and `origin-2024-<artifact>.jpg`. **Web sizes, physical dimensions, dates/versioning, complete copy, count, and mobile crops: interview required.** Actual dates and codes must follow approved continuity, not random texture.

For each object, record who made it, why it exists, its full text, physical construction and where it appears. A complete packet photographed selectively is acceptable; disconnected scraps with invented seals are not. Keep plain transcripts for meaningful text and rights notes for every source.

**Acceptance:** local human continuity and contemporary origin are visible; no unapproved real contact details, fake usable chapter service, decorative pin/tape/stamp clutter, or explanation of CWAAA/Office operations.

## CW-G06 — nonprofit pledge share artifact and email identity

**Priority:** launch-critical for pledge sharing; email imagery only where the approved email design needs it.

Create a CWAAA-authored shareable pledge artifact, visually distinct from GS-G05. A real declaration/certificate relationship may justify paper here; it does not authorize a government decree, wax-seal theater or Office filing language. Review existing seal and certificate assets before commissioning a new mark.

**Proposed share master:** `pledge-badge-cwaaa.png`, 1080×1080. This adapts the existing shared-badge format; approve the nonprofit edition, exact text and background in CW-D05. Preserve live on-page `SWORN`, name, confirmation and share controls.

Reuse CW-G01 identity for email where possible. New email art is optional: `cwaaa-email-mark.png` or an approved current-issue image only if CW-D06 establishes a need. **Email sizes: interview/integration check required.** Receipt, current date, issue text, withdrawal and unsubscribe must remain real accessible text/links even with images blocked. Do not render an entire email as one image.

**Acceptance:** no Office claim, recurring-subscription promise or campaign-smolder skin; no sensitive information in a public graphic URL; pledge share and image-disabled email remain useful. The two-message program can be complete without bespoke email photography.

## CW-G07 — nonprofit default preview and favicon

**Priority:** launch-critical. Reuse approved CW-G01/02 where possible rather than inventing a second identity.

**Proposed outputs:** `og-cwaaa-default.jpg` at 1200×630 and `favicon-cwaaa-512.png` at 512×512. Confirm crop-safe areas, proposition/identity treatment, final title and domain with Stacey. These are delivery recommendations awaiting that review, not pre-existing CWAAA design locks.

Use coalition identity and civic hierarchy. Do not preview the Office's error screen or put an explanation of the fictional mystery on the card. Claude generates favicon variants, correct metadata, per-story preview mappings, and fallback behavior.

**Acceptance:** clear small-size mark, legible preview, correct author and destination; story previews use approved CW-G04 crops instead of requiring a second unrelated image set.

## CW-G08 — Findings source artifacts, only when required

**Priority:** conditional, based on approved Findings composition. **Required raster charts or number graphics: none.**

Claude renders the main number, conclusion, tables, rules, notes and source labels as semantic HTML/CSS. Stacey supplies an artifact only if an approved finding calls for a real report page, methodology sheet or other physical object with complete copy and a reason to exist.

**Proposed name:** `finding-<id>-source-<version>.jpg`; web/physical size, complete content and crop are decided in CW-D04/05. Provide full source and transcript; no baked substitute for accessible primary findings. **Acceptance:** at most the approved sparse neutral Office citation, no dashboards, criminal evidence or invented regulatory document ownership.

## You do not need to make

Web layouts, live Findings figures/charts/tables, proposition typography, body/ID/date graphics, navigation, form fields, validation, `SWORN` animation, buttons, focus rings, animated maps, background paper textures, or duplicate coalition logos for the campaign. Claude implements the approved live interface and prepares optimized derivatives.

## Later production and release checklist

| PRD ID | Later item | Prerequisite |
|---|---|---|
| CW-L01 | Expanded stories, chapters and recurring social templates | Approved added roster and copy; reuse the established image family |
| CW-L02 | Print-ready full chapter/distribution kits, event correspondence and business cards | Real artifact sizes/materials, complete copy, quantities and distribution decision |
| CW-L03 | Citation or user-generated output designs | Separate approved mechanic, authorship and input-handling contract |
| CW-L04 | Future email campaigns or donation/operations collateral | Separate program scope and consent; never silently extend pledge fulfillment |
| CW-L05 | Recut identity or certificates | Explicit owner identity decision |

- [ ] CW-G01 approved; every CW-G02–08 slot has reuse/new/conditional/not-needed status and exact quantity.
- [ ] Dimensions, portrait treatment, typography and baked copy approved before final artwork.
- [ ] Artifact text is complete and accessible transcripts are supplied where needed.
- [ ] Provenance, attribution, source location, version and actual app destination recorded per ID.
- [ ] Desktop/mobile integration reviewed; no unapproved placeholders remain on required launch surfaces.
- [ ] Later-work IDs retained with next actions, separate from the images actually required to launch.
