# [ARCHIVED — superseded by docs/design.md v2]

> This is the original design plan drafted by Sonnet (medium effort), archived 2026-07-08.
> It was superseded by a research-grounded remake (see `docs/design.md`). Ideas that survived
> into v2 on merit: the fogged-mirror hero concept (from promo.txt line 74), the
> register-switching palette principle, and the "SPOT NO." framing. Known errors: Phenix
> American is not on Adobe Fonts; the layout conflated the home page with the whole site.

---

# Got Soap? — Web Campaign Design Plan

Companion to `docs/research/got-milk-campaign-analysis.md`. That doc covers strategy (why Got Milk? worked, the Liquid Death/CAH playbook, site architecture). This doc is the **visual design plan**: the token system, layout concept, and signature element for the site itself.

---

## 1. The brief, pinned down

**Subject:** a fictional hygiene-PSA movement, built with fragrance-ad seriousness, that is secretly a portfolio piece.
**Audience:** (a) Gen Z/millennial scrollers who find it via social and share it because it's funny, and (b) creative directors at brands like Liquid Death/Cards Against Humanity evaluating whether Hope2 Studio can execute their kind of work.
**The page's one job:** make the bit feel like a real, committed ad campaign first — the portfolio reveal is the punchline you find on page 3, not the headline on page 1.

That means the design has to resist looking like a designer's showcase (grid of images, "here's my process") until the visitor has already been sold the joke as if it were real.

---

## 2. Grounding: what the source material already gives us

The posters already established a visual system — I'm not inventing one from scratch, I'm extending it correctly:

- **Three distinct visual registers already exist across the five posters:** bright white porcelain tile + steam (1–2), dark smoke + chrome type (3–4), warm amber marble + gold type (5). A flat, single-background site would flatten work that's already doing something more interesting.
- **`promo.txt` line 74 — a road not taken:** Stacey considered giving the headline "a frosted over look like you might see on a fogged up shower door" and dropped it from the posters for legibility reasons. That unused idea is exactly the kind of subject-specific material the signature element should come from — steam and fogged glass are the literal physical mechanism of "getting clean," and it's already latent in this project's own history rather than borrowed from nowhere.
- **The type spec in `promo.txt`** is prescriptive (Phenix American, Futura PT, Franklin Gothic ATF Heavy, Montserrat) — the job here is to honor it on the web, not replace it with a generic display/body pairing.

---

## 3. Comparable sites — what to take, what to leave

| Site | Take | Leave |
|---|---|---|
| **Liquid Death** | Commit to the bit 100%, no winking. Copy-as-entertainment before copy-as-selling. Merch/community layer (email capture disguised as joining a bit). | Product-carousel commerce layout — we have no SKUs to sell. |
| **Cards Against Humanity** | Self-aware microcopy in utility moments (FAQ, forms) — the joke runs through *every* UI string, not just headlines. Stunt-as-content. | Pure e-commerce chrome; their homepage is a storefront, ours is a PSA. |
| **Got Milk? (1993–2014)** | A rigid, ownable template repeated across "spots" — see `got-milk-campaign-analysis.md` Part 1. Prestige-craft photography selling an absurd premise straight-faced. | N/A — this one's already fully mapped in the research doc. |

None of these are templates to copy wholesale. The throughline for Got Soap? specifically: **fragrance-ad/PSA seriousness rendered through a literal bathroom material system (tile, steam, chrome, marble)** — that's not what any of the three references do, and it's what makes this site unmistakably about *this* subject.

---

## 4. Token system

### Color — 6 named hex values, mapped to the posters' three registers

