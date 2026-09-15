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
    /** DRAFT — mission restated from objective canon. */
    statement:
      'Concerned Women Against Axe Abuse is a national coalition making routine soap-and-water hygiene the expected baseline.',
    body: [
      /** APPROVED — design.md §1 subline, extended. Second sentence DRAFT. */
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
    /** DRAFT — three clauses under the running line. */
    run: [
      {
        label: 'Document',
        body: 'We keep the record. Findings are numbered, dated, and written plainly enough to read aloud at a chapter table.',
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
     *  `label` DRAFT — the R1 label confused two blind readers; in copy lane R2. */
    refer: { label: 'Copy the pledge link for him', href: '/pledge', done: 'Pledge link copied. He will know why.' },
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
    /** DRAFT — chapter traces; no invented places or contacts (CW-D04 roster pending). */
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
    /** DRAFT — the R1 proposal stalled all three blind readers; in copy lane R2. Interim line stands. */
    statement: 'The record shows the problem. The stories show it can change.',
    actions: {
      primary: { label: 'Read Recovery Stories', href: '/recovery-stories' },
      secondary: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
    },
    /** Copies this route's link when JavaScript is available (design.md §10). RATIFIED 2026-09-15 — copy lane R1 (proposals-2026-09-15-findings-drafts.md; reader-evidence-2026-09-15-findings.md). */
    refer: { label: 'Send the findings to the man they describe', href: '/findings', done: 'Link copied. No cover note is required.' },
  },
} as const;

export const notFound = {
  meta: { title: 'Not in the public file — CWAAA', description: 'This page is not part of the current CWAAA publication set.' },
  /** DRAFT — CWAAA-authored, calm; no error code, no Office behavior. */
  heading: 'This page is not in the public file.',
  body: 'The address may be incomplete, or the page may not be part of the current publication set. No further conclusion should be drawn from its absence.',
  actions: [
    { label: 'Return home', href: '/' },
    { label: 'Read the Findings', href: '/findings' },
    { label: 'Take the Pledge', href: '/pledge' },
  ],
} as const;

/**
 * /recovery-stories and /recovery-stories/[id].
 *
 * Surface job: Convert + Character (design.md §5 "Recovery Stories"). Each man has a specific
 * before-state, consequence and desirable change, "told through his own character rather than an
 * institutional verdict." So:
 *   - `testimony` is APPROVED copy, carried byte-for-byte from the combined runtime's
 *     crisis.caseFiles.files (site/src/content/copy.ts). It is the man speaking. Never edit it here.
 *   - The Got Soap? `status` verdict lines ("CERTIFIED SOAP-SMOLDERING…") deliberately do NOT
 *     transfer. They are campaign-voice verdicts on the man, which this route's law forbids as the
 *     telling device. `believed`/`cost`/`changed` replace them and stay his, not the Coalition's.
 *   - `disposition` is the one CWAAA-authored line per record: sincere, procedural, small, and
 *     about the Coalition's own handling — never a judgement of the participant.
 * RC-NNN appears only inside an opened story (design.md §4). Roster is the five approved files;
 * RC-014/052/063/071 stay dead.
 */
export const recoveryStories = {
  meta: {
    title: 'Recovery Stories — CWAAA',
    description:
      'Five men who changed their minds about soap, in their own words. Documented by Concerned Women Against Axe Abuse.',
  },
  marker: 'Recovery Stories',
  heading: 'Five men, in their own words.',
  intro:
    'The Coalition documents recoveries. We do not improve the quotes.',
  note:
    'Published with each participant’s consent. Names changed where he asked; two men declined the offer.',
  readLabel: 'Read his story',
  recordLabel: 'Recovery Record',
  backLabel: 'All Recovery Stories',
  action: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
  stories: [
    {
      id: 'RC-022',
      slug: 'brayden',
      name: 'Brayden, 27',
      pull: 'There was a printout.',
      /** APPROVED — carried verbatim from crisis.caseFiles.files RC-022. */
      testimony:
        '“By Sunday I’d mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called ‘a conversation.’ There was a printout.”',
      believed: 'That Febreze was efficient.',
      cost: 'His roommate staged a conversation. There was a printout.',
      changed: 'He bought soap the same afternoon. The sheets are just sheets.',
      disposition: 'Recovery documented. The roommate was thanked in writing.',
      image: { alt: 'Brayden, 27, in a boat on open water, sunglasses on, holding a bluegill up toward the camera with both hands. Submitted by the participant as his most recent photograph of himself.' },
    },
    {
      id: 'RC-031',
      slug: 'chad',
      name: 'Chad (yes, really), 29',
      pull: 'I did not ace it.',
      testimony:
        '“Honestly? I’m hot. I never thought hygiene mattered — I could pull regardless. What I couldn’t figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I’d ace it. I did not ace it. I’d been coasting on face alone. Vanity got me in the door. Soap kept me there.”',
      believed: 'That his face was doing all the work.',
      cost: 'Nobody came back for a second date.',
      changed: 'Same swagger. Second dates now.',
      disposition:
        'Recovery documented. He asked whether the Coalition needed a spokesman. The committee is considering it.',
      image: { spec: 'Gym mirror selfie, shirt lifted, phone covering half his face. Submitted by the participant. He sent four; this was the one he wanted used.' },
    },
    {
      id: 'RC-039',
      slug: 'marcus',
      name: 'Marcus, 34',
      pull: 'You do not garnish a dumpster.',
      testimony:
        '“I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect. Body spray contains 0% soap. Cologne is a garnish. You do not garnish a dumpster. I own soap now.”',
      believed: 'That ninety-dollar cologne was the same as being clean.',
      cost: 'A coworker forwarded him the Crisis page. Anonymously.',
      changed: 'He still doesn’t know who sent it. He has stopped needing to.',
      disposition: 'Recovery documented. Referral source remains unidentified at her request.',
      image: { spec: 'Cropped from a wedding photo — suit, half a stranger’s shoulder still in frame. Submitted by the participant as the most recent picture of himself he had.' },
    },
    {
      id: 'RC-047',
      slug: 'gary',
      name: 'Gary, 46',
      pull: '“Dad, you smell like the garage.”',
      testimony:
        '“Back on the apps at forty-six after the divorce. My daughter looked me dead in the eye and said, ‘Dad, you smell like the garage.’ She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious. I was in the shower before she’d backed out of the driveway. Three dates this month. She screens them now.”',
      believed: 'That the garage smell came with the house.',
      cost: 'His daughter said it to his face, in the driveway.',
      changed: 'Three dates this month. She screens them.',
      disposition: 'Recovery documented. His daughter was sent a ribbon.',
      image: { spec: 'Standing in his own driveway beside the truck, arms crossed, squinting into afternoon sun. Taken by his daughter, who submitted it.' },
    },
    {
      id: 'RC-058',
      slug: 'kaelthas',
      name: '“Kaelthas,” 22',
      pull: 'Best raid of my life.',
      testimony:
        '“She said she’d drive four hours to meet me. Top of the server, miles out of my league. My first thought wasn’t joy — it was ‘what does my room actually smell like,’ and the answer scared me sober. I stream; my whole life happens in this chair; I’d quietly decided hygiene was an IRL problem and I don’t do IRL. Shower for who, the webcam? It’s shoulders-up. But she was real now, and driving. Axe-Dependent. So I showered. I opened a window. I washed the hoodie. She stayed the whole weekend. Best raid of my life.”',
      believed: 'That hygiene was an IRL problem, and he did not do IRL.',
      cost: 'She said she would drive four hours.',
      changed: 'He opened a window. She stayed the whole weekend.',
      disposition: 'Recovery documented. He has asked the Coalition not to use the word “raid.”',
      image: { spec: 'In the gaming chair, headset around his neck, RGB behind him, shoulders-up exactly as he describes. Submitted by the participant from his stream.' },
    },
  ],
  labels: { believed: 'What he believed', cost: 'What it cost him', changed: 'What changed' },
} as const;
