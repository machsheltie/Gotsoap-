# The Copy Lane — Claude ⇄ Sol consensus session

This session resolves the owed campaign copy through a **peer dialectic**: Claude writes,
Sol critiques *and proposes* with arguments, Claude reviews and answers, and they iterate
until they genuinely agree — grounded in the voice bible, not in mutual flattery.

It differs from the build loop on purpose. Code has a spec that is law and a critic that
only flags. **Copy is craft**, so here the critic may propose, both parties argue, and
consensus is the goal. The guardrails below exist so "consensus" never means "capitulation."

---

## SHARED LAW — both models read this first

Copy that could come from any brand is wrong. The bar is: *would Stacey say it out loud,
unapologetically?* These documents are law, in this order:

1. **`docs/copy/voice-bible.md`** — the register. Contains the **Stepford test** (below),
   the dual-address engine, and sound-like / doesn't-sound-like exemplars. Read it first.
2. **`docs/copy/copy-contract-for-build.md`** — the non-negotiable invariants + the
   in-fiction utility labels + the two-author division of surfaces.
3. **`specs.md` §7** — the signer model (§7.1) and the exact copy corrections (§7.2).
4. **`docs/copy/copy-deck-v2.md`** — the current surface copy. `copy-deck-v1.md` is
   superseded; do not write from it.

### The five things that are NOT up for debate (machine-enforced)
`npm run copy-gates` owns these so your dialectic never wastes a round on them:
- Hashtag stack verbatim: `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`
- Sponsor gag verbatim: `Funded by Concerned Women Against Axe Abuse`
- Subheads open **"Because…"**; primary CTAs open **"Join the movement."**; `© Stacey Breckel 2025`
- **Dual-address & signer (§7.1/§7.2):** the declarant is the **man**. He does not "join two
  million women." Every line knows if it winks at *him* (the accused) or *her* (the
  distributor); the best do both.
- **Two authors never blend on one surface.** Campaign 🧼 smolders (Oswald/Jost). CWAAA 📋
  files (PT Serif, manila, deadpan bureaucracy — never flirts). A mixed surface is a bug.

### The Stepford test — the shared critique rubric (from the voice bible)
Run it on every line. It is the standard both writer and critic argue against:
1. Could this come from *any* brand? → rewrite.
2. Does it explain the joke instead of being it? → cut the explanation.
3. Any hedge word (almost, very, really, maybe, kind of)? → delete it.
4. Does it know if it's winking at *him* or *her*? → make it choose, or make it both.
5. Would Stacey say it out loud, unapologetically? → if not, sharpen until yes.

### The one real limit
Punch at **behavior, ad tropes, the double standard** — never at a person's body, race,
class, or identity. The reformed-hero exit stays open: always "you *could* be the poster,"
never "you're disgusting, the end." That line is what keeps it clever instead of cruel,
and clever is the flex.

---

## THE WORK — what this session must deliver

Resolve these, currently failing `npm run copy-gates` (CG3, CG4) and flagged in the build:

| # | String | Where | The problem |
|---|---|---|---|
| 1 | `meta.pledge.description` | `copy.ts:76` | Says the (male) declarant joins "two million women." §7.2: remove it. He signs; he doesn't join the women. |
| 2 | `crisis.ribbon.body` "put your intent in writing" | `copy.ts:337` | §7.2: confirm "your" reads as the **man who signs**, not her. |
| 3 | Home Oath invitation | home Oath beat | §7.2: frame it as *sending/bringing him* to his declaration — not asking *her* to swear his hygiene oath. |
| 4 | Hero PROVOCATION (the main hook) | `homev2/Hero.astro` | Copy-lane placeholder. The loudest line on the site's first screen. |
| 5 | Hero institutional signature | `homev2/Hero.astro:72` | Placeholder "A public hygiene initiative · funded by…". Must read as an authentic PSA/fragrance credit. |
| 6 | Confrontation `CONFRONT` | `homev2/Confrontation.astro:20` | Placeholder "Are you the fog?" — the Sniff Test provocation. Keep only if it earns its place. |
| 7 | `/psas` meta descriptions ×5 | `copy.ts` | Phase 1 stripped the "Spot No. N." prefix; they now open mid-sentence on "Because…". Rewrite as standalone. |
| 8 | `contents` framing strings | `copy.ts` | Phase 4 added the contents-sheet nav. The ten *entry labels* are verbatim structural taxonomy (leave them). The *framing* strings are implementation defaults awaiting your voice: `trigger:"Contents"`, `title:"Contents"`, `close:"Close"`, `anchorsLabel:"On this page"`, `routesLabel:"The routes"`. Re-voice or ratify. |
| 9 | Nav-vs-dialog voice call | `copy.ts` | Phase 4 surfaced a tension: the standard Nav reads "THE PSAS / THE SNIFF TEST" while §9.1's contents sheet reads plain "PSAs / Sniff Test". Both now ship. Decide whether the campaign wants one voice or the two are intentional — it's a copy call, not a build one. *(Partly overtaken by the 2026-07-17 chrome unification: `Nav.astro` is retired and `nav.links`/`nav.quiet` are unconsumed — retire or keep them, your call.)* |
| 10 | `contents.closeCwaaa` | `copy.ts` | Chrome unification (2026-07-17) gave CWAAA surfaces their own contents-sheet close control: `close: "Back to the campaign"` is campaign-voiced and wrong inside the sponsor's document, so the CWAAA dialog ships the plain implementation default `"Close"` — same class as item 8's defaults. Style-lock §4's last line applies: a close control *can* be voiced without misdescribing, so voice it in the CWAAA register (procedural deadpan, never flirts) or ratify the plain default. Sol's chrome-unification review rejected the executor-authored "Return to the document" — do not treat it as a draft with standing. |

