# Fable one-off — two small fixes (standalone; chrome unification already in flight)

Paste with the **Standing Brief** (`docs/build/PROMPT-FABLE.md`). Small, independent, no design
decisions. Both came out of the interior-copy audit (2026-07-17).

## 1. Two hardcoded strings in `VerdictCard.astro` → `copy.ts`
`src/components/quiz/VerdictCard.astro` is otherwise correctly props-driven (the verdict page feeds
it from `copy.ts`), but two in-fiction chrome labels are hardcoded and bypass the content module:
- `:46` — `"Sniff Test · Verdict"`
- `:52` — `"Field Assessment CW-7 · Filed"`

Same defect class as the masthead's "A Public Hygiene Initiative" leftover — hardcoded markup is how
a copy-lane-killed line survives a closed session. Both are on-voice, so this is **routing, not
rewriting**: move them into `copy.ts` (a `verdictCard` group or the existing `labels`) and read them
through, exactly as the home sweep did. Don't re-voice them; the copy lane owns the words.

## 2. Extend the killed-lines grep to ALL of `src`, not just the home
The hardcoded-copy sweep was **home-scoped**. Interior surfaces (`/crisis`, `/pledge`,
`/sniff-test`, verdicts, `/about`) were never checked against the kill list.

Grep **all** of `src` for every string on `style-lock.md §7`'s kill list — "A public hygiene
initiative", "Are you the fog?", "The receipts", "Hang him…", "a satirical spec campaign" *(on
campaign surfaces — it legitimately lives at `/about`)*, "See who's behind it", "Got Soap? is a
satirical campaign by Hope2 Studio". Strip comments before matching (a killed line quoted in a code
comment is not a rendered string — and don't let a comment mention trip a false red).

Report every hit with `file:line` and whether it's rendered or a comment. Rendered hits on campaign
surfaces are violations.

**Recommended, if the harness is free:** promote this to a **killed-lines gate** in `gates.mjs` (or
`copy-gates.mjs`) — it's a clean grep and it's the fourth time a killed/overshot line has been caught
by eye rather than by machine. Use the existing `stripComments()` helper. **Do not hot-edit the
harness while another session is in it** — coordinate first; the last collision broke the gate script.

## Definition of done
- No hardcoded user-facing strings remain in `VerdictCard.astro`; both route through `copy.ts`.
- Kill-list grep over all of `src` is clean of *rendered* hits on campaign surfaces (report any
  comment-only hits rather than silently rewording them).
- `npm run gates` + `npm run copy-gates` green; `npm run build` clean.
