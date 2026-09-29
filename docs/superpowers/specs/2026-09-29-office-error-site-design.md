# Office of Lather Compliance error site — design

**Date:** 2026-09-29 · **Status:** approved with review revisions, 2026-09-29 · **Entity:** Office of Lather Compliance only
**Deploys to:** `https://office-of-lather-compliance.netlify.app` · **Builds from:** `office-of-lather-compliance/`

This spec implements existing Office authority; it does not restate or amend it. On conflict, these
win in order: `office-of-lather-compliance/design.md`, `docs/ui-system.md`, `docs/PRD-office-v1.md`,
`docs/contracts/visit-state.v1.json`. The July 28, 2026 under-design ruling stands unchanged: white,
`#111`, Courier New only, one left column, no accent color, no second typeface, no decorative rules,
nothing added to manufacture institutional atmosphere. The governing idea is "Nobody Believed This
Page Required Art Direction." No design authority file is rewritten by this work.

## 1. Owner decisions recorded by this spec

These close OLC-D01 through OLC-D04 and the open items in `ui-system.md` §13. Implementation records
them there (decision, rationale, affected states, tests) before dependent code lands.

| ID | Decision (2026-09-25 to 2026-09-29) |
|---|---|
| OLC-D01 fallback copy | When storage is unavailable, untrustworthy, or JavaScript does not run, render the First Access notice minus every claiming line. Exact text in §3.5. |
| OLC-D01 damaged record | A malformed persistent record is discarded and replaced with a fresh First Access record **only if** the replacement write is verified. If it cannot be verified, render the fallback. |
| OLC-D02 `[count]` | Continued Interest shows post-transition `lifetimeAccessCount`: every access including reloads. The number rises on reload; the notice never changes otherwise. |
| OLC-D03 legal/disclosure | **No footer, legal link, privacy notice, credit, or explanatory material ships.** Owner ruling: disclosure "would break what it's supposed to be." This supersedes the quiet-link language in `PRD-TO-LAUNCH.md` §4 and the conditional clauses in `design.md` §7 / PRD. If hosting or law ever makes disclosure mandatory, it returns to the owner for review; nothing is added automatically. |
| OLC-D03 HTTP status | Target **403 Forbidden** on every path, root included: the Office acknowledges the request and refuses it. Must be verified on a Netlify preview serving our page, never platform error UI. If Netlify cannot deliver it, stop and return to the owner; do not silently fall back. |
| OLC-D03 crawlers | `noindex, nofollow` via meta tag and `X-Robots-Tag`. No `robots.txt`, sitemap, or preview artwork. |
| OLC-D04 timestamps | Visitor's local time as `YYYY-MM-DD HH:MM:SS`, 24-hour, e.g. `2026-09-29 14:07:32`. |
| OLC-D04 terminal ID | `LC-XXXX-8804`: four uppercase hex characters from `crypto.getRandomValues`, then the fixed `-8804`. Never derived from any browser, device, or network characteristic. |
| OLC-D04 narrow screens | Below 600px viewport width, body margin becomes `24px 16px 48px 16px`. Nothing else changes. |
| Tab title | `OFFICE OF LATHER COMPLIANCE`, fixed on every state. Browser chrome never becomes a scare device. |

## 2. Architecture

The smallest possible thing: one self-contained HTML document served at every address.

```text
office-of-lather-compliance/
  package.json            scripts: build, test, test:e2e; one devDependency (@playwright/test)
  netlify.toml            base, build command, publish dist, 403 catch-all
  src/
    copy.mjs              the four approved notices + fallback, as data (single copy source)
    engine.mjs            pure state engine: storage/time/random injected, no DOM
    render.mjs            state + values -> DOM nodes inside <main>
    page.html             template: head, fallback markup in <main>, script/style slots
    page.css              the design.md reference CSS plus the narrow-screen rule
  scripts/build.mjs       inlines CSS/JS into dist/index.html, hashes them, writes dist/_headers
  tests/
    engine.test.mjs       node:test — every contract transition and failure mode
    copy.test.mjs         node:test — rendered text equals design.md §4 byte for byte
    page.spec.mjs         Playwright — the built page in a real browser
  dist/                   build output (gitignored)
```

