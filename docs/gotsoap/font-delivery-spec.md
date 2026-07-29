# Got Soap? font delivery and browser-proof specification

**Status:** active working authority; delivery policy locked, repository asset audit recorded, two asset issues pending owner resolution  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `typography-spec.md`, `letter-spacing-spec.md`, `responsive-typography-spec.md`, `ui-system.md`, `../design.md`, and `../HANDOFF.md`  
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file governs how the curated Got Soap? typography package is licensed, named, declared, loaded, substituted, tested, and released.

Font loading is part of the art direction. The implementation must protect the opening command, intended line breaks, body readability, interface stability, punctuation identity, and separation between the five approved typographic voices.

---

# 1. Canonical cast

- **Oswald commands.**
- **Behind The Nineties persuades.**
- **Moxie Twist seduces.**
- **Marlin Sans SQ operates.**
- **Moanslight records and releases the campaign.**

No asset may be substituted merely because another family is easier to load or already present in the project.

---

# 2. Current repository asset inventory

The following WOFF2 assets were found under `site/public/fonts/`.

## 2.1 Oswald

- `oswald-500.woff2`
- `oswald-600.woff2`
- `oswald-700.woff2`

**Status:** satisfies the locked Oswald weight allocation.

## 2.2 Behind The Nineties files currently present

- `Behind-The-Nineties-Sans-Rg.woff2`
- `Behind-The-Nineties-Sans-It.woff2`
- `Behind-The-Nineties-Sans-Md.woff2`
- `Behind-The-Nineties-Sans-Md-It.woff2`
- `Behind-The-Nineties-Sans-Smbd.woff2`
- `Behind-The-Nineties-Sans-Smbd-It.woff2`
- `Behind-The-Nineties-Sans-Bd.woff2`
- `Behind-The-Nineties-Sans-Bd-It.woff2`
- `Behind-The-Nineties-Sans-Xbd.woff2`
- `Behind-The-Nineties-Sans-Xbd-It.woff2`
- `Behind-The-Nineties-Sans-Blk.woff2`
- `Behind-The-Nineties-Sans-Blk-It.woff2`

**Status:** the required Regular, Regular Italic, Medium, Semibold, and Black styles appear to be represented by filename.

**Pending identity confirmation:** the committed files are explicitly named **Behind The Nineties Sans**, while the current creative documentation uses the shorter name **Behind The Nineties**. Implementation may not silently treat those names as interchangeable. The owner must confirm that the Sans family is the selected canonical face before the internal family name is locked.

## 2.3 Moxie Twist

- `Moxie Twist.woff2`

**Status:** satisfies the approved single-native-style role.

## 2.4 Moanslight

- `Moanslight-Thin.woff2`
- `Moanslight-Extralight.woff2`
- `Moanslight-Light.woff2`
- `Moanslight-Regular.woff2`
- `Moanslight-Medium.woff2`
- `Moanslight-Semibold.woff2`
- `Moanslight-Bold.woff2`

**Status:** the approved Medium and Semibold files are present.

Thin, Extra Light, Light, Regular, and Bold remain prohibited from production use unless a later owner decision assigns a specific role. Presence in the directory is not permission to load them.

## 2.5 Marlin Sans SQ

- `marlin-sans-sq-regular.woff2`

**Status:** does **not yet satisfy** the locked Marlin weight allocation by filename.

The approved system requires:

- Book for utility and longer functional copy;
- Medium for navigation, controls, labels, and answers;
- Bold for selected active-state emphasis.

A file named only `regular` may not be declared as Book, Medium, and Bold. Synthetic weight is prohibited. Before implementation, one of the following must occur:

1. the file is proven through font metadata to be a variable font containing the required weight axis and ranges; or
2. the correct Book, Medium, and Bold WOFF2 files are added; or
3. the owner explicitly revises the locked weight allocation after visual proof.

Claude may not choose option 3 for convenience.

---

# 3. Asset authority and licensing gate

The repository currently contains commercial-looking WOFF2 assets in a publicly accessible project path.

Possession of a desktop font file or desktop license does not automatically prove permission to:

