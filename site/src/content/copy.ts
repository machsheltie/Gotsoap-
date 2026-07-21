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
    copyLink: "Copy the filing link",
    submitPledge: "File my declaration",
    /** Pledge-success share control (Phase 4 consensus, F11): the success state
     * is a CWAAA document — it never borrows a campaign verdict verb. */
    shareBadge: "Circulate my declaration",
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
  /** Close control on CWAAA surfaces (chrome unification, remediated
   * 2026-07-17): "Back to the campaign" is campaign-voiced and wrong inside
   * the sponsor's document (§1 — one surface, one author). This is a plain
   * IMPLEMENTATION DEFAULT — structural chrome carrying no voice, the same
   * class as the Phase-4 defaults (`close: "Close"` among them) that the copy
   * lane later re-voiced (PROMPT-COPY work item 8; style-lock §4). Voicing it
   * is PROMPT-COPY work item 10; the plain label is compliant to ship. */
  closeCwaaa: "Close",
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
    /** OWNER ORDER 2026-07-21 (faux-shop-legal-order.md): the nav's /about
     * slot becomes the faux Shop. "Production Notes" → /about is retired from
     * ALL navigation — the footer folio credit is now the only path to the
     * reveal. specs.md §9.1 amended same-commit. */
    { label: "Shop", href: "/shop" },
  ],
  /** Interior-page dialog exit (chrome unification, owner decision B,
   * 2026-07-16): interior contents sheets list the route exits plus this
   * return-home entry. Label VERBATIM from specs.md §9.2 ("Return to the
   * movement") — structural taxonomy, like the entries above. */
  returnHome: { label: "Return to the movement", href: "/" },
} as const;

/**
 * Home masthead fiction (post-freeze consolidation, 2026-07-16 — style-lock §7/§10).
 * Pure straight-faced Vogue-masthead dressing: Est./Series/No. 26 commit to the
 * bit ("No. 26" echoes CWAAA Memorandum No. 26-114). The institutional credit is
 * the format-perfect PSA credit; its killed NGO-brochure predecessor
 * (style-lock §7 kill list) must never return. The nameplate itself is nav.mark.
 */
export const masthead = {
  ariaLabel: "Got Soap? — masthead",
  est: "Est. MMXXIV",
  // A no-break space (U+00A0) glues the middot to "announcement" so a
  // wrapped flank line never opens with a hanging "·" — typographic setting only.
  credit: `A public service announcement · Funded by Concerned Women Against Axe Abuse`,
  /* ^ LITERAL org name, not ${FUNDED_BY}: CG2 asserts the composed funded-by
   * gag verbatim in SOURCE, and its previous literal anchor (the confident-man
   * alt transcription) was removed by the Phase 4 F13 alt rewrite. Rendered
   * output is identical. */
  series: "Series One",
  issue: "No. 26",
  /** Screen-reader funding line: keeps the gag in the a11y tree at widths
   * where the flank credit is display:none (≤640px). */
  srFunding: `Funded by ${FUNDED_BY}.`,
  /** CWAAA letterhead chrome (chrome unification, owner decision A,
   * 2026-07-16): org surfaces carry the sponsor's letterhead and NO campaign
   * wordmark. Visible letterhead strings reuse crisis.header verbatim; this
   * is only the structural landmark label (composed from the verbatim org
   * name — not voice copy). */
  cwaaa: {
    ariaLabel: `${FUNDED_BY} — letterhead`,
  },
} as const;

