# CWAAA: task 1 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-28-creative-direction-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

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
