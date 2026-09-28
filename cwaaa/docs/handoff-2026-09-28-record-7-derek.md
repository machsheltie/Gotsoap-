# Handoff — 2026-09-28: record 7 (Derek) shipped, blind-read against Billy Bob

**For:** the next Claude Code agent working in `cwaaa/`. **From:** the session that appended record
7 to the Recovery Stories archive. **Tip at handoff:** `c20c162` on `main`, in sync with
`origin/main` (pushed this session).

Read `cwaaa/CLAUDE.md` and `AGENTS.md` first. Then this file. Then only what your task needs.

## 1. State right now

- **Record 7 (Derek, `RC-073`, slug `derek`) is written, wired and shipped** in
  `src/content/copy.ts`, right after Billy Bob (`RC-064`). `open: true`, `public: false`: absent from
  the index, reachable only via Billy Bob's Next. Billy Bob's Next now resolves to Derek with no
  template change — the record is data-only against `src/pages/recovery-stories/[id].astro`.
- **Derek has a real participant photograph**, `src/assets/derek.png` (owner-supplied, 4:3), wired
  into the `photos` map in `[id].astro`. No placeholder renders for him any more.
- **`nextPending` moved down to Derek.** Record 8 (Carlos Eduardo, per canon) is the new unfinished
  edge — same rule as before: never a stub, never a Next pointing at a 404.
- **Two production values in Derek's record are drafts, not owner-confirmed**, because `derek.md`
  left them TBD:
  - `requested` (External review requested): **May 19, 2026**
  - `fragment` reference: **26-1407**

  Both are marked as drafts in code comments. Get an owner call before treating either as settled
  canon the way Billy Bob's `March 11, 2026` / `26-1183` are settled.
- **Provenance:** `derek.md` (owner architecture, 2026-09-25) is the source text, transferred
  verbatim into `copy.ts`. `docs/copy/proposals-2026-09-25-derek-record-7-r1.md` is an earlier r1
  proposal draft (ages/IDs marked `(P)` there) — superseded by `derek.md` and the shipped record;
  keep it as provenance only, don't revive its proposed values.
- **Canon docs updated to reflect record 7 shipped:** `docs/canon-billy-bob-and-the-archive-boundary.md`
  (new "Update, 2026-09-28" note under the 2026-09-15 entry) and `PRD-TO-LAUNCH.md` CW-L06. Both now
  point the unfinished-edge language at record 8, not record 7.
- **Verified this session:** `cwaaa` build + `astro check` clean, no dead internal links (pager
  Prev/Next confirmed at both `/recovery-stories/billy-bob/` and `/recovery-stories/derek/`); from
  `site/`, `npm run build`, `gates`, `copy-gates`, `fidelity`, `distinguish`, `authority` all green.
  `npm run launch-check` from `cwaaa/` still reports "not launch-ready" — same four pre-existing
  pending facts as before (DMCA agent name/email/mailing address, field-assessment referral form),
  nothing new from Derek.
- Renders: `.impeccable/renders/2026-09-28/` (derek desktop/phone, derek's photo slot, brayden for
  comparison).

**Not yours, do not commit:** untracked `cwaaa/.impeccable/renders/2026-09-24/`,
`site/src/assets/graphics/design.md` and `skills-lock.json` are from other sessions/work, not this
one. Stage files by name; never `git add -A`.

## 2. Blind reader pass — done this session, read before touching Derek's copy again

Full evidence: `docs/copy/reader-evidence-2026-09-28-derek-record-7.md`. The owner specifically asked
whether Derek reads as formulaic next to Billy Bob; three readers (Maya, Dylan, Priya) read Billy
Bob's record immediately followed by Derek's, cold, no brief.

**Verdict (converged, all three): the skeleton repeats, the content does not.** Two beats are close
enough to read as a mail-merge:

1. **The caseworker's closing line** — Billy Bob's *"I have nothing left to offer him that he has not
   already heard and declined"* and Derek's *"I have no additional voluntary intervention to offer"*
   are the same clause order, same rhythm, same position, same rhetorical move.
2. **The chronology's repeated-refusal device** — Billy Bob recites *"Never saw much point in washing
   just to get dirty again"* three times; Derek recites *"I'm still getting dates"* the same way.
   Read once it's a device; read twice in a row it reads, per Priya, "like a macro."

The Office finding block's shared phrasing (`PARTICIPANT COMPREHENSION: NOT AT ISSUE` verbatim in
both) got a partial pass — readers read it as an intentional government-form repetition, not laziness
— **but two readers explicitly warned that a third unchanged repetition in record 8 will break that
read and make the template itself the joke.**

Everything else earns its own place: the four-witness cross-referral corroboration (a genuinely
different mechanism from Billy Bob's single spouse-witness), the specific imagery (soap-on-a-rope,
unused folded towels), and above all the unresolved cold ending (blocked calls, unclaimed mail, blank
disposition, no Next) versus Billy Bob's warm reconciliation — all three readers independently named
the ending as the strongest and most successful divergence.

**No copy was changed in response to this evidence.** That's a decision for the owner, not something
this session did unilaterally to already-shipped, committed satire copy. Two concrete options for
whoever picks this up next:

- **Option A — leave Derek as shipped.** The evidence reads the repetition as bounded (two records,
  not three) and largely intentional-feeling; the divergent ending and imagery carry the record.
- **Option B — a light targeted revision** to just the two flagged lines (caseworker's sign-off,
  chronology refrain) so they no longer share sentence shape with Billy Bob's, while leaving
  everything else (referral, statements, testimony, chronology content, Office fragment, the
  unresolved ending) untouched. This is a small, surgical copy edit, not a re-architecture.

**Whichever option, get the owner's call before touching shipped Derek copy** — this is exactly the
kind of "she said it once, don't re-litigate it" territory the project's working conventions cover,
and it hasn't been said yet either way.

## 3. What record 8 (Carlos Eduardo) must NOT repeat unchanged

Two readers named this as a bright line, not a taste note: whoever writes record 8 should treat the
caseworker's closing-line shape and the chronology's repeated-refusal device as **spent** after
Derek. Reuse the underlying idea (institution running out of patience; a participant's fixed line
recited back at him across the chronology) but not the same sentence shape, same clause order, or the
same position in the document. The Office finding block's shared field template can probably survive
a third appearance since it's diegetically a form — but not `PARTICIPANT COMPREHENSION: NOT AT ISSUE`
verbatim a third time; vary the wording even if the field stays.

## 4. Open, not this session's to resolve

- Owner sign-off on the two draft production values (`May 19, 2026` / `26-1407`).
- Owner sign-off on Option A vs. B above.
- Record 8 (Carlos Eduardo) and record 9 remain unwritten; canon has a shape (subtraction against
  fixed Office authority) but no ratified content — see
  `docs/canon-billy-bob-and-the-archive-boundary.md`, "Staged, not decided."
- The four pre-existing launch-check pending facts (DMCA agent identity, field-assessment referral
  form) are untouched by this session and still block `launch-check` going green.
