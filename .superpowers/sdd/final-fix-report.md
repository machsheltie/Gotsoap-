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

## Final checker hardening

A final read-only checker verdict identified three validator-only gaps; no canon content changed.
Seven direct relationship labels now reject partner, operator/operation, coordinator/coordination,
oversight, on-behalf, acts-through, and control formulations in either institutional direction.
Markdown blockquotes and inline quoted/code spans are classified out of semantic assertion scanning
instead of relying on magic prefixes. Chronology checks now split `while` clauses and remove only
explicitly negated wrong-date tails before matching, preserving the direct wrong-date rejections.

The implementation plan's expanded-authority list was audited against the collector. The only
missing active prose path was `.claude/rules/gotsoap-web-design.md`; it is now copied into test
fixtures, scanned as current live authority, and proven clean in its actual form while fixture
contradictions fail. Historical plans and archived/superseded files remain outside the active scan.

### Final checker TDD evidence

1. RED: `npm --prefix site run authority:test` exited 1 with 243 tests, 228 passed and 15 expected
   failures: seven relationship false passes, six quote/correct-chronology false positives, and two
   live-path collector failures.
2. Focused GREEN: 17/17 new relationship, quote, chronology, control, and live-path tests passed.
3. Full GREEN: `npm --prefix site run authority:test` passed 243/243.
4. Combined old and new direct corpora passed 27/27: 19 required rejections and 8 required
   non-assertive/correct allowances.

### Final checker acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- IVR: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Pledge SHA-256 (both copies):
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state SHA-256:
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- Stale/live scan and `git diff --check` — PASS.
- `site/src`, all contract files, and the canonical IVR PDF — unchanged.

The recurring Windows sandbox EPERM affected only Astro's generated type write, fidelity's child
`git`, and the Node focused-test worker. Each command passed unchanged under the approved elevated
execution path. `apply_patch` again could not prepare the `C:\tmp` split-root sandbox; scoped
unified-diff `git apply` was used. Remaining concerns are unchanged: four current development
stand-ins are allowed by the non-production gate, and the two previously documented runtime copy
corrections remain deferred to their authorized lane.

This focused commit changes only this report, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.

## Inline styling checker closure

The final focused review found one Important checker-only bypass: semantic clause preparation
deleted all inline code, curly-quoted, and ASCII-quoted spans before authority matching. That let
forbidden predicates evade the checker merely by styling a role word or the whole predicate. No
canon, content, contract, runtime, or IVR artifact changed.

Inline spans are now classified from the surrounding clause on both sides. Genuine documentation,
historical text, rejected examples, and forbidden examples remain nonassertive; otherwise the
styling delimiters are unwrapped and the semantic content remains available to the existing
authority rules. Markdown blockquote lines remain structurally excluded.

### Inline styling TDD evidence

1. Exact RED: `npm --prefix site run authority:test` exited 1 with 250 tests, 243 passed and the
   seven new styled-assertion regressions failed.
2. Focused GREEN: 9/9 passed — seven required styled rejections plus the exact rejected-example
   quotation and Markdown blockquote controls.
3. Full GREEN: `npm --prefix site run authority:test` passed 250/250.
4. Combined old and new direct corpora passed 34/34: 26 required rejections and 8 required
   nonassertive/correct allowances.

### Inline styling acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, including `.claude/rules/gotsoap-web-design.md`, and `git diff --check` — PASS.
- `site/src`, all contract files, and the canonical IVR PDF — unchanged.

The recurring Windows sandbox EPERM affected only Astro's generated type write, fidelity's child
`git`, and the Node focused-test worker; each command passed unchanged under the approved elevated
execution path. The required `apply_patch` path again could not prepare the `C:\tmp` split-root
sandbox, so the same scoped unified-diff `git apply` fallback was used.

This final focused commit changes only this report, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.

## Clause-local parser-order closure

The follow-up review found two Important validator-only gaps. Inline documentation classification
ran before semantic clause splitting, so a harmless earlier clause containing words such as
“example,” “archived,” “phrase,” “draft,” “historical,” or “wording” could suppress a later styled
assertion on the same physical line. Relationship patterns also recognized only the ASCII
possessive in `Office's`, not the typographic possessive in `Office’s`.

The validator now structurally removes Markdown blockquote lines, joins soft-wrapped prose, splits
semantic clauses, and only then classifies and normalizes inline spans within each clause. Both
relationship patterns containing an Office possessive now accept ASCII `'` and Unicode `’`.

### Parser-order TDD evidence

1. Exact RED: `npm --prefix site run authority:test` exited 1 with 258 tests, 250 passed and exactly
   the eight new mixed-clause/typographic-possessive regressions failed.
2. Focused GREEN: 12/12 passed — all eight required rejections plus the Markdown blockquote,
   archived-draft blockquote, exact rejected quotation, and correct chronology controls.
3. Full GREEN: `npm --prefix site run authority:test` passed 258/258.
4. Combined prior and mixed-clause direct corpora passed 42/42: 34 required rejections and 8
   required nonassertive/correct allowances.

