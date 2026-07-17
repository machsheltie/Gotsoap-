# Phase 1 — Adversarial Review

**VERDICT: PASS**
`npm run gates:phase -- 1` → exit 0. Bare `npm run gates` → 9/15, with six later-phase failures; the Phase 1 hygiene is real, but three concerns must remain visible to their owning phases.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | CONCERN | §5.1 / §14 | `src/components/home/Spot.astro:28` | This is a canonical `/downloads/${slug}.jpg`, not decorative atmosphere. The same component applies `object-fit: cover` and `scale(1.02)` at lines 65–68. G2 calls it decorative only because its path whitelist excludes this file. The component is currently unreferenced by `/`, so it is not a Phase 1 live-surface FAIL; Phase 3 must delete it rather than leave G2's false green in the tree. |
| 2 | CONCERN | §3.2 | `src/components/homev2/Case.astro:61` | All three findings are emitted by one `rows.map` into the same `<li>` shell, and lines 201–207 give every finding the same grid and padding. These are repeated equal ledger rows, not three unequal architectural zones. Phase 3 owns The Case, so this is not in scope for a Phase 1 FAIL; adding motion without changing the architecture will not satisfy §3.2. |
| 3 | CONCERN | §14 / G14 | `src/content/placement-hub.ts:5` | G14's sole production hit is this comment, not an imported stand-in. `--prod` does exit 1, so the tripwire is intact and has not been weakened, but its current PASS/FAIL message does not prove the build references placeholder art as Fable claimed. |

- **FAIL** — violates the spec. Blocks the phase.
- **CONCERN** — defensible but likely wrong. Fable must answer it, not necessarily change it.

## Judgment calls

| # | Ruling | Evidence |
|---|---|---|
| 1 | PASS | `src/scripts/steam-hero.ts:55` adds `wheel` and `touchmove` only as scroll-intent fallbacks while the live home is explicitly viewport-locked at `src/layouts/BaseLayout.astro:139`. The listeners exist only during the sweep and are removed on settle at `src/scripts/steam-hero.ts:65`. This makes the required scroll-to-complete behavior reachable; it does not add an invited interaction. |
| 2 | PASS | The reduced-motion branch removes the directional clip and crossfades opacity for 240 ms at `src/components/home/Hero.astro:361`. The overlay is non-interactive at line 314, so the short crossfade does not gate navigation or DOM access. That is the literal §3.1 reduced-motion contract. |
| 3 | PASS | Callers may append arbitrary classes at `src/components/PosterImage.astro:60`; the global `object-fit: contain !important` pin at line 79 is therefore a legitimate component-boundary rejection of `cover`, not a hidden specificity accident. |
| 4 | PASS | `No. 26` is masthead issue fiction at `src/components/homev2/Masthead.astro:33`. The actual campaign navigation begins at line 39 and contains no numbered labels. §14 does not ban every numeral on a campaign surface. |
| 5 | PASS | The `01/02/03` indices are findings-ledger markers inside the ordered findings at `src/components/homev2/Case.astro:61`, not campaign navigation or poster taxonomy. |

## Claim checks

- Series navigation uses the exact required strings and poster titles at `src/pages/psas/[slug].astro:119`: Previous/Next plus title, “View the installation,” and “Return to the movement.”
- `src/content/copy.ts:70` removes only the five `Spot No. N. ` prefixes. The diff shows the remaining description bytes are unchanged.
- The `/psas` hover crop was removed: `src/pages/psas/index.astro:137` changes only opacity. The remaining canonical `cover`/scale pair is the dead legacy component recorded as Concern 1.

## Deferred non-conformances

| Surface | Ruling |
|---|---|
| Legacy home and hero wash | Phase 3 owns `/movement-preview` → `/` and the home signatures (`docs/build/PROTOCOL.md:60`). The live `/` is already Hero-only at `src/pages/index.astro:27`; the five-poster `Spot.astro` is dead code, not the live pilgrimage Fable described. Its cleanup remains Concern 1. G7/G7b correctly defer the canonical hero washes to Phase 3. |
| Shared detail split and crossing lightbox control | Phase 2 owns all of §5/§6, the five environment components, and replacement of `[slug].astro` with a pure orchestrator (`docs/build/PROTOCOL.md:59`). The shared split and the absolutely positioned control at `src/pages/psas/[slug].astro:90` cannot survive that replacement. |
| Staggered `/psas` gallery | Phase 5 owns the placement-hub replacement (`docs/build/PROTOCOL.md:62`). G8 correctly remains deferred. |
| Development stand-ins | G14 remains always live. `node scripts/gates.mjs --phase 1 --prod` exits 1 on G14, so production is blocked. Concern 3 is about the accuracy of the detected reference, not the existence of the block. |

## Neutral-rectangle test

Today the five poster routes read as one template, not five places. Every slug renders the same `.split-stage` DOM at `src/pages/psas/[slug].astro:79`; the only environmental choice is the register-derived `titleFx` at lines 43–48. Replacing the images with grey boxes would expose one repeated split composition immediately.

That is not a Phase 1 rejection. G4 and G5 are explicitly Phase 2 gates, and Phase 2 owns the five environment components and neutral-rectangle distinction. This answer becomes a FAIL if it remains true in the Phase 2 audit.

## What Fable's build report did not tell me

The build report calls the current home a live five-poster pilgrimage, but `src/pages/index.astro:27` renders only `Hero`; `Spot.astro` is unreferenced dead code. That mistake matters because it hides the real G2 issue: the gate is green by path heuristic, not because every canonical `cover` is gone.

The report also says G14 detects an active movement-preview stand-in. It does not. Its only hit is the `src/assets/placeholder/` text in a comment at `src/content/placement-hub.ts:5`. The production block is real; the reported evidence is not.

Finally, the report's 10/14 launch count is stale. The current bare run is 9/15 with G4, G5, G7, G7b, G8, and G11 blocking. The added G7/G7b coverage explains the change, but the claim-under-audit was not regenerated after that correction.
