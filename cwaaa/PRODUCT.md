# Product

<!-- impeccable:product-schema 1 -->

This record covers **CWAAA** only. Shared three-institution truth (world canon, protected uncertainty, poster rules, font-delivery gate, verification commands, real authorship) lives in the root [`../PRODUCT.md`](../PRODUCT.md) and is not restated here. Where the two differ, the root record and `../docs/HANDOFF.md` win.

## Platform

web

## Stack

Owner decision, 2026-09-14: a **new static-output Astro app inside this repository at `cwaaa/`**, a sibling to the combined runtime in `../site/`. Netlify-compatible deployment and redirects, self-hosted fonts from the app's `public/fonts/`, one content module, and one external-link configuration module. Extraction of existing CWAAA material follows `docs/migration-manifest.md`. This resolves the build-location half of launch decision **CW-D07**; origins, creator/legal destinations, the `/crisis` migration destination, and old-story redirects remain open in `PRD-TO-LAUNCH.md`.

## Users

Owner decision, 2026-09-14: **two primary users with distinct jobs, neither secondary.**

- **Women who witness, recruit, share, and refer.** They arrive from Got Soap?'s "Want to Learn More?" seam, a shared link, or a Recovery Story. Their job: get validation that the expectation is reasonable, get language for what they noticed, and get a practical way to act on the man in question (refer him, tie one on, pass a Finding along).
- **Men referred to take the pledge.** The man makes the first-person Form CW-1 declaration himself. His job: understand what is being asked, sign it with low friction, and leave with a receipt and one current issue, nothing more.
- **Hiring decision-makers** are a real but secondary audience: CWAAA proves Stacey M. Breckel / Hope2 Studio can author a second, wholly different institution from the campaign. This audience is served by the fiction working, not by explanation.

## Product Purpose

CWAAA (Concerned Women Against Axe Abuse, est. 2024) is a fictional national advocacy coalition that makes its case in public: **THE BAR IS SOAP.** The standalone site turns the campaign's joke into organized participation. It validates a reasonable collective expectation, documents the social cost of substituting fragrance for washing, tells humane Recovery Stories, shows chapter life, runs the Tie One On For Suds ribbon program, and hosts the canonical nonprofit edition of the Lather Pledge with a finite, real email relationship.

**Success, as decided 2026-09-14 (all four, jointly):**

1. Blind viewers could not mistake CWAAA for Got Soap? or the Office. Authorship distinctness is a deliverable, not a side effect.
2. Completed pledges with verified two-message fulfillment: Buttondown acceptance with truthful success or failure, one immediate receipt, exactly one current issue, suppression honored.
3. Trust earned before the Office seam lands. Visitors read CWAAA as a credible coalition for the whole progression; the single deep Office referral produces a quiet rupture, not a reveal.
4. Shared and returned to as a world: Findings, Recovery Stories, and Tie One On get passed along and revisited independently of the campaign.

## Positioning

CWAAA is **satire**, and the owner has said so directly (2026-09-14): it is not a normal "handle with dignity" nonprofit site. Its target is the low-effort man who believes Febreze and Axe body spray cover for not showering. The inspiration is the average man on Tinder who wants a woman who is a 10 while being a 2 himself, last shaved when Duck Dynasty was on, and showers only when the people around him are crinkling their noses and commenting on his BO.

The comedic mechanism is competent civic procedure applied to that absurdly low bar. CWAAA's earnestness, filing conventions, numbered Findings, and sworn declarations are the delivery vehicle for the joke, never a softener of it. The "participant dignity" language in the design and world documents governs *how the fiction frames the men inside it* (no mugshots, no suspect boards, no allegations against real people) and *who the humor targets* (low-effort masculinity and fragrance substitution, never protected classes or people with medical barriers to hygiene). It does not authorize polite nonprofit minimalism or a toned-down bit. Future work that reads "humane" as "gentle" has misread the product.

What a neighboring nonprofit parody could not copy: CWAAA is one institution inside a three-author world with a protected, unresolved relationship to a regulator whose site exposes only error states. CWAAA links outward to the Office as an unexplained external authority and never explains it.

## Operating Context

