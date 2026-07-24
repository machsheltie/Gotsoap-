# Transmedia Canon Authority Revision Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved transmedia specification into enforceable, portable authority documents for Got Soap?, CWAAA, and the Office without changing the current website runtime.

**Architecture:** Add one shared world layer above three independent institutional packages, then make the existing authority gate enforce the layer boundaries and the corrected Office state contract. Preserve the IVR as a cross-system source artifact whose two presented voices intentionally leave the CWAAA/Office handoff unresolved.

**Tech Stack:** Markdown authority documents, JSON contracts, Node.js 22 built-in test runner, existing Astro validation scripts, Poppler PDF inspection, Git

## Global Constraints

- Governing specification: `docs/superpowers/specs/2026-07-23-transmedia-canon-and-authority-revision-design.md`.
- Documentation and validation only; do not change `site/src/` runtime behavior.
- Got Soap? campaigns, CWAAA advocates and files, and the Office regulates.
- Private canon keeps CWAAA and the Office legally separate; audience-facing artifacts never prove how the relationship works.
- The Office dates to 1961; CWAAA dates to 2024.
- The IVR retains two presented voices, all substantive lines, and no audible Office transfer.
- The phone number lives on Got Soap?.
- The Office public website remains error states only.
- CWAAA-specific files remain portable under `docs/cwaaa/`.
- Office-specific files remain portable under `docs/office-of-lather-compliance/`.
- Shared facts and artifacts live under `docs/world/`; do not duplicate their full content into both portable packages.
- Keep `docs/contracts/pledge.v1.json` and `docs/cwaaa/contracts/pledge.v1.json` byte-for-byte equivalent.
- Stage only the exact files named by each task; never use `git add -A`.
- Do not move or inspect `.abr`, PSD, or other large design-source files.

---

## File map

### New shared authority

- `docs/world/README.md` - reading order, authority boundary, and extraction guidance.
- `docs/world/WORLD-BIBLE.md` - shared timeline, objective facts, intentional mysteries, knowledge matrix, and emotional laws.
- `docs/world/artifact-continuity.md` - cross-media ownership and recontextualization registry.
- `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md` - preservation and authorship rules for the call.
- `docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf` - byte-preserved owner source.

### New per-system authority

- `docs/gotsoap/world-bible.md` - campaign psychology and behavioral voice.
- `docs/office-of-lather-compliance/world-bible.md` - Office psychology, history boundary, and reference logic.

### Expanded authority

- `docs/HANDOFF.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.claude/rules/gotsoap-web-design.md`
- `docs/design.md`
- `docs/prd/PRD-gotsoap-web-v1.md`
- `docs/cwaaa/README.md`
- `docs/cwaaa/design.md`
- `docs/cwaaa/PRD-cwaaa-web-v1.md`
- `docs/cwaaa/world-bible.md`
- `docs/cwaaa/migration-manifest.md`
- `docs/office-of-lather-compliance/README.md`
- `docs/office-of-lather-compliance/design.md`
- `docs/office-of-lather-compliance/PRD-office-v1.md`
- `docs/office-of-lather-compliance/contracts/visit-state.v1.json`
- `docs/strategy/participation-mechanics.md`
- `docs/strategy/cwaaa-divergence-roadmap.md`

### Validation

- `site/scripts/authority-check-lib.mjs`
- `site/scripts/authority-check.test.mjs`
- `site/scripts/authority-check.mjs`

---

### Task 1: Establish the shared world authority

**Files:**

- Create: `docs/world/README.md`
- Create: `docs/world/WORLD-BIBLE.md`
- Create: `docs/world/artifact-continuity.md`
- Modify: `docs/HANDOFF.md:18-31`
- Modify: `docs/strategy/cwaaa-divergence-roadmap.md:1-32`
- Modify: `AGENTS.md:3-26`
- Modify: `CLAUDE.md:3-24`
- Modify: `.claude/rules/gotsoap-web-design.md:2-32`
- Modify: `site/scripts/authority-check-lib.mjs:35-91`
- Modify: `site/scripts/authority-check.test.mjs:1-49`
- Modify: `site/scripts/authority-check.mjs:12-20`