No framework, no bundler, no runtime dependency. `node:test` matches the repository's existing test
idiom (`site/scripts/*.test.mjs`) and needs no install. Playwright is the single devDependency,
required because session semantics, first paint, and JavaScript-off behavior only exist in a browser.
The design docs remain where they are; this adds code beside them.

### 2.1 Engine (`engine.mjs`)

`access({ local, session, now, randomHex }) -> { state, values }`, where `local`/`session` are
Storage-like objects, `now()` returns a `Date`, and `randomHex(n)` returns `n` uppercase hex
characters. `state` is one of `first_access`, `same_session_refresh`, `later_return`,
`continued_interest`, `fallback`.

Storage keys, per the contract namespace: `localStorage["olc.visit.v1"]` holds the persistent record;
`sessionStorage["olc.visit.v1"]` holds the session record. Timestamps are stored as ISO-8601 UTC.

**Validation is strict on schema and modest on meaning.** A record is valid only if it is a JSON
object with exactly the contract's fields: no missing, extra, or wrong-type fields.

- Persistent record fields: `firstContact`, `lastContact`, `returnSessionCount`,
  `lifetimeAccessCount`, `reference`, `terminalId`.
- Session record fields: `sessionId`, `sessionRefreshCount`.

On top of the schema:

- Timestamps must round-trip exactly (`new Date(s).toISOString() === s`), which rejects anything JS
  merely parses permissively.
- `lastContact >= firstContact`.
- `returnSessionCount` is an integer ≥ 0 and `lifetimeAccessCount` is an integer ≥ 1.
- `reference === "8804-X"`.
- `terminalId` matches `^LC-[0-9A-F]{4}-8804$`.
- `sessionId` is a non-empty string and `sessionRefreshCount` is an integer ≥ 0.

The engine does not check whether historical counters "make sense" relative to each other.

Resolution, in order:

1. Read both keys. If either read throws, return `fallback`.
2. Capture `markerExisted` = a valid session record was present. This happens before any write.
3. Validate the persistent record by the rules above. An invalid record counts as damaged.
4. **Absent or damaged persistent record** → First Access transition: create persistent record
   (`returnSessionCount 0`, `lifetimeAccessCount 1`, `firstContact = lastContact = now`, new
   terminal ID) and session record (`sessionRefreshCount 0`, new session ID). A session marker
   without a persistent record does not matter; the persistent record governs. A damaged record is
   **overwritten**, never deleted first: success depends only on the replacement writing and
   verifying (step 7). No separate removal step exists, so it has no failure branch.
5. **Valid record, `markerExisted`** → same-session transition: preserve `returnSessionCount`,
   increment `sessionRefreshCount` and `lifetimeAccessCount`.
6. **Valid record, no marker** → new-session transition, exactly once: increment
   `returnSessionCount` and `lifetimeAccessCount`, set `lastContact = now`, create a fresh session
   record with `sessionRefreshCount 0`.
7. Write the records, then read them back and compare. **Any write exception or mismatch returns
   `fallback`.** No state that implies recording may render on unverified persistence.
8. Select by the contract's order: `returnSessionCount ≥ 2` → Continued Interest (also on reload);
   `markerExisted` → Refresh Denied; post-transition count `1` → Later Return; else First Access.

A malformed session record counts as no marker. `values` carries `terminalId`, `firstContact`,
`currentContact` (= `now`), and `count` (= post-transition `lifetimeAccessCount`).

**Session meaning follows the contract and browser `sessionStorage` semantics.** A valid session
marker present at access start means same-session access. Its absence means a new-session transition.

- Reloads ordinarily preserve the marker.
- Separate top-level browsing contexts initialize `sessionStorage` in browser-dependent ways. For
  example, a page opened with an opener may start with a copy of the opener's storage.
- Tab-opening gestures are therefore never used as narrative signals. The Office knows only its
  local record state.
- No elapsed-time rule, cookie, tab detection, or other signal is added.

### 2.2 Resolve before reveal

- `page.html` ships with the **fallback notice already in `<main>`**. That is the JavaScript-off
  experience and the default whenever anything fails.
- A tiny inline script in `<head>` adds `class="olc-resolving"` to `<html>`. CSS hides `main` while
  that class is present (`visibility: hidden`, not animated).
