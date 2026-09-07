# Product requirements — Office of Lather Compliance

**JURISDICTION: DELIBERATELY UNSPECIFIED**
**PUBLIC SURFACE MODEL: ERROR STATES ONLY**
**State contract:** `contracts/visit-state.v1.json`
**Design authority:** `../design.md`

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

Session 1: First Access; same-session reload: Refresh Denied.
Session 2: Repeat Access; same-session reload never advances the narrative.
Session 3 and later: Continued Interest stasis.

### Deterministic resolution order

1. Read the persistent record and capture whether the current session marker existed at the start of
   the access, before creating or changing any record.
2. With no persistent record, select First Access, skip the new-session transition, and create the
   persistent and session records with the initial values specified below.
3. With a persistent record and a marker that existed at access start, run the same-session counter
   transition: preserve `returnSessionCount`, increment `sessionRefreshCount` and
   `lifetimeAccessCount`, then select the visible state. SAME-SESSION REFRESH APPLIES ONLY WHILE
   `returnSessionCount` IS BELOW `2`; at `2` or greater, Continued Interest takes precedence and
   remains visible on reload.
4. With a persistent record and no marker at access start, set `newSession` to true and run the
   pre-selection new-session transition exactly once: increment `returnSessionCount` and
   `lifetimeAccessCount` by one, update last contact, and create a fresh session record with
   `sessionRefreshCount` set to `0`.
5. Select by post-transition count: `1` is Later Return; `2` or greater is Continued Interest. For
   an existing same-session marker, the unchanged count determines the same threshold.
   The newly created session marker must not be mistaken for a same-session reload.

### FIRST ACCESS

Render the administrative containment notice. Create persistent and session records, set
`returnSessionCount` to `0` and `lifetimeAccessCount` to `1`, and store first contact and a fictional
terminal ID in the browser. Reference `8804-X` is a standing containment reference, not visitor
identity.

### SAME-SESSION REFRESH

Before the Continued Interest threshold, render the terse refresh-denied notice. Preserve first
contact, terminal ID, reference, and `returnSessionCount`. Increment `sessionRefreshCount` and
`lifetimeAccessCount`; reloads never increment `returnSessionCount` or advance the narrative. At the
threshold, the same counter transition runs but the visible state remains Continued Interest.

### LATER RETURN

On the second distinct browser session, the pre-selection new-session transition changes
`returnSessionCount` from `0` to `1` exactly once, increments `lifetimeAccessCount`, and creates the
fresh session record before state selection. Later Return then renders repeat access with terminal ID,
original timestamp, current timestamp, reference, and active status. Reloads within this session remain
Refresh Denied and do not advance.

### CONTINUED INTEREST

On the third distinct browser session, the same pre-selection new-session transition changes
`returnSessionCount` from `1` to `2` exactly once before state selection. Continued Interest then
matches the post-transition count. Session 3 and all later sessions remain in Continued Interest
stasis, including reloads; there is no fourth-return escalation. Reloads may increment refresh and
lifetime-access bookkeeping but never replace Continued Interest with Refresh Denied.

Exact copy and ordering are in `../design.md`.

## Recognition and privacy

- Use `sessionStorage` for same-session recognition.
- Use `localStorage` for later-return recognition.
- Recognize a browser profile, never claim to recognize a person.
- Generate terminal ID locally.
- Do not request, derive, display, or store an IP address.
- No fingerprinting, cookies, authentication, server database, or cross-device stitching.
- Resolve state before revealing state-dependent copy; a returning browser must never flash First
  Access while local storage is read.
- If storage throws or is blocked, render a neutral inaccessible-resource state without claiming
  recognition or persistence.
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
- Accessible neutral inaccessible-resource shell; client logic resolves the correct stored state
  before revealing state-dependent copy.
- Content Security Policy compatible with self-hosted CSS/JS/fonts.
- No third-party analytics on the Office domain unless separately approved; recognition behavior
  itself is the sensitive effect.

## Test matrix

| Scenario | Expected |
|---|---|
| session 1, new browser profile | FIRST ACCESS |
| session 1 reload | SAME-SESSION REFRESH / Refresh Denied; no narrative advance |
| session 2, close/reopen later | LATER RETURN / Repeat Access |
| session 2 reload | SAME-SESSION REFRESH / Refresh Denied; no narrative advance |
| session 3 and later | CONTINUED INTEREST stasis |
| storage blocked | neutral inaccessible-resource fallback, no recognition claim or crash |
| private session reopened after disposal | FIRST ACCESS |
| different browser/device | FIRST ACCESS |
| arbitrary path | same state engine, no useful content |

## Acceptance

- All public paths are error states only.
- All four states match approved copy and hierarchy.
- Session state advances only on distinct browser sessions; reload count never drives escalation.
- State-dependent copy is not revealed until browser-local state has resolved.
- Jurisdiction remains deliberately unspecified.
- Terminal ID is fictional and local; no IP or fingerprint data is used.
- First-contact timestamp survives later returns in the same browser profile.
- Same-session refresh and later return are distinguishable.
- Continued interest stops escalation.
- No ordinary homepage, navigation, explainer, pledge, or nonprofit content is reachable.
- Accessibility, privacy, storage-failure, and routing tests pass.
