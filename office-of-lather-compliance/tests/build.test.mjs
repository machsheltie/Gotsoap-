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
