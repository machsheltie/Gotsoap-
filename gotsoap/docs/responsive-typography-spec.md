# Got Soap? responsive typography specification

**Status:** active working authority; responsive interpolation, measure, wrapping, cropping, and zoom behavior locked  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `typography-spec.md`, `letter-spacing-spec.md`, `ui-system.md`, `design.md`, and `../../docs/HANDOFF.md`
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file completes the responsive behavior layer of the Got Soap? typography package. It converts the approved type scale into implementation rules so the site cannot be reduced to ordinary breakpoint-based web typography.

Where this file assigns an exact responsive formula, text measure, wrapping rule, crop boundary, or zoom behavior, it is binding and supersedes the corresponding pending item in `typography-spec.md`.

---

# 1. Governing principle

Mobile is not a proportionally reduced desktop composition.

The typography must preserve the campaign’s hierarchy through:

- controlled fluid scaling;
- route-specific recomposition;
- selective display cropping;
- disciplined text measures;
- intentional line breaks;
- readable body and utility floors;
- layout changes before typographic compromise.

Binding laws:

- Display typography scales more aggressively than reading and interface typography.
- Type growth stops once the approved maximum is reached.
- Layout yields before readability does.
- A failed line break is solved through copy, measure, or composition before font size or tracking is compromised.
- Responsive behavior must preserve the role of each family.
- No route may invent its own fluid type formula.

---

# 2. Behavioral viewport bands

These are composition bands, not assumptions about specific devices.

| Band | Width | Typographic behavior |
|---|---:|---|
| Compact | `320–767px` | Mobile composition; display type moves through its approved mobile range |
| Intermediate | `768–1023px` | Editorial transition; mobile composition may reorganize before desktop composition is introduced |
| Wide | `1024–1439px` | Full campaign composition; display type grows aggressively through its desktop range |
| Cinematic | `1440px+` | Typography reaches its approved maximum and stops growing |

## 2.1 Fluid intervals

Typography uses two controlled interpolation intervals:

1. `360–768px`: mobile minimum to mobile maximum;
2. `768–1440px`: mobile maximum to desktop maximum.

Below `360px`, the approved minimum holds.

Above `1440px`, the approved maximum holds.

The `768px` threshold is a typographic interpolation seam. It does not require every route to switch layout at precisely the same pixel.

---

# 3. Canonical fluid formulas

Use these custom properties as the single canonical source of type size. Do not write route-specific replacement `clamp()` formulas.

## 3.1 Oswald

```css
:root {
  --type-command-hero:
    clamp(72px, calc(33.18px + 10.78vw), 116px);

  --type-command-route:
    clamp(54px, calc(24px + 8.33vw), 88px);

  --type-command-section:
    clamp(38px, calc(20.35px + 4.90vw), 58px);

  --type-identity:
    clamp(44px, calc(15.76px + 7.84vw), 76px);
}

@media (min-width: 768px) {
  :root {
    --type-command-hero:
      clamp(116px, calc(-2.86px + 15.48vw), 220px);

    --type-command-route:
      clamp(88px, calc(17.14px + 9.23vw), 150px);

    --type-command-section:
      clamp(58px, calc(30.57px + 3.57vw), 82px);

    --type-identity:
      clamp(76px, calc(30.29px + 5.95vw), 116px);
  }
}
```

The negative intercept in the wide hero expression is mathematically valid. It may not be “cleaned up” into a simpler but inaccurate value.

## 3.2 Moxie Twist

```css
:root {
  --type-whisper:
    clamp(30px, calc(10.59px + 5.39vw), 52px);
}

@media (min-width: 768px) {
  :root {
    --type-whisper:
      clamp(52px, calc(29.14px + 2.98vw), 72px);
  }
}
```

## 3.3 Behind The Nineties

```css
:root {
  --type-editorial-major:
    clamp(24px, calc(15.18px + 2.45vw), 34px);

  --type-confession:
    clamp(20px, calc(14.71px + 1.47vw), 26px);

  --type-body-large:
    clamp(19px, calc(16.35px + 0.74vw), 22px);

  --type-body:
    clamp(16px, calc(14.24px + 0.49vw), 18px);
}

@media (min-width: 768px) {
  :root {
    --type-editorial-major:
      clamp(34px, calc(20.29px + 1.79vw), 46px);

    --type-confession:
      clamp(26px, calc(21.43px + 0.60vw), 30px);

    --type-body-large:
      clamp(22px, calc(18.57px + 0.45vw), 25px);

    --type-body:
      clamp(18px, calc(15.71px + 0.30vw), 20px);
  }
}
```

## 3.4 Marlin Sans SQ

```css
:root {
  --type-control:
    clamp(15px, calc(13.24px + 0.49vw), 17px);

  --type-utility:
    clamp(14px, calc(12.24px + 0.49vw), 16px);

  --type-micro:
    clamp(11px, calc(9.24px + 0.49vw), 13px);
}

@media (min-width: 768px) {
  :root {
    --type-control: 17px;
    --type-utility: 16px;
    --type-micro: 13px;
  }
}
```

