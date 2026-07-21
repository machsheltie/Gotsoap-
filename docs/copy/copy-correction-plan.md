# Copy Correction Plan — Phase 5 roll-up of the Phase 4 REDO consensus

**Source of authority:** `phase4-redo-r1-vivian.md` → `phase4-redo-r2-sol.md` →
`phase4-redo-r3-vivian.md` → `phase4-redo-r4-sol.md`. **66/66 units resolved, zero deadlocks —
Stacey has nothing to break.** Provenance per item: `(R1)` = Vivian's proposal CLEARed by Sol;
`(R2#n)` = Sol's counter-text confirmed in R3/R4; `(R4#n)` = Sol's final ruling adopting Vivian's
R3 variant/replacement. This document compiles; it does not re-litigate. Scope: F2–F17.
F1 (vector-2 citation path) remains out → `vector2-citation-path-spec.md`.

**Implementation route:** copy lane only — deck + `site/src/content/copy.ts` + `style-lock.md`
addenda; components change only where a structural note below says so. No string edits outside this
plan. After implementation: `copy-gates` green + clean Astro build (floor, not proof), then
**Phase 6 blind re-read vs the 2026-07-17 baseline** is the real close-out.

---

## 1. Global labels & chrome

| Key | Agreed final | Rationale |
|---|---|---|
| `labels.cwaaa.shareBadge` *(new key; pledge success stops borrowing `labels.campaign.shareVerdict`)* | **"Circulate my declaration"** | Names the actual action in the author who owns the surface. (R1) |
| `labels.cwaaa.copyLink` | **"Copy the filing link"** | Stops promising a case number the plumbing doesn't mint; honest chrome per style-lock §4. (R1) |
| `scratchGag.rotation[1]` | **"No fragrance detected. We ran it twice."** | The banned "to be fair" both-sidesing goes; the unexplained second run becomes institutional disbelief. (R1) |

## 2. Home

