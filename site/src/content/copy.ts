/**
 * Got Soap? — Site Content Module (single source of copy for the build)
 * ---------------------------------------------------------------------
 * GENERATED FROM the FROZEN copy deck: docs/copy/copy-deck-v2.md (2026-07-08).
 *
 * RULES (see docs/copy/copy-contract-for-build.md):
 *  - This file is the ONLY place site copy lives. Import from here; never hardcode strings in components.
 *  - Do NOT edit strings here to "tweak voice." Copy is owned by the copy lane and re-versioned in the deck.
 *    If a string needs changing, change the deck, then regenerate this file.
 *  - Voice invariants are load-bearing: "Because…" subheads, "Join the movement." CTAs,
 *    the hashtag stack, the funded-by gag, and the © line must render verbatim.
 *  - Two authors never blend on one surface: `campaign` (🧼) vs `cwaaa` (📋). The reformed-bro
 *    voice exists ONLY inside `crisis.caseFiles[].quote`.
 *
 * Config (SITE_URL, contact, socials, analytics, Buttondown) lives in ../config/site.ts
 */

export const HASHTAGS = ["#GotSoap", "#SoapyThirstTrap", "#CleanManEnergy"] as const;
export const FUNDED_BY = "Concerned Women Against Axe Abuse" as const;
export const COPYRIGHT = "© Stacey Breckel 2025" as const;

/** In-fiction utility labels — never render a bare "Share". */
export const labels = {
  campaign: {
    shareSpot: "Post it in the locker room",
    shareVerdict: "Issue the announcement",
    copyLink: "Copy the citation",
    download: "Take one for the wall",
    retake: "Request re-assessment",
  },
  cwaaa: {
    copyLink: "Copy the case number",
    submitPledge: "File my declaration",
  },
} as const;

export const nav = {
  mark: "got soap?",
  links: [
    { label: "THE PSAS", href: "/psas" },
    { label: "THE SNIFF TEST", href: "/sniff-test" },
    { label: "THE PLEDGE", href: "/pledge" },
    { label: "THE CRISIS", href: "/crisis" },
  ],
  quiet: { label: "ABOUT", href: "/about" },
} as const;

/**
 * §9.1 home contents overlay — STRUCTURAL navigation taxonomy, not voice copy.
 * Entry labels are VERBATIM from specs.md §9.1 ("List home anchors first:
 * Case, Campaign, Confrontation, Oath, and Movement. List route exits second:
 * PSAs, Sniff Test, Pledge, Crisis, and Production Notes."). Framing strings
 * are copy-lane FINAL (2026-07-16 Claude↔Sol consensus): "Contents" plays the
 * magazine format straight; plain language wins on structural chrome only when
 * revoicing would misdescribe the destination (see docs/copy/style-lock.md).
 */
export const contents = {
  trigger: "Contents",
  title: "Contents",
  close: "Back to the campaign",
  anchorsLabel: "On this page",
  routesLabel: "The rest of the movement",
  anchors: [
    { label: "Case", href: "#case" },
    { label: "Campaign", href: "#campaign" },
    { label: "Confrontation", href: "#confrontation" },
    { label: "Oath", href: "#oath" },
    { label: "Movement", href: "#movement" },
  ],
  routes: [
    { label: "PSAs", href: "/psas" },
    { label: "Sniff Test", href: "/sniff-test" },
    { label: "Pledge", href: "/pledge" },
    { label: "Crisis", href: "/crisis" },
    { label: "Production Notes", href: "/about" },
  ],
} as const;

export const footer = {
  movementLine: "Join the movement. Smell like someone chose you back.",
  hashtags: HASHTAGS,
  fundedBy: FUNDED_BY, // links /crisis
  credit: `${COPYRIGHT} · A satirical spec campaign by Hope2 Studio →`, // links /about
  disclaimer:
    "This is parody. Not affiliated with any brand, fragrance, publication, health organization, or your ex. No axes were abused in the making of this movement.",
} as const;

export const scratchGag = {
  primary: "This website is certified 100% scent-free. Which already puts it ahead of him.",
  dismiss: "Noted →",
  rotation: [
    "You can't smell this page. That's the nicest thing we can say about the genre.",
    "No fragrance detected. We ran it twice, to be fair to him.",
  ],
} as const;

