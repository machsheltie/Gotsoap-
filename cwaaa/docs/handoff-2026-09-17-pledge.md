# Handoff — build `/pledge` (CWAAA standalone)

**Written 2026-09-17.** For the next session picking up CWAAA. Read this, then the authority files
below. It is a starting point, not authority: `../docs/HANDOFF.md`, `design.md`, and
`docs/PRD-cwaaa-web-v1.md` win on every conflict.

## Start here

1. `../docs/HANDOFF.md` — authority map
2. `../docs/world/WORLD-BIBLE.md` — cross-system canon
3. `design.md` §Pledge and §5 — route law (and its new pointer to the tokenized companion)
4. `docs/DESIGN-SYSTEM.md` — tokens, element law, the home page as reference, the protected exceptions
5. `docs/contracts/pledge.v1.json` — **the form is already specified; do not re-derive it**
6. `.impeccable/surfaces/` — there is **no** `/pledge` brief yet

Run the Impeccable `shape` interview for `/pledge` and persist the brief **before** building.
Skipping a surface brief has already cost one full rebuild on this project.

## Where the standalone app is

Built and owner-ratified: `/`, `/findings`, `/recovery-stories`, `/recovery-stories/[id]`, `/404`.
Six pages. Home is the documented reference implementation for every shared element.

The shared layer is extracted and documented — `src/styles/tokens.css` (colors, nine display and
reading steps, four named measures, four breakpoints), `base.css` (type roles including `.t-note`,
the reveal system), `system.css` (`.marker`, `.sec-label`, the three rule weights, `.record`,
`.method`, the three action tiers). **A pledge route should need no new component.** If it seems to,
that is a gap in `system.css` to fill deliberately, not a reason to fork a route-local class.

## Why `/pledge` is next

Every internal link on the site points at a route that does not exist — 16 dead links across 8
targets, and `/pledge` is 7 of them:

| Route | Linked | Built |
|---|---|---|
| `/pledge` | **7x** | no |
| `/tie-one-on` | 2x | no |
| `/about` | 2x | no |
| `/chapters` | 1x | no |
| `/privacy` `/terms` `/dmca` `/accessibility` | 1x each | no |

The utility bar, the navigation, home's two tier-1 pledge rows, the Findings continuation and both
Recovery Stories closes all resolve to a 404. The copy-link referral is worse than a dead link: it
copies a URL to a missing page, so a woman sends it to the man it is about and he receives a 404.
That referral is the primary audience's actual job — *act on the man in question* — and the
conversion path currently terminates nowhere.

`/pledge` is also the only missing route whose design is already settled (contract plus `design.md`),
it is success criterion #2 in `PRODUCT.md`, and criterion #4's sharing loop runs through it. The
other seven routes are enrichment or legal obligation; this one makes the site a working funnel
instead of a documented brochure.

## Do not build it from scratch

A working implementation already ships in the combined runtime and is the migration source
(`docs/migration-manifest.md`): `site/src/pages/pledge.astro`,
`site/src/components/cwaaa/PledgeForm.astro`, `site/src/scripts/pledge.ts`. The manifest calls
`pledge.astro` a "shared-functionality source, not exclusive ownership" — Got Soap? keeps its
campaign presentation, CWAAA gets the nonprofit one, both submit to the same Buttondown audience,
and the contract JSON stays byte-identical in both locations.

Port the behavior; re-author the presentation against CWAAA's element law.

## Three defects to fix on the way in — do not carry them over

1. **Success without acceptance.** `site/src/scripts/pledge.ts` reveals the `SWORN` state even when
   the POST was skipped (empty `BUTTONDOWN_USERNAME`, lines 73–77), and its `catch` lets any network
   failure through (lines 92–93, 143). A visitor can be told she is sworn when nothing was stored.
   `PRODUCT.md` records this as a known defect. **The CWAAA path must fail truthfully.**
2. **The `Movement Updates` consent copy** — `site/src/content/copy.ts:436, 449, 454`. It promises an
   ongoing newsletter, contradicting both the two-message contract and `PRODUCT.md`'s "no ongoing
   newsletter" constraint. Do not reuse these strings.
3. **Office voice on the pledge route** — `site/src/components/cwaaa/PledgeForm.astro:83` carries
   "Office of Lather Compliance · National Office, Suite 2B". `design.md` §Pledge forbids any Office
   reference, transmission language, review threat, or surveillance joke on this route. Strip it.

## Blocked — needs an owner decision before it can ship whole

- **CW-D06: the two-message copy, the delay before the current issue, and the sender details.** The
  signing surface and its success state can be built and verified now; the emails cannot. Scope the
  work to the form and leave fulfillment behind the decision rather than inventing copy.
- **Buttondown is unverified.** `PUBLIC_BUTTONDOWN_USERNAME` is empty, so real acceptance has never
  been observed. Success criterion #2 requires verified two-message fulfillment, which cannot be
  closed in code alone.
- **No `pledge` export exists** in `cwaaa/src/content/copy.ts` — only the nav entry. New copy is a
  Vivian lane plus a blind-reader pass, not an implementation detail. See
  `../gotsoap/docs/copy/COPY-PROTOCOL.md`.

## Hard constraints specific to this route

- Form CW-1 implements `docs/contracts/pledge.v1.json` **exactly**: first name, email, affirmative
  consent, honeypot. Visual treatment and surrounding copy may differ between the two sites; field
  meaning and success semantics may not.
- Success is one `SWORN` settle with share and copy-link, an exact explanation of what arrives, and
  an ordinary CWAAA continuation.
- Consent discloses exactly two messages. Withdrawal before the issue suppresses it.
- The pledge action is **always tier 1** (`.actions` with `.primary`), owner decision 2026-09-15.
  Stamp red stays a rule and never becomes a filled or bordered button; `.act-box.stamp` was
  deleted, not deprecated — do not reintroduce it.
- A verified **non-JavaScript** pledge path is required (`PRODUCT.md`, accessibility).
- No accounts, no IP identity, no fingerprinting, no cross-device state.
- Pledge and email values never enter analytics, logs, screenshots, or test reports.

## Also open (not blocking `/pledge`)

- `docs/copy/proposals-2026-09-17-billy-bob-r6.md` awaits owner approval.
- Billy Bob's missing pager `Next` (the archive boundary, record 7) is **unfinished, not a
  decision**. Never stub it or collapse the sequence.
- CW-G03 Tie One On cloth photography is pending, so home's ribbon field renders the material-ground
  placeholder. CW-G01 and CW-G05–G08 are also pending.
- `impeccable doctor` reports `design-md-coverage` against `design.md`. **Expected and documented** —
  the authority split is deliberate. Do not resolve it by moving token values into `design.md`.
- The combined runtime still paints manila behind every CWAAA surface and carries a 3.29:1
  muted-text contrast defect. Both await an owner palette decision (CW-D02); recorded, not fixed.

## Working in this repo

**Parallel sessions edit this tree.** During the 2026-09-15 documentation pass a second Impeccable
session was editing the same two routes concurrently and committed this session's work inside its
own commit. Check modification times before editing a shared file, re-read immediately before
writing, and never `git add -A` around the design-source tree — stage named paths.

At the time of writing, `cwaaa/src/content/copy.ts` is modified and uncommitted by another session.

## Verification — fresh results required every time

From `site/`: `npm run build`, `npm run gates`, `npm run copy-gates`, `npm run fidelity`,
`npm run distinguish`, `npm run authority`. From `cwaaa/`: `npm run build` and `npx astro check`.
A green build does not imply green copy or authority gates.
