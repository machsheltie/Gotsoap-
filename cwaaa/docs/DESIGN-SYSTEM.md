---
name: CWAAA
description: A coalition making its case in public — contemporary civic editorial with exceptional art direction.
---

<!-- PARTIAL: the locked visual laws below are binding now. Typography, color, grid, surfaces,
     motion, interaction states, and responsive behavior remain UNLOCKED pending the owner
     interview in ui-system.md. Token values must not be invented to fill them. -->

# Design System: CWAAA

**Authorship:** CWAAA public advocacy surfaces only. No token or effect from Got Soap? or the Office
of Lather Compliance may appear here, and nothing here may travel to them. See `../../DESIGN.md` for
the routing law.

**Authority.** This is the tokenized companion to `../design.md` and `ui-system.md`, which win on
conflict.

**Authority note.** `ui-system.md §12` carries a standing prohibition: until a section is locked
there, no agent may choose typefaces, select a palette, add cards or dashboards, infer motion from
framework defaults, create generic states, use paper texture as a global theme, or fill missing
details with industry-standard nonprofit design. When information is pending, preserve the current
implementation or request the owner decision. **This record does not lift that prohibition.** The
sections below state what is locked and mark what is not.

## Overview

**Creative North Star: "A Coalition Making Its Case in Public"**

CWAAA is a functioning national advocacy coalition with exceptional art direction. Its public site
validates a reasonable expectation, organizes people around practical action, and presents its case
with confidence. It is a public advocacy platform — not a document pretending to be a website, a
filing-cabinet simulation, a government portal, a museum exhibit, or a generic nonprofit theme.

The locked proposition is **THE BAR IS SOAP**: routine washing is a reasonable collective
expectation. The comedy comes from treating an absurdly low bar with competent civic seriousness
while protecting every participant's dignity. CWAAA earns trust before introducing any unease.

Two layers share one continuous public composition. The **institutional layer** builds trust through
ordinary navigation, mission clarity, explicit program ownership, accessible forms, participant
stories, chapter information, findings, and restrained institutional language. The **expressive
layer** prevents generic design through monumental public statements, exhibition-scale findings,
intimate testimony, documentary human traces, tactile program artifacts, authored composition,
route-specific spatial laws, and sparse cumulative wrongness. The site never alternates between "a
website" and "a simulated archive."

**Key Characteristics:**

- Public advocacy first; the archive is evidence inside it, never the frame around it.
- Route-specific spatial law — Findings, Recovery Stories, and Tie One On do not share one layout.
- Paper is content, not the universe.
- Trust is earned before unease; wrongness arrives through continuity, never horror.
- Dignity is non-negotiable — every participant stays a person, not an exhibit.

## Colors

**Status: UNLOCKED.** Exact tokens, values, and the white-versus-ivory split await the owner
interview (`ui-system.md §4`). Do not select a palette from nonprofit convention to fill this.

The locked *material* direction, which any future palette must satisfy:

- Clean ivory and white digital fields.
- Ink navy.
- Controlled stamp red — restrained, never decorative.
- Real woven red cloth (the washcloth ribbon), as photographed material rather than a color swatch.
- Restrained black.
- Natural documentary color from photography.

### Named Rules

**The Paper-Is-Content Rule.** Genuine paper appears only when an actual form, report, letter,
packet, or citation is present. Clips, tape, folds, pins, stamps, registration marks, and paper
texture appear only when a real object requires them. There is no office-supply confetti and no
all-manila visual world.

**The Ribbon Discipline Rule.** The red washcloth ribbon is the program symbol, not a universal
decoration. The CWAAA seal is the coalition identity, used accurately and consistently — never as a
fake-government badge.

**The Never-Red-Alone Rule.** Information is never conveyed by red alone.

## Typography

**Status: families and weights LOCKED** by owner decision 2026-08-13, revised 2026-08-14
(`ui-system.md §3`). Scale, leading, tracking, measures, case discipline, and responsive behavior
remain UNLOCKED and may not be filled by an agent. Selection criteria and binary screening are in
[`font-brief.md`](font-brief.md).

**Proposition:** MORVI (`--font-cwaaa-proposition`) — `THE BAR IS SOAP.`, route-opening statements.
**Monumental figure:** Mirk Slab (`--font-cwaaa-figure`) — the single oversized Findings figure.
**Text:** Proda Sans (`--font-cwaaa`) — reading matter: explanation and body copy.
**Interface and notation:** Catesque (`--font-cwaaa-interface`) — navigation, controls, forms,
metadata, `RC-NNN`, tables, dates.
**Testimony:** Modest (`--font-cwaaa-testimony`) — Recovery Stories long-form only.
**Identity serif:** PT Serif (`--font-cwaaa-seal`) — the coalition seal and existing certificate
artifacts.

One family per role; none carries two. The dividing line between Proda and Catesque is **reading
versus operating** — prose the visitor reads is Proda, anything they scan, align, or act on is
Catesque.

