# Got Soap? font asset resolution

**Status:** active working authority; previously pending family identity and Marlin weight availability resolved  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `font-delivery-spec.md`, `typography-spec.md`, `letter-spacing-spec.md`, `responsive-typography-spec.md`, and `ui-system.md`  
**Supersedes:** the pending identity and Marlin-availability statements in Sections 2.2, 2.5, 4, 6.1, and 8.2 of `font-delivery-spec.md`

---

# 1. Behind The Nineties Sans is canonical

The owner confirms that **Behind The Nineties Sans** is the exact family selected for Got Soap? and the exact face tested at `17px` and `18px` when Medium was chosen over Regular for standard body copy.

Existing project documentation that uses the shorter phrase **Behind The Nineties** refers to **Behind The Nineties Sans** unless a later owner decision explicitly names another family.

This resolves the earlier naming ambiguity. Implementation must use the committed Sans files and must not substitute another Behind The Nineties product, serif companion, or similarly named family.

## 1.1 Canonical internal CSS family name

Use:

```css
"Got Soap Behind The Nineties Sans"
```

The shorter internal name `"Got Soap Behind The Nineties"` is deprecated before implementation and should not be introduced into production CSS.

## 1.2 Locked required files

The approved typography system uses these Behind The Nineties Sans assets:

- `Behind-The-Nineties-Sans-Md.woff2` — standard body and direct-address lead copy;
- `Behind-The-Nineties-Sans-Smbd.woff2` — editorial-major propositions;
- `Behind-The-Nineties-Sans-Rg.woff2` — direct confession where Regular is intentionally assigned;
- `Behind-The-Nineties-Sans-It.woff2` — confession and pull-quotation italic;
- `Behind-The-Nineties-Sans-Blk.woff2` — rare owner-approved display event only.

Other committed weights remain unloaded unless a later role is explicitly approved.

---

# 2. Marlin Sans SQ weight set is complete

The owner acquired and uploaded the separate static Marlin Sans SQ files required by the locked interface system:

- `marlin-sans-sq-book.woff2`;
- `marlin-sans-sq-medium.woff2`;
- `marlin-sans-sq-bold.woff2`.

The existing file also remains present:

- `marlin-sans-sq-regular.woff2`.

The Book, Medium, and Bold additions resolve the earlier asset gap. Implementation must not map one Regular file onto multiple weights and must not synthesize missing weight.

## 2.1 Canonical role mapping

| File | CSS weight role | Approved use |
|---|---:|---|
| `marlin-sans-sq-book.woff2` | Book | utility copy, consent, instructions, longer functional text, legal and accessibility copy where conditions support it |
| `marlin-sans-sq-medium.woff2` | Medium | navigation, buttons, labels, quiz answers, share/copy/download controls, primary interface language |
| `marlin-sans-sq-bold.woff2` | Bold | selected active states, confirmed prices, short error headings, rare primary functional emphasis |
| `marlin-sans-sq-regular.woff2` | unassigned | not loaded until a later owner decision assigns a distinct role |

The presence of Regular does not create a fourth approved interface weight.

---

# 3. Critical preload set is now asset-complete

The ordinary critical preload set may now be implemented as approved:

1. `oswald-600.woff2`;
2. `Behind-The-Nineties-Sans-Md.woff2`;
3. `marlin-sans-sq-medium.woff2`.

Marlin Sans SQ Book remains globally declared but not preloaded by default.

No more than three font files should ordinarily be preloaded. A fourth remains an explicitly documented route-opening exception.

---

# 4. Exact declaration targets

```css
@font-face {
  font-family: "Got Soap Behind The Nineties Sans";
  src: url("/fonts/Behind-The-Nineties-Sans-Md.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Got Soap Marlin SQ";
  src: url("/fonts/marlin-sans-sq-book.woff2") format("woff2");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Got Soap Marlin SQ";
  src: url("/fonts/marlin-sans-sq-medium.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Got Soap Marlin SQ";
  src: url("/fonts/marlin-sans-sq-bold.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}
```

The numeric CSS weight values above are implementation mappings for static files. They do not rename the design roles Book, Medium, and Bold.

`font-synthesis: none` remains mandatory.

---

# 5. Remaining file-dependent work

The asset-availability questions are closed. The following still require measurement of the committed WOFF2 files rather than inference from filenames:

- internal font metadata confirmation;
- exact file byte sizes and initial transfer total;
- glyph coverage audit;
- OpenType feature inventory;
- variable-versus-static confirmation;
- tabular-numeral support;
- optical-sizing support;
- ascender, descender, line-gap, and units-per-em values;
- metric-adjusted fallback percentages;
- cold-cache and font-swap browser proof;
- public-repository and web-embedding license confirmation.

Claude may inspect and record these values from the actual files. It may not fabricate them.

---

# 6. Decision log

## 2026-07-29 — family identity and weight assets resolved

Approved and confirmed:

- Behind The Nineties Sans is the canonical Got Soap? editorial family;
- earlier shorthand “Behind The Nineties” refers to Behind The Nineties Sans;
- the owner’s `17–18px` Regular-versus-Medium proof was performed with Behind The Nineties Sans;
- Marlin Sans SQ Book, Medium, and Bold are present as separate WOFF2 assets;
- the locked Marlin role map no longer depends on synthetic weight or a speculative variable font;
- Marlin Sans SQ Regular remains unassigned;
- the three-file critical preload set is now asset-complete;
- exact metadata and metric analysis remains the next file-dependent typography task.
