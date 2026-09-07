# CWAAA extraction migration manifest

**Purpose:** preserve CWAAA material while moving it out of the combined Got Soap? runtime.
**Rule:** copy and verify first; delete from Got Soap? only after the standalone replacement works.

## Shared-canon transfer record

- **Contract identity:** `gotsoap-world-canon.v1`
- **Version:** 1 (contract version 1)
- **Upstream repository:** `https://github.com/machsheltie/Gotsoap-.git`
- **Upstream path:** `docs/world/`
- **Source commit:** record the full upstream commit when extraction occurs; do not replace this field
  with a permanent hash in source content.

The extracted shared-world copy is a subordinate snapshot. Before every release, compare the recorded
source commit/version with upstream. If upstream shared canon changed, resync the complete dependency
closure from one commit, rerun authority/hash/parity verification, and update the transfer record.

Copy and verify this exact dependency closure:

- `docs/world/README.md`;
- `docs/world/WORLD-BIBLE.md`;
- `docs/world/artifact-continuity.md`;
- relevant artifact authority and source:
  `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md` and its canonical PDF; and
- every shared contract consumed: `docs/contracts/pledge.v1.json`, with the portable
  `cwaaa/docs/contracts/pledge.v1.json` copy remaining byte-identical.

Copied files remain under `docs/world/` beside the extracted package. Do not duplicate their authority
inside `cwaaa/docs/`.

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

### Form CW-1 and email

The current combined copy includes language that says Form CW-1 is filed or fulfilled by the Office
of Lather Compliance and promises recurring “Movement Updates,” posters, bulletins, and findings.
That recurring copy is a required migration/copy-lane correction, not canon to preserve verbatim; do
not edit `site/src` in this documentation pass.

In the approved target, CWAAA owns and files the pledge. CWAAA authors fulfillment for both public pledge presentations. Consent discloses exactly two messages: the immediate receipt and one separately
delivered current issue. The receipt provides pre-issue consent withdrawal; the current issue has a
functioning unsubscribe/suppression mechanism. Withdrawal before send suppresses the issue. Future
programs require separate approval, contract, and consent and do not alter Form CW-1. Pledge and email
values stay out of analytics; retain only minimum Buttondown data needed for fulfillment and
suppression.

### Sniff Test

Current runtime copy says the Sniff Test is administered by “CWAAA field assessors.” That line is a
required migration/copy-lane correction: target ownership is Got Soap?. Correct it later through the
approved copy protocol; do not edit `site/src` in this documentation pass.

Historical copy decks remain provenance only for these fields and do not override this target.

## Extraction sequence

1. Create the CWAAA repository/site from this portable package and copy the referenced shared world
   dependency closure from one upstream commit; record that commit and contract version.
2. Copy—not move—CWAAA records, content, components, and assets; verify every recovery record reads
   as a participant advocacy file before deleting any combined-site material.
3. Establish CWAAA content and external-link config modules, preserving neutral Office citations and
   the external link without claiming affiliation.
4. Implement and test the two preserved pledge presentations against the shared Buttondown audience.
5. Implement conditional links to Got Soap? and the Office.
6. Implement the finite email relationship, consent disclosure, receipt withdrawal path, pre-send
   suppression check, current-issue unsubscribe, minimal retention, and no-third-message provider
   configuration from the pledge contract.
7. Run visual, copy, accessibility, link, form, current-issue-dating, consent, suppression,
   unsubscribe, analytics-exclusion, and authority tests on CWAAA.
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
- CWAAA authors both delivered messages from either presentation; provider defaults add no third
  message.
- The immediate receipt and one current issue work with displayed month-and-year dating derived at
  signup or send time, without monthly maintenance.
- Withdrawing before the delayed issue suppresses it; the issue's unsubscribe works; pledge/email
  values do not enter analytics; retained Buttondown data is limited to fulfillment and suppression.
- The shared-canon source commit/version matches upstream, or the whole closure was resynced and
  reverified before release.
- Sniff Test remains on Got Soap?.
- Office URL leaves CWAAA and reaches only an Office error state.
- Office citations remain neutral, the external link is preserved, and no Office language is
  attributed to CWAAA.
- Recovery records remain participant advocacy files, never police evidence or enforcement files.
- The IVR source remains in shared world authority; CWAAA web copy treats it only as a controlled
  transmedia exception, never as ordinary nonprofit voice.
- Old combined URLs have intentional redirects or owner-approved retirement.
