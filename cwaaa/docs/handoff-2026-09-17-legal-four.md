# Handoff — build the legal four (`/privacy`, `/terms`, `/dmca`, `/accessibility`)

**Written 2026-09-17.** For the next session. A starting point, not authority: `../docs/HANDOFF.md`,
`design.md`, and `docs/PRD-cwaaa-web-v1.md` win on every conflict.

## The command

```
/impeccable shape the legal four — /privacy, /terms, /dmca, /accessibility
```

`shape` is the right entry, not `craft` and not `new-work`. The visual world is already committed and
documented (`docs/DESIGN-SYSTEM.md`, home as the reference implementation), so there is **no world
workshop to run** — these four routes express the existing world. What is missing is a surface brief,
and `shape` owns exactly that.

Then implement against the brief. Do not skip the brief: on this project, building a route without
one has already cost a full rebuild.

**Visitor mode: Read.** The visitor is here to understand something. Not Persuade — nothing is being
sold on these pages — and not Operate, because there is no task to complete.

**Write one brief, not four.** These are four routes but one surface class: same job, same grammar,
same material law. Follow the Recovery Stories precedent, which covers two routes in one brief. Set
`primary_target` to `src/pages/privacy.astro` and the other three as `related_targets`, all
**project-relative** (`src/pages/...`, not `cwaaa/src/pages/...`) — the briefs were repaired on
2026-09-15 for exactly this reason and the convention must hold.

## Why these four, now

A `PRODUCT.md` hard constraint: "Privacy, Terms, and DMCA stay globally accessible." All four are
linked from `legal.links` in `src/content/copy.ts` and rendered in every page footer. All four 404.

`/pledge` shipped in `7246e0b`, so the site now collects a first name and an email address under
affirmative consent while its privacy link goes nowhere. That is the sharpest reason to do this next.

They are also the only remaining unblocked work. `/tie-one-on` waits on CW-G03 cloth photography and
is *defined* by real cloth at human scale; `/chapters` waits on CW-G05–G08; `/about` waits on the
CW-D04 content roster and the owner's call on the creator seam. These four wait on nothing but a
handful of real-world facts, listed below.

## What exists, and what does not

**There is no port source.** Unlike `/pledge`, the combined runtime in `site/` has **no**
`privacy`, `terms`, `dmca`, or `accessibility` page. These four are net-new.

**There is no page copy for them.** A previous handoff of mine said a DRAFT privacy paragraph existed
at `src/content/copy.ts:763` — **that was wrong, and the correction matters.** That DRAFT is the
*pledge form's* `fulfillment` disclosure ("Your email does two jobs, both of them finite…"). It is
consent copy that sits with the form. It is a good model for the register these pages need, and it is
not a seed for any of them.

What does exist: `legal.links` (the four labels and hrefs) and the footer that renders them.

## The real data behavior — verified, so nobody invents it

These pages must be **truthful about real data behavior**. Every statement below was verified in the
code on 2026-09-17. Do not soften, pad, or hedge them, and do not add a protection the site does not
actually implement.

- **No cookies. No `localStorage`, no `sessionStorage`, no IndexedDB.** A search of `src/` for all
  four returns nothing. The site stores nothing in the visitor's browser. This is unusual and it is
  true, so say it plainly — and **do not add a cookie banner for consent the site never needs.**
- **Analytics is GoatCounter**, configured by `PUBLIC_GOATCOUNTER_CODE` in `src/config/site.ts`. An
  empty value disables it entirely, and it is empty today. GoatCounter is cookieless.
- **Email goes to Buttondown**, one audience shared with the Got Soap? campaign, and only from the
  pledge form. Fields are the email address and the first name as `metadata__first_name`
  (`docs/contracts/pledge.v1.json`). Retention scope per that contract: the minimum needed to fulfil
  two messages and honour suppression, unneeded fulfilment metadata removed after completion, a
  suppression record may be retained. `PUBLIC_BUTTONDOWN_USERNAME` is empty, so nothing has been sent
  yet.
- **Pledge and email values never enter analytics, logs, screenshots, or test reports.** This is a
  standing constraint, and the privacy page may state it.
- **No accounts, no IP identity, no fingerprinting, no cross-device state.** The browser-local
  recognition gag belongs to the Office and does not exist here.
- **Fonts are self-hosted** from `public/fonts/` via `/fonts/…` URLs, enforced by always-live gate
  G19. There is no Google Fonts or `@fontsource` request, so no third-party font host sees the
  visitor.
