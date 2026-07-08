/**
 * home.ts — Home (`/`) copy, transcribed VERBATIM from copy-deck-v2.md §3.
 *
 * The home "walk" (design.md §7): steam-clear hero → five individually-staged
 * spots → Sniff Test insert → Movement (CWAAA letterhead seam) → pledge CTA
 * band → reveal beat. Every string below is copy-deck §3 verbatim — never
 * paraphrase. Straight apostrophes/quotes match the deck; em dashes (—) and
 * ellipses (…) are preserved only where the deck uses them. Poster
 * title/register/order come from the POSTERS registry (single source of
 * truth); this module only adds the per-spot copy + staging.
 *
 * Author: 🧼 Campaign — EXCEPT `movement`, which is a pure 📋 CWAAA seam
 * (the one designed collision on this page, per design.md §4/§7).
 */
import { POSTERS, type Register } from '../config/site';

/** A labelled, in-fiction navigation control. */
export interface CtaLink {
  label: string;
  href: string;
}

/* ─────────────────────────  3.1 Hero  ───────────────────────── */

export interface HeroContent {
  /** The live "got soap?" logotype (Oswald lowercase, rendered as real text). */
  headline: string;
  /** The "Because…" subhead. */
  subhead: string;
  /** Lower-third scroll cue. */
  scrollCue: string;
}

export const hero: HeroContent = {
  headline: `got soap?`,
  subhead: `Because he thinks the steam is hiding it. It never was.`,
  scrollCue: `Keep scrolling. It only gets cleaner. He didn't.`,
};

/* ─────────────────────────  3.2 Spots  ───────────────────────── */

/**
 * Per-spot staging. Each spot lives in ITS poster's world — layouts are
 * genuinely different compositions (anti-template rule, design.md §7), never
 * one image-left row ×5. No two adjacent spots share a `layout`.
 */
export type SpotLayout =
  | 'tile-left' // 1: porcelain, type-left / poster-right, tile-and-grout
  | 'tile-ghost' // 2: porcelain, poster-left / type-right, ghost numeral
  | 'monument' // 3: smoke, full-bleed, monumental centered
  | 'sermon' // 4: smoke, poster-right / sermon column + vertical rule
  | 'editorial'; // 5: marble, GQ two-column spread (warm|dark toggle)

export interface SpotContent {
  order: 1 | 2 | 3 | 4 | 5;
  slug: string;
  register: Register;
  /** "SPOT NO. n" eyebrow (Libre Franklin). */
  eyebrow: string;
  /** Display headline — the poster's angle/title (Oswald + register FX). */
  title: string;
  /** The "Because…" pull-quote (Jost), copy-deck §3.2 verbatim. */
  pullQuote: string;
  /** Voice-carrying alt text, copy-deck §5 verbatim. */
  alt: string;
  /** In-fiction "view" control label, copy-deck §3.2. */
  viewLabel: string;
  layout: SpotLayout;
}

/** Per-slug spot copy + staging, merged onto the POSTERS registry below. */
const SPOT_DETAIL: Record<
  string,
  { pullQuote: string; alt: string; layout: SpotLayout }
