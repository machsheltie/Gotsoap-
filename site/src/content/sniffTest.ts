/**
 * sniffTest.ts — The Sniff Test copy, transcribed VERBATIM from copy-deck-v2.md
 * §6 (intro, chrome, completion beat, 7 questions, 4 verdicts) + §2 (route meta).
 * Do not paraphrase. Owner: Task B.
 *
 * Design guardrails encoded here:
 *  - Scoring is INTERNAL plumbing only (a=0…d=3, total 0–21 → band → slug). The
 *    numeric total NEVER reaches the DOM (design.md §7 — binding). This module
 *    exposes verdict *slugs* and band thresholds; the quiz island redirects to a
 *    static verdict page by slug and never renders a number.
 *  - Verdict registers per design.md §7 mapping: soap-smoldering=porcelain,
 *    suds-curious=marble (dark editorial default — see note), axe-dependent=smoke,
 *    thirst-hazard=smoke (heavier).
 */
import type { Register } from '../config/site';
import { SITE_URL } from '../config/site';
import type { RouteMeta } from './types';

/** The four verdict slugs (also the static verdict-page routes). */
export type VerdictSlug =
  | 'soap-smoldering'
  | 'suds-curious'
  | 'axe-dependent'
  | 'thirst-hazard';

/** One assessment question: a prompt and exactly four answers (a→d, score 0→3). */
export interface SniffQuestion {
  prompt: string;
  /** Four answers in order a,b,c,d — their index IS their score (0..3). */
  answers: [string, string, string, string];
}

/** A score band: total ≤ max maps to this verdict slug (internal plumbing). */
export interface VerdictBand {
  max: number;
  slug: VerdictSlug;
}

/** A static, shareable verdict (copy-deck §6.4). No numeric score appears. */
export interface Verdict {
  slug: VerdictSlug;
  /** Full verdict name (the joke; the shareable payload). */
  name: string;
  /** Campaign register the card lives in (design.md §7). */
  register: Register;
  /** Layer-effect helper class for the display heading (tokens.css). */
  fx: 'steam-glow' | 'chrome' | 'gold';
  /** Opening line — smug/coaching/clinical/anaphora per verdict (§6.4). */
  subhead: string;
  /** Body paragraph (§6.4). */
  body: string;
  /** The pledge cue line above the CTA — differs per verdict (§6.4). */
  pledgeCue: string;
  /** Placeholder OG/share card, 1200×630 (public/og/verdict-<slug>.png). */
  ogImage: string;
  /** Per-route meta (title/description) for the crawlable verdict page. */
  meta: RouteMeta;
}

/* ---- /sniff-test route meta (copy-deck §2, verbatim) --------------------- */
export const meta: RouteMeta = {
  title: 'The Sniff Test — Field Assessment CW-7 | got soap?',
  description:
    'Seven questions between you and the truth your group chat already knows. Administered by CWAAA field assessors.',
};

/* ---- Intro (§6.1, verbatim) ---------------------------------------------- */
export const intro = {
  heading: 'The Sniff Test',
  lead: 'Seven questions. One verdict. Honesty optional — but it shows, the way it always does.',
  beginLabel: 'Begin assessment →',
  credit: 'Field Assessment CW-7 · Administered by CWAAA field assessors.',
};

/* ---- Chrome (§6.2, verbatim) --------------------------------------------- */
export const chrome = {
  /** Visible progress; {n} is 1..7. Montserrat — the only sponsor fingerprint. */
  progressTemplate: 'QUESTION {n} OF 7 — FIELD ASSESSMENT CW-7',
  /** aria-live announcement; {n} is 1..7. */
  ariaTemplate: 'Question {n} of 7.',
  /** Persistent footer under the questions. */
  footer: 'Answer honestly. The loofah already knows.',
  total: 7,
};

/* ---- Completion beat (§6.2b) — transient ~1.2s, no score, then redirect -- */
export const completion = {
  /** Bold opening clause. */
  headline: 'Assessment complete.',
  /** Remainder of the transient line. */
  body: 'Findings forwarded to the Records Division. Try to act normal.',
  /** How long the beat dwells before the client-side redirect (ms). */
  dwellMs: 1200,
};

/* ---- The seven questions (§6.3, verbatim; a=0 … d=3) --------------------- */
export const questions: SniffQuestion[] = [
  {
    prompt: 'How many bars of soap are in your home right now?',
    answers: [
      'Several. Strategically deployed.',
      "One. Somewhere. We've met.",
      'Does dish soap count?',
      'Soap is a construct.',
    ],
  },
  {
    prompt: 'Describe your loofah.',
    answers: [
      'Rotated quarterly, like a mattress.',
      "It's… seen some things. It doesn't talk about them.",
      'I use the wall. The wall is load-bearing now.',
      'What is a loofah and why are you in my bathroom.',
    ],
  },
  {
    prompt: 'Finish the sentence: "I shower…"',
    answers: [
      "Daily. With soap. Like it's not a whole thing.",
      'Most days. Unless the vibes are off.',
      'After the gym. I think about the gym constantly.',
      'When the group chat stages an intervention.',
    ],
  },
  {
    prompt: 'What does your towel smell like?',
    answers: [
      'Nothing. A towel should smell like nothing.',
      'Faintly of victory.',
      'A pond. A specific pond. It has a name.',
      "We don't smell the towel. We fear the towel.",
    ],
  },
  {
    prompt: 'Your relationship with body spray is best described as:',
    answers: [
      'A finishing touch. Never a foundation.',
      'Exclusive, committed, a little codependent.',
      'My primary weather system.',
      'I refer to applying it as "showering."',
    ],
  },
  {
    prompt: 'A date says "you smell nice." You:',
    answers: [
      'Say thanks. It\'s soap.',
      'Panic — which layer did they detect?',
      'Take full credit on behalf of Axe.',
      'This has genuinely never happened, and we both know why.',
    ],
  },
  {
    prompt: "Steam rises. You're in the shower. Your move?",
    answers: [
      'Lather, rinse, self-respect.',
      'A quick rinse. Water is basically soap.',
      'Stand there, contemplating my rivals.',
      "I'm not in the shower. I am never in the shower.",
    ],
  },
];

