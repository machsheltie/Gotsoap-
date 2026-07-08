# Got Soap? Web Campaign v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to
> implement this plan. The orchestrator dispatches one agent per task and reviews between
> tasks. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Altitude note:** the executors are Opus/Sonnet agents with full read access to the very
> detailed source docs (`docs/prd`, `docs/design.md`, `docs/copy/*`, `docs/hero-image-brief.md`).
> This plan therefore specifies **file ownership, interfaces, acceptance criteria, and exact
> doc/copy references** rather than re-transcribing every CSS line the agents will read from
> `design.md`. Every task links the sections it must obey. Copy strings are transcribed from
> `docs/copy/copy-deck-v2.md` verbatim into the content module — never paraphrased.

**Goal:** Build the static Astro campaign site for *Got Soap?* at `gotsoap.netlify.app` — five
untouchable satirical posters, a shareable quiz (viral loop), a real email-capture pledge
(conversion loop), a CWAAA site-within-a-site, and a `/about` reveal that pitches Hope2 Studio.

**Architecture:** Astro static output; zero client JS by default; vanilla-TS islands only for
the steam hero, the quiz, share/copy buttons, the scratch-n-sniff gag, and the pledge success
stamp. Plain CSS custom properties (design tokens) — no Tailwind. Self-hosted WOFF2 fonts.
Two-author design system (Campaign registers 🧼 vs. CWAAA nonprofit 📋) enforced by
register-scoped token usage. All copy flows from one content module (`src/content/`) sourced
verbatim from `copy-deck-v2.md`. All absolute URLs derive from one `SITE_URL` constant.

**Tech Stack:** Astro (latest), TypeScript, `@astrojs/sitemap`, Astro built-in `<Image>`
(sharp) for AVIF/WebP/srcset, Netlify Forms (no SDK), GoatCounter (script tag). Node 24 present.

---

## Global Constraints

Every task's requirements implicitly include this section. Values are exact.

- **Never modify, crop, or re-typeset the 5 canonical posters.** They ship as-is. Case notes /
  alt text *describe*; they never restate baked-in poster text as the poster. (CLAUDE.md §1, PRD §3.1)
- **Two authors, never blended on one surface.** 🧼 Campaign (Oswald/Jost/Libre Franklin/Montserrat;
  6 campaign tokens) = `/`, `/psas/*`, sniff-test UI, verdict art, share UI. 📋 CWAAA (PT Serif;
  manila/ink/stamp tokens) = `/crisis`, `/pledge`, verdict *stamps*, `/404`, footer funded-by line,
  home letterhead block. A mixed surface is a bug. (design.md §4)
- **Voice invariants, verbatim, global:** subheads open **"Because…"** · primary CTAs open
  **"Join the movement."** · hashtag stack `#GotSoap · #SoapyThirstTrap · #CleanManEnergy` ·
  sponsor gag **"Funded by Concerned Women Against Axe Abuse"** · `© Stacey Breckel 2025`.
- **In-fiction utility labels — binding, never a bare "Share":** Share spot → *Post it in the
  locker room* · Share verdict → *Issue the announcement* · Copy link → *Copy the citation*
  (📋 *Copy the case number*) · Download → *Take one for the wall* · Retake → *Request
  re-assessment* · Submit pledge → *File my declaration*. (design.md §4, copy-deck §Read-first)
- **All campaign copy from the content module**, transcribed verbatim from `copy-deck-v2.md`.
  Never invent or inline campaign copy. Token-tagged placeholder is acceptable only where the
  deck has a gap. `copy-deck-v1.md` is superseded — do not read from it.
- **Fonts:** self-hosted WOFF2 only (no Google Fonts CDN — a named prototype defect). Oswald
  (LOCKED display, lowercase always: SemiBold 600 logotype / Bold 700 spot titles / Medium 500
  nav mark), Jost (body/CTA), Libre Franklin (Black/ExtraBold labels, uppercase tracked),
  Montserrat (fine print/quiz chrome), PT Serif (CWAAA only). `font-display: swap`, Latin subset. (PRD §7)
- **Color tokens (9), register-scoped** — exact hex in design.md §5. `grout-black #0E0E10`,
  `steam-white #ECEAE4`, `smoke-slate #201F22`, `chrome-mist #9A9AA2`, `marble-amber #B8862E`
  (the ONLY campaign accent), `lather-white #FFFFFF`; `cwaaa-manila #EFE6CF`, `cwaaa-ink #2F3E5C`,
  `cwaaa-stamp #A63D2F`. Each campaign section uses only its register's 2–3 tokens; CWAAA tokens
  only on CWAAA surfaces.