> = {
  'confident-man': {
    pullQuote: `Because your Axe body spray isn't fooling anyone, cowboy.`,
    alt: `A clean-cut man stands shirtless against steamy white tile under the headline 'got soap?' Baked poster text: 'A clean man is a confident man. Lather up. Smell like effort.' Funded by Concerned Women Against Axe Abuse.`,
    layout: 'tile-left',
  },
  'soap-smoldering': {
    pullQuote: `Because "it's just my natural scent" has never once been good news.`,
    alt: `A lightly stubbled man leans on fogged tile beneath 'got soap?' Baked poster text: 'He's not just fresh — he's soap-smoldering. You could skip the wash… but you won't smell like him.'`,
    layout: 'tile-ghost',
  },
  unholy: {
    pullQuote: `He washes. Daily. With soap. In this economy, that's basically a miracle.`,
    alt: `A brooding man in a towel emerges from dark chrome-lit smoke under a chrome 'got soap?' Baked poster text: 'Washes daily. Uncommon. Unholy. Unreasonably hot. Axe is not an exorcism.'`,
    layout: 'monument',
  },
  redemption: {
    pullQuote: `He sinned. He sprayed. He saw the loofah. Anyone can change.`,
    alt: `A solemn, slicked-back man in smoky low light beneath a chrome 'got soap?' Baked poster text: 'Repent in warm water. Forgiveness is a full body cleanse. Deodorant isn't divine intervention.'`,
    layout: 'sermon',
  },
  'thirst-announcement': {
    pullQuote: `He's scrubbed, sudsed, and would survive meeting your mother. And you?`,
    alt: `A confident Black man against warm amber marble under a gold-lit 'got soap?' Baked poster text: 'He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness. This has been a public thirst announcement.'`,
    layout: 'editorial',
  },
};

export const spots: SpotContent[] = POSTERS.map((p) => {
  const detail = SPOT_DETAIL[p.slug];
  if (!detail) {
    throw new Error(`home.ts: no spot copy for poster slug "${p.slug}"`);
  }
  return {
    order: p.order,
    slug: p.slug,
    register: p.register,
    eyebrow: `SPOT NO. ${p.order}`,
    title: p.title,
    pullQuote: detail.pullQuote,
    alt: detail.alt,
    viewLabel: 'View spot →',
    layout: detail.layout,
  };
});

/* ─────────────────────  3.3 Sniff Test insert  ───────────────────── */

export interface SniffInsertContent {
  heading: string;
  body: string;
  cta: CtaLink;
  /** Montserrat credit line — the CWAAA fingerprint on a campaign card. */
  credit: string;
}

export const sniffInsert: SniffInsertContent = {
  heading: `Seven questions between you and the truth your group chat already knows.`,
  body: `One honest verdict. No wrong answers — only wet ones.`,
  cta: { label: 'Take the Sniff Test →', href: '/sniff-test' },
  credit: `Administered by CWAAA field assessors. Assessment CW-7. Results forwarded automatically.`,
};

/* ───────────────  3.4 The Movement — CWAAA letterhead seam 📋  ─────────────── */

/** A letterhead body line; `strong` (if present) leads the line in bold. */
export interface MovementLine {
  strong?: string;
  text: string;
}

export interface MovementContent {
  org: string;
  subhead: string;
  body: MovementLine[];
  cta: CtaLink;
}

export const movement: MovementContent = {
  org: `CONCERNED WOMEN AGAINST AXE ABUSE`,
  subhead: `Office of Lather Compliance — Memorandum No. 26-114`,
  body: [
    { text: `The men are not the problem. The men are, in most cases, lovely.` },
    {
      strong: `The fog is the problem.`,
      text: ` We intend to lift it. In writing. With copies filed.`,
    },
    {
      text: `Two million women. One demand. Soap, applied regularly, as directed.`,
    },
  ],
  cta: { label: 'Read the full brief →', href: '/crisis' },
};

/* ─────────────────────  3.5 Pledge CTA band  ───────────────────── */

export interface PledgeBandContent {
  heading: string;
  body: string;
  cta: CtaLink;
}

export const pledgeBand: PledgeBandContent = {
  heading: `Join the movement. Put it in writing.`,
  body: `Because "I usually shower" is not a hygiene routine. It's a confession.`,
  cta: { label: 'Take the Lather Pledge →', href: '/pledge' },
};

/* ─────────────────────────  3.6 Reveal beat  ───────────────────────── */

export interface RevealContent {
  line: string;
  attribution: string;
  cta: CtaLink;
}

export const reveal: RevealContent = {
  line: `None of these men are real. The problem is very, very real.`,
  attribution: `Got Soap? is a satirical campaign by Hope2 Studio.`,
  cta: { label: "See who's behind it →", href: '/about' },
};