Resolving a placeholder means **removing its `COPY-LANE PLACEHOLDER` marker** too (CG4).

**Deliverables:** the final strings (written into `copy.ts` — the copy lane owns it), the
matching updates to `copy-deck-v2.md`, and `npm run copy-gates` green. Optionally, a short
`docs/copy/style-lock.md` capturing any voice decision you had to make so the next copy
session inherits it.

---

## SKILLS — invoke these; ignore the rest

The machine has a large skill library. Six serve this session. The others (SEO, social
scheduling, fiction structure) will pull you off-voice — this is short-form ad copy in a
fixed register, not blog SEO or narrative fiction.

| Skill | Role | Why it fits *this* copy |
|---|---|---|
| **copywriting** | spine (Claude) | The core skill for headlines, CTAs, ad/marketing copy. Everything else sharpens what this drafts. |
| **elements-of-style:writing-clearly-and-concisely** | tightening (both) | Strunk. The voice demands "one clean blade" — delete hedges, cut the explanation, every word earns its place. |
| **humanizer** | anti-AI-tell (Claude) | Ad copy that reeks of AI dies in this register. Matches Stacey's voice, strips robotic patterns — it *is* the Stepford test in tool form. |
| **creative-writing-skills:llm-writing** | anti-AI-tell (both) | Catches the default LLM patterns humanizer might miss — the "could any brand say this" failure, from the fiction side. |
| **prose-critique** (vendored → `docs/skills/prose-critique/`) | adversarial method (Sol) | Gives Sol a structured way to find what *doesn't* work, beyond "I don't like it." **Sol can't invoke Claude skills**, so it's vendored into the repo — Sol reads `docs/skills/prose-critique/SKILL.md` + `USING-FOR-CAMPAIGN-COPY.md`. Pair it with the Stepford test. |
| **executing-marketing-campaigns** | research (opening move) | The research phase: what messaging converts and *shares* in the irreverent-brand lane (Liquid Death / CAH). Grounds the copy in strategy, not vibes. |

