# Fable order — Home copy & register consolidation (hand off after Defects 1–3)

Paste with the **Standing Brief** from `docs/build/PROMPT-FABLE.md`. This is the copy/register
cleanup of the home, separate from the visual Defects 1–3 (which are in flight). It is mostly
deletion + rewiring + one owner-approved replacement — you are **not authoring new campaign copy**;
every string here is an owner decision, the copy lane's `style-lock.md`, or a deletion.

**Read first:** `docs/build/reports/footer-consolidation-spec.md` — the full spec. This order is the
work list + definition of done.

## The work

1. **One neutral path to `/about` from the whole home.** The *only* link to `/about` is the footer
   maker credit `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` (which is also the §10
   proof-lift trigger). Remove the other two:
   - `content/copy.ts` `footer.credit` → drop "· A satirical spec campaign by Hope2 Studio →"; keep
     `© Stacey Breckel 2025` (unlinked, or as plain text — the credit link is the maker credit).
   - `homev2/Reveal.astro` + `copy.ts revealBeat` → remove the `cta` ("See who's behind it →") and
     the `tail` ("Got Soap? is a satirical campaign by Hope2 Studio").
2. **Keep the reveal thesis line.** `revealBeat.line` — "None of these men are real. The problem is
   very, very real." — **stays** (decided; it's the thesis, not a tell). Section 7 survives as a
   thesis beat with no meta-reveal and no `/about` cta.
3. **Masthead: kill the leftover, keep the fiction.**
   - `homev2/Masthead.astro:31` "A Public Hygiene Initiative" — a **copy-lane-killed** line
     (`style-lock.md §7`). Replace with the specified format-perfect PSA credit, e.g.
     **"A Public Service Announcement · Funded by Concerned Women Against Axe Abuse."**
   - Keep `Est. MMXXIV`, `Series One`, `No. 26` — intentional straight-faced masthead fiction.
4. **Footer disclaimer → non-affiliation only, relocated.** Reword `footer.disclaimer` to legal
   non-affiliation ("Parody. Not affiliated with any brand, product, publication, or public-health
   organization.") with **no** "satirical spec campaign" reveal phrasing, and move the full reveal +
   disclaimer to the `/about` page. (See spec "Target state".)
5. **Route home chrome copy through `copy.ts`.** The masthead strings (and any other hardcoded home
   copy) move into a `copy.ts` group so the copy lane owns them. This is the root-cause fix.
6. **Hardcoded-copy sweep (binding acceptance item).** Audit **every** user-facing string on the
   home (`homev2/*`, `Masthead`, `Footer`, `Reveal`, `Confrontation`, …) — headlines, subheads,
   captions, labels, credits, alt text, aria-labels — and confirm each is sourced from `copy.ts` and
   matches the frozen deck. **No killed line survives anywhere in `src`** (kill list in
   `style-lock.md`). Report every hardcoded string you find and move it.

## Copy ownership
This is a **post-freeze, owner-approved** change: the removals and the PSA-credit replacement are
owner decisions + the copy lane's `style-lock.md` — log them in `style-lock.md`, don't invent new
voice. The only genuinely new string is the PSA credit; use the `style-lock §7` format verbatim.

## Definition of done
- Exactly **one** `/about` link renders on the home (the maker credit).
- **No** satire tell or hint on the home: grep `src` — none of the `style-lock` kill-list strings
  appear; "A satirical spec campaign", "See who's behind it", "satirical campaign by Hope2 Studio"
  are gone from campaign surfaces.
- The masthead reads `A Public Service Announcement · Funded by …`; `Est./Series/No. 26` intact.
- Every home string is sourced from `copy.ts`; report the ones you moved.
- `npm run gates` and `npm run copy-gates` green (CG1–CG6 hold: `©`, funded-by gag, hashtags intact;
  no killed lines). `npm run build` clean. Verify the home at 390×844 and 1440×900.

## Sol's review focus
One `/about` path; zero satire tell/hint on the home; the reveal + disclaimer live at `/about`;
masthead leftover replaced; **and the sweep is real** — Sol greps `src` for the kill list and spot-
checks that home strings trace to `copy.ts`, not hardcoded markup.