**Interfaces:**

- Consumes: Owner-approved specification `a6556a3`.
- Produces: The highest shared authority and marker checks used by every later task.

- [ ] **Step 1: Add the failing shared-authority checks**

Add these required files and markers to `collectAuthorityErrors()`:

```js
const worldReadme = requireFile(repoRoot, 'docs/world/README.md', errors);
errors.push(...missingRequiredMarkers(worldReadme, [
  'SHARED AUTHORITY',
  'PER-SYSTEM AUTHORITY',
  'EXTRACTION',
], 'docs/world/README.md'));

const worldBible = requireFile(repoRoot, 'docs/world/WORLD-BIBLE.md', errors);
errors.push(...missingRequiredMarkers(worldBible, [
  'OBJECTIVE CANON',
  'PUBLIC CLAIM',
  'INTENTIONALLY UNRESOLVED',
  '1961',
  '2024',
  'GOT SOAP? SEDUCES',
  'CWAAA VALIDATES AND ORGANIZES',
  'THE OFFICE ASSUMES JURISDICTION',
  'KNOWLEDGE MATRIX',
], 'docs/world/WORLD-BIBLE.md'));

const artifactContinuity = requireFile(
  repoRoot,
  'docs/world/artifact-continuity.md',
  errors,
);
errors.push(...missingRequiredMarkers(artifactContinuity, [
  'FIRST MEANING',
  'LATER MEANING',
  'RECURRENCE RULE',
  'FORBIDDEN EXPLANATION',
  'OFFICE PEN',
  '1-800-GOT-SOAP',
], 'docs/world/artifact-continuity.md'));
```

Add this unit test:

```js
test('master canon markers distinguish truth from protected uncertainty', () => {
  const master = [
    'OBJECTIVE CANON',
    'PUBLIC CLAIM',
    'INTENTIONALLY UNRESOLVED',
    'KNOWLEDGE MATRIX',
  ].join('\n');

  assert.deepEqual(
    missingRequiredMarkers(master, [
      'OBJECTIVE CANON',
      'PUBLIC CLAIM',
      'INTENTIONALLY UNRESOLVED',
      'KNOWLEDGE MATRIX',
    ]),
    [],
  );
});
```

- [ ] **Step 2: Run the authority gate and confirm the new requirement fails**

Run:

```powershell
npm --prefix site run authority
```

Expected: `AUTHORITY CHECK: FAIL` with missing-file errors for the three `docs/world/` documents.

- [ ] **Step 3: Create `docs/world/README.md`**

Use this authority structure:

```markdown
# Shared world authority

## Shared authority

`WORLD-BIBLE.md` governs facts crossing two or more systems.
`artifact-continuity.md` governs artifacts crossing media or institutional boundaries.

## Per-system authority

- Got Soap?: `../gotsoap/world-bible.md`, `../design.md`, and the campaign PRD.
- CWAAA: `../cwaaa/`.
- Office: `../office-of-lather-compliance/`.

## Extraction

CWAAA-specific material remains under `docs/cwaaa/`; Office-specific material remains under
`docs/office-of-lather-compliance/`. Shared facts remain here and travel by explicit reference.
```

Also include the four canon statuses and the authority order from specification Sections 3 and 4.

- [ ] **Step 4: Create `docs/world/WORLD-BIBLE.md`**

Use these exact top-level sections:

```markdown
# Got Soap? shared world bible

## How to read canon
## Three authors and their powers
## Objective canon
## Public claims
## Intentionally unresolved
## Timeline
## Knowledge matrix
## Emotional laws
## Mystery discipline
## Shared terminology
## Prohibited explanations
```

Record these exact closed facts:

