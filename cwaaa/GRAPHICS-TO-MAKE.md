# CWAAA — graphics to make for launch

**Prepared:** 2026-09-07 · **Layout reconciliation:** 2026-09-14 · **For:** Stacey · **Pairs with:** [PRD-TO-LAUNCH.md](PRD-TO-LAUNCH.md).

The approved homepage now fixes three production slots: the documentary hero, one full-bleed Tie One On scene, and one 4:3 Recovery Story object. Review the current standalone identity, then make those images and the default social preview. Broader story, chapter, and artifact sets remain tied to their route layouts and approved content rosters.

## Standing image law — no still life

**Owner direction, 2026-09-15. This governs every ID below and overrides any earlier spec that
conflicts with it.**

1. **No still life anywhere on the site.** Objects do not carry images alone. A person is in the
   frame. Macro material detail is permitted only as a supporting crop inside a scene that has a
   body in it, never as the image a section is built on.
2. **Participants are shown.** Faces, bodies, the actual men. Do not substitute an object, a
   texture, an empty room, a hand-only crop, a back-of-head, or a silhouette for the person a
   section is about. Do not blur, obscure, or crop out a face to soften it.
3. **There is no one to protect.** Every person in this fiction is synthetic. There is no real
   likeness, no consent question, no subject who can be hurt or embarrassed. Arguments from
   likeness, dignity, or offense do not apply here and must not be used to walk any of this back.
4. **This is satire and it is allowed to be uncomfortable.** The site's job is to be subversive.
   Softening an image to avoid offense is a defect, not caution — it is the specific move that makes
   the work fall flat.
5. What stays rejected is **generic**, not human: stock testimonial carousels, smiling-volunteer
   charity heroes, staged boardroom diversity, mugshot grids, surveillance framing. These are banned
   for being lazy and institutional, never for showing people.

An object shipped where a person belongs is a rejected asset. Return it.

## Production status after the approved homepage layout

| ID | Current status | Production decision |
|---|---|---|
| CW-G01 | Review current work | Use the standalone inline seal and simplified favicon as the working web identity. Review them at final size; do not commission a replacement by default. |
| CW-G02 | **Shipped and closed** | The coalition group portrait, owner-supplied and ratified 2026-09-15. Desktop and 4:5 phone masters both delivered and wired. Do not respec. |
| CW-G03 | Home slot ready; route extension pending | One Tie One On scene for Home with **a man in frame** wearing or tying the ribbon, delivered in the same desktop/mobile sizes. No object-alone doorknob still life. Additional program artifacts wait for the Tie One On route layout. |
| CW-G04 | Home shipped; 4 participant photographs outstanding | Brayden's participant photograph, 4:3, in the homepage recovery voice. Participants are shown — never an object in a person's slot. Remaining portraits wait for CW-D04. |
| CW-G05 | Not required on the current Home layout | Hold chapter and 2024-origin production until Chapters and About have approved compositions and rosters. |
| CW-G06 | Share master specified; route integration pending | Produce the non-personalized 1080×1080 pledge share master after its final words pass copy review. No bespoke email photography. |
| CW-G07 | Preview required; favicon exists | Produce one 1200×630 default preview. Review the existing SVG favicon and derive raster variants only when platform coverage requires them. |
| CW-G08 | Not required for the current build | Findings remain live HTML/CSS. Add a photographed source artifact only when a future Findings composition justifies one. |

## What is established and what needs an interview

[Design](design.md) establishes the roughly 50% documentary traces / 30% coherent physical artifacts / 20% live civic graphics hierarchy. [UI decisions](docs/ui-system.md) record the font cast and approved Home composition. Type scale, most color/state details, and the compositions for routes beyond Home remain open. The [world bible](docs/world-bible.md) governs artifact authorship and continuity.

The Home decisions recorded above are locked for production by the approved Comp D layout. Dimensions for routes that have not been composed remain pending; do not extrapolate the Home crop rules into those pages.