export const footer = {
  movementLine: "Join the movement. Smell like someone chose you back.",
  hashtags: HASHTAGS,
  fundedByLead: "Funded by", // renders around the linked org name (→ /crisis)
  fundedBy: FUNDED_BY, // links /crisis
  /** Plain unlinked text (2026-07-16 footer consolidation): the folio credit —
   * PRODUCED BY HOPE2 STUDIO · DIRECTED BY STACEY BRECKEL, hardcoded in
   * Footer.astro because gate G11 requires the verbatim literal there — is the
   * home's ONE /about path. The old spec-campaign tell is killed on campaign
   * surfaces (style-lock kill list); the reveal + disclaimer live at /about. */
  credit: COPYRIGHT,
  /** Social platform labels: proper nouns, render only when the matching
   * config/site.ts EXTERNAL_LINKS url is non-empty (PRD §5.6). */
  socialLabels: {
    behance: "Behance",
    instagram: "Instagram",
    facebook: "Facebook",
  },
} as const;

export const scratchGag = {
  primary: "This website is certified 100% scent-free. Which already puts it ahead of him.",
  dismiss: "Noted →",
  rotation: [
    "You can't smell this page. That's the nicest thing we can say about the genre.",
    "No fragrance detected. We ran it twice.",
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
  /** Faux shop (owner order 2026-07-21). IMPLEMENTATION DEFAULT pending the
   * Part-2 product-copy dialectic — flat retail register, no winks, holds the
   * line (the store is real above the footer). Per-product page meta composes
   * from shop.products[] at render (single source; no second copy here). */
  shop: { title: "The Shop — Official Campaign Supply | got soap?", description: "The official Got Soap? store. The bar, the tees, the hat, the bottle. Opening soon." },
  notFound: { title: "Missing | got soap?", description: "This page didn't shower. It's gone." },
} as const;

export const home = {
  hero: {
    ariaLabel: "Got Soap? — a public service announcement",
    headline: "got soap?",
    sub: "Because he thinks the steam is hiding it. It never was.",
    scrollCue: "Keep scrolling. It only gets cleaner. He didn't.",
    /** §7.2 institutional signature (renders above the headline) — the exact 90s-PSA credit format; the org name detonates against it. */
    signature: `A public service announcement · Funded by ${FUNDED_BY}`,
  },
  /** §3.2 Porcelain Evidence Wall typographic settings — the demand is a
   * reassembly of the documented demand ("soap, applied to men, regularly",
   * crisis.founding[1]); the creed is founding[2]'s verbatim clause. Moved from
   * Case.astro markup in the 2026-07-16 hardcoded-copy sweep. */
  case: {
    demand: ["Soap.", "Applied to men.", "Regularly."],
    creed: "We do not oppose fragrance. We oppose substitution.",
    cta: "Read the full findings", // ornament arrow stays aria-hidden markup
  },
  campaign: {
    kicker: "The Flagship",
    /** §3.3 flagship propaganda caption — poster-agnostic (HOME_FLAGSHIP is owner-swappable). An order, not a caption. */
    caption: "Pin him up in the locker room.",
    cta: "See all five announcements", // ornament arrow stays aria-hidden markup
  },
  confrontation: {
    eyebrow: "The Sniff Test · Field Assessment CW-7",
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
      "The fog is now a matter of record. Copies have been filed.",
      "Two million concerned women. One demand. Soap, applied regularly, as directed.",
    ],
    /** Featured recovery on the home seam (Phase 4 consensus, F5): the caption
     * is CWAAA's docket summary — the reformed-bro voice stays inside the full
     * file on /crisis. The component resolves name/status from
     * crisis.caseFiles.files by this id (RC-071 hardcode retired). */
    featuredId: "RC-039",
    featuredCaption: "Ninety dollars of cologne. Zero bars of soap. The arithmetic arrived anonymously.",
    cta: "Read the full brief →",
  },
  pledgeBand: {
    kicker: "The Oath",
    heading: "Join the movement. Sign it — or send it to the man who should.",
    body: `Because "I usually shower" is not a hygiene routine. It's a confession.`,
    /** The movement's verbatim sign-off (pledge.oath / crisis.motto). */
    signoff: "Lather. Rinse. Respect.",
    cta: "Take the Lather Pledge →",
  },
  /** The home's closing beat — the campaign THESIS, not a reveal (owner
   * decision 2026-07-16, footer-consolidation spec): it names neither the joke
   * nor the maker, and carries no route. The former meta-reveal tail and
   * who-is-behind-it cta are on the style-lock kill list; the home's one
   * /about path is the footer folio credit. */
  revealBeat: {
    line: "None of these men are real. The problem is very, very real.",
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
    alt: "A clean-cut, shirtless man meets the camera against bright white bathroom tile and rising steam, posed like soap finally hired a cologne model.",
  },
  "soap-smoldering": {
    pull: `Because "it's just my natural scent" has never once been good news.`,
    caseNote:
      "He's fresh and he knows it: the rarest combination on the market. Steam, good posture, and the nerve to wear clean like cologne. Brunch remembers him. Be him by Saturday.",
    alt: "A lightly stubbled man with damp hair leans against fogged white tile, wearing the deliberate smolder of a luxury fragrance ad after a shower.",
  },
  unholy: {
    pull: "He washes. Daily. With soap. The congregation is asked to remain calm.",
    caseNote:
      "Some men leave a room speechless. Others leave a trail of Axe and a group chat full of screenshots. This one enters clean, and the congregation has one question: where has this man been? Chrome light, holy steam, testimony you can smell from the third pew — clean preaches. The water is right there. The sermon is optional.",
    alt: "A brooding man in a towel emerges from black smoke under chrome light, lit like a fragrance ad shot in a cathedral.",
  },
  redemption: {
    pull: "He sinned. He sprayed. He saw the loofah. Anyone can change.",
    caseNote:
      "He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had wronged the people standing next to it. Then, grace: a shower. The steam took the confession. The towel handled absolution. He walked out the same man, and the people standing next to him stood a little closer. Some of you should start tonight.",
    alt: "A solemn man with slicked-back wet hair stands in dark smoke and low chrome light — a sinner freshly absolved by warm water.",
  },
  "thirst-announcement": {
    pull: "He's scrubbed, sudsed, and would survive meeting your mother. And you?",
    caseNote:
      "The risk assessor has been dismissed. The dinner reservation stands. One shower put him in the amber light; the next one keeps him there. Consider this your notice. Wash accordingly.",
    alt: "A confident Black man stands against warm amber marble in golden light, meeting the camera with the composure of a man who showered on purpose.",
  },
} as const;

