# Order — promote the killed-lines VALUE gate to CG7 (live)

**Why now.** Six adversarial rounds produced a sound value gate (`small-fixes-build.md` Appendix A),
and it currently enforces **nothing** — it lives in a markdown appendix, not in `site/scripts/`, not
in `package.json`, not in any suite. Fable deferred promotion honestly, for a good reason: *"harness
not free"* (chrome unification in flight + the collision that once broke `gates.mjs`).

**That blocker has expired.** Chrome unification is closed and verified; the harness is uncontended.
Promote it or the work stays inert. It is the 4th eye-caught killed line — it belongs on the machine
floor.

**Scope:** promotion + runtime hardening only. **Do not redesign the gate.** Sol's R5 ruling
(value/render assertion, text scanner retired) is settled and is not reopened.

---

## 1. Lift Appendix A into `copy-gates.mjs` as **CG7**

It's a copy invariant, so `copy-gates.mjs` is the right home (not `gates.mjs`). Preserve both layers
exactly as ruled:

- **Deck layer** — import `copy.ts`, recursively walk every exported string, flag killed phrases.
  Sanction **by exact path** (`about.credit` / `default.about.credit`), **never suffix-matched**, so a
  smuggled `masthead.about.credit` still violates.
- **Render layer** — sweep `dist/**/*.html`; the sanctioned sentence is legal **only** in
  `dist/about/index.html`. This is the definitional check and catches strings that never touched
  `copy.ts`.
- Retire the text scanner: **not promoted in any form**, retained only in git history.

*(Verified by Opus 2026-07-20: `copy.ts` is genuinely dependency-free, has no module-scope side
effects, and imports cleanly — 21 exports. The design's load-bearing assumption holds.)*

## 2. **A gate that cannot run must FAIL LOUD, never green** ← the critical requirement

The gate imports a `.ts` file and needs type-stripping (native Node ≥23; `--experimental-strip-types`
on 22.x). Fable verified on **Node 24**; Netlify pins **22.12.0**. That flag form is currently
*asserted, not tested.*

The real danger is not a crash — it's a gate that silently checks nothing and reports **green**. This
codebase has already been bitten by exactly that (G13 vacuously reporting `0.0 KB` until the
measurement hole was caught).

**Required:**
- CG7 must **detect** that it could not load/walk the deck and **exit non-zero with an explicit
  error**. Never pass, never skip silently, never report green on an unloadable deck.
- Assert the walk actually saw content (e.g. exports > 0 and strings > 0). A zero-string walk is a
  **failure**, not a clean pass.
- State the runtime requirement explicitly in the gate header and fail with an actionable message
  naming the required Node version and flag.

## 3. Verify on the pinned runtime (22.12.0)

Run CG7 under **Node 22.12.0** (nvm/fnm), not just Node 24.
- If the flag form works there → note it verified, done.
- If it does not → **do not weaken the gate.** Declare CG7's runtime requirement (Node ≥23 or the
  correct 22.x flag) and make it fail loud per §2. Gates are a dev/CI tool; they do **not** have to
  share the Netlify build's Node, since `netlify.toml` runs only `npm run build`. Document the split.

## 4. Acceptance tests — port all five, they are the contract

Preserve Fable's five, **including Sol's R5 attack verbatim**:

| # | Test | Required result |
|---|---|---|
| T1 | real deck + real dist | exactly 2 exempts (`about.credit`, `dist/about/index.html`) · 0 violations · exit 0 |
| T2 | Sol R5: template literal faking `export const about = {` + smuggled killed value | DECK VIOLATION at `masthead.smuggled` · exit 1 |
| T3 | path spoof: nested `masthead.about.credit` | DECK VIOLATION · exit 1 |
| T4 | value smuggled into `masthead` + `home` | 2 DECK VIOLATIONs · exit 1 |
| T5 | killed line injected into a campaign page's built HTML | DIST VIOLATION at `dist/home`, `dist/about` exempt · exit 1 |

Plus one new: **T6 — unloadable deck / wrong runtime → exit non-zero with explicit error, never green.**

## 5. Harness exclusivity — non-negotiable

**One session only holds the harness.** Do not hot-edit `copy-gates.mjs` while another session is in
it; that collision broke the gate script once already. Confirm no other lane is editing it before
starting, and don't run this concurrently with the Phase-4 copy redo.

## 6. Close-out

- `npm run copy-gates` → **7/7** (CG7 live)
- `npm run gates` → **20/20** unchanged
- `npm run build` → clean, 16 pages
- All six tests pass; document the disclosed limit (dist sweep is substring-based, so a phrase split
  across markup evades — the deck assertion covers deck-sourced cases regardless).
- Append results to `small-fixes-build.md`; mark Appendix A **PROMOTED — live as CG7**.

---

## Then: Sol's round 7 — confirmation, and the last round on this item

This argument has **converged**. Sol's R5 ruling dissolved the attack class rather than patching it;
that is a categorical change from rounds 1–3. Round 7 is a **confirmation pass on the promotion**:
does CG7 as-shipped match the ruled design, do all six tests hold, does it fail loud on a bad runtime?

- A genuine **new escape against the value gate** would be meaningful — take another round.
- **Nitpicking settled design or re-litigating the retired scanner** is the signal to close.

Either way, **round 7 is the last on this item.** The argument is won; ship the artifact.
