---
version: 1
slug: "cwaaa-src-pages-privacy-astro"
primary_target: "src/pages/privacy.astro"
related_targets: ["src/pages/terms.astro","src/pages/dmca.astro","src/pages/accessibility.astro","src/content/copy.ts","cwaaa/src/pages/privacy.astro","cwaaa/src/pages/terms.astro","cwaaa/src/pages/dmca.astro","cwaaa/src/pages/accessibility.astro"]
---

# Surface brief — /privacy, /terms, /dmca, /accessibility

**Confirmed 2026-09-22. Mode: Read.** Four routes, one surface class: the coalition's published
documents. Authority: `../../design.md` §8, §9, §11–13; `../../docs/DESIGN-SYSTEM.md` (type roles,
label tiers, rules, the page-shell exception); `../../docs/PRD-cwaaa-web-v1.md` §Creator/About seam,
§Accessibility and privacy; `../../docs/world-bible.md` §Legal and ethical frame;
`../../../docs/HANDOFF.md` §Legal navigation and disclosure; `../../docs/contracts/pledge.v1.json`
(retention and privacy invariants). Starting point, not authority:
`../../docs/handoff-2026-09-17-legal-four.md`.

## 1 · Job and audience

Four arrivals, all from the footer, all mid-decision:

- Someone who just typed a first name and an email on `/pledge` and clicked **Privacy** before
  filing. She wants one answer: what happens to the address.
- A screen-reader or keyboard user who hit something that did not work and clicked
  **Accessibility** to find out whether anyone cares and where to say so.
- A rights holder or their agent looking for the takedown path, with no patience for the site's
  personality.
- A sceptic checking whether the coalition is a real organisation. Legal pages are where a fiction
  is normally caught, because they are the pages nobody art-directs.

Success: the visitor finds the one fact they came for on the first screen, reads it in the same
voice as every other CWAAA page, and never doubts who wrote it. These pages carry the authorship
deliverable at its most exposed point. Nothing is sold and nothing is completed; the visitor
understands and leaves.

## 2 · Outcome and proof

**The pages say what the code does, and the code does very little.** Verified in `src/` on
2026-09-17 and re-checked 2026-09-22 (`src/config/site.ts`, `docs/contracts/pledge.v1.json`):

- No cookies. No `localStorage`, `sessionStorage`, or IndexedDB. The site stores nothing in the
  visitor's browser. **Therefore no cookie banner, no consent modal, no preference centre.** Adding
  one would be a false statement rendered as a component.
- Analytics is GoatCounter, cookieless, enabled only when `PUBLIC_GOATCOUNTER_CODE` is set. It is
  empty today. The privacy page states both facts: what the tool is, and that it is off until turned
  on.
- Email leaves the site only from `/pledge`, to Buttondown, one audience shared with the Got Soap?
  campaign. Fields: the email address and the first name (`metadata__first_name`). Retention per the
  contract: the minimum to fulfil two messages and honour suppression; unneeded fulfilment metadata
  removed after completion; a suppression record may be kept. Nothing has been sent yet
  (`PUBLIC_BUTTONDOWN_USERNAME` is empty).
- Pledge and email values never enter analytics, logs, screenshots, or test reports.
- No accounts, no IP identity, no fingerprinting, no cross-device state. The browser-local
  recognition gag is the Office's and does not exist on this site; the privacy page does not mention
  it, because CWAAA has nothing to say about it.
- Fonts self-host from `public/fonts/` (gate G19). No font host sees the visitor.
- Third-party requests, the complete list: `gc.zgo.at` when analytics is configured, and
  `buttondown.com` on pledge submit. The page lists exactly these two and calls the list complete.

**What each document proves:**

- **Privacy** — the whole answer in its lead sentence: nothing is stored in your browser, one form
  sends two fields to one provider, two messages then silence. Then the fielded facts, then the
  visitor's recourse (ask what is held, have it deleted, withdraw before the issue), then contact.
- **Terms** — who operates the site, that there are no accounts, purchases, or user submissions,
  what the visitor may do with the content (read, link, share the pledge link), that the coalition's
  own imagery and text are its own and the Freepik-licensed assets stay under their licence, plain
  no-warranty language, governing law, contact.
- **DMCA** — scoped to what is true: CWAAA hosts no user-generated content, so this is not a
  safe-harbour page and carries no counter-notice procedure. It is the notice path for material on
  this site: the site's own imagery, which is AI-generated, and the Freepik-licensed assets whose
  attribution `AGENTS.md` requires preserving. It lists the elements a valid notice must contain and
  names the designated agent. The label stays **DMCA** because that is the word a rights holder
  searches the footer for.
- **Accessibility** — the target is WCAG 2.2 AA; no formal audit has been run; here is what is
  built (semantic landmarks, skip link, visible focus, keyboard-complete pledge, reduced-motion
  fallbacks, a no-JavaScript reading path, 44px targets, text alternatives for the seal and
  photographs); here is how to report a barrier. It states the target and the gap. It never claims
  conformance.

