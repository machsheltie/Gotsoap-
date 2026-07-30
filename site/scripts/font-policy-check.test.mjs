import assert from 'node:assert/strict';
import test from 'node:test';

import { collectFontPolicyViolations } from './font-policy-check.mjs';

test('rejects Fontsource entries in both the manifest and lockfile', () => {
  const violations = collectFontPolicyViolations({
    packageJson: {
      name: 'fixture',
      devDependencies: {
        '@fontsource/jost': '^5.2.8',
      },
    },
    packageLock: {
      name: 'fixture',
      lockfileVersion: 3,
      packages: {
        '': {
          devDependencies: {
            '@fontsource/jost': '^5.2.8',
          },
        },
        'node_modules/@fontsource/jost': {
          version: '5.2.8',
        },
      },
    },
    sourceFiles: [],
    publicFontFiles: [],
  });

  assert.ok(violations.some((message) => /package\.json.*@fontsource\/jost/.test(message)));
  assert.ok(violations.some((message) => /package-lock\.json.*@fontsource\/jost/.test(message)));
  assert.ok(violations.every((message) => /explicit owner approval/i.test(message)));
});

test('rejects font delivery that does not resolve from public/fonts', () => {
  const violations = collectFontPolicyViolations({
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    sourceFiles: [
      {
        path: 'src/styles/tokens.css',
        text: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald');
          @font-face {
            font-family: 'Bad Remote';
            src:
              local('Bad Remote'),
              url('https://cdn.example.com/bad-remote.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Missing Local';
            src: url('/fonts/missing-local.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Unassigned Local';
            src: url('/fonts/unassigned-local.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Static Range';
            src: url('/fonts/oswald-600.woff2') format('woff2');
            font-weight: 500 700;
          }
          .synthetic {
            font-synthesis: weight style;
          }
        `,
      },
      {
        path: 'src/layouts/BaseLayout.astro',
        text: `import '@fontsource/oswald/600.css';`,
      },
    ],
    publicFontFiles: ['oswald-600.woff2', 'unassigned-local.woff2'],
    approvedFontFiles: ['oswald-600.woff2'],
  });

  assert.ok(violations.some((message) => /tokens\.css.*fonts\.googleapis\.com/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*local\(\)/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*bad-remote\.woff2/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*missing-local\.woff2.*not found/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*unassigned-local\.woff2.*unassigned/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*font-synthesis.*weight style/.test(message)));
  assert.ok(violations.some((message) => /tokens\.css.*static.*font-weight range 500 700/i.test(message)));
  assert.ok(violations.some((message) => /BaseLayout\.astro.*@fontsource\/oswald/.test(message)));
});

test('accepts a clean dependency graph and local public font references', () => {
  const violations = collectFontPolicyViolations({
    packageJson: {
      name: 'fixture',
      dependencies: {
        astro: '^7.0.7',
      },
    },
    packageLock: {
      name: 'fixture',
      lockfileVersion: 3,
      packages: {
        '': {
          dependencies: {
            astro: '^7.0.7',
          },
        },
        'node_modules/astro': {
          version: '7.0.7',
        },
      },
    },
    sourceFiles: [
      {
        path: 'src/styles/tokens.css',
        text: `
          @font-face {
            font-family: 'Got Soap Oswald';
            src: url('/fonts/oswald-600.woff2') format('woff2');
          }
        `,
      },
      {
        path: 'src/layouts/BaseLayout.astro',
        text: `const preloadFonts = ['/fonts/oswald-600.woff2'];`,
      },
    ],
    publicFontFiles: ['oswald-600.woff2'],
    approvedFontFiles: ['oswald-600.woff2'],
  });

  assert.deepEqual(violations, []);
});

test('requires a repository-wide synthesis lock when requested', () => {
  const violations = collectFontPolicyViolations({
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    sourceFiles: [{ path: 'src/styles/tokens.css', text: ':root { color: black; }' }],
    publicFontFiles: [],
    approvedFontFiles: [],
    requireSynthesisLock: true,
  });

  assert.ok(violations.some((message) => /font-synthesis:\s*none.*required/i.test(message)));
});

test('enforces system-scoped authorization for font files', () => {
  const shared = {
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    publicFontFiles: ['pt-serif-400.woff2'],
    approvedFontFiles: ['pt-serif-400.woff2'],
    fontAuthorities: {
      'pt-serif-400.woff2': {
        system: 'cwaaa',
        sourcePaths: ['src/styles/fonts-cwaaa.css'],
      },
    },
  };

  const accepted = collectFontPolicyViolations({
    ...shared,
    sourceFiles: [
      {
        path: 'src/styles/fonts-cwaaa.css',
        text: "@font-face { src: url('/fonts/pt-serif-400.woff2') format('woff2'); }",
      },
    ],
  });
  const rejected = collectFontPolicyViolations({
    ...shared,
    sourceFiles: [
      {
        path: 'src/styles/fonts-gotsoap.css',
        text: "@font-face { src: url('/fonts/pt-serif-400.woff2') format('woff2'); }",
      },
    ],
  });

  assert.deepEqual(accepted, []);
  assert.ok(rejected.some((message) => /fonts-gotsoap\.css.*cwaaa.*source scope/i.test(message)));
});

test('requires the exact locked preload set', () => {
  const violations = collectFontPolicyViolations({
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    sourceFiles: [
      {
        path: 'src/layouts/BaseLayout.astro',
        text: "const preloadFonts = ['/fonts/oswald-600.woff2', '/fonts/extra.woff2'];",
      },
    ],
    publicFontFiles: ['oswald-600.woff2', 'extra.woff2'],
    approvedFontFiles: ['oswald-600.woff2', 'extra.woff2'],
    requiredPreloadFiles: ['oswald-600.woff2'],
  });

  assert.ok(violations.some((message) => /preload set.*extra\.woff2.*locked.*oswald-600\.woff2/i.test(message)));
});

test('rejects legacy runtime family and token names', () => {
  const violations = collectFontPolicyViolations({
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    sourceFiles: [
      {
        path: 'src/styles/legacy.css',
        text: ".legacy { font-family: 'Jost'; } .alias { font-family: var(--font-label); }",
      },
    ],
    publicFontFiles: [],
    prohibitedRuntimeFamilies: ['Jost'],
    prohibitedRuntimeTokens: ['--font-label'],
  });

  assert.ok(violations.some((message) => /legacy\.css.*Jost.*prohibited runtime family/i.test(message)));
  assert.ok(violations.some((message) => /legacy\.css.*--font-label.*prohibited runtime token/i.test(message)));
});

test('rejects unsupported semantic-role weights and styles', () => {
  const violations = collectFontPolicyViolations({
    packageJson: { name: 'fixture' },
    packageLock: { name: 'fixture', lockfileVersion: 3, packages: { '': {} } },
    sourceFiles: [
      {
        path: 'src/styles/roles.css',
        text: ".heavy { font-family: var(--font-interface); font-weight: 800; } .slanted { font-family: var(--font-production); font-style: italic; }",
      },
    ],
    publicFontFiles: [],
    fontRolePolicy: {
      '--font-interface': { weights: [400, 500, 700], styles: ['normal'] },
      '--font-production': { weights: [500, 600], styles: ['normal'] },
    },
  });

  assert.ok(violations.some((message) => /--font-interface.*weight 800.*unsupported/i.test(message)));
  assert.ok(violations.some((message) => /--font-production.*style italic.*unsupported/i.test(message)));
});
