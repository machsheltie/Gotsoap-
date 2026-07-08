/**
 * crisis.ts — /crisis (CWAAA site-within-a-site) copy, transcribed VERBATIM
 * from copy-deck-v2.md §8 (+ §2 meta). 📋 CWAAA voice throughout; the reformed
 * man is only ever QUOTED inside CWAAA-authored case files (deck §8.6a note) —
 * the surface author stays CWAAA. Do not paraphrase.
 *
 * Quote convention: the deck uses STRAIGHT ASCII apostrophes/quotes (matched
 * here); only em dash (—), middot (·), and ellipsis (…) are Unicode. Strings
 * are backtick-delimited so straight ' and " never fight the JS delimiter.
 *
 * Note for review: the task's section list did not enumerate §8.6a "Recovery
 * Case Files"; it is included here because deck §8 (the cited source of truth)
 * contains it in full and it is the campaign's Got-Milk celebrity-endorsement
 * homage. It is one clearly-delimited block the orchestrator can drop if out of
 * scope.
 */
import type { RouteMeta } from './types';

export interface CrisisHeader {
  org: string;
  estLine: string;
  registeredLine: string;
  /** The memorandum title — the page h1. */
  memoTitle: string;
}

export interface CrisisFinding {
  text: string;
  /** Tag rendered as "FINDING 26-0n". */
  ref: string;
}

export interface CrisisFindings {
  heading: string;
  subtitle: string;
  /** Column headers for the annual-findings table. */
  colFinding: string;
  colRef: string;
  rows: CrisisFinding[];
}

export interface PressRelease {
  date: string;
  headline: string;
  /** Body may be empty (deck gives one headline with no body). */
  body: string;
}

export interface CaseFile {
  /** e.g. "CASE FILE RC-014 · Recovery, Verified". */
  label: string;
  quote: string;
  /** Attribution subject, e.g. "Derek, 31." */
  by: string;
  /** Verified status, e.g. "REFORMED." */
  status: string;
  /** Closing deadpan note. */
  note: string;
}

/** A CWAAA-voice exit / funnel CTA. */
export interface CrisisCta {
  label: string;
  href: string;
}

export interface CrisisContent {
  header: CrisisHeader;
  founding: { heading: string; paragraphs: string[] };
  findings: CrisisFindings;
  scale: string;
  ribbon: { heading: string; body: string; cta: CrisisCta };
  press: { heading: string; immediateRelease: string; releases: PressRelease[] };
  caseFiles: {
    heading: string;
    subtitle: string;
    files: CaseFile[];
    closing: string;
    cta: CrisisCta;
  };
  finePrint: string;
  exits: CrisisCta[];
  meta: RouteMeta;
}

