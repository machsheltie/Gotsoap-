# Got Soap? Web Campaign — Implementation Handoff

**For:** the implementing agents (Opus/Sonnet) · **From:** Stacey M. Breckel (Hope2 Studio)
**Status:** All planning docs complete and reconciled. Ready to build v1.

---

## Reading order (do this first, in this order)

1. **`CLAUDE.md`** (repo root) — non-negotiable creative rules. Binding on everything.
2. **`docs/prd/PRD-gotsoap-web-v1.md`** — the build spec: routes, page requirements, stack,
   acceptance criteria. Where any doc disagrees with the PRD, the PRD wins (except CLAUDE.md §
   creative rules, which outrank everything).
3. **`docs/design.md`** (v2.1, research-grounded) — the visual system: the two-author design
   system (campaign registers vs. CWAAA nonprofit identity), 9 color tokens, 5 type roles,
   per-surface specs for every route, the steam-clear hero (auto-clears; the drag-to-wipe is
   retired), anti-template spot staging, the dual-address copy rule, CWAAA identity kit
   (seal, Form CW-1 pledge, ribbon program). The v1 draft is archived at
   `docs/design-v1-sonnet.md` — do not build from it.
4. **`docs/strategy/participation-mechanics.md`** — full specs for the Sniff Test quiz,
   Lather Pledge, downloads, gag, crisis stats (including draft copy).
5. **`docs/research/got-milk-campaign-analysis.md`** — strategy background. Skim; it explains
   *why*, not *what*.

## The one-paragraph brief

Build a static Astro site at `gotsoap.netlify.app` that presents a fictional hygiene-PSA
movement with total deadpan commitment — five untouchable satirical posters as the
centerpiece, a shareable quiz as the viral loop, a real email-capture pledge as the
conversion loop, and a single fourth-wall-break page (`/about`) that pitches Hope2 Studio to
creative directors. The audience arrives from social; the client the site is really for is
the next Liquid Death.

## Decisions already made — do not relitigate