/** Per-route SEO. author: which voice owns the page (for QA, not rendered). */
export const meta = {
  home: { title: "got soap? — the movement", description: `A public thirst announcement. Five posters, one demand: use the soap. Because "I usually shower" is not a hygiene routine. It's a confession.` },
  psas: { title: "The PSAs — Series One | got soap?", description: "The public-service archive. Five thirst-trap hygiene PSAs, presented untouched. Study them. Then bathe." },
  "psas/confident-man": { title: "A Clean Man Is A Confident Man | got soap?", description: "Your Axe body spray isn't fooling anyone, cowboy. Smell like effort." },
  "psas/soap-smoldering": { title: "Soap-Smoldering | got soap?", description: `Your "natural scent" is a threat, not a flex. Lather. Rinse. Respect.` },
  "psas/unholy": { title: "Unholy | got soap?", description: "Deodorant without a shower is just layering lies. Axe is not an exorcism." },
  "psas/redemption": { title: "The Redemption | got soap?", description: "Cleansing isn't just for your sins. Deodorant isn't divine intervention. Anyone can change." },
  "psas/thirst-announcement": { title: "Public Thirst Announcement | got soap?", description: "Your Tinder shouldn't come with a scratch-n-sniff warning. Wash accordingly." },
  "sniff-test": { title: "The Sniff Test — Field Assessment CW-7 | got soap?", description: "Seven questions between you and the truth your group chat already knows. Administered by CWAAA field assessors." },
  pledge: { title: "The Lather Pledge — Form CW-1 | got soap?", description: "Declaration of Intent to Lather. Sign the oath, get filed in triplicate, and smell like you meant it." },
  crisis: { title: "The Crisis | Concerned Women Against Axe Abuse", description: "The state of male hygiene, documented. A memorandum from the women who had smelled enough." },
  about: { title: "The Reveal — Hope2 Studio | got soap?", description: "It was a portfolio piece the whole time. Here's the satire, the craft, and the woman who made it." },
  notFound: { title: "Missing | got soap?", description: "This page didn't shower. It's gone." },
} as const;

export const home = {
  hero: {
    headline: "got soap?",
    sub: "Because he thinks the steam is hiding it. It never was.",
    scrollCue: "Keep going. It only gets cleaner. He didn't.",
    /** §7.2 institutional signature (renders above the headline) — the exact 90s-PSA credit format; the org name detonates against it. */
    signature: `A public service announcement · Funded by ${FUNDED_BY}`,
  },
  campaign: {
    /** §3.3 flagship propaganda caption — poster-agnostic (HOME_FLAGSHIP is owner-swappable). An order, not a caption. */
    caption: "Pin him up in the locker room.",
  },
  confrontation: {
    /** §4 second-person provocation — the dual-address engine turned literal at the mirror beat. */
    provocation: "You've smelled him. Are you him?",
  },
  sniffInsert: {
    heading: "Seven questions between you and the truth your group chat already knows.",
    body: "One honest verdict. No wrong answers — only wet ones.",
    cta: "Take the Sniff Test →",
    credit: "Administered by CWAAA field assessors. Assessment CW-7. Results forwarded automatically.",
  },
  movementSeam: {
    // 📋 CWAAA letterhead excerpt (links /crisis)
    org: "CONCERNED WOMEN AGAINST AXE ABUSE",
    subhead: "Office of Lather Compliance — Memorandum No. 26-114",
    body: [
      "The men are not the problem. The men are, in most cases, lovely.",
      "The fog is the problem. We intend to lift it. In writing. With copies filed.",
      "Two million concerned women. One demand. Soap, applied regularly, as directed.",
    ],
    cta: "Read the full brief →",
  },
  pledgeBand: {
    heading: "Join the movement. Sign it — or send it to the man who should.",
    body: `Because "I usually shower" is not a hygiene routine. It's a confession.`,
    cta: "Take the Lather Pledge →",
  },
  revealBeat: {
    line: "None of these men are real. The problem is very, very real.",
    tail: "Got Soap? is a satirical campaign by Hope2 Studio.",
    cta: "See who's behind it →",
  },
} as const;

