# Font Audit Transfer, Failure, and Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce the locked font transfer budget and authorization rules, classify every binary/CSS condition as pass, warning, restriction, or failure, and generate a provenance-bearing family-by-family audit document from the JSON report.

**Architecture:** `font-manifest.json` remains the authority for approved binaries, critical preloads, route-transfer profiles, copy-lane specimens, expected alternate tags, and thresholds. `font-policy-check.mjs` owns dependency and source-delivery inspection. `font-audit.mjs` combines Fontkit facts, policy inspection, transfer calculations, Git provenance, and Markdown rendering; it writes artifacts before returning a nonzero status for hard failures.

**Tech Stack:** Node.js 22+, Fontkit 2.0.4, Node test runner, Astro source gates, generated JSON and Markdown.

## Global Constraints

- Critical preload target: at most 200,000 bytes.
- Critical preload review warning: 200,001–250,000 bytes.
- Critical preload production failure: more than 250,000 bytes.
- Ordinary preload ceiling: 3 files.
- A rare documented exception may preload 4 files; 5 files always fail.
- The critical set is Oswald 600, Behind The Nineties Sans Medium, and Marlin Sans SQ Medium.
- Shared-specimen glyph gaps remain capability restrictions; only missing characters explicitly assigned to a copy lane are hard failures.
- Unassigned files remain unauthorized for CSS declaration and network delivery.
- Generated fallback values remain candidate-only and never become CSS automatically.
- Preserve unrelated dirty-worktree changes. Do not stage or commit.

---

### Task 1: Transfer budget and source-delivery accounting

**Files:**
- Modify: `site/config/font-manifest.json`
- Modify: `site/scripts/font-policy-check.mjs`
- Modify: `site/scripts/font-policy-check.test.mjs`
- Modify: `site/scripts/font-audit.mjs`
- Test: `site/scripts/font-audit.test.mjs`

**Interfaces:**
- Consumes: approved manifest filenames and source files.
- Produces: `inspectFontPolicy(inputs)` and `calculateTransferBudget(inputs)` results containing critical totals, actual preload references, route profiles, and unauthorized references.

- [ ] **Step 1: Write failing policy tests**

Add controlled inputs proving that an unassigned local font, remote font URL, synthetic style/weight, and returning `@fontsource/*` dependency are violations while an approved `/fonts/*.woff2` reference with `font-synthesis: none` is accepted.

- [ ] **Step 2: Run policy tests and verify RED**

Run: `node scripts/font-policy-check.test.mjs`

Expected: failures because approved-file authorization, general remote-host detection, and synthetic-font detection are not implemented.

- [ ] **Step 3: Implement source inspection**

Return normalized local font references with source paths and distinguish approved, unassigned, missing, remote, synthetic, and Fontsource conditions. Preserve `collectFontPolicyViolations()` as the gate-compatible wrapper.

- [ ] **Step 4: Write failing transfer tests**

Use literal fake font sizes to assert:

```js
critical.totalBytes === 200001
critical.status === "warning"
critical.fileCount === 3
routeProfiles[0].totalBytes === 48000
```

Add boundary cases for exactly 200,000, exactly 250,000, more than 250,000, 3 ordinary preloads, documented 4-file exception, undocumented 4-file preload, and 5 files.

- [ ] **Step 5: Run transfer tests and verify RED**

Run: `node scripts/font-audit.test.mjs`

Expected: failures because the report has no transfer budget.

- [ ] **Step 6: Implement transfer calculation**

Compute compressed WOFF2 bytes from inspected binaries, total approved bytes, locked critical bytes, actual preload references, likely manifest route profiles, and referenced unassigned bytes. Emit hard findings for failure thresholds or unauthorized references and warnings for the review band.

- [ ] **Step 7: Run focused tests and verify GREEN**

Run: `node scripts/font-policy-check.test.mjs`

Run: `node scripts/font-audit.test.mjs`

