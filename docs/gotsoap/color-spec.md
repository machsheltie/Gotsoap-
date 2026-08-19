# Got Soap? color architecture

**Status:** active working authority; primitive palette, semantic roles, register maps, token-count law, and primary-action behavior locked; state, overlay, and high-contrast colors pending focused interview  
**Applies to:** Got Soap? campaign website only  
**Reads with:** `ui-system.md`, `typography-spec.md`, `responsive-typography-spec.md`, `font-delivery-spec.md`, `../design.md`, `../prd/PRD-gotsoap-web-v1.md`, and `../HANDOFF.md`  
**Does not apply to:** CWAAA or the Office of Lather Compliance

This file converts the approved Got Soap? material palette into implementation law. It exists to prevent the campaign from collapsing into generic black-and-gold luxury, flat charcoal UI, pale wellness branding, or a single universal color theme.

Where this file assigns an exact primitive, semantic alias, register combination, contrast prohibition, or action treatment, it is binding and supersedes the corresponding pending item in `ui-system.md`.

---

# 1. Governing principle

Color is material behavior before it is decoration.

The Got Soap? palette must perform three distinct cinematic worlds:

- **Steam / Tile:** exposed, bright, wet, immediate;
- **Smoke / Chrome:** sinful, nocturnal, devotional;
- **Amber / Marble:** body heat, stone, public announcement as seduction.

Binding laws:

- One section operates inside one active register.
- A section ordinarily uses only two or three palette primitives in its authored UI layer.
- Photography may contain natural tonal variation without violating the token-count law.
- Components consume semantic roles, not primitive colors directly.
- `marble-amber` is the sole campaign action accent.
- Amber does not become a generic luxury color.
- Chrome does not become grey UI.
- Smoke-slate does not become a universal page background.
- Steam-white and lather-white are not interchangeable.
- Contrast and comprehension outrank photographic mood.

---

# 2. Canonical primitive palette

```css
:root {
  --gs-grout-black: #050505;
  --gs-steam-white: #F7F6F1;
  --gs-smoke-slate: #292A2F;
  --gs-chrome-mist: #B9BBC2;
  --gs-marble-amber: #C78B3B;
  --gs-lather-white: #FFFFFF;
}
```

These values are locked unchanged.

They are material primitives, not direct component instructions.

Implementation may not assign a primitive directly to a reusable component merely because the color appears appropriate. Reusable components must consume semantic aliases so register behavior and action hierarchy remain controlled.

Prohibited pattern:

```css
.button {
  background: var(--gs-marble-amber);
}
```

Required pattern:

```css
.button-primary {
  background: var(--color-action-primary-surface);
  color: var(--color-action-primary-text);
}
```

---

# 3. Primitive-role law

## 3.1 `grout-black`

**Primary role:** absolute ink, hard material cut, deepest shadow, and dark control inversion.

Approved uses:

- primary text on light surfaces;
- hard section cuts;
- black fields in Smoke / Chrome;
- black text on amber actions;
- severe rules and borders;
- selected dark control surfaces;
- deep shadow inside Amber / Marble.

Prohibited uses:

- default background for every route;
- one continuous black skin across all registers;
- a replacement for actual material transitions;
- arbitrary softening into charcoal because `#050505` feels too severe.

The severity is intentional. Grout-black creates the campaign's hard visual cut.

## 3.2 `steam-white`

**Primary role:** environmental light and principal pale surface.

Approved uses:

- Steam / Tile backgrounds;
- warm editorial reading surfaces;
- tile-adjacent negative space;
- pale supporting artifacts;
- light functional surfaces where the register requires them.

Steam-white is the campaign's **surface white**.

It must not become spa beige, skincare white, or generic soft-minimal branding.

## 3.3 `lather-white`

**Primary role:** optical highlight and maximum light contrast.

Approved uses:

- readable text on grout-black or smoke-slate;
- foam and lather highlights;
- sharp white rules;
- selected bright control details;
- photographic highlights.

Lather-white is not a second pale page background.

### White separation law

`steam-white` and `lather-white` are too close to create a meaningful text, border, focus, or component distinction.

> Steam-white creates atmosphere. Lather-white creates contrast.

They may coexist as material light, but they may not be used as a functional foreground/background pair.

## 3.4 `smoke-slate`

**Primary role:** nocturnal depth and secondary dark surface inside Smoke / Chrome.

Approved uses:

- layered dark fields;
- smoke-register depth;
- subordinate dark bands;
- selected support surfaces behind chrome notation;
- spatial separation where grout-black would be too absolute.

Prohibited uses:

