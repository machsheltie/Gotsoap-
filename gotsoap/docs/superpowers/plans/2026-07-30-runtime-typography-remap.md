# Runtime typography remap implementation plan

> **For Codex:** Execute this plan inline with `superpowers:executing-plans`.
> The user explicitly authorized implementation on the current `main` lane and
> direct publication to `origin/main`. Preserve all unrelated dirty files.

**Goal:** Replace legacy runtime typography with the approved role-based
families, isolate CWAAA font authority, make the font audit pass its hard gates,
regenerate authoritative artifacts, and publish the scoped work.

**Architecture:** Compile Got Soap? and CWAAA `@font-face` declarations as
separate stylesheet assets. `BaseLayout.astro` chooses the system stylesheet
and campaign preload set from explicit route font-system ownership. Design
tokens expose semantic typography roles; existing component styles are
reclassified onto those roles without changing authored copy. The Fontkit
audit and G19 source-policy gate consume the campaign and CWAAA manifests and
reject unauthorized dependencies, files, hosts, synthesis, or preload drift.

**Tech stack:** Astro, CSS, Node.js test runner, Fontkit, npm, Git.

---

## Task 1: Lock system-scoped font policy with failing tests

**Files:**

- Modify: `site/scripts/font-policy-check.test.mjs`
- Modify: `site/scripts/font-audit.test.mjs`
- Modify later: `site/scripts/font-policy-check.mjs`
- Modify later: `site/scripts/font-audit.mjs`

**Steps:**

1. Add a source-policy test that omits `font-synthesis: none` and expects a
   violation when the synthesis lock is required.
2. Add a test in which a CWAAA-authorized PT Serif URL is legal in its approved
   stylesheet but illegal in a campaign stylesheet.
3. Add a test that compares the exact campaign preload set and fails on any
   missing or extra entry.
4. Run the two test files and observe the new assertions fail for the intended
   missing behavior.
5. Implement only the policy API needed by those tests.
6. Re-run both test files and require green output.

## Task 2: Declare the two font authorities

**Files:**

- Modify: `site/config/font-manifest.json`
- Create: `site/config/cwaaa-font-manifest.json`
- Create: `site/src/styles/fonts-gotsoap.css`
- Create: `site/src/styles/fonts-cwaaa.css`
- Modify: `site/src/styles/tokens.css`

**Steps:**

1. Keep the Got Soap? audit manifest at exactly fourteen approved production
   files and declare allowed source scopes.
2. Add a separate CWAAA manifest for the four PT Serif binaries and its source
   scope; do not add those files to campaign byte totals.
3. Move all `@font-face` rules out of `tokens.css`.
4. Declare all fourteen Got Soap? binaries with canonical family names, exact
   static weights/styles, `font-display: swap`, and `/fonts/` URLs.
5. Declare PT Serif only in `fonts-cwaaa.css`.
6. Add `font-synthesis: none` and semantic role tokens to `tokens.css`.
7. Run focused policy tests and G19; hard failures should now identify only
   remaining legacy call sites or delivery wiring.

## Task 3: Wire route-aware delivery and exact preloads

**Files:**

- Modify: `site/src/layouts/BaseLayout.astro`
- Modify: `site/src/pages/index.astro`
- Modify: `site/src/pages/sniff-test/[verdict].astro`
- Modify additional route files only if their rendered content includes both
  campaign and CWAAA-authored surfaces.

**Steps:**

1. Import the two font stylesheet assets with Vite `?url`.
2. Add a typed `fontSystems` layout prop with a safe default derived from the
   page register.
3. Emit only the stylesheet links authorized for that route.
4. Emit the exact three campaign preloads only when the campaign system is
   present.
5. Mark genuinely mixed routes with both systems.
6. Run the Astro build and the preload/source-policy tests.

## Task 4: Remap component typography without synthesis

**Files:**

- Modify: `site/src/styles/base.css`
- Modify: campaign `.astro` component and page styles that use `--font-body`,
  `--font-label`, or `--font-fine`
- Preserve: CWAAA components using `--font-cwaaa`

**Steps:**

1. Map sustained body and direct address to Behind The Nineties Sans Medium.
2. Map ordinary labels, navigation, buttons, answers, and controls to Marlin
   Sans SQ Medium; use Bold only for selected functional emphasis.
3. Map production metadata to Moanslight Medium or Semibold.
4. Keep Oswald weights at their existing approved command roles.
5. Replace any unsupported inherited weight/style with the correct semantic
   role instead of adding a synthetic declaration.
6. Introduce Moxie, confession, editorial-major, and rare display role classes
   without inventing new copy placements.
7. Run G19 and focused tests until no legacy or unauthorized font reference
   remains.

## Task 5: Integrate remote authority and verify the runtime

**Files:**

- Integrate: `gotsoap/docs/font-asset-resolution.md` from `origin/main`
- Preserve: all unrelated worktree files

**Steps:**

1. Stage only audit, manifest, dependency, runtime typography, gate, and
   authority-document files.
2. Review the staged name list and diff; commit the implementation.
3. Fetch `origin` and merge `origin/main` without force or history rewrite.
4. Run from `site/`:
   `npm run audit:fonts`, `npm run build`, `npm run gates`,
   `npm run copy-gates`, `npm run fidelity`, `npm run distinguish`, and
   `npm run authority`.
5. Run the focused Node test files.
6. Start the built site and inspect representative campaign, mixed, and CWAAA
   routes in a browser at desktop and mobile widths.
7. Record line counts, navigation/control dimensions, overflow/crop status,
   loaded font files, and font-swap movement. Fix regressions before proceeding.

## Task 6: Regenerate and publish repository authority

**Files:**

- Regenerate: `site/reports/font-audit.json`
- Regenerate: `gotsoap/docs/font-binary-audit.md`

**Steps:**

1. Regenerate the JSON and Markdown after the implementation and remote
   authority are committed so `sourceCommit` identifies that exact source.
2. Confirm the report has no hard failures and its transfer totals match the
   manifest.
3. Stage only the two generated artifacts; inspect and commit them.
4. Confirm unrelated dirty paths remain unstaged.
5. Push `main` to `origin` without force.
6. Fetch or query the remote ref and confirm it resolves to the pushed commit.
