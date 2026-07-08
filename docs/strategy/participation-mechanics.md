# Got Soap? — Participation Mechanics Catalog

The website's job (per `docs/research/got-milk-campaign-analysis.md`, approved) is to add the two
dimensions the posters can't carry: the **movement fiction** and the **participation loop**.
This catalog defines every candidate mechanic, its effort/impact, and the recommended phasing.

Phasing is a recommendation — reorder freely. Effort assumes a static Astro/Netlify build.

---

## Mechanic 1: The Sniff Test (quiz → shareable verdict card) — **v1, the centerpiece**

A mock self-assessment in deadpan PSA voice. 7 questions, 4 answers each (scored 0–3),
total 0–21 mapped to 4 verdict archetypes. The verdict is the shareable payload.

**Why it's the centerpiece:** it gives every visitor a personal deprivation moment (Got Milk?'s
core mechanic, turned on the viewer), and the verdict card is the viral unit — people share
results that flatter or roast them.

**Verdict archetypes (score bands):**

| Score | Verdict | Card copy direction |
|-------|---------|---------------------|
| 0–5 | **Certified Soap-Smoldering** | "You wash. Daily. With soap. Unreasonably hot of you." |
| 6–10 | **Suds-Curious** | "There's a clean man in there somewhere. Release him." |
| 11–15 | **Axe-Dependent** | "That's not a scent, that's a cover-up. Seek lather immediately." |
| 16–21 | **Public Thirst Hazard** | "This has been a public thirst announcement. You were the announcement." |

**Draft questions** (draft copy — Stacey punches up before launch):

1. How many bars of soap are currently in your home?
   (a) Several, strategically deployed · (b) One, somewhere · (c) Does dish soap count? · (d) Soap is a construct
2. Your loofah. Describe it.
   (a) Rotated quarterly, like a mattress · (b) It's… seen things · (c) I use the wall · (d) What's a loofah
3. Complete the sentence: "I shower…"
   (a) Daily. With soap. Like a legend. · (b) Most days, unless the vibes are off · (c) After the gym. I think about the gym a lot. · (d) When the group chat stages an intervention
4. What does your towel smell like?
   (a) Nothing. Towels should smell like nothing. · (b) Faintly of victory · (c) A pond? · (d) Do not smell the towel
5. Your relationship with body spray:
   (a) A finishing touch, not a foundation · (b) We're exclusive · (c) It's my primary weather system · (d) I refer to it as "showering"
6. A date says "you smell nice." You:
   (a) Say thanks. It's soap. · (b) Panic — which layer did they detect? · (c) Take credit on behalf of Axe · (d) This has never happened
7. Steam rises. You're in the shower. What's your move?
   (a) Lather, rinse, self-respect · (b) A quick rinse. Water is basically soap. · (c) Stand there contemplating my rivals · (d) I'm not in the shower. I'm never in the shower.

**Share flow (v1 — no canvas, no backend):**
- 4 pre-designed verdict cards, made by Stacey in Photoshop (on-brand beats generated):
  1200×630 (OG/link preview) + 1080×1350 (IG story/feed) per verdict.
- Each verdict gets a static URL (`/sniff-test/soap-smoldering` etc.) with its own OG meta,
  so a shared link previews the verdict card. Web Share API button + copy-link + download-image.