- universal page background;
- readable text on grout-black;
- generic charcoal cards;
- flat-grey substitution for actual smoke depth;
- disabled-state text by default.

Smoke-slate and grout-black form a material distinction, not a reliable readable foreground/background pair.

## 3.5 `chrome-mist`

**Primary role:** metallic signal, reflected light, and technical elegance.

Approved uses:

- narrow rules;
- controlled glare;
- production notation on dark surfaces;
- selected large display treatments;
- chrome edges;
- restrained structural accents inside Smoke / Chrome.

Prohibited uses:

- body text on steam-white;
- disabled text by default;
- large grey panels;
- generic metallic gradients;
- broad premium decoration;
- a replacement for lather-white when effortless reading is required.

Chrome-mist belongs primarily to nocturnal material behavior.

## 3.6 `marble-amber`

**Primary role:** heat, desire, action, and the Amber / Marble material world.

Approved uses:

- primary campaign action signal;
- amber-register light;
- selected narrow emphasis;
- inscriptions and restrained rules;
- limited hover or selected-state expression;
- controlled material detail.

Prohibited uses:

- generic gold headings;
- all prices;
- every icon;
- passive decoration throughout the site;
- white text on solid amber;
- amber text on steam-white or lather-white;
- broad orange overlays over photography;
- turning every clickable element gold.

---

# 4. Contrast law

The following pairings are binding.

| Foreground / background | Approximate contrast | Decision |
|---|---:|---|
| `grout-black` on `marble-amber` | `6.97:1` | approved |
| `marble-amber` on `grout-black` | `6.97:1` | approved |
| `marble-amber` on `smoke-slate` | `4.90:1` | approved with care |
| `lather-white` on `marble-amber` | `2.92:1` | prohibited for readable text |
| `steam-white` on `marble-amber` | approximately `2.70:1` | prohibited for readable text |
| `marble-amber` on `steam-white` | approximately `2.70:1` | prohibited for readable text |
| `steam-white` against `lather-white` | approximately `1.08:1` | prohibited as functional distinction |
| `smoke-slate` against `grout-black` | approximately `1.42:1` | material depth only; not readable text |

Binding consequence:

> Solid amber controls use grout-black text. Never white.

No route may waive this rule because white-on-gold appears more luxurious.

---

# 5. Material color and action color must be separate aliases

`marble-amber` performs two legitimate jobs:

1. amber light and stone inside the Amber / Marble register;
2. the campaign's sole action accent.

These jobs must remain semantically separate even while they resolve to the same primitive.

```css
:root {
  --color-material-amber: var(--gs-marble-amber);
  --color-action-accent: var(--gs-marble-amber);
}
```

A future adjustment to action behavior must not automatically recolor:

- marble light;
- photographic overlays;
- stone inscriptions;
- material transitions;
- ambient amber detail.

Likewise, amber appearing in photography does not authorize amber buttons, labels, headings, and rules throughout the same composition.

---

# 6. Stable semantic roles

```css
:root {
  --color-absolute-dark: var(--gs-grout-black);
  --color-optical-light: var(--gs-lather-white);
  --color-surface-light: var(--gs-steam-white);
  --color-depth-dark: var(--gs-smoke-slate);
  --color-metallic-detail: var(--gs-chrome-mist);
  --color-material-amber: var(--gs-marble-amber);
  --color-action-accent: var(--gs-marble-amber);
}
```

Stable semantics describe enduring jobs. Register semantics describe the currently active world.

Components may consume:

- surface;
- text;
- secondary text;
- rule;
- material detail;
- primary action surface;
- primary action text;
- secondary action;
- tertiary action.

Components may not choose raw material primitives independently.

---

# 7. Register maps

## 7.1 Steam / Tile

**Material world:** white tile, condensation, grout, wet skin, black type.

**Emotional temperature:** exposed, bright, immediate.

### Canonical combination

- surface: `steam-white`;
- primary text: `grout-black`;
- secondary text: `grout-black`;
- hard rule or cut: `grout-black`;
- primary action: `marble-amber` with `grout-black` text;
- optical highlight: `lather-white`, material use only.

```css
[data-register="steam-tile"] {
  --color-surface: var(--gs-steam-white);
  --color-surface-secondary: var(--gs-steam-white);
  --color-text-primary: var(--gs-grout-black);
  --color-text-secondary: var(--gs-grout-black);
  --color-rule: var(--gs-grout-black);
  --color-material-detail: var(--gs-lather-white);
  --color-action-primary-surface: var(--gs-marble-amber);
  --color-action-primary-text: var(--gs-grout-black);
}
```

