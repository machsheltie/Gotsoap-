# Got Soap? — Style Lock

**What this is:** voice decisions made during copy sessions that the law (voice-bible, copy-contract, specs §7) doesn't spell out. Each was argued to consensus in the Claude↔Sol dialectic (2026-07-16, see `copy-session-draft.md`). A future copy session inherits these; overturning one requires a new argued round, not a drive-by edit.

## 1. "Concerned women" is the membership's proper noun

CWAAA never says "two million women" — it says **"two million concerned women."** The adjective is the org's name doing deadpan work, and it's what keeps membership statements clear of the §7.2 signer confusion (the male declarant joins the *roll*, never the women). Established at crisis §8.4, the milestone email, and now the home letterhead.

## 2. The send-him imperative is the her-side CTA pattern

Where a surface addresses **her** and the action is **his** declaration, the copy sends him: *"send him to put his intent in writing," "send it to the man who should."* She is witness, recruiter, distributor (specs §7.1) — never the signer. The dual-address gold standard is one line carrying both commands: **"Sign it — or send it to the man who should."**

## 3. Meta descriptions are exempt from the "Because…" opener

The "Because…" invariant governs **subheads**. SERP snippets render with no subject line above them, so a "Because…" opener reads as a fragment mid-sentence. Metas open standalone. Poster numbering ("Spot No. n") stays retired everywhere (specs §9.2).

## 4. Structural chrome may be plain — under three conditions only

"Contents," "On this page," and landmark aria-labels stay function-first. This is **not** a general "chrome may be generic" exemption. Plain language wins only when **all three** hold:
1. the control is structural (wayfinding, not expression);
2. the borrowed format supplies the context (a magazine's contents page says *Contents* — format verisimilitude is the joke);
3. revoicing would misdescribe the destination ("The receipts" promises evidence and opens a menu — rejected on that ground).

Where a chrome string can be voiced *without* misdescribing, voice it: `close: "Back to the campaign"`, `routesLabel: "The rest of the movement"`.

## 5. Nav hierarchy is one voice, not two authors

The masthead shouts voiced destinations (`THE PSAS`); the contents sheet uses specs §9.1's plain taxonomy (`PSAs`). That contrast is hierarchy within the campaign voice — it is not an author blend and needs no fixing.

## 6. Accessibility labels: noun phrases, no title collisions

Landmark `aria-label`s name the region as a noun phrase and must never share a name with an item they contain. The /psas plaque is **"The five announcements"** — "Choose a public thirst announcement" was rejected because the list contains a poster literally titled *Public Thirst Announcement*.

## 7. Killed lines (do not resurrect)

- **"Hang him in the locker room"** — violent/racial misreadings; unacceptable with any poster, doubly so with Poster 5's Black model as default flagship. The approved form is *"Pin him up in the locker room."*
- **"Are you the fog?"** — borrowed CWAAA's fog metaphor on a campaign surface before the letterhead defines it.
- **"The receipts"** (as nav framing) — false functional promise.
- **"A public hygiene initiative"** — NGO-brochure phrasing; the institutional credit must be a format-perfect PSA credit (*"A public service announcement · Funded by …"*).
- **"A satirical spec campaign by Hope2 Studio"** *(on campaign surfaces)* — the tell that spends the joke early (owner, 2026-07-16, footer consolidation). The sentence lives at `/about` only, where the reveal IS the payload.
- **"Got Soap? is a satirical campaign by Hope2 Studio."** (the home reveal-beat tail) — an explicit satire reveal on the home; killed with the consolidation. The thesis line stays; the confession goes.
- **"See who's behind it →"** — hints at a hidden hand from a campaign surface; the home's one `/about` path is the footer folio credit.

## 8. Page-internal echoes are legal; cross-surface recycling is not

A meta description may echo its own page's pull line ("Anyone can change."). Marquee lines still have ONE home across *different* surfaces (deck §11 anti-tic sweep unchanged).

## 9. The hero sub is choreography — treat it as art-locked

"Because he thinks the steam is hiding it. It never was." is ratified precisely because the steam wipes itself away while the line is read: the site performs the sentence. Any future hero-copy proposal must beat that interplay, not just the sentence.

## 10. The home commits to the bit — one neutral path to /about (owner, 2026-07-16)

The Onion model: straight-faced satire commits on the front page; the reveal is a click away, never on the masthead or in the home footer. Executed in the footer-consolidation round (spec: `docs/build/reports/footer-consolidation-spec.md`):

- **One `/about` path from the campaign chrome:** the footer folio credit `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` (also the §10 proof-lift trigger). The © line is plain unlinked text. *(The contents sheet's "Production Notes" route exit remains per specs §9.1 — structural taxonomy, not a tell.)*
- **The reveal beat is a thesis beat.** "None of these men are real. The problem is very, very real." stays — it names neither the joke nor the maker. Its tail and cta are killed (§7).
- **The masthead credit is the format-perfect PSA credit** — *"A public service announcement · Funded by Concerned Women Against Axe Abuse"* — the same line as the hero's institutional signature. Page-internal echo, legal per §8. `Est. MMXXIV` / `Series One` / `No. 26` stay: straight-faced masthead fiction.
- **The disclaimer is legal fine print at `/about`, not a footer confession:** *"Parody. Not affiliated with any brand, product, publication, or public-health organization. Models generated with openart.ai; art direction, compositing, and typography by hand."* Non-affiliation ≠ "surprise, it's satire."
- **Root-cause fix:** the masthead and home section chrome now route through `copy.ts` (`masthead` group + `home.*` additions; deck §1c/§1d). Hardcoded markup is how a killed line survived a closed session — the copy lane owns every home string now.

## 11. Structured metadata is the real-world layer (owner ruling, 2026-07-16)

JSON-LD / structured data is **exempt from the fiction-first rule**. It already speaks
as the real world — poster pages name the real creator (`Stacey M. Breckel / Hope2
Studio`) and carry the real © notice — so the truthful `"satirical"` disclosure in
`/psas/[slug]`'s `about` field **stays**: crawlers, search surfaces, and AI systems get
honest parody disclosure while the visible fiction is untouched. The commit-to-the-bit
rule (§10) and the §7 kill list govern **rendered** surfaces only. (Ruled by Stacey in
the footer-consolidation close-out, answering Sol's CONCERN 3.)
