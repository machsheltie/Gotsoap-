# Phase 6 — blind re-read delta vs the 2026-07-17 baseline

**Read:** 2026-07-21, three blind readers (Maya / Dylan / Priya), cold, persona + rendered text only,
firewall intact — none saw the correction plan, the dialectic, or any statement of what changed.
**Baseline:** `reader-sim-evidence.md` (2026-07-17, pre-correction).

## Verdict: PASS

Every named baseline failure **moved**, with **zero regressions**, measured on strangers who were
never told what changed. The remaining items are forward work (one deferred feature, one small copy
follow-up, placement, stat-polish) — none are regressions, none block.

## Did the baseline failures move?

| Baseline failure (2026-07-17) | Fix | Result on re-read | Evidence |
|---|---|---|---|
| **9 case files — all 3 hit the wall** | cut to 5 (F2) | **MOVED** (not fully) | Dylan & Priya no length complaint; Maya still hit a wall — "five is at least two too many, by Kaelthas I was scrolling." Wall moved from 9→~3, not gone. |
| **Apology / flinch** ("the men are, in most cases, lovely") | lede + warmth-tax cut (F5/F10) | **MOVED — clean** | No reader heard a flinch. Dylan named the opposite: "it never took away my dignity… redemptive, not apologetic." |
| **Punch-down** on the class/age roster | cuts + behavior-rebuilds (F2) | **MOVED — strongest confirmation** | Maya — *the reader who caught it in baseline* — looked for it and cleared it by name: "no fat jokes, no poverty jokes… every model is hot, which keeps it about the choice not to shower." |
| **Dylan lied on Q6** (it declared his history) | reflex he can pick honestly (F9) | **MOVED — on the exact reader** | Dylan flinched to the flattering answer instead of lying: "the quiz caught me flinching, which means it already had me." Accidental-honesty mechanic replaced shame-shutdown. |
| **Verdict shares were receipts** | per-verdict payloads (F7) | **MOVED** | Engaged as deployment tools; entangled with the vector-2 gap for Maya (below). |
| **Thirst-Hazard verdict apologized** | consequence + clock (F6) | **MOVED — converted** | Dylan: "the rideshare cracks a window in January — I laughed, then did the math, then stopped laughing." |
| **Best line must still land** | protected | **HELD** | All three quoted the protected tier: "condemned building," "the tenth asked to leave the study," "garnish a dumpster." |

## Convergences (independent readers → treat as near-fact)

1. **`/about` pivots from solidarity to sales-deck, and two readers disengage there.** Maya: "Not
   many women drive it. That's exactly why you want one" is "the moment it stops talking to me and
   starts talking to a client." Priya independently: the services triad "Cheeky PSAs, full-scale
   parodies, campaign worlds with teeth" (rule-of-three LLM rhythm) + "Built like it's real, because
   that's the whole point" (tidy-summary). **This contradicts a Phase-4 decision** — Sol *yielded* to
   Vivian on keeping the `/about` claim. The blind panel says the reworked `/about` still has a soft
   spot. Candidate for a small follow-up pass.
