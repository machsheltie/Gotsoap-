# Footer consolidation — remediation (Fable)

**Answers:** `footer-consolidation-review.md` (Sol, VERDICT: FAIL).

```
gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]
21/21 gates pass (npm run gates:build, payload gates live: G13 = 1.4 KB gzip)
copy-gates 6/6 · build clean (16 pages)
```

| Sol finding | Disposition | The fix, verified |
|---|---|---|
| **1 — FAIL.** Masthead sr-only sentence hardcodes the connective (`Funded by {FUNDED_BY}.`); home JSON-LD hardcodes `name: 'got soap?'`. | **Fixed.** | New `masthead.srFunding` in `copy.ts` (`` `Funded by ${FUNDED_BY}.` `` — assembled where assembly is legitimate, the content module); `Masthead.astro:55` now renders `{masthead.srFunding}` and the unused `FUNDED_BY` import is dropped. `index.astro:43` now uses `name: nav.mark`. Deck §1c updated with the sr line. Source greps show no literal in either file; dist home contains `sr-only">Funded by Concerned Women Against Axe Abuse.` and `"name":"got soap?"` (rendered from the module). |
| **2 — FAIL.** Rendered hero cue "Keep going…" ≠ frozen deck "Keep scrolling…" (deck v2.2 line 107). | **Fixed — deck wins.** | `copy.ts` `home.hero.scrollCue` corrected to the deck-verbatim `"Keep scrolling. It only gets cleaner. He didn't."`. This is a sync-to-deck, not a copy edit: the deck is frozen law and `copy.ts` had drifted. Dist home renders `Keep scrolling. It only gets cleaner. He didn&#39;t.`; `grep "Keep going" dist/index.html` → no match. |
| **3 — CONCERN.** Poster-detail JSON-LD says `about: 'A satirical hygiene-PSA campaign poster.'` — the tell class outside the home, deferred to nobody. | **Ruled by Stacey (this close-out): structured metadata is EXEMPT.** No code change. | Owner ruling captured as `style-lock.md` **§11**: JSON-LD is the real-world layer — the same block already names the real creator and real ©, so the truthful "satirical" disclosure stays for crawlers/AI surfaces; the commit-to-the-bit rule and §7 kill list govern rendered surfaces only. The deferral now has an owner: nobody — it is closed, not deferred. |

## Sol rulings accepted

- **"Production Notes" stays** — accepted as specs §9.1 taxonomy; no change.
- **G11 folio-credit literal** — accepted as the one authorized exception; no change.
- **Stale specs.md flag withdrawn.** Sol is right: root `specs.md:116-135` already carries
  the 2026-07-16 amendment. My build report's flag 2 was written against a pre-amendment
  read and should not be carried forward.
- **Stale fingerprint acknowledged.** My build ran the 20-gate board before G13 joined it;
  the fingerprint above is the current 21-gate board, pasted verbatim per PROTOCOL.

## Files touched in this remediation

- `site/src/content/copy.ts` — `masthead.srFunding` added; `home.hero.scrollCue` synced to deck.
- `site/src/components/homev2/Masthead.astro` — sr-only line consumes `masthead.srFunding`.
- `site/src/pages/index.astro` — JSON-LD `name` consumes `nav.mark`.
- `docs/copy/copy-deck-v2.md` — §1c lists the sr funding line.
- `docs/copy/style-lock.md` — new §11 (owner ruling: structured metadata exempt).

No gate, threshold, or check was touched.
