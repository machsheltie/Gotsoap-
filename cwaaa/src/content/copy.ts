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
     *  for FINDING 26-01 (findings.lead.support); second is DRAFT, awaiting the copy lane. */
    support: [
      '73% of body-spray applications occur in lieu of, not in addition to, a shower.',
      'Body spray may alter the immediate air. It does not remove sweat, oil, dirt, or the consequences of avoiding soap and water.',
    ],
    disposition: 'Disposition · entered into the public record',
    /** The filed record under the rule: label / value pairs. "Field Data Committee" is APPROVED
     *  (crisis.findings.subnote). */
    record: [
      { label: 'Finding', value: '26-01' },
      { label: 'Entered by', value: 'Field Data Committee' },
      { label: 'Status', value: 'Current' },
    ],
    method: {
      label: 'Methodology note',
      /** DRAFT */
      body:
        'Observations were collected at chapter tables, gym benches, and one very long elevator ride. The committee declines to name the elevator.',
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
    /** DRAFT — the referring visitor's action: a link to Form CW-1 that copies the pledge URL
     *  when JavaScript is available (design.md §10: a copied link confirms). */
    refer: { label: 'Copy the pledge link for him', href: '/pledge', done: 'Pledge link copied. Send it without commentary.' },
    objectSpec: 'CW-G04 · participant object · placeholder. Object and image direction pending CW-D04.',
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
      title: 'Documentary hero · full bleed · placeholder',
      spec:
        '16:9 wide frame. A woman’s hands tying a red washcloth ribbon to the handle of a used black gym bag on a locker-room bench. Hands and knot inside the dashed safe zone: upper right, below the navigation band (no closer than 24% from the top); lower left kept quiet for the proposition. Export 3200×1800 minimum plus a 4:5 phone recrop.',
    },
    cloth: {
      id: 'CW-G03',
      title: 'Cloth macro · full bleed · placeholder',
      spec:
        'Real red washcloth: weave, hem, knot tension, tied to a gym-bag handle or doorknob. Lower-left third kept quiet for the panel.',
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
      'The public register of Concerned Women Against Axe Abuse findings on the state of male hygiene. Compiled by the Field Data Committee.',
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
    /** Row dispositions and dates are DRAFT for the copy lane. */
    record: [
      { label: 'Entered by', value: 'Field Data Committee' },
      { label: 'Disposition', value: 'Entered into the public record' },
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
    columns: { label: 'Finding', figure: 'Figure', text: 'Entered as' },
    rows: [
      /** APPROVED — runtime 26-01. */
      { label: '26-02', figure: '87%', text: '87% of surveyed men require a partner who ‘takes care of herself.’ 14% remembered when they last washed their towel.' },
      /** APPROVED — runtime 26-02. */
      { label: '26-03', figure: '9 of 10', text: '9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study.' },
      /** APPROVED — runtime 26-05. */
      { label: '26-04', figure: '4.7 years', text: 'The average loofah in male ownership is 4.7 years old. Some are load-bearing.' },
    ],
    /** DRAFT — the register's standing line, Catesque notation. */
    note: 'Findings are entered by the Field Data Committee and remain current until superseded.',
  },
  next: {
    marker: 'Next',
    /** DRAFT */
    statement: 'The record shows the problem. The stories show it can change.',
    actions: {
      primary: { label: 'Read Recovery Stories', href: '/recovery-stories' },
      secondary: { label: 'Take the Pledge', note: 'Form CW-1', href: '/pledge' },
    },
    /** DRAFT — copies this route's link when JavaScript is available (design.md §10). */
    refer: { label: 'Send the findings to someone', href: '/findings', done: 'Link copied. Send it without commentary.' },
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
