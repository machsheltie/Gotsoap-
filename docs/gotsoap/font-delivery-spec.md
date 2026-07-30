# Got Soap? font delivery and browser-proof specification

**Status:** active working authority; delivery policy and canonical 14-file production manifest locked; binary and licensing gates recorded
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

## 2.2 Behind The Nineties Sans

Approved production assignments:

- `Behind-The-Nineties-Sans-Md.woff2` — body;
- `Behind-The-Nineties-Sans-Smbd.woff2` — editorial-major;
- `Behind-The-Nineties-Sans-Rg.woff2` — confession;
- `Behind-The-Nineties-Sans-It.woff2` — italic;
- `Behind-The-Nineties-Sans-Blk.woff2` — rare display.

Present but unassigned:

- `Behind-The-Nineties-Sans-Md-It.woff2`;
- `Behind-The-Nineties-Sans-Smbd-It.woff2`;
- `Behind-The-Nineties-Sans-Bd.woff2`;
- `Behind-The-Nineties-Sans-Bd-It.woff2`;
- `Behind-The-Nineties-Sans-Xbd.woff2`;
- `Behind-The-Nineties-Sans-Xbd-It.woff2`;
- `Behind-The-Nineties-Sans-Blk-It.woff2`.

**Status:** the owner has confirmed **Behind The Nineties Sans** as the canonical family name and assigned the five production roles above. The shorter **Behind The Nineties** label is descriptive shorthand only.

Unassigned files are not defective. They are not authorized for CSS declaration or network delivery.

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

- `marlin-sans-sq-book.woff2` — utility and longer functional copy;
- `marlin-sans-sq-medium.woff2` — navigation, controls, labels, and answers;
- `marlin-sans-sq-bold.woff2` — selected active-state emphasis;
- `marlin-sans-sq-regular.woff2` — present but unassigned.

**Status:** Book, Medium, and Bold are assigned approved production roles. Regular remains unassigned and unloaded.

The current assigned binaries still identify themselves as FSP DEMO builds and carry preview/print-only embedding metadata. Correct production binaries and confirmed web-distribution permission remain release gates. Synthetic weight is prohibited.

## 2.6 Canonical production audit manifest

`site/config/font-manifest.json` contains exactly 14 approved production files:

- Oswald: 3;
- Behind The Nineties Sans: 5;
- Moxie Twist: 1;
- Marlin Sans SQ: 3;
- Moanslight: 2.

`npm run audit:fonts` performs full Fontkit inspection only on those assigned files. It separately scans the complete `site/public/fonts/` directory and inventories every other WOFF2 file as unassigned. Unassigned status is not a quality verdict; it means the file has no approved production role and is not authorized for CSS declaration or network delivery.

For every approved binary, the audit records:

| Category | Recorded values |
|---|---|
| Identity | filename, family, subfamily, full name, PostScript name |
| Integrity | byte size, SHA-256, WOFF2 validity |
| Structure | static or variable, outline type, table inventory |
| Weight | declared weight class, expected design role |
| Style | normal or italic metadata, italic angle |
| Metrics | units per em, ascent, descent, line gap, cap height, x-height, bounding box |
| Glyphs | total glyph count and required Unicode coverage |
| OpenType | separate GSUB and GPOS feature tags |
| Numerals | widths for 0–9, proportional or apparently tabular classification |
| Variation | available axes and named instances |
| Delivery | declared preload status, `font-display`, route or global scope |
| Authority | approved, unassigned, or prohibited |

Duplicate-file protection is mandatory. If distinct approved filenames have the same SHA-256, the audit fails and identifies every affected filename, declared weight, and role. Renaming one binary into Book, Medium, and Bold slots does not create three weights.

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
"Got Soap Behind The Nineties Sans"
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
2. Behind The Nineties Sans Medium;
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
| Behind The Nineties Sans Semibold | editorial-major proposition exists |
| Behind The Nineties Sans Regular | direct confession exists |
| Behind The Nineties Sans Italic | confession or pull quotation exists |
| Behind The Nineties Sans Black | owner-approved rare display event |
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

## 6.5 Dependency supply-chain lock

All Got Soap? runtime font files load only from `site/public/fonts/` and are referenced through
root-relative `/fonts/…` URLs. A source font reference that resolves anywhere else is a build
failure. A referenced `/fonts/…` file that is absent from `site/public/fonts/` is also a build
failure.

No dependency whose package name begins with `@fontsource/` may appear in `site/package.json`,
`site/package-lock.json`, or runtime source. The prohibition covers production, development,
optional, and peer dependency sections; overrides and resolutions; lockfile package entries; and
direct source imports. `site/scripts/gates.mjs` enforces the rule as always-live gate **G19**.

An implementation agent may not create an exception for convenience. Reintroduction requires an
explicit owner approval recorded in `docs/HANDOFF.md` and this specification, followed by an
owner-approved gate change in the same implementation. Without that record, G19 remains
zero-tolerance.

---

# 7. `font-display` policy

## 7.1 Essential faces: `swap`

Use `font-display: swap` for:

- Oswald 500 and 600;
- Behind The Nineties Sans Medium and Semibold;
- Marlin Sans SQ Book, Medium, and Bold.