- **v2 upgrade:** client-side canvas personalization (user's first name on the card).

**Effort:** medium · **Impact:** high · **Phase: v1**

---

## Mechanic 2: The Lather Pledge (email capture) — **v1, the conversion asset**

Mock-solemn pledge form. This is the legitimate email list wearing a satire costume.

**Draft pledge copy:**
> I, the undersigned, do solemnly swear: to lather daily; to retire body spray as a
> personality; to respect the loofah; and never again to mistake deodorant for divine
> intervention. **Lather. Rinse. Respect.**

**Fields:** first name, email, one checkbox: "I understand this is satire and also a binding moral contract."

**Plumbing (v1):** Netlify Forms — form lives in static HTML (`data-netlify="true"` + honeypot),
zero external services, free tier ~100 submissions/month (fine at launch; **Buttondown** is the
confirmed upgrade when volume demands). Success state returns a **shareable pledge badge**
("I took the pledge. #GotSoap") + sets up future newsletter ("Movement Updates").

**Effort:** low-medium · **Impact:** high (the business asset) · **Phase: v1**

---

## Mechanic 3: Poster downloads — "Put these up somewhere" — **v1, cheap and very Got Milk?**

The five canonical posters (and minimalist crops) downloadable at print-ready web resolution
with a cheeky permission notice: *"Free for locker rooms, dorm hallways, and interventions.
Attribution appreciated. Shame optional."* Extends the campaign into physical space the way
Got Milk? lived on real walls.

**Effort:** low · **Impact:** medium · **Phase: v1**

---

## Mechanic 4: Scratch-n-sniff gag — **v1, one-shot delight**

First-visit micro-moment (small dismissible banner or footer stamp, NOT a blocking modal):
*"This site is certified 100% scent-free. Unlike him."* One joke, once, then stays out of the way.

**Effort:** trivial · **Impact:** small but sets tone instantly · **Phase: v1**

---

## Mechanic 5: Crisis statistics (static absurd stats) — **v1 static → v2 live counter**

The movement fiction's load-bearing wall. Deadpan fake statistics presented with
public-health-dashboard seriousness, absurdity self-evident (no disclaimers):
- "73% of body-spray applications occur *in lieu of*, not in addition to, a shower."
- "The average loofah in male ownership is 4.7 years old. Some are load-bearing."
- "9 out of 10 dermatologists asked us to stop calling."

**v2:** the pledge counter becomes real ("12,847 lathers pledged") fed by actual submissions.

**Effort:** trivial (v1) · **Impact:** medium (sells the fiction) · **Phase: v1**

---

## Mechanic 6: "Because ______" caption generator — **v2**

User types their own subhead into a poster-styled template (built on the minimalist `aa` crops),
canvas-renders a shareable card. The open-caption format is the direct descendant of Got Milk?'s
parody-invitation strategy.

**Guardrails:** fully client-side (nothing stored or displayed on-site → no UGC moderation
liability); profanity soft-filter on render; watermark `gotsoap.netlify.app · #GotSoap`.

**Dependency:** poster 5 has no `aa` minimalist crop — export needed for a matched set.

**Effort:** medium-high · **Impact:** high · **Phase: v2**

---

## Mechanic 7: Nominate a friend — **v2, handle with care**

"Someone thinks you should see this website." Share-a-link-only (user sends it through their own
channels — the site never emails third parties, no harassment vector). Generates a pre-written
intervention message: *"This is a public thirst announcement. You've been nominated. gotsoap.netlify.app"*

**Effort:** low · **Impact:** medium · **Phase: v2**

---

## Mechanic 8: #GotSoap social wall — **v3 / later**

Embedded hashtag feed. Requires third-party embed service or API work + moderation exposure.
Only worth it once social volume actually exists.

**Effort:** medium + ongoing moderation · **Impact:** depends on volume · **Phase: v3**

---

## Mechanic 9: New poster drops + "Movement Updates" newsletter — **v2/ongoing**

The Got Milk? model was serial (350+ mustache ads). Frame the gallery as an ongoing series;
each new poster is a social moment + newsletter send to the pledge list. Poster 5's inclusive
casting direction continues — the roster should keep broadening.

**Effort:** per-poster design time · **Impact:** compounding · **Phase: cadence after launch**

---

## Phasing summary

| Phase | Mechanics | The bet |
|-------|-----------|---------|
| **v1 (launch)** | Sniff Test (static verdict cards) · Lather Pledge (Netlify Forms) · Poster downloads · Scratch-n-sniff gag · Static crisis stats | One strong viral loop + one conversion loop, everything else is texture |
| **v2** | Caption generator · Personalized verdict cards · Live pledge counter · Nominate-a-friend | Deepen participation once traffic exists |
| **v3 / ongoing** | Social wall · New poster drops · Newsletter cadence | Compounding brand engine |
