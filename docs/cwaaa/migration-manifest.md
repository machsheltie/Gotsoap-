# CWAAA extraction migration manifest

**Purpose:** preserve CWAAA material while moving it out of the combined Got Soap? runtime.
**Rule:** copy and verify first; delete from Got Soap? only after the standalone replacement works.

## Current-state inventory

Likely CWAAA-owned implementation material currently lives in:

- `site/src/pages/crisis.astro`
- `site/src/pages/pledge.astro` (shared-functionality source, not exclusive ownership)
- CWAAA portions of `site/src/content/copy.ts`
- CWAAA components, seal, ribbon, form, finding, case-file, and document styles under `site/src/`
- CWAAA image/SVG assets under `site/public/`
- current `/crisis` and pledge metadata, share copy, and tests

The extraction implementer must generate a fresh exact inventory with `rg` before moving files.
Filenames above are entry points, not permission for blind bulk moves.

## Ownership decisions

| Material | Target |
|---|---|
| Sniff Test questions, interaction, verdicts | stays Got Soap? |
| Five PSA posters and spot staging | stays Got Soap? |
| Campaign edition of Lather Pledge | stays Got Soap? |
| Shared pledge semantics | copied identically to both sites |
| CWAAA findings, founding account, chapters, ribbon program | moves to CWAAA |
| Recovery case files | moves to CWAAA |
| CWAAA seal/ribbon master assets | moves to CWAAA; campaign may keep optimized seam assets |
| Long-form nonprofit/about material | moves to CWAAA |
| Office containment and repeat-access material | moves to Office package/site, never CWAAA |
| Hope2 Studio creator reveal | stays Got Soap? |

## Known copy correction

The current combined copy includes language that says Form CW-1 is filed by the Office of Lather
Compliance. In the approved target model, CWAAA owns and files its pledge. The Office is separate and
exposes only custom error states. Treat those current lines as migration defects requiring the copy
protocol, not as canon to preserve verbatim.

## Extraction sequence

1. Create the CWAAA repository/site from this portable package.
2. Copy—not move—owned content, components, and assets.
3. Establish CWAAA content and external-link config modules.
4. Implement and test the pledge contract against the shared Buttondown audience.
5. Implement conditional links to Got Soap? and the Office.
6. Run visual, copy, accessibility, link, and form tests on CWAAA.
7. Configure the real CWAAA URL.
8. Update Got Soap? seams and verify cross-domain behavior.
9. Approve redirects from former combined routes.
10. Only then remove duplicated long-form CWAAA runtime material from Got Soap?.

## Verification checklist

- No `.abr`, PSD, unlicensed texture pack, or unrelated campaign source is copied.
- Every migrated asset has an origin and license note.
- Pledge JSON is structurally identical in both packages.
- Buttondown receives test submissions from both editions without list duplication.
- Sniff Test remains on Got Soap?.
- Office URL leaves CWAAA and reaches only an Office error state.
- No Office language is attributed to CWAAA.
- Old combined URLs have intentional redirects or owner-approved retirement.
