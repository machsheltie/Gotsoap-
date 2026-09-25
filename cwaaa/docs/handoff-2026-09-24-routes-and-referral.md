# Handoff — 2026-09-24: four routes built, field assessment, what is left

**For:** the next Claude Code agent working in `cwaaa/`. **From:** the session that built
`/tie-one-on`, `/chapters`, `/about` and `/field-assessment`. **Tip at handoff:** `c30f486` on
`main`, in sync with `origin/main`.

Read `cwaaa/CLAUDE.md` and `AGENTS.md` first. Then this file. Then only what your task needs.

## 1. State right now

- **Every nav and footer link resolves.** `npm run launch-check` (from `cwaaa/`, after
  `npm run build`) reports 0 dead links and 4 pending facts, all expected (see §3).
- **The four new routes ship with placeholder photo slots.** Public build shows the material ground;
  `npm run review` shows each slot's graphics ID and shot spec. Briefs:
  `.impeccable/surfaces/cwaaa-src-pages-{tie-one-on,chapters,about,field-assessment}-astro.md`.
- **Legal facts filled:** contact `hope2studio@yahoo.com` (Privacy, Terms, Accessibility); Terms
  governed by Kentucky law, Bullitt County courts.
- **`GOT_SOAP_SITE_URL` defaults to `https://gotsoap.netlify.app`** (owner decision, the one exception
  to "empty until real domains"; `src/config/site.ts`). This turns on the home seam, the footer
  "Visit Got Soap?" link, About's creator credit, and the Sniff Test link on `/field-assessment`.
- All six `site/` gates, font audit, `astro check`, and the design detector were green at `c30f486`.

**Not yours, do not commit:** another session has uncommitted edits in `cwaaa/PRD-TO-LAUNCH.md` and
`cwaaa/docs/canon-billy-bob-and-the-archive-boundary.md`. Untracked `cwaaa/.impeccable/renders/`
(screenshots), `site/src/assets/graphics/design.md` and `skills-lock.json` are also not from this
work. Stage files by name; never `git add -A`.

## 2. Settled this session — do not reopen

