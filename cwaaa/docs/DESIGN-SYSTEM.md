---
name: CWAAA
description: A coalition making its case in public — contemporary civic editorial with exceptional art direction.
colors:
  ink: "#2f3e5c"
  stamp: "#a63d2f"
  ivory: "#f5f0e6"
  white: "#ffffff"
  black: "#15181f"
  grey: "#5f5d57"
  tint: "#e0857a"
  on-ink-muted: "rgba(245, 240, 230, 0.78)"
  hairline: "rgba(47, 62, 92, 0.28)"
  hairline-on-ink: "rgba(245, 240, 230, 0.32)"
typography:
  proposition:
    fontFamily: "CWAAA Morvi, Arial Black, sans-serif"
    fontSize: "clamp(4.5rem, 2rem + 8vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "CWAAA Mirk Slab, Rockwell, Georgia, serif"
    fontSize: "min(clamp(9rem, 2rem + 30vw, 30rem), 60vh)"
    fontWeight: 900
    lineHeight: 0.72
    letterSpacing: "-0.035em"
  finding:
    fontFamily: "CWAAA Morvi, Arial Black, sans-serif"
    fontSize: "clamp(2.75rem, 1rem + 5.8vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  line:
    fontFamily: "CWAAA Morvi, Arial Black, sans-serif"
    fontSize: "clamp(2.25rem, 0.6rem + 4.9vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.012em"
  statement:
    fontFamily: "CWAAA Proda Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 1.25rem + 1.75vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  voice:
    fontFamily: "CWAAA Modest, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 1.35rem + 1.2vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.36
  testimony:
    fontFamily: "CWAAA Modest, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 0.9vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.36
  lead:
    fontFamily: "CWAAA Proda Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "CWAAA Proda Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  note:
    fontFamily: "CWAAA Proda Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  interface:
    fontFamily: "CWAAA Catesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    letterSpacing: "0.04em"
    fontFeature: "tnum 1, zero 1, case 1"
  notation:
    fontFamily: "CWAAA Catesque, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.08em"
    fontFeature: "tnum 1, zero 1, case 1"
rounded:
  none: "0"
spacing:
  gap-s: "0.875rem"
  gap-m: "1.75rem"
  gap-l: "clamp(2rem, 1rem + 2.8vw, 4rem)"
  gutter: "clamp(1.25rem, 0.5rem + 2.4vw, 3rem)"
  section: "clamp(3.5rem, 2rem + 4.5vw, 6rem)"
components:
  action-primary:
    textColor: "{colors.stamp}"
    typography: "{typography.notation}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
  action-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.notation}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
  act-box:
    textColor: "{colors.ink}"
    typography: "{typography.notation}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.1rem"
    height: "44px"
  act-box-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
  link-rule:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 0 2px"
  marker:
    textColor: "{colors.ink}"
    typography: "{typography.notation}"
  sec-label:
    textColor: "{colors.grey}"
    typography: "{typography.notation}"
  rule-hairline:
    backgroundColor: "{colors.hairline}"
    height: "1px"
  rule-ink:
    backgroundColor: "{colors.ink}"
    height: "1.5px"
  rule-ink-heavy:
    backgroundColor: "{colors.ink}"
    height: "3px"
  record:
    textColor: "{colors.ink}"
    typography: "{typography.interface}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
---

<!-- PARTIAL. The frontmatter above and the laws below RECORD WHAT SHIPS in
     `src/styles/tokens.css`, `base.css` and `system.css` as of 2026-09-15. It is not
     a ratification. Color and the type scale remain PROPOSED under CW-D01 / CW-D02 and
     carry their flags in `tokens.css`; the owner interview is still outstanding, and a
     value's presence here means "this is what the approved home page was rendered
     with," never "this was chosen." What IS locked: the six-face cast, ink, stamp, the
     white/ivory ground with manila retired to actual paper artifacts, the Findings
     figure size, the pledge action tier, and the four-rung breakpoint ladder.

     The ui-system.md §12 prohibition still stands for everything NOT recorded here.
     An agent may read these values; it may not invent a new one to fill a gap. -->

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
while presenting recovery records as advocacy rather than enforcement. CWAAA earns trust before introducing any unease.

