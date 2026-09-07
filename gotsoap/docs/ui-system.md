# Got Soap? UI system

**Status:** active working authority; typography cast locked, remaining sections pending owner interview  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `../design.md`, `prd/PRD-gotsoap-web-v1.md`, `world-bible.md`, and `../../docs/HANDOFF.md`
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file converts the approved creative direction into implementation rules. It sits below the Got Soap? design authority and PRD and above component-level implementation. It exists to prevent an implementation agent from using correct content inside generic web typography, generic states, or template UI.

A lower-level implementation may add detail. It may not contradict this file or improvise around an explicitly locked rule.

---

# 1. Creative operating principle

Got Soap? is a luxury-editorial hygiene campaign, not a website displaying one.

Its typography must behave like a cast of distinct voices:

- **Oswald commands.**
- **Behind The Nineties persuades.**
- **Moxie Twist seduces.**
- **Marlin Sans SQ operates.**
- **Moanslight records and releases the campaign.**

No typeface exists merely because it is attractive. Each family must perform its assigned psychological and functional role.

The system is intentionally more curated than a conventional web-font stack. It must not be flattened into a common display/body/utility trio or replaced with easier Google Font approximations.

---

# 2. Canonical font families

## 2.1 Oswald — campaign command

### Purpose

Oswald carries Got Soap?’s public campaign voice and preserves the visual relationship to the campaign’s *Got Milk?* inspiration.

### Approved uses

- `got soap?` wordmark;
- homepage hero command;
- route-opening commands;
- PSA titles;
- Sniff Test verdict names;
- Broadcast premiere language;
- major movement statements;
- selected Shop product names;
- Unholy’s dominant typographic moments;
- short proclamational calls to action that function as campaign copy rather than interface controls.

### Prohibited uses

- body paragraphs;
- product descriptions;
- form instructions;
- consent language;
- validation and error messages;
- legal copy;
- long quotations;
- ordinary navigation;
- repeated metadata;
- every subheading by default;
- generic emphasis when hierarchy has not been designed.

### Composition rules

- Aggressive cropping and overlap are permitted only at selected hero and route-opening moments.
- A route should ordinarily contain one major cropped Oswald event, not repeat the effect throughout every section.
- Selected route openings may allow type to cross photography or leave the viewport when comprehension remains immediate.
- Oswald becomes controlled, complete, and uncropped inside functional sections.
- Oswald must never become the universal “make this bold” font.
- The `got soap?` mark remains lowercase.
- Monumental campaign commands may use uppercase.
- Oswald is not forced into sentence-case paragraphs.

---

## 2.2 Behind The Nineties — editorial persuasion

### Purpose

Behind The Nineties carries persuasion, sensuality, direct address, and editorial storytelling. It is the campaign’s principal reading and narrative family.

Its rounded forms and nostalgic editorial character provide a deliberate contrast with Oswald’s compressed public authority.

> Oswald issues the command. Behind The Nineties makes the command desirable.

### Approved uses

- principal body copy;
- campaign explanations;
- direct-address paragraphs;
- product descriptions;
- Shop storytelling;
- poster supporting narratives;
- pledge introduction;
- About narrative;
- verdict descriptions;
- editorial captions;
- pull quotations;
- longer seductive propositions;
- selective italic emphasis;
- occasional large supporting statements beneath Oswald;
- selected confession passages when Moxie Twist is not active.

### Conditional functional uses

Behind The Nineties may carry:

- form introductions;
- nontechnical instructions;
- campaign-facing explanatory messages;
- descriptive framing around an action.

It does not automatically carry accessibility-critical or highly functional microcopy.

### Prohibited uses

- primary navigation;
- field labels;
- validation and error messages;
- consent text;
- prices;
- product specifications;
- loading messages;
- quiz answer controls;
- technical metadata;
- legal navigation;
- tiny fine print;
- broadly tracked uppercase labels.

### Advertising-direct mode

This is Got Soap?’s default prose mode.

- Use active voice.
- Prefer short declarative sentences.
- Use one to three sentences per block in most campaign contexts.
- Default measure is approximately `45–58ch`.
- Align left.
- Do not center body paragraphs.
- Do not add ornamental line breaks.
- Do not convert ordinary prose into scattered two-word manifesto fragments.
- Do not use faux-poetic fragmentation unless the approved copy already requires it.
- Use a readable Regular or Medium weight, determined by browser proof.
- Body copy should feel direct, confident, and advertising-led rather than precious.

### Editorial-confession mode

This is a controlled exception.

