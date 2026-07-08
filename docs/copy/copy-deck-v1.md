# Got Soap? — Website Copy Deck v1

**Status:** Launch-ready drafts for Stacey's punch-up · **Author of this doc:** copy pass, July 2026
**Binding:** `CLAUDE.md` §Non-negotiable rules · `docs/prd/PRD-gotsoap-web-v1.md` §3, §5 · `docs/design.md` §4 (two-author system)

## How to use this file
- Every string here is drop-in for the build. Keep them in **one content module** (PRD §13) so they're easy to sweep.
- **Voice invariants (never break):** subheads open with **"Because…"** · CTAs open with **"Join the movement."** · hashtag stack `#GotSoap · #SoapyThirstTrap · #CleanManEnergy` · sponsor gag **"Funded by Concerned Women Against Axe Abuse"** · `© Stacey Breckel 2025`.
- **Two authors, never blended.** 🧼 = **Campaign voice** (smolders — seductive, cinematic). 📋 = **CWAAA voice** (files — procedural, earnest, never flirts). A surface that mixes them is a bug.
- **The posters are the artwork.** Nothing here re-typesets or replaces baked-in poster text. Case notes and alt text *describe*; they never overwrite.
- Satire punches at **behavior and ad tropes, never identity.** Every "you" is redeemable; the reformed hero is the whole point.

### The dual-address rule (the spine of the whole voice)
Every line knows **which of two readers it's winking at — and the best lines work on both at once.** This is the Old Spice anatomy: aimed at *her*, loved by *him*.
- **The campaign voice speaks PSA at *him*** — "got soap?" is an accusation wearing a smile, asked of the man viewing it. The Sniff Test *is* the locker-room poster he takes voluntarily because it's funny.
- **The share layer speaks to *her*** — she's the distribution channel, the one who's lived the deprivation (every woman on a dating app). The site is a locker-room wall she can pin up herself.
- **CWAAA speaks *for* women institutionally** — the collective foot coming down, filed in triplicate.
- **Test for a hero line:** "He washes. Daily. With soap." flatters the reformed man *and* makes her laugh in recognition. Hold that register everywhere.

### In-fiction utility labels (the Liquid Death rule — never a bare "Share")
Every functional control is renamed in-world. Use these labels site-wide:
| Function | Label (campaign 🧼) | Label on CWAAA surfaces 📋 |
|---|---|---|
| Share a spot | **Post it in the locker room** | — |
| Share a verdict | **Issue the announcement** | — |
| Copy link | **Copy the citation** | **Copy the case number** |
| Download poster | **Take one for the wall** | — |
| Retake quiz | **Request re-assessment** | — |
| Submit pledge | — | **File my declaration** |
| Nominate a friend (v2) | **Report a suspect** | — |

*(Note on the hero — decided in the design thread: the fogged-mirror **drag-to-wipe is retired.** Steam clears itself in ~2s on load with a directional squeegee sweep, the live "got soap?" type resolving as it clears. Reduced-motion-safe, no labor demanded. Copy below reflects this. Overrides design.md §8.)*
*(Note on verdicts — decided in the design thread: **no numeric score anywhere.** The verdict names are the joke. Scoring stays internal plumbing.)*

---

# 1. Global chrome

### Nav labels (Libre Franklin, uppercase)
`THE PSAS` · `THE SNIFF TEST` · `THE PLEDGE` · `THE CRISIS`
Mark (left, Oswald lowercase): `got soap?`
Reveal/About lives in the footer + a quiet nav slot (`ABOUT` — subordinate, findable).

### Footer (every page) 🧼→seam→📋
> **Join the movement. Smell like you meant to.**
> `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`
> Funded by **Concerned Women Against Axe Abuse** → *(links /crisis)*
> © Stacey Breckel 2025 · A satirical spec campaign by **Hope2 Studio** → *(links /about)*
> *This is a parody. It is not affiliated with any brand, fragrance, publication, health organization, or your ex.*

### Scratch-n-sniff gag (first visit, dismissible — never a modal) 🧼
> **This website is certified 100% scent-free.** Unlike him.
> `[ Noted → ]`
Alt variants for rotation: *"You can't smell this page. Consider it a mercy."* · *"No fragrance detected. We checked twice."*

---

# 2. SEO / meta (per route)

Formula: informative first, "Because…" device where it fits, poster/verdict as OG image.

