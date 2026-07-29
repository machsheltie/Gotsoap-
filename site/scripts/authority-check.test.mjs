import assert from 'node:assert/strict';
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import * as authorityCheck from './authority-check-lib.mjs';
import {
  compareRawDocuments,
  collectAuthorityErrors,
  findForbiddenAuthorityPhrases,
  missingRequiredMarkers,
  validateOfficeStateContract,
} from './authority-check-lib.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

test('inline authority lexer exposes nested-curly validity without reparsing', () => {
  const spans = authorityCheck.lexInlineAuthorityTokens('“bad “live”')
    .filter(({ kind }) => kind === 'span');

  assert.deepEqual(spans, [
    {
      kind: 'span',
      delimiter: 'curly',
      raw: '“',
      content: '',
      start: 0,
      end: 1,
      balanced: false,
      valid: false,
    },
    {
      kind: 'span',
      delimiter: 'curly',
      raw: '“live”',
      content: 'live',
      start: 5,
      end: 11,
      balanced: true,
      valid: true,
    },
  ]);
});

test('inline authority lexer preserves distinct same-delimiter spans', () => {
  const spans = authorityCheck.lexInlineAuthorityTokens('"left""right"')
    .filter(({ kind }) => kind === 'span');

  assert.deepEqual(spans, [
    {
      kind: 'span', delimiter: 'ascii', raw: '"left"', content: 'left',
      start: 0, end: 6, balanced: true, valid: true,
    },
    {
      kind: 'span', delimiter: 'ascii', raw: '"right"', content: 'right',
      start: 6, end: 13, balanced: true, valid: true,
    },
  ]);
});
test('escaped styling remains ordinary tokens and normalizes to semantic text', () => {
  const source = 'CWAAA \\"regulates\\" hygiene.';
  const tokens = authorityCheck.lexInlineAuthorityTokens(source);
  const styledTokens = tokens.filter(({ raw }) => raw === '"' || raw === '\\');

  assert.ok(styledTokens.every(({ kind }) => kind === 'text'));
  assert.equal(authorityCheck.normalizeAuthorityClause(tokens), 'CWAAA regulates hygiene.');
});

test('escaped curly styling normalizes without changing possessive apostrophes', () => {
  const source = "CWAAA is the Office's \\“partner\\”.";
  const tokens = authorityCheck.lexInlineAuthorityTokens(source);

  assert.equal(
    authorityCheck.normalizeAuthorityClause(tokens),
    "CWAAA is the Office's partner.",
  );
});

function escapedAuthorityStyle(runLength, opener, content, closer = opener) {
  const escapeRun = '\\'.repeat(runLength);
  return `${escapeRun}${opener}${content}${escapeRun}${closer}`;
}

function escapedAuthorityOpening(runLength, delimiter, content) {
  return `${'\\'.repeat(runLength)}${delimiter}${content}`;
}

test('invalid styling tokens lose adjacent escape runs but keep semantic content', () => {
  const cases = [
    [`CWAAA ${escapedAuthorityOpening(2, '"', 'regulates hygiene.')}`, 'CWAAA regulates hygiene.'],
    [`CWAAA ${escapedAuthorityOpening(2, '`', 'regulates hygiene.')}`, 'CWAAA regulates hygiene.'],
    [`CWAAA ${escapedAuthorityOpening(2, '“', 'regulates hygiene.')}`, 'CWAAA regulates hygiene.'],
    [`CWAAA ${escapedAuthorityOpening(2, '”', 'regulates hygiene.')}`, 'CWAAA regulates hygiene.'],
    [`The Office ${escapedAuthorityOpening(2, '"', 'operates CWAAA.')}`, 'The Office operates CWAAA.'],
    [
      `CWAAA is the Office's ${escapedAuthorityOpening(2, '`', 'partner.')}`,
      "CWAAA is the Office's partner.",
    ],
    [`CWAAA ${escapedAuthorityOpening(4, '"', 'regulates hygiene.')}`, 'CWAAA regulates hygiene.'],
  ];

  assert.equal(cases[0][0], String.raw`CWAAA \\"regulates hygiene.`);
  for (const [source, expected] of cases) {
    const tokens = authorityCheck.lexInlineAuthorityTokens(source);
    const invalidSpan = tokens.find(({ kind }) => kind === 'span');

    assert.equal(invalidSpan?.valid, false);
    assert.equal(authorityCheck.normalizeAuthorityClause(tokens), expected);
  }
});

test('semantic normalization removes complete repeated escape runs around styling', () => {
  const sources = [
    `CWAAA ${escapedAuthorityStyle(2, '"', 'regulates')} hygiene.`,
    `CWAAA ${escapedAuthorityStyle(3, '"', 'regulates')} hygiene.`,
    `CWAAA ${escapedAuthorityStyle(2, '`', 'regulates')} hygiene.`,
    `CWAAA ${escapedAuthorityStyle(3, '`', 'regulates')} hygiene.`,
    `CWAAA ${escapedAuthorityStyle(2, '“', 'regulates', '”')} hygiene.`,
    `CWAAA ${escapedAuthorityStyle(3, '“', 'regulates', '”')} hygiene.`,
  ];

  assert.equal(sources[0], String.raw`CWAAA \\"regulates\\" hygiene.`);
  for (const source of sources) {
    assert.equal(
      authorityCheck.normalizeAuthorityClause(
        authorityCheck.lexInlineAuthorityTokens(source),
      ),
      'CWAAA regulates hygiene.',
    );
  }
});

test('repeated escape-run normalization preserves possessive apostrophes', () => {
  const source = `CWAAA is the Office's ${escapedAuthorityStyle(2, '"', 'partner')}.`;

  assert.equal(
    authorityCheck.normalizeAuthorityClause(
      authorityCheck.lexInlineAuthorityTokens(source),
    ),
    "CWAAA is the Office's partner.",
  );
});

const authorityFixturePaths = [
  'AGENTS.md',
  'CLAUDE.md',
  '.claude/rules/gotsoap-web-design.md',
  'docs/HANDOFF.md',
  'docs/design.md',
  'docs/prd/PRD-gotsoap-web-v1.md',
  'docs/strategy/participation-mechanics.md',
  'docs/strategy/cwaaa-divergence-roadmap.md',
  'docs/world/README.md',
  'docs/world/WORLD-BIBLE.md',
  'docs/world/artifact-continuity.md',
  'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
  'docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf',
  'docs/gotsoap/world-bible.md',
  'docs/cwaaa/README.md',
  'docs/cwaaa/world-bible.md',
  'docs/cwaaa/design.md',
  'docs/cwaaa/PRD-cwaaa-web-v1.md',
  'docs/cwaaa/migration-manifest.md',
  'docs/office-of-lather-compliance/README.md',
  'docs/office-of-lather-compliance/world-bible.md',
  'docs/office-of-lather-compliance/design.md',
  'docs/office-of-lather-compliance/PRD-office-v1.md',
  'docs/contracts/pledge.v1.json',
  'docs/cwaaa/contracts/pledge.v1.json',
  'docs/office-of-lather-compliance/contracts/visit-state.v1.json',
];

function withCleanAuthorityFixture(callback) {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'gotsoap-authority-'));
  try {
    for (const relativePath of authorityFixturePaths) {
      const destination = join(fixtureRoot, relativePath);
      mkdirSync(dirname(destination), { recursive: true });
      cpSync(join(repoRoot, relativePath), destination);
    }
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot),
      [],
      'the unmodified authority fixture must be clean before adversarial mutation',
    );
    callback(fixtureRoot);
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
}

function appendFixtureText(fixtureRoot, relativePath, text) {
  const path = join(fixtureRoot, relativePath);
  writeFileSync(path, `${readFileSync(path, 'utf8')}\n${text}\n`);
}

function removeFixtureText(fixtureRoot, relativePath, text) {
  const path = join(fixtureRoot, relativePath);
  const content = readFileSync(path, 'utf8');
  assert.ok(content.includes(text), `fixture text must exist before removal: ${text}`);
  writeFileSync(path, content.replace(text, ''));
}

function removeAllFixtureText(fixtureRoot, relativePath, text) {
  const path = join(fixtureRoot, relativePath);
  const content = readFileSync(path, 'utf8');
  const pattern = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  assert.ok(pattern.test(content), `fixture text must exist before removal: ${text}`);
  writeFileSync(path, content.replace(pattern, ''));
}

