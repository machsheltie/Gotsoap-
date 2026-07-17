# Vendored skills → applied to *Got Soap?* campaign copy

These are Claude skills **vendored into the repo so Sol (Codex) can read them** — Sol has no Skill
tool, and they live outside the worktree otherwise. See `README.md` for the porting recipe.

They were written for **fiction**. You're using them on **short-form satirical ad copy**. Here is
the mapping — read this before applying them.

## `llm-writing/` — the AI-tell instrument (use as-is; it is domain-general)
This one needs almost no translation: it's about "written artifacts for humans," not fiction.
Apply its **behavioral pulls** and **conversational bleed** sections directly. The highest-yield
tells for this campaign:
- **Filling structure without anchoring to purpose** → a line that exists because the slot existed.
- **Stating conclusions without evidence** → "it's iconic!" instead of *being* iconic.
- **Defining by negation** → "this isn't just about smelling good, it's about…" ← the single most
  common AI tell in ad copy, and it is *always* weaker than the positive claim.
- **Conversational bleed** → *"It's not X — it's Y"* corrects a misconception nobody has;
  *"Let's break this down"* answers a question nobody asked. A visitor arrived cold; the copy is
  not mid-conversation with them.
- **Smoothing over uncertainty / encoding corrections as prohibitions** → hedging. The voice bible
  bans hedges outright.

## `writing-principles/` — read it as the LAW OF SATIRE, not a fiction doc
Its core section is **"Trust the Reader"**: the reader reconstructs, infers, anticipates — *"that
work is where the reward lives"* — and *"your training pulls in the opposite direction. The
helpfulness instinct wants to explain, resolve, clarify, and complete."*

**That is the voice bible's Stepford test #2 stated in different words: *does it explain the joke
instead of being it?*** A joke explained is a joke killed, for exactly the reason this skill gives:
you did the work the reader wanted to do, and the laugh lived in *their* doing it.

Translate the four **reader reward channels** for a campaign site:
| Fiction channel | Ad-copy equivalent |
|---|---|
| **Transportation** | Does the surface feel like a real campaign you've fallen into (or like a joke being explained to you)? |
| **Aesthetic** | The line-level pleasure — the snap of the sentence. |
| **Social simulation** | **The most important one here.** Does the reader picture the scene — the group chat, the dating app, his friend's face? This is what makes it *shareable*, and shareability is the campaign's engine. |
| **Flow** | Does it read clean, or does it stumble? |

Skip its fiction-plot material (arcs, scenes, POV mechanics). There is no plot.

## What these do NOT decide
Neither skill knows what this campaign is *for*. That's **`docs/copy/CAMPAIGN-INTENT.md`** — the
thesis (the double standard), the two audiences, the aspiration mechanic (clean = hot), the CTA,
and the Onion bar. These skills sharpen *how you critique*; CAMPAIGN-INTENT is *what you critique
against*.
