# CWAAA UI system

**Status:** active working authority; structure established, detailed visual tokens pending owner interview  
**Applies to:** CWAAA standalone advocacy website only  
**Reads with:** `../design.md`, `PRD-cwaaa-web-v1.md`, `world-bible.md`, and `../../docs/HANDOFF.md`
**Does not apply to:** Got Soap? or the Office of Lather Compliance

This file converts CWAAA’s approved creative platform into implementation-level visual rules. It exists to stop an implementation agent from placing CWAAA content into a generic nonprofit, SaaS, civic portal, document simulation, or WordPress template.

A lower-level implementation may add detail. It may not contradict this file, `../design.md`, the PRD, the world bible, or owner decisions recorded in `docs/HANDOFF.md`.

---

# 1. Creative operating principle

## CWAAA: A Coalition Making Its Case in Public

CWAAA must look like a real national advocacy coalition with exceptional campaign art direction.

It demonstrates legitimacy through:

- clear organization;
- credible programs;
- useful navigation;
- real chapter life;
- humane participant stories;
- findings;
- accessible participation;
- coherent institutional behavior.

It does not decorate itself with generic symbols of nonprofit legitimacy.

The website remains globally credible and usable. Individual routes become expressive advocacy environments:

- Findings become monumental.
- Testimony becomes intimate and protected.
- The ribbon becomes a physical symbol.
- Chapter materials demonstrate national participation.
- The pledge becomes a meaningful civic act.

Paper is content, not the universe.

---

# 2. Already locked visual laws

The following decisions are binding before the detailed UI interview is complete.

## 2.1 Navigation

Primary navigation remains ordinary, visible, and immediately understandable:

- Findings;
- Recovery Stories;
- Tie One On;
- Chapters;
- About;
- Take the Pledge.

Rules:

- no INDEX control;
- no filing-tab global navigation;
- no registry numbers in route labels;
- no pill CTA;
- no gradient CTA;
- no floating donation bubble;
- no bureaucratic usability theater;
- no Office link in primary navigation.

## 2.2 Route expression

- Home is a major public advocacy campaign.
- Findings are monumental, public, collective, vertical, and declarative.
- Recovery Stories are intimate, humane, individual, and reading-oriented.
- Tie One On is tactile and cloth-led.
- Pledge is a safe ceremonial civic act.
- Chapters are a distributed human network, not a map or card grid.
- About establishes the 2024 origin before the deepest Office seam.
- The Office referral is sparse, neutral, and unexplained.

## 2.3 Homepage

The locked proposition is:

> **THE BAR IS SOAP.**

The hero uses a documentary-editorial photograph of the coalition's own group portrait — three members in a plain meeting room, facing the camera, one holding a bar of soap. Shipped and closed 2026-09-15; the earlier gym-bag/washcloth spec is struck (see §13, Standing image law).

The image interrupts the typography rather than forming a 50/50 split.

The homepage sequence remains:

1. opening proposition;
2. one continuous `DOCUMENT. ADVOCATE. ORGANIZE.` composition;
3. one current Finding;
4. one intimate recovery voice;
5. one tactile Tie One On moment;
6. coalition scale;
7. one clear pledge action;
8. one restrained Got Soap? relationship seam.

## 2.4 Material and photography hierarchy

Target hierarchy:

- approximately 50% documentary photographs of people (people are shown; “traces” struck 2026-09-15);
- approximately 30% coherent physical artifacts;
- approximately 20% live civic graphics and typography.

Every photographed artifact must have:

- one fictional owner;
- a real function;
- complete copy;
- plausible dimensions and construction;
- consistent typography;
- date or version where appropriate;
- a reason to exist beyond the visible crop.

Use real red cloth. Do not simulate the ribbon as a universal digital graphic.

## 2.5 Wrongness discipline

CWAAA earns trust first and never performs horror.

Wrongness may come from:

- sparse chronology;
- a neutral citation;
- a repeated code;
- unusually complete continuity;
- an institution treated as routine;
- an artifact returning with new meaning.

Wrongness may not come from:

- glitches;
- flicker;
- surveillance animation;
- countdowns;
- ominous audio;
- cursor tracking;
- hostile validation;
- threats;
- Office language on ordinary pages.

---

# 3. Typography system

**Status:** FAMILIES AND WEIGHTS LOCKED by owner decision 2026-08-13, revised 2026-08-14. Scale,
leading, tracking, measures, case discipline, and responsive behavior remain UNLOCKED and may not be
filled by an agent.