Two layers share one continuous public composition. The **institutional layer** builds trust through
ordinary navigation, mission clarity, explicit program ownership, accessible forms, participant
stories, chapter information, findings, and restrained institutional language. The **expressive
layer** prevents generic design through monumental public statements, exhibition-scale findings,
intimate testimony, documentary photographs of people, tactile program artifacts, authored composition,
route-specific spatial laws, and sparse cumulative wrongness. The site never alternates between "a
website" and "a simulated archive."

**Key Characteristics:**

- Public advocacy first; the archive is evidence inside it, never the frame around it.
- Route-specific spatial law — Findings, Recovery Stories, and Tie One On do not share one layout.
- Paper is content, not the universe.
- Trust is earned before unease; wrongness arrives through continuity, never horror.
- Participant presentation is specific: show the person, preserve the fictional name boundary, and
  avoid mugshot, suspect-board, and punishment framing. This visual rule does not soften what he did.

## Colors

**Status: ink and stamp LOCKED; the rest PROPOSED under CW-D02.** The values are in the
frontmatter and in `tokens.css`; this section says what each one is *for*. The palette is six
working colors and two photographic grounds — not a ramp, and there is no tonal scale to reach for.

### Primary

- **Ink navy** (`--cw-ink`, LOCKED): the coalition's voice. It sets every heading, every rule, the
  seal's line-work, and it floods whole regions — the `DOCUMENT. ADVOCATE. ORGANIZE.` field, the
  footer. Navy is how CWAAA speaks in its own name.
- **Stamp red** (`--cw-stamp`, LOCKED): spent on the pledge action and required marks, and nowhere
  else. **Tint** (`--cw-tint`) is the same red lifted to clear 4.6:1 on navy, and exists only
  because stamp red cannot be read on an ink field.

### Neutral

- **Ivory** (`--cw-ivory`): the primary digital field. The site's default ground.
- **White** (`--cw-white`): the secondary field, and specifically the *reading* ground — the
  recovery voice, the Findings register, the opened record.
- **Civic black** (`--cw-black`): body prose on light fields. Headings are navy; prose is black.
- **Grey** (`--cw-grey`): metadata, notation labels, and supporting prose (6.4:1 on white).
- **Hairline** (`--cw-hairline`, and `--cw-hairline-on-ink`): the separating rule, and the only
  border in the system that is not full ink.

### Photographic grounds

- `--cw-photo-ground` and `--cw-cloth-ground` are **placeholders for owner photography that does not
  exist yet** — a room tone and a cloth tone under an `ImageSlot` with no image. They are never a
  final surface and never a decorative fill. When the asset lands they disappear.

### Named Rules

**The Ground-Alternation Rule.** Fields alternate; they do not repeat. A route reads
ivory → white → ink as its sections change job, and no two adjacent fields share a ground unless the
second is a continuation of the first. This is what carries the composition in a system with no
shadows and no cards: the ground change *is* the section break.

**The Red-Is-One-Thing Rule.** Stamp red means *the pledge*. A second use — an accent rule, a hover,
a marker dot, an alert, a highlighted figure — takes the meaning away from the only action on the
site that needed it. The section marker's dot is grey for this reason, by owner decision
2026-09-14.

**The Navy-Speaks-Black-Reads Rule.** Ink navy sets what the coalition asserts (headings, rules,
figures, labels). Civic black sets what the visitor reads (prose). A heading in black or a paragraph
in navy inverts who is talking.

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
(`ui-system.md §3`). The **scale and the measures are PROPOSED under CW-D01** and recorded in the
frontmatter as shipped — an agent may use them and may not add to them. The Findings figure size is
LOCKED (2026-09-15). Selection criteria and binary screening are in
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

### Scale and measure (PROPOSED, CW-D01 — recorded as shipped)

Every step exists for one named job, and the token names say which. Nine display and reading steps
carry the whole site: `proposition` (the home claim, MORVI), `figure` (the one Findings number, Mirk
Slab, LOCKED), `finding` (a Finding's statement), `line` (`DOCUMENT. ADVOCATE. ORGANIZE.` and the
scale line), `statement` (the coalition's plain declarative heading, Proda), `voice` (the Recovery
Stories index — the participant's own sentence, which outranks the coalition's caption on that route
and only that route), `testimony` (a pulled quote at reading scale), `lead`, and `body`. Notation
runs at two sizes in Catesque and nothing else.

