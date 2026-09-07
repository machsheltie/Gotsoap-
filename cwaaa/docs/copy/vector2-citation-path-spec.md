# Spec — the Vector-2 citation path (woman → man)

**Status:** ACTIVE — owner ratified the architecture + safe-default package 2026-07-29.
Promoted from the 2026-07-17 stub. Origin: Sol Phase-3 finding **F1** (the campaign's #1
strategic gap) + blind evidence: Maya, twice, reconstructed the gap unprompted — *"it diagnosed me
and gave me a share button; it gave me nothing to do about a specific man."*

## The architecture (owner-locked)

Vector-2 is a **separate instrument**, not a new ending on the male verdict. The two readers branch
at the **Sniff Test entry (the door)**:

```
Sniff Test entry — "which reader are you?"
  ├─ "I might be him"   → the EXISTING quiz → verdict        (vector 3, denial-forwarding: UNCHANGED)
  └─ "I've smelled him" → behavior menu → generated CWAAA notice   (vector 2: NEW)
```

- The male quiz, its questions, and its verdicts are **byte-untouched** (protected — it is the
  strongest conversion surface). Do **not** gender-neutralize the seven questions; that dilutes
  vector 3 and still gives her no action.
- The two paths only **reference** each other at the seam: the woman's generated notice routes
  *him* back to the Sniff Test to self-report. No merge, no shared state.

## The woman's path — flow

1. **Entry fork** at the Sniff Test door (owner decision: lives at the Sniff Test entry, not a
   separate `/notice` route). She picks "I've smelled him."
2. **Fixed behavior menu** — she selects from a closed list of *documented behavior patterns* drawn
   from the campaign's existing case-file / Sniff-Test vocabulary (body spray in lieu of showering,
   "it's just my natural scent," the beard's "ecosystem," towel status unknown, etc.). **No free-text
   field, ever** (free text is the harassment vector — see safety law).
3. **Generated notice** — the site produces a cold, numbered **CWAAA Notice of Documented Concern**
   (Form CW-style, a case number, issued by the coalition), citing the selected behaviors, naming
   **no person**, and routing the recipient back to the Sniff Test to self-report.
4. **Delivery** — copy-to-clipboard text and/or a screenshot-ready rendered notice. The site does
   **not** send anything, does not know who "he" is, and stores nothing. She is the only courier.

## Safety law (non-negotiable — the reason this is specced separately)

The path **must not**: publicly name or shame a specific person; collect identifying data about a
third party; become harassment tooling. The joke stays on **documented behavior**, never a person.
The design satisfies each:

| Constraint | Mechanism (locked) |
|---|---|
| No free text about him | **Fixed behavior menu only** — closed list, campaign vocabulary. |
| No third-party data | **Stateless** — answers → generated notice; nothing persisted. |
| Safe delivery | **Clipboard / screenshot only. No send, no shareable URL** (a URL could carry identifying params or be indexed). |
| Names no person | The notice is a blank **"to whom it concerns"** she addresses offline; CWAAA issues it, she delivers it. |
| Protects *her* too | **CWAAA bureaucratic-deadpan register** — "the coalition has documented a concern," not "you stink." Delightful to send, never petty. |

## Why this shape is right

Both blind reads, twice each, named the **CWAAA paperwork as the strongest writing on the site**.
Vector-2 is built entirely in that register — we point the proven-best voice at the #1 gap rather
than inventing a new one. It also doubles as a portable share unit (feeds F7).

## Lanes

- **Vivian (copy, CWAAA register, in-lane):** the notice template copy + the fixed behavior-menu
  items + the entry-fork labels ("I might be him" / "I've smelled him"). Cold coalition deadpan;
  never blends campaign smolder. New invented copy → faces the Sol dialectic.
- **Fable (build):** the entry-fork UI at the Sniff Test door; the stateless menu→notice generator
  (client-side, no persistence, no network send); clipboard/screenshot delivery; the notice's
  route-him-to-the-Sniff-Test link. Male quiz untouched.
- **Sol (safety adversary — the load-bearing pass):** treats the safety law as a claim to break
  (verification-artifact law, pointed at safety). Must try to: sneak free text in, make it name a
  person, make it collect/leak third-party data, turn it into repeatable harassment tooling, or make
  the delivery carry identifying data. A HOLD is any successful weaponization. This pass gates the
  build, not just the copy.
- **Opus (orchestrator):** blind read on the built path, **Maya first** — she named the gap; the
  test is whether she feels handed a real envelope she'd actually send, and whether it reads
  empowering rather than petty. Dylan reads the *recipient* end (does receiving the notice route him
  to the quiz, or just anger him). Priya on craft/AI-tells.

## Open implementation questions (for Fable at build)

- Exact rendering of the entry fork at the Sniff Test door (two-door choice vs. a lead-in question).
- Notice visual format — reuse the Form CW-1 / pledge letterhead system (CWAAA authorship) so it
  reads as a real coalition artifact.
- Screenshot affordance vs. clipboard-only — clipboard is the floor; a clean screenshot target is
  a bonus if it adds no persistence/identifying surface.

## Verification

Build gates green · **the Sol safety-adversary pass CLEARs** (no successful weaponization) · copy
dialectic closes on the notice + menu · blind read (Maya first) confirms the envelope lands and reads
empowering, not petty. Nothing ships until the safety pass clears.