```markdown
- The Office has existed since 1961.
- CWAAA was established in 2024.
- CWAAA began with a book club.
- CWAAA has two million concerned women and chapters in all fifty states.
- CWAAA and the Office are legally separate in private canon.
- Audience-facing artifacts never prove how their relationship operates.
```

The knowledge matrix must include rows for first-time visitor, attentive repeat visitor, Got Soap?,
CWAAA, Office, production authority, and protected unknowns.

- [ ] **Step 5: Create `docs/world/artifact-continuity.md`**

Create the registry with these exact columns:

```markdown
| Artifact | Form | Public author | Actual owner | First meaning | Later meaning | Recurrence rule | Forbidden explanation | Portability |
```

Populate rows for every artifact listed in specification Section 14. Give the Office pen this rule:

```markdown
Ordinary Office swag placed on the owner's event table. Its 1961 continuity becomes unsettling only
after another encounter; it never announces itself as a clue.
```

- [ ] **Step 6: Update the repository authority entry points**

In `docs/HANDOFF.md`, place the master bible first in the authority table and add the four canon
statuses. In `AGENTS.md`, `CLAUDE.md`, and the path-scoped Claude rule:

```markdown
Intentional uncertainty is not missing documentation. Do not explain the CWAAA/Office relationship,
add a clean handoff, or average their rendered authorship.
```

Add `docs/world/**` to the Claude rule path list. Update the divergence roadmap so shared canon points
to `docs/world/` and portable institutional material remains in its own package.

- [ ] **Step 7: Update authority-check success output**

Make `site/scripts/authority-check.mjs` report the new enforced layers:

```js
console.log('AUTHORITY CHECK: PASS');
console.log('- shared world canon and artifact continuity markers present');
console.log('- three-system ownership and per-system behavioral markers present');
console.log('- portable pledge contracts match exactly');
console.log('- Office jurisdiction, error-only surface, and local-state rules intact');
```

- [ ] **Step 8: Run focused validation**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
git diff --check
```

Expected:

```text
authority:test: 4 tests pass
AUTHORITY CHECK: PASS
git diff --check: no output
```

- [ ] **Step 9: Commit the shared authority**

```powershell
git add -- docs/world/README.md docs/world/WORLD-BIBLE.md docs/world/artifact-continuity.md docs/HANDOFF.md docs/strategy/cwaaa-divergence-roadmap.md AGENTS.md CLAUDE.md .claude/rules/gotsoap-web-design.md site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs site/scripts/authority-check.mjs
git commit -m "docs: establish shared transmedia canon"
```

---

### Task 2: Make Got Soap? behavior and routes explicit

**Files:**

- Create: `docs/gotsoap/world-bible.md`
- Modify: `docs/design.md:11-79`
- Modify: `docs/design.md:188-265`
- Modify: `docs/prd/PRD-gotsoap-web-v1.md:28-74`
- Modify: `docs/prd/PRD-gotsoap-web-v1.md:74-218`
- Modify: `site/scripts/authority-check-lib.mjs:55-70`

**Interfaces:**

- Consumes: Shared emotional laws and protected unknowns from Task 1.
- Produces: Campaign behavioral authority plus canonical Shop, film, and phone ownership.

- [ ] **Step 1: Extend the campaign authority gate**

Require `docs/gotsoap/world-bible.md` and these markers:

```js
const gotSoapBible = requireFile(repoRoot, 'docs/gotsoap/world-bible.md', errors);
errors.push(...missingRequiredMarkers(gotSoapBible, [
  'EROTIC ASPIRATION',
  'POTENTIAL CONVERT',
  'WITNESS AND RECRUITER',
  'WHAT GOT SOAP? FINDS FUNNY',
  'WHAT BREAKS THE ILLUSION',
  'UTILITY VOICE',
], 'docs/gotsoap/world-bible.md'));
```

Expand the campaign PRD markers to include:

```js
'SHOP',
'/BROADCAST',
'1-800-GOT-SOAP',
'UNAVAILABLE CHECKOUT',
```

- [ ] **Step 2: Run the authority gate and confirm campaign failures**

Run:

```powershell
npm --prefix site run authority
```

Expected: FAIL for the missing Got Soap? bible and missing Shop, `/broadcast`, phone, and unavailable
checkout markers.

- [ ] **Step 3: Create `docs/gotsoap/world-bible.md`**

Use these exact sections:

```markdown
# Got Soap? behavioral world bible

