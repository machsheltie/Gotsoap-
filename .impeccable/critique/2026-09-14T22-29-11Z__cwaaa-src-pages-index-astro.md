---
target: cwaaa/src/pages/index.astro
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-14T22-29-11Z
slug: cwaaa-src-pages-index-astro
---
Method: dual-agent (A: design review subagent · B: detector/browser subagent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Reveal stagger delays below-fold content up to ~1s with no cue more is coming |
| 2 | Match System / Real World | 3 | "Number pending register" is a production note in public copy |
| 3 | User Control and Freedom | 3 | Mobile menu has no close affordance; summary keeps reading "Menu" when open |
| 4 | Consistency and Standards | 2 | Four action treatments on one page; "Read his Recovery Story" lands on the index |
| 5 | Error Prevention | 2 | nowrap display lines with overflow clipped; utility link 27px tall, footer links 15px tall |
| 6 | Recognition Rather Than Recall | 3 | The pledge's nature (one declaration, two emails, then silence) is stated nowhere on the home |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, no repeat-use task |
| 8 | Aesthetic and Minimalist Design | 3 | Two identical pledge links stacked at top-right of the first viewport |
| 9 | Error Recovery | 3 | Authored 404 with three exits; nothing else to recover from |
| 10 | Help and Documentation | n/a | Nothing on a home page should need documentation |
| **Total** | | **22/32** | **Good (69%)** |

## Design Specificity Verdict

**LLM assessment.** The skeleton is the owner-chosen Blue Forest layout, and CWAAA lives in it through words and two typographic moments: "The bar is soap." in MORVI on the photograph, and the Finding with its methodology aside and disposition line. DOCUMENT. ADVOCATE. ORGANIZE., Brayden's Modest testimony, "Form CW-1" beside the ruled action, and "above the pharmacy" are the other authored signals. Strip the copy and an unrelated nonprofit could ship this layout unchanged; keep the copy and nobody could. The About statement block is the weakest carrier: a mission sentence any coalition could paste its name into, sitting under a brand lockup that already says the name. With three placeholders, the 50% documentary-trace target is currently 0%.

**Deterministic scan.** CLI: 0 findings across `cwaaa/src`. Injected in-page detector: 21 flags, of which most are false positives in context: 1.0:1 contrast on the proposition and brand (measured against page background; the true ground is the hero placeholder at ~9.4:1, final ratio depends on the photograph), all-caps on placeholder slot labels and short small-caps UI markers, cream-palette on the ivory token, "every theater" flagged as a stock phrase in approved copy, and four hits on the detector's own overlay. Real signals: the 71-character all-caps utility-bar ticker and 64-character brand lockup are long for small caps; the footer fine print runs ~223 characters per line at 1440; spacing values cluster on one step (96% of measured gaps).

**Browser evidence.** Fonts resolve to the locked cast at both widths. No horizontal overflow at 1440 or 390. All 12 first-tab stops show a visible focus ring. Tap targets under 44px at 390: utility-bar pledge link (218×27), mobile Menu summary (69×41), all five footer legal links (about 45×15). Contrast passes AA everywhere measured on solid fields: markers 5.55:1, methodology aside 5.80:1, muted labels on navy 6.46:1, disposition 9.41:1.

## Overall Impression

The page is coherent, restrained, and unmistakably CWAAA once you read it, and the Finding is the best thing on it. The single biggest opportunity: the page has no ending. Coalition scale and the one pledge action were delegated to chrome, so the ask arrives before the case and the closer is a legal footer.

## What's Working

1. **The Finding composition.** Three-pixel ink rule drawn in, disposition in Catesque caps, methodology aside hung off a hairline and bottom-aligned. This is "competent procedure applied to a ridiculous baseline" made visible.
2. **Ruled text actions.** Stamp top rule on the primary, "Form CW-1" as a right-aligned note. A document action, not a button; the one component that could only be CWAAA's.
3. **The reveal system's engineering.** Visible without JavaScript, offset only under has-js plus motion-ok, reduced motion honored live, rules scale from the left, photos settle from 1.045.

## Priority Issues

**[P1] The page has no ending; sequence items 6 and 7 live in chrome.**
Why it matters: the locked sequence puts scale and the pledge after the persuasion. The scale line renders only in the utility bar and is hidden under 700px, so phone visitors never see it. Chapter traces appear nowhere. The visitor convinced by the cloth panel has to scroll back to the top or find a 13px bar link.
Fix: one closing ivory field after Tie One On with the full scale line as live text, one or two chapter-trace lines, and the ruled primary action. That is one pledge action after the sequence, not one after every section.
Suggested command: /impeccable layout

**[P1] Two identical pledge links stacked at the top-right of the first viewport.**
Why it matters: utility-bar "Take the Pledge · Form CW-1" sits 60px above nav "Take the Pledge". It reads as a template artifact and doubles the CTA the design says should be singular.
Fix: show the bar's pledge link only once the hero nav has scrolled out (toggle a class from the existing observer); keep it always on phones where the nav collapses.
Suggested command: /impeccable distill

**[P2] Tap targets under 44px on phones.**
Why it matters: the utility-bar pledge link is 27px tall, the Menu disclosure 41px, and every footer legal link 15px. These are the mobile pledge path and the legally required links.
Fix: pad the bar link and Menu summary to 44px minimum height; set footer legal links to block with vertical padding.
Suggested command: /impeccable audit

**[P2] The referring woman has nothing to click.**
Why it matters: DOCUMENT. ADVOCATE. ORGANIZE. promises "a ribbon, a referral, a form." Ribbon and form have links; referral has none. "Read his Recovery Story" links to the index, not his story. PRODUCT.md names her job as refer, tie one on, pass a Finding along.
Fix: add one referral-shaped path (copy lane owns the words) and point the figcaption at the story or rename it "Read Recovery Stories."
Suggested command: /impeccable clarify

**[P2] Production state and accessibility label defects in shipped markup.**
Why it matters: "Number pending register" is an internal note in the visitor's face; the mobile summary's aria-label "Open navigation" contradicts its visible text "Menu" (WCAG 2.5.3); the recovery-voice section has no heading element, so heading navigation skips it.
Fix: drop the number note from the marker until CW-D04 resolves; make the summary's accessible name "Menu"; make the voice marker an h2.
Suggested command: /impeccable harden

**[P3] Display lines can clip instead of wrap between phone and desktop.**
Why it matters: the proposition and the running line are nowrap above 700px with body overflow clipped; between roughly 700 and 960px and at 200% zoom their tails can be cut with no scrollbar.
Fix: allow wrap below about 960px, use text-wrap balance on the proposition, and let the ribbon field use min-height with the panel in flow on short viewports.
Suggested command: /impeccable adapt

## Persona Red Flags

**Jordan (first-timer):** "Tie One On" means nothing until section 5; "Form CW-1" beside the primary action does not explain itself; "Number pending register" reads as a broken site; nothing says what the pledge asks or costs.

**Casey (distracted mobile):** the bar drops the scale line, so the mobile bar is a bare pledge link; 64vh of placeholder before the proposition; the pledge action is two screens down and never recurs; the Menu disclosure has no close and does not close on outside tap; three of the four mobile pledge-path targets are under 44px.

**Riley (stress tester):** nowrap plus clipped overflow at tablet widths and 200% zoom; the ribbon field's overflow hidden can swallow the panel on short landscape phones; about 25 elements keep will-change after reveal; tabbing into an unrevealed section focuses an invisible link until the observer fires.

**Woman arriving from the Got Soap? seam:** she gets language (the Finding support line, "the doorknob of the room he won't leave") and no verb: no referral action, no share, a story link that lands on an index, and no way back to the campaign because the seam does not render until the origin is configured.

## Minor Observations

- `.statement.small` is dead CSS.
- Mirk Slab is declared and unused on the home; the monumental-figure role has no rehearsal here.
- The hero placeholder label offset is a magic number tied to nav height and collides at some widths.
- The seal at 44px renders rim text at under 3px; consider 48 to 52px beside the name.
- Footer "About" duplicates nav "About"; the meta description repeats the About statement verbatim.
- The utility-bar ticker (71 chars) and brand lockup (64 chars) are long runs of small caps.
- Spacing values cluster on one step; the rhythm reads even rather than paced.
- "Form CW-1" note animates on hover as if it were the link target.

## Questions to Consider

1. Adopting the reference's utility bar moved the scale line into chrome that hides on phones. Did the layout decision quietly delete sequence item 6 from the page half the visitors will see?
2. "No repeated pledge CTA after every section" has been executed as "no pledge CTA after any section." Is the removed closer the one CTA the rule was protecting?
3. Every memorable moment on this page is typographic or verbal. If the photography lands merely competent, should the composition be tuned so the Finding is the moment visitors screenshot?