- **Third-party requests, complete list:** `gc.zgo.at` (GoatCounter, only when configured) and
  `buttondown.com` (only on pledge submit). Nothing else.

## Owner facts that must come from you — these block completion

I cannot invent any of these, and inventing them would be worse than shipping three pages:

1. **The legal entity.** Who owns this site — Hope2 Studio, Stacey M. Breckel personally, or
   something else? Terms and DMCA both need a real name.
2. **The DMCA designated agent:** name, physical mailing address, and email. This is statutory, not
   decorative.
3. **Governing law and jurisdiction** for Terms.
4. **A contact address** for privacy and accessibility requests.
5. **Whether GDPR/CCPA-specific language is wanted.** Depends on who you expect to visit.

Until 1–4 exist, the honest move is to build all four routes and the brief, leave those exact spots
as visible unresolved markers, and tell the owner which ones are open. Do not fabricate an address.

**A note on DMCA's actual job here.** CWAAA hosts no user-generated content — no accounts, no
uploads — so the usual safe-harbour framing does not apply. The real function is a takedown contact
path for this site's own imagery, which is AI-generated, plus the Freepik-licensed assets whose
attribution and licence constraints `AGENTS.md` requires preserving. Scope it to that.

## The design question `shape` has to settle

This is the one genuine design problem, and it has two failure modes:

- **Over-design:** turning a privacy policy into an editorial spread with monumental MORVI and a
  full-bleed photograph. `design.md §13` forbids decorative institutional theatre, and a legal page
  performing art direction reads as a joke at the reader's expense at the exact moment the site has
  to be trustworthy.
- **Dropping out of the world:** shipping unstyled boilerplate that could belong to any site. That
  breaks the authorship deliverable — blind viewers must not mistake CWAAA for anyone else, on every
  page.

A defensible starting proposal for the interview to accept or reject: **the opened-record grammar
minus its fracture.** White reading ground, Proda body at `--cw-measure`, `.sec-label` blocks,
hairline rules between sections, `.t-note` for asides, no monumental face anywhere, no photography,
and the standard navigation and footer. Plainly CWAAA, plainly a document, not a monument. Note that
the centered reading shell is a *protected exception* belonging to `[id].astro` — reusing that
spatial idea here needs the brief to say so deliberately rather than copying it.

**Do not make these pages look under-designed.** That is the Office's law, not CWAAA's, and
borrowing it here would put the Office's voice on an ordinary CWAAA surface.

## Constraints specific to these routes

- **Labels never announce the fiction.** "Privacy", "Terms", "DMCA", "Accessibility" — ordinary words.
- **Fiction disclosure belongs behind the creator/About seam**, not here. There is no public global
  satire disclosure, and these pages are not where it lands.
- **Truthful about real data behavior**, while still sounding like CWAAA wrote them. That tension is
  the authorship problem; the pledge `fulfillment` DRAFT is the register that resolves it.
- **No Office language.** No containment, terminal, repeat-access, or "Please remain available"
  phrasing.
- The **accessibility statement** must be honest: WCAG 2.2 AA is the target, and no formal audit has
  been run. State the target and the gap; do not claim conformance the project has not verified.
- New copy is **DRAFT** until it goes through the Vivian lane and a blind-reader pass
  (`../gotsoap/docs/copy/COPY-PROTOCOL.md`). Mark it DRAFT in `copy.ts` and do not present it as
  ratified.

## Working in this repo

**Parallel sessions edit this tree, actively.** During the 2026-09-15 pass another Impeccable session
edited the same routes concurrently and committed this session's work inside its own commit. As of
this writing a session is mid-iteration on `src/pages/pledge.astro`, its surface brief, and
`src/content/copy.ts`.

**`copy.ts` is the collision risk** — the legal copy lands there and another session is editing it.
Check modification times, re-read immediately before writing, stage named paths, and never
`git add -A` around the design-source tree.

## Verification — fresh results required every time

From `site/`: `npm run build`, `npm run gates`, `npm run copy-gates`, `npm run fidelity`,
`npm run distinguish`, `npm run authority`. From `cwaaa/`: `npm run build` and `npx astro check`.
A green build does not imply green copy or authority gates.

Route-specific checks worth adding: every footer link resolves, and no legal page links to a route
that does not exist yet (`/about` is still missing and is in `legal.links`).