| Route | `<title>` | Meta description |
|---|---|---|
| `/` | got soap? — the movement | A public thirst announcement. Five posters, one demand: take the damn shower. Because your Axe body spray isn't fooling anyone. |
| `/psas` | The PSAs — Series One \| got soap? | The full public-service archive. Five thirst-trap hygiene PSAs, presented untouched. Study them. Then shower. |
| `/psas/confident-man` | A Clean Man Is A Confident Man \| got soap? | Spot No. 1. Because your Axe body spray isn't fooling anyone, cowboy. Smell like effort. |
| `/psas/soap-smoldering` | Soap-Smoldering \| got soap? | Spot No. 2. Because your "natural scent" isn't as charming as you think. Lather. Rinse. Respect. |
| `/psas/unholy` | Unholy \| got soap? | Spot No. 3. Because deodorant without a shower is just… layering lies. Axe is not an exorcism. |
| `/psas/redemption` | The Redemption \| got soap? | Spot No. 4. Because cleansing isn't just for your sins. Deodorant isn't divine intervention. |
| `/psas/thirst-announcement` | Public Thirst Announcement \| got soap? | Spot No. 5. Because your Tinder shouldn't come with a scratch-n-sniff warning. Wash accordingly. |
| `/sniff-test` | The Sniff Test — Field Assessment CW-7 \| got soap? | Seven questions. One verdict. Administered by CWAAA field assessors. How clean are you, really? |
| `/pledge` | The Lather Pledge — Form CW-1 \| got soap? | Declaration of Intent to Lather. Sign the oath, join two million concerned women, and smell swipe-worthy. |
| `/crisis` | The Crisis \| Concerned Women Against Axe Abuse | The state of male hygiene, documented. A memorandum from the women who had smelled enough. |
| `/about` | The Reveal — Hope2 Studio \| got soap? | Got Soap? is a satirical spec campaign by Stacey Breckel / Hope2 Studio. Here's how it was made — and how to hire the woman who made it. |
| `/404` | Missing \| got soap? | This page didn't shower. It's gone. |

---

# 3. Home — "The Movement" 🧼 (with one 📋 seam)

### 3.1 Hero — the self-clearing mirror (auto-clear steam, ~2s squeegee sweep)
Widescreen re-staging of Poster 1's world (text-free art; the headline is live HTML type that resolves as the steam clears). No drag, no labor.
> ## got soap?
> **Because he thinks the steam is hiding it. It is not.** *(sub — resolves as the glass clears)*

Reduced-motion / LCP-safe state (steam already cleared, same lines shown):
> ## got soap?
> **Because he thinks the steam is hiding it. It is not.**

Microcopy under the fold (scroll cue): *"Keep going. It gets cleaner."*

### 3.2 The five spots (eyebrow + pull-quote per section)
Poster shown untouched; these frame it. Eyebrow = Libre Franklin; pull-quote = Jost.

**Spot No. 1 — "A Clean Man Is A Confident Man"**
> *Because your Axe body spray isn't fooling anyone, cowboy.*
> `[ Share ]  [ View spot → ]`

**Spot No. 2 — "Soap-Smoldering"**
> *You could skip the wash. But you won't smell like him.*
> `[ Share ]  [ View spot → ]`

**Spot No. 3 — "Unholy"**
> *Washes daily. Uncommon. Unholy. Unreasonably hot.*
> `[ Share ]  [ View spot → ]`

**Spot No. 4 — "The Redemption"**
> *He sinned. He sprayed. But now? He showers.*
> `[ Share ]  [ View spot → ]`

**Spot No. 5 — "Public Thirst Announcement"**
> *He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness.*
> `[ Share ]  [ View spot → ]`

### 3.3 Sniff Test insert (campaign card, CWAAA-credited)
> ## How clean are you, really?
> Seven questions. One honest verdict. No wrong answers — only wet ones.
> `[ Take the Sniff Test → ]`
> *Administered by CWAAA field assessors. Assessment CW-7.* *(Montserrat credit line)*

### 3.4 The Movement — CWAAA letterhead block 📋 *(the first designed seam)*
Rendered as a manila letterhead excerpt with the seal:
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> *A memorandum on the crisis.*
> ───────────────────────
> It began, as these things do, with a single elevator ride.
> Two million women later, the demand has not changed: **lather, rinse, respect.**
> We are not asking for cologne. We are asking for soap. We are asking once.
> `[ Read the full brief → ]` *(links /crisis)*

### 3.5 Pledge CTA band 🧼 (`marble-amber` on `grout-black`)
> ## Join the movement. Sign the oath.
> Retire the body spray. Respect the loofah. Smell like you meant to.
> `[ Take the Lather Pledge → ]`

