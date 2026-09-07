# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Women sharing the campaign** — need a sharp joke, language for the problem, and a participation loop worth passing on.
- **Men receiving the campaign** — direct address that stays funny rather than punitive; behavior change through desire, never shame.
- **Creative clients / hiring decision-makers** — evidence of concept, art direction, systems thinking, copy control, and execution from Stacey M. Breckel / Hope2 Studio.
- **Campaign fans** — posters, verdicts, downloads, share assets, and a world that extends beyond one page.

## Product Purpose

Got Soap? is a satirical hygiene-PSA campaign world parodying the cultural grammar of "Got Milk?" through fragrance-ad heat, sincere public-service conviction, and shareable participation. The website is the campaign itself, not a portfolio wrapper; the Hope2 Studio authorship reveal is a late post-credits beat.

The project spans three fictional institutions with deliberately distinct rendered authorship:

1. **Got Soap?** — campaigns (glossy, thirsty, confrontational).
2. **CWAAA** — advocates and files (credible nonprofit, procedural and competent).
3. **Office of Lather Compliance** — regulates (unreadable authority expressed only through custom error states).

**Success:** campaign engagement and hiring proof matter equally, and neither may break the fiction's commitment — the campaign working as a campaign IS the portfolio proof. Fiction integrity gates all conversion decisions. Numeric engagement targets are campaign-cycle planning, not durable product truth, and are tracked outside this record.

## Positioning

A neighboring portfolio site could not truthfully copy this: the product is a complete three-institution fictional world with protected uncertainty as content. Private canon holds CWAAA and the Office as legally separate entities, but no ordinary public artifact proves that separation is operationally meaningful — this ambiguity is a designed feature, never a documentation gap to fix. The campaign changes behavior through erotic aspiration, never health education, humiliation, or shame.

## Operating Context

- Working Astro site in `site/` — a transitional combined runtime (campaign + CWAAA pages together). The approved target separates the three systems into distinct sites; extraction happens only when explicitly authorized via `cwaaa/docs/migration-manifest.md`.
- Authority order is codified in `docs/HANDOFF.md` (owner decisions → `docs/world/WORLD-BIBLE.md` → per-system world bibles → design/PRD packages → contracts → briefs/decks → historical docs).
- Copy lives in `site/src/content/copy.ts`; copy work is governed by `COPY-PROTOCOL.md` and `CAMPAIGN-INTENT.md`.
- Email: one shared Buttondown audience serves both pledge forms; Netlify Forms must not be reintroduced. Fulfillment is a finite CWAAA-authored two-message sequence, never a drip.
- Analytics: GoatCounter (privacy-conscious) unless separately changed.
- Verification before completion, run from `site/`: `npm run build`, `npm run audit:fonts`, `npm run gates`, `npm run copy-gates`, `npm run fidelity`, `npm run distinguish`, `npm run authority` — all with fresh results. `docs/HANDOFF.md` carries the authoritative list; `npm run authority:test` covers the authority checker itself.

## Capabilities and Constraints

Confirmed functionality (campaign site):

- Five canonical PSA spots with distinct staging, downloads, and stable URLs; **Unholy** is the flagship.
- **Sniff Test** quiz with shareable verdict URLs — verdicts never show a numeric score; belongs to Got Soap? only.
- **Lather Pledge** on both Got Soap? and CWAAA via one shared contract (`docs/contracts/pledge.v1.json`, byte-for-byte mirrored at `cwaaa/docs/contracts/pledge.v1.json`); campaign success path ends with a "Want to Learn More?" seam to CWAAA.
- **Shop** is canonical with intentionally unavailable checkout (faux storefront performance).
- **`/broadcast`** is the canonical campaign-film route, entered from a full-bleed home premiere seam once the film exists.
- **`1-800-GOT-SOAP`** is owned and presented by Got Soap?; the IVR has two presented voices, no audible transfer, and intentionally unresolved authorship.
- The Office site has no homepage, navigation, about page, or usable service — every public route resolves to a specified custom error state. Repeat recognition is browser-local only (no IPs, fingerprinting, auth, or server-side identity). Continued Interest begins on the third distinct browser session.

Hard constraints:

