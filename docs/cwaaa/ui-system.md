# CWAAA UI system

**Status:** active working authority; structure established, detailed visual tokens pending owner interview  
**Applies to:** CWAAA standalone advocacy website only  
**Reads with:** `design.md`, `PRD-cwaaa-web-v1.md`, `world-bible.md`, and `../HANDOFF.md`  
**Does not apply to:** Got Soap? or the Office of Lather Compliance

This file converts CWAAA’s approved creative platform into implementation-level visual rules. It exists to stop an implementation agent from placing CWAAA content into a generic nonprofit, SaaS, civic portal, document simulation, or WordPress template.

A lower-level implementation may add detail. It may not contradict this file, `design.md`, the PRD, the world bible, or owner decisions recorded in `docs/HANDOFF.md`.

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

The hero uses a documentary-editorial image of a woman’s hands tying a red washcloth ribbon around a genuinely used black gym bag on a locker-room bench.

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

- approximately 50% documentary human traces;
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
