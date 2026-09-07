# Creative Direction Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved 2026-07-28 creative-direction revision into enforceable design, PRD, world, artifact, and agent authority without changing the current website runtime.

**Architecture:** Revise each fictional author's authority as an independently testable unit, then update shared coordination documents and the path-aware authority checker so superseded creative guidance cannot silently return. Preserve all existing machine contracts and the canonical IVR PDF byte-for-byte.

**Tech Stack:** Markdown authority documents, Node.js 22 built-in test runner, existing Astro validation scripts, Git

## Global Constraints

- Governing specification: `docs/superpowers/specs/2026-07-28-creative-direction-revision-design.md`.
- Documentation and validation only; do not modify `site/src/`, public assets, or runtime behavior.
- Got Soap? seduces.
- CWAAA validates, organizes, and makes its case in public.
- The Office of Lather Compliance assumes jurisdiction and refuses access.
- CWAAA began with a book club, was established in 2024, has two million concerned women, and has chapters in all fifty states.
- The Office has existed since 1961 and its jurisdiction remains deliberately unspecified.
- The Office public website remains error states only.
- Continued Interest begins on the third distinct browser session; reloads never advance it.
- Got Soap? owns the Sniff Test and CWAAA owns Form CW-1.
- Form CW-1 fulfillment remains exactly two messages: one immediate receipt and one delayed current-dated issue, never an ongoing subscription.
- Shop and `/broadcast` remain canonical.
- `1-800-GOT-SOAP` is branded and publicly placed by Got Soap?; its operational controller and exact handoff remain intentionally unresolved.
- The IVR retains two presented voices, no audible transfer, no third voice, and every protected substantive branch.
- The canonical IVR PDF remains byte-for-byte unchanged with SHA-256 `7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0`.
- Privacy, Terms, and DMCA links remain globally accessible where the sites expose legal navigation.
- Satire, parody, fictional, spec-work, and non-affiliation disclosure appears only after the visitor follows the creator/About seam; it does not appear in a public global footer.
- Internal production documents may use words such as “fictional” to define canon; the prohibition concerns rendered audience-facing disclosure.
- Stage only the exact files named by each task; never use `git add -A`.
- Do not read, move, or stage `.abr`, PSD, or other large design-source files.

---

## File map

### Governing CWAAA package

- `cwaaa/design.md` — public-advocacy visual system, route choreography, photography, material law, and anti-default constitution.
- `cwaaa/docs/PRD-cwaaa-web-v1.md` — target routes, redirects, progression, Office referral depth, pledge behavior, and legal-disclosure placement.
- `cwaaa/docs/world-bible.md` — institutional psychology, dignity, wrongness discipline, physical behavior, and public-disclosure boundary.

### Governing Office package

- `office-of-lather-compliance/design.md` — deliberately under-designed error-only visual law.

### Governing campaign package

- `gotsoap/design.md` — fashion/fragrance catalogue direction for Shop.
- `gotsoap/docs/prd/PRD-gotsoap-web-v1.md` — Shop product performance, unavailable checkout, and legal-seam requirements.

### Shared artifact and coordination authority

- `docs/world/artifact-continuity.md` — separates number/placement owner, presented authorship, and operational ownership.
- `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md` — spoken production address and protected substitution law.
- `docs/HANDOFF.md` — closed decisions, supersessions, reading order, and current-runtime/target distinction.
- `AGENTS.md` — repository-wide implementation guardrails.
- `CLAUDE.md` — concise agent execution brief.
- `.claude/rules/gotsoap-web-design.md` — path-scoped three-author design rules.

### Validation

- `site/scripts/authority-check-lib.mjs` — required creative markers and path-aware rejection of obsolete live guidance.
- `site/scripts/authority-check.test.mjs` — positive-marker and adversarial stale-authority regression tests.
- `site/scripts/authority-check.mjs` — pass summary describing the newly enforced creative laws.

---

### Task 1: Rebuild CWAAA as a public advocacy platform

