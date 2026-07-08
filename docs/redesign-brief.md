# Got Soap? — Redesign Brief (adversarial audit → ranked build spec)

**Date:** 2026-07-08 · **Governs:** `docs/design-north-star.md` (the law) + this brief (the plan).
**Source:** 4-critic adversarial audit (concept/positioning · layout/anti-template · art-direction/craft · CWAAA-world/interaction), grounded in the real renders of `/` and `/pledge`.

## The verdict
**The writing is a 10. The presentation is a 3–4.** All four critics independently reached the same
place: the build *complied with `design.md`'s letter and violated its spirit* — five differently-*named*
spot layouts that render as one alternating two-column magazine row, posters boxed as drop-shadowed
thumbnails (and the dark ones vanishing on dark grounds), everything jailed in one 72rem centered column,
CTAs as five stacked centered cards, the hero an empty gray gradient, the gag a cookie-banner toast.
It is the owner's exact words: *"a gallery of my ads with captions,"* *"corporate SaaS Stepford."*
**This is a presentation-layer overhaul, not a rebuild** — routes, frozen copy, the two-author fiction,
a11y, the Astro build, Buttondown, and the token architecture all stay.

## The governing idea — THE BROADCAST TAKEOVER
> Home isn't a page **showing** the campaign. It's a **Public Service Broadcast that has commandeered
> the visitor's screen.** You don't open a website — you get **interrupted** by a transmission from an
> unhinged, dead-serious movement.

A persistent **on-air apparatus** threads the whole scroll — the `got soap? · PSA · SERIES ONE` bug, an
advancing **`SPOT 01/05`** counter, the `FUNDED BY CWAAA` credit. Each poster's world **"airs" full-viewport**;
the copy speaks **at you in second person** (the Old Spice / dual-address anatomy, design.md §4). The scroll
is a **dramaturgy, not a stack**: **seduction (1–2, porcelain) → accusation (3–4, smoke) → the crisis breaks
in (CWAAA document) → the demand (pledge band) → the oath (Form CW-1)**. The reveal stays the page-three
punchline. Reference energy: Emergency-Broadcast takeover × fragrance film × a nonprofit deadly serious about your smell.

## ROOT-CAUSE FIX — rewrite the spec first (or it re-flattens)
The build didn't disobey the docs; it **faithfully executed their restraint.** `design.md` §6/§7/§8/§10 and
the CWAAA component doc-comments literally say *"zero fx-\*,"* *"no texture,"* *"competent never ugly,"*
*"the form-number does the work with zero pixels,"* *"three motions site-wide, nothing else."* **Until those
sections are rewritten to authorize the maximalist direction, the next implementer will "correctly" rebuild the
tax form.** Task 0 of the redesign = amend `design.md` §6/§7/§8/§10 + the CWAAA component headers to match the
North Star. (The North Star already outranks them; this removes the ambiguity that caused the drift.)

---

## RANKED ACTIONS (worst-first, consolidated across all 4 critics)

### P0 — the "it's a gallery / it's SaaS" killers (do these or nothing else matters)
1. **Detonate the poster-card module.** Remove `border-radius` + the `0 24px 60px` drop-shadow on every poster
   and **delete the per-spot share/view/citation toolbar** from home. Posters bleed off container edges at
   architectural scale (60–130vh); share + download live on `/psas/<slug>` where they belong. *This one change
   flips "gallery of ads with captions" → "immersive movement."*
2. **Break the 72rem centered-column jail.** Kill the universal `max-width:72rem; margin-inline:auto` on every
   section. Rebuild as a **rhythm of extremes**: 100vw full-bleed ↔ 44rem tight column; 130vh crescendo ↔ 30vh
   whisper; bleed / left-anchor / overlap — never centered ×7.
3. **Ship a real hero — never the gray gradient.** Full-bleed text-free re-stage of Poster 1's world with
   `got soap?` at 18–30vw bleeding off the edges; OR (until the photo lands) a **monumental chrome type-only
   hero** on grout-black bleeding off three edges. The current void reads "unfinished template" in the first 800ms.
4. **Rescue the vanishing dark posters (spots 3 & 4).** Spotlight/rim-light/lather-white key-line so they read
   as *lit* on the smoke ground instead of black-on-black holes.
5. **Stop re-typesetting each poster's baked headline beside it.** The poster already carries its headline +
   subhead; printing them again in bigger live type demotes the artifact to decoration (why they shrank). Live
   type echoes the *structure* (eyebrow, a different hook, CTA, hashtags), not the poster's own words.
6. **Kill the cookie-banner gag → a QC certification stamp** that *thunks* into a page corner on load (campaign
   tokens/chrome, quarantine intact; NOT `cwaaa-stamp`). Reduced-motion = appears.
7. **Never render an empty poster box.** Spots 3–5 currently show blank frames (lazy/derivative gap) — ship an
   in-world steam/token placeholder that never reads as broken (never cover-crop the canonical poster).

### P0 — CWAAA surfaces → FULL DRAMATIC CERTIFICATE (owner directive; parallel track)
8. **Pledge → an engraved certificate** (all CSS/SVG, no new deps): aged-paper texture (`feTurbulence` noise +
   edge vignette/foxing), **guilloché security border** (SVG `border-image` + corner rosettes), the **seal as a
   huge watermark** (Seal @ ~360px, ~6% opacity, `multiply`) behind the oath, **letterpress** title
   (`text-shadow` deboss), **ruled fill-in form-lines** with a numbered margin gutter + dotted leaders (NOT
   floating underline inputs), a **wax seal + the SWORN stamp** as the payoff. Keep the existing a11y wiring verbatim.
