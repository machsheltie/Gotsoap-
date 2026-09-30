// Inlines the modules into one classic script, pre-renders the fallback, and hashes for CSP.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { blocks, toHtml } from '../src/render.mjs';

const src = (file) => readFile(new URL(`../src/${file}`, import.meta.url), 'utf8');
const strip = (code) => code.split(/\r?\n/)
  .filter((line) => !/^import\s/.test(line))
  .map((line) => line.replace(/^export\s+/, ''))
  .join('\n');
const sha = (s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`;

// The failsafe: if the body script is blocked, DOMContentLoaded still reveals the fallback.
const headScript = "(()=>{const r=document.documentElement;r.classList.add('olc-resolving');document.addEventListener('DOMContentLoaded',()=>r.classList.remove('olc-resolving'));})();";
const modules = await Promise.all(['copy.mjs', 'engine.mjs', 'render.mjs', 'boot.mjs'].map(src));
const bodyScript = `(() => {\n${modules.map(strip).join('\n')}\n})();`;
const style = (await src('page.css')).replace(/\r\n/g, '\n').trim();

// Windows checkouts may carry CRLF; the shipped page is always LF.
const html = (await src('page.html')).replace(/\r\n/g, '\n')
  .replace('{{STYLE}}', () => style)
  .replace('{{HEAD_SCRIPT}}', () => headScript)
  .replace('{{BODY_SCRIPT}}', () => bodyScript)
  .replace('{{FALLBACK}}', () => toHtml(blocks('fallback', null)));

const csp = [
  "default-src 'none'",
  `script-src ${sha(headScript)} ${sha(bodyScript)}`,
  `style-src ${sha(style)}`,
  'img-src data:',
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  X-Robots-Tag: noindex, nofollow
  Referrer-Policy: no-referrer
  X-Content-Type-Options: nosniff
  Cache-Control: no-cache
`;

const dist = new URL('../dist/', import.meta.url);
await mkdir(dist, { recursive: true });
// Two identical files so no address ever rewrites to itself (netlify.toml): a self-rewrite
// is served as the real file with 200, which the Office never returns.
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('notice.html', dist), html);
await writeFile(new URL('_headers', dist), headers);