Expected: both suites pass.

### Task 2: Hard-failure and review-warning classification

**Files:**
- Modify: `site/config/font-manifest.json`
- Modify: `site/scripts/font-audit.mjs`
- Test: `site/scripts/font-audit.test.mjs`
- Modify: `site/scripts/gates.mjs`

**Interfaces:**
- Consumes: Fontkit facts, declared structure/copy-lane policy, and source inspection.
- Produces: normalized findings with `severity`, `code`, `file`, and evidence; `summary.status` is `fail` when any hard finding exists.

- [ ] **Step 1: Write failing finding tests**

Prove these mutations are caught:

```js
copyLaneCharacters = "Ÿ"          // missing in Oswald -> error
expected.weightClass = 700         // actual 600 -> warning
expected.italic = true             // normal binary -> error
declaredWeightRange = [500, 700]   // static binary -> error
```

Also prove the ordinary shared-specimen `Ÿ` gap remains a restriction when it is not in the approved copy lane.

- [ ] **Step 2: Run audit tests and verify RED**

Run: `node scripts/font-audit.test.mjs`

Expected: missing copy-lane and structure findings are absent, and weight mismatch is still misclassified.

- [ ] **Step 3: Implement binary classifications**

Add errors for invalid WOFF2, copy-lane gaps, style contradiction, undocumented structure mismatch, and static weight ranges. Add warnings for weight mismatch, unavailable tabular numerals, unavailable optical sizing, missing cap/x-height, unexpected alternate systems, excessive measured fallback line delta, and publicly distributed unassigned commercial files.

- [ ] **Step 4: Tighten G19**

Pass the manifest’s 14 approved filenames into the shared source inspector so unassigned CSS/preload references fail the always-live font-delivery gate. Keep Fontsource and external-host checks zero-tolerance.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `node scripts/font-policy-check.test.mjs`

Run: `node scripts/font-audit.test.mjs`

Expected: both suites pass, including the red/green mutation cases.

### Task 3: Generated family documentation and provenance

**Files:**
- Modify: `site/scripts/font-audit.mjs`
- Modify: `site/scripts/font-audit.test.mjs`
- Regenerate: `site/reports/font-audit.json`
- Regenerate: `gotsoap/docs/font-binary-audit.md`
- Modify: `gotsoap/docs/font-delivery-spec.md`

**Interfaces:**
- Consumes: completed report plus injected or Git-derived provenance.
- Produces: JSON and Markdown containing `auditTimestamp`, `sourceCommitSha`, working-tree state, transfer status, and one detailed table per family.

- [ ] **Step 1: Write failing provenance/render tests**

Inject literal provenance:

```js
auditTimestamp: "2026-07-30T12:00:00.000Z"
sourceCommitSha: "0123456789abcdef0123456789abcdef01234567"
workingTreeDirty: true
```

Assert JSON fields and Markdown headings for every family, exact hashes/bytes, transfer totals, fallback candidates, and overall pass/warning/fail state.

- [ ] **Step 2: Run audit tests and verify RED**

Run: `node scripts/font-audit.test.mjs`

Expected: provenance fields and family sections are absent.

- [ ] **Step 3: Implement Git provenance and rendering**

Use injected values in tests; otherwise read `git rev-parse HEAD`, current ISO audit time, and dirty state. Render the document only from the report and include one table per family.

- [ ] **Step 4: Regenerate artifacts**

Run: `npm run audit:fonts`

Expected: artifacts are written; exit is nonzero if the live source contains hard authorization failures.

- [ ] **Step 5: Validate Markdown**

Check every relative Markdown link target exists. No Mermaid diagram is planned.

- [ ] **Step 6: Run repository verification**

From `site/`, run:

```text
npm run build
npm run gates
npm run copy-gates
npm run fidelity
npm run distinguish
npm run authority
```

Report audit/G19 hard failures as detected repository state; do not weaken or authorize them to make the suite green.
