/**
 * psas.ts — content for `/psas` + `/psas/<slug>`, transcribed VERBATIM from
 * `docs/copy/copy-deck-v2.md` §4 (index intro + case notes + download notice +
 * prev/next), §5 (poster alt text), and §2 (per-route SEO meta). Never invent
 * or paraphrase campaign copy (design.md §4, PRD §13).
 *
 * 🧼 Campaign voice throughout (design.md §4) — the archive is agency-authored.
 */
import type { RouteMeta } from './types';

/** The five canonical poster slugs (config/site.ts POSTERS, in campaign order). */
export type PosterSlug =
  | 'confident-man'
  | 'soap-smoldering'
  | 'unholy'
  | 'redemption'
  | 'thirst-announcement';

/* -------------------------------------------------------------------------
   4.1 — Index intro copy
   ---------------------------------------------------------------------- */

export interface PsasIndexContent {
  /** "# Public Service Announcements" */
  heading: string;
  /** "## Series One" */
  subheading: string;
  /** Intro paragraph, incl. the "Series Two arrives when the crisis does" line. */
  intro: string;
}

export const psasIndex: PsasIndexContent = {
  heading: 'Public Service Announcements',
  subheading: 'Series One',
  intro:
    'Five announcements in the public interest, issued untouched. Study them at your leisure. Bathe at your earliest. Series Two arrives when the crisis does.',
};

/* -------------------------------------------------------------------------
   4.2 — Case notes (deadpan, edged). Emphasis markers (*word*) from the deck
   are rendered as <em> — the wording is verbatim; only the markdown emphasis
   syntax is converted to its intended inline markup. Render with set:html.
   ---------------------------------------------------------------------- */

export const caseNotes: Record<PosterSlug, string> = {
  'confident-man':
    "A cologne ad selling nothing but soap. Our cowboy doesn't smell <em>like</em> masculinity — he defines it, rinses it off, and reapplies in the morning like a person with standards. The gaze says power. The tile says he owns more than one bar of soap and knows where both of them are. Confidence isn't the cologne. It's not needing it.",
  'soap-smoldering':
    "The smolder, patched to the current version: now with self-awareness. He's fresh <em>and knows it</em>, which is the hottest thing a man can be and, statistically, the rarest. You could skip the wash. You could layer the spray. You will still never smell like him — and everyone at brunch will know which one you are. Lather. Rinse. Respect.",
  unholy:
    "Some men leave a room speechless. Others leave a trail of Axe and a group chat full of screenshots. This one washes daily, with soap, which in the year of our Lord currently qualifies as a personality. Fragrance-ad drama, sermon-grade conviction: clean isn't a flex, it's the bare minimum, and he's wearing it like a crown.",
  redemption:
    'He sinned. He sprayed. He treated a squirt of aerosol like holy water for a body that had genuinely wronged the people standing next to it. Then, grace: a shower. A redemption arc told in steam, and the moral is short — deodorant is not divine intervention, and the gym does not count. Anyone can change. Some of you should start tonight.',
  'thirst-announcement':
    'No fog machine. No flex. A man who is scrubbed, sudsed, and, critically, <em>aware of it</em>: the "would introduce to Mom without a risk assessment" tier of clean. Consider this your notice. Personal hygiene is the floor, not a plot twist. This has been a public thirst announcement. Wash accordingly.',
};

/* -------------------------------------------------------------------------
   4.3 — Download notice
   ---------------------------------------------------------------------- */

export interface DownloadNoticeContent {
  heading: string;
  body: string[];
  /** Label for the download control — "Take one for the wall" (binding, design.md §4). */
  buttonLabel: string;
}

export const downloadNotice: DownloadNoticeContent = {
  heading: 'Take one for the wall.',
  body: [
    'Free for locker rooms, dorm hallways, break rooms, and interventions — planned or spontaneous.',
    'Attribution appreciated. Shame optional. Results not guaranteed but statistically likely.',
  ],
  buttonLabel: 'Take one for the wall',
};

/* -------------------------------------------------------------------------
   4.4 — Prev/next labels. The deck's "n−1"/"n+1" denote the TARGET poster's
   order, not literal text — callers pass the neighboring poster's `order`.
   ---------------------------------------------------------------------- */

export function prevSpotLabel(targetOrder: number): string {
  return `← SPOT NO. ${targetOrder}`;
}

export function nextSpotLabel(targetOrder: number): string {
  return `SPOT NO. ${targetOrder} →`;
}

/* -------------------------------------------------------------------------
   5 — Poster alt text (accessible + carries the joke). Verbatim. Never alt="".
   ---------------------------------------------------------------------- */

export const posterAltText: Record<PosterSlug, string> = {
  'confident-man':
    "A clean-cut man stands shirtless against steamy white tile under the headline 'got soap?' Baked poster text: 'A clean man is a confident man. Lather up. Smell like effort.' Funded by Concerned Women Against Axe Abuse.",
  'soap-smoldering':
    "A lightly stubbled man leans on fogged tile beneath 'got soap?' Baked poster text: 'He's not just fresh — he's soap-smoldering. You could skip the wash… but you won't smell like him.'",
  unholy:
    "A brooding man in a towel emerges from dark chrome-lit smoke under a chrome 'got soap?' Baked poster text: 'Washes daily. Uncommon. Unholy. Unreasonably hot. Axe is not an exorcism.'",
  redemption:
    "A solemn, slicked-back man in smoky low light beneath a chrome 'got soap?' Baked poster text: 'Repent in warm water. Forgiveness is a full body cleanse. Deodorant isn't divine intervention.'",
  'thirst-announcement':
    "A confident Black man against warm amber marble under a gold-lit 'got soap?' Baked poster text: 'He's scrubbed. Sudsed. Seductive. And you? You need soap and self-awareness. This has been a public thirst announcement.'",
};

/* -------------------------------------------------------------------------
   2 — SEO / meta (per route, verbatim)
   ---------------------------------------------------------------------- */

export const psasIndexMeta: RouteMeta = {
  title: 'The PSAs — Series One | got soap?',
  description:
    'The public-service archive. Five thirst-trap hygiene PSAs, presented untouched. Study them. Then bathe.',
};

export const posterMeta: Record<PosterSlug, RouteMeta> = {
  'confident-man': {
    title: 'A Clean Man Is A Confident Man | got soap?',
    description:
      "Spot No. 1. Because your Axe body spray isn't fooling anyone, cowboy. Smell like effort.",
  },
  'soap-smoldering': {
    title: 'Soap-Smoldering | got soap?',
    description:
      'Spot No. 2. Because your "natural scent" is a threat, not a flex. Lather. Rinse. Respect.',
  },
  unholy: {
    title: 'Unholy | got soap?',
    description:
      'Spot No. 3. Because deodorant without a shower is just layering lies. Axe is not an exorcism.',
  },
  redemption: {
    title: 'The Redemption | got soap?',
    description:
      "Spot No. 4. Because cleansing isn't just for your sins. Deodorant isn't divine intervention.",
  },
  'thirst-announcement': {
    title: 'Public Thirst Announcement | got soap?',
    description:
      "Spot No. 5. Because your Tinder shouldn't come with a scratch-n-sniff warning. Wash accordingly.",
  },
};
