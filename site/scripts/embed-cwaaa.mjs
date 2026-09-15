#!/usr/bin/env node
/**
 * embed-cwaaa.mjs — INTERIM co-hosting of the standalone CWAAA site.
 *
 * Owner decision, 2026-09-15: CWAAA goes up on the campaign deployment NOW,
 * under /cwaaa, until the coalition gets its own Netlify site and real origin
 * (CWAAA launch decision CW-D07). The footer's "Funded by …" seam points at
 * CWAAA_SITE_URL (site/src/config/site.ts), which is '/cwaaa' for exactly as
 * long as this arrangement lasts.
 *
 * This runs AFTER `astro build`, from the Netlify build command — never from
 * `npm run build`, so gates, fidelity, and local builds keep seeing the
 * campaign site alone.
 *
 * It does not touch a single file in cwaaa/src. The CWAAA app still builds as
 * a root-hosted site; this script copies its dist into site/dist/cwaaa and
 * rewrites the root-absolute URLs in the COPIED OUTPUT so they resolve under
 * the /cwaaa prefix. Un-embedding is deleting this script, the Netlify command
 * step, and the one config line.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, appendFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(siteRoot, '..');
const cwaaaRoot = join(repoRoot, 'cwaaa');
const siteDist = join(siteRoot, 'dist');
const cwaaaDist = join(cwaaaRoot, 'dist');

/** The mount point. Keep in sync with CWAAA_SITE_URL in src/config/site.ts. */
const BASE = '/cwaaa';

const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, stdio: 'inherit', env: process.env });

if (!existsSync(siteDist)) {
  console.error('embed-cwaaa: site/dist missing — run `astro build` first.');
  process.exit(1);
}

// 1. Build the CWAAA app in place. Netlify installs only site/'s dependencies,
//    so install the coalition app's own first (npm ci when its lockfile is
//    usable, npm install as the fallback).
console.log('embed-cwaaa: installing CWAAA dependencies');
if (!existsSync(join(cwaaaRoot, 'node_modules'))) {
  try {
    run('npm', ['ci', '--no-audit', '--no-fund'], cwaaaRoot);
  } catch {
    run('npm', ['install', '--no-audit', '--no-fund'], cwaaaRoot);
  }
}

console.log('embed-cwaaa: building CWAAA');
rmSync(cwaaaDist, { recursive: true, force: true });
run('npm', ['run', 'build'], cwaaaRoot);

// 2. Copy the built coalition site under the mount point.
const mounted = join(siteDist, BASE.slice(1));
rmSync(mounted, { recursive: true, force: true });
cpSync(cwaaaDist, mounted, { recursive: true });

// 3. Rewrite root-absolute URLs in the copied output only.
//    Skipped: protocol-relative (//host), absolute (https://), fragments,
//    mailto:/tel:, and anything already carrying the prefix.
const REWRITABLE = /\.(html|css|js)$/;
const prefix = (url) => {
  if (!url.startsWith('/') || url.startsWith('//') || url.startsWith(`${BASE}/`) || url === BASE) {
    return url;
  }
  return url === '/' ? `${BASE}/` : `${BASE}${url}`;
};

/** Rewrite one attribute value, which may be a comma-separated srcset. */
const prefixList = (value) =>
  value
    .split(',')
    .map((candidate) => {
      const match = candidate.match(/^(\s*)(\S+)(.*)$/);
      return match ? `${match[1]}${prefix(match[2])}${match[3]}` : candidate;
    })
    .join(',');

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

let rewritten = 0;
for (const file of walk(mounted)) {
  if (!REWRITABLE.test(file)) continue;
  const before = readFileSync(file, 'utf8');
  let after = before;

  if (file.endsWith('.html')) {
    // Authored and Astro-emitted URL attributes.
    after = after.replace(
      /\b(href|src|srcset|imagesrcset|poster|action|content)="([^"]*)"/g,
      (whole, attr, value) => {
        if (attr === 'content' && !value.startsWith('/')) return whole;
        const next = attr === 'srcset' || attr === 'imagesrcset' ? prefixList(value) : prefix(value);
        return next === value ? whole : `${attr}="${next}"`;
      },
    );
  }

  // Stylesheet url() references — the self-hosted /fonts/… faces above all.
  after = after.replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (whole, quote, url) => {
    const next = prefix(url);
    return next === url ? whole : `url(${quote}${next}${quote})`;
  });

  // Asset paths inside client scripts.
  after = after.replace(/(['"`])(\/(?:_astro|fonts)\/[^'"`]*)\1/g, (whole, quote, url) => {
    const next = prefix(url);
    return next === url ? whole : `${quote}${next}${quote}`;
  });

  if (after !== before) {
    writeFileSync(file, after);
    rewritten += 1;
  }
}

// 4. Carry CWAAA's own redirect rules into the deployed _redirects, prefixed.
//    Netlify reads only the publish root's file.
const cwaaaRedirects = join(cwaaaDist, '_redirects');
if (existsSync(cwaaaRedirects)) {
  const rules = readFileSync(cwaaaRedirects, 'utf8')
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return null;
      const [from, to, ...rest] = trimmed.split(/\s+/);
      return `${prefix(from)}  ${prefix(to)}  ${rest.join(' ')}`.trimEnd();
    })
    .filter(Boolean);

  if (rules.length > 0) {
    appendFileSync(
      join(siteDist, '_redirects'),
      `\n# CWAAA's own rules, mounted under ${BASE} (embed-cwaaa.mjs).\n${rules.join('\n')}\n`,
    );
  }
  rmSync(join(mounted, '_redirects'), { force: true });
}

console.log(`embed-cwaaa: mounted CWAAA at ${BASE} (${rewritten} files rewritten)`);
