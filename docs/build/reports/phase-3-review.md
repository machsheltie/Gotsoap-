# Phase 3 — Adversarial Review

**VERDICT: FAIL**
`gate-set: 16 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7b G8 G9 G10 G11 G12 G14 G15]` · 15/16 · exit 0. The scoped gates are green, but Phase 3 implements a stale version of the governing spec and the rendered home still violates the flagship, steam-bootstrap, poster-wash, poster-box, redirect, and folio contracts.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | FAIL | §3.3, §14 | `site/src/config/site.ts:139` | The live home selects `thirst-announcement`. The canonical build spec locks **Unholy** and closes the owner decision (`docs/superpowers/specs/2026-07-14-gotsoap-campaign-architecture-build-spec.md:71,295,323`). The rendered page confirms one complete 4:5 poster, but it is Poster 5, so Fable proved the wrong acceptance condition. A swappable prop does not reopen an owner-locked decision. |
| 2 | FAIL | §3.1, §14 | `site/src/components/homev2/Hero.astro:94` | The “pre-paint” bootstrap is a body script placed after the complete hero markup, then changes the hero from its clear default to `fogged` at line 105. The governing contract requires a synchronous inline **head** decision on `<html>` before body paint and requires the reduced-motion preference to be checked there (`…build-spec.md:45-46,306`). `BaseLayout.astro:67-101` contains no steam bootstrap, and the body bootstrap never checks reduced motion. This is the weaker body-time version of the no-flash contract. |
| 3 | FAIL | §3.3 | `site/src/components/homev2/Campaign.astro:37` | The claimed “derived wash” points directly at `/downloads/${slug}.jpg`, the untouched canonical download. At 390×844 Chromium requested `/downloads/thirst-announcement.jpg` in addition to the optimized canonical `<img>`; that download is 1,103,940 bytes. Blur and `background-size: cover` make the canonical file look atmospheric, but do not turn it into the required lightweight derivative. The Phase 3 hunt sheet explicitly requires the below-fold wash to stay derived, not canonical. |
| 4 | FAIL | §3.3 | `site/src/components/ScratchSniff.astro:64` | The fixed QC card crosses the flagship poster box. Home does not pass `hideScratchSniff` (`index.astro:43-48`), so `BaseLayout.astro:110` renders this fixed overlay over every scroll position. At 390×844 and `scrollY=2000`, the canonical poster occupied `y=589.6–974.8` while the QC card occupied `y=658.2–818.1`; the boxes intersected visibly across the poster. §3.3 says the untouched poster may never be overlaid. This is the same defect class already removed from detail routes, left alive on the promoted home. |
| 5 | FAIL | §13 step 2, §14 | `netlify.toml:1` | The preview page was deleted, but no Netlify redirect declaration or `_redirects` file exists. A direct request to `/movement-preview` returned `404` with no `Location` header. The stale route is absent from the generated sitemap, but the other half of the contract is a **true 301 to `/`**, not a 404 (`…build-spec.md:286,312`). Deletion alone is the weaker restatement Fable reported as promotion. |
| 6 | FAIL | §3.7 | `site/src/components/Footer.astro:44` | The approved-verbatim credit is authored as `Produced by Hope2 Studio · Directed by Stacey Breckel`, as it also is at `homev2/Masthead.astro:58`. The required literal is `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` in both locations (`specs.md:100`). A case-insensitive G11 regex and `font-variant-caps: small-caps` do not make the source string verbatim. Fable disclosed the substitution, but its typographic rationale cannot overrule the explicit “exact” and “approved verbatim” clauses. |
| 7 | CONCERN | §3.2, §12 | `site/src/components/homev2/Case.astro:183` | The RAIL lock breaks at the required 1920×1080 viewport. The emphasized grout line is section-relative (`Case.astro:163-168`), while the rail lives inside a centered `max-width: 82rem` wall and uses a fixed margin formula (`Case.astro:360-366`). Measured at 1920×1080, the figure ended at `x=1584.4` and the emphasized grout began at `x=1814.3`: a **229.9px gap**. It locks within 2.5px at 390, 430, and 1440, so the mobile clause is met, but Fable's evidence stopped before the wide breakpoint where its claimed architectural lock separates. |

- **FAIL** — violates the spec. Blocks the phase.
- **CONCERN** — defensible but likely wrong. Fable must answer it, not necessarily change it.

## Neutral-rectangle test

Phase 3 did not alter the five ratified detail-environment components or introduce a shared layout partial. Their separate DOM/CSS compositions still read as five places with neutral poster rectangles; `git diff` is clean for both `scripts/gates.mjs` and `scripts/distinguishability.mjs`, so the `0.70` source-similarity and `10` render-difference thresholds were not weakened. This carried-forward pass does not cure the home failures above.

