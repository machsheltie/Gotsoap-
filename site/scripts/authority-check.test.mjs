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
  validateOfficeStateContract,
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

test('Office escalation advances by distinct sessions, never reload count', () => {
  const corrected = JSON.parse(readFileSync(
    join(repoRoot, 'docs/office-of-lather-compliance/contracts/visit-state.v1.json'),
    'utf8',
  ));

  assert.deepEqual(validateOfficeStateContract(corrected), []);

  const drifted = structuredClone(corrected);
  drifted.thresholds.continuedInterestSession = 4;
  delete drifted.sessionRecord.sessionRefreshCount;
  assert.match(
    validateOfficeStateContract(drifted).join('\n'),
    /third distinct browser session|sessionRefreshCount/i,
  );
});

test('Office state selection preserves the session progression', () => {
  const contract = JSON.parse(readFileSync(
    join(repoRoot, 'docs/office-of-lather-compliance/contracts/visit-state.v1.json'),
    'utf8',
  ));

  assert.deepEqual(validateOfficeStateContract(contract), []);

  contract.stateSelectionOrder.reverse();
  assert.match(
    validateOfficeStateContract(contract).join('\n'),
    /state selection/i,
  );
});

test('Office contract rejects binding privacy, rendering, and transition drift', () => {
  const drifted = JSON.parse(readFileSync(
    join(repoRoot, 'docs/office-of-lather-compliance/contracts/visit-state.v1.json'),
    'utf8',
  ));

  drifted.storage.cookies = true;
  drifted.storage.ipAddress = true;
  drifted.storage.fingerprinting = true;
  drifted.storage.serverPersistence = true;
  drifted.rendering.resolveBeforeReveal = false;
  drifted.rendering.returningBrowserMayFlashFirstAccess = true;
  drifted.terminalIdentity = { scope: 'visitor' };
  drifted.newSessionTransition = { beforeStateSelection: false };
  drifted.sameSessionTransition = { returnSessionCount: { increment: true } };
  drifted.states.find((state) => state.id === 'later_return').selection.postTransitionReturnSessionCount = 2;

  assert.match(
    validateOfficeStateContract(drifted).join('\n'),
    /cookies|IP-free|resolveBeforeReveal|browser-local|pre-selection|reload|post-transition/i,
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