- Never alter or re-typeset text baked into the five canonical posters; poster truth wins over prose.
- Ship optimized AVIF/WebP derivatives; originals only as intentional downloads.
- Do not read, parse, move, or stage `.abr` files; avoid moving PSDs and large OneDrive assets.
- Preserve Freepik attribution and license constraints.
- Cross-domain URLs live in configuration and stay empty until the owner assigns real domains; cross-site controls render only when configured.
- `gotsoap/sources/promo.txt` is source material, never to be rewritten as a web spec.
- Font delivery is locked (`docs/HANDOFF.md`, 2026-07-29): all Got Soap? runtime fonts self-host from `site/public/fonts/` via `/fonts/…` URLs. Always-live gate G19 rejects any `@fontsource/*` dependency, lockfile entry, or source import; reintroduction needs owner approval recorded in HANDOFF and `gotsoap/docs/font-delivery-spec.md`.
- Privacy/Terms/DMCA stay globally accessible without announcing the fiction; satire disclosure appears only behind the creator/About seam — no public global satire disclosure.

Explicitly undecided / pending product facts:

- Real domains for the three sites: unassigned.
- Campaign film: not yet produced; `/broadcast` and the premiere seam await it.
- Owner-produced widescreen text-free hero image: pending (dimensionally accurate placeholder permitted).
- The CWAAA/Office relationship's operational meaning: intentionally unresolved, protected from resolution.

## Brand Commitments

- Names and fictional authors: **Got Soap?**, **CWAAA**, **Office of Lather Compliance**; real authorship is **Stacey M. Breckel / Hope2 Studio**, revealed late.
- Two distinct copy registers, never blended: campaign smolder (Got Soap?) and CWAAA paperwork; the Office writes only in error-state officialese. Each page uses only its named system's authorship.
- Type is role-named, not family-named. Campaign roles in `site/src/styles/tokens.css`: command (Got Soap Oswald), editorial (Got Soap Behind The Nineties Sans), whisper (Got Soap Moxie), interface (Got Soap Marlin SQ), production (Got Soap Moanslight). CWAAA: PT Serif with its nonprofit package's supporting roles. Office type rules are isolated in its own design package.
- "Editorial brutalism" is compositional pressure (scale jumps, cuts, collisions, hard rules, asymmetric pacing), not a concrete-grey skin — binding as a compositional commitment, with visual execution governed by `gotsoap/design.md`.
- Closed creative decisions in `docs/HANDOFF.md` (steam auto-clears ~2s, no drag-to-wipe; no numeric verdict scores; Office est. 1961, CWAAA est. 2024; etc.) are owner decisions and bind future work.

## Evidence on Hand

- Five canonical poster JPGs with baked-in typography (immutable), plus AVIF/WebP derivatives in `site/`.
- Implemented copy deck: `site/src/content/copy.ts` (typed, gate-validated).
- Machine-readable contracts: `docs/contracts/pledge.v1.json`, `office-of-lather-compliance/docs/contracts/visit-state.v1.json`.
- Full documentation packages: `gotsoap/design.md`, `gotsoap/docs/prd/PRD-gotsoap-web-v1.md`, `cwaaa/docs/`, `office-of-lather-compliance/docs/`, `docs/world/WORLD-BIBLE.md`, `specs.md`.
- `gotsoap/sources/promo.txt` campaign/process source material.
- Deployed at gotsoap.netlify.app.
- **Absences not to fabricate:** no real testimonials, customers, press, or benchmark data exist — the campaign's "Recovery Case Files" and similar artifacts are fiction and must stay clearly inside the fiction's authorship; no real regulatory affiliation exists.

## Product Principles

1. **The website is the campaign.** Every surface performs the fiction; the portfolio explanation arrives only after the fiction has paid off.
2. **Desire, never shame.** Behavior change through erotic aspiration; the joke lands because the campaign means every gorgeous second of it.
3. **Intentional uncertainty is content.** Do not explain the CWAAA/Office relationship, add clean handoffs, or average the three authors into one tasteful system.
4. **Authorship stays distinct.** Shared engineering primitives may exist beneath, but rendered authors remain visibly and behaviorally separate.
5. **Fiction integrity gates conversion.** Engagement metrics and hiring proof both matter, and neither justifies breaking the world's commitment.

## Accessibility & Inclusion

- WCAG 2.2 AA for contrast and interaction across all systems.
- Semantic landmarks, logical headings, skip link, visible focus, keyboard-complete mechanics (including quiz and pledge).
- Reduced-motion fallbacks for steam/motion effects; the experience stays coherent with JavaScript unavailable.
- Meaningful alt text distinguishes poster content from decorative crops; essential copy never lives only inside imagery.
- Tap targets ≥ 44×44 CSS px; persistent form labels with adjacent errors.
