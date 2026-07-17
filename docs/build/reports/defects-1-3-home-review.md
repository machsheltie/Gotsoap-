# Defects 1–3 — Home Adversarial Review

**VERDICT: PASS**

`gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]` · 21/21 pass · exit 0. The submitted pass resolves the defect classes rather than only the cited strings, and Defect 3 does not reproduce in the current worktree.

## Violations

None.

## Finding rulings

| Defect | Ruling | Evidence |
|---|---|---|
| 1 — clipped display type | **RESOLVED** | The common repair is present wherever this pass uses clip-painted display type: line-height is at least 1.06 and the paint box receives block padding, with compensating negative margin (`Masthead.astro:138-140`, `Hero.astro:207-209`, `Case.astro:272-274`, `Campaign.astro:180-182`, `Confrontation.astro:162-164`, `VerdictCard.astro:181-183`). Non-clip quiz display rules now have a 1.05 floor (`Question.astro:119`, `Quiz.astro:152,281`, `VerdictCard.astro:158`). Rendered checks at 390×844, 1440×900, and 1920×1080 show intact `g`/`p` descenders and `%` figures in the masthead, hero, Evidence Wall, Campaign caption, Confrontation title, quiz question, and the two-line “Certified Soap-Smoldering” verdict. This is systemic clearance, not per-glyph positioning. |
| 2 — canonical-poster wash and weak gold | **RESOLVED** | `Campaign.astro:94-109` paints `.camp__ground` exclusively with CSS gradients; its rendered `background-image` contains four gradients and no `url()`. The component has no wash `getImage()`, glob, or second poster path, and `.fx-poster-wash` is retired at `tokens.css:322-325`. The only canonical asset in the beat is the required untouched Unholy `<PosterImage>`. The darkest gold stop is `#916a22` (`tokens.css:264-270`): independently calculated contrast is 3.35:1 against `--smoke-slate` (`#201f22`) and 3.94:1 against `--grout-black` (`#0e0e10`), clearing the 3:1 AA threshold for the rendered large bold caption. The 1440 and 1920 renders show the caption on the uniform dark copy lane rather than on a duplicated or blurred poster. |
| 3 — rule through “THE FLAGSHIP · UNHOLY” | **NOT REPRODUCED; NO CHANGE REQUIRED** | The kicker and rule are separate siblings at `Campaign.astro:61-69`. Bounding-rectangle probes at 390, 1440, and 1920 report no intersection; at 1920 the kicker ends at y=439.44 while the rule starts at y=717.29. The required-width renders are also visually clean. The earlier observation does not describe this worktree and should not be treated as an open defect. |

## Rendered verification

- **390×844:** the masthead and hero wordmarks retain their descenders; the Evidence Wall's 73%, 0%, and 9/10 figures paint vertically in full; the Campaign kicker is clear of its rule; the Confrontation question is not sliced. The live first quiz question and both verdict registers were checked directly; “Soap-Smoldering” retains both the `p` and terminal `g`.
- **1440×900:** the home wordmarks, Evidence Wall figures, Campaign caption, and Confrontation heading remain fully painted. The two-line verdict title has 80.22px line-height plus 6.05px block clearance and no overflow clipping.
- **1920×1080:** the same checks hold at the largest required width. The Confrontation title computes to 144.16px line-height with 13.6px block padding; the verdict title retains the same 80.22px/6.05px clearance. The Campaign kicker/rule probe remains negative.

## Harness check

`npm run gates:build` rebuilt 16 pages and exited 0 before reporting all 21 gates green; G7c is a real PASS, not a waiver. The only harness diff removes the temporary G7c waiver (`site/scripts/gates.mjs:62-65`); it does not loosen G7c or any threshold. `site/scripts/distinguishability.mjs` is unchanged. G14 remains intact for the owner-art production swap.

## What Fable's build report did not tell me

No material omission changed the verdict. The report's “all three widths” claim also survives direct checks on the adjacent quiz/verdict surfaces named by the defect brief, not only the home screenshots. Its Defect 3 conclusion is correct, but the stronger record is the three-width element-intersection result above rather than the inference that the original sighting came from an older deployment.
