# Got Soap? — Copy Contract (for the design + build agent)

> ## ⚡ CHANGE LOG — read this first (2026-07-08, apprises parallel agents)
> Since the initial handoff, the following landed. If you started building against earlier copy, reconcile to these:
> 1. **Copy is voice-forward now.** Build from `copy-deck-v2.md` (v1 superseded). New north-star doc: `voice-bible.md` — read before touching any string.
> 2. **New surface content on /crisis:** a **Recovery Case Files** block (§8.6a) — 9 fictional CWAAA "field testimonials," including one short-format entry. Introduces a *third voice* (reformed bro) that is **quarantined to quotes inside CWAAA's document** — never loose elsewhere. Plus a v2 **"Get your own case file" generator** spec (§8.6b) that rides the caption-generator mechanic.
> 3. **Pledge email exists** (§7.7 welcome + §7.8 newsletter template) and the **email backend decision changed** — see PRD §5.4 update: **Buttondown from launch** (not Netlify Forms) because the welcome autoresponder is a v1 requirement. This affects the /pledge form target.
> 4. **Hero:** drag-to-wipe retired → steam auto-clears ~2s. **Verdicts:** no numeric score. (Already in design.md v2.1; restated here so nobody rebuilds them.)
> 5. **Launch date locked: Aug 1, 2026**, with targets in `launch-campaign-v1.md` §8.
> 6. **Asset dependencies for the owner** are now specced in `docs/asset-brief.md` — build against **placeholders** per that doc; do not block on final art.

**One-line:** All site copy is owned by the copy lane. Source of truth: **`docs/copy/copy-deck-v2.md`** (surfaces, voice-forward) + **`docs/copy/voice-bible.md`** (the register — read it first) + **`docs/copy/launch-campaign-v1.md`** (social/GTM). `copy-deck-v1.md` is **superseded — do not build from it.** Pull strings into the single content module (PRD §13). **Do not write copy inline or invent it** — request it from the copy lane and it gets added to the deck. The retired prototype's copy is not a source; anything worth keeping is already in v2.

## Division of labor (avoid duplicate decks)
- **Copy lane (this doc's author):** every user-facing string — headlines, subheads, CTAs, case notes, alt text, quiz, verdicts, pledge/CWAAA fiction, /about, 404, meta, plus the social campaign.
- **Design/build lane (you):** IA, staging, type/motion/registers, components, Astro build, the two SVGs (seal + washcloth ribbon — harvest from the retired prototype), accessibility.
- **Shared seam:** in-fiction utility labels (below) are copy-owned but rendered by you.

## The prototype is reference-only — retired as code
Build fresh in `site/` from `docs/`, not from the prototype DOM. **Harvest before deleting:** the CWAAA seal + washcloth-ribbon SVGs, the register→color mappings, and the SWORN-stamp animation. All copy gems from it are already folded into `copy-deck-v1.md` — don't re-lift copy from the prototype.

## Non-negotiable copy rules (acceptance-blocking)
1. **Voice invariants, verbatim, globally:** subheads open **"Because…"** · primary CTAs open **"Join the movement."** · hashtag stack `#GotSoap · #SoapyThirstTrap · #CleanManEnergy` · sponsor gag **"Funded by Concerned Women Against Axe Abuse"** · `© Stacey Breckel 2025`.
2. **Two authors, never blended on one surface.** Campaign 🧼 (Oswald/Jost, registers) = `/`, `/psas/*`, sniff-test UI, verdict art, share UI. CWAAA 📋 (PT Serif, manila/ink/stamp) = `/crisis`, `/pledge`, verdict *stamps*, 404, footer funded-by line, home letterhead block. A mixed surface is a bug.
3. **Posters shown untouched.** Never re-typeset, crop out, or paraphrase baked-in poster text as if it were the poster. Case notes/alt text *describe* only.
4. **Satire targets behavior + ad tropes, never identity.** Keep the reformed-hero exit open.
5. **Dual-address rule** (the spine — see deck "How to use"): every line knows whether it winks at *him* (PSA/accusation) or *her* (the distribution channel who's lived it); the best lines do both.

## In-fiction utility labels (copy-owned; render these, never a bare "Share")
| Function | Campaign 🧼 | CWAAA 📋 |
|---|---|---|
| Share a spot | Post it in the locker room | — |
| Share a verdict | Issue the announcement | — |
| Copy link | Copy the citation | Copy the case number |
| Download poster | Take one for the wall | — |
| Retake quiz | Request re-assessment | — |
| Submit pledge | — | File my declaration |

## Decisions from the design thread that touch copy (already reflected in the deck)
- **Hero:** drag-to-wipe **retired**; steam auto-clears in ~2s (directional squeegee), live "got soap?" resolves as it clears. Reduced-motion-safe. Hero copy in deck §3.1. *(Overrides design.md §8 — record in HANDOFF decision log.)*
- **Verdicts:** **no numeric score anywhere.** Verdict names are the payload. Completion shows a transient in-fiction beat ("Findings forwarded to the Records Division"), then the verdict page. Deck §6.2b, §6.4.
- **Hero art:** Stacey re-stages Poster 1 widescreen, text-free; build with a token placeholder until it lands (don't cover-crop a canonical poster).

## New since first handoff (flag for build)
- **/crisis gains a "Recovery Case Files" section** (deck §8.6a): CWAAA-filed fictional reformed-man testimonials. Introduces a *third* comedic voice (the redeemed bro) — it is **quarantined to this block, quoted inside CWAAA's document**; never let it loose on other surfaces. The two-author rule still holds (CWAAA authors; the man is a quote). Fine-print disclaimer updated to cover dramatized testimonials.
- **Pledge welcome email + Movement Updates template** exist now (deck §7.7–§7.8). **Plumbing caveat:** Netlify Forms has no autoresponder — send via a Netlify function/webhook or as the first Buttondown broadcast; the CAN-SPAM footer (unsubscribe + physical address) is required and is written in voice.

## Where to find each surface's copy
`copy-deck-v1.md`: §1 global chrome/footer/scratch gag · §2 meta per route · §3 home · §4 /psas + case notes · §5 poster alt text · §6 sniff test + verdicts · §7 pledge (Form CW-1) · §8 /crisis (CWAAA) · §9 /about · §10 404 · §11 QA checklist.

## Before launch
Run deck §11 QA checklist. Zero lorem; all external/social links config-gated (render only when URL set); poster alt text present on every poster (carries the joke, never `alt=""`).

## Note on quality bar
The prototype's copy read "safe/Stepford" because it was written from docs, not from Stacey. The deck is being taken through a **voice-forward pass** (her actual register: the origin rant, pop-culture edge, punch-up satire). Treat `copy-deck-v1.md` as living until the copy lane marks it FROZEN. Build against it, but expect line-level sharpening — that's why copy is centralized in one module.