## Core belief
## How behavior changes
## The man
## The woman
## What Got Soap? finds funny
## What it never jokes about
## Desire and cleanliness vocabulary
## Utility voice
## What Got Soap? knows
## What breaks the illusion
## Page feelings
## Interaction boundaries
```

Include these binding statements:

```markdown
Got Soap? changes behavior through erotic aspiration, not health education, humiliation, or shame.
The man is a potential convert, not an enemy. The woman is a witness and recruiter, not the operator
of a grievance forum. Cleanliness is the price of admission to the man he already imagines himself
becoming.
```

Define utility voice for loading, validation, error, confirmation, Shop, download, share, and film
framing. Prohibit startup jargon, public-health lectures, generic empowerment copy, and premature
Hope2 Studio explanation.

- [ ] **Step 4: Correct the campaign route authority**

Add these PRD route rows:

```markdown
| `/broadcast` | canonical campaign-film premiere | Got Soap? |
| `/shop` | canonical faux storefront | Got Soap? |
| `/shop/[slug]` | campaign product performance with unavailable checkout | Got Soap? |
```

Add requirements that:

- Shop remains canonical even while checkout says “Coming Soon!”.
- The homepage contains a full-bleed premiere seam to `/broadcast`.
- Film is staged as a campaign event, never a generic video card.
- `1-800-GOT-SOAP` appears as campaign material on Got Soap?.
- Neither CWAAA nor the Office advertises the number as a normal contact channel.

- [ ] **Step 5: Strengthen `docs/design.md`**

Add the campaign behavioral thesis and require every major route to name:

```markdown
1. dominant event;
2. off-axis counterweight;
3. material transition;
4. refused default layout;
5. emotional change; and
6. authorship boundary.
```

Add explicit route direction for Shop and `/broadcast`. Preserve the current anti-template
constitution, poster immutability, Sniff Test ownership, pledge edition, and late `/about` reveal.

- [ ] **Step 6: Run focused validation**

Run:

```powershell
npm --prefix site run authority
rg -n "Shop|/broadcast|1-800-GOT-SOAP|erotic aspiration" docs/gotsoap/world-bible.md docs/design.md docs/prd/PRD-gotsoap-web-v1.md
git diff --check
```

Expected: authority passes; all four concepts appear in the intended campaign authorities; diff
check has no output.

- [ ] **Step 7: Commit the campaign authority**

```powershell
git add -- docs/gotsoap/world-bible.md docs/design.md docs/prd/PRD-gotsoap-web-v1.md site/scripts/authority-check-lib.mjs
git commit -m "docs: complete Got Soap behavioral authority"
```

---

### Task 3: Complete CWAAA psychology, records, and email

**Files:**

- Modify: `docs/cwaaa/world-bible.md:1-98`
- Modify: `docs/cwaaa/design.md:7-130`
- Modify: `docs/cwaaa/PRD-cwaaa-web-v1.md:7-88`
- Modify: `docs/cwaaa/README.md:1-25`
- Modify: `docs/cwaaa/migration-manifest.md:20-64`
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
const cwaaaDesign = requireFile(repoRoot, 'docs/cwaaa/design.md', errors);
errors.push(...missingRequiredMarkers(cwaaaDesign, [
  'PARTICIPANT ADVOCACY FILES',
  'NOT POLICE EVIDENCE',
  'NEUTRAL CITATION',
], 'docs/cwaaa/design.md'));

const cwaaaPrd = requireFile(repoRoot, 'docs/cwaaa/PRD-cwaaa-web-v1.md', errors);
errors.push(...missingRequiredMarkers(cwaaaPrd, [
  'IMMEDIATE PLEDGE RECEIPT',
  'ONE CURRENT-ISSUE NEWSLETTER',
  'MONTH AND YEAR',
  'NOT AN ONGOING',
], 'docs/cwaaa/PRD-cwaaa-web-v1.md'));
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

Update `docs/cwaaa/README.md` to list the expanded world bible and finite email contract. Update the
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
$portable=(Get-FileHash -Algorithm SHA256 docs/cwaaa/contracts/pledge.v1.json).Hash
if($campaign -ne $portable){ throw 'Pledge contracts drifted' }
git diff --check
```

