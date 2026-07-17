# Defect 4 build report — `/crisis` typewriter-as-accent pass

> **Correction (post-review):** §4's "PT Serif + manila + ink only" register claim below
> was false when written — ten rules in this same component still set campaign Oswald,
> and the case-meta defect reproduces at desktop widths, not only narrow cards. Both are
> remediated; see `defect-4-crisis-remediation.md`.

**Scope:** `site/src/components/cwaaa/CrisisReport.astro` only (grep confirmed all Courier
usage on the site lived in this one component). Executes the owner decision of 2026-07-16
recorded in `docs/build/reports/visual-redo-brief.md` §Defect 4.

## What changed

### Long-form narrative → PT Serif at a nudged reading size
A new `.dossier-body` class (PT Serif via `--font-cwaaa`, `line-height: 1.65`) replaced
`.dossier-typewriter` on every named long passage:

| Passage | Before | After |
|---|---|---|
| Founding myth (3 paras) | Courier | PT Serif; **first para kept as a Courier lede** (`.founding-lede`) — the one short line the owner decision permits, reading as a stamped opening |
| Ribbon body ("Tie One On For Suds") | Courier | PT Serif |
| Findings table cells | Courier | PT Serif (see note below) |
| Press-release bodies | Courier | PT Serif italic (existing `<em>`) |
| Case-file quotes (`.case-quote`) | Courier (paragraph-length) | PT Serif — caught by the "a paragraph may not" rule even though not named in the brief |
| Footer fine print (`.dossier-fine`) | Courier (paragraph-length) | PT Serif — same rule |

**Findings-table note:** the brief says multi-sentence findings must move and one-liners
*may* stay typewriter. Three of five rows are multi-sentence; mixing serif and Courier
row-by-row in one column would read as a bug, so all five findings are serif and the
typewriter accent lives in the adjacent `FINDING 26-0X` reference column on every row.

### Size lever (PT Serif has no medium weight)
`--dossier-reading: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)` on `.dossier-stage` —
**17px at 390w → 19px at 1440w/1920w** (measured, see evidence). No bolding of running
text; generous line-height kept (1.65 narrative, 1.55 quotes). No colour change (contrast
was already 8.6:1).

### Typewriter consolidated as the accent
`--font-typewriter: 'Courier New', Courier, monospace` local to the component, applied to
the short stamped bits only: founding lede, `FINDING 26-0X` refs, release dates, case-file
tabs (`FILE RC-014`). The three rules that previously used bare `font-family: monospace`
(which renders as Consolas-ish "code", not typewriter) now use the same Courier stack, so
the accent is one voice.

### Adjacent markup bug fixed (same surface, found during verification)
Case quotes rendered with **doubled quotation marks** — every `quote` string in `copy.ts`
carries its own quotes and the blockquote markup wrapped a second literal pair around them.
Removed the literal pair from the markup (`"{file.quote}"` → `{file.quote}`). No copy string
was touched; copy lane owns those.

## Definition of done — evidence

1. **Gates:** `npm run gates` after the final edit → **19/20 pass, All gates green**;
   the single WAIVE is G7c (home Unholy wash), pre-existing debt owned by the visual-redo
   brief, unrelated to this pass.
2. **Build:** `npm run build` after the final edit → 16 pages, Complete, no errors.
3. **Rendered verification (mobile first, then desktop):**
   - **390×844:** computed styles — narrative 17px PT Serif / lh 28.05px; lede, refs,
     dates, tabs all Courier. Element screenshots of founding, findings table, first
     release, first case card inspected: serif reads comfortably, accents read as stamps.
   - **1440×900:** reading size **19px** (clamp cap) confirmed on founding, findings
     cells, case quotes. Viewport screenshots of the reading column + press room
     inspected at sit-back distance.
   - **1920×1080:** reading size holds at **19px** / lh 31.35px; case-file spread
     inspected — single quote marks confirmed on quotes.
4. **Register check (§1):** PT Serif + manila + ink only; no new font family, no colour
   change, no bold running text, no FX. The deadpan-bureaucracy character is intact — the
   typewriter now reads as the stamp accent it was meant to be.

## Flags for other lanes (not fixed here)

- **Case-card meta wrap:** at narrow card widths `case-name` / `case-status`
  (`justify-content: space-between` flex) wrap interleaved ("Brayden, / 27" splits across
  lines beside the status). Pre-existing, cosmetic, out of this pass's scope — candidate
  for a future nit pass.
- No copy strings were flagged; none needed changing for this defect.
