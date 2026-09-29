import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access, KEY, randomHex, parsePersistent } from '../src/engine.mjs';

function memoryStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
  };
}

// One browser profile: localStorage persists, and each newSession() starts fresh sessionStorage.
function browser() {
  const b = { local: memoryStorage(), session: memoryStorage() };
  b.newSession = () => { b.session = memoryStorage(); };
  return b;
}

function clock(startIso) {
  let t = Date.parse(startIso);
  return () => new Date((t += 60_000));
}

let counter = 0;
const hex = (n) => (counter++).toString(16).toUpperCase().padStart(n, '0').slice(-n);

const visit = (b, now) => access({ local: b.local, session: b.session, now, randomHex: hex });
const stored = (b) => JSON.parse(b.local.getItem(KEY));
const storedSession = (b) => JSON.parse(b.session.getItem(KEY));

test('first access creates both records', () => {
  const b = browser();
  const r = visit(b, clock('2026-09-29T10:00:00.000Z'));
  assert.equal(r.state, 'first_access');
  const rec = stored(b);
  assert.deepEqual(Object.keys(rec).sort(), ['firstContact', 'lastContact', 'lifetimeAccessCount', 'reference', 'returnSessionCount', 'terminalId']);
  assert.equal(rec.returnSessionCount, 0);
  assert.equal(rec.lifetimeAccessCount, 1);
  assert.equal(rec.reference, '8804-X');
  assert.match(rec.terminalId, /^LC-[0-9A-F]{4}-8804$/);
  assert.equal(storedSession(b).sessionRefreshCount, 0);
});

test('reload in session 1 is refresh denied and does not advance', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  visit(b, now);
  const r = visit(b, now);
  assert.equal(r.state, 'same_session_refresh');
  assert.equal(stored(b).returnSessionCount, 0);
  assert.equal(stored(b).lifetimeAccessCount, 2);
  assert.equal(storedSession(b).sessionRefreshCount, 1);
});

test('session 2 after several reloads is later return with original first contact', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  const first = visit(b, now);
  visit(b, now); visit(b, now); visit(b, now);
  b.newSession();
  const r = visit(b, now);
  assert.equal(r.state, 'later_return');
  assert.equal(stored(b).returnSessionCount, 1);
  assert.equal(r.values.firstContact, first.values.firstContact);
  assert.ok(Date.parse(r.values.currentContact) > Date.parse(r.values.firstContact));
  assert.equal(r.values.terminalId, first.values.terminalId);
});

test('reload in session 2 is refresh denied', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  visit(b, now); b.newSession(); visit(b, now);
  assert.equal(visit(b, now).state, 'same_session_refresh');
  assert.equal(stored(b).returnSessionCount, 1);
});

test('D02 example: session 3 shows lifetime count 6, reload shows 7, session 4 shows 8', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  visit(b, now); visit(b, now); visit(b, now);          // session 1: load + 2 reloads
  b.newSession(); visit(b, now); visit(b, now);         // session 2: load + reload
  b.newSession();
  const s3 = visit(b, now);
  assert.equal(s3.state, 'continued_interest');
  assert.equal(s3.values.count, 6);
  const reload = visit(b, now);
  assert.equal(reload.state, 'continued_interest');     // never refresh denied at the threshold
  assert.equal(reload.values.count, 7);
  b.newSession();
  const s4 = visit(b, now);
  assert.equal(s4.state, 'continued_interest');
  assert.equal(s4.values.count, 8);
  assert.equal(stored(b).returnSessionCount, 3);
});

test('orphan session marker without a persistent record is first access', () => {
  const b = browser();
  b.session.setItem(KEY, JSON.stringify({ sessionId: 'X', sessionRefreshCount: 4 }));
  assert.equal(visit(b, clock('2026-09-29T10:00:00.000Z')).state, 'first_access');
});

test('malformed session record counts as no marker', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  visit(b, now);
  b.session.setItem(KEY, '{not json');
  assert.equal(visit(b, now).state, 'later_return');
});

const valid = {
  firstContact: '2026-09-20T10:00:00.000Z',
  lastContact: '2026-09-21T10:00:00.000Z',
  returnSessionCount: 1,
  lifetimeAccessCount: 3,
  reference: '8804-X',
  terminalId: 'LC-7F3A-8804',
};

