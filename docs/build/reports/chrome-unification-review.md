# Chrome Unification — Adversarial Review

**VERDICT: FAIL**

`gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]` · 21/21 pass · exit 0. `copy-gates` is 6/6 and the build produces 16 pages, but one shipped header string is expressly still an executor-authored stand-in and the fixed campaign running head fails its own 200%-text-size fit claim.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | **FAIL** | `docs/build/PROTOCOL.md:8-11`; `docs/copy/copy-contract-for-build.md:12-17`; frozen-deck rule at `docs/copy/copy-deck-v2.md:4` | `site/src/content/copy.ts:61-66`; `site/scripts/copy-gates.mjs:81-89` | `contents.closeCwaaa = "Return to the document"` is not copy-lane output. Its own source calls it a “Procedural stand-in” awaiting ratification, and Fable's report admits it is “the one authored string.” Moving invented copy into `copy.ts` centralizes the violation; it does not transfer authorship. The claimed 6/6 copy floor is also a false green for this exact marker: CG4 recognizes `flagged for copy lane` with a space, while the source says `COPY-LANE` with a hyphen, so the unresolved marker evades the gate. There is no later phase to own this deferral. |
| 2 | **FAIL** | `specs.md` §12 (`:302-311`); chrome-unification definition of done (`docs/build/reports/chrome-unification-spec.md:93-100`) | `site/src/components/chrome/CampaignMasthead.astro:393-405,407-413`; `site/src/styles/tokens.css:308-312` | The compact campaign masthead is hard-pinned to 57px, with a 55px border-box bar and 53px content box. At normal text size the rendered nameplate is 30.01px tall. At 200% text size, its `1.4rem` font, unitless `1.1` line-height, and `0.12em` top/bottom padding scale that box to about **60.03px**, so it cannot fit the 53px inner bar and protrudes through both header boundaries; the 390px two-column row also loses the horizontal headroom the fixed composition assumes. Fable's stated arithmetic—“~45px inside the 53px inner bar”—counts the glyph size but omits line-height and padding. §12 requires 200% zoom **and** text scaling without loss or overlap; normal-size 57px measurements do not establish that. |

- **FAIL** — violates a binding ownership or accessibility requirement and blocks this pass.

## Rulings on Fable's submitted choices

- **One `ContentsDialog` with two skins is accepted.** §5.2's “one component wearing five hats” prohibition governs the five poster environments, while the owner direction expressly mandates one site-wide dialog mechanism. The campaign and CWAAA mastheads own separate DOM; the shared dialog owns one semantic contract and applies register-specific type, color, rules, focus color, and backdrop.
- **The CWAAA 404 is accepted.** The owner mapping allows either register, `docs/design.md:57` assigns 404 to CWAAA, and the rendered page contains the PT Serif/manila letterhead with no campaign wordmark.
- **`contents.returnHome` and the CWAAA landmark label are accepted.** The former is spec-verbatim §9.2 taxonomy; the latter composes an existing organization name into a structural noun phrase. Neither license the new close-control sentence in finding #1.
- **The orphaned `nav.links` / `nav.quiet` data is not a rendered violation.** `Nav.astro` is deleted, no imports remain, and the generated site contains the new masthead system only.

## Rendered verification

- **390×844:** `/`, `/psas`, `/psas/unholy`, `/sniff-test`, a verdict, `/about`, `/pledge`, `/crisis`, and `/404.html` each render exactly one header and one dialog with no horizontal overflow. Home uses the monumental campaign masthead; the five campaign interiors use the compact `cm` header; the three CWAAA routes use `lh register-cwaaa` and expose no campaign wordmark. Every trigger measures 44px tall. The home dialog moved focus to its close control, locked background scroll, wrapped Shift+Tab from first to last and Tab from last to first, then returned focus to the trigger on close. The pledge dialog computes entirely to PT Serif, marks Pledge current, and contains no campaign wordmark.
- **1440×900 and 1920×1080:** the same nine-surface register map holds. Every campaign interior header measures exactly 57px, every trigger remains 44px tall, and every tested route reports zero horizontal overflow at normal text size. The saved home, poster-detail, crisis, and both dialog-register renders agree with those live measurements; no display descender is clipped at the three normal-size widths.
- **No-JS structure:** every one of the 16 rebuilt HTML pages contains one inline fallback `<nav>` and one `data-contents-open` button. The button is hidden and fallback visible by default; the synchronous head script adds `has-js`, which swaps those states only when JavaScript runs. `Nav.astro` is absent and `hideNav` has zero source hits.
- **Text scaling:** finding #2 is deterministic from the live normal-size measurement and the shipped em/rem math. The report's claimed 200% headroom is not present in the CSS.

## Harness check

`npm run gates:build` rebuilt 16 pages and exited 0 with 21/21 gates; bare `npm run gates` is 20/20 and `npm run copy-gates` is 6/6. The only `gates.mjs` diff expands G12's scan from environments/homev2 to `components/chrome/`; it does not loosen a threshold or delete a check. `distinguishability.mjs` and `copy-gates.mjs` are unchanged against `HEAD`. The harness was not weakened, but CG4 has the marker-normalization hole described in finding #1, so its green result does not ratify the admitted stand-in.

## What Fable's build report did not tell me

The report correctly discloses that it authored `closeCwaaa`, then treats future copy-lane ratification as compatible with a completed handoff. It is not: the protocol forbids that authorship, the deck is frozen, and no later phase owns the repair. More importantly, the report's 200%-text-size defense is based on the 44.8px font size alone. The actual grid item includes a 49.28px line box plus 10.75px of block padding, exceeding the fixed bar before the mobile two-column squeeze is even considered. The dialog “five hats” question is defensible; these two unfinished acceptance conditions are the real blockers.

## Close-out verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 executor-authored `closeCwaaa` plus CG4 false green | Removed “Return to the document”; restored the established plain default “Close”; added copy-lane work item 10; normalized CG4's separator to `[-\s]`. | **RESOLVED** — the rejected authored sentence has zero source hits. “Close” is the already-recorded item-8 implementation default, not new campaign voice; any re-voicing is concretely owned by the copy lane in `PROMPT-COPY.md` item 10 and is acceptance-blocking at the Phase 6 copy floor. Independent predicate checks catch the exact former hyphenated evasion and both spaced/hyphenated placeholder forms while leaving ordinary “copy lane” prose alone. |
| #2 fixed 57px campaign bar fails 200% text scaling | Replaced fixed `block-size` with `min-block-size`; added scalable padding and explicit columns; retires the fiction below 768px and the decorative trigger rule at 640px. | **RESOLVED** — this removes the fixed-height defect class rather than retuning one viewport. The 57px normal-metrics minimum remains, while the scaled line box and padding now participate in intrinsic height. The two horizontal pressure bands are structurally relieved. The reported 73.2px scaled bar containing the 60px nameplate is consistent with the shipped CSS math. |

Gates: `gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]` · 21/21 · exit 0.

Build: 16 pages · exit 0. Copy gates: 6/6 · exit 0.

Harness diff: strengthened, not weakened — `copy-gates.mjs` broadens CG4's separator handling to `[-\s]`; `gates.mjs` retains the reviewed G12 coverage expansion; `distinguishability.mjs` is unchanged.

Deferred-to-nowhere: none. `contents.closeCwaaa` re-voicing is owned by copy-lane work item 10 and the Phase 6 copy floor. The disclosed pre-existing 200%-text overflow in poster controls is outside these two findings, untouched by this remediation, and explicitly owned by the still-unclosed Phase 6 §12 launch audit.