- convert it to WOFF2;
- embed it on a website;
- commit it to a public source repository;
- permit unrestricted third-party download;
- subset or rename it;
- use it across multiple domains or projects.

Before launch, maintain a private license record for every commercial family containing:

- foundry and marketplace;
- purchase date;
- exact product/family name;
- license type;
- permitted domain or project scope;
- page-view tier where applicable;
- web embedding permission;
- WOFF2 conversion permission;
- subsetting permission;
- public-repository distribution permission;
- renewal or upgrade requirements.

If public-repository distribution is not explicitly permitted, the font assets must be removed from public Git history and delivered through an approved private build or deployment channel. Adding a `.gitignore` rule after committing the files is not sufficient because earlier Git objects remain downloadable.

This document records a production gate, not a legal conclusion. The license text or foundry confirmation is the source of truth.

---

# 4. Canonical internal family names

Use project-specific internal CSS family names to avoid collisions with local desktop installs or similarly named families:

```css
"Got Soap Oswald"
"Got Soap Behind The Nineties" /* final name pending Sans confirmation */
"Got Soap Moxie"
"Got Soap Marlin SQ"
"Got Soap Moanslight"
```

Do not use one internal family name for multiple unrelated source families.

Do not allow `local()` sources for the canonical campaign faces. Local desktop installations may be a different version, contain different metrics, or expose different glyphs and OpenType behavior.

---

# 5. Font-file declaration policy

Use explicit static-face declarations unless a file is proven through metadata to be variable.

Example:

```css
@font-face {
  font-family: "Got Soap Oswald";
  src: url("/fonts/oswald-600.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}
```

Do not declare a broad range such as `font-weight: 100 900` for a static file.

Do not use synthetic weight or style:

```css
html {
  font-synthesis: none;
}
```

---

# 6. Critical loading architecture

## 6.1 Global critical preload set

Ordinarily preload no more than:

1. Oswald 600;
2. Behind The Nineties Medium, after canonical-family confirmation;
3. Marlin Sans SQ Medium, after the correct asset is available or variable status is proven.

These three establish the opening campaign hierarchy, principal prose, navigation, and primary controls.

## 6.2 Important but non-preloaded global face

Marlin Sans SQ Book should be declared globally for utility, consent, instructions, and longer functional copy, but should not be preloaded by default.

## 6.3 Route-specific loading

Load additional faces only where the route genuinely uses them:

| Face | Load condition |
|---|---|
| Oswald 500 | route contains internal campaign commands |
| Oswald 700 | explicitly approved flagship event |
| Behind The Nineties Semibold | editorial-major proposition exists |
| Behind The Nineties Regular | direct confession exists |
| Behind The Nineties Italic | confession or pull quotation exists |
| Behind The Nineties Black | owner-approved rare display event |
| Moxie Twist | route contains the single approved Moxie event |
| Marlin Sans SQ Bold | selected functional emphasis requires it |
| Moanslight Medium | production notation exists |
| Moanslight Semibold | campaign folio or production label exists |

A secondary face may be preloaded only when it materially controls an above-the-fold opening composition.

The ordinary preload ceiling is three files. A fourth requires a documented route-opening reason.

## 6.4 Prohibited loading behavior

Do not:

- preload every family or weight;
- load unused weights because they are present in the directory;
- load both standard Marlin and Marlin Sans SQ;
- mix externally hosted and self-hosted versions of the same family;
- use CSS `@import` for font delivery;
- place font binaries inside JavaScript bundles;
- hide the entire page until fonts load;
- use a typographic loading animation to conceal delivery.

---

# 7. `font-display` policy

## 7.1 Essential faces: `swap`

Use `font-display: swap` for:

- Oswald 500 and 600;
- Behind The Nineties Medium and Semibold;
- Marlin Sans SQ Book, Medium, and Bold.

## 7.2 Expressive or uncommon faces: `fallback`

Use `font-display: fallback` for:

- Oswald 700;
- Moxie Twist;
- Behind The Nineties Black;
- Behind The Nineties Regular Italic;
- Moanslight Medium and Semibold.