- An inline script immediately after `</main>` runs the engine, replaces `main`'s children with the
  selected notice, and removes the class in a `finally` block. On any exception the fallback remains
  and becomes visible.
- Result: a returning browser can never paint First Access or the fallback before its real state.
  Nothing animates; the hidden interval is parse time only.

### 2.3 Rendering (`render.mjs`, `copy.mjs`)

Each notice is data in `copy.mjs`, one source for engine, renderer, and tests. Markup follows the
copy's own line and blank-line structure:

- Line groups separated by a blank line become `<p>` elements; lines within a group are joined with
  `<br>`.
- The notice's title line (`NOTICE OF ADMINISTRATIVE CONTAINMENT`, `REFRESH REQUEST DENIED`,
  `NOTICE OF REPEAT ACCESS`, `NOTICE OF CONTINUED INTEREST`) is the page's `<h1>`, styled at the base
  size in native bold weight. No heading is larger than body text.
- The status line (`Current Status: …` / `Status: …`) is **ordinary text, not an ARIA live region**.
  It is static content present when the page is revealed, so `role="status"` (an implicit polite
  live region) would risk the Office speaking over the page load. The heading, the source order and
  the `Status:` label carry the semantics. The accessibility check in §6 confirms that nothing is
  announced unexpectedly during the fallback-to-state replacement.
- Timestamps render as `<time datetime="{ISO}">2026-09-29 14:07:32</time>`.
- Long values (terminal ID, timestamps) use `overflow-wrap: anywhere` so 200% zoom on a narrow
  screen never scrolls sideways.
- Text is inserted with `textContent`, never `innerHTML`.

## 3. Copy (from `design.md` §4, verbatim)

§3.1–3.4 are `design.md` §4 exactly, with placeholders filled from `values`: First Access, Refresh
Denied, Later Return (`[generated identifier]` → `terminalId`, `[stored local timestamp]` →
`firstContact`, `[current local timestamp]` → `currentContact`), and Continued Interest
(`[count]` → `count`). `copy.test.mjs` compares `copy.mjs` and the rendered text against the fenced
`text` blocks under each `design.md` §4 heading. Before comparing, it normalizes only filesystem
trivia:

- CRLF becomes LF;
- trailing whitespace is removed from each line;
- leading and trailing blank lines of the block are dropped.

Everything else must match exactly: words, punctuation, capitalization, line order, blank-line
structure, and the position of each `[placeholder]` token. The test fails when a word changes. It
does not fail because an editor changed line endings.

### 3.5 Fallback (OLC-D01, owner-approved)

```text
OFFICE OF LATHER COMPLIANCE
Establishment Directive 1961-A / Sub-Section 4

NOTICE OF ADMINISTRATIVE CONTAINMENT

The requested resource is unavailable.
Access has been suspended under Regulatory Standard 41-B.

Reference: 8804-X

Please remain available.
```

It contains no log, terminal ID, prior-contact, recording, or status claim.

## 4. Page shell

- `<html lang="en">`, `<meta charset>`, viewport meta, `<title>OFFICE OF LATHER COMPLIANCE</title>`,
  `<meta name="robots" content="noindex, nofollow">`, `<link rel="icon" href="data:,">` so browsers do
  not request a favicon. No Open Graph or Twitter tags.
- CSS is `design.md` §3 exactly, plus the heading rule, the `olc-resolving` rule, the 600px margin
  rule, and `overflow-wrap`. Links are unused. Focus styling is browser default.
- No font file ships. Courier New comes from the system with the documented `Courier, monospace`
  fallback, so no Fontsource dependency and no remote font request exist.

## 5. Delivery

`office-of-lather-compliance/netlify.toml`:

```toml
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

`dist/_headers`, written by the build for `/*`:

- `Content-Security-Policy: default-src 'none'; script-src 'sha256-…' 'sha256-…'; style-src 'sha256-…'; img-src data:; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`
  (the hashes are computed from the inlined script and style at build time, with no `unsafe-inline`)
  Hash-based CSP stays only while it remains a few boring lines in `build.mjs` (read the inlined
  text, `sha256`, base64, write `_headers`). If it starts growing into an asset pipeline, choose the
  simpler form and record why. The smallest-possible-thing rule governs the build too.
- `X-Robots-Tag: noindex, nofollow`
- `Referrer-Policy: no-referrer`
- `X-Content-Type-Options: nosniff`
- `Cache-Control: no-cache`

The page makes no network requests beyond itself: no analytics, cookies, beacons, or remote assets.

## 6. Verification

**Engine (`node --test --test-concurrency=1`)** covers every row of PRD-TO-LAUNCH §3 and §6 with
injected time, storage, and randomness:

- first access;
- reloads in sessions 1 and 2 (including multiple reloads before session 3);
- sessions 2, 3, and 4 and later;
- reload at the Continued Interest threshold;
- `count` values;
- damaged persistent record with a successful rewrite (First Access) and with a failed rewrite
  (fallback);
- schema-valid-looking but invalid records: extra field, missing field, wrong type, `lastContact`
  before `firstContact`, a timestamp JS parses permissively but that does not round-trip, and a
  well-formed terminal ID in a record missing another field;
- malformed session record;
- blocked reads;
- a write that throws;
- a write that silently fails verification;
- only one storage API available;
- session marker without a persistent record.

**Copy:** rendered text equals `design.md` §4 for all four states, and the fallback equals §3.5.

**Browser (Playwright, `workers: 1`, against the built `dist/index.html` on a local static server
that mimics the catch-all):**

- the tests exercise **marker semantics**, not tab gestures. A new session is a page opened in the
  same context **without an opener**, so it starts with fresh `sessionStorage` and shares
  `localStorage`;
- progression: first visit, reload, new session (Later Return), reload, new session (Continued
  Interest), reload;
- a page opened **with** an opener that inherits a copied marker shows the same-session result,
  which proves the marker decides and not the tab;
- a new browser context shows First Access;
- a JavaScript-disabled context shows the fallback;
- storage that throws shows the fallback;
- per-frame sampling proves a returning browser never shows First Access or fallback text;
- deep paths (`/a/b/c?x=1`) behave identically;
- no requests leave the page and no cookies are set;
- at 320px wide and 200% zoom there is no sideways scroll;
- the heading is exposed in the accessibility tree, and no live region exists;
- a screen-reader sanity check (NVDA or an equivalent accessibility snapshot) confirms nothing is
  announced over the load when the fallback is replaced.

**Under-design regression review (owner gate).** The owner visually reviews all five rendered
experiences (the four states plus the fallback) at desktop width and at narrow mobile width. The
review confirms that implementation added no extra visual hierarchy, spacing flourish, divider,
tonal variation, institutional cue, or "helpful" chrome beyond `design.md` §3. Renders are delivered
as workspace-relative files. This gate is required before commit and deploy.

**Deployed (after the owner activates builds):**

- `curl -I` on `/`, a deep path, and `/index.html` returns 403 with our headers and no Netlify
  error UI;
- the browser progression works on the live origin;
- the CSP reports no violations.

**Repository:** from `site/`, run `build`, `gates`, `copy-gates`, `fidelity`, `distinguish`,
`authority`, and `audit:fonts`. They must pass fresh, because the docs change and the authority gate
reads Office files.

## 7. Go-live sequence

1. Build and tests pass locally. The owner passes the under-design regression review (§6).
2. Commit on the owner's request.
3. **Owner, in Netlify:** set Base directory to `office-of-lather-compliance` if it is not already
   set, then Site configuration → Build & deploy → Continuous deployment → **Activate builds**.
4. Verify the deployed checks in §6. If the 403 fails, stop and return to the owner.
5. Update `docs/HANDOFF.md` and the CWAAA handoff to show the Office live.
6. Only then set CWAAA's `OFFICE_SITE_URL` default, which makes About's 1961-A row link plainly and
   is the destination for record 9's Next. That is a separate CWAAA task.

## 8. Out of scope

- Any change to Office design authority, styling, or copy.
- A fifth state, escalation, or Easter egg (OLC-L03).
- Physical artifacts: the pen and the business card (OLC-L01, OLC-L02).
- IVR support (OLC-L04).
- Records 7–9 and CWAAA wiring beyond step 6.
