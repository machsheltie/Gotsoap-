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
       *
       * UNFINISHED EDGE — canon 1 says Billy Bob RETAINS an active Next, and he
       * does not have one yet. This is not a decision that the archive ends
       * here; it is record 7 not being written. See `nextPending` below. Do not
       * resolve this by concluding the sequence is complete, and do not resolve
       * it by pointing Next at a record that does not exist: a 404 reads as a
       * broken site, and a broken site is an innocent explanation for the
       * boundary the visitor just crossed. It defuses the mechanic instead of
       * deepening it. The fix is to write record 7.
       */
      id: 'RC-064',
      slug: 'billy-bob',
      open: true,
      public: false,
      /** Age set by the owner 2026-09-16. Shipped `Billy Bob, 51` had no owner
       *  provenance and is retired. */
      name: 'Billy Bob, 37',
      indexQuote: '',
      /** Shipped 2026-09-16 (src/assets/billybob.png). The photograph is the
       *  before-state: he is at the table in the clothes he came up in, and the
       *  shift is still on him. It is not softened, and it is not a still life. */
      image: {
        alt: 'Billy Bob, 37, at his own kitchen table in a coal-stained work shirt, hands folded in front of him, looking directly at the camera. Coal dust is still on his face, in his hair, and worked into his knuckles. Taken during initial home contact.',
      },
      /**
       * The three-beat summary from the approved record, rendered under the
       * masthead ahead of the referral block: the record's conversion argument
       * reaches a scanning reader before any proof does.
       */
      arc: [
        { label: 'What he believed', value: 'That there was no day worth washing for, because the next shift was always coming.' },
        { label: 'What it cost him', value: 'His wife stopped wanting him near her.' },
        { label: 'What he does now', value: 'He showers after every shift.' },
      ],
      referral: [
        { label: 'Participant', value: 'Billy Bob, 37' },
        { label: 'Reporting party', value: 'Spouse, cohabitating' },
        { label: 'Referral occasioned by', value: 'Sustained non-cleansing' },
        { label: 'Cleansing frequency', value: 'None' },
        { label: 'Cleansing on non-working days', value: 'None' },
        { label: 'Fragrance substitution', value: 'None' },
        { label: 'Occupational context', value: 'Underground coal extraction, active' },
        { label: 'Household impact', value: 'Withdrawal of physical contact' },
        { label: 'Shared-surface impact', value: 'Occupational residue transferred to bedding' },
        { label: 'Prior household intervention', value: 'Multiple conversations reported prior to contact' },
        { label: 'Awareness of concern', value: 'Confirmed' },
        { label: 'Prior contact with CWAAA', value: 'None' },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“He comes in the door at the end of a shift and I smell him before I see him. I mind it. I’m done pretending otherwise.\n\nAnd it does not stop at the door. It’s in his hair and the creases of his neck and under his nails, and he sits down to supper in it and then he gets in our bed in it. I wash those sheets and they come off the line gray. There’s a shape of him on his side that doesn’t come out.\n\nAnd it is not only the workdays. Sunday makes no difference. He sits in that chair in the same shirt he came home in. I cannot remember the last time that man got into a shower.\n\nI’ve told him. I’ve told him plain, more than once. He has never once acted like he didn’t hear me. He just has his reasons, and he gives them to me slow, like I’m the one not following.\n\nI stopped reaching for him. I sleep on the edge of the bed with my back to him. I don’t want him touching me when he comes to bed like that.\n\nI’m not calling you people about laundry.”',
        },
      ],
      /**
       * OWNER CANON, 2026-09-15 — BILLY BOB DOES NOT WASH. Not on Saturdays, not
       * on Sundays, not on days he does not go underground. Pre-Office he has no
       * cleansing routine of any kind and no bounded workday exception. His total
       * refusal is why ordinary CWAAA intervention fails and the Office is
       * brought in; a man who washes on his days off is an efficiency eccentric,
       * not a refusal case. An opener granting him partial credit ('Saturday I
       * wash, Sunday I wash...') has been reintroduced on multiple passes and is
       * struck permanently. Do not restore it in any variant.
       *
       * Owner-approved text: docs/copy/proposals-2026-09-17-billy-bob-r6.md.
       */
      testimony: [
        '“I don’t see the sense in it.',
        'I go down that hole and come up black, and I’m going right back underground in the morning. What am I washing for tonight when I’ll be covered again tomorrow? Never saw much point in washing just to get dirty again.',
        'They ask about Sunday. Monday’s coming.',
        'She’s told me about the smell and the bed. I heard her. It doesn’t change what’s waiting on me in the morning.”',
      ],
      /**
       * The identical `Participant's stated position` value is this record's comic
       * engine (owner-ratified 2026-09-15): the string does not vary while the
       * institution's own vocabulary escalates around it. Do not de-duplicate
       * these rows and do not paraphrase one of them for variety.
       */
      chronology: [
        { label: 'Referral received', value: 'Spouse, cohabitating. Multiple household conversations reported prior to contact.' },
        { label: 'Initial outreach', value: 'Participant contacted at home. Baseline materials provided and accepted.' },
        { label: 'Participant’s stated position', value: '“Never saw much point in washing just to get dirty again.”' },
        { label: 'Shared-surface impact', value: 'Reported.' },
        { label: 'Follow-up', value: 'Partner reports behavior unchanged.' },
        { label: 'Participant’s stated position', value: '“Never saw much point in washing just to get dirty again.”' },
        { label: 'Shared-surface impact', value: 'Continuing.' },
        { label: 'Second intervention', value: 'Household consequences discussed with participant. Partner present.' },
        { label: 'Participant acknowledgment', value: 'Confirmed. Participant restated the reporting party’s concern accurately.' },
        { label: 'Participant’s stated position', value: '“Never saw much point in washing just to get dirty again.”' },
        { label: 'Shared-surface impact', value: 'Continuing.' },
        { label: 'Partner-reported impact', value: 'Withdrawal of physical contact.' },
        { label: 'Final voluntary contact', value: 'No change in practice. No further CWAAA intervention available.' },
      ],
      /** Lodged after the chronology: the last human voice before external review. */
      fieldNote: {
        heading: 'Field note — caseworker, statement on file',
        body: '“Second visit. I explained the reporting party’s concern again and asked him to tell it back to me. He did. Then he gave me the same reason again.\n\nHe does not believe he should have to.\n\nI have nothing left to offer him that he has not already heard and declined.”',
      },
      /** Owner-ratified 2026-09-17: mundane production value, replacing the
       *  rendered literal string "TK". Not a restoration of any previously
       *  struck date. See docs/copy/proposals-2026-09-17-billy-bob-r6.md. */
      requested: { label: 'External review requested', value: 'March 11, 2026' },
      /**
       * Rendered as a foreign object per design.md: stark white, Courier, black
       * institutional type, its own reference numbering, small, unlinked,
       * uncaptioned, unexplained. The withheld disposition is a solid redaction
       * bar, not [WITHHELD] — a redaction reads as an act done to a document.
       * REFERENCE owner-ratified 2026-09-17 to match CWAAA's own finding
       * numbering (`26-01`, home.finding.record): two-digit year, hyphen,
       * sequence — an Office-scale (four-digit) sequence rather than CWAAA's
       * own two-digit one, still without a letter suffix. 8804-X had no owner
       * provenance and remains retired.
       */
      fragment: {
        lines: [
          'OFFICE OF LATHER COMPLIANCE',
          'EXTERNAL FINDING',
          'REFERENCE: 26-1183',
          '',
          'PRIOR VOLUNTARY INTERVENTION: DOCUMENTED',
          'REPORTED CLEANSING FREQUENCY: NONE',
          'BASELINE REFUSAL: SUSTAINED',
          'PARTICIPANT COMPREHENSION: NOT AT ISSUE',
          'OCCUPATIONAL RESIDUE: CONFIRMED',
          'SHARED-SURFACE TRANSFER: CONFIRMED',
          'HOUSEHOLD IMPACT: DOCUMENTED',
          '',
          'FINDING: BASELINE DEFICIENCY',
          '',
          'PARTICIPANT PRESENT: YES',
        ],
        dispositionLabel: 'DISPOSITION:',
      },
      /** Owner-ratified 2026-09-17: mundane production value; see requested above. */
      returned: { label: 'Case returned', value: 'April 9, 2026' },
      followUp: {
        /** Owner-ratified 2026-09-17: mundane production value; see requested above. */
        heading: 'Follow-up — April 23, 2026',
        lines: [
          'Participant reports showering immediately after each shift.',
          'Partner confirms cessation of occupational-residue transfer to shared bedding.',
        ],
        askedLead: 'Asked what changed his position regarding post-shift bathing, participant stated:',
        quote: '“Makes sense to wash up.”',
      },
      partnerFollowUp: {
        heading: 'Reporting party — follow-up statement on file',
        body: '“He comes in and goes straight up to the shower. Doesn’t announce it. Comes back down with his hair wet and eats his supper like a man who lives here.\n\nI put my hand on him the other night without thinking about it first. That’s the part I’d want written down, if you’re writing things down. I didn’t have to decide to do it.\n\nHe’s proud of himself. He walks around this house like he’s the first man who ever thought of it, and I’m letting him have it.\n\nThe rest of it is mine. Put down that it’s been resolved.”',
      },
      /**
       * `External review — Requested. Case returned.` is CWAAA's epistemic
       * boundary and is owner-fixed: it knows it asked and it knows he came back,
       * and it does not possess or state what happened in between. Never restore
       * `Completed`, and never add an OLC reference row here.
       */
      close: [
        { label: 'Case status', value: 'Recovered; maintaining baseline' },
        { label: 'Current cleansing routine', value: 'Post-shift' },
        { label: 'Household impact', value: 'Resolved' },
        { label: 'Shared-surface transfer', value: 'No recurrence reported' },
        { label: 'Additional CWAAA intervention', value: 'Not required' },
        { label: 'External review', value: 'Requested. Case returned.' },
      ],
      closeNote: 'Partner reports that shared bedding has remained within baseline since the participant’s return.',
      nextPending: 'Record 7 unwritten. Billy Bob’s Next is missing, not disabled.',
    },
  ],
} as const;

