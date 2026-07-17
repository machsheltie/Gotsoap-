# Copy Session Draft — Claude → Sol (round 1)

**Session:** resolve the 7 copy-gate items (CG3, CG4) + 2 additional hits the gates surfaced.
**Law:** voice-bible.md → copy-contract-for-build.md → specs.md §7 → copy-deck-v2.md. Stepford test on every line.
**Status:** DRAFT — awaiting Sol's critique. Nothing lands in copy.ts until consensus.

---

## 0. Research note (the argument base)

Findings from the Liquid Death / Cards Against Humanity lane, run before drafting:

1. **Total commitment to the bit converts.** Liquid Death never describes its fiction; it executes it in pitch-perfect borrowed formats (legally binding country-club contracts, death-metal infomercials). The format verisimilitude IS the joke. Lesson for us: the hero signature must *be* a real PSA credit, not gesture at one — "initiative" is NGO-brochure language and dies on contact.
2. **Accusation-as-flattery names the buyer.** CAH's "a party game for horrible people" converts because the audience claims the insult as identity. Our verdicts already do this; the provocations should too — accuse with a smile, leave the reformed-hero door open.
3. **Shareable = quotable out of context.** A line that needs the page around it dies in the group chat. Every high-stakes line (PROVOCATION, CONFRONT) must survive as a bare screenshot caption.
4. **The dual-address engine is literally the distribution model.** Her sending it to him is the conversion event (CAH's gifting dynamic). The strongest lines are *executable* — they tell her what to do with them. This is why §7.2's send-him framing isn't just legally-correct fiction, it's the growth mechanic.
5. **Specific nouns are the meme units.** Febreze, loofah, the rideshare window, four dollars. Abstract nouns ("hygiene," "initiative," "clean") are the Stepford tells.
6. **In-fiction CTAs outperform generic ones in this lane** because the ask is joining the bit, not buying: sign, file, swear, serve. Keep every action inside the fiction.

---

## 1. `meta.pledge.description` (copy.ts:107, deck §2) — CG3 hit #1

**Current:** "Declaration of Intent to Lather. Sign the oath, join two million women who've had enough, and smell like you meant it."
**Problem:** §7.2 — he signs; he does not join the women.

**Option A (recommended):**
> Declaration of Intent to Lather. Sign the oath, get filed in triplicate, and smell like you meant it.

- Winks at: **him** (the declarant, told what happens to his paperwork) with a **her**-visible gag (the bureaucracy receiving him).
- Stepford: "get filed in triplicate" is CWAAA-specific — no other brand files its converts. Keeps the earned closer "smell like you meant it." Minimal diff to a frozen line.

**Option B:**
> Form CW-1: Declaration of Intent to Lather. He swears to the soap; CWAAA files it in triplicate. One copy goes to the loofah.

- Winks at: **her** (third-person "he" makes her the reader). Trades the closer for the loofah gag (already used at `submitMicro` — recycled-line risk).

---

## 2. Home letterhead `movementSeam.body[2]` (copy.ts:132, deck §3.4) — CG3 hit #2 (off the work table; the gate found it)

**Current:** "Two million women. One demand. Soap, applied regularly, as directed."
**Problem:** trips CG3's regex. Semantically it's CWAAA stating its own membership, not the declarant joining — but the fix is also a genuine consistency win:

**Option A (recommended):**
> Two million concerned women. One demand. Soap, applied regularly, as directed.

- "Concerned women" is CWAAA's own proper noun for its membership — it's already the established phrasing at crisis §8.4 ("Two million concerned women. Chapters in all fifty states.") and the §7.8 milestone email. The letterhead should have matched all along.
- Winks at: **her** (she's the membership) while **he** reads a well-organized force massing politely.
- Note for Sol: this is *not* gate-gaming — the alternative (narrowing the gate regex) weakens the machine floor, and the rewrite is the better line anyway: "concerned" doing deadpan work is the org's whole joke.

---

## 3. `crisis.ribbon.body` closer (copy.ts:370, deck §8.5) — §7.2 item 2

**Current closer:** "Wear it for the reformed. Wear it for the suds-curious. Then put your intent in writing."
**Problem:** the whole ribbon block addresses **her** (she ties the ribbon, he is loved enough to use soap) — so "your intent" reads as *her* intent, but the CW-1 declarant is him.

**Option A (recommended):**
> Wear it for the reformed. Wear it for the suds-curious. Then send him to put his intent in writing.

- Winks at: **her** (she's the recruiter — §7.1 names her witness, recruiter, sharer). "Send him" is the distribution mechanic in imperative form.
- Stepford: keeps CWAAA's procedural deadpan ("intent," "in writing"); one clean order, no hedge.

**Option B:**
> Wear it for the reformed. Wear it for the suds-curious. Then have him put it in writing.

- Slightly softer; "have him" reads more domestic, less dispatch-order. A is more CWAAA.

---

## 4. Home Oath invitation `home.pledgeBand.heading` (copy.ts:137, deck §3.5) — §7.2 item 3

**Current:** "Join the movement. Put it in writing."
**Problem:** §7.2 — frame as sending/bringing *him* to *his* declaration, not asking her to swear his oath. "Put it in writing" leaves "it" ambiguous: her reading it as her own oath is the exact bug.
**Constraints:** heading must open "Join the movement." (invariant). Body stays — `Because "I usually shower" is not a hygiene routine. It's a confession.` owns the site's antithesis budget. CTA stays "Take the Lather Pledge →".

**Option A (recommended):**
> Join the movement. Sign it — or send it to the man who should.

- Winks at: **both**, in order. Him: sign it (he's the declarant, §7.1). Her: send it (she's the recruiter). One line, two commands, each viewer takes theirs.
- Stepford: no brand asks its audience to forward a summons; the send-it clause is the campaign's whole distribution theory in six words. One em dash (block budget: one).

**Option B:**
> Join the movement. Sign the oath — or serve it to him.

- "Serve" as in served papers — sharper, funnier for her, and paperwork-flavored without going manila. Risk: "serve papers" is divorce-coded; possibly one shade more hostile than the reformed-hero door allows on the *invitation* surface (the oath should feel like an honor, not a subpoena).

**Option C:**
> Join the movement. His oath. Your delivery.

- Fragment style, poster-cadence. Risk: excludes the male reader entirely — he's standing at the tear-off stub being talked about in the third person. §7.1 says the man is the declarant; the invitation should let him sign it himself.

---

## 5. Hero PROVOCATION `home.hero.sub` (copy.ts:116, deck §3.1, Hero.astro:77) — work item 4

**Current:** "Because he thinks the steam is hiding it. It never was."
**Status question:** the code renders this VERBATIM from the deck; specs §7.2 nonetheless routes it through the copy lane. So: ratify or replace.

**Option A (recommended — ratify the current line):**
> Because he thinks the steam is hiding it. It never was.

- Winks at: **both.** Her: "he thinks" — she's in on it. Him: busted in the second sentence.
- Why ratify: the line is choreographed to the build. The steam **literally wipes itself away while you read it** — the site performs the sentence. That interplay is unfakeable and no replacement gets it back. It also passes Stepford clean: no other brand's hero can say this because no other brand has this steam. The setup-knockdown is already counted in the deck's antithesis budget ("pledge band + the hero setup-knockdown").
- The vague "it" is the tease, not a flaw — "it" resolves in the reader's nose.

**Option B:**
> Because steam is not a shower. Ask anyone downwind.

- Winks at: **him** first (the accusation), **her** second ("anyone downwind" is her, and she has receipts). More quotable out of context than A; loses the steam-clear choreography. Same antithesis-form spend.

**Option C:**
> Because he told you it's cologne. Your nose has met cologne.

- Winks at: **her** flat-out — dating-scene specific, screenshot-ready. Risk: first screen goes all-in on her and leaves him spectating; A and B keep the accusation live on the man reading it.

---

## 6. Hero institutional signature (Hero.astro:72) — work item 5

**Current placeholder:** "A public hygiene initiative · funded by Concerned Women Against Axe Abuse"
**Problem:** "initiative" is NGO-brochure filler — the one word in the line any brand could own (research note #1: the credit must BE a PSA credit, format-perfect).

**Option A (recommended):**
> A public service announcement · Funded by Concerned Women Against Axe Abuse

- Winks at: **both** — it's the deadpan straight-man line the absurd org name detonates against.
- Stepford: this is the exact 90s-PSA credit format (and it aliases the site's own section: THE PSAS). Capital-F "Funded" matches the poster anatomy's footer gag verbatim; the hero now carries the same credit block the canonical posters do. Format verisimilitude is the joke.

**Option B:**
> Paid for by Concerned Women Against Axe Abuse

- The election-disclaimer formula. Very funny, arguably funnier — but it's a *political-ad* credit, not a PSA credit, and the campaign's parody target is PSAs and fragrance ads. Borrowing a third format on the first screen muddies the bit.

**Implementation note (both options):** the string moves into `copy.ts` as `home.hero.signature` (contract: components never hardcode copy), Hero.astro renders it and drops both marker comments. The section's `aria-label="Got Soap? — a public hygiene initiative"` updates to match the chosen credit.

---

## 7. Confrontation `CONFRONT` (Confrontation.astro:20) — work item 6

**Current placeholder:** "Are you the fog?"
**Assessment:** decent bones (second person, no hedge) — but "the fog" is CWAAA's coinage ("We are against the fog," "The fog is the problem"), and on the home page the visitor hits the Confrontation **before** the CWAAA letterhead defines the fog. The line leans on a metaphor the reader hasn't been handed, and it borrows the filing author's vocabulary on a smolder surface.

**Option A (recommended):**
> You've smelled him. Are you him?

- Winks at: **both, in sequence** — the dual-address engine made literal. Her: instant recognition (everyone has smelled him). Him: the mirror turns. The component literally has a `cf__mirror` element; this line earns it.
- Stepford: no hedge, no explanation, four words a screenshot can carry. The reformed-hero door stays open — it's a question, not a sentence.

**Option B:**
> Smell that? Everyone else does.

- Winks at: **him**, hard. Maximum accusation-with-a-smile; extremely quotable. Risk: it's a verdict, not a question — the Sniff Test invite works better as a dare than a conviction, and the lead line under it ("Seven questions between you and the truth…") already carries the dare's setup.

**Option C (ratify):**
> Are you the fog?

- Keep only if we accept campaign borrowing CWAAA's metaphor pre-definition. I don't think it earns its place: it's atmospheric where A is personal, and the two-author seam gets smudged for a line that's merely fine.

---

## 8. Campaign propaganda caption (Campaign.astro:48) — CG4 hit off the work table

**Current placeholder:** "This is what clean looks like."
**Problem:** any soap brand could say it — Stepford test #1 fails. Constraint: the flagship poster is owner-swappable ('thirst-announcement' ⇄ 'unholy'), so the line must be poster-agnostic.

**Option A (recommended):**
> Pin him up in the locker room.

- Winks at: **her** (she gets the pin-up; the male gaze flipped is the campaign's founding move) with **him** as the aspiration (be the poster — the reformed-hero door as decor).
- Stepford: it's an *instruction*, not a caption — propaganda that orders distribution. Rhymes with the share label "Post it in the locker room" without duplicating it. Works over any of the five posters.
- Deliberately avoided: an earlier candidate ("Hang him in the locker room") is killed on sight — "hang him" carries violent/racial misreadings the one-real-limit exists to prevent, unacceptable with any poster and doubly so with Poster 5's Black model as default flagship. Noting it so it never resurfaces.

**Option B:**
> The standard is posted.

- Deadpan propaganda-ministry cadence; "posted" puns on poster. Winks at him (the standard applies to you). Cooler but colder — no her-action in it.

**Implementation note:** moves into `copy.ts` (proposed `home.campaign.caption`), Campaign.astro imports it, both markers removed.

---

## 9. `/psas` meta descriptions ×5 (copy.ts:101–105, deck §2) — work item 7

**Problem:** Phase 1 stripped "Spot No. N." (numbering is retired per specs §9.2); each now opens mid-sentence on "Because…". SERP snippets must stand alone. Numbering must NOT come back. The "Because…" invariant governs *subheads*, not meta descriptions — these get real openings.

**confident-man** — was: "Because your Axe body spray isn't fooling anyone, cowboy. Smell like effort."
> Your Axe body spray isn't fooling anyone, cowboy. Confidence, it turns out, is soap. Smell like effort.

- Winks at: **him.** Keeps the poster's cowboy and its closer; the middle clause converts the fragment into a claim without explaining the joke.

**soap-smoldering** — was: `Because your "natural scent" is a threat, not a flex. Lather. Rinse. Respect.`
> A "natural scent" has never once been good news. He's soap-smoldering. You will not out-cologne him. Lather. Rinse. Respect.

- Winks at: **him** (the rival framing — you will not out-cologne him) with her nodding along. "Never once been good news" echoes the poster's own pull without cloning it. *(Flag: pull line says "has never once been good news" too — Sol, call it if this is a recycled-line violation; fallback middle: "He's fresh and knows it.")*

**unholy** — was: "Because deodorant without a shower is just layering lies. Axe is not an exorcism."
> He washes daily. With soap. Uncommon, unholy, unreasonably hot — and Axe is still not an exorcism.

- Winks at: **her** first (the thirst read), him second (the exorcism verdict). Quotes the poster's baked line as citation, which alt-text precedent allows.

**redemption** — was: "Because cleansing isn't just for your sins. Deodorant isn't divine intervention."
> He sprayed. He repented. He showered. A redemption arc told in steam, where deodorant isn't divine intervention and the gym doesn't count.

- Winks at: **him** (anyone can change — the door held open in three verbs). "The gym doesn't count" imports CWAAA's funniest ruling as scripture. *(Note: the triad is intentional — it's the redemption arc itself, matching the poster's own "He sinned. He sprayed." cadence.)*

**thirst-announcement** — was: "Because your Tinder shouldn't come with a scratch-n-sniff warning. Wash accordingly."
> Scrubbed, sudsed, and safe to introduce to your mother. Your Tinder shouldn't need a scratch-n-sniff warning. Wash accordingly.

- Winks at: **both** — the first clause is her tier-list, the second is his notice. Keeps the earned closer.

---

## 10. Finalization plan (post-consensus)

1. `copy.ts`: apply final strings — items 1, 2, 3, 4, 5, 9 edit existing fields; items 6 and 8 add `home.hero.signature` and `home.campaign.caption`; item 7 adds `home.confrontation.provocation`.
2. Components: Hero.astro, Confrontation.astro, Campaign.astro import from `copy.ts`; **all five CG4 marker comments removed**; Hero's `aria-label` synced to the chosen signature.
3. `copy-deck-v2.md`: §2 table (pledge row + 5 psas rows), §3.1 (ratified hero sub + new signature line), new §3.2b/§3.3 caption + confrontation entries where the deck's home map needs them, §3.4 letterhead line, §3.5 heading, §8.5 ribbon closer. Version note appended (deck was FROZEN; this is a copy-lane re-version per contract).
4. `npm run copy-gates` → green (CG3 ×2, CG4 ×5 resolved).
5. Optional `docs/copy/style-lock.md`: the "concerned women" membership rule, the send-him imperative pattern, the killed "hang him" line, and meta-description exemption from the "Because…" opener.

---

*Claude's over-the-wall note to Sol: the two I'd defend hardest are 5A (the steam performs the sentence — replacing it burns real craft for novelty) and 8A (the only candidate that contains an action). The one I'm least sure of is 7A vs 7B — B is the better screenshot, A is the better mirror. Argue it.*

---
---

# ROUND 2 — Claude answers Sol's Round 1 ruling

**State after this round:** consensus lines 1A/2A/3A/4A/5A/6A/7A/8A + Sol's meta set are FINALIZED into `copy.ts` + deck v2.1; five of six CG4 markers removed. `npm run copy-gates`: **5/6** (CG3 green; CG4 down to the one contested marker, `psas/index.astro:34`). `npm run build`: exit 0, 16 pages.

## Concessions (logged, with shared rationales)

**All five /psas metas: conceded to Sol's set.** Sol's diagnosis was correct — the defect was syntactic ("Because…" openers orphaned by the prefix strip), and my rewrites invented new copy where the frozen, owner-approved lines needed only their conjunction removed. My 9a middle clause explained a finished joke; 9b stacked a rival-man subplot onto a title restatement; 9d explained its own triad. Shared rationale per line:
- *confident-man:* one accusation, one earned closer — nothing between them. **FINAL.**
- *soap-smoldering:* one accusation, one command. **FINAL.**
- *unholy:* two campaign-specific blades; the ornament contributed less than either. **FINAL.**
- *redemption:* ends by reopening the reformed-hero door — the door is the point. **FINAL.**
- *thirst-announcement:* it already stood alone once the conjunction fell. **FINAL.**

Two corrections **for the record, not the outcome**:
1. (9c) "Uncommon, unholy, unreasonably hot" was not generated alliteration — it quotes the poster's baked text (see P3 alt). Conceded on tightness, not on the "reads generated" diagnosis.
2. (9d) "Anyone can change." echoes the redemption pull's closer. Ruled acceptable as a page-internal echo (a meta may mirror its own page); logged for the anti-tic sweep.

**1B, 3B, 4B, 4C, 5B, 5C, 6B, 7B, 7C, 8B:** all rejections accepted; no counters. 7C ("Are you the fog?") and 8B are dead.

## Verification of Sol's factual claims

- Six markers confirmed (my Round-1 run predated the `psas/index.astro:34` flag). ✅
- Both CG3 hits confirmed and now resolved. ✅

## Counter 1 — Contents framing: REJECT "The receipts"; adopt Sol's `close` + `routesLabel`

Sol's two good strings are in the counter-set below — "Back to the campaign" is the cousin of §9.2's approved "Return to the movement," and "The rest of the movement" gives the route group a voiced, function-true name. But **"The receipts" (trigger/title/anchorsLabel) fails on grounds the law fixes:**

1. **It misdescribes the function.** In the group-chat register, receipts = *evidence of wrongdoing*. A visitor tapping a masthead button called "The receipts" expects proof — the crisis findings, the case files — and gets a table of contents. Every in-fiction label in the contract's table is function-transparent ("Post it in the locker room" is unmistakably *share*); this one isn't. Wit that costs wayfinding is a toll, not a joke.
2. **The law already names this surface.** specs.md §9.1: "the home **contents** sheet." The spec's navigation philosophy is deliberately plain — §9.2 strips `SPOT NO.` and "All Spots"; §9.1 fixes the entry labels as bare taxonomy. Navigation chrome is where the spec chose boring on purpose.
3. **"Contents" is format verisimilitude, not Stepford.** The home is a glossy-magazine world — the Oath is a September-issue fragrance insert, the Campaign a fashion spread. A magazine's contents page is titled *Contents*. Playing the borrowed format straight is the lane's core move (research note #1) and the voice bible's own guardrail: *"Edge lives inside the template, not by breaking it."* S1 asks "could any brand say this?" — for chrome, the answer is allowed to be yes; that restraint is what lets the loud lines be loud (the same argument the bible makes for CWAAA never flirting).

**Counter-set:**
| Key | String | Source |
|---|---|---|
| trigger | `Contents` | ratified — §9.1's own noun; magazine-format authentic |
| title | `Contents` | ratified |
| close | `Back to the campaign` | **Sol, adopted** |
| anchorsLabel | `On this page` | ratified — pure wayfinding |
| routesLabel | `The rest of the movement` | **Sol, adopted** |

## Counter 2 — /psas plaque aria-label: REJECT "Choose a public thirst announcement"; propose "The five announcements"

The string is a screen-reader-only landmark name on the chrome plaque `<nav>` (index.astro:179) listing all five poster routes. Two grounded objections:

1. **Name collision.** The list this label names contains an item literally titled "Public Thirst Announcement" (Poster 5). A screen-reader user hears "Choose a public thirst announcement, navigation" and then finds exactly one item by that name — the label points at one poster while claiming to name all five. That's a real AT usability defect, not a taste call.
2. **Landmark convention.** aria-labels name regions (noun phrases); an imperative reads as an instruction, not a name, in the landmarks rotor.

**Proposed:** `The five announcements` — the campaign's own generic noun for the set, verbatim from the approved index body ("Five announcements in the public interest"). Names the landmark, keeps the voice, collides with nothing. Alternative if Sol wants the function verb-first: `Announcement routes`.

## Consensus to log (no dispute)

**Nav-vs-contents voice call: agreed as Sol ruled it.** The masthead shouts voiced destinations (`THE PSAS`); the contents sheet uses §9.1's plain taxonomy (`PSAs`). Hierarchy within one campaign voice — not two authors blending. Goes in style-lock.

## Open items for Sol's Round 2

1. Contents framing counter-set (Counter 1).
2. Plaque aria-label: "The five announcements" (Counter 2) — the last red gate hangs on this.

Everything else is finalized and verified: gates 5/6, build green.

---
---

# ROUND 3 — SESSION CLOSED (2026-07-16)

Sol's Round 2 ruling conceded both counters (and corrected the 9c "generated alliteration" characterization for the record). No deadlocks; nothing went to Stacey for a tiebreak.

**Final application:**
- `contents` framing → Contents / Contents / Back to the campaign / On this page / The rest of the movement (`copy.ts`).
- /psas plaque `aria-label` → "The five announcements" (`index.astro`); last CG4 marker removed.
- Deck v2.1: change-log items 9–10, new §1b and §4.1b.
- `docs/copy/style-lock.md` written — 9 locked decisions, including Sol's boundary on when plain chrome is permitted (structural + format-supplied context + revoicing would misdescribe).

**Final verification (fresh evidence):**
- `npm run copy-gates` → **6/6 invariants hold** (CG1–CG6 PASS).
- `npm run build` → **exit 0, 16 pages.**

Green ≠ good — good was this argument. The gates only prove the rails held while we had it.
