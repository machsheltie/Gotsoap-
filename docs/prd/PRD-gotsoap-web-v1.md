# PRD — Got Soap? Campaign Website v1

**Status:** Ready for implementation handoff
**Owner:** Stacey M. Breckel (Hope2 Studio)
**Companion docs:** `docs/HANDOFF.md` (handoff entry point + reading order) ·
`docs/strategy/participation-mechanics.md` (mechanics specs) ·
`docs/research/got-milk-campaign-analysis.md` (strategy rationale) ·
`docs/design.md` (visual design system — landed; reconciled in §7/§10) ·
`CLAUDE.md` (non-negotiable creative rules — binding on all implementers)

---

## 1. Overview

Build the campaign website for **Got Soap?**, a satirical hygiene-PSA campaign parodying the
90s "Got Milk?" campaign. The site presents as the official web presence of a fictional
movement — deadpan, committed, no winking — with a findable fourth-wall-break page that
converts attention into business for **Hope2 Studio** (Stacey M. Breckel: satirical creative
director, graphic designer, content creator).

**The site is the campaign; the campaign is the portfolio piece.** Target clients:
irreverent brands in the Liquid Death / Cards Against Humanity orbit.

### Goals (in priority order)
1. Make both women and men laugh and **share** (verdict cards, poster links, pledge badges).
2. Capture emails via the Lather Pledge (the durable audience asset).
3. Route impressed visitors — especially creative directors and brand people — to the
   Hope2 Studio reveal page and `hope2studio@yahoo.com`.

### Success signals (first 90 days, directional not contractual)
- Verdict-card share actions and pledge submissions trending up week-over-week.
- ≥ a handful of inbound inquiries or portfolio-site referrals traceable to the site.
- Zero tone failures (no press/social blowback misreading the satire as sincere shaming).

### Non-goals (v1)
- No CMS, no user accounts, no server-side backend, no e-commerce, no social wall,
  no user-generated content stored or displayed.

---

## 2. Confirmed decisions (from project owner)

| Decision | Answer |
|---|---|
| Hosting | **Netlify**, site exists at `gotsoap.netlify.app` (currently empty — no index.html). Brand reveal is same-site. |
| Fonts | **Closest free substitutes** (see §7). No commercial font licenses. |
| Email capture | **Yes, real** — behind the Lather Pledge. Netlify Forms in v1. |
| Interactivity | Required (quiz, verdict cards) — static site with client-side JS islands. |
| Participation mechanics phasing | Per `participation-mechanics.md`: v1 = Sniff Test, Lather Pledge, poster downloads, scratch-n-sniff gag, static crisis stats. |

---

## 3. Binding creative rules (from CLAUDE.md — repeat here for implementers)

1. **Never remove, crop out, or re-typeset the text baked into the five posters.**
   The posters are shown as-is. They ARE the artwork.
2. The movement fiction is played straight everywhere except the reveal page.
   No "this is satire!" banners; the footer parody/credit line does that job.
3. Voice invariants: subheads open with **"Because…"**; CTAs open with **"Join the movement."**;
   hashtags `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`; sponsor gag
   **"Funded by Concerned Women Against Axe Abuse"**; © Stacey Breckel 2025.
4. Satire punches at low-effort masculinity culture and ad tropes — **behavior, never identity**.
   Inclusive casting direction continues in any new imagery.
5. All new written copy must read like the existing poster copy (thirst-trap + PSA sincerity +
   fragrance-ad drama). When docs and posters disagree, **the posters win**.

---

## 4. Information architecture

```
/                     Home — "The Movement"
/psas                 The PSAs — poster gallery (campaign centerpiece)
/psas/<slug>          Per-poster page (5 pages)
/sniff-test           The Sniff Test — quiz
/sniff-test/<verdict> Verdict pages (4 static pages, shareable)
/pledge               The Lather Pledge — email capture
/crisis               The Crisis — fictional-org page (movement fiction)
/about                The Reveal — Hope2 Studio / case study / contact
/404                  In-voice ("This page didn't shower. It's gone.")
```

