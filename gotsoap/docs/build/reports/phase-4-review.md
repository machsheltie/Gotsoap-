# Phase 4 — Adversarial Review

**VERDICT: PASS**
`gate-set: 19 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G17 G16]` · 18/19 · exit 0. The interaction phase is real: the quiz satisfies §8 under tap, keyboard, Back, completion, and reduced-motion paths, and the contents sheet satisfies §9.1 in both JavaScript and genuinely JavaScript-disabled browsers.

## Violations

None.

## Neutral-rectangle test

Phase 4 does not touch any of the five environment components or their neutral evidence renders. A fresh `npm run distinguish` exits 0 with the carried-forward matrices intact: maximum source similarity 0.13 against the 0.70 ceiling; worst rendered pair 26.7 against the 10 floor. Direct inspection confirms `MAX_SOURCE_SIMILARITY = 0.7` and `MIN_RENDER_DIFF = 10` remain unchanged in `site/scripts/distinguishability.mjs:57-59`.

## What Fable's build report did not tell me

Its no-JavaScript evidence was incomplete: removing `.has-js` is not a JavaScript-disabled browser. I ran the built site in a context with `javaScriptEnabled: false`. The trigger computed to `display: none`; the inline navigation computed to `display: block`; all ten links appeared in the required anchor-first/route-second order; and `#case` landed at its 167.7px scroll margin. The implementation at `site/src/components/homev2/Contents.astro:24-97` passes the actual fallback contract, not merely the simulated one.

Fable's “focus follows navigation” wording is imprecise. After a same-page dialog link closes, Chromium reports `document.activeElement === body`, not the target section. The fragment navigation still lands Case at 168.1px below the 118.5px sticky masthead, and the next Tab reaches Case's “Read the full findings” link; route links perform full navigation. I accept the deliberate `restoreFocus = false` branch at `site/src/scripts/contents-dialog.ts:91-118`: Escape, Close, and backdrop dismissal return focus to the trigger, while link activation preserves destination keyboard order.

The quiz behavior also survived a test designed to expose double-counting: answer question 1 with score 3, advance, Back, re-activate the same selected answer by keyboard, then answer the remaining six with score 0. The result was `/sniff-test/soap-smoldering` with no query string or numeric score; an accumulating implementation would have crossed into the next band. Across the forward and Back transitions, `scrollY` stayed 0, the form stayed 818.5px high, focus moved `q0-prompt → q1-prompt → q0-prompt → q1-prompt`, and the live region announced the matching question. The assignment and focus paths are at `site/src/scripts/quiz.ts:93-138` and `site/src/scripts/quiz.ts:172-208`.

Fresh verification: `npm run gates:phase -- 4` exits 0 at 18/19 with only G8 deferred to its Phase 5 owner; bare `npm run gates` has only that future blocker; `npm run build` builds 16 pages and exits 0; `npx astro check` reports 0 errors, 0 warnings, and 2 hints. G10 remains only a native-`<dialog>` structural floor, so the behavioral verdict above comes from the browser run rather than the gate's grep.
