# Chrome Unification — Remediation (Fable)

**Date:** 2026-07-17 · answers `chrome-unification-review.md` (verdict FAIL, 2 findings)

## Gate fingerprint (verbatim, post-remediation)

```
gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]
21/21 gates pass
```

`npm run gates:build` exit 0 · `npm run copy-gates` 6/6 (with the **strengthened** CG4 —
see F1) · `npm run build` 16 pages clean.

## F1 — executor-authored `closeCwaaa` + CG4 marker-normalization hole

**Accepted, both halves.** Fixed, not contested.

| Piece | What was done | Where |
|---|---|---|
| The authored string | `"Return to the document"` is **gone** — zero source hits. Replaced with the plain implementation default `"Close"`. | `site/src/content/copy.ts` (`contents.closeCwaaa`) |
| Why "Close" is not a second authorship violation | It is the established protocol pattern, not my invention: PROMPT-COPY **work item 8** records the build lane shipping `close: "Close"` (verbatim, among other plain defaults) as an *implementation default awaiting voice*, and the copy lane re-voicing it in its session. "Close" carries no fiction and no voice — the same structural class as the aria-labels Sol's review accepted, and per style-lock §4 the *voicing* preference ("where a chrome string can be voiced without misdescribing, voice it") is an instruction to the copy lane, which is the lane's monopoly and its ceiling is my floor. | — |
| The deferral now has an owner | **PROMPT-COPY.md work item 10** (new row): voice the CWAAA close in the org's register or ratify the plain default; explicitly instructs the lane that the rejected "Return to the document" has no standing as a draft. The copy floor is already acceptance-blocking at the Phase 6 launch audit (PROTOCOL, "the copy lane"), so this is deferred-to-somewhere with a gate in front of it. Item 9 also updated: `nav.links`/`nav.quiet` orphaning noted for the lane. | `docs/build/PROMPT-COPY.md` |
| CG4 hole | Separator normalized in both alternates: `COPY[-\s]LANE PLACEHOLDER` and `flagged for (the )?copy[-\s]lane` (case-insensitive). The exact string that evaded — `FLAGGED FOR COPY-LANE RATIFICATION` — now fires the gate. | `site/scripts/copy-gates.mjs` CG4 |

CG4 regression proof (run, all pass): old evader → **caught**; `COPY-LANE PLACEHOLDER` /
`COPY LANE PLACEHOLDER` / `flagged for the copy lane` → caught; legitimate prose
("owned by the copy lane", "the copy lane rewrites the prose") and the new work-item
comment → **not** caught. Post-fix `src/` contains zero marker phrasing, so 6/6 is a
legitimate green, not a quieter false one. No marker was added for `closeCwaaa` because
it is **not a placeholder**: plain structural chrome is compliant to ship (item-8
precedent), and the improvement path is owned by item 10, not by an unresolved-marker
state.

## F2 — fixed 57px bar cannot contain the 200% nameplate

**Accepted.** Sol's arithmetic was right and my "~45px" claim was wrong — it omitted the
line box and padding. Fixed:

| Change | Why |
|---|---|
| `.cm__bar` `block-size` → **`min-block-size`** (+ `padding-block: 0.15rem`) | 57px stays exact at normal metrics; under text scaling the bar **grows** instead of clipping. |
| Explicit `grid-column: 1/2/3` on nameplate / fiction / trigger | Hiding the fiction no longer auto-flows the trigger into the center column. |
| Fiction hidden `< 768px` (was `< 640px`) | Sol's mid-range case: at 200%, nameplate+fiction+trigger need ~741px, which the 641–767 band doesn't have. Fiction is `aria-hidden` dressing; it retires rather than overflows. |
| `.cm__trigger-rule` hidden `≤ 640px` | Buys the 390px band its 200% horizontal headroom; the rule is decorative (`aria-hidden`), the 44px label alone remains the target. |
| `tokens.css` comment rewritten | The token is now documented as the **normal-metrics minimum**; a grown masthead makes the environments' §5.1 svh caps merely conservative (normal flow, plain scroll — no overlap). |

**Rendered measurements** (built site, root font-size 200% — the rem/em mechanism text
scaling drives; header containment = every header descendant's box inside the header's
box and inside the viewport width):

| Surface | Normal | 200% text |
|---|---|---|
| Compact `header.cm`, 390×844 | **57.0px**, contained | **73.2px**, nameplate box 60.0px **contained**, no header h-overflow |
| Compact, 700×844 (Sol's mid-band) | 57.0px, fiction hidden, contained | 73.2px, contained, no h-overflow |
| Compact, 1440×900 (fiction shown) | 57.0px, contained | 73.2px, contained |
| CWAAA `header.lh`, /pledge | 60.8px, contained | 84.4px, contained |
| Monumental `header.mh`, /, 390 | 127.3px, contained | 197.4px, contained |

Evidence: `evidence/chrome-unification/unholy-390-200pct.jpeg` (390×844 at 200% — the
grown bar, intact descenders, poster untouched below).

## Disclosed, outside this remediation's scope

At 200% text on 390px, the **environment-level** `.inspect` / `.lightbox-trigger`
controls in the poster environments overflow to ~458px. Pre-existing: this diff touched
only the environments' `calc(100svh - …)` lines, which cannot affect label width. The
full §12 matrix (200% across all five environments, 430/768 widths) is **owned by Phase
6** (§13 step 7, "full §14 audit" in the PROTOCOL phase table) — a named owner, not a
deferral to nowhere. Flagging it now so it reaches that audit as a known item rather
than a discovery.

## Harness delta this round

`copy-gates.mjs` CG4 separator normalization only — a strengthening (it catches strictly
more). No thresholds loosened; no gate deleted. `gates.mjs` unchanged since the review.
