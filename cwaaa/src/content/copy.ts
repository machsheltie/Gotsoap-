/**
 * copy.ts — every word the CWAAA site says, in one place.
 *
 * Authorship: CWAAA only (design.md §1). No campaign smolder, no Office
 * language. Lines carried from the approved combined-runtime deck
 * (site/src/content/copy.ts, `crisis`) are marked APPROVED. Lines written for
 * the 2026-09-14 home build are marked DRAFT and await the copy lane
 * (gotsoap/docs/copy/COPY-PROTOCOL.md) before launch.
 */

export const org = {
  name: 'Concerned Women Against Axe Abuse',
  nameLines: ['Concerned Women', 'Against Axe Abuse'],
  initialism: 'CWAAA',
  est: 'Est. 2024',
  tag: 'A national coalition',
  /** APPROVED — objective canon (world-bible.md). */
  scale: 'Two million concerned women. Chapters in all fifty states. One demand.',
  scaleShort: 'Two million concerned women · Chapters in all fifty states · One demand',
  /** APPROVED — runtime footer note, kept as the truthful fictional address line. */
  office: 'National Office, Suite 2B, above the pharmacy.',
  sealAlt: 'Concerned Women Against Axe Abuse seal: a bar of soap in front of a barred aerosol can.',
} as const;

export const nav = {
  items: [
    { label: 'Findings', href: '/findings' },
    { label: 'Recovery Stories', href: '/recovery-stories' },
    { label: 'Tie One On', href: '/tie-one-on' },
    { label: 'Chapters', href: '/chapters' },
    { label: 'About', href: '/about' },
  ],
  pledge: { label: 'Take the Pledge', href: '/pledge', form: 'Form CW-1' },
  menu: 'Menu',
  close: 'Close',
} as const;

export const legal = {
  /** Privacy, Terms, DMCA remain globally accessible; labels never announce the fiction. */
  links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'DMCA', href: '/dmca' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'About', href: '/about' },
  ],
} as const;

