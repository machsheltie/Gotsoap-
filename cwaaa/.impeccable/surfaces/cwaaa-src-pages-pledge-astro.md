---
version: 1
slug: "cwaaa-src-pages-pledge-astro"
primary_target: "src/pages/pledge.astro"
related_targets: ["src/content/copy.ts", "src/assets/cwaaaseal.png", "docs/contracts/pledge.v1.json", "cwaaa/src/pages/pledge.astro"]
---

# Surface brief: CWAAA Lather Pledge — Form CW-1 (`/pledge`)

**Scope:** the standalone CWAAA app's Pledge route, fifth in the locked progression and the site's only
transactional surface. **Visitor mode:** Operate. Confirmed by the owner 2026-09-15 through the
Impeccable `shape` interview.

This route is a **re-housing, not a translation.** The live Got Soap? implementation at
`gotsoap.netlify.app/pledge/` is already authored masthead-to-footer in CWAAA's institutional
register — Form CW-1, "Declaration of Intent to Lather," "of sound mind and disputed scent," "File my
declaration," "Your name is on the roll." The document is right; its housing and three specific
strings are not.

---

## 1. Job and audience

Two visitors arrive, and the route is built for the second.

- **The referred man** reaches `/pledge` from a copied link a woman sent him, or from the Take the
  Pledge action carried on every other CWAAA route. He is the one who signs. His job: understand what
  is being asked, sign it with low friction, and leave with a receipt and one current issue, nothing
  more. He is the layout's subject.
- **The referring woman** reaches it to check what she is sending before she sends it, or to sign it
  herself. She needs the oath legible without scrolling into a form.

The route arrives with trust already earned across Findings and Recovery Stories. It spends it.
design.md §5: "**Pledge:** a safe, formal, meaningful civic commitment with no Office presence." No
Office reference, transmission language, review threat, or surveillance joke appears anywhere on this
route or in either fulfillment message. The Got Soap? "Want to Learn More?" seam does **not** apply
here — on CWAAA the visitor is already home.

## 2. Outcome and proof

Primary task: read the oath, then sign it. Success is a `SWORN` settle with the declaration still on
screen. Proof is the persistence of what was signed — this route's credibility rests on the visitor
being able to see the document after filing it, the way a signed form stays in your hand.

Secondary, in order: share the declaration, copy the filing link. Both are contract-mandatory.

## 3. Fixed by contract — not open to design

`docs/contracts/pledge.v1.json` (byte-identical to `../docs/contracts/pledge.v1.json`) governs. A
builder may not vary any of this:

| | Requirement |
|---|---|
| Fields | `firstName` → `metadata__first_name`; `email` → `email`; `consent` checkbox (no Buttondown name); `company` honeypot |
| Backend | Buttondown, the **one shared audience**, `BUTTONDOWN_USERNAME`. Never Netlify Forms. |
| Fulfillment | Exactly **two** messages: `pledgeReceipt` immediate, `currentIssue` after a configurable short delay. `ongoingSubscription: false`, `dripCampaign: false`, `providerExtraMessageAllowed: false`. Buttondown's own confirmation/welcome either *is* the receipt or is disabled — never a third message. |
| Consent | Must visibly disclose **all four**: exactly two messages, an immediate receipt, a separately delivered current issue, no ongoing subscription. Withdrawal before the issue suppresses it. |
| Success | `semantic: "SWORN"`, `mustOfferShare: true`, `mustOfferCopyLink: true` |
| Privacy | Pledge and email values never enter analytics, logs, screenshots, or test reports. |

Invariant that licenses this whole brief: *"Visual treatment and surrounding copy may differ; field
meaning and success semantics may not."*

## 4. Three strings that cannot be ported — the compliance gap

The live page and `site/src/content/copy.ts` `export const pledge` contain **contract and canon
violations**. These are re-authored by the copy lane (Vivian, institutional deadpan), not carried:

1. **The email field placeholder** — `"Where to send Movement Updates."` Promises a publication. The
   contract forbids an ongoing subscription.
2. **The consent label** — `"I understand this declaration is a binding moral contract."` Funny, and
   discloses **none** of the four required facts. Consent is the one string on this surface with
   legal-shaped constraints rather than taste ones. It must state the two messages plainly and still
   sound like CWAAA wrote it.
3. **The privacy paragraph** — `"Movement Updates — new posters, the occasional bulletin… Unsubscribe
   any time."` Describes a newsletter that does not exist. Replace with the exact two-message
   explanation.
