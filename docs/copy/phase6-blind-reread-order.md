# Phase 6 — the blind re-read (the real close-out)

**Run by:** Opus/orchestrator, dispatching `gotsoap-readers`. **Not Fable. Not Sol.**
**Measures:** did the copy actually *move*, against the **2026-07-17 baseline**
(`reader-sim-evidence.md`)?

Two models agreeing a line is funnier is a **hypothesis**. It stays a hypothesis until a reader who
was never told what changed laughs at it. That is what this phase is for.

---

## The firewall — the whole phase is worthless without it

Readers get **a persona and the rendered site text. Nothing else. Ever.**

**They must not see:** `copy-correction-plan.md`, the dialectic rounds, `CAMPAIGN-INTENT.md`, the
voice bible, the style lock, the findings, the baseline evidence, or **any statement of what changed
or what to look for.** Tell them explicitly not to go looking in `docs/`.

A reader told what to notice reports noticing it. That produces a mirror, not a window, and the
delta becomes unmeasurable. The temptation to "help" them find the fixed lines is exactly how this
phase dies. **Cold read or nothing.**

Vivian never sits on this panel. A writer who has read the readers is fine; a reader who has read the
brief is contaminated.

## Method

1. **Rebuild, then extract** what a visitor actually reads:
   ```bash
   node .claude/skills/gotsoap-readers/scripts/extract-site-text.mjs
   ```
   Never hand a reader `copy.ts` — reading a TypeScript module is not reading a website.
2. **Dispatch three `reader-sim` agents in parallel**, one per persona (Maya / Dylan / Priya),
   read-only. Give each: the persona brief, the extraction path, `index.txt` as a start, and the
   instruction to **follow its own curiosity and note where it would stop.**
3. **Demand specificity.** Quote actual lines. "The tone is off" is unusable; "I lied on question 6"
   is evidence. Tell them flattery is worthless and that reporting boredom or defensiveness is the
   most useful thing they can do.
4. Ask for **felt experience first** (transportation, aesthetic, social simulation, flow), then the
   persona's own questions. Social simulation is the one that matters most — does the reader picture
   the group chat?

## The measurement — did these specific things move?

Judge against the baseline's named failures, not "do they like it":

| Baseline finding (2026-07-17) | What should have changed |
|---|---|
| All three hit the wall at **nine case files** | Roster is now **five**, varied in form and length |
| **Apology / flinch** — "the men are, in most cases, lovely" | Reassurance lede deleted; warmth-tax lines cut |
| **Punch-down flag** on the roster's class/age pattern | Derek, Big Ron, Tyler cut; jokes on chosen behavior |
| **Dylan lied on Q6** — it declared his romantic history | Q6's worst answer is now a reflex he can pick honestly |
| **Verdict shares were receipts** | Four distinct payloads written to travel |
| **Thirst-Hazard verdict apologized** | Rebuilt on consequence + a clock, exit still open |
| **Best line** — "citrus arrangement on a condemned building" | Must still be there, still landing |

## Known non-movers — do NOT read these as regressions

- **Vector 2 (woman → man) is still broken.** F1 was deliberately deferred to
  `vector2-citation-path-spec.md`. If Maya says again that she has no way to send it to a man, that
  **confirms** the deferred spec is real work — it is not an implementation failure.
- **Vector 3 (man → man denial-forwarding)** should still work. If it broke, that's a real
  regression — it was explicitly protected.
- **The `/about` anger** divides the panel by design (Maya/Priya want it, Dylan bails). That's a
  surface-serves-audience fork, not a defect. Don't average it.

## What to do with the results

They are **evidence, not orders.** You may argue with a reading, with reasons. You may not wave one
away, and you may not assert a reaction the evidence contradicts.

- **Convergence** (independent readers hitting the same wall) → treat as near-fact.
- **Divergence** → a real strategic fork. Surface it; don't split the difference.
- **Regression** (something the baseline liked that now lands worse) → highest priority; the
  correction pass broke something it was supposed to protect.

Write the delta to `docs/copy/reader-sim-delta.md`: per baseline finding, **moved / didn't move /
regressed**, with quoted lines. Then it goes to Stacey.

## Close-out

Phase 6 passing means: the named baseline failures moved, nothing protected regressed, and the
campaign's best lines still land — **measured on strangers who were never told what changed.**
