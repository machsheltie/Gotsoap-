import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  compareRawDocuments,
  collectAuthorityErrors,
  findForbiddenAuthorityPhrases,
  missingRequiredMarkers,
} from './authority-check-lib.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

test('portable pledge contracts must match byte for byte', () => {
  const canonical = '{"contractId":"lather-pledge.v1","version":1}';

  assert.deepEqual(compareRawDocuments(canonical, canonical), []);

  const whitespaceDrift = '{\n  "contractId": "lather-pledge.v1",\n  "version": 1\n}';
  assert.match(compareRawDocuments(canonical, whitespaceDrift).join('\n'), /do not match/i);
});

test('portable pledge parity rejects whitespace-only JSON drift', () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'gotsoap-authority-'));
  const requiredPaths = [
    'AGENTS.md',
    'CLAUDE.md',
    'docs/HANDOFF.md',
    'docs/design.md',
    'docs/prd/PRD-gotsoap-web-v1.md',
    'docs/strategy/participation-mechanics.md',
    'docs/strategy/cwaaa-divergence-roadmap.md',
    'docs/world/README.md',
    'docs/world/WORLD-BIBLE.md',
    'docs/world/artifact-continuity.md',
    'docs/cwaaa/README.md',
    'docs/cwaaa/world-bible.md',
    'docs/office-of-lather-compliance/README.md',
    'docs/office-of-lather-compliance/design.md',
    'docs/office-of-lather-compliance/PRD-office-v1.md',
    'docs/contracts/pledge.v1.json',
    'docs/cwaaa/contracts/pledge.v1.json',
    'docs/office-of-lather-compliance/contracts/visit-state.v1.json',
  ];

  try {
    for (const relativePath of requiredPaths) {
      const destination = join(fixtureRoot, relativePath);
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(join(repoRoot, relativePath), destination);
    }

    const cwaaaPledgePath = join(fixtureRoot, 'docs/cwaaa/contracts/pledge.v1.json');
    writeFileSync(cwaaaPledgePath, `\n${readFileSync(cwaaaPledgePath, 'utf8')}`);

    assert.match(
      collectAuthorityErrors(fixtureRoot).join('\n'),
      /Portable pledge contracts do not match exactly/i,
    );
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});
test('stale authority claims are rejected in live guidance', () => {
  const findings = findForbiddenAuthorityPhrases(
    'There is no application code yet. The site is currently empty.',
    'AGENTS.md',
  );

  assert.equal(findings.length, 2);
  assert.match(findings.join('\n'), /no application code/i);
  assert.match(findings.join('\n'), /currently empty/i);
});

test('the Office contract is error-state-only and jurisdiction-neutral', () => {
  const officeSpec = [
    'PUBLIC SURFACE MODEL: ERROR STATES ONLY',
    'JURISDICTION: DELIBERATELY UNSPECIFIED',
    'FIRST ACCESS',
    'SAME-SESSION REFRESH',
    'LATER RETURN',
    'CONTINUED INTEREST',
    'BROWSER-LOCAL STATE',
    'NO ORDINARY HOMEPAGE',
  ].join('\n');

  assert.deepEqual(
    missingRequiredMarkers(officeSpec, [
      'ERROR STATES ONLY',
      'DELIBERATELY UNSPECIFIED',
      'FIRST ACCESS',
      'SAME-SESSION REFRESH',
      'LATER RETURN',
      'CONTINUED INTEREST',
      'BROWSER-LOCAL STATE',
      'NO ORDINARY HOMEPAGE',
    ]),
    [],
  );
});

test('master canon markers distinguish truth from protected uncertainty', () => {
  const master = [
    'OBJECTIVE CANON',
    'PUBLIC CLAIM',
    'INTENTIONALLY UNRESOLVED',
    'KNOWLEDGE MATRIX',
  ].join('\n');

  assert.deepEqual(
    missingRequiredMarkers(master, [
      'OBJECTIVE CANON',
      'PUBLIC CLAIM',
      'INTENTIONALLY UNRESOLVED',
      'KNOWLEDGE MATRIX',
    ]),
    [],
  );
});
