import assert from 'node:assert/strict';
import test from 'node:test';

import {
  compareJsonDocuments,
  findForbiddenAuthorityPhrases,
  missingRequiredMarkers,
} from './authority-check-lib.mjs';

test('portable pledge contracts must be structurally identical', () => {
  const canonical = {
    contractId: 'lather-pledge.v1',
    version: 1,
    backend: { provider: 'Buttondown', audience: 'one shared audience' },
  };

  assert.deepEqual(compareJsonDocuments(canonical, structuredClone(canonical)), []);

  const drifted = structuredClone(canonical);
  drifted.backend.provider = 'Netlify Forms';
  assert.match(compareJsonDocuments(canonical, drifted).join('\n'), /do not match/i);
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
