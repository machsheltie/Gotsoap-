# Phase 5 remediation — response to the adversarial review

**Executor:** Claude Fable 5 (Lead Developer)
**Date:** 2026-07-16
**Review:** `phase-5-review.md` — VERDICT: PASS, 0 FAIL, 1 CONCERN + 2 report-accuracy notes

```
gate-set: 20 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G14 G15 G18 G17 G16]
19/20 gates pass  ·  1 WAIVED debt (G7c)  ·  payload gates skipped (use --build)
Phase 5 is clean. Hand off to review.
```

`npm run build` after remediation: **16 pages, no errors.**

| # | Finding | Disposition | What changed |
|---|---|---|---|
| 1 | **CONCERN — G18 never inspects the page consumers** (`gates.mjs:488`: `hubPage` read, never used; a stray comment naming the constant would keep the gate green while the picture/selector drank from a different query) | **Accepted — fixed** | `site/scripts/gates.mjs` G18 now uses `hubPage` to require both §4.2-named consumers in the hub page itself: `media={PLACEMENT_HUB_WIDE_MEDIA}` on a `<source>`, and a `matchMedia(PLACEMENT_HUB_WIDE_MEDIA)` call. Missing page = FAIL. The PASS message now states only what is established: "exported once, consumed by `<source media>` and `matchMedia()`, no raw literal". Commented in the harness's hole-fix style, credited to this review. **Red-tested, not assumed:** against the real page both checks find their consumer; against a mutant with the source binding swapped for an orientation query the gate flags it; same for a mutant with a hard-coded `matchMedia` string; a comment-only mention satisfies neither regex. Known loud-failure mode, deliberate: if a refactor legitimately moves the selector out of `index.astro`, G18 goes red and the gate is updated consciously — a false red beats a silent false green. |
| 2 | **Note — the slug "tripwire" is one-directional** (`index.astro` mapped the wide array only; an extra portrait-only slug would be silently ignored, so the build report's "any disagreement throws" overclaimed) | **Accepted — fixed** | `index.astro` now also throws when `portraitBySlug.size !== placementHub.wide.length`, so a portrait-only extra slug (or a portrait duplicate masking a missing entry) fails the build with a message naming both counts. Combined with the per-slug lookup, the two arrangements must name the same five posters in both directions. The report claim is now true of the code. |
| 3 | **Note — `gates.mjs` / `distinguishability.mjs` untracked in the repo baseline** (git cannot prove their historical cleanliness) | **Out of my lane — flagged to the arbiter** | Tracking the harness in git is a repo-hygiene call for Stacey (the working tree has substantial untracked tooling: `.claude/`, `site/scripts/`, `docs/build/`). Recommend `git add site/scripts/` at the next commit so future reviews can diff the harness; I have not staged anything (repo caution rules). |

Also absorbed since the build report: the copy lane's consensus label landed in `index.astro` — the plaque nav is now `aria-label="The five announcements"` (replacing my flagged "Installation route list" default). Rebuilt and confirmed shipping in `dist/psas/index.html`. No component logic depended on the string; the phase-5 copy flag is closed.

No previously-green gate moved: same 19/20 + G7c waiver, exit 0.

---

# Round 2 — response to the close-out FAIL

**Executor:** Claude Fable 5 (Lead Developer)
**Date:** 2026-07-16
**Close-out:** appended to `phase-5-review.md` — two findings NOT RESOLVED.

| # | Close-out finding | Disposition | What changed |
|---|---|---|---|
| 1 | **G18 still accepts commented-out consumer syntax, and `media={…}` on a non-`<source>` element** (`gates.mjs`: raw unparsed source; `<!-- <source media={PLACEMENT_HUB_WIDE_MEDIA}> -->` + `// matchMedia(PLACEMENT_HUB_WIDE_MEDIA)` returned CommentOnlyPasses: True; `<div media={…}>` returned NonSourceElementPasses: True) | **Accepted — fixed** | Added a shared `stripComments()` helper to the harness (strips HTML `<!-- -->`, Astro/JSX `{/* */}`, JS block `/* */`, and JS line `//` — the line-comment regex requires the `//` not be preceded by `:`, sparing `https://` URLs; over-stripping can only produce a false red, never a false green). G18 now tests only the stripped source, and the `<source>` predicate is anchored inside a tag: `/<source\b[^>]*\bmedia=\{PLACEMENT_HUB_WIDE_MEDIA\}/` — `[^>]*` cannot cross a `>` so a media attribute on any other element no longer counts. Both FAIL messages now say "no live …" and name the exclusions. **Red-tested against Sol's exact counterexamples:** Mutant A (real consumers removed; comment-only `<!-- <source media={…}> -->` + `// matchMedia(…)` inserted) → G18 FAIL on both predicates, exit 1. Mutant B (`<div media={PLACEMENT_HUB_WIDE_MEDIA}>` + real `matchMedia` kept) → G18 FAIL on the source predicate only, exit 1. Real page → PASS, 19/20 + G7c waiver, exit 0. |
| 2 | **Slug tripwire still accepts a duplicated wide slug that silently omits another poster** (`index.astro`: wide `[a,a,c,d,e]` vs portrait `[a,b,c,d,e]` passed the size comparison and every wide lookup; direct simulation returned tripwirePasses: true) | **Accepted — fixed** | `index.astro` now derives both slug lists and throws on (a) any duplicate **within either arrangement** — each poster must be placed exactly once — and (b) any **symmetric set difference** between the two arrangements, naming the missing slugs in each direction. The per-lookup throw remains as a backstop. **Red-tested:** direct simulation of the shipped logic — Sol's counterexample `[a,a,c,d,e]`/`[a,b,c,d,e]` THROWS (duplicate `a` in wide); portrait-only extra THROWS; portrait duplicate THROWS; wide-only extra THROWS; reordered-but-equal and identical sets pass. **Real red build:** `placement-hub.ts` mutated to Sol's exact shape (wide duplicates `confident-man`, dropping `soap-smoldering`) → `npm run build` exits 1 with `placement-hub.ts: duplicated hotspot slug(s) — wide: [confident-man] …`. Mutation reverted. |

**Fresh green verification after both fixes:** `node scripts/gates.mjs --phase 5` → 19/20 pass + G7c waiver, exit 0. `npm run build` → 16 pages, exit 0. `node scripts/gates.mjs --build` → "All gates green", exit 0, G7c the only waiver. No threshold touched; no previously-green gate moved.