Global nav: The Movement · The PSAs · The Sniff Test · Take the Pledge · The Crisis
(About/reveal lives in the footer + a quiet nav item — findable, subordinate).

Global footer (every page): hashtag stack · "Funded by Concerned Women Against Axe Abuse" ·
"© Stacey Breckel 2025 · A satirical spec campaign by Hope2 Studio →" (links to /about) ·
parody disclaimer line (short, legal-ish, itself deadpan).

---

## 5. Page-by-page requirements

### 5.1 Home — `/`
Home implements `docs/design.md` §4's layout concept — "a walk down a locker-room wall" —
with sections alternating background registers per the token rules (2–3 tokens per section):
1. **Hero — the steam-clear** (design.md §8, signature element; **revised by owner
   2026-07-08 — supersedes the interactive wipe**): full-viewport steam over the owner's
   widescreen, text-free hero image (spec: `docs/hero-image-brief.md`); the steam clears
   itself in ~2s with a directional sweep, live "got soap?" type resolving as it clears.
   No visitor interaction required. Guardrails binding: `prefers-reduced-motion` gets a
   crossfade (or no steam), plays once per load, scroll completes it instantly, the effect
   appears once (hero only). Must still meet the §6.2 LCP budget. Until the owner's hero
   art lands: token placeholder — never a cover-cropped canonical poster (responsive crops
   slice baked type).
2. **The five spots:** full-bleed sections per design.md's spot wireframe ("SPOT NO. n" +
   angle name in Franklin-role face), register alternating by poster mood, posters untouched.
   Each spot links to its `/psas/<slug>` page for share/download.
3. **Sniff Test insert:** quiz teaser card styled as a clipboard PSA insert → /sniff-test.
4. **The Movement:** manifesto block (sermon-cadence assembly from `promo.txt` fragments) +
   crisis stats strip, styled as dry nonprofit letterhead (deliberate tonal contrast) → /crisis.
5. **Pledge CTA band:** one line + button → /pledge.
6. **The Reveal beat:** short fourth-wall-break section at the walk's end (the "punchline on
   page 3") → /about for the full case study. Kept visually subordinate.
7. Scratch-n-sniff gag: small dismissible first-visit element (mechanics doc §4). Never a blocking modal.

### 5.2 The PSAs — `/psas` and `/psas/<slug>`
- Gallery of the five canonical posters, **full-bleed, untouched**, presented like an official
  PSA archive ("Public Service Announcements, Series One").
- Slugs: `confident-man`, `soap-smoldering`, `unholy`, `redemption`, `thirst-announcement`.
- Per-poster page: the poster (large, zoomable/lightbox), its angle name, 1-para deadpan
  "case notes" (adapt from gotsoapdescription.txt), share buttons (Web Share API + copy link),
  **download button** (mechanics doc §3) with the cheeky permission notice, prev/next.
- Each poster page has distinct OG meta: the poster itself is the OG image.
- Framed as ongoing: "Series One" implies more coming (v2 poster drops).

### 5.3 The Sniff Test — `/sniff-test` and `/sniff-test/<verdict>`
Full spec in participation-mechanics.md §1. Implementation requirements:
- 7 questions, one at a time, progress indicator styled "QUESTION n OF 7 — FIELD ASSESSMENT
  CW-7" (the quiz is CWAAA-administered in-fiction; design.md §7), keyboard accessible, no
  page reloads (single JS island). Score 0–21 → 4 verdicts.
- On completion, client-side redirect to the matching static verdict page:
  `/sniff-test/soap-smoldering | suds-curious | axe-dependent | thirst-hazard`.
- Verdict pages are static & crawlable, each with its own OG image (the verdict card art)
  so shared links preview correctly. Buttons: share (Web Share API), copy link,
  download card image, retake, → pledge CTA ("Certified or not — take the pledge").
- **No numeric score on verdict pages** (owner, 2026-07-08): static shareable pages can't
  know a visitor's score, and the verdict names are the joke. Scoring stays internal; any
  completion feedback is transient client-side, in-fiction (design.md §7).