**Files:**

- Modify: `cwaaa/design.md:1-129`
- Modify: `cwaaa/docs/PRD-cwaaa-web-v1.md:7-116`
- Modify: `cwaaa/docs/world-bible.md:11-208`
- Modify: `site/scripts/authority-check-lib.mjs:428-615`
- Modify: `site/scripts/authority-check-lib.mjs:1210-1250`
- Modify: `site/scripts/authority-check.test.mjs:154-203`
- Modify: `site/scripts/authority-check.test.mjs:1036-1060`

**Interfaces:**

- Consumes: approved creative-direction specification Sections 1 and 4.
- Produces: portable CWAAA authority with canonical routes, public-advocacy composition, participant dignity, and creator-seam disclosure rules.

- [ ] **Step 1: Add failing CWAAA marker requirements**

Replace the current CWAAA design marker list in `collectAuthorityErrors()` with:

```js
errors.push(...missingRequiredMarkers(cwaaaDesign, [
  'A COALITION MAKING ITS CASE IN PUBLIC',
  'THE BAR IS SOAP',
  'DOCUMENT. ADVOCATE. ORGANIZE.',
  'RECOVERY STORIES',
  'TIE ONE ON',
  'CHAPTERS',
  'PAPER IS CONTENT, NOT THE UNIVERSE',
  '50% DOCUMENTARY HUMAN TRACES',
  '30% COHERENT PHYSICAL ARTIFACTS',
  '20% LIVE CIVIC GRAPHICS',
  'PARTICIPANT ADVOCACY FILES',
  'NOT POLICE EVIDENCE',
  'NEUTRAL CITATION',
], 'cwaaa/design.md'));
```

Expand the CWAAA PRD marker list with:

```js
'/RECOVERY-STORIES',
'/CHAPTERS',
'/CASE-FILES',
'REDIRECT',
'THE BAR IS SOAP',
'CREATOR/ABOUT SEAM',
```

Expand the CWAAA world-bible marker list with:

```js
'MAKES ITS CASE IN PUBLIC',
'EARNS TRUST FIRST',
'NEVER PERFORMS HORROR',
'PAPER IS CONTENT',
'CREATOR/ABOUT SEAM',
```

- [ ] **Step 2: Add adversarial CWAAA stale-guidance cases**

Add these cases to the path-aware mutation table in `site/scripts/authority-check.test.mjs`:

```js
const staleCreativeDirectionCases = [
  {
    name: 'paper-manila as the CWAAA primary stock',
    path: 'cwaaa/design.md',
    text: 'Primary stock: paper-manila.',
    expected: /obsolete CWAAA paper-universe guidance/i,
  },
  {
    name: 'CWAAA records room as the governing composition',
    path: 'cwaaa/design.md',
    text: 'The site behaves like a records room with index logic.',
    expected: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'photo-led CWAAA hero prohibition',
    path: 'cwaaa/design.md',
    text: 'Avoid a photo-led hero.',
    expected: /obsolete CWAAA hero guidance/i,
  },
  {
    name: 'case files retained as the public route',
    path: 'cwaaa/docs/PRD-cwaaa-web-v1.md',
    text: '| `/case-files` | Public case-file index |',
    expected: /obsolete CWAAA public route/i,
  },
];

for (const { name, path, text, expected } of staleCreativeDirectionCases) {
  test(`creative-direction drift is rejected: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}
