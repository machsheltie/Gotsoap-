# Got Soap? handoff and authority map

**Status:** current runtime documented; three-system target approved; extraction not yet performed.

## Workspace organization (2026-09-07)

The owner requested separate working folders for the three entities. Their documentation now lives in `gotsoap/`, `cwaaa/`, and `office-of-lather-compliance/`, each with its own Claude instructions and plan index. Shared canon, coordinated plans, and locked combined-runtime proof files remain under `docs/`. This is file organization; the working Astro runtime remains in `site/` and standalone extraction is still pending. See `docs/FILE-OWNERSHIP.md` and `docs/organization-manifest.json`.

Each full design authority now sits directly in its entity workspace: [Got Soap?](../gotsoap/design.md), [CWAAA](../cwaaa/design.md), and [Office](../office-of-lather-compliance/design.md). Supporting UI specifications and structured design records remain in each entity's `docs/`. The root `DESIGN.md` routes to these separate authorities. This relocation preserves the existing design decisions.

## Launch handoff scope (2026-09-07)

The owner requested a completion PRD and graphics checklist for each entity, defining completion as launch-ready sites with explicit notes for later work. The owner also directed Claude to grill them thoroughly about unfinished design/production sections instead of inventing answers. The six handoff files are:

| Entity | Launch execution | Owner graphics |
|---|---|---|
| Got Soap? | [PRD](../gotsoap/PRD-TO-LAUNCH.md) | [Graphics](../gotsoap/GRAPHICS-TO-MAKE.md) |
| CWAAA | [PRD](../cwaaa/PRD-TO-LAUNCH.md) | [Graphics](../cwaaa/GRAPHICS-TO-MAKE.md) |
| Office of Lather Compliance | [PRD](../office-of-lather-compliance/PRD-TO-LAUNCH.md) | [Graphics](../office-of-lather-compliance/GRAPHICS-TO-MAKE.md) |

These are execution handoffs under existing authority. They do not approve unanswered visual decisions or claim that runtime extraction, final artwork, provider configuration, or deployment has occurred. Film and live phone production remain tracked activation work; their unproduced state must not be disguised as a functioning launch feature. No Office on-page graphics are required.

The CWAAA handoff identifies a conflict requiring owner clarification: local August 13/14 UI decisions and the runtime font manifest record six role-specific families, while older root guidance summarizes PT Serif as the CWAAA web font. Preserve the evidence and resolve the wording explicitly; this handoff pass does not silently amend that decision. Got Soap?'s detailed typography/color supplements also resolve some items still labeled pending in its older UI scaffold.

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
| What should Got Soap? become? | `gotsoap/design.md` + `gotsoap/docs/prd/PRD-gotsoap-web-v1.md` |
| What facts, psychology, and voice belong to Got Soap?? | `gotsoap/docs/world-bible.md` |
| What should the CWAAA site become? | `cwaaa/design.md` + `cwaaa/docs/PRD-cwaaa-web-v1.md` |
| What facts and voice belong to CWAAA? | `cwaaa/docs/world-bible.md` |
| What moves when CWAAA is extracted? | `cwaaa/docs/migration-manifest.md` |
| What should the Office become? | `office-of-lather-compliance/design.md` + its PRD |
| What facts, psychology, and voice belong to the Office? | `office-of-lather-compliance/docs/world-bible.md` |
| How does Office return recognition work? | `office-of-lather-compliance/docs/contracts/visit-state.v1.json` |
| What must both pledge forms submit? | `docs/contracts/pledge.v1.json` |
| What copy is implemented today? | `site/src/content/copy.ts` |
| What copy process is binding? | `gotsoap/docs/copy/COPY-PROTOCOL.md`, `gotsoap/docs/copy/CAMPAIGN-INTENT.md`, and the applicable entity copy folder |

## Canon statuses

- **Objective canon:** true within the fictional world.
- **Public claim:** asserted by a fictional author but not independently confirmed.
- **Intentionally unresolved:** a question the project protects from resolution.
- **Historical/inherited copy:** material preserved for provenance but not binding until approved.

## Authority precedence

For current writing decisions, authority runs: **the owner's current explicit instruction →
current owner-ratified canon → surface/register rules → general writing doctrine →
reader/reviewer evidence**. If two genuinely live instructions conflict, identify the conflict and
consequences, recommend a path, and let the owner decide. No agent or review consensus has a private
casting vote. An already settled owner decision is executed.

For repository-wide design and implementation references, the standing seven-level document order is:

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
| Cross-site URLs | CWAAA live at its own origin `https://cwaaa.netlify.app` (see below); others not assigned | real per-entity domains; empty config values until the owner assigns them |

This documentation pass does not move runtime code. Extraction begins only when an implementation
task explicitly authorizes it.

## Owner decision, 2026-09-15 — CWAAA has its own origin

The standalone CWAAA app in `cwaaa/` is deployed as **its own Netlify site** at
`https://cwaaa.netlify.app`, built from `cwaaa/netlify.toml` (base `cwaaa`, publish `dist`, no
functions). This supersedes the interim `/cwaaa` co-hosting decision taken earlier the same day.

