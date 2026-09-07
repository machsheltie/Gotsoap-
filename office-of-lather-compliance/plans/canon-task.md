# Office of Lather Compliance: task 4 reading extract

Source: [the shared coordinated plan](../../docs/superpowers/plans/2026-07-23-transmedia-canon-authority-revision.md). This is a preserved task excerpt, not independent authority or a new instruction to execute historical commands. Current local PRD and design win conflicts. Paths within the excerpt are repository-relative unless explicitly relative.

### Task 4: Correct the Office world and return-state contract

**Files:**

- Create: `office-of-lather-compliance/docs/world-bible.md`
- Modify: `office-of-lather-compliance/design.md:6-136`
- Modify: `office-of-lather-compliance/docs/PRD-office-v1.md:8-113`
- Modify: `office-of-lather-compliance/docs/README.md:1-18`
- Modify: `office-of-lather-compliance/docs/contracts/visit-state.v1.json:1-61`
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
  'office-of-lather-compliance/docs/world-bible.md',
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
Get-Content -Raw office-of-lather-compliance/docs/contracts/visit-state.v1.json | ConvertFrom-Json | Out-Null
rg -n "third/fourth|visitCount" office-of-lather-compliance/docs
git diff --check
```

Expected: unit and authority tests pass, JSON parses, the stale search returns no matches, and diff
check has no output.

- [ ] **Step 8: Commit the Office correction**

```powershell
git add -- office-of-lather-compliance/docs/world-bible.md office-of-lather-compliance/design.md office-of-lather-compliance/docs/PRD-office-v1.md office-of-lather-compliance/docs/README.md office-of-lather-compliance/docs/contracts/visit-state.v1.json site/scripts/authority-check-lib.mjs site/scripts/authority-check.test.mjs
git commit -m "docs: correct Office return-state authority"
```

---
