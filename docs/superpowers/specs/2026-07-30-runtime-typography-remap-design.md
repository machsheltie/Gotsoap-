# Runtime typography remap design

**Status:** approved for implementation  
**Date:** 2026-07-30  
**Scope:** the transitional Astro runtime in `site/`

## Outcome

The runtime will stop treating Jost, Libre Franklin, Montserrat, and the old
Fontsource-era family names as generic design primitives. Got Soap? campaign
surfaces will use the fourteen approved production binaries and the role
assignments locked in the typography and font-asset authorities.

CWAAA remains a separate authored system. Its PT Serif files stay available
only to CWAAA-authored routes and do not become part of the fourteen-file Got
Soap? campaign manifest, preload budget, or audit total.

## Runtime family authority

Got Soap? receives five internal family names:

- `Got Soap Oswald`
- `Got Soap Behind The Nineties Sans`
- `Got Soap Moxie`
- `Got Soap Marlin SQ`
- `Got Soap Moanslight`

The existing `PT Serif` name remains CWAAA-only. Each `@font-face` declaration
uses a file from `site/public/fonts`, an exact static weight and style, and
`font-display: swap`. The runtime sets `font-synthesis: none`.

## Role remap

The existing broad family variables are replaced by voice-specific tokens:

| Runtime role | Family and weight |
|---|---|
| hero, route, and identity commands | Got Soap Oswald 600 |
| internal commands | Got Soap Oswald 500 |
| rare flagship command | Got Soap Oswald 700 |
| standard body and direct address | Got Soap Behind The Nineties Sans 500 |
| editorial-major proposition | Got Soap Behind The Nineties Sans 600 |
| confession | Got Soap Behind The Nineties Sans 400, normal or true italic |
| rare editorial display | Got Soap Behind The Nineties Sans 900 |
| intimate interruption | Got Soap Moxie 400 |
| controls and navigation | Got Soap Marlin SQ 500 |
| utility and longer functional text | Got Soap Marlin SQ 400 |
| selected functional emphasis | Got Soap Marlin SQ 700 |
| production notation | Got Soap Moanslight 500 |
| production label or folio | Got Soap Moanslight 600 |

The implementation may preserve temporary compatibility aliases only when
they resolve to a role whose available binary supports every weight and style
used at that call site. Unsupported synthetic weights are a hard failure, so
ambiguous call sites must be reclassified rather than hidden behind an alias.

## Delivery

Campaign routes preload exactly:

1. `oswald-600.woff2`
2. `Behind-The-Nineties-Sans-Md.woff2`
3. `marlin-sans-sq-medium.woff2`

CWAAA routes do not preload those campaign faces. Font declarations alone do
not authorize a file for delivery: the source-policy gate checks each URL
against its system authority, and CSS or preload references to unassigned or
prohibited files fail.

## CWAAA isolation

The combined runtime still contains CWAAA pages, so removing PT Serif from the
repository-wide source policy would silently remap another institution. A
separate CWAAA manifest will authorize the four existing PT Serif binaries for
CWAAA source scope. It will not add them to the Got Soap? campaign audit.

CWAAA font declarations are isolated from Got Soap? declarations and are
loaded only when `register === "cwaaa"`. Campaign and mixed-register pages
continue to use campaign typography unless a component is explicitly a CWAAA
surface under the existing authorship contract.

## Enforcement and proof

Tests are added before implementation for:

- mandatory `font-synthesis: none`;
- exact campaign preload membership;
- system-scoped file authorization;
- rejection of old or unassigned font references.

Completion requires fresh font audit output, generated JSON and Markdown,
repository gates, production build, and route-level browser proof. Browser
proof checks line counts, navigation width, control dimensions, crop safety,
and layout movement on representative campaign and CWAAA routes. Generated
fallback percentages remain candidates until that proof is recorded.

## Dirty-worktree and publishing policy

Only font-authority, audit, runtime typography, generated-report, and approved
design-record files are staged. Existing unrelated changes remain untouched.
The remote font-asset resolution commit is merged without rewriting history.
After verification, the scoped commits are pushed to `origin/main` so the
repository, not the local worktree, becomes the governing authority.
