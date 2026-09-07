# Office of Lather Compliance: task 2 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-28-creative-direction-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

### Task 2: Reduce the Office to an ordinary error response

**Files:**

- Modify: `office-of-lather-compliance/docs/design.md:1-151`
- Modify: `site/scripts/authority-check-lib.mjs:428-615`
- Modify: `site/scripts/authority-check-lib.mjs:1270-1319`
- Modify: `site/scripts/authority-check.test.mjs:1036-1060`

**Interfaces:**

- Consumes: the unchanged Office PRD, world bible, and `visit-state.v1.json`.
- Produces: a deliberate under-design law without changing Office copy or state behavior.

- [ ] **Step 1: Add failing Office design requirements**

After loading `officeDesign`, require:

```js
errors.push(...missingRequiredMarkers(officeDesign, [
  'THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED',
  'WHITE BACKGROUND',
  'BLACK TEXT',
  'COURIER NEW',
  'NO LOGO',
  'NO NAVIGATION',
  'NO DECORATIVE FRAME',
  'NO STATUS CHIP',
  'NO SECOND TYPEFACE',
  'NO ACCENT COLOR',
  'NO SHADOW',
  'NO TEXTURE',
  'NO SCANLINES',
  'NO ANIMATION',
], 'office-of-lather-compliance/docs/design.md'));
```

Add adversarial cases:

```js
[
  ['styled terminal frame', 'Use a centered legacy terminal frame.', /obsolete Office terminal styling/i],
  ['Office accent color', 'Use muted red as the Office accent color.', /obsolete Office accent styling/i],
  ['Office type pairing', 'Pair the mono face with a serif display face.', /obsolete Office type pairing/i],
  ['Office scanlines', 'Add subtle scanlines to the page.', /obsolete Office horror styling/i],
]
```

Each case appends to `office-of-lather-compliance/docs/design.md` and expects a path-aware error. Exempt explicitly rejected examples through the existing semantic-clause normalization.

- [ ] **Step 2: Run the authority suite and confirm the Office requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL for missing under-design markers; synthetic positive styled-terminal claims are rejected.

- [ ] **Step 3: Rewrite `office-of-lather-compliance/docs/design.md`**

Use:

```markdown
# Office of Lather Compliance design system
## 1. Binding visual law
## 2. Emotional temperature
## 3. Plain visual system
## 4. Required state copy
## 5. Session progression
## 6. Terminal identity
## 7. Interaction
## 8. Accessibility and storage failure
## 9. Acceptance
```

Open with:

```markdown
THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED.
```

Include this implementation reference:

```css
body {
  margin: 48px 24px 80px 52px;
  max-width: 760px;
  background: #fff;
  color: #111;
  font: 16px/1.45 "Courier New", Courier, monospace;
}
```

Preserve the required state copy byte-for-byte as prose authority, the three-session progression, `8804-X`, browser-local terminal identity, resolve-before-reveal rule, privacy limits, and storage-unavailable fallback. Remove styled-terminal, off-white, muted-red, paired-typeface, record-block, ornamental-divider, and animated presentation instructions.

- [ ] **Step 4: Run focused Office verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n -i "legacy terminal|muted red|scanline|paired typeface|status chip|decorative frame" office-of-lather-compliance/docs/design.md
git diff --check
```

Expected: the first two commands pass; remaining matches occur only inside explicit prohibitions; diff check has no output.

- [ ] **Step 5: Commit the Office revision**

```powershell
git add -- office-of-lather-compliance/docs/design.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: enforce Office under-design"
```

---
