---
name: Got Soap?
description: Glossy campaign heat — a forbidden fragrance launch commandeered by a hygiene PSA.
colors:
  grout-black: "#050505"
  steam-white: "#F7F6F1"
  smoke-slate: "#292A2F"
  chrome-mist: "#B9BBC2"
  marble-amber: "#C78B3B"
  marble-amber-ink: "#89602A"
  lather-white: "#FFFFFF"
typography:
  command-hero:
    fontFamily: "'Got Soap Oswald', 'Arial Narrow', 'Aptos Narrow', Arial, sans-serif"
    fontWeight: 600
    fontSize: "clamp(2.99rem, 1.94rem + 5.24vw, 6.31rem)"
    lineHeight: 1
  command-flagship:
    fontFamily: "'Got Soap Oswald', 'Arial Narrow', 'Aptos Narrow', Arial, sans-serif"
    fontWeight: 700
  command-section:
    fontFamily: "'Got Soap Oswald', 'Arial Narrow', 'Aptos Narrow', Arial, sans-serif"
    fontWeight: 500
    fontSize: "clamp(2.07rem, 1.66rem + 2.07vw, 3.55rem)"
  editorial-display:
    fontFamily: "'Got Soap Behind The Nineties Sans', Aptos, Arial, sans-serif"
    fontWeight: 900
  editorial-major:
    fontFamily: "'Got Soap Behind The Nineties Sans', Aptos, Arial, sans-serif"
    fontWeight: 600
    fontSize: "clamp(1.44rem, 1.28rem + 0.78vw, 2rem)"
  body:
    fontFamily: "'Got Soap Behind The Nineties Sans', Aptos, Arial, sans-serif"
    fontWeight: 500
    fontSize: "clamp(1rem, 0.95rem + 0.24vw, 1.13rem)"
  confession:
    fontFamily: "'Got Soap Behind The Nineties Sans', Aptos, Arial, sans-serif"
    fontWeight: 400
  whisper:
    fontFamily: "'Got Soap Moxie', Didot, 'Bodoni MT', Georgia, serif"
    fontWeight: 400
  control:
    fontFamily: "'Got Soap Marlin SQ', 'Helvetica Neue', Arial, sans-serif"
    fontWeight: 500
    letterSpacing: "0.01em"
  utility:
    fontFamily: "'Got Soap Marlin SQ', 'Helvetica Neue', Arial, sans-serif"
    fontWeight: 400
    fontSize: "clamp(0.83rem, 0.78rem + 0.22vw, 0.94rem)"
  production:
    fontFamily: "'Got Soap Moanslight', 'Helvetica Neue', Arial, sans-serif"
    fontWeight: 500
rounded:
  tile: "2px"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  2xl: "4rem"
  3xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.marble-amber}"
    textColor: "{colors.grout-black}"
    typography: "{typography.control}"
    rounded: "{rounded.tile}"
    padding: "0.72em 1.4em"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.marble-amber}"
    typography: "{typography.control}"
    rounded: "{rounded.tile}"
    padding: "0.72em 1.4em"
---

# Design System: Got Soap?

**Authorship:** Got Soap? campaign surfaces only. This record does not govern CWAAA or the Office of
Lather Compliance, and no token here may travel to either. See `../../DESIGN.md` for the routing law.

**Authority.** This is the tokenized companion to `design.md` and `ui-system.md`, which win on
conflict. Type law is governed by `font-delivery-spec.md`.

## Overview

**Creative North Star: "The Forbidden Fragrance Launch, Commandeered"**

Got Soap? is not a website displaying a campaign — the website *is* the campaign. A surface should
read as a luxury fragrance launch that a hygiene PSA has seized mid-broadcast: beautiful enough to
seduce, direct enough to indict, and funny precisely because it never backs away from its own
seriousness. The visitor moves through controlled escalation — steam, skin, chrome, tile, smoke,
amber, confession — rather than browsing a tidy collection of assets.

The behavioral thesis governs every visual decision: this campaign changes behavior through erotic
aspiration, never health education, humiliation, or shame. Desire issues the invitation; the joke
lands because the campaign means every gorgeous second of it. Photography is the luxury and UI
decoration serves it — never the reverse.

Composition follows **editorial brutalism**, which is compositional pressure, not a styling kit:
violent scale contrast, hard crops, asymmetric columns, abrupt rules, overlapping captions,
interrupted reading paths, confident negative space. It never translates into concrete grey,
monospace labels, default black boxes, or an amateur anti-design skin.

