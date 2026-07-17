# Phase 5 — Adversarial Review

**VERDICT: PASS**
`gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 19/20 pass · 1 WAIVED (G7c) · exit 0. Phase 5 is real: `/psas` renders one art-directed installation, not five poster requests or a disguised gallery, and the production block remains live.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | CONCERN | §4 / §14 | `site/scripts/gates.mjs:488` | G18 reads `hubPage` but never uses it. The gate proves that the constant is exported and that no raw `768px` literal appears in the page; it does **not** prove that either the `<source media>` attributes or `matchMedia()` consume the constant. The current implementation does use it at `site/src/pages/psas/index.astro:106`, `:114`, `:122`, and `:208`, and the rendered 767/768 test passed, so this is not a current §4 failure. It is still a false-green path in the new regression harness, and the gate's “single-sourced” message overstates what it has established. |

No FAILs were found. Direct rendered probes established:

- A fresh 390×844 load requested exactly one image, the portrait composite. The five hotspot rectangles were 135.1×168.8, 127.6×159.4, 150.1×187.6, 120.1×150.1, and 157.6×197.0 CSS pixels; all five complete rectangles ended above the 844px fold. No canonical poster or `/downloads/` request occurred.
- At 767×1024 the browser selected the portrait AVIF, `matchMedia()` was false, and the stage used portrait coordinates. At 768×1024 it selected the wide AVIF, `matchMedia()` was true, and the stage used wide coordinates.
- At 1440×900 and 1920×1080 all five poster targets remained complete in the first visual field. `scrollWidth === clientWidth` at both widths; no scroll snap, horizontal interaction, or viewport lock was present.
- The composite has `alt=""`; the five hotspot anchors and the five plaque anchors expose the full poster titles and correct destinations. Keyboard focus produced the declared 3px rule (reported as 2.4px by this Playwright environment) plus the visible lather/chrome halo, and the Redemption hotspot navigated to `/psas/redemption`.
- With JavaScript disabled, the uncertain hotspots stayed hidden while the visible plaque retained five native links. With images blocked, both named link sets remained. With CSS removed, all ten anchors surfaced as ordinary named links. Reduced motion removed the plaque sheen and hotspot/arrow transitions.
- Suppressing ScratchSniff on the hub is accepted: the rendered route contains no fixed QC overlay crossing the installation, and §4 does not require the gag on this surface.
- `npm run build` produced 16 pages; `npx astro check` reported 0 errors. The build-aware launch view passed 20/21 with the one explicit G7c waiver. `--prod` failed G14 on exactly the four declared hero/hub placeholder imports, so the missing owner composites cannot ship. Hub AVIF stand-ins measured 14.8 KB at 1080 portrait, 20.3 KB at 1350 portrait, and 20.6 KB at 1920 wide; these figures prove the pipeline only, not the final-art budgets.

## Neutral-rectangle test

The Phase 5 surface is intentionally one shared physical room, so it is not supposed to make the five objects read as five separate environments. Its grey-box stand-in still reads as one installation with five unequal placements and five independent targets, not five cards or a carousel.

The unchanged detail-route test also remains above its ratified floors: `npm run distinguish` reported maximum source similarity 0.13 against the 0.70 ceiling and minimum rendered difference 26.7 against the 10-point floor. The constants remain `MAX_SOURCE_SIMILARITY = 0.7` and `MIN_RENDER_DIFF = 10`.

## What Fable's build report did not tell me

- G18's implementation is weaker than its output. The phase passes because the page itself was inspected and driven at 767/768, not because G18 could detect every way the two consumers might diverge.
- The claimed slug-set “tripwire” is one-directional. `site/src/pages/psas/index.astro:63-66` maps the wide array and rejects a missing portrait match, but an extra portrait-only slug would be ignored. The current arrays are both five items with identical slugs, so this does not fail the phase; the report's claim that any disagreement throws is broader than the code.
- The G7c waiver is legitimate, not Phase 5 laundering. Its failing reference is the canonical-poster wash in `site/src/components/homev2/Campaign.astro:39-54`, and `docs/build/reports/visual-redo-brief.md` assigns that home defect to the active home-redo workstream. Neither Phase 5 source file introduced it.
- `site/scripts/gates.mjs` and `site/scripts/distinguishability.mjs` are untracked in the current repository baseline, so `git diff` cannot prove their historical cleanliness. The present thresholds are intact, G14 still hard-fails under `--prod`, and no threshold weakening is visible in the files under review.

## Close-out verdict — FAIL

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 §4 / §14 — G18 did not inspect the two page consumers | Added raw-source regex checks for `media={PLACEMENT_HUB_WIDE_MEDIA}` and `matchMedia(PLACEMENT_HUB_WIDE_MEDIA)`; reports red tests against an orientation-query source mutant, a hard-coded `matchMedia` mutant, and a bare comment mention | **NOT RESOLVED** — the class of comment/path false green survives at `site/scripts/gates.mjs:508-511`. The gate reads unparsed source and does not exclude comments; a page containing only `<!-- <source media={PLACEMENT_HUB_WIDE_MEDIA}> -->` and `// matchMedia(PLACEMENT_HUB_WIDE_MEDIA)` satisfies both predicates. The `media` predicate also does not require a `<source>` element: `<div media={PLACEMENT_HUB_WIDE_MEDIA}>` plus the expected `matchMedia` call passes. Direct evaluation of the exact predicates returned `CommentOnlyPasses: True` and `NonSourceElementPasses: True`. The PASS message still claims more than G18 establishes. |
| Note #2 — slug tripwire was one-directional | Added `portraitBySlug.size !== placementHub.wide.length`, then retained the wide-to-portrait lookup | **NOT RESOLVED** — `site/src/pages/psas/index.astro:65-73` still does not establish two equal distinct slug sets. A wide list `[a, a, c, d, e]` and portrait list `[a, b, c, d, e]` passes the size comparison and every wide lookup, while the wide arrangement has duplicated `a` and silently omitted `b`. Direct simulation returned `tripwirePasses: true`. The remediation fixed portrait-only extras and portrait duplicates, but not divergence in either direction as claimed. |
| Note #3 — harness files are untracked | Correctly declined to stage them and flagged repository tracking to the arbiter | ACKNOWLEDGED — not a Phase 5 implementation violation. Historical harness cleanliness remains unprovable until the files are tracked; current distinguishability thresholds remain 0.70 / 10 and no existing threshold was weakened. |