test('portable pledge contracts must match byte for byte', () => {
  const canonical = Buffer.from('{"contractId":"lather-pledge.v1","version":1}');

  assert.deepEqual(compareRawDocuments(canonical, Buffer.from(canonical)), []);

  const whitespaceDrift = Buffer.from('{\n  "contractId": "lather-pledge.v1",\n  "version": 1\n}');
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

const canonMutationCases = [
  {
    name: 'CWAAA established in 1961',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA was established in 1961.',
    expected: /CWAAA chronology.*1961/i,
  },
  {
    name: 'Office established in 2024',
    path: 'docs/office-of-lather-compliance/world-bible.md',
    statement: 'The Office of Lather Compliance was established in 2024.',
    expected: /Office chronology.*2024/i,
  },
  {
    name: 'Got Soap? regulating',
    path: 'docs/gotsoap/world-bible.md',
    statement: 'Got Soap? regulates hygiene.',
    expected: /Got Soap\?.*must not regulate/i,
  },
  {
    name: 'Got Soap? filing findings',
    path: 'docs/gotsoap/world-bible.md',
    statement: 'Got Soap? files findings.',
    expected: /Got Soap\?.*must not file findings/i,
  },
  {
    name: 'Got Soap? regulating in the root design authority',
    path: 'docs/design.md',
    statement: 'Got Soap? regulates hygiene.',
    expected: /Got Soap\?.*must not regulate/i,
  },
  {
    name: 'CWAAA campaigning',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA campaigns for hygiene.',
    expected: /CWAAA.*must not campaign/i,
  },
  {
    name: 'CWAAA regulating',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'CWAAA regulation followed by an unrelated negative sentence',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA regulates hygiene. It never campaigns.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'CWAAA claiming jurisdiction',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA claims jurisdiction over hygiene.',
    expected: /CWAAA.*must not claim jurisdiction/i,
  },
  {
    name: 'Office campaigning',
    path: 'docs/office-of-lather-compliance/world-bible.md',
    statement: 'The Office campaigns for hygiene.',
    expected: /Office.*must not campaign/i,
  },
  {
    name: 'Office owning the pledge',
    path: 'docs/office-of-lather-compliance/world-bible.md',
    statement: 'The Office owns the Lather Pledge.',
    expected: /Office.*must not own the pledge/i,
  },
  {
    name: 'Office filing the pledge',
    path: 'docs/office-of-lather-compliance/world-bible.md',
    statement: 'The Office files the Lather Pledge.',
    expected: /Office.*must not file the pledge/i,
  },
  {
    name: 'CWAAA declared as the Office public-facing layer',
    path: 'docs/cwaaa/world-bible.md',
    statement: "CWAAA is the Office's public-facing layer.",
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'CWAAA declared as the Office front',
    path: 'docs/cwaaa/world-bible.md',
    statement: "CWAAA is the Office's front.",
    expected: /relationship mystery.*front/i,
  },
  {
    name: 'CWAAA declared as an Office division',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA is a division of the Office.',
    expected: /relationship mystery.*division/i,
  },
  {
    name: 'CWAAA declared as the Office parent',
    path: 'docs/cwaaa/world-bible.md',
    statement: "CWAAA is the Office's parent organization.",
    expected: /relationship mystery.*parent/i,
  },
  {
    name: 'resolved relationship followed by an unrelated nonprofit disclaimer',
    path: 'docs/cwaaa/world-bible.md',
    statement: "CWAAA is the Office's public-facing layer. This does not change its nonprofit voice.",
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'objective no-government-front claim',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA is never a government front.',
    expected: /over-resolves.*government front/i,
  },
  {
    name: 'objective Office-knowledge denial',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'CWAAA does not know Office internal systems.',
    expected: /over-resolves.*Office internal systems/i,
  },
  {
    name: 'objective CWAAA operation and staffing denial',
    path: 'docs/cwaaa/README.md',
    statement: 'CWAAA does not contain or operate it, staff it, or speak on its behalf.',
    expected: /over-resolves.*contain or operate/i,
  },
  {
    name: 'objective public-surface impersonation denial',
    path: 'AGENTS.md',
    statement: 'CWAAA never contains, operates, or impersonates the Office.',
    expected: /over-resolves.*impersonates the Office/i,
  },
  {
    name: 'objective Office assessor-dispatch denial',
    path: 'docs/office-of-lather-compliance/world-bible.md',
    statement: 'The Office never dispatches an assessor.',
    expected: /over-resolves.*dispatches an assessor/i,
  },
  {
    name: 'third Office voice in IVR authority',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'There is a third Office voice.',
    expected: /IVR authority.*third Office voice/i,
  },
  {
    name: 'audible transfer in IVR authority',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'There is an audible transfer to the Office.',
    expected: /IVR authority.*audible transfer/i,
  },
  {
    name: 'third Office voice stated with an active-voice variant',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'A third Office voice now speaks.',
    expected: /IVR authority.*third Office voice/i,
  },
  {
    name: 'audible transfer stated as a Voice B action',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'Voice B audibly transfers the caller to the Office.',
    expected: /IVR authority.*audible transfer/i,
  },
  {
    name: 'Got Soap assigned complete IVR operation',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'Got Soap? operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'CWAAA assigned complete IVR operation',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'CWAAA operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'Office assigned complete IVR operation',
    path: 'docs/world/artifact-continuity.md',
    statement: 'The Office operates the complete IVR.',
    expected: /IVR operational ownership must remain intentionally unresolved/i,
  },
  {
    name: 'exact IVR handoff resolved',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'Control transfers from CWAAA to the Office when Voice B says Office of Lather Compliance.',
    expected: /exact IVR handoff must remain intentionally unresolved/i,
  },
  {
    name: 'CWAAA operating the Office',
    path: 'docs/strategy/cwaaa-divergence-roadmap.md',
    statement: 'CWAAA operates the Office.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'Office declared as a division of CWAAA',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office is a division of CWAAA.',
    expected: /relationship mystery.*division/i,
  },
  {
    name: 'Office declared as a technical service operated by CWAAA',
    path: 'docs/strategy/cwaaa-divergence-roadmap.md',
    statement: 'The Office is a technical service operated by CWAAA.',
    expected: /relationship mystery.*technical service/i,
  },
  {
    name: 'CWAAA declared as a technical-services provider to the Office',
    path: 'docs/strategy/cwaaa-divergence-roadmap.md',
    statement: 'CWAAA provides technical services to the Office.',
    expected: /relationship mystery.*technical services/i,
  },
  {
    name: 'CWAAA regulating in shared world authority',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'Office owning the pledge in shared world authority',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office owns the Lather Pledge.',
    expected: /Office.*must not own the pledge/i,
  },
  {
    name: 'date-first CWAAA 1961 chronology drift',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'In 1961, CWAAA was established.',
    expected: /CWAAA chronology.*1961/i,
  },
  {
    name: 'date-first Office 2024 chronology drift',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'In 2024, the Office was founded.',
    expected: /Office chronology.*2024/i,
  },
  {
    name: 'same-sentence unrelated-negation relationship bypass',
    path: 'docs/cwaaa/world-bible.md',
    statement: "This does not affect the seal, and CWAAA is the Office's public-facing layer.",
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'three presented voices in IVR authority',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'The call has three presented voices.',
    expected: /IVR authority.*two presented voices/i,
  },
  {
    name: 'Voice C as Office representative in IVR authority',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'Voice C is the Office representative.',
    expected: /IVR authority.*Voice C/i,
  },
  {
    name: 'audible handoff to the Office in IVR authority',
    path: 'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    statement: 'An audible handoff transfers the caller to the Office.',
    expected: /IVR authority.*audible transfer/i,
  },
  {
    name: 'objective denial that Office is technically operated by CWAAA',
    path: 'docs/strategy/cwaaa-divergence-roadmap.md',
    statement: 'The Office is not a technical service operated by CWAAA.',
    expected: /over-resolves.*operational separation/i,
  },
  {
    name: 'objective denial that CWAAA operates the Office',
    path: 'docs/strategy/cwaaa-divergence-roadmap.md',
    statement: 'CWAAA does not operate the Office.',
    expected: /over-resolves.*operational separation/i,
  },
  {
    name: 'CWAAA labelled as the Office partner',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA is the Office's partner.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'CWAAA overseen by the Office',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is overseen by the Office.',
    expected: /relationship mystery.*overseen/i,
  },
  {
    name: 'CWAAA coordinating with the Office',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA works in coordination with the Office.',
    expected: /relationship mystery.*coordination/i,
  },
  {
    name: 'CWAAA acting on behalf of the Office',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA works on behalf of the Office.',
    expected: /relationship mystery.*behalf/i,
  },
  {
    name: 'Office operating CWAAA',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office operates CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'Office operating through CWAAA',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office operates through CWAAA.',
    expected: /relationship mystery.*operates through/i,
  },
  {
    name: 'CWAAA controlled by the Office',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is controlled by the Office.',
    expected: /relationship mystery.*controlled/i,
  },
  {
    name: 'CWAAA partner label in curly scare quotes',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA is the Office's “partner”.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'CWAAA partner label in ASCII scare quotes',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA is the Office's \"partner\".",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'CWAAA regulation verb in curly scare quotes',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'Office operation verb in curly scare quotes',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office “operates” CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'CWAAA partner label styled as inline code',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA is the Office's `partner`.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'whole forbidden partner predicate in curly quotes',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA “is the Office's partner”.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'whole forbidden partner predicate styled as inline code',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA `is the Office's partner`.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'unrelated example clause before styled partner assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "This example is unrelated; CWAAA is the Office's “partner”.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'archived clause before styled regulation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The archived material is separate, but CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'phrase clause before styled Office operation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The phrase is approved; The Office “operates” CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'draft clause before inline-code partner assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "The draft is final; CWAAA `is the Office's partner`.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'historical clause before styled partner assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "Historical notes are separate; CWAAA is the Office's “partner”.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'wording clause before styled regulation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The wording is approved, but CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'typographic Office possessive with styled partner',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is the Office’s “partner”.',
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'typographic Office possessive with unquoted partner',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is the Office’s partner.',
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'historical keywords after an unrelated styled regulation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA “regulates” hygiene (historical files are archived).',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'archived example after an unrelated styled partner assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: "CWAAA is the Office's “partner” — this unrelated example is archived.",
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'historical quote after an unrelated styled Office operation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office “operates” CWAAA — the historical quote is separate.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'historical prefix unrelated to styled regulation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'Historical files are archived and CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'separator outside a balanced span still exposes later assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “CWAAA regulates hygiene.” is historical; CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'unbalanced curly quote does not protect later clause',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “is incomplete; CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'unbalanced ASCII quote does not protect later clause',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording "is incomplete; CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'unbalanced inline code does not protect later clause',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording `is incomplete; CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'nested curly opener does not protect later styled regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “is incomplete; CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'nested curly opener does not protect later styled Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “is incomplete. The Office “operates” CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'odd ASCII quote stream does not protect later styled regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording "is incomplete; CWAAA "regulates" hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'odd inline-code stream does not protect later styled regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording `is incomplete; CWAAA `regulates` hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'nested curly opener without a clause boundary does not protect regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “is incomplete and CWAAA “regulates” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'consecutive curly openers do not create a documented regulation span',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording ““CWAAA regulates hygiene.”',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'nested curly opener without a clause boundary does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording “is incomplete and The Office “operates” CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'even ASCII mispairing with a separator does not protect regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording "is incomplete; CWAAA "regulates" hygiene. "tail',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'even inline-code mispairing with a separator does not protect regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording `is incomplete; CWAAA `regulates` hygiene. `tail',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'even ASCII mispairing without a clause boundary does not protect regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording "is incomplete and CWAAA "regulates" hygiene. "tail',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'even inline-code mispairing without a clause boundary does not protect regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The rejected wording `is incomplete and CWAAA `regulates` hygiene. `tail',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'escaped ASCII styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA \\"regulates\\" hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'escaped inline-code styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA \\`regulates\\` hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'escaped ASCII styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office \\"operates\\" CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'escaped ASCII styling does not protect the Office partner label',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is the Office\'s \\"partner\\".',
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'escaped inline-code styling does not protect the Office partner label',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA is the Office\'s \\`partner\\`.',
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'escaped curly styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'CWAAA \\“regulates\\” hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'escaped curly styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'The Office \\“operates\\” CWAAA.',
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'two-slash ASCII styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityStyle(2, '"', 'regulates')} hygiene.`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash inline-code styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityStyle(2, '`', 'regulates')} hygiene.`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash ASCII styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `The Office ${escapedAuthorityStyle(2, '"', 'operates')} CWAAA.`,
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'two-slash ASCII styling does not protect the Office partner label',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA is the Office's ${escapedAuthorityStyle(2, '"', 'partner')}.`,
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'three-slash ASCII styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityStyle(3, '"', 'regulates')} hygiene.`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'three-slash inline-code styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `The Office ${escapedAuthorityStyle(3, '`', 'operates')} CWAAA.`,
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'two-slash curly styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `The Office ${escapedAuthorityStyle(2, '“', 'operates', '”')} CWAAA.`,
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'three-slash curly styling does not protect the Office partner label',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA is the Office's ${escapedAuthorityStyle(3, '“', 'partner', '”')}.`,
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'two-slash unclosed ASCII styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityOpening(2, '"', 'regulates hygiene.')}`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash unclosed inline-code styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityOpening(2, '`', 'regulates hygiene.')}`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash unclosed curly styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityOpening(2, '“', 'regulates hygiene.')}`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash orphan curly closer does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityOpening(2, '”', 'regulates hygiene.')}`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'two-slash unclosed ASCII styling does not protect Office operation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `The Office ${escapedAuthorityOpening(2, '"', 'operates CWAAA.')}`,
    expected: /relationship mystery.*operates/i,
  },
  {
    name: 'two-slash unclosed inline-code styling does not protect the Office partner label',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA is the Office's ${escapedAuthorityOpening(2, '`', 'partner.')}`,
    expected: /relationship mystery.*partner/i,
  },
  {
    name: 'four-slash unclosed ASCII styling does not protect CWAAA regulation',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: `CWAAA ${escapedAuthorityOpening(4, '"', 'regulates hygiene.')}`,
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'curly documented list with an unquoted regulation assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'Rejected examples: “CWAAA regulates hygiene.” and CWAAA regulates hygiene, plus “The Office operates CWAAA.”',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'ASCII documented list with a live regulation assertion in the tail',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'Rejected examples: "CWAAA regulates hygiene." and "The Office operates CWAAA." CWAAA regulates hygiene.',
    expected: /CWAAA.*must not regulate/i,
  },
  {
    name: 'inline-code documented list with an unquoted partner assertion',
    path: 'docs/world/WORLD-BIBLE.md',
    statement: 'Forbidden examples: `CWAAA regulates hygiene.` and CWAAA is the Office\'s partner, plus `The Office operates CWAAA.`',
    expected: /relationship mystery.*partner/i,
  },
];

for (const { name, path, statement, expected } of canonMutationCases) {
  test(`path-aware canon rejects ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

const unrelatedNegationBypassCases = [
  {
    name: 'relationship assertion after a seal disclaimer',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'Although this does not affect the seal, CWAAA is the Office’s public-facing layer.',
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'records-room assertion after a paper-manila negation',
    path: 'CLAUDE.md',
    statement: 'Although CWAAA does not use paper-manila, the site uses records-room styling.',
    expected: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'Shop grid assertion after a product-card negation',
    path: 'docs/design.md',
    statement: 'Although Shop does not use product cards, arrange products in an equal responsive product grid.',
    expected: /obsolete Shop grid guidance/i,
  },
  {
    name: 'public disclosure assertion after a Privacy disclaimer',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Although this does not affect Privacy, render “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
];

for (const { name, path, statement, expected } of unrelatedNegationBypassCases) {
  test(`unrelated negation does not protect ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

const candidateLocalNegationBypassCases = [
  {
    name: 'causal no-comma relationship assertion',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'This does not affect the seal because CWAAA is the Office’s public-facing layer.',
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'Markdown-wrapped relationship assertion',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'This does not affect the seal because\n**CWAAA is the Office’s public-facing layer.**',
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'causal records-room assertion',
    path: 'CLAUDE.md',
    statement: 'CWAAA does not use paper-manila because the site uses records-room styling.',
    expected: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'causal Shop grid assertion',
    path: 'docs/design.md',
    statement: 'Shop does not use product cards because products are arranged in an equal responsive product grid.',
    expected: /obsolete Shop grid guidance/i,
  },
  {
    name: 'later public-disclosure directive',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render a privacy warning because render “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'Markdown-wrapped public-disclosure directive',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render a privacy warning because\nrender “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'comma-but later public-disclosure directive',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render a privacy warning, but render “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
];

for (const { name, path, statement, expected } of candidateLocalNegationBypassCases) {
  test(`candidate-local negation rejects ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

const candidateLocalProtectionCases = [
  {
    name: 'direct styling negation',
    path: 'CLAUDE.md',
    statement: 'CWAAA is not a records-room website.',
    diagnostic: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'intentionally unresolved relationship',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'It remains intentionally unresolved whether CWAAA is the Office’s public-facing layer.',
    diagnostic: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'explicit Shop prohibition',
    path: 'docs/design.md',
    statement: 'Do not arrange products in an equal responsive product grid.',
    diagnostic: /obsolete Shop grid guidance/i,
  },
  {
    name: 'explicit disclosure prohibition',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render “This is satire” in the global footer.',
    diagnostic: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'documented historical disclosure example',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Historical/superseded wording: Render “This is satire” in the global footer.',
    diagnostic: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'documented rejected relationship example',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'Rejected example: “CWAAA is the Office’s public-facing layer.”',
    diagnostic: /relationship mystery.*public-facing layer/i,
  },
];

for (const { name, path, statement, diagnostic } of candidateLocalProtectionCases) {
  test(`candidate-local protection preserves ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.deepEqual(
        collectAuthorityErrors(fixtureRoot).filter((error) => diagnostic.test(error)),
        [],
      );
    });
  });
}

const allCandidateBypassCases = [
  {
    name: 'repeated Shop assertion after its direct prohibition',
    path: 'docs/design.md',
    statement: 'Do not arrange products in an equal responsive product grid but arrange products in an equal responsive product grid.',
    expected: /obsolete Shop grid guidance/i,
  },
  {
    name: 'repeated top-level styling assertion after its direct prohibition',
    path: 'CLAUDE.md',
    statement: 'Do not use records-room styling but use records-room styling.',
    expected: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'relationship assertion after and coordination',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'This does not affect the seal and CWAAA is the Office’s public-facing layer.',
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'relationship assertion after or coordination',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'This does not affect the seal or CWAAA is the Office’s public-facing layer.',
    expected: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'disclosure directive after and coordination',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render a privacy warning and render “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'disclosure directive after or coordination',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Do not render a privacy warning or render “This is satire” in the global footer.',
    expected: /fiction disclosure belongs behind the creator\/About seam/i,
  },
  {
    name: 'relationship assertion after no-question certainty',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'There is no question that CWAAA is the Office’s public-facing layer.',
    expected: /relationship mystery.*public-facing layer/i,
  },
];

for (const { name, path, statement, expected } of allCandidateBypassCases) {
  test(`all-candidate rejection catches ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

const allCandidateProtectionCases = [
  {
    name: 'a single direct Shop prohibition',
    path: 'docs/design.md',
    statement: 'Do not arrange products in an equal responsive product grid.',
    diagnostic: /obsolete Shop grid guidance/i,
  },
  {
    name: 'an open question whether the relationship exists',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'It remains an open question whether CWAAA is the Office’s public-facing layer.',
    diagnostic: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'a question that remains unresolved whether the relationship exists',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'The question remains unresolved whether CWAAA is the Office’s public-facing layer.',
    diagnostic: /relationship mystery.*public-facing layer/i,
  },
  {
    name: 'a documented relationship example list',
    path: 'docs/cwaaa/world-bible.md',
    statement: 'Forbidden examples: `CWAAA is the Office’s partner.` and `The Office operates CWAAA.`',
    diagnostic: /relationship mystery|operational separation/i,
  },
  {
    name: 'a documented disclosure example list',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    statement: 'Rejected examples: "Render \'This is satire\' in the global footer." and "State \'This is fictional\' in the global footer."',
    diagnostic: /fiction disclosure belongs behind the creator\/About seam/i,
  },
];

for (const { name, path, statement, diagnostic } of allCandidateProtectionCases) {
  test(`all-candidate protection preserves ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.deepEqual(
        collectAuthorityErrors(fixtureRoot).filter((error) => diagnostic.test(error)),
        [],
      );
    });
  });
}

