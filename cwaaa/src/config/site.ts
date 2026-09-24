/**
 * site.ts — CWAAA runtime configuration.
 *
 * Every cross-site destination is optional and EMPTY until the owner assigns
 * real domains (PRD-cwaaa-web-v1 §Cross-site relationships). An empty value
 * renders no control at all: no dead links, no placeholder domains.
 */

const env = import.meta.env as Record<string, string | undefined>;

/** Canonical origin of this site. Empty until CW-D07 assigns it. */
export const SITE_URL: string = env.CWAAA_SITE_URL ?? '';

/** Got Soap? campaign origin. Rendered only in campaign-credit context.
 *  OWNER DECISION 2026-09-24: the one exception to "empty until real domains".
 *  Real domains are some way off, so the campaign's live Netlify origin stands
 *  in until then. It opens the home seam, the footer link, the About creator
 *  credit, and the Sniff Test path on /field-assessment. Swap it here, or set
 *  PUBLIC_GOT_SOAP_SITE_URL, when the real domain is bought. No trailing slash. */
export const GOT_SOAP_SITE_URL: string = env.PUBLIC_GOT_SOAP_SITE_URL ?? 'https://gotsoap.netlify.app';

/** A path on the campaign site, or '' when the origin is not configured. */
export const gotSoapUrl = (path: string): string =>
  GOT_SOAP_SITE_URL.trim() ? `${GOT_SOAP_SITE_URL.replace(/\/+$/, '')}${path}` : '';

/** Office of Lather Compliance origin. Deepest About seam only; never on Home. */
export const OFFICE_SITE_URL: string = env.PUBLIC_OFFICE_SITE_URL ?? '';

/** Shared Buttondown audience (same value as the campaign site). Not used on Home. */
export const BUTTONDOWN_USERNAME: string = env.PUBLIC_BUTTONDOWN_USERNAME ?? '';

/** GoatCounter site code. Empty disables analytics entirely. */
export const GOATCOUNTER_CODE: string = env.PUBLIC_GOATCOUNTER_CODE ?? '';

export const isConfigured = (value: string): boolean => value.trim().length > 0;

/**
 * Buttondown embed-subscribe endpoint for the configured username — the same
 * shared audience the Got Soap? pledge posts to (contract: one audience,
 * `BUTTONDOWN_USERNAME`). Empty username returns an empty action, which leaves
 * the no-JS form posting to the page itself rather than to a malformed URL;
 * scripts/pledge.ts reports NOT FILED in that state rather than certifying a
 * filing that never happened.
 */
export function buttondownEmbedUrl(): string {
  return isConfigured(BUTTONDOWN_USERNAME)
    ? `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`
    : '';
}
