# Office of Lather Compliance — from specification to launch

**Prepared:** 2026-09-07 · **Audience:** Claude Code and Stacey · **Status:** implementation handoff; specified experience, no standalone runtime identified.

Build a separate error-only site. Every public URL returns the Office's unavailable-resource experience. Recognition is local to the browser; ordinary institutional certainty supplies the effect. Complete means the custom states, failure behavior, accessibility, deployment and CWAAA referral work, with no unapproved decoration or additional public service.

## Start here, Claude

> Implement the Office from its existing design and state contract. First verify the source and distinguish locked behavior from the few remaining decisions. Grill me thoroughly on the exact storage-failure wording and displayed count, then on the necessary deployment/disclosure details. Show concrete scenarios and follow up until each answer is implementable. Record the decision before building its dependent branch. Do not reopen the site's under-designed appearance, create graphics, or turn protected uncertainty into an explanation. Keep physical artifacts and any future expansion in a later-work list.

Read [owner decisions](../docs/HANDOFF.md), [shared canon](../docs/world/WORLD-BIBLE.md), [Office world](docs/world-bible.md), [design and exact state copy](docs/design.md), [target PRD](docs/PRD-office-v1.md), [UI decisions](docs/ui-system.md), [state contract](docs/contracts/visit-state.v1.json), and [graphics brief](GRAPHICS-TO-MAKE.md). This handoff orders execution under those authorities; it does not introduce new canonical copy or a second state contract.

## 1. Current state and locked direction

The Office folder contains documentation, a machine-readable visit contract, and local handoff instructions. No implemented Office app, actual domain, catch-all deployment, or final storage-failure copy was identified in the repository. The campaign's `../site/` remains a combined Astro runtime; its 404 is not an Office implementation.

Locked rules:

- **The Office page must appear under-designed.** Plain white background, black text, Courier New with the documented fallback stack, one ordinary left-aligned column. Follow the existing 48px/24px/80px/52px margins, 760px maximum width, and 16px/1.45 reference; narrow-screen adaptation preserves plain reading order.
- No logo, navigation, normal homepage, About, regulations library, services, searchable records, accounts, status chips, frames, shadows, accent colors, textures, scanlines, animation, terminal styling or horror presentation.
- The Office has existed since 1961; jurisdiction is deliberately unspecified. `8804-X` is a standing containment reference, not a personal identifier.
- Ordinary pages never explain the Office/CWAAA relationship. No Office page processes, receives, stores or fulfills pledge data.
- Use only `sessionStorage` and `localStorage` for recognition. No cookies, IP addresses, fingerprinting, authentication, backend identity records, cross-device matching or third-party analytics without a separate decision.
- Copy is the performance. Render the four approved notices from design authority exactly, with only approved dynamic values. Do not invent an escalation or unlock normal content on later visits.

## 2. Owner interview: the remaining branches

Use the grill-with-docs method: read the exact clause, show a concrete visitor scenario, provide options and a recommendation, ask focused follow-ups, then record the confirmed wording/behavior. Do not treat a new reply as permission to redesign unrelated locked sections.

| Decision ID | Questions and follow-ups | Completion artifact |
|---|---|---|
| OLC-D01 | What exact neutral notice appears when persistence is unavailable? Test the proposed words against first use, blocked reads, blocked writes, corrupt storage, and JavaScript disabled. Does any word falsely claim a log, identity, memory or prior contact? | Approved fallback copy and scenario coverage in the UI/design authority; no invented dramatic language |
| OLC-D02 | Which existing contract counter supplies `[count]` in Continued Interest? Show session 3 with and without earlier reloads, then a same-session refresh. Which number should the visitor read? | Explicit binding and display examples recorded in UI authority; preserve the contract's session threshold and narrative stasis |
| OLC-D03 | What is the actual domain/build location, root/unknown-path HTTP response, crawler policy, and destination for quiet legal/privacy links? How is truthful creator disclosure accessed without adding Office navigation or useful agency content? | Deployment/response/disclosure matrix approved by Stacey; existing public-surface law preserved |
| OLC-D04 | Confirm narrow-screen margins and timestamp presentation where not already specified; how should long generated values wrap and read aloud? | Small implementation additions and acceptance examples; no second visual register |