## 3.1 Locked cast

One family per role. No family carries two.

| Voice | Family | Weights | Job |
|---|---|---|---|
| Proposition | **MORVI** | 400 only | `THE BAR IS SOAP.`, route-opening statements |
| Monumental figure | **Mirk Slab** | 900 only | the single oversized Findings figure |
| Text | **Proda Sans** | 400, 400i, 700 | reading matter: explanation and body copy |
| Interface and notation | **Catesque** | 400, 500, 700 | navigation, controls, forms, metadata, `RC-NNN`, tables, dates |
| Testimony | **Modest** | 400, 400i, 700 | Recovery Stories long-form only |
| Identity serif | **PT Serif** | 400, 400i, 700, 700i | coalition seal and existing certificate artifacts |

Runtime tokens: `--font-cwaaa` (text, the register base), `--font-cwaaa-interface`,
`--font-cwaaa-proposition`, `--font-cwaaa-figure`, `--font-cwaaa-testimony`, `--font-cwaaa-seal`.

The 2026-08-14 revision split what Proda Sans had been doing. The dividing line is **reading versus
operating**: prose the visitor reads is Proda; anything they scan, align, or act on is Catesque.

## 3.2 Binding constraints on this cast

- **MORVI ships one weight.** `font-synthesis` is `none`; never synthesise a bolder MORVI.
- **Figures that must align are Catesque.** MORVI and Mirk Slab carry proportional figures by
  measurement — 32.6% and 20.8% em spread across the ten digits at 1000 upm — and declare no figure
  feature. Catesque carries `tnum` (verified to collapse all ten digits to a single 0.620em
  advance), `zero`, `case`, `pnum`, `subs`, `sups`, and `frac`, and therefore owns every Findings
  table, stacked figure column, identifier, and date. `.type-cwaaa-figure` is for one figure
  standing alone; two or more use `.type-cwaaa-table`.
- **Notation uses `zero` and `case`, not just `tnum`.** A slashed nought keeps `RC-007` from reading
  as `RC-OO7`, and `case` lifts the hyphen to cap-centre between all-caps letterforms. Both are
  bound in `.type-cwaaa-notation`; neither is available in Proda Sans.
- **Catesque Black is not a display weight.** Its stem measures 0.164em against Proda Bold's 0.175em
  and Mirk Slab Black's 0.280em — lighter than the Bold of the text face. It may not be used to set
  a proposition or a monumental figure, whatever the foundry's own recommendation says.
- **Catesque and Proda must be optically size-matched where they meet.** Catesque's lining figures
  are 6% taller (0.708em vs 0.668em). Their tabular advances match to within 0.003em, so a figure
  swapped into an existing column does not reflow it.
- **Mirk Slab is delivery-restricted.** Its OS/2 `fsType` is `viewOnly` (preview/print). The owner
  confirmed web distribution rights on 2026-08-13, recorded in
  `site/config/cwaaa-font-manifest.json`. Adding further Mirk Slab weights requires re-confirmation.
  The family ships 82 styles across a width axis; only the assigned weight is authorised.
- **PT Serif is no longer the universal CWAAA family.** It is the identity serif for the seal and
  existing certificate artifacts until those are re-cut.
- Only weights with an assigned production role may be declared or delivered. Presence in
  `public/fonts` is not permission to load.

## 3.3 Still open

Type scale, leading, tracking, text measures, case discipline, and responsive behavior. Record them
here when decided; do not infer them from a framework default or a nonprofit template.

The high-level direction that governed the selection, and still governs its use:

- contemporary civic editorial;
- forceful display scale for propositions and Findings;
- plain, highly readable sans serif for navigation, explanation, and forms;
- a restrained serif may support long testimony only when it improves reading;
- hierarchy comes from scale, measure, weight, rules, and whitespace rather than simulated paperwork;
- no monospace on normal CWAAA surfaces;
- no generic Inter/Playfair, Montserrat/Lora, Poppins/Merriweather, or equivalent template pairing by default.

---

# 4. Pending color system

**Status:** UNLOCKED beyond the existing material direction.

The detailed interview must establish:

- exact color tokens and values;
- white versus ivory usage;
- ink navy role;
- civic black role;
- stamp red role;
- ribbon red role;
- metadata grey;
- structural rules and separators;
- action colors;
- error, success, warning, focus, disabled, and visited states;
- photographic color discipline;
- contrast rules;
- high-contrast behavior.