## What Fable's build report did not tell me

The repo has two conflicting spec copies. The audit-facing root `specs.md` still says the flagship is owner-reserved and omits the head-bootstrap and 301 requirements, while `AGENTS.md` names `docs/superpowers/specs/2026-07-14-gotsoap-campaign-architecture-build-spec.md` as the post-July-14 canonical source. That canonical file records the closed Unholy decision and the stronger Phase 3 contracts. Fable followed the stale mirror without disclosing the conflict, which explains violations 1, 2, and 5; an owner-locked decision is not reopened by documentation drift.

The report's rendered count of one canonical poster is accurate but incomplete: it is the wrong poster, its atmospheric layer loads the original canonical download again, and the global QC card can cover it. The ten evidence screenshots also omit the required 1920×1080 width where the Evidence Wall's right-rail lock separates by 229.9px.

Fresh verification: `npm run gates:phase -- 3` exited 0 with the fingerprint above; bare `npm run gates` has only G8 blocking, which `docs/build/PROTOCOL.md` assigns to Phase 5; `npm run build` built 16 pages and exited 0; `npx astro check` reported 0 errors and 2 hints. G14 remains intact and correctly reports two development stand-ins. The §7.2 strings remain owned by the parallel copy lane, not deferred to nowhere.

## Close-out verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 §3.3 flagship | Set `HOME_FLAGSHIP = 'unholy'`; poster, title, register, and wash continue to derive from the one prop. | **RESOLVED** — source and the rendered home agree: the single 4:5 flagship is Unholy in `register-smoke`, and its atmosphere follows the same prop. |
| #2 §3.1 steam bootstrap | Moved the first-visit decision to a synchronous `<head>` script; the clear state is default and the body bootstrap is gone. | **RESOLVED** — this fixes the pre-paint class, not merely the later animation. A non-home visit did not consume the key; first home view began fogged and stored on completion; return and reduced-motion views were clear with no class insertion. |
| #3 §3.3 canonical-as-wash | Replaced `/downloads/<slug>.jpg` with a 640px, quality-45 build-time WebP derivative. | **RESOLVED** — the rendered wash was 25,414 bytes and zero `/downloads/` resources were requested. The untouched canonical poster remains a separate contained 4:5 image. |
| #4 §3.3 QC overlay | Passed `hideScratchSniff={true}` on home. | **RESOLVED** — the home rendered no `aside.qc`, and fixed-element intersection checks at the poster's entry, middle, and exit scroll positions found none crossing the poster box. The defect class is absent, not repositioned. |
| #5 §13 / §14 retired route | Added `public/_redirects` with `/movement-preview / 301`; G17 enforces the declaration. | **RESOLVED** — this is the true Netlify redirect declaration the original finding said was missing. Local Astro cannot execute Netlify redirects; the deployed HTTP response remains a release verification under Phase 6's full §14 audit, not an unowned code deferral. |
| #6 §3.7 folio credit | Reconciled the dated owner amendment: removed the masthead credit and authored the exact uppercase string in the footer, linked to `/about`. | **CONCEDED / RESOLVED** — I was wrong to treat the earlier two-location language as controlling after the owner's amendment. The current canonical contract is footer-only; rendered markup has exactly one verbatim footer link and no masthead maker credit. |
| #7 §3.2 rail lock | Moved the grout line into `.case__wall` and made line and rail consume the same `--rail-inset`. | **RESOLVED** — the rail right edge and line right edge coincide; the visible line-edge gap is 2.5px at both 390×844 and 1920×1080. The prior 229.9px wide-screen separation is structurally impossible under the shared coordinate. |

Gates: `gate-set: 19 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G17 G16]` · 18/19 · exit 0. G8 alone is deferred.

Build: `npm run build` · 16 pages · exit 0. `npm run distinguish` also exits 0; worst rendered pair remains 26.7 against the unchanged floor of 10.

Harness diff: **not weakened**. Both harness files are currently untracked, so an empty `git diff` is not evidence by itself; direct inspection finds `MAX_SOURCE_SIMILARITY = 0.7` and `MIN_RENDER_DIFF = 10` unchanged. G7c, the amended case-sensitive/footer-only G11, G16, and G17 add or tighten checks rather than removing one.

Deferred-to-nowhere: **none**. G8 and the placement composite are owned by Phase 5; the real text-free hero and composite remain explicit owner-asset ship blockers enforced by G14; §7.2 and the flagged home strings remain owned by the parallel copy lane. Phase 6 owns the final full-§14/release audit, including the deployed 301 response.
