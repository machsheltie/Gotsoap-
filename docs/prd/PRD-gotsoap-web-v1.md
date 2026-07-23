# Product requirements — Got Soap? campaign site

**Version:** 2.0 target split
**Status:** implementation-ready product authority for the campaign site
**Current runtime reference:** `../../specs.md`
**Design authority:** `../design.md`

## 1. Product definition

Got Soap? is a satirical hygiene-PSA campaign parodying the cultural grammar of “Got Milk?” through
fragrance-ad heat, sincere public-service conviction, and shareable participation. The site is the
primary campaign experience and a late-reveal portfolio proof for Stacey M. Breckel / Hope2 Studio.

This PRD governs the campaign site after CWAAA material is extracted. It does not govern the CWAAA or
Office of Lather Compliance sites.

## 2. Architecture status

The current Astro build is combined. The approved target separates:

- **Got Soap? campaigns;**
- **CWAAA advocates and files;**
- **Office of Lather Compliance regulates.**

This document defines target behavior. Runtime relocation is a separate implementation phase using
`../cwaaa/migration-manifest.md`.

## 3. Goals and success

### Goals

- Make the website feel like a live campaign, not a gallery or case-study shell.
- Give all five canonical posters distinct, portfolio-grade staging.
- Drive completion and sharing of the Sniff Test.
- Convert visitors through the Lather Pledge.
- Hand interested visitors to CWAAA without collapsing the two identities.
- Reveal Hope2 Studio late enough that the fiction retains its force.

### Product indicators

- Sniff Test start, completion, verdict share/copy events.
- Pledge form start, validation failure, successful Buttondown submission.
- Poster download and share events.
- Cross-site CWAAA seam clicks.
- About/creator reveal reach.

GoatCounter remains the privacy-conscious analytics provider unless separately changed.

## 4. Audiences

| Audience | Need |
|---|---|
| Women sharing the campaign | a sharp joke, language for the problem, and a participation loop |
| Men receiving the campaign | direct address that remains funny rather than punitive |
| Creative clients | evidence of concept, art direction, systems thinking, copy control, and execution |
| Campaign fans | posters, verdicts, downloads, share assets, and a world beyond one page |

## 5. Route ownership

| Route | Purpose | Target owner |
|---|---|---|
| `/` | campaign recruitment and controlled escalation | Got Soap? |
| `/psas` | broadcast index, not gallery grid | Got Soap? |
| `/psas/[slug]` | canonical poster, spot staging, download/share | Got Soap? |
| `/sniff-test` | quiz interaction | Got Soap? |
| `/sniff-test/[verdict]` | shareable verdict, no numeric score | Got Soap? |
| `/pledge` | campaign edition of shared pledge | Got Soap? |
| `/about` | late creative reveal | Got Soap? / Hope2 Studio |
| `/404` | missing broadcast | Got Soap? |

The target campaign site does not own `/crisis`, CWAAA case-file archives, nonprofit history, Office
states, or a government-agency explainer.

## 6. Core requirements

### 6.1 Home

- Use the owner-produced widescreen, text-free hero when available; use a dimensionally accurate
  placeholder without blocking implementation.
- Auto-clear steam in roughly two seconds. No drag-to-wipe.
- Render live HTML type; do not replace the hero with a poster crop carrying baked-in web copy.
- Give Unholy flagship emphasis in the campaign sequence.
- Invite the Sniff Test and pledge without a feature-card row.
- Show one compact CWAAA sponsor seam whose link is conditional on configured URL.
- Keep the creator/portfolio explanation out of the opening experience.

### 6.2 PSA broadcast

- Preserve all five poster images and their baked-in typography.
- Generate responsive AVIF/WebP derivatives; keep originals available only as intentional downloads.
- Give each spot distinct staging as required by `design.md`.
- Support direct, stable URLs for each spot.
- Provide download and share/copy-link actions with honest labels.
- Do not use a carousel as the only way to access posters.

### 6.3 Sniff Test

- Remains entirely on Got Soap?.
- One question per step with keyboard-operable answer controls and announced progress.
- Persist only the minimum state required to complete the current attempt.
- Provide static, shareable verdict URLs.
- Never show a numeric score.
- Provide a reduced-motion and JavaScript-light fallback.
- Track start, answer progression, completion, share, and copy-link events without storing answers as
  personal profiles.

### 6.4 Lather Pledge

