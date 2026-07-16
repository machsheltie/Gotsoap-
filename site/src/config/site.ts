/**
 * site.ts — the single source of truth for site-wide constants.
 *
 * Every absolute URL on the site derives from SITE_URL so the future
 * custom-domain swap is a one-line change (PRD §12.4). All external/social
 * links live here; components render only the non-empty ones (PRD §13).
 */

/** Canonical origin. Netlify subdomain now; custom domain later (PRD §12.4). */
export const SITE_URL = 'https://gotsoap.netlify.app';

/** Real contact address — always render via obfuscateEmail() (PRD §5.6). */
export const CONTACT_EMAIL = 'hope2studio@yahoo.com';

/** GoatCounter site code (PRD §6.5). */
export const GOATCOUNTER_CODE = 'gotsoap';

/**
 * External / social links. `behance` is live now; `instagram`/`facebook`
 * are empty until the owner supplies URLs. Consumers MUST treat empty
 * strings as "do not render" — no dead icons, no "coming soon" (PRD §5.6).
 */
export const EXTERNAL_LINKS = {
  behance: 'https://www.behance.net/gallery/229005199/Got-Soap',
  instagram: '',
  facebook: '',
} as const;

export type ExternalLinkKey = keyof typeof EXTERNAL_LINKS;

/**
 * Buttondown newsletter — the Lather Pledge subscribes here (PRD §5.4;
 * ORCHESTRATOR-HANDOFF: Buttondown from launch, welcome email = copy deck §7.7).
 * Empty until the owner supplies the workspace username: the Form CW-1 embed
 * still renders and the SWORN success still shows, but the real subscription
 * POST is INERT (pledge.ts soft-fails + console.warns) until this is set.
 */
export const BUTTONDOWN_USERNAME = '';

/** Buttondown embed-subscribe endpoint for the configured username. */
export function buttondownEmbedUrl(): string {
  return `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;
}

/**
 * Build an absolute URL from a site-relative path.
 * @example absoluteUrl('/psas') => 'https://gotsoap.netlify.app/psas'
 */
export function absoluteUrl(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean === '/' ? '/' : clean.replace(/\/$/, '')}`;
}

/**
 * Scraper-safe email rendering. Returns the address as HTML numeric
 * character entities — humans and browsers decode it, naive regex
 * harvesters miss it. Output with Astro's `set:html` (e.g. inside a
 * <span> or a `mailto:`-prefixed <a> whose href is also entity-encoded).
 * @example <a set:html={`mailto:${obfuscateEmail()}`.replace(...)}/>
 */
export function obfuscateEmail(email: string = CONTACT_EMAIL): string {
  return Array.from(email)
    .map((ch) => `&#${ch.codePointAt(0)};`)
    .join('');
}

/** The three campaign registers keyed to poster mood (design.md §2/§7). */
export type Register = 'porcelain' | 'smoke' | 'marble';

/** A canonical poster. `file` is the untouched source jpg at the repo root. */
export interface Poster {
  slug: string;
  order: 1 | 2 | 3 | 4 | 5;
  register: Register;
  /** Angle/title from the CLAUDE.md poster table. */
  title: string;
  /** Original source filename at repo root (copied — never modified). */
  file: string;
}

/**
 * The five untouchable canonical posters, in campaign order.
 * Registers: 1–2 porcelain, 3–4 smoke, 5 marble (design.md §2/§7).
 * Derivatives live at src/assets/posters/<slug>.jpg; full-quality
 * download targets at public/downloads/<slug>.jpg.
 */
export const POSTERS: Poster[] = [
  {
    slug: 'confident-man',
    order: 1,
    register: 'porcelain',
    title: 'A Clean Man Is A Confident Man',
    file: 'cleanmansatire.jpg',
  },
  {
    slug: 'soap-smoldering',
    order: 2,
    register: 'porcelain',
    title: 'Soap-Smoldering',
    file: 'cleanmansatire2.jpg',
  },
  {
    slug: 'unholy',
    order: 3,
    register: 'smoke',
    title: 'Unholy',
    file: 'cleanmansatire3.jpg',
  },
  {
    slug: 'redemption',
    order: 4,
    register: 'smoke',
    title: 'The Redemption',
    file: 'cleanmansatire4.jpg',
  },
  {
    slug: 'thirst-announcement',
    order: 5,
    register: 'marble',
    title: 'Public Thirst Announcement',
    file: 'cleanmansatire5.jpg',
  },
];

/** Lookup a poster by slug. */
export function getPoster(slug: string): Poster | undefined {
  return POSTERS.find((p) => p.slug === slug);
}

/**
 * The home flagship poster — OWNER DECISION 2026-07-15 (specs.md §3.3):
 * **Unholy** — maximum stopping power, the campaign's sharpest provocation.
 * Gate G16 enforces the decision so it cannot silently un-happen.
 *
 * The Campaign beat derives its poster, title, register, and derived wash
 * from this one constant; a future owner change is this line and nothing
 * else — the route architecture does not change (§3.3).
 */
export const HOME_FLAGSHIP: 'thirst-announcement' | 'unholy' = 'unholy';