Marlin stops growing once its readability and interface targets are met. It does not enlarge merely because the screen becomes cinematic.

## 3.5 Moanslight

```css
:root {
  --type-production:
    clamp(12px, calc(11.12px + 0.25vw), 13px);
}

@media (min-width: 768px) {
  :root {
    --type-production: 13px;
    --type-production-atmosphere: 11px;
  }
}
```

`type-production-atmosphere` is omitted below `768px`; it is not rendered at `0px`.

---

# 4. Text-measure system

Measure is part of the voice system. It prevents large screens from turning persuasive copy into long web paragraphs and prevents mobile from forcing display copy into unreadable stacks.

| Token or use | Maximum measure | Line limit |
|---|---:|---:|
| Hero command | `7.5ch` | 2 |
| Route command | `10ch` | 2 |
| Internal command | `15ch` | 2 wide / 3 compact |
| Identity or verdict | `13ch` | 2 |
| Moxie whisper | `20ch` | 2 |
| Editorial-major | `28ch` | 3 wide / 4 compact |
| Confession | `28–40ch` | natural |
| Body-large | `30–44ch` | natural |
| Standard body | `45–58ch` | natural |
| Utility prose | `42–64ch` | natural |
| Essential microcopy | `45–68ch` | natural |
| Production notation | `28–48ch` | 1–3 |

Rules:

- A measure is a maximum, not a target width for every block.
- Narrower measures may be used deliberately.
- Wider measures require a new owner-approved proof.
- Unused screen space is not permission to lengthen lines.
- Long form, instruction, or legal content uses Marlin rather than widening Behind The Nineties or Moanslight beyond its approved role.

---

# 5. Wrapping system

## 5.1 Display typography

Use:

```css
text-wrap: balance;
hyphens: none;
```

for:

- `type-command-hero`;
- `type-command-route`;
- `type-command-section`;
- `type-identity`;
- `type-whisper`;
- `type-editorial-major`.

Rules:

- Hero and route commands never exceed two lines.
- An isolated second-line word is prohibited unless that word is the intentionally dominant campaign idea.
- Articles and modifiers may not be stranded from the noun they qualify.
- Punctuation remains attached to the phrase it completes.
- Line breaks must preserve syntax, rhythm, and emphasis.
- A display phrase may not be hyphenated to fit.
- Manual `<br>` elements are permitted only in owner-approved display lockups.
- A manual line break may not exist solely to repair one viewport.
- A lockup that fails at another width must be recomposed through CSS, alternate approved markup, or edited copy.

## 5.2 Reading typography

Use:

```css
text-wrap: pretty;
hyphens: none;
```

for Behind The Nineties and Marlin paragraphs where supported.

Do not apply `text-wrap: balance` to paragraphs. Balanced body copy creates an artificial centered-editorial texture and damages sustained reading rhythm.

## 5.3 Long technical strings

Marlin may use:

```css
overflow-wrap: anywhere;
word-break: normal;
```

for:

- URLs;
- email addresses;
- filenames;
- identifiers;
- unavoidable technical strings.

Moanslight must not carry long-string overflow. Move the string to Marlin.

---

# 6. Mobile recomposition law

## 6.1 Hero commands

On compact screens:

- retain the approved `72–116px` range;
- allow no more than two lines;
- reposition against photography rather than centering automatically;
- preserve the model’s face, gaze, and essential body gesture;
- reduce overlap before reducing type below its token;
- allow controlled edge crop only within Section 7;
- move supporting copy beneath or beside the command according to the photograph;
- do not default to a centered heading / centered paragraph / centered CTA stack.

## 6.2 Route commands

- Remain no more than two lines.
- Do not shrink below `54px` to preserve a desktop line break.
- Change the break, measure, composition, or approved copy instead.
- Supporting metadata may move above the route command when it strengthens poster hierarchy.
- Production notation may not be inserted between Oswald lines.

## 6.3 Internal commands

- May use up to three lines on compact screens.
- Remain complete and uncropped by default.
- Do not center automatically.
- Do not become a repeated full-width heading followed by a generic paragraph stack.
- A route may recompose the relationship among command, image, and copy, but may not alter the token values.

## 6.4 Moxie Twist

- Maximum two lines.
- Minimum `30px`.
- May move from an off-axis desktop position to a calmer left-aligned compact composition.
- Must not be reduced into a decorative label.
- Must not remain over a busy photograph merely to preserve desktop placement.
- Must not crop.

## 6.5 Production notation

- Standard Moanslight notation remains available at `12–13px`.
- Nonessential production atmosphere disappears below `768px`.
- Essential specifications may reflow vertically.
- Labels and values may separate onto two lines.
- Production information may not become a horizontally scrolling table.
- Dense, critical, or technically complex specifications migrate to Marlin Sans SQ.

---

# 7. Display-crop boundaries

Cropping is an authored display behavior. It is not accidental overflow.

## 7.1 Hero command

### Desktop maximum

- Up to `10%` of cap height may leave the top or bottom composition boundary.
- Up to `8%` of the first or last glyph width may leave one horizontal edge.
- No more than one horizontal edge may crop a word at a time.