- **Accessibility (acceptance-blocking):** WCAG 2.1 AA. Visible focus everywhere (2px marble-amber
  campaign / cwaaa-stamp CWAAA, offset 2px). Quiz keyboard-completable, `aria-live` progress.
  Every poster has voice-carrying alt text — never `alt=""`. Amber-on-porcelain must pass AA
  (a named prototype defect — verify contrast). (PRD §6.4, design.md §7/§9)
- **Motion policy:** only (1) hero steam auto-clear ~2s, (2) quiet scroll-reveals (opacity/short
  translate), (3) the SWORN stamp settle. `prefers-reduced-motion` disables all three. NO
  drag-to-wipe hero (retired). NO replay-on-scroll re-fog. (design.md §8)
- **Performance:** Lighthouse ≥ 90 (all four, mobile) on `/`, `/psas`, `/sniff-test`. Posters
  served as AVIF/WebP + srcset, lazy below the fold; **originals only behind download links**.
  Hero image is the LCP element — preloaded, never blocked by the steam layer. LCP < 2.5s / 4G.
- **Repo:** build only in `site/`. Never touch/move/commit root design sources. Never `git add -A`
  from repo root. Commit only explicit paths under `site/` (+ this plan). `.gitignore` already
  guards the binaries. No committed file > 5 MB. Local commits only on `feat/gotsoap-site-v1`
  — **no push, no deploy** without owner sign-off.
- **Config-gated externals:** `behance` set now; `instagram`/`facebook` empty → render nothing.
  Contact email obfuscated from scrapers. GoatCounter code `gotsoap`. (PRD §13)
- **Art placeholders:** hero art, verdict cards, pledge badge, poster-5 `aa` crop, favicon are
  owner assets — build token-based placeholders, never block. Hero placeholder is **never a
  cover-cropped canonical poster**. (HANDOFF, hero-image-brief.md)

---

## File Structure (ownership map — parallel agents never share a file)

```
site/
  astro.config.mjs            [F] integrations: sitemap; image; site: SITE_URL
  package.json tsconfig.json  [F]
  public/
    fonts/*.woff2             [F] self-hosted subsets
    downloads/*.jpg           [F] full-quality poster originals (download targets)
    og/*                      [B,D,E] placeholder OG images per surface
    favicon.svg               [F] placeholder mark
  src/
    config/site.ts            [F] SITE_URL, contact (obfuscated), goatCounter, externals,
                                   POSTERS registry [{slug,register,title,file,order}]
    content/
      types.ts                [F] shared copy types
      global.ts               [F] nav, footer, hashtags, funded-by, ©, scratch-gag rotation (copy §1)
      home.ts                 [A] hero, 5 spots, insert, letterhead, pledge band, reveal (copy §3)
      psas.ts                 [D] index intro, 5 case notes, alt text, download notice, meta (copy §4,§5,§2)
      sniffTest.ts            [B] intro, chrome, completion beat, 7 Qs, 4 verdicts, meta (copy §6,§2)
      pledge.ts               [C] header, oath, fields, errors, success, privacy, meta (copy §7,§2)
      crisis.ts               [C] header, founding, findings table, scale, ribbon, press, fine print (copy §8,§2)
      about.ts                [E] opening, why, case study, pitch, credit, meta (copy §9,§2)
      notFound.ts             [E] 404 copy (copy §10)
    styles/
      tokens.css              [F] :root tokens, type scale, register utility classes, @font-face
      base.css                [F] reset, base type, focus, motion policy, .sr-only
    layouts/BaseLayout.astro  [F] <html>, head (meta/OG/twitter/JSON-LD slot/GoatCounter/font preload),
                                   skip-link, <Nav/>, <slot/>, <Footer/>, <ScratchSniff/>
    components/
      Nav.astro               [F] + mobile disclosure (no hamburger novelty)
      Footer.astro            [F]
      Button.astro            [F] variants: campaign-primary/secondary, cwaaa-primary/secondary
      Seo.astro               [F] OG/twitter tag helper (or folded into BaseLayout head)
      ShareRow.astro          [F] in-fiction share + copy-link island wrapper
      ScratchSniff.astro      [F] first-visit dismissible gag island
      PosterImage.astro       [F] <Image> wrapper: AVIF/WebP/srcset/lazy, from POSTERS registry
      cwaaa/Seal.astro        [F] SVG (harvest from prototype, rebuild clean) 📋
      cwaaa/RibbonBadge.astro [F] washcloth-ribbon SVG 📋
      home/*                  [A] Hero, Spot, SniffTestInsert, MovementLetterhead, PledgeBand, RevealBeat
      quiz/*                  [B] Quiz island, Question, ProgressBar, VerdictCard(placeholder)
      psas/Lightbox.astro     [D]
      cwaaa/PledgeForm.astro  [C] + FormCW1 doc chrome
      cwaaa/CrisisReport.astro[C] findings table etc.
    scripts/                  vanilla TS islands
      steam-hero.ts           [A]  quiz.ts [B]  share.ts [F]  scratch.ts [F]
      lightbox.ts [D]  pledge.ts [C]
    pages/
      index.astro             [A]
      psas/index.astro        [D]   psas/[slug].astro [D]
      sniff-test/index.astro  [B]   sniff-test/[verdict].astro [B]
      pledge.astro            [C]   crisis.astro [C]
      about.astro             [E]   404.astro [E]
      robots.txt.ts           [E]
```
`[F]`=Foundation (Phase 0). `[A..E]`=Phase 1 route agents. Phase 0 ships **stub pages** for
every route so `astro build` + nav work before fan-out; Phase 1 agents replace their stubs.