const staleCreativeDirectionCases = [
  {
    name: 'paper-manila as the CWAAA primary stock',
    path: 'docs/cwaaa/design.md',
    text: 'Primary stock: paper-manila.',
    expected: /obsolete CWAAA paper-universe guidance/i,
  },
  {
    name: 'CWAAA records room as the governing composition',
    path: 'docs/cwaaa/design.md',
    text: 'The site behaves like a records room with index logic.',
    expected: /obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'photo-led CWAAA hero prohibition',
    path: 'docs/cwaaa/design.md',
    text: 'Avoid a photo-led hero.',
    expected: /obsolete CWAAA hero guidance/i,
  },
  {
    name: 'case files retained as the public route',
    path: 'docs/cwaaa/PRD-cwaaa-web-v1.md',
    text: '| `/case-files` | Public case-file index |',
    expected: /obsolete CWAAA public route/i,
  },
  {
    name: 'equal responsive Shop product grid',
    path: 'docs/design.md',
    text: 'Arrange products in an equal responsive product grid.',
    expected: /obsolete Shop grid guidance/i,
  },
  {
    name: 'standard ecommerce Shop product cards',
    path: 'docs/design.md',
    text: 'Use standard ecommerce product cards.',
    expected: /obsolete Shop card guidance/i,
  },
  {
    name: 'Shop ratings and recommendations',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    text: 'Include ratings and customers-also-bought recommendations.',
    expected: /obsolete Shop ecommerce guidance/i,
  },
];

