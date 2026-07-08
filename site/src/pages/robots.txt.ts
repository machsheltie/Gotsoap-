/**
 * robots.txt.ts — allow-all robots policy + sitemap reference (PRD §6.3).
 *
 * @astrojs/sitemap (wired in astro.config.mjs) emits `sitemap-index.xml` and
 * automatically excludes status-code pages (404/500) from it — no filter
 * config needed there. This endpoint just points crawlers at it.
 */
import type { APIRoute } from 'astro';
import { absoluteUrl } from '../config/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap-index.xml')}
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