### Mobile maximum

- Up to `6%` of cap height may leave the top or bottom boundary.
- Up to `4%` of the first or last glyph width may leave one horizontal edge.

## 7.2 Route command

### Desktop maximum

- Up to `6%` of cap height.
- Up to `5%` of one outer glyph.

### Mobile maximum

- Up to `4%` of cap height.
- No horizontal glyph crop unless separately owner-approved.

## 7.3 Always prohibited

- cropping Moxie Twist;
- cropping body, utility, metadata, or production notation;
- cropping internal commands by default;
- losing punctuation required for meaning;
- cropping both ends of a word;
- hiding enough of a glyph to create another plausible reading;
- clipping caused by inherited `overflow: hidden`;
- using crop to disguise a poor line break;
- converting live text to an image merely to control crop.

At least one uncropped accessible text representation must remain in the DOM. The visible display should also remain live text whenever technically possible.

---

# 8. Optical safe zones over photography

Display typography crossing photography requires a protected reading and portrait field.

Rules:

- No eye, mouth, or primary facial feature may fall inside a counter or dense letter intersection.
- The model’s gaze must remain legible.
- No essential glyph may disappear into skin or steam with insufficient contrast.
- Critical punctuation must not sit on a high-detail photographic edge.
- Preserve at least `0.35em` between supporting copy and a display glyph boundary.
- Preserve at least `24px` compact / `40px` wide between functional controls and cropped display type.
- A text-image overlap must strengthen the relationship between desire and command.
- Overlap for maximalist decoration alone is prohibited.

---

# 9. Navigation pressure behavior

Navigation uses Marlin Sans SQ Medium at the locked `15–17px` range.

When the full title-case navigation no longer fits:

1. reduce space between navigation items within the future spacing-system limits;
2. remove or relocate nonessential header utility;
3. switch to the approved mobile menu;
4. never reduce navigation below `15px`;
5. never abbreviate route names;
6. never replace route labels with unexplained icons.

The layout yields before navigation typography does.

---

# 10. Zoom, text enlargement, and rendering resilience

The typography must survive:

- browser zoom to `200%`;
- user text enlargement;
- narrow desktop windows;
- Windows font rendering;
- macOS font rendering;
- device-pixel-ratio differences;
- delayed webfont loading;
- font fallback during loading or failure.

At enlarged text sizes:

- display overlap may disengage;
- decorative crop may disappear;
- supporting copy may move beneath imagery;
- controls may become full width;
- image priority may change;
- the hierarchy must remain intact;
- content may not be clipped, hidden, or reduced to preserve the original composition.

This is not a visual failure state. It is the accessible version of the same art direction.

---

# 11. Implementation prohibitions

Claude and implementation agents may not:

- replace the formulas with a framework type scale;
- use one fluid formula for every token;
- invent route-specific type sizes;
- exceed the locked maximums;
- shrink body, utility, control, or microcopy below their locked floors;
- use tracking to force a phrase to fit;
- use transforms to repair a failed display lockup;
- preserve desktop overlap at the expense of mobile readability;
- keep nonessential Moanslight atmosphere on compact screens;
- center every mobile typographic composition;
- use horizontal scrolling for production specifications;
- crop unapproved families;
- maintain a decorative crop at `200%` zoom;
- hide overflow that contains meaningful text;
- convert live typography into raster artwork for layout convenience.

---

# 12. Acceptance tests

Responsive typography passes only when:

- each token uses its canonical formula;
- display growth stops at `1440px`;
- Marlin and Moanslight stop growing after their readability target;
- no hero or route command exceeds two lines;
- internal commands use no more than three lines on compact screens;
- standard body remains within `45–58ch`;
- mobile is visibly recomposed rather than proportionally shrunk;
- crop remains within the approved percentages;
- no facial feature is compromised by typographic overlap;
- navigation transforms before shrinking below `15px`;
- nonessential Moanslight atmosphere is omitted below `768px`;
- technical strings move to Marlin when needed;
- layout remains usable at `200%` zoom;
- display overlap and crop safely disengage when accessibility requires it;
- no text is hidden to preserve the original art direction.

---

# 13. Decision log

## 2026-07-29 — responsive typography behavior lock

Approved:

- four behavioral viewport bands;
- two-stage interpolation across `360–768px` and `768–1440px`;
- the complete canonical `clamp()` formulas in Section 3;
- maximum growth at `1440px`;
- near-static interface and production sizes after readability targets are met;
- role-specific text measures;
- balanced display wrapping and pretty paragraph wrapping;
- prohibition against paragraph balancing;
- manual display breaks only in approved lockups;
- mobile as recomposition rather than proportional reduction;
- strict hero and route crop percentages;
- prohibition against cropping Moxie, body, utility, metadata, or production notation;
- optical safe zones for text crossing photography;
- navigation transformation before typographic reduction;
- production-notation reflow without horizontal scrolling;
- responsive behavior under `200%` zoom and user text enlargement;
- layout yielding before typography or readability.
