# Phase 2b — Adversarial Review

**VERDICT: FAIL**

`npm run gates:phase -- 2` → 12/16 pass, four later-phase deferrals, exit 0. Bare `npm run gates` → 12/16. The five desktop compositions are real, but three poster caps violate §5.1's explicit masthead-plus-stage-gutters height budget.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | FAIL | §5.1 | `site/src/components/psas/UnholyEnvironment.astro:307` | `calc(100svh - 9.5rem)` does not subtract the actual masthead and `.nave` gutters declared at line 302. At 1440×900 the poster is 748px, while the measured budget is `900 - 56 nav - 72 top padding - 54 bottom padding = 718px`: 30px over. At 1920×1080 it is 928px against an 872.8px budget: 55.2px over. The stage bottoms at 930px and 1135.2px respectively, below the viewport. |
| 2 | FAIL | §5.1 | `site/src/components/psas/RedemptionEnvironment.astro:318` | `calc(100svh - 8.5rem)` likewise undercounts the `.confessional` gutters at line 310. At 1440×900 the poster is 764px against a 736px budget, and the stage ends at 928px. At 1920×1080 it is 918px against 896px, and the stage ends at 1102px. The poster remains visible only because part of the required lower gutter falls below the fold. |
| 3 | FAIL | §5.1 | `site/src/components/psas/ThirstEnvironment.astro:283` | The same fixed `8.5rem` allowance is smaller than the masthead plus `.folio` padding declared at line 275. At 1440×900 the poster is 756px against a 736px budget and the stage ends at 920px. At 1920×1080 it is 907.2px against 896px and the stage ends at 1091.2px. This satisfies “poster visible,” not the required `100svh - masthead - controls - stage-gutters` cap. |

- **FAIL** — violates the spec and blocks the phase.
- **CONCERN** — defensible but likely wrong; Fable must answer it.

## Neutral-rectangle test

The five environments still read as five places, not one desktop split repeated five times. Confident uses an asymmetric tile-bay grid; Smoldering uses a centered vanity triptych with its article grid below; Unholy preserves a single cathedral axis; Redemption divides a poster room from a type aisle; Thirst becomes a verso/recto editorial spread. No shared desktop stage wrapper was introduced.

The mobile ratification also survives. Fresh `npm run distinguish` reports source similarity no higher than 0.14 against the unchanged 0.70 ceiling and a closest render pair of 26.7 against the unchanged 10-point floor. The five recaptured 390×844 neutral renders retain their distinct structures. The failure is desktop height accounting, not collapsed architecture.

## What Fable's build report did not tell me

- Its “fully in viewport at scroll 0” measurement tests only the poster rectangle. §5.1 does not stop there: it explicitly subtracts the masthead, controls, and stage gutters before setting the poster maximum.
- The report describes `8.5rem` and `9.5rem` as masthead-plus-stage-chrome allowances, but the rendered padding disproves that claim. The `svh`-scaled gutters outgrow those fixed allowances in three components.
- The inherited clipping defect was therefore answered in a weaker form. No poster pixels are cut off, but 20–30px of the designed stage is still below the 1440×900 fold, rising to 55.2px for Unholy at 1920×1080.
- The measurements above are conservative: they subtract the masthead and stage padding only. Including any control allowance cannot make the three caps conform.

## Close-out verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 §5.1 Unholy poster exceeds its masthead-and-gutter budget | Replaced the fixed `9.5rem` subtraction with the same `--nave-pad-start` and `--nave-pad-end` variables used by the stage, and re-tuned those gutters without leaving the 82–88svh band | **RESOLVED** — fresh rendering measures 757.5px ≤ 758.5px at 1440×900 and 920.4px ≤ 921.4px at 1920×1080; the stage bottoms at 899px and 1079px. |
| #2 §5.1 Redemption poster exceeds its masthead-and-gutter budget | Declared `--room-pad` once and used it for both stage padding and the poster cap | **RESOLVED** — fresh rendering measures 762px ≤ 763px and 918px ≤ 926.8px; the stage bottoms at 899px and 1079px. |
| #3 §5.1 Thirst poster exceeds its masthead-and-gutter budget | Declared `--spread-pad` once and used it for both stage padding and the poster cap | **RESOLVED** — fresh rendering measures 756px ≤ 763px and 907.2px ≤ 926.8px; the stage bottoms at 899px and 1079px. |

The remediation also removes the defect class from the two stages that happened to conform before: Confident and Smoldering now derive their caps from their actual gutter variables, and Confident additionally subtracts its 13px sill.

Gates: `gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]` · 12/16 pass · four later-phase deferrals · exit 0. Build: 17 pages · exit 0. Distinguishability: source maximum 0.13 against 0.70; render minimum 26.7 against 10 · exit 0.

Harness diff: no tracked diff, but both harness files remain untracked in this worktree, so the empty diff is not sufficient evidence by itself. Manual integrity check confirms the same gate fingerprint and phase ownership, `MAX_SOURCE_SIMILARITY = 0.7`, and `MIN_RENDER_DIFF = 10`; no check or threshold was weakened.

Deferred-to-nowhere: none. G7, G7b, and G11 are explicitly owned by Phase 3; G8 is explicitly owned by Phase 5. The original build report's `92vh` Lightbox note is optional dialog polish, not a deferred §5.1 campaign-stage violation; Phase 6 is not being assigned ownership of an unresolved Phase 2 defect.