/**
 * pledge — Form CW-1, the Declaration of Intent to Lather.
 *
 * Brief: .impeccable/surfaces/cwaaa-src-pages-pledge-astro.md (confirmed
 * 2026-09-15). Contract: docs/contracts/pledge.v1.json.
 *
 * PROVENANCE. Most of this block is carried VERBATIM from the approved
 * combined-runtime deck (site/src/content/copy.ts, `pledge`), which the Got
 * Soap? campaign ships at /pledge today. That page is already written in
 * CWAAA's institutional register — Form CW-1, "of sound mind and disputed
 * scent", "File my declaration" — so this route is a re-housing, not a
 * rewrite. Lines carried unchanged are marked APPROVED.
 *
 * WHAT COULD NOT BE CARRIED. Five strings in that deck promise an ongoing
 * newsletter ("Movement Updates", "Unsubscribe any time") that the ratified
 * contract forbids — `ongoingSubscription: false`, `dripCampaign: false`,
 * exactly two messages — and its consent label discloses none of the four
 * facts `consent` requires. Those are marked DRAFT below and are the copy
 * lane's (Vivian, institutional-deadpan) before launch. They are drafted
 * rather than left absent because a consent checkbox with no label is not a
 * shippable form; the STRUCTURE is final, the WORDING is not.
 *
 * NOT CARRIED AT ALL: the runtime's `welcomeEmail`, which says the
 * declaration was "received, reviewed, and filed in triplicate by the Office
 * of Lather Compliance" and that "The Office classifies this as a scent
 * forecast", and PledgeForm.astro's letterhead line "Office of Lather
 * Compliance · National Office, Suite 2B". Both violate the PRD ("Do not say
 * the Office receives, files, owns, stores, or fulfills subscriber data") and
 * design.md §Pledge ("No Office reference"). CWAAA files its own form. The
 * two fulfillment messages are re-authored under CW-D06 and do not live here.
 */
