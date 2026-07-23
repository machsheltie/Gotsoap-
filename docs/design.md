# Got Soap? target design system

**Version:** 3.0
**Status:** approved target-state authority
**Applies to:** the Got Soap? campaign site after CWAAA extraction
**Does not apply to:** the CWAAA or Office of Lather Compliance sites

The current combined Astro runtime remains documented in `../specs.md`. This document defines what
the campaign becomes; it does not pretend the extraction has already happened.

## 1. The creative thesis

Got Soap? is not a website displaying a campaign. **The website is the campaign.**

It should feel like a forbidden fragrance launch commandeered by a hygiene PSA: beautiful enough to
seduce, direct enough to indict, and funny because it never backs away from its own seriousness.
The visitor should experience controlled escalation—steam, skin, chrome, tile, smoke, amber,
confession—rather than browse a tidy collection of project assets.

The compositional influence is **editorial brutalism**, not brutalist styling. Use violent scale
contrast, hard crops, asymmetric columns, abrupt rules, overlapping captions, interrupted reading
paths, and confident negative space. Do not translate “brutalism” into concrete grey, monospace
labels, default black boxes, or an amateur anti-design skin.

## 2. Desired visitor experience

In order:

1. **Intrigue:** this looks too expensive to be a hygiene joke.
2. **Recognition:** the milk-moustache grammar lands, but the campaign is its own world.
3. **Escalation:** each spot changes register instead of repeating a card component.
4. **Participation:** the Sniff Test and pledge feel like campaign acts, not product widgets.
5. **Conspiracy:** CWAAA appears as a credible sponsor beyond the campaign.
6. **Authorship:** Hope2 Studio arrives as a post-credits reveal, after the fiction has paid off.

The site must work for two simultaneous audiences: the man being addressed and the woman being given
language worth sharing. Do not smooth that tension into generic inclusive brand copy.

## 3. Authorship boundary

Got Soap? owns:

- campaign home and navigation;
- the five canonical PSA spots and downloads;
- the Sniff Test and all verdict presentation;
- the campaign edition of the Lather Pledge;
- campaign share assets and scratch-and-sniff gag;
- the late Hope2 Studio reveal.

Got Soap? may link to CWAAA at a designed seam. It does not host CWAAA's findings, case-file archive,
nonprofit history, annual-report material, or Office content.

The campaign pledge uses the shared contract in `contracts/pledge.v1.json`. Its success composition
includes a final **“Want to Learn More?”** route to CWAAA. Until the CWAAA URL is configured, that
cross-site control is not rendered.

## 4. The anti-template constitution

These are failures even if the build is polished and accessible:

- a centered hero with eyebrow, headline, paragraph, and two CTA buttons;
- three equal feature cards;
- five posters in a static equal-width grid;
- one repeated poster/card component with only colors changed;
- generic black-to-purple “luxury” gradients;
- rounded SaaS panels, floating glass cards, or pill-shaped navigation;
- tasteful serif editorial minimalism that drains the joke of heat;
- scroll effects that exist only to make an ordinary layout feel custom;
- early case-study language explaining the designer, tools, or process;
- transferring CWAAA's paperwork aesthetic onto campaign pages.

Every major route must name:

1. a dominant visual or typographic event;
2. an off-axis counterweight;
3. a designed transition;
4. the default layout it is refusing.

If those four answers are absent, the page is not designed yet.

## 5. Visual registers

The five posters are one campaign expressed through three cinematic registers:

| Register | Posters | Material world | Emotional temperature |
|---|---|---|---|
| **Steam / tile** | 1–2 | white tile, condensation, grout, wet skin, black type | exposed, bright, immediate |
| **Smoke / chrome** | 3–4 | black air, silver light, chrome type, drifting smoke | sinful, nocturnal, devotional |
| **Amber / marble** | 5 | warm stone, gold, body heat, deep shadow | public announcement as seduction |

Sections may transition between registers, but a single section uses only the tokens and effects of
its active register. Avoid a universal background that makes every poster feel interchangeable.

## 6. Composition laws

### 6.1 Scale

- One element owns the viewport. Everything else argues with it.
- Display type may run off-screen or cross image boundaries when the words remain understandable.
- Poster art retains its complete rectangle at least once per spot. Crops may support it, never
  replace the canonical view.
- Fine print is genuinely fine; body copy is never made tiny to imitate a fashion magazine.

### 6.2 Grids

- Use a 12-column underlying grid, then visibly break it.
- Prefer 7/5, 8/4, and 9/3 tensions over balanced halves.
- Align at least one critical edge; misalignment must feel authored, not accidental.
- Alternate pacing: full-bleed pressure, narrow confession, poster reveal, hard cut.

### 6.3 Poster staging

Each canonical poster needs its own reveal mechanism and supporting artifact. No gallery grid.

| Spot | Dominant staging | Counterweight |
|---|---|---|
| Clean Man | sterile tile billboard emerging from self-clearing steam | clipped field note on the grout line |
| Soap-Smoldering | bright poster pinned against an overlarge shower architecture | a vertical command interrupting the crop |
| Unholy | chrome-lit poster held in a black devotional void | a severe confession strip; this is the flagship |
| Redemption | smoke parts like a revival curtain | an off-axis ivory program with chrome edge |
| Public Thirst Announcement | amber poster occupies a marble civic monument | public-notice typography cut into the stone rhythm |

Supporting artifacts are live HTML, not alterations to the poster files.

### 6.4 Seams

Transitions should change material logic, not merely background color. Use steam clearing, a grout
rule becoming a black cut, smoke swallowing the edge, chrome glare, or amber light arriving as a
physical wipe. Every transition has a narrative job.

## 7. Color

