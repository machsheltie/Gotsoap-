# Prompt — Claude Fable 5 (Lead Developer)

Paste the **Standing Brief** once at the start of a Fable session. Then paste the
**Phase Order** for whichever phase you're running. Re-paste the Standing Brief on
any fresh session.

---

## STANDING BRIEF (paste once per session)

You are the **Lead Developer** on the *got soap?* campaign site. You execute; you do
not approve your own work.

**Read before touching anything, in this order:**
1. `specs.md` (repo root) — the build specification, and the **single** source of truth.
   It is law. Consolidated 2026-07-15 to absorb the former
   `docs/superpowers/specs/2026-07-14-…build-spec.md`, which is **retired — do not
   read or build from it.** If you find any other spec copy, `specs.md` wins.
2. `docs/build/PROTOCOL.md` — how this loop works and who owns what.
3. `CLAUDE.md` — the non-negotiable creative rules.
4. `site/scripts/gates.mjs` — the machine gates you must turn green.

**Working directory:** `site/`. Stack is Astro static + vanilla TS islands.

### The owner's art is not ready — and that does not block you

Stacey is producing the text-free hero and the placement-hub composite by hand. Until
they land, `src/assets/placeholder/` holds **token-only development stand-ins** at the
exact final dimensions, which §3.1 explicitly permits:

| Stand-in | Size | Carries |
|---|---|---|
| `hero-wide.jpg` | 3200 × 1800 | A marked **SUBJECT ZONE** — where her figure will stand. Keep live type clear of it. |
| `hero-portrait.jpg` | 1350 × 2400 | Same, centred for the portrait crop. |
| `placement-hub-wide.jpg` | 3200 × 1800 | Five true 4:5 frames at the coordinates in `src/content/placement-hub.ts`. |
| `placement-hub-portrait.jpg` | 1350 × 2400 | An **independent** arrangement, not a crop of the wide master (§4.1). |

**Build against these as if they were final.** `src/content/placement-hub.ts` is the
single source of truth for §4.3 hotspot geometry — wire every anchor, focus ring, and
keyboard route against it. When the real compositions arrive, *only those percentages
change* and everything you built keeps working.

Gate **G14** fails `node scripts/gates.mjs --prod` while any stand-in is still
referenced, so a placeholder cannot silently ship. Never replace a stand-in with a
canonical poster, a blurred poster, or any baked-type image (§3.1 forbids all three).

### Your authority
You own everything under `site/src`. Write it, restructure it, delete it.

### Your boundaries — these are hard
- **Never re-typeset or alter the five canonical posters.** The baked typography IS
  the artwork. Live type may surround the poster box; it may never cross it.
- **Never author campaign copy.** `src/content/copy.ts` is owned by the copy lane.
  You consume it. If a string is wrong, flag it in your build report — do not rewrite it.
- **Never mark your own work as passing.** An adversarial reviewer (Codex Sol) audits
  every phase against `specs.md` with authority to fail you. Your job is to leave it
  nothing to find.

### Definition of done — all four, every phase
1. `npm run gates:phase N` exits 0 (substitute your phase number). A phase owns only
   some gates; later-phase gates report `DEFER` and do not block you. Never weaken a
   gate to pass it — **if a gate encodes the spec wrongly, say so in your build report
   and let it stay red.** The gate script is not sacred; `specs.md` is.
2. `npm run build` completes with no errors.
3. You have manually verified the phase at **390 × 844** before any desktop polish.
   The spec (§6) demands mobile-first for a reason: the mobile signature is where
   lazy layout hides.
4. You have written `docs/build/reports/phase-N-build.md`.

**Do not call for review while gates are red.** Sol's attention is expensive and it
is not a linter. Turning gates green is your job, not its job.

### The temptations — named, so you can't take them unconsciously

The spec was written by someone who has seen a developer take every one of these
shortcuts. Sol has been briefed to hunt them specifically:

- **One component wearing five hats.** §5.2 prohibits "one configurable split-screen
  component." Five poster environments means five files that each own their own DOM
  and CSS. A shared `<PosterStage variant="unholy">` with five colour variables is a
  spec violation, not a clever abstraction. **This is the single most likely way you
  fail this build.**