```

In `validatePathAwareCanon()`, add exact positive-claim checks that emit those four error messages only for `cwaaa/design.md` and `cwaaa/docs/PRD-cwaaa-web-v1.md`. Use `matchingLines()` so quoted historical or explicitly rejected examples remain ignored by the existing documented-span logic.

- [ ] **Step 3: Run the authority suite and confirm the CWAAA requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL because the live CWAAA documents do not yet contain the new markers; each synthetic stale claim is rejected by its intended rule.

- [ ] **Step 4: Replace `cwaaa/design.md`**

Use these exact top-level sections:

```markdown
# CWAAA target design system
## 1. Creative thesis
## 2. Institutional and expressive layers
## 3. Visitor progression
## 4. Navigation and routes
## 5. Homepage
## 6. Route choreography
### Findings
### Recovery Stories
### Tie One On For Suds
### Pledge
### Chapters
### About
## 7. Photography and artifacts
## 8. Material system
## 9. Typography and identity
## 10. Motion and interaction
## 11. Wrongness discipline
## 12. Accessibility and responsive behavior
## 13. Anti-default constitution
## 14. Acceptance test
```

Make the controlling thesis:

```markdown
CWAAA: A Coalition Making Its Case in Public.
```

Include the locked proposition and sequence:

```markdown
THE BAR IS SOAP.

Routine washing is a reasonable collective expectation.

Home → Findings → Recovery Stories → Tie One On → Pledge → Chapters / About → Office referral
```

Specify the hands/red-washcloth/used-black-gym-bag hero from the governing specification, the single continuous `DOCUMENT. ADVOCATE. ORGANIZE.` composition, route-specific choreography, the 50/30/20 photography hierarchy, and:

```markdown
Paper is content, not the universe.
```

Keep Recovery Stories humane participant advocacy files, not police evidence, intelligence archives, criminal dossiers, mugshots, or suspect boards.

- [ ] **Step 5: Rewrite the CWAAA route and product requirements**

Make the target route table:

```markdown
| Route | Purpose |
|---|---|
| `/` | Public advocacy home |
| `/findings` | Monumental collective findings |
| `/recovery-stories` | Humane participant-story index |
| `/recovery-stories/[id]` | Individual Recovery Record |
| `/tie-one-on` | Tie One On For Suds program |
| `/chapters` | National chapter life and participation |
| `/about` | 2024 origin and deepest Office referral |
| `/pledge` | Form CW-1 |
| `/404` | CWAAA-authored not-found state |
```

Require explicit redirects:

```markdown
- `/case-files` → `/recovery-stories`
- `/case-files/[id]` → `/recovery-stories/[id]`
```

Retain the existing finite two-message email contract, accessible pledge rules, GoatCounter/privacy boundaries, and static-output assumptions. Replace the public `Case Files` label with `Recovery Stories`; allow `Recovery Record` and `RC-NNN` only after opening an individual story.

- [ ] **Step 6: Complete the CWAAA behavioral bible**

Preserve all approved canon and the existing behavior sections. Add:

```markdown
CWAAA earns trust first. It never performs horror.
```

Define CWAAA as competent, contemporary, humane, and expressive. Establish that its wrongness comes only from sparse chronology, neutral citations, unusually complete continuity, or an institution treated as routine. Prohibit glitches, warnings, countdowns, hostile validation, surveillance animation, threats, and Office language on ordinary pages.

Replace any directive to announce fiction in global legal/footer copy with:

```markdown
Privacy, Terms, and DMCA remain available wherever the site exposes legal navigation. Satire,
parody, fictional, spec-work, and non-affiliation disclosure appears only after the visitor follows
the restrained creator credit through the creator/About seam.
```

Internal canon labels such as “fictional advocacy nonprofit” may remain because they instruct builders rather than address visitors.

- [ ] **Step 7: Run focused CWAAA verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n "paper-manila|records room|Avoid a photo-led hero|\\| `/case-files` \\|" cwaaa/docs
git diff --check
```

Expected: all authority tests pass; the authority gate passes; the stale search returns no live positive guidance; diff check has no output.

- [ ] **Step 8: Commit the CWAAA revision**

```powershell
git add -- cwaaa/design.md cwaaa/docs/PRD-cwaaa-web-v1.md cwaaa/docs/world-bible.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: rebuild CWAAA public advocacy authority"
```

---

### Task 2: Reduce the Office to an ordinary error response

**Files:**

