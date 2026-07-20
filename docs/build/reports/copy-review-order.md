# Site-wide adversarial copy review — order & protocol

**Scope:** every user-facing string on the site, judged against `docs/copy/CAMPAIGN-INTENT.md`.
**Verdict:** what works, what doesn't, **what's missing**, what can be improved → a correction plan,
argued to consensus between Sol and Fable.

This is not the earlier copy session (that fixed 18 flagged strings). This is the **whole site**,
against the campaign's actual purpose, at the Onion bar.

---

## Read first — all parties, in this order
1. **`docs/copy/CAMPAIGN-INTENT.md`** — the thesis, the two audiences, the aspiration mechanic, the
   bar, and the 10 judgment criteria. **This is the standard.**
2. **`promo.txt`** + **`gotsoapdescription.txt`** — the origin texts, in the campaign's own words.
3. **The five posters — LOOK AT THEM:** `cleanmansatire.jpg`, `2`, `3`, `4`, `5`. Tonal ground
   truth: the register, the heat, the archetype logic, the sermon-drama. The site must sound like
   the same hand that made these.
   Behance: https://www.behance.net/gallery/229005199/Got-Soap
4. **`docs/copy/voice-bible.md`** (register + Stepford test) and **`style-lock.md`** (locked
   decisions + kill list — do not resurrect a killed line, and do not relitigate a locked decision).
5. **Sol only:** `docs/skills/USING-THESE-FOR-CAMPAIGN-COPY.md`, then `docs/skills/llm-writing/`,
   `docs/skills/writing-principles/`, `docs/skills/prose-critique/` — vendored because you can't
   invoke Claude skills.

---

## Phase 1 — Research (Fable, before any critique)
Use **WebSearch** + the **`executing-marketing-campaigns`** skill. Study how the best satirical /
irreverent campaigns actually work — **The Onion**, Liquid Death, Old Spice ("The Man Your Man
Could Smell Like"), Dr. Squatch, Cards Against Humanity, and **the original Got Milk?** (especially
its celebrity-aspiration mechanic, which is our conversion model).

Answer, in a short findings note (`docs/copy/research-satirical-campaigns.md`), with citations:
- What makes the straight-faced ones land, and where they break character (if ever)?
- How do they drive a **call to action** without shaming the target into defensiveness?
- How do they engineer **shareability** — what makes a person *forward* an ad?
- Old Spice + Got Milk?: how does **aspiration** (not shame) convert?
- What do they do that **we are not doing**? ← the "what's missing" seed.

Keep it tight and evidence-led. This is the argument base both parties reason from — not a listicle.

## Phase 2 — Audience evidence ✅ **COMPLETE (2026-07-17)**

**→ `docs/copy/reader-sim-evidence.md` — READ IT BEFORE YOU ARGUE ANYTHING.**

Three blind reads are done (Maya / Dylan / Priya) over the rendered text of all 16 pages. They were
given a persona and nothing else — no intent brief, no voice bible — so the reactions are
uncontaminated. **This is evidence, not opinion.** You may argue with a *reading*, with reasons. You
may not wave one away, and you may not assert a reaction the evidence contradicts.

Headlines both parties must reckon with: the nine case files are unanimously too many (all three hit
the wall independently); **aspiration converts and apology doesn't** (the Dylan distinction);
**vector 2 — woman→man — is broken** while **vector 3 — man→man — works via denial-forwarding**; and
there is a **hard punch-down flag on the case-file roster's class/age pattern**.

*(Original spec, for reference — the three personas run were:)*
- **Her** — 30s, on the apps, has met these men. Does she laugh? Would she *send* it, and to whom?
- **Him** — thinks he's basically fine, showers "usually." Does he feel aspiration, or shame +
  defensiveness (= shutdown = failure)? Does he want to take the quiz?
- **The creative director** — scouting an irreverent-brand hire. Does this read as a designer with
  a point of view, or a competent joke?

Their reports (`docs/copy/reader-sim-*.md`) are **evidence both sides must reckon with** — the copy
equivalent of the machine gates. Neither party may wave away a reader report; they may *argue* with
its reading, with reasons.

## Phase 3 — Adversarial review (Sol)
Audit **every** user-facing string — home, `/psas` + poster copy, `/sniff-test` + the 7 questions,
the 4 verdicts, `/pledge` (oath, form, emails), `/crisis` (findings, ribbon, 9 case files), `/about`,
404, meta, chrome/labels/alt text.

Judge against **CAMPAIGN-INTENT §8's ten criteria**. For every finding: **specific** (name the
string), **reasoned** (what it *costs* — a lost laugh, a dead CTA, a broken wink, a shame-shutdown),
**directable**, **non-obvious**.