**Key Characteristics:**

- One element owns the viewport; everything else argues with it.
- Three cinematic registers (porcelain, smoke, marble) that never blend inside one section.
- A single action accent, used sparingly enough to stay an event.
- Poster art is canonical and immutable — crops support the full rectangle, never replace it.
- Effects are budgeted, not ambient.

## Colors

Six campaign tokens plus one derived ink. A section draws two or three of them — never the whole
palette — and its choice is dictated by the active register, not by preference.

### Primary

- **Marble Amber** (`#C78B3B`): the sole campaign action accent. CTAs, links, active states, and
  amber-register heat. Its scarcity is what makes it read as an event rather than a theme color.
- **Amber Ink** (`#89602A`): the AA-safe derivative for amber text, links, and focus rings on the
  light porcelain ground, where full-strength amber measures only 2.7:1. Derived in CSS as
  `color-mix(in srgb, var(--marble-amber) 68%, var(--grout-black))` — it stays bound to the base
  token rather than living as an independent hex. Measures 5.15:1 on Steam White.

### Neutral

- **Grout Black** (`#050505`): structural ground, ink, hard cuts, smoke foundations, and the
  navigation bar. The grout between everything else.
- **Steam White** (`#F7F6F1`): the porcelain register's warm tile off-white and primary light.
- **Smoke Slate** (`#292A2F`): nocturnal depth for the smoke register. Never a generic page
  background.
- **Chrome Mist** (`#B9BBC2`): metallic rules, glare, dividers, secondary text, restrained display
  gradients.
- **Lather White** (`#FFFFFF`): foam, maximum-contrast type on dark grounds.

### Named Rules

**The One Accent Rule.** Marble Amber is the only campaign action accent. A second accent color does
not get introduced to solve a hierarchy problem — scale, weight, and space solve it instead.

**The Two-or-Three Rule.** A section uses two or three color tokens, not the palette. A surface
reaching for a fourth is usually a surface that has not decided what it is.

**The Contrast-Over-Mood Rule.** WCAG contrast requirements override photographic mood behind
readable text. Amber never carries body text on a light ground; Amber Ink does.

## Typography

Campaign type is a five-voice cast, and each voice has a job. No family is substituted because
another is easier to load or already present.

**Commands:** Oswald (`--font-command`) — compressed, lowercase logo, large commands, tight leading.
**Persuades:** Behind The Nineties Sans (`--font-editorial`) — the campaign's reading voice: body,
editorial majors, confession.
**Seduces:** Moxie Twist (`--font-whisper`) — rare, intimate display; the line that leans in.
**Operates:** Marlin Sans SQ (`--font-interface`) — controls, labels, utility. Direct and unprecious.
**Records:** Moanslight (`--font-production`) — credits, production marks, campaign metadata.

**Character:** A commanding condensed grotesque runs the headlines while a warm contemporary sans
does the actual persuading, so the campaign can shout and confess in the same column without either
voice borrowing the other's authority.

### Hierarchy

- **Command hero** (600, `--step-6` → 6.31rem, line-height 1): the opening command; one per page.
- **Command flagship** (700): reserved emphasis within the command voice.
- **Command section** (500, `--step-4`): route and section commands.
- **Editorial display** (900): rare editorial weight event.
- **Editorial major** (600, `--step-2`): section-level editorial statements.
- **Body** (500, `--step-0`, measure 66ch): the reading voice.
- **Confession** (400, italic variant available): intimate first-person copy.
- **Whisper** (400): the seduction line. Rare by definition.
- **Control** (500, letter-spacing 0.01em): buttons and interactive labels.
- **Utility / micro** (400, `--step--1`): metadata and fine print.
- **Production** (500 / 600 label): credits and release marks.

Type sizing runs on a nine-step fluid scale clamped from 360px to 1440px+ (`--step--2` through
`--step-6`), so hierarchy holds without breakpoint-specific overrides.

### Named Rules

**The Fine-Print Rule.** Fine print is genuinely fine. Body copy is never shrunk to imitate a fashion
magazine — smallness must be a fact about the content, not a costume.

**The Serif Quarantine Rule.** PT Serif never appears on a campaign surface; it belongs to CWAAA. No
generic editorial serif gets substituted in to manufacture sophistication.

