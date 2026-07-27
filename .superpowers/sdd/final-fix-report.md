# Final Whole-Branch Correction Report

## Review identity

- Worktree: `C:\tmp\GotSoap-cwaaa-authority`
- Branch: `codex-cwaaa-authority-split`
- Reviewed head: `f53fc98bd0188a668e18feb01274cbdd96b92901`
- Governing spec: `docs/superpowers/specs/2026-07-23-transmedia-canon-and-authority-revision-design.md`
- Fix brief: `.superpowers/sdd/final-fix-brief.md`
- Commit subject: `fix: enforce canon authority contracts`

## Outcome

All Critical and Important findings in the final fix brief are corrected. The work is limited to documentation, machine-readable contracts, and authority validation/tests. There are no changes under `site/src`, and the canonical IVR PDF is byte-identical to reviewed head.

The final adversarial audit found five additional validator false passes before commit. Those probes were converted to RED tests and fixed: root `docs/design.md` role classification, compound-sentence CWAAA role drift, compound-sentence relationship resolution, active-voice third-Office-voice wording, and active-voice audible-transfer wording. Office state coverage was also split into independent one-field mutations for every named invariant and selector.

## Implemented corrections

### Protected mystery and authority split

- Scoped CWAAA/Office separation claims to public authorship and public disclosure without proving operational separation.
- Preserved private legal separation while keeping the public relationship intentionally unresolved.
- Kept the IVR as the controlled exception: two presented voices, no audible transfer, Office language intact, and authorship unresolved.
- Reframed the Office website as error-only without objectively denying Field Assessor dispatch.
- Added path-aware chronology, institutional-role, relationship-resolution, and over-resolution checks.
- Isolated assertions by sentence while preserving the literal `Got Soap?` brand punctuation, so an unrelated denial cannot mask a forbidden fact.

### Office state contract

- Reconciled the PRD and JSON so same-session refresh applies only below the Continued Interest threshold; session 3 and later remain in Continued Interest stasis.
- Added explicit first-access and guarded new-session transitions.
- Enforced exact storage backends, namespace, privacy flags, pre-reveal rendering, terminal identity, state-selection context, first/new/same-session effects, state order/IDs, and every selector.
- Added independent one-mutation tests for the threshold, record fields, storage, privacy, rendering, terminal identity, state context, first/new/same-session transitions, order/IDs, and all selectors.

### IVR integrity

- Read the PDF as a raw `Buffer` and require exact SHA-256 `7748CEF...D6AF1AB0` (full value in the evidence below).
- Added missing, empty, and modified-byte failure tests.
- Gated Field Assessors, hidden branch, Office after-hours voicemail, “Everything is noted,” “binding,” two voices, and no audible transfer.
- Preserved the PDF itself without modification.

### Form CW-1 fulfillment

- Defined one finite, CWAAA-authored two-message fulfillment contract for both public pledge presentations.
- Required immediate receipt plus one separately delivered current issue, consent withdrawal suppression, unsubscribe/suppression, no third provider message, no ongoing subscription/drip, and separate future-program approval/contract/consent.
- Defined minimal Buttondown retention and analytics exclusion without inventing another provider.
- Kept both pledge JSON files byte-identical and upgraded parity validation from decoded text to `Buffer.equals`.
- Recorded current “Movement Updates” and Sniff Test Field Assessor copy as migration/copy-lane defects; no runtime copy was edited.

### Handoff, portability, and artifacts

- Added the complete seven-level authority precedence and all closed decisions required by the brief.
- Distinguished current runtime state from target ownership for Shop, film surfaces, phone, Sniff Test, and email.
- Defined shared contract `gotsoap-world-canon.v1`, version 1, upstream repository/path, subordinate-snapshot status, extraction-time source commit recording, resync-before-release, and exact dependency closures.
- Split artifact “Actual owner” into “Fictional owner” and “Documentation authority”; corrected phone/card, pledge, campaign edition, business card, event table, and future-film/packaging ownership language.

## TDD evidence

All validator behavior was developed test-first.

1. Baseline before adversarial additions: `npm --prefix site run authority:test` passed 8/8.
2. Initial RED after adding the brief's adversarial suite: exit 1; 111 tests, 9 passed, 102 expected failures. Failures covered raw-byte parity, path-aware roles/chronology/mystery, IVR integrity/markers, exact Office state fields, structured pledge fulfillment, HANDOFF, portability, artifact ownership, and email documentation.
3. Implementation progression: 78 pass / 33 fail, then 108 / 3, then 110 / 1.
4. Initial GREEN: 111/111 passed.
5. Final read-only audit found five phrasing/scope false passes and incomplete independent Office mutation coverage. Added those tests before code changes.
6. Final audit RED: exit 1; 136 tests, 131 passed, 5 expected failures:
   - Got Soap? regulating in root `docs/design.md` authority;
   - CWAAA regulation followed by an unrelated negative sentence;
   - resolved public-facing-layer assertion followed by an unrelated nonprofit disclaimer;
   - active-voice third Office voice; and
   - Voice B audibly transferring the caller.
7. Final GREEN: `npm --prefix site run authority:test` passed 136/136, with every Office one-field mutation passing independently.

## Fresh acceptance evidence

