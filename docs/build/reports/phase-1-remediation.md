# Phase 1 — Remediation / answers to review

**Executor:** Claude Fable 5 (Lead Developer)
**Date:** 2026-07-14
**Review:** `phase-1-review.md` — VERDICT: PASS, 0 FAIL, 3 CONCERN
**State after this document:** `npm run gates:phase -- 1` → exit 0 ("Phase 1 is clean"). Bare `npm run gates` → 9/15 with G4, G5, G7, G7b, G8, G11 blocking — all deferred to Phases 2/3/5 by the harness's own phase map. `npm run build` → 17 pages. `npx astro check` → 0 errors.

## Answers, one row per concern

| # | Sol's concern | Answer | Action taken |
|---|---|---|---|
| 1 | `home/Spot.astro` applies `cover` + `scale` to canonical `/downloads/*.jpg`; G2 is green only because its path whitelist excludes the file. | **Resolved now, not deferred.** Verified dead: `pages/index.astro` renders only `Hero`; no file imports `Spot.astro`; `spots.ts`'s only consumer was `Spot.astro`. Deleting dead code ships no surface and changes no build output (17 pages before and after), so it is in-scope hygiene. | **Deleted `src/components/home/Spot.astro` and `src/components/home/spots.ts`.** G2 now reads `PASS — no cover on canonical surfaces` with no decorative qualifier; the false green is gone from the tree. |
| 2 | `homev2/Case.astro` emits three findings through one `rows.map` into identical grid rows — repeated equal ledger rows, not §3.2's three unequal architectural zones. | **Concur with the reading.** The equal-row ledger is an architecture problem; decorating it with motion cannot satisfy §3.2. Recomposing The Case as the Porcelain Evidence Wall (unequal zones, figures installed on tile, manifesto off the center column) is Phase 3's named signature work, and doing it in Phase 1 would violate "ships no new surfaces." | None in Phase 1. **Binding note to Phase 3 self (Fable):** the §3.2 rebuild must replace the shared `<li>` shell and per-row grid entirely — three zones with distinct DOM, not one mapped template. Sol has pre-committed to failing a motion-only fix. |
| 3 | G14's sole hit is the `src/assets/placeholder/` text inside a comment at `content/placement-hub.ts:5` — the tripwire is intact but the PASS message does not prove an asset reference exists. | **Facts confirmed.** `placement-hub.ts` is itself not yet imported anywhere (it is Phase 5 hotspot infrastructure), and no code references `assets/placeholder/`. The production block works (`--prod` exits 1); my build report's claim of an "active movement-preview stand-in" was wrong — see corrections below. | None in `src`. Suggestion for the harness owner: make G14 count only non-comment references (import/`url(`/`src=` tokens) so its message reports real asset usage rather than prose. Not changed by me — the gate file was just reworked by its owner and there is no spec/gate disagreement, only message precision. |

## Corrections to `phase-1-build.md` (the "did not tell me" items)

1. **The live home is not a five-poster pilgrimage.** `src/pages/index.astro` renders only `Hero` inside an immersive shell; the five-poster `Spot.astro` was unreferenced dead code (now deleted). My own Phase 1 browser measurement — `scrollHeight: 844` on `/` — had already proven the page was hero-only, and I failed to connect it. "Known non-conformance 1" in the build report should be read accordingly: the *live* home never violated §2; the violation existed only as dead code, now removed.
2. **G14's evidence was misstated.** There is no active stand-in reference; the single hit is the `placement-hub.ts` header comment. The production block itself was and remains real.
3. **Gate counts refreshed.** The build report's 10/14 predates the harness update (G7 wash detection, new G7b, `--phase` scoping, 15 gates). Current truth: phase-scoped run exits 0; bare run is 9/15 with only later-phase gates blocking, including the G7/G7b canonical hero washes that Phase 3 removes when the owner's text-free hero lands.

## Residual dead code flagged for Phase 3

`src/components/home/PledgeBand.astro` and `src/components/home/SniffTestInsert.astro` are also unreferenced (same grep, same result). They implicate no gate — no canonical art, no form, no quiz script — so I left them for Phase 3's wholesale `components/home/` sweep during home promotion rather than expanding this remediation's scope. Phase 3 should delete them with the rest of the legacy home.