**The Legible-Bleed Rule.** Display type may run off-screen or cross image boundaries, but only while
the words remain understandable.

## Layout

Spacing runs an eight-step scale (`--space-2xs` 0.25rem → `--space-3xl` 6rem). Reading measure is
capped at 66ch (`--measure`).

Composition is asymmetric by default. Grids exist to be broken deliberately at a named moment, not
to be filled evenly. Every major route must be able to name six things — dominant event, off-axis
counterweight, material transition, refused default layout, emotional change, and authorship
boundary. If those six answers are absent, the page is not designed yet.

The sticky masthead is monumental on home (`--masthead-h`, clamp 64–84px) and compact on interior
routes (`--masthead-compact-h`, 57px as a *minimum* block size). Poster environments compute their
stage budget as `100svh − masthead − gutters` against that token; when text scaling grows the bar,
budgets turn conservative and fall back to normal flow rather than overlapping.

Responsive layouts may change geometry, but hierarchy, authorship, and dramatic pacing survive the
change. A narrow screen does not get to become a stack of equal cards.

## Elevation & Depth

There is no shadow scale and there should not be one. Depth is photographic and material: steam is
translucent volume, smoke has actual depth, chrome is narrow highlight, amber is stone and heat.
Where CSS supplies depth it does so through registered layer effects on *type*, not through elevated
panels.

### Effect Vocabulary

- **Steam glow** (`.fx-steam-glow`): layered luminous halo for porcelain display type.
- **Chrome** (`.fx-chrome`): brushed-metal gradient clipped to the glyphs, for smoke-register titles.
- **Gold** (`.fx-gold`): poured-amber gradient for marble-register display type. Every stop must hold
  ≥ 3:1 (large text) on the darkest ground it ships over — Smoke Slate. The darkest bevel stop is the
  AA floor and is the value most likely to fail a palette change.
- **Grain** (`.fx-grain`): static SVG turbulence plate at ~10% overlay. Reduced-motion safe by
  construction — it does not animate.

### Named Rules

**The FX Budget Rule.** Layer effects are permitted on the hero and on spot/verdict titles only.
They are not a heading style. CWAAA surfaces get zero campaign effects.

**The No-Derived-Poster Rule.** Section atmosphere is either a purpose-built asset or CSS material.
It never derives from the five canonical posters — no blurred poster washes as "atmosphere."
(`.fx-poster-wash` was retired for teaching exactly this.)

**The Graceful-Clip Rule.** Every `background-clip: text` effect ships an `@supports not` fallback
to a readable solid fill. A browser without the feature gets legible type, not invisible type.

## Shapes

Corners are effectively square. The single radius token is `--radius-tile` at 2px — "tile grout, not
pill." Nothing rounds beyond it. Borders are hard rules rather than soft containers, and the
recurring silhouette is the rectangle: poster, tile, cut, column.

**The Grout Rule.** Radius exists to keep an edge from looking accidental, not to soften anything.
A rounded panel, floating glass card, or pill-shaped control is out of system regardless of context.

## Components

The register system is the component system. Three register classes (`.register-porcelain`,
`.register-smoke`, `.register-marble`) each expose only their register's tokens through `--reg-*`
slots. Components read the slots, never the raw tokens — which is what keeps the authorship
quarantine mechanical rather than aspirational.

### Buttons

- **Shape:** effectively square (2px, `--radius-tile`), 2px border, `0.72em 1.4em` padding.
- **Primary:** Marble Amber fill, Grout Black label, matching border. Interface voice at 500.
- **Hover:** fill lightens toward white by 14% (`color-mix(… 86%, #fff)`); 140ms ease on color,
  100ms on transform.
- **Active:** `translateY(1px)` — a press, not a bounce.
- **Secondary:** transparent fill, accent-colored label and border pulled from `--reg-accent` so the
  button inherits its register; hover fills to 16% accent.
- **Disabled:** 0.5 opacity, `not-allowed` cursor.
- **Focus:** ring supplied by the surrounding register's `--focus-ring`, never by the button itself.
- **Labels are always in-fiction.** Pass the copy-deck string ("File my declaration"), never a
  generic verb like "Submit."

### Registers (the signature component)

- **Porcelain** — Steam White ground, Grout Black ink, Amber Ink accent. Posters 1–2. Exposed,
  bright, immediate.