## 3 · Selected direction

**The opened-record grammar minus its fracture.** Owner decision 2026-09-22 through the shape
interview. One continuous document per route on the centred `--cw-shell`, white reading ground on
the ivory page, standard `Nav` and `Footer`, nothing else around it.

- **Masthead.** The ordinary label as the `h1` in `.t-statement` — *Privacy*, *Terms*, *DMCA*,
  *Accessibility*. Under it, one `.t-lead` sentence that is the page's entire answer, so the
  pledge-signer's question is resolved before she scrolls. A `.rule.ink` closes the masthead: 1.5px
  is the weight that closes a reading surface. Heavy belongs to the monuments and does not appear.
- **Blocks.** Each section opens with a `.sec-label` (`.t-ui-caps .t-label`, Catesque, grey) that
  is a real `h2` with an `id`, so `/privacy#email` is linkable from the pledge later. Body in Proda
  at `--cw-measure`; an aside in `.t-note` at `--cw-measure-note`. Hairline `.rule` between blocks.
  No `.marker` anywhere: a row of dots would shatter one document into a stack of sections, and that
  is the tier's whole distinction.
- **One fielded block, on Privacy only.** The facts the visitor scans — *What leaves this site*:
  email, first name, analytics; where each goes; how long it is held — set as a single `.record`
  (label/value, ruled top and bottom, two-up at `--bp-phone`). Everything else on all four pages is
  prose. A second `.record` on any of these routes is the "repeated document components" failure
  design.md §13 names.
- **Close.** The final block ends on a hairline; the footer, which already carries the four legal
  links, is the cross-navigation. No pager, no "other documents" row, no duplicate of the footer nav
  above the footer nav.
- **No fracture.** The labels do not intrude into the margin. That departure is the Recovery
  Record's one authored move and it means *a man's file, read across*. A privacy policy has no
  referral to fracture; borrowing the gesture would be decoration.
- **Nothing monumental, nothing photographic, nothing animated.** No MORVI, no Mirk Slab, no Modest
  (testimony only), no `ImageSlot`, no `Guilloche` or `Rosette` (Pledge's licence is Pledge's), no
  `data-reveal`. The visitor came for a fact; every word is on the page at first paint.
- **Unresolved facts render as visible markers**, not as blanks and not as fabrications. A marker
  is inline Catesque `.t-ui` in `--cw-grey` with square brackets and a literal word:
  `[pending: designated agent's mailing address]`. It carries `data-pending` so a route check can
  count them, and it is not a link. It is never red (information never by red alone) and never a
  highlight box. When the fact lands the marker is replaced by the fact and the attribute goes with
  it.

**Why not Home's field composition:** alternating full-bleed bands turn a two-paragraph policy into
a landing page and put a `.marker` dot on "Governing law". **Why not under-designed:** that is the
Office's law, and an ordinary CWAAA surface may not wear the Office's voice. These pages look
exactly as considered as a Recovery Record, and no more.

**Implementation consequence — the page-shell exception widens, on purpose.**
`docs/DESIGN-SYSTEM.md` still says `/recovery-stories/[id]` is the *only* centred column. Commit
`23a1827` (2026-09-18) already put the Recovery Stories index on `--cw-shell`; this brief adds four
more. The rule was never "one route"; it was "reading surfaces are centred columns, field
compositions are not." The build amends that paragraph to say so and to enumerate: both Recovery
Stories routes and the four legal documents. Home, Findings, Pledge, Tie One On, Chapters, About
stay field compositions.

## 4 · Copy and vocabulary (canon-bound)

- **Register: CWAAA plain.** Owner decision 2026-09-22. The model is the pledge `fulfillment`
  DRAFT in `src/content/copy.ts` — "two messages, then silence… CWAAA keeps records, not secrets."
  Declarative sentences. Facts stated flatly and completely. At most one dry aside per page. No
  legalese padding, no "we value your privacy", no "from time to time", no defined-terms preamble.
- **Truthful and consistent with the contract.** Privacy and the pledge's consent and fulfillment
  strings describe the same two messages, the same retention, the same suppression. They need not
  be byte-identical; they may not disagree.
- **The operator is named, not explained.** Terms and DMCA name **Hope2 Studio** as the operating
  entity in one ordinary clause ("This site is operated by Hope2 Studio."), with **Stacey M.
  Breckel** as the individual where a name is statutory. Owner decision 2026-09-22. The clause says
  nothing about what Hope2 Studio is. The words *satire*, *parody*, *fiction*, *fictional*,
  *spec work*, *portfolio*, and *campaign* do not appear on any of the four pages. Disclosure lives
  behind the creator/About seam (HANDOFF §Legal navigation and disclosure); a legal page naming its
  operator is the PRD's "truthful and legally prudent" case, not audience-facing disclosure.
- **No Office language.** No containment, terminal, repeat-access, recognition, jurisdiction,
  compliance status, disposition, or "Please remain available." No Establishment Directive. The
  Office is not cited on these routes at all; the deep seam is About's.