Expected: authority passes, the two hashes match, and diff check has no output.

- [ ] **Step 8: Commit the CWAAA authority**

```powershell
git add -- docs/cwaaa/world-bible.md docs/cwaaa/design.md docs/cwaaa/PRD-cwaaa-web-v1.md docs/cwaaa/README.md docs/cwaaa/migration-manifest.md site/scripts/authority-check-lib.mjs
git commit -m "docs: complete CWAAA behavioral authority"
```

---

### Task 4: Correct the Office world and return-state contract

**Files:**

- Create: `docs/office-of-lather-compliance/world-bible.md`
- Modify: `docs/office-of-lather-compliance/design.md:6-136`
- Modify: `docs/office-of-lather-compliance/PRD-office-v1.md:8-113`
- Modify: `docs/office-of-lather-compliance/README.md:1-18`
- Modify: `docs/office-of-lather-compliance/contracts/visit-state.v1.json:1-61`
- Modify: `site/scripts/authority-check-lib.mjs:97-151`
- Modify: `site/scripts/authority-check.test.mjs:1-60`

**Interfaces:**

- Consumes: Shared 1961 history and protected unknowns from Task 1.
- Produces: A deterministic session contract that future Office implementation can test directly.

- [ ] **Step 1: Write a failing Office contract validator test**

Update the test import so the new symbol is required before it exists:

```js
import {
  compareJsonDocuments,
  findForbiddenAuthorityPhrases,
  missingRequiredMarkers,
  validateOfficeStateContract,
} from './authority-check-lib.mjs';
```

Then add this test:

```js
test('Office escalation advances by distinct sessions, never reload count', () => {
  const corrected = {
    thresholds: { continuedInterestSession: 3 },
    persistentRecord: {
      returnSessionCount: 'non-negative integer',
      lifetimeAccessCount: 'positive integer',
      reference: '8804-X',
    },
    sessionRecord: {
      sessionRefreshCount: 'non-negative integer',
    },
    referenceMeaning: 'standing containment reference',
  };

  assert.deepEqual(validateOfficeStateContract(corrected), []);

  const drifted = structuredClone(corrected);
  drifted.thresholds.continuedInterestSession = 4;
  delete drifted.sessionRecord.sessionRefreshCount;
  assert.match(
    validateOfficeStateContract(drifted).join('\n'),
    /third distinct browser session|sessionRefreshCount/i,
  );
});
```

- [ ] **Step 2: Run the unit test and confirm it fails**

Run:

```powershell
npm --prefix site run authority:test
```

Expected: FAIL because `validateOfficeStateContract` is not exported.

- [ ] **Step 3: Implement the contract validator**

Add:

```js
export function validateOfficeStateContract(contract) {
  const errors = [];
  if (contract.thresholds?.continuedInterestSession !== 3) {
    errors.push('Continued Interest must begin on the third distinct browser session.');
  }
  if (!contract.sessionRecord?.sessionRefreshCount) {
    errors.push('Office contract must define sessionRefreshCount.');
  }
  if (!contract.persistentRecord?.returnSessionCount) {
    errors.push('Office contract must define returnSessionCount.');
  }
  if (!contract.persistentRecord?.lifetimeAccessCount) {
    errors.push('Office contract must define lifetimeAccessCount.');
  }
  if (contract.referenceMeaning !== 'standing containment reference') {
    errors.push('8804-X must be a standing containment reference.');
  }
  return errors;
}
```