### Character law

Bright does not mean gentle.

Steam / Tile should feel:

- wet;
- exposed;
- severe;
- expensive;
- slightly confrontational.

It must not become:

- spa beige;
- skincare white;
- Apple-store minimalism;
- pale wellness branding;
- rounded white cards floating over another white surface.

### Ordinary token set

```text
steam-white
grout-black
marble-amber only where primary action is present
```

Lather-white may exist in photography, steam, foam, or optical highlight without becoming another UI hierarchy color.

## 7.2 Smoke / Chrome

**Material world:** black air, silver light, chrome, drifting smoke.

**Emotional temperature:** sinful, nocturnal, devotional.

### Canonical combination

- foundation: `grout-black`;
- secondary depth field: `smoke-slate`;
- primary text: `lather-white`;
- metallic detail and selected secondary text: `chrome-mist`;
- primary action: `marble-amber` with `grout-black` text.

```css
[data-register="smoke-chrome"] {
  --color-surface: var(--gs-grout-black);
  --color-surface-secondary: var(--gs-smoke-slate);
  --color-text-primary: var(--gs-lather-white);
  --color-text-secondary: var(--gs-chrome-mist);
  --color-rule: var(--gs-chrome-mist);
  --color-material-detail: var(--gs-chrome-mist);
  --color-action-primary-surface: var(--gs-marble-amber);
  --color-action-primary-text: var(--gs-grout-black);
}
```

### Hierarchy law

- Grout-black and smoke-slate create spatial depth.
- Lather-white carries effortless reading.
- Chrome-mist performs material sophistication.
- Amber appears when the visitor can act.

### Generic dark-luxury failure

A composition fails when it reduces the register to:

- charcoal background;
- silver heading;
- grey paragraph;
- gold button;
- glass panel.

Smoke / Chrome requires actual black void, spatial smoke, narrow chrome behavior, and disciplined type. It is not a dark fragrance template.

## 7.3 Amber / Marble

**Material world:** warm stone, amber light, body heat, deep shadow.

**Emotional temperature:** public announcement as seduction.

### Canonical combination

- foundation: `grout-black` or photographic deep shadow;
- material field: warm marble photography;
- primary text: `lather-white` over verified dark fields;
- selected supporting light text: `steam-white` where contrast is sufficient;
- inscription or material detail: `marble-amber`;
- optional light reading surface: `steam-white`.

```css
[data-register="amber-marble"] {
  --color-surface: var(--gs-grout-black);
  --color-surface-secondary: var(--gs-steam-white);
  --color-text-primary: var(--gs-lather-white);
  --color-text-secondary: var(--gs-steam-white);
  --color-rule: var(--gs-marble-amber);
  --color-material-detail: var(--gs-marble-amber);
  --color-action-primary-surface: var(--gs-grout-black);
  --color-action-primary-text: var(--gs-marble-amber);
  --color-action-primary-border: var(--gs-marble-amber);
}
```

### Action inversion law

Amber cannot function as both ambient material and an obvious flat amber button in the same immediate composition. The control would disappear into the register.

Therefore, the default primary action inside Amber / Marble uses:

- grout-black surface;
- marble-amber text;
- marble-amber border.

Its hover or selected state may invert to:

- marble-amber surface;
- grout-black text.

### Material-source law

Amber must come from:

- stone;
- reflected light;
- skin warmth;
- inscriptions;
- one controlled action signal.

It must not come from an orange wash placed over the entire photograph.

---

# 8. Two-or-three-token law

A section ordinarily uses two or three primitive palette tokens in its authored UI layer.

The authored UI layer includes:

- background or field;
- readable type;
- rules;
- controls;
- icons;
- live overlays;
- functional annotations.

Natural variation in approved photography does not count as a violation.

A section fails when it visibly deploys all six primitives merely because they are available brand colors.

The palette is a cast. Not every actor appears in every scene.

### Allowed examples

Steam / Tile:

```text
steam-white + grout-black
steam-white + grout-black + marble-amber
```

Smoke / Chrome:

```text
grout-black + lather-white + chrome-mist
grout-black + lather-white + marble-amber
```

Amber / Marble:

```text
grout-black + lather-white + marble-amber
steam-white + grout-black + marble-amber
```

A section may use smoke-slate in place of one other dark material token when actual depth requires it. It may not add smoke-slate as an extra generic panel color.

---

# 9. Action hierarchy

## 9.1 Primary action outside Amber / Marble

Use:

- marble-amber fill;
- grout-black text;
- no gradient;
- no white label;
- no shadow required for legibility;
- no chrome effect;
- no glow.