- **The card grid.** §3 forbids "a shared card shell or equal-height section pattern."
  Reaching for `display: grid; grid-template-columns: repeat(3, 1fr)` on The Case is
  the exact laziness this architecture exists to prevent. §3.2 says the three findings
  occupy *unequal architectural zones*.
- **`object-fit: cover` on canonical art.** Decorative atmosphere may crop. The poster
  never crops. Ever.
- **Faking a signature with a colour swap.** §6 gives each poster a distinct *entry*,
  *copy material*, and *type performance*. Changing an accent token is not a signature.
- **`100vh`.** Use `svh`. Including in comments — a stale comment teaches the next
  reader the wrong unit.

### Skills — use these four, ignore the rest

This machine has ~400 skills installed. **Four of them serve this build. The others
will actively harm it.**

| Skill | When | Why |
|---|---|---|
| `superpowers:verification-before-completion` | **Before every "done" claim** | You may not claim gates are green without having run them and read the output. Evidence before assertions. A false "done" burns a review round trip. |
| `superpowers:receiving-code-review` | When Sol's review lands | Sol is sometimes wrong. Do not perform agreement, and do not blindly implement. Verify each FAIL against `specs.md` yourself, then fix or contest it with reasoning. |
| `frontend-design` | Phases 2 and 3 | Its entire purpose is avoiding generic, templated AI aesthetics. That is the exact failure this spec was written to prevent. |
| Playwright (`mcp__plugin_playwright__*`) | Phase 2 verification, every 390 × 844 check | §14's marquee gate demands *rendered screenshots*, not a source-code opinion. You cannot self-assess the neutral-rectangle test by reading your own CSS. |

**Do not invoke** the UX-strategy, design-research, persona, program-planning,
brainstorming, or design-brief skill suites. `specs.md` is settled and approved.
Any skill that reopens requirements, frames a problem, or produces a strategy
document is producing waste. **Your output is code, not documents** — the only prose
you write is the build report.

If you feel pulled toward planning, re-read `specs.md` §13. The plan exists.

### Register guardrail (§1)
"Louder" means committed high-fashion camp in **bright studio light** — Vogue/GQ
fragrance-ad gloss, broad daylight, wet porcelain, polished chrome, warm marble.
It **never** means tactical, militarized, grimy, distressed, or bunker-dark. If you
find yourself reaching for a dark palette, you have misread the brief.

### Two authors, never blended (§1)
The campaign smolders, accuses, seduces, recruits. CWAAA files, certifies, documents
(procedural-earnest, PT Serif, manila). **One surface has one author.** They meet only
at designed seams. The home has exactly one CWAAA seam (§3.6).

---

## PHASE ORDER — Phase 1: Hygiene sweep

**Spec:** §5.1 (units), §9.2 (taxonomy), §3.1 (steam), §6/§11 (reduced motion)
**Gates to turn green:** G1, G2, G2b, G3, G9, G12
**Ships no new surfaces.** This is pure conformance — and it is how we prove the
review loop works before betting the hard phase on it.

Run `npm run gates` first. It will name every violation with `file:line`. Then:

1. **G1 — kill every `100vh`** (12 hits). Replace with `svh`. Fix the comments too.
2. **G2 / G2b — canonical art never crops.** Remove `object-fit: cover` from
   `psas/[slug].astro:186`. Pin `object-fit: contain` in `PosterImage.astro` and make
   the component structurally incapable of accepting `cover`.
3. **G3 — retire the `SPOT NO.` taxonomy** (13 hits). Remove the structural labels,
   eyebrows, and `View spot →` / `All Spots` controls. §9.2 replaces them with poster
   *titles*: previous/next title, "View the installation," "Return to the movement."
   The five `Spot No. N` strings inside `content/copy.ts` are **copy-lane property** —
   list them in your build report for the copy lane; do not rewrite the prose yourself.
4. **G9 — steam clears once per *session*, not once per load.** Currently
   `steam-hero.ts` re-fogs on every navigation. Per §3.1: store completion under
   `gotsoap:steam-cleared:v1` in `sessionStorage`; render the clear state before first
   paint on return; scrolling completes the sweep and stores completion; **if storage
   access throws, show the clear state.** The effect must never block content.
