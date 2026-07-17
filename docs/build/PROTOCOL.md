# Build Protocol — the two-model loop

**Spec under construction:** `specs.md` (Codex Sol, 2026-07-14, approved)
**Baseline at protocol start:** 3 / 13 machine gates passing

## The three roles

| Who | Role | Authority | Never does |
|---|---|---|---|
| **Claude Fable 5** | Lead Developer (Executor) | Writes and edits everything under `site/src`. Owns the build. | Never rewrites campaign copy in `content/copy.ts`. Never marks its own work as passing. |
| **Codex Sol 5.6** | Adversarial Critic | Reads the worktree, runs greps, writes review reports under `docs/build/reports/`. | **Never edits `site/src`.** Never proposes patches. Names violations; does not fix them. |
| **Stacey (you)** | Owner / Arbiter | Breaks ties. Makes owner-reserved calls. Delivers the blocked Photoshop assets. | — |

The critic never writes code. The moment Sol edits `src/`, it starts reviewing its
own work and the adversarial value collapses to zero. Sol reports. Fable fixes.

## Why there's a machine gate

`npm run gates` (`site/scripts/gates.mjs`) decides every §14 acceptance gate a
machine *can* decide — units, crops, taxonomy, component counts, payloads,
reduced-motion branches. It cites `file:line` and exits non-zero.

This exists to protect Sol's attention. A critic that spends its reasoning
re-deriving "is there a `100vh` in here?" is a critic wasting the only thing it's
good for. **Gates must be green before Sol is invoked.** Sol's budget goes
entirely to the gates a machine *cannot* decide — above all:

> Are these five poster environments genuinely five environments, or one
> component wearing five hats?

That is the failure this whole loop exists to catch.

## The loop

```
  ┌─ 1. Fable builds one phase (spec section)
  │
  ├─ 2. Fable runs `npm run gates:phase N` + `npm run build` until BOTH are green
  │       └─ still red? Fable keeps going. Sol is NOT called.
  │
  ├─ 3. Fable writes  docs/build/reports/phase-N-build.md
  │       └─ pastes the `gate-set:` fingerprint verbatim
  │
  ├─ 4. Sol AUDITS    → docs/build/reports/phase-N-review.md
  │       └─ per-finding PASS / FAIL / CONCERN, each with file:line + spec clause
  │
  ├─ 5. Any FAIL or CONCERN?
  │       └─ Fable remediates → docs/build/reports/phase-N-remediation.md
  │          Disagreement? → Stacey arbitrates. The SPEC wins, not the model.
  │
  ├─ 6. Sol CLOSES OUT  → appends the close-out verdict to phase-N-review.md
  │       └─ re-verifies the remediation ITSELF. Not the original claim — the FIX.
  │
  └─ 7. Phase closes only when gates are green AND Sol's close-out is FAIL-free.
```

### Why there are two Sol passes

**Step 4 audits the work. Step 6 audits the repair.** They are different jobs and the
second is not ceremonial.

The remediation is the least-reviewed code in the whole loop: it is written under
pressure to close a phase, against findings Fable may have only half-accepted, and — if
nobody looks — it is the one diff that reaches `main` having been read by exactly one
model. A fix that is wrong, partial, or that quietly rewrites the finding into something
easier to satisfy is invisible without a second pass.

This is not hypothetical. The Phase 1 close-out was run informally, as an afterthought,
and immediately caught a discrepancy nobody else had seen. It is now mandatory.

**The close-out is narrow.** Sol does not re-audit the phase. It answers three
questions and stops:

1. Does each remediation actually resolve the finding it claims to resolve — or does it
   resolve a *weaker* restatement of it?
2. Did the fix break anything that was previously green? (Gates + build.)
3. Is anything deferred forward genuinely **owned by a later phase** in the table below —
   or is it deferred to nowhere? *"A later phase will fix it" that no phase owns is how
   violations ship.*

If a finding was **contested** rather than fixed, Sol rules on the argument. It may
concede. A critic that never concedes is a critic nobody can reason with.

## Phases

Sequenced so that everything **not** blocked on Photoshop deliverables ships first.

