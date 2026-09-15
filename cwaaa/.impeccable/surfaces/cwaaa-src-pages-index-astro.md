---
version: 1
slug: "cwaaa-src-pages-index-astro"
primary_target: "cwaaa/src/pages/index.astro"
related_targets: []
---

# Surface brief: CWAAA home (`/`)

**Scope:** the standalone CWAAA app's home route, first production route of the new Astro app at `cwaaa/`. **Visitor mode:** Persuade.

**Audience and job.** Two arrivals with distinct jobs: women who witness, recruit, share, and refer; men referred to sign Form CW-1. Both must read, inside one screen, a credible national coalition that has already filed this, and see the pledge as low friction.

**Action and proof.** Primary action: Take the Pledge (Form CW-1). Secondary: Read the Findings. Proof is the material itself: one Finding, one recovery voice, real cloth, the scale line. No Office explanation, no satire announcement.

**Approved direction.** Comp D "The Field Report" (`.impeccable/mocks/cwaaa-home-d.html`, approved 2026-09-14). Layout skeleton after the owner's reference blueforest.org, layout and elements only: slim pinned utility bar (scale line + pledge action); ordinary navigation over a full-bleed documentary hero; proposition "The bar is soap." in MORVI, solid ivory, bottom-anchored on the photograph (the two-color split was rejected by the owner 2026-09-14); two-column statement with the two ruled actions; alternating whole-color fields: navy DOCUMENT. ADVOCATE. ORGANIZE. as one running line over a ruled three-column run; full-bleed Tie One On cloth with an inset ivory panel; ivory Finding with hard rule and methodology note; white recovery voice with object slot; navy footer with legal links.

**Memorable moment.** The proposition sitting on the documentary photograph, then the page revealing itself in reading order as the visitor scrolls.

**Motion (owner request 2026-09-14).** Scroll-driven reveals like the reference: text rises and settles, rules draw in, photographs settle from a slight scale, utility bar pinned. No parallax, cursor tracking, or animated ribbon (design.md §10). Reduced motion removes movement, keeps state.

**Placeholders, never stock.** CW-G02 hero (16:9, subject upper-right, lower-left quiet, 3200×1800 + 4:5 recrop), CW-G03 cloth macro (full bleed, lower-left quiet), CW-G04 participant object (direction pending CW-D04). Each renders as a labeled slot with safe zone until the approved asset exists.

**Comp inventory and media.** Nav/utility/footer: HTML. Proposition and all headings: live HTML in the locked cast. Hero, cloth, object: raster, owner-supplied. Seal: existing SVG component prepared from the approved source. Rules, panels: CSS. Section eyebrow dot labels: HTML, kept because the owner approved the reference's elements.

**Unresolved.** CW-D01 type scale (proposal in tokens.css), CW-D02 tokens beyond ground (proposals marked), CW-D04 roster (home Finding unnumbered; Brayden's object/image direction pending), CW-D06 email, remaining CW-D07 items, domains. New copy lines in `src/content/copy.ts` marked DRAFT await the copy lane.
