---
target: cwaaa/src/pages/index.astro
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-14T22-43-30Z
slug: cwaaa-src-pages-index-astro
---
Method: dual-agent (A: design review subagent · B: detector/browser subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | The bar's pledge link appearing after scroll is an unannounced state change; copy-link status region is good |
| 2 | Match System / Real World | 3 | "Tie One On" reads as a drinking idiom on first contact; "Form CW-1" precedes any explanation |
| 3 | User Control and Freedom | 3 | Mobile menu has no close control, no outside-tap or Escape close; a close label exists in copy.ts unused |
| 4 | Consistency and Standards | 2 | Take the Pledge has three visual treatments on one page; the voice section's only heading is its marker |
| 5 | Error Prevention | 3 | Tap targets now all clear 44px; clipboard is the one control that can fail and nothing guards a non-secure context |
| 6 | Recognition Rather Than Recall | 3 | "Send this to someone" does not say what "this" is |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, no repeated task |
| 8 | Aesthetic and Minimalist Design | 3 | Stamp red diluted across markers and secondary links; placeholder spec is the loudest text on phones |
| 9 | Error Recovery | 2 | Clipboard failure dumps a bare URL into the status span; with JS off the button renders and does nothing |
| 10 | Help and Documentation | n/a | Persuade surface |
| **Total** | | **22/32** | **Good (69%)** |

## Design Specificity Verdict

**LLM assessment.** Character is carried where the page is typographic and ruled: the sentence-case MORVI proposition on the hero, the ruled document actions with "Form CW-1" as a right-aligned note, the single running DOCUMENT. ADVOCATE. ORGANIZE. line with ADVOCATE in tint over a hairline run, the Modest testimony, the methodology note, and the new close with the scale line and two chapter traces. Character fails in three places: stamp red is spent on five dot markers, two secondary links, and the on-field nav pledge, so the one pledge action no longer owns the color the direction contract reserved for it; the home Finding has no figure, number, or record row, so it reads as a second headline rather than something filed; and the recovery-voice section, white field with a bordered hatch box and two mismatched controls, is the one region that reads as a wireframe regardless of the placeholder.

**Deterministic scan.** CLI: 0 findings across the source. In-page detector: 20 anti-pattern groups, 30 individual flags, most false positives in context: cream-on-cream contrast on the proposition and brand (measured against page background; the real ground is the hero at about 9.4:1), tracking and leading on the seal's SVG wordmark, all-caps on short interface labels, the ivory token flagged as a cream palette, "every theater" flagged inside approved copy, and four hits on the detector's own overlay. Two real signals: the placeholder spec labels are genuine 173 and 314 character uppercase runs, and the footer fine print is one 223 character line at desktop width.

**Browser evidence.** No horizontal overflow at 1440 or 390. Every tab stop that takes focus shows a solid 2.67px ring. Every phone tap target measures 44px or more, including the utility link, Menu, footer legal links, and the referral button. Heading outline is H1 then six H2s in sequence order. Contrast passes AA on every solid field; the "Form CW-1" note on the primary action sits at about 4.6:1 after its 85% opacity, marginal. The utility bar's pledge link is hidden at scroll zero on desktop and settles visible about 2.7 seconds after a 1500px scroll, because smooth scrolling delays the trigger and the fade then runs 0.72s. No overlay was left in your browser; the tab was closed.

## Overall Impression

The two P1s from the first run are resolved: the page now ends on the scale line, two human traces, and one ruled pledge action, and the first viewport carries one pledge link, not two. What surfaced underneath is a color discipline problem and a referral control that refers to the wrong thing. The single biggest opportunity: make red mean pledge again.

## What's Working

1. **Ruled document actions.** Rule top, rule bottom, uppercase Catesque, the form number as a note, hover moves the note. CWAAA authorship in one component.
2. **The DOCUMENT. ADVOCATE. ORGANIZE. field.** One running heading, a drawn-in hairline, three columns separated by hairlines rather than cards.
3. **Reveal engineering, now with the close.** Visible by default, gated on has-js plus motion-ok, reduced motion honored live, and the closing field settles in reading order like everything else.

## Priority Issues

**[P1] Stamp red is spent everywhere, so the pledge owns nothing.**
Why it matters: red appears on five markers, the figcaption link, the ribbon panel link, the seam link, and the on-field nav pledge, plus both primary actions. The direction contract reserves red for the pledge action and photographed cloth. In no viewport is the primary action the only red thing.
Fix: markers in ink with the dot in grey (or dot red, label ink); the figcaption and panel links in ink with an ink rule; red kept for the primary ruled action and the bar's hover tint only.
Suggested command: /impeccable quieter

**[P1] The referral action does not refer.**
Why it matters: "Send this to someone" copies the home URL. The referring woman's job is to act on a specific man, and his job is Form CW-1. She copies a page about a coalition instead of the form he should sign.
Fix: copy the pledge URL, relabel along the lines of "Copy the pledge link for him" (DRAFT, copy lane), keep the confirmation line, and render it as a link to the pledge progressively enhanced to copy, so it works with JavaScript off.
Suggested command: /impeccable clarify

**[P2] Display lines clip between 701px and about 1100px, and at 200% zoom.**
Why it matters: the proposition and the running line stay nowrap above the phone breakpoint while body overflow is clipped, so "soap." and "ORGANIZE." are cut, not wrapped. A 1440 display at 200% zoom is exactly in that band.
Fix: cap both with a viewport-relative minimum (about 10.5vw for the proposition, 5.6vw for the line) or drop nowrap and balance.
Suggested command: /impeccable adapt

**[P2] The home Finding has no figure or record; it reads as a headline.**
Why it matters: design.md defines a Finding by an oversized figure, hard rule, conclusion, note, and disposition. The home renders four of five and the Mirk Slab figure role is absent from the page entirely. "Entered into the public record" asks the visitor to believe something was filed and shows nothing filed.
Fix: within CW-D04, render a one-row record under the rule (entered, by, disposition) and reserve a figure slot for when the register lands.
Suggested command: /impeccable bolder

**[P3] Navigation sits on the hero subject's safe zone.**
Why it matters: the nav is about 85px tall over the photo and the placeholder's safe zone starts near that line, directly under "Chapters · About · Take the Pledge." The shot brief puts hands and knot upper-right, under the nav.
Fix: record in the CW-G02 brief that the knot sits below about 22% from the top, and move the placeholder's safe inset to match so it tells the truth.
Suggested command: /impeccable document

## Persona Red Flags

**Jordan (first-timer):** "Tie One On" reads as drinking; "Form CW-1" appears twice before anything explains it; "Send this to someone" gives no idea what will be sent; on phones the 40-word placeholder spec is the largest block of text in the first viewport.

**Casey (distracted mobile):** the sticky bar costs about 48px of an 844px viewport for the whole scroll; the Menu has no close and no outside-tap close; the ribbon panel covers most of the cloth field on a phone; the three DOCUMENT. ADVOCATE. ORGANIZE. columns become a long stack.

**Riley (stress tester):** nowrap clipping in the 701 to 1100px band; a non-secure context leaves the clipboard undefined and prints a bare URL; unrevealed sections print at opacity zero because there is no print reset; will-change stays on about 25 nodes after settle.

**Woman arriving from the Got Soap? seam:** she gets language quickly ("Fragrance is not a cleansing event," "when fragrance is asked to do a shower's job") and still no way to act on a specific man: the only referral control copies the home page, the ribbon panel says "learn," and nothing in the navigation names referral.

## Minor Observations

- The voice section uses its marker as the heading; every other section pairs a marker with a real heading.
- A "Number pending register" note and a "Close" label exist in copy.ts and are unrendered.
- The "Form CW-1" note on the primary action sits near the 4.5:1 line after opacity.
- Footer legal nav repeats "About" from primary nav.
- The seal at 44px renders rim text under 3px.
- A section fully settles in about 1.2s; the third DAO column waits 360ms after the rule, slow when scrolling fast.
- The hero and ribbon use vh rather than dvh, so the hero shifts when phone browser chrome collapses.
- The utility bar states the scale line for the entire scroll and the close sets the same sentence at the page's second-largest size.

## Questions to Consider

1. The bar states "Two million concerned women" for ninety seconds before the close sets it at the page's second-largest size. Is that scale earned, or is the biggest type spent on the one line already read?
2. A Finding on this site is defined by its figure and its filing. The home Finding has neither. Does a Finding without a record still read as CWAAA, or as a slogan with a marker?
3. If the woman's job is to act on a specific man, why is the page's only referral device a copy of the home page instead of the form he is supposed to sign?