export const home = {
  meta: {
    title: 'CWAAA — Concerned Women Against Axe Abuse',
    description:
      'Routine washing is a reasonable collective expectation. Findings, Recovery Stories, Tie One On For Suds, and the Lather Pledge from Concerned Women Against Axe Abuse.',
  },

  /** LOCKED proposition (design.md §1). Set sentence-case on the home per ui-system §13. */
  proposition: 'The bar is soap.',
  propositionCanonical: 'THE BAR IS SOAP.',

  about: {
    marker: 'About the coalition',
    /** RATIFIED 2026-09-15 — owner call, copy lane R3. The owner kept the incumbent mission
     *  restatement over both reader-preferred candidates ("of women who each have one specific man
     *  in mind"; "organized around a smell"). Reader evidence against this line is on file in
     *  reader-evidence-2026-09-15-home-close.md, slot A, and is closed, not pending. */
    statement:
      'Concerned Women Against Axe Abuse is a national coalition making routine soap-and-water hygiene the expected baseline.',
    body: [
      /** First sentence APPROVED — design.md §1 subline. Second sentence RATIFIED 2026-09-15 —
       *  owner call, copy lane R3: the incumbent sentence stands. The readers' unanimous pick
       *  ("how long the ride was") and their argument that this paragraph repeats itself are on
       *  file in reader-evidence-2026-09-15-home-close.md, slot C and convergence item 1. Closed. */
      'Routine washing is a reasonable collective expectation. We document what happens when fragrance is asked to do a shower’s job, and we give people a practical way to act.',
      /** APPROVED — crisis.founding[0] and [1], trimmed. */
      'Founded in 2024 by women who had smelled enough. There was no founding incident. There were thousands, occurring simultaneously, in elevators and rideshares and the third row of every theater.',
    ],
    actions: {
      primary: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
      secondary: { label: 'Read the Findings', href: '/findings' },
    },
  },

  dao: {
    marker: 'What we do',
    /** LOCKED composition (design.md §5): one continuous line, never three cards. */
    line: ['Document.', 'Advocate.', 'Organize.'],
    /** RATIFIED 2026-09-15 — owner call, copy lane R3. Document is revised; Advocate and Organize
     *  keep their incumbent text. Reader evidence for all three clauses, including the raised-voice
     *  candidate that failed with the referred man, is in reader-evidence-2026-09-15-home-close.md,
     *  slot B. Closed. */
    run: [
      {
        /** The one revision on this block: the DRAFT clause restated the verb, and two readers
         *  skimmed it. "Four women and a binder" is the fact they both stopped on — a small real
         *  organization is more convincing than a large one. */
        label: 'Document',
        body: 'Every finding is numbered, dated, and entered by the Field Data Committee. The committee is four women and a binder.',
      },
      {
        label: 'Advocate',
        body: 'We state the expectation in public. Routine washing is reasonable, and someone has to say so where it can be heard.',
      },
      {
        label: 'Organize',
        body: 'We give people a practical way to act: a ribbon, a referral, a form, and a next step that fits in one afternoon.',
      },
    ],
  },

  ribbon: {
    heading: 'Tie One On For Suds',
    /** APPROVED — crisis.ribbon.body, first three sentences. */
    body:
      'Our washcloth ribbon carries the Coalition’s official position: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won’t leave.',
    action: { label: 'Learn about the ribbon', href: '/tie-one-on' },
  },

  finding: {
    marker: 'Current finding',
    /** Owner-directed statement, 2026-09-14. Registered as FINDING 26-01 (CW-D04, ui-system §13
     *  2026-09-14); the full entry with its figure lives in `findings.lead`. */
    statement: 'Fragrance is not a cleansing event.',
    /** Owner decision 2026-09-15: both lines belong here. First is the APPROVED register support
     *  for FINDING 26-01 (findings.lead.support); second RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    support: [
      '73% of body-spray applications occur in lieu of, not in addition to, a shower.',
      'Body spray treats the air. Sweat, oil, and the week stay on the person.',
    ],
    /** RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    disposition: 'Entered without objection',
    /** The filed record under the rule: label / value pairs. "Field Data Committee" is APPROVED
     *  (crisis.findings.subnote). */
    record: [
      { label: 'Finding', value: '26-01' },
      { label: 'Entered by', value: 'Field Data Committee' },
      { label: 'Status', value: 'Current' },
    ],
    method: {
      label: 'Methodology note',
      /** RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
      body:
        'Observations were collected at chapter tables, on gym benches, and in one elevator. No member was required to stay for the full ride.',
    },
  },

  voice: {
    marker: 'One recovery voice',
    /** APPROVED — crisis.caseFiles.files RC-022 quote and name. No RC identifier on the home
     *  (design.md §4: Recovery Record and RC-NNN appear only inside an opened story). */
    quote:
      '“By Sunday I’d mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called ‘a conversation.’ There was a printout.”',
    name: 'Brayden, 27',
    action: { label: 'Read Recovery Stories', href: '/recovery-stories' },
    /** The referring visitor's action: a link to Form CW-1 that copies the pledge URL when
     *  JavaScript is available (design.md §10: a copied link confirms).
     *  `done` RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md).
     *  `label` RATIFIED 2026-09-15 — copy lane R2 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    refer: { label: 'Copy the pledge link for one man', href: '/pledge', done: 'Pledge link copied. He will know why.' },
    /** APPROVED 2026-09-15 — CW-G04 Home. The participant is shown. The photograph is the one he
     *  had on hand, which is the finding. Alt text carries the committee's caption voice; it
     *  describes what is in the frame and does not comment on it. */
    image: {
      title: 'Participant photograph · Brayden, 27',
      spec: 'Submitted by the participant. Retained as received.',
      alt:
        'Brayden, 27, in a boat on open water, sunglasses on, holding a bluegill up toward the camera with both hands. Submitted by the participant as his most recent photograph of himself.',
    },
  },

  /** Sequence items 6 and 7 (design.md §5): coalition scale, a few human chapter traces, one pledge action. */
  close: {
    marker: 'The coalition',
    /** APPROVED — objective canon. */
    scale: 'Two million concerned women. Chapters in all fifty states. One demand.',
    /** RATIFIED 2026-09-15 — owner call, copy lane R3: two traces, incumbent text. The proposed
     *  third trace ("Nobody is assigned a man. Every member brought her own.") and the revisions to
     *  trace 2 are withdrawn. Both women read three traces as one repeated move ("institutional
     *  noun, then a human deflation"), which two supports. No invented place, chapter, or contact
     *  (CW-D04 roster still open). */
    traces: [
      'Chapter mail is opened on Thursdays. Every envelope is answered, including the ones that only say "finally."',
      'A pledge table needs a folding table, a stack of Form CW-1, and one person willing to make eye contact.',
    ],
    action: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
  },

  /** Rendered only when GOT_SOAP_SITE_URL is configured (design.md §5 item 8). */
  seam: {
    marker: 'Campaign material received',
    body: 'The Lather Pledge is also presented by the Got Soap? campaign.',
    action: 'Visit Got Soap?',
    external: 'External site',
  },

  placeholders: {
    hero: {
      id: 'CW-G02',
      /** Owner-supplied photographs, 2026-09-15 (src/assets/hero-coalition-{wide,tall}.png). */
      alt: 'Three members of the coalition standing in a plain meeting room, facing the camera. One holds a bar of soap.',
      title: 'Documentary hero · full bleed · shipped',
      /** CW-G02 is shipped and closed (GRAPHICS-TO-MAKE.md, design.md §6). The earlier gym-bag
       *  shot spec was struck by the owner and is deliberately not preserved here — leaving it
       *  in the module invited agents to treat it as live direction. */
      spec:
        '16:9 wide frame. The coalition group portrait: three members in a plain meeting room, facing the camera, one holding a bar of soap. Subject upper-right below the navigation band; lower left kept quiet for the proposition. Masters: 3200×1800 desktop plus a true 4:5 phone composition.',
    },
    cloth: {
      id: 'CW-G03',
      /** No still life (GRAPHICS-TO-MAKE.md § Standing image law, 2026-09-15): a man is in frame
       *  wearing the ribbon. Object-alone doorknob scenes are rejected. */
      title: 'Tie One On scene · full bleed · placeholder',
      spec:
        'A man in an ordinary interior with the red washcloth ribbon on him — wrist, belt loop, or bag strap he is carrying. He is legible in frame; weave, hem and knot tension read at that proximity. No object-alone still life. Lower-left third kept quiet for the panel.',
    },
  },
} as const;

/**
 * /findings — the register. Roster resolved under CW-D04 for this route
 * (ui-system §13, 2026-09-14; brief at .impeccable/surfaces/cwaaa-src-pages-findings-astro.md).
 * Register year 26. Runtime 26-03 (0% soap, "since 1983") is dropped. Row texts marked APPROVED
 * are byte-carried from site/src/content/copy.ts `crisis.findings.rows`. No Office citation on
 * this route: the site's one sparse neutral citation is reserved for the About seam.
 */
export const findings = {
  meta: {
    title: 'Findings — CWAAA',
    description:
      'Numbered findings on the state of male hygiene, entered by the Field Data Committee of Concerned Women Against Axe Abuse. Fragrance is not a cleansing event.',
  },
  /** FINDING 26-01: the monumental figure and the conclusion that owns the route. */
  lead: {
    label: 'Finding 26-01',
    /** Figure from runtime 26-04 (APPROVED). Set alone in Mirk Slab 900; never a chart. */
    figure: '73%',
    /** Owner-directed statement, 2026-09-14. */
    conclusion: 'Fragrance is not a cleansing event.',
    /** APPROVED — runtime FINDING 26-04. */
    support: '73% of body-spray applications occur in lieu of, not in addition to, a shower.',
    /** Disposition RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    record: [
      { label: 'Entered by', value: 'Field Data Committee' },
      { label: 'Disposition', value: 'Entered without objection' },
      { label: 'Status', value: 'Current' },
    ],
  },
  /** The route's one interruption. APPROVED — crisis.findings.subnote. */
  method: {
    label: 'Methodology note',
    body: 'Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it.',
  },
  register: {
    marker: 'The register',
    heading: 'Entered findings',
    caption: 'Findings 26-02 through 26-04, in register order. Finding 26-01 appears above.',
    columns: { label: 'Finding', figure: 'Figure', text: 'As entered' },
    rows: [
      /** APPROVED — runtime 26-01. */
      { label: '26-02', figure: '87%', text: '87% of surveyed men require a partner who ‘takes care of herself.’ 14% remembered when they last washed their towel.' },
      /** APPROVED — runtime 26-02. */
      { label: '26-03', figure: '9 of 10', text: '9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study.' },
      /** APPROVED — runtime 26-05. */
      { label: '26-04', figure: '4.7 years', text: 'The average loofah in male ownership is 4.7 years old. Some are load-bearing.' },
    ],
    /** The register's standing line, Catesque notation. RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    note: 'A finding stays current until a later finding replaces it. None has.',
  },
  next: {
    marker: 'Next',
    /** RATIFIED 2026-09-15 — copy lane R2 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    statement: 'Members follow up in person. Some of the men answered the door clean.',
    actions: {
      primary: { label: 'Read Recovery Stories', href: '/recovery-stories' },
      secondary: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
    },
    /** Copies this route's link when JavaScript is available (design.md §10). RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    refer: { label: 'Send the findings to the man they describe', href: '/findings', done: 'Link copied. No cover note is required.' },
  },
} as const;

export const notFound = {
  meta: { title: 'Nothing is filed at this address — CWAAA', description: 'This page is not part of the current CWAAA publication set.' },
  /** RATIFIED 2026-09-15 — owner call, copy lane R3: revised heading, incumbent body. "Filed" is
   *  the verb the whole site runs on and "address" does double duty on a coalition whose office is
   *  above a pharmacy; two readers ranked it first and none ranked it last. Still CWAAA's own
   *  records language — no finding, no disposition, no compliance status, no error code, no Office
   *  behaviour, and the page stays calm. The body keeps "No further conclusion should be drawn from
   *  its absence" by owner call; the R3 note that the sentence leans toward the Office's voice is
   *  on file and closed. */
  heading: 'Nothing is filed at this address.',
  body: 'The address may be incomplete, or the page may not be part of the current publication set. No further conclusion should be drawn from its absence.',
  actions: [
    { label: 'Return home', href: '/' },
    { label: 'Read the Findings', href: '/findings' },
    { label: 'Take the Pledge', href: '/pledge' },
  ],
} as const;


/**
 * /recovery-stories and /recovery-stories/[id]. Brief: .impeccable/surfaces/
 * cwaaa-src-pages-recovery-stories-astro.md (confirmed 2026-09-15).
 * Copy authority: docs/copy/proposals-2026-09-15-recovery-record-fields.md and
 * docs/copy/proposals-2026-09-15-billy-bob.md. Boundary canon:
 * docs/canon-billy-bob-and-the-archive-boundary.md.
 *
 * ONE ordered sequence with `public` per record. getStaticPaths emits every
 * record; the index maps only the public ones; pagination walks the whole
 * sequence. That divergence IS the mechanic (canon 1) — do not "fix" it.
 *
 * First-person testimony from the five approved men is untouched. Brayden's
 * testimony is owner-authored and ratified 2026-09-15, preserved verbatim;
 * "nothing follows the last line" is enforced by the template. RC-031/039/047/058
 * have approved quotes but no authored referral block, chronology or outcome yet
 * — those are Vivian rounds and a builder must not invent them (brief 8), so
 * those sections are simply absent on their records.
 */
export const recoveryStories = {
  meta: {
    title: 'Recovery Stories — CWAAA',
    description:
      'Men who changed their minds, in their own words. Documented by Concerned Women Against Axe Abuse.',
  },
  marker: 'Recovery Stories',
  heading: 'In their own words.',
  intro: 'The Coalition documents recoveries. We do not improve the quotes.',
  note: 'Published with each participant’s consent. Names changed where he asked.',
  readLabel: 'Read the record',
  /** DRAFT — the public notation for a participant photograph that has not
   *  shipped yet. It replaces the production placeholder, which three blind
   *  readers read as a broken site on 2026-09-15 ("someone shipped their Figma
   *  comments"). True to the file: the men did submit pictures, so the field
   *  says the picture exists and is not reproduced, and promises nothing. The
   *  ID-and-spec worksheet still renders under `npm run review`. */
  noPhoto: { label: 'Photograph on file · not reproduced', note: 'Retained as received.' },
  recordLabel: 'Recovery Record',
  referralLabel: 'Referral as received',
  chronologyLabel: 'Case chronology',
  pager: { prev: 'Previous record', all: 'All Recovery Stories', next: 'Next record' },
  action: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
  records: [
    {
      id: 'RC-022',
      slug: 'brayden',
      open: true,
      public: true,
      name: 'Brayden, 27',
      /** APPROVED — byte-identical to home.voice.quote. The index must not contradict the homepage. */
      indexQuote:
        '“By Sunday I’d mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called ‘a conversation.’ There was a printout.”',
      image: {
        alt: 'Brayden, 27, in a boat on open water, sunglasses on, holding a bluegill up toward the camera with both hands. Submitted by the participant as his most recent photograph of himself.',
      },
      /** Vivian 2026-09-15 section 1, with the ratified `inquiry` correction: CWAAA inquires, it does not audit. */
      referral: [
        { label: 'Participant', value: 'Brayden, 27' },
        { label: 'Reporting party', value: 'Prospective match' },
        { label: 'Referral occasioned by', value: 'First date hygiene inquiry' },
        { label: 'Participant’s stated position', value: '“King looking for his Queen to spoil.”' },
        { label: 'Stated expectations of others', value: '“Must be fit, fun, 10/10, no drama.”' },
        { label: 'Primary self-representation', value: 'Fish' },
        { label: 'Reported shower substitute', value: 'Febreze' },
        { label: 'Water engagement', value: 'Reported infrequent' },
        { label: 'Supporting materials', value: 'Printout, submitted separately by a member of the household' },
        { label: 'Prior contact with CWAAA', value: 'None' },
      ],
      /** Corroboration is what actually justifies a file. */
      corroboration: [
        {
          heading: 'Referral 1',
          rows: [
            { label: 'Source relationship', value: 'Cohabitating roommate' },
            { label: 'Concern', value: 'Repeated fragrance substitution' },
          ],
        },
        {
          heading: 'Referral 2 — received 36 hours later',
          rows: [
            { label: 'Source relationship', value: 'Prospective romantic partner' },
            { label: 'Prior contact with participant', value: 'Digital only' },
            { label: 'Concern', value: 'Repeated fragrance substitution' },
            { label: 'Cross-referral corroboration', value: 'Confirmed' },
          ],
        },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“His profile said he was looking for a queen to spoil. Every photo was him holding a fish, and in one of them I could see his sheets. I wasn’t going to cancel. I was going to go, and then handle it myself. Then I found out there was somewhere to send it. I didn’t cancel. I filed.”',
        },
        {
          heading: 'Member of household — statement on file',
          body: '“I’d said it out loud twice and nothing happened. So I printed the page and put it on his door. I didn’t want a confrontation. I wanted a document.”',
        },
      ],
      /** OWNER-AUTHORED, ratified 2026-09-15. Verbatim. Nothing follows the last line. */
      testimony: [
        'I really did think I had a system. Febreze the sheets on Sunday, hit the jacket during the week, spray myself if I was going somewhere. My roommate kept telling me that wasn’t the same thing as washing anything. I thought he was being dramatic.',
        'Then I had a first date coming up and somehow she filed a referral too. We hadn’t even gone out yet. Two people who didn’t know each other had independently decided I needed help before Friday. That’s hard to argue with.',
        'So I showered. Washed the sheets. Used actual laundry detergent. Clean shirt. The whole thing.',
        'The date went really well.',
        'That’s the embarrassing part. Not the referral. Finding out everybody was right.',
        'I used to think all that stuff didn’t really matter if you looked good and smelled decent enough. It matters. Women notice. They notice your clothes. They notice your hair. They notice if your sheets smell clean. They definitely notice when you smell good because you’re actually clean instead of because you sprayed something over yourself.',
        'I shower every day now. I wash my sheets every week. I still wear cologne. Apparently you’re allowed to do both.',
        'My dating life is better. My roommate complains about me less. And for the record, the fish picture still works.',
        'There was one other thing I didn’t expect. When I go see my mom now and give her a hug, she tells me how good I smell. And she holds on a little longer. That’s pretty nice.',
      ],
      close: [
        { label: 'Intervention provided', value: 'Baseline materials' },
        { label: 'Follow-up interval', value: '90 days' },
        { label: 'Current status', value: 'Maintaining baseline' },
        { label: 'Outcome', value: 'Lathers unprompted' },
        { label: 'Case status', value: 'Closed' },
      ],
    },
    {
      id: 'RC-031',
      slug: 'chad',
      open: false,
      public: true,
      name: 'Chad (yes, really), 29',
      indexQuote:
        '“Honestly? I’m hot. I never thought hygiene mattered — I could pull regardless. What I couldn’t figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I’d ace it. I did not ace it. I’d been coasting on face alone. Vanity got me in the door. Soap kept me there.”',
      image: {
        spec: 'Gym mirror selfie, shirt lifted, phone covering half his face. Submitted by the participant. He sent four; this was the one he wanted used.',
      },
    },
    {
      id: 'RC-039',
      slug: 'marcus',
      open: false,
      public: true,
      name: 'Marcus, 34',
      indexQuote:
        '“I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect. Body spray contains 0% soap. Cologne is a garnish. You do not garnish a dumpster. I own soap now.”',
      image: {
        spec: 'Cropped from a wedding photo — suit, half a stranger’s shoulder still in frame. Submitted by the participant as the most recent picture of himself he had.',
      },
    },
    {
      id: 'RC-047',
      slug: 'gary',
      open: false,
      public: true,
      name: 'Gary, 46',
      indexQuote:
        '“Back on the apps at forty-six after the divorce. My daughter looked me dead in the eye and said, ‘Dad, you smell like the garage.’ She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious. I was in the shower before she’d backed out of the driveway. Three dates this month. She screens them now.”',
      image: {
        spec: 'Standing in his own driveway beside the truck, arms crossed, squinting into afternoon sun. Taken by his daughter, who submitted it.',
      },
    },
    {
      id: 'RC-058',
      slug: 'kaelthas',
      open: false,
      public: true,
      name: '“Kaelthas,” 22',
      indexQuote:
        '“She said she’d drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn’t joy — it was ‘what does my room actually smell like,’ and the answer scared me sober. I stream; my whole life happens in this chair; I’d quietly decided hygiene was an IRL problem and I don’t do IRL. Shower for who, the webcam? It’s shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life.”',
      image: {
        spec: 'In the gaming chair, headset around his neck, RGB behind him, shoulders-up exactly as he describes. Submitted by the participant from his stream.',
      },
    },
    {
      /**
       * NOT PUBLIC. Absent from the index, from search and from the sitemap;
       * reachable only by following the last public record's Next (canon 1).
       * No secret-area treatment of any kind: the site's mistake is
       * bureaucratic, not theatrical.
       */
      id: 'RC-090',
      slug: 'billy-bob',
      open: true,
      public: false,
      name: 'Billy Bob, 51',
      indexQuote: '',
      image: {
        spec: 'At his own kitchen table, still in work clothes, hands folded. Taken by the case worker with permission.',
      },
      referral: [
        { label: 'Source relationship', value: 'Spouse, cohabitating' },
        { label: 'Primary concern', value: 'Persistent post-shift non-cleansing' },
        { label: 'Fragrance substitution', value: 'Not primary' },
        { label: 'Household impact', value: 'Reported' },
        { label: 'Shared-surface impact', value: 'Reported' },
        { label: 'Prior household intervention', value: 'Multiple conversations' },
        { label: 'Prior contact with CWAAA', value: 'None' },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“I’ve never once minded the way he smells coming in the door. That’s work. That’s the job.\n\nWhat I mind is that I started sleeping on my side facing the wall so I wouldn’t be laying in it. I’ve asked him nice and I’ve asked him not nice, and he’s got an answer every time that sounds right. I can’t argue with him.\n\nI’m hoping you can.”',
        },
      ],
      testimony: [
        'Everybody wants to talk about this like I don’t wash. I wash. Saturday I wash, Sunday I wash, any day I’m not going down I wash.',
        'What I don’t do is scrub off Monday night to be filthy again Tuesday at six.',
        'You don’t run a pump dry on purpose. You don’t put a new belt on one that’s coming off again at the end of the shift. You do the work when the work holds. Washing don’t hold. That’s all I ever said.',
        'She tells me it’s different. I’ve asked her how and she gets mad instead of telling me. I’m not trying to win it. I just never got an answer that was an answer.',
      ],
      fieldNote: {
        heading: 'Field note — case worker, statement on file',
        body: '“Participant met me at his kitchen table and answered everything I asked him. He is not defensive and he is not ashamed. He explained his reasoning to me twice, patiently, and I would like the file to reflect that it is not stupid reasoning.\n\nI told him the part he was leaving out. He listened to me and said he would think on it.\n\nSecond visit, nothing had changed. He asked me the same question he asks his wife. I gave him the same answer she gives him, and I watched it not land again.\n\nHe is able to do this and he does not believe he should have to. I have nothing left to offer him that he has not already declined.”',
      },
      chronology: [
        { label: 'Initial outreach', value: 'CWAAA contacts participant following partner referral' },
        { label: 'Baseline materials provided', value: 'Standard cleansing guidance' },
        { label: 'Participant response', value: 'Materials acknowledged; practical necessity disputed' },
        { label: 'Follow-up', value: 'Partner reports behavior unchanged' },
        { label: 'Second intervention', value: 'Household consequences discussed' },
        {
          label: 'Participant response',
          value: 'Maintains post-shift bathing is inefficient given occupational conditions',
        },
        { label: 'Household impact update', value: 'Continued transfer of mine residue to shared bedding' },
        { label: 'External review requested', value: '17 October' },
      ],
      /**
       * Rendered as a foreign object per design.md: stark white, Courier, black
       * institutional type, its own reference numbering, small, unlinked,
       * uncaptioned, unexplained. The withheld disposition is a solid redaction
       * bar, not [WITHHELD] — a redaction reads as an act done to a document.
       */
      fragment: {
        lines: [
          'OFFICE OF LATHER COMPLIANCE',
          'EXTERNAL FINDING',
          'REFERENCE: 8804-X',
          '',
          'PRIOR VOLUNTARY INTERVENTION: DOCUMENTED',
          'BASELINE REFUSAL: SUSTAINED',
          'OCCUPATIONAL RESIDUE: CONFIRMED',
          'SHARED-SURFACE TRANSFER: CONFIRMED',
          'HOUSEHOLD IMPACT: DOCUMENTED',
          '',
          'FINDING: BASELINE DEFICIENCY',
        ],
        dispositionLabel: 'DISPOSITION:',
      },
      returned: { label: 'Case returned', value: '24 October' },
      followUp: {
        heading: '21-day follow-up',
        lines: [
          'Participant reports showering immediately following each completed mine shift.',
          'Partner confirms cessation of occupational-residue transfer to shared bedding.',
          'Laundry and bedding conditions reported returned to baseline.',
          'Participant reports no difficulty maintaining revised routine.',
        ],
        askedLead: 'Asked what changed his position regarding post-shift bathing, participant stated:',
        quote: '“Makes sense to wash up.”',
      },
      partnerFollowUp: {
        heading: 'Reporting party — follow-up statement on file',
        body: '“He comes in and goes straight to the shower now. Doesn’t announce it. Just does it.\n\nI sleep facing him again. That’s all I was ever asking for.\n\nHe wants me to notice. I notice.”',
      },
      close: [
        { label: 'Case status', value: 'Recovered / Maintaining baseline' },
        { label: 'Current cleansing routine', value: 'Post-shift' },
        { label: 'Household impact', value: 'Resolved' },
        { label: 'Shared-surface transfer', value: 'No recurrence reported' },
        { label: 'Additional CWAAA intervention', value: 'Not required' },
        { label: 'External review', value: 'Completed' },
        { label: 'OLC reference', value: '8804-X' },
      ],
      closeNote:
        'Partner reports that shared bedding has remained within baseline since the participant’s return.',
    },
  ],
} as const;
