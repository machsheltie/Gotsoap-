# Roadmap — CWAAA diverges into its own site (the crack in the fifth wall)

**Status: FUTURE.** Do not build now. Owner: "a 'once we finish what we're currently trying to achieve
through Phase 6' thing." Captured here so the vision is durable, not lost in chat.

## The move
Concerned Women Against Axe Abuse stops being a device *inside* the Got Soap? site and becomes its own
site at its own address. The two universes formally separate:

- **Got Soap?** stays lean and single-minded: a campaign to get men to **take the damn shower.**
- **CWAAA** (its own domain) absorbs the heavy procedural material: the government-style released
  documents, the crisis info, the Pledge, the case-files section, and **"Adopt a Low-Effort Bro"**
  (to be renamed).

## The links (where the mirror slips)
CWAAA is surfaced from Got Soap? at three seams:
- Footer: **"Sponsored by Concerned Women Against Axe Abuse"** (replacing / beside the funded-by gag).
- **"Want to learn more?"** at the end of the Sniff Test.
- **"Want to learn more?"** on the Pledge.

These links are deliberately **the crack in the fifth wall** — the point where a delighted visitor
follows the sponsor out of the campaign and into something that is *too* real, too invested, too
procedurally sincere about a joke. A beat of **dark humor / low-grade horror**: *something I can't quite
put my finger on is wrong here.* The sponsor is not winking. The sponsor means it.

## Why it makes Got Soap? stronger
1. **It resolves a register tension the blind readers already felt.** The CWAAA paperwork is repeatedly
   the strongest writing on the site (Priya: she'd hire "for the paperwork, not the posters"), but
   government-style released documents sit slightly oddly on a site that presents as a shower campaign.
   Moving them to CWAAA's own site makes each surface coherent: Got Soap? campaigns; CWAAA files.
2. **It gives the case files a proper home.** Maya flagged the case files over-centering men's redemption
   arcs on the campaign site. On CWAAA's own site — a body that *does* crisis intervention — the
   dossiers, the adopt-a-bro program, and the recovery files belong by definition.
3. **It's a CD flex.** Holding the reins across a two-site universe — campaign voice on one domain, a
   competent-nonprofit voice on another, linked at a single uncanny seam — demonstrates world-building
   depth and range far beyond a single clever site. It is the portfolio argument, made structural.

## Design notes for when it's tackled
- The seam is the whole trick: the transition from Got Soap? (playful, hot) to CWAAA (procedural, sincere,
  faintly wrong) has to *land the tonal drop* as intentional dread-comedy, not as a broken link to a
  duller site. The uncanny is the product.
- Two domains = two footers, two legal surfaces, two `SITE_URL` constants. The existing
  "all external links live in one config module, rendered only when non-empty" pattern already
  accommodates a CWAAA URL that's empty until the site exists.
- Rename "Adopt a Low-Effort Bro" before it ships anywhere.
- The two-author rule holds across domains, not just pages: Got Soap? never files paperwork; CWAAA never
  smolders. The seam is the only place they touch.

## Not now
This is post-Phase-6. Current priorities finish first: the faux shop + legal pages, vector-2 spec, and
whatever the shop blind read surfaces. This file is the placeholder that keeps the idea intact.