| Token | Hex | Role |
|---|---|---|
| `grout-black` | `#0E0E10` | Primary structural background/ink — the "grout line" that ties sections together |
| `steam-white` | `#ECEAE4` | Porcelain-register section background (echoes posters 1–2) — warm off-white, not cream; reads as tile, not as a coffee-table serif backdrop |
| `smoke-slate` | `#201F22` | Chrome-register section background (echoes posters 3–4) |
| `chrome-mist` | `#9A9AA2` | Mid-neutral for dividers, secondary text, chrome-effect type (maps to CLAUDE.md's `#707078`/`#999999`) |
| `marble-amber` | `#B8862E` | Warm gold accent (echoes poster 5) — the one color used for interactive/CTA emphasis across the whole site, so it stays special |
| `lather-white` | `#FFFFFF` | Pure white — foam/bubble accents, max-contrast type on dark registers |

No section of the site uses all six at once. Each "spot" section borrows only the 2–3 tokens that match its poster's register. The palette's job is continuity across registers, not uniformity within them.

### Type — matches `promo.txt`'s spec, decided (not silently substituted)

| Role | Face | Source decision |
|---|---|---|
| Display (live "got soap?" instances, spot titles, pledge headline) | **Phenix Std / Phenix American** | License via **Adobe Fonts** — bundled free with the Creative Cloud subscription already in use for the `.psd` sources. This is the one face that must not be substituted: it's the direct Got Milk? signal (see research doc, Part 1). |
| Body / CTA lines | **Futura PT** | Adobe Fonts (confirmed available, per CLAUDE.md) |
| Movement line + hashtag stack + spot labels | **Franklin Gothic Heavy / Franklin Gothic Condensed** (closest Adobe Fonts match to Franklin Gothic ATF Heavy) | Adobe Fonts. If the exact ATF cut isn't licensable for web, this is the documented, deliberate substitution — not silent. |
| Fine print, quiz UI, form labels | **Montserrat** | Google Fonts (free, already specified in CLAUDE.md) |

Web type styling evokes the posters' heavy Photoshop layer effects (glow/bevel/stroke) **only on the signature hero moment and spot titles** — everywhere else, flat color and weight carry the hierarchy. Faking bevel-and-emboss in every heading would read as a Photoshop filter demo, not a website.

### Layout concept

The page is structured as **a walk down a locker-room wall**, not a scroll through a portfolio deck:

1. **Hero — the fogged mirror** (signature element, see §5)
2. **The five spots** — full-bleed, alternating background register per poster's mood, posters presented untouched per the non-negotiable rule
3. **The Sniff Test** — a self-assessment quiz card, styled like a clipboard PSA insert
4. **The Movement** — the fictional sponsor's manifesto, styled as dry nonprofit letterhead in deliberate tonal contrast to the thirst-trap sections around it
5. **The Reveal** — the fourth-wall break; Hope2 Studio case-study pitch and contact
6. **Footer** — legal parody line, hashtags, copyright (already dictated by CLAUDE.md)

### Signature: the fogged mirror hero

A full-viewport hero rendered as a steamed-up tile/mirror surface. Poster 1's cowboy and the "got soap?" headline sit beneath the fog, indistinct. The visitor **wipes the condensation away** (drag on desktop, touch-drag on mobile) to reveal them — literally performing the campaign's ask (get clean, see clearly) as the first interaction on the site.

```
┌────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← fogged glass texture,
│▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    faint headline ghosting
│▓▓▓▓▓▓▓▓░░  g o t   s o a p ?  ░░▓▓▓▓▓▓│    through as user wipes
│▓▓▓▓▓▓░░░ (cowboy silhouette) ░░░▓▓▓▓▓▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│         ↓ wipe to see clearly ↓         │  ← small Montserrat prompt
└────────────────────────────────────────┘
```

Accessibility/restraint guardrails on this one bold moment:
- `prefers-reduced-motion`: fog clears via a slow ambient 4s fade instead of requiring drag input — never gated behind motion.
- Keyboard/tap fallback: a visible "reveal" control (not mouse-only) clears the fog fully.
- The effect appears **once**, in the hero only. Every section below it is flat, disciplined, and static except ordinary scroll-reveals — spending the one bold accessory here, per the restraint principle.

### Spot section wireframe (repeats 5x, register alternates by poster)

```
┌────────────────────────────────────────┐
│  SPOT NO. 3                             │  ← Franklin Gothic label —
│  "UNHOLY"                               │    ad-reel/trafficking
│  ┌──────────────┐                       │    convention (real agencies
│  │              │   He washes. Daily.   │    number spots), not a
│  │   [poster]   │   With soap.          │    decorative 01/02/03
│  │   untouched  │                       │
│  │              │   UNCOMMON. UNHOLY.   │
│  └──────────────┘   Unreasonably hot.   │
│                                          │
│              [ Share this spot ↓ ]      │
└────────────────────────────────────────┘
```

---

## 5. Self-critique — what I revised and why

- **First instinct was a single dominant palette (all-dark, one gold accent)** — the generic "near-black + one bright accent" default. Revised to register-switching backgrounds per section, because the posters themselves already prove three moods exist; flattening them would be *less* faithful to the source art, and it sidesteps the default rather than landing in it by accident.
- **First instinct for the poster gallery used 01/02/03 markers** — the numbered-marker default the skill flags. Kept numbering, but re-grounded it as ad-agency spot/reel numbering (a real industry convention being parodied), and named it as such in the label copy ("SPOT NO. 3") rather than a bare digit — makes the numbering mean something rather than decorate.
- **Considered making the fogged-mirror effect recur on every section transition** (fog-wipe between each poster). Cut it down to the hero only — recurring "cute" transitions read as templated motion for its own sake; one orchestrated moment lands harder than five diluted ones.
- **Considered a serif display face for the manifesto/movement section** to signal "official document" gravity. Rejected — introducing a fourth type family (beyond the four already specified) contradicts the brief's own prescriptive type spec; the nonprofit-letterhead gag is better carried by Montserrat set small, dry, and dense than by a new face.

---

## 6. Open items for the PRD (unchanged from research doc, restated for the build)

1. Adobe Fonts vs. a documented Franklin Gothic substitution — pending confirmation the CC subscription's web-font entitlement covers commercial site use (not just the desktop app).
2. Whether the fogged-mirror hero is built in CSS (`backdrop-filter` + canvas noise + pointer-tracked mask) or a lightweight WebGL shader — affects load performance on mobile; recommend CSS/canvas first pass, WebGL only if the CSS version reads as flat.
3. Quiz (`Sniff Test`) result cards need their own mini design pass (shareable image export) once copy is finalized — flagged, not scoped here.
