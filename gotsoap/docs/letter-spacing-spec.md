# Got Soap? letter-spacing and kerning specification

**Status:** active working authority; tracking and kerning system locked  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `typography-spec.md`, `ui-system.md`, `design.md`, and `../../docs/HANDOFF.md`
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file is part of the canonical Got Soap? typography package. It records the owner-approved tracking, kerning, and font-synthesis rules that were previously listed as pending in `typography-spec.md`.

Where this file assigns a tracking or kerning value, it is binding and supersedes any provisional or generic framework value.

---

# 1. Governing principle

Tracking must be restrained. The selected typefaces already carry distinct personalities; implementation must not art-direct those personalities out of them by widely spacing everything or applying one universal tracking rule.

Binding laws:

- Oswald receives controlled compression at monumental scale.
- Behind The Nineties remains close to its native spacing.
- Moxie Twist remains at native spacing.
- Marlin Sans SQ stays crisp and operational rather than visibly tracked.
- Moanslight uses deliberate positive tracking as part of its campaign-production voice.
- Tracking may never be used to force copy into an unsuitable container.
- Lowercase body text is never broadly tracked.
- Each token retains its role-specific value across routes.

---

# 2. Canonical tracking map

| Token or use | Desktop | Mobile |
|---|---:|---:|
| `type-command-hero` | `-0.025em` | `-0.015em` |
| `type-command-route` | `-0.020em` | `-0.010em` |
| `type-command-section` | `-0.010em` | `0em` |
| `type-identity` | `-0.015em` | `-0.005em` |
| Oswald rare `700` emphasis | `-0.025em` | `-0.015em` |
| `type-whisper` | `0em` | `0em` |
| `type-editorial-major` | `-0.010em` | `-0.005em` |
| `type-confession` | `0em` | `0em` |
| `type-body-large` | `-0.005em` | `0em` |
| `type-body` | `0em` | `0em` |
| `type-control` | `0.010em` | `0.010em` |
| `type-utility` | `0em` | `0em` |
| `type-micro` | `0.010em` | `0.010em` |
| Moanslight standard notation | `0.040em` | `0.030em` |
| Moanslight label or folio | `0.080em` | `0.060em` |
| Moanslight numeric-heavy string | `0.020em` | `0.015em` |
| Moanslight production atmosphere | `0.070em` | omitted |

---

# 3. Oswald tracking law

The largest Oswald commands tighten slightly because their scale magnifies natural inter-character space. Tracking becomes less negative as the type gets smaller and as mobile line wrapping becomes more likely.

Rules:

- Never tighten Oswald below `-0.03em`.
- Do not apply hero tracking to ordinary small headings.
- Two-line commands use one consistent token value across both lines.
- Uppercase does not automatically receive positive tracking.
- Do not use per-character inline spans for casual optical correction.
- A documented, owner-approved lockup may receive manual optical adjustment; ordinary route copy may not.
- Copy or container width must be recomposed rather than using more negative tracking to force a fit.

## 3.1 Wordmark exception

The lowercase `got soap?` wordmark is a custom visual lockup, not ordinary Oswald text.

Its final spacing must be proofed as a complete mark. It does not automatically inherit `type-command-hero` tracking, and Claude may not assume that a generic token produces the canonical wordmark.

---

# 4. Behind The Nineties tracking law

Behind The Nineties remains primarily at native spacing.

The small negative values used at editorial-major and body-large scales compensate only for enlargement; they are not a fashion-editorial effect.

Rules:

- Standard body remains `0em`.
- Confession and italic passages remain `0em`.
- Never broadly track Behind The Nineties body copy.
- Never track lowercase copy to imitate fashion-magazine typography.
- Do not tighten Medium body text merely because a paragraph appears dense.
- Solve excessive density through measure, copy length, spacing, or composition.
- Do not use tracking changes as arbitrary section styling.

---

# 5. Moxie Twist tracking law

Moxie Twist remains at `0em` on desktop and mobile.

Its personality comes from its native letterforms. Added spacing would push it toward boutique branding, wedding editorial, cocktail-lounge retro, or decorative luxury packaging.

Prohibited:

- negative tracking to make Moxie feel more seductive;
- positive tracking to make it feel more premium;
- per-line tracking changes;
- manual character spacing;
- tracking used to turn Moxie into a logo substitute.

---

# 6. Marlin Sans SQ tracking law

Marlin should feel crisp rather than visibly spaced.

## 6.1 Controls

Use `0.010em` for:

- title-case navigation;
- button labels;
- quiz answer controls;
- compact primary controls.

This is a subtle precision adjustment, not a conspicuous uppercase-label style.

