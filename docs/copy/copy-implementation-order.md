# Order — copy-lane implementation of the Phase 5 correction plan

**Source of truth:** `docs/copy/copy-correction-plan.md` (Phase 4 redo closed, Phase 5 validated,
zero deadlocks). **Scope:** transcribe the agreed final strings into the deck. Nothing else.

---

## 1. What lands

- All **54 correction rows**, grouped by surface (chrome · home · /psas + posters · quiz + verdicts ·
  /pledge · /crisis · /about) → `site/src/content/copy.ts`, the deck, and `style-lock.md` addenda.
- The **two implementation contracts**: the lightbox a11y rule and the newsletter token semantics.
  These are build-lane and are the easiest thing to drop in a pass that feels like copy work — don't.

## 2. What does NOT land

- The **four missing-content items** — scoped as new work, not this pass.
- **F1** (vector-2 citation path) — still out → `vector2-citation-path-spec.md`.
- **The posters.** Baked copy is the artwork, untouched, as always.

## 3. The transcription rule (the one that matters)

**This pass copies agreed text. It does not author.** The plan says it compiles and does not
re-litigate — that discipline has to survive contact with the deck.

If a line changes during implementation — sharpened, tightened, "obviously better" — **that is an
unreviewed edit, not implementation.** It has no Sol sign-off and no rationale. Flag it explicitly
and route it back through Sol; do not quietly ship it. A writer improving its own agreed copy while
typing it in is precisely the failure the two-model loop exists to stop.

## 4. The fidelity checker — must be EXTRACTION-based

Build a checker that verifies every agreed row actually landed.

**Required:** it **parses `copy-correction-plan.md`** and turns each row into an assertion against
`copy.ts` and rendered `dist` output.

**Forbidden:** a hand-copied list of strings to check. If the implementer writes the list, the
implementer can omit the rows it didn't implement, and the checker reports green on 48 of 54. The
plan must be the source of truth so an omission cannot hide.

Same principle that finally made CG7 work: **assert on the artifact, never on the author's account of
the artifact.** A checker written by the implementer to grade the implementer is the yes-man problem
in miniature; extraction is what defuses it.

Report coverage explicitly: rows parsed, rows asserted, rows landed. A parse that finds zero rows is
a **failure**, never a clean pass (see G13's vacuous `0.0 KB` and CG7's unloadable-deck rule).

## 5. Sol reviews the CHECKER, not just the result

Hand Sol the checker itself with this instruction: **try to make it report green on a deliberately
incomplete implementation.** Delete a row's text from `copy.ts` and see if it still passes. Mangle a
string subtly. If the checker can be made to lie, it isn't a checker.

Then Sol reviews the implementation diff for transcription fidelity — not craft. The craft argument
is closed; this round is "does the shipped text match the agreed text."

## 6. Rules still in force

- **Harness exclusivity** — one session holds `copy-gates.mjs`. Don't hot-edit it from two places.
- **HALT if Sol goes dark** — never rule for Sol, never self-close, never advance a phase alone.
- **Green gates ≠ good copy** — the gates prove invariants held, nothing more.

## 7. Close-out

- `npm run gates` → **20/20**
- `npm run copy-gates` → **7/7** (CG7 live — it polices the killed lines through this exact change)
- fidelity checker → **54/54 rows landed**
- `npm run build` → clean, **16 pages**
- Commit the change (plus the untracked graphics: `cwaaalogo.png`, `cwaaaapproval.png`, `mockup.png`
  — they're not gitignored, and without a commit they don't exist on Netlify).

**Then STOP.** Phase 6 is the blind re-read and it is **not** Fable's to run — it is dispatched from
the orchestrator side to keep the reader firewall intact. Do not brief the readers, do not summarize
what changed, do not prepare them in any way.