/**
 * Per-poster COPY only, keyed by slug. Structural metadata (order, register,
 * title, source file) already lives in ../config/site.ts `POSTERS` — do NOT
 * duplicate it here. Components zip site.ts POSTERS with posterCopy by slug.
 * (register values there are 'porcelain' | 'smoke' | 'marble' per design.md.)
 */
export const posterCopy = {
  "confident-man": {
    pull: "Because your Axe body spray isn't fooling anyone, cowboy.",
    caseNote:
      "A cologne ad selling nothing but soap. Our cowboy doesn't smell like masculinity; he defines it, rinses it off, and reapplies in the morning like a person with standards. The gaze says power. The tile says he owns more than one bar of soap and knows where both of them are. Confidence isn't the cologne. It's not needing it.",
    alt: "A clean-cut man stands shirtless against steamy white bathroom tile under the headline 'got soap?' Baked poster text: 'A clean man is a confident man. Lather up. Smell like effort.' Funded by Concerned Women Against Axe Abuse.",
  },
  "soap-smoldering": {
    pull: `Because "it's just my natural scent" has never once been good news.`,
    caseNote:
      "The smolder, patched to the current version: now with self-awareness. He's fresh and knows it, which is the hottest thing a man can be and, statistically, the rarest. You could skip the wash. You could layer the spray. You will still never smell like him — and everyone at brunch will know which one you are. Lather. Rinse. Respect.",
    alt: "A lightly stubbled man leans on fogged tile beneath 'got soap?' Baked poster text: 'He's not just fresh — he's soap-smoldering. You could skip the wash… but you won't smell like him.'",
  },
  unholy: {
    pull: "He washes. Daily. With soap. In this economy, that's basically a miracle.",
    caseNote:
      "Some men leave a room speechless. Others leave a trail of Axe and a group chat full of screenshots. This one washes daily, with soap, which in the year of our Lord currently qualifies as a personality. Fragrance-ad drama, sermon-grade conviction: clean isn't a flex, it's the bare minimum, and he's wearing it like a crown.",
    alt: "A brooding man in a towel emerges from dark chrome-lit smoke under a chrome 'got soap?' Baked poster text: 'Washes daily. Uncommon. Unholy. Unreasonably hot. Axe is not an exorcism.'",
  },
  redemption: {
    pull: "He sinned. He sprayed. He saw the loofah. Anyone can change.",
    caseNote:
      "He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had genuinely wronged the people standing next to it. Then, grace: a shower. A redemption arc told in steam, and the moral is short — deodorant is not divine intervention, and the gym does not count. Anyone can change. Some of you should start tonight.",
    alt: "A solemn, slicked-back man in smoky low light beneath a chrome 'got soap?' Baked poster text: 'Repent in warm water. Forgiveness is a full body cleanse. Deodorant isn't divine intervention.'",
  },
  "thirst-announcement": {
    pull: "He's scrubbed, sudsed, and would survive meeting your mother. And you?",
    caseNote:
      "No fog machine. No flex. A man who is scrubbed, sudsed, and, critically, aware of it: the \"would introduce to Mom without a risk assessment\" tier of clean. Consider this your notice. Personal hygiene is the floor, not a plot twist. This has been a public thirst announcement. Wash accordingly.",
    alt: "A confident Black man against warm amber marble under a gold-lit 'got soap?' Baked poster text: 'He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness. This has been a public thirst announcement.'",
  },
} as const;

export const psas = {
  indexHeading: "Public Service Announcements",
  indexSub: "Series One",
  indexBody:
    "Five announcements in the public interest, issued untouched. Study them at your leisure. Bathe at your earliest. Series Two arrives when the crisis does.",
  downloadNotice: {
    heading: "Take one for the wall.",
    body: "Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous. Attribution appreciated. Shame optional. Results not guaranteed but statistically likely.",
    button: labels.campaign.download,
  },
} as const;