- Governing public progression: `Home → Findings → Recovery Stories → Tie One On → Pledge → Chapters / About → Office referral`. Most routes need no fracture; no route uses more than one.
- Canonical routes: `/`, `/findings`, `/recovery-stories`, `/recovery-stories/[id]`, `/tie-one-on`, `/pledge`, `/chapters`, `/about`, `/404`. Permanent redirects: `/case-files` → `/recovery-stories`, `/case-files/[id]` → `/recovery-stories/[id]`.
- Current source of CWAAA material is the combined runtime: `../site/src/pages/crisis.astro`, `../site/src/components/cwaaa/`, home seams, and the `cwaaa` author in `../site/src/content/copy.ts`. Existing `public/fonts/` and coalition PNGs are preparation, not proof of a working standalone site.
- Launch is governed by `PRD-TO-LAUNCH.md` (decision IDs CW-D01 to CW-D07, milestones CW-M1 to CW-M6, deferred IDs CW-L01 to CW-L05) and `GRAPHICS-TO-MAKE.md` (asset IDs CW-G01 to CW-G08). Owner interviews use those IDs; decisions are recorded in the applicable authority before dependent implementation.
- Authority order inside this workspace: `../docs/HANDOFF.md` → `../docs/world/WORLD-BIBLE.md` → `docs/world-bible.md` → `design.md` and `docs/PRD-cwaaa-web-v1.md` → `docs/ui-system.md` → `docs/DESIGN-SYSTEM.md` (prose authority wins conflicts).
- Copy work follows `../gotsoap/docs/copy/COPY-PROTOCOL.md` and the local voice authority; historical case-file decks and copy proposals are provenance, not policy.
- Email provider is Buttondown, one audience shared with Got Soap?. Analytics is GoatCounter. Pledge and email values never enter analytics, logs, screenshots, or test reports.
- Verification for any runtime change still runs from `../site/` (build, font audit, gates, copy-gates, fidelity, distinguish, authority) plus the standalone app's own build, link, route, accessibility, contract, and redirect checks once it exists.

## Capabilities and Constraints

Confirmed functionality:

- **Form CW-1, Declaration of Intent to Lather.** Implements `docs/contracts/pledge.v1.json` exactly (byte-identical to `../docs/contracts/pledge.v1.json`). First name, email, affirmative consent, honeypot. Accessible validation, `SWORN` success settle, share and copy-link. No Office reference, transmission language, or review threat on the Pledge route.
- **Finite email relationship.** Exactly two CWAAA-authored messages for both pledge presentations: an immediate receipt with a withdrawal path, then one current issue after a configurable delay, month and year derived at signup or send. Withdrawal before send suppresses the issue. The issue carries a functioning unsubscribe. Buttondown confirmation/welcome fulfills the receipt or is disabled; it never becomes a third message. Repeat or cross-site submission never duplicates the sequence.
- **Findings** use `FINDING YY-NN` labels, stay live HTML with real tables, and are plainly coalition advocacy, never impersonated science or government conclusion. At most one sparse neutral citation of the Office and Establishment Directive 1961-A.
- **Recovery Stories** index publicly under that label; only an opened story may say **Recovery Record** with an `RC-NNN` identifier. Participant names are protected inside the fiction. Every story documents change and next action.
- **Tie One On For Suds** is the washcloth-ribbon program and pledge funnel, rendered as real cloth in real contexts.
- **Chapters** and **About** carry the scale line "Two million concerned women. Chapters in all fifty states. One demand." and the 2024 book-club origin. About holds the deepest neutral Office referral and the restrained creator credit that leads to real authorship and fiction disclosure.
- **Cross-site links** read from `GOT_SOAP_SITE_URL` and `OFFICE_SITE_URL`; empty values render no controls; all external links signal the domain transition.

Hard constraints:

- CWAAA never claims regulatory power, never calls the Office its partner, parent, supervisor, operator, division, or coordinator, and never uses Office containment, terminal, repeat-access, or "Please remain available" language on ordinary pages.
- No accounts, backend profiles, IP identity, fingerprinting, Office-style recognition, or cross-device state.
- No ongoing newsletter, drip, donations, real chapter operations, or CMS without separate approval (CW-L04). Form CW-1 is never silently extended.
- The 1-800-GOT-SOAP number is a shared-world artifact owned by Got Soap?; CWAAA's telephone is an ordinary chapter contact path, not a hotline or compliance line.
- Existing `public/` assets do not prove approval; file presence is not visual approval.
- Do not remove combined-runtime CWAAA material before the replacement is verified.
- Privacy, Terms, and DMCA stay globally accessible and truthful about real data behavior; their labels do not announce the fiction. No public global satire disclosure.
- No implied affiliation with MADD, Axe/Unilever, a public-health body, or a government; no imitation of a live government seal or jurisdictional name.

Explicitly undecided (tracked in `PRD-TO-LAUNCH.md`):