export const pledge = {
  meta: {
    title: 'The Lather Pledge — Form CW-1 | CWAAA',
    description:
      'Declaration of Intent to Lather. Form CW-1 from Concerned Women Against Axe Abuse: one page, one oath, two emails, then silence.',
  },

  /** APPROVED — carried verbatim. */
  header: {
    /**
     * The caption a matter is filed under. Carried from the live Got Soap?
     * presentation, where it heads the letterhead (PledgeForm.astro's
     * `decree__preamble`, hardcoded there rather than in the deck). Owner
     * direction 2026-09-17.
     */
    preamble: 'In the matter of the undersigned',
    form: 'Form CW-1',
    title: 'Declaration of Intent to Lather',
    subtitle: 'To be completed by the undersigned, of sound mind and disputed scent.',
  },

  /**
   * APPROVED — carried verbatim, and the largest element on the route (owner
   * decision 2026-09-15). Stored as intro / clauses / refrain rather than the
   * runtime's single flat array, because the four sworn points are a real
   * ordered list and the refrain is not one of them.
   */
  oath: {
    intro: 'I, the undersigned, do solemnly swear:',
    clauses: [
      'to lather daily;',
      'to retire body spray as a personality;',
      'to respect the loofah in word and deed;',
      'and never again to mistake deodorant for divine intervention.',
    ],
    refrain: 'Lather. Rinse. Respect.',
  },

  signing: {
    /** Accessible name for the signing block; never rendered as a visible heading. */
    label: 'Sign Form CW-1',
    required: '(required)',
    requiredMark: 'Required',
    /** APPROVED — carried verbatim from the runtime's PledgeForm.astro. */
    caption: 'To be completed in ink. All lines are mandatory.',
  },

  /**
   * The attestation at the foot of the declaration: the coalition's Official
   * Seal of Approval (src/assets/cwaaaseal.png), as the live Got Soap?
   * presentation carries it. This is NOT the masthead strike — that one is
   * cwaaalogo-tight.png, rendered by Seal.astro, and it heads the letterhead.
   * Owner direction 2026-09-17.
   */
  attestation: {
    alt: 'Concerned Women Against Axe Abuse Official Seal of Approval: a bar of soap and a bottle, ringed by laurel on a maroon field.',
  },

  fields: {
    /** APPROVED — label and help carried verbatim. */
    firstName: { label: 'First name', help: 'As it will appear on the roll.' },
    /**
     * Label APPROVED. Help DRAFT — the runtime's "Where to send Movement
     * Updates." names a publication the contract forbids.
     */
    email: { label: 'Email', help: 'Where to send the receipt.' },
    /**
     * DRAFT — the contract requires this one string to disclose all four:
     * exactly two messages, an immediate receipt, a separately delivered
     * current issue, and no ongoing subscription. The runtime's "binding moral
     * contract" line is kept as the opening clause because it is the joke and
     * it is approved; the disclosure is appended, not substituted.
     */
    consent: {
      label:
        'I understand this declaration is a binding moral contract, and that CWAAA will send exactly two emails: a receipt now, and one current issue later. No subscription follows.',
    },
  },

  /** APPROVED — carried verbatim. */
  submit: 'File my declaration',
  submitMicro: 'Filed in triplicate. One copy goes to the loofah.',
  /** In-flight label. DRAFT — no runtime equivalent; the runtime never reported work in progress. */
  submitFiling: 'Filing…',

  /** APPROVED — all three carried verbatim. Never colour-only; each is adjacent to its field. */
  errors: {
    noName: 'A declaration requires a declarant. First name, please.',
    badEmail: 'The Records Division cannot file this email address as written.',
    noConsent: 'The contract requires acknowledgment. Morally.',
  },

  /**
   * DRAFT — replaces the runtime's `privacy` paragraph, which described
   * "Movement Updates — new posters, the occasional bulletin" and invited the
   * reader to "Unsubscribe any time" from a subscription that does not exist.
   * This is the honest half of the joke and it sits with the form, not in a
   * footer.
   */
  fulfillment: {
    label: 'What arrives',
    body:
      'Your email does two jobs, both of them finite. A receipt, confirming the declaration was filed. Then one current issue, sent separately a short while later. That is the whole correspondence: two messages, then silence. CWAAA does not run a subscription, does not sell the address, and does not hand it to partners. Withdraw before the issue goes out and it is not sent. CWAAA keeps records, not secrets.',
  },

  success: {
    /** APPROVED — the contract's `SWORN` semantic, carried verbatim. */
    stamp: 'SWORN.',
    /** APPROVED — the runtime's success body, split at the name token. */
    lead: 'Declaration filed, ',
    leadRest: '. Your name is on the roll. Daily lather is now expected.',
    /** DRAFT — the runtime's "Movement Updates will arrive when there is movement." */
    note: 'The receipt is on its way. The current issue follows separately. Nothing after that.',
    /** Accessible name for the filed declaration's read-back. */
    filedLabel: 'As filed',
    /** APPROVED — in-fiction utility labels; never a bare "Share". */
    share: 'Circulate my declaration',
    copyLink: 'Copy the filing link',
    copied: 'Filing link copied.',
    /** APPROVED — carried verbatim from the runtime's share strings. */
    shareTitle: 'My Declaration of Intent to Lather is on file.',
    shareText: 'Form CW-1 filed. Sworn to lather. The loofah retains a copy.',
  },

  /**
   * The truthful failure state. No equivalent existed in the runtime, because
   * the runtime shows SWORN whether or not anything was filed (see
   * site/src/scripts/pledge.ts: "the SWORN success STILL shows"). CWAAA does
   * not certify a filing that did not happen. DRAFT.
   */
  failure: {
    stamp: 'NOT FILED.',
    body:
      'The declaration did not reach the Records Division. Nothing was filed and nothing was sent. Your entries are still on the form below.',
    retry: 'Try filing again',
  },

  /**
   * Shown only without JavaScript AND without a configured Buttondown audience —
   * the one combination in which the form can neither file nor report that it
   * did not. DRAFT.
   */
  notOpen:
    'Form CW-1 cannot be filed from this page at the moment. Nothing you enter below will reach the Records Division, and no email will be sent.',

  /** The ordinary CWAAA continuation after the settle. No Got Soap? seam: on this site the visitor is already home. */
  close: {
    marker: 'While you are here',
    actions: [
      { label: 'Read the Findings', note: 'Register 26', href: '/findings' },
      { label: 'Read Recovery Stories', note: 'In their own words', href: '/recovery-stories' },
    ],
  },
} as const;