export const psas = {
  indexHeading: "Public Service Announcements",
  indexSub: "Series One",
  indexBody:
    "Five announcements in the public interest, issued untouched. Study them at your leisure. Bathe at your earliest. Series Two arrives when the crisis does.",
  downloadNotice: {
    heading: "Take one for the wall.",
    /** Full distribution notice — renders ONCE, on the /psas index (Phase 4
     * consensus, F15). Detail pages carry `compact` only. */
    body: "Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous. Attribution appreciated. Results statistically likely.",
    /** Detail-page functional line — chrome-short, repeats without dying. */
    compact: "Free to print. Aim it where he'll see it.",
    button: labels.campaign.download,
  },
  /** Sniff Test spine through the archive (Phase 4 consensus, F4): the index
   * gets the one-line runway; detail pages get the CTA only. */
  sniffRoute: {
    lead: "Every man in Series One was one shower away.",
    cta: "Take the Sniff Test →",
    href: "/sniff-test",
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
    { q: `A date says "you smell nice." You:`, a: ["Say thanks. It's soap.", "Panic — which layer did they detect?", "Take full credit on behalf of Axe.", "Bank the compliment against next week's showers."] },
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
  /** shareDefault retired (Phase 4 consensus, F7): the forwarded text was a
   * receipt. Each verdict now carries its own portable `share` payload. */
} as const;

/** verdict pages /sniff-test/<slug>. register keys design.md tokens. */
export const verdicts = {
  "soap-smoldering": {
    name: "Certified Soap-Smoldering",
    register: "porcelain",
    lead: "You wash. Daily. With soap. Unreasonably hot of you.",
    body: "The men in these posters are fictional. You're proof the standard can be met by a real one. Frame this and hang it somewhere the others will see it and quietly panic.",
    share: "Verdict: Certified Soap-Smoldering. Frame this where the others can see it and quietly panic. #GotSoap gotsoap.netlify.app",
    exit: "Put it in writing. Raise the average.",
    exitCta: "Take the Lather Pledge →",
  },
  "suds-curious": {
    name: "Suds-Curious",
    register: "marble",
    lead: "There's a clean man in there. We can hear him tapping. Let him out.",
    body: "You own soap. You've met the loofah. You just keep betting a spritz will cover the gap between you and an actual shower, and that bet has never once paid out. Close it. One honest lather and you're on the good list. It's a short list. The view is excellent.",
    share: "Verdict: Suds-Curious. The clean man is in there, tapping. Tonight I hand him the soap. #GotSoap gotsoap.netlify.app",
    exit: "When he's out, sign him in.",
    exitCta: "Take the Lather Pledge →",
  },
  "axe-dependent": {
    name: "Axe-Dependent",
    register: "smoke",
    lead: "We could smell you from the results page.",
    body: "What you're calling a signature scent is a rumor about a shower you didn't take, and everyone in a five-foot radius has already heard it. The good news is almost insulting: soap costs four dollars, works on contact, and asks nothing of your personality. Seek lather immediately.",
    share: "Verdict: Axe-Dependent. My signature scent has been reclassified as a rumor. #GotSoap gotsoap.netlify.app",
    exit: "Lather first. Sign second. The order matters.",
    exitCta: "Take the Lather Pledge →",
  },
  "thirst-hazard": {
    name: "Public Thirst Hazard",
    register: "smoke",
    lead: "This has been a public thirst announcement. You were the announcement.",
    body: "You are why the group chat has a code word. You are why the rideshare cracks a window in January. Soap. Water. The wild decision to use both. Make it today. Retire the code word.",
    share: "Verdict: Public Thirst Hazard. On file with CWAAA. Take the Sniff Test before you laugh. #GotSoap gotsoap.netlify.app",
    exit: "The rideshare window is still open.",
    exitCta: "Take the Lather Pledge →",
  },
} as const;

/**
 * Verdict card chrome (VerdictCard.astro) — in-fiction utility labels routed
 * through copy.ts (2026-07-17 interior-copy sweep; same defect class as the
 * masthead's killed NGO-brochure credit leftover). `eyebrow` is campaign
 * chrome; `stampMeta` is the CWAAA seam's rubber-stamp caption (📋). Both are
 * VERBATIM from the shipped card — routing, not revoicing (the copy lane owns
 * the words). "CW-7" echoes the Sniff Test's Field Assessment CW-7 elsewhere.
 */
export const verdictCard = {
  eyebrow: "Sniff Test · Verdict",
  stampMeta: "Field Assessment CW-7 · Filed",
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
    consent: { label: "I understand this declaration is a binding moral contract.", required: true },
  },
  submit: labels.cwaaa.submitPledge,
  submitMicro: "Filed in triplicate. One copy goes to the loofah.",
  errors: {
    noName: "A declaration requires a declarant. First name, please.",
    badEmail: "The Records Division cannot file this email address as written.",
    noConsent: "The contract requires acknowledgment. Morally.",
  },
  success: {
    stamp: "SWORN.",
    body: "Declaration filed, [name]. Your name is on the roll. Daily lather is now expected.",
    note: "Movement Updates will arrive when there is movement.",
    shareBadge: labels.cwaaa.shareBadge,
    copyLink: labels.cwaaa.copyLink,
  },
  privacy:
    `Your email does one job: Movement Updates — new posters, the occasional bulletin, nothing you'd resent. We don't sell it, share it, or hand it to "partners." Unsubscribe any time. CWAAA keeps records, not secrets.`,
  badgeShare: "Form CW-1 filed. Sworn to lather. The loofah retains a copy. #GotSoap",
  /** Share-sheet title for the filed declaration (Phase 4 consensus, F7/F11). */
  badgeShareTitle: "My Declaration of Intent to Lather is on file.",
  /** Sent via Buttondown (PRD §5.4). [First name] token substituted at send. */
  welcomeEmail: {
    subject: "Your declaration has been filed.",
    preview: "Form CW-1 received. The loofah's copy is in the mail.",
    body: [
      "Dear [First name],",
      "This letter confirms that your Declaration of Intent to Lather (Form CW-1) has been received, reviewed, and filed in triplicate by the Office of Lather Compliance. One copy is retained for our records. One copy is yours to keep. The third, per protocol, goes to the loofah.",
      "You are now on the roll of a movement that declines to say how large it will grow. The Office classifies this as a scent forecast.",
      "Your obligations, as sworn:",
      "— Lather daily.",
      "— Retire body spray as a personality.",
      "— Respect the loofah in word and deed.",
      "— Never again mistake deodorant for divine intervention.",
      "We will write again when there is movement — a new poster, a bulletin, the occasional finding from the Field Data Committee. Not often. The Committee has a caseload.",
      "Lather. Rinse. Respect.",
      "The Office of Lather Compliance",
      "Concerned Women Against Axe Abuse · Est. 2024",
    ],
    ps: "P.S. Know someone whose declaration is overdue? You didn't hear it from us, but the assessment takes four minutes: [Sniff Test link]",
    footerNote: "CWAAA National Office, Suite 2B, above the pharmacy. Unsubscribe: [link].",
  },
  newsletter: {
    /** [n] = bulletin/series number · [subject] = REQUIRED topic token ·
     * [tag] renders the FULL stored finding tag (e.g. "FINDING 26-04") — never
     * prefix it with the word "Finding" (Phase 4 consensus, F17). The towel
     * sentence is the formula's example slot; vary it per bulletin's object. */
    subjectFormulas: [
      "Bulletin No. [n] — [subject] · Office of Lather Compliance",
      "[tag] is now public. It concerns the towel.",
      "Series [n] has entered the public record.",
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
    "We do not oppose fragrance. We oppose substitution. A body spray is a citrus arrangement on a condemned building. We are against the fog, and we intend to lift it. In writing. With copies filed.",
  ],
  findings: {
    heading: "The State of Male Hygiene — Annual Findings",
    subnote: "Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it.",
    rows: [
      { finding: "87% of surveyed men require a partner who 'takes care of herself.' 14% remembered when they last washed their towel.", tag: "FINDING 26-01" },
      { finding: "9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study.", tag: "FINDING 26-02" },
      { finding: "Axe body spray contains 0% soap. This figure has not improved since 1983.", tag: "FINDING 26-03" },
      { finding: "73% of body-spray applications occur in lieu of, not in addition to, a shower.", tag: "FINDING 26-04" },
      { finding: "The average loofah in male ownership is 4.7 years old. Some are load-bearing.", tag: "FINDING 26-05" },
    ],
  },
  scale: "Two million concerned women. Chapters in all fifty states. One demand.",
  ribbon: {
    heading: "Tie One On For Suds",
    body: "Our washcloth ribbon carries the Coalition's official position: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won't leave. Wear it for the reformed. Wear it for the suds-curious. Then send him to put his intent in writing.",
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
    /** Phase 4 consensus (F2): five files, five distinct transmission vectors —
     * man→man intervention, aspiration/self-recognition, anonymous coworker,
     * woman→man (daughter), and the owner-locked RC-058. The cut four
     * (RC-014/RC-052/RC-063/RC-071) stay dead: occupation, duplicate-vector
     * warmth, age-as-joke, and the unanimous leftover. */
    files: [
      { id: "RC-022", quote: `"By Sunday I'd mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called 'a conversation.' There was a printout."`, name: "Brayden, 27", status: "REFORMED. Scored Axe-Dependent. Bought soap the same afternoon. Sheets no longer seasoned." },
      { id: "RC-031", quote: `"Honestly? I'm hot. I never thought hygiene mattered — I could pull regardless. What I couldn't figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I'd ace it. I did not ace it. I'd been coasting on face alone. Vanity got me in the door. Soap kept me there."`, name: "Chad (yes, really), 29", status: "CERTIFIED SOAP-SMOLDERING. Insufferable again, but clean." },
      { id: "RC-039", quote: `"I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect. Body spray contains 0% soap. Cologne is a garnish. You do not garnish a dumpster. I own soap now."`, name: "Marcus, 34", status: "REFORMED. Cologne demoted to garnish. Referral source unidentified. Referral source knows." },
      { id: "RC-047", quote: `"Back on the apps at forty-six after the divorce. My daughter looked me dead in the eye and said, 'Dad, you smell like the garage.' She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious. I was in the shower before she'd backed out of the driveway. Three dates this month. She screens them now."`, name: "Gary, 46", status: "REFORMED. Shower routine restored. Three dates pending daughter review." },
      { id: "RC-058", quote: `"She said she'd drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn't joy — it was 'what does my room actually smell like,' and the answer scared me sober. I stream; my whole life happens in this chair; I'd quietly decided hygiene was an IRL problem and I don't do IRL. Shower for who, the webcam? It's shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life."`, name: `"Kaelthas," 22`, status: "REFORMED. Logs off to shower now. GG." },
    ],
    /** exitLine deleted (Phase 4 consensus, F10): the CTA stands alone. */
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
  /** Phase 4 consensus (F3/#14): fully in-world — the real-world parody
   * disclosure lives at /about and in structured metadata (owner ruling,
   * style-lock §10/§11). No fiction confessions on this surface. */
  finePrint:
    "Recovery Case File names are changed under Office of Lather Compliance records policy. Recognition of an active subject does not constitute a filed declaration; the subject must complete Form CW-1. The Field Data Committee meets Thursdays. The form confers no legal standing but considerable moral standing. Est. 2024.",
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
    "This started on a dating app, where men who hadn't met soap since the Obama administration were holding out for a clean, manicured, model-adjacent 10. Their offer: a five-day funk worn as a lifestyle, plus the serene conviction that she'd be lucky to have it. So I made them an ad campaign.",
    `"Got Milk?" got a generation to drink milk by making it a status symbol and putting it where kids already looked. So I did it for soap. Made clean the flex. Made effort the thirst trap. Aimed the whole thing where the ads would actually land — locker rooms, men's rooms, GQ — and let the women do the sharing, because they've been living the research the whole time.`,
  ],
  caseStudy: [
    { label: "Concept & art direction", body: "Every poster walks one tightrope: visually seductive, thematically ridiculous. Thirst-trap imagery, PSA-sincere copy, engineered to provoke, amuse, and push." },
    { label: "Execution", body: "Male models generated with openart.ai — then everything that makes them ads was done by hand in Photoshop: compositing, lighting, steam, chrome, marble, and a type system built to stay legible across every skin tone and background in the set. Where a legible fix killed the tone, I moved the light instead of the type." },
    { label: "The system", body: "Porcelain. Smoke. Marble. Then I incorporated the grudge. It smolders on the posters and files paperwork everywhere else." },
  ],
  pitch: {
    heading: "Want a campaign like this?",
    body: "I'm Stacey M. Breckel. Everything you just read — the campaign, the fake nonprofit, the paperwork that out-writes most brands' hero copy — came from one hand: mine. A dating app made me mad, so I declared a national hygiene crisis. I file my grudges in triplicate.",
    tagline: "Let's make clean design dirty fun.",
    // contact + behance come from config/site.ts (obfuscate email from scrapers at render)
  },
  /** The reveal is the page's voice; the disclaimer below is its fine print. */
  credit: `${COPYRIGHT}. A satirical spec campaign by Hope2 Studio.`,
  /** Relocated from the global footer (2026-07-16 footer consolidation) and
   * reworded to do the LEGAL job only — non-affiliation, not "surprise, it's
   * satire". Spec-verbatim wording (footer-consolidation-spec "Target state"). */
  disclaimer:
    "Parody. Not affiliated with any brand, product, publication, or public-health organization. Models generated with openart.ai; art direction, compositing, and typography by hand.",
} as const;

/**
 * 🧼 The faux shop (OWNER ORDER 2026-07-21, faux-shop-legal-order.md).
 * Campaign register, played completely straight: the store is 100% real above
 * the footer — it never winks, never spoils. The joke lives in the copy and
 * the products, never the chrome.
 *
 * LANES: chrome strings here (header, cart, comingSoon, addToCart, back) are
 * structural retail furniture — build-lane implementation defaults, the same
 * ratified class as `contents.closeCwaaa`. Product `name`/`blurb` entries are
 * flat-register defaults that the order's PART 2 hands to the copy lane
 * (Vivian ⇄ Sol dialectic) for the real retail pitch — replace values only;
 * slugs are URLs and stay. `alt` is accessibility chrome (build lane).
 *
 * DEAD-END (owner decision 2, resolved): prices + descriptions listed,
 * "Coming Soon!" beside each grayed-out Add to Cart. The store reads as about
 * to open — takes no money, promises no fulfillment, spoils nothing.
 */
export const shop = {
  header: {
    kicker: "Official Campaign Supply",
    heading: "The Shop",
    /** The believable-store cart affordance — rendered as a disabled control;
     * same dead-end as Add to Cart. */
    cartLabel: "Cart (0)",
  },
  comingSoon: "Coming Soon!",
  addToCart: "Add to Cart",
  backToShop: "← Back to the shop",
  products: [
    {
      slug: "soap",
      name: "The Embossed Bar",
      price: "$9",
      blurb: "The campaign wordmark, pressed deep into a cream bar. It is soap.",
      alt: "A cream soap bar with “got soap?” embossed on top, ringed with lather.",
    },
    {
      slug: "got-soap-tee",
      name: "The Wordmark Tee",
      price: "$25",
      blurb: "Black cotton, distressed wordmark print across the chest.",
      alt: "A black t-shirt with a distressed white “got soap?” print across the chest.",
    },
    {
      slug: "clean-sexy-tee",
      name: "The Statement Tee",
      price: "$25",
      blurb: "CLEAN IS THE NEW SEXY. Gold and rose print on black cotton.",
      alt: "A black t-shirt printed with “CLEAN IS THE NEW SEXY.” in gold and rose.",
    },
    {
      slug: "hat",
      name: "The Dad Hat",
      price: "$28",
      blurb: "Black cotton twill, the wordmark embroidered in white.",
      alt: "A black dad hat with “got soap?” embroidered in white thread.",
    },
    {
      slug: "effort-bottle",
      name: "The Effort Bottle",
      price: "$22",
      blurb: "SMELL LIKE EFFORT. Matte black steel, white print.",
      alt: "A matte black steel water bottle printed with “SMELL LIKE EFFORT.”",
    },
  ],
} as const;

export const notFound = {
  stamp: "MISSING",
  body: "This page didn't shower. It's gone. If found, do not approach. Report all sightings to the Office of Lather Compliance.",
  caseClosed: "CASE CLOSED",
  cta: "Return to the movement →",
} as const;

const copy = {
  HASHTAGS, FUNDED_BY, COPYRIGHT, labels, nav, contents, masthead, footer, scratchGag, meta,
  home, posterCopy, psas, sniffTest, verdicts, verdictCard, pledge, crisis, about, shop, notFound,
} as const;

export default copy;