4. **`success.note`** — `"Movement Updates will arrive when there is movement."` Same defect.
5. **`welcomeEmail`** (out of this route's scope, flagged because it is the same program) — currently
   says the declaration was *"received, reviewed, and filed in triplicate by the **Office of Lather
   Compliance**"* and *"The Office classifies this as a scent forecast."* This violates the PRD hard
   line — *"Do not say the Office receives, files, owns, stores, or fulfills subscriber data"* — and
   design.md §Pledge. **CWAAA files its own form.** The receipt is re-authored before send.

Everything else in that export ports intact: the header block, the oath, the field labels, the first
name placeholder, the submit label and micro, all three error strings, `success.stamp`, and the share
strings.

## 5. Selected direction — *Ruled, not papered; engraved, and only here*

**AMENDED 2026-09-17 — owner direction. Read this before the section below it.**
The Pledge is **the one CWAAA surface that may be decorative**, and the reason is specific: it is the
only place the site is not cosplaying as official paperwork. Everywhere else, the look of a document
would be a costume — the appearance of a record used to imply an office that is not there — and
design.md's ban on the manila world, dossier styling and paper texture stands entirely unchanged for
every other route. Here the content genuinely **is** a document, so ornament is not a disguise; it is
the thing itself.

What that licenses, and what it does not:

- **Licensed:** an engine-turned **guilloché** ribbon framing the sheet, corner rosettes, and a large
  engraved rosette watermarked behind the oath. `src/components/Guilloche.astro` and
  `src/components/Rosette.astro`, both ink-only, both `aria-hidden`.
- **Still banned, and the distinction is the whole point:** anything pretending to be a physical
  scan. No manila ground, no aged texture, no paper tooth, no foxing, no vignette, no coffee ring, no
  torn edge, no drop shadow, no wax seal, no letterpress emboss. Guilloché is **drawn** — stroked
  line-work in one ink at one weight, the mark a rose engine leaves on a banknote or a share
  certificate. A certificate is engraved because it is guarding against forgery, which is the
  register a sworn declaration wants. A texture overlay is a photograph of someone else's paper.
- **One move, committed.** The engraving is the route's single decorative idea. The letterhead was
  quieted to let it read. A fleuron, a drop cap, a gold rule or a second accent colour would each make
  this flatter rather than bolder, and none of them is licensed by the above. The seal at the foot
  remains the only colour on the sheet.
- The ornament carries no information and never costs legibility: the watermark sits at 8.5% ink, and
  it is dropped entirely in print, where a screened rosette prints as grey haze.

The original direction, which the amendment extends rather than replaces:

**Owner decision 2026-09-15.** No manila, no page edge, no drop shadow, no dossier styling, no paper
simulation. CWAAA's committed ink-on-ivory system carries the whole route: `.rule` / `.rule.ink` /
`.rule.ink.heavy`, `.sec-label`, `.t-label`, `.t-note`, the measure tokens, real `fieldset`/`legend`.

It reads as a form because it **is** one, and because the typography is filing typography — not
because a picture of paper sits behind it. This keeps `/pledge` continuous with the routes already
shipped, and honors the standing law that paper appears only when the content is an actual paper
artifact, without letting that license slide into the manila world design.md bans.

**The seal is the one artifact.** `src/assets/cwaaaseal.png` heads the declaration as a real printed
mark, supplying the "real document relationship" design.md §Pledge requires without building a page
object. Note for the builder: **the seal is currently used nowhere in the app** — `BaseLayout.astro`
does not reference it — so this is its debut. Do not take that as license to add it to the masthead;
that is a separate decision (see §9).

**Composition.** design.md §Pledge: "The declaration owns the viewport on one accessible signing
surface." One surface, not a scrolling brochure.

1. **Head.** The seal, then the organization name, then `FORM CW-1 · Declaration of Intent to Lather`
   in Catesque notation, then the subtitle "To be completed by the undersigned, of sound mind and
   disputed scent." A heavy ink rule closes the head — this is a filing header, and it should read as
   one at a glance.
2. **The oath — the hero.** Owner decision: **carries verbatim**, all four points plus "Lather. Rinse.
   Respect.", and is set as **the largest element on the route**. The visitor reads what he is
   swearing before he sees a field. Modest, at testimony scale or above; the four sworn points as a
   real list, each point its own line, "I, the undersigned, do solemnly swear:" leading and the
   sign-off set apart. Carrying it word-for-word also keeps the two public presentations legibly one
   program rather than two rewrites of the same bit.
3. **The signing.** Below a rule. Three fields plus the honeypot, persistent labels (never
   placeholder-as-label), adjacent correctable errors, visible focus, generous targets. Consent is a
   real checkbox with the four-fact disclosure. Then the submit, then `submitMicro`.
4. **The fulfillment explanation.** The re-authored two-message paragraph sits with the form, not
   buried in a footer. It is the honest half of the joke.

**Focal moment:** the oath at full scale meeting the heavy rule above the first field — the step from
what you swear to where you sign.

## 6. Success — *the declaration stays, and gets stamped*

**Owner decision 2026-09-15.** The form is **not** replaced by a confirmation block.

- The oath he just swore **remains on screen, unchanged**.
- The fields settle into filed, non-editable values — his name and email read back as entered.
- `SWORN` lands on the declaration in stamp red. This is the route's only stamp-red mark and, per
  `BaseLayout.astro`, red is spent on the pledge action alone.
- Share and copy-link follow beneath the stamp, then the ordinary CWAAA continuation.

You can see what you signed. That is the whole reason for this treatment.

The settle must be announced to assistive technology (live region), must be reachable and operable by
keyboard, and must survive reduced-motion. A non-JavaScript path must still complete the pledge and
still produce a truthful `SWORN` state — CWAAA's accessibility line requires a verified no-JS pledge
path, and PRODUCT.md records that the *current* code allows success without Buttondown acceptance.
**That defect does not ship here: success is reported only on real acceptance, and failure is
reported truthfully.**

## 7. States and ranges

- **First-run / idle:** the declaration, unsigned.
- **Validation:** per-field, adjacent, correctable, never colour-only. Use the approved strings —
  `noName`, `badEmail`, `noConsent`.
- **Submitting:** the action reports work in progress without swapping the document away.
- **Provider failure / offline:** truthful failure. Never a false `SWORN`. The visitor is told the
  declaration was not filed and can retry without re-typing.
- **Honeypot trip:** silent.
- **Already signed (repeat submission):** never duplicates the two-message sequence.
- **Success:** §6.
- **Ranges:** first name 1–~60 characters — the settle must not break on a one-letter name or a long
  one. The oath is fixed length. No pagination, no list, no overflow case.
- **Images disabled:** the seal's absence must not remove the document's identity; the head still
  reads as CWAAA.

## 8. Scope, boundaries, anti-goals

**In scope:** `cwaaa/src/pages/pledge.astro`, a `pledge` export added to `cwaaa/src/content/copy.ts`,
the seal asset wired through `astro:assets`, submission and settle behavior.

**Untouched:** `tokens.css`, `base.css`, `system.css`, `BaseLayout.astro` (no new shared primitives
invented for this route — use what is committed, and if something genuinely missing turns up, raise it
rather than forking it), the recovery-stories routes, the contract JSON, the five canonical posters.

**Anti-goals, explicitly:**

- No manila ground, drop shadow, torn edge, typewriter skin, or wax-seal theater. (The **page object**
  and the **engraved ornament** are now licensed — see the 2026-09-17 amendment at the head of §5.)
- No campaign smolder — no steam, chrome, amber, or display-type seduction. That register belongs to
  Got Soap?.
- No Office anything: no reference, no transmission language, no review threat, no surveillance joke,
  no Establishment Directive citation. This route is the one place the Office is entirely absent.
- No centered hero CTA, no card grid, no rounded dashboard panel, no SaaS success modal with a green
  check.
- No repeated pledge CTAs — the visitor is already on the pledge.
- No newsletter language anywhere. Two messages, then silence.
- No confetti, no celebration animation. The tone is collective relief and procedural certainty, not
  delight.

## 9. Open decisions a builder must not invent

1. **The consent, privacy, `success.note`, and receipt strings** are authored by the copy lane
   (Vivian, `institutional-deadpan`) against §4. They carry disclosure obligations; this brief does
   not author copy.

   **Build note, 2026-09-17 — deviation, recorded.** The route shipped with these strings DRAFTED
   rather than absent, because a consent checkbox with no label is not a shippable form and the
   contract requires that one string to carry four specific disclosures. Every drafted string is
   marked `DRAFT` in `src/content/copy.ts` with the runtime line it replaces and the reason. The
   STRUCTURE is final; the WORDING is the copy lane's and can be replaced without touching the
   route. Drafted: `fields.email.help`, `fields.consent.label`, `fulfillment.body`, `success.note`,
   `submitFiling`, the whole `failure` block, and `notOpen`. The two fulfillment messages
   (`pledgeReceipt`, `currentIssue`) were NOT drafted and do not live in this route.
2. **CW-G06**, the 1080×1080 `pledge-badge-cwaaa.png` share master, is owner-produced and pending.
   Its wording must pass the copy lane first. The share control ships and degrades honestly until the
   master exists.
3. **`BUTTONDOWN_USERNAME` is empty.** No live provider behavior is verified. Do not simulate
   acceptance to make the happy path demoable.
4. **Whether the seal enters the global masthead** is a site-wide identity decision, out of scope
   here. This route uses it; it does not settle that question.
5. **CW-D06** — the two-message copy, the configurable delay, and sender details remain open in
   `PRD-TO-LAUNCH.md`.
6. **What the CTA promises on click is unauthored.** Reader signal, 2026-09-22 (Priya, on the
   four-records read): `Take the Pledge · Form CW-1` is "wallpaper by the third instance." It
   resolves to `/pledge` from seven call sites in `src/content/copy.ts`, three on Home, and none of
   them says what happens when he clicks — so repeating it adds no information. The defect is the
   silence, not the repetition; do not fix this by deleting call sites. Whether the control gains a
   consequence line, and whether that line varies by surface, is a copy-lane decision (Vivian,
   `institutional-deadpan`) against the §3 contract. Evidence:
   `../../docs/copy/reader-evidence-2026-09-22-four-records-r3.md` §7.

## 10. Verification

From `site/`: `npm run build`, `gates`, `copy-gates`, `fidelity`, `distinguish`, `authority`. Plus the
standalone app's own build. Contract conformance is checked against
`cwaaa/docs/contracts/pledge.v1.json` field-by-field, not from memory. WCAG 2.2 AA, keyboard-complete,
no-JS path verified.
