# Got Soap? — Web Campaign Design System (v2.1)

**Supersedes** `docs/design-v1-sonnet.md` (archived). Research-grounded remake, July 2026.
**v2.1 (2026-07-08, owner-directed after prototype review):** steam-clear hero replaces the
interactive wipe (§8) · anti-template spot staging (§7) · dual-address copy rule (§4) ·
no numeric scores on verdict pages (§7) · corner-tag mark adopted site-wide (§7).
Binding companions: `CLAUDE.md` (creative rules — outrank this doc), `docs/prd/PRD-gotsoap-web-v1.md`
(routes, stack, acceptance criteria — this doc supplies §10's visual decisions).
Fonts and IA follow the PRD's resolved decisions by construction (free/freemium faces, multi-route site).

---

## 1. The brief, pinned

**Subject:** a fictional hygiene-PSA movement — five thirst-trap posters "funded by" a fictional
women's advocacy org — that is secretly a portfolio piece for Hope2 Studio.
**Audiences:** (a) Gen Z/millennial scrollers arriving from social, who share what's funny;
(b) creative directors in the Liquid Death / Dr. Squatch / CAH economy evaluating whether
Stacey Breckel can execute their kind of work. Old Spice's research point applies directly:
the campaign's decisive audience is **women** — they are the fiction's protagonists, not bystanders.
**The site's one job:** sell the bit as a real, committed campaign first; the portfolio reveal
is the punchline on page three, never the headline on page one.

## 2. Grounding in the source material (inherited from v1, still correct)

- **Three visual registers already exist in the posters:** bright porcelain tile + steam (1–2),
  dark smoke + chrome (3–4), warm amber marble + gold (5). The site extends them rather than
  flattening them.
- **promo.txt line 74 — the road not taken:** Stacey's abandoned "frosted shower-door" headline
  treatment is the seed of the hero (§8). Subject-specific, latent in the project's own history.
- **Poster anatomy** (headline → "Because…" → torso copy → rule → CTA → hashtags → footer gag)
  is the template the site's own sections echo.

## 3. Research: reference teardown

| Reference | What the research showed | Take | Leave |
|---|---|---|---|
| **Milk mustache print era** (Leibovitz, 1995–2014) | Prestige portrait + one absurd artifact played straight; celebrity's "own fingerprint" mustache; logotype *tagged onto* the photo (from 1997); first-person body copy | Present posters as an **archive of artifacts** — full-bleed, museum-unadorned; adopt the corner-tag convention for the site mark | Print-era body-copy density |
| **Old Spice, "The Man Your Man Could Smell Like"** (W+K 2010) | Aimed at **women** (60% of body-wash purchases); second-person direct address ("Look at your man…"); total deadpan commitment; sales doubled | **Direct-address second person as the UI copy voice** ("Look at him. Now look at you."); women as protagonists → CWAAA embodies this | TV-spot surrealism — the site's fiction is institutional, not fever-dream |
| **Dr. Squatch** | Satirical masculine *soap* marketing is a proven $100M+ category; they literally ran a "men's hygiene PSA" Super Bowl ad; identity-first ("we're for a different kind of man") | Proof-of-market for the /about pitch; identity-flattering copy for the reformed ("He washes. Daily.") | Conversion-heavy DTC chrome — nothing to sell |
| **Liquid Death (site + brand)** | Gothic + *refined* typography; utility actions renamed in-fiction ("sell your soul" ≠ "subscribe"); merch as art; entertainment before selling | **In-fiction naming for every utility moment** (pledge = "swear the oath," submit = "file your declaration"); commit 100%, no winking | Commerce layout; metal aesthetic (wrong world — ours is porcelain and steam) |
| **DHMO.org** (parody org, 1997–) | Believability = **precise mimicry of institutional design conventions** (EPA-like logo), technical language, true-but-reframed facts, satire signals hidden in fine print | The whole CWAAA design recipe (§6): mimic advocacy-org conventions *competently*, never "ugly on purpose"; bury discoverable gags in fine print | Web-1.0 datedness — CWAAA is a modest 2024 nonprofit, not a 1997 relic |
| **MADD** (the org CWAAA's name parodies) | Founder story (Candace Lightner, 1980); object logo (martini glass + car keys); grassroots chapters; **ribbon-pledge program** ("Tie One On For Safety") | CWAAA's identity kit maps 1:1 — founder myth, object seal (soap bar + barred aerosol), chapter count, **washcloth-ribbon pledge** | Nothing mocking MADD itself — the parody borrows the *form* with affection; the target stays Axe-fog masculinity |

**The synthesis the research forces:** the real Got Milk? campaign was glossy celebrity art
funded by a beige processing board. That aesthetic gap between campaign and funding body is
*authentic advertising anatomy* — so the site gets **two deliberately clashing design systems
with two fictional authors**, and the clash itself is the comedy engine. This is the one big
aesthetic risk (§10 critiques it).

## 4. The two-author system

| | **The Campaign** (the "agency" voice) | **CWAAA** (the "sponsor" voice) |
|---|---|---|
| Fictional author | The ad campaign's creative team | Concerned Women Against Axe Abuse, est. 2024 |
| World | Fragrance ad: tile, steam, chrome, marble | Grassroots nonprofit: letterhead, seals, filings |
| Surfaces | `/`, `/psas/*`, `/sniff-test` quiz UI, verdict card art, share UI | `/crisis`, `/pledge` document, verdict card *stamps*, 404, letterhead blocks, fine print |
| Mood | Seductive, cinematic, monumental | Earnest, procedural, modest — **competent, never ugly** |

The systems collide only at designed seams: the "Funded by Concerned Women Against Axe Abuse"
footer line (links to /crisis), the CWAAA stamp on verdict cards, and the pledge page (a CWAAA
document living inside the campaign site). Everywhere else, one author per surface — a section
that mixes both voices is a bug.

### The dual-address rule (v2.1 — binding copy rule, owner-ratified 2026-07-08)

The campaign has two readers, and every line must know which one it's winking at. This is the
Old Spice anatomy made explicit (§3: aimed at women, loved by men), and it is how the site
works "both ways" — a CTA at the unwashed man AND a recognition-laugh for the woman who's
been swiping past him:

- **The PSA voice speaks AT him** — "got soap?" is an accusation wearing a smile, aimed at the
  man viewing it. The quiz, the spot copy, the pledge oath: second-person male address. This
  is the locker-room/GQ placement logic carried onto the web (the site IS the locker-room wall).
- **The share layer speaks TO her** — the woman is the distribution channel; she's the one
  who's been living the deprivation. Share affordances address her: "Know one? Send him
  Spot No. 3." (v2's nominate-a-friend makes this literal.)
- **CWAAA speaks FOR women, institutionally** — the collective foot coming down, filed in
  triplicate. It never flirts; it files.

The best lines work double: "He washes. Daily. With soap." flatters the reformed man AND makes
her laugh in recognition. Copy that shames doesn't get shared by the shamed; copy that
flatters the reformed does (research doc, tone guardrails).

**In-fiction utility naming is binding, not aspirational** (§3 Liquid Death row): Share →
"Post it in the locker room" · Copy link → "Copy the citation" · Retake → "Request
re-assessment" · submit pledge → "File my declaration" (already specced). A bare "Share" /
"Copy link" on a campaign surface is a bug.

**Copy production:** a dedicated content/marketing/copywriter session owns the campaign copy
deck (2026-07-08). Implementers build with its strings via the single content module
(PRD §13) and never invent campaign copy ad hoc; token-tagged placeholder strings are
acceptable until the deck lands.

## 5. Tokens

### Color — campaign set (6) + CWAAA set (3), never intermixed outside designed seams

| Token | Hex | Role |
|---|---|---|
| `grout-black` | `#0E0E10` | Structural background/ink; nav bar; the "grout" between registers |
| `steam-white` | `#ECEAE4` | Porcelain register (posters 1–2): warm tile off-white |
| `smoke-slate` | `#201F22` | Smoke register (posters 3–4) |
| `chrome-mist` | `#9A9AA2` | Dividers, secondary text, chrome-effect type |
| `marble-amber` | `#B8862E` | The one campaign accent: CTAs, links, active states — everywhere, so it stays special |
| `lather-white` | `#FFFFFF` | Max-contrast type on dark registers; foam accents |
| `cwaaa-manila` | `#EFE6CF` | CWAAA paper stock: letterhead, document backgrounds |
| `cwaaa-ink` | `#2F3E5C` | CWAAA ballpoint-navy: text, seal line-work, ribbon outline |
| `cwaaa-stamp` | `#A63D2F` | CWAAA rubber-stamp red: the seal's bar, "SWORN" stamp, ribbon fill, form-required marks |

Register rule (inherited, still binding): each campaign section uses only the 2–3 tokens of
its register. CWAAA tokens appear **only** on CWAAA-authored surfaces.

### Type — five faces, one strictly quarantined

| Role | Face | Source | Author |
|---|---|---|---|
| Display — live "got soap?" instances, spot titles, hero | **Oswald — LOCKED** (SemiBold 600 logotype · Bold 700 spot titles · Medium 500 nav mark; lowercase always) | Google Fonts, self-hosted variable WOFF2 | Campaign |
| Body / CTA lines | **Jost** | Google Fonts | Campaign |
| Labels — movement line, hashtags, "SPOT NO." eyebrows, nav | **Libre Franklin** (Black/ExtraBold, uppercase, tracked) | Google Fonts | Campaign |
| Fine print, quiz UI chrome, meta | **Montserrat** | Google Fonts | Campaign |
| **CWAAA voice** — everything the org "writes": /crisis, pledge document, stamps, seal, 404 notice | **PT Serif** | Google Fonts | CWAAA only |

PT Serif is a deliberate, quarantined exception to the four-family spec: a different fictional
author requires a different typographic voice — CWAAA writing in the campaign's Oswald would
break the fiction the way a nonprofit press release set in a fragrance ad's font would.
Its slightly dated, workhorse-serif flavor is exactly "modest advocacy org," per the DHMO
mimicry principle. It never appears on campaign surfaces.

Layer-effect styling (glow/shadow evoking the posters' Photoshop treatment): **hero + spot
titles only** (inherited rule). CWAAA surfaces get zero effects — paper, ink, stamp.

## 6. The CWAAA identity kit (new in v2 — the fleshed-out org)

Everything mimics real advocacy-org conventions (MADD template), played straight:

- **Seal (SVG, implementer-buildable):** circular, `cwaaa-ink` line-work on `cwaaa-manila`:
  center = a bar of soap; behind it an aerosol can struck through with a `cwaaa-stamp` bar
  (MADD's martini-glass-and-keys convention). Rim text: "CONCERNED WOMEN AGAINST AXE ABUSE"
  above, "EST. 2024 · LATHER · RINSE · RESPECT" below.
- **Founding myth (draft copy, Stacey punches up):** *"Founded in 2024 by women who had
  smelled enough."* Founder persona optional — a name and one deadpan paragraph would deepen it.
- **The Washcloth Ribbon:** CWAAA's ribbon program — "**Tie One On For Suds**" (MADD's actual
  ribbon-pledge program was "Tie One On For Safety"). A folded-ribbon mark in `cwaaa-stamp`
  red doubles as the pledge badge motif.
- **Chapters & scale claims (deadpan):** *"Two million concerned women. Chapters in all 50
  states. One demand."*
- **DHMO-style true-but-reframed facts** for /crisis (drafts): *"In independent testing, 100%
  of men who showered got measurably wet."* · *"9 out of 10 women correctly identified which
  volunteer had showered. The tenth asked to leave the study."* · *"Axe body spray contains
  0% soap. This figure has not improved since 1983."*
- **Letterhead grammar:** `cwaaa-manila` ground, seal top-left, PT Serif, ruled baselines,
  form numbers ("FORM CW-1"), stamp-red required-field marks, fine-print satire signals
  (the DHMO trick — e.g., a footnote: *"CWAAA is not affiliated with any real
  organization, fragrance, or your ex."*).
- **Voice:** procedural earnestness. CWAAA never flirts; it *files*. The campaign smolders,
  the org documents. (The gap is the joke.)

## 7. Layout & per-surface specs

### Nav (all pages)
Thin `grout-black` bar; "got soap?" mark left (Oswald lowercase); Libre Franklin uppercase
links right (THE PSAS · THE SNIFF TEST · THE PLEDGE · THE CRISIS); `marble-amber` underline
for active/hover. Mobile: same bar, disclosure menu — no hamburger novelty.

### Home — the walk (structure fixed by PRD §5.1)
Steam-clear hero (§8) → five full-bleed spot sections (register-keyed, **individually
staged** — see "Spot staging" below; the wireframe shows the shared anatomy, NOT a shared
layout) → Sniff Test insert (campaign-styled card, "Administered by CWAAA field assessors"
credit line in Montserrat) → Movement block (a CWAAA letterhead excerpt — the first designed
seam — linking to /crisis) → pledge CTA band (`marble-amber` on `grout-black`) → reveal beat
(quiet, chrome-mist, one line + link) → footer.

```
SPOT SECTION (×5, register alternates)          CWAAA LETTERHEAD BLOCK (home seam)
┌────────────────────────────────────┐          ┌────────────────────────────────────┐
│ SPOT NO. 3          ← Libre Franklin│          │ [seal]  CONCERNED WOMEN            │
│ "UNHOLY"              eyebrow       │          │         AGAINST AXE ABUSE          │
│ ┌────────────┐                      │          │ ───────────────────────────────    │
│ │  poster    │  pull-quote from     │          │  A memorandum on the crisis…       │
│ │  untouched │  the poster (Jost)   │          │  (PT Serif on manila, ruled        │
│ └────────────┘                      │          │   baselines, stamp-red accents)    │
│        [ Share ]  [ View spot → ]   │          │        [ Read the full brief → ]   │
└────────────────────────────────────┘          └────────────────────────────────────┘
```

### Spot staging (v2.1 — the anti-template rule, owner-ratified 2026-07-08)

The Claude Design prototype rendered all five spots as one image-left/text-right row with a
background swap — the stock AI landing-page pattern this system exists to avoid. Binding
correction: **campaign sections are built like ads, not landing-page rows.**

- **Each spot lives in its poster's world.** Porcelain spots (1–2): a CSS tile-and-grout
  grid with slow steam drift. Smoke spots (3–4): full-bleed dark, chrome-gradient headlines
  (`background-clip: text` — the web equivalent of the posters' chrome type). Amber spot (5):
  marble ground, gold type, editorial "GQ parody spread" composition.
- **Echo the poster anatomy in live type** per spot: eyebrow ("SPOT NO. n") → display
  headline → "Because…" subhead → divider rule → CTA line → hashtag row. The rigid template
  IS the brand (Got Milk? research, principle 3) — render it in HTML, don't summarize it.
- **Vary the staging.** No two adjacent spots share a composition. Spot 3 ("Unholy") goes
  monumental full-bleed. Identical row ×5 is a defect, not a system.
- **Spend the layer-effect budget here** (§5 grants hero + spot titles): steam-glow
  text-shadow on porcelain titles, chrome gradients on smoke titles, gold treatment on amber.
  The prototype's timidity here was a miss — the posters are steam, chrome, and revival-tent
  drama; the type must not read as a tasteful default dark site. CWAAA surfaces still get
  zero effects.
- **The corner-tag mark** (§3 milk-mustache takeaway, now binding): the "got soap?" logotype
  tags campaign imagery corner-wise, site-wide — the print-era convention of tagging the
  logotype onto the photo.

### /psas + /psas/<slug>
Archive framing: "Public Service Announcements — Series One." Index = poster grid on
`grout-black`, generous negative space, no card chrome (artifact respect, per the
milk-mustache museum takeaway). Detail pages: poster full-bleed in its own register,
"case notes" paragraph (Jost), share + download row, prev/next as "SPOT NO. n−1 / n+1."

### /sniff-test (campaign UI, CWAAA-administered)
One question per screen on the campaign side (register: porcelain); progress shown as
"QUESTION 3 OF 7 — FIELD ASSESSMENT CW-7" (Montserrat) — the CWAAA form number is the only
sponsor fingerprint until the verdict. Answers are full-width tappable rows (Jost), amber
selected state. No clipboard skeuomorphism — the *language* carries the fiction, not texture.

### Verdict pages + shareable cards
Card art direction (Stacey designs; placeholders use these rules): campaign-register
photography energy per verdict — Soap-Smoldering = porcelain register · Suds-Curious =
marble/amber register · Axe-Dependent = smoke register · Public Thirst Hazard = smoke
register, heavier — each stamped corner-wise with the CWAAA seal + verdict name in
stamp-red (the second designed seam: glossy card, bureaucratic stamp). Page shows card,
share/copy/download/retake, pledge CTA: "Certified or not — swear the oath."

**No numeric score anywhere on verdict pages (v2.1).** Verdict pages are static, shareable
URLs — they cannot know a visitor's score, and the verdict names are the joke; a number
dilutes them. Scoring is internal plumbing. If quiz completion wants a feedback beat, it is
transient, client-side, and in-fiction ("Assessment complete. Findings forwarded to the
Records Division.") — never rendered on the canonical verdict page.

### /pledge — a CWAAA document (resolves the PRD's open pledge treatment)
The page IS Form CW-1, "Declaration of Intent to Lather": `cwaaa-manila` document panel on
`grout-black`, seal header, PT Serif oath text, ruled form fields (name, email), required
checkbox marked in stamp-red, submit button labeled **"File my declaration."** Success:
the document gains a red **SWORN** stamp (one scale-settle micro-animation — the CWAAA
system's single motion moment) + washcloth-ribbon badge + share row. Netlify Forms plumbing
per PRD §5.4 unchanged.

### /crisis — CWAAA's site-within-a-site
Full CWAAA authorship: letterhead header with seal · founding myth · "The State of Male
Hygiene" — reframed-facts list set as an annual-report table (PT Serif, ruled rows; no
charts — chart parody is a different joke than document parody, pick one) · chapters line ·
"Tie One On For Suds" ribbon program block (doubles as pledge funnel) · press-release
archive (2–3 deadpan headlines) · fine-print satire signals. Exits: quiz + pledge CTAs
restyled in CWAAA voice ("Schedule a field assessment" / "File Form CW-1").

### /about — the reveal
The fourth wall breaks here only. Campaign system, porcelain register, calm: the campaign
story, the case study (promo.txt process material), the Hope2 Studio pitch + contact,
Behance link (config-driven socials per PRD §13), credits/attribution. Design stays quiet —
this page is a professional handshake wearing the campaign's clothes.

### 404 — a CWAAA missing-poster
Manila document: seal, PT Serif notice — "MISSING: This page didn't shower. It's gone." —
stamp-red "CASE CLOSED," link home. (One joke, fully in-system.)

### Footer (all pages) — the poster footer, translated
Thin chrome-mist rule · movement line (Libre Franklin) · hashtag stack · "Funded by
Concerned Women Against Axe Abuse" (links /crisis — seam) · "© Stacey Breckel 2025 · A
satirical spec campaign by Hope2 Studio →" (links /about) · social icons rendered only when
config URLs exist.

### Buttons & forms, both systems
Campaign: Jost, sentence case, `marble-amber` fill (primary) / amber outline (secondary),
2px radius (tile grout, not pill). CWAAA: PT Serif label, rectangular, `cwaaa-ink` outline
on manila, stamp-red primary ("File my declaration"). Focus states: 2px `marble-amber`
(campaign) / `cwaaa-stamp` (CWAAA) outline offset 2px — always visible.

## 8. Signature: the steam-clear hero (v2.1 — owner decision 2026-07-08, replaces the interactive wipe)

Full-viewport steam over the widescreen hero image (an owner-built, **text-free** re-staging
of poster 1's world — full spec in `docs/hero-image-brief.md`). On load, the steam clears
**itself** in ~2 seconds with a directional "squeegee" sweep, as if wiped by an unseen hand,
and the live "got soap?" display type resolves as the surface clears. No interaction is
required or invited.

**Why the change (decision record):** v2's interactive wipe survived research contact but not
owner contact — it demands labor from every visitor on every visit, and fatigue set in fast
even for the owner. The deprivation beat (Got Milk?'s core mechanic) needs only a *breath* of
withholding, not a chore. The auto-clear keeps the identical dramaturgy — the visitor is
briefly deprived of the image, then rewarded — at zero effort. The frosted-shower-door lineage
(promo.txt line 74) is preserved; only the input demand is gone.

Guardrails (binding):
- `prefers-reduced-motion`: no sweep — a simple crossfade, or steam pre-cleared entirely.
- Plays **once per page load**, ~2s, and never blocks reading: scrolling mid-animation
  completes it instantly. No replay-on-scroll, no re-fog loops.
- LCP budget applies unchanged: steam renders over the already-loaded, prioritized hero
  image — never delays it.
- The effect exists once, in the hero. No steam overlays elsewhere.
- Hero art is the owner's widescreen edition (in production). Until it lands: token-based
  placeholder. **Never a cover-cropped canonical poster** — responsive cropping slices the
  baked typography, which reads as broken and violates the untouchable-poster rule's spirit.

Motion policy elsewhere: quiet scroll-reveals only (opacity/short translate), the SWORN
stamp settle on /pledge, and nothing else. `prefers-reduced-motion` disables all three.

## 9. Quality floor (non-negotiable, from PRD §6)
Responsive 360→1440+; WCAG 2.1 AA; visible focus everywhere; quiz keyboard-completable with
`aria-live` progress; poster alt text carries the joke (PRD §6.4); Lighthouse ≥ 90 mobile on
/, /psas, /sniff-test; optimized poster derivatives (AVIF/WebP + srcset), originals only
behind download links.

## 10. Self-critique — what I changed while designing this

- **Is the two-author system one risk or two designs fighting?** Tested against the seam
  rule: every collision point is scripted (footer line, verdict stamp, pledge page,
  letterhead block); no surface free-mixes voices. It also mirrors real campaign anatomy
  (glossy ads / beige boards), so it's grounded, not clever-for-clever's-sake. Kept.
- **First instinct for CWAAA was "bad design" comedy** (clip-art, Comic Sans adjacency).
  Rejected on the DHMO evidence: parody orgs land through *competent mimicry*, and
  deliberately ugly sections would read as the site breaking its own commitment. CWAAA is
  modest, not incompetent.
- **Considered replacing the fogged-mirror hero to differentiate v2 from v1.** Kept it —
  discarding a correct idea to signal authorship is ego, not design. Re-justified it
  strategically (deprivation-made-interactive) and it stays. *(Superseded in v2.1: the owner
  retired the interactive wipe after living with it — see §8. The deprivation dramaturgy
  survives as the auto-clearing steam; only the demanded labor is gone.)*
- **Considered a chart-parody dashboard for /crisis stats.** Cut: document parody and chart
  parody are two different jokes; the annual-report table keeps CWAAA's voice unified.
- **Considered clipboard/paper textures for the quiz.** Cut: skeuomorphic texture on the quiz
  would blur the two-author boundary (the quiz UI is campaign-authored; CWAAA only *signs*
  it). The form-number language does the work with zero pixels.
- **Default-check:** near-black + single amber accent is flagged as an AI default. The
  register system (three alternating backgrounds keyed to the posters) and the manila CWAAA
  world mean no long stretch of the site is "dark page, gold accent" — the amber survives as
  a deliberate thread, not the whole look.

## 11. Handoff notes

- Supersedes `design-v1-sonnet.md`; carried forward: registers, 6 campaign tokens,
  fog hero, spot wireframe, effect-restraint rule. New: CWAAA identity kit + tokens + PT
  Serif, all per-surface specs the PRD flagged as gaps (pledge, verdict cards, nav/footer,
  404, forms), research-grounded rationale.
- **PRD impacts:** §5.5 /crisis expands (CWAAA org fiction); §7 gains the quarantined PT
  Serif row; §12 item 6 (pledge treatment) has a proposed resolution here awaiting owner
  sign-off; asset list gains no new Stacey items (seal + ribbon are implementer-built SVG;
  verdict cards were already hers, now with art direction).
- Owner sign-offs: **both closed** — Oswald locked as the display face; Form CW-1 pledge
  treatment approved. No open design decisions remain.
- **v2.1 changelog (2026-07-08, owner-directed after adversarial review of the Claude Design
  prototype):** (1) hero interaction: auto-clearing steam replaces the drag-to-wipe (§8);
  (2) spot staging: anti-template rule added — spots are individually staged ads, not one
  layout ×5 (§7); (3) dual-address copy rule + binding in-fiction utility naming (§4);
  (4) verdict pages carry no numeric score (§7); (5) corner-tag logotype convention promoted
  from research takeaway to binding (§7); (6) copy deck ownership: parallel content/copywriter
  session produces all campaign strings. The prototype itself is **reference-only** — see
  HANDOFF "Prototype disposition"; do not port its DOM/CSS into the build.

## Sources

- [Wikipedia — The Man Your Man Could Smell Like](https://en.wikipedia.org/wiki/The_Man_Your_Man_Could_Smell_Like) · [W+K case](https://www.wk.com/work/old-spice-smell-like-a-man-man/)
- [Adweek — Dr. Squatch's Super Bowl hygiene PSA](https://www.adweek.com/brand-marketing/soap-brand-dr-squatch-first-super-bowl-ad/) · [Marketing Dive — Dr. Squatch on TikTok](https://www.marketingdive.com/news/how-dr-squatch-reaches-gen-z-men-with-offbeat-humor-on-tiktok/609365/)
- [Saveur — Why Got Milk? is one of the greatest campaigns](https://www.saveur.com/culture/got-milk-greatest-ad-campaign/) · [Milk Ad Man archive (1995–2004 print ads)](https://milkadman.com/1995.html)
- [Wikipedia — Dihydrogen monoxide parody](https://en.wikipedia.org/wiki/Dihydrogen_monoxide_parody) · [Know Your Meme — DHMO hoax](https://knowyourmeme.com/memes/dihydrogen-monoxide-hoax)
- [Wikipedia — Mothers Against Drunk Driving](https://en.wikipedia.org/wiki/Mothers_Against_Drunk_Driving) · [MADD history](https://madd.org/our-history/)
- [Better By Design — Liquid Death: Selling Rebellion](https://www.betterbydesign.cc/p/liquid-death-selling-rebellion-one) · [Lincoln Design Co. — Liquid Death work](https://www.lincolndesignco.com/home/liquid-death)
