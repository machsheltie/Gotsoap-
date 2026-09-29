# Office of Lather Compliance error site — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the Office's error-only site: one self-contained page, served with a 403
status at every address of `https://office-of-lather-compliance.netlify.app`, that shows the four
approved notices by browser-local session state and a truthful fallback otherwise.

**Architecture:** A pure, injectable state engine (`engine.mjs`) decides the state. A renderer turns
the approved copy (`copy.mjs`) into blocks and DOM. A build script concatenates the modules into one
inline classic script in `dist/index.html`, with the fallback notice pre-rendered in `<main>`, and
writes the Netlify `_headers` with hash-based CSP. Netlify rewrites every path to that page with
status 403.

**Tech Stack:** Node ≥ 22.12 (built-in `node:test`, `node:crypto`, `node:http`), plain ES modules,
`@playwright/test` (the only dependency, dev-only), and Netlify.

**Spec:** `docs/superpowers/specs/2026-09-29-office-error-site-design.md` (commit `514e68e`). Read it
before any task. Also read `office-of-lather-compliance/design.md` §3–§4.

## Global Constraints

- The July 28 under-design is fixed: white `#fff`, text `#111`, `"Courier New", Courier, monospace`
  only, one left column, no accent color, second typeface, decorative rule, animation, logo, or
  navigation. No design authority file (`design.md`, `DESIGN-SYSTEM.md`, the contract) is edited.
- Copy is `design.md` §4 verbatim, plus the fallback from spec §3.5. No other visible text exists
  except the tab title `OFFICE OF LATHER COMPLIANCE`.
- No footer, legal link, privacy notice, credit, or explanation ships (owner ruling, OLC-D03).
- Storage uses only `localStorage["olc.visit.v1"]` and `sessionStorage["olc.visit.v1"]`. No cookies,
  network requests, analytics, fingerprint inputs, or IP addresses.
- Terminal ID is `LC-XXXX-8804`, with the XXXX from `crypto.getRandomValues`.
- Timestamps display as `YYYY-MM-DD HH:MM:SS` in local time, and are stored as ISO UTC.
- Narrow screens (below 600px) use margin `24px 16px 48px 16px` and nothing else changes.
- HTTP status target is 403. If Netlify cannot serve it, stop and return to the owner. Do not fall
  back to 404 or 200.
- Tests run serially: `node --test --test-concurrency=1` and Playwright `workers: 1`. Noisy output
  goes to a file, and only the tail is read back.