### 3.6 The Reveal beat 🧼 (quiet, chrome-mist — the punchline on page three)
> *None of these men are real. The problem is.*
> Got Soap? is a satirical campaign by Hope2 Studio. `[ See who's behind it → ]` *(links /about)*

---

# 4. The PSAs — `/psas` + detail pages

### 4.1 Index framing 🧼
> # Public Service Announcements
> ## Series One
> Five announcements in the public interest. Presented untouched, as issued.
> Study them at your leisure. Shower at your earliest.

### 4.2 Per-poster "case notes" (deadpan, adapted from `gotsoapdescription.txt`) 🧼

**Spot No. 1 — `confident-man` — "A Clean Man Is A Confident Man"**
> A luxury cologne ad with nothing to sell but soap. Our subject doesn't smell like masculinity — he defines it, then rinses it off and reapplies it in the morning. The gaze says power. The tile says *he actually washed the tile too.* Confidence isn't the cologne. It's knowing you don't need it.

**Spot No. 2 — `soap-smoldering` — "Soap-Smoldering"**
> The classic smolder, with one upgrade: self-awareness. He is not just fresh — he is fresh *and knows it*, which is the hottest thing a man can be. You could skip the wash. You could layer the spray. But you will never, ever smell like him. Lather. Rinse. Respect.

**Spot No. 3 — `unholy` — "Unholy"**
> Some men leave a room speechless. Others leave a trail of Axe and regret. This one washes — daily, with soap — which in the current climate qualifies as a miracle. Presented with the drama of a fragrance ad and the conviction of a sermon, because clean isn't a flex. It's the bare minimum, dressed up for church.

**Spot No. 4 — `redemption` — "The Redemption"**
> He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had not seen a loofah since spring. Then he saw the light — and the shower. This is a story of moral reform told in steam. Deodorant is not divine intervention. Redemption starts in the shower.

**Spot No. 5 — `thirst-announcement` — "Public Thirst Announcement"**
> No fog machine. No flex. Just a man who is scrubbed, sudsed, and — critically — *aware of it*. He is the "would introduce to Mom without hesitation" tier of clean. Consider this your notice: personal hygiene is the bare minimum, not a plot twist. This has been a public thirst announcement. Wash accordingly.

### 4.3 Download notice (mechanics §3) 🧼
> **Take him home. Put him up somewhere.**
> Free for locker rooms, dorm hallways, break rooms, and interventions.
> Attribution appreciated. Shame optional.
> `[ Download the poster ]`

### 4.4 Prev/next labels
`← SPOT NO. n−1` · `SPOT NO. n+1 →`

### 4.5 Series-continuity line (index footer) 🧼
> *Series One of an ongoing public-service effort. More announcements when the crisis demands them.*

---

# 5. Poster alt text (accessibility — carries the joke, PRD §6.4) 🧼

Real descriptive alt text, campaign voice, never `alt=""`. Describes image + baked headline.

- **Poster 1:** *"A clean-cut man stands shirtless against steamy white bathroom tile under the headline 'got soap?' Baked poster text: 'A clean man is a confident man. Lather up. Smell like effort.' Sponsored by Concerned Women Against Axe Abuse."*
- **Poster 2:** *"A lightly stubbled man leans against a fogged tile wall beneath 'got soap?' Baked poster text: 'He's not just fresh — he's soap-smoldering. You could skip the wash… but you won't smell like him.'"*
- **Poster 3:** *"A brooding man in a towel emerges from dark chrome-lit smoke under a chrome 'got soap?' headline. Baked poster text: 'Washes daily. Uncommon. Unholy. Unreasonably hot. Axe is not an exorcism.'"*
- **Poster 4:** *"A solemn, slicked-back man stands in smoky low light beneath a chrome 'got soap?' Baked poster text: 'Repent in warm water. Forgiveness is a full body cleanse. Deodorant isn't divine intervention.'"*
- **Poster 5:** *"A confident Black man stands against warm amber marble under a gold-lit 'got soap?' Baked poster text: 'He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness. This has been a public thirst announcement.'"*

---

# 6. The Sniff Test — `/sniff-test` 🧼 (CWAAA-administered)

### 6.1 Intro screen
> # The Sniff Test
> Seven questions. One verdict. Complete honesty is not required — but it *will* show.
> `[ Begin assessment → ]`
> *Field Assessment CW-7 · Administered by CWAAA field assessors.* *(Montserrat)*