### Parser-order acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, including `.claude/rules/gotsoap-web-design.md`, and `git diff --check` — PASS.
- `site/src`, all contract files, all canon/content files, and the canonical IVR PDF — unchanged.

The expected Windows sandbox EPERM affected Astro's generated type write, fidelity's child `git`,
and the Node focused-test worker; all three commands passed unchanged under the approved elevated
execution path. `apply_patch` again could not prepare the `C:\tmp` split-root sandbox, so edits used
the scoped unified-diff `git apply` fallback.

This parser-order commit changes only this report, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.

## Span-aware parser closure

The final parser review found two Important validator-only defects. Raw semantic splitting treated
semicolons and comma conjunctions inside balanced curly quotes, ASCII quotes, and inline code as
real clause boundaries. Separately, documentation words anywhere around a span—and historical or
example words in the legacy uncertainty guard—could exempt an unrelated styled assertion.

Semantic prose now passes through a small scanner that treats only balanced `“…”`, `"…"`, and
backtick spans as opaque while splitting sentence, semicolon, and comma-conjunction boundaries
outside them. Unbalanced openers remain ordinary text, so later separators and assertions stay
visible. Span contents are exempted only when an explicit documentation label immediately
introduces that span, or when a named span has an immediate predicate marking that same span as
rejected, forbidden, historical, archived, superseded, or quoted documentation. The uncertainty
guard now contains only genuine uncertainty and negation cues.

### Span-aware TDD evidence

1. Exact RED: `npm --prefix site run authority:test` exited 1 with 270 tests, 262 passed and exactly
   eight intended failures: four balanced-span false positives and four loose-framing bypasses.
2. The first focused implementation run passed 16/17 and exposed the independent legacy
   historical-keyword guard; tightening that guard completed the same root-cause correction.
3. Final focused GREEN: 19/19 passed, covering balanced curly/ASCII/code spans, separators outside
   spans, all three unbalanced opener types, strict framing, prior mixed clauses, structural
   blockquotes, documented examples, and correct chronology.
4. Full GREEN: `npm --prefix site run authority:test` passed 270/270.
5. Combined prior and span-aware direct corpora passed 54/54: 42 required rejections and 12
   required nonassertive/correct allowances.

### Span-aware acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, including `.claude/rules/gotsoap-web-design.md`, and `git diff --check` — PASS.
- `site/src`, all contract files, all canon/content files, and the canonical IVR PDF — unchanged.

The expected Windows sandbox EPERM affected Astro's generated type write, fidelity's child `git`,
and the Node focused-test worker; all commands passed unchanged under the approved elevated path.
`apply_patch` again could not prepare the `C:\tmp` split-root sandbox, so edits used scoped
unified-diff `git apply`.

This span-aware commit changes only this report, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.

## Malformed-span and copular-framing closure

The final hardening review found two validator-only edge cases. A second curly opener before the
expected closer, or an odd count of unescaped ASCII quotes/backticks, could cause malformed text to
hide a later styled authority assertion. Conversely, a quotation directly bound through `is` or
`was` to a rejected example or historical wording was not recognized as documented text.

Malformed delimiter streams now fail safe: nested curly openers invalidate the candidate span, and
odd unescaped ASCII/backtick counts make those delimiters ordinary while preserving their semantic
content for scanning. Copular framing is accepted only when the named wording/example/quotation is
directly tied to the span; a generic quotation still requires an explicit rejected, forbidden,
historical, archived, or superseded predicate after the span.

### Malformed-span TDD evidence

1. Exact RED: `npm --prefix site run authority:test` exited 1 with 277 tests, 270 passed and exactly
   seven intended failures: four malformed-delimiter bypasses and three copular-frame allowances.
2. Focused GREEN: 11/11 passed, covering the four malformed streams, all three copular forms, prior
   balanced ASCII protection, and all three unbalanced opener controls.
3. Full GREEN: `npm --prefix site run authority:test` passed 277/277.
4. Combined prior and final direct corpora passed 61/61: 46 required rejections and 15 required
   nonassertive/correct allowances.

### Final malformed-span acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, including `.claude/rules/gotsoap-web-design.md`, and `git diff --check` — PASS.
- `site/src`, all contract files, all canon/content files, and the canonical IVR PDF — unchanged.

The expected Windows sandbox EPERM affected Astro's generated type write, fidelity's child `git`,
and the Node focused-test worker; all commands passed unchanged under the approved elevated path.
`apply_patch` again could not prepare the `C:\tmp` split-root sandbox, so edits used scoped
unified-diff `git apply`.

This final hardening commit changes only this report, `site/scripts/authority-check-lib.mjs`, and
`site/scripts/authority-check.test.mjs`.

## Shared inline-span lexer closure