- **House rule: commit only when the owner asks.** Tasks end at a checkpoint (`git status --short`
  scoped to the task's files) rather than a commit. Task 7 commits after the owner's review.
  Stage by name, never `git add -A`. Parallel sessions edit this repository; check `git status`
  before starting each task.
- The working directory for commands is `office-of-lather-compliance/` unless stated otherwise.

## Review Focus

1. **The body script is blocked** (CSP hash mismatch, extension, or corporate proxy). The visitor
   should see the fallback notice, never a blank page. The head script therefore also clears the
   hiding class on `DOMContentLoaded`. Pinned in Task 4, test "blocked body script reveals the
   fallback".
2. **The system clock moved backwards between visits.** The invariant has two halves:
   - Stored Office records must keep `lastContact >= firstContact`. A record already stored with
     `lastContact < firstContact` is corrupted chronology, so it is invalid (Task 2's invalid-record
     table keeps that case).
   - If the *current clock* is earlier than `firstContact`, a new-session transition clamps stored
     `lastContact` to `firstContact` instead of writing a temporally invalid record. The displayed
     Secondary Contact still shows the actual current local clock.

   The Office does not lose its records because the computer thinks it's September 1 again. Pinned
   in Task 2, test "clock moved backwards keeps the record valid".
3. **Paths that look like files** (`/favicon.ico`, `/robots.txt`, `/index.html`, `/.well-known/x`)
   should get the same Office page with 403, never a platform file or error. Pinned in Task 4
   (local server) and Task 7 (deployed).
4. **Forced-colors / high-contrast mode.** The text should stay readable, with nothing authored
   overriding the user agent. Pinned in Task 4, test "forced colors keeps text visible".
5. **A page opened with an opener inherits a copied session marker.** The result follows the marker
   rather than the tab gesture. Pinned in Task 4, test "the marker decides, not the tab".

---

### Task 1: Package scaffold and the copy module

**Files:**
- Create: `office-of-lather-compliance/package.json`
- Create: `office-of-lather-compliance/.gitignore`
- Create: `office-of-lather-compliance/src/copy.mjs`
- Test: `office-of-lather-compliance/tests/copy.test.mjs`

**Interfaces:**
- Produces: `NOTICES`, an object keyed by state id (`first_access`, `same_session_refresh`,
  `later_return`, `continued_interest`, `fallback`). Each value is a `string[]` with one entry per
  line and `''` for a blank line. Placeholders appear literally: `[generated identifier]`,
  `[stored local timestamp]`, `[current local timestamp]`, `[count]`.
- Produces (test helper, in `tests/copy.test.mjs`): `authorityBlock(file, heading) -> string[]`.
  Task 3 extends this file.

- [ ] **Step 1: Create `package.json` and `.gitignore`**

`office-of-lather-compliance/package.json`:

```json
{
  "name": "office-of-lather-compliance",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "build": "node scripts/build.mjs",
    "test": "node --test --test-concurrency=1 tests/*.test.mjs",
    "test:e2e": "npm run build && playwright test --project=e2e --reporter=dot",
    "renders": "npm run build && playwright test --project=renders --reporter=dot"
  },
  "devDependencies": {
    "@playwright/test": "^1.55.0"
  }
}
```

`office-of-lather-compliance/.gitignore`:

```gitignore
node_modules/
dist/
renders/
test-results/
playwright-report/
```

- [ ] **Step 2: Write the failing copy-fidelity test**

`office-of-lather-compliance/tests/copy.test.mjs`:

```js
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
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/copy.mjs'`.

- [ ] **Step 4: Create `src/copy.mjs`**

Build tooling concatenates modules into one script, so write single-line `import` statements only
and use no default exports.

```js
// The Office's notices, verbatim from ../design.md §4, and the owner-approved fallback
// (docs/superpowers/specs/2026-09-29-office-error-site-design.md §3.5).
// tests/copy.test.mjs holds this file to those sources; change wording there, not here.
export const NOTICES = {
  first_access: [
    'OFFICE OF LATHER COMPLIANCE',
    'Establishment Directive 1961-A / Sub-Section 4',
    '',
    'NOTICE OF ADMINISTRATIVE CONTAINMENT',
    '',
    'The requested resource is unavailable.',
    'Access has been suspended under Regulatory Standard 41-B.',
    '',
    'A log entry has been created.',
    '',
    'Reference: 8804-X',
    'Current Status: RECORDING',
    '',
    'Please remain available.',
  ],
  same_session_refresh: [
    'REFRESH REQUEST DENIED',
    '',
    'Your previous notice remains in effect.',
    '',
    'Reference: 8804-X',
    'Status: UNCHANGED',
  ],
  later_return: [
    'OFFICE OF LATHER COMPLIANCE',
    'Establishment Directive 1961-A / Sub-Section 4',
    '',
    'NOTICE OF REPEAT ACCESS',
    '',
    'Terminal ID: [generated identifier]',
    'First Contact: [stored local timestamp]',
    'Secondary Contact: [current local timestamp]',
    'Reference: 8804-X',
    '',
    'Your prior administrative notice remains active.',
    '',
    'Current Status: RECORDING',
    '',
    'Please remain available.',
  ],
  continued_interest: [
    'NOTICE OF CONTINUED INTEREST',
    '',
    'You have accessed this resource [count] times.',
    '',
    'No further action is required from you.',
    'Please discontinue independent review.',
    '',
    'Reference: 8804-X',
    'Status: OBSERVED',
  ],
  fallback: [
    'OFFICE OF LATHER COMPLIANCE',
    'Establishment Directive 1961-A / Sub-Section 4',
    '',
    'NOTICE OF ADMINISTRATIVE CONTAINMENT',
    '',
    'The requested resource is unavailable.',
    'Access has been suspended under Regulatory Standard 41-B.',
    '',
    'Reference: 8804-X',
    '',
    'Please remain available.',
  ],
};
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS, 6 tests. If a state fails, fix `copy.mjs` to match the authority; never the reverse.

- [ ] **Step 6: Checkpoint**

Run: `git status --short .`
Expected: only `package.json`, `.gitignore`, `src/`, `tests/` are new. No commit (house rule).

---

### Task 2: The state engine

**Files:**
- Create: `office-of-lather-compliance/src/engine.mjs`
- Test: `office-of-lather-compliance/tests/engine.test.mjs`

**Interfaces:**
- Produces: `KEY = 'olc.visit.v1'`.
- Produces: `access({ local, session, now, randomHex }) -> { state, values }`. `local` and `session`
  are Storage-like (`getItem`, `setItem`) or `null`; `now: () => Date`; `randomHex: (n) => string`.
  - `state` is one of `'first_access' | 'same_session_refresh' | 'later_return' |
    'continued_interest' | 'fallback'`.
  - `values` is `{ terminalId, firstContact, currentContact, count }` (ISO strings and a number), or
    `null` for fallback.
- Produces: `randomHex(n) -> string`, which returns `n` uppercase hex characters from
  `crypto.getRandomValues`.
- Produces: `parsePersistent(raw) -> record | null` and `parseSession(raw) -> record | null`.

- [ ] **Step 1: Write the failing engine tests**

`office-of-lather-compliance/tests/engine.test.mjs`:

```js
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
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/engine.mjs'`. The copy tests still pass.

- [ ] **Step 3: Implement `src/engine.mjs`**

```js
// Browser-local visit state for the Office, per docs/contracts/visit-state.v1.json.
// Pure: storage, time and randomness are injected. No DOM, no network.
export const KEY = 'olc.visit.v1';

const REFERENCE = '8804-X';
const TERMINAL_ID = /^LC-[0-9A-F]{4}-8804$/;
const PERSISTENT_FIELDS = ['firstContact', 'lastContact', 'returnSessionCount', 'lifetimeAccessCount', 'reference', 'terminalId'];
const SESSION_FIELDS = ['sessionId', 'sessionRefreshCount'];
const FALLBACK = { state: 'fallback', values: null };

function parseExact(raw, fields) {
  if (typeof raw !== 'string') return null;
  let value;
  try { value = JSON.parse(raw); } catch { return null; }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return null;
  const keys = Object.keys(value);
  if (keys.length !== fields.length || !fields.every((f) => Object.hasOwn(value, f))) return null;
  return value;
}

const isIso = (s) => typeof s === 'string' && Number.isFinite(Date.parse(s)) && new Date(s).toISOString() === s;
const isCount = (n, min) => Number.isInteger(n) && n >= min;

export function parsePersistent(raw) {
  const r = parseExact(raw, PERSISTENT_FIELDS);
  if (!r) return null;
  if (!isIso(r.firstContact) || !isIso(r.lastContact)) return null;
  if (Date.parse(r.lastContact) < Date.parse(r.firstContact)) return null;
  if (!isCount(r.returnSessionCount, 0) || !isCount(r.lifetimeAccessCount, 1)) return null;
  if (r.reference !== REFERENCE || typeof r.terminalId !== 'string' || !TERMINAL_ID.test(r.terminalId)) return null;
  return r;
}

export function parseSession(raw) {
  const s = parseExact(raw, SESSION_FIELDS);
  if (!s) return null;
  if (typeof s.sessionId !== 'string' || s.sessionId === '' || !isCount(s.sessionRefreshCount, 0)) return null;
  return s;
}

export function randomHex(n) {
  const bytes = new Uint8Array(Math.ceil(n / 2));
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, n).toUpperCase();
}

export function access({ local, session, now, randomHex: hex }) {
  let persistentRaw, sessionRaw;
  try {
    persistentRaw = local.getItem(KEY);
    sessionRaw = session.getItem(KEY);
  } catch {
    return FALLBACK;
  }

  // Captured before any write: a marker created below never turns this access into a refresh.
  const priorSession = parseSession(sessionRaw);
  const markerExisted = priorSession !== null;
  const prior = parsePersistent(persistentRaw);
  const at = now().toISOString();

  let record, sessionRecord;
  if (prior === null) {
    record = { firstContact: at, lastContact: at, returnSessionCount: 0, lifetimeAccessCount: 1, reference: REFERENCE, terminalId: `LC-${hex(4)}-8804` };
    sessionRecord = { sessionId: hex(16), sessionRefreshCount: 0 };
  } else if (markerExisted) {
    record = { ...prior, lifetimeAccessCount: prior.lifetimeAccessCount + 1 };
    sessionRecord = { ...priorSession, sessionRefreshCount: priorSession.sessionRefreshCount + 1 };
  } else {
    // Stored records keep lastContact >= firstContact. A current clock earlier than first contact
    // clamps the stored value; the displayed current contact still uses the real clock (`at`).
    const lastContact = Date.parse(at) < Date.parse(prior.firstContact) ? prior.firstContact : at;
    record = { ...prior, returnSessionCount: prior.returnSessionCount + 1, lifetimeAccessCount: prior.lifetimeAccessCount + 1, lastContact };
    sessionRecord = { sessionId: hex(16), sessionRefreshCount: 0 };
  }

  // Overwrite, then prove it. Nothing that implies recording renders on unverified persistence.
  const persistentOut = JSON.stringify(record);
  const sessionOut = JSON.stringify(sessionRecord);
  try {
    local.setItem(KEY, persistentOut);
    session.setItem(KEY, sessionOut);
    if (local.getItem(KEY) !== persistentOut || session.getItem(KEY) !== sessionOut) return FALLBACK;
  } catch {
    return FALLBACK;
  }

  const values = { terminalId: record.terminalId, firstContact: record.firstContact, currentContact: at, count: record.lifetimeAccessCount };
  if (record.returnSessionCount >= 2) return { state: 'continued_interest', values };
  if (prior !== null && markerExisted) return { state: 'same_session_refresh', values };
  if (record.returnSessionCount === 1) return { state: 'later_return', values };
  return { state: 'first_access', values };
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npm test > "$TEMP/olc-test.log" 2>&1; tail -15 "$TEMP/olc-test.log"`
Expected: `# fail 0`. Every engine test and every copy test passes.

- [ ] **Step 5: Checkpoint**

Run: `git status --short src tests`
Expected: `src/engine.mjs` and `tests/engine.test.mjs` are new. No commit.

---

### Task 3: Rendering

**Files:**
- Create: `office-of-lather-compliance/src/render.mjs`
- Modify: `office-of-lather-compliance/tests/copy.test.mjs` (append tests)

**Interfaces:**
- Consumes: `NOTICES` (Task 1).
- Produces: `formatLocal(iso) -> 'YYYY-MM-DD HH:MM:SS'` in local time.
- Produces: `blocks(state, values) -> Block[]`, where `Block = { tag: 'h1' | 'p', lines: Segment[][] }`
  and `Segment = { text: string, datetime?: string }`.
- Produces: `plainText(blocks) -> string`, with lines joined by `\n` and blocks by `\n\n`.
- Produces: `toHtml(blocks) -> string` (escaped markup, used by the build for the fallback).
- Produces: `mount(main, blocks) -> void` (DOM; exercised by Playwright in Task 4).

- [ ] **Step 1: Append the failing render tests to `tests/copy.test.mjs`**

```js
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
  assert.match(html, /^<p>OFFICE OF LATHER COMPLIANCE<br>Establishment Directive 1961-A \/ Sub-Section 4<\/p>\n<h1>NOTICE OF ADMINISTRATIVE CONTAINMENT<\/h1>/);
  assert.equal(toHtml([{ tag: 'p', lines: [[{ text: '<&">' }]] }]), '<p>&lt;&amp;&quot;&gt;</p>');
  assert.ok(!/role=|aria-live/.test(html));
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/render.mjs'`.

- [ ] **Step 3: Implement `src/render.mjs`**

```js
// Turns an approved notice into blocks, then into text, markup, or DOM.
// The status line stays ordinary text: no ARIA live region (spec §2.3).
import { NOTICES } from './copy.mjs';

const HEADING = /^(NOTICE OF [A-Z ]+|REFRESH REQUEST DENIED)$/;

export function formatLocal(iso) {
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function segments(line, values) {
  const match = line.match(/\[[a-z ]+\]/);
  if (!match) return [{ text: line }];
  const token = {
    '[generated identifier]': () => ({ text: values.terminalId }),
    '[stored local timestamp]': () => ({ text: formatLocal(values.firstContact), datetime: values.firstContact }),
    '[current local timestamp]': () => ({ text: formatLocal(values.currentContact), datetime: values.currentContact }),
    '[count]': () => ({ text: String(values.count) }),
  }[match[0]]();
  const before = line.slice(0, match.index);
  const after = line.slice(match.index + match[0].length);
  return [before && { text: before }, token, after && { text: after }].filter(Boolean);
}

export function blocks(state, values) {
  const out = [];
  let group = [];
  const flush = () => {
    if (group.length === 0) return;
    const heading = group.length === 1 && HEADING.test(group[0][0].text);
    out.push({ tag: heading ? 'h1' : 'p', lines: group });
    group = [];
  };
  for (const line of NOTICES[state]) {
    if (line === '') flush();
    else group.push(segments(line, values));
  }
  flush();
  return out;
}

export function plainText(bs) {
  return bs.map((b) => b.lines.map((segs) => segs.map((s) => s.text).join('')).join('\n')).join('\n\n');
}

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function toHtml(bs) {
  return bs.map((b) => {
    const inner = b.lines.map((segs) => segs.map((s) => (s.datetime
      ? `<time datetime="${escape(s.datetime)}">${escape(s.text)}</time>`
      : escape(s.text))).join('')).join('<br>');
    return `<${b.tag}>${inner}</${b.tag}>`;
  }).join('\n');
}

export function mount(main, bs) {
  const doc = main.ownerDocument;
  const nodes = bs.map((b) => {
    const el = doc.createElement(b.tag);
    b.lines.forEach((segs, i) => {
      if (i > 0) el.append(doc.createElement('br'));
      for (const s of segs) {
        if (s.datetime) {
          const t = doc.createElement('time');
          t.dateTime = s.datetime;
          t.textContent = s.text;
          el.append(t);
        } else {
          el.append(s.text);
        }
      }
    });
    return el;
  });
  main.replaceChildren(...nodes);
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npm test > "$TEMP/olc-test.log" 2>&1; tail -15 "$TEMP/olc-test.log"`
Expected: `# fail 0`.

- [ ] **Step 5: Checkpoint**

Run: `git status --short src tests`
Expected: `src/render.mjs` is new and `tests/copy.test.mjs` has grown. No commit.

---

### Task 4: Page shell, build, local server, and browser tests

**Files:**
- Create: `office-of-lather-compliance/src/page.html`
- Create: `office-of-lather-compliance/src/page.css`
- Create: `office-of-lather-compliance/src/boot.mjs`
- Create: `office-of-lather-compliance/scripts/build.mjs`
- Create: `office-of-lather-compliance/scripts/serve.mjs`
- Create: `office-of-lather-compliance/netlify.toml`
- Create: `office-of-lather-compliance/playwright.config.mjs`
- Test: `office-of-lather-compliance/tests/build.test.mjs`
- Test: `office-of-lather-compliance/tests/page.spec.mjs`

**Interfaces:**
- Consumes: `access`, `randomHex`, `KEY` (Task 2) and `blocks`, `mount`, `toHtml` (Task 3).
- Produces: `dist/index.html` and `dist/_headers`. `scripts/serve.mjs` serves `dist/index.html` with
  status 403 and the `_headers` values at every path on `127.0.0.1:4317` (or `PORT`).

- [ ] **Step 1: Write the page template, CSS, and boot entry**

`src/page.html`. Keep `<style>` and `<script>` contents on one line with the placeholder; the CSP
hashes cover exactly what sits between the tags.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>OFFICE OF LATHER COMPLIANCE</title>
<link rel="icon" href="data:,">
<style>{{STYLE}}</style>
<script>{{HEAD_SCRIPT}}</script>
</head>
<body>
<main>
{{FALLBACK}}
</main>
<script>{{BODY_SCRIPT}}</script>
</body>
</html>
```

`src/page.css`. The first rule is `design.md` §3 verbatim. The rest is spec §2.3/§4 and nothing more.

```css
body {
  margin: 48px 24px 80px 52px;
  max-width: 760px;
  background: #fff;
  color: #111;
  font: 16px/1.45 "Courier New", Courier, monospace;
}
body { overflow-wrap: anywhere; }
h1 { font-size: 1em; margin: 1em 0; }
.olc-resolving main { visibility: hidden; }
@media (max-width: 599px) {
  body { margin: 24px 16px 48px 16px; }
}
```

`src/boot.mjs`:

```js
// Runs once, synchronously, right after <main>. On any failure the pre-rendered fallback stays.
import { access, randomHex } from './engine.mjs';
import { blocks, mount } from './render.mjs';

const root = document.documentElement;
try {
  const storage = (name) => { try { return window[name]; } catch { return null; } };
  const result = access({ local: storage('localStorage'), session: storage('sessionStorage'), now: () => new Date(), randomHex });
  if (result.state !== 'fallback') mount(document.querySelector('main'), blocks(result.state, result.values));
} catch {
  // The fallback already in <main> is the truthful answer.
} finally {
  root.classList.remove('olc-resolving');
}
```

- [ ] **Step 2: Write the failing build test**

`tests/build.test.mjs`:

```js
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
```

Run: `npm test`
Expected: FAIL, because `scripts/build.mjs` does not exist.

- [ ] **Step 3: Implement `scripts/build.mjs`**

```js
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

const html = (await src('page.html'))
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
await writeFile(new URL('index.html', dist), html);
await writeFile(new URL('_headers', dist), headers);
```

Run: `npm test > "$TEMP/olc-test.log" 2>&1; tail -15 "$TEMP/olc-test.log"`
Expected: `# fail 0`.

- [ ] **Step 4: Add the local catch-all server, Netlify config, and Playwright config**

`scripts/serve.mjs`:

```js
// Local stand-in for the Netlify catch-all: every path gets dist/index.html, status 403, _headers.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist));
const headers = Object.fromEntries((await readFile(new URL('_headers', dist), 'utf8'))
  .split(/\r?\n/).slice(1).map((l) => l.trim()).filter(Boolean)
  .map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]));
const port = Number(process.env.PORT ?? 4317);

createServer((req, res) => {
  res.writeHead(403, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
  res.end(req.method === 'HEAD' ? undefined : html);
}).listen(port, '127.0.0.1');
```

`netlify.toml`:

```toml
# The Office of Lather Compliance: one error page at every address.
# Spec: docs/superpowers/specs/2026-09-29-office-error-site-design.md §5.
[build]
  base    = "office-of-lather-compliance"
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22.12.0"

[[redirects]]
  from   = "/*"
  to     = "/index.html"
  status = 403
  force  = true
```

`playwright.config.mjs`:

```js
import { defineConfig } from '@playwright/test';

// BASE_URL points the suite at a deployed origin (Task 7) without editing this file.
const LOCAL = 'http://127.0.0.1:4317';
const baseURL = process.env.BASE_URL ?? LOCAL;

export default defineConfig({
  testDir: 'tests',
  workers: 1,
  fullyParallel: false,
  retries: 0,
  use: { baseURL, browserName: 'chromium' },
  projects: [
    { name: 'e2e', testMatch: 'page.spec.mjs' },
    { name: 'renders', testMatch: 'renders.spec.mjs' },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'node scripts/serve.mjs', url: LOCAL, reuseExistingServer: false },
});
```

Install: `npm install > "$TEMP/olc-install.log" 2>&1; tail -5 "$TEMP/olc-install.log"`, then
`npx playwright install chromium > "$TEMP/olc-pw.log" 2>&1; tail -3 "$TEMP/olc-pw.log"`.

- [ ] **Step 5: Write the browser tests**

`tests/page.spec.mjs`:

```js
import { test, expect } from '@playwright/test';

const h1 = (page) => page.locator('h1');
const main = (page) => page.locator('main');
const FALLBACK_H1 = 'NOTICE OF ADMINISTRATIVE CONTAINMENT';

async function expectFallback(page) {
  await expect(h1(page)).toHaveText(FALLBACK_H1);
  await expect(main(page)).toContainText('Please remain available.');
  await expect(main(page)).not.toContainText('A log entry has been created.');
  await expect(main(page)).not.toContainText('RECORDING');
  await expect(main(page)).toBeVisible();
}

test('progression follows the session marker; count is every access', async ({ context }) => {
  const p1 = await context.newPage();
  await p1.goto('/');
  await expect(h1(p1)).toHaveText('NOTICE OF ADMINISTRATIVE CONTAINMENT');
  await expect(main(p1)).toContainText('A log entry has been created.');
  await p1.reload();
  await expect(h1(p1)).toHaveText('REFRESH REQUEST DENIED');

  const p2 = await context.newPage();                  // no opener: fresh sessionStorage
  await p2.goto('/records/1961/a?x=1');
  await expect(h1(p2)).toHaveText('NOTICE OF REPEAT ACCESS');
  await expect(main(p2)).toContainText(/Terminal ID: LC-[0-9A-F]{4}-8804/);
  await expect(main(p2)).toContainText(/First Contact: \d{4}-\d\d-\d\d \d\d:\d\d:\d\d/);
  await p2.reload();
  await expect(h1(p2)).toHaveText('REFRESH REQUEST DENIED');

  const p3 = await context.newPage();
  await p3.goto('/');
  await expect(h1(p3)).toHaveText('NOTICE OF CONTINUED INTEREST');
  await expect(main(p3)).toContainText('You have accessed this resource 5 times.');
  await p3.reload();
  await expect(h1(p3)).toHaveText('NOTICE OF CONTINUED INTEREST');
  await expect(main(p3)).toContainText('You have accessed this resource 6 times.');
});

test('the marker decides, not the tab', async ({ context }) => {
  const p1 = await context.newPage();
  await p1.goto('/');
  const [popup] = await Promise.all([p1.waitForEvent('popup'), p1.evaluate(() => { window.open('/', '_blank'); })]);
  await popup.waitForLoadState();
  const openerId = JSON.parse(await p1.evaluate(() => sessionStorage.getItem('olc.visit.v1'))).sessionId;
  const popupId = JSON.parse(await popup.evaluate(() => sessionStorage.getItem('olc.visit.v1'))).sessionId;
  const expected = openerId === popupId ? 'REFRESH REQUEST DENIED' : 'NOTICE OF REPEAT ACCESS';
  await expect(h1(popup)).toHaveText(expected);
});

test('a different browser profile starts at first access', async ({ browser }) => {
  const a = await browser.newContext();
  await (await a.newPage()).goto('/');
  const b = await browser.newContext();
  const page = await b.newPage();
  await page.goto('/');
  await expect(main(page)).toContainText('A log entry has been created.');
  await a.close(); await b.close();
});

test('JavaScript disabled shows the fallback', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expectFallback(page);
  await ctx.close();
});

for (const [name, script] of [
  ['writes throw', () => { Storage.prototype.setItem = () => { throw new DOMException('denied', 'SecurityError'); }; }],
  ['reads throw', () => { Storage.prototype.getItem = () => { throw new DOMException('denied', 'SecurityError'); }; }],
  ['sessionStorage unavailable', () => { Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('denied', 'SecurityError'); } }); }],
]) {
  test(`storage failure (${name}) shows the fallback`, async ({ page }) => {
    await page.addInitScript(script);
    await page.goto('/');
    await expectFallback(page);
  });
}

test('blocked body script reveals the fallback', async ({ page }) => {
  await page.route('**/*', async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    headers['content-security-policy'] = headers['content-security-policy'].replace(/(script-src '[^']+') '[^']+'/, '$1');
    await route.fulfill({ response, headers });
  });
  await page.goto('/');
  await expectFallback(page);
});

test('a returning browser never paints the wrong notice', async ({ context }) => {
  const first = await context.newPage();
  await first.goto('/');
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__frames = [];
    const sample = () => {
      const m = document.querySelector('main');
      if (m) window.__frames.push({ hidden: getComputedStyle(m).visibility === 'hidden', text: m.textContent });
      if (window.__frames.length < 60) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto('/');
  await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
  const frames = await page.evaluate(() => window.__frames);
  for (const f of frames.filter((x) => !x.hidden)) {
    expect(f.text).not.toContain('NOTICE OF ADMINISTRATIVE CONTAINMENT');
  }
});

test('every path, including file-like ones, is the Office page with 403 and our headers', async ({ request }) => {
  for (const path of ['/', '/a/b/c?x=1', '/index.html', '/favicon.ico', '/robots.txt', '/.well-known/x']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(403);
    expect(await res.text()).toContain('<title>OFFICE OF LATHER COMPLIANCE</title>');
    expect(res.headers()['x-robots-tag']).toBe('noindex, nofollow');
    expect(res.headers()['content-security-policy']).toContain("default-src 'none'");
  }
});

test('no requests leave the page, no cookies, no CSP violations', async ({ page, context, baseURL }) => {
  const requests = [];
  const violations = [];
  page.on('request', (r) => requests.push(r.url()));
  page.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) violations.push(m.text()); });
  await page.goto('/deep/path');
  await page.reload();
  // Only the document itself (and the inline data: favicon, if the browser reports it).
  const doc = new URL('/deep/path', baseURL).href;
  expect(requests.every((u) => u.startsWith(doc) || u.startsWith('data:'))).toBe(true);
  expect(await context.cookies()).toEqual([]);
  expect(violations).toEqual([]);
});

test('narrow screen at 200% zoom does not scroll sideways', async ({ context }) => {
  const a = await context.newPage();
  await a.goto('/');
  const page = await context.newPage();
  await page.setViewportSize({ width: 160, height: 640 });   // 320px at 200% zoom
  await page.goto('/');
  await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('accessibility: one heading, timestamps as <time>, no live regions', async ({ context }) => {
  const a = await context.newPage();
  await a.goto('/');
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('main time')).toHaveCount(2);
  await expect(page.locator('[role=status], [role=alert], [aria-live]')).toHaveCount(0);
  await expect(page.locator('main')).toMatchAriaSnapshot(`
    - main:
      - paragraph
      - heading "NOTICE OF REPEAT ACCESS" [level=1]
      - paragraph
      - paragraph
      - paragraph
      - paragraph
  `);
});

test('forced colors keeps text visible', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/');
  const color = await page.locator('h1').evaluate((el) => getComputedStyle(el).color);
  expect(color).not.toBe('rgba(0, 0, 0, 0)');
  await expect(h1(page)).toBeVisible();
});
```

- [ ] **Step 6: Run the browser tests**

Run: `npm run test:e2e > "$TEMP/olc-e2e.log" 2>&1; tail -30 "$TEMP/olc-e2e.log"`
Expected: all pass. If the ARIA snapshot differs only in how Playwright names paragraphs, correct the
snapshot to what is actually rendered. Do not change the markup to fit the snapshot.

- [ ] **Step 7: Checkpoint**

Run: `npm test > "$TEMP/olc-test.log" 2>&1; tail -5 "$TEMP/olc-test.log"; git status --short .`
Expected: `# fail 0`. The new files are listed, and `dist/`, `node_modules/`, and `test-results/` are
ignored. Include `package-lock.json`. No commit.

---

### Task 5: Renders for the under-design review

**Files:**
- Create: `office-of-lather-compliance/tests/renders.spec.mjs`

**Interfaces:**
- Consumes: the built page and local server (Task 4).
- Produces: `office-of-lather-compliance/renders/{state}-{desktop|mobile}.png`, ten files that are
  gitignored.

- [ ] **Step 1: Write the render script**

`tests/renders.spec.mjs`:

```js
import { test } from '@playwright/test';

const SIZES = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } };
const out = (name) => `renders/${name}.png`;

for (const [size, viewport] of Object.entries(SIZES)) {
  test(`renders at ${size}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport });
    const shot = async (page, name) => page.screenshot({ path: out(`${name}-${size}`), fullPage: true });
    const p1 = await ctx.newPage();
    await p1.goto('/');
    await shot(p1, '1-first-access');
    await p1.reload();
    await shot(p1, '2-refresh-denied');
    const p2 = await ctx.newPage();
    await p2.goto('/');
    await shot(p2, '3-repeat-access');
    const p3 = await ctx.newPage();
    await p3.goto('/');
    await shot(p3, '4-continued-interest');
    await ctx.close();

    const blocked = await browser.newContext({ viewport, javaScriptEnabled: false });
    const pf = await blocked.newPage();
    await pf.goto('/');
    await shot(pf, '5-fallback');
    await blocked.close();
  });
}
```

- [ ] **Step 2: Produce the renders**

Run: `npm run renders > "$TEMP/olc-renders.log" 2>&1; tail -5 "$TEMP/olc-renders.log"; ls renders`
Expected: 10 PNGs.

- [ ] **Step 3: Check them yourself against the constitution before showing the owner**

Open each PNG and check it against `docs/ui-system.md` §12 and `design.md` §1:
- white page, `#111` text, one family, one left column;
- the heading is the same size as body text, in bold;
- no dividers, color, frames, or chrome;
- nothing centered;
- the mobile render keeps the same reading order with the smaller margins.

