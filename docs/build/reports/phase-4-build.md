# Phase 4 build report — Interaction contracts (§8, §9.1)

**Builder:** Claude Fable 5 (Lead Developer)
**Date:** 2026-07-15
**Scope:** specs.md §8 (Sniff Test tap-to-advance) + §9.1 (home contents overlay)
**Machine gates owned:** G10

## Gate run (verbatim)

```
gate-set: 19 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G17 G16]
18/19 gates pass  ·  1 deferred to later phases (G8)  ·  payload gates skipped (use --build)
Phase 4 is clean. Hand off to review.
```

G8 is the sole red and is DEFER (Phase 5 owns the placement hub). `npm run build`
completes clean (16 pages). `npx astro check`: 0 errors, 0 warnings. With
`--build`, G13 reports PASS (see the G13 measurement-hole flag below).

## What changed

| File | Change |
|---|---|
| `src/components/quiz/Question.astro` | Radios → activation **buttons** (`aria-pressed`); questions stack in one grid cell; `data-state`/`--q-dir` swap animation (opacity + 16px horizontal transform); `inert` when inactive; reduced-motion resolves instantly |
| `src/components/quiz/Quiz.astro` | Continue button **removed** (tap advances); Back retained; `.quiz__form` is the stacked grid; `[hidden]` display pinned (pre-existing bug, see below); `width: 100vw`→`100%`; beat `60vh`→`60svh` (§5.1 svh rule); Begin hidden under `html:not(.has-js)` |
| `src/scripts/quiz.ts` | Rewritten for tap-to-advance: activation records + advances after a 220ms selection-feedback dwell (80ms reduced-motion); swap lock prevents double-fire; all programmatic focus uses `{ preventScroll: true }`; Back overwrites — never accumulates — the score |
| `src/components/homev2/Contents.astro` | **New** — §9.1 contents sheet: trigger + native `<dialog>` (anchors first, routes second) + no-JS inline anchor list; scroll-lock CSS; reduced-motion branch |
| `src/scripts/contents-dialog.ts` | **New** — showModal, focus into dialog, `html.contents-open` scroll lock, explicit Tab trap, Escape (native), backdrop-click close, focus return to trigger |
| `src/components/homev2/Masthead.astro` | Link row replaced by the Contents slot; unused link CSS removed; `scroll-margin-block-start` for the five anchor targets (the masthead is sticky) |
| `src/components/homev2/{Case,Campaign,Confrontation,Oath,MovementReal}.astro` | Section ids `#case`, `#campaign`, `#confrontation`, `#oath`, `#movement` (one attribute each) |
| `src/content/copy.ts` | **New `contents` export** — structural navigation taxonomy for §9.1. See the copy-lane flag below |

## Decisions and reasoning

**1. Buttons, not radios (§8).** The prior quiz used native radio groups. Radios
select on arrow-key *navigation* — with tap-to-advance that advances a keyboard
user on their first arrow press, before they've browsed the options. Real
`<button>`s separate browsing (Tab) from committing (Enter/Space/tap), and they
fire `click` even when re-activating the already-chosen answer — which radios do
not (`change` never fires), and which the Back contract needs. The recorded
answer is exposed as `aria-pressed`; fieldset/legend group semantics are kept.

**2. The Continue button is gone.** §8: "A tap or keyboard activation records
the answer and advances." The final question's activation completes the
assessment (beat → verdict redirect). The 220ms dwell before the swap is
selection feedback, not decoration — reduced motion keeps a short 80ms beat
rather than zero, and the swap itself is instant there.

**3. Stable shell (§8).** All seven fieldsets occupy one grid cell
(`grid-area: 1/1`), so the form's height is the tallest question and cannot
move between questions. Measured at 390×844: **819px before and after every
advance**, `window.scrollY` 0 throughout. Inactive questions are `inert` +
`visibility: hidden` (unfocusable, invisible, but still sizing the cell).

**4. Pre-existing `[hidden]` bug found and fixed.** `.quiz__assessment` and
`.quiz__intro` declare `display: flex`, which silently beats the UA's
`[hidden] { display: none }`. In the old build the intro stayed in the tree
behind the assessment and the progress row leaked onto the intro screen. This
predates Phase 4 (same CSS shape in the prior Quiz.astro) and was caught by the
rendered a11y snapshot, not by source reading. Fixed with explicit
`.quiz__assessment[hidden]` / `.quiz__intro[hidden]` rules.