for (const { name, path, text, expected } of staleCreativeDirectionCases) {
  test(`creative-direction drift is rejected: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

test('participation strategy rejects a live Case Files target directive', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/strategy/participation-mechanics.md',
      'Target state: publish Case Files at `/case-files` as a primary CWAAA destination.',
    );
    assert.match(
      collectAuthorityErrors(fixtureRoot).join('\n'),
      /docs\/strategy\/participation-mechanics\.md:.*obsolete CWAAA public Case Files target/i,
    );
  });
});

test('participation strategy permits an explicit current-runtime Case Files redirect history', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/strategy/participation-mechanics.md',
      'Current-state migration history records the combined runtime legacy `/case-files` → `/recovery-stories` redirect.',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete CWAAA public Case Files target/i.test(error)
      )),
      [],
    );
  });
});

const topLevelStalePositiveCases = [
  {
    name: 'AGENTS restores paper-manila as CWAAA primary stock',
    path: 'AGENTS.md',
    text: 'Use paper-manila as CWAAA primary stock and visual universe.',
    expected: /AGENTS\.md:.*obsolete CWAAA paper-universe guidance/i,
  },
  {
    name: 'AGENTS restores paper-manila throughout CWAAA',
    path: 'AGENTS.md',
    text: 'Use paper-manila throughout CWAAA.',
    expected: /AGENTS\.md:.*obsolete CWAAA paper-universe guidance/i,
  },
  {
    name: 'CLAUDE declares CWAAA a records-room website',
    path: 'CLAUDE.md',
    text: 'CWAAA is a records-room website.',
    expected: /CLAUDE\.md:.*obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'CLAUDE restores a CWAAA records-room website',
    path: 'CLAUDE.md',
    text: 'Build the CWAAA website as a records room with index logic.',
    expected: /CLAUDE\.md:.*obsolete CWAAA records-room guidance/i,
  },
  {
    name: 'path-scoped rule restores a styled Office terminal',
    path: '.claude/rules/gotsoap-web-design.md',
    text: 'Use a styled legacy terminal for the Office page.',
    expected: /\.claude\/rules\/gotsoap-web-design\.md:.*obsolete Office terminal styling/i,
  },
  {
    name: 'HANDOFF restores an equal Shop product grid',
    path: 'docs/HANDOFF.md',
    text: 'Arrange Shop in an equal product grid.',
    expected: /docs\/HANDOFF\.md:.*obsolete Shop grid guidance/i,
  },
  {
    name: 'AGENTS restores global legal-footer fiction disclosure',
    path: 'AGENTS.md',
    text: 'State that CWAAA is fictional satire in the global legal/footer copy.',
    expected: /AGENTS\.md:.*fiction disclosure belongs behind the creator\/About seam/i,
  },
];

for (const { name, path, text, expected } of topLevelStalePositiveCases) {
  test(`top-level stale-positive drift is rejected: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

test('top-level stale-positive scan permits an explicit prohibition', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      '.claude/rules/gotsoap-web-design.md',
      'Do not use paper-manila as CWAAA primary stock or visual universe.',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete CWAAA paper-universe guidance/i.test(error)
      )),
      [],
    );
  });
});

test('top-level stale-positive scan permits a records-room negation', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'CLAUDE.md',
      'CWAAA is not a records-room website.',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete CWAAA records-room guidance/i.test(error)
      )),
      [],
    );
  });
});

test('top-level stale-positive scan permits documented historical wording', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'CLAUDE.md',
      'Historical/superseded wording: “Use a styled legacy terminal for the Office page.”',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete Office terminal styling/i.test(error)
      )),
      [],
    );
  });
});

const publicDisclosureDriftCases = [
  {
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    text: 'Render “This is satire and unaffiliated spec work” in the global footer.',
  },
  {
    path: 'docs/cwaaa/PRD-cwaaa-web-v1.md',
    text: 'State that CWAAA is fictional satire in global footer copy.',
  },
  {
    path: 'docs/cwaaa/world-bible.md',
    text: 'State clearly in accessible legal/footer copy that CWAAA is fictional satire.',
  },
];

for (const { path, text } of publicDisclosureDriftCases) {
  test(`public fiction disclosure is rejected in ${path}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        /fiction disclosure belongs behind the creator\/About seam/i,
      );
    });
  });
}

test('public fiction disclosure rejects a Markdown-wrapped directive', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/prd/PRD-gotsoap-web-v1.md',
      'Render “This is satire and unaffiliated spec work” in the\nglobal footer.',
    );
    assert.match(
      collectAuthorityErrors(fixtureRoot).join('\n'),
      /docs\/prd\/PRD-gotsoap-web-v1\.md:.*fiction disclosure belongs behind the creator\/About seam/i,
    );
  });
});

for (const [name, path, text] of [
  [
    'private production canon',
    'docs/cwaaa/world-bible.md',
    'Private production canon identifies CWAAA as a fictional advocacy nonprofit.',
  ],
  [
    'explicit global-footer prohibition',
    'docs/cwaaa/PRD-cwaaa-web-v1.md',
    'Do not state that CWAAA is fictional satire in global footer copy.',
  ],
  [
    'rejected global-footer example',
    'docs/prd/PRD-gotsoap-web-v1.md',
    'Rejected example: Render “This is satire” in the global footer.',
  ],
  [
    'historical superseded CWAAA footer direction',
    'docs/cwaaa/PRD-cwaaa-web-v1.md',
    'Historical/superseded wording: State that CWAAA is fictional satire in global footer copy.',
  ],
]) {
  test(`public disclosure drift permits ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.deepEqual(
        collectAuthorityErrors(fixtureRoot).filter((error) => (
          /fiction disclosure belongs behind the creator\/About seam/i.test(error)
        )),
        [],
      );
    });
  });
}

for (const marker of ['Privacy', 'Terms', 'DMCA']) {
  test(`legal-seam authority gates ${marker}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      removeAllFixtureText(fixtureRoot, 'docs/HANDOFF.md', marker);
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        new RegExp(`missing required marker.*${marker}`, 'i'),
      );
    });
  });
}

const protectedShopGuidanceCases = [
  {
    name: 'explicit grid prohibition',
    path: 'docs/design.md',
    text: 'Do not arrange products in an equal responsive product grid.',
    diagnostic: /obsolete Shop grid guidance/i,
  },
  {
    name: 'explicit ecommerce-card prohibition',
    path: 'docs/design.md',
    text: 'Never use standard ecommerce product cards.',
    diagnostic: /obsolete Shop card guidance/i,
  },
  {
    name: 'historical ratings and recommendations example',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    text: 'Historical example: Include ratings and customers-also-bought recommendations.',
    diagnostic: /obsolete Shop ecommerce guidance/i,
  },
  {
    name: 'rejected ratings and recommendations example',
    path: 'docs/prd/PRD-gotsoap-web-v1.md',
    text: 'Rejected example: Include ratings and customers-also-bought recommendations.',
    diagnostic: /obsolete Shop ecommerce guidance/i,
  },
];

for (const { name, path, text, diagnostic } of protectedShopGuidanceCases) {
  test(`Shop drift permits protected semantic context: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, text);
      assert.deepEqual(
        collectAuthorityErrors(fixtureRoot).filter((error) => diagnostic.test(error)),
        [],
      );
    });
  });
}

const obsoleteOfficeDesignCases = [
  ['styled terminal frame', 'Use a centered legacy terminal frame.', /obsolete Office terminal styling/i],
  ['Office accent color', 'Use muted red as the Office accent color.', /obsolete Office accent styling/i],
  ['Office type pairing', 'Pair the mono face with a serif display face.', /obsolete Office type pairing/i],
  ['Office scanlines', 'Add subtle scanlines to the page.', /obsolete Office horror styling/i],
];

for (const [name, text, expected] of obsoleteOfficeDesignCases) {
  test(`Office styling drift is rejected with a path-aware diagnostic: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, 'docs/office-of-lather-compliance/design.md', text);
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        new RegExp(
          `docs/office-of-lather-compliance/design\\.md:.*${expected.source}`,
          expected.flags,
        ),
      );
    });
  });
}

test('Office styling permits explicitly rejected styled-terminal examples', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    for (const [, text] of obsoleteOfficeDesignCases) {
      appendFixtureText(
        fixtureRoot,
        'docs/office-of-lather-compliance/design.md',
        `Rejected example: \`${text}\``,
      );
    }
    assert.deepEqual(collectAuthorityErrors(fixtureRoot), []);
  });
});

test('Office styling permits an explicit prohibition of the terminal-frame claim', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/office-of-lather-compliance/design.md',
      'Do not use a centered legacy terminal frame.',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete Office terminal styling/i.test(error)
      )),
      [],
    );
  });
});

test('Office styling permits historical superseded accent guidance', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/office-of-lather-compliance/design.md',
      'Historical/superseded wording: "Use muted red as the Office accent color."',
    );
    assert.deepEqual(
      collectAuthorityErrors(fixtureRoot).filter((error) => (
        /obsolete Office accent styling/i.test(error)
      )),
      [],
    );
  });
});

const currentLiveAuthorityPaths = [
  'AGENTS.md',
  'CLAUDE.md',
  '.claude/rules/gotsoap-web-design.md',
  'docs/HANDOFF.md',
  'docs/design.md',
  'docs/prd/PRD-gotsoap-web-v1.md',
  'docs/strategy/participation-mechanics.md',
  'docs/strategy/cwaaa-divergence-roadmap.md',
  'docs/world/README.md',
  'docs/world/WORLD-BIBLE.md',
  'docs/world/artifact-continuity.md',
  'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
  'docs/gotsoap/world-bible.md',
  'docs/cwaaa/README.md',
  'docs/cwaaa/world-bible.md',
  'docs/cwaaa/design.md',
  'docs/cwaaa/PRD-cwaaa-web-v1.md',
  'docs/cwaaa/migration-manifest.md',
  'docs/office-of-lather-compliance/README.md',
  'docs/office-of-lather-compliance/world-bible.md',
  'docs/office-of-lather-compliance/design.md',
  'docs/office-of-lather-compliance/PRD-office-v1.md',
];

for (const path of currentLiveAuthorityPaths) {
  test(`path-aware canon scans current live authority: ${path}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, 'CWAAA regulates hygiene.');
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        /CWAAA.*must not regulate/i,
      );
    });
  });
}

for (const [name, path, statement] of [
  [
    'intentionally unresolved operational possibility',
    'docs/world/WORLD-BIBLE.md',
    'It remains intentionally unresolved whether CWAAA operates the Office.',
  ],
  [
    'forbidden inline-code example',
    'docs/world/README.md',
    'Forbidden example: `CWAAA operates the Office.`',
  ],
  [
    'historical superseded quotation',
    'docs/world/artifact-continuity.md',
    'Historical/superseded wording: "The Office is a division of CWAAA."',
  ],
]) {
  test(`path-aware canon permits documented non-assertion: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.deepEqual(collectAuthorityErrors(fixtureRoot), []);
    });
  });
}

