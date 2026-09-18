# Got Soap? — graphics to make for launch

**Prepared:** 2026-09-07 · **For:** Stacey · **Pairs with:** [PRD-TO-LAUNCH.md](PRD-TO-LAUNCH.md).

Start with the hero pair, installation pair, and Unholy atmosphere. Review the existing Shop and identity images before remaking anything. Then finish the verdict/share set and the five Shop performances. Every item below is a production task or explicit review task; file presence alone is not final approval.

## Production rules and delivery

The [design](design.md), [current runtime specification](../specs.md), [consolidated asset inventory](docs/ASSETS-NEEDED.md), and [hero brief](docs/hero-image-brief.md) establish the existing requirements. Current owner decisions and target authorship outrank stale instructions in older briefs. GS-D01–06 in the PRD identify questions Claude must resolve with you before dependent artwork.

- **Master handoff:** proposed organizational convention `gotsoap/sources/graphics/<asset-id>/`; create it when delivering new exports, not by moving old PSDs or OneDrive sources. Keep editable masters in your established design workspace and record their locations.
- **Naming:** use the basenames specified below; add `-wide`, `-portrait`, `-detail`, or `-social` where required. Maintain an asset record with ID, source, owner, version, approval date, license/attribution, and destination.
- **Photos:** export sRGB JPG at generous quality from full-resolution originals. **Transparency:** PNG, or clean SVG for vector marks. Layered masters retain subject/background/material/text separately. These are source exports; Claude creates responsive AVIF/WebP derivatives for served photography, explicit dimensions, and focal metadata.
- **Social files:** retain compatible JPG/PNG exports for downloads and previews. Canonical poster downloads may retain the approved original format; this does not permit loading originals as ordinary page imagery.
- **Text:** use live HTML for webpage headlines, captions, prices, form labels, and metadata. Bake text only into approved physical objects, canonical posters, or approved share graphics. Lock copy and the final URL before baking either.
- **Sizing:** dimensions marked **locked** come from existing authority. **Proposed** values are working recommendations for the owner interview, not new canon. **Interview required** means do not start a final canvas yet.
- Preserve Freepik and other license/attribution obligations; uncertain distribution rights block delivery. Never read, parse, move, or stage brush packs. Claude does not need your PSDs in Git.

## GS-G00 — canonical poster set: reuse intact

**Status:** existing, immutable. **Owner work:** none unless a better approved source export already exists. **Use:** PSA index/detail/downloads and approved campaign seams.

Five masters are already represented in `../site/src/assets/posters/` and `../site/public/downloads/`. Slugs: `confident-man`, `unholy`, `soap-smoldering`, `redemption`, `thirst-announcement`. Preserve full poster geometry and baked typography. Do not regenerate the art, re-typeset it, or crop a poster into a background. Claude handles optimization and intact presentation. Review source quality and attribution before declaring this item complete.

## GS-G01 — text-free Clean Man hero: two new compositions

**Priority:** launch blocker. **Replaces:** `../site/src/assets/placeholder/hero-wide.jpg` and `hero-portrait.jpg`. **Use:** home opening.

| Export | Canvas | Composition / safe area |
|---|---|---|
| `hero-wide.jpg` | **Locked: 3200×1800** | Porcelain/steam world; model right of center, calm bright left type zone. Critical face/torso/type space survives the centered 3200×1370 safe band described in the hero brief |
| `hero-portrait.jpg` | **Locked: 1350×2400** | Independent composition; upper roughly 35% stays calm for live type, subject below. Do not crop or squeeze the desktop composition |

The image plays fragrance-ad seriousness straight. Prefer continuity with Poster 1's model. Keep eyes visible, grout and contrast edges away from text, and steam atmospheric rather than a white blanket. No baked words, marks, hashtags, or button. Separate subject, tile, steam, and grading in the master. Claude creates the clearing overlay and checks actual responsive crops; you do not paint an animated fog layer.

