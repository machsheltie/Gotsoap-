# Handoff — 2026-09-28: record 7 (Derek) shipped, then resynced to the owner's rewrite

**For:** the next Claude Code agent working in `cwaaa/`. **From:** the session that appended record
7 to the Recovery Stories archive, then resynced it same-day after the owner rewrote `derek.md`.
**Tip at handoff:** check `git log --oneline -3` before assuming this is current — a resync commit
follows the original append commit today.

Read `cwaaa/CLAUDE.md` and `AGENTS.md` first. Then this file. Then only what your task needs.

## 1. The one rule for this record

**`derek.md` is the sole canon on Derek (owner directive, 2026-09-28).** Not this file, not the
canon doc's prose summary of Derek, not `docs/copy/proposals-2026-09-25-derek-record-7-r1.md`
(an earlier, superseded proposal with proposed values marked `(P)`), not any AI-generated paraphrase
anywhere else. If `derek.md` and anything else disagree about Derek's content, `derek.md` wins,
full stop — re-sync `src/content/copy.ts` to it, don't reconcile or average.

**Why this note exists:** this session shipped record 7 from one revision of `derek.md`, then the
owner substantially rewrote that file the same day and said so explicitly. The session resynced
`copy.ts` to the new text. If you're reading this and `derek.md` has changed again since, check it
against the shipped record before doing anything else with Derek.

## 2. State right now

- **Record 7 (Derek, `RC-073`, slug `derek`) is written, wired and shipped** in
  `src/content/copy.ts`, right after Billy Bob (`RC-064`). `open: true`, `public: false`: absent from
  the index, reachable only via Billy Bob's Next. The record is data-only against
  `src/pages/recovery-stories/[id].astro` — **with one exception this session made**, below.
- **Derek has a real participant photograph**, `src/assets/derek.png` (owner-supplied, 4:3), wired
  into the `photos` map in `[id].astro`.
- **The Office fragment now supports more than one redacted value.** `derek.md`'s rewrite withholds
  both `PARTICIPANT PRESENT` and `DISPOSITION` (Billy Bob's finding withholds only the latter). The
  fragment's data shape changed from a single `dispositionLabel` string to a `redactions: {label:
  string}[]` array, and `[id].astro` now loops over it, rendering one solid bar per entry. Billy
  Bob's data was migrated to `redactions: [{ label: 'DISPOSITION:' }]` with no content change —
  verify this if you touch his record.
- **Both production values are now owner-ratified.** `derek.md` was TBD on both, then this session
  removed two fabricated values that had no owner provenance, then the owner filled in `derek.md`
  itself with `External review requested — May 19, 2026` and `REFERENCE: 26-1407` — coincidentally
  the same two values, now legitimate because she chose them, not because an earlier draft guessed
  them. Both are shipped in `copy.ts`, matching Billy Bob's `March 11, 2026` / `26-1183` precedent.
- **`nextPending` sits on Derek.** Record 8 (Carlos Eduardo, per canon) is the unwritten edge — same
  rule as always: never a stub, never a Next pointing at a 404.
- **Canon docs updated:** `docs/canon-billy-bob-and-the-archive-boundary.md`'s "Update, 2026-09-28"
  note now states the sole-canon rule and lists what changed in the rewrite; `PRD-TO-LAUNCH.md`
  CW-L06 points the unfinished-edge language at record 8.
- **Verified:** `cwaaa` build + `astro check` clean after the resync; pager Prev/Next confirmed at
  both `/recovery-stories/billy-bob/` and `/recovery-stories/derek/`; both redaction bars render on
  Derek's fragment, Billy Bob's single bar unchanged. Re-run `site/`'s five gates
  (`build`, `gates`, `copy-gates`, `fidelity`, `distinguish`, `authority`) before calling this done if
  you make further Derek edits — they were green against the pre-resync copy, not re-run after.
  `npm run launch-check` from `cwaaa/` still reports the same four pre-existing pending facts (DMCA
  agent identity, field-assessment referral form) — nothing new from Derek.
- Renders: `.impeccable/renders/2026-09-28/` — includes a pre-resync set (`derek-1440.png`,
  `derek-390.png`, the photo-slot crops) and `derek-fragment-resynced.png` /
  `derek-full-resynced.png` from after the two-redaction fix. The pre-resync ones still show the
  photo placeholder and the old single-bar fragment; don't treat them as current.

**Not yours, do not commit:** untracked `cwaaa/.impeccable/renders/2026-09-24/`,
`site/src/assets/graphics/design.md` and `skills-lock.json` are from other sessions/work. Stage
files by name; never `git add -A`.

## 3. Blind reader evidence — read the superseded-text notice first

`docs/copy/reader-evidence-2026-09-28-derek-record-7.md` holds a full blind-read (Maya, Dylan,
Priya) of Billy Bob's record immediately followed by Derek's, checking specifically whether Derek
reads as a formulaic reskin. **That read was taken against the prior revision of `derek.md`, before
the owner's rewrite.** The document now carries a notice to that effect at the top. Its two flagged
lines — the caseworker's closing sentence and part of the chronology — were among the exact material
the owner's rewrite changed; the new field note in particular no longer ends on anything resembling
"I have no additional voluntary intervention to offer." Whether the formulaic-resemblance concern
still holds against the current text has **not** been re-tested. If the owner still wants that
question answered, re-run the same blind-read pattern (Billy Bob → Derek, back to back, no brief)
against the current `copy.ts` rather than trusting the old evidence.

## 4. What record 8 (Carlos Eduardo) should still watch for

Even though the specific lines changed, the underlying advice from that earlier read is still
reasonable design guidance: don't give record 8 a caseworker sign-off or a chronology repeated-line
device with the same sentence shape as either Billy Bob's or Derek's. Reuse the idea (an institution
running out of patience; a fixed line recited back at him across the chronology), not the wording or
position. But confirm this against a fresh reader pass if it matters to the owner — don't cite the
superseded evidence as settled proof.

## 5. Open, not this session's to resolve

- Whether the formulaic-resemblance concern still holds against the rewritten text — needs a fresh
  blind read if the owner wants it answered.
- Record 8 (Carlos Eduardo) and record 9 remain unwritten; canon has a shape (subtraction against
  fixed Office authority) but no ratified content — see
  `docs/canon-billy-bob-and-the-archive-boundary.md`, "Staged, not decided."
- The four pre-existing launch-check pending facts (DMCA agent identity, field-assessment referral
  form) are untouched by this session and still block `launch-check` going green.
