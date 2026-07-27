# CWAAA portable site package

This folder is designed to be copied into CWAAA's future standalone site repository.

CWAAA—Concerned Women Against Axe Abuse—is a credible fictional advocacy nonprofit. It advocates,
documents, publishes findings, maintains participant advocacy files, and receives the Lather Pledge.
It is not a government body.

The Office of Lather Compliance is a separate fictional government agency. CWAAA may link to the
Office as an external authority. CWAAA does not contain or operate it, staff it, or speak on its
behalf.

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
it; copy the referenced shared world authority alongside this package when extracting a standalone
repository.
