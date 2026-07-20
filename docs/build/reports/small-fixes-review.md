# Small fixes — Adversarial Review

**VERDICT: PASS**

`gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 20/20 pass · exit 0. `npm run copy-gates` is 6/6, and `npm run build` produces 16 pages · exit 0. Both requested fixes satisfy `small-fixes-order.md:35-39` without rewriting copy.

## Violations

None.

## Finding rulings

| Fix | Ruling | Evidence |
|---|---|---|
| 1 — route VerdictCard chrome through `copy.ts` | **PASS** | The two ordered literals now live byte-for-byte in `verdictCard` (`site/src/content/copy.ts:361-363`), the group is included in the default aggregate (`:555-557`), and `VerdictCard.astro` consumes them at `:47` and `:53`. Routing the third visible literal through `nav.mark` at `VerdictCard.astro:46` is correct under the stronger Definition of Done—“no hardcoded user-facing strings remain”—and does not re-voice the wordmark. The rebuilt four verdict pages render all three strings verbatim. |
| 2 — run the §7 kill-list sweep over all `src` | **PASS** | An independent, case-insensitive, line-preserving comment-stripped scan of every file under `site/src` finds exactly one hit: `about.credit` at `site/src/content/copy.ts:540`. Its sole render consumer is `site/src/pages/about.astro:115`, the location expressly permitted by `docs/copy/style-lock.md:40` and the `/about` reveal contract in `specs.md:264-271`. A second scan of all rebuilt HTML finds the phrase only in `dist/about/index.html`; no campaign route contains any §7 killed line. Raw-source checks find no comment-only killed-line hit. |

## Harness and regression check

`site/scripts/gates.mjs`, `site/scripts/copy-gates.mjs`, and `site/scripts/distinguishability.mjs` are clean against `HEAD`; no threshold or check was weakened. Gate promotion was explicitly optional and conditional at `small-fixes-order.md:30-32`, so deferring it during concurrent harness work does not fail this order. The existing source diff is confined to `VerdictCard.astro` and `copy.ts`, and `git diff --check` reports no whitespace errors.

## Build-report accuracy note

The report's claim that the audit and “drop-in-ready” gate logic live at `scratchpad/killgrep.mjs` is false of the reviewed worktree: neither `scratchpad/killgrep.mjs` nor `site/scratchpad/killgrep.mjs` exists. This does not defeat the Definition of Done—the sweep result is independently reproducible, and preserving or promoting the helper was not required—but the claimed handoff artifact must not be treated as available. Restore it or remove that claim before a later gate owner relies on it.

## Close-out verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| Build-report accuracy note — the claimed reusable killed-lines artifact did not exist | Replaced both vanished scratchpad references with a durable Appendix A containing the purported drop-in sweep, including a line-preserving comment strip and an `/about` exemption. | **NOT RESOLVED** — the artifact now exists, but it resolves a weaker problem than the one it claims. Appendix A says the exemption is “on `/about` only” (`small-fixes-build.md:117-119`), yet `EXEMPT` keys only on the shared file path `content/copy.ts` (`:137-138`) and the classifier never checks the matched property or render consumer (`:164-170`). Because that file contains campaign, masthead, home, and `/about` copy, the exact killed sentence placed in `home.hero` or `masthead.credit` is silently reported as exempt. A red test of the shipped predicate returned `EXEMPT` for `about.credit`, `home.hero`, and `masthead.credit`. This is the same false-handoff class as the missing artifact: a future gate owner is still being given logic that cannot establish its advertised claim. |

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 20/20 · exit 0.

Build: 16 pages · exit 0. Copy gates: 6/6 · exit 0.

Harness diff: clean — `site/scripts/gates.mjs`, `site/scripts/copy-gates.mjs`, and `site/scripts/distinguishability.mjs` are unchanged against `HEAD`.

Deferred-to-nowhere: none. Gate promotion remains explicitly optional under `small-fixes-order.md:30-32`; the FAIL is the present Appendix's false “drop-in” and `/about`-only claims, not the absence of a promoted gate.

## Round 3 close-out verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| Unsafe file-wide exemption | Replaced the file-wide exception with `group` tracking based on the latest `export const <group>` declaration; red-tested the killed sentence inside `masthead` and `home`. | **NOT RESOLVED** — the cited masthead/home mutants now fail correctly, but the implementation does not track an object block. It sets `group = 'about'` at the export (`small-fixes-build.md:168-172`) and never resets it when the object closes. Therefore every line after the `about` object and before the next exported group is still treated as `about` by the exception at `:174-181`. An in-memory mutant placing the killed sentence in a top-level `campaignLeak` constant after the closed `about` object was reported as `/about`-sanctioned and exited 0. The exemption still covers code outside the only authorized surface, so the false-green class survives. |
| Deliverables described as staged when they were not | Staged the two source files and the two small-fixes reports. | **RESOLVED** — `git status --short` and `git diff --cached --stat` show exactly those four deliverables in the index: two modified source files and two added reports. Other unrelated worktree files remain unstaged/untracked and are outside this order. |

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 20/20 · exit 0.

Build: 16 pages · exit 0. Copy gates: 6/6 · exit 0.

Harness diff: clean — neither the working tree nor the index changes `site/scripts/gates.mjs`, `site/scripts/copy-gates.mjs`, or `site/scripts/distinguishability.mjs`.

Deferred-to-nowhere: none. The optional gate promotion remains outside this order; the blocker is the unsafe reusable logic already claimed as drop-in-ready.

## Round 4 close-out verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| The purported `about` block tracker remained active outside the closed block | Added a column-zero `}` reset and red-tested leaks immediately after `about`, at end of file, and inside `masthead`/`home`. | **NOT RESOLVED** — the reported mutants now fail, but comments can still assign the exemption state. The script creates `strippedLines` at `small-fixes-build.md:167-169` yet detects `export const <group>` from unstripped `rawLines` at `:172-177`. A block comment containing a column-zero `export const about = {`, followed by a live top-level killed sentence, sets `group = 'about'`; that live sentence is then marked `/about`-sanctioned and the script exits 0. The gate's advertised comment-stripped, about-only exemption can therefore still be driven by non-code text, preserving the same false-green class. |

The prior staging correction remains verified: before this verdict append, the two source files and two reports were the four staged order deliverables. This new critic-authored append is intentionally not staged by the review pass.

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 20/20 · exit 0.

Build: 16 pages · exit 0. Copy gates: 6/6 · exit 0.

Harness diff: clean — neither the working tree nor the index changes `site/scripts/gates.mjs`, `site/scripts/copy-gates.mjs`, or `site/scripts/distinguishability.mjs`.

Deferred-to-nowhere: none. The optional promotion remains outside this order; the present reusable artifact is still unsafe.

## Round 5 close-out verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| Comments could drive the `about` exemption state | Made block-open and block-close tracking consume the same line-preserving, comment-stripped text as killed-string classification; verified the comment-open attack, commented-close inverse, and prior regressions. | **NOT RESOLVED** — the five submitted tests pass, but non-code string data can still drive the regex-based structural state. A template literal containing a column-zero `export const about = {`, followed by a live killed sentence outside the template, survives comment stripping; the tracker sets `group = 'about'`, marks the live sentence `/about`-sanctioned, and exits 0. The exemption therefore still does not establish that the match belongs to the actual exported `about` object. This is the fourth same-class structural hole, and it triggers Fable's own documented boundary at `small-fixes-build.md:204-209`: the current text scanner must not be handed off as drop-in gate logic; promotion requires the stricter module/value assertion. |

Before this verdict append, the two source files and two reports were again the four cleanly staged order deliverables. This critic-authored append is not staged by the review pass.

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 20/20 · exit 0.

Build: 16 pages · exit 0. Copy gates: 6/6 · exit 0.

Harness diff: clean — neither the working tree nor the index changes `site/scripts/gates.mjs`, `site/scripts/copy-gates.mjs`, or `site/scripts/distinguishability.mjs`.

Deferred-to-nowhere: none. Gate promotion is optional, but the present Appendix cannot accurately be described as drop-in-ready.

## Round 7 confirmation verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| Render sanction must be exact — the ruled sentence is legal only at `dist/about/index.html` | Promoted the value gate as CG7 with an exact deck-path sanction and a rendered-HTML sweep; reported exactly two baseline exemptions. | **NOT RESOLVED** — the deck sanction is exact, but the render sanction is only suffix-matched. `copy-gates.mjs:144` defines `SANCTIONED_DIST` as `/[\\/]about[\\/]index\.html$/`, and `:198` tests that regex against the full path. A fresh fixture containing the legal `about/index.html` plus an illegal `campaign/about/index.html`, both with the killed sentence, caused CG7 to exempt both paths, report 7/7, and exit 0. That directly violates `cg7-promotion-order.md:25-27` and preserves a real false-green path on any nested `/about` route. The sanction must compare the normalized path relative to `CG7_DIST` with exactly `about/index.html`; the durable suite also needs this counterexample. |
| Acceptance tests isolate red failures to CG7 | Added six durable tests and reported that every red test asserts only CG7 failed. | **ACCURACY GAP** — the 14 published checks pass under Node 24.14.0 and the pinned Node 22.12.0, but only T2 calls `onlyCg7Failed()` (`cg7-tests.mjs:39-40,61`). T3-T6 do not enforce the test file's own “Only CG7 may fail” contract at `:10-12`, so the build report's blanket isolation claim is not established. This is not the cause of the verdict; the nested render escape above is. |

Fresh regression checks: `npm run gates` → 20/20 · exit 0; `npm run copy-gates` → 7/7 · exit 0; `npm run build` → 16 pages · exit 0. The six-test/14-check suite exits 0 on Node 24.14.0 and Node 22.12.0. Independent fail-loud probes also exit 1 for missing `dist`, a zero-string deck walk, and Node 22.12.0 without `--experimental-strip-types`.

Harness diff: `site/scripts/gates.mjs` and `site/scripts/distinguishability.mjs` are clean in both index and worktree. CG7 is additive rather than a weakening of an existing gate, but the new render exemption is not contract-safe for the reason above.

Deferred-to-nowhere: none. The scope is fully owned by this promotion order; no later phase is being asked to repair it.

Before this verdict append, the promotion files and prior small-fixes deliverables were staged alongside the already disclosed unrelated copy-lane worktree. This critic-authored append is intentionally left unstaged.

## Round 8 re-confirmation verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| R7 render sanction suffix-matched nested `/about` routes | Replaced the regex with an exact, separator-normalized path relative to `CG7_DIST`; added T7 with both root and nested `about/index.html` fixtures. | **RESOLVED** — `relative(DIST, p).split(sep).join('/') === 'about/index.html'` binds the exemption to the configured dist root. T7 flags `campaign/about/index.html`, leaves root `about/index.html` unflagged, isolates the failure to CG7, and passes under Node 22.12.0 and 24.14.0. |
| R7 acceptance-suite isolation claim | Added `onlyCg7Failed()` assertions to every red test, T2-T8. | **RESOLVED** — every red fixture now proves CG7 failed and CG1-CG6 did not. |
| Class sweep — flattened deck paths could collide with dotted keys | Preserved walk paths as key arrays, compared sanctioned paths segment-by-segment, quoted dotted keys only for display, and added T8. | **RESOLVED** — T8's literal `"about.credit"` key is reported as `default."about.credit"` and exits 1. Comparison never consumes the display string. The remaining comparison sites documented in the build report either fail closed, scope scanning rather than exemption, or are explicitly backstopped by the rendered-output layer; no further anchor drift was found. |

Fresh verification: `npm run build` → 16 pages · exit 0; `npm run gates` → 20/20 · exit 0; `npm run copy-gates` → 7/7 · exit 0 with exactly `deck:about.credit` and `dist:dist/about/index.html` exempt. The T1-T8 suite reports all 25 checks passing under both Node 22.12.0 and Node 24.14.0.

Harness diff: `site/scripts/gates.mjs` and `site/scripts/distinguishability.mjs` remain clean in both index and worktree. The staged `copy-gates.mjs` change hardens CG7 without loosening another invariant. Both staged and unstaged `git diff --check` pass; the only output is the pre-existing line-ending warning on unrelated `copy-review-order.md`.

Deferred-to-nowhere: none. Round 8 closes the CG7 promotion order.

Before this verdict append, all eight order deliverables were staged. Unrelated copy-lane files and graphics remain unstaged/untracked. This critic-authored PASS append is intentionally left unstaged.