- Use no more than one substantial confession passage per route.
- Default measure is approximately `28–40ch`.
- Use sentence case.
- Prefer Regular or a true italic.
- Align left or place deliberately off-axis.
- Do not center it as poetry.
- Do not turn it into an essay.
- Do not use confession voice inside controls, validation, consent, loading, or transactional states.
- Claude may not choose confession mode merely because a narrow column “looks editorial.”

### Weight discipline

Until browser proofs are approved:

- Regular or Medium are the body candidates.
- Semibold or Bold may support short editorial emphasis.
- Black is reserved for rare, large-scale moments.
- Italics indicate genuine tonal emphasis rather than decoration.
- Do not load every available weight and style by default.

---

## 2.3 Moxie Twist — selective seduction

### Purpose

Moxie Twist is a rare expressive interruption. It slips between the public campaign command and the editorial sell.

Its function is specific:

> The campaign briefly lowers its voice.

### Approved uses

- one intimate invitation;
- one oversized confession;
- selected Unholy or Redemption language;
- a rare Smoke / Chrome moment;
- one emotionally charged transition;
- an occasional Shop proposition;
- one carefully chosen About line;
- expressive framing immediately before a functional action.

Moxie Twist may author the proposition surrounding an action. It should not normally author the control itself.

Example structure:

```text
[Moxie Twist]
Take the pledge.

[Marlin Sans SQ control]
Sign Form CW-1
```

### Prohibited uses

- global navigation;
- ordinary button labels;
- every primary CTA;
- paragraphs;
- form fields;
- field labels;
- consent;
- quiz answers;
- prices;
- specifications;
- error copy;
- loading states;
- legal copy;
- metadata;
- repeated section headings;
- decorative filler.

### Hard usage limits

- Maximum one Moxie event per major route.
- Zero Moxie is preferable to unjustified Moxie.
- Use approximately two to twelve words.
- Ordinarily use no more than two lines.
- Minimum practical size is approximately `28–32px`; larger is preferred.
- Use sentence case or carefully selected title case.
- Do not broadly track it.
- Do not add chrome, gold, glow, bevel, or shadow by default.
- Do not pair it with Art Deco borders, fan motifs, Gatsby references, cocktail-lounge ornament, boutique-hotel styling, or wedding-editorial decoration.
- Claude may not introduce it merely to make an otherwise generic section appear custom.

---

## 2.4 Marlin Sans SQ — interface operation

### Canonical family

Use **Marlin Sans SQ by FontMesa**.

Do not substitute:

- standard Marlin Sans;
- Marlin Soft;
- the unrelated Envato MARLIN display face;
- a similarly named Marlin family;
- a generic grotesk approximation.

### Purpose

Marlin Sans SQ carries the visitor-facing machinery of the site. It provides a clean, precise functional spine without becoming a default UI font.

> The expressive families perform the campaign. Marlin keeps the campaign functioning.

### Approved uses

- desktop navigation;
- mobile navigation;
- button labels;
- form labels;
- input text;
- accessibility-critical form instructions;
- consent language;
- validation and error messages;
- Sniff Test questions;
- Sniff Test answer controls;
- progress indicators;
- share controls;
- copy-link controls;
- download controls;
- Broadcast controls and statuses;
- loading and completion language;
- prices when effortless readability or numeric alignment is required;
- availability language;
- Supply Index;
- legal links;
- long or punctuation-heavy technical strings;
- email addresses;
- accessibility-critical microcopy;
- paragraphs of fine print;
- functional metadata.

### Initial approved weights

- **Book:** longer utility copy, consent, functional explanations, and legal copy where appropriate.
- **Medium:** navigation, buttons, labels, answer controls, and ordinary interface language.
- **Bold:** selected active states, prices, short status emphasis, and prominent functional controls.
- **SQ Slant Medium:** not active by default; may be approved later for a specific production annotation that should not borrow Behind The Nineties italic.

Do not expose the complete family to implementation and ask the agent to choose.

### Prohibited uses

- `got soap?` wordmark;
- hero commands;
- primary route-opening propositions;
- PSA names;
- large Shop product performances;
- emotional confession passages;
- sensual narrative body copy;
- decorative pull quotations;
- display territory already owned by Oswald, Behind The Nineties, or Moxie Twist.

### Glyph and feature discipline

- The default Marlin Sans SQ glyph set is canonical.
- Do not mix standard Marlin and SQ punctuation.
- Do not select alternate `a`, `g`, `y`, numeral, or punctuation forms by route.
- Do not activate discretionary ligatures globally.
- Stylistic alternates require individual owner approval and a recorded identity reason.
- One punctuation logic and one approved glyph system must remain consistent across the site.

