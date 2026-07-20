# Got Soap? — Site-Wide Adversarial Copy Review

**Reviewer:** Sol  
**Phase:** 3 — adversarial review  
**Date:** 2026-07-17  
**Scope:** every rendered or potentially rendered user-facing string in the current site source: campaign chrome, CWAAA chrome, home, `/psas` and all five poster pages, `/sniff-test` and all seven questions, all four verdicts, `/pledge` and its email copy, `/crisis` and all nine case files, `/about`, 404, metadata, share payloads, form states, labels, and alt/accessibility text.

## Verdict

**The concept is proven; the copy is not ready for final lock.** The Sniff Test converts, the two-author system is the portfolio-grade idea, and the campaign has several lines worth building a reputation on. The current draft is held back by the exact two failures the blind readers converged on: it **overproduces** and it **apologizes**. It also has three strategy-level defects the craft pass cannot treat as polish:

1. The home invites both readers into the Sniff Test, but the quiz gives the woman no way to act on a man. Vector 2 is broken at the conversion instrument.
2. The nine Recovery Case Files exhaust the reader, expose a generated template, and create a class/age pattern that breaches the behavior-only punch line.
3. `/pledge` and `/crisis` explicitly disclose the fiction, breaking the Onion-grade world outside the owner-locked `/about` reveal.

The interior copy does sit a rung below the home. The home usually **performs** the campaign; several poster notes, verdict passages, case files, and email lines **explain** it. The correction pass should not make the site meaner everywhere. It should remove apologies, preserve aspirational exits, cut repetition, and force every punch back onto chosen behavior and the entitlement gap.

## Evidence and ruling rules

This review applies, in order:

- `CAMPAIGN-INTENT.md` §8's ten criteria;
- Vivian Vane's Self-Audit and named banned moves;
- `reader-sim-evidence.md` as the felt-experience floor;
- `research-satirical-campaigns.md` as the external mechanism check;
- the posters, origin texts, voice bible, and style lock as tonal and decision locks;
- the vendored `llm-writing`, `writing-principles`, and `prose-critique` materials as diagnostic instruments.

Where readers diverged, I did not average them:

- **Aspiration stays; reassurance goes.** Dylan converted on the four-dollar soap exit because it preserved his identity. Maya and Priya rejected the copy's hugs because they retract the punch. Those are different moves.
- **The anger stays on `/about`.** That page is the portfolio reveal, not the male conversion funnel. The entitlement argument belongs there. One phrase still needs retargeting because it appraises the man rather than his behavior; that is precision, not softening.
- **Vector 3 is not missing.** Dylan demonstrated the denial-forwarding loop exactly: a man forwards the quiz to someone “worse” so he does not have to admit it hit him. Protect that mechanism.
- **`Est. MMXXIV` and `Est. 2024` are not a cohesion defect.** The campaign masthead and CWAAA seal are different authors in different borrowed registers, and the masthead form is owner-locked. Do not normalize them.

Machine and render floor at review time:

- `npm run copy-gates`: **6/6 pass**.
- Fresh Astro build: **16 pages built successfully**.
- Green gates establish invariants only. They do not alter any craft finding below.

## Severity key

- **P0 — blocks copy lock:** breaks the strategy, the punch-up line, or the committed fiction.
- **P1 — material campaign drag:** costs conversion, a laugh, shareability, or voice cohesion.
- **P2 — visible craft debt:** weakens a surface but does not break the campaign by itself.

## P0 — blocks copy lock

### F1. The Sniff Test promises two readers and serves only one

**Strings/surfaces:** Home: **“You've smelled him. Are you him?”**; `/sniff-test`: all seven prompts and all 28 answers; the absence of any sender/witness mode.

