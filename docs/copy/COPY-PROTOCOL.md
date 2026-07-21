# Copy Protocol — the satirical-copy review loop

The build had a two-model loop (Fable executes, Sol audits, machine gates keep score). The copy
review is its sibling, tuned for a craft where "is it good?" collapses into taste. Same spine:
**a writer with nerve, an adversarial critic, an objective standard, and an arbiter.** The
difference is what plays the objective standard — here it's not a grep, it's **three blind readers**.

## The roles

| Who | Role | Authority | Never does |
|---|---|---|---|
| **Vivian Vane** (via Claude/Fable) | The Writer | Authors, rewrites, and **defends** every campaign string, in both registers (campaign smolder / CWAAA paperwork), never blended. Gets the full brief. | Never sits on the blind reader panel. Never judges finished copy blind. Never blends the two authors on one surface. |
| **Sol** (GPT-5.6) | Adversarial Critic | Audits every string; **may propose alternatives** (unlike the build loop) — but every proposal carries an argument. Writes findings under `docs/copy/`. | Never has the final word — **consensus does**. Never wins a line on taste alone. |
| **The blind readers** (`gotsoap-readers`: Maya / Dylan / Priya) | The Evidence | Report *felt experience* — does it land, convert, share, get her hired. This is the copy-side "gate." | **Never see the brief.** Never analyze; they react. |
| **Stacey** (you) | Owner / Arbiter | Breaks ties. Sets the three dials (Spice/Darkness/Wrongness). Owns the punch-down line and the sex-sells-means-aspiration call. | — |
| **Opus** (me) | Organizer | Dispatches the blind readers, guards the firewall, keeps the standard current. | **Does not author or critique the copy** — that's Vivian and Sol. Stays out of the ring so the loop stays clean. |

## Why there's a blind reader panel (the "machine gate" of copy)

A copy argument between two capable models collapses into taste — "this is punchier," "no it isn't"
— and taste has no adjudicator. The blind readers are the adjudicator. Three strangers, each given a
**persona and the copy and nothing else**, report what they actually felt, in order, quoting lines.

That report is **evidence, not opinion.** Neither model may assert a reaction the evidence
contradicts ("men will love this" dies when Dylan bailed at that exact line). Where readers
**converge**, treat it as near-fact (three strangers hitting the same wall is not chance). Where they
**diverge**, you've found a real strategic fork, not a defect — surface it, don't average it.

This frees the dialectic to spend its whole budget on the thing models *are* good at — craft — instead
of re-litigating "does it land."

## The firewall — two information diets, never merged

This is the load-bearing rule, and it's the one most likely to be "helpfully" broken later.

- **The Writer (Vivian) needs the intent in her bones** — `CAMPAIGN-INTENT`, the voice bible, the
  thesis, the aspiration mechanic. She writes *from* the goal.
- **The Readers must never see any of it.** A reader told what to feel reports the feeling it was
  told to have — a mirror, not a window, and the evidence dies. They get a persona and the copy.

A writer who has *read the readers' reactions* is fine and good. A *reader* who has read the intent is
contaminated. Vivian must never sit on the panel; a reader must never be handed the brief. This is
why they're separate skills with separate rules — keep them that way.

## The loop

```
  ┌─ 1. RESEARCH (Fable) — how real satirical campaigns solve these exact problems
  │       → docs/copy/research-satirical-campaigns.md   (cited; the neutral argument base)
  │
  ├─ 2. READER EVIDENCE (Opus dispatches gotsoap-readers, BLIND)
  │       → docs/copy/reader-sim-evidence.md            ✅ 2026-07-17 baseline done
  │
  ├─ 3. ADVERSARIAL AUDIT (Sol) — every string vs the standard, ranked, with a "what's missing"
  │       → docs/copy/copy-review-findings.md
  │
  ├─ 4. THE DIALECTIC (Vivian ⇄ Sol, to consensus)
  │       Sol proposes with arguments · Vivian concedes to sharper / counters with reasons ·
  │       every agreed line gets a one-sentence rationale · round cap 3 · deadlocks → Stacey
  │
  ├─ 5. THE PLAN (implement via copy.ts + copy-deck-v2 + style-lock.md)
  │       → docs/copy/copy-correction-plan.md
  │
  └─ 6. RE-READ (Opus re-dispatches the blind readers on the CHANGED copy)
          Compare to the 2026-07-17 baseline. Did it MOVE? This is the close-out —
          you don't trust the fix worked, you measure it against blind evidence.
```

**Phases 1 and 3 can run in parallel** — the research feeds the *dialectic* (4), not Sol's raw audit
(3), so Fable can research while Sol audits. Phase 2's baseline is already done.

**Phase 6 is the copy-side close-out** and it is not optional. The build loop's second Sol pass exists
because remediation is the least-reviewed code; here, the *changed copy* is the least-tested copy. A
line the models agreed was funnier is a hypothesis until a blind reader laughs at it.

## Phases