Call it from `collectAuthorityErrors()` after parsing the Office contract.

Also make the new Office bible enforceable:

```js
const officeBible = requireFile(
  repoRoot,
  'docs/office-of-lather-compliance/world-bible.md',
  errors,
);
errors.push(...missingRequiredMarkers(officeBible, [
  '1961',
  'DELIBERATELY UNSPECIFIED',
  'STANDING CONTAINMENT REFERENCE',
  'VISITOR SUPPLIES THE FEAR',
  'INTENTIONALLY UNRESOLVED',
], 'Office world bible'));
```

- [ ] **Step 4: Replace the Office JSON contract**

Use this state model:

```json
{
  "contractId": "office-visit-state.v1",
  "version": 1,
  "jurisdiction": "deliberately unspecified",
  "publicSurfaceModel": "error states only",
  "referenceMeaning": "standing containment reference",
  "thresholds": {
    "continuedInterestSession": 3
  },
  "storage": {
    "session": "sessionStorage",
    "persistent": "localStorage",
    "namespace": "olc.visit.v1",
    "serverPersistence": false,
    "cookies": false,
    "ipAddress": false,
    "fingerprinting": false
  },
  "persistentRecord": {
    "firstContact": "ISO-8601 timestamp",
    "lastContact": "ISO-8601 timestamp",
    "returnSessionCount": "non-negative integer",
    "lifetimeAccessCount": "positive integer",
    "reference": "8804-X",
    "terminalId": "locally generated fictional browser identifier"
  },
  "sessionRecord": {
    "sessionId": "locally generated ephemeral identifier",
    "sessionRefreshCount": "non-negative integer"
  },
  "stateSelectionOrder": [
    "continued_interest",
    "same_session_refresh",
    "later_return",
    "first_access"
  ],
  "states": [
    {
      "id": "first_access",
      "display": "FIRST ACCESS",
      "condition": "no persistent record",
      "effect": "create persistent and session records; set returnSessionCount to 0 and lifetimeAccessCount to 1"
    },
    {
      "id": "same_session_refresh",
      "display": "SAME-SESSION REFRESH",
      "condition": "session marker exists and returnSessionCount is below 2",
      "effect": "increment sessionRefreshCount and lifetimeAccessCount; never increment returnSessionCount"
    },
    {
      "id": "later_return",
      "display": "LATER RETURN",
      "condition": "new session increments returnSessionCount to exactly 1",
      "effect": "show first and current timestamps and create a new session record"
    },
    {
      "id": "continued_interest",
      "display": "CONTINUED INTEREST",
      "condition": "returnSessionCount is 2 or greater",
      "effect": "remain in Continued Interest stasis on all later accesses"
    }
  ],
  "rendering": {
    "resolveBeforeReveal": true,
    "returningBrowserMayFlashFirstAccess": false
  },
  "fallback": {
    "storageUnavailable": "render a neutral inaccessible-resource state without claiming recognition"
  },
  "forbidden": [
    "ordinary homepage",
    "site navigation",
    "agency explainer",
    "named federal, state, or local jurisdiction",
    "IP address display",
    "backend identity record",
    "cross-device recognition",
    "reload-driven escalation",
    "infinite escalation"
  ]
}
```

- [ ] **Step 5: Create the Office behavioral world bible**

Use these sections:

```markdown
# Office of Lather Compliance world bible

## Canonical identity
## History
## What the Office believes
## Voice
## Emotional law
## What the Office never does
## Public surface
## Recognition and privacy
## 8804-X
## Terminal identity
## Relationship knowledge
## What remains unexplained
## Artifact behavior
```

State that the Office has existed since 1961, its jurisdiction is deliberately unspecified,
`8804-X` is not visitor-specific, and the visitor supplies the fear.