- Modify: `office-of-lather-compliance/design.md:1-151`
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
], 'office-of-lather-compliance/design.md'));
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

Each case appends to `office-of-lather-compliance/design.md` and expects a path-aware error. Exempt explicitly rejected examples through the existing semantic-clause normalization.

- [ ] **Step 2: Run the authority suite and confirm the Office requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL for missing under-design markers; synthetic positive styled-terminal claims are rejected.

- [ ] **Step 3: Rewrite `office-of-lather-compliance/design.md`**

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
rg -n -i "legacy terminal|muted red|scanline|paired typeface|status chip|decorative frame" office-of-lather-compliance/design.md
git diff --check
```

Expected: the first two commands pass; remaining matches occur only inside explicit prohibitions; diff check has no output.

- [ ] **Step 5: Commit the Office revision**

```powershell
git add -- office-of-lather-compliance/design.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: enforce Office under-design"
```

---

### Task 3: Turn Shop into an editorial campaign catalogue

**Files:**

- Modify: `gotsoap/design.md:228-256`
- Modify: `gotsoap/docs/prd/PRD-gotsoap-web-v1.md:111-128`
- Modify: `site/scripts/authority-check-lib.mjs:1160-1209`
- Modify: `site/scripts/authority-check.test.mjs:1036-1060`

**Interfaces:**

- Consumes: canonical Shop route ownership and existing five approved product concepts.
- Produces: product-specific spatial direction and unavailable-checkout behavior that refuses generic ecommerce.

- [ ] **Step 1: Add failing Shop authority markers and stale-grid tests**

Expand the `gotsoap/design.md` markers:

```js
'OFFICIAL CAMPAIGN SUPPLY',
'FASHION CATALOGUE PRETENDING TO BE A STORE',
'THE EMBOSSED BAR',
'THE WORDMARK TEE',
'THE STATEMENT TEE',
'THE DAD HAT',
'THE EFFORT BOTTLE',
'SUPPLY INDEX',
'NO PRODUCT GRID',
```

Expand the campaign PRD markers:

```js
'OVERSIZED EDITORIAL PERFORMANCE',
'COMING SOON!',
'NO RATINGS',
'NO RECOMMENDATIONS',
```

Add adversarial mutations for:

```js
[
  ['gotsoap/design.md', 'Arrange products in an equal responsive product grid.', /obsolete Shop grid guidance/i],
  ['gotsoap/design.md', 'Use standard ecommerce product cards.', /obsolete Shop card guidance/i],
  ['gotsoap/docs/prd/PRD-gotsoap-web-v1.md', 'Include ratings and customers-also-bought recommendations.', /obsolete Shop ecommerce guidance/i],
]
```

- [ ] **Step 2: Run the authority suite and confirm Shop requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL for missing editorial-catalogue markers while the new mutation cases reject ordinary ecommerce guidance.

- [ ] **Step 3: Expand the Shop section in `gotsoap/design.md`**

Use:

```markdown
### Shop
#### Platform
#### Index choreography
#### Product performances
#### Supply Index
#### Unavailable checkout
#### Product detail
#### Refused ecommerce defaults
```

Define:

```markdown
Official Campaign Supply: a fashion catalogue pretending to be a store.
```

Give each product the exact material and narrative treatment in governing specification Section 3.2. Require image-owned viewports, oversized names, short sell lines, secondary prices, restrained unavailable controls, and a narrow Supply Index. Prohibit an equal grid, Shopify shell, card inventory, recommendations, ratings, accordions, tabs, and thumbnail carousels.

- [ ] **Step 4: Expand Shop requirements in the campaign PRD**

Require:

```markdown
- The index gives all five products distinct oversized editorial performances.
- A narrow Supply Index may provide direct access without becoming a card grid.
- `Coming Soon!` appears only at the normal purchase point.
- Detail pages use one full-bleed hero, one severe crop, one materials/specification block, one price,
  one unavailable purchase control, and previous/next supply navigation.
