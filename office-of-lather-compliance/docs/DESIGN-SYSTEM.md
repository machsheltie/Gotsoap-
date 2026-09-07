---
name: Office of Lather Compliance
description: An ordinary plain error response that happens to speak with complete institutional certainty.
colors:
  page-white: "#FFFFFF"
  text-black: "#111111"
typography:
  body:
    fontFamily: "'Courier New', Courier, monospace"
    fontSize: "16px"
    lineHeight: 1.45
components:
  link-plain:
    textColor: "{colors.text-black}"
    typography: "{typography.body}"
---

# Design System: Office of Lather Compliance

**Authorship:** Office error surfaces only. Nothing from Got Soap? or CWAAA may appear here, and
nothing here may travel to them. See `../../DESIGN.md` for the routing law.

**Authority.** This is the tokenized companion to `design.md` and `ui-system.md`, which win on
conflict.

## Overview

**Creative North Star: "Nobody Believed This Page Required Art Direction"**

> **THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED.**
>
> **JURISDICTION: DELIBERATELY UNSPECIFIED**
> **PUBLIC SURFACE MODEL: ERROR STATES ONLY**

The public page is an ordinary plain error response. It is not a branded agency site, a themed
terminal, a horror interface, or a composition that calls attention to its design. The error
response *is* the entire public site — nothing useful waits behind it, and every public path
resolves to the same error-state system.

The Office never tries to frighten. It believes it is administering a routine condition. The
language is patient, exact, and certain; the visitor supplies the fear. Its authority comes from the
copy and from remembering a browser's return — never from styling. The uncanny detail is
institutional politeness: **"Please remain available."**

This record is unusual in that almost all of it is prohibition. That is the design. A reader looking
for a richer system here has misread the brief.

**Key Characteristics:**

- One left-aligned column of ordinary text.
- One family, one text color, one background.
- Hierarchy from native heading weight, paragraph spacing, and line breaks — nothing else.
- No calls to action. Reloading, leaving, and returning are the interaction.
- Recognition is browser-local and never claimed when storage is unavailable.

## Colors

Two values. There is no palette.

### Neutral

- **Page White** (`#FFFFFF`): the background. Flat, always.
- **Text Black** (`#111111`): text and links. The governing law says "black text"; `#111111` is the
  permitted implementation value for ordinary reading comfort.

**The No-Second-Register Rule.** Do not add red, navy, warning amber, muted institutional color,
off-white paper color, grey panels, state colors, visited-link color as a narrative device,
gradients, textures, or site-authored dark mode. User-agent high-contrast behavior must remain
usable; the site does not create an alternate branded theme.

## Typography

**Family:** `"Courier New", Courier, monospace` — the only family. No second family is permitted.

**Character:** None intended. Headings, labels, timestamps, reference numbers, and body copy all use
the same monospace family at the same base size.

### Hierarchy

Hierarchy may use only native heading weight, paragraph spacing, line breaks, ordinary source order,
concise labels, and plain links where truthful legal or privacy disclosure requires them.

**The Words-Carry-It Rule.** Typography must not announce that the page was art-directed to feel
unsettling. Prohibited: display typography, a branded wordmark, custom government type, terminal
typography beyond Courier New, condensed labels, serif authority cues, accent italics, decorative
tracking systems, text shadows, glow, scanline simulation, animated type, stamped or distressed
type, and faux-redaction effects.

## Layout

One left-aligned text column. This is the implementation reference, not a starting point to improve:

```css
body {
  margin: 48px 24px 80px 52px;
  max-width: 760px;
  background: #fff;
  color: #111;
  font: 16px/1.45 "Courier New", Courier, monospace;
}
```

Reduce margins on narrow screens while preserving ordinary left-aligned document flow.

**The Nobody-Art-Directed-This Rule.** Do not add centered terminal shells, cards, bordered panels,
decorative frames, status chips, dashboards, columns, sidebars, navigation, a logo area, government
mastheads, breadcrumb systems, overlays, modals, decorative rules, background grids, window or
console chrome, or simulated CRT geometry.

## Elevation & Depth

There is none, and none may be added. Background stays flat white. No panels, no cards, no
corner-radius system, no ornamental borders, no shadows, no inset effects, no paper texture, no
terminal texture, no scanlines, no noise. The focus ring does not depart from accessible
browser-standard or plain black-outline behavior.

## Components

There is one: a plain text link, used only where truthful legal or privacy disclosure requires it,
placed after the principal error copy. It adds no site navigation and no agency explanation, and it
must truthfully state that recognition is stored only in the browser.

There are no useful calls to action. Reloading, leaving, and returning are the interaction.

**Terminal identity.** A fictional local identifier such as `LC-7F3A-8804` may appear. "Terminal"
names the browser-local record *in the copy*; it does not authorize a terminal visual style. The
remembered first-contact timestamp creates the recognition effect. `8804-X` is a standing containment
reference shared by the condition, not a visitor-specific identifier.

**Recognition guardrails.** Only `sessionStorage` and `localStorage` may support recognition. Never
cookies, IP addresses, fingerprinting, authentication, server persistence, backend identity records,
or cross-device stitching. Never display or request the visitor's IP address. Resolve state before
revealing state-dependent copy. If storage is unavailable, render a neutral inaccessible-resource
state that claims no log, terminal identity, prior contact, or persistent record.

## Do's and Don'ts

### Do:

- **Do** use a semantic main heading and status message, and keep timestamps readable by assistive
  technology.
- **Do** support zoom, high contrast, keyboard access, and reduced-motion preferences.
- **Do** keep all four approved states legible and unchanged, and preserve the three-session
  progression and the resolve-before-reveal rule.
- **Do** let the copy carry the authority.

### Don't:

- **Don't** improve the page into a designed experience. Do not center it, theme it, polish it, or
  dramatize it.
- **Don't** add visual signals that make it look intentionally uncanny — that is the most common way
  this page fails.
- **Don't** add monsters, glitches, warning strobes, assessor-dispatch claims on the website,
  classified-file cliches, or explicit threats.
- **Don't** name the jurisdiction.
- **Don't** add brand presentation, a second visual register, or horror styling. Any implementation
  that does is rejected regardless of craft.

**Acceptance test.** The design passes only when it looks like an ordinary plain error response that
happens to speak with complete institutional certainty.

---

**Pending owner decisions** remain recorded in `ui-system.md §13`; this record does not resolve them.