test('path-aware canon permits a relationship possibility that remains intentionally unresolved', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      'docs/cwaaa/world-bible.md',
      "It remains intentionally unresolved whether CWAAA is the Office's public-facing layer.",
    );
    assert.deepEqual(collectAuthorityErrors(fixtureRoot), []);
  });
});

for (const [name, statement] of [
  ['Markdown block quote', '> “CWAAA regulates hygiene.”'],
  [
    'archived draft separated from its block quote',
    'The archived draft said:\n\n> “CWAAA regulates hygiene.”',
  ],
  [
    'inline rejected quotation',
    'The phrase “CWAAA regulates hygiene.” is quoted here as a rejected example.',
  ],
  [
    'balanced curly quote keeps comma conjunction inside rejected wording',
    'The rejected wording “CWAAA regulates hygiene, but the Office does not.” is historical.',
  ],
  [
    'balanced curly quote keeps semicolon inside forbidden example',
    "The forbidden example “CWAAA is the Office's partner; the Office operates CWAAA.” is quoted here.",
  ],
  [
    'balanced inline code keeps semicolon inside forbidden example',
    "The forbidden example `CWAAA is the Office's partner; the Office operates CWAAA.` is quoted here.",
  ],
  [
    'balanced ASCII quote keeps comma conjunction inside rejected wording',
    'The rejected wording "CWAAA regulates hygiene, but the Office does not." is historical.',
  ],
  [
    'copular rejected example directly binds its quotation',
    'The rejected example is “CWAAA regulates hygiene.”',
  ],
  [
    'copular historical wording directly binds its quotation',
    'The historical wording was “CWAAA regulates hygiene.”',
  ],
  [
    'generic copular quotation has an explicit rejection predicate',
    'This quotation was “CWAAA regulates hygiene.” and is explicitly rejected.',
  ],
  [
    'documented ASCII span is not poisoned by a later unmatched marker',
    'The rejected wording "CWAAA regulates hygiene." is historical. Later unmatched " marker.',
  ],
  [
    'documented inline-code span is not poisoned by a later unmatched marker',
    'The rejected wording `CWAAA regulates hygiene.` is historical. Later unmatched ` marker.',
  ],
  [
    'explicit rejected curly example list',
    'Rejected examples: “CWAAA regulates hygiene.” and “The Office operates CWAAA.”',
  ],
  [
    'explicit rejected ASCII example list',
    'Rejected examples: "CWAAA regulates hygiene." and "The Office operates CWAAA."',
  ],
  [
    'explicit forbidden inline-code example list',
    "Forbidden examples: `CWAAA regulates hygiene.` and `CWAAA is the Office's partner.`",
  ],
  [
    'explicit rejected curly example list with an Oxford comma',
    'Rejected examples: “CWAAA regulates hygiene.”, and “The Office operates CWAAA.”',
  ],
  [
    'explicit rejected curly three-example semicolon list',
    "Rejected examples: “CWAAA regulates hygiene.”; “The Office operates CWAAA.”; and “CWAAA is the Office's partner.”",
  ],
  [
    'explicit rejected ASCII example list with an Oxford comma',
    'Rejected examples: "CWAAA regulates hygiene.", and "The Office operates CWAAA."',
  ],
  [
    'explicit forbidden inline-code three-example semicolon list',
    "Forbidden examples: `CWAAA regulates hygiene.`; `The Office operates CWAAA.`; and `CWAAA is the Office's partner.`",
  ],
  [
    'correct chronology juxtaposition',
    'The Office has existed since 1961, while CWAAA was established in 2024.',
  ],
  ['corrective CWAAA date negation', 'CWAAA was established in 2024, not 1961.'],
  ['corrective Office date negation', 'The Office was founded in 1961, not 2024.'],
  [
    'forbidden partner example',
    "Forbidden example: `CWAAA is the Office's partner.`",
  ],
  [
    'unresolved control relationship',
    'It remains intentionally unresolved whether CWAAA is controlled by the Office.',
  ],
]) {
  test(`path-aware canon permits non-assertive or correct statement: ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, 'docs/world/WORLD-BIBLE.md', statement);
      assert.deepEqual(collectAuthorityErrors(fixtureRoot), []);
    });
  });
}

test('collector reads contradictions from the expanded live Claude design rule', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    appendFixtureText(
      fixtureRoot,
      '.claude/rules/gotsoap-web-design.md',
      'CWAAA regulates hygiene.',
    );
    assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), /CWAAA.*must not regulate/i);
  });
});

for (const [name, mutate, expected] of [
  [
    'missing IVR PDF',
    (path) => unlinkSync(path),
    /IVR integrity.*missing/i,
  ],
  [
    'empty IVR PDF',
    (path) => writeFileSync(path, Buffer.alloc(0)),
    /IVR integrity.*empty/i,
  ],
  [
    'modified IVR PDF',
    (path) => {
      const bytes = readFileSync(path);
      bytes[0] ^= 0xff;
      writeFileSync(path, bytes);
    },
    /IVR integrity.*SHA-256/i,
  ],
]) {
  test(`IVR integrity rejects ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      mutate(join(fixtureRoot, 'docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf'));
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

for (const marker of [
  'Field Assessors',
  'the hidden branch',
  'Office after-hours voicemail',
  '“Everything is noted”',
  '“binding”',
  'gotsoap dot netlify dot app',
  'slash sniff test',
  'Deployment-specific substitution',
  'Number/placement owner',
  'Presented authorship',
  'Operational owner',
  'INTENTIONALLY UNRESOLVED',
]) {
  test(`IVR authority gates protected marker: ${marker}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      removeAllFixtureText(
        fixtureRoot,
        'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
        marker,
      );
      assert.match(
        collectAuthorityErrors(fixtureRoot).join('\n'),
        new RegExp(`missing required marker.*${marker.replace(/[“”]/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i'),
      );
    });
  });
}

test('HANDOFF contains the full precedence, target decisions, and runtime distinction', () => {
  const handoff = readFileSync(join(repoRoot, 'docs/HANDOFF.md'), 'utf8');
  assert.deepEqual(missingRequiredMarkers(handoff, [
    '1. Owner decisions recorded in `docs/HANDOFF.md`',
    '2. `docs/world/WORLD-BIBLE.md`',
    '3. The relevant per-system world bible',
    '4. The relevant current design authority and PRD',
    '5. Shared and per-system machine-readable contracts',
    '6. Artifact briefs and copy decks',
    '7. Historical documents',
    '`docs/gotsoap/world-bible.md`',
    '`docs/office-of-lather-compliance/world-bible.md`',
    'Shop remains canonical',
    '`/broadcast`',
    'full-bleed homepage premiere seam',
    'phone number is owned by Got Soap?',
    'two presented voices',
    'no audible transfer',
    'Office has existed since 1961',
    'CWAAA was established in 2024',
    'third distinct browser session',
    'current runtime',
    'approved target',
  ], 'docs/HANDOFF.md'), []);
});

test('top-level agent entry points synchronize the revised creative authority', () => {
  const markerSets = new Map([
    ['docs/HANDOFF.md', [
      'A COALITION MAKING ITS CASE IN PUBLIC',
      'THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED',
      'FASHION CATALOGUE PRETENDING TO BE A STORE',
      'RECOVERY STORIES',
      'CREATOR/ABOUT SEAM',
      'OPERATIONAL OWNER',
      'INTENTIONALLY UNRESOLVED',
    ]],
    ['AGENTS.md', [
      'A COALITION MAKING ITS CASE IN PUBLIC',
      'RECOVERY STORIES',
      'OPERATIONAL OWNER',
      'INTENTIONALLY UNRESOLVED',
    ]],
    ['CLAUDE.md', [
      'A COALITION MAKING ITS CASE IN PUBLIC',
      'THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED',
      'FASHION CATALOGUE PRETENDING TO BE A STORE',
    ]],
    ['.claude/rules/gotsoap-web-design.md', [
      'A COALITION MAKING ITS CASE IN PUBLIC',
      'THE OFFICE PAGE MUST APPEAR UNDER-DESIGNED',
      'FASHION CATALOGUE PRETENDING TO BE A STORE',
      'RECOVERY STORIES',
      'CREATOR/ABOUT SEAM',
    ]],
  ]);

  for (const [relativePath, markers] of markerSets) {
    const content = readFileSync(join(repoRoot, relativePath), 'utf8');
    assert.deepEqual(missingRequiredMarkers(content, markers, relativePath), []);
  }
});

test('portable packages declare the shared-canon synchronization contract and dependency closure', () => {
  for (const relativePath of [
    'docs/cwaaa/README.md',
    'docs/cwaaa/migration-manifest.md',
    'docs/office-of-lather-compliance/README.md',
  ]) {
    const content = readFileSync(join(repoRoot, relativePath), 'utf8');
    assert.deepEqual(missingRequiredMarkers(content, [
      'gotsoap-world-canon.v1',
      'version 1',
      'upstream repository',
      'upstream path',
      'source commit',
      'subordinate snapshot',
      'resync',
      'WORLD-BIBLE.md',
      'artifact-continuity.md',
      'artifact authority',
    ], relativePath), []);
  }
});

function parseArtifactRegistry(registry) {
  const lines = registry.split(/\r?\n/).filter((line) => line.startsWith('| '));
  const cells = (line) => line.split('|').slice(1, -1).map((cell) => cell.trim());
  const header = cells(lines[0]);
  const rows = new Map(lines.slice(2).map((line) => {
    const row = cells(line);
    return [row[0], Object.fromEntries(header.map((column, index) => [column, row[index]]))];
  }));
  return { header, rows };
}

