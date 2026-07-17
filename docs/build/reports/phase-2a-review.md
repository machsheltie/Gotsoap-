# Phase 2a — Adversarial Review

**VERDICT: FAIL**

`npm run gates:phase -- 2` → exit 0: 12/16 bare gates pass; G7, G7b, G8, and G11 are correctly deferred to later phases. `npm run distinguish` → PASS. Phase 2a still fails §5.1 because two live effects cross the canonical poster box.

## Violations

| # | Severity | Spec | Evidence | Finding |
|---|---|---|---|---|
| 1 | FAIL | §5.1 | `site/src/components/psas/ThirstEnvironment.astro:127` | The marble leaf is above the poster at `z-index: 2` and retains a rightward `10px 0 28px` shadow after stopping at `translateX(-91.5%)`. With the poster beginning at 10% of the same container, the leaf itself stops only 1.5% short; its shadow visibly enters the neutral poster rectangle. This is final-state overlap, not permitted entry motion. |
| 2 | FAIL | §5.1 | `site/src/layouts/BaseLayout.astro:103` | Every non-immersive PSA detail route renders `ScratchSniff`. Its first-visit card is fixed near the viewport bottom, almost viewport-wide, and above the page at `z-index: 96` (`site/src/components/ScratchSniff.astro:63`). On the submitted 390×844 Confident geometry, that card occupies the lower portion of the canonical poster box. Hiding it for neutral evidence does not make the live route conform. Phase 2a owns §5 mobile geometry, and no later phase is assigned this violation. |
| 3 | CONCERN | §5.1 | `site/src/components/psas/UnholyEnvironment.astro:151` | The required mobile poster band is 82–92vw, but all five environments substitute percentages of their content box. In Fable's reported 390px capture with a 375px client width, Unholy's `82%` resolves to 307.5px, or 78.8% of the nominal viewport. The overflow rationale is plausible, but the report provides no poster bounding-box measurements proving that all five rendered posters remain in the specified band. |

**FAIL** means the phase contradicts a locked requirement and cannot close. **CONCERN** means the implementation may be defensible, but its evidence does not yet establish compliance.

## Judgment calls

| Build-report judgment | Ruling | Reason |
|---|---|---|
| `%` instead of `vw` for poster widths | CONCERN | The choice may avoid scrollbar-induced overflow, but it changes the literal geometry contract and was not verified with rendered poster widths. |
| Shared `entry-complete.ts` utility | PASS | It owns no DOM, CSS, or layout; each environment still owns its structure and transition response. It is not a disguised configurable stage. |
| Split decorative copy with intact screen-reader text | PASS | The fragments are `aria-hidden`, while the complete phrase remains available to assistive technology. |
| Redemption uses `flex-direction: column-reverse` | PASS | The environment still owns a distinct ascending composition; source order remains coherent. |
| Named entry motion temporarily crosses the poster | PASS, narrowly | §6 explicitly requires these entries, so their transient movement is not by itself a §5.1 failure. The Thirst leaf's final shadow is different and fails above. |
| Smoldering's visible hook with an `sr-only` `h1` | PASS | The complete heading remains in the document outline without forcing duplicate visible type into the composition. |

## Neutral-rectangle test

The five submissions read as five different places after the posters are replaced by neutral rectangles:

- Confident is type-first, with a tiled bay, low sill, and plaque.
- Smoldering is poster-first, with wing masses and a reflected lower hook.
- Unholy uses a central light shaft, vertical gutter type, staggered sermon, and slab.
- Redemption uses edge jambs, ascending type, and a program block.
- Thirst uses an offset marble leaf, gilt drop cap, and horizontal rail.

The harness corroborates that reading. Source similarity peaks at 0.13 against the unchanged 0.70 ceiling. The closest render pair is Redemption/Thirst at 26.0 against the unchanged 10-point floor. G15 is therefore a real pass, not a threshold-shaped pass. It does not excuse either poster-box violation.

## What Fable's build report did not tell me

- Its statement that nothing overlaps the poster at rest accounts for the Thirst leaf's solid edge but not the leaf's rightward shadow. The submitted neutral screenshot exposes that shadow inside the black rectangle.
- It discloses the global ScratchSniff overlay, then treats it as phase-less legacy. The protocol gives Phase 2a ownership of the mobile §5 detail surface; deferral to no named phase would ship the violation.
- The neutral screenshots intentionally hide `aside.qc`. That is acceptable for comparing environment architecture, but those images cannot also prove that the live route preserves the sacred poster box.
- “No horizontal overflow” is not evidence that poster width meets 82–92vw. The unit substitution needs poster `getBoundingClientRect()` measurements, not only viewport `clientWidth` and `scrollWidth`.

## Close-out verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 §5.1 Thirst final-state shadow crosses the poster | Removed the static shadow; confined sweep depth to a pseudo-element whose resting opacity is 0 and whose animation is disabled in completed and reduced-motion states | **RESOLVED** — the fix removes final-state paint, not merely the cited `box-shadow` declaration. The recaptured neutral render shows a clean poster edge. |
| #1 class check — Confident sill shadow | Recast the shadow downward with positive offset and negative spread | **RESOLVED** — the recaptured neutral render shows no sill paint inside the poster's lower edge. |
| #1 class check — Unholy versicle | Replaced writing-mode-relative logical insets with physical `top`/`right` and narrowed the line box | **RESOLVED** — the versicle is now visibly in the right gutter, clear of the neutral poster rectangle. |
| #2 §5.1 ScratchSniff crosses mobile PSA posters | Added `hideScratchSniff` to `BaseLayout` and enabled it once in the shared detail-route orchestrator | **RESOLVED** — this removes the overlay class from all five current detail routes. Fresh built HTML contains zero `<aside class="qc">` elements across those routes, while the component remains present on other non-immersive routes. |
| #3 §5.1 percentage widths lack 82–92vw proof | Restored literal `88vw`, `84vw`, `82vw`, and `85vw`; used `min(90vw, 91%)` for the right-flush Thirst geometry; supplied both-denominator bounding boxes | **RESOLVED** — the implementation and measurements now agree. All five rendered widths are 82.1–88.1vw under the captured viewport and remain in-band under the visible-width denominator. |

Gates: `gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]` · 12/16 pass · four later-phase deferrals · exit 0. Build: 17 pages · exit 0. Distinguishability: source maximum 0.13 against 0.70; render minimum 26.7 against 10 · exit 0.

Harness diff: no tracked diff, but both harness files are still untracked in this worktree, so that result alone is not proof. Manual integrity check confirms the same 16-gate fingerprint and phase ownership, `MAX_SOURCE_SIMILARITY = 0.7`, and `MIN_RENDER_DIFF = 10`; no check or threshold was weakened.

Deferred-to-nowhere: none. G7, G7b, and G11 are explicitly owned by Phase 3 in `docs/build/PROTOCOL.md`; G8 is explicitly owned by Phase 5. The remediation's forward notes about applying the same overlay rule to the home flagship and placement hub likewise name those owning phases rather than inventing an ownerless deferral.