---

## 2.5 Moanslight — campaign-production notation

### Purpose

Moanslight carries authored campaign-production notation: the voice of the people numbering, formatting, cataloguing, specifying, and releasing the campaign.

It is not a second utility family.

> Marlin says: use this interface.  
> Moanslight says: this campaign object has been produced, numbered, formatted, and released.

### Approved uses

- campaign spot numbers;
- poster editions;
- release numbers;
- PSA folios;
- image dimensions;
- file formats;
- runtimes;
- broadcast specifications;
- Shop supply numbers;
- garment specifications;
- product specification lines;
- collection or campaign-season labels;
- issue numbers;
- artifact dates;
- master-file terminology;
- short campaign credits;
- controlled prices when alignment and extended reading are not required;
- concise production annotations.

Example structures:

```text
CAMPAIGN SPOT 03 / UNHOLY
EDITION 01 · 2400 × 3000 PX
JPG / RGB / 8.4 MB
```

```text
BROADCAST 01
RUN TIME 00:00:30
MASTER 4K UHD · 23.976 FPS
```

### Prohibited uses

- navigation;
- buttons;
- forms;
- quiz controls;
- body copy;
- display headlines;
- CTA framing;
- product names;
- error messages;
- loading states;
- paragraphs;
- dense legal copy;
- long instructions;
- accessibility-critical microcopy;
- long or punctuation-heavy technical explanations.

### Size and readability law

- `11px` is the absolute minimum for approved production notation.
- `12–13px` is preferred.
- `10px` may be used only for nonessential production atmosphere after actual device, contrast, and distance testing.
- Essential content must never be reduced to 10px for fashion-editorial authenticity.
- When effortless reading outranks atmosphere, use Marlin Sans SQ instead.

### Initial approved weights

- **Medium:** standard production metadata, dimensions, dates, release information, specifications, and selected prices.
- **Semibold:** production labels, campaign folios, issue identifiers, and short metadata headings.
- **Regular:** not active by default; approve only if browser proof demonstrates sufficient small-size legibility.

Thin, Extra Light, Light, and Bold are not approved merely because the family contains them.

### Case and tracking discipline

- Uppercase is permitted for short production labels and folios.
- Moderate tracking may be used, approximately `0.06em–0.11em`.
- Reduce tracking for numeral-heavy and punctuation-heavy strings.
- Use sentence or title case for text longer than one concise line.
- Never broadly track lowercase.
- Do not use tracking to compensate for an undersized font.
- Keep most uses to one to three short lines.

### Numeric-feature discipline

- Do not assume tabular numerals are supported.
- Test the actual licensed files before using `font-variant-numeric: tabular-nums`.
- Use Marlin Sans SQ wherever aligned prices, runtimes, dimensions, or data columns require dependable numeric behavior.

### Glyph discipline

- The default Moanslight glyph set is canonical.
- Alternates require individual owner review.
- Do not activate alternates globally or vary glyph choices by route.

---

# 3. Typographic interaction law

## 3.1 Hierarchy of voices

| Family | Role |
|---|---|
| Oswald | command |
| Behind The Nineties | persuasion |
| Moxie Twist | seduction |
| Marlin Sans SQ | operation |
| Moanslight | production notation |

## 3.2 No typographic pileups

No immediate composition may give all expressive families equal weight.

A viewport should ordinarily use one of these relationships:

- Oswald + Behind The Nineties;
- Oswald + Moxie Twist;
- Behind The Nineties + Marlin Sans SQ;
- Oswald + Marlin Sans SQ;
- Behind The Nineties + Moanslight;
- Oswald + Moanslight.

Moxie Twist and Behind The Nineties may coexist only when one clearly dominates and Moxie remains a single concise interruption.

## 3.3 Functional interiors

Within forms, quiz controls, purchase controls, legal navigation, loading states, and validation:

- Marlin Sans SQ dominates;
- Moxie Twist is prohibited;
- decorative effects are prohibited;
- Oswald is limited to rare framing copy outside the control itself;
- Behind The Nineties may introduce the interaction but does not replace functional labels;
- Moanslight may label a campaign artifact but does not carry the interaction.

The campaign fantasy frames the utility. It does not invade it.

## 3.4 Decorative effects

Forms, navigation, quiz controls, purchase controls, error states, consent language, loading states, and functional feedback always use flat typography.

Do not use:

- chrome form labels;
- glowing answers;
- embossed controls;
- gold validation messages;
- beveled navigation;
- fragrance-style errors;
- display effects to conceal weak hierarchy.

