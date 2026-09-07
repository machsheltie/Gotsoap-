# CWAAA: task 3 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-23-transmedia-canon-authority-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

### Task 3: Complete CWAAA psychology, records, and email

**Files:**

- Modify: `cwaaa/docs/world-bible.md:1-98`
- Modify: `cwaaa/design.md:7-130`
- Modify: `cwaaa/docs/PRD-cwaaa-web-v1.md:7-88`
- Modify: `cwaaa/docs/README.md:1-25`
- Modify: `cwaaa/docs/migration-manifest.md:20-64`
- Modify: `site/scripts/authority-check-lib.mjs:72-95`

**Interfaces:**

- Consumes: Shared canon-status and mystery rules from Task 1.
- Produces: A portable nonprofit package that can be extracted without losing psychology or email behavior.

- [ ] **Step 1: Extend the CWAAA authority gate**

Require these world-bible markers:

```js
'OBJECTIVE CANON',
'NEVER MANUFACTURES FEAR',
'ACCIDENTALLY REVEAL',
'PHYSICAL SPACE',
'EMAIL',
'TELEPHONE',
'EVENTS',
'WHAT IT NEVER SAYS',
```

Require these design and PRD markers:

```js
const cwaaaDesign = requireFile(repoRoot, 'cwaaa/design.md', errors);
errors.push(...missingRequiredMarkers(cwaaaDesign, [
  'PARTICIPANT ADVOCACY FILES',
  'NOT POLICE EVIDENCE',
  'NEUTRAL CITATION',
], 'cwaaa/design.md'));

const cwaaaPrd = requireFile(repoRoot, 'cwaaa/docs/PRD-cwaaa-web-v1.md', errors);
errors.push(...missingRequiredMarkers(cwaaaPrd, [
  'IMMEDIATE PLEDGE RECEIPT',
  'ONE CURRENT-ISSUE NEWSLETTER',
  'MONTH AND YEAR',
  'NOT AN ONGOING',
], 'cwaaa/docs/PRD-cwaaa-web-v1.md'));
```

- [ ] **Step 2: Run the authority gate and confirm CWAAA failures**

Run:

```powershell
npm --prefix site run authority
```

Expected: FAIL for the new CWAAA psychology, record-language, Office-reference, and email markers.

- [ ] **Step 3: Rewrite the CWAAA world bible as behavioral authority**

Retain the established identity and approved facts, but label them **Objective canon**. Replace
“CWAAA does not frighten” with:

```markdown
CWAAA never manufactures fear. Its overdeveloped certainty, institutional continuity, and
unexplained references may accidentally reveal that something larger exists behind it.
```

Use these sections:

```markdown
## Canon status
## Canonical identity
## What CWAAA believes
## What it never says
## What it finds funny
## What it would never do
## Voice and emotional temperature
## Authority and institutional certainty
## Programs
## Records and participant dignity
## What each page should make visitors feel
## Interactions that belong
## Interactions that break the illusion
## Knowledge boundaries
## Physical space
## Email
## Telephone
## Print and events
## Office references
## Legal and ethical frame
```

The IVR section must say it is a controlled transmedia exception and must not make ordinary CWAAA
web copy threatening or regulatory.

- [ ] **Step 4: Correct CWAAA records and Office references**

Replace “records room” enforcement ambiguity with:

```markdown
Recovery records behave like participant advocacy files, recovery histories, chapter
correspondence, reform documentation, program findings, and physically maintained nonprofit
records. They are not police evidence, intelligence files, criminal dossiers, mugshots, classified
folders, or suspect boards.
```

Office references may be neutral citations, ordinary unexplained links, or document references.
Prohibit “partner,” “parent agency,” “overseen by,” “operated by,” “division of,” and
“in coordination with.”

- [ ] **Step 5: Specify the finite email relationship**

Add this sequence to the CWAAA PRD:

```markdown
1. Immediate pledge receipt.
2. One current-issue newsletter delivered separately after a configurable short delay.
```

Require the issue to derive its displayed month and year at signup or send time, use evergreen
content, send exactly once, and create neither a monthly subscription nor a drip campaign. State
that the delay is configuration rather than permanent canon. Include this exact guardrail:

```markdown
This is not an ongoing newsletter subscription or drip campaign.
```

- [ ] **Step 6: Update package and migration guidance**

Update `cwaaa/docs/README.md` to list the expanded world bible and finite email contract. Update the
migration manifest to:

- copy and verify CWAAA records before deleting combined-site material;
- preserve neutral Office citations and the external link;
- keep the IVR source in shared world authority;
- preserve both pledge presentations;
- distinguish advocacy files from enforcement files; and
- verify that current-issue dating works without monthly maintenance.

- [ ] **Step 7: Run CWAAA and pledge validation**

Run:

```powershell
npm --prefix site run authority
$campaign=(Get-FileHash -Algorithm SHA256 docs/contracts/pledge.v1.json).Hash
$portable=(Get-FileHash -Algorithm SHA256 cwaaa/docs/contracts/pledge.v1.json).Hash
if($campaign -ne $portable){ throw 'Pledge contracts drifted' }
git diff --check
```

Expected: authority passes, the two hashes match, and diff check has no output.

- [ ] **Step 8: Commit the CWAAA authority**

```powershell
git add -- cwaaa/docs/world-bible.md cwaaa/design.md cwaaa/docs/PRD-cwaaa-web-v1.md cwaaa/docs/README.md cwaaa/docs/migration-manifest.md site/scripts/authority-check-lib.mjs
git commit -m "docs: complete CWAAA behavioral authority"
```

---