- `site/src/config/site.ts` sets `CWAAA_SITE_URL` to that origin; the Got Soap? footer's
  "Funded by …" seam is now a genuine cross-site link, carrying `rel="external noopener"`.
- The interim mount is **retired**: `site/scripts/embed-cwaaa.mjs` is deleted, the
  `embed:cwaaa` script is out of `site/package.json`, and `netlify.toml` builds only the
  campaign. The campaign deployment no longer publishes a copy of CWAAA.
- `/crisis` is untouched and still serves the combined-runtime CWAAA surface.
- The seam itself never changed — only the address it resolves to, exactly as the interim
  decision anticipated.

The remaining CW-D07 work is a real custom domain in place of the Netlify subdomain. The migration
manifest still governs actual runtime extraction; separate deployment is not extraction.

## Owner decision, 2026-09-15 — jurisdictional split and record classes

CWAAA has no regulatory authority. It receives reports, opens participant records, documents
behavior, intervenes, follows up, and publishes de-identified Recovery Stories. The Office audits,
finds, states compliance, and disposes. Most cases begin and end with CWAAA; the escalation threshold
is **resistance, not severity**. Four record classes and their permitted vocabulary are recorded in
`docs/world/WORLD-BIBLE.md`; CWAAA's side, including escalation and return behavior, is in
`cwaaa/docs/world-bible.md`. The rendering law for an embedded external finding is in
`cwaaa/design.md`.

Three consequences that amend previously locked material:

1. **Office surface on ordinary CWAAA routes changes.** The prior rule reserved one sparse citation
   for Findings and the single deep referral for About. A severe Recovery Record may now carry one
   **embedded external finding** — the Office quoted verbatim in its own materials, unexplained and
   unlinked. `cwaaa/PRODUCT.md` is amended accordingly. `/findings` still carries no Office
   reference; About still holds the deep referral. At most two such fragments exist site-wide.
2. **The prohibition on explanation is unchanged and now load-bearing.** The relationship is
   *shown* and never described. No CWAAA surface names the Office as partner, parent, operator,
   division, or coordinator; no page accounts for what happens during an external review.
3. **The IVR escalation mechanic is not canon.** A hotline that quietly routes a caller onward is an
   attractive sketch, but Got Soap? owns the number and placement, and whether a caller is
   transferred — and how much CWAAA leadership knows — remains on the intentionally-unresolved list.
   Recorded as a proposal, not law; the IVR keeps two presented voices and no audible transfer.

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

### 2026-07-29 font-delivery dependency lock

- All Got Soap? runtime fonts load only from `site/public/fonts/` through `/fonts/…` URLs.
- `@fontsource/jost`, `@fontsource/libre-franklin`, `@fontsource/montserrat`,
  `@fontsource/pt-serif`, and `@fontsource/oswald` are removed from the implementation manifest and
  lockfile.
- Always-live gate G19 rejects every `@fontsource/*` dependency, lockfile entry, or source import.
  Reintroduction requires an explicit owner approval recorded here and in
  `gotsoap/docs/font-delivery-spec.md`, plus an owner-approved gate change in the same implementation.

### Legal navigation and disclosure

Privacy, Terms, and DMCA remain globally accessible wherever the site exposes legal navigation.
Their labels and entry points do not announce the fiction. Satire, parody, fictional, spec-work,
and non-affiliation disclosure appears only after the visitor follows the restrained creator credit
through the creator/About seam. No public global satire disclosure is permitted.

## Historical material

`gotsoap/docs/design-v1-sonnet.md`, `gotsoap/docs/design-north-star.md`, and earlier superpowers specs remain useful
decision history. They do not override the target packages above. The archived July 14 architecture
spec predates the three-system split and must not be used to recreate CWAAA as a site-within-a-site.

## Owner decision, 2026-09-15 — Billy Bob RC-064 signed off

The Billy Bob Recovery Record is **owner-approved as
`cwaaa/docs/copy/proposals-2026-09-15-billy-bob-r5.md` (Revision 5, FINAL)**. That file is current
authority for the record's copy; `cwaaa/src/content/copy.ts` must agree with it exactly.

- **RC-064 is the identifier.** RC-090 is a stale model-authored fossil and is retired.
- **Billy Bob does not wash** before Office involvement — no days-off wash, no bounded workday
  exception, no mitigating hygiene. Recorded in
  `cwaaa/docs/canon-billy-bob-and-the-archive-boundary.md` §2 after repeated reintroduction.
- His wife communicated the problem repeatedly and adequately. She is not responsible for his
  refusal; he understands it and rejects the premise.
- **The disposition is withheld and rendered as a redaction bar.** `Disposition: Lather required` had
  no establishable owner provenance for this record and is struck from the surface brief.
- **His age is 37** (owner, 2026-09-16).
- **Deliberately unresolved and to stay TK:** all dates, the follow-up interval, and the Office
  reference number. These are not gaps to be closed by inference.
- CWAAA's epistemic boundary is load-bearing: it states that external review was requested and that
  the case was returned, and never what happened in between.

Revisions 3 and 4 are retained as history. R3's testimony section is struck in place; do not salvage
from it.

## Verification

From `site/`, run:

```text
npm run build
npm run audit:fonts
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