Fix only real deviations from the spec, and never add styling.

- [ ] **Step 4: Owner gate. Stop here.**

Give the owner workspace-relative links to all ten files, for example
`[office-of-lather-compliance/renders/3-repeat-access-mobile.png](office-of-lather-compliance/renders/3-repeat-access-mobile.png)`,
and ask for the under-design regression review (spec §6). Do not continue until they approve.
Images viewed with the Read tool never reach the owner, so links are the only way she sees them.

---

### Task 6: Record the decisions and run the repository gates

**Files:**
- Modify: `office-of-lather-compliance/docs/ui-system.md` (§10 last line, §13, §15)
- Modify: `office-of-lather-compliance/PRD-TO-LAUNCH.md` (§4, the Privacy/Terms/DMCA bullet)

**Interfaces:**
- Consumes: spec §1 decision table.

- [ ] **Step 1: Close the pending items in `ui-system.md`**

In §10, replace
`**Exact fallback copy remains pending owner approval. Claude may not invent dramatic fallback language.**`
with:

```markdown
**Fallback copy approved by the owner (OLC-D01, 2026-09-29):** the First Access notice without its
claiming lines. Exact text: `docs/superpowers/specs/2026-09-29-office-error-site-design.md` §3.5.
A damaged record restarts at First Access only when its replacement is written and verified.
```