**Measure is four named columns, and they are picked by job, not by page:**

| Token | Job |
|---|---|
| `--cw-measure-quote` (30ch) | one pulled sentence at testimony scale, sitting beside something else |
| `--cw-measure-voice` (38ch) | a man's whole testimony as the *subject* of a reading row, 1–6 sentences, never truncated |
| `--cw-measure` (46ch) | the reading column — long-form testimony, table prose |
| `--cw-measure-note` (52ch) | supporting prose that runs wider because nothing competes with it |

### Named Rules

**The Pick-The-Job Rule.** One face may legitimately take three widths, because it is doing three
different jobs. What is never legitimate is a route writing a *new* number because it could not see
what the other routes used. Before setting a `max-width` in `ch`, find the job in the table above. A
fifth measure is drift. This rule exists because Modest shipped at 30ch, 38ch and 46ch on three
routes with no token between them, and `52ch` was hard-coded in five places.

**The Reading-Versus-Operating Rule.** Prose the visitor **reads** is Proda at any size — including
a 15px note under a table, which is what `.t-note` is for. Only what they **scan, align, or act on**
is Catesque: labels, figures, dates, identifiers, controls, table cells. The line is the job, not
the size. The cast had no small-prose role for months, so five separate elements set full sentences
in the operating face; `.t-note` closes that gap and there is no remaining excuse.

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

**Status: spacing scale and the breakpoint ladder PROPOSED and recorded as shipped
(`ui-system.md §5`); surfaces, borders and corners settled by the built home page (`§6`).**

### The home page is the reference implementation

`src/pages/index.astro` is the north star. It is the only route the owner has approved as a whole
composition (Comp D, "The Field Report", 2026-09-14; hero shipped and ratified 2026-09-15), and
every element law in this document was either derived from it or verified against it. **When another
route and the home page disagree about an element, the home page is right and the other route has
drifted** — unless that route's own surface brief names the departure and says why.

This is a rule about *elements*, never about *composition*. Routes are required to differ
spatially — `design.md §6` gives each one its own spatial law, and one layout repeated across routes
is listed in the anti-default constitution. Findings is a monument, the record is a reading surface,
Tie One On is cloth. What they may not do is invent a second version of a shared element in order to
express that difference.

**What home fixes for every route:**

1. **The field is the unit.** A section is a full-bleed band with its own ground, padded
   `var(--section) var(--gutter)`. Not a container, not a centered column, not a card. The gutter is
   the only horizontal inset.
2. **Ground alternation carries the section break** (see Colors). Home runs
   ivory → ivory → **ink** → ivory → white → photograph → ivory → white.
3. **Asymmetric two-column fields.** Where a field splits, it splits unevenly and the ratio means
   something: `1.15fr / 1fr` for statement-and-actions, `1.4fr / 1fr` for a Finding and its note,
   `1fr / 1.2fr` for a photograph and the voice beside it. Never `1fr 1fr`, never three equal
   columns.
4. **`.marker` opens a field.** Dot, then a short label, then the heading. Every field on the page.
5. **Rule weight carries meaning** and is picked by job, never copied from a neighbouring page.
6. **One pledge action, after the sequence** — not repeated at every section.
7. **Photographs are full-bleed or a bounded grid child, and they settle.** Nothing is inset in a
   frame; nothing has a caption bar.
8. **Every element reveals in reading order with an explicit `--i` stagger.** Marker 0, heading 1,
   rule 2, body and record 2–3. The stagger is the composition's pacing, not decoration; an element
   without `--i` breaks the row it belongs to.

Locked route expression, which any spatial system must express distinctly:

- **Home** is a major public advocacy campaign. The hero is a documentary-editorial photograph of
  the coalition's own group portrait — three members in a plain meeting room, facing the camera, one holding a bar of soap — shipped and closed
  2026-09-15 — and the image **interrupts the typography rather than forming a 50/50 split**. The
  earlier gym-bag/washcloth hero spec is struck; people are shown, and no still life appears
  anywhere on the site (`../GRAPHICS-TO-MAKE.md` § Standing image law).