export const sniffTest = {
  intro: {
    heading: "The Sniff Test",
    body: "Seven questions. One verdict. Honesty optional — but it shows, the way it always does.",
    cta: "Begin assessment →",
    credit: "Field Assessment CW-7 · Administered by CWAAA field assessors.",
  },
  progressLabel: (n: number) => `QUESTION ${n} OF 7 — FIELD ASSESSMENT CW-7`,
  ariaProgress: (n: number) => `Question ${n} of 7.`,
  footerLine: "Answer honestly. The loofah already knows.",
  completionBeat: "Assessment complete. Findings forwarded to the Records Division. Try to act normal.",
  /** answers ordered a→d; score = index (0..3). Sum 0–21 maps to verdict bands. */
  questions: [
    { q: "How many bars of soap are in your home right now?", a: ["Several. Strategically deployed.", "One. Somewhere. We've met.", "Does dish soap count?", "Soap is a construct."] },
    { q: "Describe your loofah.", a: ["Rotated quarterly, like a mattress.", "It's… seen some things. It doesn't talk about them.", "I use the wall. The wall is load-bearing now.", "What is a loofah and why are you in my bathroom."] },
    { q: `Finish the sentence: "I shower…"`, a: ["Daily. With soap. Like it's not a whole thing.", "Most days. Unless the vibes are off.", "After the gym. I think about the gym constantly.", "When the group chat stages an intervention."] },
    { q: "What does your towel smell like?", a: ["Nothing. A towel should smell like nothing.", "Faintly of victory.", "A pond. A specific pond. It has a name.", "We don't smell the towel. We fear the towel."] },
    { q: "Your relationship with body spray is best described as:", a: ["A finishing touch. Never a foundation.", "Exclusive, committed, a little codependent.", "My primary weather system.", `I refer to applying it as "showering."`] },
    { q: `A date says "you smell nice." You:`, a: ["Say thanks. It's soap.", "Panic — which layer did they detect?", "Take full credit on behalf of Axe.", "This has genuinely never happened, and we both know why."] },
    { q: "Steam rises. You're in the shower. Your move?", a: ["Lather, rinse, self-respect.", "A quick rinse. Water is basically soap.", "Stand there, contemplating my rivals.", "I'm not in the shower. I am never in the shower."] },
  ],
  /** score bands → verdict slug */
  bands: [
    { max: 5, slug: "soap-smoldering" },
    { max: 10, slug: "suds-curious" },
    { max: 15, slug: "axe-dependent" },
    { max: 21, slug: "thirst-hazard" },
  ],
  verdictButtons: [
    labels.campaign.shareVerdict,
    labels.campaign.copyLink,
    labels.campaign.download,
    labels.campaign.retake,
  ],
  shareDefault: "I took the Sniff Test. Verdict: [Verdict]. #GotSoap gotsoap.netlify.app",
} as const;

/** verdict pages /sniff-test/<slug>. register keys design.md tokens. */
export const verdicts = {
  "soap-smoldering": {
    name: "Certified Soap-Smoldering",
    register: "porcelain",
    lead: "You wash. Daily. With soap. Unreasonably hot of you.",
    body: "The men in these posters are fictional. You're proof the standard can be met by a real one. Frame this and hang it somewhere the others will see it and quietly panic.",
    exit: "Certified or not — sign the oath.",
    exitCta: "Take the Lather Pledge →",
  },
  "suds-curious": {
    name: "Suds-Curious",
    register: "marble",
    lead: "There's a clean man in there. We can hear him tapping. Let him out.",
    body: "You own soap. You've met the loofah. You just keep betting a spritz will cover the gap between you and an actual shower, and that bet has never once paid out. Close it. One honest lather and you're on the good list. It's a short list. The view is excellent.",
    exit: "Certified or not — sign the oath.",
    exitCta: "Take the Lather Pledge →",
  },
  "axe-dependent": {
    name: "Axe-Dependent",
    register: "smoke",
    lead: "We could smell you from the results page.",
    body: "What you're calling a signature scent is a rumor about a shower you didn't take, and everyone in a five-foot radius has already heard it. The good news is almost insulting: soap costs four dollars, works on contact, and asks nothing of your personality. Seek lather immediately.",
    exit: "Certified or not — sign the oath.",
    exitCta: "Take the Lather Pledge →",
  },
  "thirst-hazard": {
    name: "Public Thirst Hazard",
    register: "smoke",
    lead: "This has been a public thirst announcement. You were the announcement.",
    body: "You are why the group chat has a code word. You are why the rideshare cracks a window in January. Here's the part nobody tells you: this is a maintenance problem, not a character one, and maintenance is the easiest kind to fix. Soap. Water. The wild decision to use both. Nobody's beyond redemption. But the clock started the moment you read this.",
    exit: "Redemption starts in the shower.",
    exitCta: "Take the Lather Pledge →",
  },
} as const;

