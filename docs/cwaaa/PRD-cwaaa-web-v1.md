# Product requirements — CWAAA standalone site

**Status:** extraction-ready target specification
**World authority:** `world-bible.md`
**Design authority:** `design.md`

## Product

CWAAA is a credible fictional advocacy nonprofit that turns the campaign's joke into organized
participation, findings, recovery stories, and a real email relationship. It links back to Got Soap?
and outward to the separate Office of Lather Compliance.

## Goals

- Make CWAAA believable as a competent nonprofit.
- Preserve and deepen existing CWAAA material instead of deleting it from Got Soap?.
- Host the canonical nonprofit edition of Form CW-1.
- Make findings and recovery case files useful shareable artifacts.
- Create a subtle path to the Office without claiming ownership of it.

## Required routes

| Route | Requirement |
|---|---|
| `/` | mission, one finding, one program, current action |
| `/findings` | numbered State of Male Hygiene record |
| `/case-files` | index of recovery cases |
| `/case-files/[id]` | testimony, status, next action |
| `/tie-one-on` | washcloth-ribbon program |
| `/pledge` | Form CW-1 |
| `/about` | founding account, chapters, fiction/legal disclosure |
| `/404` | CWAAA missing-record notice, not an Office denial |

Route names may change during standalone implementation if redirects and content ownership remain
clear.

## Pledge

- Implement `contracts/pledge.v1.json`.
- Submit to the same Buttondown audience as Got Soap?.
- Preserve accessible validation, consent, honeypot, error, and `SWORN` success behavior.
- CWAAA owns the program; the duplicate public form is an intentional campaign distribution point,
  not a second list.
- Do not say the Office receives, files, or stores subscriber data.

## Cross-site relationships

- `GOT_SOAP_SITE_URL` and `OFFICE_SITE_URL` are centralized optional configuration.
- Empty values render no dead controls.
- Got Soap? link can be prominent in campaign-credit context.
- Office link is a restrained external-authority reference.
- All external links clearly signal the domain transition.

## Content

- Migrate approved CWAAA copy from `site/src/content/copy.ts` using `migration-manifest.md`.
- Apply the existing copy protocol before edits.
- Move Office-authored lines out of CWAAA copy. In particular, current language claiming the Office
  files Form CW-1 is target-state incorrect.
- Maintain fictional/satirical disclosure without breaking the page's voice.

## Technical baseline

- Portable static-site implementation; Astro is preferred for compatibility but not mandated until
  extraction begins.
- Netlify-compatible deployment.
- One content module and one external-link config.
- Responsive images and self-hosted fonts.
- GoatCounter or equivalent privacy-conscious analytics.
- No user accounts or backend personal profiles.

## Accessibility and privacy

- WCAG 2.2 AA.
- Keyboard-complete forms and record navigation.
- Do not send pledge field values to analytics.
- Do not present fictional case files as real allegations.
- Do not use IP addresses, fingerprinting, or Office-style recognition.

## Acceptance

- The site is visually and verbally distinct from Got Soap? and the Office.
- CWAAA is unmistakably a nonprofit, not a regulator.
- All required material survives extraction.
- Both pledge contracts are structurally identical and submit to one audience.
- Cross-site links are conditional and correctly attributed.
- No Office containment/error copy appears as CWAAA authorship.
- Build, link, accessibility, content, and authority checks pass.