Hunt in priority order:
1. **Thesis drift** — lines that are "ew, smelly" instead of the double standard.
2. **Shame instead of aspiration** where *he* is the reader — the conversion killer.
3. **The joke explained** (`writing-principles` "Trust the Reader" = Stepford #2).
4. **AI tells** (`llm-writing`) — especially **defining by negation** and **conversational bleed**.
5. **Dual-address failure** — a line that knows neither reader.
6. **Politeness / hedging** — anything that could run in a wellness brochure.
7. **Cohesion** — does the whole site sound like the posters' hand? Does the interior copy sit a
   rung below the home? (It was never taken through the dialectic — expect this.)
8. **What's MISSING** — the surface, line, or share-hook the campaign needs and doesn't have.
   Absence is a finding. Vector 3 (man → man roast) is the likeliest gap.

Write `docs/copy/copy-review-findings.md`: verdict, findings ranked by severity, and — **required** —
a **"What's missing"** section.

## Phase 4 — The dialectic (Sol ⇄ Fable, to consensus)
Same rules as the copy session, which worked:
- **Sol may propose**, not only flag — but **every proposal carries an argument** grounded in
  CAMPAIGN-INTENT / the voice bible / the reader evidence. **Taste alone doesn't win.**
- **Fable engages, doesn't perform.** If Sol's line is sharper, **concede and say why** — conceding
  to a better line is the job. If Fable's is better, **counter with a reason**. Never wave away a
  proposal you can't refute.
- **Both must argue WHY.** "This is weak" is not a finding. "This shames him into shutdown, which
  costs the CTA — here's a version that sells the aspiration instead" is.
- **Every agreed line carries a one-sentence rationale.** "Yeah, better" closes nothing.
- **Sharper beats safer on every tie.** The voice bible already ruled: when in doubt, go sharper.
  Polite loses.
- **Round cap 3 per line.** Deadlocks go to Stacey with both versions and both arguments.
- **HALT if Sol goes dark.** If Sol can't respond (usage limit, outage), the dialectic **stops** at
  the open round and waits — Fable never rules for Sol, never "concedes on his likely verdict," never
  calls Phase 4 closed on the adversary's behalf, never advances to Phase 5. An unanswered round is
  OPEN. A deadlock goes to Stacey; an *unreachable adversary* is a halt, not a deadlock.

**Fable writes AS Vivian.** Invoke the **`vivian-vane`** skill — she is the satirical-CD voice with
the nerve that *prevents the "sorry" from being written in the first place* (the apologies in the
current copy came from the deck pass that had no such persona). Her supporting skills: `llm-writing`
+ `humanizer` (kill AI tells before Sol sees them) · `writing-principles` (don't explain the joke) ·
`elements-of-style` (Strunk tightness) · `executing-marketing-campaigns` (Phase 1 research).

**The firewall (non-negotiable):** Vivian is the **writer** — she gets `CAMPAIGN-INTENT`, the voice
bible, everything. The **`gotsoap-readers`** (Maya/Dylan/Priya) are the **blind panel** — they get a
persona and the copy, nothing else. Opposite information diets. **Vivian must never sit on the reader
panel, and a reader must never be handed the brief.** A writer who's read the readers' reactions is
fine; a *reader* who's read the intent is a contaminated mirror.

**Sol's scoring rubric = three stacked standards, all pre-written:** `CAMPAIGN-INTENT §8` (the ten
criteria) + **Vivian's Self-Audit** (the 10-point rubric at the end of her persona — she designed it
to be handed to her critics) + the **reader evidence** (`reader-sim-evidence.md`). When Sol flags a
line, it names *which law or banned move* it violates (Vivian's doctrine gives the vocabulary) and
argues why the fix lands harder. "Could be punchier" is not a finding.

## Phase 5 — The plan
Output `docs/copy/copy-correction-plan.md`: every agreed change, grouped by surface, each with its
one-line rationale; the **missing-content** items as new work; and anything deadlocked, for Stacey.
Then implementation routes through the copy lane as usual (`copy.ts` + deck + `style-lock.md`).

---

---

## Phase 4 dispatch — owner routing (2026-07-17)

Sol's Phase 3 audit landed (`docs/copy/copy-review-findings.md`): 17 findings, 3 P0 blockers. Owner
ruling on how Phase 4 consumes them:

- **F1 (Vector-2 citation path) is OUT of the dialectic.** It's a net-new feature with a
  harassment-safety surface → specced separately (`docs/copy/vector2-citation-path-spec.md`) for its
  own design pass. The dialectic runs on **F2–F17** only. Do not design the citation mechanic here.
- **F2 (9 → 5 case files) — rebuild, don't double-cut.** The 9-is-too-many finding is near-fact
  (three blind readers converged). But **RC-058 "Kaelthas" was already rebuilt around *behavior***
  ("shower for who?") in the earlier eval window — inherit that version; Sol's "cut unless rebuilt
  around a chosen behavior" is *satisfied* by it. Cull the rest per F2; keep five with distinct
  transmission vectors.
- **F3 (disclosure move) is lock-enforcement, not a reopen.** Moving "this is satire" off `/pledge`
  and `/crisis` onto `/about` + structured metadata *executes* the committed commit-to-the-bit
  ruling. Owner confirmed comfort with the disclosure living only at `/about` + metadata.
- **Everything else (F4–F17)** is standard dialectic fodder — the line/craft findings are where
  Vivian ⇄ Sol spends its rounds.

Hand Fable: invoke **`vivian-vane`**, read `copy-review-findings.md`, run the Phase-4 dialectic with
Sol on F2–F17 under the rules below.

---

## Guardrails
- **Locked is locked.** `style-lock.md` decisions and the kill list are not reopened — critique the
  *execution*, not the settled premise. The commit-to-the-bit rulings stand.
- **The posters are untouchable.** Their baked copy is the artwork. Critique the *site*.
- **Never punch down.** Any proposal aimed at a person's body, race, class, or identity is rejected
  on sight, however funny. Behavior, tropes, and the double standard only. The reformed-hero exit
  stays open — he's the convert, not the villain.
- **"Sex sells" means aspiration, not explicitness.** Smolder, don't leer. Heat lives in implication
  and confidence, never anatomy.
- **Green gates ≠ good copy.** `copy-gates` proves the invariants held; it cannot judge funny.
