# Footer consolidation — commit to the bit (fold into the home redo)

**Owner decision (2026-07-16), reinforced by The Onion precedent.** Straight-faced satire
commits on the front page; the reveal is a click away, not on the masthead or in the home
footer. The `/about` page is where the fourth wall breaks — that is the payload, and putting
"a satirical spec campaign" in the home footer spends the joke early. Same principle that
retired the masthead maker credit (§3.7 amendment, 2026-07-15).

## Current state (the problem)

The global footer renders the satire tell **three ways**, on every page including home:
- `Footer.astro:46` → `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` (→ /about)
- `copy.ts:83` `footer.credit` → `© Stacey Breckel 2025 · A satirical spec campaign by Hope2 Studio →` (→ /about) — **redundant + tips the joke**
- `copy.ts:456` `footer.disclaimer` → "…A satirical spec campaign by Hope2 Studio. All visual elements are parody…" (rendered at `Footer.astro:63`) — **says "satirical spec campaign" again**

"A satirical spec campaign" appears **twice**, two credits link to the same `/about`, and the
whole thing announces the bit before the visitor has been let in on it.

## Target state

**Home / global footer — full commitment:**
- **One** maker credit: `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` + `© Stacey Breckel 2025`, linked to `/about`.
- **Remove** `footer.credit`'s "· A satirical spec campaign by Hope2 Studio →" (redundant with the credit above; it's the tell).
- **Remove** the parody `footer.disclaimer` from the global footer.
- Keep unchanged: the funded-by gag (`Funded by Concerned Women Against Axe Abuse`), the hashtag stack, the movement line.

**`/about` — the reveal + the disclosure:**
- The full reveal lives here: "A satirical spec campaign by Hope2 Studio" and the maker story.
- **Relocate the non-affiliation disclaimer here**, reworded to do the *legal* job, not announce
  the joke: e.g. *"Parody. Not affiliated with any brand, product, publication, or public-health
  organization. Models generated with openart.ai; art direction, compositing, and typography by
  hand."* Non-affiliation ≠ "surprise, it's satire" — keep the reveal as the page's voice and the
  disclaimer as its fine print.

Every footer still links to `/about`, so the disclosure is always one click away — the Onion model.

## Why keep any disclaimer at all

Parody is strongly protected and this is a spec/portfolio piece, so the risk is low. The single
reason to keep a non-affiliation line (at `/about`, not the home footer) is that the campaign
names/evokes **specific trademarks** — "Got Milk?" and Axe — where The Onion mostly parodies
generic news. A quiet non-affiliation disclaimer one click away is proportionate. *Not legal
advice; if maximum caution is wanted, the fallback is a tiny global-footer fine-print line
"Parody · not affiliated" — owner's call, and it can be worded to avoid the satire reveal.*

## The bigger tell: the home Reveal beat (Section 7)

Beyond the footer, the home's **Section 7** (`homev2/Reveal.astro`, copy `copy.ts:151-155`
`revealBeat`) delivers the satire reveal outright — three `/about`-adjacent tells:
- `tail`: **"Got Soap? is a satirical campaign by Hope2 Studio."** — an explicit reveal *on the home*.
- `cta`: **"See who's behind it →"** (→ /about) — hints at a hidden hand.
- `line`: "None of these men are real. The problem is very, very real." — the thesis (see below).

Counting the footer, the home tips or hints the satire in ~4 places, all routing to `/about`.
§3.7's "quiet reveal" intended `/about` *findable via a quiet credit*, not an on-home satire
announcement — the implementation overshot. Bring it back to one neutral path.

**Target — one neutral `/about` path from the whole home:**
- The **single** link to `/about` is the footer maker credit `PRODUCED BY HOPE2 STUDIO ·
  DIRECTED BY STACEY BRECKEL`, which doubles as the §10 proof-lift trigger. No other footer or
  home element links to `/about`.
- **Remove** the `revealBeat.tail` ("…satirical campaign by Hope2 Studio") and the
  `revealBeat.cta` ("See who's behind it →") from the home — the reveal is `/about`'s payload.