- No ratings, recommendations, product tabs, accordions, thumbnail carousel, or ordinary ecommerce
  shell is permitted.
```

Keep checkout unavailable and ecommerce transactions out of scope.

- [ ] **Step 5: Run focused Shop verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n "Embossed Bar|Wordmark Tee|Statement Tee|Dad Hat|Effort Bottle|Supply Index|Coming Soon" gotsoap/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md
git diff --check
```

Expected: authority tests and gate pass; every product and interaction marker appears; diff check has no output.

- [ ] **Step 6: Commit the Shop revision**

```powershell
git add -- gotsoap/design.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: direct Shop as campaign catalogue"
```

---

### Task 4: Preserve legal navigation while moving fiction disclosure

**Files:**

- Modify: `docs/HANDOFF.md:78-103`
- Modify: `gotsoap/docs/prd/PRD-gotsoap-web-v1.md:163-226`
- Modify: `cwaaa/docs/PRD-cwaaa-web-v1.md:89-116`
- Modify: `cwaaa/docs/world-bible.md:199-208`
- Modify: `site/scripts/authority-check-lib.mjs:1130-1250`
- Modify: `site/scripts/authority-check.test.mjs:1036-1060`
- Modify: `site/scripts/authority-check.test.mjs:1240-1290`

**Interfaces:**

- Consumes: the owner clarification approved on 2026-07-28.
- Produces: an enforceable distinction between functional legal navigation and fiction-breaking disclosure.

- [ ] **Step 1: Add failing disclosure markers**

Require these markers in `docs/HANDOFF.md`, the campaign PRD, the CWAAA PRD, and the CWAAA world bible:

```js
[
  'PRIVACY',
  'TERMS',
  'DMCA',
  'REMAIN GLOBALLY ACCESSIBLE',
  'CREATOR/ABOUT SEAM',
  'NO PUBLIC GLOBAL SATIRE DISCLOSURE',
]
```

Use a helper to avoid duplicating the array:

```js
const legalSeamMarkers = [
  'PRIVACY',
  'TERMS',
  'DMCA',
  'REMAIN GLOBALLY ACCESSIBLE',
  'CREATOR/ABOUT SEAM',
  'NO PUBLIC GLOBAL SATIRE DISCLOSURE',
];
```

- [ ] **Step 2: Add adversarial disclosure regression tests**

Add:

```js
const publicDisclosureDriftCases = [
  {
    path: 'gotsoap/docs/prd/PRD-gotsoap-web-v1.md',
    text: 'Render “This is satire and unaffiliated spec work” in the global footer.',
  },
  {
    path: 'cwaaa/docs/PRD-cwaaa-web-v1.md',
    text: 'State that CWAAA is fictional satire in global footer copy.',
  },
  {
    path: 'cwaaa/docs/world-bible.md',
    text: 'State clearly in accessible legal/footer copy that CWAAA is fictional satire.',
  },
];

for (const { path, text } of publicDisclosureDriftCases) {
  test(`public fiction disclosure is rejected in ${path}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        /fiction disclosure belongs behind the creator\/About seam/i,
      );
    });
  });
}
```

Also add a positive marker-removal test proving that `Privacy`, `Terms`, and `DMCA` cannot be removed from the legal-seam authority.

- [ ] **Step 3: Run the authority suite and confirm disclosure requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL until every governing document expresses both halves of the rule.

- [ ] **Step 4: Reconcile the legal-seam language**

Use this exact policy in each listed governing document:

```markdown
Privacy, Terms, and DMCA remain globally accessible wherever the site exposes legal navigation.
Their labels and entry points do not announce the fiction. Satire, parody, fictional, spec-work,
and non-affiliation disclosure appears only after the visitor follows the restrained creator credit
through the creator/About seam. No public global satire disclosure is permitted.
```

Do not remove truthful privacy, rights, contact, storage, or accessibility requirements. Do not alter private production canon that identifies the fictional entities internally.

- [ ] **Step 5: Run focused disclosure verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n -i "global footer.*satire|global footer.*fictional|fictional satire.*footer|parody banner|non-affiliation footer" docs/HANDOFF.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md cwaaa/docs
rg -n "Privacy|Terms|DMCA|creator/About seam" docs/HANDOFF.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md cwaaa/docs
git diff --check
```