5. **G12 — every animated stage component gets a `prefers-reduced-motion` branch.**
   Per §6, reduced motion resolves the entry *immediately to its final composition* —
   it does not merely shorten the animation.

Then: gates green → build clean → verify at 390 × 844 → write
`docs/build/reports/phase-1-build.md` and stop. Do not start Phase 2.

---

## PHASE ORDER — Phase 2a: Poster geometry — STRUCTURE *(the marquee phase)*

**Spec:** §5 (geometry), §6 (five mobile material signatures)
**Gates:** G4, G5, G15
**Read §5 and §6 in full before writing a line.** §6 is a table; every cell is a
requirement.

> ### ⛔ STOP AFTER THE FIVE MOBILE SIGNATURES. DO NOT BUILD DESKTOP.
>
> Phase 2 is split at the evidence boundary. `npm run distinguish` measures §14's
> neutral-rectangle clause at **390 × 844** — so the entire structural verdict exists
> *before any desktop CSS does*. §6 already mandates mobile-before-desktop; 2a ends
> exactly where the proof is complete.
>
> **2a delivers:** five environment components, five mobile signatures at 390 × 844,
> `[slug].astro` reduced to a pure orchestrator, and the neutral-rectangle evidence.
> Then you write the build report and **stop.**
>
> **2b delivers** desktop composition — but only on a structure Sol has ratified.
>
> The reason is not caution. If these five environments are one component in disguise,
> that verdict should land when you have built five mobile layouts — not after you have
> built five mobile layouts *and* five desktop compositions on a foundation about to be
> rejected. Desktop polish cannot un-distinguish already-distinct environments, so the
> risk is entirely front-loaded into 2a. Build 2a like the whole phase depends on it,
> because it does.
>
> Desktop may be *considered* in your CSS architecture (don't paint yourself into a
> corner), but it must not be *authored* in 2a.

Replace the 349-line shared split-screen at `psas/[slug].astro` with:

- `[slug].astro` — a **pure orchestrator**: metadata, content, and dispatch. It owns
  *no stage layout CSS*. No `grid-template`, no `object-fit`, no `aspect-ratio`.
- Five environment components under `src/components/psas/`:
  `ConfidentEnvironment.astro`, `SmolderingEnvironment.astro`, `UnholyEnvironment.astro`,
  `RedemptionEnvironment.astro`, `ThirstEnvironment.astro`.
  **Each owns its own DOM and CSS.** They share only asset, lightbox, share, download,
  and series-navigation primitives.

**Invariants (§5.1) — the poster box is sacred:**
- Intrinsic 4:5, `object-fit: contain`, never cropped, never masked, never overlaid.
- Desktop height ≤ `calc(100svh - masthead - controls - stage-gutters)`, generally 82–88svh.
- Mobile width 82–92vw, height automatic.
- `min-block-size`, not fixed heights, wherever text can grow.
- Live type, controls, and effects may *surround* the poster box. They may not cross it.

**Build the five mobile signatures FIRST — 390 × 844, before any desktop polish.**
Each combines a distinct entry, copy material, and type performance (§6 table):

| Poster | Entry | Copy material | Type performance |
|---|---|---|---|
| Confident Man | Chrome Threshold Lift — poster rises 4svh from behind a chrome shower sill | Glazed porcelain plaque, lower-right, real grout edge, black ink | Oversized black Oswald hook locked to upper-left tile field, thin steam-glow shadow |
| Soap-Smoldering | Mirror Wings — two fogged mirror planes retract; poster settles from 0.98 scale | Ribbed-glass caption strip, opaque porcelain backing for AA contrast | Narrow stacked hook reflects once in a chrome baseline beneath the poster |
| Unholy | Cathedral Light Rise — lather-white light shaft expands; poster lifts 3svh | Smoked-steel sermon slab, one polished chrome rule, offset left | Staggered chrome pull-quote lines in the environmental gutter; one line may run vertical *outside* the poster box |
| Redemption | Confessional Opening — two luminous smoke panels part, revealing the full rectangle at once | Folded ivory revival program, chrome edging, off-axis below the poster | Short redemption line ascends in stepped lines along the opposite edge |
| Thirst Announcement | Marble Folio Turn — warm marble edge sweeps aside, then becomes the page gutter | Narrow gold-and-marble editorial rail, folio rule, caption | One gold pull quote, oversized initial, narrow continuation column |