Replace the whole of §13 with:

```markdown
# 13. Resolved decisions (2026-09-29)

Both items formerly pending here, and the remaining launch-interview branches, are owner decisions
recorded in `../../docs/superpowers/specs/2026-09-29-office-error-site-design.md` §1:

1. **Storage-failure copy (OLC-D01):** the First Access notice without its claiming lines.
2. **Continued Interest count (OLC-D02):** post-transition `lifetimeAccessCount`, which counts every
   access including reloads.
3. **Deployment (OLC-D03):** HTTP 403 at every path, noindex, and **no footer, legal link, privacy
   notice, credit, or explanation**. If disclosure ever becomes mandatory, it returns to the owner.
4. **Edge details (OLC-D04):** local `YYYY-MM-DD HH:MM:SS` timestamps; terminal ID `LC-XXXX-8804`
   from a cryptographic random source; narrow-screen margin `24px 16px 48px 16px`; tab title
   `OFFICE OF LATHER COMPLIANCE`.
```

Append to §15:

```markdown
## 2026-09-29 — launch decisions

OLC-D01 to OLC-D04 resolved by the owner (see §13). The July 28 under-design is reaffirmed
unchanged. The owner ruled out every public disclosure on the Office page; this supersedes the
quiet-link clauses in `../design.md` §7, the PRD, and `../PRD-TO-LAUNCH.md` §4.
```