- [ ] **Step 6: Align Office design, PRD, and README**

Replace “third/fourth-return” with the exact session progression:

```markdown
Session 1: First Access; same-session reload: Refresh Denied.
Session 2: Repeat Access; same-session reload never advances the narrative.
Session 3 and later: Continued Interest stasis.
```

Require state resolution before revealing state-dependent copy. Add the world bible to the portable
package index. Preserve the error-only site, no-navigation rule, local-only recognition, and calm
visual restraint.

- [ ] **Step 7: Run Office validation**

Run:

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
Get-Content -Raw docs/office-of-lather-compliance/contracts/visit-state.v1.json | ConvertFrom-Json | Out-Null
rg -n "third/fourth|visitCount" docs/office-of-lather-compliance
git diff --check
```

Expected: unit and authority tests pass, JSON parses, the stale search returns no matches, and diff
check has no output.

- [ ] **Step 8: Commit the Office correction**

```powershell
git add -- docs/office-of-lather-compliance/world-bible.md docs/office-of-lather-compliance/design.md docs/office-of-lather-compliance/PRD-office-v1.md docs/office-of-lather-compliance/README.md docs/office-of-lather-compliance/contracts/visit-state.v1.json site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: correct Office return-state authority"
```

---

### Task 5: Preserve the IVR and promote transmedia mechanics

**Files:**

- Create: `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md`
- Create: `docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf`
- Modify: `docs/world/artifact-continuity.md`
- Modify: `docs/strategy/participation-mechanics.md:90-112`
- Modify: `site/scripts/authority-check-lib.mjs:35-151`

**Interfaces:**

- Consumes: Owner source PDF and shared ambiguity law.
- Produces: A repository-preserved source artifact plus rules preventing a future three-voice rewrite.

- [ ] **Step 1: Add failing IVR preservation checks**

Require the authority file and these markers:

```js
const ivrAuthority = requireFile(
  repoRoot,
  'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
  errors,
);
errors.push(...missingRequiredMarkers(ivrAuthority, [
  'NUMBER LIVES ON GOT SOAP?',
  'TWO PRESENTED VOICES',
  'NO THIRD OFFICE VOICE',
  'NO AUDIBLE TRANSFER',
  'WE HAVE YOUR NUMBER',
  'SOMEONE IS ALREADY ON THEIR WAY',
  'INTENTIONAL WRONGNESS',
], 'IVR authority'));

requireFile(
  repoRoot,
  'docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf',
  errors,
);
```

Update `site/scripts/authority-check.mjs` at this point, after the IVR checks exist:

```js
console.log('- IVR ambiguity and Office session-state rules intact');
```

- [ ] **Step 2: Run the authority gate and confirm IVR failures**

Run:

```powershell
npm --prefix site run authority
```

Expected: FAIL because the IVR authority document and source PDF are missing.

- [ ] **Step 3: Copy and verify the owner PDF**

Copy this exact source:

```text
C:\Users\heirr\.codex\codex-remote-attachments\019f8e5d-4ef6-7d02-96ab-7779beeb7327\033C4071-AADE-497F-9F98-1048EE4A820D\1-1-800-GOT-SOAP-IVR-script.pdf
```

to:

```text
docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf
```

Verify:

```powershell
Get-FileHash -Algorithm SHA256 docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf
pdfinfo docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf
```

Expected SHA-256:

```text
7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0
```

Expected PDF page count: `4`.

- [ ] **Step 4: Create the IVR authority document**

Use these sections:

```markdown
# 1-800-GOT-SOAP IVR authority

