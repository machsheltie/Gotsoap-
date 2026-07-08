/**
 * global.ts — global chrome copy, transcribed VERBATIM from copy-deck-v2.md §1.
 * Do not paraphrase. Voice invariants live here and are reused site-wide.
 */
import type {
  FooterContent,
  NavContent,
  ScratchGagContent,
  SeamLink,
} from './types';

/** Nav — mark + uppercase links + quiet ABOUT (copy-deck §1). */
export const nav: NavContent = {
  markLabel: 'got soap?',
  markHref: '/',
  links: [
    { label: 'THE PSAS', href: '/psas' },
    { label: 'THE SNIFF TEST', href: '/sniff-test' },
    { label: 'THE PLEDGE', href: '/pledge' },
    { label: 'THE CRISIS', href: '/crisis' },
  ],
  quiet: { label: 'ABOUT', href: '/about' },
};

/** The hashtag stack — verbatim invariant. */
export const hashtags = '#GotSoap · #SoapyThirstTrap · #CleanManEnergy';

/** Funded-by seam → /crisis (verbatim invariant). */
export const fundedBy: SeamLink = {
  prefix: 'Funded by ',
  text: 'Concerned Women Against Axe Abuse',
  href: '/crisis',
};

/** © line → /about (verbatim invariant). */
export const copyright: SeamLink = {
  text: '© Stacey Breckel 2025 · A satirical spec campaign by Hope2 Studio →',
  href: '/about',
};

/** Footer — the poster footer, translated (copy-deck §1, design.md §7). */
export const footer: FooterContent = {
  movementLine: 'Join the movement. Smell like someone chose you back.',
  hashtags,
  fundedBy,
  copyright,
  disclaimer:
    'This is parody. Not affiliated with any brand, fragrance, publication, health organization, or your ex. No axes were abused in the making of this movement.',
};

/** Scratch-n-sniff gag — first visit, dismissible, never a modal (copy-deck §1). */
export const scratchGag: ScratchGagContent = {
  headline: 'This website is certified 100% scent-free.',
  body: 'Which already puts it ahead of him.',
  dismissLabel: 'Noted →',
  rotation: [
    "You can't smell this page. That's the nicest thing we can say about the genre.",
    'No fragrance detected. We ran it twice, to be fair to him.',
  ],
};