- [ ] **Step 2: Annotate PRD-TO-LAUNCH §4**

Directly after the bullet that begins `- Keep Privacy, Terms and DMCA accessible`, add:

```markdown
  **Superseded by owner ruling, 2026-09-29 (OLC-D03):** no legal link, privacy notice, credit or
  disclosure appears on the Office page. See `docs/ui-system.md` §13.
```

- [ ] **Step 3: Run the repository gates from `site/`**

Run from `site/`, each with its output going to a file:

```bash
for s in build gates copy-gates fidelity distinguish authority audit:fonts; do
  npm run $s > "$TEMP/site-$s.log" 2>&1; echo "$s exit=$?"; tail -3 "$TEMP/site-$s.log"
done
```

Expected: every script exits 0. If `authority` flags an Office phrase, read the error and fix the
wording in the doc you changed. Do not weaken the gate.

- [ ] **Step 4: Checkpoint**

Run: `git status --short office-of-lather-compliance`
Expected: the two docs are modified, along with the Task 1–5 files. No commit.

---

### Task 7: Commit, deploy, verify live, hand off

**Files:**
- Modify: `docs/HANDOFF.md` (the Office origin section)
- Modify: `cwaaa/docs/handoff-2026-09-24-routes-and-referral.md` (the record 9 and Office go-live rows)

