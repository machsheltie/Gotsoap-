# Office of Lather Compliance design system

## 1. Binding visual law

THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED.

**JURISDICTION: DELIBERATELY UNSPECIFIED**
**PUBLIC SURFACE MODEL: ERROR STATES ONLY**

The public page is an ordinary plain error response. It is not a branded agency site, a themed
terminal, a horror interface, or a composition that calls attention to its design. The error response
is the entire public site. Nothing useful waits behind it.

These rules are literal:

- WHITE BACKGROUND.
- BLACK TEXT.
- COURIER NEW as the only type family.
- NO LOGO.
- NO NAVIGATION.
- NO DECORATIVE FRAME.
- NO STATUS CHIP.
- NO SECOND TYPEFACE.
- NO ACCENT COLOR.
- NO SHADOW.
- NO TEXTURE.
- NO SCANLINES.
- NO ANIMATION.

Do not improve the page into a designed experience. Do not center it, theme it, polish it, dramatize
it, or add visual signals that make it look intentionally uncanny. Its authority comes from the copy
and from remembering a browser's return.

## 2. Emotional temperature

The Office never tries to frighten. It believes it is administering a routine condition. The language
is patient, exact, and certain; the visitor supplies the fear.

- The Office is patient.
- The Office assumes procedure is reasonable.
- The Office never raises its voice.
- The Office never jokes intentionally.
- The Office notices actions without boasting about surveillance.
- It implies an existing relationship with the visitor.
- Certainty is more important than menace.

Avoid monsters, glitches, warning strobes, assessor-dispatch claims on the website, classified-file
cliches, or explicit threats. The uncanny detail is institutional politeness: **“Please remain
available.”**

## 3. Plain visual system

Use one left-aligned column of ordinary text. Headings, labels, timestamps, reference numbers, and
body copy all use the same monospace family. Hierarchy may use only native heading weight, paragraph
spacing, and line breaks. Links required for truthful legal or privacy disclosure remain plain text
links.

This is the implementation reference:

```css
body {
  margin: 48px 24px 80px 52px;
  max-width: 760px;
  background: #fff;
  color: #111;
  font: 16px/1.45 "Courier New", Courier, monospace;
}
```

The white background and black text law permits the `#111` implementation value above for ordinary
reading comfort. Do not introduce any other visual register.

## 4. Required state copy

### FIRST ACCESS

```text
OFFICE OF LATHER COMPLIANCE
Establishment Directive 1961-A / Sub-Section 4

NOTICE OF ADMINISTRATIVE CONTAINMENT

The requested resource is unavailable.
Access has been suspended under Regulatory Standard 41-B.

A log entry has been created.

Reference: 8804-X
Current Status: RECORDING

Please remain available.
```

### SAME-SESSION REFRESH

```text
REFRESH REQUEST DENIED

Your previous notice remains in effect.

Reference: 8804-X
Status: UNCHANGED
```

### LATER RETURN

```text
OFFICE OF LATHER COMPLIANCE
Establishment Directive 1961-A / Sub-Section 4

NOTICE OF REPEAT ACCESS

Terminal ID: [generated identifier]
First Contact: [stored local timestamp]
Secondary Contact: [current local timestamp]
Reference: 8804-X

Your prior administrative notice remains active.

Current Status: RECORDING

Please remain available.
```

### CONTINUED INTEREST

```text
NOTICE OF CONTINUED INTEREST

You have accessed this resource [count] times.

No further action is required from you.
Please discontinue independent review.

Reference: 8804-X
Status: OBSERVED
```

After continued interest, the state becomes stubbornly static. Do not escalate forever or unlock a
normal site. A future Easter egg requires a separate owner decision.

## 5. Session progression

Session 1: First Access; same-session reload: Refresh Denied.
Session 2: Repeat Access; same-session reload never advances the narrative.
Session 3 and later: Continued Interest stasis.

Resolve the browser-local state before revealing any state-dependent copy. A returning browser must
never flash First Access while storage is being read. Capture whether the session marker existed at
the start of the access before making any transition. If a persistent record exists and the marker
was absent, run the new-session transition exactly once before state selection: increment
`returnSessionCount` and `lifetimeAccessCount`, update last contact, and create a fresh session record.
That makes session 2 a post-transition count of `1` (Repeat Access) and session 3 a post-transition
count of `2` (Continued Interest). The newly created marker does not turn the first access of that new
session into a refresh. Reload count may update an internal access total, but it never advances the
visitor to another narrative state or increments `returnSessionCount`.

SAME-SESSION REFRESH APPLIES ONLY WHILE `RETURNSESSIONCOUNT` IS BELOW `2`. At `2` or greater,
Continued Interest takes precedence and remains visible on reload.

## 6. Terminal identity

Generate a fictional local identifier such as `LC-7F3A-8804`. “Terminal” names the browser-local
record in the copy; it does not authorize a terminal visual style. Never display or request the
visitor's IP address. Do not use browser fingerprinting. The terminal ID is browser-local, not a
visitor identity. Reference `8804-X` is a standing containment reference shared by the condition,
not a visitor-specific identifier. The remembered first-contact timestamp creates the recognition
effect.

## 7. Interaction

There are no useful calls to action. Reloading, leaving, and returning are the interaction. Every
public path resolves to the same error-state system; no route reveals ordinary agency content.

If legal or privacy disclosure is required, make it accessible from a quiet plain-text link after the
error copy without adding site navigation or an agency explanation. The disclosure must truthfully
state that recognition is stored only in the browser.

## 8. Accessibility and storage failure

- Use a semantic main heading and status message.
- Keep timestamps readable by assistive technology.
- Do not rely on color, motion, position, or styling alone for meaning.
- Support zoom, high contrast, keyboard access, and reduced-motion preferences.
- Resolve state before revealing state-dependent copy.
- If storage is unavailable, render a neutral inaccessible-resource state without claiming
  recognition or persistence.

The fallback must not claim that a log, terminal identity, prior contact, or persistent record exists.
Only `sessionStorage` and `localStorage` may support recognition. Do not use cookies, IP addresses,
fingerprinting, authentication, server persistence, backend identity records, or cross-device
stitching.

## 9. Acceptance

The design passes only when it looks like an ordinary plain error response that happens to speak with
complete institutional certainty. All four approved states remain legible and unchanged; the three-
session progression and resolve-before-reveal rule remain intact; jurisdiction is unnamed; `8804-X`
remains a standing containment reference; browser recognition stays local; storage failure makes no
recognition claim; and no ordinary agency content exists.

Reject any implementation that adds brand presentation, a second visual register, or horror styling.