| Decision | Value | Where |
|---|---|---|
| Stack | Astro static + vanilla TS islands, plain CSS custom properties | PRD §6.1 |
| Hosting | Netlify (`gotsoap.netlify.app`), Netlify Forms for pledge | PRD §2, §5.4 |
| Fonts | Free, self-hosted: **Oswald (locked** — SemiBold logotype, lowercase always**)** / Jost / Libre Franklin / Montserrat + PT Serif quarantined to CWAAA surfaces | PRD §7 |
| Palette | design.md's 6 tokens + register-switching rule | design.md §4, PRD §10 |
| Home page | design.md's "walk": steam-clear hero → 5 individually-staged spots → quiz insert → movement block → pledge band → reveal beat | PRD §5.1 |
| Routes | 8 routes incl. per-poster and per-verdict pages (OG sharing is why) | PRD §4 |
| v1 mechanics | Sniff Test, Lather Pledge, poster downloads, scratch-n-sniff gag, static stats | mechanics doc |
| Repo | Fresh git repo rooted at `GotSoap/`, `.gitignore` excludes all design binaries | PRD §6.5 |
| Analytics | GoatCounter, ships in v1 (owner creates account) | PRD §6.5, §12 |
| Newsletter | Buttondown when pledge volume outgrows Netlify Forms | PRD §5.4, §12 |
| Behance | `https://www.behance.net/gallery/229005199/Got-Soap` on /about + footer | PRD §5.6 |
| Instagram/Facebook | Don't exist yet — empty entries in the site-config module, rendered only when non-empty | PRD §5.6, §13 |
| Domain | `gotsoap.netlify.app` at launch; custom domain later — all absolute URLs from one `SITE_URL` constant | PRD §12 |
| CWAAA sub-brand | Two-author design system: campaign registers vs. CWAAA nonprofit identity (manila/ink/stamp tokens, quarantined PT Serif, seal, Form CW-1 pledge, /crisis site-within-a-site) — voices collide only at designed seams | design.md §4–§7, PRD §5.5 |
| Hero interaction | **Steam clears itself** (~2s directional sweep, live type resolving) — the drag-to-wipe is retired (owner, 2026-07-08); do not rebuild it | design.md §8, PRD §5.1 |
| Hero art | Owner-built **widescreen, text-free** re-staging of poster 1's world; spec in `docs/hero-image-brief.md`; token placeholder until it lands — never a cover-cropped canonical poster | design.md §8, PRD §8 |
| Verdict score | **No numeric score** on verdict pages (static shareable URLs can't know it; the names are the joke) | design.md §7, PRD §5.3 |
| Spot sections | Individually staged per register (anti-template rule) — tile+steam / smoke+chrome-gradient type / marble+gold editorial; poster anatomy echoed in live type; corner-tag mark on imagery | design.md §7 |
| Copy voice | Dual-address rule (PSA voice AT him, share layer TO her, CWAAA FOR women) + binding in-fiction utility naming | design.md §4 |
| Copy deck | Produced by the owner's parallel content/marketing/copywriter session (2026-07-08); implementers consume it via the single content module — don't write campaign copy ad hoc | design.md §4, PRD §13 |
| Claude Design prototype | **Reference-only — do not port** (see "Prototype disposition" below) | this doc |

## Prototype disposition (2026-07-08 adversarial review — owner-ratified)

`got-soap-campaign-site/` is a Claude Design (claude.ai/design) first-draft prototype. The
owner's verdict after review: it validated the IA and exposed thirteen defects cheaply, but
its visual execution is the generic AI landing-page default the campaign must not resemble.
**It is retired as code. Build fresh in `site/` from the docs. Do not port its DOM/CSS.**

Worth harvesting from it (and nothing else):
- The CWAAA **seal + washcloth-ribbon SVGs** (`<defs>` in the prototype HTML — design.md §6
  assigns these to the implementer; the prototype's are a solid first pass).
- Crisis-page copy lines: "A body spray is a citrus arrangement on a condemned building" ·
  the press-room headlines ("The Gym Does Not Count", "Loofah Amnesty Weekend") ·
  "Methodology available upon written request. Please do not request it."
- Pledge microcopy: "Filed in triplicate. One copy goes to the loofah." · "CWAAA keeps
  records, not secrets."
- The verdict→register mapping and the poster **alt-text drafts** (good starting points —
  final strings go through the copy deck).

Known prototype defects the build must NOT inherit: Google Fonts CDN (PRD §7 requires
self-hosted WOFF2) · display face exposed as an "open" prop though Oswald is LOCKED ·
cover-cropped canonical poster in the hero · numeric score on verdict pages · one spot layout
×5 · timid type (no chrome gradients/glow where §5 permits them) · amber-on-porcelain
AA contrast failures · plain `mailto:` (must be obfuscated) · downloads serving derivatives
(must serve originals) · no mobile disclosure menu · reduced-motion as a prop instead of the
media query · missing lightbox on poster detail · missing corner-tag mark.

## Design doc history (context, not action items)

The original design.md (Sonnet draft) proposed Adobe Fonts sourcing that didn't verify
(Phenix American is Monotype/MyFonts, not on Adobe Fonts) and under-specified several
surfaces. It was remade as **v2** after research into the milk-mustache print anatomy, Old
Spice's "The Man Your Man Could Smell Like," Dr. Squatch, Liquid Death, DHMO.org, and MADD.
v2 aligns with the PRD by construction — no reconciliations remain. The old draft is archived
at `docs/design-v1-sonnet.md` for reference only.

## Known gaps — ask, don't invent

- Design specs are complete for all routes (design.md §7) and **fully owner-approved**:
  Form CW-1 pledge treatment ✓, Oswald as the locked display face ✓. No open design
  decisions remain.
- Owner-designed art (PRD §8): verdict cards, pledge badge, poster-5 `aa` crop, favicon/mark,
  hero art pass. **Build with token-based placeholders; never block on art.** The CWAAA seal
  and washcloth ribbon are implementer-built SVGs per design.md §6 — not owner assets.

## Owner's outstanding to-dos (build proceeds without them)

- Asset batch (PRD §8): 4 verdict cards ×2 sizes, pledge badge, poster-5 `aa` crop, favicon/mark, hero art direction pass, quiz copy punch-up.
- Accounts: create the GoatCounter account (site code `gotsoap`); later, Instagram + Facebook
  URLs when the profiles exist (one-line site-config change each).
- All PRD §12 decisions are resolved — nothing blocks the build.

## Hard warnings (repeated because they're expensive to get wrong)

- **Never modify, re-typeset, or crop the text out of the five posters.** They ship as-is.
- **Never `git add` from the existing home-directory repo context.** Init fresh at `GotSoap/`.
- **Never commit `.abr`/`.psd`/`.eps`/texture folders** — files up to 1.7 GB live in this directory.
- Copy drafts in the docs are drafts — keep all copy strings in one content module for a
  pre-launch sweep by the owner.