**Current identity sources to review:** the standalone [Seal component](src/components/Seal.astro) and [favicon](public/favicon.svg). The older `../site/src/assets/graphics/cwaaalogo.png`, `cwaaalogo-tight.png`, `cwaaaseal.png`, `cwaaaapproval.png`, `mockup.png`, [Seal component](../site/src/components/cwaaa/Seal.astro), and [RibbonBadge component](../site/src/components/cwaaa/RibbonBadge.astro) are comparison sources. Presence does not establish approval or usage rights. Do not make Stacey recreate a usable mark that Claude can faithfully prepare from an approved source.

## Delivery conventions

- Source handoff: `sources/graphics/<asset-id>/` inside this CWAAA workspace. Preserve master PSDs and existing OneDrive assets in their established locations; record those source paths instead of relocating them.
- Runtime derivatives belong under `public/images/<asset-id>/` in the standalone app. Deliver photographs in sRGB as high-quality JPG masters; use transparent PNG only for an approved mask or cutout and SVG for clean marks. Claude creates responsive AVIF/WebP derivatives with explicit dimensions.
- CW-G02 and the Home CW-G03 scene require separate desktop and mobile compositions. Before integration, Claude must extend `ImageSlot.astro` or replace it with `<picture>` so the 4:5 source is actually selected on narrow screens; one center-cropped `src` does not satisfy the brief.
- Keep editable artifact/type layers and original unretouched photographs. An image that includes a real fictional letter or packet must have complete approved copy, a plausible physical size and construction, one author, and any necessary date/version.
- Main headings, numerical Findings, navigation, captions, form labels, dates and identifiers on ordinary pages stay live HTML/CSS. Do not supply a full screenshot of a finished webpage as a graphic.
- Record license/source, required attribution, version, approval date, meaningful-image text alternative, and every output filename per ID. Avoid baked final-domain text until the domain is assigned.
- Show the specific participant as a person in his own setting. Reject mugshots, public-shaming or
  punishment compositions, before/after spectacle, smiling stock volunteer groups, fake government
  badges, ominous lighting, and surveillance aesthetics. This photographic rule does not reduce the
  before-state or consequence his Recovery Story must show in words.

## CW-G01 — coalition identity: review and prepare existing assets

**Priority:** launch-critical review; replacement only if the current sources fail. **Use:** navigation, identity seams, appropriate real artifacts, preview/icon derivation.

Use the standalone inline seal as the primary web mark and the simplified `public/favicon.svg` symbol at favicon sizes. The full seal may appear at 44px beside the written organization name because the name carries identification there; when the full seal appears alone, keep it at 72px or larger. Preserve clear space equal to one quarter of the seal diameter. Distinguish coalition identity from a government badge. PT Serif remains the identity-serif role; do not redesign it into another typeface merely to match body text.

**Deliverables:** retain the vector [Seal component](src/components/Seal.astro), retain or refine `public/favicon.svg`, and export a 1024×1024 transparent `cwaaa-seal.png` only for consumers that cannot use the component or SVG. The older combined-runtime PNGs are comparison sources, not mandatory launch deliverables. Do not auto-trace or rebuild lettering from a raster.

**Claude:** prepare derivatives from the approved source, supply text equivalents, test small-size legibility and contrast. **Acceptance:** no fuzzy edges, wrong lettering, invented Office ownership, or redundant decorative seals.

## CW-G02 — documentary home hero: SHIPPED AND CLOSED

**Priority:** none remaining; this asset is delivered. **Use:** home proposition interruption; approved crop reused in CW-G07.

**Delivered and ratified by the owner, 2026-09-15.** The hero is the coalition's own group portrait:
three members standing in a plain meeting room, facing the camera, one holding a bar of soap. Posed,
frontal, and completely unembarrassed — the picture an organization takes because it believes it is
an organization. Shipped as `src/assets/hero-coalition-wide.png` (3200×1800) and
`src/assets/hero-coalition-tall.png` (4:5 phone composition), served art-directed by `ImageSlot`.

**The previous spec — a woman's hands tying a washcloth to a black gym bag on a locker-room bench —
is struck.** The owner rejected it: a duffle bag with a wash rag tied on it is not a coalition, and
reaching for it instead of the members was the site refusing to show its own cast. Its "no posed
face" clause is void; see the standing image law above and `design.md` §7.

**This entry is closed. Do not respec it, do not propose an object or hands-only alternative, and do
not reintroduce a no-posed-faces rule.** If the hero is ever reshot, it is still a picture of people
looking into the camera.