**Character:** a tall-x-height sans states the proposition, a heavy slab lands the number, a plain
contemporary sans does the explaining, and a figure-literate sans handles everything the reader has
to operate — so the coalition can be monumental and ordinary in the same breath without either voice
borrowing the other's authority.

### Hierarchy

- **Proposition** (MORVI 400, its only weight): the opening claim. Never synthesise a bolder weight.
- **Monumental figure** (Mirk Slab 900): one figure owning a Findings viewport.
- **Text** (Proda Sans 400, italic 400, 700 emphasis): everything explanatory.
- **Interface and notation** (Catesque 400 tables/fields, 500 nav/controls/notation, 700 table
  headers): everything operable or countable.
- **Testimony** (Modest 400, italic 400, 700): participant voice at reading length.

The direction that governed the selection and still governs its use: contemporary civic editorial;
forceful display scale for propositions and Findings; plain, highly readable sans for navigation,
explanation, and form controls; a restrained serif for long testimony only where it improves reading;
hierarchy from scale, measure, weight, rules, and whitespace — never from simulated paperwork.

### Named Rules

**The Aligned-Figures Rule.** MORVI and Mirk Slab carry proportional figures *by measurement* — a
32.6% and 20.8% em spread across the ten digits at 1000 upm — and declare no figure feature to
substitute a fixed-width set. Catesque carries `tnum` (verified to collapse all ten digits to a
single 0.620em advance), `zero`, `case`, `pnum`, `subs`, `sups`, and `frac`, and therefore owns every
figure that must align — Findings tables, stacked figure columns, `RC-NNN` identifiers, dates.
`.type-cwaaa-figure` is for one figure standing alone; two or more use `.type-cwaaa-table`.

Test this by measuring advance widths, not by looking for a `tnum` tag. A font whose default figures
are already fixed-width needs no `tnum` and will not declare one; absence of the feature is not
evidence of proportional figures. Here the geometry and the feature table happen to agree, but only
the geometry was ever the proof.

**The Not-Every-Black-Is-Black Rule.** Catesque Black measures a 0.164em stem — lighter than Proda
Bold's 0.175em, and far off Mirk Slab Black's 0.280em. It may not set a proposition or a monumental
figure regardless of its name or the foundry's recommendation. Weight names are marketing; stem
measurements are not.

**The Assigned-Weight Rule.** Only weights with an assigned production role may be declared or
delivered. Mirk Slab ships 82 styles across a width axis, Proda Sans 18, Catesque 10; presence in
`public/fonts` is not permission to load. Mirk Slab is additionally delivery-restricted — its OS/2
`fsType` is `viewOnly`, and the owner's confirmation of web rights is recorded in
`site/config/cwaaa-font-manifest.json`. Catesque and Proda are `editable`, the permissive setting,
and need no such confirmation.

**The No-Monospace Rule.** Monospace does not appear on normal CWAAA surfaces. It reads as terminal
or bureaucratic simulation, and both are the wrong author.

**The No-Template-Pairing Rule.** Inter/Playfair, Montserrat/Lora, Poppins/Merriweather, and
equivalents are refused by default. A pairing that a nonprofit theme would ship is disqualified on
that basis alone.

## Layout

**Status: UNLOCKED** for grid, spacing, and composition tokens (`ui-system.md §5`), and for surfaces,
borders, corners, and shadows (`§6`).

Locked route expression, which any spatial system must express distinctly:

- **Home** is a major public advocacy campaign. The hero is a documentary-editorial image — a woman's
  hands tying a red washcloth ribbon around a genuinely used black gym bag on a locker-room bench —
  and the image **interrupts the typography rather than forming a 50/50 split**.
- **Findings** are monumental, public, collective, vertical, and declarative.
- **Recovery Stories** are intimate, humane, individual, and reading-oriented.
- **Tie One On** is tactile and cloth-led.
- **Pledge** is a safe ceremonial civic act.
- **Chapters** are a distributed human network — not a map, not a card grid.
- **About** establishes the 2024 origin before the deepest Office seam.
- **The Office referral** is sparse, neutral, and unexplained.

Locked homepage sequence: opening proposition → one continuous `DOCUMENT. ADVOCATE. ORGANIZE.`
composition → one current Finding → one intimate recovery voice → one tactile Tie One On moment →
coalition scale → one clear pledge action → one restrained Got Soap? relationship seam.

On narrow screens, recompose tables into labeled records rather than forcing horizontal dashboards,
and preserve the authored hierarchy instead of turning every section into a stacked card.

## Elevation & Depth

**Status: UNLOCKED** (`ui-system.md §6`). Depth behavior is not yet specified and must not be
inferred from a framework default or a card convention.

## Components

**Status: UNLOCKED** for the interaction-state matrix (`ui-system.md §8`).

Locked navigation law: primary navigation is **Findings**, **Recovery Stories**, **Tie One On**,
**Chapters**, **About**, and **Take the Pledge** — ordinary, visible, and immediately understandable.
Prohibited outright: an INDEX control, filing-tab global navigation, registry numbers in route
labels, pill CTAs, gradient CTAs, a floating donation bubble, bureaucratic usability theater, and any
Office link in primary navigation.

