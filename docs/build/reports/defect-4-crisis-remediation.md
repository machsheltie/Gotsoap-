# Defect 4 remediation — response to the FAIL review

Responds to `defect-4-crisis-review.md`. Both findings verified against the governing
docs before implementing; both were correct. All changes remain confined to
`site/src/components/cwaaa/CrisisReport.astro`.

## Violation 1 (FAIL) — Oswald on the CWAAA route: CONFIRMED, fixed

Verified the citations myself: `specs.md:32` prohibits campaign-smolder typography on
`/crisis`; `specs.md:14-19` requires one author per surface; `design.md:122-126` makes it
explicit — PT Serif is "everything the org writes," and "CWAAA writing in the campaign's
Oswald would break the fiction." My prior build report claimed a register pass while
checking only the rules I had touched. That claim was false; this report corrects it.

All ten `var(--font-display)` rules are gone:

| Element | Now |
|---|---|
| Org name, memorandum title, section h2s, scale statement, ribbon heading, table headers, release headlines, closing line | **PT Serif 700** (uppercase where it was uppercase), with serif metrics — the condensed-face `-0.02em` tracking and sub-1.0 line-heights replaced by 0–0.04em and 1.02–1.25 |
| `FOR IMMEDIATE RELEASE` stamp | **Courier 700** — stamp text is typewriter territory per the owner decision ("seal/stamp text") |
| Case status line | **Courier** — stamped file disposition |
| Case name | **PT Serif 700** |

The only Oswald remaining on the rendered page is the site nav bar, which is campaign
chrome on every route (`design.md` §7 Nav, "all pages") — a designed seam, not the
document's voice.

**Serif-width fallout handled:** PT Serif runs wider than Oswald, so the memorandum
title's mobile floor dropped 2.5rem → 2rem ("MEMORANDUM" was 311px in a 271px column at
390w) and the case grid's `minmax(300px, 1fr)` became `minmax(min(300px, 100%), 1fr)`
(the 300px floor already overflowed the 271px column — pre-existing, exposed by the
overflow sweep). Heading scale steps were moderated (title max 5.5rem, h2 step-4 →
step-3, scale statement max 3rem): serif at slightly reduced scale keeps the dossier's
document authority without the condensed-poster shout.

## Violation 2 (CONCERN) — case-meta interleaving: CONFIRMED, fixed

Sol was right that this reproduces at 390 **and** 1920 — my "narrow-only, cosmetic" call
was wrong. Root cause: a `justify-content: space-between` flex row lets both labels wrap
and interleave whenever their combined width exceeds the card. Replaced with a stacked
column (name above status); the two labels can no longer interleave at any width.

## Found during remediation — undefined tokens

`.dossier-stage` and `.release-stamp` referenced `--cwaaa-paper` and `--cwaaa-red`,
which are defined nowhere; the real tokens are `--cwaaa-manila` and `--cwaaa-stamp`.
The stamp had been silently rendering in inherited ink navy instead of rubber-stamp red.
Corrected to the real tokens — this *restores* the identity kit's specified stamp red
(`#a63d2f` on manila ≈ 4.9:1, AA at the stamp's size/weight), it is not a new colour.

## Evidence (all fresh, post-final-edit)

- `npm run gates` → **All gates green** (19/20 pass, G7c pre-existing waiver).
- `npm run build` → 16 pages, Complete.
- **Font census** (computed styles over every text node in `.dossier-stage`):
  exactly `["PT Serif", "Courier New"]` at 390×844 **and** 1920×1080.
- **Overflow sweep** (`scrollWidth > clientWidth` over the dossier subtree, SVG/sr-only
  excluded): zero elements at 390 and 1920.
- **Meta stacking** (bounding rects, name.bottom ≤ status.top): true at 390 (Brayden
  card) and 1920 (Gary card — the reviewer's cited failure).
- **Reading size**: 17px at 390, 19px at 1440/1920 — unchanged from the accepted pass.
- Screenshots inspected at 390/1440/1920: letterhead, founding column, findings table,
  press room (red Courier stamps, serif headlines), case files.