test('a valid record parses', () => {
  assert.deepEqual(parsePersistent(JSON.stringify(valid)), valid);
});

const invalid = {
  'not JSON': '{oops',
  'JSON array': '[]',
  'extra field': JSON.stringify({ ...valid, visits: 3 }),
  'missing field': JSON.stringify((({ lastContact, ...r }) => r)(valid)),
  'terminal ID fine, another field missing': JSON.stringify((({ reference, ...r }) => r)(valid)),
  'wrong type': JSON.stringify({ ...valid, returnSessionCount: '1' }),
  'negative count': JSON.stringify({ ...valid, returnSessionCount: -1 }),
  'zero lifetime': JSON.stringify({ ...valid, lifetimeAccessCount: 0 }),
  'lastContact before firstContact': JSON.stringify({ ...valid, lastContact: '2026-09-19T10:00:00.000Z' }),
  'permissive date (no ms)': JSON.stringify({ ...valid, firstContact: '2026-09-20T10:00:00Z' }),
  'permissive date (date only)': JSON.stringify({ ...valid, firstContact: '2026-09-20' }),
  'other reference': JSON.stringify({ ...valid, reference: '8805-X' }),
  'lowercase terminal ID': JSON.stringify({ ...valid, terminalId: 'LC-7f3a-8804' }),
  'other terminal suffix': JSON.stringify({ ...valid, terminalId: 'LC-7F3A-3159' }),
};

for (const [name, raw] of Object.entries(invalid)) {
  test(`invalid persistent record (${name}) is replaced by first access`, () => {
    assert.equal(parsePersistent(raw), null);
    const b = browser();
    b.local.setItem(KEY, raw);
    const r = visit(b, clock('2026-09-29T10:00:00.000Z'));
    assert.equal(r.state, 'first_access');
    assert.equal(stored(b).lifetimeAccessCount, 1);
  });
}

test('damaged record whose replacement cannot be written is fallback', () => {
  const b = browser();
  b.local.setItem(KEY, '{oops');
  b.local.setItem = () => { throw new DOMException('full', 'QuotaExceededError'); };
  assert.deepEqual(visit(b, clock('2026-09-29T10:00:00.000Z')), { state: 'fallback', values: null });
});

test('blocked reads are fallback and write nothing', () => {
  const b = browser();
  let wrote = false;
  b.local = { getItem() { throw new DOMException('denied', 'SecurityError'); }, setItem() { wrote = true; } };
  assert.equal(visit(b, clock('2026-09-29T10:00:00.000Z')).state, 'fallback');
  assert.equal(wrote, false);
});

test('a session write that throws is fallback even after a good read', () => {
  const b = browser(); const now = clock('2026-09-29T10:00:00.000Z');
  visit(b, now);
  b.session.setItem = () => { throw new DOMException('denied', 'SecurityError'); };
  assert.equal(visit(b, now).state, 'fallback');
});

test('a write that silently does not persist is fallback', () => {
  const b = browser();
  b.local.setItem = () => {};
  assert.equal(visit(b, clock('2026-09-29T10:00:00.000Z')).state, 'fallback');
});

test('only one storage API available is fallback', () => {
  const b = browser();
  b.session = null;
  assert.equal(visit(b, clock('2026-09-29T10:00:00.000Z')).state, 'fallback');
});

test('clock moved backwards keeps the record valid', () => {
  const b = browser();
  visit(b, clock('2026-09-29T10:00:00.000Z'));
  b.newSession();
  const r = visit(b, clock('2026-09-01T10:00:00.000Z'));
  assert.equal(r.state, 'later_return');
  assert.notEqual(parsePersistent(b.local.getItem(KEY)), null);
  assert.equal(stored(b).lastContact, stored(b).firstContact);          // clamped in storage
  assert.equal(r.values.currentContact, '2026-09-01T10:01:00.000Z');   // displayed as the real clock
  b.newSession();
  assert.equal(visit(b, clock('2026-09-01T11:00:00.000Z')).state, 'continued_interest');
});

test('randomHex returns n uppercase hex characters', () => {
  for (const n of [4, 16]) assert.match(randomHex(n), new RegExp(`^[0-9A-F]{${n}}$`));
  assert.notEqual(randomHex(16), randomHex(16));
});