- **`revealBeat.line` — DECIDED: keep it.** "None of these men are real. The problem is very, very
  real." stays as the home's closing beat. It names neither the joke nor the maker — it's the
  campaign's *thesis* (the imagery is fantasy, the problem is real), reads as PSA-sincere, commits
  to the bit, and is the clearest signal to a portfolio-viewing client that the designer understands
  satire-with-a-point. It's the strongest sentence in the section; the *tail* and *cta* were the
  tells, and they're the ones that go. (Optional owner refinement, not required: "The men are a
  fantasy. The problem is very, very real." if "aren't real" feels like too much curtain-peek.)

## Acceptance item — no hardcoded home copy, no killed lines (formalized)

Every symptom in this spec (the "public hygiene initiative" leftover, the reveal-beat tell, the
footer credit) has ONE root cause: the home was built before the copy lane and the commit-to-the-bit
direction existed, so it carries **hardcoded, hand-written copy that bypasses `copy.ts`** and
predates every decision made since. Fixing lines one screenshot at a time will keep missing them.
So this is a binding acceptance item for the home-redo round, not a hope:

1. **No user-facing string is hardcoded in a home component.** Every headline, subhead, caption,
   label, credit, alt text, and aria-label on the home (`homev2/*`, `Masthead`, `Footer`, `Reveal`,
   `Confrontation`, etc.) is sourced from `content/copy.ts`. Structural build labels excepted, but
   they must be flagged.
2. **No killed line survives anywhere in `src`.** The `style-lock.md` kill list — "A public hygiene
   initiative", "Are you the fog?", "The receipts", "Hang him…", "a satirical spec campaign" (on
   campaign surfaces), "See who's behind it" — must not appear in any rendered string.
3. **Every home string matches the frozen deck / register rules.** No campaign-register text on a
   CWAAA surface or vice-versa; the voice invariants hold (CG1–CG6).

**Recommended machine backstop (add when the harness is free — do not hot-edit `gates.mjs` while
Fable is in it):** a **killed-lines gate** that greps `src` for each string on the `style-lock`
kill list and fails if any appears. It's a clean, robust grep and it directly prevents this exact
recurrence — the fourth killed/overshot bit we've caught by eye. Until then, item 2 is a Sol check.

## Gate safety
- `© Stacey Breckel 2025` survives in the credit → **CG6** stays green.
- `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` stays in the footer, not the masthead → **G11** stays green.
- `Funded by Concerned Women Against Axe Abuse` untouched → **CG2** green. Hashtags → **CG1** green.
- No gate requires the parody disclaimer text or its footer location, so relocating it is safe.

## Masthead fiction strings (same round)

The masthead (`components/homev2/Masthead.astro`) **hardcodes** its copy, bypassing `copy.ts` —
which is exactly how a copy-lane-killed line survived a closed copy session. Fix both the content
and the ownership:

- **`Masthead.astro:31` "A Public Hygiene Initiative" — KILLED, replace it.** `style-lock.md §7`
  retired this ("NGO-brochure phrasing") and specified the replacement: a **format-perfect PSA
  credit**, e.g. *"A Public Service Announcement · Funded by Concerned Women Against Axe Abuse."*
  Use the copy lane's line, not this placeholder.
- **Keep** `Est. MMXXIV` (`:30`), `Series One` (`:37`), and `No.&nbsp;26` (`:38`) — intentional
  straight-faced masthead dressing that commits to the bit without tipping satire; "No. 26" echoes
  the CWAAA "Memorandum No. 26-114" (`copy.ts:138`). These are the Onion-style institutional frame.
- **Route the masthead's copy through `copy.ts`** (a `masthead` group) so the copy lane owns these
  strings. Hardcoded masthead copy is the root cause of the killed line surviving; wiring it to the
  content module prevents the recurrence.

## Implementation
- This is a **post-freeze copy change** — log the decision in `docs/copy/style-lock.md`, then edit
  `content/copy.ts` (`footer.credit`, `footer.disclaimer`, new `masthead` strings) and
  `components/Footer.astro` / `components/homev2/Masthead.astro`, and add the disclaimer to the
  `/about` page copy.
- **Fold into the home-redo round** (it already touches the footer/masthead). Not a live standalone
  edit — the worktree has concurrent agents; batch it with the redo.
