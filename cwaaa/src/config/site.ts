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

/** Got Soap? campaign origin. Rendered only in campaign-credit context. */
export const GOT_SOAP_SITE_URL: string = env.PUBLIC_GOT_SOAP_SITE_URL ?? '';

/** Office of Lather Compliance origin. Deepest About seam only; never on Home. */
export const OFFICE_SITE_URL: string = env.PUBLIC_OFFICE_SITE_URL ?? '';

/** Shared Buttondown audience (same value as the campaign site). Not used on Home. */
export const BUTTONDOWN_USERNAME: string = env.PUBLIC_BUTTONDOWN_USERNAME ?? '';

/** GoatCounter site code. Empty disables analytics entirely. */
export const GOATCOUNTER_CODE: string = env.PUBLIC_GOATCOUNTER_CODE ?? '';

export const isConfigured = (value: string): boolean => value.trim().length > 0;