| Slot | Agreed final | Rationale |
|---|---|---|
| `home.movementSeam.body` (3 lines → 2) | 1. **"The fog is now a matter of record. Copies have been filed."** 2. **"Two million concerned women. One demand. Soap, applied regularly, as directed."** | The "men are lovely" lede was the flinch both women flagged; line 1 no longer recycles the crisis founding's lift-it cadence (§8). (R1 + R2#18) |
| Featured movement case file | **RC-039 Marcus**, caption **"Ninety dollars of cologne. Zero bars of soap. The arithmetic arrived anonymously."** | Replaces weakest-file RC-071 with the anonymous-forward vector; "did the math, anonymously" misattached the adverb. (R1 + R2#20) |
| Home flagship pull slot | **Omit** — rail keeps kicker + "Pin him up in the locker room." + CTA | One order per rail; an imported second caption re-exposed the component seam. (R1) |
| **Structural:** RC-071 is hardcoded in the home component — the featured file must route through `copy.ts`. | | Copy-contract root-cause rule: the copy lane owns every home string. |

## 3. /psas index + poster pages

| Slot | Agreed final | Rationale |
|---|---|---|
| Index Sniff Test band *(new)* | Lead **"Every man in Series One was one shower away."** · CTA **"Take the Sniff Test →"** | Aspiration in the campaign's own action unit, not makeover-TV "Before" grammar; the archive finally routes to the conversion instrument. (R2#15) |
| Poster detail service band *(new)* | CTA **"Take the Sniff Test →"** only, no lead | Structural chrome doing the one job; no repeated lead = no fifth componentized joke. (R1) |
| `psas.downloadNotice.body` (index, once) | **"Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous. Attribution appreciated. Results statistically likely."** | "Shame optional" armed the strategy's forbidden mechanism; the negation hedge fell to the confident half. (R2#58) |
| Poster detail download line | **"Free to print. Aim it where he'll see it."** | Chrome-short instruction that arms placement; repeats without dying. (R1) |
| `posterCopy.unholy.pull` | **"He washes. Daily. With soap. The congregation is asked to remain calm."** | Keeps the gold-standard dual-address opener; the sermon world replaces the dated "in this economy" meme. (R1) |
| `posterCopy.soap-smoldering.caseNote` | **"He's fresh and he knows it: the rarest combination on the market. Steam, good posture, and the nerve to wear clean like cologne. Brunch remembers him. Be him by Saturday."** | One-blade economy; production commentary and the exit-closing "never smell like him" are gone, Saturday stays reachable. (R2#34) |
| `posterCopy.unholy.caseNote` | **"Some men leave a room speechless. Others leave a trail of Axe and a group chat full of screenshots. This one enters clean, and the congregation has one question: where has this man been? Chrome light, holy steam, testimony you can smell from the third pew — clean preaches. The water is right there. The sermon is optional."** | Clean stated as the flex (not "bare minimum" negation); adjacent repeat of the pull's washes-daily clause removed; congregation retained as recurring cast (R4#35). (R1 + R2#35) |
| `posterCopy.redemption.caseNote` | **"He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had wronged the people standing next to it. Then, grace: a shower. The steam took the confession. The towel handled absolution. He walked out the same man, and the people standing next to him stood a little closer. Some of you should start tonight."** | Performs the arc; "Anyone can change" stays on the pull it belongs to, "genuinely" was a dead intensifier. (R1 + R2#36) |
| `posterCopy.thirst-announcement.caseNote` | **"The risk assessor has been dismissed. The dinner reservation stands. One shower put him in the amber light; the next one keeps him there. Consider this your notice. Wash accordingly."** | Extends the Mom scene forward instead of restating the pull and collecting the baked sign-off. (R2#37) |
| `posterCopy.confident-man.alt` | **"A clean-cut, shirtless man meets the camera against bright white bathroom tile and rising steam, posed like soap finally hired a cologne model."** | Composes the joke visually; "actually selling soap" was the correction tell. (R2#50) |
| `posterCopy.soap-smoldering.alt` | **"A lightly stubbled man with damp hair leans against fogged white tile, wearing the deliberate smolder of a luxury fragrance ad after a shower."** | Describes the visible pose; slider language and mind-reading removed. (R2#51) |
| `posterCopy.unholy.alt` | **"A brooding man in a towel emerges from black smoke under chrome light, lit like a fragrance ad shot in a cathedral."** | One composed description; no baked-text transcription. (R1) |
| `posterCopy.redemption.alt` | **"A solemn man with slicked-back wet hair stands in dark smoke and low chrome light — a sinner freshly absolved by warm water."** | Visible evidence carries the absolution metaphor. (R1) |
| `posterCopy.thirst-announcement.alt` | **"A confident Black man stands against warm amber marble in golden light, meeting the camera with the composure of a man who showered on purpose."** | Race retained as visual information, joke attached to behavior. (R1) |
| **Structural — lightbox a11y contract (R2#55, confirmed as contract):** the enlarged image may be `alt=""` **only** when the dialog is named by the poster title **and** the trigger image has delivered the composed description once; otherwise the dialog receives one description — never two. | | Duplication fix must not become information loss. |

## 4. /sniff-test + verdicts

| Slot | Agreed final | Rationale |
|---|---|---|
| Q6 answer (d) | **"Bank the compliment against next week's showers."** | Scores a chosen hygiene substitution, not insecurity — restores the severity ladder and the behavior-only line inside the conversion instrument. (R2#38) |
| `verdicts.thirst-hazard.body` | **"You are why the group chat has a code word. You are why the rideshare cracks a window in January. Soap. Water. The wild decision to use both. Make it today. Retire the code word."** | Hook, character disclaimer, ease explanation, and "Nobody's beyond redemption" cut; the retire/do pronoun puzzle fixed; he performs the reward himself. (R1 + R2#22) |
| `verdicts.thirst-hazard.exit` | **"The rideshare window is still open."** | The consequence hangs until he acts; the generic clock failed the Stepford test. (R2#23) |
| Per-verdict share payloads *(replace single `shareDefault`)* | soap-smoldering: **"Verdict: Certified Soap-Smoldering. Frame this where the others can see it and quietly panic. #GotSoap gotsoap.netlify.app"** · suds-curious: **"Verdict: Suds-Curious. The clean man is in there, tapping. Tonight I hand him the soap. #GotSoap gotsoap.netlify.app"** · axe-dependent: **"Verdict: Axe-Dependent. My signature scent has been reclassified as a rumor. #GotSoap gotsoap.netlify.app"** · thirst-hazard: **"Verdict: Public Thirst Hazard. On file with CWAAA. Take the Sniff Test before you laugh. #GotSoap gotsoap.netlify.app"** | Each travels cold with sender social currency: same-page swagger echo (R2#25); behavior-in-the-unit, same-day (R4#26); owned self-roast (R1); named-instrument dare — the denial-forward trigger (R1). |
| Verdict-keyed pledge cues *(replace "Certified or not — sign the oath." ×3)* | soap-smoldering: **"Put it in writing. Raise the average."** · suds-curious: **"When he's out, sign him in."** · axe-dependent: **"Lather first. Sign second. The order matters."** | Flatters without the ringer fraud (R2#31); advances shower→roll without re-quoting lead or body (R4#32); sequences behavior before paperwork (R1). |

## 5. /pledge

| Slot | Agreed final | Rationale |
|---|---|---|
| `pledge.fields.consent.label` | **"I understand this declaration is a binding moral contract."** | "This is satire" annotated a joke the moral-contract clause already lands. (R1) |
| `pledge.errors.noConsent` | **"The contract requires acknowledgment. Morally."** | Points at the named object without doubling moral/morally; the stranded adverb keeps its punch. (R4#13) |
| `pledge.success.body` | **"Declaration filed, [name]. Your name is on the roll. Daily lather is now expected."** | Files once, names the sworn behavior, ends cold — no quiet belief, no abstract follow-through. (R2#42) |
| `pledge.success.shareBadge` → `labels.cwaaa.shareBadge`; `pledge.success.copyLink` → `labels.cwaaa.copyLink` | (§1 labels) | Two-author quarantine restored on the success controls. (R1) |
| `pledge.badgeShare` | **"Form CW-1 filed. Sworn to lather. The loofah retains a copy. #GotSoap"** · share title **"My Declaration of Intent to Lather is on file."** | The badge travels in the sponsor's filing voice. (R1) |
| `welcomeEmail.body` threat line | **"The Office classifies this as a scent forecast."** | Repairs the antecedent my negation cut orphaned; the warning becomes an office action. (R2#62) |
| `welcomeEmail.body` cadence line | **"Not often. The Committee has a caseload."** | Procedural busyness replaces "concerned, not clingy" defining-by-negation. (R1) |
| `newsletter.subjectFormulas` | 1. **"Bulletin No. [n] — [subject] · Office of Lather Compliance"** (`[subject]` required) · 2. **"[tag] is now public. It concerns the towel."** (`[tag]` renders the full stored tag; second sentence varies per bulletin's real object) · 3. **"Series [n] has entered the public record."** | Inbox information scent (R2#64); prevents "Finding FINDING 26-01" (R2#65); series-release formula CLEAR (R1). |

## 6. /crisis

| Slot | Agreed final | Rationale |
|---|---|---|
| `crisis.founding[2]` | **"We do not oppose fragrance. We oppose substitution. A body spray is a citrus arrangement on a condemned building. We are against the fog, and we intend to lift it. In writing. With copies filed."** | Throat-clear and relatives disclaimer cut; both protected lines verbatim; the full lift-it cadence keeps its one home here. (R1) |
| `crisis.findings.rows[0]` | **"87% of surveyed men require a partner who 'takes care of herself.' 14% remembered when they last washed their towel."** (FINDING 26-01) | Both percentages indict unequal standards of care; replaces the water-is-wet dud. (R2#60) |
| `crisis.ribbon.body` | **"Our washcloth ribbon carries the Coalition's official position: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won't leave. Wear it for the reformed. Wear it for the suds-curious. Then send him to put his intent in writing."** | Cause-campaign boilerplate and the double explanation gone; locked send-him imperative closes. (R2#40) |
| `crisis.caseFiles.files` 9 → **5** | Keep RC-022, RC-031, RC-039, RC-047, RC-058 · cut RC-014, RC-052, RC-063, RC-071 | Unanimous reader wall; removes the occupation/age identity breach; five distinct transmission vectors survive. (R1, CLEAR) |
| RC-022 quote | **"By Sunday I'd mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called 'a conversation.' There was a printout."** | Opens on the behavior; his own "efficient" carries the rationalization. (R2#2) |
| RC-022 status | **"REFORMED. Scored Axe-Dependent. Bought soap the same afternoon. Sheets no longer seasoned."** | Status absorbs the arc; the template breaks. (R1) |
| RC-031 quote | Current text through **"I did not ace it."** then **"I'd been coasting on face alone. Vanity got me in the door. Soap kept me there."** | Doctrine line cut — the aphorism demonstrates what it was explaining; the roster's one earned ending. (R2#4) |
| RC-031 status | **"CERTIFIED SOAP-SMOLDERING. Insufferable again, but clean."** (unchanged) | Restores the same obnoxious man — the reformed-hero exit without sanding him down. (R1) |
| RC-039 quote | **"I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect. Body spray contains 0% soap. Cologne is a garnish. You do not garnish a dumpster. I own soap now."** | The flat finding causes the garnish sequence; the vague "did something to me" hinge is gone. (R2#6) |
| RC-039 status | **"REFORMED. Cologne demoted to garnish. Referral source unidentified. Referral source knows."** | Repetition moved into bureaucratic classification; the anonymous vector stays the button. (R2#7) |
| RC-047 quote | **"Back on the apps at forty-six after the divorce. My daughter looked me dead in the eye and said, 'Dad, you smell like the garage.' She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious. I was in the shower before she'd backed out of the driveway. Three dates this month. She screens them now."** | The free-floating teeth metaphor cut; daughter, link, driveway lead. (R2#8) |
| RC-047 status | **"REFORMED. Shower routine restored. Three dates pending daughter review."** | Records behavior and advances the screening into office procedure instead of restating the quote. (R2#9) |
| RC-058 quote + status | **Inherited verbatim** (owner lock; retested and CLEAR twice) | The smell is the declared "IRL problem" choice, never gamer identity. |
| `crisis.caseFiles.exitLine` | **Delete** — "Schedule a field assessment →" stands alone | The twelve-step placeholder added words and subtracted edge. (R1) |
| `crisis.finePrint` | **"Recovery Case File names are changed under Office of Lather Compliance records policy. Recognition of an active subject does not constitute a filed declaration; the subject must complete Form CW-1. The Field Data Committee meets Thursdays. The form confers no legal standing but considerable moral standing. Est. 2024."** | Every fiction confession removed — including the inherited "true in spirit" — recognition becomes paperwork, she stays off the signature line, and the real-world disclosure lives at /about + structured metadata per the owner ruling. (R2#14) |

## 7. /about

| Slot | Agreed final | Rationale |
|---|---|---|
| `about.why[0]` | **"This started on a dating app, where men who hadn't met soap since the Obama administration were holding out for a clean, manicured, model-adjacent 10. Their offer: a five-day funk worn as a lifestyle, plus the serene conviction that she'd be lucky to have it. So I made them an ad campaign."** | The invoice split makes the double standard readable on first pass; the button lands on the entitlement gap, not an appraisal of the man. (R2#46) |
| `about.why[1]` | Unchanged | /about is the one surface where revealing the strategy is the payload. (R1, CLEAR) |
| `about.why[2]` | **Delete** | Announcing "unapologetic" is the apology; the page above is the proof. (R1) |
| `about.pitch.body` | **"I'm Stacey M. Breckel. Everything you just read — the campaign, the fake nonprofit, the paperwork that out-writes most brands' hero copy — came from one hand: mine. A dating app made me mad, so I declared a national hygiene crisis. I file my grudges in triplicate."** | Superseded R4#49 via the 2026-07-21 A1–A4 dialectic (`proposals-2026-07-21-about-pitch.md`): the Phase-6 blind read showed both women cooling at the sales pivot, so the title stack, services triad, and scarcity line ("Not many women drive it. That's exactly why you want one.") are cut — the sale now performs in the site's voice and ends on the proof-backed flex. |

**A1–A4 addendum (2026-07-21, not a correction row):** the same dialectic also replaced
`about.caseStudy[2].body` with the consensus text **"Porcelain. Smoke. Marble. Then I incorporated
the grudge. It smolders on the posters and files paperwork everywhere else."** — killing the
tidy-summary tail ("Built like it's real, because that's the whole point") Priya flagged blind.
Full record: `proposals-2026-07-21-about-pitch.md` (Slots 1–5, closed at consensus, no holds).

## 8. New work (missing-content items — not in this correction pass)

1. **Vector-2 citation path** — F1, own spec (`vector2-citation-path-spec.md`), own design pass.
2. **Real-world deployment artifact** — one poster photographed in a legitimate real placement with
   a terse field caption; evidence the campaign can occupy culture (Priya's buyer question).
3. **Buyer engagement block on /about** — the engagement shape (concept-only / concept+system /
   art direction+rollout, and how a first conversation works); the pitch's lane sentence names the
   skill, this names the purchase.
4. **CWAAA friction/antagonist** — one rejected counterproposal, hostile letter, or disputed Form
   CW-1; conflict makes the bureaucracy a universe.

## 9. Deadlocks for Stacey

**None.** All 66 units carry agreed final text or an agreed implementation contract.

## 10. Verification after implementation

1. `npm run copy-gates` green (invariant floor — currently 7/7 pre-implementation).
2. Clean Astro build, 16 pages.
3. Structural checks: featured home file routed through `copy.ts`; lightbox contract honored;
   newsletter tokens (`[subject]`, full `[tag]`) implemented as specified.
4. **Phase 6 — blind re-read (Maya / Dylan / Priya) vs the 2026-07-17 baseline.** The firewall
   holds: the readers get personas and rendered copy only. A line the two models agreed is funnier
   is a hypothesis until Maya laughs at it.