## 7.2 Expressive or uncommon faces: `fallback`

Use `font-display: fallback` for:

- Oswald 700;
- Moxie Twist;
- Behind The Nineties Sans Black;
- Behind The Nineties Sans Regular Italic;
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

## 8.2 Behind The Nineties Sans

Do not finalize this fallback stack from category assumptions; derive any metric overrides from the audited binary and measured fallback behavior.

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

# 9. Metric-adjusted fallback candidates

`npm run audit:fonts` generates candidate values for:

```css
size-adjust:
ascent-override:
descent-override:
line-gap-override:
```

The calculation uses normalized x-height matching:

- `size-adjust` = principal x-height ratio / fallback x-height ratio;
- each metric override = the principal normalized metric / `size-adjust`.

The principal matches are:

| Campaign family | Principal file | Structural fallback candidates |
|---|---|---|
| Oswald | `oswald-600.woff2` | Arial Narrow, Aptos Narrow |
| Behind The Nineties Sans | `Behind-The-Nineties-Sans-Md.woff2` | Aptos, Arial |
| Moxie Twist | `Moxie Twist.woff2` | Didot, Bodoni MT, Georgia |
| Marlin Sans SQ | `marlin-sans-sq-medium.woff2` | Helvetica Neue, Arial |
| Moanslight | `Moanslight-Medium.woff2` | Helvetica Neue, Arial |

Generated percentages are candidate-only. They are not automatically canonical, approved,
written to CSS, or applied to the browser bundle. A fallback without a reproducible reference
profile remains explicitly unresolved; the audit may not substitute another face to manufacture a
value.

Owner approval requires browser proof of every condition:

- stable line counts;
- stable navigation width;
- stable button dimensions;
- no major paragraph reflow;
- no broken crop;
- no control movement during font swap.

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

## 10.1 Binary-audit contract

`npm run audit:fonts` inventories features; it does not generate CSS, change
`font-feature-settings`, or authorize a detected feature. Every approved file records
`kern`, `liga`, `clig`, `calt`, `dlig`, `tnum`, `pnum`, `onum`,
`lnum`, and `case` with its table location and locked policy. The audit also
inventories:

- stylistic sets matching `ss##`;
- swashes exposed through `swsh` or `cswh`;
- alternates exposed through `aalt`, `salt`, `nalt`, or `cv##`.

The machine-readable field `automaticallyEnabled` must remain empty. Shaping and
numeral checks are audit probes only. Feature presence is not activation.

The policy comparison is locked as follows:

- `kern`, `liga`, and `clig`: natural defaults may remain;
- `calt`, `dlig`, `onum`, and `case`: locked off;
- `pnum` and `lnum`: preserve the face default;
- `tnum`: permitted only after support is proven;
- stylistic sets, swashes, and alternate glyph systems: locked off.

A present locked-off feature is reported as `present-kept-off`. Feature tags recorded as
expected inventory are not defects and remain disabled. An alternate system not declared as
expected inventory is a review warning; it never becomes permission to enable that system.

## 10.2 Oswald

- default glyph set;
- normal kerning;
- lining numerals;
- no discretionary ligatures;
- no global stylistic alternates;
- wordmark optical correction isolated to the approved lockup.

## 10.3 Behind The Nineties Sans

- common and contextual ligatures may remain natural;
- contextual alternates stay off;
- discretionary ligatures stay off;
- default numerals;
- no automatic oldstyle figures;
- no swashes in body copy;
- no route-specific alternate terminals.

## 10.4 Moxie Twist

- default glyph set only;
- no decorative alternate chosen merely because it exists;
- no route-specific flourish;
- one canonical appearance across the site.

## 10.5 Marlin Sans SQ

- SQ punctuation remains canonical;
- no mixing with standard Marlin glyphs;
- proportional numerals by default;
- tabular numerals only after actual support is verified;
- no global stylistic set;
- no discretionary ligatures in controls;
- no synthetic small caps.

## 10.6 Moanslight

- default glyph set;
- proportional numerals by default;
- tabular numerals only after support is verified;
- detected `aalt`, `salt`, and `ss01` features stay off;
- no route-specific or decorative alternate letters;
- no discretionary ligatures in production strings;
- no feature that reduces small-size clarity.

---

# 11. Shared glyph capability audit

Test every approved face with the shared campaign specimen:

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

The audit separately reports missing curly quotations, apostrophes, en and em dashes, ellipsis, multiplication sign, middle dot, currency symbols, copyright and trademark marks, accented Latin characters, and the question mark used in the wordmark.

A missing glyph does not automatically invalidate every use of a face. It does mean that face cannot be assigned copy requiring the missing character without an approved repair.

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

- Behind The Nineties Sans Medium retains detail at `16–20px`;
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

The audit uses decimal byte thresholds for the locked three-file critical preload set:

- target: `≤ 200,000 bytes`;
- review warning: `200,001–250,000 bytes`;
- production failure: `> 250,000 bytes`;
- ordinary preload count: maximum `3` files;
- rare documented preload exception: maximum `4` files.