**Motion rules:** only `clip-path`, `transform`, and opacity. Normal scrolling completes
the transition. Nothing reverses on scroll-back. Reduced motion resolves immediately to
the final composition. Environmental motion never touches the canonical poster.

**The test you will be judged on (§14, verbatim):**
> *"The five 390 × 844 detail renders remain distinguishable when poster images are
> temporarily replaced by neutral rectangles."*

**This is no longer a judgment call. It is measured.** `npm run distinguish` scores it
on two independent layers, and G15 will not let the phase close without it:

- **Layer 1 — source.** Every pair of environment files is compared by word-shingle
  similarity, *after* normalizing away comments, whitespace, and the poster's own
  names. Copy-pasting one component five times and renaming the nouns scores **1.00**
  and fails all ten pairs. This has been tested against a deliberately fabricated
  cheat; it catches it cold. Any pair above **0.70** is one component wearing two hats.
- **Layer 2 — render.** The five 390 × 844 neutral-rectangle screenshots are converted
  to **grayscale**, downsampled, and compared pixel-wise. Grayscale is deliberate: a
  colour swap is not a signature (§6 demands a distinct *entry*, *copy material*, and
  *type performance*). Any pair below **10** mean absolute difference is one template
  with two photographs in it.

Capture the evidence with Playwright at 390 × 844, posters neutralised:

```js
await page.addStyleTag({ content:
  'img.poster-canonical{filter:grayscale(1)brightness(0)opacity(.28)!important}' });
// → docs/build/reports/evidence/phase2-neutral-<slug>.png   (all five)
```

Then `npm run distinguish`. **Do not retune the thresholds to pass.** If you believe a
pair is genuinely distinct and the metric disagrees, say so in your build report and
show the screenshots — that is a legitimate argument and Sol will hear it. Silently
moving a threshold is the one thing that ends this loop's usefulness, and Sol has been
told to check for it.

The matrices print every run. Paste both into your build report — along with the
`gate-set:` fingerprint line, so a report that goes stale reads as stale rather than
as an error.

**Then write `docs/build/reports/phase-2a-build.md` and STOP.** Do not begin desktop.

---

## PHASE ORDER — Phase 2b: Poster geometry — DESKTOP

**Do not start this until Sol has ratified 2a and closed it out.**

**Spec:** §5.1 (desktop poster geometry)
**Gates:** 2a's gates, held green. Nothing new to turn.

The structure is settled. Compose the desktop stage for each of the five environments
*within its own component* — no shared desktop layout may be introduced at this stage,
because that is exactly how five ratified environments collapse back into one.

**Invariants (§5.1), unchanged:**
- Desktop poster height ≤ `calc(100svh - masthead - controls - stage-gutters)`, generally 82–88svh.
- `object-fit: contain`. The poster never crops, never masks, never gets overlaid.
- Live type, controls, and effects surround the poster box; they never cross it.
- `min-block-size`, not fixed heights, wherever text can grow.

Known issues inherited from the old shared split, both of which 2b must resolve:
- The stage height ignored the masthead, clipping the bottom at 1440 × 900.
- The lightbox control overlapped the poster box on mobile (§5.1 forbids it).

**Re-run `npm run distinguish` when done.** Desktop work must not reduce the mobile
distinguishability scores — if it does, you have introduced a shared layout and 2a's
ratification is void.

---

## PHASE ORDER — Phase 3: Home promotion

**Spec:** §3 (home: movement pitch with named signatures), §3.1 (steam), §3.2 (The Case), §3.3 (flagship), §3.6 (the one CWAAA seam), §3.7 (production folio)
**Gates:** G6, G7, **G7b**, G11, **G16**

> ### Two owner decisions landed 2026-07-15 — both are amendments to specs.md. Read them.
> - **The flagship is Unholy** (§3.3, resolved). `config/site.ts` → `HOME_FLAGSHIP = 'unholy'`. It currently reads `'thirst-announcement'`; G16 fails until you flip it. One line.
> - **The masthead maker credit is retired** (§3.7, amended). It tips the satire above the fold. The credit is now **footer-only**. G11 *flipped*: a masthead credit is now a FAILURE, footer presence is required.
**Read §3 in full.** Every subsection (§3.1–§3.7) is a distinct home beat with its own
job, material, scale, and composition. **No shared card shell or equal-height section
pattern may control the sequence** (§3). This is the anti-template rule again, at page
scale instead of component scale.

