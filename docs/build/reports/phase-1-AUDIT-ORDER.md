# Phase 1 — Audit Order for Sol

Paste this **after** the Standing Brief in `docs/build/PROMPT-SOL.md`.

---

Fable has completed **Phase 1 (hygiene sweep)** and written
`docs/build/reports/phase-1-build.md`. Audit it.

## Start here

```bash
cd site && npm run gates:phase 1     # MUST exit 0. It does.
```

Phase 1 owns six gates — **G1, G2, G2b, G3, G9, G12** — and all six are green
(4/14 → 9/15; the count grew because I added two gates mid-phase, see below).

**Six gates print `DEFER`: G4, G5, G7, G7b, G8, G11.** These are owned by Phases 2, 3,
and 5. They are red because the surfaces that would turn them green *do not exist yet* —
and Phase 1 was explicitly forbidden to ship new surfaces. **Do not reject this phase
for a deferred gate.** That was a flaw in your original Audit Order and it has been
fixed; this note is the correction.

## Spec sections in scope

§5.1 (units + poster geometry) · §9.2 (navigation taxonomy) · §3.1 (steam) ·
§6 / §11 (reduced motion). **Nothing else is in scope for a FAIL.** You may raise
anything else as a CONCERN.

## What Fable claims, and where I have already verified it

I (Opus, the architect) independently re-ran the gates and confirmed the six greens.
The build is clean, `astro check` reports 0 errors. **Do not re-derive that** — go
straight to what a machine cannot see.

**Fable disclosed a hole in my own gate, against its own interest.** G7 grepped only
`assets/posters/` while the home loaded all five canonical posters from
`/downloads/*.jpg`, scoring a false PASS. I have fixed G7 and added **G7b**, which
immediately caught a real §3.1 violation Fable had *not* claimed credit for:
`homev2/Hero.astro:30` washes the hero with a blurred `confident-man.jpg` — a blurred
canonical poster behind live hero type, forbidden by §3.1 *by name* and gated by §14.
It is now deferred to Phase 3, where the hero is rebuilt.

Two lessons for your audit: **the gate script is fallible and you may attack it**, and
**Fable's self-reporting has so far been honest** — which means the things it flagged
are probably not where the bodies are. Look where it *didn't* look.

## The five judgment calls Fable asked you to audit

Its build report §"Judgment calls Sol should audit" lists these. Rule on each:

1. **Scroll-intent listeners** (`wheel` / `touchmove` beside `scroll`) in
   `steam-hero.ts`. §3.1 says *"Scrolling completes the sweep and stores completion."*
   Fable argues the legacy home is scroll-locked (`overflow: hidden`), so a `scroll`
   event can never fire and the clause is literally unreachable without intent
   listeners. Is that faithful to §3.1, or is it inventing an interaction the spec
   didn't ask for on a page Phase 3 deletes anyway?
2. **Reduced-motion now fogs pre-paint**, then crossfades clear over 240 ms. §3.1 says
   *"Reduced motion receives a short crossfade and the clear state."* Fable reads that
   as requiring a fogged start. Does a reduced-motion user seeing a 240 ms fog satisfy
   §3.1, or does it violate the spirit of reduced motion — and does it delay content,
   which §3.1 forbids outright?
3. **`object-fit: contain !important`** in `PosterImage.astro`. §5.1 says the canonical
   component *"must reject `cover` styling."* Is `!important` the legitimate mechanism
   of that rejection, or a blunt instrument masking a specificity problem?
4. **`Masthead.astro` "No. 26"** kept — a Vogue issue-number gag. Fable argues it is
   masthead fiction, not campaign navigation or poster taxonomy under §14.
5. **`Case.astro` findings indices `01/02/03`** kept — a findings-ledger device, not
   poster taxonomy.

On 4 and 5, rule narrowly: §14 bans decorative sequence numerals *"from campaign
navigation and poster taxonomy."* It does not ban every numeral on the site. If you
read it more broadly, say so and cite the clause.

## The five non-conformances Fable deliberately left

It left these because Phases 2/3/5 **delete the surfaces wholesale** — the legacy
five-poster home, the shared split-screen detail page, the `/psas` gallery. Its
argument is that fixing a condemned page is waste.

**Test that argument, don't accept it.** For each one, confirm (a) the surface really
is slated for deletion by the PROTOCOL phase table, and (b) leaving it doesn't let a
violation survive into a phase that *isn't* deleting it. A "later phase will fix it"
that no phase actually owns is how violations ship.

## Also worth your attention

- Fable rewrote the **series navigation** to §9.2's vocabulary. Verify it used the
  *exact* strings: previous/next **poster titles**, "View the installation," "Return to
  the movement." Not paraphrases.
- It edited five `meta["psas/*"].description` strings in `content/copy.ts` to strip the
  `Spot No. N.` prefix. Per PROTOCOL, copy is the **copy lane's** property and Fable
  removes only structural labels. Confirm the prose is byte-identical after the prefix
  and that it did not quietly rewrite campaign voice.
- It removed a `transform: scale(1.02)` inside `overflow: hidden` on `/psas` — a ~1%
  crop of canonical art nobody had noticed. Confirm no similar sub-visual crop survives
  anywhere else (`scale(`, `zoom`, negative margins on a poster wrapper).

## Verdict

Write `docs/build/reports/phase-1-review.md` in the Standing Brief's format.
**PASS or FAIL. No "what went well" section.**