---

# 4. Font loading and licensing

- Self-host only properly licensed webfont files.
- Record the foundry, license type, licensed domain scope, purchased styles, and renewal restrictions in a private production record.
- Do not commit license documents or purchased font binaries to a public repository unless the license explicitly permits it.
- Do not expose unused font files.
- Load only approved styles and weights.
- Subset only when the license permits it and the resulting files retain all required punctuation, numerals, symbols, and language support.
- Define resilient fallbacks that preserve category and readability but do not pretend to reproduce the canonical identity.
- A fallback is a failure mode, not an approved visual substitute.

---

# 5. Pending typography decisions

The following remain **UNLOCKED** and must not be inferred by Claude:

- exact responsive type scale;
- exact weight allocation by token;
- line-height values;
- tracking values beyond the preliminary Moanslight rule;
- text measure tokens;
- display crop percentages and safe zones;
- optical adjustments by register;
- breakpoint-specific recomposition;
- font-loading strategy and fallbacks;
- exact OpenType feature settings;
- production proof acceptance thresholds.

These will be added through the next owner interview.

---

# 6. Remaining UI-system structure

The following sections are intentionally scaffolded and await owner decisions. Existing higher-level design rules remain binding in the meantime.

## 6.1 Color tokens and register discipline

**Status:** pending detailed interview.

To define:

- exact tokens and aliases;
- action versus material color;
- register-specific combinations;
- text-on-image contrast behavior;
- hover, focus, error, success, and disabled colors;
- high-contrast mode behavior.

## 6.2 Grid, spacing, and composition tokens

**Status:** pending detailed interview.

To define:

- spacing scale;
- container widths;
- prose measures;
- grid tracks;
- gutters;
- edge offsets;
- route-opening crop rules;
- overlap safety rules;
- mobile recomposition.

## 6.3 Surfaces, borders, corners, and shadows

**Status:** pending detailed interview.

To define:

- radius law;
- border and rule weights;
- shadow categories;
- register-specific surface behavior;
- prohibited generic card surfaces.

## 6.4 Motion and transition system

**Status:** pending detailed interview.

To define:

- duration tokens;
- easing curves;
- route transitions;
- register transitions;
- hover and focus feedback;
- poster reveals;
- Shop attempted-purchase state;
- Sniff Test transitions;
- reduced-motion equivalents.

## 6.5 Interaction-state matrix

**Status:** pending detailed interview.

To define complete visual and behavioral states for:

- navigation;
- links;
- buttons;
- forms;
- pledge;
- Sniff Test;
- share and copy;
- downloads;
- Shop unavailability;
- Broadcast media;
- loading and failure;
- 404;
- absent external configuration.

## 6.6 Responsive behavior

**Status:** pending detailed interview.

To define:

- breakpoint logic;
- route-specific recomposition;
- mobile type cropping;
- image priority;
- navigation transformation;
- functional-state preservation;
- reduced-data and reduced-motion behavior.

## 6.7 Accessibility and performance

**Status:** pending detailed interview.

Higher-level WCAG 2.2 AA, keyboard, contrast, reduced-motion, image, and performance requirements remain binding.

## 6.8 Component and route acceptance tests

**Status:** pending detailed interview.

Tests must detect generic implementation even when the code is valid and accessible.

---

# 7. Claude implementation prohibition

Until a section is locked in this file, Claude may not:

- choose replacement typefaces;
- simplify the five-family cast;
- merge roles for convenience;
- introduce a sixth family;
- use a generic design-system type scale;
- select weights from habit;
- invent animation defaults;
- create rounded cards or pill controls;
- infer visual states from framework defaults;
- substitute common Google Fonts;
- treat the typography system as optional art direction.

When information is pending, Claude must preserve the current implementation or stop and request the missing owner decision. It may not fill the gap with “industry-standard” defaults.

---

# 8. Decision log

## 2026-07-29 — first typography lock

Approved:

- Oswald as campaign command;
- Behind The Nineties as editorial persuasion and principal narrative voice;
- Moxie Twist as a tightly controlled seductive interruption;
- Marlin Sans SQ by FontMesa as interface operation;
- Moanslight as campaign-production notation;
- removal of Jost, Libre Franklin, and Montserrat from the target typography system;
- separation of interface operation from campaign-production notation;
- strong Moxie usage restrictions;
- aggressive display cropping only at selected hero and route-opening moments;
- title-case navigation;
- advertising-direct prose as the default;
- editorial-confession prose as a selective exception;
- flat typography inside functional interactions.