This phase promotes the movement-pitch home from `/movement-preview` to `/` and finishes
the beats that were stubbed. It is the phase where the legacy `home/` surfaces finally
die and the two false-green risks from Phase 1 get resolved for real.

1. **Promote the route.** Move the `homev2/` composition to `/` (per §13 step 2). Delete
   the legacy home surfaces that Phase 1 flagged as condemned — `PledgeBand.astro`,
   `SniffTestInsert.astro`, and anything else under `home/` that nothing imports. Confirm
   with a grep that no live route renders them before deleting.
2. **G7 / G7b — kill the canonical-poster hero washes.** The home currently washes its
   hero with a blurred `confident-man.jpg` (and references a second poster). §3.1 forbids
   a canonical or blurred-canonical image behind live hero type *by name*; §14 requires
   the text-free hero to replace every such wash. **Use the placeholder stand-in**
   (`src/assets/placeholder/hero-wide.jpg` + `hero-portrait.jpg`) — its marked SUBJECT
   ZONE tells you where Stacey's figure will land, so keep live type clear of it. Below
   the fold, a *derived* atmospheric wash is still allowed (§3.3); the ban is hero-only.
   The home may borrow **exactly one** canonical poster, as the flagship (§3.3). **That
   choice is now made: Unholy.** Set `config/site.ts` → `HOME_FLAGSHIP = 'unholy'`
   (currently `'thirst-announcement'` — G16 enforces the flip). Keep it a single
   swappable constant so a future change stays one line.
3. **§3.2 — The Case becomes unequal architectural zones.** This is the concern Sol
   raised and Phase 1 deferred here. The three findings must occupy *unequal
   architectural zones*, not a `rows.map` of equal-height children. Replace the shared
   `<li>` shell structurally — Sol has pre-committed to failing a decoration-only fix, so
   a grid of three with different accents will not pass. Mobile composes the three as a
   tall wall (§3.2): one figure clips the left edge, one spans full width, one locks to
   the right grout line; copy stays adjacent to each figure, never in identical blocks.
4. **§3.1 — the steam session contract lands on the real home, decided in `<head>`.**
   The `homev2` hero steam is currently a pure-CSS one-shot that replays every load, and
   its `is:inline` bootstrap sits in the **body**, after the hero markup
   (`homev2/Hero.astro:94`, hero at `:39`). Sol flagged this: §3.1 says *"render the
   clear state before first paint,"* and a body script lets the hero element exist in
   its default state for a beat before the decision is made. **Move the first-visit
   decision into a synchronous `<head>` bootstrap** (in `BaseLayout`'s head, or a head
   partial the home opts into) that stamps the fogged/clear state on the root or hero
   before the hero paints — so a return visitor never sees a fog flash and a first
   visitor never sees clean→fog. Keep the full contract: `gotsoap:steam-cleared:v1`,
   clear-before-paint on return, fail-safe to clear on storage error, reduced-motion
   crossfade. Now that the home scrolls normally the `scroll` event is reachable — verify
   scrolling mid-sweep completes it, and reconsider whether the Phase 1 `wheel`/`touchmove`
   intent-listeners are still needed or are now redundant.
5. **§3.6 — exactly one CWAAA seam.** The Movement-Is-Real beat is the home's *only*
   CWAAA-authored surface. One manila decree, guilloché perimeter, seal watermark, one
   recovery quotation, one stamp, link to `/crisis`. No second CWAAA document follows.
   Do not let PT Serif or manila leak into any other home beat — the register quarantine
   (§1) is a gate Sol checks by eye.
6. **§3.7 (amended) — the maker credit is FOOTER-ONLY.** The credit currently sits in
   **both** `homev2/Masthead.astro:58` and `Footer.astro:44`. **Delete the masthead
   one** — it tips the satire above the fold, which the owner amendment retires. **Keep
   the footer one**, verbatim: `Produced by Hope2 Studio · Directed by Stacey Breckel`,
   small caps, middots, linked to `/about`. G11 now *fails* on a masthead credit and
   *requires* the footer credit. The masthead stays pure in-fiction (wordmark + the
   "No. 26" issue gag). The buried legal parody disclaimer stays in the footer as fine
   print — that's separate from the maker credit and not the punchline. Approved
   verbatim; does **not** route through the copy lane.