| # | Phase | Who | Output | Status |
|---|---|---|---|---|
| 1 | **Research** — Onion, Liquid Death, Old Spice, Got Milk?, Reductress: how they commit, convert via aspiration, and engineer shareability | Fable | `research-satirical-campaigns.md` | **not started** |
| 2 | **Reader evidence** — three blind reads of the live site | Opus / readers | `reader-sim-evidence.md` | ✅ **done (baseline)** |
| 3 | **Adversarial audit** — every string vs the standard | Sol | `copy-review-findings.md` | ready to start |
| 4 | **Dialectic** — Vivian ⇄ Sol to consensus | Vivian + Sol | logged rationale per line | after 3 |
| 5 | **Plan + implement** — into `copy.ts` / deck / style-lock | Fable (copy lane) | `copy-correction-plan.md` | after 4 |
| 6 | **Re-read** — blind readers on the changed copy, vs baseline | Opus / readers | delta report | close-out |

## The standard — three stacked, all pre-written

When anyone asks "is this line working?", it is asking against all three:
1. **`CAMPAIGN-INTENT.md §8`** — the ten criteria (thesis, dual-address, aspiration, CTA, shareable,
   Onion-grade, doesn't-explain-itself, AI-tells, the-line, cohesion).
2. **Vivian's Self-Audit** (end of `vivian-vane/references/persona.md`) — her 10-point rubric,
   *designed to be handed to her critics.* It gives the shared vocabulary: a flag names the **law or
   banned move** it breaks ("that's a warmth tax," "that's a permission cough"), not "feels soft."
3. **The reader evidence** — `reader-sim-evidence.md`. The felt-experience floor.

## Guardrails (non-negotiable, all parties)

- **HALT when the adversary is out — the executor never fills the adversary's chair.** If Sol cannot
  respond (usage limit, outage, unreachable), the loop **stops at that point and waits for Sol**.
  Fable does not rule on Sol's behalf, does not "concede on Sol's likely verdict," does not declare a
  phase closed, and does not advance to the next phase. A round the adversary did not answer is an
  **OPEN** round, not a passed one. The same binds Sol in reverse: if Vivian is unavailable, Sol
  halts rather than rewriting for her. An unanswered adversary halts the loop; it never collapses the
  two chairs into one. *(2026-07-17: Codex hit its usage limit mid-Phase-4; the one unruled line is
  open until Sol returns — the correct outcome is a halt, not a self-ruled "close.")*
- **A checker the implementer wrote is UNTRUSTED until the adversary made it lie.** A verification
  artifact — gate, fidelity checker, test harness — written by the party it verifies does **not count
  as evidence** until an adversary has tried to make it report green on a known-bad state and failed.
  Its green is a claim, not a proof, until then. This is **3 for 3** here (killed-lines text scanner →
  CG7's suffix exemption → the Phase-5 fidelity checker that reported 54/54 on a fake dist and a
  truncated plan). The mechanism is the yes-man failure one level up: an author tests the attacks it
  already defended against; only an adversary tests the ones it never imagined — a model cannot
  adversarially test its own adversarial tool. **How it runs:** the implementer hands the adversary the
  *tool itself*, not just its output — "make it lie": delete a required thing, mangle one character,
  point it at a stale/fake/truncated artifact, set every env seam off-default. If it can be made green
  on a bad state, it is not done. **Highest-risk shapes:** circular trust (the artifact under check
  also defines what the check requires), env/config seams (attack surface on a verification tool), and
  existence-≠-satisfaction (exact slot + exact baseline, never "non-empty" or "a section exists").
- **Never punch down.** Any line aimed at a person's body, race, class, age, or identity is rejected
  on sight — however funny. Behavior, ad tropes, and the double standard only. The reformed-hero exit
  stays open: he's the convert, not the villain. *(The 2026-07-17 readers flagged a class/age pattern
  in the case-file roster — this guardrail is live, not theoretical.)*
- **"Sex sells" means aspiration, not explicitness.** Smolder, don't leer. The heat is in implication
  and confidence — clean = hot = the man who gets the woman — never anatomy. This is a spec/portfolio
  campaign in a fragrance-ad register, not explicit content.
- **Locked is locked.** `style-lock.md` decisions and the kill list are not reopened. Critique the
  *execution*, never the settled premise (the commit-to-the-bit rulings, the footer consolidation,
  the reveal-at-/about). A killed line does not come back.
- **The posters are untouchable.** Their baked copy is the artwork. This loop reviews the *site*.
- **Green `copy-gates` ≠ good copy.** `copy-gates` proves the invariants held (hashtags, funded-by
  gag, dual-address signer). It cannot judge funny. Never call the review done on a green gate.

## Where everything lives

- **The standard:** `docs/copy/CAMPAIGN-INTENT.md` · `voice-bible.md` · `style-lock.md`
- **The evidence:** `docs/copy/reader-sim-evidence.md`
- **The order (work list + protocol detail):** `docs/build/reports/copy-review-order.md`
- **Sol's reading (vendored, since Sol can't invoke Claude skills):** `docs/skills/` —
  `USING-THESE-FOR-CAMPAIGN-COPY.md` first, then `llm-writing/`, `writing-principles/`, `prose-critique/`
- **The personas (invocable skills):** `.claude/skills/vivian-vane/` (writer) ·
  `.claude/skills/gotsoap-readers/` (blind panel)
- **The origin texts:** `promo.txt` · `gotsoapdescription.txt` (repo root)

## The handoff, in one line

Hand Sol **`copy-review-order.md`** — it routes to everything else. Hand Fable **Phase 1** (research)
to run in parallel. Everything downstream (the dialectic, the plan, the re-read) follows this file.