- **Findings** are monumental, public, collective, vertical, and declarative.
- **Recovery Stories** are intimate, character-specific, persuasive, and reading-oriented.
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

### The one page-shell exception

`/recovery-stories/[id]` is the **only** route that is a measure-limited centered column
(`max-width: 62rem`) rather than a run of full-bleed fields. That is correct and deliberate: an
opened record is one continuous document a visitor reads top to bottom, and banding it into
alternating fields would turn a man's record into a marketing page. **Do not "fix" it to match home,
and do not copy it to a route that is a field composition.** It is the exception because it is a
reading surface; nothing else on the site is.

### Named Rules

**The Four-Rung Rule.** The breakpoint ladder is exactly four — `--bp-phone` (700), `--bp-reading`
(860), `--bp-util` (900), `--bp-nav` (1000) — recorded in `tokens.css`. CSS cannot read a custom
property inside a media query, so **every `@media` must name which rung it is applying** in a
comment. A fifth number is drift. A route that composes in columns owes a `--bp-phone` pass; a route
whose reading column is starved by a photograph column owes a `--bp-reading` one; most owe both.

**The Gutter-Is-The-Inset Rule.** Horizontal breathing room comes from `--gutter` on the field, once.
An element does not add its own left or right padding to get away from the edge.

## Elevation & Depth

**There are no shadows and no radius on any CWAAA surface, and that is settled by the built site,
not pending.** `rounded.none` is `0`; nothing in `base.css` or `system.css` declares a `box-shadow`.
Do not add one, and do not read this section's former UNLOCKED status as an invitation — a shadow or
a rounded corner here reads instantly as the SaaS/nonprofit-theme grammar the anti-default
constitution rejects.

Depth is carried by four things instead, in this order of strength:

1. **Ground change.** An ivory field against a white field against a flooded ink field. This does
   most of the work.
2. **Rule weight.** Hairline, ink (1.5px), heavy ink (3px) — a three-step depth scale in disguise.
3. **Full-bleed photography** against bounded type, plus the hero's bottom-weighted ink scrim, which
   is the only gradient in the system and exists solely to make ivory type legible on a light room.
4. **Scale jumps.** A 9rem proposition beside 15px notation is a depth cue.

### Named Rules

**The Flat-Is-The-System Rule.** If an element seems to need lifting off its background, it is on
the wrong ground or next to the wrong rule. Change the field or the rule weight. Never add a shadow,
a border radius, a card, or a tint layer.

## Shapes

Everything is a rectangle with square corners (`rounded.none` = `0`). There is not one border radius
on any CWAAA surface, and the form language is made of straight lines doing three different jobs:
the **rule** (a horizontal line at three weights, carrying meaning), the **border** (full ink, 1.5px,
on the `.act-box` and on a voided photograph field — the only two bordered objects in the system),
and the **field edge** (no line at all; a change of ground is the edge).

The only non-rectangular forms in the whole site are the section marker's dot, the coalition seal,
and the diagonal hatch inside an empty `ImageSlot`. Each is an identity mark or a notation, never a
container.

### Named Rules

**The Square-Corner Rule.** A radius is not a style choice here; it is a different institution.
Rounded corners, pills, and capsules read as SaaS or as a charity theme, both of which the
anti-default constitution names. Corners stay at zero even on hover, focus and success states.

**The Two-Bordered-Objects Rule.** Only the `.act-box` and an unanswered photograph field are drawn
with a box. Anything else that seems to want a border wants a rule, a ground change, or nothing.

## Components

**Status: the component set is settled by the shared layer below; the full interaction-state matrix
remains UNLOCKED** (`ui-system.md §8`). Hover and focus are specified; loading, disabled and error
states arrive with Form CW-1.

### The shared layer (extracted 2026-09-15)

Two global stylesheets carry everything used on more than one surface.
`src/styles/base.css` holds the reset, the base typography, and the **type
roles**; `src/styles/system.css` holds the **component layer**. A route's scoped
block styles position, measure, and rhythm — it does not restate a role or a
component, and it never re-picks a face.

**Type roles** (base.css). One declaration each, named for the cast in
`ui-system.md §3`:

| Role | Face | Job |
|---|---|---|
| `.t-ui` | Catesque 500 | figures, values, interface text; `tnum`/`zero`/`case` on |
| `.t-ui-caps` | Catesque 500 caps | notation labels. **Self-sufficient** — it carries the face itself |
| `.t-label` | — | the notation label's ordinary colour; pairs with `.t-ui-caps` |
| `.t-lead` | Proda | lead paragraph at `--cw-measure` |
| `.t-note` | Proda 15px | **supporting prose** — a note under a lead, a table, or a record. The role the cast was missing |
| `.t-statement` | Proda | the coalition's plain declarative heading |
| `.t-voice-h` | Modest italic | a participant-owned heading (Recovery Stories) |
| `.t-testimony` | Modest italic | a man's own sentence at quotation scale |

`.t-ui-caps` previously carried only casing and tracking, so every bare use fell
back to the reading face. That is why the whole Recovery Stories family — the
record masthead, the section labels, the field labels, the pager — rendered in
Proda where the cast calls for Catesque. It now carries its own face; do not
strip that back to a modifier.

**Components** (system.css):

- **Label tiers, and there are exactly two.** `.marker` (dot + label) opens a **field**: a
  whole-ground section, where the dot is the coalition saying *a new thing starts here*.
  `.sec-label` (no dot) opens a **block** inside one continuous reading surface — the opened
  record's referral, chronology and follow-up — where a row of dots would shatter a single document
  into a stack of sections. Both compose with `.t-ui-caps` for the face, plus `.t-label` for the
  ordinary grey; a block that needs ink sets the colour itself, because `.t-ui-caps` declares none
  and omitting `.t-label` inherits rather than going ink. Only `.marker` was ever written down, which is why the record
  grew three private classes (`.sec-h`, `.st-h`, `.corrob-h`) that were the same component three
  times. A third tier is drift.
- `.rule` / `.rule.ink` / `.rule.ink.heavy` — the civic rule, and **the weight
  carries meaning**: hairline separates, `ink` (1.5px) closes a reading surface,
  `ink heavy` (3px) belongs to the monumental surfaces only — the Findings lead
  and the home page's Finding and close. Never pick one by which page you copied.
- `.record` — the filed label/value block, ruled top and bottom, read across.
  Set `--record-cols`; on `--bp-phone` it always becomes two-up. The opened
  Recovery Record's `.fields` is deliberately **not** this component: its labels
  intrude into the reading column's left margin, and that fracture is the
  route's one authored departure. Do not unify them.
- `.method` — the methodology note, the single permitted interruption beside a
  Finding. Findings places it intruding up into the figure's field; the
  placement is the route's, the note is the system's.
- **Actions, three tiers and only three.** `.actions` is the ruled list of a
  surface's committed actions (`.primary` is the pledge, in stamp red);
  `.act-box` is a single bordered action in ink — the referral and utility
  control, never the pledge; `.link-rule` is an inline action inside running
  text or a caption. A fourth treatment is drift, not a new idea.
- `.refer-row` / `.refer-done` — the copy-link referral's structural contract
  with `scripts/reveal.ts`: the anchor carries `data-copy-link` and `data-done`,
  and its confirmation lives in a sibling `[role="status"]` in the same row.

**Breakpoints** are recorded as `--bp-phone` (700), `--bp-reading` (860),
`--bp-util` (900), and `--bp-nav` (1000) in `tokens.css`. CSS cannot read a
custom property inside a media query, so every `@media` must name which one it
is applying. Four is the whole ladder; a fifth is drift.

**LOCKED — owner decision 2026-09-15 (Option A, across the board).** The pledge
is **always tier 1**, the ruled row, on every surface. Stamp red stays a rule and
never becomes a filled field; nothing on a CWAAA page is a bordered or flooded
pledge button. The `.act-box.stamp` variant that shipped briefly on the two
Recovery Stories routes is **deleted, not deprecated** — do not reintroduce it.
`.act-box` survives in ink only, as the referral and utility control.

Two consequences recorded with the decision: the Recovery Stories index close
dropped its `.rule.ink` hairline, because the section's own border plus the
action's red rule already give it two rules and a third stacked; and both
Recovery Stories closes render the single-row form, matching the home close.
Adding a second ruled row there would need a second action in `copy.ts` and is
a copy decision, not a system one.