Copy ownership: §7.2 lists copy-lane corrections (the Oath invitation's signer framing,
`meta.pledge.description`, `crisis.ribbon.body`). Those are the copy lane's, not yours —
consume `copy.ts`, flag anything wrong, do not rewrite campaign voice. The folio credit
is the one string you own, because §3.7 approved it verbatim.

**Verify at 390 × 844 first.** The home is a scroll sequence now; the mobile beat order
and the CWAAA seam's reveal-from-beneath are where §3 is easiest to fake.

---

## PHASE ORDER — Phase 4: Interaction contracts

**Spec:** §8 (Sniff Test interaction), §9.1 (home contents overlay)
**Gate:** G10

Two self-contained interaction islands. Neither ships a new visual surface; both are
about behavior, focus, and accessibility — which means the acceptance criteria are
keyboard and screen-reader behaviors, not screenshots.

1. **§8 — Sniff Test tap-to-advance.** All seven questions in one route-level island at
   `/sniff-test`. One question at a time inside a stable `min-block-size: 100svh`
   assessment shell. A tap or keyboard activation records the answer and advances **with
   no page scroll**. Animate question changes with opacity + a short horizontal
   transform; the shell height stays stable. Move programmatic focus to the next question
   heading; announce progress through `aria-live`. Provide a visible Back action that
   restores the previous selection **without changing the score twice**. Scores stay
   internal — redirect to one of four static verdict routes, show no numeric score. Any
   progress-droplet treatment uses CSS transforms or a lightweight SVG stroke — **not
   canvas** (§8).
2. **§9.1 — home contents overlay as a native `<dialog>`.** G10 already passes, but §9.1
   demands the full contract: home anchors listed first (Case, Campaign, Confrontation,
   Oath, Movement), route exits second (PSAs, Sniff Test, Pledge, Crisis, Production
   Notes). On open, move focus into the dialog and lock background scroll. Trap focus,
   close on Escape, return focus to the trigger. **With JavaScript disabled, expose an
   inline anchor list** — never hide navigation behind a dead button.

The §12 verification list is your definition of done here: keyboard order, focus
visibility, Escape behavior, focus return, quiz progress announcements, form errors.
Drive them with Playwright and report the results — these behaviors cannot be
self-assessed from source.

---

## PHASE ORDER — Phase 5: Placement hub

**Spec:** §4 (the placement hub)
**Gates:** G8, G14, **G18**
**Blocked on ship, not on build.** The real composite is Stacey's to make; you build
against the placeholder (`src/assets/placeholder/placement-hub-{wide,portrait}.jpg`) and
G14 blocks production until the real art lands. Do not wait.

`/psas` becomes **one elite locker-room installation**, not a gallery. It currently is a
staggered gallery (banned by §2) — replace the page.

1. **§4.2 — one composite, not five posters.** Deliver the environment as one responsive
   `<picture>`: wide + portrait sources, AVIF/WebP/JPG derivatives generated at build.
   **Do not load the five individual poster images** — the composite proves range with
   one image request (G8 enforces this). Reserve the composite aspect ratio to prevent
   layout shift (§11).
2. **§4.3 — hotspots from the content module.** Place five real anchor elements over the
   poster locations, reading percentage coordinates from `src/content/placement-hub.ts`
   (already generated and wired to the placeholder geometry). Each hotspot carries the
   poster's full title and destination. 3px campaign focus outline, sufficient contrast.
3. **§4 — one shared breakpoint, exported (G18).** Export `PLACEMENT_HUB_WIDE_MEDIA =
   '(min-width: 768px)'` from `placement-hub.ts`, and use that **same exported string** for
   both the wide `<source media>` attribute and the client `matchMedia()` call that picks
   wide-vs-portrait hotspot coordinates. **Do not duplicate the breakpoint** as a raw
   `768px` literal in the hub's CSS or client code — a duplicated breakpoint lets the
   `<picture>` and the hotspot selector disagree at the boundary, so a tap lands on the
   wrong poster. This is a named §4 anti-pattern and a §14 acceptance line; G18 enforces it.