D01 and D02 are expressly open in the current UI authority. D03/D04 concern deployment and uncovered edge details, not permission to reopen the page design. Record **decision, rationale, affected states, source authority and tests**. Update the contract only if Stacey explicitly changes its semantics; ordinary display clarification must not alter its transitions.

The fictional mystery is never an interview branch to solve. Do not ask who actually controls the IVR or what happened in 1961. Those questions stay intentionally unresolved.

## 3. Required state behavior

Implement the exact [visit-state contract](docs/contracts/visit-state.v1.json), including namespace `olc.visit.v1`, record fields, transitions and selection precedence. Inject time and storage for deterministic tests. Generate fictional browser-local identifiers without identity/fingerprint inputs.

| Access scenario | Required visible state | Required transition / invariant |
|---|---|---|
| First access, persistent record absent | FIRST ACCESS | Create persistent/session records; return count 0, lifetime access 1, refresh count 0; skip the new-session increment |
| Reload within session 1 | SAME-SESSION REFRESH | Preserve return count; increment refresh and lifetime counts only |
| First access in session 2 | LATER RETURN | Existing persistent record and session marker absent at access start: increment return/lifetime once; initialize session record; post-transition return count is 1 |
| Reload within session 2 | SAME-SESSION REFRESH | No narrative advance or return-count increment |
| First access in session 3 | CONTINUED INTEREST | Run the new-session transition once; post-transition return count reaches 2 |
| Reload or later session after threshold | CONTINUED INTEREST | Remain in narrative stasis; bookkeeping may change under the existing contract; no fifth notice or escalation |
| Storage unavailable or untrustworthy | Approved neutral fallback | No claim of log, terminal identity, previous contact or persistence; do not synthesize a recognized visitor |

Capture whether the session marker exists **before** modifying storage. A newly created marker must not turn the first visit of that session into a refresh. Continued Interest has precedence at return count 2 or greater. Distinct session recognition follows the specified storage lifecycle, not elapsed hours, IP or assumed person identity; test browser session restoration and new-tab behavior against actual `sessionStorage` semantics without inventing a new tracking mechanism.

Resolve storage, transition and selected copy before revealing any state-dependent notice. A returning browser must never flash First Access. The accessible neutral shell is available when script cannot run; do not leave a blank screen or add an animated loading sequence.

Treat malformed or partially written local records safely: do not crash or assert recognized contact from unverifiable state. Decide the fallback handling in OLC-D01 without adding fields or changing thresholds casually. Test read and write failures separately; a successful read followed by failed persistence must not produce a false claim that the new record was stored.

## 4. Public routes, delivery and disclosure

- Root and catch-all paths share one state engine and approved copy source. Unknown URLs do not reveal ordinary pages, platform-branded 404s, route-specific clues or alternate institutional material.
- Choose the standalone app/build location in OLC-D03 before scaffolding. Use a minimal static-first shell with local CSS/JS and the documented type stack, no backend service or client framework without necessity. Do not relocate or replace the campaign app.
- If a font file is shipped, verify self-hosting and distribution rights. Do not add a Fontsource dependency, second family or decorative face to resolve a loading convenience.
- Record the exact root and unknown-path HTTP response behavior and verify it on the deployed host. A local development fallback does not prove production catch-all behavior.
- Configure the actual origin and a restrictive compatible Content Security Policy. No third-party analytics, remote font request, tracking beacon or transmission of visit state is needed for this experience.
- Keep Privacy, Terms and DMCA accessible through approved quiet plain-text disclosure links after the error text. Select a truthful destination that preserves error-only Office routes; do not add a normal Office legal/about site or agency navigation. Creator/fiction disclosure remains behind the approved seam. Resolve the practical destination in OLC-D03 rather than inventing a dead link.
- The CWAAA implementer consumes the real `OFFICE_SITE_URL` only when the destination is verified. CWAAA gives no ominous preview or relationship explanation. The Office does not gain ordinary back-navigation as part of that wiring.

Required on-page graphics: **none**, tracked as OLC-G00 in [the graphics brief](GRAPHICS-TO-MAKE.md). All names, dates, reference numbers, notices and status text remain semantic HTML. Native heading weight and paragraph spacing provide the hierarchy.

## 5. Implementation milestones

