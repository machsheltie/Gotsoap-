---
target: the recovery stories pages
total_score: 29
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
timestamp: 2026-09-18T09-33-44Z
slug: cwaaa-src-pages-recovery-stories-astro
---
# Critique — CWAAA Recovery Stories (/recovery-stories, /recovery-stories/[id])

Method: dual-agent (A: design review · B: detector + browser evidence). Deterministic detector unavailable: detect.mjs crashed on a missing module (detector/rules/checks.mjs) and live-server.mjs is absent from the install; no overlay was injected. Browser measurements ran at 1280, 1366, 1536, 1920 and 390 wide.

## Design Health Score (applicable max 40)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No sense of depth on a 5,800px record |
| 2 | Match System / Real World | 4 | Caseworker field names, unbroken dates |
| 3 | User Control and Freedom | 3 | Billy Bob ends on an empty Next, no return to top |
| 4 | Consistency and Standards | 2 | Two right edges in the record; index and record on different horizontal axes; Brayden lacks the arc Billy Bob has |
| 5 | Error Prevention | 3 | Closed entries are not links; last Next omitted rather than 404 |
| 6 | Recognition Rather Than Recall | 3 | "Returned" lines rely on inference (intentional) |
| 7 | Flexibility and Efficiency | 2 | Linear only; no skim structure for sighted readers on a 34-field record |
| 8 | Aesthetic and Minimalist Design | 3 | Four identical hatched voids become a texture |
| 9 | Error Recovery | 3 | Bad id → 404 |
| 10 | Help and Documentation | 3 | Index note and voided field explain themselves |
| **Total** | | **29/40** | Good, held back by laptop composition |

## Design Specificity Verdict
Authored, not interchangeable. The voice-first index, the truthful voided photo field, the referral-as-received order, the unexplained Courier fragment and the count-free pager are decisions about this institution. The weakness is composition at laptop width, not identity. Fonts resolved correctly everywhere (Modest, Catesque, Proda); no fallback is involved in the complaint.

## Overall Impression
The owner's complaint is real and measured. On the record page the white column is centred, but every readable block stops at 63% of its width and the only element that crosses the column's edge crosses it on the left. On the index the full-bleed grounds are symmetric while their contents pack left, and the void grows with the screen. Both read as a page that slid left.

## What's Working
1. The voice wins on the index in fact: quote 36px Modest against a 28px h1.
2. The voided photo field ("PHOTOGRAPH ON FILE · NOT REPRODUCED / Retained as received") is the best single object on the route and survives images-off and screen readers.
3. Billy Bob's record earns its length; the fragment and CWAAA's resumption deliver the boundary without announcing it.

## Priority Issues

### [P0] The opened record is centred as a box and left-packed as a page
Measured at 1366: `.rec` spans 179–1171 (992px). Labels start at x=148, 31px outside the white column. Reading blocks end at 848; `dd` values run to 1131. 282px of the column carries nothing readable; the reading block's centre sits 177px left of the viewport centre. Same at 1280 and 1536. The fracture is working exactly as coded (full 72px), and that is the problem: with a 39.25rem reading edge inside a 62rem shell there is no counterweight, so an authored intrusion reads as text falling off a card.
Why: on a 13–14" laptop it reads as broken before a word is read, which undercuts the credible-nonprofit premise.
Fix (`cwaaa/src/pages/recovery-stories/[id].astro`): bring the fracture inside the card and size the card to its content. `.rec { max-width: 54rem; padding-left: calc(var(--gutter) + 4.5rem) }`, `.fields > div { margin-left: -4.5rem }` (drop `--fracture-room` and the min()), `.fields { max-width: calc(var(--rec-edge) + 4.5rem) }`, restore `padding-left: var(--gutter)` at ≤860px. At 1366 this gives an 864px centred card with labels 41px inside its edge and the reading block ~40px off viewport centre. Rewrite the comment block above `.fields` to match.
Suggested command: /impeccable layout

### [P1] The record has two right edges
`.fields > div { grid-template-columns: 17rem 1fr }` lets values run to the column's content edge while every reading block stops at the 39.25rem reading edge. The CSS comment promises one edge; the first screen shows two.
Fix: `.fields { max-width: calc(var(--rec-edge) + var(--fracture)) }` or `grid-template-columns: 17rem minmax(0, calc(var(--rec-edge) - 18rem))`.
Suggested command: /impeccable layout

### [P1] The index is left-packed on a full-bleed ground and the gap grows with the screen
First row at 1366: photo 41–371, voice 425–1009, 301px empty to the right; at 1920 the gap is 652px and content centre sits 326px left of viewport centre. Index content starts at x=41 and the record's at x=148/220, so opening a record jumps the whole page right.
Fix (`cwaaa/src/pages/recovery-stories.astro`): keep full-bleed grounds and hairlines; put the contents on the record's shell. `.lead > *, .entry, .close { max-width: 54rem; margin-inline: auto }`, `.entry, .close { grid-template-columns: minmax(0, 16rem) minmax(0, var(--cw-measure-voice)) }`. Still one voice per row, no card grid. Either way, index and record must share one axis.
Suggested command: /impeccable layout

### [P2] Brayden has no three-beat arc; Billy Bob does
The only record a visitor can open from the index opens on eleven referral fields. Copy decision (Vivian's words, owner-ratified) in `copy.ts`; the template already renders it.
Suggested command: /impeccable clarify

### [P2] Four identical voids arrive before four voices
Rows 2–5 present the same hatched box first. Repeated four times it reads as broken images. Reduce closed-entry voids further (`.shot-wrap.absent { width: 62% }`) so they sit under the voice's weight; the real fix is the CW-G04 photographs.
Suggested command: /impeccable layout

### [P3] Billy Bob's chronology is 12 unbroken rows
"Participant's stated position" repeats three times by design; a hairline between visits would show it is three visits, not a typo.
Suggested command: /impeccable layout

## Persona Red Flags
- Woman arriving from the Findings referral on a 1366 laptop: labels outside the white card and a blank right third; decides the page is half-built before reading a field.
- Screen-reader user: closed entries' h2 is followed by no link and no statement that the record is not open; the void is read four times verbatim with no association to the man.
- Keyboard user: on Billy Bob there are zero tab stops for ~5,000px until the pledge link. Acceptable, but silent.
- Phone reader (390): no issues found; no horizontal overflow, fields stacked, fragment fits.

## Minor Observations
- `--fracture-room` and its 861–1108px band comment can go with the P0 change.
- `.corrob-h` sits at the reading edge while its own labels start 72px left of it.
- Billy Bob's arc values render in Catesque (`.t-ui`), the operating face, for the record's three most persuasive sentences.
- Below-the-fold content depends on the IntersectionObserver reveal; full-page captures without settling show blank rows. Reader mode and find-in-page unverified.
- Detector infrastructure in `.claude/skills/impeccable/scripts/detector/` is incomplete (empty `rules/` and `browser/injected/`); `.claude/skills/` is gitignored so it cannot be restored from git.

## Questions to Consider
1. If the white column is the card, what is the fracture breaking: the reading column or the card? The brief says the former; the CSS does the latter.
2. Should a closed record show any frame at all until a photograph exists?
3. A coalition that publishes six recoveries and lets you open one: what on the index tells the visitor the other four are complete as they stand?
4. When record 7 is written the boundary moves. Is the boundary's design the pager or the fragment?
