// @ts-check
import { defineConfig } from 'astro/config';

// CWAAA — standalone static advocacy site.
// `site` stays unset until the owner assigns the real CWAAA domain (CW-D07).
// Set CWAAA_SITE_URL in the deploy environment to enable canonical URLs; a
// sitemap integration is added only once that value exists.
const site = process.env.CWAAA_SITE_URL || undefined;

export default defineConfig({
  site,
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
