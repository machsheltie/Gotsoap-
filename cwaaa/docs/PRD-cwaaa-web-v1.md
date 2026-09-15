# Product requirements — CWAAA standalone site

**Status:** extraction-ready target specification
**World authority:** `world-bible.md`
**Design authority:** `../design.md`

## Product

CWAAA is a credible fictional advocacy nonprofit and national coalition that makes its case in public.
It turns the campaign's joke into organized participation, monumental findings, persuasive Recovery
Stories, chapter life, tactile programs, and a finite real email relationship. Its locked public
proposition is **THE BAR IS SOAP.**

The site links back to Got Soap? and, only at the deepest appropriate seam, outward to the separate
Office of Lather Compliance. Public CWAAA pages build trust and never perform horror.

## Goals

- Present CWAAA as competent, contemporary, human, expressive, and operational.
- Preserve and deepen approved CWAAA material without importing Got Soap? or Office authorship.
- Host the canonical nonprofit edition of Form CW-1.
- Make Findings and Recovery Stories useful, character-specific, shareable advocacy artifacts.
- Establish real chapter life and Tie One On For Suds participation.
- Create a subtle creator/About seam for real-world disclosure and a separate deep Office referral.
- Maintain one coherent visitor progression:
  `Home → Findings → Recovery Stories → Tie One On → Pledge → Chapters / About → Office referral`.

## Required routes

| Route | Purpose |
|---|---|
| `/` | Public advocacy home |
| `/findings` | Monumental collective findings |
| `/recovery-stories` | Individual behavior-change story index |
| `/recovery-stories/[id]` | Individual Recovery Record |
| `/tie-one-on` | Tie One On For Suds program |
| `/chapters` | National chapter life and participation |
| `/about` | 2024 origin and deepest Office referral |
| `/pledge` | Form CW-1 |
| `/404` | CWAAA-authored not-found state |

Route names are canonical. Public navigation uses **Recovery Stories**, never Case Files. The labels
**Recovery Record** and `RC-NNN` are allowed only after a visitor opens an individual story.

### Redirects

The extraction must provide explicit permanent redirect or static migration rules:

- `/case-files` → `/recovery-stories`
- `/case-files/[id]` → `/recovery-stories/[id]`

The redirect preserves deep links without retaining the obsolete public label or route as canonical.

## Homepage and route responsibilities

The Home route presents **THE BAR IS SOAP.**, “Routine washing is a reasonable collective
expectation,” the coalition group-portrait documentary hero (three members in a plain meeting room facing the camera, one holding a bar of soap; shipped 2026-09-15 — the earlier hands/red-washcloth/gym-bag spec is **struck**), and one continuous
**DOCUMENT. ADVOCATE. ORGANIZE.** composition. It then introduces one Finding, one recovery voice,
Tie One On, coalition scale, one pledge action, and a controlled Got Soap? artifact seam.

Findings are monumental public claims, not dashboards. Recovery Stories are participant
advocacy files, not police evidence, intelligence archives, criminal dossiers, mugshots, or suspect
boards. Tie One On uses real cloth and plausible program artifacts. Chapters show human dispatches
and participation rather than a card grid or animated map. About establishes the 2024 book-club
origin and may contain the deepest neutral Office referral.

## Pledge

- Implement `contracts/pledge.v1.json` exactly.
- Submit to the same Buttondown audience as Got Soap?.
- Preserve accessible validation, consent, honeypot, error, and `SWORN` success behavior.
- Use persistent labels, adjacent errors, visible focus, generous targets, and plain consent language.
- CWAAA owns the program; the duplicate public form is an intentional campaign distribution point,
  not a second list.
- **CWAAA authors fulfillment for both public pledge presentations.** Got Soap? may author its form
  shell and on-page success state, but the delivered receipt and current issue remain CWAAA-authored.
- Affirmative consent visibly discloses **exactly two messages**: one **immediate pledge receipt** and
  **one separately delivered current issue**, with no ongoing subscription or drip.
- Do not say the Office receives, files, owns, stores, or fulfills subscriber data.
- The Pledge route contains no Office reference, transmission language, review threat, or surveillance
  joke.

## Email relationship

After a successful pledge, the finite sequence is exactly two messages:

1. Immediate pledge receipt.
2. One separately delivered current issue after a configurable short delay.

The receipt confirms the declaration without turning the pledge into a subscription. The current
issue uses evergreen content and derives its displayed **month and year** at signup or send time. It
sends exactly once, with no monthly maintenance required. The delay is deployment configuration, not
permanent canon, and may change without changing the visitor promise.

The receipt provides a withdrawal path. If consent is withdrawn or unsubscribed before the current issue
is sent, suppress that issue. The current issue includes a **functioning unsubscribe** or
suppression mechanism even though no automatic future issue is planned.

