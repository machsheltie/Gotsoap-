# Defect 4 — Adversarial Review

**VERDICT: FAIL**

`gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 19/20 pass · G7c waived · exit 0. `npm run build` produced 16 pages · exit 0. The requested long-form serif conversion is real, but the route still speaks primarily in the campaign's display face, so the owner-directed stay-in-register requirement is not satisfied.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | **FAIL** | §1; §2 `/crisis` route contract | `site/src/components/cwaaa/CrisisReport.astro:203,214,263,284,302,318,352,370,407,421` | `/crisis` still assigns `var(--font-display)`—Oswald, the campaign display face defined at `site/src/styles/tokens.css:124`—to the organization name, memorandum title, section headings, scale statement, ribbon heading, table headings, press stamps/headlines, case metadata, and closing line. At 1920×1080 these monumental condensed headings dominate the rendered page. This is not a short typewriter accent; it is the campaign author controlling the CWAAA surface. `specs.md:14-19` requires one author per surface, and `specs.md:32` expressly prohibits campaign-smolder typography on `/crisis`. The build report's “PT Serif + manila + ink only” register claim is false of the rendered route. |
| 2 | CONCERN | §1 credible CWAAA document | `site/src/components/cwaaa/CrisisReport.astro:404-412` | The disclosed name/status defect is not confined to “narrow card widths” and is not merely ornamental. The unwrapped `justify-content: space-between` row makes the two labels wrap independently and interleave: at 390×844 “Marcus,” and “34” land on separate lines around the status; at 1920×1080 “Gary,” and “46” do the same while the status occupies both lines. That degrades the case-file record's reading order and the competent-document fiction. It needs an owned remediation rather than an unspecified future nit pass. |

## Rulings on the submitted judgment calls

- Moving all five finding bodies to PT Serif is accepted. Mixing row-by-row would create a false semantic distinction, while the adjacent `FINDING 26-0X` column preserves a consistent Courier accent.
- Moving the paragraph-length case quotations and footer disclaimer to PT Serif is required by the owner's “a paragraph may not” rule, even though the brief named only representative passages.
- Keeping the first founding sentence in Courier is accepted as the single short lede expressly permitted by the owner decision.
- Removing the markup-added quotation marks is correct. The rendered blockquote begins and ends with the one pair already present in `copy.ts`; no doubled pair remains.

## Rendered verification

- **390×844:** long narrative, ribbon copy, finding bodies, release bodies, and case quotations compute to PT Serif 400 at 17px. Narrative line-height is 28.05px (1.65); case quotations use 26.35px (1.55). Courier is confined to the founding lede, finding references, dates, and file tabs. No horizontal overflow was present.
- **1440×900:** the same running passages compute to PT Serif 400 at 19px with 31.35px narrative leading. The desktop reading column is materially more comfortable than the prior Courier wall.
- **1920×1080:** the 19px cap holds and quotation marks render once. The viewport also makes violation #1 unmistakable: giant Oswald typography, not PT Serif or Courier accents, remains the page's dominant voice.

## Harness and waiver check

`site/scripts/gates.mjs` and `site/scripts/distinguishability.mjs` are clean against `HEAD`; `MAX_SOURCE_SIMILARITY = 0.7` and `MIN_RENDER_DIFF = 10` are unchanged. G7c remains legitimate pre-existing home-wash debt: this defect changed only the `/crisis` component and introduced no poster or home asset path.

## What Fable's build report did not tell me

The report proves that long Courier passages became serif, then overstates that local success as a §1 register pass. It does not disclose that ten rules in the same touched component still apply the campaign's Oswald face across the CWAAA route, including every major heading and multiple document labels. It also understates the case metadata failure: the interleaving survives the largest required viewport, not only narrow cards.

## Close-out verdict — PASS

| Finding | Fable's answer | My ruling |
|---|---|---|
| #1 Oswald controls the CWAAA document | Removed all ten `var(--font-display)` rules from `CrisisReport.astro`; document headings and names now use PT Serif, while the expressly permitted stamp/date/reference/file accents use Courier. | **RESOLVED** — computed-style census over every direct text-bearing element in `.dossier-stage` returns only PT Serif and Courier at 390×844 and 1920×1080. The rendered 1920 composition is now document-serif rather than campaign-condensed. Oswald remains only in site chrome outside the dossier. |
| #2 case name/status interleave | Replaced the space-between row with a stacked column; name uses PT Serif and status uses Courier. | **RESOLVED** — at 390 the Brayden name bottom is above the status top; at 1920 the same is true for the cited Gary card. The labels are visibly sequential and cannot occupy competing halves of one line. |

The three remediation-adjacent repairs also hold: the release stamp computes to Courier 700 in `--cwaaa-stamp` (`#a63d2f`) on `--cwaaa-manila`; the 390px memorandum title has equal `scrollWidth` and `clientWidth` rather than overflowing; and an overflow sweep of the dossier subtree returns zero offending elements at both 390 and 1920, including the corrected case grid.

Gates: `gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]` · 19/20 pass · G7c waived · exit 0.

Build: 16 pages · exit 0.

Harness diff: clean against `HEAD`; `MAX_SOURCE_SIMILARITY = 0.7` and `MIN_RENDER_DIFF = 10` unchanged.

Deferred-to-nowhere: none. G7c remains pre-existing home-wash debt owned by `docs/build/reports/visual-redo-brief.md`; this remediation is confined to `site/src/components/cwaaa/CrisisReport.astro` and does not touch that surface.