/** 📋 CWAAA — Form CW-1 */
export const pledge = {
  header: {
    org: "CONCERNED WOMEN AGAINST AXE ABUSE",
    form: "FORM CW-1 · Declaration of Intent to Lather",
    subtitle: "To be completed by the undersigned, of sound mind and disputed scent.",
  },
  oath: [
    "I, the undersigned, do solemnly swear:",
    "to lather daily;",
    "to retire body spray as a personality;",
    "to respect the loofah in word and deed;",
    "and never again to mistake deodorant for divine intervention.",
    "Lather. Rinse. Respect.",
  ],
  fields: {
    firstName: { label: "First name", required: true, placeholder: "As it will appear on the roll." },
    email: { label: "Email", required: true, placeholder: "Where to send Movement Updates." },
    consent: { label: "I understand this is satire and also a binding moral contract.", required: true },
  },
  submit: labels.cwaaa.submitPledge,
  submitMicro: "Filed in triplicate. One copy goes to the loofah.",
  errors: {
    noName: "A declaration requires a declarant. First name, please.",
    badEmail: "The Records Division cannot file this email address as written.",
    noConsent: "The satire acknowledgment is required. It is binding. Morally.",
  },
  success: {
    stamp: "SWORN.",
    body: "Declaration filed, [name]. The Office of Lather Compliance thanks you and quietly believes in you. You are now on the roll of a movement that declines to say how large it will grow.",
    note: "Movement Updates will arrive when there is movement.",
    shareBadge: labels.campaign.shareVerdict,
    copyLink: labels.cwaaa.copyLink,
  },
  privacy:
    `Your email does one job: Movement Updates — new posters, the occasional bulletin, nothing you'd resent. We don't sell it, share it, or hand it to "partners." Unsubscribe any time. CWAAA keeps records, not secrets.`,
  badgeShare: "I took the pledge. Lather. Rinse. Respect. #GotSoap",
  /** Sent via Buttondown (PRD §5.4). [First name] token substituted at send. */
  welcomeEmail: {
    subject: "Your declaration has been filed.",
    preview: "Form CW-1 received. The loofah's copy is in the mail.",
    body: [
      "Dear [First name],",
      "This letter confirms that your Declaration of Intent to Lather (Form CW-1) has been received, reviewed, and filed in triplicate by the Office of Lather Compliance. One copy is retained for our records. One copy is yours to keep. The third, per protocol, goes to the loofah.",
      "You are now on the roll of a movement that declines to say how large it will grow. That is not a threat. It is a scent forecast.",
      "Your obligations, as sworn:",
      "— Lather daily.",
      "— Retire body spray as a personality.",
      "— Respect the loofah in word and deed.",
      "— Never again mistake deodorant for divine intervention.",
      "We will write again when there is movement — a new poster, a bulletin, the occasional finding from the Field Data Committee. Not often. We are concerned, not clingy.",
      "Lather. Rinse. Respect.",
      "The Office of Lather Compliance",
      "Concerned Women Against Axe Abuse · Est. 2024",
    ],
    ps: "P.S. Know someone whose declaration is overdue? You didn't hear it from us, but the assessment takes four minutes: [Sniff Test link]",
    footerNote: "CWAAA National Office, Suite 2B, above the pharmacy. Unsubscribe: [link].",
  },
  newsletter: {
    subjectFormulas: [
      "Bulletin from the Office of Lather Compliance",
      "New evidence has come to light.",
      "Series [n]: a new announcement is now public.",
    ],
    milestoneExample: {
      subject: "The roll has passed 1,000.",
      open: "Two million concerned women had a number in mind. We are one thousand closer to it. To the newest declarants: welcome. To the still-unsworn reading this over someone's shoulder — the form is open.",
    },
  },
} as const;

