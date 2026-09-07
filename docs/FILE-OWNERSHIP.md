# File ownership and organization review

The three entities have separate working folders. Their plans agree on the main boundary: Got Soap? campaigns, CWAAA advocates, and the Office regulates through error states. Current implementation remains transitional.

## Assignment

| Material | Location and owner |
|---|---|
| Campaign design, PRD, typography, assets briefs, research, build reports, campaign copy and dated implementation plans | `gotsoap/docs/` |
| Campaign source descriptions | `gotsoap/sources/` |
| CWAAA world, design, PRD, UI, font brief, contract, extraction roadmap, crisis reviews, and CWAAA-authored citation proposals | `cwaaa/docs/` |
| Existing CWAAA font assets | `cwaaa/public/`, preserved in place |
| Office world, design, PRD, UI, design record, and state contract | `office-of-lather-compliance/docs/` |
| Entity tasks extracted from coordinated plans | Each entity's `plans/`; reading aids with links to the shared originals |
| Canon, IVR, shared pledge, coordinated revisions | `docs/world/`, `docs/contracts/`, `docs/superpowers/` |
| Three immutable combined-copy proof artifacts | `docs/copy/`; linked from the entity plan indexes |
| Mixed development transcripts | `docs/history/`; provenance only |
| Current combined Astro application, optimized assets, fonts, tests, and reports | `site/`; preserve current paths until runtime extraction |
| Current runtime contract and deployment configuration | Root `specs.md` and `netlify.toml` |
| Product/design routing records | Root `PRODUCT.md` and `DESIGN.md`; shared context, not one merged visual system |
| Agent tools, skills, writing agents, bootstrap references, and workflow drafts | Root hidden tool folders, `agents/`, `bootstrap/`, `drafts/`, `docs/architecture.md`, and `docs/research/`; shared authoring infrastructure |
| Original poster JPGs, Photoshop masters, root screenshots, and licensed texture/resource packs | Root source library, preserved in place; campaign/source evidence, not standalone application files |
| Retired prototype | `got-soap-campaign-site/`; reference-only, kept under its existing ignore rule |
| Unclassified source document and temporary work | Root source document and `tmp/`; preserve until content ownership is established |

Do not move or parse brush files. Do not move large OneDrive/Photoshop sources just to make the tree tidy. Original images retain the existing root-anchored Git exclusions; resource packs keep their licenses beside them. No assets are staged by this organization pass.

## Plan review findings

- Got Soap? has a working campaign runtime; its approved target removes long-form nonprofit content while preserving the Sniff Test and campaign pledge.
- CWAAA has an extraction-ready PRD and migration manifest, plus prepared font assets. The existing `/crisis` route is not a standalone CWAAA implementation.
- The Office has a specified error-only experience and exact browser-local state contract, but no implemented site.
- July 23 and July 28 plans contain coordinated work for all three systems. Their entity tasks are made available locally without promoting duplicate authority.
- July 30 citation-path proposals use CWAAA authorship at the Sniff Test door. This conflicts with higher-authority campaign ownership language; keep them as proposals and resolve through the copy lane before implementation.
- CWAAA font briefs and candidate binaries do not establish owner approval of a final type system. Follow its local authority and recorded owner decisions.
- Dated build reports and prior campaign architecture plans remain provenance. They do not override the target packages or authorize old publication instructions.

## Traceability

[organization-manifest.json](organization-manifest.json) records every old path, new path, and original SHA-256. Contracts and relocated binary evidence retain their original bytes. Documentation edits in this pass update references and entry points; they do not change approved public copy or world facts.

## Verification recorded 2026-09-07

- 196 relocated files: all destinations exist; relocated images, source transcripts, and JSON contracts preserve their original SHA-256.
- Markdown links in the entity packages and editable shared documentation resolve. The three frozen proof files preserve their bytes; their historical references use the relocation manifest.
- Build passes: 22 pages.
- Font audit passes with 0 errors; reports 7 restricted fonts and 19 unassigned files. This organization does not approve those fonts.
- Runtime gates: 21/21. Copy gates: 7/7. Authoritative fidelity: 55/55. Distinguishability: pass.
- Authority check: pass. Authority regression suite: 419/419 pass after updating the full paths and suffix rules.
- Runtime source and locked proof documents are unchanged. No deployment was performed by this documentation reorganization.