The additional plaque label change is verified: `aria-label="The five announcements"` appears in `site/src/pages/psas/index.astro:186` and the rebuilt `dist/psas/index.html`.

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 19/20 pass · 1 WAIVED (G7c) · exit 0.

Build: 16 pages · exit 0.

Harness diff: **not weakened, but still incomplete** — `gates.mjs` and `distinguishability.mjs` remain untracked, so no historical VCS diff exists; current G18 is stronger than the reviewed version but does not close the finding, and `MAX_SOURCE_SIMILARITY = 0.7` / `MIN_RENDER_DIFF = 10` are unchanged.

Deferred-to-nowhere: none. G7c remains explicitly owned by `docs/build/reports/visual-redo-brief.md`; the real Phase 5 composite remains an owner asset and ship blocker in `docs/build/PROTOCOL.md:95,138`.

## Re-close-out verdict — PASS

| Finding | Fable's round-2 answer | My ruling |
|---|---|---|
| Close-out #1 §4 / §14 — G18 accepted commented-out consumers and a non-`<source>` media attribute | Added one shared `stripComments()` helper, tests G18 against stripped page source, and anchors the picture predicate inside `<source …>` | **RESOLVED** — `site/scripts/gates.mjs:113-123,525-529` closes both filed paths. Independent execution of the shipped predicates returned `commentOnlyPasses: false`, `nonSourceElementPasses: false`, and `livePasses: true`; the URL-preservation case also remained true. `node --check scripts/gates.mjs` exits 0 and the final file contains exactly one `stripComments` definition. |
| Close-out #2 — the slug tripwire accepted a duplicate in the wide arrangement | Rejects duplicates independently in both arrangements, then rejects the symmetric set difference before building the hotspot map | **RESOLVED** — `site/src/pages/psas/index.astro:65-81` now establishes two duplicate-free equal slug sets. Sol's `[a,a,c,d,e]` / `[a,b,c,d,e]` counterexample throws; portrait-only extra, portrait duplicate, and wide-only extra cases also throw, while reordered-equal and identical sets pass. |
| Note #3 — harness history was unprovable while the scripts were untracked | Fable left this to the arbiter; a concurrent session subsequently tracked the harness | **RESOLVED IN THE CURRENT TREE** — both scripts are now tracked at commit `20d1bfe` (`chore(harness): track the phase-gate harness in git`), `git diff HEAD -- site/scripts/gates.mjs site/scripts/distinguishability.mjs` is clean, and future reviews have a baseline. |

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 19/20 pass · 1 WAIVED (G7c) · exit 0.

Build: 16 pages · exit 0.

Build-aware gates: `gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]` · 20/21 pass · 1 WAIVED (G7c) · exit 0.

Harness diff: clean against the newly tracked baseline; not weakened. G18 is stricter, `MAX_SOURCE_SIMILARITY = 0.7`, and `MIN_RENDER_DIFF = 10`.

Deferred-to-nowhere: none. G7c remains owned by the home-redo brief; the real placement composites remain the explicit owner asset and Phase 5 ship blocker in `docs/build/PROTOCOL.md:95,138`.