- `npm --prefix site run authority:test` — PASS, 136/136.
- `npm --prefix site run authority` — PASS; shared canon, path-aware authority, pledge bytes/fulfillment, Office state/privacy, and exact IVR integrity all reported intact.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54 rows.
- `npm --prefix site run distinguish` — PASS; all five environments remain distinguishable.
- JSON parsing — PASS for both pledge contracts and the Office visit-state contract.
- Pledge raw-byte parity — PASS (`Buffer.equals === true`).
- IVR page diagnostic — 4 `/Type /Page` markers.
- `git diff --check` — PASS; only repository-configured LF-to-CRLF notices.
- Stale/live authority scan — PASS; `rg` returned the expected no-match exit 1 with no findings.
- `git diff --exit-code -- site/src` — PASS, no runtime changes.
- `git diff --exit-code -- docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf` — PASS, no PDF diff.

## Artifact hashes

| Artifact | Bytes | SHA-256 |
| --- | ---: | --- |
| `docs/contracts/pledge.v1.json` | 3370 | `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a` |
| `docs/cwaaa/contracts/pledge.v1.json` | 3370 | `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a` |
| `docs/office-of-lather-compliance/contracts/visit-state.v1.json` | 4643 | `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197` |
| `docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf` | 48058 | `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0` |

## Changed files

1. `.superpowers/sdd/final-fix-report.md`
2. `AGENTS.md`
3. `docs/HANDOFF.md`
4. `docs/contracts/pledge.v1.json`
5. `docs/cwaaa/PRD-cwaaa-web-v1.md`
6. `docs/cwaaa/README.md`
7. `docs/cwaaa/contracts/pledge.v1.json`
8. `docs/cwaaa/migration-manifest.md`
9. `docs/cwaaa/world-bible.md`
10. `docs/office-of-lather-compliance/PRD-office-v1.md`
11. `docs/office-of-lather-compliance/README.md`
12. `docs/office-of-lather-compliance/contracts/visit-state.v1.json`
13. `docs/office-of-lather-compliance/world-bible.md`
14. `docs/prd/PRD-gotsoap-web-v1.md`
15. `docs/strategy/participation-mechanics.md`
16. `docs/world/README.md`
17. `docs/world/WORLD-BIBLE.md`
18. `docs/world/artifact-continuity.md`
19. `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md`
20. `site/scripts/authority-check-lib.mjs`
21. `site/scripts/authority-check.mjs`
22. `site/scripts/authority-check.test.mjs`

## Editing fallback

The required `apply_patch` path was attempted first but the known Windows `C:\tmp` sandbox wrapper could not prepare the edit; a sandboxed `git apply` attempt also lacked permission. Following the brief, all edits used scoped, reviewable unified diffs applied with `git apply` under the approved elevated fallback. No broad rewrite or destructive command was used.

## Remaining concerns

No blocker remains for this documentation/contract correction. Two deliberately deferred runtime copy corrections remain recorded for the later copy lane: recurring “Movement Updates” language and CWAAA Field Assessor ownership in the Sniff Test. The general gate also reports four development stand-ins allowed by the current spec; production launch still requires their existing replacement workflow. Extraction packages must populate the source-commit field at transfer time and resync shared canon before release, as designed.

## Independent re-review hardening

The independent re-review found one remaining objective relationship resolution in the divergence
roadmap and several semantic-gate gaps. The roadmap now keeps only private legal separation as
objective canon; ordinary public artifacts do not establish operation, technical-service provision,
or acting-through relationships. The validator now joins soft-wrapped prose before clause analysis,
scopes negation and unresolved-context protection to the relevant clause, and scans the shared world
README, WORLD-BIBLE, artifact-continuity authority, IVR authority, and every current live authority
document.

Adversarial coverage now rejects all requested positive and objective-denial relationship variants,
shared-authority role and pledge drift, date-first chronology drift, same-sentence negation bypasses,
and all requested IVR voice/handoff variants. Office validation now pins each state condition and
effect, the exact fallback object, and all forbidden rules. Pledge validation now pins contract
identity/version, implementations, Buttondown configuration, every field definition (including the
actual consent field's `required` property), success semantics/actions,
`privacy.requiresAffirmativeConsent`, and all executable invariants.

### Re-review TDD evidence

1. Re-review RED: `npm --prefix site run authority:test` exited 1 with 224 tests, 148 passed and 76
   expected failures.
2. Two additional objective-denial probes were then added and run by focused name pattern; both
   failed before implementation.
3. First implementation run exposed clean-corpus false positives and diagnostic mismatches:
   226 tests, 137 passed and 89 failed.
4. After paragraph soft-wrap handling and package-scoped bare chronology markers: 226 tests,
   222 passed and 4 diagnostic-only failures.
5. Final GREEN, rerun after the last validator scope cleanup:
   `npm --prefix site run authority:test` passed 226/226.
6. A direct 12-string probe passed for every phrase named by the re-review, including the two
   objective-denial forms.

### Re-review acceptance evidence

- `npm --prefix site run authority:test` — PASS, 226/226.
- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54 rows.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse with `JSON.parse`.
- Pledge raw-byte parity — PASS (`Buffer.equals === true`).
- IVR integrity — exact SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`; 4 `/Type /Page`
  markers.
- `git diff --check` — PASS; only the repository-configured LF-to-CRLF notice.
- Stale/live authority scan — PASS, no matches.
- `git diff --exit-code -- site/src` — PASS, no runtime changes.
- `git diff --exit-code -- docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf` — PASS, no PDF
  changes.

The Astro build initially hit a sandbox-only EPERM while writing `site/.astro/content.d.ts`, and
fidelity initially hit a sandbox-only EPERM spawning its child `git` process. Both commands passed
unchanged under the approved elevated execution path. The required `apply_patch` edit path again
failed because the known Windows `C:\tmp` sandbox wrapper could not prepare split writable roots;
edits used the same scoped unified-diff `git apply` fallback documented above.

The focused re-review commit changes only this report,
`docs/strategy/cwaaa-divergence-roadmap.md`, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.