Existing binding direction:

- clean white and ivory digital fields;
- ink navy;
- restrained black;
- controlled stamp red;
- actual woven red cloth;
- natural documentary color;
- no gradient system;
- no all-beige visual world;
- no pastel wellness palette;
- red must not become universal decoration;
- paper appears only when an actual paper object exists.

---

# 5. Pending grid, spacing, and composition system

**Status:** UNLOCKED.

To define:

- underlying grid;
- content widths;
- prose measures;
- gutters;
- section spacing;
- edge behavior;
- route-specific compositions;
- Findings scale and rhythm;
- Recovery Story reading surfaces;
- Chapter dispatch arrangement;
- Pledge form width and alignment;
- mobile recomposition;
- controlled overlap;
- image crop and safe-area rules.

Claude may not solve these gaps with a card grid, bento system, equal columns, dashboard, or repeated section component.

---

# 6. Pending surfaces, borders, corners, and shadows

**Status:** UNLOCKED.

To define:

- corner-radius law;
- border and rule weights;
- field and control shapes;
- panel behavior;
- paper-artifact edges;
- cloth and image boundaries;
- shadow categories;
- focus outlines;
- modal or overlay behavior, if any.

Binding prohibition:

- no rounded white cards;
- no floating glass panels;
- no generic civic dashboard containers;
- no decorative office-supply surfaces;
- no simulated filing-cabinet component language.

---

# 7. Pending motion and transition system

**Status:** UNLOCKED beyond the existing behavioral law.

Existing binding direction:

- motion is restrained and material;
- a `SWORN` mark may settle;
- a cloth fold may reveal program information;
- a copied link may confirm;
- navigation may respond clearly;
- no steam, smoke, cinematic parallax, cursor tracking, flicker, ominous audio, countdown, or animated wandering ribbon;
- reduced motion removes nonessential transitions without removing state or success feedback.

To define:

- duration tokens;
- easing curves;
- navigation transitions;
- Findings entry behavior;
- Recovery Story transitions;
- cloth reveals;
- Chapter dispatch behavior;
- pledge submission and success;
- route transitions;
- reduced-motion equivalents.

---

# 8. Pending interaction-state matrix

**Status:** UNLOCKED.

The final matrix must define visual and behavioral states for:

- navigation closed/open/current;
- links default/hover/focus/visited;
- external links;
- buttons default/hover/focus/pressed/disabled/loading;
- pledge fields idle/focus/valid/error/submitting/success/network failure;
- consent;
- share and copy;
- Recovery Story index and detail;
- Finding current/amended/archived, if those statuses are approved;
- Chapter dispatches;
- missing images;
- empty or unavailable content;
- Office referral;
- cross-site URL absent;
- email withdrawal and suppression;
- 404;
- legal navigation.

No state may borrow the Office’s containment language or horror behavior.

---

# 9. Pending responsive behavior

**Status:** UNLOCKED.

To define:

- breakpoint logic;
- header transformation;
- preservation of authored hierarchy;
- Findings recomposition;
- Recovery Story reading order;
- Chapter dispatch sequencing;
- image crop behavior;
- form layout;
- touch targets;
- zoom behavior;
- reduced-data behavior;
- handling of long institutional labels.

Mobile must be a designed recomposition, not stacked cards.

---

# 10. Accessibility and performance

Existing requirements remain binding:

- WCAG 2.2 AA;
- semantic headings, documents, tables, forms, and navigation;
- persistent labels;
- adjacent errors;
- visible focus;
- generous targets;
- plain consent language;
- meaningful text equivalents;
- no information conveyed by red alone;
- zoom-safe live typography;
- reduced-motion support;
- responsive images;
- no pledge or email values in analytics.

Detailed visual tokens and test thresholds remain pending.

---

# 11. Anti-default constitution

CWAAA fails if its dominant grammar includes:

- centered nonprofit hero;
- headline / paragraph / two-CTA template;
- three-card program row;
- mission / vision / values triptych;
- bento grid;
- impact dashboard;
- animated map;
- testimonial carousel;
- rounded white cards;
- generic donation CTA;
- pastel wellness palette;
- faux-government masthead;
- beige paper behind every section;
- decorative stamps or form numbers;
- repeated document components;
- one layout repeated across routes;
- stock volunteer photography;
- dossier styling;
- SaaS navigation;
- generic nonprofit-theme grammar.