Expected: the first search finds only explicit prohibitions; the second confirms retained legal navigation and the disclosure destination; all tests pass.

- [ ] **Step 6: Commit the disclosure correction**

```powershell
git add -- docs/HANDOFF.md gotsoap/docs/prd/PRD-gotsoap-web-v1.md cwaaa/docs/PRD-cwaaa-web-v1.md cwaaa/docs/world-bible.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: separate legal links from fiction disclosure"
```

---

### Task 5: Clarify IVR deployment and preserve operational ambiguity

**Files:**

- Modify: `docs/world/artifact-continuity.md:1-27`
- Modify: `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md:10-52`
- Modify: `site/scripts/authority-check-lib.mjs:596-615`
- Modify: `site/scripts/authority-check-lib.mjs:1060-1130`
- Modify: `site/scripts/authority-check.test.mjs:510-610`
- Modify: `site/scripts/authority-check.test.mjs:1240-1330`

**Interfaces:**

- Consumes: byte-protected IVR PDF and existing protected line/branch markers.
- Produces: production-safe spoken URLs plus three distinct ownership dimensions without resolving the call.

- [ ] **Step 1: Add failing IVR deployment and ownership requirements**

Expand the IVR marker list:

```js
'GOTSOAP DOT NETLIFY DOT APP',
'SLASH SNIFF TEST',
'DEPLOYMENT-SPECIFIC SUBSTITUTION',
'NUMBER/PLACEMENT OWNER',
'PRESENTED AUTHORSHIP',
'OPERATIONAL OWNER',
'INTENTIONALLY UNRESOLVED',
```

Expand the artifact-continuity markers:

```js
'NUMBER/PLACEMENT OWNER',
'PRESENTED AUTHORSHIP',
'OPERATIONAL OWNER',
'INTENTIONALLY UNRESOLVED',
```

- [ ] **Step 2: Add adversarial IVR ownership tests**

Add mutation cases:

```js
[
  {
    name: 'Got Soap assigned complete IVR operation',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    text: 'Got Soap? operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'CWAAA assigned complete IVR operation',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    text: 'CWAAA operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'Office assigned complete IVR operation',
    path: 'docs/world/artifact-continuity.md',
    text: 'The Office operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'exact IVR handoff resolved',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    text: 'Control transfers from CWAAA to the Office when Voice B says Office of Lather Compliance.',
    expected: /exact IVR handoff must remain intentionally unresolved/i,
  },
]
```

Keep the existing third-voice and audible-transfer adversarial tests unchanged.

- [ ] **Step 3: Run the authority suite and confirm the new IVR requirements fail**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL for missing ownership dimensions and spoken deployment markers; every positive operational assignment is rejected.

- [ ] **Step 4: Rewrite the artifact registry row**

Change the registry schema so it explicitly includes:

```markdown
| Artifact | Form | Number/placement owner | Presented authorship | Operational owner | First meaning | Later meaning | Recurrence rule | Forbidden explanation | Documentation authority |
```

For `1-800-GOT-SOAP`, set:

```markdown
| 1-800-GOT-SOAP | IVR | Got Soap? | Voice A: Got Soap?; Voice B: appears CWAAA, later identifies Office | INTENTIONALLY UNRESOLVED | ... |
```

Do not rename all other artifacts into phone-specific concepts; use `—` for ownership columns that do not apply.

- [ ] **Step 5: Add deployment address and substitution law**

Add:

```markdown
For the current production target, spoken URLs are “gotsoap dot netlify dot app” and
“gotsoap dot netlify dot app slash sniff test.”

Deployment-specific substitution of the spoken domain and route is allowed. It must preserve every
protected joke, branch, voice transition, pacing beat, ambiguity, substantive line, and
institutional handoff.
```