---

## PHASE 0 — Foundation  (one Opus agent, synchronous; orchestrator reviews before fan-out)

### Task F1: Scaffold + guardrail + tokens + fonts + config

**Files:** everything marked `[F]` above.

**Interfaces produced (Phase 1 depends on these EXACT shapes):**
- `src/config/site.ts` exports:
  - `SITE_URL: string` (`"https://gotsoap.netlify.app"`)
  - `CONTACT_EMAIL` + `obfuscateEmail()` helper (renders scraper-safe)
  - `GOATCOUNTER_CODE = "gotsoap"`
  - `EXTERNAL_LINKS = { behance: "https://www.behance.net/gallery/229005199/Got-Soap", instagram: "", facebook: "" }` (empty → unrendered)
  - `POSTERS: Poster[]` where `Poster = { slug, order:1..5, register:'porcelain'|'smoke'|'marble', title, file }`
    slugs in order: `confident-man, soap-smoldering, unholy, redemption, thirst-announcement`;
    registers: 1 porcelain, 2 porcelain, 3 smoke, 4 smoke, 5 marble (design.md §2/§7).
- `BaseLayout.astro` props: `{ title, description, ogImage?, ogType?, register?, jsonLd? }`.
  Renders full `<head>` (title, meta description, canonical from SITE_URL, OG + Twitter card,
  optional JSON-LD `<script type="application/ld+json">`, font preloads, GoatCounter), a skip
  link, `<Nav/>`, `<main><slot/></main>`, `<Footer/>`, `<ScratchSniff/>`.
- `<Button label register variant href? type?>`, `<PosterImage slug loading? sizes?>`,
  `<ShareRow kind='spot'|'verdict' url title shareLabel copyLabel>`.
- `content/global.ts` exports typed `nav`, `footer`, `hashtags`, `fundedBy`, `copyright`,
  `scratchGag` (from copy-deck §1, verbatim).

