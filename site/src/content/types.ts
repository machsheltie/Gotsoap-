/**
 * types.ts — shared copy/content types.
 *
 * All campaign + CWAAA copy flows through typed modules in src/content/ so it
 * can be swept before launch (PRD §13). Phase 1 route modules (home.ts, psas.ts,
 * sniffTest.ts, pledge.ts, crisis.ts, about.ts, notFound.ts) import these shapes.
 */

/** A navigable link. `href` is site-relative (leading slash). */
export interface NavLink {
  label: string;
  href: string;
}

/** Global navigation (copy-deck §1). */
export interface NavContent {
  /** The "got soap?" wordmark (Oswald lowercase). */
  markLabel: string;
  markHref: string;
  /** Primary uppercase links (Libre Franklin). */
  links: NavLink[];
  /** The subordinate ABOUT link. */
  quiet: NavLink;
}

/** A seam link where a label wraps a linked entity (footer funded-by / ©). */
export interface SeamLink {
  /** Text before the linked entity (may be empty). */
  prefix?: string;
  /** The linked text. */
  text: string;
  /** Text after the linked entity (may be empty). */
  suffix?: string;
  href: string;
}

/** Global footer (copy-deck §1). Author seam: 🧼 → 📋. */
export interface FooterContent {
  /** The movement line (Libre Franklin). */
  movementLine: string;
  /** The hashtag stack, verbatim. */
  hashtags: string;
  /** "Funded by …" → /crisis (the CWAAA seam). */
  fundedBy: SeamLink;
  /** © line → /about. */
  copyright: SeamLink;
  /** Deadpan parody disclaimer. */
  disclaimer: string;
}

/** First-visit scratch-n-sniff gag (copy-deck §1). Never a modal. */
export interface ScratchGagContent {
  /** Bolded opening clause. */
  headline: string;
  /** Remainder of the primary line. */
  body: string;
  /** Dismiss control label. */
  dismissLabel: string;
  /** Alternate lines shown at random on repeat first-visits. */
  rotation: string[];
}

/** Per-route SEO meta (copy-deck §2). */
export interface RouteMeta {
  title: string;
  description: string;
}

/** In-fiction utility labels (design.md §4, copy-deck read-first). */
export type ShareKind = 'spot' | 'verdict';
