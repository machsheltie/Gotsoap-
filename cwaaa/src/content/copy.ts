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
 * Brayden's testimony is owner-authored and ratified 2026-09-15, preserved
 * verbatim; "nothing follows the last line" is enforced by the template.
 * RC-031/039/047/058 records are ratified 2026-09-22 from
 * docs/copy/proposals-2026-09-18-four-records-r3.md (evidence:
 * docs/copy/reader-evidence-2026-09-22-four-records-r3.md). Transfer only;
 * no line edits during implementation.
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
      /** OWNER-AUTHORED, ratified 2026-09-15. Verbatim. Nothing follows the last line.
       *  Quotation marks added on owner direction 2026-09-17, matching RC-064:
       *  one opening mark on the first paragraph, one closing mark on the last. */
      testimony: [
        '“I really did think I had a system. Febreze the sheets on Sunday, hit the jacket during the week, spray myself if I was going somewhere. My roommate kept telling me that wasn’t the same thing as washing anything. I thought he was being dramatic.',
        'Then I had a first date coming up and somehow she filed a referral too. We hadn’t even gone out yet. Two people who didn’t know each other had independently decided I needed help before Friday. That’s hard to argue with.',
        'So I showered. Washed the sheets. Used actual laundry detergent. Clean shirt. The whole thing.',
        'The date went really well.',
        'That’s the embarrassing part. Not the referral. Finding out everybody was right.',
        'I used to think all that stuff didn’t really matter if you looked good and smelled decent enough. It matters. Women notice. They notice your clothes. They notice your hair. They notice if your sheets smell clean. They definitely notice when you smell good because you’re actually clean instead of because you sprayed something over yourself.',
        'I shower every day now. I wash my sheets every week. I still wear cologne. Apparently you’re allowed to do both.',
        'My dating life is better. My roommate complains about me less. And for the record, the fish picture still works.',
        'There was one other thing I didn’t expect. When I go see my mom now and give her a hug, she tells me how good I smell. And she holds on a little longer. That’s pretty nice.”',
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
      open: true,
      public: true,
      /** Owner-ratified 2026-09-22: `(yes, really)` leaves CWAAA's name field. */
      name: 'Chad, 29',
      indexQuote:
        '“Honestly? I’m hot. I never thought hygiene mattered — I could pull regardless. What I couldn’t figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I’d ace it. I did not ace it. I’d been coasting on face alone. Vanity got me in the door. Soap kept me there.”',
      image: {
        spec: 'Gym mirror selfie, shirt lifted, phone covering half his face. Submitted by the participant. He sent four; this was the one he wanted used.',
      },
      /** Copy authority: docs/copy/proposals-2026-09-18-four-records-r3.md, ratified 2026-09-22. */
      referral: [
        { label: 'Reporting party', value: 'Participant' },
        { label: 'Referral occasioned by', value: 'Field Assessment CW-7, completed voluntarily' },
        { label: 'Participant’s stated reason for contact', value: '“To confirm I didn’t need this.”' },
        { label: 'Stated basis for exemption', value: 'Appearance' },
        { label: 'Reported concern', value: 'None reported by participant' },
      ],
      /** The voided field (ratified 2026-09-15): the absence is stated in the
       *  coalition's own notation, on the noPhoto pattern. He is the reporting party. */
      statements: [
        {
          heading: 'Reporting party statement · none on file',
          body: 'The participant is the reporting party. This record has no second party.',
        },
      ],
      testimony: [
        '“Twenty-two women came home with me in two years. I know the number because I kept it. None of them came back, and I did not keep that one.',
        'The face has been doing the work since I was fifteen, so I never looked past it. When the texts stopped after the first night I decided that was me being a lot. Intense. Too much personality for most people. I was comfortable in that read for two years.',
        'Here is what I actually changed. Soap. Shower after the gym instead of just changing out of the shirt. Washed my sheets, which had not been washed by me personally. That’s it. That’s the entire list.',
        'Round two happened. Then round three. Same face, same material, same apartment. One variable.',
        'I’m not going to stand here and be humble about it. I’m hotter now.',
        'What I don’t accept is the score. I asked if I could retake it. They said the score stands. I told them I’d ask again in thirty days and they wrote that down too.”',
      ],
      chronology: [
        { label: 'Initial contact', value: 'Participant requested review of his result' },
        { label: 'Review completed', value: 'Score unchanged' },
        { label: 'Participant response', value: 'Materials accepted. Asked whether the assessment could be retaken.' },
        { label: 'Follow-up', value: '30 days. Daily cleansing reported and maintained. Participant again asked whether the assessment could be retaken.' },
      ],
      close: [
        { label: 'Intervention provided', value: 'Baseline materials' },
        { label: 'Follow-up interval', value: '30 days' },
        { label: 'Current status', value: 'Maintaining baseline' },
        { label: 'Outcome', value: 'Lathers competitively' },
        { label: 'Case status', value: 'Closed' },
      ],
    },
    {
      id: 'RC-039',
      slug: 'marcus',
      open: true,
      public: true,
      name: 'Marcus, 34',
      indexQuote:
        '“I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect. Body spray contains 0% soap. Cologne is a garnish. You do not garnish a dumpster. I own soap now.”',
      image: {
        spec: 'Cropped from a wedding photo — suit, half a stranger’s shoulder still in frame. Submitted by the participant as the most recent picture of himself he had.',
      },
      /** Copy authority: docs/copy/proposals-2026-09-18-four-records-r3.md, ratified 2026-09-22. */
      referral: [
        { label: 'Reporting party', value: 'Colleague. Anonymity requested and granted.' },
        { label: 'Participant’s stated position', value: '“It’s a ninety-dollar bottle.”' },
        { label: 'Reported fragrance application', value: 'Multiple daily' },
        { label: 'Reported cleansing agent on hand', value: 'None' },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“I want to be clear that he is good at his job and that this is the only thing.\n\nI have watched people volunteer for a worse desk. Nobody said why. Nobody ever says why. What people do instead is stop standing near you, and you can go years without anyone telling you that’s what’s happening.\n\nI’ve been in an elevator with him. You learn how to breathe through your mouth without making a face about it, and then one day you notice you’ve gotten good at it. That is a horrible thing to be good at.\n\nI sent it without my name on it because he would have been kind about it, and I couldn’t have taken that.”',
        },
      ],
      testimony: [
        '“I did the arithmetic.',
        'Two sprays on the way out the door. Two more after lunch. Three if it had been a long one. I thought of that as reapplying. I was not reapplying anything. There was nothing underneath it to reapply over.',
        'Nobody told me. For years. I wasn’t looking for a signal, because as far as I was concerned I had already paid for the problem. Ninety dollars a bottle. You do not pay ninety dollars for a problem you still have.',
        'Then a page turns up in my inbox from a sender I still cannot identify. Fragrance is not a cleansing event. There was a figure under it. I wrote to the coalition to ask where the figure came from, because if I was going to lose this I wanted to lose it to a source.',
        'They sent me the source. I read it twice. I did not have a second position.',
        'So: soap. A shower with soap in it, every morning, which I now understand is what everyone else had been quietly doing this entire time without needing a document about it.',
        'I still wear the cologne. It is a very good cologne. It was never the problem. The problem was what it was on.',
        'I still don’t know what I smelled like. Nobody has told me and I have stopped asking.',
        'The desk next to mine has somebody in it again. Nobody announced that either.”',
      ],
      /** `Materials provided — Finding 26-01` is owner-ratified (surface brief §4 amendment). Do not prose it out. */
      chronology: [
        { label: 'Initial contact', value: 'Participant wrote to the coalition disputing a figure cited in materials he had received. Colleague referral already on file.' },
        { label: 'Materials provided', value: 'Finding 26-01' },
        { label: 'Participant response', value: 'Position withdrawn same day' },
        { label: 'Follow-up', value: '60 days. Daily cleansing reported and maintained.' },
      ],
      close: [
        { label: 'Intervention provided', value: 'Coalition materials' },
        { label: 'Follow-up interval', value: '60 days' },
        { label: 'Current status', value: 'Maintaining baseline' },
        { label: 'Outcome', value: 'Lathers accordingly' },
        { label: 'Case status', value: 'Closed' },
      ],
    },
    {
      id: 'RC-047',
      slug: 'gary',
      open: true,
      public: true,
      name: 'Gary, 46',
      indexQuote:
        '“Back on the apps at forty-six after the divorce. My daughter looked me dead in the eye and said, ‘Dad, you smell like the garage.’ She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious. I was in the shower before she’d backed out of the driveway. Three dates this month. She screens them now.”',
      image: {
        spec: 'Standing in his own driveway beside the truck, arms crossed, squinting into afternoon sun. Taken by his daughter, who submitted it.',
      },
      /** Copy authority: docs/copy/proposals-2026-09-18-four-records-r3.md, ratified 2026-09-22.
       *  `again` and both flagged lines (“four theories”, “I am not his mother”) are ratified 2026-09-15. */
      referral: [
        { label: 'Reporting party', value: 'Adult daughter of participant' },
        { label: 'Reported concern', value: 'Garage and vehicle odor, untreated' },
        { label: 'Prior household intervention', value: 'One conversation' },
        { label: 'Participant’s account of onset', value: '“Sometime after the divorce.”' },
        { label: 'Participant acknowledgment', value: 'Immediate' },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“I let it go for about a year, because I figured he was allowed a bad year.\n\nThen he told me he was back on the apps, and I sat in my car doing the math on what that meant for some woman I have never met, and I decided I’d rather be the one.\n\nHe didn’t get defensive. He got quiet, which was worse. He said ‘is it that bad,’ and I said yes, and he went and took a shower while I was still standing in his kitchen.\n\nI want it on the record that I am not his mother. I filed this so it would be somebody’s job other than mine.”',
        },
      ],
      testimony: [
        '“I didn’t decide anything. That’s the part I keep going back over. Nobody sits down and decides to stop.',
        'The marriage ended and I got very good at being alone in a house, and somewhere in there I quit doing the parts that were for somebody else. Shower after work, some days. Some days I’d sit down when I got in and that was the day. Same shirt off the back of the chair in the morning. I wasn’t filthy. Nobody was checking.',
        'Then I put myself on the apps, which at forty-six is its own experience, and I could not work out why it went quiet every time after the first one. I had about four theories and all of them were about her.',
        'My daughter fixed it in four seconds, and she did not enjoy doing it. She shouldn’t have had to be the one.',
        'The program is not complicated. I shower every day. Clean shirt comes out of a drawer instead of off a chair. Truck clothes get washed separate from everything else. It took me about a week to stop feeling like I was getting dressed up for nobody.',
        'Three dates this month. One of them twice.',
        'She asks me who I’m seeing now. She never used to ask me anything.”',
      ],
      chronology: [
        { label: 'Participant response', value: 'Assessment completed during intake. No dispute recorded.' },
        { label: 'Participant response', value: 'Routine revised same day' },
        { label: 'Follow-up', value: '90 days. Daily cleansing reported and maintained. Participant reports resumed dating activity.' },
      ],
      close: [
        { label: 'Intervention provided', value: 'Baseline materials' },
        { label: 'Follow-up interval', value: '90 days' },
        { label: 'Current status', value: 'Maintaining baseline' },
        { label: 'Outcome', value: 'Lathers again' },
        { label: 'Case status', value: 'Closed' },
      ],
    },
    {
      id: 'RC-058',
      slug: 'kaelthas',
      open: true,
      public: true,
      name: '“Kaelthas,” 22',
      indexQuote:
        '“She said she’d drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn’t joy — it was ‘what does my room actually smell like,’ and the answer scared me sober. I stream; my whole life happens in this chair; I’d quietly decided hygiene was an IRL problem and I don’t do IRL. Shower for who, the webcam? It’s shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life.”',
      image: {
        spec: 'In the gaming chair, headset around his neck, RGB behind him, shoulders-up exactly as he describes. Submitted by the participant from his stream.',
      },
      /** Copy authority: docs/copy/proposals-2026-09-18-four-records-r3.md, ratified 2026-09-22.
       *  Owner choice: CWAAA reached him mid-cleanup; the 14-day lapse is ordinary and earns `regardless`. */
      referral: [
        { label: 'Reporting party', value: 'Viewer' },
        { label: 'Reporting party’s relationship to participant', value: 'Audience' },
        { label: 'Referral occasioned by', value: 'A question the participant asked on his own broadcast' },
        { label: 'Reported cleansing frequency', value: 'Tied to in-person plans' },
        { label: 'Reported ventilation', value: 'None' },
        { label: 'Participant’s description of primary living space', value: '“Warm.”' },
      ],
      statements: [
        {
          heading: 'Reporting party — statement on file',
          body: '“He asked chat what his room smelled like. Out loud, on stream, as a joke. Then he laughed and moved on, and I don’t think he understood that eleven hundred people had just been told something.\n\nI’ve watched him for two years.\n\nSo I filled out the form while he was still live. I’m not sorry. He’d have done it to me.”',
        },
      ],
      testimony: [
        '“The window in that room had not been opened since I moved in. Not once, not in summer. If you’d asked me I’d have said that was a heating thing. There was also a hoodie that had achieved a shape.',
        'The rule came before any of it. If nothing happens below the shoulders, then nothing below the shoulders is a problem. I had thought about it. I wasn’t being lazy.',
        'Four hours is not a lot of time. I did not sit down.',
        'Shower. Window. The hoodie went in the machine and came out a different color, which I am still processing. Sheets. Two bags of garbage I’m not going to itemize. Somewhere in the middle of that the coalition messaged me and I said yes to everything they sent because I was holding a bag.',
        'She got there and the first thing she did was open the other window. I didn’t know it opened.',
        'The week after, nobody was coming, and I skipped it. Two days. Then I stood in the door of the room and it was warm again, the way it used to be, and I hadn’t known I’d stopped liking that.',
        'I shower now on days when nobody is coming over. The window’s open right now.”',
      ],
      chronology: [
        { label: 'Initial outreach', value: 'Participant contacted by direct message through his broadcast account. Response received in eleven minutes.' },
        { label: 'Reported interval to in-person meeting', value: 'Under four hours' },
        { label: 'Participant status at contact', value: 'Cleansing already in progress' },
        { label: 'Materials provided', value: 'Standard cleansing guidance. Ventilation discussed.' },
        { label: 'Follow-up', value: '14 days. Participant reports routine lapsed two days in a week without scheduled contact. Resumed.' },
        { label: 'Follow-up', value: '45 days. Daily cleansing reported and maintained, including on days without scheduled contact.' },
      ],
      close: [
        { label: 'Intervention provided', value: 'Baseline materials' },
        { label: 'Follow-up interval', value: '45 days' },
        { label: 'Current status', value: 'Maintaining baseline' },
        { label: 'Outcome', value: 'Lathers regardless' },
        { label: 'Case status', value: 'Closed' },
      ],
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
        { visit: true, label: 'Follow-up', value: 'Partner reports behavior unchanged.' },
        { label: 'Participant’s stated position', value: '“Never saw much point in washing just to get dirty again.”' },
        { label: 'Shared-surface impact', value: 'Continuing.' },
        { visit: true, label: 'Second intervention', value: 'Household consequences discussed with participant. Partner present.' },
        { label: 'Participant acknowledgment', value: 'Confirmed. Participant restated the reporting party’s concern accurately.' },
        { label: 'Participant’s stated position', value: '“Never saw much point in washing just to get dirty again.”' },
        { label: 'Shared-surface impact', value: 'Continuing.' },
        { label: 'Partner-reported impact', value: 'Withdrawal of physical contact.' },
        { visit: true, label: 'Final voluntary contact', value: 'No change in practice. No further CWAAA intervention available.' },
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
       * Owner-supplied 2026-09-17 (src/assets/billybob2.png). The after-state,
       * placed immediately after the reporting party's follow-up statement and
       * before the closing fields: the reader hears that she touches him again,
       * then sees it, then CWAAA closes the record. Same 4:3 presentation as the
       * before photograph so the comparison reads as institutional, not
       * editorial. The caption is the only captioned photograph on the route.
       */
      followUpImage: {
        alt: 'Billy Bob, 37, at the same kitchen table, clean-faced and in a plain dark T-shirt, hands folded in front of him, looking at the camera. His wife leans against his shoulder with her arm across his back, smiling. Taken at follow-up.',
        caption: 'Follow-up photograph — Participant and reporting party, April 23, 2026. Reproduced with permission.',
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

/* ============================================================================
   The legal four — /privacy, /terms, /dmca, /accessibility.

   Brief: .impeccable/surfaces/cwaaa-src-pages-privacy-astro.md (confirmed
   2026-09-22). Four routes, one surface class: the coalition's published
   documents, rendered by components/Document.astro.

   REGISTER (owner decision 2026-09-22): CWAAA plain. The model is `pledge.
   fulfillment` above — "two messages, then silence. CWAAA keeps records, not
   secrets." Declarative sentences, facts stated flatly and completely, at most
   one dry aside per page. No legalese padding, no "we value your privacy", no
   defined-terms preamble.

   TRUTHFUL, AND VERIFIED (2026-09-17, re-checked 2026-09-22 against
   src/config/site.ts and docs/contracts/pledge.v1.json). Every data claim below
   was read out of the code, not assumed: no cookies, no localStorage,
   sessionStorage or IndexedDB anywhere in src/; analytics is cookieless
   GoatCounter behind PUBLIC_GOATCOUNTER_CODE; email reaches Buttondown only
   from the pledge, carrying `email` and `metadata__first_name`; fonts are
   self-hosted under gate G19; the complete third-party list is gc.zgo.at and
   buttondown.com. Do not soften, pad, or hedge these, and do not describe a
   protection this site does not implement. In particular: THERE IS NO COOKIE
   BANNER, because there is nothing to consent to, and adding one would render a
   false statement as a component.

   PENDING FACTS are typed, never written as prose that looks settled. A
   `{ pending }` segment renders as a visible bracketed marker carrying
   data-pending, and the launch check fails while any remain. Three are open,
   all deferred by the owner to 2026-10-15: the designated agent's name,
   mailing address and email. Owner facts 2026-09-24 settled the contact
   address (hope2studio@yahoo.com, until a CWAAA inbox exists) and governing
   law (Kentucky; Bullitt County courts). Owner decision 2026-09-22 settled the
   operator: Hope2 Studio, with Stacey M. Breckel where a name is statutory.

   NO FICTION DISCLOSURE. The words satire, parody, fiction, spec work,
   portfolio and campaign do not appear on these four routes; disclosure lives
   behind the creator/About seam (HANDOFF §Legal navigation and disclosure).
   Naming the operator is the PRD's "truthful and legally prudent" case, not
   audience-facing disclosure. No Office language of any kind.

   DRAFT — every string here awaits the Vivian lane and a blind-reader pass
   (../../gotsoap/docs/copy/COPY-PROTOCOL.md) before it is called approved.
   ========================================================================== */

/** A fact only the owner can supply. Renders as a visible marker, never invented.
 *  `deferredUntil` records an owner-set date the fact is due by (ISO date); the
 *  marker still renders and the launch check still fails, but it reports the
 *  date so a deferral is not mistaken for a forgotten fact. */
export type LegalSegment = string | { readonly pending: string; readonly deferredUntil?: string };

/** Owner deferral, 2026-09-24: the DMCA designated agent's name, mailing address
 *  and email are due by this date. Not a launch waiver. */
export const DMCA_AGENT_DUE = '2026-10-15';
/** Plain prose, or prose interrupted by pending facts. */
export type LegalParagraph = string | readonly LegalSegment[];

export interface LegalBlock {
  /** Stable anchor. `/privacy#email` must keep working across copy revisions. */
  readonly id: string;
  /** The block label, set as the section's real heading. */
  readonly label: string;
  /** The scan block. Privacy only: a second one anywhere is repeated-component drift. */
  readonly record?: readonly { readonly label: string; readonly value: string }[];
  readonly paragraphs?: readonly LegalParagraph[];
  /** A tight stacked block: an address, not sentences. */
  readonly lines?: readonly LegalParagraph[];
  /** A real ordered list, for requirements a reader checks off. */
  readonly list?: readonly LegalParagraph[];
  readonly note?: LegalParagraph;
}

export interface LegalDoc {
  readonly meta: { readonly title: string; readonly description: string };
  readonly title: string;
  readonly lead: string;
  readonly blocks: readonly LegalBlock[];
}

export const legalPages = {
  privacy: {
    meta: {
      title: 'Privacy — CWAAA',
      description:
        'What this site stores, what leaves it, and how long it is kept. The answer is short because the practice is small.',
    },
    title: 'Privacy',
    lead:
      'This site stores nothing in your browser and asks you for nothing unless you sign the pledge. If you sign it, two fields go to one provider, and two emails come back.',
    blocks: [
      {
        id: 'browser',
        label: 'What this site puts in your browser',
        paragraphs: [
          'Nothing. CWAAA sets no cookies and writes nothing to local storage, session storage, or an in-browser database. There is no identifier assigned to you, no preference saved between visits, and no record on your machine that you were here.',
          'Which is why you were not asked to accept anything. A banner asks permission for something. There is no something.',
        ],
      },
      {
        id: 'email',
        label: 'What leaves this site',
        record: [
          { label: 'Email address', value: 'Buttondown · kept until you withdraw' },
          { label: 'First name', value: 'Buttondown · kept until you withdraw' },
          { label: 'Page view', value: 'GoatCounter · no identifier kept' },
        ],
        paragraphs: [
          'The pledge form sends two fields to Buttondown, the service that delivers the two emails: your email address, and your first name, which is how the receipt addresses you. Nothing else on the site sends anything anywhere.',
          'CWAAA and the Got Soap? campaign share one audience at that provider. It is a single list, not two, and signing either form puts you on the same one.',
          'The address is kept for as long as it takes to send the receipt and the one current issue, and to honour a withdrawal afterwards. Fulfilment details that are no longer needed are removed once the sequence is complete. If you withdraw, a suppression record stays behind, because the only reliable way to never write to you again is to remember not to.',
        ],
      },
      {
        id: 'analytics',
        label: 'Counting visits',
        paragraphs: [
          'CWAAA counts page views with GoatCounter. It sets no cookie, assigns no identifier, and builds no profile. It records that a page was loaded, roughly what part of the world it was loaded from, and what linked to it. It cannot tell one visitor from another, and neither can CWAAA.',
          'The counter runs only where it has been configured to. Where it has not, the script is never loaded and nothing is counted at all.',
        ],
      },
      {
        id: 'third-parties',
        label: 'Who else sees you',
        paragraphs: [
          'Two services, both conditional, and this is the complete list. GoatCounter, at gc.zgo.at, when the counter is switched on. Buttondown, at buttondown.com, at the moment you file the pledge and not one page before.',
          'The fonts are served from this site rather than from a font host, so no type foundry or search company learns that you read this page. There is no advertising network, no tag manager, no embedded video, no social widget, and no tracking pixel.',
        ],
      },
      {
        id: 'never',
        label: 'What CWAAA does not do',
        paragraphs: [
          'There are no accounts and no profiles. CWAAA does not treat your address as an identity, does not fingerprint your browser, does not recognise a returning visitor, and holds nothing that follows you from one device to another.',
          'The address is not sold, not rented, and not handed to a partner. There is no partner.',
          'Pledge entries and email addresses never reach the counter, the logs, a screenshot, or a test report. That is a standing rule of how the site is built, not a promise invented for this page.',
        ],
      },
      {
        id: 'asking',
        label: 'Asking, withdrawing, and where to write',
        paragraphs: [
          'Ask what CWAAA holds about you and you will be told. Ask for it to be removed and it will be, apart from the suppression record, which exists so the removal holds. Withdraw before the current issue goes out and it is not sent. None of this needs a form, a reason, or an account.',
          'This site is operated by Hope2 Studio, which is accountable for what is described on this page.',
          'Write to hope2studio@yahoo.com.',
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: 'Terms — CWAAA',
      description:
        'Who operates this site, what you may do with it, and the short list of things it does not offer.',
    },
    title: 'Terms',
    lead:
      'This site is a place to read. There is nothing to buy, no account to open, and nothing a visitor can publish here, so most of what a terms page usually governs does not exist.',
    blocks: [
      {
        id: 'operator',
        label: 'Who runs this site',
        paragraphs: [
          'This site is operated by Hope2 Studio.',
          'Questions about these terms go to hope2studio@yahoo.com.',
        ],
      },
      {
        id: 'use',
        label: 'What you may do with it',
        paragraphs: [
          'Read it. Link to it. Send the pledge link to whoever you think should see it, which is what it is for. Quote a Finding or a passage, with attribution to CWAAA.',
          'What is not offered: republishing a page as your own work, using the coalition’s name, seal, or ribbon in a way that suggests CWAAA endorses you or what you sell, or harvesting the site wholesale to stock or train something else.',
        ],
      },
      {
        id: 'absent',
        label: 'What is not here',
        paragraphs: [
          'No accounts. No purchases. No subscriptions. No comments, uploads, or any other way for a visitor to put something on this site.',
          'The pledge form is the only thing here that accepts input, and it accepts three: a first name, an email address, and a checkbox. Nothing you enter is displayed publicly. The roll is not a published list.',
        ],
      },
      {
        id: 'work',
        label: 'Whose work this is',
        paragraphs: [
          'The text, photography, seal, and design of this site belong to Hope2 Studio, except where a licence says otherwise. Assets licensed from Freepik remain under that licence and keep their attribution.',
          'The people in the photographs are generated. No one pictured here exists, and no one pictured here agreed to anything.',
          'If you believe something here is yours, the DMCA page has the path.',
        ],
      },
      {
        id: 'asis',
        label: 'No warranty',
        paragraphs: [
          'The site is published as it stands. Hope2 Studio does not warrant that it will be available, uninterrupted, or free of error, and is not liable for loss arising from its use or from a link that leads somewhere else. Where local law does not permit a limitation like that, it does not apply to you.',
        ],
      },
      {
        id: 'changes',
        label: 'Changes',
        paragraphs: [
          'These terms can change. The version on this page is the one in force, and there is no archive of earlier ones.',
        ],
      },
      {
        id: 'law',
        label: 'Governing law',
        paragraphs: [
          /* Owner fact, 2026-09-24: Kentucky law, Bullitt County courts. */
          'These terms are governed by the law of the Commonwealth of Kentucky, and a dispute arising from them belongs to the courts of Bullitt County, Kentucky.',
        ],
      },
    ],
  },

  dmca: {
    meta: {
      title: 'DMCA — CWAAA',
      description:
        'How to tell the operator of this site that material published here is yours, and what a notice has to contain.',
    },
    title: 'DMCA',
    lead:
      'Nothing on this site was uploaded by a visitor, so this is not a safe-harbour page and there is no counter-notice procedure. It is the path for telling Hope2 Studio that something published here is yours.',
    blocks: [
      {
        id: 'scope',
        label: 'What this page covers',
        paragraphs: [
          'Everything on this site was made for it or licensed for it. The photographs of people are generated and depict no one. Assets licensed from Freepik remain under that licence and carry their attribution.',
          'If you hold rights in material published here and believe it is used without permission, write to the agent below. A complete notice is reviewed, and material that turns out to be improperly used comes down.',
        ],
      },
      {
        id: 'notice',
        label: 'What a notice has to contain',
        paragraphs: ['A notice that is missing any of these cannot be acted on:'],
        list: [
          'Your signature, physical or electronic.',
          'Identification of the work you say is infringed.',
          'The address of the page on this site where it appears, specific enough to find it without searching.',
          'How to reach you: name, mailing address, telephone number, and email address.',
          'A statement that you believe in good faith the use is not authorised by you, your agent, or the law.',
          'A statement that the information in your notice is accurate and, under penalty of perjury, that you are the owner of the right or authorised to act for them.',
        ],
        note:
          'That last line is not a formality. A notice is a sworn statement, and sending one about material that is not yours means swearing to something untrue.',
      },
      {
        id: 'agent',
        label: 'Designated agent',
        paragraphs: ['Send a notice to the designated agent for Hope2 Studio:'],
        lines: [
          [{ pending: 'designated agent — name', deferredUntil: DMCA_AGENT_DUE }],
          [{ pending: 'designated agent — mailing address', deferredUntil: DMCA_AGENT_DUE }],
          [{ pending: 'designated agent — email address', deferredUntil: DMCA_AGENT_DUE }],
        ],
      },
      {
        id: 'after',
        label: 'What happens next',
        paragraphs: [
          'A complete notice is acted on promptly. The material is removed or replaced, and you are told which.',
          'Because nothing here is posted by a visitor, there is no account to suspend and no repeat-infringer policy to publish. If that changes, this page changes with it.',
        ],
      },
    ],
  },

  accessibility: {
    meta: {
      title: 'Accessibility — CWAAA',
      description:
        'The standard this site is built to, what has actually been checked, where the gaps are, and how to report a barrier.',
    },
    title: 'Accessibility',
    lead:
      'CWAAA builds this site to WCAG 2.2 Level AA. No independent audit has been run against it, so that is a target this page is accountable to, not a conformance claim.',
    blocks: [
      {
        id: 'target',
        label: 'The standard, and the claim',
        paragraphs: [
          'The target is WCAG 2.2 Level AA. CWAAA has not commissioned an independent audit and does not claim conformance to it.',
          'What follows is what has actually been built and checked, and where the gaps are known to be. Both halves matter: a page that lists only the first half is advertising.',
        ],
      },
      {
        id: 'built',
        label: 'What is built',
        list: [
          'Every page opens with a skip link, and the content sits inside named landmarks with headings in order.',
          'Everything works from the keyboard, the pledge form included, and the focus outline is always visible.',
          'The site works without JavaScript. Nothing you need to read depends on a script running.',
          'Motion is one settle as content comes into view, and it is switched off entirely when your system asks for reduced motion.',
          'Colour never carries meaning on its own. Form errors sit beside the field they belong to and say what to change.',
          'Text is live text, not pictures of text, and the reading columns hold together at 200% zoom without sideways scrolling.',
          'Controls are at least 44 by 44 pixels.',
          'The seal and every photograph that carries meaning have text alternatives. Marks that are decoration are hidden from screen readers rather than described.',
          'Wide records recompose into labelled blocks on small screens instead of becoming a sideways-scrolling table.',
        ],
      },
      {
        id: 'gaps',
        label: 'Known gaps',
        paragraphs: [
          'No independent audit has been run. No testing has been done with people who use assistive technology daily, which is the test that finds what the others miss.',
          'The site has been checked with automated tooling and by keyboard. That catches a great deal and it does not catch everything, so the list above is what CWAAA believes to be true rather than what anyone has certified.',
        ],
      },
      {
        id: 'report',
        label: 'Reporting a barrier',
        paragraphs: [
          'If something here does not work for you, say so and it will be fixed. Tell CWAAA which page you were on, what you were trying to do, and what happened instead. If you know what you were reading the site with, say that too, because it shortens the search.',
          'Write to hope2studio@yahoo.com.',
        ],
        note: 'There is no form to fill in and no ticket number to keep.',
      },
    ],
  },
} as const satisfies Record<string, LegalDoc>;

/* ============================================================================
   2026-09-24 — /tie-one-on, /chapters, /about, /field-assessment.

   OWNER copy is carried byte-for-byte and marked OWNER with its date. Every
   string marked DRAFT was written for these builds and awaits the copy lane
   (../../gotsoap/docs/copy/COPY-PROTOCOL.md) before it is called approved.

   Photography is not here yet. Each slot carries a graphics ID and a shot
   spec for `npm run review`; the public build renders the material ground and
   says nothing (ImageSlot.astro). Every spec puts a person in frame: no still
   life (design.md §7, owner law).
   ========================================================================== */

/** A photograph the owner will supply: graphics ID, review title, shot spec. */
export interface Shot {
  readonly id: string;
  readonly title: string;
  readonly spec: string;
}

/**
 * /tie-one-on — the washcloth-ribbon program. Brief:
 * .impeccable/surfaces/cwaaa-src-pages-tie-one-on-astro.md.
 */
export const tieOneOn = {
  meta: {
    title: 'Tie One On For Suds — CWAAA',
    /** DRAFT. */
    description:
      'The washcloth ribbon of Concerned Women Against Axe Abuse. It carries the Coalition’s official position: he showers now.',
  },
  /** OWNER 2026-09-24 (program name, fixed). */
  heading: 'Tie One On For Suds',
  /** OWNER 2026-09-24 — split at the colon so the position can be set as the
   *  route's monument. Case kept as written: the position continues the sentence. */
  position: {
    lead: 'Our washcloth ribbon carries the Coalition’s official position:',
    line: 'he showers now.',
  },
  /** OWNER 2026-09-24 — the whole sentence, kept intact as the placements' heading. */
  placementsLine: 'Tie one on the rearview mirror, the gym bag, the doorknob of the room he won’t leave.',
  /** OWNER 2026-09-24 — the sentence's three places, used as the photographs' captions. */
  placements: [
    {
      where: 'The rearview mirror',
      shot: {
        id: 'CW-G03.2',
        title: 'Tie One On · the rearview mirror',
        spec: 'A man at the wheel of his own parked car, reaching up to the rearview mirror where the red washcloth ribbon is knotted. His face is in frame (direct, or caught in the mirror). Ordinary daylight, lived-in car. Terry weave and knot legible. 4:5 portrait.',
      },
    },
    {
      where: 'The gym bag',
      shot: {
        id: 'CW-G03.3',
        title: 'Tie One On · the gym bag',
        spec: 'A man shouldering his gym bag at his own front door or a gym entrance, the ribbon tied on the strap at chest height. Face and body in frame; he is on his way somewhere. 4:5 portrait.',
      },
    },
    {
      where: 'The doorknob of the room he won’t leave',
      shot: {
        id: 'CW-G03.4',
        title: 'Tie One On · the doorknob',
        spec: 'A man standing in the doorway of the room he won’t leave (den, gaming room or bedroom, lived-in behind him), the ribbon on the doorknob beside his hand. He is the subject; the knob is a supporting crop, never the picture. 4:5 portrait.',
      },
    },
  ],
  /** OWNER 2026-09-24. Set on the program's hang tag, which is where program
   *  information lives on this route (design.md §6: labels, tags, slips). */
  wear: ['Wear it for the reformed.', 'Wear it for the suds-curious.'],
  tag: {
    /** DRAFT — the tag's printed header: the program and its owner, nothing else. */
    maker: 'CWAAA',
    program: 'Tie One On For Suds',
  },
  /** DRAFT — the one step from "suds-curious" to the coalition's own assessment. */
  assessment: { lead: 'Not sure which he is?', label: 'Schedule a Field Assessment', href: '/field-assessment' },
  /** OWNER 2026-09-24 — the route's close, and the one pledge action it earns. */
  close: 'Then send him to put his intent in writing.',
  action: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
  /** The route opener. Same program as the home cloth field (CW-G03). */
  opener: {
    id: 'CW-G03.1',
    title: 'Tie One On · route opener · full bleed',
    spec: 'A man in an ordinary lived-in interior with the red washcloth ribbon tied on him: wrist, belt loop, or the strap of a bag he is carrying. Face and body legible. Terry weave, stitched hem, frayed ends and knot tension read at this scale. Lower-left third kept quiet for the title. Masters: 3200×1800 wide plus a 2400×3000 phone composition.',
  } satisfies Shot,
} as const;

/**
 * /chapters — four representative dispatches from a fifty-state network.
 * OWNER roster 2026-09-24: not a directory, not real contacts, not the only
 * chapters. Order is the story: a room fills → the coalition goes public →
 * members make something → private experiences receive answers.
 * Brief: .impeccable/surfaces/cwaaa-src-pages-chapters-astro.md.
 */
export const chapters = {
  meta: {
    title: 'Chapters — CWAAA',
    /** DRAFT. */
    description:
      'Two million concerned women. Chapters in all fifty states. One demand. Dispatches from Atlanta, Greater Phoenix, Milwaukee and Tacoma.',
  },
  /** OWNER 2026-09-24. */
  heading: 'Most of them answer with a room.',
  /** APPROVED — objective canon. */
  scale: 'Two million concerned women. Chapters in all fifty states. One demand.',
  /** OWNER 2026-09-24. */
  intro:
    'A chapter may begin in a community room, around a borrowed table or with an envelope passed between two women who have had the same conversation. What follows is modest and consistent: document the problem, state the expectation and give people something useful to carry home.',
  /** DRAFT — the field's label. Says "dispatches", never "our chapters": these are four of many. */
  marker: 'Dispatches',
  /** OWNER 2026-09-24 — places, functions and dispatch text verbatim, in this order. */
  dispatches: [
    {
      place: 'Atlanta, Georgia',
      work: 'Meeting',
      text: 'We reserved the community room for eight. Seventeen women came. We borrowed chairs from the room next door and began with the question that started most chapters: “How many times have you already asked?”',
      shot: {
        id: 'CW-G05.1',
        title: 'Chapters · Atlanta · the room',
        spec: 'A contemporary community-room meeting: women visible around mismatched tables, extra chairs plainly pulled in from next door. Coffee, notebooks, chapter packets, one box of washcloth ribbons. Organized but recently expanded, not a staged board meeting. Faces in frame. 3:2 landscape.',
      },
    },
    {
      place: 'Greater Phoenix, Arizona',
      work: 'Public outreach',
      text: 'The adhesive on the display gave out before the volunteers did. We moved the pledge table inside, weighted Form CW-1 with two water bottles and stayed through the afternoon. Several women returned with someone they wanted to introduce to the material.',
      shot: {
        id: 'CW-G05.2',
        title: 'Chapters · Greater Phoenix · the pledge table',
        spec: 'Members moving or running a small pledge table just inside a community-center entrance: folding table, Form CW-1 weighted with two water bottles, red washcloth ribbons, one slightly heat-warped sign. People carry the frame; never a product still life, never a heat caricature. 4:5 portrait.',
      },
    },
    {
      place: 'Milwaukee, Wisconsin',
      work: 'Ribbon production',
      text: 'We assembled eighty-six ribbon packets on Wednesday. Eleven left with members before they could be counted for the photograph. No one was asked to explain who needed one.',
      shot: {
        id: 'CW-G05.3',
        title: 'Chapters · Milwaukee · ribbon night',
        spec: 'Several members cutting, folding, tying and packing real red washcloth ribbons at a long table. Scissors, thread, instruction slips, packaging bands and finished packets appear as parts of the work. The women who made them remain the subject. 3:2 landscape.',
      },
    },
    {
      place: 'Tacoma, Washington',
      work: 'Correspondence',
      text: 'The first envelope contained four written pages. The second contained a grocery receipt with SOAP circled twice. Both received answers before the room was closed for the night.',
      shot: {
        id: 'CW-G05.4',
        title: 'Chapters · Tacoma · correspondence night',
        spec: 'Two or three members opening and answering chapter mail at a table: envelopes, reply stationery, the grocery receipt with SOAP circled twice, a stack of finished replies. Private, careful, human; not evidence processing. No readable personal information. Faces in frame. 4:5 portrait.',
      },
    },
  ],
  /** DRAFT — the close points onward in the progression (design.md §3: Chapters / About). */
  actions: [
    { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge', primary: true },
    { label: 'How the coalition began', note: '→', href: '/about', primary: false },
  ],
} as const;

/**
 * /about — the 2024 book-club origin, the deepest neutral Office reference, and
 * the restrained creator credit. Brief: .impeccable/surfaces/cwaaa-src-pages-about-astro.md.
 */
export const about = {
  meta: {
    title: 'About — CWAAA',
    /** DRAFT. */
    description:
      'Concerned Women Against Axe Abuse began in 2024 as one book club’s informal grievance log. It is now a national coalition with a single, reasonable demand.',
  },
  marker: 'About the coalition',
  /** OWNER 2026-09-24, paragraph 1. Its first sentence is the route's statement. */
  origin: {
    statement:
      'What began as one book club’s informal grievance log is now a national coalition with a single, reasonable demand: soap, applied to men, regularly.',
    body: [
      'There was no founding incident — there were thousands, occurring simultaneously, in elevators and rideshares and the third row of every theater.',
      'What united our founders was not anger. Anger is loud. It was a quiet, unshakeable certainty that it did not have to smell like this.',
    ],
  },
  /** OWNER 2026-09-24, paragraph 2. Its opening pair is the route's monument. */
  position: {
    line: ['We do not oppose fragrance.', 'We oppose substitution.'],
    body: 'A body spray is a citrus arrangement on a condemned building. We are against the fog, and we intend to lift it. In writing. With copies filed.',
  },
  /** APPROVED — objective canon. */
  scale: 'Two million concerned women. Chapters in all fifty states. One demand.',
  /** The coalition's own filed record. The last row is the site's single neutral
   *  Office reference (design.md §6 About; ui-system §13 reserves it here).
   *  Owner approved a drafted line 2026-09-24; the wording is DRAFT. It is a
   *  reference and nothing more: no verb, no relationship, no explanation. It
   *  links only if OFFICE_SITE_URL is ever configured. */
  record: [
    { label: 'Established', value: '2024' },
    /** DRAFT — restates the owner's origin as a record value. */
    { label: 'Origin', value: 'One book club' },
    { label: 'Chapters', value: 'All fifty states', href: '/chapters' },
    { label: 'Reference', value: 'Establishment Directive 1961-A, Office of Lather Compliance', office: true },
  ],
  /** Owner decision 2026-09-24: a restrained credit that leads to the real
   *  authorship and the fiction disclosure on the Got Soap? /about reveal. The
   *  disclosure stays one click deep; nothing here announces it. DRAFT wording. */
  credit: { lead: 'Site by', name: 'Hope2 Studio', path: '/about', external: 'External site' },
  shots: {
    origin: {
      id: 'CW-G05.5',
      title: 'About · the book club, 2024',
      spec: 'Contemporary, 2024: the founding book club, five or six women around an ordinary home dining table mid-meeting, faces in frame. The informal grievance log open between them (spiral notebook, handwritten entries, nothing legible), a paperback or two, coffee. Not sepia, not aged, not staged. 3:2 landscape.',
    },
    program: {
      id: 'CW-G05.6',
      title: 'About · the first program materials',
      spec: 'Early 2024, the first program work with the women who made it: two or three members at a kitchen table cutting the first washcloth ribbons and marking up an early Form CW-1 draft. People are the subject; the materials support. 4:5 portrait.',
    },
  },
} as const;

/**
 * /field-assessment — Schedule a Field Assessment.
 *
 * OWNER DIRECTION 2026-09-24, two rulings:
 * 1. The Sniff Test belongs to Got Soap? directly: a glossy, magazine-quiz
 *    questionnaire aimed at the low-effort man himself, to get HIM to take it.
 *    CWAAA never hosts, restates or reskins it (CW-L03).
 * 2. CWAAA's field assessment is the other side of that: the page where
 *    someone who knows a man who has stopped washing requests an assessment
 *    for him. The visitor here is the referrer, not the man.
 *
 * Vocabulary: CWAAA's word is "referral", the word its Recovery Records
 * already use ("Referral occasioned by"). No enforcement, complaint, hotline
 * or case-intake language, and no Office voice (PRODUCT.md hard constraints).
 * The request path is PENDING until intake fields, consent, fulfilment,
 * privacy handling and an operational destination are approved; nothing is
 * collected and nothing is "booked". Every string below is DRAFT except the
 * title. Brief: .impeccable/surfaces/cwaaa-src-pages-field-assessment-astro.md.
 */
export const fieldAssessment = {
  meta: {
    title: 'Schedule a Field Assessment — CWAAA',
    description:
      'If someone you know has stopped washing and started spraying, you can refer him for a field assessment. What happens after a referral, and how to start one.',
  },
  /** OWNER 2026-09-24 (title). */
  title: 'Schedule a Field Assessment',
  lead:
    'If someone you know has stopped washing and started spraying, you can refer him for a field assessment. A chapter member takes it from there. You do not have to be the one who brings it up again.',
  includes: {
    label: 'What happens after a referral',
    list: [
      'You tell the coalition who he is to you and what you have noticed. You do not need proof. Most people have already asked him, more than once, which is usually why they are here.',
      'A chapter member contacts him, not you, and tells him a referral has been received. Your name stays with the referral.',
      'The assessment itself is a conversation at an ordinary table: how often he washes, with what, and what the spray is being asked to cover.',
      'No one sniffs anyone. The routine is described, not tested.',
      'He leaves with a written baseline and one next step, usually a bar of soap and Form CW-1.',
    ],
    note: 'It is not a punishment, a public record, or a test he can fail. It is the conversation you have been trying to have, with someone else holding the binder.',
  },
  paths: {
    label: 'Two ways to start',
    /** CWAAA's own path, first: this page exists for it. */
    request: {
      label: 'Refer him for a field assessment',
      body: 'The referral is a short request to the coalition. It is not an instant result, and he is not told who made it.',
      /** Renders as a visible [pending: …] marker the launch check counts. */
      pending: 'field assessment referral form',
      note: 'Until it opens, this page collects nothing.',
    },
    /** The campaign's quiz, second and external. Framed as something the
     *  referrer sends HIM, because that is who it is written for. */
    sniff: {
      label: 'Or send him the Sniff Test',
      /** "four minutes" is Got Soap?'s own figure. */
      body: 'If he would rather hear it from a quiz than from you, the Got Soap? campaign runs one, written for him. Seven questions, about four minutes. It is theirs, not the coalition’s.',
      note: 'Got Soap? · external site',
      action: 'Open the Sniff Test',
      path: '/sniff-test/',
      external: 'External site',
    },
  },
  shot: {
    id: 'CW-G09',
    title: 'Field assessment · at the table',
    spec: 'A chapter member and a referred man across an ordinary table in a community room or kitchen, mid-conversation, both faces in frame. He is there because someone who loves him asked the coalition to step in, and it shows: a little cornered, a little relieved. A bar of soap and a blank baseline sheet on the table. No clipboard enthusiasm, no interrogation framing, no surveillance angle. 3:2 landscape.',
  } satisfies Shot,
} as const;