---

# 12. Claude implementation prohibition

Until a section is locked in this file, Claude may not:

- choose typefaces;
- select a palette from common nonprofit conventions;
- add cards or dashboards;
- infer motion from framework defaults;
- create generic states;
- use paper texture as a global theme;
- add visual horror;
- fill missing details with “industry-standard” nonprofit design;
- reinterpret the site as a museum or government portal.

When information is pending, Claude must preserve the current implementation or request the missing owner decision.

---

# 13. Decision log

## 2026-07-29 — UI-system scaffold

Recorded:

- the UI-system authority structure;
- the locked creative platform and route laws;
- the locked navigation, homepage, photography, artifact, material, and wrongness rules;
- explicit pending sections for typography, color, composition, surfaces, motion, states, responsive behavior, accessibility, and acceptance testing;
- prohibition against filling pending decisions with generic nonprofit defaults.

## 2026-08-13 — Typography families locked

Recorded:

- the owner's selection of MORVI (proposition), Mirk Slab (monumental figure), Proda Sans (text,
  interface, notation), and Modest (testimony), with PT Serif demoted to identity serif — superseded
  in part on 2026-08-14, when interface and notation moved to Catesque;
- the assigned weights, and the rule that only assigned weights may be declared or delivered;
- the figure-alignment rule — MORVI and Mirk Slab are proportional with no `tnum`, so the family
  carrying `tnum` owns every figure that must align;
- the owner's confirmation of Mirk Slab web distribution rights against its `viewOnly` OS/2 flag;
- runtime implementation in `site/src/styles/fonts-cwaaa.css`, `site/src/styles/tokens.css`, and
  `site/config/cwaaa-font-manifest.json`, with the campaign runtime left on its own cast;
- scale, leading, tracking, measures, case discipline, and responsive behavior remaining UNLOCKED.

Selection criteria and the binary screening that informed it are in `font-brief.md`.

## 2026-08-14 — Notation and interface split off to Catesque

The owner declined to leave Proda Sans carrying two roles. Recorded:

- **Catesque** added at 400/500/700 for interface and notation; **Proda Sans** reduced to text alone
  and its weight 500 withdrawn from declaration and delivery with the role that used it. Every role
  now has exactly one family.
- The evidence behind the assignment: Catesque is the only CWAAA family besides Proda declaring
  figure features, and carries the notation-specific ones — `zero` and `case` alongside `tnum` —
  which is why it took notation rather than text. Its tabular advance (0.620em) matches Proda's
  (0.618–0.621em), so the swap does not reflow existing columns.
- **Catesque Black rejected for display use.** Measured stem 0.164em, lighter than Proda Bold. The
  monumental figure stays on Mirk Slab. Recorded so the foundry's own recommendation does not
  re-open the question.
- **Bagh Display screened and held**, not rejected: sound face, 100% coverage across every probe
  set, `fsType` installable — but CWAAA has no open display role once MORVI holds proposition and
  Mirk Slab holds the figure. Retained as the fallback if a proposition ever needs `§`, `¶`, `†`,
  a fraction, or a math operator, all of which MORVI lacks.
- **Article Round rejected** — belongs to a different project. It was screened anyway and would have
  failed: 302 glyphs, no figure features, missing `£ ¥ © ® ™ ° § ¶` and all fractions and math
  operators, 31% em digit spread, and an unset `capHeight` reporting the ascender.

Runtime implementation in the same three files as the 2026-08-13 entry, plus `--font-cwaaa-interface`
in `site/config/font-manifest.json`'s `fontRolePolicy`.

## 2026-09-14 — Home composition approved; build location; ground

Owner interview conducted through the Impeccable `shape` flow. Recorded:

- **CW-D07 (build location):** a new static-output Astro app inside this repository at `cwaaa/`, a
  sibling to `../site/`. Origins, legal/creator destinations, the `/crisis` migration destination,
  and old-story redirects remain open.
- **CW-D03 (home composition):** the owner reviewed four first-viewport comps
  (`.impeccable/mocks/cwaaa-home-{a,b,c,d}.*`) and approved **Comp D, "The Field Report"**. Its
  layout skeleton follows the owner's reference, blueforest.org, for **layout and elements only**,
  not color or feel: a slim utility bar carrying the scale line and the pledge action; ordinary
  navigation over a full-bleed documentary hero; the proposition set sentence-case in MORVI in one
  solid color on the photograph (the comp's two-color split at the photo edge was reviewed in the
  build and rejected by the owner the same day as unintentional); a two-column statement
  block with the two actions; then alternating whole-color fields (ink navy, photograph, ivory,
  white) with an inset text panel on the photograph. The locked sequence (§2.3) is kept in order.
  The proposition remains **THE BAR IS SOAP.**; on the home it is set as "The bar is soap." Only
  the period of the final word may be hidden by an interrupting image where the two overlap.