test('artifact registry binds fictional ownership separately from IVR and documentation authority', () => {
  const registry = readFileSync(join(repoRoot, 'docs/world/artifact-continuity.md'), 'utf8');
  const { header, rows } = parseArtifactRegistry(registry);

  assert.deepEqual(header, [
    'Artifact',
    'Form',
    'Fictional owner',
    'Number/placement owner',
    'Presented authorship',
    'Operational owner',
    'First meaning',
    'Later meaning',
    'Recurrence rule',
    'Forbidden explanation',
    'Documentation authority',
  ]);
  const ownershipColumns = [
    'Fictional owner',
    'Number/placement owner',
    'Presented authorship',
    'Operational owner',
    'Documentation authority',
  ];
  const ownershipValues = (artifact) => Object.fromEntries(
    ownershipColumns.map((column) => [column, rows.get(artifact)?.[column]]),
  );
  assert.deepEqual(
    ownershipValues('Printed IVR card'),
    {
      'Fictional owner': 'Got Soap?',
      'Number/placement owner': '—',
      'Presented authorship': '—',
      'Operational owner': '—',
      'Documentation authority': 'Shared world',
    },
  );
  assert.deepEqual(
    ownershipValues('Shared pledge core'),
    {
      'Fictional owner': 'CWAAA',
      'Number/placement owner': '—',
      'Presented authorship': '—',
      'Operational owner': '—',
      'Documentation authority': 'Shared world (portable pledge contract)',
    },
  );
  assert.deepEqual(
    ownershipValues('Office pen'),
    {
      'Fictional owner': 'Office',
      'Number/placement owner': '—',
      'Presented authorship': '—',
      'Operational owner': '—',
      'Documentation authority': 'Shared world plus Office package',
    },
  );
  assert.deepEqual(
    ownershipValues('1-800-GOT-SOAP'),
    {
      'Fictional owner': 'INTENTIONALLY UNRESOLVED — no resolved complete fictional owner',
      'Number/placement owner': 'Got Soap?',
      'Presented authorship': 'Voice A: Got Soap?; Voice B: appears CWAAA, later identifies Office',
      'Operational owner': 'INTENTIONALLY UNRESOLVED — no resolved complete operational owner',
      'Documentation authority': 'Shared world',
    },
  );
  assert.deepEqual(
    ownershipValues('Event swag table'),
    {
      'Fictional owner': 'No single fictional owner; individual artifacts retain theirs',
      'Number/placement owner': '—',
      'Presented authorship': '—',
      'Operational owner': '—',
      'Documentation authority': 'Shared world',
    },
  );
  assert.doesNotMatch(registry, /\| Actual owner \|/i);
  assert.match(registry, /Additional future films beyond the canonical campaign film/i);
});

function officeContractSpecimen() {
  const contract = JSON.parse(readFileSync(
    join(repoRoot, 'docs/office-of-lather-compliance/contracts/visit-state.v1.json'),
    'utf8',
  ));
  contract.firstAccessTransition = {
    requiresPersistentRecordAbsent: true,
    skipsNewSessionTransition: true,
    persistentRecord: {
      operation: 'create',
      returnSessionCount: 0,
      lifetimeAccessCount: 1,
    },
    sessionRecord: {
      operation: 'create',
      sessionRefreshCount: 0,
    },
  };
  contract.newSessionTransition.requiresPersistentRecord = true;
  contract.newSessionTransition.requiresSessionMarkerAbsentAtAccessStart = true;
  contract.newSessionTransition.literalFirstAccessSkipsTransition = true;
  return contract;
}

const officeContractMutationCases = [
  {
    name: 'Continued Interest threshold',
    mutate: (contract) => { contract.thresholds.continuedInterestSession = 4; },
    expected: /third distinct browser session/i,
  },
  {
    name: 'session refresh record field',
    mutate: (contract) => { delete contract.sessionRecord.sessionRefreshCount; },
    expected: /must define sessionRefreshCount/i,
  },
  {
    name: 'return-session record field',
    mutate: (contract) => { delete contract.persistentRecord.returnSessionCount; },
    expected: /must define returnSessionCount/i,
  },
  {
    name: 'lifetime-access record field',
    mutate: (contract) => { delete contract.persistentRecord.lifetimeAccessCount; },
    expected: /must define lifetimeAccessCount/i,
  },
  {
    name: 'standing reference meaning',
    mutate: (contract) => { contract.referenceMeaning = 'visitor incident identifier'; },
    expected: /standing containment reference/i,
  },
  {
    name: 'persistent standing reference',
    mutate: (contract) => { contract.persistentRecord.reference = '8804-Y'; },
    expected: /retain standing containment reference 8804-X/i,
  },
  {
    name: 'session storage backend',
    mutate: (contract) => { contract.storage.session = 'remoteStorage'; },
    expected: /storage\.session must be sessionStorage/i,
  },
  {
    name: 'persistent storage backend',
    mutate: (contract) => { contract.storage.persistent = 'cookieStorage'; },
    expected: /storage\.persistent must be localStorage/i,
  },
  {
    name: 'storage namespace',
    mutate: (contract) => { contract.storage.namespace = 'olc.visit.v2'; },
    expected: /namespace must be olc\.visit\.v1/i,
  },
  {
    name: 'cookie privacy flag',
    mutate: (contract) => { contract.storage.cookies = true; },
    expected: /cookies must remain false/i,
  },
  {
    name: 'IP privacy flag',
    mutate: (contract) => { contract.storage.ipAddress = true; },
    expected: /ipAddress must remain false/i,
  },
  {
    name: 'fingerprinting privacy flag',
    mutate: (contract) => { contract.storage.fingerprinting = true; },
    expected: /fingerprinting must remain false/i,
  },
  {
    name: 'server-persistence privacy flag',
    mutate: (contract) => { contract.storage.serverPersistence = true; },
    expected: /serverPersistence must remain false/i,
  },
  {
    name: 'pre-reveal resolution',
    mutate: (contract) => { contract.rendering.resolveBeforeReveal = false; },
    expected: /resolveBeforeReveal must remain true/i,
  },
  {
    name: 'returning-browser no-flash rule',
    mutate: (contract) => { contract.rendering.returningBrowserMayFlashFirstAccess = true; },
    expected: /returningBrowserMayFlashFirstAccess must remain false/i,
  },
  {
    name: 'terminal identity scope',
    mutate: (contract) => { contract.terminalIdentity.scope = 'cross-device'; },
    expected: /terminal identity must remain browser-local/i,
  },
  {
    name: 'terminal identity source',
    mutate: (contract) => { contract.terminalIdentity.source = 'government identity record'; },
    expected: /terminal identity must remain browser-local/i,
  },
  {
    name: 'terminal identity fingerprinting flag',
    mutate: (contract) => { contract.terminalIdentity.fingerprinting = true; },
    expected: /terminal identity must remain browser-local/i,
  },
  {
    name: 'pre-transition session-marker capture',
    mutate: (contract) => { contract.stateSelectionContext.captureSessionMarkerBeforeTransition = false; },
    expected: /capture new-session status before transition/i,
  },
  {
    name: 'new-session context definition',
    mutate: (contract) => { contract.stateSelectionContext.newSession = 'persistent record exists'; },
    expected: /capture new-session status before transition/i,
  },
  {
    name: 'first-access persistent-record absence guard',
    mutate: (contract) => { contract.firstAccessTransition.requiresPersistentRecordAbsent = false; },
    expected: /first access must require an absent persistent record/i,
  },
  {
    name: 'first-access new-session skip',
    mutate: (contract) => { contract.firstAccessTransition.skipsNewSessionTransition = false; },
    expected: /first access must skip the new-session transition/i,
  },
  {
    name: 'first-access persistent-record creation',
    mutate: (contract) => { contract.firstAccessTransition.persistentRecord.operation = 'reuse'; },
    expected: /first access must create the persistent record/i,
  },
  {
    name: 'first-access return-session initialization',
    mutate: (contract) => { contract.firstAccessTransition.persistentRecord.returnSessionCount = 1; },
    expected: /first access must initialize returnSessionCount to 0/i,
  },
  {
    name: 'first-access lifetime initialization',
    mutate: (contract) => { contract.firstAccessTransition.persistentRecord.lifetimeAccessCount = 0; },
    expected: /first access must initialize lifetimeAccessCount to 1/i,
  },
  {
    name: 'first-access session-record creation',
    mutate: (contract) => { contract.firstAccessTransition.sessionRecord.operation = 'reuse'; },
    expected: /first access must create the session record/i,
  },
  {
    name: 'first-access refresh initialization',
    mutate: (contract) => { contract.firstAccessTransition.sessionRecord.sessionRefreshCount = 1; },
    expected: /first access must initialize sessionRefreshCount to 0/i,
  },
  {
    name: 'new-session pre-selection ordering',
    mutate: (contract) => { contract.newSessionTransition.beforeStateSelection = false; },
    expected: /new-session transition must run before pre-selection/i,
  },
  {
    name: 'new-session persistent-record guard',
    mutate: (contract) => { contract.newSessionTransition.requiresPersistentRecord = false; },
    expected: /new-session transition must require a persistent record/i,
  },
  {
    name: 'new-session marker-absence guard',
    mutate: (contract) => { contract.newSessionTransition.requiresSessionMarkerAbsentAtAccessStart = false; },
    expected: /new-session transition must require an absent session marker/i,
  },
  {
    name: 'literal-first-access transition exclusion',
    mutate: (contract) => { contract.newSessionTransition.literalFirstAccessSkipsTransition = false; },
    expected: /literal first access must skip the new-session transition/i,
  },
  {
    name: 'new-session return-session operation',
    mutate: (contract) => { contract.newSessionTransition.returnSessionCount.operation = 'preserve'; },
    expected: /new-session returnSessionCount operation must be increment/i,
  },
  {
    name: 'new-session return-session amount',
    mutate: (contract) => { contract.newSessionTransition.returnSessionCount.amount = 2; },
    expected: /new-session returnSessionCount amount must be 1/i,
  },
  {
    name: 'new-session once-only guard',
    mutate: (contract) => { contract.newSessionTransition.returnSessionCount.oncePerNewSession = false; },
    expected: /returnSessionCount must increment once per new session/i,
  },
  {
    name: 'new-session lifetime operation',
    mutate: (contract) => { contract.newSessionTransition.lifetimeAccessCount.operation = 'preserve'; },
    expected: /new-session lifetimeAccessCount operation must be increment/i,
  },
  {
    name: 'new-session lifetime amount',
    mutate: (contract) => { contract.newSessionTransition.lifetimeAccessCount.amount = 2; },
    expected: /new-session lifetimeAccessCount amount must be 1/i,
  },
  {
    name: 'new-session record creation',
    mutate: (contract) => { contract.newSessionTransition.sessionRecord.operation = 'reuse'; },
    expected: /new-session transition must create a fresh session record/i,
  },
  {
    name: 'new-session refresh initialization',
    mutate: (contract) => { contract.newSessionTransition.sessionRecord.sessionRefreshCount = 1; },
    expected: /new-session sessionRefreshCount must initialize to 0/i,
  },
  {
    name: 'same-session return-session preservation operation',
    mutate: (contract) => { contract.sameSessionTransition.returnSessionCount.operation = 'increment'; },
    expected: /same-session returnSessionCount operation must be preserve/i,
  },
  {
    name: 'same-session return-session increment prohibition',
    mutate: (contract) => { contract.sameSessionTransition.returnSessionCount.increment = true; },
    expected: /same-session returnSessionCount increment must remain false/i,
  },
  {
    name: 'same-session refresh operation',
    mutate: (contract) => { contract.sameSessionTransition.sessionRefreshCount.operation = 'preserve'; },
    expected: /same-session sessionRefreshCount operation must be increment/i,
  },
  {
    name: 'same-session refresh amount',
    mutate: (contract) => { contract.sameSessionTransition.sessionRefreshCount.amount = 2; },
    expected: /same-session sessionRefreshCount amount must be 1/i,
  },
  {
    name: 'same-session lifetime operation',
    mutate: (contract) => { contract.sameSessionTransition.lifetimeAccessCount.operation = 'preserve'; },
    expected: /same-session lifetimeAccessCount operation must be increment/i,
  },
  {
    name: 'same-session lifetime amount',
    mutate: (contract) => { contract.sameSessionTransition.lifetimeAccessCount.amount = 2; },
    expected: /same-session lifetimeAccessCount amount must be 1/i,
  },
  {
    name: 'state-selection order',
    mutate: (contract) => { contract.stateSelectionOrder.reverse(); },
    expected: /state selection must prioritize/i,
  },
  {
    name: 'state ID progression',
    mutate: (contract) => { contract.states[0].id = 'initial_contact'; },
    expected: /retain the four-state session progression/i,
  },
  {
    name: 'first-access selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'first_access').selection.persistentRecordExists = true; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'same-session marker selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'same_session_refresh').selection.sessionMarkerExistedAtAccessStart = false; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'same-session threshold selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'same_session_refresh').selection.maximumReturnSessionCount = 2; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'later-return new-session selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'later_return').selection.newSession = false; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'later-return count selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'later_return').selection.postTransitionReturnSessionCount = 2; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'Continued Interest selector',
    mutate: (contract) => { contract.states.find((state) => state.id === 'continued_interest').selection.postTransitionReturnSessionCount.minimum = 3; },
    expected: /state selectors.*post-transition session counts/i,
  },
  {
    name: 'first-access condition',
    mutate: (contract) => { contract.states.find((state) => state.id === 'first_access').condition = 'first load'; },
    expected: /first_access condition/i,
  },
  {
    name: 'first-access effect',
    mutate: (contract) => { contract.states.find((state) => state.id === 'first_access').effect = 'create a session record only'; },
    expected: /first_access effect/i,
  },
  {
    name: 'same-session condition',
    mutate: (contract) => { contract.states.find((state) => state.id === 'same_session_refresh').condition = 'any reload'; },
    expected: /same_session_refresh condition/i,
  },
  {
    name: 'same-session effect cannot advance return narrative',
    mutate: (contract) => { contract.states.find((state) => state.id === 'same_session_refresh').effect = 'increment returnSessionCount and advance the narrative'; },
    expected: /same_session_refresh effect/i,
  },
  {
    name: 'later-return condition',
    mutate: (contract) => { contract.states.find((state) => state.id === 'later_return').condition = 'any returning browser'; },
    expected: /later_return condition/i,
  },
  {
    name: 'later-return effect',
    mutate: (contract) => { contract.states.find((state) => state.id === 'later_return').effect = 'show Continued Interest'; },
    expected: /later_return effect/i,
  },
  {
    name: 'Continued Interest condition',
    mutate: (contract) => { contract.states.find((state) => state.id === 'continued_interest').condition = 'post-transition returnSessionCount is 3 or greater'; },
    expected: /continued_interest condition/i,
  },
  {
    name: 'Continued Interest effect',
    mutate: (contract) => { contract.states.find((state) => state.id === 'continued_interest').effect = 'advance on each access'; },
    expected: /continued_interest effect/i,
  },
  {
    name: 'storage-unavailable fallback claiming recognition',
    mutate: (contract) => { contract.fallback.storageUnavailable = 'render First Access and claim recognition'; },
    expected: /fallback object/i,
  },
  {
    name: 'fallback object extra behavior',
    mutate: (contract) => { contract.fallback.claimRecognition = true; },
    expected: /fallback object/i,
  },
  ...[
    'ordinary homepage',
    'site navigation',
    'agency explainer',
    'named federal, state, or local jurisdiction',
    'IP address display',
    'backend identity record',
    'cross-device recognition',
    'reload-driven escalation',
    'infinite escalation',
  ].map((rule, index) => ({
    name: `forbidden rule: ${rule}`,
    mutate: (contract) => {
      if (rule === 'reload-driven escalation') {
        contract.forbidden.splice(index, 1);
      } else {
        contract.forbidden[index] = `removed-${rule}`;
      }
    },
    expected: /forbidden rules/i,
  })),
];

