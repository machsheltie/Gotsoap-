# Office of Lather Compliance design system

**JURISDICTION: DELIBERATELY UNSPECIFIED**
**PUBLIC SURFACE MODEL: ERROR STATES ONLY**

## Thesis

The Office never tries to frighten. It believes it is administering a routine condition. The
language is patient, exact, and certain; the audience supplies the fear.

The site is not an agency portal with a creepy 404. **The custom error state is the entire site.**
Nothing useful waits behind it.

## Emotional temperature

- The Office is patient.
- The Office assumes procedure is reasonable.
- The Office never raises its voice.
- The Office never jokes intentionally.
- The Office notices actions without boasting about surveillance.
- It implies an existing relationship with the visitor.
- Certainty is more important than menace.

Avoid monsters, glitches, red warning strobes, “field assessor en route,” classified-file clichés,
or explicit threats. The uncanny detail is institutional politeness: **“Please remain available.”**

## Visual system

The surface resembles a maintained legacy government terminal upgraded just enough to remain in
service:

- off-white institutional field;
- near-black administrative ink;
- one muted status red used sparingly;
- narrow monospaced identifiers paired with a sober, highly legible text face;
- hard rules, fixed-width record blocks, document codes, and exact timestamp alignment;
- no photography, illustrations, dashboards, cards, hero imagery, or conventional navigation.

It should be clean and plausible, not distressed horror UI. No VHS noise, CRT scanline wallpaper,
terminal-green hacker theme, blood-red overlays, or animated glitches.

## Required state copy

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

## Terminal identity

Generate a fictional local identifier such as `LC-7F3A-8804`. Never display or request the visitor's
IP address. Do not use browser fingerprinting. The remembered first-contact timestamp and reference
number create the recognition effect.

## Interaction

There are no useful calls to action. Reloading, leaving, and returning are the interaction.
If legal/privacy disclosure is required, make it accessible from a restrained footer control without
turning the page into an agency explainer. The disclosure must truthfully state that recognition is
stored only in the browser.

## Accessibility

- Semantic main heading and status message.
- Timestamps readable by assistive technology.
- Status color never carries meaning alone.
- No flashing or motion dependence.
- System works with zoom, high contrast, keyboard, and reduced motion.
- If storage is unavailable, safely render FIRST ACCESS on each load.

## Acceptance

The design passes when it feels like a real institution refusing access, not a horror-themed landing
page; all four states remain legible; no jurisdiction is named; and no ordinary agency content exists.
