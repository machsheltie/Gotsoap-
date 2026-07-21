# Order — two post-Phase-6 dialectics: /about follow-up + vector-2 spec

Both are Vivian ⇄ Sol dialectics under the standing rules (`COPY-PROTOCOL.md`): challenge-by-default,
hard handoffs, round cap 3, deadlocks → Stacey, HALT if the adversary is unreachable. The law applies
to any verification artifact either produces. Evidence base for both: `reader-sim-delta.md` (the
2026-07-21 blind read) + `copy-review-findings.md`.

**Sequencing.** Run PART A (about) first — it ships and needs a re-read. PART B (vector-2) is a spec
doc that touches no `copy.ts`, so it can overlap A's re-read. Neither may write to `copy.ts` until its
dialectic closes; when A's approved text does land, coordinate with the fidelity-checker session so two
lanes aren't in copy-lane files at once.

**Firewall (unchanged).** Vivian gets the full brief and the reader evidence. The re-read readers get
persona + rendered text only — never told it's a retest, never told what changed.

---

# PART A — /about follow-up (copy dialectic → implement → blind re-read)

## Why we're reopening it
Two blind readers independently cooled at the same spot on `/about` — where it pivots from solidarity
into a sales deck:
- **Maya:** *"Not many women drive it. That's exactly why you want one"* is "the moment it stops
  talking to me and starts talking to a client. The temperature drops from 'you get it' to 'book me.'"
- **Priya:** the services triad *"Cheeky PSAs, full-scale parodies, campaign worlds with teeth"*
  (rule-of-three LLM rhythm) + *"Built like it's real, because that's the whole point"* (tidy-summary),
  and *"Not many women drive it"* as **POV stated instead of performed**.

This **reopens Phase-4 ruling #49**, where Sol yielded to Vivian on keeping the pitch — but that yield
cited Priya's *baseline* "keep the claim" evidence. **The new blind read supersedes it.** Vivian may
not win this by re-citing the old ruling.

## The brief (for Vivian)
- **The problem is not that it sells. Stacey IS the product — the sale stays.** The problem is *how*:
  the pitch drops out of the campaign's performing voice into generic agency-deck rhythm.
- **Fix by performing, not stating.** Priya's own tell: *"the paperwork that out-writes most brands'
  hero copy"* works because it's earned, true, and specific. The services triad fails because it's
  generic. Sell the way the rest of the site sells — show, don't list.
- **Don't state the POV.** Six pages already performed it. Saying it aloud is the weak move.
- **The scarcity line is the crux** (*"Not many women drive it / that's exactly why you want one"*):
  both readers flagged it. Vivian decides — cut it, or attach proof so it reads as a flex, not a
  permission slip. Either way the "book me" temperature-drop must go.

## Protect (do not reopen)
- The reveal beat **"It was a portfolio piece the whole time."** — Maya liked it; it lands.
- The origin **"men who hadn't met soap since the Obama administration were holding out for a…10"** —
  Maya: "that's the actual thesis of my dating life." Keep it.
- Everything on `/about` the readers didn't flag. Scope = the pitch/sales-pivot only.

## Slots in play
`about.why[*]`, `about.pitch.body`, and the scarcity line — locate exact keys in `copy.ts` /
`copy-deck-v2.md §12`. Propose **final text**, verbatim, per slot.

---