**Laws broken:** Intent criteria 2, 4, and 5; dual-address engine; share vector 2; Vivian Law 1 (the surface loses the campaign's one true thing when it narrows to self-diagnosis).

**Cost:** The home explicitly opens two doors—woman who has smelled him, man who may be him—but the quiz immediately closes the first. Maya is “the reason,” not the respondent, and the site gives her no envelope. That kills the plausible-deniability hint, even though the pledge already proves the campaign understands the correct pattern: **“Sign it — or send it to the man who should.”** This is a broken conversion path, not a missing quip.

**Direction:** Add a pre-assessment fork or companion action that preserves the current male self-assessment unchanged:

- **I might be him** → the existing quiz and existing denial-forwarding loop.
- **I've smelled him** → a witness/citation path that records her answers about a specific behavior pattern and produces a cold, numbered, screenshot-ready notice she can send.

The second path must not publicly name or shame a person, collect identifying data, or turn into harassment tooling. The joke stays on documented behavior. The output should feel issued by CWAAA, arrive without explanation, and route him back to the Sniff Test. Do not “fix” this by making all seven current questions gender-neutral; that would dilute the strongest conversion surface and break Vector 3 while still failing to give her an action.

### F2. The Recovery Case Files fail both the cull and the punch-up test

**Strings/surfaces:** all nine `crisis.caseFiles.files`; especially RC-014 Derek, RC-058 “Kaelthas,” RC-063 Big Ron, and RC-071 Sean; the repeated confession → quiz → verdict → reform → aphorism architecture.

**Laws broken:** Intent criteria 5, 8, 9, and 10; Vivian Laws 2, 5, and 6; anti-patterns “syntactic templating” and “tidy-summary endings.”

**Cost:** All three blind readers independently stopped at the same wall and asked for five. The section is long enough to make the site's self-editing look suspect, and its repeated arc makes the craft read generated. More seriously, the roster creates an unintended hierarchy: lawn-care worker, basement gamer, and older man carry the grossness; the affluent cologne buyer gets the cleanest metaphor; the conventionally hot man earns certification. Big Ron is the only file where age-associated body smell, rather than a chosen substitution behavior, becomes the joke. That breaches the campaign's only ethical line and weakens its defense everywhere else.

**Direction:** Ship **five**, not nine. In this pass:

- Cut RC-071; it is the weakest file and the wrong home-page proof.
- Remove RC-014, RC-058, and RC-063 from the current roster unless they are rebuilt around a chosen behavior rather than occupation, gamer identity, or age.
- Edit the five survivors into different forms and lengths. Not every file needs a life story, a quiz slug, a romantic reward, and a button line.
- Preserve distinct transmission mechanisms across the five: woman → man, man → man, anonymous coworker, self-recognition, and aspirational reward.
- End only the strongest one or two on aphorisms. Let statuses carry the button on others.

This is the place to obey **“write ten, keep one.”** Cutting four without breaking the template in the survivors will shorten the problem, not solve it.

### F3. Two rendered disclosures spend the joke outside `/about`

**Strings/surfaces:** `/pledge` consent **“I understand this is satire and also a binding moral contract.”**; its error **“The satire acknowledgment is required. It is binding. Morally.”**; `/crisis` fine print beginning **“CWAAA is a fictional advocacy body…”** and continuing **“Recovery Case Files are dramatizations…”**

**Laws broken:** Intent criteria 6 and 7; Vivian Laws 3 and 4; banned move “explaining the bit”; the owner-locked commit-to-the-bit ruling that places the rendered real-world disclosure at `/about`.

**Cost:** These are not legal clarity tucked into the real-world layer. They are visible fourth-wall breaks inside the two deepest CWAAA documents. The pledge asks the visitor to certify that the joke is a joke; the crisis dossier closes by explaining its own props. Both collapse transportation and make the reader reclassify the bureaucracy as a skit. That spends the exact craft Priya would hire.

**Direction:** Keep truthful parody and non-affiliation language at `/about` and in structured metadata, where the style lock already permits it. Keep the CWAAA surfaces in character:

- Consent can become **“I understand this declaration is a binding moral contract.”**
- The error can become **“The acknowledgment is required. Morally.”**
- Retain only in-world dossier fine print on `/crisis`—for example, the Field Data Committee's Thursday meeting and Form CW-1's moral standing. Remove the fictional/dramatization explanation from this surface.

The proposed consent cuts are stronger because the moral-contract joke already carries the acknowledgement; “this is satire” only annotates it.

## P1 — material campaign drag

### F4. The PSA archive entertains, then dead-ends before the conversion action

**Strings/surfaces:** `/psas` index and all five `/psas/[slug]` pages. Current explicit actions are **“Inspect the artifact,” “Post it in the locker room,” “Copy the citation,” “Take one for the wall,” “View the installation,”** and series navigation. None explicitly sends the reader to the Sniff Test.

**Laws broken:** Intent criterion 4; the declared CTA spine; research finding that awareness and admiration do not imply behavior.

**Cost:** Six art-heavy surfaces can be admired, downloaded, and exited without confronting the visitor. They perform the campaign's gallery function but fail the website's current job. This is the exact “shared and admired but did not convert” failure the Got Milk? research warns about.

**Direction:** Add one explicit Sniff Test route to the PSA index and to the poster-detail service band or series rail. The label may be shared because the action is structural; the surrounding lead should be surface-specific or absent. Do not repeat another paragraph-length joke five times. The CTA is the job: **Take the Sniff Test.**

### F5. The home movement proof opens with an apology and features the weakest file

**Strings/surfaces:** Home movement seam: **“The men are not the problem. The men are, in most cases, lovely.”** and featured RC-071, **“I said cold rinses build character…”**

**Laws broken:** Intent criteria 1, 6, and 10; banned moves “warmth tax,” “both-sidesing,” and “soft landing.”

**Cost:** The campaign finally produces filed human proof, then checks over its shoulder before showing it. Both women heard the lede as a flinch, and all three readers judged RC-071 the wrong proof. The home is leading with a leftover at the moment the fictional movement is supposed to become real.

**Direction:** Delete the reassurance lede; the reformed-hero exit is already embodied by the case file. After the roster cull, feature the strongest surviving case that demonstrates a transmission vector and ends on a knife. Do not replace the lede with a different reassurance. The section already has scale, paperwork, and a recovery; it does not need a hug.

### F6. The Public Thirst Hazard verdict explains, retracts, and lands soft

**Strings/surfaces:** **“Here's the part nobody tells you:”**; **“this is a maintenance problem, not a character one”**; **“maintenance is the easiest kind to fix”**; **“Nobody's beyond redemption.”**; exit **“Redemption starts in the shower.”**

**Laws broken:** Intent criteria 3, 6, 7, and 8; banned moves “throat-clearing,” “warmth tax,” and “soft landing”; `llm-writing` conversational bleed and defining by negation.

**Cost:** The highest-severity result should create the cleanest behavioral exit. Instead, it uses a content-marketing hook, explains the distinction, takes back its own diagnosis, and closes on a placeholder-grade wellness line. This is not the aspiration Dylan needed; it is apology. His actual conversion line—soap is cheap, works on contact, and asks nothing of his personality—proves the exit can stay open without reassuring him that nobody judged him.

**Direction:** Keep the two concrete consequences (**group-chat code word**, **rideshare window**) and give him one blunt, solvable action. Cut the hook, the character disclaimer, the ease explanation, and “Nobody's beyond redemption.” Replace **“Redemption starts in the shower”** with a verdict-specific button line that ends on the action or the clock, not the balm. Do not remove the exit; make it behavioral and aspirational.

### F7. The verdicts are pages, but their share units are form letters

**Strings/surfaces:** global verdict payload **“I took the Sniff Test. Verdict: [Verdict]. #GotSoap gotsoap.netlify.app”**; repeated exits **“Certified or not — sign the oath.”** on three verdicts; identical control set on all four; pledge share payload **“I took the pledge. Lather. Rinse. Respect. #GotSoap.”**

**Laws broken:** Intent criterion 5; research findings on social currency and portable screenshot units; Vivian Law 6.

**Cost:** The on-page verdict writing can be sharp, but the actual forwarded text is a receipt. It gives the sender no joke, flex, or roast and requires the destination page to do all the work. The repeated exit makes the second verdict feel like a reprint, exactly as Maya reported. The declared share unit is not yet written to travel.

**Direction:** Give each verdict its own one-sentence payload, understandable outside the page:

- Clean result: a flex another man can forward without sounding earnest.
- Middle results: a roast with an open ascent.
- Hazard result: a citation that makes the recipient want to prove it wrong.

Key the pledge cue to the result as well. The destination can remain Form CW-1; the sentence that gets the visitor there should not be identical. Give the pledge badge its own CWAAA filing payload rather than reusing a verdict announcement.

### F8. Four poster notes step out of the ad and explain the ad

**Strings/surfaces:** poster detail case notes, not the baked poster copy.

- Soap-Smoldering: **“The smolder, patched to the current version: now with self-awareness.”** This sounds like production commentary. **“You will still never smell like him”** closes the reformed-hero exit.
- Unholy: **“clean isn't a flex, it's the bare minimum, and he's wearing it like a crown.”** This defines by negation and contradicts the conversion equation: the campaign needs clean to become the flex.
- Redemption: **“A redemption arc told in steam, and the moral is short…”** names the device and states the moral after the poster already performed both.
- Public Thirst Announcement: **“No fog machine. No flex.”** and **“Personal hygiene is the floor, not a plot twist.”** tell the reader what the work is not and summarize its lesson.

**Laws broken:** Intent criteria 3, 7, 8, and 10; Vivian Laws 3 and 8; banned move “explaining the bit”; `llm-writing` defining by negation and conversational bleed.

**Cost:** The posters smolder, preach, and accuse. These notes often become curatorial captions about smoldering, preaching, and accusing. That is the interior-copy drop the brief predicted. Soap-Smoldering also moves from aspiration to permanent exclusion: he can admire the archetype but can never become it.

**Direction:** Rewrite these notes from inside their borrowed formats. Use the Confident Man note as the closer baseline: it extends the cowboy/cologne world, sells standards, and leaves the shower within reach. Each revised note should add a new scene or conditional aspiration, not interpret the poster. Keep the canonical images and baked words untouched.

### F9. Question 6's worst answer stops diagnosing behavior and declares social failure

**String:** **“This has genuinely never happened, and we both know why.”**

**Laws broken:** Intent criteria 3 and 9; the reformed-hero exit; Vivian Law 2.

**Cost:** The other high-scoring answers make the respondent confess to a choice—calling body spray a shower, fearing the towel, waiting for an intervention. This answer tells him women have never complimented him and claims the campaign knows why. Dylan lied here because the quiz stopped being a quiz. The line creates shame without collecting useful self-knowledge.

**Direction:** Replace it with an evasive behavior he can recognize and choose honestly: disbelief, checking which layer she detected, or mentally crediting the spray. Do not declare his romantic history for him. Preserve the four-answer severity ladder and the accidental-honesty mechanic.

### F10. CWAAA pays a warmth tax in the places it should file the hardest

**Strings/surfaces:** `/crisis` founding **“We wish to be clear”** and **“We are not against men — several of us are related to them.”**; ribbon **“a gentle, constant reminder that soap exists and he is loved enough to use it”**; case exit **“Every recovery begins with a single honest assessment.”**; pledge success **“thanks you and quietly believes in you.”**

**Laws broken:** Intent criterion 6; Vivian's anti-apology protocol; Stepford tests 1 and 5.

**Cost:** These lines do not create aspiration. They reassure the writer that the satire is kind. The founding paragraph surrounds the site's best line—**“A body spray is a citrus arrangement on a condemned building”**—with a disclaimer. The ribbon becomes a wellness intervention. The case exit becomes a twelve-step placeholder. The pledge success turns the Records Division into a supportive coach. Both women heard the flinch; Dylan did not need it to convert.

**Direction:** Cut the founding throat-clear and relatives disclaimer. Recast the ribbon as straight procedural symbolism and retain the send-him imperative. Delete the case-file exit line and let **“Schedule a field assessment”** do the work. End the pledge success on the filed status and movement roll, not belief. Keep **“We do not oppose fragrance. We oppose substitution.”** exactly; reader evidence shows that distinction disarms resistance and states the thesis.

### F11. The pledge success controls describe the wrong actions in the wrong author's voice

**Strings/surfaces:** `pledge.success.shareBadge` resolves to campaign label **“Issue the announcement”**; `pledge.success.copyLink` says **“Copy the case number”**, but the script copies the pledge URL; the share title is plain **“I took the Lather Pledge.”**

**Laws broken:** Intent criterion 10; style-lock rule that structural chrome must not misdescribe; the two-author quarantine.

**Cost:** The visitor is inside a filed CWAAA declaration, then receives a campaign verdict verb and a control that promises a case number that does not exist. This is not harmless plain chrome; it lies about function. It also makes the best part of the site—the joke living in the boring UI—less exact.

**Direction:** Either generate and copy a real filing/case number, or relabel the current URL action honestly. For the current plumbing, **“Circulate my declaration”** and **“Copy the filing link”** preserve CWAAA authorship and describe the actions. Route those strings through the CWAAA copy group. Give the share title the same filing voice.

### F12. `/about` asks permission twice and grazes the behavior-only line once

**Strings/surfaces:** **“There aren't many women working this lane. That's exactly why you want one.”**; **“I'm not here to be nice about it. I'm here to be right about it, and funny, and unapologetic.”**; **“looked, and presumably smelled, like damp disappointment.”**; pitch **“I make work that looks good and has a point of view.”**

**Laws broken:** Intent criteria 6, 8, and 9; Vivian banned move “permission cough”; Stepford test 1.

**Cost:** The work has already proved its authority. Saying “unapologetic” is an apology, and explaining the scarcity of women in the lane makes the pitch sound like a request to count difference as merit. **“That's exactly why you want one”** is the stronger claim, but it needs proof attached to it. **“Damp disappointment”** shifts from the chosen entitlement gap toward a total appraisal of how the man looks and smells; Dylan heard an argument being won rather than a joke landing. The generic “looks good / point of view” sentence could belong to any portfolio.

**Direction:** Keep the anger and the Obama-administration/holding-out-for-a-10 setup. Retarget its button onto the chosen mismatch: the five-day funk as lifestyle, the aerosol substitution, the bad-faith standards negotiation. Cut the “I'm not here…” paragraph. Replace the scarcity premise with demonstrated market value—the two-author world, the paperwork comedy, the campaign system—then land on the claim. Make the buyer pitch name what Stacey can do that the page has just proven.

This does **not** mean making `/about` friendlier to Dylan. The reveal is correctly optimized for the woman and the creative director. It means making the anger as precise as the rest of the campaign's defense.

## P2 — visible craft debt

### F13. The alt text transcribes the posters and then makes assistive-tech users hear it twice

**Strings/surfaces:** all five `posterCopy.*.alt` strings; the same alt reused in each lightbox.

**Law broken:** The repo's own alt-copy contract: carry the joke and describe the artwork; do not restate the poster text.

**Cost:** Every alt contains a **“Baked poster text:”** dump, which turns the image alternative into a transcription and repeats much of the adjacent title/pull/note. Opening the full-size view repeats the same alt again. Sighted users get one composed artifact; screen-reader users get a metadata preface and duplicate slogan block.

**Direction:** Rewrite each alt as one precise visual description with the archetype, setting, mood, and satirical action. Let the adjacent live title/pull/case note carry the campaign words. In the lightbox, avoid re-announcing the same description when the trigger and dialog title already identify a larger view. Poster 5's race remains relevant visual information; retain it without making identity the joke.

### F14. The Unholy pull is a dated tic and illegally lives on two surfaces

**String/surfaces:** **“He washes. Daily. With soap. In this economy, that's basically a miracle.”** on the home flagship and `/psas/unholy`.

**Laws broken:** Intent criteria 6, 8, and 10; style-lock rule against cross-surface recycling; Vivian reference half-life rule.

**Cost:** **“In this economy”** reads like a reused 2021 tweet format, not fragrance-ad sermon drama. Because the home imports the detail-page pull, the same weak button appears twice and announces the component architecture. It is also less aspirational than the baked poster's sharper sequence: **“Uncommon. Unholy. Unreasonably hot.”**

**Direction:** Give the home flagship its own `home.campaign.pull` or omit that slot; do not inherit the detail pull. Replace the detail pull with a line that extends the sermon/archetype and makes clean hot without explaining rarity through a meme. Do not edit the poster.

### F15. The download station componentizes a paragraph-length joke five times

**String:** **“Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous. Attribution appreciated. Shame optional. Results not guaranteed but statistically likely.”**

**Laws broken:** Intent criteria 8 and 10; Vivian Law 6; anti-pattern “syntactic templating” made literal through a shared component.

**Cost:** The first instance is serviceable. The second exposes the component; by the fifth, the joke has become boilerplate. Priya identified this exact repetition as an AI tell. The repeated paragraph also competes with the missing Sniff Test route.

**Direction:** Put the full distribution notice once on the PSA index. On detail pages, keep the voiced heading/button and a short functional line only—or give each poster a genuinely distinct placement provocation. Do not write five cosmetic variants of the same disclaimer.

### F16. One finding is a joke about nothing

**String:** **“In independent testing, 100% of men who showered got measurably wet.”**

**Laws broken:** Intent criteria 1, 4, and 5; Vivian Law 1.

**Cost:** The other findings expose substitution, neglect, or female recognition. This one proves water is wet. It has no double standard, no action, no sender currency, and no second layer. Dylan called it the only dud in the list.

**Direction:** Cut it. Replace it only if a new finding exposes the entitlement gap or a chosen workaround; do not preserve a five-row count for symmetry.

### F17. Small AI tells survive in scratch, email, and future newsletter copy

**Strings/surfaces:** scratch rotation **“We ran it twice, to be fair to him.”**; welcome email **“That is not a threat. It is a scent forecast.”** and **“We are concerned, not clingy.”**; newsletter subjects **“New evidence has come to light.”** and **“Series [n]: a new announcement is now public.”**

**Laws broken:** Intent criteria 6 and 8; banned moves “both-sidesing” and “defining by negation”; Stepford test 1.

**Cost:** These are small alone but diagnostic together. **“To be fair”** is the banned move verbatim. **“Not a threat / scent forecast”** and **“concerned, not clingy”** correct objections nobody raised. Two of three subject formulas could come from any newsletter. They flatten the hand precisely where CWAAA's procedural specificity should make utility copy memorable.

**Direction:** Cut to the load-bearing half where possible: **“It is a scent forecast.”** Delete the fairness clause and the clingy aside. Give future email subjects a document number, office, finding, or absurdly specific event. Utility does not require generic language when the borrowed format supplies better utility.

## What's missing

### 1. A woman-to-man citation path

This is the only missing mechanic that blocks the campaign's declared audience strategy. It needs a mode, an output, and a return route—not merely a new CTA label. See F1.

### 2. Portable result copy designed for the forward

The verdict URLs are shareable; the words attached to them are not yet share units. Each verdict and the pledge badge need a self-contained sentence that earns the sender social currency and still makes sense in a screenshot, text, or group chat. See F7.

### 3. A hard Sniff Test spine through the PSA archive

The campaign's most visually persuasive surfaces lack the declared conversion action. The index and five detail pages need an explicit route from archetype admiration to self-assessment. See F4.

### 4. Real-world proof that the campaign has left the website

Priya's buyer question is valid: a system that has run only in its own mock world is still a hypothesis. The site needs at least one real deployment artifact—a poster above a real urinal, in a locker room, or installed in a legitimate context—with a terse field caption. This is not another gallery. It is evidence the campaign can occupy culture.

### 5. A buyer-facing engagement answer on `/about`

**“Want a campaign like this?”** jumps directly to an email. A creative director still does not know the engagement shape: campaign concept only, concept plus system, art direction plus rollout, or how a first conversation works. Add a compact process/engagement block in Stacey's voice. It does not need a public rate card, but it must answer the buyer's next question before asking for contact.

### 6. Friction inside the CWAAA universe

Every documented subject converts and every institution agrees with CWAAA. One antagonist would make the organization feel larger: a rejected counterproposal, hostile letter to the editor, rogue chapter, disputed Form CW-1, or official appeal. The purpose is not more volume. It is conflict, which gives the borrowed bureaucracy something to do besides congratulate itself.

### What is **not** missing

- **Vector 3, man → man, already works.** Do not bolt on “bro” copy or explain the denial-forwarding behavior. Protect the group-chat cues, the quiz's honest-answer trap, and the ability to forward the test without admitting it landed.
- **Daily-life triggers already exist.** The towel, gym, body spray, date compliment, rideshare window, hoodie, and group chat repeatedly reactivate the campaign. Do not add a generic reminder program to satisfy a research checklist.
- **The reveal is correctly delayed.** The home does not need a second `/about` path or a satire disclaimer.

## Protected lines and decisions — do not “fix” these

- **“Because he thinks the steam is hiding it. It never was.”** Art-locked choreography.
- **“None of these men are real. The problem is very, very real.”** Owner-locked home thesis beat, including the doubled **very**.
- **“We do not oppose fragrance. We oppose substitution.”** The defensible thesis; reader-validated.
- **“A body spray is a citrus arrangement on a condemned building.”** The line-level bar.
- **“The good news is almost insulting: soap costs four dollars, works on contact, and asks nothing of your personality.”** The male conversion exit; do not confuse it with reassurance.
- **“Three were still warm. We do not wish to discuss the three.”** Trusts the reader; the refusal is the joke.
- **“The tenth asked to leave the study.”** Keep the missing explanation missing.
- **“Keep scrolling. It only gets cleaner. He didn't.”** Utility, thesis, and joke in one line.
- **“A rumor about a shower you didn't take.”** Concrete diagnosis that converted Dylan.
- **The seven-question tap-to-answer shape and the no-numeric-score verdict model.** The quiz is the strongest surface.
- **Plain structural chrome** where style-lock §4 permits it: **“Contents,” “On this page,” “Close,” “Previous,” “Next,” “Skip to content,”** and landmark noun phrases.
- **“The five announcements”** as the `/psas` navigation label; it avoids the locked title collision.
- **One neutral home path to `/about`**, the production folio credit, and the real-world structured metadata exemption.
- **All five baked posters.** This review concerns site copy only.

## Coverage ledger

Every string in the following groups was audited. Strings not named in a finding above are retained for this round; retention is not permission to bypass the later Vivian ⇄ Sol dialectic if a proposed fix changes their context.

| Surface | Strings audited | Disposition |
|---|---|---|
| Global campaign chrome | Mastheads, contents sheet, nav taxonomy, footer, hashtags, funded-by line, production credit, social label, scratch gag and rotations | Retain except F17 |
| Global utility/a11y | Skip link, share/copy feedback, lightbox trigger/close text, series navigation, landmark labels, seal/ribbon/wax titles, required annotations | Retain except F11 and F13 |
| SEO/metadata | All route titles/descriptions, four verdict title/lead pairs, poster JSON-LD, about Person/Organization JSON-LD | Retain; structured truth is owner-exempt |
| Home | Hero, evidence wall, flagship rail, Sniff Test confrontation, pledge band, CWAAA movement seam, closing thesis | F5 and F14; otherwise retain locks and winners |
| `/psas` index | Heading, series label, archive body, plaque titles/label, composite empty alt | F4; otherwise retain |
| Five poster pages | Five pulls, five case notes, five poster alts, lightbox text, share labels, download notice, previous/next and exits | F4, F8, F13, F14, F15 |
| `/sniff-test` | Intro, progress, seven prompts, 28 answers, Back, footer, completion, no-JS fallback | F1 and F9; otherwise protect the surface |
| Four verdicts | Names, leads, bodies, card chrome, controls, share payload, pledge cues and CTAs | F6 and F7 |
| `/pledge` | Letterhead, oath, three fields, help, consent, three errors, privacy, submit, success, share state, welcome email, P.S., footer note, newsletter subjects and milestone example | F3, F7, F10, F11, F17 |
| `/crisis` | Letterhead, founding, five findings, scale, ribbon, five releases, nine files and statuses, exit, fine print and route exits | F2, F3, F10, F16 |
| `/about` | Reveal, thesis/origin, three case-study blocks, pitch/contact, Behance label, credit and disclaimer | F12 plus missing buyer process |
| 404 | Meta, seal title, missing notice, status, return action | Retain |

## Correction order

1. Design the Vector 2 citation path and its safety boundary.
2. Cut/rebuild the case-file roster and replace the home proof.
3. Remove off-register fiction disclosures.
4. Restore the quiz CTA spine through `/psas`.
5. Rewrite the hazard verdict and portable share units.
6. Revoice the poster notes, CWAAA apologies, pledge controls, and `/about` permission copy.
7. Clear the P2 repetition, alt, and AI-tell debt.

The highest-leverage single editorial move is the case-file cull. The highest-leverage campaign move is the woman-to-man citation path. They solve different problems and neither substitutes for the other.