The photograph is full bleed behind navigation and the live proposition crosses its bottom edge. The
members sit right of centre; the lower-left wall stays quiet for the proposition. Faces stay clear of
the navigation band and of the type. Only the proposition's final period may be obscured where image
and type overlap. Any future recomposition holds the same zones — with the people still in them.

**Masters (delivered):** `src/assets/hero-coalition-wide.png` at 3200×1800 and
`src/assets/hero-coalition-tall.png` as a genuine 4:5 phone composition — not a 9:16 export or an
automatic center crop. An uncropped high-resolution source is preserved for later derivatives.

Do not create a hand/cloth mask for the current layout; the approved composition does not use one. No baked headline. **Acceptance:** believable action and material, correct safe zones in both masters, complete navigation contrast, live proposition legibility, and no counterfeit stock-volunteer atmosphere.

## CW-G03 — Tie One On cloth and program imagery

**Priority:** launch-critical for the Home program moment. **Status:** Home scene locked; full program-route set pending.

For Home, show **a man in an ordinary lived-in interior with the red washcloth ribbon on him** — tied
around a wrist, a belt loop, a bag strap he is carrying, or being knotted on by someone else. He is
in the frame and legible; the cloth is the subject *on a body*, not alone. Show terry weave, stitched
hem, imperfect ends, fold and knot tension at that proximity. Per the standing image law above, an
object-alone doorknob still life is a rejected asset. The domestic interior is what keeps this from
repeating CW-G02's scene.

The image fills a 72vh desktop field and a 78vh mobile field behind an ivory panel. Keep the ribbon and knot in the upper-right half; keep the lower-left free of essential detail. The desktop production zone is approximately x 52–90% and y 12–60%. On mobile, keep the knot above the lower 42% reserved for the inset panel.

**Required Home masters:** `tie-one-on-doorknob-wide.jpg` at 3200×1800 and `tie-one-on-doorknob-mobile.jpg` at 2400×3000. Also retain one uncropped source. A separate `tie-one-on-cloth-detail.jpg` is unnecessary if these masters preserve enough macro detail.

No printed instruction artifact is required for the current Home layout. If the future Tie One On route adds a sewn label, hang tag, instruction slip, packaging band or distribution card, finish the entire object and its approved copy before photography. Keep editable print artwork and an uncropped source alongside the web crop.

**Acceptance:** a person is in frame; actual red cloth carries the program; instructions have an accessible text equivalent; no animated ribbon, office-supply confetti, incomplete pseudo-document, or global paper texture.

## CW-G04 — Recovery Stories image and object set

**Priority:** one Home image is launch-critical; the route set follows the approved story roster. **Quantity:** one locked Home object plus the later CW-D04 roster. Do not assume the historical nine-record deck is the launch roster.

**Participants are shown.** CWAAA recovery accounts are carried by pictures of the men, not by still
life standing in for them. Every person in this campaign is synthetic; there is no likeness to
protect and no one to embarrass. Substituting an object for a participant is a failure of nerve, and
it is the specific failure that flattens the satire: the picture is the evidence, and a bar of soap
on a shelf is not evidence of anything. Do not replace a participant photograph with an object,
a texture, a hand, a back-of-head crop, or an empty room. Do not obscure, blur, crop out, or
silhouette a face to soften it.

The Home image belongs to Brayden's recovery voice, and it is **his own photograph, retained as
received** — the picture a man like this actually has of himself. Approved and shipped: Brayden, 27,
in a boat on open water, sunglasses on, holding a bluegill up toward the camera with both hands,
grinning, flat overcast light. Nothing about the frame is styled by CWAAA. That is the joke and the
finding at once: the committee files it without comment.

The approved Home slot is 4:3 and remains 4:3 when the section stacks on mobile. Keep the face and
the fish inside the central 80% × 84% safe area. The image should look submitted, not art-directed —
phone-camera light, ordinary composition, no retouching, no editorial grade.

**Home master:** `cwaaa/src/assets/brayden.png`, 4:3. Preserve an uncropped source. For later
approved stories, use `recovery-<id>-portrait.jpg` as the default slot; `recovery-<id>-environment.jpg`
and `recovery-<id>-object.jpg` are supporting images only and never substitute for the portrait.
Supply only the slots approved by CW-D04; their sizes and crops remain route decisions.

