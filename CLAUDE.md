# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**"Got Soap?"** — a satirical hygiene-PSA ad campaign parodying the 90s **"Got Milk?"** campaign, being built out into a full campaign website and social content program. There is no application code yet; the repo currently holds finished poster art, Photoshop source files, and campaign copy. The web build will be created here.

**The real product is the designer.** This campaign exists to build the brand of **Stacey M. Breckel / Hope2 Studio** — satirical creative director, graphic designer, content creator — and to attract clients in the irreverent-brand space (think Cards Against Humanity, Liquid Death). Every deliverable should be portfolio-grade and should make both women and men laugh and share.

Contact: hope2studio@yahoo.com · © Stacey Breckel 2025. Spec/parody work — not affiliated with any real brand or health organization.

## Non-negotiable creative rules

1. **Never remove or re-typeset the text baked into the five posters.** The typography ON the posters is the Got Milk? parody — it is the artwork. The site must feature the posters as-is in a gallery/campaign section.
2. New web surfaces (hero sections, social cutdowns, landing pages) may retool imagery — re-crops, text-free exports from the `.psd` files, live-HTML type — but the canonical posters stay untouched.
3. Match the established voice: thirst-trap visuals + PSA sincerity + fragrance-ad drama. Subheads open with "Because…", CTAs open with "Join the movement.", hashtag stack is `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`, footer gag is "Funded by Concerned Women Against Axe Abuse".
4. **Two fictional authors, never blended** (design.md §4): campaign surfaces smolder; CWAAA surfaces file paperwork (procedural-earnest, PT Serif, manila). The org is played straight — competent modest nonprofit, never "ugly on purpose." Their voices collide only at designed seams.

## The five canonical posters (1080×1350, 4:5)

| Poster | File | Angle | Mood |
|--------|------|-------|------|
| 1 | `cleanmansatire.jpg` | "A Clean Man Is A Confident Man" | Bright white tile + steam, black headline |
| 2 | `cleanmansatire2.jpg` | "Soap-Smoldering" | Bright tile, black headline |
| 3 | `cleanmansatire3.jpg` | "Unholy" | Dark smoke, chrome headline |
| 4 | `cleanmansatire4.jpg` | "The Redemption Ad" | Dark smoke, chrome headline |
| 5 | `cleanmansatire5.jpg` | "Public Thirst Announcement" | Warm amber marble, gold body text |

Suffix convention: `a` / `aa` files are alternate/minimalist crops (headline + CTA + hashtags only). Poster 5 has an `a` variant but no `aa` minimalist version. Poster 5 deliberately features a Black model — inclusive casting is intentional campaign direction; carry it forward in any new imagery.

Shared poster anatomy (the template, if new posters are ever added): `got soap?` headline → "Because…" subhead → body copy over torso → divider rule → CTA line → hashtag row → footer gag + copyright.

## Design system

- **Fonts (posters):** Phenix American (headline), Futura PT (primary body/CTA), Franklin Gothic ATF Heavy (movement line + hashtags), Montserrat (fine print). **Fonts (web — resolved, PRD §7):** free self-hosted substitutes — Oswald (display), Jost (body/CTA), Libre Franklin (movement/hashtags), Montserrat (fine print), plus **PT Serif quarantined to CWAAA-authored surfaces only**. Phenix American is confirmed NOT on Adobe Fonts; don't reopen this without new facts.
- **Palette (posters):** neutrals `#000000`, `#181818`, `#707078`, `#999999`, `#ffffff` plus warm gold/amber (poster 5, chrome headlines 3–4). **Palette (web — the build tokens):** the 6 named tokens in `docs/design.md` §4 (`grout-black`, `steam-white`, `smoke-slate`, `chrome-mist`, `marble-amber`, `lather-white`), with the register-switching rule: each section uses only its register's 2–3 tokens; `marble-amber` is the sole CTA accent.
- **Type styling:** heavy stacked layer effects (outer glow + drop shadow + bevel/emboss + stroke) — on the web, evoke with `text-shadow`/gradients only where it serves parody; don't fake Photoshop effects everywhere.
- Full type spec (exact fonts/sizes/colors per text element) lives in `promo.txt`.

## Source-of-truth files

