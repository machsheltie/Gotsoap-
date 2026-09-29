import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { NOTICES } from '../src/copy.mjs';

const DESIGN = new URL('../design.md', import.meta.url);
const SPEC = new URL('../../docs/superpowers/specs/2026-09-29-office-error-site-design.md', import.meta.url);

// Normalizes filesystem trivia only (spec §3): CRLF, trailing spaces, outer blank lines.
export function normalize(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n').map((l) => l.trimEnd());
  while (lines.length && lines[0] === '') lines.shift();
  while (lines.length && lines.at(-1) === '') lines.pop();
  return lines;
}

// The first ```text fence after the given heading line.
export function authorityBlock(file, heading) {
  const src = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const at = src.indexOf(`\n${heading}\n`);
  assert.notEqual(at, -1, `heading not found: ${heading}`);
  const open = src.indexOf('```text\n', at);
  const close = src.indexOf('\n```', open + 8);
  return normalize(src.slice(open + 8, close));
}

const SOURCES = [
  ['first_access', DESIGN, '### FIRST ACCESS'],
  ['same_session_refresh', DESIGN, '### SAME-SESSION REFRESH'],
  ['later_return', DESIGN, '### LATER RETURN'],
  ['continued_interest', DESIGN, '### CONTINUED INTEREST'],
  ['fallback', SPEC, '### 3.5 Fallback (OLC-D01, owner-approved)'],
];

for (const [state, file, heading] of SOURCES) {
  test(`copy.mjs ${state} equals its authority`, () => {
    assert.deepEqual(NOTICES[state], authorityBlock(file, heading));
  });
}

test('fallback makes no recognition claim', () => {
  const text = NOTICES.fallback.join('\n');
  for (const claim of ['log entry', 'RECORDING', 'Status', 'Terminal', 'Contact', '[']) {
    assert.ok(!text.includes(claim), `fallback must not contain "${claim}"`);
  }
});

import { blocks, plainText, toHtml, formatLocal } from '../src/render.mjs';

const first = new Date(2026, 8, 24, 22, 41, 7).toISOString();
const current = new Date(2026, 8, 29, 14, 7, 32).toISOString();
const VALUES = { terminalId: 'LC-7F3A-8804', firstContact: first, currentContact: current, count: 6 };
const FILLED = {
  '[generated identifier]': 'LC-7F3A-8804',
  '[stored local timestamp]': '2026-09-24 22:41:07',
  '[current local timestamp]': '2026-09-29 14:07:32',
  '[count]': '6',
};
const fill = (line) => Object.entries(FILLED).reduce((l, [k, v]) => l.replace(k, v), line);

test('formatLocal renders local wall-clock time', () => {
  assert.equal(formatLocal(current), '2026-09-29 14:07:32');
});

for (const [state, file, heading] of SOURCES) {
  test(`rendered ${state} equals its authority with values filled`, () => {
    const expected = authorityBlock(file, heading).map(fill).join('\n');
    assert.equal(plainText(blocks(state, state === 'fallback' ? null : VALUES)), expected);
  });
}

test('each notice has exactly one h1, its title line', () => {
  const titles = {
    first_access: 'NOTICE OF ADMINISTRATIVE CONTAINMENT',
    same_session_refresh: 'REFRESH REQUEST DENIED',
    later_return: 'NOTICE OF REPEAT ACCESS',
    continued_interest: 'NOTICE OF CONTINUED INTEREST',
    fallback: 'NOTICE OF ADMINISTRATIVE CONTAINMENT',
  };
  for (const [state, title] of Object.entries(titles)) {
    const h1s = blocks(state, VALUES).filter((b) => b.tag === 'h1');
    assert.equal(h1s.length, 1, state);
    assert.equal(h1s[0].lines[0][0].text, title);
  }
});

test('timestamps carry their ISO datetime', () => {
  const segs = blocks('later_return', VALUES).flatMap((b) => b.lines.flat()).filter((s) => s.datetime);
  assert.deepEqual(segs.map((s) => s.datetime), [first, current]);
});

test('toHtml escapes and structures the fallback', () => {
  const html = toHtml(blocks('fallback', null));
  assert.match(html, /^<p>OFFICE OF LATHER COMPLIANCE<br>Establishment Directive <span class="olc-keep">1961-A<\/span> \/ <span class="olc-keep">Sub-Section 4<\/span><\/p>\n<h1>NOTICE OF ADMINISTRATIVE CONTAINMENT<\/h1>/);
  assert.equal(toHtml([{ tag: 'p', lines: [[{ text: '<&">' }]] }]), '<p>&lt;&amp;&quot;&gt;</p>');
  assert.ok(!/role=|aria-live/.test(html));
});

test('administrative tokens are marked to stay whole', () => {
  const kept = (state) => blocks(state, VALUES).flatMap((b) => b.lines.flat()).filter((s) => s.keep).map((s) => s.text);
  assert.deepEqual(kept('later_return'), ['1961-A', 'Sub-Section 4', 'LC-7F3A-8804', '2026-09-24 22:41:07', '2026-09-29 14:07:32', '8804-X']);
  assert.deepEqual(kept('first_access'), ['1961-A', 'Sub-Section 4', '41-B', '8804-X']);
  assert.deepEqual(kept('continued_interest'), ['8804-X']);
  assert.match(toHtml(blocks('fallback', null)), /Directive <span class="olc-keep">1961-A<\/span> \/ <span class="olc-keep">Sub-Section 4<\/span>/);
});