Buttondown confirmation or welcome delivery must either fulfill the immediate receipt or be disabled;
it may not become a third message. This is **not an ongoing** newsletter subscription or drip
campaign. Any future marketing or program requires separate approval, contract, and consent and must
not alter Form CW-1.

### Email data handling

- Do not send pledge or email values to analytics.
- Retain only the **minimum Buttondown data** needed to deliver the two messages, honor withdrawal or
  suppression, and prevent an accidental resend.
- Remove unneeded fulfillment metadata after the sequence completes; retain only the minimum
  suppression record needed to honor the visitor's choice.
- Do not introduce another email or profile provider without a separately approved contract.

## Cross-site relationships

- `GOT_SOAP_SITE_URL` and `OFFICE_SITE_URL` are centralized optional configuration.
- Empty values render no dead controls.
- The Got Soap? link may be prominent only in campaign-credit context.
- The Office link is a restrained external-authority reference or neutral citation at the deepest
  About seam.
- All external links clearly signal the domain transition.
- CWAAA never labels the Office as its partner, parent agency, supervisor, operator, division, or
  coordinator.
- No ordinary page previews Office behavior or uses Office-authored containment/error language.

## Creator/About seam and disclosure

Privacy, Terms, and DMCA remain globally accessible wherever the site exposes legal navigation.
Their labels and entry points do not announce the fiction. Satire, parody, fictional, spec-work,
and non-affiliation disclosure appears only after the visitor follows the restrained creator credit
through the creator/About seam. No public global satire disclosure is permitted.
The legal destinations remain truthful about actual data collection, rights, contact, storage, and
accessibility behavior. Do not put fictional satire disclosure in the global footer, navigation,
ordinary program pages, or Office referral.
Machine-readable metadata may remain truthful and legally prudent when it is not rendered as
audience-facing disclosure.

## Content

- Migrate approved CWAAA copy from `site/src/content/copy.ts` using `migration-manifest.md`.
- Apply the existing copy protocol before edits.
- Move Office-authored lines out of CWAAA copy; the Office never files Form CW-1.
- Preserve distinct campaign, CWAAA, participant/witness, Office, and reality-sourced Stacey
  registers. CWAAA may host a participant's own testimony or a selected Office-derived fragment
  without adopting that speaker's authority or cadence.
- Present Recovery Stories as conversion and character surfaces. Show belief → behavior →
  consequence → challenge → experiment → benefit → revised belief; keep the participant
  recognizably himself and make the benefit tangible rather than merely avoiding shame or paperwork.
  An earned warm ending is allowed. The before-state remains as foolish or severe as that person's
  canon requires; CWAAA may state a controlled judgment without winking or claiming Office authority.
- Protect participant names within the fiction and never imply government custody, surveillance,
  prosecution, or a real allegation.

## Technical baseline

- Portable static-output implementation; Astro is preferred for compatibility but is not mandated
  until extraction begins.
- Netlify-compatible deployment and redirect configuration.
- One content module and one external-link configuration module.
- Responsive images and self-hosted fonts.
- GoatCounter privacy-conscious analytics, with no pledge or email values sent to analytics.
- No user accounts, backend personal profiles, IP identity, fingerprinting, Office-style recognition,
  or cross-device state.
- Critical Findings and participant content remain semantic live HTML/CSS.

## Accessibility and privacy

- Meet WCAG 2.2 AA.
- Provide keyboard-complete forms, navigation, and story access.
- Use semantic headings, landmarks, lists, tables, and form relationships.
- Recompose wide civic records into labeled mobile structures rather than dashboard scrolling.
- Never convey information through red alone; honor reduced motion.
- Do not present fictional participant records as real allegations.
- Do not send pledge or email values to GoatCounter or any analytics provider.

## Acceptance

- The site is visually and verbally distinct from Got Soap? and the Office.
- CWAAA is unmistakably a nonprofit advocacy coalition, never a regulator.
- The homepage is a public advocacy composition rather than a simulated document or archive interior.
- Findings are monumental, Recovery Stories intimate, Tie One On tactile, Pledge safe, Chapters human,
  and About establishes 2024 before the deep Office seam.
- Both pledge contracts are byte-for-byte identical and submit to one audience.
- The email relationship sends an immediate receipt and exactly one current issue without monthly
  maintenance, subscription enrollment, or a drip campaign.
- Withdrawal before the delayed issue suppresses it, and both messages expose the required consent or
  unsubscribe mechanism.
- The `/case-files` paths redirect to the canonical Recovery Stories routes.
- Public fiction disclosure appears only behind the creator/About seam while Privacy, Terms, and DMCA
  remain accessible.
- Cross-site links are conditional, sparse, and correctly attributed.
- Static build, redirects, links, accessibility, content, contract parity, and authority checks pass.
