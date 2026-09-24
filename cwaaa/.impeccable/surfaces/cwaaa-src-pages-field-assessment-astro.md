---
version: 1
slug: "cwaaa-src-pages-field-assessment-astro"
primary_target: "src/pages/field-assessment.astro"
related_targets: ["src/content/copy.ts","src/config/site.ts"]
---

# /field-assessment — Schedule a Field Assessment

**Built 2026-09-24 on owner direction.** Mode: Read, ending in a choice. Author: CWAAA.

## Owner direction (verbatim in substance)
There is no CWAAA edition of the Sniff Test. The seven questions, four verdict names and verdict copy
remain exclusively on Got Soap? in the campaign's voice (CW-L03 stands). CWAAA instead offers a
voluntary baseline assessment on its own route, with two clearly distinct paths:
1. **Take the Sniff Test now** — a clearly marked external link to the Got Soap? assessment.
2. **Request a field assessment** — CWAAA's own intake, not an instant quiz.

No false booking confirmation and no scheduling data until the intake fields, consent language,
fulfilment method, privacy handling and operational destination are approved.

## Composition (as built)
The published-document shell (Document.astro grammar): white sheet on `--cw-shell`, statement
masthead, one lead, ink rule; one 3:2 photograph across the full sheet (CW-G09, a chapter member and
a man at a table); "What an assessment includes" list and note; "Two ways to start" as two ruled
paths read in order, never side-by-side cards. Path 1 is an ink `.act-box` to
`GOT_SOAP_SITE_URL/sniff-test/` with an external-site label; it renders only when that origin is
configured. Path 2 renders a visible `[pending: field assessment request form]` marker
(data-pending, counted by the launch check) and "Until it opens, this page collects nothing."

## Constraints
No Office language, no audit/compliance/finding vocabulary, no form fields, no stored data. The
Privacy page's "the pledge form is the only thing here that accepts input" must stay true until the
intake is approved and Privacy is amended with it.

## Reach
Not in primary navigation (design.md §4 fixes it). Linked from /tie-one-on ("Not sure which he is?").
Candidate seams for later, owner's call: the Recovery Records that cite "Field Assessment CW-7"
(Gary, Kaelthas) — where all three blind readers asked for the Sniff Test.

## Open
- The request mechanism (owner approval of intake, consent, fulfilment, privacy, destination).
- CW-G09 photography (owner). Every string except the title is DRAFT.
