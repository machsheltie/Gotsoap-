# Got Soap? handoff and authority map

**Status:** current runtime documented; three-system target approved; extraction not yet performed.

## The one-minute orientation

The Astro build in `site/` currently contains campaign, CWAAA, and pledge material in one deployable
site. That is current-state truth, not the final information architecture. The target is three
distinct fictional systems:

1. **Got Soap? campaigns.**
2. **CWAAA validates, organizes, and makes its case in public.**
3. **The Office of Lather Compliance regulates.**

Private production canon identifies CWAAA and the Office as legally separate fictional entities.
Their ordinary public/web authorship stays distinct, but no audience-facing artifact proves whether
that legal separation is operationally meaningful. CWAAA links to the Office without explaining the
relationship. The Office's jurisdiction is deliberately unspecified, and its public site consists
exclusively of custom error states. The IVR is the controlled ambiguity exception described below.

## Authority by question

| Question | Read this |
|---|---|
| What cross-system facts, ambiguity, and artifact continuity govern the world? | `docs/world/WORLD-BIBLE.md` + `docs/world/artifact-continuity.md` |
| What does the current combined build render? | `specs.md` |
| What governs the approved 2026-07-28 creative-direction revision? | `docs/superpowers/specs/2026-07-28-creative-direction-revision-design.md` + `docs/superpowers/plans/2026-07-28-creative-direction-revision.md` |
| What should Got Soap? become? | `docs/design.md` + `docs/prd/PRD-gotsoap-web-v1.md` |
| What facts, psychology, and voice belong to Got Soap?? | `docs/gotsoap/world-bible.md` |
| What should the CWAAA site become? | `docs/cwaaa/design.md` + `docs/cwaaa/PRD-cwaaa-web-v1.md` |
| What facts and voice belong to CWAAA? | `docs/cwaaa/world-bible.md` |
| What moves when CWAAA is extracted? | `docs/cwaaa/migration-manifest.md` |
| What should the Office become? | `docs/office-of-lather-compliance/design.md` + its PRD |
| What facts, psychology, and voice belong to the Office? | `docs/office-of-lather-compliance/world-bible.md` |
| How does Office return recognition work? | `docs/office-of-lather-compliance/contracts/visit-state.v1.json` |
| What must both pledge forms submit? | `docs/contracts/pledge.v1.json` |
| What copy is implemented today? | `site/src/content/copy.ts` |
| What copy process is binding? | `COPY-PROTOCOL.md`, `CAMPAIGN-INTENT.md`, `docs/copy/` |

## Canon statuses

- **Objective canon:** true within the fictional world.
- **Public claim:** asserted by a fictional author but not independently confirmed.
- **Intentionally unresolved:** a question the project protects from resolution.
- **Historical/inherited copy:** material preserved for provenance but not binding until approved.

## Authority precedence

The full seven-level authority order is:

1. Owner decisions recorded in `docs/HANDOFF.md`.
2. `docs/world/WORLD-BIBLE.md` for cross-system canon.
3. The relevant per-system world bible.
4. The relevant current design authority and PRD.
5. Shared and per-system machine-readable contracts.
6. Artifact briefs and copy decks.
7. Historical documents, which are context rather than law.

A lower authority may add execution detail but may not contradict a higher authority.

## Current state versus target state

| Concern | Current runtime | Approved target |
|---|---|---|
| Campaign | Astro routes in `site/src/pages/` | remains in Got Soap? |
| Shop | `/shop` and product routes exist | canonical Got Soap? route; unavailable checkout is intentional |
| Campaign film | no `/broadcast` route or home premiere seam | `/broadcast` plus a full-bleed home premiere seam when film is produced |
| Campaign phone | no implemented phone surface | `1-800-GOT-SOAP` owned and presented by Got Soap? |
| Sniff Test | Got Soap? route with stale CWAAA-field-assessor copy | remains Got Soap?; copy corrected later through the copy lane |
| Lather Pledge | one combined-site route | implemented on Got Soap? and CWAAA |
| CWAAA material | `/crisis`, pledge treatment, seams, components | extracted into a standalone CWAAA site |
| Office | not implemented | separate error-state-only site |
| Email | Buttondown integration with stale recurring “Movement Updates” copy | one shared audience and finite CWAAA-authored two-message fulfillment |
| Cross-site URLs | not assigned | empty config values until owner assigns domains |