**5. Contents trigger replaces the masthead link row (with JS).** §9.1 frames
the dialog as *the* home contents sheet and its no-JS clause ("expose an inline
anchor list instead of hiding navigation") presumes the inline list is the
JS-off substitute for it. Keeping the old five-link row *and* the dialog would
ship two parallel navigations. So: `html.has-js` shows the 44px-tall Contents
trigger; without `has-js` (which only JS ever adds — the states are exactly
equivalent to JS-on/JS-off) the full inline list renders: five anchors first,
five routes second. **This visually changes the Phase-3-ratified masthead**; I
believe §9.1 compels it, but it is flagged here so Sol can rule rather than
discover it.

**6. Focus return has one deliberate exception.** §9.1: "return focus to the
trigger" — implemented for Escape, backdrop, and the Close button. When the
close is caused by *activating a navigation link*, focus is NOT yanked back to
the trigger: focus must follow the navigation (route links unload the page;
same-page anchors set the reading position at the target). For anchor jumps the
scroll lock is removed synchronously in the click handler, before the default
fragment navigation, or the jump would be swallowed by `overflow: hidden`.

**7. Anchor targets clear the sticky masthead.** `scroll-margin-block-start`
on the five ids lives in Masthead.astro — the masthead is what covers them.
Verified: after the `#case` jump, the section's top sits at 168px with the
masthead bottom at 118px.

**8. Two dialog scripts, deliberately.** `contents-dialog.ts` repeats
lightbox.ts's trap pattern (~25 lines) instead of importing from it. The two
islands load on different routes; a shared module would couple the home's
payload to the lightbox contract for a utility this small. Same belt-and-braces
rationale as lightbox.ts: native `<dialog>` top-layer + explicit Tab loop.

## Copy-lane flags (I do not author copy)

1. **`contents` in copy.ts is new.** The ten entry labels are **verbatim from
   specs.md §9.1** (Case, Campaign, Confrontation, Oath, Movement / PSAs, Sniff
   Test, Pledge, Crisis, Production Notes) — structural taxonomy, same class of
   overlap as the `SPOT NO.` removals. The **framing strings are implementation
   defaults awaiting copy-lane ratification:** `trigger: "Contents"`,
   `title: "Contents"`, `close: "Close"`, `anchorsLabel: "On this page"`,
   `routesLabel: "The routes"`. Re-voicing any of them is a copy.ts-only change.
2. **Voice tension:** the standard-Nav labels in `nav.links` are voiced
   "THE PSAS / THE SNIFF TEST / …" while §9.1 mandates plain "PSAs / Sniff
   Test / …" for the contents sheet. Both now exist (Nav on routes, contents on
   home). If the copy lane wants one voice, that is its call, not mine.

## Gate-harness flag (against my own interest)

**G13 has a measurement hole.** It sums only external `/_astro/*.js` modules
referenced from `dist/index.html`. Astro inlines small scripts, so the home
ships **zero external** modules and G13 reports `0.0 KB` — true but vacuous.
Honest measurement of the three inlined `<script type="module">` blocks on the
built home: **2.7 KB raw / 1.1 KB gzip** (budget: 25 KB). Phase 6 owns G13 and
should extend it to count inline modules; nothing in Phase 4 rides on the hole.

## Rendered verification (Playwright against `npm run preview`, 390×844)

§12 items owned by this phase, all verified in a real browser:

| Behavior | Result |
|---|---|
| Tap advance, no page scroll | PASS — scrollY 0 before/after; form height 819px stable |
| Focus to next question heading | PASS — `q1-prompt`, `q2-prompt` receive focus after advance |
| Progress announcements | PASS — aria-live "Question 2 of 7." / "Question 3 of 7." |
| Keyboard activation | PASS — Tab lands on active question's first answer (inert excludes the other six); Enter records + advances; visible amber focus outline |
| Back restores selection, no double score | PASS — `aria-pressed` state intact on return; re-activating the same answer re-advances (assignment semantics; radios could not re-fire) |
| Completion → verdict | PASS — beat shown + focused, then redirect to `/sniff-test/soap-smoldering`; no query param, no numeric score in DOM |
| Dialog open contract | PASS — focus lands on Close inside the dialog; `html.contents-open` set; computed `overflow: hidden` |
| §9.1 list order | PASS — anchors #case→#movement first, routes /psas→/about second, exact labels |
| Focus trap | PASS — 11 real Tab presses from Close wrap exactly back to Close; Shift+Tab wraps reverse |
| Escape | PASS — closes, unlocks scroll, focus returns to trigger |
| Backdrop click | PASS — closes |
| Anchor navigation | PASS — dialog closes, page scrolls to #case (730px), target clears the sticky masthead, focus not yanked to trigger |
| No-JS inline list | PASS — with `has-js` absent (the exact no-JS CSS state): trigger `display: none`, inline list visible with all ten links |
| Reduced motion | PASS (emulated) — question swap transition 0s, resolves to final composition, still advances; dialog `animation-name: none` |
| Zoom/short viewport | PASS — at 390×360 the sheet scrolls internally; last link reachable |
| Touch targets | PASS — trigger measures exactly 44px; route rows padded past 44px |

Evidence: `docs/build/reports/evidence/phase4-quiz-390x844.png`,
`phase4-contents-dialog-390x844.png`, `phase4-contents-dialog-1440x900.png`.
Console: only pre-existing warnings (GoatCounter localhost skip; font-preload
timing) — not introduced by this phase.

## What I could not do

- **True JS-disabled browser context** — simulated by removing `has-js` from
  `<html>`, which is CSS-identical to no-JS since only the pre-paint head
  script ever adds that class. A belt-and-braces no-JS run remains open for Sol
  if it wants one.
- **True browser-chrome 200% zoom** — approximated with a short viewport plus
  internal-scroll verification of the dialog frame.
- **Copy ratification** — the five framing strings above render today with my
  defaults; the copy lane owns their final voice.
