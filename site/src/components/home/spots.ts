/**
 * spots.ts — Home "spot" staging (design.md §7 "Spot staging"). BUILD-LAYER,
 * not copy: this module holds ONLY the anti-template staging (per-poster layout,
 * the "SPOT NO. n" eyebrow, the "View spot →" control label) and zips it onto
 * the two sources of truth:
 *   - structure (order, slug, register, title) ← config/site.ts POSTERS
 *   - copy (pull quote, alt text)             ← content/copy.ts posterCopy
 *
 * No user-facing campaign string is authored here; pull quote + alt come
 * verbatim from copy.ts. (The "SPOT NO. n" eyebrow and "View spot →" label are
 * structural build labels — copy.ts does not carry them.)
 */
import { POSTERS, type Register } from '../../config/site';
import { posterCopy } from '../../content/copy';

/**
 * Per-spot layout. Each spot is staged like an ad in ITS poster's world (never
 * one image-left row ×5); no two adjacent spots share a layout.
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
  /** "SPOT NO. n" eyebrow (structural build label). */
  eyebrow: string;
  /** Display headline — the poster's angle/title (from POSTERS). */
  title: string;
  /** The "Because…" pull-quote (copy.ts posterCopy[slug].pull). */
  pullQuote: string;
  /** Voice-carrying alt text (copy.ts posterCopy[slug].alt). */
  alt: string;
  /** In-fiction "view" control label (structural build label). */
  viewLabel: string;
  layout: SpotLayout;
}

/** Per-slug staging: the layout each spot is composed in. */
const SPOT_LAYOUT: Record<string, SpotLayout> = {
  'confident-man': 'tile-left',
  'soap-smoldering': 'tile-ghost',
  unholy: 'monument',
  redemption: 'sermon',
  'thirst-announcement': 'editorial',
};

export const spots: SpotContent[] = POSTERS.map((p) => {
  const copy = posterCopy[p.slug as keyof typeof posterCopy];
  const layout = SPOT_LAYOUT[p.slug];
  if (!copy || !layout) {
    throw new Error(`spots.ts: missing copy/layout for poster slug "${p.slug}"`);
  }
  return {
    order: p.order,
    slug: p.slug,
    register: p.register,
    eyebrow: `SPOT NO. ${p.order}`,
    title: p.title,
    pullQuote: copy.pull,
    alt: copy.alt,
    viewLabel: 'View spot →',
    layout,
  };
});