**Approval:** legible live type across served crops, recognizable subject, natural material depth, no poster reuse, no compression banding, and approved portrait recomposition.

## GS-G02 — five-poster placement installation: two new compositions

**Priority:** launch blocker under the current installation contract. **Replaces:** both `placement-hub-*.jpg` placeholders. **Use:** `/psas`.

- `placement-hub-wide.jpg`: **locked 3200×1800**.
- `placement-hub-portrait.jpg`: **locked 1350×2400**, independently arranged.

Build one elite locker-room placement environment containing all five untouched posters as physical installations. Preserve every poster rectangle and its identity. Keep frame/lighting treatment credible and the environment coherent. Do not substitute a regular poster grid or obscure baked copy with new design. Confirm GS-D02 before changing the installation concept.

Deliver the flattened composites plus each poster's bounding rectangle for each master (pixels or percentages). Keep poster placements as separate master layers. Claude updates `../site/src/content/placement-hub.ts` and its shared media-query mapping from your delivered coordinates.

**Approval:** all five posters independently recognizable at 390×844; labels and tappable regions make selection unambiguous; hotspots align in both arrangements; full-size originals remain available on detail routes. Tiny baked type need not become body-size text in the composite.

## GS-G03 — Unholy flagship atmosphere: new background

**Priority:** launch blocker in the existing asset specification. **Current:** CSS interim, no final atmosphere file identified. **Use:** home Campaign section.

`campaign-unholy.jpg`: existing brief suggests **approximately 2560×1600, flexible**. Confirm final aspect/crop after GS-D02; deliver a portrait alternative if the approved composition cannot crop safely.

Make a smoke-register environment with dark, controlled values behind the gold display and body copy. Preserve depth and narrow chrome light without a busy subject behind text. No blurred Unholy poster, baked typography, or flat generic charcoal wash. Keep smoke/highlights separate in the editable source.

Claude integrates a new atmosphere source under the app's asset pipeline and checks contrast on the actual rendered text areas. **Approval:** AA reading contrast, authored smoke depth, no canonical-poster wash, usable mobile crop.

## GS-G04 — verdict share cards: four designs, eight exports

**Priority:** launch-critical share loop. **Current:** four OG PNGs exist under `../site/public/og/`; their final-art approval is unverified. Review them before rebuilding.

| Verdict slug | Material direction | Deliverables |
|---|---|---|
| `soap-smoldering` | Bright porcelain / steam | OG + social |
| `suds-curious` | Warm marble / amber | OG + social |
| `axe-dependent` | Smoke / chrome | OG + social |
| `thirst-hazard` | Heavier smoke, campaign seriousness | OG + social |

**Locked export sizes:** 1200×630 OG and 1080×1350 social for each verdict. Proposed handoff basenames: `verdict-<slug>-og.jpg` and `verdict-<slug>-social.jpg`. Claude updates existing mappings rather than leaving old PNG references pointing at obsolete art.

Verdict name dominates; use one approved roast line and campaign marks. Resolve GS-D04 before baking copy. Older instructions require a CWAAA stamp and `gotsoap.netlify.app`; neither should be copied automatically into the final artwork. Confirm whether a sponsor credit is an approved seam and lock the displayed domain. Campaign authorship must stay clear. Preserve editable type layers for future domain/copy changes.

**Approval:** name readable at 200px wide; each route shares its matching card; no numeric score, stale assessor ownership, unapproved claim, or cut-off text; native share and downloadable social output both work.

## GS-G05 — campaign pledge share badge

**Priority:** launch-critical. **Deliverable:** `pledge-badge-gotsoap.png`, **locked inherited size 1080×1080**. Review whether an existing render can be reused; do not presume a finished downloadable master exists.

Create the campaign's shareable commitment graphic in its approved material/type register. The webpage form and success copy remain live. Confirm exact badge words, mark, background/transparency, and the role of any CWAAA credit in GS-D03/04. The older manila nonprofit badge brief does not settle the campaign edition. Do not introduce the Office or recurring email promises.