- **Sniff Test vs field assessment.** The Sniff Test belongs to Got Soap? directly: a magazine-quiz
  aimed at the low-effort man himself. CWAAA never hosts, restates or reskins it (CW-L03).
  `/field-assessment` is for **the person who knows him** — she refers him. Vocabulary is
  "referral" (the Recovery Records' word), never report/complaint/hotline/case intake.
- **Field assessment page shape (owner):** infomercial open ("Does someone you love suffer from
  fragrance substitution?" and three more, then "If you are a loved one…"); a chapter member checks
  back ~30 days later and "If it has not, the referral stays open." The page never says where an
  open referral leads. Paths in order: **Refer him for a field assessment** (pending), then **Send
  him the Sniff Test** (external).
- **About:** the creator credit "Site by Hope2 Studio" links to the Got Soap? `/about` reveal. The
  site's single neutral Office reference is the last row of About's record — "Reference:
  Establishment Directive 1961-A, Office of Lather Compliance" — no verb, no explanation, nowhere
  else on the site.
- **Chapters:** the owner's four-dispatch roster (Atlanta, Greater Phoenix, Milwaukee, Tacoma) in
  that order, verbatim. Her "must not add" list is in the brief.
- **Canon, committed `a27dddb`:** past Billy Bob the sequence is records **7, 8 and 9**; the gradient
  is **subtraction from CWAAA's side against a fixed Office register**. Three rejected resolutions
  are named in `docs/canon-billy-bob-and-the-archive-boundary.md`.

## 3. What is left

### Waiting on the owner (do not invent any of these)

| Item | Where it shows | Note |
|---|---|---|
| DMCA designated agent: name, mailing address, email | `/dmca` pending markers | **Deferred by owner to 2026-10-15.** `DMCA_AGENT_DUE` in `copy.ts`; launch-check prints the date. Remind her the agent should also be registered with the US Copyright Office. |
| Field-assessment referral mechanism | `/field-assessment` pending marker | Needs approved intake fields, consent wording, fulfilment, privacy handling, operational destination. **Collect nothing until then.** When it ships, amend Privacy ("the pledge form is the only thing here that accepts input" stops being true). |
| Records 7–9 content | not built | She is writing three men (names, professions, stories). Record 9 is "Patient Zero". Do not draft them. |
| Where record 9's Next goes | not built | **Answered 2026-09-25:** the Office site's error page at `https://office-of-lather-compliance.netlify.app`. That Netlify site has builds off and nothing deployed, so keep `OFFICE_SITE_URL` empty until the Office app is built and live (go-live steps in `../../docs/HANDOFF.md` § "the Office's origin"). |
| 11 route photographs | placeholder slots | IDs, subjects and target filenames: `GRAPHICS-TO-MAKE.md` § "2026-09-24 — Route photography". Wiring each is one import plus the `image` prop on its `ImageSlot`. Every slot shows a person; an object in a person's slot is a rejected asset. |
| Other open art | see `GRAPHICS-TO-MAKE.md` | Home Tie One On field (CW-G03 home) still a placeholder; four Recovery Record portraits (Chad, Marcus, Gary, "Kaelthas"); CW-G06/07 final wording and review. |
| DRAFT copy review | `src/content/copy.ts`, 2026-09-24 block at the end | Everything on `/field-assessment` except the title; About's record wording incl. the 1961-A row; Tie One On's tag header and "Not sure which he is?"; route meta descriptions; Chapters close labels. Route through the copy lane (`../gotsoap/docs/copy/COPY-PROTOCOL.md`) and blind readers before calling any of it approved. |
| Real domains | config | Swap `GOT_SOAP_SITE_URL`; set `CWAAA_SITE_URL`, `OFFICE_SITE_URL` (CW-D07, CW-M6). Office origin assigned (above). |
| Office go-live | Office Netlify site | Once the Office app exists: (1) add `office-of-lather-compliance/netlify.toml` like `cwaaa/netlify.toml`, with base, build command, publish folder and a catch-all so every address shows an Office error page; (2) owner turns builds back on in Netlify → Site configuration → Build & deploy → Continuous deployment → "Activate builds". |

### Agent work that is ready when she is

1. **Records 7–9 (next big build, once her copy lands).** Build the gradient from Brayden's full
   record → Billy Bob (the first down the hole, already shipped with an embedded Office finding and
   no Next) → 7 → 8 → Patient Zero (9). Before building, list Brayden's record field by field and
   propose which CWAAA fields disappear at 7, 8 and 9; get her sign-off on that table. The Office
   voice does not grow, change register or narrate; CWAAA simply has less left (see canon doc and
   `../office-of-lather-compliance/docs/world-bible.md` § Register invariance). Records past the
   boundary get **no** secret-area treatment (design.md §6). Read
   `.impeccable/surfaces/cwaaa-src-pages-recovery-stories-astro.md` first — skipping it once cost a
   full rebuild. Close CW-L06 in `PRD-TO-LAUNCH.md` when done (coordinate: another session is editing
   that file).
2. **Wire photographs** as they arrive (see table above).
3. **Optional seam, owner's call:** link the Recovery Records that mention an assessment or referral
   to `/field-assessment`. All three blind readers asked for a way in from there.
4. **Parked pledge signal** (`.impeccable/surfaces/cwaaa-src-pages-pledge-astro.md` §9, decision 6):
   "Take the Pledge" never says what happens on click. The fix is saying it, not deleting call sites.
   Owner decision first.
5. **Housekeeping:** `PRD-TO-LAUNCH.md` status rows still describe `/tie-one-on`, `/chapters`,
   `/about` as blocked. Update them once the other session releases that file.

### Longer arc (from `PRD-TO-LAUNCH.md`)

Still open there: CW-D01/D02 (type and token values remain PROPOSED), CW-D05, CW-D06 (two-message
email content; `BUTTONDOWN_USERNAME` is empty, so the pledge cannot yet be verified end to end —
CW-M4), CW-D07 remainder (origins, `/crisis` migration, redirects), milestones CW-M4–M6, and later
IDs CW-L01–L05.

## 4. How to work here

- **Parallel sessions edit this repo.** Check `git status` and file mtimes before editing shared
  files. In `copy.ts`, append new exports at the end rather than inserting mid-file.
- **The owner is the only authority.** Flag a canon conflict once, then build what she decided.
- **Load the surface brief before touching a route** (`.impeccable/surfaces/`), and the impeccable
  skill for UI work.
- **Verify before claiming done:** from `cwaaa/`: `npm run build`, `npx astro check`,
  `npm run launch-check`. From `site/`: `npm run build`, `gates`, `copy-gates`, `fidelity`,
  `distinguish`, `authority`, and `audit:fonts`. Send long output to a file.
- **Show her renders as workspace-relative links;** images viewed with the Read tool never reach her.
- Commit only when she asks; end commits with the Co-Authored-By line from the session prompt.