This applies by default in Steam / Tile and Smoke / Chrome.

## 9.2 Primary action inside Amber / Marble

Default:

- grout-black fill;
- marble-amber text;
- marble-amber border.

Hover or selected state:

- marble-amber fill;
- grout-black text.

This preserves action visibility in a register already rich with amber light.

## 9.3 Secondary action

Secondary actions use register-appropriate readable text with a hard rule, underline, or other explicit directional treatment.

Examples:

- grout-black on steam-white;
- lather-white on grout-black;
- chrome-mist on grout-black only where the action is genuinely secondary and contrast remains sufficient.

Secondary actions do not use an amber fill.

## 9.4 Tertiary action

Tertiary actions are text-only and visibly interactive through an underline, directional mark, or equivalent non-color cue.

Amber is not required merely because an element is clickable.

### Action-color meaning

Amber signals campaign-level action and heat. It does not signal every interaction.

---

# 10. Component consumption law

Reusable components consume semantic aliases.

Approved:

```css
.campaign-action {
  background: var(--color-action-primary-surface);
  color: var(--color-action-primary-text);
  border-color: var(--color-action-primary-border, transparent);
}
```

Prohibited:

```css
.campaign-action {
  background: #C78B3B;
  color: #FFFFFF;
}
```

A component may expose an intentional register-aware variant. It may not introduce a new color interpretation.

Route CSS may place components inside a register. It may not redefine primitive meanings route by route.

---

# 11. Prohibited color defaults

Do not introduce:

- generic black-to-purple gradients;
- universal charcoal page backgrounds;
- glassmorphism panels;
- broad silver gradients on UI surfaces;
- black-and-gold luxury styling as a global theme;
- spa beige or pastel wellness surfaces;
- pale-grey card grids;
- white-on-gold button labels;
- orange photographic washes posing as amber light;
- low-contrast slate-on-black body copy;
- chrome used as disabled text;
- decorative amber headings without a material or action reason;
- all-amber icon systems;
- all-amber links;
- per-route hex improvisation;
- new primitive colors introduced to solve an unresolved state.

A missing state color must remain pending until approved. Claude may not invent one to complete a component.

---

# 12. Implementation acceptance tests

The primitive and register layer passes only when:

- all six primitive values match the locked values exactly;
- semantic aliases are used by reusable components;
- solid amber controls use grout-black text;
- white text is never placed on solid amber;
- steam-white and lather-white are not used as a functional contrast pair;
- smoke-slate is not used as readable text on grout-black;
- chrome-mist is not used for light-surface body copy;
- each section declares one active register;
- an authored section ordinarily uses no more than three primitives;
- Amber / Marble uses the inverted primary-action treatment;
- Steam / Tile does not become wellness minimalism;
- Smoke / Chrome does not become generic dark-luxury UI;
- Amber / Marble does not become an orange overlay;
- no reusable component directly hardcodes palette primitives without a documented exception;
- no route invents another gold, amber, white, grey, or black.

---

# 13. Pending color decisions

The following remain deliberately unlocked and require the next focused interview:

- focus-ring colors and offset behavior by register;
- error, success, warning, and informational colors;
- disabled surfaces, text, borders, and cursor behavior;
- visited-link behavior;
- selection highlight colors;
- text-on-image overlay and scrim tokens;
- image contrast sampling and fallback logic;
- hover, active, pressed, and loading state values beyond the approved Amber / Marble inversion;
- form-field backgrounds and borders by register;
- forced-colors and high-contrast mode behavior;
- dark/light system preference behavior, if any;
- print and downloadable-artifact color behavior;
- color acceptance thresholds beyond the locked pair prohibitions.

These items may not be inferred from common design-system defaults.

---

# 14. Decision log

## 2026-07-30 — primitive and register architecture locked

Approved:

- all six primitive values remain unchanged;
- steam-white is the surface white;
- lather-white is the optical and high-contrast white;
- smoke-slate is nocturnal depth rather than universal background or readable black-on-black text;
- chrome-mist is restrained metallic detail rather than generic grey UI;
- solid marble-amber always uses grout-black readable text;
- white text on amber is prohibited;
- material amber and action amber use separate semantic aliases;
- Steam / Tile and Smoke / Chrome use amber-filled primary actions;
- Amber / Marble uses black primary actions with amber text and border, inverting on hover or selection;
- the two-or-three-token law applies to the authored UI layer rather than natural photography;
- reusable components consume semantic roles rather than primitive colors;
- state colors, image overlays, and high-contrast behavior remain pending the next color round.
