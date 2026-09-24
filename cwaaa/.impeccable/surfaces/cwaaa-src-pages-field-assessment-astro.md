---
version: 1
slug: "cwaaa-src-pages-field-assessment-astro"
primary_target: "src/pages/field-assessment.astro"
related_targets: ["src/content/copy.ts","src/config/site.ts"]
---

# /field-assessment — Schedule a Field Assessment

**Built 2026-09-24; purpose corrected by the owner the same day.** Mode: Read, ending in a choice.
Author: CWAAA.

## Who this page is for (owner, 2026-09-24)
**The referrer.** Someone who knows a man who is not showering or keeping up basic hygiene comes to
CWAAA to refer him and request a field assessment. The man is not the visitor here.

The **Sniff Test belongs to Got Soap? directly**: a glossy, magazine-quiz questionnaire written to
engage the low-effort man himself and get him to take it. CWAAA never hosts, restates or reskins
it; the seven questions, four verdict names and verdict copy stay on Got Soap? (CW-L03).

Superseded the same day: the first build framed the assessment as something the man agrees to
himself ("Nobody is assessed on someone else's say-so"). That was wrong and is struck.

## Composition (as built)
The published-document shell (Document.astro grammar): white sheet on `--cw-shell`, statement
masthead, one lead, ink rule; one 3:2 photograph across the full sheet (CW-G09, a chapter member and
a referred man at a table); "What happens after a referral" list and note; "Two ways to start" as
two ruled paths read in order:
1. **Refer him for a field assessment** — CWAAA's own path, first. PENDING: a visible
   `[pending: field assessment referral form]` marker (data-pending, counted by the launch check) and
   "Until it opens, this page collects nothing."
2. **Or send him the Sniff Test** — the campaign's quiz, external and labelled, framed as something
   she sends him. Ink `.act-box`; renders only when the Got Soap? origin is configured.

## Constraints
Vocabulary is "referral" (the Recovery Records' own word), never report/complaint/hotline/case
intake. No Office language, no audit/compliance/finding vocabulary, no form fields, no stored data.
Privacy's "the pledge form is the only thing here that accepts input" must stay true until the
referral mechanism is approved and Privacy is amended with it.

## Reach
Not in primary navigation (design.md §4 fixes it). Linked from /tie-one-on ("Not sure which he is?").
Candidate seam for later, owner's call: the Recovery Records that cite a referral.

## Open
- The referral mechanism: intake fields, consent language, fulfilment, privacy handling, operational
  destination (owner approval).
- Whether the Sniff Test path stays on this page at all (asked 2026-09-24).
- CW-G09 photography (owner). Every string except the title is DRAFT.