- Exists on Got Soap? and CWAAA.
- Both editions implement `../contracts/pledge.v1.json` exactly.
- Both submit to one Buttondown audience.
- Required visible fields: first name, email, affirmative consent.
- Include an off-screen honeypot where supported.
- Do not log field values to analytics.
- Show adjacent, accessible validation errors and preserve entered non-sensitive values after a
  correctable failure.
- Success semantic is `SWORN`.
- Got Soap? success sequence includes share/copy actions followed by **“Want to Learn More?”** linking
  to CWAAA.
- If `CWAAA_SITE_URL` is empty, omit that cross-site control rather than rendering a dead link.

### 6.5 About

- Remain in campaign frame through the opening.
- Reveal Stacey M. Breckel / Hope2 Studio after the fiction has paid off.
- Link the Behance case study from the creator section.
- Avoid a generic services grid, résumé block, process timeline, or early pitch-deck summary.

### 6.6 Error handling

- Campaign 404 uses missing-broadcast language and campaign styling.
- Buttondown/network failure provides a retry path without false success.
- Missing poster derivatives fall back to a valid canonical image.
- No campaign error state imitates the Office's denial-state system.

## 7. Content and voice

- `site/src/content/copy.ts` remains the implemented copy source until extraction changes it.
- Poster image text is immutable and outranks conflicting prose.
- New campaign copy follows `COPY-PROTOCOL.md`, `CAMPAIGN-INTENT.md`, and current copy decisions.
- Campaign subheads open with “Because…” where the established anatomy calls for it.
- Calls to movement may open with “Join the movement.”
- Hashtag stack: `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`.
- Do not invent CWAAA findings or Office policy on campaign pages.

## 8. Configuration

All external addresses live in one configuration module and render only when non-empty:

- `SITE_URL`
- `CWAAA_SITE_URL`
- `BEHANCE_URL`
- optional social URLs
- Buttondown publication/audience identifier

The Office URL does not belong in campaign navigation. If a later campaign seam needs it, that
requires an explicit product decision.

## 9. Technical requirements

- Astro static output with vanilla TypeScript islands.
- Netlify hosting.
- Self-hosted fonts.
- One canonical URL builder from `SITE_URL`.
- Sitemap, robots, canonical tags, Open Graph and social images.
- No client framework added without demonstrated need.
- No backend identity store for quiz or pledge.
- Content and site config remain centralized.

## 10. Accessibility, privacy, and performance

- WCAG 2.2 AA target.
- Keyboard-complete navigation, Sniff Test, form, sharing, and scratch gag.
- Visible focus, semantic landmarks, useful labels, live regions for async results.
- Respect reduced motion and high-contrast user preferences.
- No fingerprinting or invasive analytics.
- Responsive image `srcset`, explicit dimensions, and modern formats.
- Performance budgets at production review:
  - initial JS target under 100 KB compressed;
  - LCP target under 2.5 seconds on a representative mobile connection;
  - CLS target under 0.1;
  - no unbounded autoplay video.

## 11. Extraction dependencies

Before deleting combined-site CWAAA routes:

1. CWAAA site implements its PRD and pledge contract.
2. Cross-site URL is owner-configured.
3. Relevant copy/assets are copied and verified using the migration manifest.
4. Campaign references resolve externally or are removed by explicit decision.
5. Both pledge implementations pass contract parity and live submission tests.
6. Redirects for any retired campaign-hosted CWAAA URLs are approved.

## 12. Out of scope

- Building or operating the Office site.
- Moving runtime files during this documentation phase.
- Accounts, profiles, leaderboards, numeric smell scores.
- Ecommerce checkout.
- A CMS before editing pressure proves one is needed.
- Re-typesetting canonical posters.
- A conventional portfolio home or early case-study shell.
- A CWAAA “site within the site” in the target architecture.

## 13. Release acceptance

The target campaign release is ready when:

- required routes build and have stable canonical URLs;
- every canonical poster appears intact and has distinct staging;
- home is recognizably campaign-first and auto-clearing steam works with reduced-motion fallback;
- Sniff Test completes by keyboard and produces no numeric score;
- pledge contract, Buttondown submission, error, and success paths pass;
- configured CWAAA seam works and absent configuration produces no dead control;
- CWAAA long-form material and all Office material are absent;
- copy, fidelity, authority, accessibility, link, build, and design-distinguishability gates pass;
- owner review confirms the result is not centered-hero/card-grid/static-gallery design.