for (const { name, mutate, expected } of officeContractMutationCases) {
  test(`Office contract rejects one-field drift: ${name}`, () => {
    const contract = officeContractSpecimen();
    assert.deepEqual(validateOfficeStateContract(contract), []);
    mutate(contract);
    assert.match(validateOfficeStateContract(contract).join('\n'), expected);
  });
}

function pledgeContractSpecimen() {
  const contract = JSON.parse(readFileSync(join(repoRoot, 'docs/contracts/pledge.v1.json'), 'utf8'));
  contract.fulfillment = {
    author: 'CWAAA',
    appliesToImplementations: ['Got Soap?', 'CWAAA'],
    totalMessages: 2,
    messages: [
      {
        id: 'pledgeReceipt',
        sequence: 1,
        delivery: 'immediate',
        maximumDeliveries: 1,
        consentWithdrawalMechanismRequired: true,
      },
      {
        id: 'currentIssue',
        sequence: 2,
        delivery: 'separately after a configurable short delay',
        maximumDeliveries: 1,
        displayDateSource: 'signup or send time',
        preSendConsentCheckRequired: true,
        suppressIfConsentWithdrawn: true,
        unsubscribeMechanismRequired: true,
      },
    ],
    providerExtraMessageAllowed: false,
    ongoingSubscription: false,
    dripCampaign: false,
  };
  contract.consent = {
    required: true,
    disclosesExactlyTwoMessages: true,
    disclosesImmediateReceipt: true,
    disclosesSeparateCurrentIssue: true,
    disclosesNoOngoingSubscription: true,
    withdrawalBeforeCurrentIssueSuppressesDelivery: true,
  };
  contract.futurePrograms = {
    requiresSeparateOwnerApproval: true,
    requiresSeparateContract: true,
    requiresSeparateConsent: true,
    altersFormCw1: false,
  };
  Object.assign(contract.privacy, {
    pledgeAndEmailValuesMayEnterAnalytics: false,
    retentionScope: 'minimum Buttondown data needed to fulfill two messages and honor suppression',
    removeUnneededFulfillmentMetadataAfterCompletion: true,
    suppressionRecordMayBeRetained: true,
    additionalProviderAuthorized: false,
  });
  return contract;
}

test('pledge fulfillment specimen satisfies the finite CWAAA-authored email contract', () => {
  assert.equal(typeof authorityCheck.validatePledgeContract, 'function');
  assert.deepEqual(authorityCheck.validatePledgeContract(pledgeContractSpecimen()), []);
});