9. **Crisis → a physical classified dossier**: stacked-paper depth, **manila folder tab** (`FILE 26-114`),
   `CONFIDENTIAL` + `RECEIVED [date]` rubber stamps, findings as a **typed report** (keep the table, no charts),
   the 9 case files as **actual case-file cards** (paperclip, redacted photo-corner, `REFORMED` stamp; RC-071 visibly
   shorter for rhythm), press releases as **teletype/telegram** cards. Home seam = a real memo dog-eared onto the desk.

### P1 — make it perform (camp / editorial / craft)
10. **Distinct per-spot armatures** — the six below; you must not be able to describe any two with one sentence.
11. **Spend the layer-effect budget loud.** Real chrome bevel + specular line on smoke titles; **keep the
    poured-gold gradient in marble** (solve AA by darkening the ground behind the title, not by flattening the
    gradient — the build currently disables gold in `warm` mode); readable steam-glow (seat over a darker zone);
    **extreme type-scale contrast** — one monstrous element (15–30vw) per section against genuinely small type.
12. **Three material register-worlds, not "dark + amber" ×N.** Bright tiled porcelain w/ visible grout + steam ·
    fogged, rim-lit steel smoke w/ a **cool** secondary accent · veined **warm** marble w/ gold. Reserve bright
    amber for the single primary CTA per view; give eyebrows/labels register-appropriate neutrals.
13. **Commit texture:** a visible global film-grain (~8–12%), real steam (SVG turbulence), marble veining, chrome
    reflection panels — the posters are dense; the grounds must stop being flat color blocks.
14. **CTAs get distinct spatial identities** (not five centered cards): the Sniff insert = an off-center invading
    field-assessment; the CWAAA seam = an oversized document laid on at an offset; the pledge band = a full-bleed
    100vw gold moment at extreme type scale. **Share controls in Libre Franklin uppercase signage**, not bland pills.
15. **Motion, on-concept + reduced-motion-safe:** porcelain steam drift; smoke **smolder** (animate the chrome
    gradient's `background-position`); **scroll-reveal that CLEARS like steam** (`blur→sharp`) instead of the
    generic fade-up; button **squeegee wipe** on hover; stamps **thunk once**. Amend §8 to allow these.

### P2 — chrome
16. Nav with a point of view (heavier wordmark / corner-tag echo / stamp-like active state); asymmetric footer.
17. Promote the **seal** everywhere (it's the best owned asset, currently 92px `decorative`).

---

## PER-SPOT ARMATURES (hero + 5 spots — six unrelated compositions)
- **HERO — the billboard:** full-bleed Poster-1 world, `got soap?` at 20–30vw baseline-pinned, letters cropped by the frame; steam clears off the image. *(CK Obsession billboard / Old Spice title card.)*
- **SPOT 1 (porcelain) — the tile wall:** poster floor-to-ceiling bleeding off the LEFT edge (no round/shadow — a wall of tile); headline band overlapping its right edge; asymmetric ~65/35, poster dominant.
- **SPOT 2 (porcelain) — the broken numeral:** the ghost "02" goes structural + monstrous (60vh, bleeding top/bottom), poster overlapping its counter, the "because…" pull-quote as an oversized drop-quote; collapsed/overlapping grid. *(Brodovitch / Vignelli.)*
- **SPOT 3 (smoke) — the altarpiece (THE crescendo):** 130vh full-bleed black, dark chrome poster monumental at ~85vh bleeding top/bottom, a revival-tent shaft of light behind it, "unholy" gigantic in real chrome overlapping the poster. Walk-into-a-cathedral. *(Saint Laurent full bleed / altarpiece.)*
- **SPOT 4 (smoke) — the confessional diptych:** two asymmetric panels; sermon copy running UP the left margin (rotated), poster bleeding off the right at 90vh; vertical, marginal, off-balance.
- **SPOT 5 (marble) — the magazine folio:** true full-bleed warm-marble spread with a visible gutter, folio number, oversized editorial drop-cap; poster bleeds off the right at magazine scale; body in a narrow justified column. *(GQ / Fantastic Man / Vogue fragrance spread.)*

## Asset dependency (flag to owner)
Full immersion wants **text-free exports of all five posters** (like the hero one already in production).
Without them we present baked-type posters as framed rectangles — the upstream cause of the catalogue feel.
**Workaround** (build now, swap later): a **derived environmental bleed** — a heavily blurred/darkened, scaled
duplicate of the same poster as an ambient full-bleed backing behind the crisp untouched poster (decoration
derived from the art, not re-typesetting it); edge-anchor the canonical poster; the untouched posters live as
the "artifacts" on `/psas`.

## KEEP (do not touch)
8 routes/IA · frozen copy (`copy.ts`) · two-author fiction (🧼/📋 never blended) · WCAG 2.1 AA + the CW-1 form's
a11y wiring · Astro build · Buttondown · the token/register-slot architecture (spend its budget; don't rebuild it).

## Execution plan
0. **Rewrite the spec** (`design.md` §6/§7/§8/§10 + CWAAA component headers) to authorize the direction.
1. **Vertical-slice proof:** rebuild the **hero + Spot 1** and the **pledge certificate** first; render + owner review before fanning out.
2. **Campaign surfaces:** the remaining spots (2–5) as their armatures + register materials + type/motion/texture.
3. **CWAAA:** crisis dossier + gag stamp + controls.
4. **Verify:** visual pass (screens), WCAG AA, Lighthouse, reduced-motion; then deploy.