The architectural review found that semantic splitting and inline normalization independently parsed
the same delimiter text. A malformed candidate could therefore be rejected by the splitter and then
recovered as documented content by the normalizer. Even-count ASCII/backtick mispairings could also
form multiple plausible spans, while paragraph-wide delimiter counts incorrectly poisoned an earlier
valid documented clause when a later sentence contained an unmatched marker.

The validator now lexes prose once into a shared token stream. Every span token records its delimiter
type, raw text, content, start/end offsets, and balanced/valid status. Semantic clause splitting treats
only valid balanced tokens as opaque; normalization consumes those exact tokens and never reparses a
raw clause for spans. Within each emitted clause, a delimiter type receives documentation exemption
only when it has exactly one valid balanced token and the existing strict framing binds that token to
rejected, forbidden, historical, archived, superseded, or quoted documentation. Extra or malformed
same-type tokens force all content of that type back into ordinary authority scanning.

### Shared-lexer TDD evidence

1. Clean exact RED: `npm --prefix site run authority:test` exited 1 with 286 tests, 277 passed and
   exactly nine intended failures: seven malformed-span false negatives and two clause-local
   documentation false positives.
2. Focused GREEN: 24/24 passed, including two unit-level token-contract assertions, all new malformed
   and clause-local cases, prior balanced/unbalanced cases, strict copular framing, and structural
   separator controls.
3. Full GREEN: `npm --prefix site run authority:test` passed 288/288.
4. Combined prior and shared-lexer direct corpora passed 70/70: 53 required rejections and 17 required
   nonassertive/correct allowances.

### Shared-lexer acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; pledge `Buffer.equals` parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, including `.claude/rules/gotsoap-web-design.md`, and `git diff --check` — PASS.
- The legacy independent span normalizer/scanner symbols are absent.
- `site/src`, all contract files, all canon/content files, and the canonical IVR PDF — unchanged.

The expected Windows sandbox EPERM affected Astro's generated type write and fidelity's child `git`;
both commands passed unchanged under the approved elevated path. `apply_patch` again could not
prepare the `C:\tmp` split-root sandbox, so edits used scoped unified-diff `git apply`.

This architectural parser commit changes only this report, `site/scripts/authority-check-lib.mjs`,
and `site/scripts/authority-check.test.mjs`.

## Escaped-style and documented-list closure

The final review found two remaining bypass surfaces in the shared token stream. Escaped quote,
backtick, and curly-quote characters were emitted as ordinary text but survived normalization, so
they could still interrupt semantic authority patterns. Separately, documentation framing supported
one rejected quotation but not a tightly controlled list of two or more examples.

Normalization now removes only escape backslashes that immediately precede authority styling
delimiters, then strips those quote/backtick/curly delimiters from ordinary text tokens before
concatenation. Apostrophes and span classification remain untouched, and no second parser was added.
Multi-span exemptions require an explicit rejected/forbidden/historical/archived/superseded plural
intro, two or more valid same-delimiter spans, connector-only interstitial text, and punctuation or
documentation-only tail framing. Any unquoted assertion between or after spans unwraps the list for
normal authority scanning.

### Escaped-style TDD evidence

1. Clean exact RED: `npm --prefix site run authority:test` exited 1 with 303 tests, 291 passed and
   exactly 12 intended failures: two token-normalization assertions, seven escaped-style bypasses,
   and three strict documented-list allowances.
2. Focused GREEN: 17/17 passed across the token contract, all escaped ASCII/backtick/curly cases,
   all three documented lists, and all three unsafe mixed-list negatives. An expanded structural
   selection also passed 25/25.
3. Full GREEN: `npm --prefix site run authority:test` passed 303/303.
4. The combined prior and final direct corpora passed 83/83: 63 required rejections and 20 required
   nonassertive/correct allowances.

### Escaped-style acceptance evidence

- `npm --prefix site run authority` — PASS.
- `npm --prefix site run build` — PASS; Astro built 22 static pages.
- `npm --prefix site run gates` — PASS, 20/20.
- `npm --prefix site run copy-gates` — PASS, 7/7.
- `npm --prefix site run fidelity` — authoritative PASS, 54/54.
- `npm --prefix site run distinguish` — PASS.
- All 8 tracked JSON files parse; byte-for-byte pledge parity passes.
- Pledge contracts: 3,370 bytes each, SHA-256
  `61b8361829646344928f277b375064af6dcca4ba00e4dd2aa2db5e83b82b4b8a`.
- Office state contract: 4,643 bytes, SHA-256
  `91b18d31c4d66c0e71b5133c29ec2f068547c933b1fa146f59fad980f21e5197`.
- IVR PDF: 48,058 bytes, 4 `/Type /Page` markers, SHA-256
  `7748cefced4d671e57aca64d4ba3852c693c068b89a982e2365e4fc3d6af1ab0`.
- Stale/live scan, `git diff --check`, and Node syntax checks — PASS.
- `site/src`, all contract files, and the canonical IVR PDF — unchanged.

The expected Windows sandbox EPERM affected Astro's generated type write and fidelity's child `git`;
both commands passed unchanged under the approved elevated path.
