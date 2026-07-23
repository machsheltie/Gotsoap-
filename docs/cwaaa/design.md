# CWAAA standalone design system

**STATUS:** target-state authority
**AUTHOR:** CWAAA, a credible advocacy nonprofit
**NOT:** Got Soap? campaign styling or Office of Lather Compliance styling

## Design thesis

CWAAA should feel like the small national nonprofit whose briefing packet lands on the right desks:
competent enough to trust, specific enough to be funny, and materially human. The design language is
letterhead, field reports, chapter packets, washcloth ribbons, stamped declarations, annotated
findings, and carefully maintained case files.

It is not “ugly on purpose.” It is not a faux government portal. It does not borrow the Office's
containment language or unnerving error infrastructure.

## Anti-defaults

- no generic charity hero with smiling volunteer photo and Donate button;
- no three-card “our impact” row;
- no pastel wellness branding;
- no distressed conspiracy dossier;
- no fake federal masthead, flag, eagle, or service-navigation grid;
- no Got Soap? thirst-trap typography across nonprofit prose;
- no dashboard charts where a ruled finding table makes the joke better.

## Material system

| Token | Value | Use |
|---|---|---|
| `paper-manila` | `#EFE6CF` | primary paper stock |
| `letter-white` | `#FBFAF5` | correspondence and clean reading fields |
| `ink-navy` | `#2F3E5C` | text, seal linework, rules |
| `stamp-red` | `#A63D2F` | SWORN state, required marks, sparing emphasis |
| `carbon-grey` | `#6D6A63` | metadata and duplicate-copy cues |
| `ribbon-cloth` | `#B94B45` | washcloth ribbon, never general CTA fill |

Paper is quiet, not grungy. One or two registration imperfections may suggest physical production;
heavy distressing makes the organization look unserious.

## Typography

- **PT Serif:** reports, letters, findings, form instructions, long reading.
- **Libre Franklin:** navigation, labels, chapter metadata, accessible controls.
- **Montserrat:** form numbers, dates, legal copy, document indexes.
- No Oswald except inside a quoted Got Soap? campaign artifact.

Use document hierarchy rather than web-template hierarchy: issue number, title, short finding,
supporting record, disposition. Preserve comfortable body size and line length.

## Identity

### Seal

Soap bar plus barred aerosol can, drawn as a competent nonprofit emblem. It may stamp declarations,
identify official CWAAA publications, and anchor the masthead. It must not resemble the Office seal
or imply government authority.

### Washcloth ribbon

The **Tie One On For Suds** mark should read as folded cloth, not a generic awareness-ribbon icon.
Use it in pledge success, chapter material, and program pages.

### Forms

Form CW-1 is a real accessible HTML form presented as a declaration. Persistent labels, adjacent
errors, visible focus, generous targets, and plain consent language outrank visual mimicry.

## Information architecture

The standalone site may include:

- Home / mission;
- The State of Male Hygiene / findings;
- Recovery Case Files;
- Tie One On For Suds;
- Lather Pledge / Form CW-1;
- About the coalition and chapters;
- a restrained external link to Got Soap?;
- a restrained external link to the Office of Lather Compliance.

The Office link is a referral to a separate agency. Do not preview its behavior so fully that the
custom-error reveal is spoiled.

## Page compositions

### Home

Lead with a letterhead-scale declaration and one oversized filed finding, offset by the seal and a
chapter annotation. Avoid a photo-led charity hero. The dominant event is “someone finally put this
on the record.”

### Findings

Use unequal ruled zones, marginal notes, and numbered findings. Tables remain readable on mobile by
recomposing into labeled records, not horizontal scrolling dashboards.

### Case files

Arrange as a records room with index logic and distinct status bands. Do not treat people as
criminals. A file opens into testimony, reform status, and next action.

### Pledge

Form CW-1 sits on its own reading surface. Completion applies one short `SWORN` stamp-settle motion
and reveals share/copy actions. It implements `contracts/pledge.v1.json` exactly.

### Office referral

Render as a quiet related-authority citation or external-reference line. It must clearly leave CWAAA
and must not say the Office is a CWAAA division.

## Motion

CWAAA motion is administrative: a stamp settles, a file tab aligns, a copied link confirms. No steam,
smoke, cinematic parallax, or surveillance-like tracking animation.

## Accessibility and responsive behavior

- WCAG 2.2 AA.
- Semantic documents, tables, forms, and headings.
- Mobile preserves document order and labels; decorative marginalia moves after content.
- All stamps have text equivalents.
- No information conveyed by red ink alone.
- Reduced motion removes stamp movement without removing success.

## Acceptance test

CWAAA passes when it feels trustworthy enough to sign a pledge, specific enough to exist beyond the
screen, and separate enough that no one mistakes it for either the campaign or a government agency.
