# Chrome unification — one header system, site-wide (owner direction: the Masthead)

**The problem.** Two header systems ship today: the home uses `homev2/Masthead.astro` (the
high-fashion nameplate, via `hideNav={true}`); every other page gets `Nav.astro` from
`BaseLayout` (`{!hideNav && <Nav />}`). Same root cause as the hardcoded copy and the reveal-beat
tell — the home was built in isolation and the site never got a unifying pass. Result: the header,
menu, and overall formatting change when you leave the home.

**The direction (owner-confirmed).** The Masthead nameplate is the site's header. Retire `Nav`.
This is a **design + build** task — Fable should invoke the `frontend-design` skill; it is not a
mechanical rename.

---

## Target architecture

### 1. One header component, two registers (the two-author rule applies to chrome)
A single `Masthead` component with **two register variants**, because §1/§4 say campaign and CWAAA
never blend on one surface — and the header is a surface:
- **Campaign register** (the "got soap?" nameplate: Oswald wordmark, `Est./Series/No. 26` fiction,
  high-fashion rules) — on the campaign surfaces.
- **CWAAA register** (the org letterhead: PT Serif, manila/ink, the CWAAA seal, "Concerned Women
  Against Axe Abuse" running head) — on the CWAAA surfaces. On these pages the campaign wordmark is
  *absent*; the visitor is inside the sponsor's document, by design (the funded-by footer seam and
  the inbound links carry the connection). **← Owner sub-decision A, below.**

### 2. Two scales (magazine cover vs running head)
- **Monumental** — the home only. The current homev2 masthead: big centered wordmark, full fiction
  row. It's the cover.
- **Compact / sticky** — every interior page. Same identity, dialed down: smaller wordmark (links to
  `/`), fiction row minimized or dropped, sticks on scroll. An interior page has its own H1 and
  content; a monumental masthead would fight it. This is the cover-vs-running-head pattern, and it's
  what makes the site feel like one publication instead of one cover glued to five different sites.

### 3. One navigation mechanism — the §9.1 contents dialog, everywhere
Retire `Nav`'s visible link bar. The masthead carries a single **Contents** trigger that opens the
styled native `<dialog>` (the §9.1 work) on *every* page, not just the home:
- **Home** dialog lists home anchors (Case, Campaign, Confrontation, Oath, Movement) then route
  exits (PSAs, Sniff Test, Pledge, Crisis, Production Notes).
- **Interior** dialogs list the route exits + "Return to the movement" (`/`).
- The §9.1 contract extends site-wide: focus trap, Escape, focus return, and the **no-JS inline
  anchor fallback on every page** (never hide nav behind a dead button).

Rationale: one nav mechanism = true consistency, it's the high-fashion editorial move (a magazine
has a contents page, not a nav bar), and it reuses code you already shipped and Sol already
hardened. **← Owner sub-decision B, below.**

### 4. Register mapping (which page gets which variant)
| Surface | Register | Scale |
|---|---|---|
| `/` | Campaign | Monumental |
| `/psas`, `/psas/[slug]`, `/sniff-test` + verdicts | Campaign | Compact |
| `/pledge` (Form CW-1), `/crisis` | CWAAA | Compact |
| `/about` | Reveal — its own fourth-wall treatment (§10); may show both authors at the seam | Compact |
| `404` | Campaign (or CWAAA deadpan — minor) | Compact |

### 5. Header copy routes through `copy.ts`
Per the hardcoded-copy sweep: the masthead's strings (both registers) live in a `copy.ts` `masthead`
group, not hardcoded. Kills the class of bug that stranded "A Public Hygiene Initiative."

### 6. Retire `Nav.astro`
Once the Masthead system covers every route, `Nav.astro` is dead code. Delete it and remove the
`hideNav` prop from `BaseLayout` — the layout renders the register-appropriate Masthead directly.

---

## Beyond the header: design-language coherence

Some per-page difference is *intended* — the anti-template rule (§3, §5.2) says each route has its
own composition. That is not the bug. The bug is **chrome + design-language drift**: different
header, and likely inconsistent type scale, spacing rhythm, and token usage between the isolated
homev2 world and the older pages. While unifying the header, audit that every page draws from the
same `tokens.css` scale (type steps, spacing, radii, the register slots) so the site reads as one
publication. Flag any page using off-system values. (This is the chrome-side complement to the
copy-side hardcoded sweep.)

---

## Owner decisions (both resolved 2026-07-16)

**A — CWAAA-surface header: DECIDED — fully CWAAA.** `/crisis` and `/pledge` get the org letterhead
(PT Serif, manila/ink, CWAAA seal), **no "got soap?" wordmark**. The visitor is inside the sponsor's
document; the footer funded-by seam and inbound links carry the connection back to the campaign.
This is binding — a "got soap?" wordmark on a CWAAA surface is a two-author violation, not a cohesion
feature.

**B — Nav mechanism: DECIDED — the contents dialog, on every page.** No visible link bar anywhere.
The masthead's single Contents trigger opens the §9.1 `<dialog>` site-wide, with the full contract
(focus trap, Escape, focus return) and a no-JS inline anchor fallback on every page.

---

## Definition of done
- One `Masthead` component with campaign + CWAAA variants and monumental + compact scales; `Nav.astro`
  deleted; `hideNav` removed from `BaseLayout`.
- Every route renders the register-correct, scale-correct header — verified at 390×844, 1440×900, 1920×1080.
- One nav mechanism (the contents dialog) on every page, with the §9.1 contract and a no-JS inline
  fallback everywhere.
- All header copy sourced from `copy.ts`; no hardcoded header strings (ties to the sweep acceptance item).
- No campaign chrome on a CWAAA surface or vice-versa (two-author boundary intact).
- `npm run gates` + `npm run copy-gates` green; `npm run build` clean.

## Sol review focus
Header identical in system across all routes (not just "present"); register-correct per the mapping;
the dialog nav works and the no-JS fallback exists on interior pages too; `Nav.astro` is gone (not
just unused); design-language values trace to `tokens.css`. Drive it page-to-page at all three widths.
