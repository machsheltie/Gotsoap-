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
];

for (const { name, path, statement, expected } of canonMutationCases) {
  test(`path-aware canon rejects ${name}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      appendFixtureText(fixtureRoot, path, statement);
      assert.match(collectAuthorityErrors(fixtureRoot).join('\n'), expected);
    });
  });
}

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
]) {
  test(`IVR authority gates protected marker: ${marker}`, () => {
    withCleanAuthorityFixture((fixtureRoot) => {
      removeFixtureText(
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

test('artifact registry separates fictional ownership from documentation authority', () => {
  const registry = readFileSync(join(repoRoot, 'docs/world/artifact-continuity.md'), 'utf8');
  assert.deepEqual(missingRequiredMarkers(registry, [
    'Fictional owner',
    'Documentation authority',
    'Shared pledge core',
    'Additional future films beyond the canonical campaign film',
  ], 'docs/world/artifact-continuity.md'), []);
  assert.doesNotMatch(registry, /\| Actual owner \|/i);
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
