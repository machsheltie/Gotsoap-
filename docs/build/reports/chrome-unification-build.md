# Chrome Unification — Build Report (Fable)

**Date:** 2026-07-17
**Task:** owner-confirmed chrome-unification direction (2026-07-16): one Masthead header
system site-wide, two registers, two scales; contents dialog as the only nav mechanism;
`Nav.astro` retired.
**Skill invoked:** `frontend-design` (per the owner direction — design + build, not a rename).

## Gate fingerprint (verbatim, final run)

```
gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]
21/21 gates pass
```

`npm run gates:build` exits 0 (includes G13: home first-party JS 1.4 KB gzip / 25 KB budget).
`npm run copy-gates`: 6/6. `npm run build`: 16 pages, clean.

## What changed

### New — `site/src/components/chrome/`

| File | What it is |
|---|---|
| `Masthead.astro` | Register dispatcher. Renders `CwaaaMasthead` when the layout's register is `cwaaa`, else `CampaignMasthead`. Routes only; owns no DOM. |
| `CampaignMasthead.astro` | The nameplate at two scales. **monumental** = the former `homev2/Masthead.astro` DOM/CSS, home only. **compact** = the interior running head: one sticky 57px bar (gold rule + hairlines + ink-gloss wordmark linking `/` + `Series One · No. 26` fiction + Contents trigger). Two explicit DOM branches, not a parametrized shell. |
| `CwaaaMasthead.astro` | The org letterhead (owner decision A): manila, double ink top rule, 38px seal, org name + motto **reused verbatim from `crisis.header`**, bordered PT Serif Contents trigger. **No campaign wordmark** — the ident links `/crisis`. |
| `ContentsDialog.astro` | The §9.1 native `<dialog>`, site-wide. Variants: `home` (anchors then routes, §9.1 order) / `interior` (routes + "Return to the movement"). Registers: `campaign` (former sheet CSS, verbatim) / `cwaaa` (manila document index, PT Serif, double ink rule, stamp-red current/return). `aria-current="page"` marks the current route. |

Triggers and the no-JS inline fallback are the owning masthead's furniture (each register
styles its own); the dialog script contract (`scripts/contents-dialog.ts`) is unchanged —
the same `[data-contents-*]` markup contract, now fed by the chrome components. Only its
header comment moved from "home contents sheet" to site-wide.

### Deleted

- `components/Nav.astro` — deleted, not just unlinked. No imports remain.
- `components/homev2/Masthead.astro`, `components/homev2/Contents.astro` — superseded by
  `chrome/`. The monumental DOM/CSS was carried over intact (descender fix, sheen,
  flanks, §3.7 no-credit comment, `scroll-margin` for home anchors all preserved).

### Layout and pages

- `BaseLayout.astro`: `hideNav` prop **removed**; the layout renders
  `<Masthead register={chromeRegister} scale={mastheadScale} />` above `<main>` (header now
  outside `main` — correct banner landmark). `chromeRegister` is **derived** from the
  existing `register` prop (`cwaaa` → letterhead, else campaign), so a two-author chrome
  mismatch cannot be authored per-page. New prop `mastheadScale` defaults `compact`.
- `pages/index.astro`: no longer imports/renders its own Masthead; passes
  `mastheadScale="monumental"`.
- Register map as directed: `/` campaign-monumental; `/psas`, `/psas/[slug]`,
  `/sniff-test`, verdicts, `/about` campaign-compact; `/pledge`, `/crisis` CWAAA. **404 is
  CWAAA** — the task table allowed either; the page body is pure CWAAA (manila
  missing-poster notice), so campaign chrome on it would violate §1. Deadpan wins.

### Tokens / stage math