- **Smoke** — Smoke Slate ground, Lather White type, Chrome Mist secondary, full-strength amber
  accent. Posters 3–4. Sinful, nocturnal, devotional.
- **Marble** — Grout Black ground, amber headings, amber rules at 40%. Poster 5. Public announcement
  as seduction.

**The Register Purity Rule.** A section uses one register's tokens and effects. A surface that mixes
campaign and CWAAA slots is a bug, not a blend.

## Do's and Don'ts

### Do:

- **Do** let one element own the viewport and make everything else argue with it.
- **Do** change register between sections so each spot escalates instead of repeating a card.
- **Do** show each poster's complete rectangle at least once per spot; crops support it, never
  replace it.
- **Do** read color through `--reg-*` slots so a component inherits its register automatically.
- **Do** keep steam auto-clearing in a ~2s squeegee sweep with no drag interaction, and give the
  scratch-and-sniff gag one committed response rather than a looping cursor toy.
- **Do** honor `prefers-reduced-motion` by revealing the same content immediately.

### Don't:

- **Don't** build a centered hero with eyebrow, headline, paragraph, and two CTA buttons.
- **Don't** ship three equal feature cards, five posters in an equal-width grid, or one poster
  component repeated with only colors changed.
- **Don't** reach for black-to-purple "luxury" gradients, rounded SaaS panels, floating glass cards,
  or pill navigation.
- **Don't** drain the heat with tasteful serif editorial minimalism.
- **Don't** add scroll effects that exist only to make an ordinary layout feel custom, and never
  scroll-jack, hijack inertia, or require motion to submit a form.
- **Don't** introduce case-study language about the designer, tools, or process — authorship is a
  post-credits beat.
- **Don't** transfer CWAAA's paperwork aesthetic onto a campaign page, or campaign effects onto a
  CWAAA one.
- **Don't** alter or re-typeset text baked into the five canonical posters. Poster truth wins over
  prose.

---

## Palette restoration (2026-08-13, resolved)

The shipped runtime had drifted darker and duller than `../design.md §7`. The owner confirmed the
shipped values were incorrect, and `site/src/styles/tokens.css` was migrated back to the
specification. The frontmatter above is now both normative *and* what ships.

| Token | Restored (spec) | Retired (drifted) |
|---|---|---|
| `grout-black` | `#050505` | `#0e0e10` |
| `steam-white` | `#F7F6F1` | `#eceae4` |
| `smoke-slate` | `#292A2F` | `#201f22` |
| `chrome-mist` | `#B9BBC2` | `#9a9aa2` |
| `marble-amber` | `#C78B3B` | `#b8862e` |

Contrast improved across the board: Grout Black on Steam White 16.03:1 → 18.84:1, Chrome Mist on
Grout Black 6.90:1 → 10.63:1, Amber Ink on Steam White 4.79:1 → 5.15:1. Every text pair holds AA and
every effect stop holds the 3:1 large-text floor.

Two gradient stops moved with the palette, because both are measured against Smoke Slate:

- **`.fx-gold`** darkest bevel `#916a22` → **`#9c7325`**. The old stop fell to 2.92:1 on the restored
  Smoke Slate; the new one holds 3.34:1, matching its prior headroom.
- **`.fx-chrome`** 52% specular band `#55555c` → **`#767680`**. This stop had never met the floor
  (2.22:1 before the migration, 1.94:1 after), so it was corrected in the same pass. It now holds
  3.19:1. The metal's dark band is consequently lighter than it was — a visible softening of the
  chrome character, and the one deliberate appearance change in this migration.

`site/scripts/make-placeholders.mjs` carries the same five values for dev stand-ins and was migrated
with them.

**The Re-Measure Rule.** `.fx-gold` and `.fx-chrome` both pin literal stops against Smoke Slate.
Any future change to Smoke Slate requires re-measuring both against the 3:1 large-text floor.

### Known open defect (not Got Soap?)

`.register-cwaaa`'s muted secondary — `color-mix(in srgb, var(--cwaaa-ink) 62%, var(--cwaaa-manila))`
— measures **3.29:1** on manila, below the 4.5:1 body-text floor. It predates this pass and was not
touched, because CWAAA's color system is UNLOCKED and no agent may select its values. It needs an
owner decision. See `../../cwaaa/docs/DESIGN-SYSTEM.md`.