Locked motion law: motion is restrained and material — a `SWORN` mark settles, a cloth fold reveals a
program instruction, a copied link confirms, navigation responds clearly. Motion never simulates
surveillance, jurisdiction, system failure, or an institution watching the visitor. No steam, smoke,
cinematic parallax, cursor tracking, flicker, ominous audio, countdown, or animated ribbon belongs to
CWAAA. Reduced motion removes nonessential transitions without removing state or success feedback.

Accessibility floor (locked): WCAG 2.2 AA; semantic headings, documents, tables, forms, and
navigation; persistent labels with adjacent errors; visible focus; generous targets; plain consent
language; text equivalents for seals, ribbons, stamps, and meaningful imagery; critical type and
findings kept live, legible, and zoom-safe.

## Do's and Don'ts

### Do:

- **Do** earn trust first. Wrongness may come only from sparse chronology, a neutral citation, a
  repeated code, unusually complete continuity, an institution treated as routine, or an artifact
  returning with new meaning.
- **Do** keep every recovery story humane and participant-centered.
- **Do** give each route its own spatial law rather than one layout with swapped content.
- **Do** preserve the current implementation or request the owner decision when a section here is
  marked UNLOCKED.

### Don't:

- **Don't** perform horror. No glitches, flicker, warnings, surveillance animation, countdowns,
  ominous audio, cursor tracking, hostile validation, or threats. The Office owns the full uncanny
  encounter.
- **Don't** write Office language on ordinary CWAAA pages.
- **Don't** build a centered nonprofit hero, a headline/paragraph/two-CTA template, a three-card
  program row, a mission/vision/values triptych, a bento grid, an impact dashboard, an animated map,
  or a testimonial carousel.
- **Don't** ship rounded white cards, a generic donation CTA, a pastel wellness palette, a
  faux-government masthead, beige paper behind every section, decorative stamps or form numbers,
  repeated document components, one layout across routes, stock volunteer photography, dossier
  styling, or SaaS navigation.
- **Don't** announce satire on public pages.

**Acceptance test.** Does this page look like the natural public expression of CWAAA? If it instead
places CWAAA's content into the nearest familiar nonprofit, archive, or civic-portal template, it is
not finished.

---

## Transitional runtime (recorded 2026-08-13 — evidence, not target)

The combined runtime in `site/` currently ships a CWAAA register that **contradicts the target above**
and must not be treated as the incumbent world to extend or carbonize.

What ships today, in `site/src/styles/tokens.css` (`.register-cwaaa`) and `fonts-cwaaa.css`:

| Runtime token | Value | Role as implemented |
|---|---|---|
| `--cwaaa-manila` | `#efe6cf` | paper stock — applied as the register's universal ground |
| `--cwaaa-ink` | `#2f3e5c` | ballpoint navy: text, seal line-work |
| `--cwaaa-stamp` | `#a63d2f` | rubber-stamp red: SWORN, ribbon, required marks |
| `--wax-oxblood` | `#7d2b21` | certificate seal wax |
| `--font-cwaaa` | *(superseded 2026-08-13)* | was PT Serif applied as the register's only family; now Proda Sans, text only |
| `--font-cwaaa-interface` | *(added 2026-08-14)* | Catesque — interface and notation, split off Proda so no family holds two roles |

`.fx-letterpress` (ink-on-paper deboss) is scoped to the certificate world.

**Partly resolved.** The typographic half of this contradiction is fixed: `--font-cwaaa` now resolves
to Proda Sans, and the register's role utilities carry the locked cast. The **material** half stands
— manila is still painted behind every CWAAA surface, which `design.md §8` and `§13` reject. That
remains an open redirection.

**Open accessibility defect (needs an owner decision).** The register's muted secondary text —
`color-mix(in srgb, var(--cwaaa-ink) 62%, var(--cwaaa-manila))` — measures **3.29:1** on manila,
below the 4.5:1 WCAG 2.2 AA floor for body text that `design.md §12` requires. Raising the ink
proportion clears it — **76%** is the minimum (4.64:1) and **78%** gives comfortable headroom
(4.87:1) — but that is a palette value, and §12 of `ui-system.md` prohibits any agent from selecting
one here. Recorded, not fixed.

**The contradiction, stated plainly.** The runtime paints manila behind every CWAAA surface and sets
every CWAAA word in one serif. The target design calls an all-manila visual world a failure
(`design.md §8`), lists "beige paper behind every section" in its anti-default constitution (`§13`),
and requires a plain readable sans for navigation, explanation, and forms (`§9`).

**Therefore:** a scan of the current code is not a description of CWAAA's design system. Extending
the manila register is drift, not consistency. Until the owner interview locks typography and color,
preserve the existing implementation where it already ships, build new surfaces against the locked
laws above, and request the missing decision rather than inventing tokens.

PT Serif's status is narrower than the runtime implies: it is the coalition's identity serif and may
support long testimony where it improves reading. It is not licensed by this record to set
navigation, forms, or explanatory body copy.