- `tokens.css`: new `--masthead-compact-h: 57px` (matches the retired Nav's 56px+1px, so
  the environments' tuned budgets are unchanged). The compact bar is **pinned** to it.
- The five environments' `calc(100svh - 57px)` literals (2 per file, 10 total) now read
  `var(--masthead-compact-h)` — the §5.1 stage budget and the chrome share one source.
  No other environment lines touched (G4/G5/G15 unaffected; neutral renders untouched).
- `base.css`: `:where([id]) { scroll-margin-block-start: calc(var(--masthead-compact-h) + 1rem) }`
  so in-page anchors clear the sticky running head. Zero specificity — the home's taller
  monumental margins still win.

### Harness (strengthening, not weakening)

- `gates.mjs` G12 scan set extended to include `components/chrome/`. Reason: the animated
  §9.1 sheet moved out of `homev2/` and would otherwise have silently left G12's watch by
  being renamed. All four chrome components carry `prefers-reduced-motion` branches; G12
  green with the wider net.

## copy.ts additions — FLAGGED FOR COPY-LANE RATIFICATION

I consume copy; I don't author it. Three additions were unavoidable to meet "all header
copy routes through copy.ts." Two are spec-verbatim/structural; one is a stand-in:

1. `contents.returnHome = { label: "Return to the movement", href: "/" }` — label
   **verbatim from specs.md §9.2**; structural taxonomy like the §9.1 entries.
2. `masthead.cwaaa.ariaLabel` = `` `${FUNDED_BY} — letterhead` `` — landmark label
   composed from the verbatim org name. Structural, not voice.
3. `contents.closeCwaaa = "Return to the document"` — **the one authored string.**
   `contents.close` ("Back to the campaign") is campaign-voiced and factually wrong
   inside the sponsor's document. This is a deadpan procedural stand-in; **copy lane to
   ratify or replace.**

Also for the copy lane: `nav.links` and `nav.quiet` in copy.ts are now **unconsumed**
(only `nav.mark` is used, by both the masthead and home JSON-LD). Left in place — retiring
them is the copy lane's call.

## Verification evidence

Screenshots in `docs/build/reports/evidence/chrome-unification/` (renders from the built
site via `npm run preview`, Playwright):

- **390×844:** `home-390` (monumental), `psas-390`, `unholy-390`, `snifftest-390`,
  `about-390` (compact campaign), `pledge-390`, `crisis-390`, `404-390` (CWAAA letterhead),
  `unholy-dialog-390` (campaign interior sheet), `pledge-dialog-390` (CWAAA index).
- **1440×900:** `home-1440`, `thirst-1440` (running head over the marble spread; poster
  complete, uncropped).
- **1920×1080:** `crisis-1920` (letterhead + dossier), `psas-dialog-1920` (right-hand
  contents column).

Measured/behavioral checks (Playwright `evaluate` on the built site):

- Compact header = exactly 57.0px; `position: sticky`; trigger hit target 115×44 (§12).
- Dialog contract on home AND interior AND CWAAA: `showModal` open, focus moves to the
  close control, `html.contents-open` scroll lock, **Tab wraps last→first (trap)**,
  Escape closes + unlocks + **focus returns to the trigger**.
- Interior dialog lists 5 route exits + Return to the movement; home dialog lists
  5 anchors + 5 routes and no return entry; `aria-current="page"` verified on
  `/psas/unholy` (PSAs) and `/pledge` (Pledge).
- No-JS: with `html.has-js` absent, trigger computes `display:none`, inline route list
  visible with all 6 entries — checked live; the inline markup is present in every built
  page (grep of `dist/`).
- Register mapping greps on `dist/`: `mh`/`cm`/`lh register-cwaaa` classes land on
  exactly the mapped surfaces; the campaign nameplate string appears **zero** times on
  `/pledge`, `/crisis`, `/404`.

## Choices Sol should probe

1. **One `ContentsDialog` with two register CSS blocks** (shared structural DOM: dialog
   semantics, head, groups) vs. the §5.2 "one component wearing hats" prohibition. My
   reading: §5.2 targets the five poster *environments*; the owner direction explicitly
   asks for "a single Masthead component with two register variants," and the dialog is
   one structural mechanism (§9.1 is one contract) whose *materials* differ per register.
   The mastheads themselves are separate components with fully separate DOM.
2. **57px fixed-height compact bar** — text-scaling headroom checked at 200% (wordmark
   1.4rem→~45px inside the 53px inner bar), but drive it with your own eye.
3. During the fix pass I corrected a border-box math error (bar was 55px, not 57px) —
   re-measured at exactly 57.0 after rebuild.

## What I could not do

- True JS-disabled browser context (the Playwright MCP session doesn't expose one); the
  no-JS check simulates by removing `has-js`, which is the exact CSS gate — the class
  only ever arrives via the pre-paint script. Static markup presence confirmed in `dist/`.
- 430×932 and 768×1024 passes (§12's full matrix) — the chrome DoD named 390/1440/1920;
  the remaining widths belong to the Phase 6 full audit.
