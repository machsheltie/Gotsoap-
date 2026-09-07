# Phase 2b — Remediation report

**Executor:** Claude Fable 5 · **Date:** 2026-07-15
**Answers:** `phase-2b-review.md` (Sol, VERDICT: FAIL — 3 FAIL, 0 CONCERN)

## Gate fingerprint after remediation (verbatim)

```
gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]
```

`npm run gates:phase 2` → exit 0 · 12/16 PASS · 4 DEFER (owned by phases 3/5)
`npm run build` → 17 pages, complete.
`npm run distinguish` → PASS. Zero mobile-range edits this round — every change sits
inside the `@media (min-width: 1024px)` blocks; the 2b-recaptured neutral renders
remain valid and the matrices are unchanged.

## The root cause, conceded in full

Sol's arithmetic was correct on all three counts, and the defect was worse than a
tuning error: my caps subtracted a **fixed rem allowance** while the stage gutters
were **svh-scaled clamps** — two numbers written in different units that drift apart
as the viewport grows. "Fully in viewport at scroll 0" then tested only the poster
rectangle, which is §5.1 answered in a weaker form: the poster stayed visible by
exporting 20–55px of its own required gutter below the fold.

## The fix — the budget holds by construction

Each stage now declares its gutters **once**, as custom properties, and the poster
cap subtracts **those same variables**:

```
stage   { --pad: clamp(…svh…); padding-block: var(--pad); }
poster  { block-size: min(<svh band>, calc(100svh − 57px − <the same var(--pad) terms>), <width guard>); }
```

The cap and the gutters can no longer disagree, at any viewport height — a property
the incidental 1462×654 crash-window measurement confirmed (poster 533.4px against a
534.0px budget). Applied to **all five** environments, not only the three filed:
Confident and Smoldering conformed only because their numbers happened to fit; the
defect class lived in them too. Confident's cap additionally subtracts its 13px sill.
The three flagged stages' gutters were also re-tuned (e.g. Unholy's 8svh/6svh →
5.5svh/4svh) so the budget-capped posters stay inside §5.1's "generally 82–88svh"
band instead of merely shrinking.

## Findings answered

| # | Sol finding | Disposition | Post-fix measurements (Chromium, scroll 0, nav = 56px) |
|---|---|---|---|
| 1 | Unholy over budget by 30px / 55.2px | **Accepted, fixed** | 1440×900: poster **757.5** ≤ budget **758.5**, 84.2svh, stage bottom **899 ≤ 900**. 1920×1080: poster **920.4** ≤ budget **921.4**, 85.2svh, stage bottom **1079 ≤ 1080** |
| 2 | Redemption over by 28px / 22px | **Accepted, fixed** | 1440×900: **762 ≤ 763**, 84.7svh, stage bottom **899**. 1920×1080: **918 ≤ 926.8**, 85.0svh, stage bottom **1079** |
| 3 | Thirst over by 20px / 11.2px | **Accepted, fixed** | 1440×900: **756 ≤ 763**, 84.0svh, stage bottom **899**. 1920×1080: **907.2 ≤ 926.8**, 84.0svh, stage bottom **1079** |

Same-class conversion of the unflagged rooms, verified: Confident @1920×1080 poster
907.2 ≤ budget 959 (sill bottom 1028.2, in view); Smoldering @1920×1080 poster 896.4
≤ budget 916, stage bottom 1079. At 1440×900 both compute to their previously
measured (conforming) values — 756/84.0svh and 747/83.0svh — by arithmetic identity.

The acceptance test was upgraded to Sol's form: **stage bottom ≤ viewport** (whole
designed stage, gutters included, above the fold) and **poster ≤ (viewport − measured
nav − measured computed paddings)**, not merely "poster rectangle visible."

## Also for close-out

- All five capped posters remain inside the 82–88svh band at both test profiles
  (83.0–85.2svh) — the re-tuned gutters mean the budget fix did not push any
  composition out of band.
- Desktop distinctness is untouched: the fixes changed padding variables and cap
  formulas only; no layout mechanics moved. Mobile: zero changes, matrices identical.