- **Ground (part of CW-D02):** white and ivory digital fields; manila is retired to actual paper
  artifacts. Ink `#2f3e5c` and stamp `#a63d2f` carry over from the runtime. The following values
  are **PROPOSED**, used in the home build, and await the CW-D02 token interview before they are
  law: ivory `#f5f0e6`, white `#ffffff`, civic black `#15181f`, metadata grey `#5f5d57`
  (6.4:1 on white), and a light tint `#e0857a` for the ADVOCATE accent on navy (4.6:1).
- **CW-G02 hero frame** (shipped: the coalition group portrait; see the 2026-09-15 entries below):
  16:9 wide, subject upper-right, lower-left kept quiet for the proposition,
  export 3200×1800 minimum plus a 4:5 phone recrop. Full bleed.
- **Home Finding:** the statement "Fragrance is not a cleansing event." is used with no
  `FINDING YY-NN` number until the findings register is reconciled (CW-D04). The runtime line
  "This figure has not improved since 1983" is not used; its date is unsupported.
- **Disclosure:** unchanged. No global satire disclosure; the footer carries Privacy, Terms,
  DMCA, Accessibility, and a truthful legal line. Fiction disclosure stays behind the About seam.
- **Type scale (CW-D01) remains open.** The home build uses a proposal recorded in its tokens file
  and marked as such.

The Sol/Codex synthesis `CWAAA-FABLE-HANDOFF.md` was built from outdated copies of these documents
and is provenance only; where it disagrees with this file, this file wins.

## 2026-09-14 — Homepage graphics production decisions

The approved Home composition was reconciled with `../GRAPHICS-TO-MAKE.md`. Recorded:

**Standing image law (owner direction, 2026-09-15): no still life anywhere.** A person is in every
frame. Participants are shown — faces and bodies — and are never replaced by an object, texture,
empty room, hand-only crop, or silhouette. Everyone in this fiction is synthetic: there is no
likeness to protect and no one to offend, and likeness or dignity arguments must not be used to walk
this back. What stays rejected is generic stock and institutional framing, not people.

- **CW-G01:** the standalone inline `Seal.astro` and simplified `public/favicon.svg` are the working
  web identity. Use the full seal at 44px only beside the written organization name; use 72px or
  larger when it appears alone. A replacement mark is not a default production task.
- **CW-G02 (SUPERSEDED — see the 2026-09-15 entries below):** this bullet's hands-and-gym-bag scene
  was struck by the owner. The shipped hero is the coalition group portrait. The zone rules survive:
  subject upper-right, lower-left and bottom quiet for the live proposition, only the final period
  may be obscured; masters at 3200×1800 desktop and a true 4:5 phone composition.
- **CW-G03, Home:** use **a man in an ordinary lived-in interior with the red washcloth ribbon on
  him** — wrist, belt loop, or a bag strap he is carrying — legible in frame. No object-alone
  doorknob still life; see the standing image law in `../GRAPHICS-TO-MAKE.md`. Supply 3200×1800 desktop and 2400×3000 mobile masters, with the
  knot upper-right and the lower-left clear for the inset panel. No instruction artifact is needed on
  Home; the Tie One On route may add one only after its own composition and complete copy exist.
- **CW-G04, Home:** Brayden's recovery voice uses one 4:3 **participant photograph** — shipped
  2026-09-15 as `src/assets/brayden.png`: Brayden, 27, in a boat, sunglasses on, holding up a
  bluegill. It reads as submitted by him and retained as received, not art-directed by CWAAA.
  Participants are shown. An object, texture, or empty room in a participant's slot is a rejected
  asset; every person in this fiction is synthetic and there is no likeness to protect.
- **CW-G05 and CW-G08:** neither is required by the current Home composition. Chapter/origin images
  and Findings source artifacts remain conditional on their route layouts and content rosters.
- **CW-G06:** the 1080×1080 pledge share master uses ivory, ink navy, the current seal, one controlled
  stamp-red `SWORN`, and a thin civic rule. It contains no personal data. Final baked wording still
  passes the copy lane; no bespoke email photography is required.