This documentation pass does not move runtime code. Extraction begins only when an implementation
task explicitly authorizes it.

## Creative decisions that are closed

### 2026-07-28 creative-direction revision

The owner-approved governing specification is
`docs/superpowers/specs/2026-07-28-creative-direction-revision-design.md`; implement it through
`docs/superpowers/plans/2026-07-28-creative-direction-revision.md` and the target packages linked
above. This approval changes target authority, not the current combined runtime described in
`specs.md`.

- **CWAAA: A Coalition Making Its Case in Public.** It is not a paper universe or records-room
  website.
- Public CWAAA navigation uses **Recovery Stories** and **Chapters**.
- **The Office page must appear under-designed.**
- Shop is **a fashion catalogue pretending to be a store**.
- **Privacy**, **Terms**, and **DMCA** remain globally accessible.
- Fiction disclosure belongs behind the **creator/About seam**.
- IVR number/placement owner is Got Soap?; presented authorship crosses Voice A and Voice B;
  **operational owner** and exact handoff remain **intentionally unresolved**.

- The website itself is the campaign; the portfolio explanation arrives late.
- The flagship poster is **Unholy**.
- Hero steam clears itself in roughly two seconds; drag-to-wipe is retired.
- Verdict pages show no numeric score.
- Poster art is immutable.
- “Editorial brutalism” is compositional pressure, not a concrete-grey visual theme.
- CWAAA is a credible nonprofit, not a joke agency and not ugly on purpose.
- The Office is a separate regulator with deliberately unspecified jurisdiction.
- The Office exposes only custom error states.
- Sniff Test remains Got Soap?.
- Lather Pledge exists on both Got Soap? and CWAAA through one shared contract and audience.
- Shop remains canonical; unavailable checkout is the intended faux-store behavior.
- `/broadcast` is the canonical campaign-film route, entered from a full-bleed homepage premiere seam.
- The phone number is owned by Got Soap?; neither CWAAA nor the Office advertises it as a normal
  contact channel.
- The IVR has two presented voices, no third Office voice, and no audible transfer. Its handoff and
  institutional control remain intentionally unresolved.
- The Office has existed since 1961; CWAAA was established in 2024.
- Continued Interest begins on the third distinct browser session and remains in stasis on reload.
- CWAAA authors the immediate receipt and one current issue for both pledge presentations; Form CW-1
  never becomes an ongoing subscription or drip.
- The artifact registry separates **Fictional owner** from **Documentation authority**; this closed
  decision supersedes the older `Actual owner` table header in the approved design spec.

### Legal navigation and disclosure

Privacy, Terms, and DMCA remain globally accessible wherever the site exposes legal navigation.
Their labels and entry points do not announce the fiction. Satire, parody, fictional, spec-work,
and non-affiliation disclosure appears only after the visitor follows the restrained creator credit
through the creator/About seam. No public global satire disclosure is permitted.

## Historical material

`docs/design-v1-sonnet.md`, `docs/design-north-star.md`, and earlier superpowers specs remain useful
decision history. They do not override the target packages above. The archived July 14 architecture
spec predates the three-system split and must not be used to recreate CWAAA as a site-within-a-site.

## Verification

From `site/`, run:

```text
npm run build
npm run authority:test
npm run gates
npm run copy-gates
npm run fidelity
npm run distinguish
npm run authority
```

The authority gate enforces raw-Buffer pledge parity and finite fulfillment structure; the canonical
IVR SHA-256 and protected authority markers; path-aware chronology, role, and unresolved-relationship
rules; the Office's exact storage/privacy/transition/state contract; shared-canon synchronization
markers; and the closed HANDOFF decisions above. Marker presence remains a drift alarm for required
authority sections, not a substitute for the path-aware contradiction checks.
