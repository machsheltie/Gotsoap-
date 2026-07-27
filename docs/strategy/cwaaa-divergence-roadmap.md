# CWAAA divergence roadmap

**Status:** architecture approved and documented; runtime extraction not yet performed.

The former “future possibility” is now the target:

- Got Soap? remains the campaign.
- CWAAA becomes a standalone credible advocacy nonprofit.
- The Office of Lather Compliance becomes a separate fictional government agency with deliberately
  unspecified jurisdiction.

The target packages are:

- `../world/` for shared cross-system canon and artifact continuity;
- `../design.md` and `../prd/PRD-gotsoap-web-v1.md` for Got Soap?;
- `../cwaaa/` for CWAAA;
- `../office-of-lather-compliance/` for the Office.

Portable institutional material remains inside its own package: CWAAA under `docs/cwaaa/` and the
Office under `docs/office-of-lather-compliance/`. Shared facts travel by explicit reference from
`docs/world/`; they are not duplicated into either portable package.

## Relationship

Got Soap? links interested visitors to CWAAA. CWAAA may link to the Office. The Office is not a
department, program, or technical service operated by CWAAA.
Intentional uncertainty is not missing documentation. Do not explain the CWAAA/Office relationship,
add a clean handoff, or average their rendered authorship.


The Sniff Test stays on Got Soap?. The Lather Pledge exists on both Got Soap? and CWAAA through one
portable contract and one Buttondown audience.

## Implementation status

The Astro runtime is still combined. Do not delete the current `/crisis`, pledge, findings, case-file,
or CWAAA assets before the standalone nonprofit replacement is built and verified. Follow
`../cwaaa/migration-manifest.md`.

The Office is not implemented. Its entire public site must be the four-state custom error experience;
it gets no normal homepage or agency content.

## Domain status

Final CWAAA and Office addresses remain owner decisions. Cross-site configuration stays empty and
conditional until those addresses exist.