## Canonical source
## Public placement
## Two presented voices
## The unresolved handoff
## Lines and branches that must remain
## Why this does not redefine ordinary CWAAA
## Production changes allowed
## Production changes forbidden
```

Include these exact rules:

```markdown
The number lives on Got Soap?.
Voice A is the campaign. Voice B appears to be CWAAA.
There is no third Office voice and no audible transfer.
Office identification arrives through Voice B, leaving the caller unable to prove when or whether
the institution changed.
```

List “We have your number,” Field Assessors, “Someone is already on their way,” the hidden branch,
Office after-hours voicemail, “Everything is noted,” and “binding” as protected substantive lines.

- [ ] **Step 5: Promote the IVR and physical artifacts from experiments to canon**

In `docs/strategy/participation-mechanics.md`, replace the “Later experiments” classification with:

```markdown
The IVR, Office pen, printed card, and event table are canonical transmedia artifacts whose
production may be phased. Their canon is current even when their implementation is not.
```

Keep measurement privacy: no pledge field values, caller reports, quiz answers, IP addresses, or
Office identity profiles enter analytics.

- [ ] **Step 6: Run artifact validation**

Run:

```powershell
npm --prefix site run authority
$hash=(Get-FileHash -Algorithm SHA256 docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf).Hash
if($hash -ne '7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0'){ throw 'IVR PDF drifted' }
git diff --check
```

Expected: authority passes, hash check succeeds, and diff check has no output.

- [ ] **Step 7: Commit the transmedia artifact**

```powershell
git add -- docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf docs/world/artifact-continuity.md docs/strategy/participation-mechanics.md site/scripts/authority-check-lib.mjs
git commit -m "docs: preserve canonical IVR ambiguity"
```

---

### Task 6: Run integrated authority and runtime verification

**Files:**

- Modify only if a validation failure identifies a real authority omission:
  `site/scripts/authority-check-lib.mjs`
- Modify only if output wording has drifted:
  `site/scripts/authority-check.mjs`

**Interfaces:**

- Consumes: Tasks 1-5.
- Produces: A clean, validated documentation branch ready to push to the existing draft PR.

- [ ] **Step 1: Run all documentation tests**

```powershell
npm --prefix site run authority:test
npm --prefix site run authority
```

Expected: every Node test passes and `AUTHORITY CHECK: PASS` reports master canon, three-system
ownership, pledge parity, IVR preservation, and Office session-state rules.

- [ ] **Step 2: Run all existing project gates**

```powershell
npm --prefix site run build
npm --prefix site run gates
npm --prefix site run copy-gates
npm --prefix site run fidelity
npm --prefix site run distinguish
```

Expected:

- Astro build completes successfully.
- General gates pass.
- Copy gates pass.
- Fidelity checker passes.
- Distinguishability checker passes.

- [ ] **Step 3: Run structural drift checks**

```powershell
git diff --check
rg -n "third/fourth-return|\"visitCount\"|CWAAA does not frighten|site is currently empty|there is no application code yet" AGENTS.md CLAUDE.md docs/HANDOFF.md docs/design.md docs/gotsoap docs/cwaaa docs/office-of-lather-compliance docs/strategy site/scripts
$campaign=(Get-FileHash -Algorithm SHA256 docs/contracts/pledge.v1.json).Hash
$portable=(Get-FileHash -Algorithm SHA256 docs/cwaaa/contracts/pledge.v1.json).Hash
if($campaign -ne $portable){ throw 'Pledge contracts drifted' }
git status --short
```

Expected:

- `git diff --check` has no output.
- stale-authority search has no matches.
- pledge hashes match.
- status is clean after the five task commits.

- [ ] **Step 4: Inspect the commit sequence**

```powershell
git log --oneline -7
```

Expected newest commits:

```text
docs: preserve canonical IVR ambiguity
docs: correct Office return-state authority
docs: complete CWAAA behavioral authority
docs: complete Got Soap behavioral authority
docs: establish shared transmedia canon
docs: plan transmedia authority revision
docs: specify transmedia canon authority
```

- [ ] **Step 5: Push the branch and refresh the draft PR**

```powershell
git push origin codex-cwaaa-authority-split
gh pr view 1 --json url,state,isDraft,headRefName
```

Expected: push succeeds and PR `#1` remains open on `codex-cwaaa-authority-split`.