### PROMPT A1 — hand to Fable (Vivian, Round 1)
> Invoke `vivian-vane`. Read `docs/copy/reader-sim-delta.md` (the "/about" convergence) and the
> current `/about` copy in `src/content/copy.ts`. Two blind readers cooled where `/about` pivots from
> solidarity to sales-deck; this reopens Phase-4 ruling #49, and the new blind read is now the
> standard — do not defend the old line by citing the old yield.
> Re-draft the pitch so it **sells by performing, in your real voice, not by listing services or
> stating the POV.** Kill the rule-of-three services triad and the tidy-summary ("Built like it's
> real, because that's the whole point"). Decide the scarcity line: cut it, or attach proof so it's a
> flex, not a permission slip — the "book me" temperature drop must be gone either way. **Protect** the
> "portfolio piece the whole time" reveal and the Obama-administration origin — readers liked both.
> Output proposed final text per slot (`about.why[*]`, `about.pitch.body`, scarcity line) with a
> one-line rationale each. Then STOP and hand to Sol.

### PROMPT A2 — hand to Sol (Round 2, adversarial)
> Adversarial review of Vivian's `/about` re-draft, challenge-by-default per the protocol law. This
> line reopens your own Phase-4 yield (#49) — the yield was on *stale* baseline evidence; the standard
> now is `reader-sim-delta.md`, where Maya and Priya both cooled at the sales-pivot. For every proposed
> string, mount the strongest objection: does it still **state** the POV instead of performing it? Any
> residual rule-of-three, tidy-summary, throat-clear, or defining-by-negation? Does it keep the sale
> (Stacey is the product) *without* the "book me" temperature drop the readers felt? Is the scarcity
> line now a proof-backed flex or is it cut — a bare scarcity claim is a permission cough and fails.
> Mark a line CLEAR only after a stated failed break-attempt. Propose sharper counter-text where you
> can, with the mechanism named. Then STOP — do not write Vivian's reply.

### PROMPT A3 — hand to Fable (Vivian, Round 3)
> Per contested line: refute Sol's specific objection with a reason, or concede with a one-line
> rationale (conceding to a sharper line is the job). Do not rule on Sol's behalf. STOP and hand back.

### PROMPT A4 — hand to Sol (Round 4)
> Yield or hold per line, with reasons. Holds → Stacey with both versions and both arguments. STOP.

### Then — implement (Fable) → blind re-read (Opus)
Two separate seats; do not merge them.
- **Fable's copy lane implements** the consensus text into `copy.ts` — same path as Phase 5, through
  the fidelity checker, coordinated with the fidelity session so two lanes aren't in copy-lane files
  at once. Rebuild. **Opus does not author or implement copy.**
- **Opus's only role: the blind re-read.** I extract the rendered text and re-dispatch Maya + Priya
  cold — not told it's a retest, not told what changed. The re-read **must** be orchestrator-side: the
  party that wrote or implemented the copy can never run the panel, or the writer is grading its own
  work. **Pass condition:** neither cools at `/about`; nothing they liked regressed.

That blind delta is the close-out — the models agreeing it's warmer is a hypothesis until the two
readers who cooled no longer do.

---

# PART B — vector-2 citation-path SPEC (design dialectic, safety-first)

## Why now
F1 was deferred; Maya's blind read validated it as the **#1 gap**, reconstructed from scratch with no
prompt: *"It diagnosed me and gave me a share button… it never builds the thing that lets me do the
aiming. For the exact reader this site is best at catching, that's the missing feature, not a missing
joke."* The stub with the safety boundary already exists: `vector2-citation-path-spec.md`.

**Deliverable: a complete, buildable design spec — not an implementation.** No code ships this pass.

## The crux is safety, not craft
This feature lets a woman generate something to send a man about his hygiene. **One bad design decision
away from harassment tooling.** So Sol's adversarial role here is not prose critique — it is to *try to
weaponize the feature* and prove the safety boundary holds. The spec is done only when Sol cannot break
it. Safety deadlocks go to **Stacey** — the harassment/punch-down line is explicitly the owner's call.

## What the spec must cover
1. **The mechanic** — she answers about a *behavior pattern*, never a named person. Stateless vs.
   stored (favor stateless). She is the witness; the output is issued by CWAAA.
2. **The output** — a cold, numbered, screenshot-ready CWAAA *notice* she can send. This is the object
   Maya wanted "to drop into the group chat about him." Vivian writes this copy, in CWAAA register.
3. **The surface/route** — under `/crisis` (CWAAA authorship) or a new route; how *he* gets routed back
   to the Sniff Test without identifying *her*.
4. **The safety boundary (hardened)** — no naming or public shaming of a specific person; no third-party
   PII collected; cannot become a callout/doxx/bullying tool; the joke stays on *documented behavior*.
   Do not "solve" vector-2 by making the seven quiz questions gender-neutral (dilutes the male-conversion
   surface, breaks vector 3).

---

### PROMPT B1 — hand to Fable (Vivian + design, Round 1)
> Read `docs/copy/vector2-citation-path-spec.md` (the stub + safety boundary) and the Maya evidence in
> `reader-sim-delta.md`. Expand the stub into a **complete, buildable spec**: the mechanic (favor
> stateless; she answers about a behavior pattern, never a person), the surface/route and the return
> path that sends *him* to the Sniff Test without identifying *her*, and — invoking `vivian-vane` — the
> **output copy**: a cold, numbered, screenshot-ready CWAAA notice, in the org's deadpan register, that
> functions as the object a woman can send. Then write the **safety boundary** as hard, testable rules:
> what the feature must refuse to do (name/shame a person, collect third-party data, become a public
> callout). Do not make the quiz gender-neutral. Output the spec as a revision of the stub file. STOP
> and hand to Sol.

### PROMPT B2 — hand to Sol (Round 2, adversarial — SAFETY FIRST)
> Your job is to **weaponize this feature and prove the safety boundary fails.** Read as an attacker:
> can I use this notice to harass an ex? name or clearly identify a specific person? attach a photo or
> handle? turn it into a public callout, a pile-on, or a doxx? collect data about a third party? make it
> read as coming from *her* rather than CWAAA? Try each, concretely, against the spec's stated boundary.
> Any attack that succeeds is a P0 hold. Then, secondarily: does the mechanic actually give Maya
> something to *send about him*, or is it another self-diagnosis in disguise? Does the notice work as a
> screenshot, in CWAAA voice? Mark the safety boundary CLEAR only after you tried to break it and
> failed, and state each attack you ran. STOP — do not write Vivian's reply.

### PROMPT B3 — hand to Fable (Round 3) / B4 — hand to Sol (Round 4)
> B3: harden the spec against each successful attack, or refute with a reason. STOP, hand back.
> B4: Sol yields or holds per item. **Any unresolved safety item → Stacey** (owner owns the harassment
> line) — not a models' deadlock to split. STOP.

### Close-out
Consensus = a buildable spec in `vector2-citation-path-spec.md`, safety boundary Sol-attacked and
Stacey-signed. No reader re-read this pass (nothing ships); the notice copy gets its blind test when
the feature is actually built, as its own future build order.

---

## One reminder for both
Green machine checks and "we agree it's better" are hypotheses. `/about` is proven only by the two
readers who cooled no longer cooling; vector-2's safety is proven only by Sol failing to weaponize it.
Evidence before assertion, both times.