The locked critical set is Oswald 600, Behind The Nineties Sans Medium, and Marlin Sans SQ
Medium. The approved-inventory total is reported separately and is not compared with the critical
preload threshold. The audit also records every approved file's compressed WOFF2 size, likely
per-route transfer, actual source preloads, and the byte cost of unassigned files referenced by CSS
or source. No route may load every approved face and weight.

Subsetting is permitted only after license verification, glyph audit, punctuation audit, actual-copy proof, and confirmation that future campaign copy will not require removed characters.

---

# 15. Automated failure and warning gates

The audit exits nonzero on any hard failure:

- an approved file is missing or is not valid WOFF2;
- two role-specific approved files have identical SHA-256 hashes;
- a face lacks a character explicitly assigned to its approved copy lane;
- binary style metadata contradicts the assigned normal or italic role;
- variable/static declarations contradict the binary without a documented approved exception;
- a static binary is declared with a weight range;
- the critical preload total exceeds 250,000 bytes;
- CSS or source references a prohibited, missing, or unassigned font file;
- synthetic weight or style is enabled;
- an external font host or `local()` source is detected;
- an `@fontsource/*` dependency, lock entry, or source import reappears;
- the actual source preload set differs from the locked critical set.

The audit emits a review warning when:

- metadata weight differs from the assigned CSS weight;
- tabular numeral support is unavailable;
- optical sizing is unavailable;
- cap-height or x-height data is absent;
- recorded browser proof changes a paragraph by more than one line;
- an approved binary contains an unexpected alternate system;
- the critical preload total exceeds 200,000 bytes without exceeding 250,000 bytes;
- an unassigned commercial font remains publicly distributed.

Shared-specimen glyph gaps that are not part of an approved copy lane remain explicit capability
restrictions. They become hard failures only when the manifest assigns the missing character to that
face's copy lane.

---

# 16. Generated audit artifacts

`site/reports/font-audit.json` is the machine-readable source for the generated
`docs/gotsoap/font-binary-audit.md`. Do not maintain the Markdown report by hand.
`npm run audit:fonts` writes both artifacts before returning its final status, including when a
source-policy violation makes the command exit nonzero.

The generated Markdown contains one table per approved family, exact filenames and SHA-256 hashes,
compressed byte sizes, internal names, weight/style metadata, metrics, glyph gaps, OpenType
inventory, variation evidence, delivery policy, transfer totals, route profiles, fallback candidates,
findings, status, audit timestamp, source commit SHA, and working-tree state.

---

# 17. Remaining asset-dependent measurements

The following must be derived from the actual final WOFF2 assets and may not be fabricated:

- exact file sizes and transfer total;
- internal family and subfamily metadata;
- exact weight class of each file;
- variable-font status and axis ranges;
- owner-approved `size-adjust` values after browser proof;
- owner-approved ascent, descent, and line-gap overrides after browser proof;
- tabular-numeral support;
- optical-sizing support;
- glyph coverage;
- OpenType feature tables;
- subsetting permission;
- public-repository distribution permission.

---

# 18. Decision log

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
- inventory-only OpenType reporting for the locked feature set, with no automatic activation;
- Marlin canonical-punctuation and Moanslight no-decorative-alternates family locks;
- metric-adjusted fallback requirement;
- glyph and browser-proof gates;
- `200 KB` target and `250 KB` mandatory-review threshold;
- prohibition against loading unused weights;
- current repository font inventory;
- Behind The Nineties Sans as the confirmed canonical family, with five locked production roles;
- Marlin Sans SQ Book, Medium, and Bold as assigned production files, with Regular unassigned;
- the 14-file canonical audit manifest and non-defective but delivery-prohibited unassigned inventory;
- licensing and public-repository distribution verification as a release gate;
- `site/public/fonts/` as the only runtime font origin for Got Soap?;
- removal of all five legacy `@fontsource/` packages from the manifest and lockfile;
- zero-tolerance rejection of `@fontsource/*` dependencies and source imports by always-live G19;
- explicit owner approval plus a same-change authority and gate update as the only exception path.

## 2026-07-30 — transfer, gate, and generated-report lock

Approved and recorded:

- decimal critical-byte thresholds of 200,000 target and 250,000 production ceiling;
- the exact three-file critical preload set and ordinary/rare preload count ceilings;
- actual source preload and unassigned-reference accounting;
- likely per-route transfer profiles;
- hard failure and review-warning classifications;
- explicit copy-lane glyph requirements separate from shared capability restrictions;
- expected alternate inventories that remain locked off;
- machine-generated Markdown sourced only from the JSON report;
- audit timestamp, source commit SHA, and working-tree provenance.

## 2026-07-30 — fallback metric candidate generation

Approved and recorded:

- x-height-ratio calculation for candidate `size-adjust`;
- adjusted-em-square calculations for candidate ascent, descent, and line-gap overrides;
- the five principal files and their ordered structural fallback candidates;
- traceable stored reference metrics for calculable fallbacks;
- explicit unresolved status when a reproducible fallback profile is unavailable;
- candidate-only authority with no automatic CSS generation or application;
- the six-condition browser-proof checklist required before owner approval.
