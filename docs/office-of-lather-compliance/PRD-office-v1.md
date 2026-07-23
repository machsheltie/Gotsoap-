# Product requirements — Office of Lather Compliance

**JURISDICTION: DELIBERATELY UNSPECIFIED**
**PUBLIC SURFACE MODEL: ERROR STATES ONLY**
**State contract:** `contracts/visit-state.v1.json`
**Design authority:** `design.md`

## Product

The Office is a fictional government regulator encountered through a referral from CWAAA and
world-building artifacts. Its website performs one idea: the visitor reaches a resource the Office
will not provide, and the refusal remembers the browser's return.

## Product law

Every public URL renders the state machine. There is:

- **NO ORDINARY HOMEPAGE;**
- no navigation;
- no about page;
- no office history;
- no staff or contact directory;
- no regulations library;
- no searchable records;
- no login;
- no working public service.

The domain root is not an exception.

## States

### FIRST ACCESS

Render the administrative containment notice. Generate and store first contact, visit count,
reference `8804-X`, and fictional terminal ID in the browser.

### SAME-SESSION REFRESH

Render the terse refresh-denied notice. Preserve first contact and reference. Recognize the action
without revealing the full later-return composition.

### LATER RETURN

When a persistent record exists but the session marker does not, render repeat access with terminal
ID, original timestamp, current timestamp, reference, and active status.

### CONTINUED INTEREST

At the configured third/fourth-return threshold, render the continued-interest notice and stop
escalating. Subsequent returns remain in this state.

Exact copy and ordering are in `design.md`.

## Recognition and privacy

- Use `sessionStorage` for same-session recognition.
- Use `localStorage` for later-return recognition.
- Recognize a browser profile, never claim to recognize a person.
- Generate terminal ID locally.
- Do not request, derive, display, or store an IP address.
- No fingerprinting, cookies, authentication, server database, or cross-device stitching.
- If storage throws or is blocked, render first access without falsely claiming saved persistence.
- Provide a quiet, truthful privacy disclosure if required by deployment policy.

## Routing

A catch-all route and root route both render the same state engine. Pathnames may be recorded only as
ephemeral display context if approved; they do not unlock content. Return appropriate HTML status
semantics without allowing platform default error pages to replace the experience.

## Relationship boundaries

- CWAAA is an external nonprofit referrer, not an Office parent or department.
- Got Soap? is an external campaign, not an Office program.
- The Office does not process the Lather Pledge or Buttondown subscriber data.
- No Office page links back through ordinary navigation. Any future exit is an explicit owner
  decision.

## Technical requirements

- Static-first implementation with a small client-side state engine.
- Functional without a backend.
- All state-machine branches unit tested with injectable time and storage.
- Deterministic terminal-ID format without using fingerprint inputs.
- Accessible server-rendered first-access shell; script upgrades to the correct stored state.
- Content Security Policy compatible with self-hosted CSS/JS/fonts.
- No third-party analytics on the Office domain unless separately approved; recognition behavior
  itself is the sensitive effect.

## Test matrix

| Scenario | Expected |
|---|---|
| new browser profile | FIRST ACCESS |
| reload in same session | SAME-SESSION REFRESH |
| close/reopen later | LATER RETURN |
| threshold reached | CONTINUED INTEREST |
| storage blocked | FIRST ACCESS fallback, no crash |
| private session reopened after disposal | FIRST ACCESS |
| different browser/device | FIRST ACCESS |
| arbitrary path | same state engine, no useful content |

## Acceptance

- All public paths are error states only.
- All four states match approved copy and hierarchy.
- Jurisdiction remains deliberately unspecified.
- Terminal ID is fictional and local; no IP or fingerprint data is used.
- First-contact timestamp survives later returns in the same browser profile.
- Same-session refresh and later return are distinguishable.
- Continued interest stops escalation.
- No ordinary homepage, navigation, explainer, pledge, or nonprofit content is reachable.
- Accessibility, privacy, storage-failure, and routing tests pass.