- [ ] **Step 1: Commit on the owner's request**

Only after the owner approves the renders (Task 5) and asks for a commit. Stage by name:

```bash
cd "$(git rev-parse --show-toplevel)"
git add -- office-of-lather-compliance/package.json office-of-lather-compliance/package-lock.json \
  office-of-lather-compliance/.gitignore office-of-lather-compliance/netlify.toml \
  office-of-lather-compliance/playwright.config.mjs office-of-lather-compliance/src \
  office-of-lather-compliance/scripts office-of-lather-compliance/tests \
  office-of-lather-compliance/docs/ui-system.md office-of-lather-compliance/PRD-TO-LAUNCH.md \
  docs/superpowers/plans/2026-09-29-office-error-site.md
git commit -m "feat(office): build the error-only Office site"   # add the Co-Authored-By trailer
```

Push only if the owner asks.

- [ ] **Step 2: Owner action in Netlify**

Ask the owner to:
1. Set Base directory to `office-of-lather-compliance` if it isn't already set.
2. Go to Site configuration → Build & deploy → Continuous deployment → **Activate builds**.
3. Trigger a deploy of `main`.

Wait for her confirmation that the deploy finished.

- [ ] **Step 3: Verify the live site**

```bash
for p in / /records/1961/a /index.html /favicon.ico /robots.txt; do
  curl -s -o /dev/null -w "$p %{http_code}\n" "https://office-of-lather-compliance.netlify.app$p"
done
curl -sI https://office-of-lather-compliance.netlify.app/ | grep -i -E "content-security-policy|x-robots-tag|referrer-policy"
curl -s https://office-of-lather-compliance.netlify.app/nowhere | grep -c "OFFICE OF LATHER COMPLIANCE"
```

Expected: every path returns `403`, all three headers are present, and the body is ours (count ≥ 1).

- **If any path is not 403, or Netlify serves its own page: stop.** Report exactly what was
  returned and return the question to the owner (spec §1, OLC-D03). Do not change the status.
- Then run the browser suite against the live origin. The config is not edited; the environment
  variable overrides it and skips the local server:
  `BASE_URL=https://office-of-lather-compliance.netlify.app npx playwright test --project=e2e --reporter=dot -g "progression|marker decides|JavaScript disabled|every path|no requests"`

- [ ] **Step 4: Update the handoffs**

- In `docs/HANDOFF.md` § "Owner decision, 2026-09-25 — the Office's origin", replace "nothing is
  deployed there yet because the Office app is not built" with the live date and the commit.
- In the CWAAA handoff, mark the Office go-live row done.
- Both files should say that CWAAA's `OFFICE_SITE_URL` may now be set. That is a separate CWAAA task:
  it makes About's 1961-A row link and gives record 9's Next its destination.

Commit these only when the owner asks.

- [ ] **Step 5: Completion report**

Report the test counts, the live verification output, and later-work IDs OLC-L01 to OLC-L04 with
owner and next action (spec §8).
