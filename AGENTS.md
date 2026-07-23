# Got Soap? repository instructions

## What is true now

This repository contains a working Astro site in `site/`, not an empty pre-build project.
The current runtime is a transitional combined site: Got Soap? campaign pages and CWAAA-authored
pages still ship together. `specs.md` describes that implemented runtime. The approved target
architecture separates three fictional institutions:

| System | Job | Public character | Target documentation |
|---|---|---|---|
| **Got Soap?** | campaigns | glossy, thirsty, confrontational | `docs/design.md`, `docs/prd/PRD-gotsoap-web-v1.md` |
| **CWAAA** | advocates and files | credible nonprofit, procedural and competent | `docs/cwaaa/` |
| **Office of Lather Compliance** | regulates | unreadable authority expressed only through custom error states | `docs/office-of-lather-compliance/` |

CWAAA may link to the Office. It never contains, operates, or impersonates the Office. The Office's
jurisdiction is deliberately unspecified.

## Read in this order

1. `docs/HANDOFF.md` — authority map and transition status.
2. `specs.md` — current combined runtime contract.
3. The target package for the system being changed.
4. `site/src/content/copy.ts` and the applicable copy protocol before copy work.

Historical plans are evidence, not live authority, when `docs/HANDOFF.md` marks them superseded.

## Non-negotiable campaign rules

- The website is the campaign, not a portfolio wrapper. The Hope2 Studio reveal is a late
  post-credits beat.
- Never alter or re-typeset text baked into the five canonical posters.
- Do not default to a centered hero CTA, three equal feature cards, a static poster grid, generic
  dark luxury, rounded dashboard panels, or polite nonprofit minimalism.
- “Editorial brutalism” governs composition: scale jumps, cuts, collisions, hard rules, and
  asymmetric pacing. It does not authorize a grey concrete skin or generic neo-brutalist UI.
- Campaign surfaces feel like fragrance advertising with PSA conviction: polished bodies, steam,
  chrome, tile, smoke, amber, and unapologetic display type.
- Keep the Sniff Test in Got Soap?.
- Keep the Lather Pledge in both Got Soap? and CWAAA. Both implementations use the exact portable
  contract in `docs/contracts/pledge.v1.json`; the CWAAA copy is byte-for-byte equivalent at
  `docs/cwaaa/contracts/pledge.v1.json`.
- Got Soap?'s pledge success path ends with a “Want to Learn More?” seam to CWAAA.
- One Buttondown audience serves both pledge forms. Do not reintroduce Netlify Forms.

## System boundaries

- Got Soap? may tease CWAAA at designed seams. It does not become an annual report.
- CWAAA is a credible advocacy nonprofit. It may publish findings, receive pledges, maintain case
  files, and link to the Office.
- The Office has no normal homepage, navigation, about page, agency explainer, searchable records,
  or usable public service. Every public route resolves to one of the specified custom error states.
- Office repeat recognition is browser-local only. Never use IP addresses, fingerprinting,
  authentication, or a server-side identity record for the gag.
- Cross-domain URLs live in configuration and remain empty until the owner assigns real domains.

## Source and asset rules

- Poster truth wins over prose when they conflict.
- `promo.txt` is campaign/process source material. Do not rewrite it as a web spec.
- Do not read, parse, move, or stage `.abr` files. Avoid moving PSDs and other large OneDrive assets.
- Ship optimized AVIF/WebP derivatives, not original poster JPGs.
- Preserve Freepik attribution and license constraints.
- Campaign web fonts: Oswald, Jost, Libre Franklin, Montserrat.
- CWAAA web font: PT Serif with the nonprofit package's supporting roles.
- Office type and visual rules are isolated in its own design package.

## Implementation and verification

- Work in `site/` for runtime code. Keep content in the single content/config modules already used by
  the site.
- Do not move CWAAA runtime code during documentation-only split work. Follow the migration manifest
  when extraction is explicitly authorized.
- Before completion, run from `site/`:
  `npm run build`, `npm run gates`, `npm run copy-gates`, `npm run fidelity`,
  `npm run distinguish`, and `npm run authority`.
- Fresh results are required. A green build does not imply green copy or authority gates.
- Check the Git root before staging. Never use `git add -A` around the design-source tree.