- **CW-G07:** make one 1200×630 default preview from the CW-G02 hero and a solid ink-navy identity
  field. The existing SVG favicon is the approved small-size symbol for this build; raster platform
  variants are derived from it as needed.
- **Responsive integration:** CW-G02 and the Home CW-G03 scene require art-directed desktop/mobile
  sources. The production component must select the 4:5 assets on narrow screens rather than center-
  cropping a single source.

## 2026-09-14 — Findings route shaped; CW-D04 register (Findings) resolved

Owner interview conducted through the Impeccable `shape` flow; brief confirmed and persisted at
`.impeccable/surfaces/cwaaa-src-pages-findings-astro.md`. Recorded:

- **CW-D04 (Findings register):** four entries, register year 26. **FINDING 26-01** is the
  monumental figure **73%** with the conclusion "Fragrance is not a cleansing event." (the
  owner-directed home statement merged with the runtime's 26-04 support line). **26-02, 26-03,
  26-04** carry the runtime's 26-01, 26-02, and 26-05 as approved copy. The runtime's 26-03
  (0% soap, "since 1983") is dropped. The home Finding now takes the label 26-01 and its
  "Number pending register" note is retired. Row dispositions and dates are DRAFT for the copy
  lane. The Recovery Stories roster is still open under CW-D04.
- **Monumental figure:** Mirk Slab 900 sets `73%` alone, flush left, owning roughly two-thirds of
  the opening viewport, ink navy on ivory. Its scale is a new CW-D01 proposal to be marked
  PROPOSED in the tokens file.
- **Neutral citation:** `/findings` carries **no** Office reference. The site's single sparse
  citation of the Office of Lather Compliance and Establishment Directive 1961-A is reserved for
  the About seam.
- **Interruption:** the route's one interruption is the methodology note, carried from the approved
  runtime subnote ("Compiled by the Field Data Committee…").
- **Register table:** one real HTML table for 26-02 through 26-04, figures in Catesque with `tnum`,
  `zero`, `case`; recomposes into labeled records on narrow screens. No dashboard, cards, chart,
  paper texture, or stamp decoration. CW-G08 is not required.

## 2026-09-15 — Home hero photograph supplied

The owner supplied the home hero photograph (`src/assets/hero-coalition.jpg`, 2576×1438) and
directed that it ship. Recorded:

- **CW-G02 (owner-supplied, ratified, closed):** three coalition members standing in a plain
  meeting room, facing the camera, one holding a bar of soap. Subject sits right of centre; the
  lower-left wall stays quiet for the proposition. This replaces the earlier hands-tying-a-ribbon
  shot spec for the home.
- **Departure RESOLVED 2026-09-15 (superseding the note previously recorded here).** The 2026-09-14
  spec and the old `design.md` §7 refused posed faces as proof of legitimacy. That rule was wrong
  and is **struck**, not merely departed from: `design.md` §6 and §7 are reworded, and the posed
  group portrait is the approved hero. The owner's direction is that people are shown, faces
  included, and that no still life appears anywhere on the site. Nothing here is outstanding, and
  this is not an open question for a later agent to reconcile.
- **Still owed:** a 3200×1800 master and a true 4:5 phone composition. Until then the single
  source is cover-cropped with an authored focal point on both viewports.
- **Delivery:** AVIF and WebP derivatives via `astro:assets`, eager and high-priority on the home;
  the original JPG is not shipped.

## 2026-09-15 — Hero masters delivered; Findings figure scale locked

- **CW-G02 masters:** the owner supplied the 3200×1800 desktop master
  (`src/assets/hero-coalition-wide.png`) and a 4:5 phone composition
  (`src/assets/hero-coalition-tall.png`, 3712×4608). `ImageSlot` now serves them as an
  art-directed `<picture>`: the tall source below 700px, the wide source above, each as AVIF and
  WebP derivatives. The earlier single-source cover crop is retired; the "still owed" note above
  is closed.
- **CW-D01 (Findings figure only):** the monumental figure scale
  `min(clamp(9rem, 2rem + 30vw, 30rem), 60vh)`, line-height 0.72, tracking −0.035em, phone 44vw,
  is locked as built on the owner's instruction (2026-09-15, "use your best judgement"). The
  remaining CW-D01 scale, leading, and measure values stay proposed.