Locked navigation law: primary navigation is **Findings**, **Recovery Stories**, **Tie One On**,
**Chapters**, **About**, and **Take the Pledge** — ordinary, visible, and immediately understandable.
Prohibited outright: an INDEX control, filing-tab global navigation, registry numbers in route
labels, pill CTAs, gradient CTAs, a floating donation bubble, bureaucratic usability theater, and any
Office link in primary navigation.

### Motion: the one authored moment

The site has exactly one piece of authored motion — the scroll reveal in `base.css` and
`scripts/reveal.ts`. Its contract:

- Content is **visible by default**. Elements are offset only under `html.has-js.motion-ok`, so a
  no-JS or reduced-motion visitor gets the finished page, not an empty one.
- `data-reveal` rises and settles; `data-reveal="rule"` draws in from the left (`scaleX`);
  `data-reveal="photo"` settles from a 1.045 scale. Exponential ease-out, `--dur` 720ms.
- **`--i` is required, not optional.** Siblings that enter together stagger by `--i * --stagger`
  (90ms). An element with no `--i` lands with the first thing in its row and flattens the pacing the
  reveal exists to create.
- The `photo` variant must be on a **wrapper around** `ImageSlot`, because the component's own root
  sits between that wrapper and the `.media` it scales. The rule is a descendant selector for this
  reason — as a child selector (`> .media`) it silently matched nothing, and no photograph on the
  site animated at all between 2026-09-14 and the fix on 2026-09-15.
- The Office **fragment never reveals.** It is a foreign object quoted inside a CWAAA record; giving
  it CWAAA's motion would make it ours.

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
- **Do** make each recovery story's before-state, consequence, changed behavior, and desired benefit
  legible. Keep the participant's own voice distinct from CWAAA's position.
- **Do** give each route its own spatial law rather than one layout with swapped content.
- **Do** preserve the current implementation or request the owner decision when a section here is
  marked UNLOCKED.
- **Do** check the home page before setting an element on any other route. If home already solves
  it, use what home uses; if home solves it differently on purpose, the surface brief has to say so.
- **Do** find the job in the measure table before writing a `max-width` in `ch`, and the job in the
  rule table before picking a rule weight.
- **Do** give every revealed element an explicit `--i`, and name the breakpoint rung in every
  `@media` comment.

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
- **Don't** set a sentence in Catesque. Prose is Proda at any size; `.t-note` is the small one.
- **Don't** add a shadow, a border radius, a card, or a tint layer to lift an element. Change the
  ground or the rule weight.
- **Don't** invent a fourth action treatment, a third label tier, a fifth measure, or a fifth
  breakpoint. Each of those is a closed set, and a route that needs one more has found a gap in
  `system.css`, not a reason to fork.
- **Don't** unify the two things this document says are deliberately different: the opened record's
  intruding `.fields` (not the `.record` component) and its centered page shell (not a field
  composition).

**Acceptance test.** Does this page look like the natural public expression of CWAAA? If it instead
places CWAAA's content into the nearest familiar nonprofit, archive, or civic-portal template, it is
not finished.

---

## Drift register (opened 2026-09-15)

Recorded when the home page was documented as the reference implementation. Each entry is a place
where a route had invented a second version of a shared element. **Kept as evidence:** the pattern
that produced all nine is the same — the shared layer had no name for the thing, so the route made
one up privately. The fix for that class of defect is always to name it here and in `system.css`,
never to copy the other route.

### Closed 2026-09-15

| # | Element | What had happened | Fix |
|---|---|---|---|
| 1 | Photo settle | `[data-reveal='photo'] > .media` could not match through `ImageSlot`'s own root, so **no photograph on the site had ever animated** | selector changed to a descendant in `base.css` |
| 2 | Small prose | the cast had no small-prose role, so five elements set sentences in Catesque | `.t-note` added to `base.css` |
| 3 | Label tiers | the opened record carried three private classes (`.sec-h`, `.st-h`, `.corrob-h`) that were one component | `.sec-label` added to `system.css` as the documented second tier |
| 4 | Measure | Modest ran at 30ch / 38ch / 46ch on three routes, and `52ch` was hard-coded five times | four named measure tokens in `tokens.css`; the Pick-The-Job Rule |
| 5 | Home's own gaps | home hard-coded two of those measures, and its recovery-voice photograph had no reveal wrapper at all | both fixed in `index.astro` |