- Verdict card art: **4 cards × 2 sizes (1200×630 OG + 1080×1350 social)** — designed by
  Stacey in Photoshop (asset dependency, §8). Build must not block on final art: ship with
  placeholder cards using DESIGN.md tokens, swap when art lands.

### 5.4 The Lather Pledge — `/pledge`
Full spec in participation-mechanics.md §2. Implementation requirements:
- Pledge copy (draft in mechanics doc), fields: first name, email, satire-acknowledgment checkbox.
- **Netlify Forms:** form present in prerendered HTML with `data-netlify="true"`,
  `name="lather-pledge"`, honeypot field (`netlify-honeypot`), hidden `form-name` input if
  submitted via JS. Success state on-page (no redirect to Netlify's default success page).
- Visual treatment (design.md §7, pending owner sign-off): the page IS CWAAA's **"Form CW-1 —
  Declaration of Intent to Lather"** — manila document panel, seal header, PT Serif oath,
  submit labeled "File my declaration." Success: red **SWORN** stamp (single scale-settle
  micro-animation) + washcloth-ribbon badge + share/copy buttons + "Movement Updates" note.
- Free-tier limit is ~100 submissions/month — acceptable at launch; the confirmed upgrade
  path is **Buttondown** (owner decision) when volume demands.
- Privacy microcopy (in voice, but real): what the email is used for, no third parties.

### 5.5 The Crisis — `/crisis` (expanded: CWAAA's site-within-a-site)
Full CWAAA authorship per the two-author system (`docs/design.md` §4–§7). The org is fleshed
out as if real — the MADD-template advocacy nonprofit that "funds" the campaign:
- **Letterhead header** with the CWAAA seal (soap bar + barred aerosol can; implementer-built SVG).
- **Founding myth** — draft: "Founded in 2024 by women who had smelled enough." (2–3 paragraphs,
  procedural-earnest voice — CWAAA *files*, it never flirts; Stacey punches up.)
- **"The State of Male Hygiene"** — DHMO-style true-but-reframed facts set as an annual-report
  table (PT Serif, ruled rows; no charts). Draft facts in design.md §6.
- **Chapters/scale claims** — "Two million concerned women. Chapters in all 50 states. One demand."
- **"Tie One On For Suds"** ribbon-program block (washcloth ribbon; doubles as pledge funnel).
- **Press-release archive** — 2–3 deadpan headlines.
- **Fine-print satire signals** (the DHMO trick), incl. the not-affiliated disclaimer gag.
- Exits in CWAAA voice: "Schedule a field assessment" (→ /sniff-test) · "File Form CW-1" (→ /pledge).

### 5.6 The Reveal — `/about`
The only fourth-wall break, and the business goal:
- The campaign story: what Got Soap? is, the Got Milk? homage, why it exists (adapt closing
  notes of promo.txt).
- **Case study:** process material from promo.txt — concept, art direction, the type-styling
  spec, compositing/readability solutions, AI-generation-plus-hand-execution transparency
  (models generated with openart.ai; all direction, compositing, typography by hand).
- Who: Stacey M. Breckel / Hope2 Studio — satirical creative director, graphic designer,
  content creator. The pitch: "Want a campaign like this? Let's make clean design dirty fun."
- Contact: `hope2studio@yahoo.com` (obfuscate from scrapers).
- External links: **Behance (live now): `https://www.behance.net/gallery/229005199/Got-Soap`**.
  Instagram and Facebook accounts don't exist yet — implement all external/social links as
  entries in the single site-config module (§13); footer and /about render only non-empty
  entries. No dead icons, no "coming soon" labels — absent means invisible.
- Credit/legal: parody disclaimer, Freepik attribution ("Designed by macrovector_official /
  Freepik") if any Freepik-derived texture ships in web assets (§8).

---

## 6. Technical requirements

### 6.1 Stack (recommendation + rationale)
- **Astro** (latest), static output — component model, per-page OG meta, built-in image
  optimization, zero client JS by default; islands only for the quiz and share buttons.
  Vanilla TypeScript for islands — **no React/Vue needed at this scope**.
- Styling: plain CSS with custom properties (design tokens from DESIGN.md). Tailwind is
  acceptable if DESIGN.md's system maps to it cleanly — implementer's choice, don't mix both.
- Acceptable alternative if Astro is rejected: Vite + vanilla TS multi-page. Do **not** use
  Next.js/SSR — nothing here needs a server.
- Node LTS; `site/` is the app root (repo caution: §6.5).

### 6.2 Performance budget
- Lighthouse ≥ 90 all categories on mobile for /, /psas, /sniff-test.
- Posters served as optimized derivatives (AVIF/WebP + JPG fallback, responsive `srcset`,
  lazy-loaded below the fold) — **never the raw 0.7–1.1 MB originals** except the
  download links, which serve the full-quality originals deliberately.
- LCP < 2.5s on 4G for the home hero; hero image prioritized/preloaded.

### 6.3 SEO / sharing
- Per-page titles/descriptions in voice but informative; OpenGraph + Twitter cards everywhere;
  poster pages use the poster as OG image; verdict pages use verdict cards.
- `sitemap.xml`, `robots.txt`. Meta description formula can lean on the "Because…" device.
- JSON-LD: `CreativeWork` on poster pages, `Person`/`Organization` on /about.

### 6.4 Accessibility (non-negotiable — it's also part of the craft pitch)
- WCAG 2.1 AA. Quiz fully keyboard-navigable with visible focus; progress announced via
  `aria-live`. Form fields labeled; errors in text not just color.
- **Poster alt text carries the joke** — every poster gets real descriptive alt text written
  in campaign voice (drafts from the poster copy; content task in §8). No `alt=""` on posters.
- Scratch-n-sniff gag and any motion respect `prefers-reduced-motion`.

### 6.5 Repo / deploy
- **Initialize a fresh git repo rooted at `GotSoap/`** (the current git context is rooted at
  the user's home directory — do not use it). `.gitignore` must exclude: `*.abr`, `*.psd`,
  `*.eps`, texture-pack folders, raw root-level JPGs (web derivatives live under `site/`),
  `node_modules`, build output. Nothing over ~5 MB gets committed.
- Netlify: connect repo or `netlify deploy` from CI; build command per Astro defaults;
  deploy previews on PRs if repo is on GitHub.
- Analytics: **GoatCounter — confirmed, ships in v1** (free, no-cookie, no banner needed).
  Owner creates the account (suggested site code `gotsoap`); implementer wires the script.
  Do not add Google Analytics.

---

## 7. Typography — RESOLVED (supersedes the sourcing column of `docs/design.md` §4)

Verification (July 2026): **Phenix American is a Monotype face sold via MyFonts — it is not
on Adobe Fonts**, so design.md's plan to source it there doesn't hold. Adobe Fonts web use is
included with the owner's Creative Cloud plan for her own commercial site, but forbids
self-hosting and stops serving if the subscription lapses. Since the one irreplaceable face
isn't available either way, the owner's original decision (free substitutes) stands.

**Decision — Path A, all-free, self-hosted:**

| Role (per design.md §4) | Face | Notes |
|---|---|---|
| Display — live "got soap?" instances, spot titles, pledge headline | **Oswald — LOCKED** (owner-approved) | Benton-lineage substitute (Oswald reworks Alternate Gothic; Phenix American is also Benton). SemiBold 600 for logotype instances, Bold 700 for spot titles, Medium 500 for the nav mark. Lowercase always for "got soap?" |
| Body / CTA lines | **Jost** | Strongest free Futura analog |
| Movement line, hashtag stack, spot labels | **Libre Franklin** (Black/ExtraBold) | Free Franklin Gothic revival |
| Fine print, quiz UI, form labels | **Montserrat** | As specified everywhere |
| CWAAA voice — /crisis, pledge document, seal, stamps, 404 | **PT Serif** | Quarantined to CWAAA-authored surfaces only (design.md §5): a different fictional author gets a different typographic voice |

Self-host WOFF2 (no font CDNs — GDPR + performance), `font-display: swap`, Latin subset.
Design.md's **role assignments and usage policy stand unchanged** (layer-effect styling only
on the hero moment and spot titles; flat weight/color carries hierarchy everywhere else).

**Documented alternative — Path B (owner may opt in later):** Adobe Fonts embed for true
Futura PT via the CC subscription. Costs nothing extra but adds a third-party script, can't
be self-hosted, and ties the site's type to the subscription staying active. It buys only
Futura-vs-Jost fidelity — the headline face is a substitute in both paths.

---

## 8. Content & asset inventory

### Exists (use as-is)
- 5 canonical posters + `a`/`aa` minimalist crops (root folder; see CLAUDE.md naming).
- Campaign copy raw material: `promo.txt`, `gotsoapdescription.txt`, and the poster copy itself.

### To create — Stacey (Photoshop / copy punch-up)
| Asset | Spec | Blocks |
|---|---|---|
| 4 verdict cards × 2 sizes | 1200×630 + 1080×1350, on-brand | Sniff Test share flow (placeholders OK to build) |
| Pledge badge | 1080×1080 | Pledge success state (placeholder OK) |
| Poster 5 `aa` minimalist crop | match existing `aa` set | Matched share set; v2 caption generator |
| Widescreen hero edition | text-free re-staging of poster 1's world; full spec in `docs/hero-image-brief.md` (owner in Photoshop, 2026-07-08) | Home hero (token placeholder until it lands) |
| Favicon + "got soap?" mark | SVG/PNG set | Site chrome |
| Quiz copy punch-up | mechanics doc §1 drafts | Launch copy freeze |
| Behance/social URLs | — | /about links |

### To create — implementer (writing tasks, in voice, flagged for Stacey's review)
- Manifesto assembly (home), Crisis page org fiction, per-poster "case notes" adaptation,
  poster alt text, 404 copy, privacy microcopy, meta descriptions.

### Licensing checks before ship
- Any texture used in **web** assets that came from Freepik packs requires the attribution
  line on /about. The texture-pack `License.txt` files govern; when in doubt, don't ship the
  texture — use CSS.

---

## 9. Phasing & acceptance criteria

### v1 — Launch (this PRD)
Scope: everything in §4–§8 plus mechanics doc v1 set.
**Accept when:**
1. All 8 routes live at `gotsoap.netlify.app`, responsive 360px→1440px+.
2. Sniff Test completes end-to-end; all 4 verdict URLs shareable with correct OG previews.
3. Pledge form submissions arrive in Netlify Forms dashboard; honeypot blocks naive spam;
   success state renders on-page with badge + share.
4. All 5 posters displayed untouched, downloadable, each with voice-carrying alt text.
5. Lighthouse ≥ 90 ×4 categories (mobile) on /, /psas, /sniff-test; posters served as
   optimized derivatives.
6. Voice invariants (§3.3) present globally; zero placeholder lorem anywhere.
7. Fresh repo rooted at GotSoap/ with the §6.5 .gitignore; no binary over 5 MB committed.

### v1.1 — Post-launch tightening
Analytics decision executed · newsletter tool swap if pledge volume nears Netlify Forms cap ·
copy fixes from real reactions.

### v2 — Participation deepening (separate PRD when triggered)
Caption generator · personalized verdict cards · live pledge counter · nominate-a-friend ·
poster drop #6 (see mechanics doc §6–§9).

---

## 10. Design integration status (`docs/design.md` v2 — research-grounded remake, complete)

design.md was remade (v2, July 2026) after research into the milk-mustache print anatomy,
Old Spice's TMYMCSL, Dr. Squatch, Liquid Death's site, DHMO.org, and MADD. The v1 draft is
archived at `docs/design-v1-sonnet.md`. **v2 is aligned with this PRD by construction** —
fonts follow §7 (free, self-hosted), IA follows §4 (multi-route; the walk is the home page).
No reconciliations remain.

**v2 delivers everything previously flagged as gaps:**
- **The two-author system** (design.md §4): campaign surfaces (registers, 6 tokens,
  Oswald/Jost/Libre Franklin/Montserrat) vs. CWAAA surfaces (3 manila/ink/stamp tokens,
  quarantined PT Serif). Systems collide only at designed seams (footer funded-by line,
  verdict-card stamp, pledge document, home letterhead block). A surface mixing both voices
  is a bug.
- **CWAAA identity kit** (design.md §6): seal, founding myth, washcloth-ribbon program,
  chapters claims, reframed-facts drafts, letterhead grammar, voice rules.
- **Per-surface specs** (design.md §7): nav, footer, /psas archive framing, quiz UI, verdict
  card art direction (register per verdict + CWAAA stamp), /pledge as Form CW-1, /crisis as
  CWAAA's site-within-a-site, /about, 404 missing-poster, buttons/forms/focus states.
- Signature (steam-clear hero — v2.1 owner revision; the v2 interactive wipe is retired) + motion policy + quality floor.

If anything in design.md conflicts with §3 creative rules, §3 wins.

---

## 11. Risks & guardrails

| Risk | Guardrail |
|---|---|
| Satire misread as sincere shaming | Punch at behavior/tropes, never identity; reformed-hero framing ("He washes. Daily."); reveal page states intent plainly |
| Fiction mistaken for real health org | Footer parody line on every page; /about; "Funded by Concerned Women Against Axe Abuse" is self-evidently absurd |
| Font substitution reads as cheap | DESIGN.md visual verification against posters before lock |
| Netlify Forms cap hit | §12 upgrade path; monitor dashboard |
| Committing huge binaries | §6.5 gitignore is acceptance-blocking |
| AI-model provenance questions | /about discloses openart.ai generation + hand execution — already the owner's practice |

## 12. Open items

**Resolved (owner, July 2026):**
1. Analytics: **GoatCounter** ships in v1. Owner creates the account; see §6.5.
2. Newsletter: **Buttondown** is the confirmed destination for "Movement Updates" once pledge
   volume outgrows Netlify Forms.
3. Behance: `https://www.behance.net/gallery/229005199/Got-Soap` — link from /about and footer.
   Instagram/Facebook: accounts not yet created — config-driven placeholders per §5.6; render
   nothing until URLs exist.
4. Domain: **launch on `gotsoap.netlify.app`**; custom domain comes later. Build all absolute
   URLs (OG tags, sitemap, share links) from a single `SITE_URL` constant so the future domain
   swap is a one-line change + redeploy.

**Resolved (owner, July 2026, continued):**
5. /pledge treatment: **Form CW-1 approved** as specced in design.md §7 (CWAAA document,
   SWORN-stamp success state).
6. Display face: **Oswald approved** (Benton lineage, weight range, lowercase quality — see
   §7 for locked weights).

**No open decisions remain.**

---

## 13. Implementation notes for AI agents (Opus/Sonnet handoff)

- Read `CLAUDE.md` first; §3 rules are binding. Then this PRD, then
  `participation-mechanics.md` for mechanic specs, then `docs/design.md` for all visual
  decisions (as reconciled by §7/§10 — the PRD wins on font sourcing and IA).
- Build in `site/` only. Never touch, move, or commit root-level design sources.
- The five poster JPGs are the only root files you may copy (into `site/src/assets/` for
  derivative generation). Copy — never modify originals.
- Draft copy in these docs is **draft**: build with it, but tag every copy string in a way
  that's easy to sweep before launch (single content module / content collection, not
  strings scattered through components).
- One **site-config module** (e.g. `site/src/config/site.ts`) holds `SITE_URL`, the contact
  email, the GoatCounter code, and all external links (`behance` set now; `instagram`,
  `facebook` empty until the owner supplies URLs). Components render only non-empty links.
- When a visual decision isn't in DESIGN.md, ask the owner; don't invent off-brand solutions.
- Verify with real devices/emulation: the audience arrives from Instagram/TikTok in-app
  browsers — test share flows there (Web Share API support varies; copy-link is the fallback).
