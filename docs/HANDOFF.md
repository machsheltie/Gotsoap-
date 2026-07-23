# Got Soap? handoff and authority map

**Status:** current runtime documented; three-system target approved; extraction not yet performed.

## The one-minute orientation

The Astro build in `site/` currently contains campaign, CWAAA, and pledge material in one deployable
site. That is current-state truth, not the final information architecture. The target is three
distinct fictional systems:

1. **Got Soap? campaigns.**
2. **CWAAA advocates and files.**
3. **The Office of Lather Compliance regulates.**

CWAAA links to the Office. It neither contains nor operates it. The Office's jurisdiction is
deliberately unspecified, and its public site consists exclusively of custom error states.

## Authority by question

| Question | Read this |
|---|---|
| What does the current combined build render? | `specs.md` |
| What should Got Soap? become? | `docs/design.md` + `docs/prd/PRD-gotsoap-web-v1.md` |
| What should the CWAAA site become? | `docs/cwaaa/design.md` + `docs/cwaaa/PRD-cwaaa-web-v1.md` |
| What facts and voice belong to CWAAA? | `docs/cwaaa/world-bible.md` |
| What moves when CWAAA is extracted? | `docs/cwaaa/migration-manifest.md` |
| What should the Office become? | `docs/office-of-lather-compliance/design.md` + its PRD |
| How does Office return recognition work? | `docs/office-of-lather-compliance/contracts/visit-state.v1.json` |
| What must both pledge forms submit? | `docs/contracts/pledge.v1.json` |
| What copy is implemented today? | `site/src/content/copy.ts` |
| What copy process is binding? | `COPY-PROTOCOL.md`, `CAMPAIGN-INTENT.md`, `docs/copy/` |

## Current state versus target state

| Concern | Current runtime | Approved target |
|---|---|---|
| Campaign | Astro routes in `site/src/pages/` | remains in Got Soap? |
| Sniff Test | Got Soap? route | remains in Got Soap? |
| Lather Pledge | one combined-site route | implemented on Got Soap? and CWAAA |
| CWAAA material | `/crisis`, pledge treatment, seams, components | extracted into a standalone CWAAA site |
| Office | not implemented | separate error-state-only site |
| Email | Buttondown integration | one shared Buttondown audience |
| Cross-site URLs | not assigned | empty config values until owner assigns domains |

This documentation pass does not move runtime code. Extraction begins only when an implementation
task explicitly authorizes it.

## Creative decisions that are closed

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

## Historical material

`docs/design-v1-sonnet.md`, `docs/design-north-star.md`, and earlier superpowers specs remain useful
decision history. They do not override the target packages above. The archived July 14 architecture
spec predates the three-system split and must not be used to recreate CWAAA as a site-within-a-site.

## Verification

From `site/`, run:

```text
npm run build
npm run gates
npm run copy-gates
npm run fidelity
npm run distinguish
npm run authority
```

The authority gate checks portable pledge parity, required package markers, ownership language,
forbidden stale claims, and the Office's error-state-only contract.
