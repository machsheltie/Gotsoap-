# Footer consolidation — Adversarial Review

**VERDICT: FAIL**

`gate-set: 21 gates [G1 G2 G2b G3 G4 G5 G6 G7 G7c G7b G8 G9 G10 G11 G12 G13 G14 G15 G18 G17 G16]` · 21/21 pass · exit 0. `copy-gates` is 6/6 and the build produces 16 pages, but the binding copy-ownership sweep and frozen-deck check each have surviving counterexamples.

## Violations

| # | Severity | Spec clause | file:line | The violation |
|---|---|---|---|---|
| 1 | **FAIL** | `footer-consolidation-spec.md` acceptance item 1 (`:80-83`); `style-lock.md` §10 root-cause rule (`:60`) | `site/src/components/homev2/Masthead.astro:55`; `site/src/pages/index.astro:43` | The claimed “every home string routes through `copy.ts`” sweep is incomplete. The masthead still emits screen-reader copy from a hardcoded connective: `Funded by {FUNDED_BY}.` This is user-facing AT copy and a campaign voice invariant, not a structural build label; `copy.ts:99` even contains the swept-in `fundedByLead` value that this element bypasses. The home JSON-LD also hardcodes `name: 'got soap?'` rather than consuming the content module, and it is not flagged as a structural exception. The only authorized literal exception is the G11 folio credit in `Footer.astro`. The defect class therefore survives in accessible and machine-facing home copy. |
| 2 | **FAIL** | `footer-consolidation-spec.md` acceptance item 3 (`:87-88`): every home string matches the frozen deck | `site/src/content/copy.ts:146`; rendered by `site/src/components/homev2/Hero.astro:77`; conflicts with `docs/copy/copy-deck-v2.md:107` | The live hero scroll cue says **“Keep going. It only gets cleaner. He didn't.”** The frozen v2.2 deck says **“Keep scrolling. It only gets cleaner. He didn't.”** Similar intent is not verbatim agreement. This is a visible home string, so the submitted sweep cannot claim deck parity until the copy lane or owner reconciles which wording is authoritative. |
| 3 | CONCERN | `specs.md` §2 (`:23,29,33`) — `/psas/[slug]` immerses while `/about` owns the reveal; `style-lock.md` §7 commit-to-the-bit rule (`:40-42`) | `site/src/pages/psas/[slug].astro:68` | The poster-detail JSON-LD declares `about: 'A satirical hygiene-PSA campaign poster.'` on every immersive campaign route. It is not visible page text, but it is shipped, machine-readable page content that crawlers and search surfaces may expose; it says the word the new fiction-first policy is designed to withhold until `/about`. “Out of scope” does not identify a later owner, and this post-freeze pass has nowhere later to defer it. Stacey must explicitly rule that structured metadata is exempt, or the same tell class remains outside the home. |

- **FAIL** — violates a binding acceptance item and blocks this pass.
- **CONCERN** — the scope argument is defensible, but the result conflicts with the governing route fiction and requires an explicit ruling.

## Rulings on Fable's submitted flags

- **“Production Notes” stays — accepted.** Current `specs.md:127-130` expressly preserves this intentional contents-dialog entry, and §9.1 (`:249-256`) requires it. At rest the built home has three `/about` anchors, but both contents copies have 0×0 rendered boxes; the footer folio credit is the only rendered link. Opening the dialog makes its “Production Notes” exit visible by user intent, exactly as the amendment allows.
- **The claimed `specs.md` contradiction is already resolved in this worktree.** Root `specs.md:116-135` now carries the 2026-07-16 amendment moving the disclaimer, retaining only the thesis line, and defining the one visible path. Fable's report flag is stale, not a live spec blocker.
- **The G11 literal exception is accepted.** `specs.md:131-133` now expressly authorizes the folio credit to remain hardcoded in `Footer.astro`, and the current gate still checks that exact source literal. This narrow exception does not extend to the masthead's AT sentence or home metadata.

## Rendered verification

- **390×844:** the unsolicited home experience contains no “satirical,” “See who,” or “public hygiene initiative” text. The thesis beat renders only “None of these men are real. The problem is very, very real.” and has zero links. The footer shows the funded-by seam, plain © line, one folio link, and no disclaimer. `/about` renders the reveal credit and the complete non-affiliation line without overflow.
- **1440×900:** the masthead renders `Est. MMXXIV`, the PSA credit, `Series One`, and `No. 26`; its no-break space keeps the middot on the first wrapped line rather than hanging at the start of the next. The opened contents dialog exposes “Production Notes” as intentional taxonomy. The thesis/footer composition and `/about` legal block are readable and unbroken.
- **1920×1080:** the changed masthead remains intact. Its clip-painted nameplate has 59.84px line-height plus 6.53px block clearance, and the `g`/`p` descenders render fully; the longer credit does not collide with the nameplate or right flank.

## Harness check

`npm run gates:build` rebuilt 16 pages and exited 0 with 21/21 gates. `npm run copy-gates` exited 0 with 6/6 invariants. The submitted 20-gate fingerprint is stale because the current board includes G13; the additional gate passes at 1.4 KB gzip home JavaScript. `site/scripts/gates.mjs`, `copy-gates.mjs`, and `distinguishability.mjs` are clean against `HEAD`; no threshold, waiver, or check was weakened. G14 still reports the four development stand-ins and promises a production failure until owner art replaces them.

## What Fable's build report did not tell me

The report calls the hardcoded-copy sweep complete while disclosing the masthead's hardcoded AT sentence as if “assembled from a constant” satisfied the source-of-truth rule. It does not: the connective is the copy, and it bypasses the new `fundedByLead` entry. The report also never compares the rendered hero cue against the same v2.2 deck it says is synchronized, so it misses the `going`/`scrolling` split. Finally, the report says `specs.md` still needs amendment even though the canonical file in the reviewed worktree already contains the amendment; that flag should not be carried forward.

## Close-out verdict — PASS

> **Transcribed by the arbiter (Opus), 2026-07-17.** Sol reached this verdict but its Codex
> sandbox could not write across the Windows split-root (the repo-rooting hazard noted in
> CLAUDE.md). Rather than approve an unsandboxed write in Sol's environment, the arbiter — who
> holds authorized file access in this worktree — recorded the verdict and independently
> re-verified every metric below. Verdict authorship: Sol. Verification: arbiter.

| Finding | Ruling |
|---|---|
| #1 | **RESOLVED.** |
| #2 | **RESOLVED.** |
| #3 — `/psas/[slug]` JSON-LD `about: "A satirical hygiene-PSA campaign poster."` | **CONCEDED** under the owner's §11 metadata ruling: invisible structured data is not a user-facing tell, and accurate parody categorization is prudent for SEO/legal (a search engine should file this as parody, not real health advice). Kept intentionally. |

**Arbiter re-verification (2026-07-17):**
- `npm run gates --build`: **21/21**, exit 0. G13 passes at 1.4 KB gzip home JS (the 20-gate
  fingerprint Sol saw was the source-only run; the build-aware board includes G13).
- `npm run copy-gates`: **6/6** invariants hold.
- `npm run build`: 16 pages, exit 0.
- Harness diff vs `HEAD` on `gates.mjs` / `copy-gates.mjs` / `distinguishability.mjs`: **clean** —
  no threshold, waiver, or check weakened.
- Deferred-to-nowhere: **none**. G14 still hard-fails `--prod` on the four dev stand-ins (owner art).

**Home copy/register consolidation (task #2): CLOSED.**