When an expressive face materially controls the opening composition, preload it on that route.

## 7.3 Prohibited values and concealment

Do not use:

- `font-display: block`;
- `font-display: optional`;
- invisible-text opacity tricks;
- JavaScript page hiding;
- route delays waiting for all five families.

---

# 8. Fallback architecture

Fallbacks are structural emergency substitutes, not approved aesthetic alternatives.

## 8.1 Oswald

```css
font-family:
  "Got Soap Oswald",
  "Arial Narrow",
  "Aptos Narrow",
  "Helvetica Neue Condensed",
  Arial,
  sans-serif;
```

Do not use Impact.

## 8.2 Behind The Nineties

Pending confirmation of the actual Sans family identity and metrics, do not finalize this fallback stack from category assumptions.

The fallback must be selected and metric-adjusted against the actual committed file. Claude may not apply a serif fallback to a Sans asset merely because earlier shorthand documentation omitted the word “Sans.”

## 8.3 Moxie Twist

```css
font-family:
  "Got Soap Moxie",
  Didot,
  "Bodoni MT",
  Georgia,
  serif;
```

Do not substitute script, wedding, or generic Art Deco fonts.

## 8.4 Marlin Sans SQ

```css
font-family:
  "Got Soap Marlin SQ",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

## 8.5 Moanslight

```css
font-family:
  "Got Soap Moanslight",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

---

# 9. Metric-adjusted fallback requirement

Fallback aliases must eventually be tuned against the actual production WOFF2 files using:

```css
size-adjust:
ascent-override:
descent-override:
line-gap-override:
```

Exact percentages may not be guessed.

They must come from measurement of the final assets and proof with actual campaign copy.

After a font swap:

- hero and route line counts must remain stable;
- navigation must not wrap;
- button width must not materially change;
- labels must not jump to another line;
- standard body paragraphs may not gain or lose multiple lines;
- controls may not move beneath the visitor’s pointer;
- image overlap must remain intentional.

---

# 10. OpenType feature policy

Global defaults:

```css
html {
  font-kerning: normal;
  font-synthesis: none;
  font-optical-sizing: auto;
}
```

Use standard common ligatures only where the face supplies them naturally.

Do not globally enable:

- discretionary or historical ligatures;
- swashes;
- stylistic alternates;
- small caps;
- oldstyle figures;
- slashed zero;
- alternate punctuation.

## 10.1 Oswald

- default glyph set;
- normal kerning;
- lining numerals;
- no discretionary ligatures;
- no global stylistic alternates;
- wordmark optical correction isolated to the approved lockup.

## 10.2 Behind The Nineties

- common ligatures permitted;
- contextual behavior remains at the font default;
- discretionary ligatures off;
- default numerals;
- no automatic oldstyle figures;
- no swashes in body copy;
- no route-specific alternate terminals.

## 10.3 Moxie Twist

- default glyph set only;
- no decorative alternate chosen merely because it exists;
- no route-specific flourish;
- one canonical appearance across the site.

## 10.4 Marlin Sans SQ

- SQ punctuation remains canonical;
- no mixing with standard Marlin glyphs;
- proportional numerals by default;
- tabular numerals only after actual support is verified;
- no global stylistic set;
- no discretionary ligatures in controls;
- no synthetic small caps.

## 10.5 Moanslight

- default glyph set;
- proportional numerals by default;
- tabular numerals only after support is verified;
- no route-specific alternate letters;
- no discretionary ligatures in production strings;
- no feature that reduces small-size clarity.

---

# 11. Required glyph audit

Test every deployed face with actual campaign characters:

```text
got soap?

“Clean is not a personality. It is the minimum.”
DON’T MAKE HER ASK TWICE.

CAMPAIGN SPOT 03 / UNHOLY
EDITION 01 · 2400 × 3000 PX
RUN TIME 00:00:30
MASTER 4K UHD · 23.976 FPS

$38.00
1-800-GOT-SOAP
Form CW-1
PSA No. 04
© 2026 Hope2 Studio
Stacey M. Breckel

& ? ! % / \ + – — … ' ’ “ ”
0 1 2 3 4 5 6 7 8 9
× · • # @ ™ ®
```