| Order | Responsible party | Exit criterion |
|---|---|---|
| OLC-M1 | Claude + Stacey | D01–04 answered where necessary and recorded; existing state/copy laws preserved |
| OLC-M2 | Claude | Deterministic pure state/transition logic with injectable time/storage; complete contract tests |
| OLC-M3 | Claude | Plain accessible shell, all four notices, approved neutral fallback, resolve-before-reveal behavior and no prohibited visual additions |
| OLC-M4 | Claude + deployment owner | Root/catch-all, security policy, approved disclosure, real domain and crawler behavior verified in preview |
| OLC-M5 | Claude + CWAAA implementer | Authorized deployment, actual-domain smoke test and correct CWAAA referral; shared canon record current |

Keep shared world/artifact authority centralized. If transferred to another repository, follow [the portable package synchronization contract](docs/README.md): complete dependency closure, recorded source commit/version, and hash verification. No separate Office version may silently rewrite the IVR or world.

## 6. Release test matrix

- Exercise every table row above with deterministic timestamps and identifiers. Confirm counts before and after transitions, including multiple reloads before session 3. Display count follows the recorded D02 choice, never an inference.
- Test new session versus same-session reload, later sessions, session restoration, new tab, cleared storage, malformed records, only one storage API available, blocked reads, denied writes, and disabled JavaScript. Verify the approved fallback makes no false recognition claim.
- Capture first and returning renders to prove no First Access flash. Test slow CPU/script loading without a designed loading interlude.
- Verify root, arbitrary nested unknown paths and direct reloads on the deployed host. Check actual HTTP behavior, crawler rules and every plain-text disclosure destination.
- Test keyboard, semantic heading/status reading, long ID/timestamp wrapping, 200% zoom, narrow screens and high-contrast modes. Reduced motion must not reveal different content; there is no authored animation to disable.
- Inspect network and storage: only authorized local resources, no transmission of identifiers/history, no cookies or trackers, no server identity persistence. Verify only the contract's expected records support the gag.
- Review screenshots for ordinary under-designed appearance: white/black, one type family, no logo, navigation, panels, accent or horror styling.
- Test the CWAAA deep referral in both absent-config and real-config states; the final connected release must reach this custom experience.
- Run the standalone build and state/route checks. From `../site/`, run the repository build, font audit, gates, copy-gates, fidelity, distinguish and authority checks for shared changes; run `authority:test` if authority tooling changes.

**Launch blockers:** unapproved fallback/count mapping, incorrect transitions, misleading recognition after storage failure, first-state flash, broken deployed catch-all, missing truthful disclosure, tracking, invented public content, unresolved required deployment decisions or failed accessibility/tests. An ordinary-looking static mockup alone does not complete the experience.

## 7. Later work — artifacts and expansion

| ID | Deferred item | Required decision |
|---|---|---|
| OLC-L01 | Office pen | Complete approved physical imprint and manufacturing brief; 1961 continuity remains unexplained; no website product display |
| OLC-L02 | Office business card / event-table artifact | Complete artifact copy, dimensions, material and rights; no unverified live contact promise or clean handoff explanation |
| OLC-L03 | Any additional return state or Easter egg | Separate owner decision and revised contract/tests; current stasis never silently grows |
| OLC-L04 | IVR-related physical/production support | Shared IVR authority and Got Soap?'s placement ownership; two presented voices, no third Office voice or audible transfer |

Carry these IDs into the completion report with next action and owner. Launch does not authorize an ordinary Office homepage, a service, or a merchandise section later.

## Handoff verification — 2026-09-07

The six launch/graphics documents were checked for valid local links and defined graphics IDs. The existing combined application passed fresh `build` (22 pages), `gates`, `copy-gates`, authoritative `fidelity` (55/55), `distinguish`, and `authority` checks. `audit:fonts` passed with 0 errors and reported 7 restricted fonts and 19 unassigned files. Those warnings do not approve additional font delivery.

Runtime source, shared/portable contracts, canonical IVR PDF and frozen copy evidence retained their pre-handoff content hashes. These results validate the documentation delivery against the unchanged combined runtime; they do not certify a standalone site, final graphics, live email service, or production deployment. Re-run the release tests in this PRD after implementation. No deployment was performed by this documentation handoff.
