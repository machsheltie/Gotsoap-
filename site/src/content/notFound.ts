/**
 * notFound.ts — /404 copy, transcribed VERBATIM from copy-deck-v2.md §10 + §2.
 * 📋 CWAAA-authored surface. Do not paraphrase; do not add campaign voice here.
 */
import type { RouteMeta } from './types';

/** Per-route SEO meta (copy-deck §2, verbatim). */
export const notFoundMeta: RouteMeta = {
  title: 'Missing | got soap?',
  description: "This page didn't shower. It's gone.",
};

/** The 404 notice body (copy-deck §10, verbatim). One joke, fully in-system. */
export interface NotFoundNotice {
  /** "MISSING" — the case-file headline. */
  heading: string;
  /** "This page didn't shower. It's gone." */
  body: string;
  /** The deadpan procedural advisory line. */
  advisory: string;
  /** "CASE CLOSED" — rendered stamp-red. */
  stamp: string;
  /** "Return to the movement →" — links home. */
  ctaLabel: string;
  ctaHref: string;
}

export const notFoundNotice: NotFoundNotice = {
  heading: 'MISSING',
  body: "This page didn't shower. It's gone.",
  advisory:
    'If found, do not approach. Report all sightings to the Office of Lather Compliance.',
  stamp: 'CASE CLOSED',
  ctaLabel: 'Return to the movement →',
  ctaHref: '/',
};
