// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Got Soap? — static campaign site. https://astro.build/config
// SITE_URL is duplicated here as a literal because astro.config runs before
// TS path resolution; src/config/site.ts is the single source of truth for app code.
export default defineConfig({
  site: 'https://gotsoap.netlify.app',
  output: 'static',
  integrations: [sitemap()],
  image: {
    // sharp is Astro's default image service; declared for clarity. Powers the
    // AVIF/WebP/srcset derivatives emitted by <Image> in PosterImage.astro.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});