### Closed 2026-09-15, second pass — the mechanism, not a symptom

| # | Artifact | What had happened | Fix |
|---|---|---|---|
| 12 | Surface briefs | the `/recovery-stories` brief had **no YAML frontmatter at all**, so its `primary_target` parsed as `null` and it was authority for no file in particular | frontmatter added, naming both routes and `copy.ts` |
| 13 | Surface briefs | the home and Findings briefs wrote their targets **repo-root-relative** (`cwaaa/src/…`) while this project's root *is* `cwaaa/`. `impeccable doctor` reported both orphaned, and **none of the three resolved when the session was opened in `cwaaa/`** — which is how `AGENTS.md` says to work. So an agent editing a CWAAA route from inside the workspace got no surface brief, which is the mechanism that let entries 1–11 in | each `primary_target` repointed project-relative; the repo-root form kept in `related_targets` as a mapping alias, so all eight invocation forms resolve |

Verified by direct resolution probe: four project-relative and four repo-root-relative target forms
across the three briefs, all eight resolving (`slug` or `mapping`), and the orphan finding cleared.

**Known remaining doctor finding, deliberately not fixed.** `impeccable doctor` reports
`design-md-coverage` — that `design.md` has no Colors or Components section. That is the authority
split working as intended: `design.md` is prose authority and *this* file is the tokenized companion
(`AGENTS.md` authority order). **Do not "fix" it by moving token values into `design.md`.** The one
real gap is that `design.md` carries no pointer back here; that is an owner edit, not an agent one.

### Closed 2026-09-15, third pass — by the concurrent session, acting on this document

Entries 6–11 were filed as open because a second Impeccable session was editing the two Recovery
Stories routes while this document was being written. That session read the register and closed all
six in commit `dce7234`, which is the outcome the register was written for.

| # | Element | Resolution, verified at `dce7234` |
|---|---|---|
| 6 | Route-opening rule | the index lead now closes on `.rule.ink` |
| 7 | Prose face | `.t-note` adopted — 2 uses on the index, 4 on the record; no `.t-ui` remains on a prose element |
| 8 | Measure tokens | `--cw-measure-voice`, `--cw-measure-note` and `--cw-measure` adopted on both routes; the only surviving `38ch` / `52ch` strings are inside explanatory comments |
| 9 | Reveal stagger | 14 explicit `--i` values on the opened record, where there had been none |
| 10 | Breakpoints | both routes now carry a `--bp-phone` pass alongside `--bp-reading` |
| 11 | Label tiers | `.sec-label` adopted at 10 sites; the three private classes are gone, `.corrob-h` surviving only as a one-line ink colour modifier, which is the documented composition |

**The register is empty.** Home and the Recovery Stories routes agree on every shared element.

### The three protected exceptions

Three things are *supposed* to differ, and they are listed here so nobody reads them as leftovers.
They were mis-described once in this file as "the departures that remain," which reads as three loose
ends rather than three rulings. **Each one is load bearing, and removing it is drift in the opposite
direction — toward the single repeated layout that
`design.md §13` names as failure.**

| Exception | Where | Authority |
|---|---|---|
| The opened record's field labels intrude into the reading column's left margin, instead of using the `.record` component | `[id].astro` `.fields` | `system.css` — the route's one authored fracture; `design.md §6` route-specific spatial law |
| The opened record is a centered 62rem reading column, not a run of full-bleed fields | `[id].astro` `.rec` | the one page-shell exception, above — a record is a document, not a campaign page |
| On the Recovery Stories index the participant's own sentence is the largest element, at `--cw-voice` | `recovery-stories.astro` `.quote` | surface brief §3, **confirmed by the owner 2026-09-15**; Findings gives that rank to the number, this route gives it to the man |

**The Protected-Exception Rule.** An exception recorded here with its authority is not a defect and
is not a to-do. Before "aligning" one of these to the home page, note that the home page is the
reference for **elements** — a rule weight, a label tier, a measure, a face, a stagger — and never
for **composition**. A route is required to have its own spatial law. If a future audit lists one of
these three as a finding, the audit is wrong.

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