const pledgeContractMutationCases = [
  {
    name: 'fulfillment author',
    mutate: (contract) => { contract.fulfillment.author = 'Got Soap?'; },
    expected: /fulfillment author must be CWAAA/i,
  },
  {
    name: 'public presentation coverage',
    mutate: (contract) => { contract.fulfillment.appliesToImplementations.pop(); },
    expected: /fulfillment must cover Got Soap\? and CWAAA/i,
  },
  {
    name: 'exact message count',
    mutate: (contract) => { contract.fulfillment.totalMessages = 3; },
    expected: /fulfillment totalMessages must be exactly 2/i,
  },
  {
    name: 'two message records',
    mutate: (contract) => { contract.fulfillment.messages.pop(); },
    expected: /fulfillment must define exactly two message records/i,
  },
  {
    name: 'receipt identity',
    mutate: (contract) => { contract.fulfillment.messages[0].id = 'welcome'; },
    expected: /first message must be pledgeReceipt/i,
  },
  {
    name: 'receipt sequence',
    mutate: (contract) => { contract.fulfillment.messages[0].sequence = 2; },
    expected: /pledgeReceipt sequence must be 1/i,
  },
  {
    name: 'immediate receipt delivery',
    mutate: (contract) => { contract.fulfillment.messages[0].delivery = 'delayed'; },
    expected: /pledgeReceipt delivery must be immediate/i,
  },
  {
    name: 'single receipt delivery',
    mutate: (contract) => { contract.fulfillment.messages[0].maximumDeliveries = 2; },
    expected: /pledgeReceipt maximumDeliveries must be 1/i,
  },
  {
    name: 'receipt withdrawal mechanism',
    mutate: (contract) => { contract.fulfillment.messages[0].consentWithdrawalMechanismRequired = false; },
    expected: /pledgeReceipt must provide consent withdrawal before the current issue/i,
  },
  {
    name: 'current issue identity',
    mutate: (contract) => { contract.fulfillment.messages[1].id = 'monthlyNewsletter'; },
    expected: /second message must be currentIssue/i,
  },
  {
    name: 'current issue sequence',
    mutate: (contract) => { contract.fulfillment.messages[1].sequence = 1; },
    expected: /currentIssue sequence must be 2/i,
  },
  {
    name: 'separate current issue delivery',
    mutate: (contract) => { contract.fulfillment.messages[1].delivery = 'immediate'; },
    expected: /currentIssue must be delivered separately after a configurable short delay/i,
  },
  {
    name: 'single current issue delivery',
    mutate: (contract) => { contract.fulfillment.messages[1].maximumDeliveries = 2; },
    expected: /currentIssue maximumDeliveries must be 1/i,
  },
  {
    name: 'current issue display date source',
    mutate: (contract) => { contract.fulfillment.messages[1].displayDateSource = 'build time'; },
    expected: /currentIssue display date must derive from signup or send time/i,
  },
  {
    name: 'current issue pre-send consent check',
    mutate: (contract) => { contract.fulfillment.messages[1].preSendConsentCheckRequired = false; },
    expected: /currentIssue requires a pre-send consent check/i,
  },
  {
    name: 'withdrawal suppression',
    mutate: (contract) => { contract.fulfillment.messages[1].suppressIfConsentWithdrawn = false; },
    expected: /currentIssue must be suppressed after consent withdrawal/i,
  },
  {
    name: 'current issue unsubscribe',
    mutate: (contract) => { contract.fulfillment.messages[1].unsubscribeMechanismRequired = false; },
    expected: /currentIssue must include a functioning unsubscribe mechanism/i,
  },
  {
    name: 'provider third-message prohibition',
    mutate: (contract) => { contract.fulfillment.providerExtraMessageAllowed = true; },
    expected: /provider must not add a third message/i,
  },
  {
    name: 'ongoing subscription prohibition',
    mutate: (contract) => { contract.fulfillment.ongoingSubscription = true; },
    expected: /ongoingSubscription must remain false/i,
  },
  {
    name: 'drip campaign prohibition',
    mutate: (contract) => { contract.fulfillment.dripCampaign = true; },
    expected: /dripCampaign must remain false/i,
  },
  {
    name: 'affirmative consent',
    mutate: (contract) => { contract.consent.required = false; },
    expected: /consent must remain required/i,
  },
  {
    name: 'two-message consent disclosure',
    mutate: (contract) => { contract.consent.disclosesExactlyTwoMessages = false; },
    expected: /consent must disclose exactly two messages/i,
  },
  {
    name: 'receipt consent disclosure',
    mutate: (contract) => { contract.consent.disclosesImmediateReceipt = false; },
    expected: /consent must disclose the immediate receipt/i,
  },
  {
    name: 'current issue consent disclosure',
    mutate: (contract) => { contract.consent.disclosesSeparateCurrentIssue = false; },
    expected: /consent must disclose the separately delivered current issue/i,
  },
  {
    name: 'no-subscription consent disclosure',
    mutate: (contract) => { contract.consent.disclosesNoOngoingSubscription = false; },
    expected: /consent must disclose there is no ongoing subscription/i,
  },
  {
    name: 'withdrawal consent effect',
    mutate: (contract) => { contract.consent.withdrawalBeforeCurrentIssueSuppressesDelivery = false; },
    expected: /consent withdrawal must suppress an unsent currentIssue/i,
  },
  {
    name: 'future owner approval',
    mutate: (contract) => { contract.futurePrograms.requiresSeparateOwnerApproval = false; },
    expected: /future programs require separate owner approval/i,
  },
  {
    name: 'future contract',
    mutate: (contract) => { contract.futurePrograms.requiresSeparateContract = false; },
    expected: /future programs require a separate contract/i,
  },
  {
    name: 'future consent',
    mutate: (contract) => { contract.futurePrograms.requiresSeparateConsent = false; },
    expected: /future programs require separate consent/i,
  },
  {
    name: 'Form CW-1 immutability',
    mutate: (contract) => { contract.futurePrograms.altersFormCw1 = true; },
    expected: /future programs must not alter Form CW-1/i,
  },
  {
    name: 'pledge and email analytics exclusion',
    mutate: (contract) => { contract.privacy.pledgeAndEmailValuesMayEnterAnalytics = true; },
    expected: /pledge and email values must not enter analytics/i,
  },
  {
    name: 'minimum retention scope',
    mutate: (contract) => { contract.privacy.retentionScope = ''; },
    expected: /privacy must define minimum Buttondown retention/i,
  },
  {
    name: 'metadata minimization after fulfillment',
    mutate: (contract) => { contract.privacy.removeUnneededFulfillmentMetadataAfterCompletion = false; },
    expected: /unneeded fulfillment metadata must be removed/i,
  },
  {
    name: 'suppression-record retention',
    mutate: (contract) => { contract.privacy.suppressionRecordMayBeRetained = false; },
    expected: /suppression record may be retained/i,
  },
  {
    name: 'additional provider prohibition',
    mutate: (contract) => { contract.privacy.additionalProviderAuthorized = true; },
    expected: /no additional provider is authorized/i,
  },
  {
    name: 'contract identity',
    mutate: (contract) => { contract.contractId = 'lather-pledge.v2'; },
    expected: /contractId must be lather-pledge\.v1/i,
  },
  {
    name: 'contract version',
    mutate: (contract) => { contract.version = 2; },
    expected: /version must be 1/i,
  },
  {
    name: 'contract owner',
    mutate: (contract) => { contract.owner = 'Got Soap?'; },
    expected: /owner must remain CWAAA/i,
  },
  {
    name: 'implementation order and coverage',
    mutate: (contract) => { contract.implementations.reverse(); },
    expected: /implementations must be Got Soap\? and CWAAA/i,
  },
  {
    name: 'backend provider',
    mutate: (contract) => { contract.backend.provider = 'Other'; },
    expected: /backend must be Buttondown/i,
  },
  {
    name: 'backend audience',
    mutate: (contract) => { contract.backend.audience = 'two audiences'; },
    expected: /one shared audience/i,
  },
  {
    name: 'backend configuration key',
    mutate: (contract) => { contract.backend.configurationKey = 'NEWSLETTER_ID'; },
    expected: /configurationKey must be BUTTONDOWN_USERNAME/i,
  },
  {
    name: 'field order and identities',
    mutate: (contract) => { contract.fields.reverse(); },
    expected: /field definitions/i,
  },
  ...[
    ['firstName', 'type', 'textarea'],
    ['firstName', 'required', false],
    ['firstName', 'buttondownName', 'first_name'],
    ['email', 'type', 'text'],
    ['email', 'required', false],
    ['email', 'buttondownName', 'metadata__email'],
    ['consent', 'type', 'text'],
    ['consent', 'required', false],
    ['consent', 'buttondownName', 'metadata__consent'],
    ['company', 'type', 'text'],
    ['company', 'required', true],
    ['company', 'buttondownName', 'company'],
  ].map(([fieldId, property, value]) => ({
    name: `${fieldId} field ${property}`,
    mutate: (contract) => { contract.fields.find((field) => field.id === fieldId)[property] = value; },
    expected: /field definitions/i,
  })),
  {
    name: 'success semantic',
    mutate: (contract) => { contract.success.semantic = 'SUBSCRIBED'; },
    expected: /success semantic must be SWORN/i,
  },
  {
    name: 'success share action',
    mutate: (contract) => { contract.success.mustOfferShare = false; },
    expected: /success must offer share/i,
  },
  {
    name: 'success copy-link action',
    mutate: (contract) => { contract.success.mustOfferCopyLink = false; },
    expected: /success must offer copy link/i,
  },
  {
    name: 'privacy analytics exclusion',
    mutate: (contract) => { contract.privacy.analyticsMayReceiveFieldValues = true; },
    expected: /field values must not enter analytics/i,
  },
  {
    name: 'privacy affirmative-consent requirement',
    mutate: (contract) => { contract.privacy.requiresAffirmativeConsent = false; },
    expected: /privacy requires affirmative consent/i,
  },
  ...[
    'Both public implementations submit to the same Buttondown audience.',
    'Visual treatment and surrounding copy may differ; field meaning and success semantics may not.',
    'Got Soap? adds a conditional Want to Learn More? seam to CWAAA after success.',
    'A missing cross-site URL produces no dead link.',
    'CWAAA authors the receipt and current issue for both public presentations.',
    'Buttondown confirmation or welcome delivery must fulfill the defined receipt or remain disabled; it may not become a third message.',
    'Consent withdrawal before current-issue delivery suppresses that issue.',
    'Future programs require separate approval, contract, and consent without altering Form CW-1.',
  ].map((invariant, index) => ({
    name: `invariant ${index + 1}`,
    mutate: (contract) => { contract.invariants[index] = `${invariant} drift`; },
    expected: /contract invariants/i,
  })),
];

for (const { name, mutate, expected } of pledgeContractMutationCases) {
  test(`pledge contract rejects one-field drift: ${name}`, () => {
    assert.equal(typeof authorityCheck.validatePledgeContract, 'function');
    const contract = pledgeContractSpecimen();
    assert.deepEqual(authorityCheck.validatePledgeContract(contract), []);
    mutate(contract);
    assert.match(authorityCheck.validatePledgeContract(contract).join('\n'), expected);
  });
}

test('byte-identical pledge contracts still fail when their fulfillment structure drifts together', () => {
  withCleanAuthorityFixture((fixtureRoot) => {
    const drifted = pledgeContractSpecimen();
    delete drifted.fulfillment;
    const bytes = `${JSON.stringify(drifted, null, 2)}\n`;
    writeFileSync(join(fixtureRoot, 'docs/contracts/pledge.v1.json'), bytes);
    writeFileSync(join(fixtureRoot, 'docs/cwaaa/contracts/pledge.v1.json'), bytes);
    assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), /fulfillment/i);
  });
});

test('pledge PRDs and migration manifest state the complete email consent and privacy contract', () => {
  const expectedByPath = {
    'docs/cwaaa/PRD-cwaaa-web-v1.md': [
      'CWAAA authors fulfillment for both public pledge presentations',
      'exactly two messages',
      'immediate pledge receipt',
      'separately delivered current issue',
      'withdrawn or unsubscribed before the current issue',
      'functioning unsubscribe',
      'separate approval, contract, and consent',
      'do not send pledge or email values to analytics',
      'minimum Buttondown data',
    ],
    'docs/prd/PRD-gotsoap-web-v1.md': [
      'CWAAA authors fulfillment for both public pledge presentations',
      'exactly two messages',
      'immediate pledge receipt',
      'separately delivered current issue',
      'withdrawn or unsubscribed before the current issue',
      'functioning unsubscribe',
      'separate approval, contract, and consent',
      'do not send pledge or email values to analytics',
      'minimum Buttondown data',
    ],
    'docs/cwaaa/migration-manifest.md': [
      'Movement Updates',
      'required migration/copy-lane correction',
      'CWAAA authors fulfillment for both public pledge presentations',
      'exactly two messages',
      'functioning unsubscribe',
      'Sniff Test',
      'CWAAA field assessors',
      'target ownership is Got Soap?',
    ],
  };
  for (const [relativePath, markers] of Object.entries(expectedByPath)) {
    const content = readFileSync(join(repoRoot, relativePath), 'utf8');
    assert.deepEqual(missingRequiredMarkers(content, markers, relativePath), []);
  }
});