- **CWAAA does not find.** The coalition keeps, holds, sends, removes, and answers. It does not
  audit, dispose, or certify.
- **Labels never announce the fiction.** *Privacy*, *Terms*, *DMCA*, *Accessibility*, exactly as
  `legal.links` already has them. Page titles match.
- **Accessibility is honest.** "Target" and "no formal audit" are the two load-bearing words. Real
  known gaps go on the page; gaps are found by running the detector and a screen-reader pass, not
  invented for humility's sake.
- **DRAFT until ratified.** Every string is marked DRAFT in `copy.ts` and goes through the Vivian
  lane and a blind-reader pass per `../../../gotsoap/docs/copy/COPY-PROTOCOL.md` before it is called
  approved. Block titles are Vivian's; this brief fixes the facts and the order, not the sentences.

## 5 · Scope and boundaries

New: `src/pages/privacy.astro`, `src/pages/terms.astro`, `src/pages/dmca.astro`,
`src/pages/accessibility.astro`; one shared shell component `src/components/Document.astro` (or a
layout) carrying the masthead, block structure, marker rendering, and scoped styles, so the four
pages are thin and the CSS exists once; a `legalPages` export in `src/content/copy.ts` — one
typed shape, four documents (`title`, `lead`, `blocks[{ id, label, paragraphs, note? }]`, with
pending facts as typed markers rather than strings that look like facts). `Document.astro` composes
`.t-statement`, `.t-lead`, `.sec-label`, `.rule`, `.record`, `.t-note` and adds nothing to the
label or rule tiers.

Untouched: `tokens.css`, `base.css`, `Nav`, `Footer`, `Brand`, `Seal`, `BaseLayout`, every
existing route, `legal.links` (labels, hrefs, order), `pledge.astro` and its brief. If a `.pending`
style is needed it is the one addition to `system.css`, nothing else moves there.

Out of scope, stated so nobody fills it: `/about` stays in `legal.links` and stays a dead link after
this work. It waits on CW-D04's remainder and the owner's creator-seam call. The four legal pages
do not link to `/about`, so no legal page links to a route that does not exist.

Anti-goals: cookie banner, consent modal, accordion or FAQ, sticky table of contents, "last
updated" chip, breadcrumb, lawyer-template boilerplate, an "Effective date" masthead notation
(the owner chose the shell without a revised-date line; reopen only if the copy lane asks),
Office under-design, monumental type, photograph, paper texture, stamps, form numbers, dossier
styling, seal-as-badge, Modest, `data-reveal`.

## 6 · States and ranges

Four documents now; the shell must hold a document of 4 blocks and 300 words and one of 9 blocks
and 1,500 words without changing grammar. Paragraphs run 1–4 sentences. Pending markers run 0–5 per
page and 0 sitewide at launch; a route check (`data-pending` count) fails the launch build while any
remain. Verified states: no-JS (the routes ship no script of their own; identical rendering),
images-off (nothing to lose), print (plain, black on white, no ground), reduced motion (nothing
moves), 200% zoom (measure holds, no horizontal scroll), keyboard (skip link, focus visible on every
in-prose `.link-rule`). All four routes appear in the sitemap and carry canonical metadata.

## 7 · Interaction and layout

Heading order is `h1` → `h2` per block, no skipped level; the `.sec-label` *is* the `h2`. Every
`h2` has a stable `id` derived from the block, so `/privacy#email` and `/accessibility#report` hold
across copy revisions. In-prose links use `.link-rule`; email addresses become `mailto:` links only
once the address exists. Targets 44px minimum. `--bp-phone`: single column, gutter as the only
inset, `.record` two-up, measure released; `--bp-reading`: nothing to collapse, because there is
no second column. Every `@media` names its rung.

## 8 · Open decisions a builder must not invent

- **DMCA designated agent**: name (Stacey M. Breckel is the likely answer; confirm), mailing
  address, email. Statutory. Markers until the owner supplies them.
- **Governing law and jurisdiction** for Terms. Marker.
- **Contact address** for privacy and accessibility requests. Marker; the same address may serve
  both, and the owner says so.
- **GDPR/CCPA-specific language.** Owner's call. Default in its absence: none, plus one true,
  jurisdiction-agnostic sentence in Privacy — ask, and CWAAA will tell you what it holds and delete
  it — which the retention contract already supports.
- **The operator clause's exact wording** and whether Terms mention Got Soap? at all. Default: the
  clause above, and no Got Soap? mention; the campaign seam renders only when its URL is configured
  and lives in the footer, not in Terms.
- **Known accessibility gaps** listed on `/accessibility`: only what the detector and a
  screen-reader pass actually find.
- All sentences are Vivian's, then blind readers. The order of blocks and the facts inside them are
  this brief's.
- The five owner facts are recorded as launch blockers under CW-D07 (creator/legal destinations) in
  `../../PRD-TO-LAUNCH.md`; the page-shell exception paragraph in `../../docs/DESIGN-SYSTEM.md` is
  amended as §3 describes.