### 6.2 Progress indicator + chrome
`QUESTION n OF 7 — FIELD ASSESSMENT CW-7`
`aria-live` announcement: *"Question n of 7."*
Persistent footer line under the answers: *"Answer honestly. The loofah already knows."*

### 6.2b Completion beat (transient, client-side only — replaces the numeric score)
On answering Q7, before redirect to the verdict page, show for ~1.2s:
> **Assessment complete.** Findings forwarded to the Records Division.
*(No score, ever. The verdict name is the payload.)*

### 6.3 The seven questions (punched up from mechanics §1; answers scored a=0 … d=3)

**1. How many bars of soap are in your home right now?**
- Several. Strategically deployed.
- One. Somewhere. Probably.
- Does dish soap count?
- Soap is a construct.

**2. Describe your loofah.**
- Rotated quarterly, like a mattress.
- It's… seen some things.
- I use the wall. The wall is fine.
- What is a loofah and why are you in my bathroom.

**3. Finish the sentence: "I shower…"**
- Daily. With soap. Like a legend.
- Most days. Unless the vibes are off.
- After the gym. I think about the gym often.
- When the group chat stages an intervention.

**4. What does your towel smell like?**
- Nothing. A towel should smell like nothing.
- Faintly of victory.
- A pond. A specific pond.
- We do not smell the towel. We fear the towel.

**5. Your relationship with body spray is best described as:**
- A finishing touch. Never a foundation.
- Exclusive. Committed. A little codependent.
- My primary weather system.
- I refer to applying it as "showering."

**6. A date says "you smell nice." You:**
- Say thanks. It's soap.
- Panic. Which layer did they detect?
- Take full credit on behalf of Axe.
- This has genuinely never happened.

**7. Steam rises. You're in the shower. Your move?**
- Lather, rinse, self-respect.
- A quick rinse. Water is basically soap.
- Stand there, contemplating my rivals.
- I'm not in the shower. I am never in the shower.

### 6.4 Verdict pages (`/sniff-test/<verdict>`) — static, shareable

