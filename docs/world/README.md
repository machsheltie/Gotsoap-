# Shared world authority

## Shared authority

`WORLD-BIBLE.md` governs facts crossing two or more systems.
`artifact-continuity.md` governs artifacts crossing media or institutional boundaries.

## Per-system authority

- Got Soap?: `../../gotsoap/docs/world-bible.md`, `../../gotsoap/design.md`, and the campaign PRD.
- CWAAA: `../../cwaaa/docs/`.
- Office: `../../office-of-lather-compliance/docs/`.

## Extraction

CWAAA-specific material remains under `cwaaa/docs/`; Office-specific material remains under
`office-of-lather-compliance/docs/`. Shared facts remain here and travel through this synchronization
contract rather than being restated inside either package.

- **Shared contract identity:** `gotsoap-world-canon.v1`
- **Version:** 1 (contract version 1)
- **Upstream repository:** `https://github.com/machsheltie/Gotsoap-.git`
- **Upstream path:** `docs/world/`
- **Source commit:** the extraction process records the full upstream commit at transfer time; source
  content intentionally carries no permanent current-commit value.

Any extracted `docs/world/` copy is a subordinate snapshot. It may be read locally but never becomes
duplicate authority. Before release, compare its source commit and version with upstream. If the
upstream shared canon changed, resync the complete closure from one upstream commit, rerun authority
and artifact-integrity checks, then update the recorded source commit.

The shared dependency closure is exact, not “copy whatever seems relevant”:

1. `docs/world/README.md`;
2. `docs/world/WORLD-BIBLE.md`;
3. `docs/world/artifact-continuity.md`;
4. each relevant artifact authority and canonical source consumed by the extracted package; and
5. each shared machine-readable contract consumed by that package.

CWAAA's current closure includes the IVR authority/PDF and shared pledge contract. The Office's
current closure includes the IVR authority/PDF; its visit-state contract remains package-local. Each
portable README and migration manifest records its concrete closure and verification command set.

## Canon statuses

- **Objective canon:** true within the fictional world.
- **Public claim:** asserted by a fictional author but not independently confirmed.
- **Intentionally unresolved:** a question the project protects from resolution.
- **Historical/inherited copy:** preserved for provenance but not binding until approved.

## Authority order

1. Owner decisions recorded in `docs/HANDOFF.md`.
2. `docs/world/WORLD-BIBLE.md` for cross-system canon.
3. The relevant per-system world bible.
4. The relevant current design authority and PRD.
5. Shared and per-system machine-readable contracts.
6. Artifact briefs and copy decks.
7. Historical documents, which are context rather than law.

A lower authority may add execution detail but may not contradict a higher authority.
