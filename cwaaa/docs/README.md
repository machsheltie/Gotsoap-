# CWAAA portable site package

This folder is designed to be copied into CWAAA's future standalone site repository.

CWAAA—Concerned Women Against Axe Abuse—is a credible fictional advocacy nonprofit. It advocates,
documents, publishes findings, maintains participant advocacy files, and receives the Lather Pledge.
It is not a government body.

Private production canon identifies the Office of Lather Compliance as a legally separate fictional
government agency. That legal fact does not prove operational separation to the audience. CWAAA may
link to the Office as an unexplained external authority. The PUBLIC SITE PRESENTS ONLY CWAAA
AUTHORSHIP on ordinary nonprofit pages, never claims regulatory power, and never explains whether
the Office acts through CWAAA. The canonical IVR remains the controlled exception: two presented
voices, no audible transfer, and intentionally unresolved authorship.

## Package contents

- `design.md` — CWAAA visual and interaction system, including participant-advocacy record treatment
  and neutral Office citations.
- `PRD-cwaaa-web-v1.md` — standalone product requirements, including the finite email contract:
  immediate pledge receipt plus one current-issue newsletter.
- `world-bible.md` — expanded canonical identity, psychology, records, physical-space, telephone,
  email, event, and Office-reference boundaries.
- `migration-manifest.md` — what to copy, adapt, leave, and verify during extraction.
- `contracts/pledge.v1.json` — byte-for-byte portable copy of the shared pledge contract.

## Portability rule

The package must remain intelligible without Got Soap?'s root documentation. Relative references
inside this folder resolve within the package unless explicitly labeled as current-repository
migration evidence. The world bible deliberately references shared master canon instead of duplicating
it inside this package.

## Shared-canon synchronization contract

- **Contract identity:** `gotsoap-world-canon.v1`
- **Version:** 1 (contract version 1)
- **Upstream repository:** `https://github.com/machsheltie/Gotsoap-.git`
- **Upstream path:** `docs/world/`
- **Source commit:** record the full upstream commit at extraction time; this field is intentionally
  not assigned permanently in source content.

The extracted `docs/world/` copy is a subordinate snapshot, not duplicate authority. Before release,
compare its recorded source commit and version with upstream. If shared canon changed, resync the
entire dependency closure from one upstream commit, rerun authority/hash/parity checks, and update the
recorded source commit.

The exact CWAAA dependency closure is:

- `docs/world/README.md`;
- `docs/world/WORLD-BIBLE.md`;
- `docs/world/artifact-continuity.md`;
- the relevant artifact authority and source:
  `docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md` and the canonical PDF beside it; and
- every shared contract consumed: `docs/contracts/pledge.v1.json`, with
  `cwaaa/docs/contracts/pledge.v1.json` remaining byte-identical.