**`soap-smoldering` — Certified Soap-Smoldering (0–5)** 🧼
> ## Certified Soap-Smoldering
> You wash. Daily. With soap. Unreasonably hot of you.
> You are not the problem. You are the poster. Frame this and hang it where the others can see.
> `[ Share the verdict ]  [ Copy link ]  [ Download card ]  [ Retake ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`suds-curious` — Suds-Curious (6–10)** 🧼
> ## Suds-Curious
> There's a clean man in there somewhere. We can hear him. Release him.
> You've got the instinct — you just keep negotiating with it. Stop negotiating. Lather.
> `[ Share the verdict ]  [ Copy link ]  [ Download card ]  [ Retake ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`axe-dependent` — Axe-Dependent (11–15)** 🧼
> ## Axe-Dependent
> That's not a scent. That's a cover-up. Seek lather immediately.
> The good news: soap is cheap, available, and legal in all fifty states. The rest is up to you.
> `[ Share the verdict ]  [ Copy link ]  [ Download card ]  [ Retake ]`
> *Certified or not — sign the oath.* `[ Take the Lather Pledge → ]`

**`thirst-hazard` — Public Thirst Hazard (16–21)** 🧼
> ## Public Thirst Hazard
> This has been a public thirst announcement. You were the announcement.
> We're not angry. We're a nonprofit; we don't have the budget for angry. We're *concerned*.
> `[ Share the verdict ]  [ Copy link ]  [ Download card ]  [ Retake ]`
> *Redemption starts in the shower.* `[ Take the Lather Pledge → ]`

Share default text (Web Share API / copy): *"I took the Sniff Test and the verdict is in: [Verdict]. #GotSoap gotsoap.netlify.app"*

---

# 7. The Lather Pledge — `/pledge` 📋 (Form CW-1)

Fully CWAAA-authored (manila, PT Serif, seal header). This is the email list in a satire costume.

### 7.1 Document header
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> FORM CW-1 · **Declaration of Intent to Lather**
> *To be completed by the undersigned, of sound mind and questionable scent.*

### 7.2 The oath
> I, the undersigned, do solemnly swear:
> to lather daily;
> to retire body spray as a personality;
> to respect the loofah in word and deed;
> and never again to mistake deodorant for divine intervention.
> **Lather. Rinse. Respect.**

### 7.3 Fields (labels in PT Serif; required marks in stamp-red)
- `First name` *(required)* — placeholder: *"As it will appear on the roll."*
- `Email` *(required)* — placeholder: *"Where to send Movement Updates."*
- ☐ *(required checkbox)* **"I understand this is satire and also a binding moral contract."**
- Honeypot (hidden, Netlify) · `form-name="lather-pledge"`

Submit button: **`File my declaration`** · microcopy beside it: *"Filed in triplicate. One copy goes to the loofah."*

Validation errors (📋 procedural-earnest, never scolding):
- No name: *"A declaration requires a declarant. First name, please."*
- Bad email: *"The Records Division cannot file this email address as written."*
- Checkbox unticked: *"The satire acknowledgment is required. It is binding. Morally."*

### 7.4 Success state (red SWORN stamp + ribbon badge)
> ## SWORN.
> Your declaration is filed. You are officially one of us now.
> **You are pledge no. [—] of a movement that refuses to count how many it will take.**
> `[ Share your badge ]  [ Copy link ]`
> *Welcome to the roll. We'll be in touch — cleanly.*

### 7.5 Privacy microcopy (in voice, but true)
> *We use your email for one thing: Movement Updates — new posters, the occasional bulletin, no more than you'd tolerate from a friend with strong opinions about soap. We don't sell it, share it, or hand it to third parties. Unsubscribe any time; we'll be sad but hygienic about it.*

### 7.6 Pledge badge share text
> *"I took the pledge. Lather. Rinse. Respect. #GotSoap"*

---

# 8. The Crisis — `/crisis` 📋 (CWAAA's site-within-a-site)

Full CWAAA authorship. The org never flirts; it documents. Every number is absurd on its face — no disclaimers inside the body (the footer line does that job).

### 8.1 Letterhead header
> **CONCERNED WOMEN AGAINST AXE ABUSE**
> *Est. 2024 · Lather · Rinse · Respect*
> **A Memorandum on the State of Male Hygiene**

### 8.2 Founding myth
> Concerned Women Against Axe Abuse was founded in 2024 by women who had smelled enough.
>
> What began as one book club's informal grievance log is today a national coalition with a single, reasonable demand: soap, applied to men, regularly. There was no founding incident — there were thousands, occurring simultaneously, in elevators and rideshares and the third row of every movie theater. What united our founders was not anger. Anger is loud. It was a quiet, shared, unshakeable certainty that it did not have to be this way.
>
> We wish to be clear: we do not oppose fragrance. We oppose *substitution.* A body spray is a citrus arrangement on a condemned building. We are not against men — we are against the fog. There is a difference, and we intend to teach it. In writing. With copies filed.

*(Letterhead sub-line under the org name: "A registered concern since 2024 · National Office, Suite 2B (above the pharmacy)".)*

### 8.3 "The State of Male Hygiene — Annual Findings" (annual-report table, PT Serif, ruled rows, each row tagged `FINDING 26-0n`)
Sub-line under the heading: *"Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it."*

| Finding | Figure |
|---|---|
| In independent testing, men who showered got measurably wet | 100% |
| Women who correctly identified which volunteer had showered | 9 out of 10 *(the tenth asked to leave the study)* |
| Soap content of leading body spray, unchanged since 1983 | 0% |
| Body-spray applications occurring *in lieu of*, not in addition to, a shower | 73% |
| Average age of a loofah in male ownership | 4.7 years *(some are load-bearing)* |
| Dermatologists who have asked us to stop calling | 9 out of 10 |

### 8.4 Chapters / scale (deadpan)
> **Two million concerned women. Chapters in all fifty states. One demand.**

### 8.5 "Tie One On For Suds" — ribbon program (doubles as pledge funnel)
> ### Tie One On For Suds
> Our signature program. Tie a washcloth ribbon where he'll see it — the rearview mirror, the gym bag, the doorknob of the room he refuses to leave — as a gentle, constant reminder that soap exists and he is loved enough to use it.
> Every ribbon is a pledge. Every pledge is a beginning.
> `[ File Form CW-1 → ]` *(links /pledge)*

### 8.6 Press Room (deadpan headlines, each "FOR IMMEDIATE RELEASE")
> — *June 2026* — **"CWAAA Statement on the Term 'Shower-Adjacent': No."**
> — *April 2026* — **"Loofah Amnesty Weekend Declared a Success; 4,000 Surrendered, No Questions Asked."**
> — *February 2026* — **"CWAAA Responds to Claims That 'The Gym Counts': The Gym Does Not Count."**

### 8.7 Fine-print satire signals (bottom of page, small)
> *CWAAA is a fictional advocacy body and is not affiliated with any real organization, fragrance, or your ex. Findings are directional, emotional, and true in spirit. The Field Data Committee meets Thursdays. Form CW-1 confers no legal standing but considerable moral standing. Est. 2024.*

### 8.8 CWAAA-voice exits
> `[ Schedule a field assessment → ]` *(links /sniff-test)*  ·  `[ File Form CW-1 → ]` *(links /pledge)*

---

# 9. The Reveal — `/about` 🧼 (the only fourth-wall break)

Calm, porcelain register. A professional handshake wearing the campaign's clothes.

### 9.1 Opening
> # None of these men are real. The problem is.
> Got Soap? is a satirical hygiene-PSA campaign — a thirst-trap parody of the 90s "Got Milk?" ads, aimed squarely at low-effort masculinity and the gallon of Axe some men deploy in place of a shower. It's told from the point of view the satire space usually forgets: the woman standing too close to it.
> It is also, entirely, the work of one designer.

### 9.2 The why
> It started on a dating app. Endless men who looked like they'd ghosted both women *and* basic hygiene — scraggly, unwashed, drowning it in body spray — while expecting a partner who was manicured, model-esque, and fresh out of the shower they themselves were avoiding.
> "Got Milk?" got a generation to drink more milk by making it a status symbol, plastered where kids already looked. So: what if you did that for soap? Make clean the flex. Make effort the thirst trap. Lightly roast the funk — and mean it with a wink.

### 9.3 Case study (from `promo.txt`)
> **Concept & art direction.** Every poster walks one tightrope: visually seductive, thematically ridiculous. High-contrast thirst-trap imagery paired with slogan copy engineered to provoke, amuse, and push.
>
> **Execution.** The male models were generated with openart.ai — then everything that makes them *ads* was done by hand in Photoshop: compositing, lighting, steam, chrome, marble, and a typographic system built to stay legible across every skin tone and background in the set (Phenix American, Futura PT, Franklin Gothic, Montserrat — layered glow, shadow, bevel, and stroke). Where legible solutions killed the tone, the fix was micro-adjusting light and texture instead of compromising the type.
>
> **The system.** Three visual registers — porcelain, smoke, marble — a fictional sponsor with its own identity, and a voice that smolders and files in the same breath. Built like a real campaign, because that's the point.

### 9.4 The pitch + contact
> ## Want a campaign like this?
> I'm **Stacey M. Breckel** — satirical creative director, graphic designer, and content creator behind **Hope2 Studio**. I make work that looks good *and* says something: cheeky PSAs, full-scale parodies, and brands that need a little bite.
> Let's make clean design dirty fun.
> **hope2studio@yahoo.com** *(obfuscated from scrapers)*
> `[ See the full campaign on Behance → ]` *(config-driven; renders only when URL set)*

### 9.5 Credit / legal
> © Stacey Breckel 2025. A satirical spec campaign by Hope2 Studio. All visual elements are parody and not affiliated with any brand, product, publication, or public health organization. Male models generated with openart.ai; all art direction, compositing, and typography by hand.
> *(Freepik attribution line — "Designed by macrovector_official / Freepik" — renders only if a Freepik-derived texture ships in web assets.)*

---

# 10. 404 — `/404` 📋 (CWAAA missing-poster notice)

Manila document, seal, PT Serif.
> **MISSING**
> This page didn't shower. It's gone.
> We've filed a report. We are not optimistic.
> **CASE CLOSED** *(stamp-red)*
> `[ Return to the movement → ]` *(links /)*

---

# 11. Copy QA checklist (sweep before launch)
- [ ] Every subhead that should carry it opens with **"Because…"** (posters + spot intros).
- [ ] Every primary CTA that should carry it opens with **"Join the movement."** (band, footer).
- [ ] Hashtag stack exact + in order: `#GotSoap · #SoapyThirstTrap · #CleanManEnergy`.
- [ ] Sponsor gag verbatim: **"Funded by Concerned Women Against Axe Abuse."**
- [ ] `© Stacey Breckel 2025` on every page footer.
- [ ] 🧼 and 📋 voices never blended on a single surface (crisis/pledge/404 = 📋; everything else = 🧼).
- [ ] No poster text re-typeset or paraphrased *as if it were the poster* — case notes describe only.
- [ ] Every poster has voice-carrying alt text; no `alt=""`.
- [ ] No "this is satire!" banner anywhere except /about + the footer parody line.
- [ ] Satire targets behavior/tropes, never identity; reformed-hero framing intact.
- [ ] Zero lorem ipsum; all links config-gated (no dead social icons).