Keep text/mark/background separate. Claude wires the downloadable badge, correct URL, image alternative, and share/copy actions. **Approval:** readable on mobile, recognizably campaign-authored, correct contract semantics, and visually distinct from CW-G06.

## GS-G06 — campaign identity and default preview

**Priority:** launch-critical; reuse/rework after review. `../site/public/favicon.svg` exists. A completed default OG source has not been established by this inventory.

- `og-default.jpg`: **locked inherited size 1200×630**; campaign image/type direction, approved title and final domain; no early creator explanation. Keep essential content away from edge crops.
- `mark-gotsoap.svg`: vector if available; transparent PNG fallback. Preserve approved letterforms and spacing, never approximate with a convenient font.
- `favicon-512.png`: **locked inherited master 512×512**. Claude generates necessary icon sizes and tests actual small-size recognition; you need not hand-build every derivative.

The coalition has its own default preview and identity. A single combined-site OG is insufficient for the split. **Approval:** legible small icon, no accidental background box, correct author/URL in previews, and approved source attribution.

## GS-G07 — five Shop editorial performances

**Priority:** launch-critical review, then rework/new art as needed. **Existing source:** five PNG masters plus cleaned versions under `../site/src/assets/shop/`; [runtime bindings](../site/src/content/shop-assets.ts) identify which images render. Existing product photography is not yet proof that it meets the target lookbook.

| Product / runtime slug | Required scene | New work only if existing art cannot provide it |
|---|---|---|
| Embossed Bar / `soap` | Cream soap, wet stone, lather, embossed mark — **in a body's hands, in use**, not an object alone | Image-owned scene + severe material detail |
| Wordmark Tee / `got-soap-tee` | Male torso, dressing-room or locker-room editorial | Scene with legible shirt mark and convincing fabric |
| Statement Tee / `clean-sexy-tee` | Chrome or amber; statement reads before price | Editorial scene and print/material detail |
| Dad Hat / `hat` | Controlled candid or casting moment; attitude leads | Authored scene and fabric/embroidery detail |
| Effort Bottle / `effort-bottle` | Gym-to-shower transition; earned sweat, clean resolution | Contextual scene and material detail |

**No still life.** Every Shop scene has a body in it — hands, torso, skin, wear. Product-alone
object photography is a rejected performance; the detail crop is the only place material may carry a
frame without a person, and it is a supporting image, never a hero. People in these images are
synthetic; there is no likeness to protect.

**Canvas sizes, shot count, and portrait needs: interview required in GS-D02/03.** The requirement is five distinct performances, not automatically fifteen new photographs. For each approved product, lock a wide hero, a portrait treatment (recompose if needed), and one severe detail; a usable existing source may supply the detail crop.

Proposed basenames: `shop-<slug>-wide.jpg`, `shop-<slug>-portrait.jpg`, `shop-<slug>-detail.jpg`. Record exact resolutions and text-safe zones before production. Keep subjects/materials separable where compositing requires it. Product marks belong on the objects; webpage names, sells, prices, and “Coming Soon!” remain HTML. Do not paint a faux product card or checkout UI into a graphic.

**Approval:** correct object/mark continuity, sharp material detail, five distinct scene rhythms, useful responsive crops, short live copy remains legible, and no uniform pack-shot grid.

## GS-G08 — the Case wall subject: one new figure for the evidence wall

**Added:** 2026-09-18. **Priority:** post-launch flesh-out, not a blocker. **Use:** home Case section (`../site/src/components/homev2/Case.astro`), the porcelain evidence wall.

**Why it exists.** On 2026-09-18 the three billboard-scale statistics on the Case wall were replaced by one compact row of five small glazed evidence stamps. The wall now has room, and the no-still-life rule says the section about him should show him. The findings become annotations pinned around a person instead of numbers filling space.

