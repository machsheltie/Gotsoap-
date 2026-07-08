# Copy Handoff → Orchestrator / Build Swarm

**Status: copy is FROZEN and ready to implement (2026-07-08).** This brief tells you what changed since the PRD/design.md were written and what the swarm must consume. Route it to every implementer alongside the PRD and design.md.

## Read order for anyone touching user-facing text
1. `docs/copy/copy-contract-for-build.md` — **start here.** Rules of engagement + the ⚡ CHANGE LOG at the top.
2. `docs/copy/voice-bible.md` — the register. Read before writing/altering any string.
3. `docs/copy/copy-deck-v2.md` — **the source of truth for every string on the site** (FROZEN). `copy-deck-v1.md` is superseded — ignore it.
4. `docs/copy/launch-campaign-v1.md` — social/GTM + the §2A conversion strategy. Post-launch, not build-blocking, but the §2A "never a roast without a visible door" rule constrains verdict-page layout.
5. `docs/asset-brief.md` — owner's Photoshop deliverables + the **placeholder strategy** (build does not block on final art).

## What changed since the PRD/design.md snapshot
1. **All copy is voice-forward and FROZEN** in `copy-deck-v2.md`. Build from it verbatim; do not paraphrase or invent strings.
2. **New /crisis content:** a **Recovery Case Files** block (deck §8.6a) — 9 fictional CWAAA "field testimonials." Introduces a *third voice* (reformed bro) **quarantined to quotes inside CWAAA's document** — never elsewhere. Plus a **v2 "Get your own case file" generator** spec (§8.6b, rides the caption-generator mechanic — not v1).
3. **Pledge email backend changed → Buttondown from launch** (PRD §5.4 updated). The /pledge form subscribes to Buttondown; welcome email = deck §7.7; newsletter = deck §7.8. `BUTTONDOWN_API_KEY` in env. This supersedes the old Netlify-Forms-in-v1 plan.
4. **Hero:** steam auto-clears (~2s), drag-to-wipe retired. **Verdicts:** no numeric score. (Already in design.md v2.1 — restated so nobody rebuilds them.)
5. **Launch date: Aug 1, 2026;** targets in launch-campaign §8.

## Content module — DELIVERED (import it; do not re-extract)
The copy lane has already built the typed content module: **`site/src/content/copy.ts`** — every user-facing string, verbatim from the frozen deck. **Import from it; do not hardcode strings in components and do not re-type from the markdown deck.**
- It is aligned to the existing **`site/src/config/site.ts`** (the build agent's file, left untouched): poster **structural** metadata (order, register, title, source file) stays in `site.ts` `POSTERS`; `copy.ts` `posterCopy` holds only the **strings** (pull quote, case note, alt), keyed by slug. **Zip the two by slug.** Registers use `porcelain | smoke | marble` (matches `site.ts`).
- `copy.ts` covers: nav, footer, scratch gag, per-route meta, home, `posterCopy`, `psas`, `sniffTest` (questions + scoring bands + verdicts), `pledge` (form + welcome email + newsletter), `crisis` (findings, ribbon, press room, 9 case files, v2 generator, fine print), `about`, `notFound`, shared `labels` (in-fiction utility labels), `HASHTAGS`/`FUNDED_BY`/`COPYRIGHT`.
- If any string needs changing: edit `copy-deck-v2.md` first, then update `copy.ts` — never edit strings straight into components.

## Acceptance-blocking (do not ship without)
- Voice invariants verbatim, every page: `Because…` subheads · `Join the movement.` primary CTAs · `#GotSoap · #SoapyThirstTrap · #CleanManEnergy` · `Funded by Concerned Women Against Axe Abuse` · `© Stacey Breckel 2025`.
- Two-author split never blended on one surface (🧼 campaign vs 📋 CWAAA); the reformed-bro voice stays quarantined to case-file quotes.
- Posters shown untouched; every poster + verdict has voice-carrying alt text (deck §5).
- In-fiction utility labels (never bare "Share") — deck "Read first" table.
- Placeholders for all owner art per `asset-brief.md`; verdict pages ship with a card (even placeholder) so OG previews work.
