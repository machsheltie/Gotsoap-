---
version: 1
slug: "cwaaa-src-pages-findings-astro"
primary_target: "src/pages/findings.astro"
related_targets: ["src/content/copy.ts", "cwaaa/src/pages/findings.astro"]
---

# Surface brief: CWAAA Findings (`/findings`)

**Scope:** the standalone CWAAA app's Findings route, second route in the locked progression. **Visitor mode:** Persuade. Confirmed by the owner 2026-09-14 through the Impeccable `shape` interview.

**Audience and job.** The woman arriving from the home's "Read the Findings" action or a shared link needs the case stated plainly enough to repeat at a table or forward without commentary. The referred man reads it as the reason the form exists. Both leave confident that CWAAA has studied this far more seriously than expected.

**Outcome and proof.** Primary task: read the lead Finding in one viewport, then scan the register. Secondary actions in order: Read Recovery Stories, then Take the Pledge. Success is a copied link or a forwarded Finding. Proof is a numbered register, a dated disposition, and one methodology note. Nothing impersonates science or government; Findings remain coalition advocacy.

**Content roster (CW-D04, this route, owner-confirmed).** Register year 26:

| Label | Figure | Conclusion / support | Source |
|---|---|---|---|
| FINDING 26-01 | 73% | "Fragrance is not a cleansing event." Support: 73% of body-spray applications occur in lieu of, not in addition to, a shower. | Home statement (owner-directed) merged with runtime 26-04 (APPROVED). Four-entry register confirmed. |
| FINDING 26-02 | 87% / 14% | Surveyed men requiring a partner who "takes care of herself" / who remembered when they last washed their towel. | Runtime 26-01, APPROVED |
| FINDING 26-03 | 9 of 10 | Women who correctly identified which volunteer had showered. The tenth asked to leave the study. | Runtime 26-02, APPROVED |
| FINDING 26-04 | 4.7 years | Average age of a loofah in male ownership. Some are load-bearing. | Runtime 26-05, APPROVED |

Dropped: runtime 26-03 (0% soap, unsupported 1983 date). The home Finding takes the label FINDING 26-01. Methodology note is the APPROVED runtime subnote: "Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it." Row dispositions and dates are DRAFT for the copy lane.

**Approved direction: one monument, then the record.**

1. **Opening field, ivory.** `73%` in Mirk Slab 900, ink navy, flush left, owning roughly two-thirds of the viewport height. One hard ink rule beneath. Under the rule: FINDING 26-01 in Catesque notation, the conclusion in MORVI at statement scale, the support sentence in Proda Sans, the disposition in Catesque caps. Mirk Slab's first and only appearance on the route.
2. **The interruption.** The methodology note is the single permitted interruption: a ruled marginal panel overlapping the rule beneath the figure on desktop, pushing into the figure's field. On phones it follows the disposition as a ruled block.
3. **The register, white field.** Findings 26-02 through 26-04 as one real HTML table with caption: label, figure, finding. Figures in Catesque with `tnum`, `zero`, `case`, right-aligned. Civic hairlines between rows; no zebra, no cards. Narrow screens recompose the table into labeled records with the label as heading.
4. **Continuation, ivory.** Two ruled actions from the home component: "Read Recovery Stories" primary, "Take the Pledge · Form CW-1" secondary. One "Send this to someone" copy-link control per the home refer pattern, confirming inline as text.

**Focal moment.** A page that is two-thirds a single number, then reading down to find the number has a file label and a disposition.

**Scope and boundaries.** Production-ready single route at `src/pages/findings.astro`; existing nav, utility bar, footer, and rule components; copy under a `findings` export in `src/content/copy.ts`. Untouched: home, locked families, register year. Anti-goals: no dashboard, stat cards, sparkline, annual-report block, or bar chart; no paper texture, stamps, or form-number decoration; no Office citation anywhere on the route (the single neutral citation is saved for About); no photography. CW-G08 not required.

**States and ranges.** Register holds three to twelve rows before the design must change. Table figures span one to nine characters. Lead figure must survive five characters at monumental scale. No empty state at launch; a one-row roster omits the register section rather than rendering it empty.

**Interaction and layout.** Hierarchy: figure, rule, label, conclusion, support, disposition, note, register, actions. Motion inherits the home's scroll reveals: figure settles first, rule draws in, text rises in stagger; reduced motion removes movement, keeps state. Keyboard order follows reading order; the table carries a caption and scoped headers.

**Constraints and open decisions.** WCAG 2.2 AA; figure and table stay live text and zoom-safe. The monumental figure scale is a new CW-D01 proposal (roughly 40–50vw desktop, clamped) marked PROPOSED in tokens. Row disposition/date lines and any rewording of the moved home statement go to the copy lane before launch. Whether Recovery Stories renumbers against this register is out of scope.