Testimony, `RC-NNN`, institutional labels and next actions remain HTML. If a handwritten or printed artifact is featured, approve its full text separately and provide the transcript. Use the local testimony type role for live long-form copy; do not bake a “case file” UI into the picture.

**Outstanding participant photographs (4).** `/recovery-stories` is live with labeled slots for these;
each is the picture that man would actually have of himself, submitted and retained as received:

| Record | Man | The photograph he has |
|---|---|---|
| RC-031 | Chad, 29 | Gym mirror selfie, shirt lifted, phone covering half his face. He sent four; this was the one he wanted used. |
| RC-039 | Marcus, 34 | Cropped from a wedding photo — suit, half a stranger's shoulder still in frame. The most recent picture of himself he had. |
| RC-047 | Gary, 46 | Standing in his own driveway beside the truck, arms crossed, squinting into afternoon sun. Taken by his daughter, who submitted it. |
| RC-058 | "Kaelthas," 22 | In the gaming chair, headset around his neck, RGB behind him, shoulders-up exactly as he describes. From his stream. |

Each is 4:3, face and subject inside the central 80% × 84%. Phone-camera light, no retouching, no
editorial grade. Deliver as `cwaaa/src/assets/<slug>.png` (`chad`, `marcus`, `gary`, `kaelthas`) and
the route picks them up; until then the slot renders its brief.

**Acceptance:** a participant is visible in the frame; each image is grounded in its specific approved
account; identities stay consistent across appearances; the mobile crop keeps the face legible. No
mugshot grid, police evidence, surveillance marks, or stock-photography testimonial carousel — the
objection to those is that they are generic and institutional, not that they show people. An object
shipped in a participant's slot is a rejected asset.

## CW-G05 — chapter life and 2024 founding artifacts

**Priority:** held for Chapters and About. **Quantity:** set by the launch chapter/origin roster, not one asset for every state. The approved Home layout carries coalition scale in the utility bar and requires no CW-G05 image.

Make a composed set from approved local environments, event/table details, ribbon packets, envelopes, correspondence, meeting notices, first program materials, and contemporary book-club/grievance notes. The About set establishes a 2024 origin; it must not manufacture aged sepia history or a 1961 CWAAA founding.

**Proposed names:** `chapter-<id>-<subject>.jpg` and `origin-2024-<artifact>.jpg`. **Web sizes, physical dimensions, dates/versioning, complete copy, count, and mobile crops: interview required.** Actual dates and codes must follow approved continuity, not random texture.

For each object, record who made it, why it exists, its full text, physical construction and where it appears. A complete packet photographed selectively is acceptable; disconnected scraps with invented seals are not. Keep plain transcripts for meaningful text and rights notes for every source.

**Acceptance:** people are visible in the chapter set — the packets and correspondence are photographed with the members who made them, never as an object arrangement alone; local human continuity and contemporary origin read clearly; no unapproved real contact details, fake usable chapter service, decorative pin/tape/stamp clutter, or explanation of CWAAA/Office operations.

## CW-G06 — nonprofit pledge share artifact and email identity

**Priority:** launch-critical for pledge sharing; no bespoke email photography.

Create a CWAAA-authored shareable pledge artifact, visually distinct from GS-G05. Use an ivory field, ink-navy identity, the current seal, one controlled stamp-red `SWORN` mark, and a thin civic rule. The share graphic contains no signer name, email, date, personalized identifier, Office language, government seal, wax-seal theater, or campaign-smolder treatment.

**Required master:** `pledge-badge-cwaaa.png` at 1080×1080. The visual treatment above is locked. Final public wording must pass the copy lane before it is baked into the image; use `THE BAR IS SOAP.`, `FORM CW-1`, `DECLARATION SWORN`, and the organization name as the working copy. Preserve live on-page `SWORN`, name, confirmation and share controls.

Reuse CW-G01 identity in email. Do not commission `cwaaa-email-mark.png` or current-issue photography for launch. Receipt, current date, issue text, withdrawal and unsubscribe remain accessible text and links when images are blocked. Do not render an entire email as one image.