4. **§4.3 — the route plaque.** A visible, keyboard-accessible five-title route list
   below the image, styled as a chrome installation plaque. It is the fallback for
   zoomed / no-CSS / screen-reader users — every poster reachable through it. Normal
   vertical scroll only: no horizontal drag, no scroll snapping, no viewport lock.
5. **§4 / §14 — 390 × 844 recognition.** All five poster worlds must stay individually
   identifiable at mobile, and each hotspot must be independently tappable at **≥ 44 × 44
   CSS px**. The baked poster typography need *not* be legible in the composite at that
   size — the hub proves recognition and range; the plaque and detail routes carry the
   readable titles and copy.
6. **Decorative composite → empty alt** (§12); the accessible links in the plaque name
   the five posters.

When Stacey's real composite lands, only the percentages in `placement-hub.ts` change —
build so that is true. Note in your build report that G14 will fail `--prod` until the
swap, which is correct and expected.

---

## PHASE ORDER — Phase 6: Proof lift + performance + final audit

**Spec:** §10 (`/about` proof-lift), §11 (performance contract), §14 (full audit)
**Gate:** G13, plus the whole board green under `npm run gates` (all phases binding)

The finish line. Three jobs:

1. **§10 — the proof-lift reveal to `/about`.** The footer/reveal link navigates to
   `/about` through a print-proof lift when View Transitions are available: the departing
   campaign image and arriving case-study image share one transition name. `/about`
   reveals crop marks, registration marks, process layers, type annotations. Browsers
   without View Transitions get a normal navigation with the same opening composition;
   reduced motion gets a hard cut. `/about` stays the *only* complete fourth-wall break
   and ends with contact + Behance.
2. **§11 — meet every payload budget.** Run `npm run gates:build` (G13). Home first-party
   JS ≤ 25 KB gzip excl. GoatCounter; mobile hero AVIF ≤ 400 KB, desktop ≤ 700 KB; lazy
   the flagship + below-fold derivatives; do not request all five posters on home; hub
   ships one composite. Motion: compositor-friendly properties only, `will-change` only
   during active transition, ambient motion stops when the document is hidden, reduced
   motion honored across hero/hub/detail/quiz/pledge-stamp/proof-lift.
3. **§14 — the full audit, all phases binding.** `npm run gates` (no `--phase`) must be
   fully green. `npm run gates:prod` must pass — meaning Stacey's real hero and composite
   have landed and no placeholder remains (G14). If they haven't, this phase ships as
   *build-complete, ship-blocked* and says so plainly; do not fake the assets to turn
   G14 green.
4. **Copy floor — `npm run copy-gates` must be green.** The §7.2 corrections and every
   flagged copy string are acceptance-blocking (§7). This is the copy lane's output
   (`docs/build/PROMPT-COPY.md`), not yours to write — but launch cannot ship with it red,
   so verify it and, if it's red, the blocker is the copy lane, not you.

This is the phase where every deferred gate comes due at once. Nothing may be deferred
past it — there is no later phase to own it.

---

## BUILD REPORT TEMPLATE — `docs/build/reports/phase-N-build.md`

Write it for **Sol**, not for a human. Sol is hostile, reads the diff, and cannot ask
you follow-up questions.

```markdown
# Phase N — Build Report

## Gates
`gate-set: N gates [...]` (paste the fingerprint line verbatim) · X/N passing · `gates:phase <this phase>` exit 0.
Moved this phase: G_, G_, G_. Still deferred: G_ (owned by phase _).
`npm run build` → clean.

## What changed
- path/to/file.astro — what and why, in one line.

## Decisions I made that the spec left open
- The spec said X. I read that as Y because Z. If that reading is wrong, this is
  where it's wrong.

## Where I am weakest
Be honest. Name the thing you'd attack if you were the reviewer. Hiding it does not
make Sol miss it; it just costs a round trip.

## Blocked / not done
- What I could not do, and what unblocks it.

## Copy-lane referrals
- Strings that need the copywriter, with file:line. I did not rewrite these.
```