export const crisis: CrisisContent = {
  header: {
    org: `CONCERNED WOMEN AGAINST AXE ABUSE`,
    estLine: `Est. 2024 · Lather · Rinse · Respect`,
    registeredLine: `A registered concern since 2024 · National Office, Suite 2B (above the pharmacy)`,
    memoTitle: `A Memorandum on the State of Male Hygiene`,
  },
  founding: {
    heading: `Our Founding`,
    paragraphs: [
      `Founded in 2024 by women who had smelled enough.`,
      `What began as one book club's informal grievance log is now a national coalition with a single, reasonable demand: soap, applied to men, regularly. There was no founding incident — there were thousands, occurring simultaneously, in elevators and rideshares and the third row of every theater. What united our founders was not anger. Anger is loud. It was a quiet, unshakeable certainty that it did not have to smell like this.`,
      `We wish to be clear. We do not oppose fragrance. We oppose substitution. A body spray is a citrus arrangement on a condemned building. We are not against men — several of us are related to them. We are against the fog, and we intend to lift it. In writing. With copies filed.`,
    ],
  },
  findings: {
    heading: `The State of Male Hygiene — Annual Findings`,
    subtitle: `Compiled by the Field Data Committee. Methodology available upon written request. Please do not request it.`,
    colFinding: `Finding`,
    colRef: `Reference`,
    rows: [
      {
        text: `In independent testing, 100% of men who showered got measurably wet.`,
        ref: `26-01`,
      },
      {
        text: `9 out of 10 women correctly identified which volunteer had showered. The tenth asked to leave the study.`,
        ref: `26-02`,
      },
      {
        text: `Axe body spray contains 0% soap. This figure has not improved since 1983.`,
        ref: `26-03`,
      },
      {
        text: `73% of body-spray applications occur in lieu of, not in addition to, a shower.`,
        ref: `26-04`,
      },
      {
        text: `The average loofah in male ownership is 4.7 years old. Some are load-bearing.`,
        ref: `26-05`,
      },
    ],
  },
  scale: `Two million concerned women. Chapters in all fifty states. One demand.`,
  ribbon: {
    heading: `Tie One On For Suds`,
    body: `Our washcloth ribbon says what words cannot: he showers now. Tie one on the rearview mirror, the gym bag, the doorknob of the room he won't leave — a gentle, constant reminder that soap exists and he is loved enough to use it. Wear it for the reformed. Wear it for the suds-curious. Then put your intent in writing.`,
    cta: { label: `File Form CW-1 →`, href: '/pledge' },
  },
  press: {
    heading: `Press Room`,
    immediateRelease: `FOR IMMEDIATE RELEASE`,
    releases: [
      {
        date: `June 2026`,
        headline: `"CWAAA Statement on the Term 'Shower-Adjacent': No."`,
        body: `"The Office of Lather Compliance has reviewed the submission. Proximity to a shower is not participation in one. This concludes our statement."`,
      },
      {
        date: `May 2026`,
        headline: `"Coalition Rejects Proposed Compromise of 'Every Other Day, Roughly.'"`,
        body: `"We thanked the delegation for coming. We did not thank them for the smell. Negotiations have adjourned."`,
      },
      {
        date: `April 2026`,
        headline: `"Loofah Amnesty Weekend Declared a Success; 4,000 Surrendered, No Questions Asked."`,
        body: `"Recovered items are being held at an undisclosed facility. Three were still warm. We do not wish to discuss the three."`,
      },
      {
        date: `March 2026`,
        headline: `"Field Assessors Deployed to Sigma Chi; One Recovered, All Debriefed, Counseling Available."`,
        body: ``,
      },
      {
        date: `February 2026`,
        headline: `"CWAAA Responds to Claims That 'The Gym Counts': The Gym Does Not Count."`,
        body: `"Sweat is not a rinse cycle. Repeat: sweat is not a rinse cycle. Please stop emailing us about this."`,
      },
    ],
  },
  caseFiles: {
    heading: `Recovery Case Files`,
    subtitle: `Documented recoveries, published with subject consent. Names changed to protect the reformed.`,
    files: [
      {
        label: `CASE FILE RC-014 · Recovery, Verified`,
        quote: `"I do lawn care. I figured the smell was just… my finish. My natural top-note. I'd hit the Axe, maybe a Febreze coat if it was a two-day situation, and call that grooming. Then a girl left me on read after one date and texted back exactly once: 'the truck smelled like a hamper, man.' I took the Sniff Test. Public Thirst Hazard. I bought my first loofah since middle school. Swamp ass is real. I know that now. I'm sorry to everyone who's ridden in the truck."`,
        by: `Derek, 31.`,
        status: `REFORMED.`,
        note: `Showers daily. Truck aired out.`,
      },
      {
        label: `CASE FILE RC-022 · Recovery, Verified`,
        quote: `"Weekends were a lot. By Sunday I had no gas left for a shower, so I'd mist the sheets, mist myself, and let Febreze carry the week. I thought I was being efficient. My roommate staged what he called 'a conversation.' There was a printout. I scored Axe-Dependent. Four dollars of soap later I'm a different man. Turns out Febreze was not, in fact, showering. I was the only one who didn't know."`,
        by: `Brayden, 27.`,
        status: `REFORMED.`,
        note: `Sheets washed, no longer seasoned.`,
      },
      {
        label: `CASE FILE RC-031 · Recovery, Verified`,
        quote: `"Honestly? I'm hot. I never thought hygiene mattered — I could pull regardless. What I couldn't figure out was why nobody came back for round two. Then every girl on my feed started posting this Got Soap? thing like scripture, so I clicked to see what the fuss was. Took the quiz to prove I'd ace it. I did not ace it. Clean is the actual flex and I'd been coasting on face alone. Vanity got me in the door. Soap kept me there."`,
        by: `Chad (yes, really), 29.`,
        status: `CERTIFIED SOAP-SMOLDERING.`,
        note: `Insufferable again, but clean.`,
      },
      {
        label: `CASE FILE RC-039 · Recovery, Verified`,
        quote: `"I owned a ninety-dollar bottle of cologne and zero bars of soap. In my mind that math worked. I was applying luxury directly to the problem. A coworker forwarded me the Crisis page — anonymously, which I respect — and the finding about body spray containing 0% soap did something to me. Cologne is a garnish. You do not garnish a dumpster. I own soap now. The cologne goes on top of clean, which, it turns out, is the entire point."`,
        by: `Marcus, 34.`,
        status: `REFORMED.`,
        note: `Cologne demoted to garnish.`,
      },
      {
        label: `CASE FILE RC-047 · Recovery, Verified`,
        quote: `"Back on the apps at forty-six after the divorce. I'd been off the market so long I forgot the rules had teeth. My daughter looked me dead in the eye and said, 'Dad, you smell like the garage.' She sent me the link herself. I took the assessment at the kitchen table. Suds-Curious — 'there's a clean man in there, let him out.' So I did. Three dates this month. She screens them now. We're both thriving."`,
        by: `Gary, 46.`,
        status: `REFORMED.`,
        note: `No longer smells like the garage. Daughter approves.`,
      },
      {
        label: `CASE FILE RC-052 · Recovery, Verified`,
        quote: `"My mom didn't yell. That's the thing. She just pulled me aside after Sunday dinner, quiet, and said, 'Baby, I love you, and I need you to hear this from me before you hear it from a girl: you have to shower more.' Then she texted me the link so I wouldn't have to look her in the eye. Suds-Curious. She was right — she's always right. I fixed it. Last month I brought Hannah from two doors down home for dinner. Mom cried. Hannah stayed for seconds. I owe both of them a shower's worth of gratitude and I intend to pay it daily."`,
        by: `Tyler, 26.`,
        status: `REFORMED.`,
        note: `Introduced a girl to Mom. Both approve. Mom is framing this case file.`,
      },
    ],
    closing: `Every recovery begins with a single honest assessment.`,
    cta: { label: `Schedule a field assessment →`, href: '/sniff-test' },
  },
  finePrint: `CWAAA is a fictional advocacy body and is not affiliated with any real organization, fragrance, or your ex. Recovery Case Files are dramatizations; the subjects are invented and any resemblance to a specific unwashed man is a you problem, not a legal one. Findings are directional, emotional, and true in spirit. The Field Data Committee meets Thursdays. Form CW-1 confers no legal standing but considerable moral standing. Est. 2024.`,
  exits: [
    { label: `Schedule a field assessment →`, href: '/sniff-test' },
    { label: `File Form CW-1 →`, href: '/pledge' },
  ],
  meta: {
    title: `The Crisis | Concerned Women Against Axe Abuse`,
    description: `The state of male hygiene, documented. A memorandum from the women who had smelled enough.`,
  },
};
