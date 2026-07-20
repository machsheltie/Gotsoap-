# Got Soap? — Website Copy Deck v2 (voice-forward)

**Supersedes `copy-deck-v1.md`** (v1 was written from the docs; v2 is written in Stacey's voice per `voice-bible.md`).
**Status:** ✅ **FROZEN for implementation (2026-07-08; re-versioned v2.1, 2026-07-16).** Reviewed through humanizer + prose-critique + marketing passes; owner-approved voice. Build against this verbatim. Any further change is a copy-lane edit, re-versioned — implementers do not edit strings in place.
**Binding:** `voice-bible.md` (the north star) · `CLAUDE.md` creative rules · PRD §3, §5 · `docs/design.md` §4 (two authors) · specs.md §7 (signer model).

> ### v2.1 change log (2026-07-16 — Claude↔Sol copy dialectic; rationales in `copy-session-draft.md`)
> Specs §7.2 signer corrections + homev2 placeholder resolutions, per-line consensus:
> 1. §2 `/pledge` meta: the declarant no longer "joins two million women" — he signs, CWAAA files him in triplicate.
> 2. §2 `/psas/*` metas ×5: "Spot No. n." numbering retired (specs §9.2); openers made standalone (the "Because…" invariant governs subheads, not SERP snippets).
> 3. §3.1 hero sub RATIFIED unchanged (the steam performs the sentence); institutional signature added — exact PSA-credit format.
> 4. §3.2b (new): flagship propaganda caption — an executable distribution order, poster-agnostic.
> 5. §3.3 confrontation provocation added — replaces "Are you the fog?" (borrowed CWAAA's metaphor before CWAAA defines it).
> 6. §3.4 letterhead: "Two million **concerned** women" — CWAAA's proper noun for its membership, matching §8.4 and §7.8.
> 7. §3.5 oath heading: dual-address executed — he signs it, she sends it.
> 8. §8.5 ribbon closer: "your intent" was hers; now she sends him to put **his** intent in writing.
> 9. §1b (new): home contents-sheet framing finalized — "Contents" plays the magazine format straight; `close` and `routesLabel` voiced ("Back to the campaign" / "The rest of the movement").
> 10. §4.1b (new): /psas plaque nav aria-label = "The five announcements" (replaces the structural default; names the set without colliding with Poster 5's title).

> ### v2.2 change log (2026-07-16 — footer consolidation, owner decision; spec in `docs/build/reports/footer-consolidation-spec.md`, logged in `style-lock.md` §10)
> The home commits to the bit (Onion model): the reveal is `/about`'s payload, one neutral path from the home.
> 1. §1 footer: the © line is plain text (no link, no "satirical spec campaign" tell); the parody disclaimer leaves the global footer. The folio credit `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` (→ /about) is the one maker attribution and the one campaign path to the reveal.
> 2. §3.6 reveal beat: the thesis line stays; the meta tail ("…satirical campaign by Hope2 Studio") and the "See who's behind it →" cta are KILLED (style-lock §7).
> 3. §1c (new): home masthead fiction routed through `copy.ts` — the killed NGO-brochure credit is replaced by the format-perfect PSA credit (same line as §3.1's institutional signature; page-internal echo, legal per style-lock §8).
> 4. §9.5: credit and disclaimer split — the reveal sentence is the page's voice; the non-affiliation disclaimer (relocated from the footer) is reworded to do the legal job only.
> 5. §1d (new): home section chrome swept out of component markup into `copy.ts` (kickers, eyebrows, route labels, landmark aria-labels) — no new voice, ownership fix only.

## Read first
- 🧼 = **Campaign voice** (smolders — fragrance-ad drama + PSA sincerity + edge). 📋 = **CWAAA voice** (deadpan bureaucracy — files, never flirts). Never blended on one surface.
- **Invariants, verbatim:** subheads open **"Because…"** · primary CTAs open **"Join the movement."** · `#GotSoap · #SoapyThirstTrap · #CleanManEnergy` · **"Funded by Concerned Women Against Axe Abuse"** · `© Stacey Breckel 2025`.
- **Posters untouched.** Case notes/alt text describe; they never overwrite baked-in poster text.
- **Punch up at behavior + the double standard, never at a person.** Reformed-hero exit always open.
- **In-fiction utility labels** (never a bare "Share"): Share spot → *Post it in the locker room* · Share verdict → *Issue the announcement* · Copy link → *Copy the citation* (📋: *Copy the case number*) · Download → *Take one for the wall* · Retake → *Request re-assessment* · Submit pledge → *File my declaration*.

---

# 1. Global chrome

### Nav (Libre Franklin, uppercase)
Mark: `got soap?` · Links: `THE PSAS · THE SNIFF TEST · THE PLEDGE · THE CRISIS` · quiet: `ABOUT`

### Footer (every page) 🧼→seam→📋 *(v2.2 — footer consolidation)*
> **Join the movement. Smell like someone chose you back.**
> `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`
> Funded by **Concerned Women Against Axe Abuse** → *(links /crisis)*
> © Stacey Breckel 2025 *(plain text — unlinked)*
> `PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL` *(links /about — the ONE maker attribution and /about path on campaign surfaces; specs §3.7 verbatim, hardcoded in Footer.astro per gate G11)*
>
> *(v2.2: the "satirical spec campaign" credit tell and the parody disclaimer are gone from the global footer — the reveal + reworded legal disclaimer live at /about, §9.5. Social labels — Behance / Instagram / Facebook — render only when config URLs are non-empty.)*

### 1b. Home contents sheet framing (specs §9.1 overlay — v2.1) 🧼
Entry labels are §9.1's fixed taxonomy (Case, Campaign, Confrontation, Oath, Movement / PSAs, Sniff Test, Pledge, Crisis, Production Notes). Framing strings:
> trigger / title: **Contents** · close: **Back to the campaign** · anchors group: **On this page** · routes group: **The rest of the movement**

*Voice rule (style-lock): the masthead shouts voiced destinations (`THE PSAS`); the contents sheet keeps §9.1's plain taxonomy (`PSAs`) — hierarchy within one campaign voice, not two authors blending. "Contents" is the magazine format played straight; revoicing structural chrome ("The receipts" was proposed and rejected) must never misdescribe the destination.*

### 1c. Home masthead fiction (v2.2) 🧼
Straight-faced Vogue-masthead dressing, owned by `copy.ts` `masthead` (the hardcoded markup was how a killed line survived a closed session):
> est: **Est. MMXXIV** · credit: **A public service announcement · Funded by Concerned Women Against Axe Abuse** · series: **Series One** · issue: **No. 26**
> aria-label: *Got Soap? — masthead* · nameplate = nav mark `got soap?`
> screen-reader funding line (a11y tree at widths where the flank hides): *Funded by Concerned Women Against Axe Abuse.*

*(The credit is the §3.1 institutional signature's exact line — a page-internal echo, legal per style-lock §8. Its NGO-brochure predecessor is on the style-lock §7 kill list. "No. 26" echoes CWAAA Memorandum No. 26-114.)*

### 1d. Home section chrome (v2.2 sweep — structural, function-first per style-lock §4) 🧼
Swept from component markup into `copy.ts` verbatim; no new voice:
> §3.2 Case: demand **Soap. / Applied to men. / Regularly.** (typographic setting of the documented demand, crisis founding) · creed **We do not oppose fragrance. We oppose substitution.** (founding clause, verbatim) · route **Read the full findings →**
> §3.3 Campaign: kicker **The Flagship** · route **See all five announcements →**
> §3.4 Confrontation: eyebrow **The Sniff Test · Field Assessment CW-7**
> §3.5 Oath: kicker **The Oath** · sign-off **Lather. Rinse. Respect.** (the movement's verbatim sign-off)
> §3.1 Hero landmark aria-label: *Got Soap? — a public service announcement* · Footer funded-by lead: *Funded by*

### Scratch-n-sniff gag (first visit, dismissible — never a modal) 🧼
> **This website is certified 100% scent-free.** Which already puts it ahead of him.
> `[ Noted → ]`
Rotation: *"You can't smell this page. That's the nicest thing we can say about the genre."* · *"No fragrance detected. We ran it twice, to be fair to him."*

---

# 2. SEO / meta (per route)

| Route | `<title>` | Meta description |
|---|---|---|
| `/` | got soap? — the movement | A public thirst announcement. Five posters, one demand: use the soap. Because "I usually shower" is not a hygiene routine. It's a confession. |
| `/psas` | The PSAs — Series One \| got soap? | The public-service archive. Five thirst-trap hygiene PSAs, presented untouched. Study them. Then bathe. |
| `/psas/confident-man` | A Clean Man Is A Confident Man \| got soap? | Your Axe body spray isn't fooling anyone, cowboy. Smell like effort. |
| `/psas/soap-smoldering` | Soap-Smoldering \| got soap? | Your "natural scent" is a threat, not a flex. Lather. Rinse. Respect. |
| `/psas/unholy` | Unholy \| got soap? | Deodorant without a shower is just layering lies. Axe is not an exorcism. |
| `/psas/redemption` | The Redemption \| got soap? | Cleansing isn't just for your sins. Deodorant isn't divine intervention. Anyone can change. |
| `/psas/thirst-announcement` | Public Thirst Announcement \| got soap? | Your Tinder shouldn't come with a scratch-n-sniff warning. Wash accordingly. |
| `/sniff-test` | The Sniff Test — Field Assessment CW-7 \| got soap? | Seven questions between you and the truth your group chat already knows. Administered by CWAAA field assessors. |
| `/pledge` | The Lather Pledge — Form CW-1 \| got soap? | Declaration of Intent to Lather. Sign the oath, get filed in triplicate, and smell like you meant it. |
| `/crisis` | The Crisis \| Concerned Women Against Axe Abuse | The state of male hygiene, documented. A memorandum from the women who had smelled enough. |
| `/about` | The Reveal — Hope2 Studio \| got soap? | It was a portfolio piece the whole time. Here's the satire, the craft, and the woman who made it. |
| `/404` | Missing \| got soap? | This page didn't shower. It's gone. |

---

# 3. Home 🧼 (one 📋 seam)

### 3.1 Hero — self-clearing steam (~2s squeegee sweep over a widescreen re-stage of Poster 1; live type resolves as it clears)
> *A public service announcement · Funded by Concerned Women Against Axe Abuse*
> ## got soap?
> **Because he thinks the steam is hiding it. It never was.**

The sub is RATIFIED (v2.1): the steam wipes itself away while the line is read — the site performs the sentence; no replacement gets that interplay back. The signature above the mark uses the exact 90s-PSA credit format: the straight man the org name detonates against ("initiative"-style NGO phrasing is killed on sight).
Reduced-motion / LCP state: identical lines, steam pre-cleared.
Scroll cue: *"Keep scrolling. It only gets cleaner. He didn't."*

### 3.2 The five spots (eyebrow + pull-quote; poster shown untouched)

**Spot No. 1 — "A Clean Man Is A Confident Man"**
> *Because your Axe body spray isn't fooling anyone, cowboy.*
> `[ Post it in the locker room ]  [ View spot → ]`

**Spot No. 2 — "Soap-Smoldering"**
> *Because "it's just my natural scent" has never once been good news.*
> `[ Post it in the locker room ]  [ View spot → ]`

**Spot No. 3 — "Unholy"**
> *He washes. Daily. With soap. In this economy, that's basically a miracle.*
> `[ Post it in the locker room ]  [ View spot → ]`

**Spot No. 4 — "The Redemption"**
> *He sinned. He sprayed. He saw the loofah. Anyone can change.*
> `[ Post it in the locker room ]  [ View spot → ]`

**Spot No. 5 — "Public Thirst Announcement"**
> *He's scrubbed, sudsed, and would survive meeting your mother. And you?*
> `[ Post it in the locker room ]  [ View spot → ]`

### 3.2b The Flagship caption 🧼 (homev2 Campaign beat — v2.1)
One monumental untouched poster as the movement's propaganda; the gold caption is an **executable distribution order**, not a description, and must stay poster-agnostic (the owner swaps the flagship between Poster 5 and Unholy):
> **Pin him up in the locker room.**

*(Killed on sight and logged so it never resurfaces: "Hang him in the locker room" — violent/racial misreadings; "This is what clean looks like" — any soap brand could say it.)*

### 3.3 Sniff Test insert 🧼 (CWAAA-credited) — the Confrontation beat
Chrome provocation above the insert (v2.1 — replaces "Are you the fog?", which borrowed CWAAA's metaphor before the letterhead defines it; the dual-address turns exactly where the mirror element appears):
> # You've smelled him. Are you him?

> ## Seven questions between you and the truth your group chat already knows.
> One honest verdict. No wrong answers — only wet ones.
> `[ Take the Sniff Test → ]`
> *Administered by CWAAA field assessors. Assessment CW-7. Results forwarded automatically.*

### 3.4 The Movement — CWAAA letterhead seam 📋
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> *Office of Lather Compliance — Memorandum No. 26-114*
> ───────────────────────
> The men are not the problem. The men are, in most cases, lovely.
> **The fog is the problem.** We intend to lift it. In writing. With copies filed.
> Two million concerned women. One demand. Soap, applied regularly, as directed.
> `[ Read the full brief → ]` *(links /crisis)*

### 3.5 Pledge CTA band 🧼 (`marble-amber` on `grout-black`)
> ## Join the movement. Sign it — or send it to the man who should.
> Because "I usually shower" is not a hygiene routine. It's a confession.
> `[ Take the Lather Pledge → ]`

*(v2.1, specs §7.2: the declarant is the man — "Put it in writing" read as her swearing his oath. The heading now runs the dual-address engine in one sentence: him — sign it; her — send it.)*

### 3.6 Closing beat 🧼 (quiet, chrome-mist — v2.2: the THESIS, not a reveal)
> *None of these men are real. The problem is very, very real.*

*(v2.2, footer consolidation: the line stays — it names neither the joke nor the maker; PSA-sincere, commits to the bit. The meta tail "Got Soap? is a satirical campaign by Hope2 Studio." and the cta "See who's behind it →" are KILLED — style-lock §7. No route from this beat; the home's one /about path is the footer folio credit.)*

---

# 4. The PSAs — `/psas` + detail

### 4.1 Index 🧼
> # Public Service Announcements
> ## Series One
> Five announcements in the public interest, issued untouched. Study them at your leisure. Bathe at your earliest. Series Two arrives when the crisis does.

### 4.1b Installation plaque nav (accessibility surface — v2.1)
The chrome route plaque's `aria-label`:
> **The five announcements**

*Names the complete set in the campaign's own noun (from the index body's "Five announcements in the public interest"); a noun phrase, not an imperative, so the landmarks rotor reads cleanly — and no collision with Poster 5's title, which "Choose a public thirst announcement" (proposed, rejected) would have caused.*

### 4.2 Case notes (deadpan, edged) 🧼

**Spot No. 1 — `confident-man`**
> A cologne ad selling nothing but soap. Our cowboy doesn't smell *like* masculinity — he defines it, rinses it off, and reapplies in the morning like a person with standards. The gaze says power. The tile says he owns more than one bar of soap and knows where both of them are. Confidence isn't the cologne. It's not needing it.

**Spot No. 2 — `soap-smoldering`**
> The smolder, patched to the current version: now with self-awareness. He's fresh *and knows it*, which is the hottest thing a man can be and, statistically, the rarest. You could skip the wash. You could layer the spray. You will still never smell like him — and everyone at brunch will know which one you are. Lather. Rinse. Respect.

**Spot No. 3 — `unholy`**
> Some men leave a room speechless. Others leave a trail of Axe and a group chat full of screenshots. This one washes daily, with soap, which in the year of our Lord currently qualifies as a personality. Fragrance-ad drama, sermon-grade conviction: clean isn't a flex, it's the bare minimum, and he's wearing it like a crown.

**Spot No. 4 — `redemption`**
> He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had genuinely wronged the people standing next to it. Then, grace: a shower. A redemption arc told in steam, and the moral is short — deodorant is not divine intervention, and the gym does not count. Anyone can change. Some of you should start tonight.

**Spot No. 5 — `thirst-announcement`**
> No fog machine. No flex. A man who is scrubbed, sudsed, and, critically, *aware of it*: the "would introduce to Mom without a risk assessment" tier of clean. Consider this your notice. Personal hygiene is the floor, not a plot twist. This has been a public thirst announcement. Wash accordingly.

### 4.3 Download notice 🧼
> **Take one for the wall.**
> Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous.
> Attribution appreciated. Shame optional. Results not guaranteed but statistically likely.
> `[ Take one for the wall ]`

### 4.4 Prev/next
`← SPOT NO. n−1` · `SPOT NO. n+1 →`

---

# 5. Poster alt text (accessible + carries the joke) 🧼

- **P1:** *"A clean-cut man stands shirtless against steamy white tile under the headline 'got soap?' Baked poster text: 'A clean man is a confident man. Lather up. Smell like effort.' Funded by Concerned Women Against Axe Abuse."*
- **P2:** *"A lightly stubbled man leans on fogged tile beneath 'got soap?' Baked poster text: 'He's not just fresh — he's soap-smoldering. You could skip the wash… but you won't smell like him.'"*
- **P3:** *"A brooding man in a towel emerges from dark chrome-lit smoke under a chrome 'got soap?' Baked poster text: 'Washes daily. Uncommon. Unholy. Unreasonably hot. Axe is not an exorcism.'"*
- **P4:** *"A solemn, slicked-back man in smoky low light beneath a chrome 'got soap?' Baked poster text: 'Repent in warm water. Forgiveness is a full body cleanse. Deodorant isn't divine intervention.'"*
- **P5:** *"A confident Black man against warm amber marble under a gold-lit 'got soap?' Baked poster text: 'He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness. This has been a public thirst announcement.'"*

---

# 6. The Sniff Test — `/sniff-test` 🧼

### 6.1 Intro
> # The Sniff Test
> Seven questions. One verdict. Honesty optional — but it shows, the way it always does.
> `[ Begin assessment → ]`
> *Field Assessment CW-7 · Administered by CWAAA field assessors.*

### 6.2 Chrome
Progress: `QUESTION n OF 7 — FIELD ASSESSMENT CW-7` · `aria-live`: *"Question n of 7."*
Persistent footer: *"Answer honestly. The loofah already knows."*

### 6.2b Completion beat (transient ~1.2s, no score, then redirect)
> **Assessment complete.** Findings forwarded to the Records Division. Try to act normal.

### 6.3 The seven questions (a=0 … d=3)

**1. How many bars of soap are in your home right now?**
- Several. Strategically deployed.
- One. Somewhere. We've met.
- Does dish soap count?
- Soap is a construct.

**2. Describe your loofah.**
- Rotated quarterly, like a mattress.
- It's… seen some things. It doesn't talk about them.
- I use the wall. The wall is load-bearing now.
- What is a loofah and why are you in my bathroom.

**3. Finish the sentence: "I shower…"**
- Daily. With soap. Like it's not a whole thing.
- Most days. Unless the vibes are off.
- After the gym. I think about the gym constantly.
- When the group chat stages an intervention.

**4. What does your towel smell like?**
- Nothing. A towel should smell like nothing.
- Faintly of victory.
- A pond. A specific pond. It has a name.
- We don't smell the towel. We fear the towel.

**5. Your relationship with body spray is best described as:**
- A finishing touch. Never a foundation.
- Exclusive, committed, a little codependent.
- My primary weather system.
- I refer to applying it as "showering."

**6. A date says "you smell nice." You:**
- Say thanks. It's soap.
- Panic — which layer did they detect?
- Take full credit on behalf of Axe.
- This has genuinely never happened, and we both know why.

**7. Steam rises. You're in the shower. Your move?**
- Lather, rinse, self-respect.
- A quick rinse. Water is basically soap.
- Stand there, contemplating my rivals.
- I'm not in the shower. I am never in the shower.

### 6.4 Verdicts (`/sniff-test/<verdict>`) — static, shareable

*(Each verdict is a different temperature and a different closing device — no shared hinge. The pure "not X, it's Y" snap is spent once, on the pledge band; the verdicts don't reuse it.)*

**`soap-smoldering` — Certified Soap-Smoldering** 🧼 — *short, smug, done*
> ## Certified Soap-Smoldering
> You wash. Daily. With soap. Unreasonably hot of you.
> The men in these posters are fictional. You're proof the standard can be met by a real one. Frame this and hang it somewhere the others will see it and quietly panic.
> `[ Issue the announcement ]  [ Copy the citation ]  [ Take one for the wall ]  [ Request re-assessment ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`suds-curious` — Suds-Curious** 🧼 — *coaching, a gambler's metaphor*
> ## Suds-Curious
> There's a clean man in there. We can hear him tapping. Let him out.
> You own soap. You've met the loofah. You just keep betting a spritz will cover the gap between you and an actual shower, and that bet has never once paid out. Close it. One honest lather and you're on the good list. It's a short list. The view is excellent.
> `[ Issue the announcement ]  [ Copy the citation ]  [ Take one for the wall ]  [ Request re-assessment ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`axe-dependent` — Axe-Dependent** 🧼 — *cold open, clinical*
> ## Axe-Dependent
> We could smell you from the results page.
> What you're calling a signature scent is a rumor about a shower you didn't take, and everyone in a five-foot radius has already heard it. The good news is almost insulting: soap costs four dollars, works on contact, and asks nothing of your personality. Seek lather immediately.
> `[ Issue the announcement ]  [ Copy the citation ]  [ Take one for the wall ]  [ Request re-assessment ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`thirst-hazard` — Public Thirst Hazard** 🧼 — *anaphora into redemption*
> ## Public Thirst Hazard
> This has been a public thirst announcement. You were the announcement.
> You are why the group chat has a code word. You are why the rideshare cracks a window in January. Here's the part nobody tells you: this is a maintenance problem, not a character one, and maintenance is the easiest kind to fix. Soap. Water. The wild decision to use both. Nobody's beyond redemption. But the clock started the moment you read this.
> `[ Issue the announcement ]  [ Copy the citation ]  [ Take one for the wall ]  [ Request re-assessment ]`
> *Redemption starts in the shower.* `[ Take the Lather Pledge → ]`

Share default: *"I took the Sniff Test. Verdict: [Verdict]. #GotSoap gotsoap.netlify.app"*

---

# 7. The Lather Pledge — `/pledge` 📋 (Form CW-1)

### 7.1 Header
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> FORM CW-1 · **Declaration of Intent to Lather**
> *To be completed by the undersigned, of sound mind and disputed scent.*

### 7.2 Oath
> I, the undersigned, do solemnly swear:
> to lather daily;
> to retire body spray as a personality;
> to respect the loofah in word and deed;
> and never again to mistake deodorant for divine intervention.
> **Lather. Rinse. Respect.**

### 7.3 Fields (PT Serif; stamp-red required marks)
- `First name` *(required)* — *"As it will appear on the roll."*
- `Email` *(required)* — *"Where to send Movement Updates."*
- ☐ *(required)* **"I understand this is satire and also a binding moral contract."**
- Honeypot (hidden) · `form-name="lather-pledge"`

Submit: **`File my declaration`** · beside it: *"Filed in triplicate. One copy goes to the loofah."*

Validation errors (📋 procedural, never scolding):
- No name: *"A declaration requires a declarant. First name, please."*
- Bad email: *"The Records Division cannot file this email address as written."*
- Unchecked: *"The satire acknowledgment is required. It is binding. Morally."*

### 7.4 Success (SWORN stamp + ribbon badge)
> ## SWORN.
> Declaration filed, **[name]**. The Office of Lather Compliance thanks you and quietly believes in you.
> You are now on the roll of a movement that refuses to say how many it will take.
> `[ Issue the announcement ]  [ Copy the case number ]`
> *Movement Updates will arrive when there is movement.*

### 7.5 Privacy (in voice, true)
> *Your email does one job: Movement Updates — new posters, the occasional bulletin, nothing you'd resent. We don't sell it, share it, or hand it to "partners." Unsubscribe any time. CWAAA keeps records, not secrets.*

### 7.6 Badge share
> *"I took the pledge. Lather. Rinse. Respect. #GotSoap"*

### 7.7 Welcome email (📋 CWAAA — the pledge's missing follow-through)
**Plumbing note:** Netlify Forms has no native autoresponder. Until Buttondown is wired, send this via a tiny Netlify function or a Zapier/webhook step — or, at absolute minimum, treat the on-page SWORN state as the receipt and send this as the *first* Buttondown broadcast once that's live. Copy is ready either way.

> **Subject:** Your declaration has been filed.
> **Preview:** Form CW-1 received. The loofah's copy is in the mail.
>
> Dear [First name],
>
> This letter confirms that your **Declaration of Intent to Lather (Form CW-1)** has been received, reviewed, and filed in triplicate by the Office of Lather Compliance. One copy is retained for our records. One copy is yours to keep. The third, per protocol, goes to the loofah.
>
> You are now on the roll of a movement that declines to say how large it will grow. That is not a threat. It is a scent forecast.
>
> Your obligations, as sworn:
> — Lather daily.
> — Retire body spray as a personality.
> — Respect the loofah in word and deed.
> — Never again mistake deodorant for divine intervention.
>
> We will write again when there is movement — a new poster, a bulletin, the occasional finding from the Field Data Committee. Not often. We are concerned, not clingy.
>
> **Lather. Rinse. Respect.**
> The Office of Lather Compliance
> *Concerned Women Against Axe Abuse · Est. 2024*
>
> *P.S. Know someone whose declaration is overdue? You didn't hear it from us, but the assessment takes four minutes: [Sniff Test link]*
> *(footer: real unsubscribe link + physical-address line Buttondown/CAN-SPAM requires — kept in voice: "CWAAA National Office, Suite 2B, above the pharmacy.")*

### 7.8 "Movement Updates" newsletter — recurring template (📋)
Cadence: only when there's real news (new poster drop, milestone, a finding). Never filler — the privacy promise was "nothing you'd resent."

> **Subject formulas (rotate):** *"Bulletin from the Office of Lather Compliance"* · *"New evidence has come to light."* · *"Series [n]: a new announcement is now public."*
>
> **Structure:**
> 1. **Dateline opener** (📋 deadpan): *"For immediate release. The situation has developed."*
> 2. **The news** — one item, told straight: a new poster/spot (with the image), a milestone (*"the roll has passed [n] declarants"*), or a fresh Field Data finding.
> 3. **One deadpan aside** — a single bulletin-style joke, CWAAA voice, never smolder.
> 4. **One CTA** — take/retake the Sniff Test, share the new spot, or "tie one on for suds." One only.
> 5. **Sign-off:** *"Lather. Rinse. Respect. — The Office of Lather Compliance"* + unsubscribe/address footer.
>
> **Milestone-drop example subject + open:**
> *"Subject: The roll has passed 1,000. // Two million concerned women had a number in mind. We are one thousand closer to it. To the newest declarants: welcome. To the still-unsworn reading this over someone's shoulder — the form is open."*

---

# 8. The Crisis — `/crisis` 📋

### 8.1 Header
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> *Est. 2024 · Lather · Rinse · Respect*
> *A registered concern since 2024 · National Office, Suite 2B (above the pharmacy)*
> **A Memorandum on the State of Male Hygiene**

### 8.2 Our Founding
> Founded in 2024 by women who had smelled enough.
>
> What began as one book club's informal grievance log is now a national coalition with a single, reasonable demand: soap, applied to men, regularly. There was no founding incident — there were thousands, occurring simultaneously, in elevators and rideshares and the third row of every theater. What united our founders was not anger. Anger is loud. It was a quiet, unshakeable certainty that it did not have to smell like this.
>
> We wish to be clear. We do not oppose fragrance. We oppose *substitution.* A body spray is a citrus arrangement on a condemned building. We are not against men — several of us are related to them. We are against the fog, and we intend to lift it. In writing. With copies filed.

### 8.3 The State of Male Hygiene — Annual Findings (PT Serif table, ruled rows, tagged `FINDING 26-0n`)
*Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it.*

| Finding | |
|---|---|
| In independent testing, 100% of men who showered got measurably wet. | 26-01 |
| 9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study. | 26-02 |
| Axe body spray contains 0% soap. This figure has not improved since 1983. | 26-03 |
| 73% of body-spray applications occur *in lieu of*, not in addition to, a shower. | 26-04 |
| The average loofah in male ownership is 4.7 years old. Some are load-bearing. | 26-05 |

### 8.4 Scale
> **Two million concerned women. Chapters in all fifty states. One demand.**

### 8.5 Tie One On For Suds (ribbon program / pledge funnel)
> ### Tie One On For Suds
> Our washcloth ribbon says what words cannot: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won't leave — a gentle, constant reminder that soap exists and he is loved enough to use it. Wear it for the reformed. Wear it for the suds-curious. Then send him to put his intent in writing.
> `[ File Form CW-1 → ]`

### 8.6 Press Room (each "FOR IMMEDIATE RELEASE" — deadpan escalates the closer you read)
> — *June 2026* — **"CWAAA Statement on the Term 'Shower-Adjacent': No."**
> *"The Office of Lather Compliance has reviewed the submission. Proximity to a shower is not participation in one. This concludes our statement."*
>
> — *May 2026* — **"Coalition Rejects Proposed Compromise of 'Every Other Day, Roughly.'"**
> *"We thanked the delegation for coming. We did not thank them for the smell. Negotiations have adjourned."*
>
> — *April 2026* — **"Loofah Amnesty Weekend Declared a Success; 4,000 Surrendered, No Questions Asked."**
> *"Recovered items are being held at an undisclosed facility. Three were still warm. We do not wish to discuss the three."*
>
> — *March 2026* — **"Field Assessors Deployed to Sigma Chi; One Recovered, All Debriefed, Counseling Available."**
>
> — *February 2026* — **"CWAAA Responds to Claims That 'The Gym Counts': The Gym Does Not Count."**
> *"Sweat is not a rinse cycle. Repeat: sweat is not a rinse cycle. Please stop emailing us about this."*

### 8.6a Recovery Case Files (CWAAA "field testimonials" — the Got Milk celebrity-endorsement homage, parodied)
CWAAA authors and files these; the reformed man is *quoted inside* the document (a third comedic voice — the redeemed bro, earnest and self-roasting — quarantined to this block, never loose on the site). Each lands on a different beat so the arc never repeats. Every character is invented; the disclaimer covers it.

> **RECOVERY CASE FILES**
> *Documented recoveries, published with subject consent. Names changed to protect the reformed.*

**📋 CASE FILE RC-014 · Recovery, Verified**
> *"I do lawn care. I figured the smell was just… my finish. My natural top-note. I'd hit the Axe, maybe a Febreze coat if it was a two-day situation, and call that grooming. Then a girl left me on read after one date and texted back exactly once: 'the truck smelled like a hamper, man.' I took the Sniff Test. Public Thirst Hazard. I bought my first loofah since middle school. Swamp ass is real. I know that now. I'm sorry to everyone who's ridden in the truck."*
> — **Derek, 31.** Status: **REFORMED.** Showers daily. Truck aired out.

**📋 CASE FILE RC-022 · Recovery, Verified**
> *"Weekends were a lot. By Sunday I had no gas left for a shower, so I'd mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called 'a conversation.' There was a printout. I scored Axe-Dependent. Four dollars of soap later I'm a different man. Turns out Febreze was not, in fact, showering. I was the only one who didn't know."*
> — **Brayden, 27.** Status: **REFORMED.** Sheets washed, no longer seasoned.

**📋 CASE FILE RC-031 · Recovery, Verified**
> *"Honestly? I'm hot. I never thought hygiene mattered — I could pull regardless. What I couldn't figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I'd ace it. I did not ace it. Clean is the actual flex and I'd been coasting on face alone. Vanity got me in the door. Soap kept me there."*
> — **Chad (yes, really), 29.** Status: **CERTIFIED SOAP-SMOLDERING.** Insufferable again, but clean.

**📋 CASE FILE RC-039 · Recovery, Verified**
> *"I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect — and the finding about body spray containing 0% soap did something to me. Cologne is a garnish. You do not garnish a dumpster. I own soap now. The cologne goes on top of clean, which, it turns out, is the entire point."*
> — **Marcus, 34.** Status: **REFORMED.** Cologne demoted to garnish.

**📋 CASE FILE RC-047 · Recovery, Verified**
> *"Back on the apps at forty-six after the divorce. I'd been off the market so long I forgot the rules had teeth. My daughter looked me dead in the eye and said, 'Dad, you smell like the garage.' She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious — 'there's a clean man in there, let him out.' So I did. Three dates this month. She screens them now. We're both thriving."*
> — **Gary, 46.** Status: **REFORMED.** No longer smells like the garage. Daughter approves.

**📋 CASE FILE RC-052 · Recovery, Verified**
> *"My mom didn't yell. That's the thing. She just pulled me aside after Sunday dinner, quiet, and said, 'Baby, I love you, and I need you to hear this from me before you hear it from a girl: you have to shower more.' Then she texted me the link so I wouldn't have to look her in the eye. Suds-Curious. She was right — she's always right. I fixed it. Last month I brought Hannah from two doors down home for dinner. Mom cried. Hannah stayed for seconds. I owe both of them a shower's worth of gratitude and I intend to pay it daily."*
> — **Tyler, 26.** Status: **REFORMED.** Introduced a girl to Mom. Both approve. Mom is framing this case file.

**📋 CASE FILE RC-058 · Recovery, Verified**
> *"She said she'd drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn't joy — it was 'what does my room actually smell like,' and the answer scared me sober. I stream; my whole life happens in this chair; I'd quietly decided hygiene was an IRL problem and I don't do IRL. Shower for who, the webcam? It's shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life."*
> — **"Kaelthas," 22.** Status: **REFORMED.** Logs off to shower now. GG.

**📋 CASE FILE RC-063 · Recovery, Verified**
> *"I was a catch in 1978. Ask anyone who was there. I coasted on it for about five decades, and somewhere in the coasting, 'a shower every day' quietly became 'a shower when the spirit moves me.' I did not connect this to why my lady friend from the community center started driving with her window cracked in February. My buddy Earl said it at poker night, the way old friends do, with zero cushion: 'Ron. That's not your cologne. That's you.' Then he pulled this website up on his phone, right there over the cards. Public Thirst Hazard, at my age, with my reputation. I've showered daily since. Doris held my hand through the entire movie last Sunday. The catch still had it. He'd just stopped rinsing it."*
> — **Big Ron, 71.** Status: **REFORMED.** Doris approves. Window's back up.

**📋 CASE FILE RC-071 · Recovery, Verified** *(the short one — deliberate rhythm break)*
> *"I said cold rinses build character. They built a two-foot exclusion zone around me at all times. Took the quiz on a dare. It was not kind. I bought soap."*
> — **Sean, 34.** Status: **REFORMED.** Exclusion zone lifted.

> *Every recovery begins with a single honest assessment.* `[ Schedule a field assessment → ]` *(→ /sniff-test)*

### 8.6b Get your own case file (v2 — ties to the caption generator, mechanic §6)
The natural evolution: after the Sniff Test verdict (or standalone here), the user generates their **own** mock CWAAA case file to share — the roster becomes participatory, and every share is a new distribution unit. Client-side canvas render, watermarked, nothing stored (same guardrails as the caption generator: no UGC liability, profanity soft-filter, `gotsoap.netlify.app · #GotSoap` watermark).

Entry CTA (campaign 🧼, appears on the verdict page + here):
> **Think you're a recovery story? File your own.**
> `[ Generate my case file → ]`

Generator flow microcopy (📋 — the form is CWAAA's, played straight):
> **FORM RC-∅ · Self-Reported Recovery**
> — *Your handle or first name* → *"For the record. No last names; we're a nonprofit, not a courthouse."*
> — *Your verdict* → prefilled from the Sniff Test, or pick one.
> — *What finally got you into the shower?* → *"One line. Keep it honest; the loofah reads these."*
> Output: a shareable case-file card — `CASE FILE RC-[random] · Self-Reported`, their handle, verdict stamp, their line, status **REFORMED (PENDING VERIFICATION)** — with a wink in the corner: *"Verification is on the honor system. So was the funk."*
> `[ Issue my case file ]  [ Copy the case number ]`

*(v1 ships the fixed six above; this generator is a v2 build. Copy lives here so it's ready when the caption generator lands.)*

### 8.7 Fine print
> *CWAAA is a fictional advocacy body and is not affiliated with any real organization, fragrance, or your ex. Recovery Case Files are dramatizations; the subjects are invented and any resemblance to a specific unwashed man is a you problem, not a legal one. Findings are directional, emotional, and true in spirit. The Field Data Committee meets Thursdays. Form CW-1 confers no legal standing but considerable moral standing. Est. 2024.*

### 8.8 Exits 📋
> `[ Schedule a field assessment → ]` *(→ /sniff-test)*  ·  `[ File Form CW-1 → ]` *(→ /pledge)*

---

# 9. The Reveal — `/about` 🧼 (the only fourth wall break — the boldest copy on the site)

### 9.1 Opening
> # It was a portfolio piece the whole time.
> Got Soap? is a satirical hygiene-PSA campaign — a thirst-trap parody of the 90s "Got Milk?" ads, aimed at low-effort masculinity and the gallon of Axe some men deploy in place of a shower. It's told from the POV the satire aisle usually skips: the woman standing too close to it.
> The movement is fake. The craft is not. Neither is the frustration that started it.

### 9.2 Why it exists (Stacey's voice — the line a CD remembers)
> This started on a dating app, where men who hadn't met soap since the Obama administration were holding out for a 10 — clean, manicured, model-adjacent — while they themselves looked, and presumably smelled, like damp disappointment.
>
> "Got Milk?" got a generation to drink milk by making it a status symbol and putting it where kids already looked. So I did it for soap. Made *clean* the flex. Made *effort* the thirst trap. Aimed the whole thing where the ads would actually land — locker rooms, men's rooms, GQ — and let the women do the sharing, because they've been living the research the whole time.
>
> I'm not here to be nice about it. I'm here to be *right* about it, and funny, and unapologetic. That's the job.

### 9.3 Case study
> **Concept & art direction.** Every poster walks one tightrope: visually seductive, thematically ridiculous. Thirst-trap imagery, PSA-sincere copy, engineered to provoke, amuse, and push.
>
> **Execution.** Male models generated with openart.ai — then everything that makes them *ads* was done by hand in Photoshop: compositing, lighting, steam, chrome, marble, and a type system built to stay legible across every skin tone and background in the set. Where a legible fix killed the tone, I moved the light instead of the type.
>
> **The system.** Three registers — porcelain, smoke, marble — a fictional sponsor with its own identity and its own deadpan voice, and a campaign that smolders and files paperwork in the same breath. Built like it's real, because that's the whole point.

### 9.4 The pitch + contact
> ## Want a campaign like this?
> I'm **Stacey M. Breckel** — satirical creative director, graphic designer, content creator, and the studio behind **Hope2 Studio**. I make work that looks good *and* has a point of view: cheeky PSAs, full-scale parodies, brands that need teeth. There aren't many women working this lane. That's exactly why you want one.
> Let's make clean design dirty fun.
> **hope2studio@yahoo.com** *(obfuscated from scrapers)*
> `[ See the full campaign on Behance → ]` *(config-gated)*

### 9.5 Credit / legal *(v2.2 — split: the reveal is the page's voice, the disclaimer its fine print)*
> © Stacey Breckel 2025. A satirical spec campaign by Hope2 Studio.
>
> *Parody. Not affiliated with any brand, product, publication, or public-health organization. Models generated with openart.ai; art direction, compositing, and typography by hand.*
> *(The disclaimer relocated here from the global footer — v2.2 footer consolidation — reworded to do the legal job without announcing the joke. Freepik attribution renders only if a Freepik-derived texture ships.)*

---

# 10. 404 — `/404` 📋
> **MISSING**
> This page didn't shower. It's gone.
> If found, do not approach. Report all sightings to the Office of Lather Compliance.
> **CASE CLOSED** *(stamp-red)*
> `[ Return to the movement → ]`

---

# 11. QA sweep (pre-launch)
- [ ] "Because…" on the subheads that carry it · "Join the movement." on primary CTAs.
- [ ] Hashtag stack + funded-by gag + © line verbatim, every page.
- [ ] 🧼 / 📋 never blended on a single surface.
- [ ] No poster text re-typeset; every poster has voice-carrying alt text.
- [ ] No numeric score anywhere; no drag-to-wipe hero.
- [ ] Every utility control uses its in-fiction label.
- [ ] Runs the Stepford test (voice-bible): no line that any brand could've written; no explained jokes; no hedges.
- [ ] Zero lorem; external/social links config-gated.

### Anti-tic sweep (added after the humanizer + prose-critique review)
- [ ] **Antithesis budget:** the "not X, it's Y" snap appears at most twice site-wide (currently: pledge band + the hero setup-knockdown). Verdicts and case notes don't reuse it.
- [ ] **No recycled signature lines:** each marquee line has ONE home — "since the Obama administration" and "holding out for a 10" live only on /about §9.2; "rumor about a shower" is the Axe register, used once per surface.
- [ ] **Em-dash density:** no more than one em dash per short block; convert the rest to periods/commas (the staccato is punchier for this voice anyway).
- [ ] **Rule-of-three:** intentional triads only (Lather. Rinse. Respect. / Soap. Water. …). Break incidental triads into pairs or singles.
- [ ] **"She" isn't a reaction shot:** the woman shows up as authority/wit, not only as the nose that recoils. Vary her role across surfaces.
- [ ] **Four verdicts, four temperatures:** short-smug / coaching / clinical / anaphora-into-redemption — no shared shape or closing device.
- [ ] **Tonal line:** every blade lands on behavior or the double standard, never imported shock (no "body count"–type imagery).

---

# 12. Phase 5 addendum (2026-07-20) — the Phase 4 REDO consensus lands

**Deck re-version.** The frozen v2 deck above remains the base document. The 54 corrections argued
to consensus in the Phase 4 redo dialectic (R1–R4, no deadlocks) and validated as Phase 5 are
**deck-canonical** as recorded, string-verbatim, in `copy-correction-plan.md` §§1–7 — committed
alongside this deck and enforced against `copy.ts` + `dist/` by `site/scripts/fidelity-check.mjs`.
Where this addendum and the base deck disagree, the addendum wins.

**Slot index of what changed (final strings live in the plan, one per row):**

- **Chrome:** `labels.cwaaa.copyLink` · `labels.cwaaa.shareBadge` *(new)* · `scratchGag.rotation[1]`.
- **Home:** `home.movementSeam.body` (3 → 2 lines, reassurance lede dead) ·
  `home.movementSeam.featuredId`/`featuredCaption` *(new — RC-039; RC-071 home hardcode retired)* ·
  flagship pull slot omitted.
- **/psas:** `psas.downloadNotice.body` (full notice, index-only) · `psas.downloadNotice.compact`
  *(new)* · `psas.sniffRoute.*` *(new — the quiz spine)* · `posterCopy.unholy.pull` · four
  `caseNote` rewrites (soap-smoldering / unholy / redemption / thirst-announcement) · all five
  `alt` strings (no baked-text transcription; lightbox a11y contract in the plan §3).
- **Quiz + verdicts:** Q6 answer (d) · `verdicts.*.share` *(new, per-verdict — `sniffTest.shareDefault`
  retired)* · `verdicts.*.exit` (verdict-keyed) · `verdicts.thirst-hazard.body`.
- **/pledge:** consent label · `errors.noConsent` · `success.body` · success controls routed to the
  CWAAA label group · `badgeShare` + `badgeShareTitle` *(new)* · two `welcomeEmail.body` lines ·
  `newsletter.subjectFormulas` (token semantics in the plan §5).
- **/crisis:** `founding[2]` · `findings.rows[0]` · `ribbon.body` · `caseFiles.files` 9 → 5
  (RC-022/031/039/047 re-edited; RC-058 inherited verbatim; RC-014/052/063/071 cut — stay dead) ·
  `caseFiles.exitLine` deleted · `finePrint` (fully in-world).
- **/about:** `why[0]` · `why[2]` deleted · `pitch.body`.
- **Anchor note:** `masthead.credit` is now a LITERAL (CG2's source anchor moved here when the
  confident-man alt transcription died). Rendered output unchanged.

**Out of this pass:** the four missing-content items (plan §8), F1 (`vector2-citation-path-spec.md`),
and the posters (always).
