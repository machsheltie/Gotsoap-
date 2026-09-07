---
name: Got Soap? — Three Authors
description: A routing record, not a design system. Three fictional institutions, three separate visual worlds, deliberately never merged.
---

<!-- ROUTER: this file intentionally carries NO shared palette, type scale, spacing scale, or
     component set. There is no site-wide design system to inherit. Read the record for the author
     whose surface you are touching. Averaging the three is the primary failure mode. -->

# Design System: routing record

**This project has three visual systems, not one.** They are authored by three separate fictional
institutions and are meant to be visibly and behaviorally distinct. There is no shared design system
beneath them to fall back on, and this file will not supply one.

## Overview

Before touching layout, type, color, or copy on any surface, identify its author. Then read that
author's record and only that one.

| Author | Job | Public character | Full design authority |
|---|---|---|---|
| **Got Soap?** | campaigns | glossy, thirsty, confrontational | [`gotsoap/design.md`](gotsoap/design.md) |
| **CWAAA** | public advocacy | a coalition making its case in public | [`cwaaa/design.md`](cwaaa/design.md) |
| **Office of Lather Compliance** | regulates | unreadable authority, error states only | [`office-of-lather-compliance/design.md`](office-of-lather-compliance/design.md) |

Each linked `design.md` contains that site's full prose design authority. Its supporting
`docs/ui-system.md` records detailed decisions. Each site's `docs/DESIGN-SYSTEM.md` is the
tokenized, tool-readable companion. **The prose authority wins on conflict.** The records exist so a design
tool has something structured to read without inventing a merged system; they do not supersede
owner-approved specification, and on a case-insensitive filesystem they must never be renamed to
`DESIGN.md` inside a directory that already holds a `design.md`.

Each record states its own maturity. Got Soap? is implemented and its tokens are real. CWAAA is
partially locked — its typography and color remain owner decisions that no agent may make, and its
current runtime contradicts its target. The Office is fully locked and consists almost entirely of
prohibitions.

Shared *engineering* primitives may exist beneath these worlds. The rendered authors must not blend.
On ordinary public surfaces each page uses only its named system's authorship: CWAAA pages do not
write in the Office's regulatory voice, and the Office error site does not publish CWAAA advocacy
copy. The canonical IVR is the one controlled exception.

### How the runtime enforces this

The combined runtime expresses the boundary as CSS. Register classes in
`site/src/styles/tokens.css` (`.register-porcelain`, `.register-smoke`, `.register-marble`,
`.register-cwaaa`) each expose only their register's tokens through `--reg-*` slots, and components
read the slots rather than raw tokens. **A surface that mixes campaign and CWAAA slots is a bug, not
a blend.**

### Protected uncertainty

Private production canon holds CWAAA and the Office as legally separate fictional entities, but no
ordinary public artifact proves that separation is operationally meaningful. This ambiguity is
content. Do not explain the CWAAA/Office relationship, add a clean handoff, or resolve it in a design
decision. Intentional uncertainty is not missing documentation.

## Do's and Don'ts

### Do:

- **Do** name the author first, then open that author's record.
- **Do** keep design questions inside one author. A pattern proven on a campaign surface is not
  thereby available to CWAAA.
- **Do** request the owner decision when a record marks a section UNLOCKED, rather than filling it
  with a sensible default.
- **Do** treat `docs/HANDOFF.md` as the authority map when records and older documents disagree.

### Don't:

- **Don't** create a shared token layer, unified component library, or common design language across
  the three authors. Averaging them into one tasteful system is the failure this file exists to
  prevent.
- **Don't** promote a token from one record into this file. This router stays empty of visual values
  on purpose.
- **Don't** let a tool that expects a single root design system talk you into synthesizing one.
- **Don't** carry an effect, font, or color across an authorship boundary because it "looks better."
  It is out of system by definition.

---

## Notes for design tooling

`.impeccable/design.json` is deliberately **not** generated for this project. That sidecar describes
one design system — one palette, one type set, one component gallery — and producing it here would
require averaging three authors into the single system this record forbids. Read the three records
instead.

Path-scoped constraints for the web build also live in `.claude/rules/`.