Add a private production table:

```markdown
| Concern | Canon |
|---|---|
| Number/placement owner | Got Soap? |
| Presented authorship | Voice A is Got Soap?; Voice B appears CWAAA and later identifies Office |
| Operational owner | INTENTIONALLY UNRESOLVED |
| Exact handoff point | INTENTIONALLY UNRESOLVED |
```

- [ ] **Step 6: Verify IVR integrity and authority**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
$hash=(Get-FileHash -Algorithm SHA256 docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf).Hash
if($hash -ne '7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0'){ throw 'IVR PDF drifted' }
git diff --check
```

Expected: authority tests and gate pass; the PDF hash matches; diff check has no output.

- [ ] **Step 7: Commit the IVR revision**

```powershell
git add -- docs/world/artifact-continuity.md docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: preserve unresolved IVR operation"
```

---

### Task 6: Synchronize top-level agent authority

**Files:**

- Modify: `docs/HANDOFF.md:5-110`
- Modify: `AGENTS.md:3-77`
- Modify: `CLAUDE.md:3-21`
- Modify: `.claude/rules/gotsoap-web-design.md:1-39`
- Modify: `site/scripts/authority-check-lib.mjs:1100-1209`
- Modify: `site/scripts/authority-check.test.mjs:1260-1315`
- Modify: `site/scripts/authority-check.mjs:12-25`

**Interfaces:**

- Consumes: Tasks 1-5.
- Produces: one unambiguous reading order and concise implementation guardrails for future agents.

- [ ] **Step 1: Add failing top-level synchronization markers**

Require the following across `docs/HANDOFF.md`, `AGENTS.md`, `CLAUDE.md`, and `.claude/rules/gotsoap-web-design.md` as appropriate:

```js
[
  'A COALITION MAKING ITS CASE IN PUBLIC',
  'THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED',
  'FASHION CATALOGUE PRETENDING TO BE A STORE',
  'RECOVERY STORIES',
  'CREATOR/ABOUT SEAM',
  'OPERATIONAL OWNER',
  'INTENTIONALLY UNRESOLVED',
]
```

The full list belongs in `docs/HANDOFF.md`; concise subsets belong in the three agent files.

- [ ] **Step 2: Run the authority suite and confirm synchronization fails**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: FAIL until the top-level entry points name the revised live authority.

- [ ] **Step 3: Update `docs/HANDOFF.md`**

Add a dated closed-decision block covering:

```markdown
- CWAAA is a coalition making its case in public, not a paper universe or records-room website.
- Public CWAAA navigation uses Recovery Stories and Chapters.
- The Office page must appear under-designed.
- Shop is a fashion catalogue pretending to be a store.
- Privacy, Terms, and DMCA remain globally accessible.
- Fiction disclosure belongs behind the creator/About seam.
- IVR number/placement owner is Got Soap?; presented authorship crosses Voice A and Voice B;
  operational owner and exact handoff remain intentionally unresolved.
```

Point implementers to the approved 2026-07-28 spec and this plan. Preserve the current-runtime versus approved-target distinction and all earlier authority precedence.

- [ ] **Step 4: Update repository and Claude rules**

In `AGENTS.md`, replace the paper/manila CWAAA summary with the public-advocacy thesis. In `CLAUDE.md`, state the three revised visual laws in compact form. In `.claude/rules/gotsoap-web-design.md`, replace the CWAAA paper-system shorthand, add Office under-design and Shop catalogue refusal, and retain:

```markdown
Privacy, Terms, and DMCA stay accessible; fiction disclosure waits behind the creator/About seam.
```

Do not duplicate route-by-route copy from the design documents; point to the governing files.

- [ ] **Step 5: Update authority success output**

Make `site/scripts/authority-check.mjs` report:

```js
console.log('- CWAAA public-advocacy, route, material, and disclosure laws intact');
console.log('- Office deliberate under-design and browser-local state laws intact');
console.log('- Shop editorial-catalogue and unavailable-checkout laws intact');
console.log('- IVR deployment substitution and unresolved operational ownership intact');
```

- [ ] **Step 6: Run top-level synchronization verification**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
rg -n "paper-manila|records room|styled legacy terminal|equal product grid|global footer.*fictional satire" AGENTS.md CLAUDE.md .claude/rules/gotsoap-web-design.md docs/HANDOFF.md
git diff --check
```

