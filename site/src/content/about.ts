/**
 * about.ts — /about ("The Reveal") copy, transcribed VERBATIM from
 * copy-deck-v2.md §9 + §2. 🧼 Campaign voice, porcelain register, calm —
 * the only fourth-wall break on the site. Do not paraphrase.
 *
 * Paragraphs preserve the deck's own inline `*emphasis*` / `**strong**`
 * markdown markers verbatim; about.astro renders them with a tiny inline
 * formatter (mdInline) rather than inventing new copy structures.
 *
 * Section eyebrows ("WHY IT EXISTS", "CASE STUDY", "CREDIT & LEGAL") are NOT
 * copy-deck body copy — they are structural wayfinding labels lifted directly
 * from the deck's own section titles (§9.2/§9.3/§9.5), in the same spirit as
 * the site's existing "SPOT NO. n" eyebrow convention. No campaign lines were
 * invented for them.
 */
import type { RouteMeta } from './types';

/** Per-route SEO meta (copy-deck §2, verbatim). */
export const aboutMeta: RouteMeta = {
  title: 'The Reveal — Hope2 Studio | got soap?',
  description:
    "It was a portfolio piece the whole time. Here's the satire, the craft, and the woman who made it.",
};

/** §9.1 Opening. */
export interface AboutOpening {
  heading: string;
  paragraphs: string[];
}

export const opening: AboutOpening = {
  heading: 'It was a portfolio piece the whole time.',
  paragraphs: [
    'Got Soap? is a satirical hygiene-PSA campaign — a thirst-trap parody of the 90s "Got Milk?" ads, aimed at low-effort masculinity and the gallon of Axe some men deploy in place of a shower. It\'s told from the POV the satire aisle usually skips: the woman standing too close to it.',
    'The movement is fake. The craft is not. Neither is the frustration that started it.',
  ],
};

/** §9.2 Why it exists (Stacey's voice). Structural eyebrow, not verbatim body copy. */
export interface AboutWhyItExists {
  eyebrow: string;
  paragraphs: string[];
}

export const whyItExists: AboutWhyItExists = {
  eyebrow: 'Why it exists',
  paragraphs: [
    "This started on a dating app, where men who hadn't met soap since the Obama administration were holding out for a 10 — clean, manicured, model-adjacent — while they themselves looked, and presumably smelled, like damp disappointment.",
    '"Got Milk?" got a generation to drink milk by making it a status symbol and putting it where kids already looked. So I did it for soap. Made *clean* the flex. Made *effort* the thirst trap. Aimed the whole thing where the ads would actually land — locker rooms, men\'s rooms, GQ — and let the women do the sharing, because they\'ve been living the research the whole time.',
    "I'm not here to be nice about it. I'm here to be *right* about it, and funny, and unapologetic. That's the job.",
  ],
};

/** §9.3 Case study — three run-in-header paragraphs (concept, execution, system). */
export interface AboutCaseStudy {
  eyebrow: string;
  /** Each entry is one full paragraph, its bold lead-in included verbatim. */
  paragraphs: string[];
}

export const caseStudy: AboutCaseStudy = {
  eyebrow: 'Case study',
  paragraphs: [
    '**Concept & art direction.** Every poster walks one tightrope: visually seductive, thematically ridiculous. Thirst-trap imagery, PSA-sincere copy, engineered to provoke, amuse, and push.',
    '**Execution.** Male models generated with openart.ai — then everything that makes them *ads* was done by hand in Photoshop: compositing, lighting, steam, chrome, marble, and a type system built to stay legible across every skin tone and background in the set. Where a legible fix killed the tone, I moved the light instead of the type.',
    "**The system.** Three registers — porcelain, smoke, marble — a fictional sponsor with its own identity and its own deadpan voice, and a campaign that smolders and files paperwork in the same breath. Built like it's real, because that's the whole point.",
  ],
};

/** §9.4 The pitch + contact. Email itself is NOT stored here — see CONTACT_EMAIL /
 * obfuscateEmail() in config/site.ts; the page renders it obfuscated only. */
export interface AboutPitch {
  heading: string;
  paragraphs: string[];
  /** In-fiction Behance CTA label (config-gated on EXTERNAL_LINKS.behance). */
  behanceLabel: string;
}

export const pitch: AboutPitch = {
  heading: 'Want a campaign like this?',
  paragraphs: [
    "I'm **Stacey M. Breckel** — satirical creative director, graphic designer, content creator, and the studio behind **Hope2 Studio**. I make work that looks good *and* has a point of view: cheeky PSAs, full-scale parodies, brands that need teeth. There aren't many women working this lane. That's exactly why you want one.",
    "Let's make clean design dirty fun.",
  ],
  behanceLabel: 'See the full campaign on Behance →',
};

/**
 * §9.5 Credit / legal. Freepik attribution line is intentionally omitted here:
 * no Freepik-derived texture ships in v1 web assets (CLAUDE.md asset warnings,
 * PRD §8 licensing checks) — add it only if/when one does.
 */
export interface AboutCredit {
  eyebrow: string;
  paragraphs: string[];
}

export const credit: AboutCredit = {
  eyebrow: 'Credit & legal',
  paragraphs: [
    '© Stacey Breckel 2025. A satirical spec campaign by Hope2 Studio. All visual elements are parody and not affiliated with any brand, product, publication, or public health organization. Models generated with openart.ai; all art direction, compositing, and typography by hand.',
  ],
};