**The rough picture.** One man, the subject the Field Data Committee has been studying, standing against the same wet, high-key white ceramic tile the section is built on. Mid-wash: lather on the shoulders and chest, water on the skin, hair wet, steam thin and atmospheric. He looks at the camera, deadpan, slightly caught. Fragrance-ad seriousness played straight; the joke is the paperwork around him, not his face. Desire, never shame. Prefer continuity with the Poster 1 / hero model. Synthetic subject; no likeness to protect.

| Export | Canvas | Composition / safe area |
|---|---|---|
| `case-subject.png` | **Proposed: 2400×3600, transparent** | Subject cut out cleanly (hair and lather edges preserved), knee-up or waist-up, facing camera, body weight on the right so his left side has open air. Claude seats him on the CSS tile grid, so no tile is baked in |
| `case-subject-wide.jpg` | **Proposed: 3200×1800** | Same subject on the tile, standing in the right third; left two thirds are calm white tile for the plaque and stamp row. Fallback if the cut-out cannot integrate cleanly |

**Where he goes on the page.** Desktop: he stands at the right edge of the wall, locked against the emphasized grout line, spanning from the plaque's top edge down to the "Read the full findings" link, occupying about a quarter of the wall width. The stamp row runs to his left and the last stamp may overlap his edge. Mobile (390 wide): head-and-shoulders crop above the stamp row, or omitted. **Interview required** for the mobile treatment before a final portrait crop.

**Material and grading.** Match the section: steam-white `#f7f6f1` ground, near-black ink shadows, a whisper of marble amber in the warm highlights, chrome-clean water. No smoke register here; this is the bright wall, not the Unholy world. Steam stays translucent, never a white blanket over the face.

**Do not.** No baked words, marks, stamps, or numbers in the image. No towel-only or hands-only crop. No mugshot or lineup framing. No canonical poster reuse or crop.

**Master.** Subject, lather, water droplets, steam, and grading on separate layers. Deliver the transparent PNG plus a flattened preview. Claude creates the AVIF/WebP derivatives, the responsive crops, and the grout-line lock.

**Approval:** he reads as the person the findings are about; edges hold at 2× on the tile; stamp row and plaque stay legible beside him at 1440 and 1024 wide; the section still opens with the manifesto, not the photograph.

## Claude builds these; Stacey does not need to draw them

Steam behavior, page typography and metallic text effects, buttons/focus/error states, grids and rules, installation hotspots, lightbox, quiz controls, form fields, share feedback, legal text, SEO mappings, image optimization, and favicon derivatives. Existing CWAAA SVGs can support an approved sponsor seam; do not commission a new coalition seal for Got Soap?.

## Deferred production — keep these on the list

| PRD ID | Later graphics/media | Do not start final production until |
|---|---|---|
| GS-L01 | Film, premiere still/thumbnail, captions/transcript, home seam media | Film direction, master, rights, and activation are approved |
| GS-L02 | IVR promotional card, live-number campaign treatments | Number is owner-controlled and the canonical IVR deployment is verified |
| GS-L03 | Poster 5 minimalist derivative, extra social formats, business cards/event collateral | Separate copy/artifact approval; never overwrite a canonical poster |
| GS-L04 | Citation/generator output templates | Mechanics, author, moderation/consent scope, and approved copy are settled |
| GS-L05 | Any future real-commerce or ongoing-marketing collateral | Separate product approval and consent/contracts; no graphics are assigned by this launch scope |

## Delivery checklist

- [ ] GS-G00 sources verified; GS-G01–07 reviewed and each required output accepted or explicitly replaced by an approved reuse.
- [ ] Every new canvas has approved size, crop-safe zones, text, and destination before Photoshop production.
- [ ] Master/source location, license, attribution, version, approval, and served filenames are recorded per ID.
- [ ] Claude reviewed final art inside desktop and mobile layouts, not only as standalone images.
- [ ] Placeholder references and old preview mappings are removed where final artwork is delivered.
- [ ] Deferred items remain visible with their next action; no launch claim relies solely on an automated gate ignoring an unfinished graphic.