| Token | Value | Use |
|---|---|---|
| `grout-black` | `#050505` | hard cuts, ink, smoke foundations |
| `steam-white` | `#F7F6F1` | bright tile register, primary light |
| `smoke-slate` | `#292A2F` | nocturnal depth, never a generic page background |
| `chrome-mist` | `#B9BBC2` | metallic rules, glare, restrained display gradients |
| `marble-amber` | `#C78B3B` | sole campaign CTA accent and amber-register heat |
| `lather-white` | `#FFFFFF` | foam, high contrast, type on black |

Rules:

- A section uses two or three tokens, not the whole palette.
- `marble-amber` is the only campaign action accent.
- Chrome gradients belong to display type or narrow rules, never large generic UI panels.
- WCAG contrast requirements override photographic mood behind readable text.

## 8. Typography

| Role | Family | Direction |
|---|---|---|
| Display / logo | Oswald | compressed, lowercase logo; large commands; tightly controlled leading |
| Body / CTA | Jost | direct, contemporary, unprecious |
| Movement / share | Libre Franklin | blunt institutional energy without becoming CWAAA |
| Fine print | Montserrat | credits, legal, metadata |

- Self-host fonts and declare resilient fallbacks.
- Use display effects only when they belong to a poster register: black shadow on steam, restrained
  chrome treatment in smoke, gold depth in amber.
- Do not reproduce Photoshop bevels on every heading.
- Never use PT Serif on campaign-authored surfaces. It belongs to CWAAA.
- Do not substitute a generic editorial serif to manufacture sophistication.

## 9. Image and material direction

Photography is the luxury. UI decoration supports it.

- Preserve inclusive casting, including poster 5's Black model.
- Use responsive AVIF/WebP derivatives and maintain useful focal-point metadata.
- Steam is translucent volume, not a white opacity layer.
- Tile needs grout scale and specular restraint; smoke needs depth, not a flat blur; chrome needs
  narrow highlights; amber needs stone and heat, not an orange overlay.
- Texture files with unclear redistribution rights do not ship.
- The five poster JPGs remain canonical and untouched.

## 10. Motion

Motion is an editorial cue, not ambient entertainment.

- Hero steam auto-clears in an approximately two-second squeegee sweep. No drag interaction.
- Reveal motion follows reading direction and stops when content is legible.
- Poster entrances preserve the full poster and avoid carousel behavior.
- The scratch-and-sniff gag gets one committed response, not a looping cursor toy.
- Respect `prefers-reduced-motion`; the reduced state reveals the same content immediately.
- No scroll-jacking, inertia hijacking, perpetual parallax, or motion required to submit a form.

## 11. Route direction

### Home

**Dominant event:** widescreen, text-free Clean Man hero under self-clearing steam.
**Counterweight:** live campaign command cut into the image edge.
**Transition:** bright tile drops through a grout-black cut into the first spot.
**Refuses:** centered launch-page hero and feature-card summary.

Home recruits into the movement, previews one campaign spot at a time, invites the Sniff Test, and
contains only a compact CWAAA sponsorship seam.

### PSA index and detail

The index behaves like a campaign broadcast schedule, not a gallery. Sequence can be scanned, but
each spot receives a distinct full-bleed staging. Detail routes preserve the poster, give it air, and
place downloads/share controls as production artifacts rather than ecommerce buttons.

### Sniff Test

Campaign-authored field theatre: one question at a time, no numeric score, strong keyboard and focus
states, verdicts framed as identities worth sharing. CWAAA may be credited as sponsor, but the
interaction does not become a manila form.

### Lather Pledge

Campaign edition: seductive declaration rather than nonprofit paperwork. It implements the same
fields, consent, Buttondown audience, and success semantics as CWAAA. After `SWORN`, the sequence is:
share/copy actions, then a quiet **“Want to Learn More?”** seam to CWAAA.

### About

The post-credits scene. Begin inside the campaign fiction, reveal the creative mechanism late, and
then name Stacey M. Breckel / Hope2 Studio. Do not cool the site into a pitch deck before the reveal.

### 404

A missing broadcast, authored by the campaign. Do not use CWAAA letterhead or Office denial language.

## 12. Responsive behavior

Mobile is a new composition, not a shrunken desktop:

- preserve the dominant/counterweight relationship;
- let type crop vertically before it becomes timid;
- sequence overlaps when horizontal collision would damage readability;
- show every canonical poster uncropped at a useful size;
- keep tap targets at least 44×44 CSS pixels;
- keep form labels persistent and errors adjacent to fields.

At wide viewports, cap readable prose, not image drama. At narrow viewports, prioritize image, command,
and action in that order.

## 13. Accessibility and performance

- Semantic landmarks, logical heading order, skip link, visible focus, keyboard-complete mechanics.
- Meaningful alt text distinguishes poster content from decorative crops.
- Never place essential copy only inside an image or animation.
- Meet WCAG 2.2 AA for contrast and interaction.
- Reserve image aspect ratios to prevent layout shift.
- Lazy-load below-fold art; do not lazy-load the hero's essential image.
- The complete experience remains coherent with JavaScript unavailable; enhanced mechanics may
  degrade to direct links or static outcomes.

## 14. Design acceptance test

A candidate implementation passes only when all are true:

- a first-time viewer describes it as a campaign experience, not a portfolio template;
- the five spots do not read as repeated cards;
- Unholy clearly owns flagship weight;
- editorial brutalism is visible in composition but not mistaken for a concrete-grey theme;
- the campaign remains glossy, hot, and legible;
- Sniff Test still belongs to Got Soap?;
- pledge contract parity passes and the CWAAA seam appears only when configured;
- no CWAAA long-form content or Office content remains on campaign routes after extraction;
- reduced-motion, keyboard, mobile, and contrast checks pass;
- the late Hope2 Studio reveal still feels like a reward.
