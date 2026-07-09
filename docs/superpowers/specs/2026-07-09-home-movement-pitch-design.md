# Home page — "Movement Pitch" re-architecture (design spec)

**Status:** PROPOSAL — awaiting owner approval. No code until approved.
**Date:** 2026-07-09 · **Governs:** `docs/design-north-star.md` (the law) + this spec (the home's structure).
**Why this exists:** every prior home build — SaaS, dark-bunker, bright-glossy — kept the same skeleton
(`hero → poster+caption ×5 → CTAs`). That skeleton *is* a gallery of the five ads. The owner's
consistent note: **the home must SELL THE MOVEMENT, not display the posters.** This spec changes the
*architecture*, not the paint.

## The one-line change
**The five-poster gallery leaves the home and moves to `/psas`** (that page is literally "The PSAs").
The home is rebuilt around the movement's **argument** — you should leave *recruited*, not like you
browsed a portfolio. The home borrows exactly **one** poster as flagship propaganda.

## The new scroll (each section: distinct purpose + distinct composition — no repeated module)

1. **THE COLD OPEN (hero).** The movement announces itself — bright, high-fashion, seductive.
   `got soap?` wordmark + a provocation that implicates the visitor
   (*"There is a fog. It is coming off the man beside you."*) + institutional signature
   (*A public hygiene initiative · funded by CWAAA*). One seductive image. **No "SPOT NO. 1."**
   *Job:* sell the attitude in 3 seconds. *Copy:* deck hero lines + a new provocation (copy-lane).

2. **THE CASE.** Why the movement exists — the deadpan crisis as an editorial manifesto: the demand
   (*"Soap. Applied to men. Regularly."*) + 2–3 absurd findings at monumental scale
   (*"73% of body-spray applications occur in lieu of a shower."*). *Route:* **Read the full findings →** `/crisis`.
   *Copy source:* existing deck §8 findings + scale line (reassembled).

3. **THE CAMPAIGN.** ONE monumental, full-bleed, cinematic poster as the movement's flagship
   propaganda (*"This is what clean looks like."*) + a single route: **See all five announcements →** `/psas`.
   The gallery lives *there*, not here. One hero image, never five rows. *Copy:* new one-liner + link.

4. **THE CONFRONTATION.** *Are YOU the fog?* The Sniff Test as the interactive heart — second-person,
   seductive, provocative. The viral loop. *Route:* primary CTA → `/sniff-test`. *Copy:* deck §3.3/§6 hooks.

5. **THE OATH.** Join. *"Two million women have had enough. Put your name on it."* The conversion.
   *Route:* → `/pledge`. *Copy:* deck §3.5 pledge-band lines.

6. **THE MOVEMENT IS REAL.** Scale + belonging: *"Chapters in all fifty states. One demand,"* + one
   converted-man testimonial (a Recovery Case File snippet) as social proof. *Job:* you want in.
   *Copy source:* deck §8.4 scale + §8.6a case files.

7. **THE QUIET REVEAL → footer.** One subtle line to `/about` (the page-three punchline). Disclaimer
   buried in the footer. **No mid-scroll apology** ("None of these men are real" → footer fine print only).

## Structural deltas (what actually fixes the "gallery" problem)
- **Home no longer enumerates the 5 posters.** `Spot.astro` × 5 is removed from the home; `/psas`
  becomes the poster gallery (index already exists — it gets the archive treatment).
- **The movement's argument (case → confrontation → oath → scale) is the spine**, not a strip under a gallery.
- **Every section is a different job and layout** → the template-×5 is impossible by construction.
- The home borrows **one** poster (section 3) as propaganda; the other four are only on `/psas`.

## Aesthetic (unchanged from North Star Round 3)
Bright, glossy, elite HIGH-FASHION editorial — the real "Got Milk?" soul in bright studio light ×
Vogue/GQ. Seductive + deadpan. Not SaaS, not dark-bunker. Full auto-reject list in `design-north-star.md`.

## Scope
- **In:** re-architect the home (`site/src/pages/index.astro` + new/retired home section components);
  ensure `/psas` carries the poster gallery. Reuse: tokens, fonts, two-author fiction, a11y, Buttondown,
  the pledge certificate + `/crisis` dossier work (unchanged).
- **Out:** new posters (uses existing 5 — one as hero propaganda, five on `/psas`); other routes' logic;
  copy invention (see below).
- **Copy dependency:** the home needs re-assembled copy for the new sections. Nearly all raw lines exist
  in the frozen deck (findings, demand, scale, sniff/pledge/hero hooks); a copy-lane pass reassembles them
  into the new home structure + writes the section-1 provocation and section-3 propaganda line. Design builds
  against institutional placeholders until the copy-lane confirms.

## Open questions for the owner
1. Approve this architecture (or steer sections)?
2. Section 3 — one **hero poster** as propaganda, or a tight **cinematic teaser** of the campaign
   (a single striking montage frame) linking to `/psas`? (Both avoid the five-in-a-row gallery.)
3. Who builds it — this session's agent team, or hand this spec to Antigravity so both build the *same* home?