**Steps:**
- [x] Scaffold: `npm create astro@latest site -- --template minimal --typescript strict --no-install --no-git --skip-houston`; then `cd site && npm install`; add `@astrojs/sitemap` + `sharp`. Astro `site:` = SITE_URL; add sitemap integration.
- [x] Self-host fonts: download WOFF2 (Latin subset) for Oswald (500/600/700), Jost (400/500), Libre Franklin (800/900), Montserrat (400/500), PT Serif (400/700 + italic) into `public/fonts/`; `@font-face` (swap) in `tokens.css`. (No CDN — PRD §7.)
- [x] `tokens.css`: `:root` the 9 tokens, a type scale, register utility classes (`.register-porcelain|-smoke|-marble|-cwaaa` setting bg/fg/accent), layer-effect helpers (steam-glow text-shadow, chrome gradient `background-clip:text`) — *available* to Phase 1, applied there.
- [x] `base.css`: modern reset, base typography, **visible focus** rings per register, `.sr-only`, `@media (prefers-reduced-motion)` scaffolding, container widths (responsive 360→1440+).
- [x] `site/src/config/site.ts` per interface above.
- [x] Poster assets: copy the 5 root posters → `src/assets/posters/<slug>.jpg` (for `<Image>`) **and** `public/downloads/<slug>.jpg` (full-quality download target). Copy only — never modify originals. `PosterImage.astro` uses Astro `<Image>` (AVIF+WebP+jpg, srcset, `loading` prop).
- [x] Harvest the CWAAA **seal** + **washcloth-ribbon** SVGs from
  `got-soap-campaign-site/project/Got Soap Site.dc.html` (`<defs>`/`<symbol>`); rebuild them clean
  as `cwaaa/Seal.astro` + `cwaaa/RibbonBadge.astro` per design.md §6 (ink line-work on manila,
  stamp-red barred aerosol; rim text "CONCERNED WOMEN AGAINST AXE ABUSE / EST. 2024 · LATHER ·
  RINSE · RESPECT"). CWAAA tokens only.
- [x] `Nav.astro` (Oswald lowercase mark + Libre Franklin uppercase links + mobile disclosure),
  `Footer.astro` (copy §1 verbatim, funded-by → /crisis, © → /about, social icons config-gated),
  `Button.astro`, `ShareRow.astro` + `scripts/share.ts` (Web Share API + copy-link fallback,
  in-fiction labels), `ScratchSniff.astro` + `scripts/scratch.ts` (first-visit, `localStorage`
  dismiss, never a modal, reduced-motion-safe).
- [x] Stub pages for all 8 routes (real `<BaseLayout>` + heading + correct meta from copy §2) so
  `astro build` passes and nav links resolve. Home stub may show the real Nav/Footer/tokens.
- [x] Verify: `npm run build` succeeds; `npm run dev` serves; nav reaches all routes; no console
  errors; run `git check-ignore` sanity. Confirm no font/CDN request in the built HTML.
- [x] Commit (explicit `site/**` paths only): `feat(site): foundation — scaffold, tokens, fonts, shell, config`.

**Acceptance:** build+dev green; all 9 tokens + 5 faces load self-hosted; shell renders on every
stubbed route; POSTERS registry + BaseLayout props usable; seal/ribbon render; footer invariants
verbatim; guardrail intact (no binaries staged).

---

## PHASE 1 — Routes  (parallel; each agent owns only its files; dispatch after Phase-0 review + owner check-in)

### Task A (Opus) — Home `/`  (design.md §7 "Home"/"Spot staging"/§8; hero-image-brief.md; copy §3)
Own: `pages/index.astro`, `components/home/*`, `scripts/steam-hero.ts`, `content/home.ts`.
- Steam-clear hero: full-viewport, token placeholder bg (grout-black + live Oswald type + CSS
  steam), **auto-clears ~2s** directional sweep, type resolves; reduced-motion → crossfade;
  plays once, scroll completes instantly; hero is LCP (no block). **No drag. Never a cropped poster.**
- Five **individually-staged** spots (anti-template): porcelain tile-grid spots, smoke full-bleed
  chrome-gradient spots, marble editorial spot; each echoes poster anatomy in live type
  (eyebrow→headline→"Because…"→rule→CTA→hashtags); poster shown untouched via `<PosterImage>`;
  corner-tag logotype; spend the layer-effect budget. No two adjacent spots share a composition.
- Sniff-test insert (CWAAA-credited), Movement letterhead 📋 seam (→/crisis), pledge band
  (marble-amber on grout-black, →/pledge), reveal beat (quiet chrome-mist, →/about). ShareRow on spots.
**Accept:** register-alternating; anti-template verified; hero guardrails; Lighthouse ≥ 90 mobile; copy verbatim.

### Task B (Opus) — Sniff Test `/sniff-test` + `/sniff-test/[verdict]`  (mechanics §1; design.md §7; copy §6)
Own: `pages/sniff-test/*`, `components/quiz/*`, `scripts/quiz.ts`, `content/sniffTest.ts`, verdict OG placeholders.
- One-question island, 7 Qs (a=0…d=3), progress `QUESTION n OF 7 — FIELD ASSESSMENT CW-7`,
  `aria-live`, full keyboard, amber selected rows, no reload, no skeuomorphism.
- Score bands→verdict internally: 0–5 soap-smoldering · 6–10 suds-curious · 11–15 axe-dependent ·
  16–21 thirst-hazard. Completion beat transient ~1.2s ("Findings forwarded to the Records
  Division") → client redirect to verdict page.
- 4 **static** verdict pages (`getStaticPaths`), each own OG image (placeholder card, token-based,
  per-register per design.md §7 mapping), share/copy/download-card/retake (in-fiction labels),
  pledge CTA. **No numeric score anywhere.**
**Accept:** keyboard-completable; all 4 verdict URLs crawlable w/ OG; no score; copy verbatim.

### Task C (Opus) — `/pledge` (Form CW-1) + `/crisis`  (design.md §6/§7; mechanics §2; copy §7,§8) 📋
Own: `pages/pledge.astro`, `pages/crisis.astro`, `components/cwaaa/PledgeForm.astro`,
`components/cwaaa/CrisisReport.astro`, `scripts/pledge.ts`, `content/pledge.ts`, `content/crisis.ts`.
- `/pledge` IS Form CW-1: manila panel on grout-black, seal header, PT Serif oath, ruled fields
  (first name, email, required satire checkbox stamp-red), submit **"File my declaration."**
  **Netlify Forms:** static HTML form `name="lather-pledge"`, `data-netlify="true"`, honeypot,
  hidden `form-name`; JS submit → on-page success (no Netlify redirect): SWORN stamp
  (single scale-settle, reduced-motion-safe) + ribbon badge + share row. Procedural error copy.
- `/crisis` CWAAA site-within-a-site: letterhead+seal, founding myth, findings annual-report
  **table** (PT Serif ruled rows, no charts), scale line, "Tie One On For Suds" ribbon block
  (→/pledge), 3–5 press releases, fine-print satire, CWAAA-voice exits.
**Accept:** pure 📋 (no campaign tokens); form in prerendered HTML w/ honeypot; success on-page; copy verbatim.

### Task D (Sonnet) — `/psas` + `/psas/[slug]`  (design.md §7; PRD §5.2; copy §4,§5) 🧼
Own: `pages/psas/*`, `components/psas/Lightbox.astro`, `scripts/lightbox.ts`, `content/psas.ts`.
- Index: "Public Service Announcements — Series One", poster grid on grout-black, generous
  negative space, no card chrome. 5 detail pages (`getStaticPaths` from POSTERS): poster full-bleed
  in its register, lightbox/zoom, case notes (Jost, copy §4.2), ShareRow, **download button
  serving the full-quality original** from `public/downloads/`, prev/next as SPOT NO. n∓1.
- Each detail page: distinct OG = the poster; JSON-LD `CreativeWork`. Alt text from copy §5 verbatim.
**Accept:** posters untouched; derivatives on-page + original on download; lightbox keyboard-safe; Lighthouse ≥ 90.

### Task E (Sonnet) — `/about` + `/404` + SEO plumbing  (design.md §7; PRD §5.6/§6.3; copy §9,§10) 🧼/📋
Own: `pages/about.astro`, `pages/404.astro`, `pages/robots.txt.ts`, `content/about.ts`,
`content/notFound.ts`, JSON-LD on about.
- `/about` 🧼 porcelain, calm: opening, why-it-exists, case study (promo.txt process), pitch +
  **obfuscated** contact, Behance (config-gated), credits + Freepik attribution (only if a Freepik
  texture ships). JSON-LD Person/Organization.
- `/404` 📋 manila missing-poster: seal, PT Serif notice, stamp-red CASE CLOSED, link home.
- `robots.txt` (allow, sitemap URL from SITE_URL). Verify sitemap emits all routes; OG/canonical
  correct sitewide (spot-check built HTML).
**Accept:** reveal calm & correct; contact not a plain mailto; robots+sitemap valid; copy verbatim.

---

## PHASE 2 — Integration & verification  (orchestrator + focused agents)
- [ ] Accessibility pass: keyboard, focus visibility, `aria-live` quiz, contrast (esp.
  amber-on-porcelain), alt text present on every poster. (accessibility-compliance skills)
- [ ] Performance: build; Lighthouse mobile ≥ 90 ×4 on `/`, `/psas`, `/sniff-test`; confirm poster
  derivatives + hero preload + LCP.
- [ ] Content sweep (copy-deck §11 QA): invariants verbatim every page; 🧼/📋 never blended;
  no numeric score; no drag-to-wipe; every utility control uses its in-fiction label; zero lorem;
  externals config-gated.
- [ ] `superpowers:verification-before-completion` before declaring done; then
  `superpowers:finishing-a-development-branch` to present merge/PR/deploy options to the owner.

## Self-review (done by orchestrator)
Spec coverage: all 8 routes + footer/nav/gag/downloads/quiz/pledge/crisis mapped to tasks ✓.
Two-author quarantine encoded in ownership (📋 only in C, E-404, F-seal/footer-seam) ✓.
Interfaces consistent (POSTERS, BaseLayout props, ShareRow) across A–E ✓.
Placeholders (hero, verdict cards, favicon) never block; never a cropped poster ✓.