/** 📋 CWAAA site-within-a-site */
export const crisis = {
  header: {
    org: "CONCERNED WOMEN AGAINST AXE ABUSE",
    motto: "Est. 2024 · Lather · Rinse · Respect",
    sub: "A registered concern since 2024 · National Office, Suite 2B (above the pharmacy)",
    title: "A Memorandum on the State of Male Hygiene",
  },
  founding: [
    "Founded in 2024 by women who had smelled enough.",
    "What began as one book club's informal grievance log is now a national coalition with a single, reasonable demand: soap, applied to men, regularly. There was no founding incident — there were thousands, occurring simultaneously, in elevators and rideshares and the third row of every theater. What united our founders was not anger. Anger is loud. It was a quiet, unshakeable certainty that it did not have to smell like this.",
    "We wish to be clear. We do not oppose fragrance. We oppose substitution. A body spray is a citrus arrangement on a condemned building. We are not against men — several of us are related to them. We are against the fog, and we intend to lift it. In writing. With copies filed.",
  ],
  findings: {
    heading: "The State of Male Hygiene — Annual Findings",
    subnote: "Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it.",
    rows: [
      { finding: "In independent testing, 100% of men who showered got measurably wet.", tag: "FINDING 26-01" },
      { finding: "9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study.", tag: "FINDING 26-02" },
      { finding: "Axe body spray contains 0% soap. This figure has not improved since 1983.", tag: "FINDING 26-03" },
      { finding: "73% of body-spray applications occur in lieu of, not in addition to, a shower.", tag: "FINDING 26-04" },
      { finding: "The average loofah in male ownership is 4.7 years old. Some are load-bearing.", tag: "FINDING 26-05" },
    ],
  },
  scale: "Two million concerned women. Chapters in all fifty states. One demand.",
  ribbon: {
    heading: "Tie One On For Suds",
    body: "Our washcloth ribbon says what words cannot: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won't leave — a gentle, constant reminder that soap exists and he is loved enough to use it. Wear it for the reformed. Wear it for the suds-curious. Then send him to put his intent in writing.",
    cta: "File Form CW-1 →",
  },
  pressRoom: {
    heading: "Press Room",
    releases: [
      { date: "June 2026", headline: `CWAAA Statement on the Term "Shower-Adjacent": No.`, body: `"The Office of Lather Compliance has reviewed the submission. Proximity to a shower is not participation in one. This concludes our statement."` },
      { date: "May 2026", headline: `Coalition Rejects Proposed Compromise of "Every Other Day, Roughly."`, body: `"We thanked the delegation for coming. We did not thank them for the smell. Negotiations have adjourned."` },
      { date: "April 2026", headline: "Loofah Amnesty Weekend Declared a Success; 4,000 Surrendered, No Questions Asked.", body: `"Recovered items are being held at an undisclosed facility. Three were still warm. We do not wish to discuss the three."` },
      { date: "March 2026", headline: "Field Assessors Deployed to Sigma Chi; One Recovered, All Debriefed, Counseling Available.", body: "" },
      { date: "February 2026", headline: `CWAAA Responds to Claims That "The Gym Counts": The Gym Does Not Count.`, body: `"Sweat is not a rinse cycle. Repeat: sweat is not a rinse cycle. Please stop emailing us about this."` },
    ],
  },
  caseFiles: {
    heading: "RECOVERY CASE FILES",
    subhead: "Documented recoveries, published with subject consent. Names changed to protect the reformed.",
    // The `quote` field is the ONLY place the third (reformed-bro) voice appears.
    files: [
      { id: "RC-014", quote: `"I do lawn care. I figured the smell was just… my finish. My natural top-note. I'd hit the Axe, maybe a Febreze coat if it was a two-day situation, and call that grooming. Then a girl left me on read after one date and texted back exactly once: 'the truck smelled like a hamper, man.' I took the Sniff Test. Public Thirst Hazard. I bought my first loofah since middle school. Swamp ass is real. I know that now. I'm sorry to everyone who's ridden in the truck."`, name: "Derek, 31", status: "REFORMED. Showers daily. Truck aired out." },
      { id: "RC-022", quote: `"Weekends were a lot. By Sunday I had no gas left for a shower, so I'd mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called 'a conversation.' There was a printout. I scored Axe-Dependent. Four dollars of soap later I'm a different man. Turns out Febreze was not, in fact, showering. I was the only one who didn't know."`, name: "Brayden, 27", status: "REFORMED. Sheets washed, no longer seasoned." },
      { id: "RC-031", quote: `"Honestly? I'm hot. I never thought hygiene mattered — I could pull regardless. What I couldn't figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I'd ace it. I did not ace it. Clean is the actual flex and I'd been coasting on face alone. Vanity got me in the door. Soap kept me there."`, name: "Chad (yes, really), 29", status: "CERTIFIED SOAP-SMOLDERING. Insufferable again, but clean." },
      { id: "RC-039", quote: `"I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect — and the finding about body spray containing 0% soap did something to me. Cologne is a garnish. You do not garnish a dumpster. I own soap now. The cologne goes on top of clean, which, it turns out, is the entire point."`, name: "Marcus, 34", status: "REFORMED. Cologne demoted to garnish." },
      { id: "RC-047", quote: `"Back on the apps at forty-six after the divorce. I'd been off the market so long I forgot the rules had teeth. My daughter looked me dead in the eye and said, 'Dad, you smell like the garage.' She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious — 'there's a clean man in there, let him out.' So I did. Three dates this month. She screens them now. We're both thriving."`, name: "Gary, 46", status: "REFORMED. No longer smells like the garage. Daughter approves." },
      { id: "RC-052", quote: `"My mom didn't yell. That's the thing. She just pulled me aside after Sunday dinner, quiet, and said, 'Baby, I love you, and I need you to hear this from me before you hear it from a girl: you have to shower more.' Then she texted me the link so I wouldn't have to look her in the eye. Suds-Curious. She was right — she's always right. I fixed it. Last month I brought Hannah from two doors down home for dinner. Mom cried. Hannah stayed for seconds. I owe both of them a shower's worth of gratitude and I intend to pay it daily."`, name: "Tyler, 26", status: "REFORMED. Introduced a girl to Mom. Both approve. Mom is framing this case file." },
      { id: "RC-058", quote: `"She said she'd drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn't joy — it was 'what does my room actually smell like,' and the answer scared me sober. I stream; my whole life happens in this chair; I'd quietly decided hygiene was an IRL problem and I don't do IRL. Shower for who, the webcam? It's shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life."`, name: `"Kaelthas," 22`, status: "REFORMED. Logs off to shower now. GG." },
      { id: "RC-063", quote: `"I was a catch in 1978. Ask anyone who was there. I coasted on it for about five decades, and somewhere in the coasting, 'a shower every day' quietly became 'a shower when the spirit moves me.' I did not connect this to why my lady friend from the community center started driving with her window cracked in February. My buddy Earl said it at poker night, the way old friends do, with zero cushion: 'Ron. That's not your cologne. That's you.' Then he pulled this website up on his phone, right there over the cards. Public Thirst Hazard, at my age, with my reputation. I've showered daily since. Doris held my hand through the entire movie last Sunday. The catch still had it. He'd just stopped rinsing it."`, name: "Big Ron, 71", status: "REFORMED. Doris approves. Window's back up." },
      { id: "RC-071", quote: `"I said cold rinses build character. They built a two-foot exclusion zone around me at all times. Took the quiz on a dare. It was not kind. I bought soap."`, name: "Sean, 34", status: "REFORMED. Exclusion zone lifted." },
    ],
    exitLine: "Every recovery begins with a single honest assessment.",
    exitCta: "Schedule a field assessment →",
  },
  /** v2 — ships with the caption generator, not v1. */
  caseFileGeneratorV2: {
    entryHeading: "Think you're a recovery story? File your own.",
    entryCta: "Generate my case file →",
    formTitle: "FORM RC-∅ · Self-Reported Recovery",
    fields: {
      handle: "For the record. No last names; we're a nonprofit, not a courthouse.",
      verdict: "Prefilled from the Sniff Test, or pick one.",
      line: "One line. Keep it honest; the loofah reads these.",
    },
    outputStatus: "REFORMED (PENDING VERIFICATION)",
    outputWink: "Verification is on the honor system. So was the funk.",
    buttons: ["Issue my case file", labels.cwaaa.copyLink],
  },
  finePrint:
    "CWAAA is a fictional advocacy body and is not affiliated with any real organization, fragrance, or your ex. Recovery Case Files are dramatizations; the subjects are invented and any resemblance to a specific unwashed man is a you problem, not a legal one. Findings are directional, emotional, and true in spirit. The Field Data Committee meets Thursdays. Form CW-1 confers no legal standing but considerable moral standing. Est. 2024.",
  exits: {
    assessment: { label: "Schedule a field assessment →", href: "/sniff-test" },
    pledge: { label: "File Form CW-1 →", href: "/pledge" },
  },
} as const;