- `promo.txt` — full campaign writeup, process breakdown, and type-styling spec (was the Behance portfolio text).
- `gotsoapdescription.txt` — shorter campaign description, per-poster copy.
- **The posters themselves carry the final evolved copy** — where the docs and the images disagree, the images win.
- `docs/HANDOFF.md` — **handoff entry point**: reading order, decision log, reconciliations.
- `docs/prd/PRD-gotsoap-web-v1.md` — **the build spec.** Read before any web work.
- `docs/design.md` (v2.1) — visual design system: the **two-author system** (campaign registers vs. CWAAA nonprofit identity), 9 tokens, 5 type roles, per-surface specs for every route, steam-clear hero (auto-clears — the drag-to-wipe was retired by owner 2026-07-08), anti-template spot staging, dual-address copy rule, CWAAA identity kit. Aligned with the PRD by construction. (`docs/design-v1-sonnet.md` is an archived superseded draft — never build from it.)
- `docs/hero-image-brief.md` — the owner's Photoshop brief for the widescreen hero edition (text-free re-staging of poster 1's world).
- `docs/strategy/participation-mechanics.md` — mechanic specs + v1/v2/v3 phasing.
- `docs/research/got-milk-campaign-analysis.md` — strategy rationale (approved by owner).

## Confirmed build decisions

- **Hosting:** Netlify, `gotsoap.netlify.app` (site currently empty). Brand reveal is same-site (`/about`).
- **Stack:** Astro static output + vanilla TS islands, built in `site/` (see PRD §6).
- **Fonts:** free substitutes only — candidates in PRD §7, final picks in DESIGN.md.
- **Email capture:** real — Netlify Forms behind the Lather Pledge in v1.
- **v1 mechanics:** Sniff Test quiz, Lather Pledge, poster downloads, scratch-n-sniff gag, static crisis stats.
- **Hero (owner, 2026-07-08):** steam that clears ITSELF (~2s squeegee sweep) over the owner's widescreen text-free hero image — the interactive drag-to-wipe is retired; do not rebuild it. Verdict pages show no numeric score. The Claude Design prototype (`got-soap-campaign-site/`) is reference-only — harvest copy lines + the CWAAA seal/ribbon SVGs, never port its DOM/CSS (see `docs/HANDOFF.md`).
- **Campaign copy:** produced by the owner's parallel content/copywriter session as a copy deck; implementers consume it via the single content module and don't invent campaign copy.
- **Analytics:** GoatCounter (v1). **Newsletter:** Buttondown (when pledge volume demands). **Behance:** https://www.behance.net/gallery/229005199/Got-Soap. Instagram/Facebook don't exist yet — all external links live in one site-config module, rendered only when non-empty. All absolute URLs derive from one `SITE_URL` constant (netlify.app now, custom domain later).
- **Web build gets its own git repo rooted at `GotSoap/`** with a `.gitignore` excluding all design binaries (PRD §6.5).

## Asset warnings

- **`.abr` brush files are huge binaries** (up to ~1.7 GB, `Resource Boy - Smoke Brushes.abr`). Never read, parse, move, or `git add` them.
- `.psd` files are the editable comps (`currentstep.psd` is the working doc). Only relevant when new exports/crops are needed.
- Texture-pack folders (`Seamless Textures`, `Grunge_Light Texture Pack`, etc.) are Photoshop resources, not web assets.
- Freepik/macrovector assets require attribution ("Designed by macrovector_official / Freepik") and cannot be redistributed as archives — check folder-level `License.txt` files before shipping any texture to the web.
- Poster JPGs are 0.7–1.1 MB — generate optimized web derivatives (WebP/AVIF, responsive sizes) rather than serving originals.

## Repository / git caution

The git repository appears to be rooted at the user's home directory (`git status` shows paths like `../../../../.cache`), **not** at this folder. Run `git rev-parse --show-toplevel` before any staging; never `git add -A` from here. When the web build starts, consider initializing a dedicated repo for the site (excluding the multi-GB design sources via `.gitignore`).

## Project structure

```
GotSoap/
├── CLAUDE.md
├── .claude/            # Claude Code project config, skills, commands
├── docs/
│   ├── research/       # campaign research (Got Milk? analysis, references)
│   ├── strategy/       # brand & campaign strategy notes
│   └── prd/            # product requirements for the web campaign
├── site/               # web campaign build (to be scaffolded per PRD)
└── (design sources + posters remain in the root — do not reorganize;
     OneDrive sync + multi-GB binaries make moves risky)
```