/* ---- Score bands (internal plumbing; §6.4 / mechanics §1) ----------------
   total 0–21 → 0–5 soap-smoldering · 6–10 suds-curious · 11–15 axe-dependent ·
   16–21 thirst-hazard. Evaluate in order: first band whose `max` ≥ total. ---- */
export const bands: VerdictBand[] = [
  { max: 5, slug: 'soap-smoldering' },
  { max: 10, slug: 'suds-curious' },
  { max: 15, slug: 'axe-dependent' },
  { max: 21, slug: 'thirst-hazard' },
];

/* ---- The four verdicts (§6.4, verbatim) ---------------------------------- */
export const verdicts: Record<VerdictSlug, Verdict> = {
  'soap-smoldering': {
    slug: 'soap-smoldering',
    name: 'Certified Soap-Smoldering',
    register: 'porcelain',
    fx: 'steam-glow',
    subhead: 'You wash. Daily. With soap. Unreasonably hot of you.',
    body: "The men in these posters are fictional. You're proof the standard can be met by a real one. Frame this and hang it somewhere the others will see it and quietly panic.",
    pledgeCue: 'Certified or not — sign the oath.',
    ogImage: '/og/verdict-soap-smoldering.png',
    meta: {
      title: 'Certified Soap-Smoldering | got soap?',
      description: 'You wash. Daily. With soap. Unreasonably hot of you.',
    },
  },
  'suds-curious': {
    slug: 'suds-curious',
    name: 'Suds-Curious',
    register: 'marble',
    fx: 'gold',
    subhead:
      "There's a clean man in there. We can hear him tapping. Let him out.",
    body: "You own soap. You've met the loofah. You just keep betting a spritz will cover the gap between you and an actual shower, and that bet has never once paid out. Close it. One honest lather and you're on the good list. It's a short list. The view is excellent.",
    pledgeCue: 'Certified or not — sign the oath.',
    ogImage: '/og/verdict-suds-curious.png',
    meta: {
      title: 'Suds-Curious | got soap?',
      description:
        "There's a clean man in there. We can hear him tapping. Let him out.",
    },
  },
  'axe-dependent': {
    slug: 'axe-dependent',
    name: 'Axe-Dependent',
    register: 'smoke',
    fx: 'chrome',
    subhead: 'We could smell you from the results page.',
    body: "What you're calling a signature scent is a rumor about a shower you didn't take, and everyone in a five-foot radius has already heard it. The good news is almost insulting: soap costs four dollars, works on contact, and asks nothing of your personality. Seek lather immediately.",
    pledgeCue: 'Certified or not — sign the oath.',
    ogImage: '/og/verdict-axe-dependent.png',
    meta: {
      title: 'Axe-Dependent | got soap?',
      description: 'We could smell you from the results page.',
    },
  },
  'thirst-hazard': {
    slug: 'thirst-hazard',
    name: 'Public Thirst Hazard',
    register: 'smoke',
    fx: 'chrome',
    subhead:
      'This has been a public thirst announcement. You were the announcement.',
    body: "You are why the group chat has a code word. You are why the rideshare cracks a window in January. Here's the part nobody tells you: this is a maintenance problem, not a character one, and maintenance is the easiest kind to fix. Soap. Water. The wild decision to use both. Nobody's beyond redemption. But the clock started the moment you read this.",
    pledgeCue: 'Redemption starts in the shower.',
    ogImage: '/og/verdict-thirst-hazard.png',
    meta: {
      title: 'Public Thirst Hazard | got soap?',
      description:
        'This has been a public thirst announcement. You were the announcement.',
    },
  },
};

/** Ordered verdict list (for getStaticPaths). */
export const verdictList: Verdict[] = [
  verdicts['soap-smoldering'],
  verdicts['suds-curious'],
  verdicts['axe-dependent'],
  verdicts['thirst-hazard'],
];

/** Shared pledge CTA label (→ /pledge). */
export const pledgeCtaLabel = 'Take the Lather Pledge →';

/**
 * Share default text (§6.4, verbatim shape). Domain derives from SITE_URL so the
 * future custom-domain swap is a one-line change.
 * @example "I took the Sniff Test. Verdict: Suds-Curious. #GotSoap gotsoap.netlify.app"
 */
export function shareDefault(name: string): string {
  const domain = SITE_URL.replace(/^https?:\/\//, '');
  return `I took the Sniff Test. Verdict: ${name}. #GotSoap ${domain}`;
}

/**
 * Quiz island config (serialized into the page as JSON; read by quiz.ts).
 * Bands + redirect base are the ONLY score-adjacent data crossing to the client,
 * and they never render a number — the client redirects by slug.
 */
export const quizConfig = {
  bands,
  redirectBase: '/sniff-test/',
  dwellMs: completion.dwellMs,
  total: chrome.total,
  progressTemplate: chrome.progressTemplate,
  ariaTemplate: chrome.ariaTemplate,
};