Also test accented Latin characters, curly and straight punctuation, en and em dashes, multiplication sign, bullet, middle dot, ellipsis, currency, copyright, trademark, registered mark, filenames, email addresses, and the wordmark question mark.

A missing or broken glyph is a release blocker.

---

# 12. Browser-proof matrix

Test at minimum:

- Chrome on Windows;
- Edge on Windows;
- Firefox on Windows or macOS;
- Safari on macOS;
- Safari on iPhone;
- Chrome on Android.

Proof at:

- `320px`;
- `360px`;
- `390px`;
- `430px`;
- `768px`;
- `1024px`;
- `1280px`;
- `1440px`;
- `1920px`.

Also test:

- 100%, 125%, 150%, and 200% zoom;
- Windows display scaling where available;
- enlarged browser default text;
- forced-colors/high-contrast mode;
- reduced motion;
- narrow landscape mobile;
- cold and warm cache;
- throttled delivery;
- delayed, blocked, 404, and incorrect-MIME font responses;
- all custom fonts blocked.

---

# 13. Acceptance thresholds

## Display

- hero and route line counts remain stable after swap;
- no maximum scale is exceeded;
- no unintended clipping;
- approved crop boundaries remain intact;
- punctuation stays visible;
- fallback and loaded states communicate the phrase immediately;
- wordmark remains stable.

## Body

- Behind The Nineties Medium retains detail at `16–20px`;
- paragraph measure remains approved;
- a standard paragraph changes by no more than one line after swap;
- no overlap;
- italics remain distinct;
- Regular never replaces Medium for standard body.

## Interface

- navigation does not wrap unexpectedly;
- controls remain inside containers;
- labels stay readable;
- fields do not materially resize after load;
- focus indicators remain aligned;
- button text never clips;
- SQ punctuation remains consistent;
- fallback is fully usable.

## Production notation

- Moanslight is legible at `12–13px`;
- `10–11px` atmosphere remains nonessential and desktop-only;
- figures and punctuation remain distinct;
- no horizontal scrolling;
- strings that exceed Moanslight’s role move to Marlin.

## Delivery

- no essential text becomes invisible;
- no route waits for every family;
- no unused weight downloads initially;
- no major compositional jump occurs after swap;
- no unapproved third-party font request occurs;
- font failure degrades to readable structure.

---

# 14. Performance budget

- target initial font transfer: `≤ 200 KB`;
- mandatory review threshold: `> 250 KB`;
- ordinary route file count before interaction: maximum `5`;
- ordinary preload count: maximum `3`;
- rare documented preload exception: maximum `4`;
- no route loads every approved face and weight.

Subsetting is permitted only after license verification, glyph audit, punctuation audit, actual-copy proof, and confirmation that future campaign copy will not require removed characters.

---

# 15. Remaining asset-dependent measurements

The following must be derived from the actual final WOFF2 assets and may not be fabricated:

- exact file sizes and transfer total;
- internal family and subfamily metadata;
- exact weight class of each file;
- variable-font status and axis ranges;
- `size-adjust` values;
- ascent, descent, and line-gap overrides;
- tabular-numeral support;
- optical-sizing support;
- glyph coverage;
- OpenType feature tables;
- subsetting permission;
- public-repository distribution permission.

---

# 16. Decision log

## 2026-07-29 — delivery policy lock and repository audit

Approved and recorded:

- WOFF2 self-hosting;
- project-specific internal family names;
- explicit static-face declarations unless variable status is proven;
- three-file critical preload ceiling;
- route-specific secondary loading;
- `swap` for essential faces;
- `fallback` for expressive and rare faces;
- conservative OpenType defaults;
- metric-adjusted fallback requirement;
- glyph and browser-proof gates;
- `200 KB` target and `250 KB` mandatory-review threshold;
- prohibition against loading unused weights;
- current repository font inventory;
- Behind The Nineties Sans naming confirmation as pending;
- Marlin Sans SQ weight-file deficiency as pending;
- licensing and public-repository distribution verification as a release gate.