/** 🧼 The only fourth-wall break. */
export const about = {
  opening: {
    heading: "It was a portfolio piece the whole time.",
    body: "Got Soap? is a satirical hygiene-PSA campaign — a thirst-trap parody of the 90s \"Got Milk?\" ads, aimed at low-effort masculinity and the gallon of Axe some men deploy in place of a shower. It's told from the POV the satire aisle usually skips: the woman standing too close to it. The movement is fake. The craft is not. Neither is the frustration that started it.",
  },
  why: [
    "This started on a dating app, where men who hadn't met soap since the Obama administration were holding out for a 10 — clean, manicured, model-adjacent — while they themselves looked, and presumably smelled, like damp disappointment.",
    `"Got Milk?" got a generation to drink milk by making it a status symbol and putting it where kids already looked. So I did it for soap. Made clean the flex. Made effort the thirst trap. Aimed the whole thing where the ads would actually land — locker rooms, men's rooms, GQ — and let the women do the sharing, because they've been living the research the whole time.`,
    "I'm not here to be nice about it. I'm here to be right about it, and funny, and unapologetic. That's the job.",
  ],
  caseStudy: [
    { label: "Concept & art direction", body: "Every poster walks one tightrope: visually seductive, thematically ridiculous. Thirst-trap imagery, PSA-sincere copy, engineered to provoke, amuse, and push." },
    { label: "Execution", body: "Male models generated with openart.ai — then everything that makes them ads was done by hand in Photoshop: compositing, lighting, steam, chrome, marble, and a type system built to stay legible across every skin tone and background in the set. Where a legible fix killed the tone, I moved the light instead of the type." },
    { label: "The system", body: "Three registers — porcelain, smoke, marble — a fictional sponsor with its own identity and its own deadpan voice, and a campaign that smolders and files paperwork in the same breath. Built like it's real, because that's the whole point." },
  ],
  pitch: {
    heading: "Want a campaign like this?",
    body: "I'm Stacey M. Breckel — satirical creative director, graphic designer, content creator, and the studio behind Hope2 Studio. I make work that looks good and has a point of view: cheeky PSAs, full-scale parodies, brands that need teeth. There aren't many women working this lane. That's exactly why you want one.",
    tagline: "Let's make clean design dirty fun.",
    // contact + behance come from config/site.ts (obfuscate email from scrapers at render)
  },
  credit:
    "© Stacey Breckel 2025. A satirical spec campaign by Hope2 Studio. All visual elements are parody and not affiliated with any brand, product, publication, or public health organization. Models generated with openart.ai; all art direction, compositing, and typography by hand.",
} as const;

export const notFound = {
  stamp: "MISSING",
  body: "This page didn't shower. It's gone. If found, do not approach. Report all sightings to the Office of Lather Compliance.",
  caseClosed: "CASE CLOSED",
  cta: "Return to the movement →",
} as const;

const copy = {
  HASHTAGS, FUNDED_BY, COPYRIGHT, labels, nav, contents, footer, scratchGag, meta,
  home, posterCopy, psas, sniffTest, verdicts, pledge, crisis, about, notFound,
} as const;

export default copy;
