# Office of Lather Compliance UI system

**Status:** active working authority; core visual system locked, two state details pending owner decision  
**Applies to:** Office of Lather Compliance public error-state site only  
**Reads with:** `../design.md`, the Office PRD, `world-bible.md`, `contracts/visit-state.v1.json`, and `../../docs/HANDOFF.md`
**Does not apply to:** Got Soap? or CWAAA

This file converts the approved Office design law into implementation-level visual and state rules. It exists primarily to stop an implementation agent from "improving" the Office into a branded agency site, designed terminal, horror interface, civic portal, or polished error-state concept.

A lower-level implementation may add accessibility and technical detail. It may not add a second visual register, visual drama, useful agency content, or any feature that contradicts the under-design law.

---

# 1. Governing law

# THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED.

The Office public surface is an ordinary plain error response. It is not a website that happens to contain an error page. The error-state system is the entire public site.

The Office does not try to frighten. It believes it is administering a routine condition. The language is patient, exact, and certain. The visitor supplies the fear.

---

# 2. Typography

## 2.1 Canonical family

Use only:

```text
"Courier New", Courier, monospace
```

No second family is permitted.

## 2.2 Approved hierarchy

Hierarchy may use only:

- native heading weight;
- paragraph spacing;
- line breaks;
- ordinary source order;
- concise labels;
- plain links where truthful legal or privacy disclosure requires them.

## 2.3 Prohibited typography

Do not add:

- display typography;
- a branded wordmark;
- custom government type;
- terminal typography beyond Courier New;
- condensed labels;
- serif authority cues;
- accent italics;
- decorative tracking systems;
- text shadows;
- glow;
- scanline simulation;
- animated type;
- stamped or distressed type;
- faux-redaction effects.

The words carry authority. Typography must not announce that the page was art-directed to feel unsettling.

---

# 3. Color discipline

Use only:

- page background: `#FFFFFF`;
- text and links: `#111111`.

The phrase "black text" permits `#111111` for reading comfort. No other visual register is allowed.

Do not add:

- red;
- navy;
- warning amber;
- muted institutional color;
- off-white paper color;
- grey panels;
- state colors;
- visited-link color as a narrative device;
- gradients;
- textures;
- dark mode styling authored by the site.

User-agent high-contrast behavior must remain usable. The site itself does not create an alternate branded theme.

---

# 4. Layout and spacing

## 4.1 Canonical structure

Use one left-aligned text column.

Implementation reference:

```css
body {
  margin: 48px 24px 80px 52px;
  max-width: 760px;
  background: #fff;
  color: #111;
  font: 16px/1.45 "Courier New", Courier, monospace;
}
```

Reduce margins on narrow screens while preserving an ordinary left-aligned document flow.

## 4.2 Prohibited layout treatments

Do not add:

- centered terminal shells;
- cards;
- bordered panels;
- decorative frames;
- status chips;
- dashboards;
- columns;
- sidebars;
- navigation;
- a logo area;
- government mastheads;
- breadcrumb systems;
- overlays;
- modals;
- decorative rules;
- background grids;
- windows or console chrome;
- simulated CRT geometry.

The page should look as though nobody believed it required art direction because procedure itself was sufficient.

---

# 5. Surfaces, borders, corners, and shadows

- Background remains flat white.
- No panels.
- No cards.
- No corner-radius system.
- No ornamental border system.
- No shadows.
- No inset effects.
- No paper texture.
- No terminal texture.
- No scanlines.
- No noise.
- No focus ring that departs from accessible browser-standard or plain black-outline behavior.

Where a legal or privacy link is required, it remains a plain text link after the principal error copy.

---

# 6. Motion and transition system

## Binding law

There is no authored motion.

Do not animate:

- page entry;
- headings;
- timestamps;
- status changes;
- recognition copy;
- links;
- terminal identifiers;
- reference numbers;
- loading states;
- text reveal;
- session transitions.

Do not add:

- fades;
- typing effects;
- blinking cursors;
- flicker;
- glitch;
- scanline movement;
- loading dots;
- progress indicators;
- pulse;
- parallax;
- audio;
- vibration.

State resolution must happen before state-dependent content is revealed. Avoiding a false-state flash is technical correctness, not animation.

---

# 7. Public interaction model

There are no useful calls to action.

The public interactions are:

- arriving;
- reading;
- reloading;
- leaving;
- returning;
- optionally following a quiet truthful privacy or legal link.

Every public path resolves to the same error-state system. No route reveals ordinary agency content.

---

# 8. State system

## 8.1 First Access

Use the exact approved copy from `../design.md` and the visit-state contract.

The state must not visually dramatize creation of the log entry.

## 8.2 Same-Session Refresh

Use the exact approved Refresh Request Denied copy.

Reload does not advance the visitor to another narrative session state.

## 8.3 Later Return

Use the exact approved Notice of Repeat Access copy.

The terminal ID is fictional and browser-local. The page must never display or request an IP address.

## 8.4 Continued Interest

Use the exact approved Notice of Continued Interest copy.

After this point, the state becomes stubbornly static. It does not escalate forever and does not unlock a normal site.

## 8.5 State precedence

- Session 1: First Access.
- Same-session reload before Continued Interest: Refresh Request Denied.
- Session 2: Repeat Access.
- Session 3 and later: Continued Interest.
- Continued Interest remains visible on reload.

The implementation must follow the exact transition and counter rules in `contracts/visit-state.v1.json` and `../design.md`.

---

# 9. Recognition and privacy guardrails

Permitted storage:

- `sessionStorage`;
- `localStorage`.

Prohibited:

- cookies for recognition;
- IP addresses;
- browser fingerprinting;
- authentication;
- server-side visitor records;
- backend identity stores;
- cross-device stitching;
- analytics collection of Office recognition state.

The terminal ID names the browser-local record inside the fiction. It is not a real visitor identity.

Reference `8804-X` is a standing containment reference shared by the condition. It is not visitor-specific.

---

# 10. Storage-failure behavior

When browser storage is unavailable, render a neutral inaccessible-resource state.

It must not claim that:

- a log was created;
- a terminal identity exists;
- prior contact occurred;
- a persistent record exists;
- recognition succeeded.

**Exact fallback copy remains pending owner approval. Claude may not invent dramatic fallback language.**

---

# 11. Accessibility and responsive behavior

- Use a semantic main region and heading.
- Keep timestamps readable by assistive technology.
- Support keyboard access, browser zoom, and high-contrast preferences.
- Do not rely on color, motion, position, or styling alone for meaning.
- Preserve ordinary reading order at all viewport sizes.
- Reduce margins on narrow screens; do not create a mobile terminal card.
- Resolve browser-local state before displaying state-dependent copy.
- When storage fails, make no false recognition claim.

Because the site contains no authored animation, reduced-motion preference requires no alternative visual performance.

---

# 12. Anti-improvement constitution

The Office fails if an implementation agent adds:

- a logo;
- navigation;
- a homepage;
- useful agency information;
- a designed terminal;
- branded error components;
- a status chip;
- warning color;
- secondary typography;
- texture;
- scanlines;
- glitch;
- animation;
- a dramatic loading sequence;
- a government dashboard;
- a classified-file aesthetic;
- horror styling;
- explicit threats;
- assessor-dispatch claims on the website;
- surveillance boasts;
- any visual feature whose purpose is to tell the visitor that the page is creepy.

---

# 13. Pending decisions

Only two implementation details remain open:

1. **Storage-failure copy:** exact approved wording for the neutral state that makes no recognition claim.
2. **Continued Interest count source:** explicit confirmation of which contract counter populates `[count]` in “You have accessed this resource [count] times.”

Claude may not infer either decision.

---

# 14. Acceptance test

The Office passes only when:

- it looks like an ordinary plain error response;
- the same Courier New family carries all text;
- the background is white and the text is `#111`;
- no brand presentation or second visual register exists;
- all public routes remain error states;
- the approved session progression is exact;
- state-dependent content never flashes the wrong state;
- recognition remains browser-local;
- storage failure makes no recognition claim;
- jurisdiction remains unnamed;
- `8804-X` remains a standing containment reference;
- the page does not perform horror;
- the visitor’s unease comes from copy, certainty, and remembered return.

---

# 15. Decision log

## 2026-07-29 — UI-system scaffold

Recorded:

- deliberate under-design as the governing law;
- Courier New as the sole family;
- white / `#111` as the complete authored palette;
- one left-aligned column;
- no motion;
- no useful calls to action;
- exact four-state public model;
- browser-local recognition only;
- two remaining owner decisions: storage-failure copy and Continued Interest count mapping.
