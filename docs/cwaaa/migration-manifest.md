# CWAAA extraction migration manifest

**Purpose:** preserve CWAAA material while moving it out of the combined Got Soap? runtime.
**Rule:** copy and verify first; delete from Got Soap? only after the standalone replacement works.

## Current-state inventory

Likely CWAAA-owned implementation material currently lives in:

- `site/src/pages/crisis.astro`
- `site/src/pages/pledge.astro` (shared-functionality source, not exclusive ownership)
- CWAAA portions of `site/src/content/copy.ts`
- CWAAA components, seal, ribbon, form, finding, recovery-record, and document styles under `site/src/`
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
| Shared pledge contract and field semantics | byte-identical in both sites; Got Soap? keeps its campaign presentation and CWAAA keeps its nonprofit presentation |
| CWAAA findings, founding account, chapters, ribbon program | moves to CWAAA |
| Recovery records as participant advocacy files, not enforcement files | moves to CWAAA |
| CWAAA seal/ribbon master assets | moves to CWAAA; campaign may keep optimized seam assets |
| Long-form nonprofit/about material | moves to CWAAA |
| Office containment, IVR source, and repeat-access material | stays in shared world authority and Office package/site, never CWAAA |
| Hope2 Studio creator reveal | stays Got Soap? |

## Known copy correction

The current combined copy includes language that says Form CW-1 is filed by the Office of Lather
Compliance. In the approved target model, CWAAA owns and files its pledge. The Office is separate and
exposes only custom error states. Treat those current lines as migration defects requiring the copy
protocol, not as canon to preserve verbatim.

## Extraction sequence

1. Create the CWAAA repository/site from this portable package and copy the referenced shared world
   authority needed for cross-system seams.
2. Copy—not move—CWAAA records, content, components, and assets; verify every recovery record reads
   as a participant advocacy file before deleting any combined-site material.
3. Establish CWAAA content and external-link config modules, preserving neutral Office citations and
   the external link without claiming affiliation.
4. Implement and test the two preserved pledge presentations against the shared Buttondown audience.
5. Implement conditional links to Got Soap? and the Office.
6. Implement the finite email relationship: immediate receipt plus one evergreen current issue whose
   displayed date derives from signup or send time.
7. Run visual, copy, accessibility, link, form, and current-issue-dating tests on CWAAA.
8. Configure the real CWAAA URL.
9. Update Got Soap? seams and verify cross-domain behavior.
10. Approve redirects from former combined routes.
11. Only then remove duplicated long-form CWAAA runtime material from Got Soap?.

## Verification checklist

- No `.abr`, PSD, unlicensed texture pack, or unrelated campaign source is copied.
- Every migrated asset has an origin and license note.
- Both pledge presentations remain available, and pledge JSON is byte-for-byte identical in both
  packages.
- Buttondown receives test submissions from both editions without list duplication.
- The immediate receipt and one current issue work with displayed month-and-year dating derived at
  signup or send time, without monthly maintenance.
- Sniff Test remains on Got Soap?.
- Office URL leaves CWAAA and reaches only an Office error state.
- Office citations remain neutral, the external link is preserved, and no Office language is
  attributed to CWAAA.
- Recovery records remain participant advocacy files, never police evidence or enforcement files.
- The IVR source remains in shared world authority; CWAAA web copy treats it only as a controlled
  transmedia exception, never as ordinary nonprofit voice.
- Old combined URLs have intentional redirects or owner-approved retirement.
