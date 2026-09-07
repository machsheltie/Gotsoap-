# Front-end visual defect brief (home redo + adjacent surfaces)

The front end is being **redone**; the home's first attempts missed on execution. These are
concrete visual defects found by direct inspection at desktop widths (2026-07-16), with root
causes and fix principles. Defects 1–3 are the **home** (feed the Phase 3 home redo); Defect 4
is **`/crisis`** (a CWAAA surface, fixable as an independent targeted pass). Treat the home
typography items as **one pass**, not a pile of one-off nudges — most share a cause, and a
per-glyph tweak that looks right at 1440 re-breaks at 1920.

**Verify every fix at all three widths (§12): 390 × 844 (mobile), 1440 × 900, 1920 × 1080.**
Mobile and desktop are both first-class; the owner viewer flips between them.

---

## Defect 1 — display type is clipped (ONE systemic cause, several symptoms)

Confirmed symptoms:
| Symptom | file:line | measured |
|---|---|---|
| Masthead "got **soap?**" — g/p descenders sliced flat | `homev2/Masthead.astro:134` | `line-height: 0.85` |
| Hero "got soap?" wordmark | `homev2/Hero.astro:207` | `line-height: 0.90` |
| Case stat numbers (73% / 0%) cropped | `homev2/Case.astro:265` | `line-height: 0.82` |

**Root cause (shared):** display glyphs set with **`line-height` below 1.0** *and* painted with
**`background-clip: text`** (the `.fx-chrome` / `.fx-gold` / `.fx-steam-glow` helpers). A
sub-1.0 line box is shorter than the glyph, and `background-clip: text` paints only the glyph
box — so descenders (g, p, y, j, q) and tall numerals fall outside the painted/line box and
get cropped by the box edge, the bottom rule, or the next section's background. Nothing has
`overflow: hidden` here — the crop is the short line box plus clip-to-text, not a container.

**Fix principle (not per-glyph):**
- Any display type that can carry a descender or tall numeral gets **`line-height` ≥ ~1.05–1.15**,
  never < 1.0.
- Where `background-clip: text` is used, add **descender clearance** — a little `padding-block`
  (and matching negative margin if layout needs it) so the clipped paint region isn't trimmed.
- Keep the effect the owner likes — the gradient/beveled fill stays; only its vertical room changes.
- Then re-check g/p/y and the "%" figures are **fully visible at 390, 1440, and 1920** — the fluid
  `clamp()` sizes change the ratio's effect per width, so one width is not proof.

This class of type also appears on `quiz/Quiz.astro`, `quiz/VerdictCard.astro`, and
`homev2/Confrontation.astro` (all use the fx-clip helpers) — sweep them in the same pass.

---

## Defect 2 — the Unholy section background is the poster, blurred (muddy + unreadable)

`homev2/Campaign.astro:45` builds the flagship section's background by `getImage()`-ing the
**canonical Unholy poster** into a webp and blurring it (`blur(54px) saturate(1.18)
brightness(0.92)` via `.fx-poster-wash`). Result: a busy, mid-bright, over-saturated crop of
the same poster sitting behind the gold headline — the beveled gold text barely reads.

Two problems in one:
1. **Legibility:** the ground competes with the crisp poster and starves the gold text of contrast.
2. **Spec:** it's the canonical poster used as atmosphere — a §3.3 violation. It previously used
   `/downloads/unholy.jpg`; the F3 "fix" only swapped the path to a `getImage()` of the same
   poster, which dodged the old G7c. **G7c is now broadened and fails on this** (any wash that
   derives from the canonical poster, by any path). This reopened Phase 3 — correctly.

**Fix direction (owner-confirmed):** this spot *can* have a background image — but a
**purpose-built one made for this section that works with the gold text effects**, not the
flagship poster reused.
- **Interim (unblocks the redo now):** a pure **CSS smoke-register material** ground —
  `grout-black → smoke-slate` gradient + the `--grain-fine` plate — dark and uniform enough
  that the `.fx-gold` headline clears **AA contrast**. No image, no G7c/G14 exposure.
- **Final:** **Stacey's purpose-built section background** (a new owner asset — see the asset
  queue). Designed to sit under the gold text with AA contrast, in the Unholy smoke register.
- **Preserve `.fx-gold`** — the owner specifically likes the poured-amber beveled headline. The
  ground exists to make it read, not to replace it. Verify AA contrast of the gold text against
  whatever ground ships.

---

## Defect 3 — eyebrow rule collides with the eyebrow text

At 1440, "THE FLAGSHIP · UNHOLY" (`homev2/Campaign.astro`) has a horizontal divider rule running
*through* the text. The rule and the eyebrow occupy the same line box. Fix: give the rule its own
row or inset it so it never crosses the glyphs (spacing, not z-index hacks).

---

## Defect 4 — `/crisis` reads thin at desktop distance (CWAAA legibility)

The CWAAA crisis page sets its **long** passages in Courier New (`.dossier-typewriter`,
`components/cwaaa/CrisisReport.astro:240`) — a thin, low-ink monospace built for short bits,
not comfortable for long-form reading at desktop distance. That's the discomfort. Contrast is
fine (**8.6:1**, ink `#2f3e5c` on manila `#efe6cf`) — this is stroke weight / font choice, not
colour. PT Serif body is a touch delicate too (400 weight; PT Serif ships only 400/700, so
there is no medium to reach for).

**Owner decision (2026-07-16): typewriter as ACCENT.** Fix direction:
- **Restrict `.dossier-typewriter` (Courier) to SHORT stamped bits** — case numbers, finding
  labels, one-line findings, seal/stamp text — where a typewritten detail reads as a stamp.
- **Move the long CWAAA narrative to PT Serif** (the register body, `--font-cwaaa`): the founding
  myth (`CrisisReport.astro:39`), the ribbon body (`:51`), release bodies (`:103`), and any
  multi-sentence table finding. One short line may stay typewriter; a paragraph may not.
- **Nudge PT Serif reading size up** (~18 → ~19px) with the generous line-height kept — since PT
  Serif has no medium weight, *size* is the comfort lever, not weight. Do not bold running text
  (700 reads aggressive; wrong for the procedural-calm CWAAA register).
- **Stay in register:** PT Serif + manila + ink, procedural-earnest, never "ugly on purpose." No
  new font family, no colour change (contrast is already good).
- **Verify comfort at reading distance:** 1440×900 and 1920×1080 *and* 390×844 — sit back from
  the screen, not nose-to-glass.

This is a §1 two-author concern (CWAAA is played straight), so keep its deadpan-bureaucracy
character — the typewriter *accent* is part of that; the wall of typewriter body was not.

## What this needs from the owner (asset queue)

Add to Stacey's deliverables, alongside the text-free hero and the placement-hub composite:

> **Flagship section background** — a purpose-built atmospheric image for the home's Unholy
> Campaign section, in the smoke register, dark/uniform enough that the `.fx-gold` headline and
> body copy clear WCAG AA. **Not** the canonical poster. Until it lands, the section uses the
> CSS smoke-material interim above; production ship of that section waits on the real asset.

## Definition of done for this pass
- `g`, `p`, `y`, and the `%` figures are fully visible in every display string at 390 / 1440 / 1920.
- `npm run gates` — **G7c green** (the wash no longer derives from the canonical poster).
- The `.fx-gold` headline clears AA contrast against its ground (measure it, don't eyeball).
- No divider rule crosses any eyebrow's glyphs.
- The gradient/beveled text effects the owner likes are intact.