- CW-D01 typography scale/measure decisions and the PT Serif scope wording conflict between root guidance and local UI decisions.
- CW-D02 palette/state tokens and motion specifics; the manila-ground question and muted-text contrast are flagged blocked in session notes.
- CW-D03 per-route compositions; CW-D04 launch content roster; CW-D05 identity and artifact production; CW-D06 two-message copy, delay, sender details; the remaining CW-D07 items above.
- Real domains for all three sites.

## Brand Commitments

- Name and initialism: **Concerned Women Against Axe Abuse**, **CWAAA**. Est. 2024. Seal: a soap bar with a barred aerosol can. Program names are fixed: **Lather Pledge / Form CW-1**, **Tie One On For Suds**, **Findings**, **Recovery Stories**.
- Voice: a capable nonprofit whose staff have done this before. Procedural but readable, earnest without sentimentality, firm without menace, dry because the procedure is specific. Never the campaign's smolder, never Office officialese, never customer-support SaaS.
- Emotional temperature is collective relief, and CWAAA never performs horror. Its unease is an accidental byproduct of consistency (sparse chronology, a neutral citation, unusually complete continuity), never the page's objective.
- Typography is a six-role cast recorded in `docs/ui-system.md` and `../site/config/cwaaa-font-manifest.json`: MORVI (proposition), Mirk Slab 900 (monumental figure), Proda Sans (reading), Catesque (interface and notation), Modest (testimony), PT Serif (identity serif on seal and certificate artifacts only). These are owner decisions; the font brief is provenance, not a reopened interview.
- Binding visual constraints the owner has already locked (recorded here without expansion; `design.md` governs execution): the home hero is a woman's hands tying a red washcloth ribbon around a used black gym bag; paper appears only as a real artifact; no all-manila world, dossier styling, dashboards, card grids, animated maps, or generic nonprofit theme.

## Evidence on Hand

- Approved CWAAA copy in `../site/src/content/copy.ts` under the `cwaaa` author, including the existing crisis/statement material and Form CW-1 strings. Some strings are known-stale (recurring "Movement Updates" consent copy, Office-authored lines in `PledgeForm.astro`) and are scheduled for correction, not reuse.
- Portable contract `docs/contracts/pledge.v1.json`.
- Full documentation package: `design.md`, `docs/PRD-cwaaa-web-v1.md`, `docs/world-bible.md`, `docs/ui-system.md`, `docs/DESIGN-SYSTEM.md`, `docs/font-brief.md`, `docs/migration-manifest.md`, `PRD-TO-LAUNCH.md`, `GRAPHICS-TO-MAKE.md`.
- Prepared font binaries in `public/fonts/` and `../site/public/fonts/` (Morvi, Proda Sans, Catesque, Modest, Mirk Slab, PT Serif). Coalition seal and ribbon components exist in the combined app.
- Copy proposals and history under `docs/copy/` and `docs/history/` are provenance only.
- **Absences not to fabricate:** no approved launch roster of Findings or Recovery Records yet (CW-D04); no chapter, recovery, or hero photography (CW-G01 to CW-G08 pending); no verified live Buttondown behavior (`BUTTONDOWN_USERNAME` is empty and the current code allows success without acceptance); no standalone deployed origin; no real chapters, participants, testimonials, or allegations exist and none may be presented as real.

## Product Principles

1. **The bar is soap, and the joke is that someone filed it.** Competent procedure aimed at a ridiculous baseline is the entire comedic engine. Play it straight; never wink, never soften.
2. **Aim the satire at the low-effort man, frame the participant humanely.** The target is fragrance-for-washing masculinity. Men inside the fiction are participants who changed, not suspects; real people are never named or accused.
3. **Trust before rupture.** Earn credibility across the whole progression; spend the single Office seam late, neutral, and unexplained.
4. **Two messages, then silence.** The pledge is a finite civic act with a real email relationship, not a list-building funnel.
5. **A different author, not a different skin.** CWAAA's separation from Got Soap? and the Office is behavioral and verbal as much as visual, and it is a launch deliverable.

## Accessibility & Inclusion

- WCAG 2.2 AA. Keyboard-complete forms, navigation, and story access; semantic headings, landmarks, lists, tables, and form relationships; persistent labels with adjacent, correctable errors; visible focus; generous targets.
- Wide civic records recompose into labeled mobile structures rather than horizontal dashboard scrolling.
- Never convey information through red alone; honor reduced motion; the experience stays comprehensible with images disabled and without JavaScript, including a verified non-JavaScript pledge path.
- Humor never targets protected classes or people with medical barriers to hygiene.