## 6.2 Utility

Use `0em` for:

- instructions;
- consent;
- validation;
- errors;
- status messages;
- form explanations;
- longer functional copy.

## 6.3 Microcopy

Use `0.010em` for approved essential microcopy when it improves clarity at small sizes.

Do not increase tracking to compensate for a weight or size that is too light.

## 6.4 Rare uppercase utility exception

A rare short uppercase functional label may use `0.050em–0.060em`.

Rules:

- uppercase utility labels remain uncommon;
- field labels and navigation do not automatically convert to tracked capitals;
- the exception is for concise operational labels, not paragraphs or repeated interface chrome.

---

# 7. Moanslight tracking law

Moanslight is the one family where tracking visibly contributes to the production voice.

## 7.1 Standard notation

Use `0.040em` desktop and `0.030em` mobile for concise production lines such as:

```text
EDITION 01 · 2400 × 3000 PX
```

## 7.2 Labels and folios

Use `0.080em` desktop and `0.060em` mobile for concise labels such as:

```text
CAMPAIGN SPOT 03
BROADCAST 01
SUPPLY NO. GS-04
```

## 7.3 Numeric-heavy strings

Use `0.020em` desktop and `0.015em` mobile for:

- dimensions;
- runtimes;
- prices;
- punctuation-heavy strings;
- technical values.

## 7.4 Production atmosphere

Use `0.070em` for owner-approved, nonessential desktop production atmosphere. This token is omitted by default on mobile.

## 7.5 Hard limits

- Moanslight may never exceed `0.11em`.
- Most uses should remain well below the ceiling.
- Never broadly track lowercase Moanslight.
- Text longer than one concise line returns to sentence/title case and `0em–0.02em`, or moves to Marlin Sans SQ.
- Do not use tracking to compensate for undersized type.
- Do not spread numerals so widely that technical strings become difficult to parse.

---

# 8. Kerning and font-feature defaults

Use the following baseline:

```css
font-kerning: normal;
font-optical-sizing: auto;
font-synthesis: none;
```

Rules:

- `font-optical-sizing: auto` has an effect only where the licensed font supports optical sizing.
- Optical sizing does not replace browser and device proof.
- Native kerning remains active unless an owner-approved lockup requires documented manual intervention.
- Synthetic bold and synthetic italic remain prohibited.
- Do not activate discretionary ligatures or stylistic alternates globally.
- OpenType features that materially change glyph appearance require owner approval and must be documented.

---

# 9. Prohibited implementation behavior

Claude and other implementation agents may not:

- apply one global tracking value to all headings;
- apply one global tracking value to all uppercase text;
- use `text-rendering: geometricPrecision` as a universal font-improvement fix;
- manually track every component;
- change tracking by route for atmosphere;
- apply negative tracking to body copy;
- create custom kerning using dozens of inline character spans;
- use tracking to force a line into a predetermined width;
- widen small text until its legibility deteriorates;
- tighten display copy beyond the approved limits;
- invent a new wordmark spacing from the hero token;
- alter letter spacing during hover, focus, or loading states in a way that causes layout shift.

When copy does not fit, recompose the copy, width, line break, scale within its approved range, or layout. Do not solve the problem by violating the tracking system.

---

# 10. Acceptance tests

The tracking system passes only when:

- monumental Oswald feels dense but remains immediately readable;
- mobile Oswald permits safer wrapping than desktop;
- Behind The Nineties body retains native rhythm and character;
- Moxie Twist appears unmanipulated;
- Marlin controls feel crisp without looking like spaced SaaS labels;
- Moanslight visibly reads as campaign-production notation;
- numeric-heavy Moanslight strings remain easy to parse;
- no essential copy has been squeezed to fit;
- no hover or state change causes tracking-based layout shift;
- the `got soap?` wordmark has been separately proofed as a lockup.

---

# 11. Decision log

## 2026-07-29 — tracking and kerning lock

Approved:

- the complete desktop and mobile tracking map in Section 2;
- controlled negative tracking for large Oswald commands;
- a `-0.03em` hard lower limit for Oswald;
- native or near-native spacing for Behind The Nineties;
- `0em` for Moxie Twist;
- restrained `0.010em` operational spacing for Marlin controls and microcopy;
- `0em` for Marlin utility prose;
- differentiated Moanslight spacing for standard notation, folios, numeric strings, and desktop atmosphere;
- `0.11em` as Moanslight’s absolute ceiling;
- separate proofing of the lowercase `got soap?` wordmark;
- normal kerning, conditional optical sizing, and disabled font synthesis;
- prohibition against using tracking to force copy into an unsuitable composition.
