import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
execFileSync(process.execPath, ['scripts/build.mjs'], { cwd: root });
const html = readFileSync(new URL('dist/index.html', root), 'utf8');
const headers = readFileSync(new URL('dist/_headers', root), 'utf8');
const sha = (s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`;
const inline = (tag) => [...html.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => m[1]);

test('every inline script and style is allowed by hash, and nothing else is', () => {
  const csp = headers.match(/Content-Security-Policy: (.+)/)[1];
  const scripts = inline('script');
  assert.equal(scripts.length, 2);
  for (const s of scripts) assert.ok(csp.includes(sha(s)), 'script hash missing');
  for (const s of inline('style')) assert.ok(csp.includes(sha(s)), 'style hash missing');
  assert.ok(!csp.includes('unsafe-inline'));
  assert.match(csp, /default-src 'none'/);
});

test('the bundle has no module syntax left and no network or cookie use', () => {
  const body = inline('script')[1];
  assert.ok(!/^\s*(import|export)\s/m.test(body));
  assert.ok(!/fetch\(|XMLHttpRequest|sendBeacon|document\.cookie|WebSocket/.test(body));
});

test('the fallback is pre-rendered in <main> and nothing else is visible text', () => {
  assert.match(html, /<main>\n<p>OFFICE OF LATHER COMPLIANCE<br>/);
  assert.ok(!html.includes('{{'));
  assert.ok(!/<a\s|<footer|<nav/.test(html));
  assert.match(html, /<title>OFFICE OF LATHER COMPLIANCE<\/title>/);
});

test('headers carry the robots, referrer and cache policy', () => {
  for (const line of ['X-Robots-Tag: noindex, nofollow', 'Referrer-Policy: no-referrer', 'X-Content-Type-Options: nosniff', 'Cache-Control: no-cache']) {
    assert.ok(headers.includes(line), line);
  }
});

test('the built page has LF line endings whatever the checkout uses', () => {
  assert.ok(!html.includes('\r'), 'CR found in dist/index.html');
});

test('notice.html and index.html are byte-identical copies of the approved page', () => {
  const index = readFileSync(new URL('dist/index.html', root));
  const notice = readFileSync(new URL('dist/notice.html', root));
  assert.ok(index.equals(notice), 'dist/notice.html differs from dist/index.html');
  assert.match(notice.toString('utf8'), /<title>OFFICE OF LATHER COMPLIANCE<\/title>/);
  assert.match(notice.toString('utf8'), /<main>\n<p>OFFICE OF LATHER COMPLIANCE<br>/);
});

test('netlify.toml forces 403 on both physical files before the catch-all to notice.html', () => {
  const toml = readFileSync(new URL('netlify.toml', root), 'utf8').replace(/\r\n/g, '\n');
  const rules = [...toml.matchAll(/\[\[redirects\]\]\n([\s\S]*?)(?=\n\[|\s*$)/g)].map((m) => Object.fromEntries(
    [...m[1].matchAll(/^\s*(\w+)\s*=\s*"?([^"\n]*)"?\s*$/gm)].map(([, k, v]) => [k, v]),
  ));
  assert.deepEqual(rules.map((r) => [r.from, r.to, r.status, r.force]), [
    ['/index.html', '/notice.html', '403', 'true'],
    ['/notice.html', '/index.html', '403', 'true'],
    ['/*', '/notice.html', '403', 'true'],
  ]);
});