**Acceptance:** no Office claim, recurring-subscription promise or campaign-smolder skin; no sensitive information in a public graphic URL; pledge share and image-disabled email remain useful. The two-message program can be complete without bespoke email photography.

## CW-G07 — nonprofit default preview and favicon

**Priority:** launch-critical preview; favicon review only. Reuse CW-G01/02 rather than inventing a second identity.

**Required preview:** `og-cwaaa-default.jpg` at 1200×630. Use a crop of the CW-G02 hero with a solid ink-navy identity field, the current seal, the organization name, and `The bar is soap.` Keep all essential content within a 1080×566 centered safe area. Do not bake a domain into the image.

The existing `public/favicon.svg` is the approved small-size web symbol for this build. Claude derives PNG and platform variants from it only where metadata or platform coverage requires them; Stacey does not need to create `favicon-cwaaa-512.png` separately.

Use coalition identity and civic hierarchy. Do not preview the Office's error screen or put an explanation of the fictional mystery on the card. Claude generates favicon variants, correct metadata, per-story preview mappings, and fallback behavior.

**Acceptance:** clear small-size mark, legible preview, correct author and destination; story previews use approved CW-G04 crops instead of requiring a second unrelated image set.

## CW-G08 — Findings source artifacts, only when required

**Priority:** not required for the current Home build; conditional for the future Findings route. **Required raster charts or number graphics: none.**

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

- [ ] CW-G01 passes final-size review; every CW-G02–08 slot retains its ready/pending/not-needed status as routes are completed.
- [ ] Dimensions, portrait treatment, typography and baked copy approved before final artwork.
- [ ] Artifact text is complete and accessible transcripts are supplied where needed.
- [ ] Provenance, attribution, source location, version and actual app destination recorded per ID.
- [ ] Desktop/mobile integration reviewed; no unapproved placeholders remain on required launch surfaces.
- [ ] Later-work IDs retained with next actions, separate from the images actually required to launch.

## 2026-09-24 — Route photography for Tie One On, Chapters, About, Field Assessment

The four routes are built and live with placeholder slots. Each slot's full shot spec is in
`src/content/copy.ts` (the `shot`/`opener` fields) and shows on the page under `npm run review`.
Every one puts a person in frame; an object delivered in any of these slots is a rejected asset.
Drop files into `src/assets/` under these names and the slot is wired in one line.

| ID | Route | Subject | Frame | File |
|---|---|---|---|---|
| CW-G03.1 | /tie-one-on opener | A man in a lived-in interior wearing the ribbon; lower-left third quiet | 3200×1800 + 2400×3000 phone | `tie-one-on-opener-wide.png`, `tie-one-on-opener-tall.png` |
| CW-G03.2 | /tie-one-on | A man at the wheel, ribbon on the rearview mirror | 4:5 | `tie-one-on-mirror.png` |
| CW-G03.3 | /tie-one-on | A man shouldering his gym bag, ribbon on the strap | 4:5 | `tie-one-on-gym-bag.png` |
| CW-G03.4 | /tie-one-on | A man in the doorway of the room he won't leave, ribbon on the knob | 4:5 | `tie-one-on-doorknob.png` |
| CW-G05.1 | /chapters | Atlanta: overfull community-room meeting, borrowed chairs | 3:2 | `chapter-atlanta-room.png` |
| CW-G05.2 | /chapters | Greater Phoenix: members running the pledge table indoors | 4:5 | `chapter-phoenix-table.png` |
| CW-G05.3 | /chapters | Milwaukee: members assembling ribbon packets at a long table | 3:2 | `chapter-milwaukee-ribbons.png` |
| CW-G05.4 | /chapters | Tacoma: members answering chapter mail; nothing legible | 4:5 | `chapter-tacoma-mail.png` |
| CW-G05.5 | /about | The founding book club, 2024, grievance log on the table | 3:2 | `origin-2024-book-club.png` |
| CW-G05.6 | /about | Early 2024: members cutting the first ribbons | 4:5 | `origin-2024-first-ribbons.png` |
| CW-G09 | /field-assessment | A chapter member and a man across a table, mid-conversation | 3:2 | `field-assessment-table.png` |