2. **The best material is buried.** Priya (crisis 2 clicks deep), Maya ("press releases are the best
   sustained writing"), Dylan (crisis is what pulled him in). The `/crisis` register is the strongest
   surface and it's downstream of a 45-second attention budget. **IA/placement finding, not copy** —
   pull the crisis-tier material forward.

## Divergence (a real fork — do not average)

**The stats channel splits by whether the stat carries a second layer.** Dylan & Priya skim the plain
percentages ("the case files do all the work"). But Maya's **single #1 screenshot** is a stat —
Finding 26-01, **"87% of surveyed men require a partner who 'takes care of herself.' 14% remembered
when they last washed their towel"** (the F16 replacement for the "water is wet" dud). And "the tenth
asked to leave the study" landed for everyone. **Reading:** stats that carry a joke or the thesis are
screenshot-bait; bare percentages (73%, 0%) get skimmed. Guidance is not "cut stats" — it's "every
stat needs the second layer 26-01 and 'the tenth' already have." **F16 was a decisive win for the
woman reader.**

## The deferred feature, now validated blind

**Vector 2 (woman → man) — F1, deliberately deferred to `vector2-citation-path-spec.md`.** Maya, blind,
reconstructed the entire gap from scratch and named it as the site's biggest miss: *"It diagnosed me
and gave me a share button. It gave me nothing to do about a specific man… the copy keeps gesturing
at that fantasy ('send it to the man who should,' 'aim it where he'll see it') but never builds the
thing that lets me do the aiming. For the exact reader this site is best at catching, that's the
missing feature, not a missing joke."*

This is **not a regression** — it was scoped out on purpose. It is the strongest possible business
case for building the deferred spec: the campaign's ideal reader hit the wall exactly where the spec
predicted, with no prompting. **The vector-2 citation path is the #1 forward build.**

## Watch items (no action, monitor)

- Two roster files brushed a stereotype but landed affectionate per Maya: **Gary, 46** (divorced dad)
  and **Kaelthas** (streamer). "Flickered" but read soft/redemptive, not cruel. No change; note it.
- PSA poster pages read formulaic across five (Maya skimmed 4–5). One reader, minor.
- Case files at 5 still one-too-many for Maya (wants ~3). One reader; weak signal; don't cut further
  without a second voice.

## Forward work (none block; none are regressions)

1. **Build the vector-2 citation path** (`vector2-citation-path-spec.md`) — now the validated #1 gap.
2. **Small `/about` follow-up** — the sales-pivot / services-triad, where two blind readers cooled.
   This one reopens a Phase-4 yield, so it routes back through the dialectic, not a solo edit.
3. **IA:** surface the `/crisis` press-release tier earlier.
4. **Stat-polish:** give every findings percentage the second layer that 26-01 has.

## /about follow-up — retest (2026-07-21, commit 3727ce8)

Re-read Maya + Priya blind on the rebuilt site after the A1–A4 pitch rewrite. **Result: the targeted
fix passed; the blind read converged on a residual cool-off one section over.**

**Cleared (the A1–A4 target):** both readers now warm at the rewritten `about.pitch.body`. The lines
that made them cool are gone and the replacements land — Priya: *"I file my grudges in triplicate…
great, stays in character while pitching"*; Maya: *"a great, in-voice bridge, I was rooting for her."*
The scarcity line + services triad cool-off is gone.

**Residual — 2/2 convergence, treat as near-fact:** both relocate their cool-off to the **labeled
"Case study" block** (`about.caseStudy[*]`), which A1–A4 did not scope.
- Priya: *"'Every poster walks one tightrope: visually seductive, thematically ridiculous… provoke,
  amuse, and push' — rule-of-three service list, portfolio-boilerplate. After 'We do not wish to
  discuss the three,' a different, lesser writer took over."* Names the worst line on the site:
  **"Let's make clean design dirty fun."** = "a LinkedIn tagline… the sound of someone getting nervous
  and reaching for the safe closer."
- Maya: *"'Concept & art direction… Execution. Male models generated with openart.ai' — the exact
  sentence where I stopped being a delighted visitor and became an audience for a pitch deck."*
- Diagnosis both share: the **labeled tri-fold format itself** (Concept / Execution / The system) is
  agency-brochure scaffolding — "the bit had the nerve to never label itself for eight pages, then the
  About page organizes into bins" (Priya). May be a **format** fix, not only a wording fix.

**Minor (Priya, one line we just shipped):** *"the paperwork that out-writes most brands' hero copy"* —
a small self-flinch (show-don't-tell). Not a cool-off; optional.

**No regressions:** the reveal beat, the Obama origin, and the whole campaign body held for both.

**Convergent creative note beyond /about:** both want the woman *in the frame*. Maya (vector-2, again):
*"give the woman the trigger, not just the mirror."* Priya (what's missing #1): *"she's the immaculate
narrator — the nervier version has her stand slightly IN the frame, with her own funk and stakes."*
Reinforces the vector-2 spec (PART B) and adds a creative direction: the narrator is too pristine.

**Verdict:** partial pass. The fix worked and was scoped one section too narrow — exactly what a blind
re-read exists to catch. Clean next step: extend the same treatment to `about.caseStudy[*]` + the
closer tagline, then re-read once more.

## Bottom line

The eight-round dialectic and the correction pass **worked, and it's provable on strangers.** The
punch-down line the campaign's ethics depended on is cleared by the reader who raised it; the man it's
designed to convert converted and looked at his hoodie differently; the woman it's designed for laughed,
screenshotted, and would send it — and told us precisely which feature to build next.