**Optional, if a specific problem calls for it:** `creative-writing-skills:style-analysis`
(verify a draft matches the voice bible's captured patterns) · `creative-writing-skills:character-sim`
(only to nail the two distinct author-voices — campaign smolder vs. CWAAA deadpan — as
separate characters). Don't reach for them by default.

---

## PASTE TO CLAUDE — the Copywriter

You write the copy and you defend it, but you do not get the last word by default —
consensus with Sol does. Read the SHARED LAW above, then:

1. **Research first (one pass).** Use `executing-marketing-campaigns` + `copywriting` to
   answer: in the Liquid Death / Cards Against Humanity lane, what makes a line *shareable*
   and *convert* — not just funny? What does the dual-address engine reward? Write a 5–8
   line findings note; it's the argument base you'll both reason from.
2. **Draft** each owed string. Run every line through the Stepford test yourself. Then run
   `humanizer` + `llm-writing` — if a line reads AI-written, it fails before Sol sees it.
   Tighten with Strunk. Give **2–3 options** for the high-stakes lines (Hero PROVOCATION,
   CONFRONT) so the dialectic has range to work with, not a single take to defend.
3. **Write the draft into `docs/copy/copy-session-draft.md`** with, per line: the option(s),
   which viewer each winks at (him/her/both), and one sentence of why it clears the Stepford
   test. Hand to Sol.
4. **When Sol answers, genuinely engage.** Sol may propose alternatives with arguments. For
   each: does its argument hold against the voice bible? If Sol's line is sharper, **concede
   and say why** — conceding to a better line is the job, not a loss. If yours is better,
   **counter with a reason grounded in law/craft**, not "I prefer mine." Never wave away a
   proposal you can't refute.
5. **Iterate to consensus.** When you both agree a line is final, write one line of shared
   rationale. Then finalize into `copy.ts` + `copy-deck-v2.md`, remove the placeholder
   markers, and run `npm run copy-gates` until green.

You may NOT: retype poster text, blend the two authors on one surface, or ship a line you
privately think is weak because you're tired of arguing. A tie you can't break goes to Stacey.

---

## PASTE TO SOL — the Copy-Critic (who may propose)

Unlike the build loop, here you may **propose**, not only flag — but every proposal must
carry a strong argument, and the bar is the voice bible, not your taste. Read the SHARED
LAW above, then audit `docs/copy/copy-session-draft.md`:

1. **Confirm the floor.** `npm run copy-gates` green? If not, the draft isn't ready — say so.
2. **Attack each line with the Stepford test + prose-critique.** Read
   `docs/skills/prose-critique/SKILL.md` and its `USING-FOR-CAMPAIGN-COPY.md` first — that is
   your critique method (it's vendored into the repo because you can't invoke Claude skills).
   For every line, answer:
   which of the 5 Stepford questions does it fail, if any? Does it know who it winks at? Is
   there a hedge? Does it explain the joke? Is it a line *any* brand could run?
3. **Where a line is weak, propose a sharper one — with the argument.** "This is better
   because it winks at both him and her where the original only accused him," or "this cuts
   the explanation the original leans on." A proposal without a reason grounded in the voice
   bible is just taste, and taste doesn't win here.
4. **Rank your findings.** Which lines are genuinely off-voice (must change) vs. defensible-
   but-improvable (worth a proposal)? Don't drown a good draft in nitpicks; don't wave
   through a Stepford-failing line to be agreeable.
5. **When Claude answers, rule honestly.** If Claude's counter-argument holds, **concede and
   say you were wrong** — a critic who never concedes is one nobody can reason with. If it
   doesn't, restate the argument. Consensus is a line you'd both defend to Stacey, not a
   line you're both tired of fighting over.

You may NOT: rewrite `copy.ts` yourself (Claude finalizes), soften a real Stepford failure
to keep the peace, or win a line on preference alone.

---

## CONSENSUS GUARDRAILS — so agreement means something

The failure mode of a two-writer consensus loop is **mutual flattery** — converging on a
safe, blunted line because arguing is tiring. These prevent it:

- **Every "agreed" line carries a one-sentence rationale** grounded in the voice bible or
  the Stepford test. "Yeah that's better" is not a rationale and does not close a line.
- **Concession is a first-class move, not a loss.** The writer conceding to a sharper Sol
  line, or Sol conceding to Claude's defense, is the loop *working*. Log who conceded and why.
- **Sharper beats safer, every time.** If the disagreement is "edgier vs. more comfortable,"
  the voice bible has already ruled: *when in doubt, go sharper.* Comfortable loses ties.
- **Round cap: 3.** If a single line isn't settled in three exchanges, stop. Put both
  versions + both arguments in `docs/copy/copy-session-draft.md` under "For Stacey" and move
  on. She is the comedic-timing arbiter (she made the footer-credit call); don't burn the
  session deadlocked on one headline.
- **The machine floor is not negotiable and not the point.** `copy-gates` green is table
  stakes. Green copy can still be lifeless. Neither of you may call the session done on a
  green gate alone — done is *green + both would defend every line to a client in the room.*

## Definition of done
1. `npm run copy-gates` exits 0 (CG3, CG4 resolved; markers removed).
2. Every owed string finalized in `copy.ts` **and** reflected in `copy-deck-v2.md`.
3. Every final line has a logged one-sentence rationale; every concession is logged.
4. Any deadlocked line is in the "For Stacey" list with both options and both arguments.
5. `npm run build` still clean (copy edits didn't break the module).