Expected: tests and gate pass; stale search returns no live positive guidance; diff check has no output.

- [ ] **Step 7: Commit top-level synchronization**

```powershell
git add -- docs/HANDOFF.md AGENTS.md CLAUDE.md .claude/rules/gotsoap-web-design.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs site/scripts/authority-check.mjs
git commit -m "docs: synchronize revised creative authority"
```

---

### Task 7: Run integrated authority and runtime verification

**Files:**

- Modify only if a genuine validation defect is found: `site/scripts/authority-check-lib.mjs`
- Modify only if its regression coverage is incomplete: `site/scripts/authority-check.test.mjs`

**Interfaces:**

- Consumes: Tasks 1-6.
- Produces: a clean documentation branch whose revised authority and unchanged runtime both pass every existing gate.

- [ ] **Step 1: Run authority validation**

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: all Node tests pass and the authority command reports every revised creative law as intact.

- [ ] **Step 2: Run the unchanged runtime gates**

```powershell
npm --prefix site run build
npm --prefix site run gates
npm --prefix site run copy-gates
npm --prefix site run fidelity
npm --prefix site run distinguish
```

Expected:

- Astro builds all existing routes successfully.
- General gates pass.
- Copy gates pass.
- Fidelity passes in authoritative mode.
- Five campaign environments remain distinguishable.

- [ ] **Step 3: Run structural and integrity checks**

```powershell
git diff --check
$campaign=(Get-FileHash -Algorithm SHA256 docs/contracts/pledge.v1.json).Hash
$portable=(Get-FileHash -Algorithm SHA256 cwaaa/docs/contracts/pledge.v1.json).Hash
if($campaign -ne $portable){ throw 'Pledge contracts drifted' }
$ivr=(Get-FileHash -Algorithm SHA256 docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf).Hash
if($ivr -ne '7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0'){ throw 'IVR PDF drifted' }
rg -n -i "third/fourth-return|\"visitCount\"|Primary stock: paper-manila|Avoid a photo-led hero|global footer.*fictional satire|operates the complete IVR" AGENTS.md CLAUDE.md .claude/rules/gotsoap-web-design.md docs site/scripts
git status --short
```

Expected:

- diff check has no output;
- pledge hashes match;
- IVR hash matches;
- stale-authority search has no live positive matches;
- worktree is clean after task commits.

- [ ] **Step 4: Inspect the commit sequence**

```powershell
git log --oneline -9
```

Expected newest commits:

```text
docs: synchronize revised creative authority
docs: preserve unresolved IVR operation
docs: separate legal links from fiction disclosure
docs: direct Shop as campaign catalogue
docs: enforce Office under-design
docs: rebuild CWAAA public advocacy authority
docs: plan creative direction revision
docs: approve revised creative direction
```

- [ ] **Step 5: Perform a final requirements audit**

Read the governing specification and confirm, in writing, that:

```text
CWAAA: thesis, routes, homepage, photography, material law, wrongness, and disclosure all covered.
Office: under-design and preserved state behavior covered.
Shop: five editorial product performances and unavailable checkout covered.
Legal: Privacy/Terms/DMCA retained; fiction disclosure moved.
IVR: production URL, substitution rule, three ownership dimensions, ambiguity, and PDF integrity covered.
Runtime: unchanged and fully verified.
```

If no omissions are found, do not create an empty verification commit.
