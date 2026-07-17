# Phase 3 — Remediation Order (hand to Fable WITH Sol's review)

Sol's review (`phase-3-review.md`) is a **FAIL** with 6 FAILs + 1 CONCERN. Before you
remediate, read this — because the ground moved under that review and you must not
remediate it blindly.

## Two things changed after Sol audited. Both matter.

**1. The spec you built from was the wrong one.** There were two spec files. You built
against root `specs.md` (the stale mirror). Sol audited against
`docs/superpowers/specs/2026-07-14-…build-spec.md` (which was more complete). They have
now been **consolidated into root `specs.md` (2026-07-15)**, and the superpowers copy is
**retired**. Root `specs.md` is now the single law and carries everything the canonical
had that the stale mirror lacked — the `<head>` steam bootstrap (§3.1), the true 301
(§13), the live-text Evidence Wall (§3.2), the `PLACEMENT_HUB_WIDE_MEDIA` export (§4),
and three flagged copy strings (§7.2). **Re-read `specs.md` §3 and §13 before you start.**
Findings F1, F2, and F5 exist only because you followed the stale mirror; they are real.

**2. Two owner amendments (2026-07-15) sit on top of the spec.** The maker credit is
**footer-only** and the flagship is **Unholy**. One of Sol's findings (F6) must be
*reconciled* with the credit amendment, not applied literally — see below.

**The gate set grew to 19** (added G7c, G17; G11 tightened). Paste the new `gate-set:`
fingerprint in your remediation report so Sol's close-out reads the right board.

## Finding-by-finding — what to actually do

| Sol # | Verdict | Do this (reconciled) |
|---|---|---|
| **F1** flagship = Poster 5 | FAIL | Flip `config/site.ts` → `HOME_FLAGSHIP = 'unholy'`. Owner decision + spec agree. **G16** enforces it. |
| **F2** steam bootstrap in body | FAIL | Move the first-visit decision to a **synchronous `<head>` script** (in `BaseLayout` head or a head partial). Per `specs.md` §3.1: check reduced-motion **and** `sessionStorage` in the head, add a `steam-first-visit` class to `<html>` only when motion is allowed and the flag is absent; hero CSS shows fog only under that class. No fog flash on return, storage-error, or no-JS. |
| **F3** "derived wash" = canonical download | FAIL | The wash must be a **purpose-built lightweight derivative**, never `/downloads/<slug>.jpg`. **G7c** now fails on any `/downloads/<canonical>` in a home file — it currently passes, so confirm your fix holds and don't regress it. |
| **F4** QC card crosses the poster box | FAIL | The fixed `ScratchSniff` card overlays the flagship poster on scroll. §3.3/§5.1: the untouched poster is **never** overlaid. Pass `hideScratchSniff` on the home, or make the card structurally incapable of crossing the poster box. This is the same defect class you already removed from detail routes — kill it here too. |
| **F5** deleted preview, no 301 | FAIL | Add a **true Netlify 301** from `/movement-preview` to `/` (`netlify.toml` `[[redirects]]` or `public/_redirects`), and confirm the route is absent from the sitemap. **G17** enforces it. Deletion alone is the weaker half. |
| **F6** credit not verbatim | FAIL | **RECONCILE — do not apply literally.** Sol says make the credit the verbatim upper-case string *in both locations*. The owner amendment says the credit is **footer-only**. So: **delete the masthead credit entirely** (`Masthead.astro:58`), and make the **footer** credit the exact source string `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` — real caps in the markup, not lower-case + `small-caps` CSS. **G11** now enforces both halves: it FAILS on a masthead credit and FAILS on a non-verbatim footer string. Do **not** "fix" the masthead credit to caps — that re-violates the amendment. |
| **F7** rail lock breaks at 1920 | CONCERN | Answer it. Sol measured a 229.9px gap at 1920×1080 where §3.2's architectural lock is supposed to hold. Either fix the rail so it locks at the wide breakpoint, or justify with evidence why the mobile-tier lock satisfies §3.2. You must respond; you need not necessarily change it. |

## New spec requirements you now inherit (not in Sol's review, but now law)

The consolidation pulled in requirements the stale mirror lacked. Two touch Phase 3:

- **§3.2 — the Evidence Wall must be live HTML text.** Figures and complete findings
  render as live text with CSS treatments, intelligible with images disabled, and the
  decorative duplicate figure is `aria-hidden` so screen readers read the number once.
  If you baked any of The Case into an image, that is now a violation.
- **§7.2 — three flagged home copy strings** (`homev2/Hero.astro` PROVOCATION + the "A
  public hygiene initiative" signature, `homev2/Confrontation.astro` CONFRONT) are
  **copy-lane owned.** Flag them, don't rewrite them. They must be resolved before launch,
  not by you.

## Definition of done for this remediation

1. `npm run gates:phase 3` exits 0 (G6, G7, G7c, G7b, G11, G16, G17 all green).
2. `npm run build` clean; re-run `npm run distinguish` if you touched any shared primitive.
3. Write `docs/build/reports/phase-3-remediation.md` — one row per Sol finding, what you
   did (or, for F7, your argument), with the new `gate-set:` fingerprint.
4. Then Sol runs the **close-out** pass (not a re-audit) against the amended spec.