| # | Phase | Spec | Machine gates | Blocked? |
|---|---|---|---|---|
| **1** | **Hygiene sweep** — `100vh`→`svh`, kill canonical `cover`, retire `SPOT NO.`, steam once-per-*session*, reduced-motion branches | §5.1, §9.2, §3.1, §6 | G1, G2, G2b, G3, G9, G12 | no |
| **2a** | **Poster geometry — structure.** Five explicit environment components, five **mobile** signatures at 390×844, `[slug]` becomes a pure orchestrator. **Stops before desktop.** | §5, §6 | G4, G5, G15 | no |
| **2b** | **Poster geometry — desktop.** Desktop composition and polish, on a structure Sol has already ratified. | §5.1 | (2a's, held) | no |
| **3** | **Home promotion** — `/movement-preview` → `/`, Case/Oath/Movement signatures, §3.2 recomposition (equal rows → unequal zones), kill canonical-poster hero washes, **flagship → Unholy**, **maker credit → footer-only**, steam decision → `<head>` | §3 | G6, G7, **G7b**, G11, **G16** | soft — token stand-in allowed (§3.1) |
| **4** | **Interaction contracts** — quiz tap-to-advance island, native `<dialog>` contents sheet | §8, §9.1 | G10 | no |
| **5** | **Placement hub** — one composite installation at `/psas` | §4 | G8, G14 | build: no · **ship: needs the real composites** |
| **6** | **Proof lift + performance** — `/about` view transition, payload budgets, full §14 audit | §10, §11 | G13 | no |

**Phase 2 is the marquee**, and it is split for a structural reason, not a cautious one.

`npm run distinguish` measures §14's neutral-rectangle clause at **390 × 844** — which
means the entire structural verdict is available *before a single line of desktop CSS
exists*. §6 already mandates mobile-before-desktop. So 2a ends exactly where the
evidence is complete.

If the five environments turn out to be one component in disguise, that verdict lands
when Fable has built five mobile layouts — not after it has built five mobile layouts
**plus** five desktop compositions on a foundation Sol is about to reject. Desktop
polish cannot un-distinguish already-distinct environments, so 2b is near-risk-free by
construction. The split costs one review round and caps the worst case at roughly half.

It is also the phase where the executor gets the most rope and the critic should be most
hostile: a long-horizon, hold-many-constraints-across-many-files task is exactly where
"one component wearing five hats" gets smuggled in.

### Running in parallel: the copy lane

§7.2 copy corrections (`meta.pledge.description`, the Oath invitation's signer,
`crisis.ribbon.body`) plus the flagged home strings are **not Fable's**. They belong to
the copywriter session, now defined in **`docs/build/PROMPT-COPY.md`** — a Claude⇄Sol
*consensus dialectic* (Claude writes, Sol critiques **and proposes** with arguments, they
iterate to agreement), with its own machine floor **`npm run copy-gates`**. Fable
*consumes* `content/copy.ts`; it does not author it. The `SPOT NO.` strings inside
`copy.ts` were the one overlap — Fable removed the structural label, the copy lane
rewrites the prose. The copy floor is acceptance-blocking at the Phase 6 launch audit.

## Blocked on Stacey — and why nothing is actually blocked

No phase waits on the art. `src/assets/placeholder/` holds token-only stand-ins at
final dimensions (§3.1 permits them explicitly), so **every phase can be built, gated,
and reviewed today.** What the art blocks is *shipping*, and gate **G14** enforces that:
`node scripts/gates.mjs --prod` fails while any stand-in is still referenced.

Regenerate them any time with `node scripts/make-placeholders.mjs`.

| # | Deliverable | Blocks | Swap cost when it lands |
|---|---|---|---|
| 1 | **Text-free hero** — `hero-wide` 3200×1800 + `hero-portrait` 1350×2400, no baked type | ship of Phase 3 | Drop in the files. Keep live type clear of where the figure stands — the stand-in marks that zone. |
| 2 | **Placement-hub composite** — independent wide + portrait compositions, five untouched posters on one locker-room wall | ship of Phase 5 | Drop in the files, then re-measure the five poster positions and update the percentages in `src/content/placement-hub.ts`. **That file is the only thing that changes** — every hotspot, anchor, focus ring, and keyboard route built against it keeps working. |
| 3 | **Owner-reserved call** — home flagship: **Poster 5** (warm editorial range, inclusive casting) or **Unholy** (maximum stopping power) | nothing | §3.3 says it does not alter route architecture. Fable builds it as a swappable prop; you decide from matched 390×844 + 1440×900 comps. |

Also still in the owner queue from the PRD (§ "Asset dependencies", item 3): final
verdict cards, pledge badge, Poster 5 minimalist crop, final favicon/mark.

## The harness is not frozen

`gates.mjs` gains gates as phases expose holes in it. **G7b** (canonical-poster hero
wash) and **G15** (neutral-rectangle distinguishability) were both added mid-flight,
after the models found what the harness was missing. That is the loop working — but it
creates a race: a build report can be *correct when written* and *stale when reviewed*,
and the reviewer sees only a wrong number.

This already happened once. Fable reported `9/15`; G15 landed; Sol read `9/16` and
filed it as a bookkeeping error. Neither model was wrong — the arbiter moved the
scoreboard between them.

**The rule:** every gate run prints a `gate-set:` fingerprint line. **Both models paste
it verbatim into their reports.** A stale count is then self-evident instead of an
accusation. If the arbiter changes the harness between a build and its review, that
change is announced in the audit order.

## Report format

Reports live in `docs/build/reports/`. They are the bus between two models that
cannot talk to each other — write them for the *other model*, not for a human.

- `phase-N-build.md` — Fable: what changed, which gates moved, what it chose and why, what it could not do.
- `phase-N-review.md` — Sol: the verdict table. One row per claim, each with `file:line` and a spec clause.
- `phase-N-remediation.md` — Fable: one row per Sol FAIL, and how it was answered (or why it is contested).
