import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function compareRawDocuments(left, right) {
  return left === right
    ? []
    : ['Portable pledge contracts do not match exactly.'];
}

export function findForbiddenAuthorityPhrases(text, path) {
  const forbidden = [
    'there is no application code yet',
    'site is currently empty',
    'netlify forms in v1',
    "cwaaa's site-within-a-site",
  ];
  const lower = text.toLowerCase();
  return forbidden
    .filter((phrase) => lower.includes(phrase))
    .map((phrase) => `${path}: forbidden stale authority phrase "${phrase}"`);
}

export function missingRequiredMarkers(text, markers, path = 'document') {
  const upper = text.toUpperCase();
  return markers
    .filter((marker) => !upper.includes(marker.toUpperCase()))
    .map((marker) => `${path}: missing required marker "${marker}"`);
}

function read(root, relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, 'utf8') : null;
}

function requireFile(root, relativePath, errors) {
  const content = read(root, relativePath);
  if (content === null) errors.push(`${relativePath}: required authority file is missing`);
  return content ?? '';
}

function parseJson(root, relativePath, errors) {
  const content = requireFile(root, relativePath, errors);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

export function collectAuthorityErrors(repoRoot) {
  const errors = [];


  const worldReadme = requireFile(repoRoot, 'docs/world/README.md', errors);
  errors.push(...missingRequiredMarkers(worldReadme, [
    'SHARED AUTHORITY',
    'PER-SYSTEM AUTHORITY',
    'EXTRACTION',
  ], 'docs/world/README.md'));

  const worldBible = requireFile(repoRoot, 'docs/world/WORLD-BIBLE.md', errors);
  errors.push(...missingRequiredMarkers(worldBible, [
    'OBJECTIVE CANON',
    'PUBLIC CLAIM',
    'INTENTIONALLY UNRESOLVED',
    '1961',
    '2024',
    'GOT SOAP? SEDUCES',
    'CWAAA VALIDATES AND ORGANIZES',
    'THE OFFICE ASSUMES JURISDICTION',
    'KNOWLEDGE MATRIX',
  ], 'docs/world/WORLD-BIBLE.md'));

  const artifactContinuity = requireFile(
    repoRoot,
    'docs/world/artifact-continuity.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(artifactContinuity, [
    'FIRST MEANING',
    'LATER MEANING',
    'RECURRENCE RULE',
    'FORBIDDEN EXPLANATION',
    'OFFICE PEN',
    '1-800-GOT-SOAP',
  ], 'docs/world/artifact-continuity.md'));
  const liveDocuments = [
    'AGENTS.md',
    'CLAUDE.md',
    'docs/HANDOFF.md',
    'docs/design.md',
    'docs/prd/PRD-gotsoap-web-v1.md',
    'docs/strategy/participation-mechanics.md',
    'docs/strategy/cwaaa-divergence-roadmap.md',
  ];

  for (const path of liveDocuments) {
    const content = requireFile(repoRoot, path, errors);
    errors.push(...findForbiddenAuthorityPhrases(content, path));
  }

  const gotSoapDesign = requireFile(repoRoot, 'docs/design.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapDesign, [
    'THE WEBSITE IS THE CAMPAIGN',
    'EDITORIAL BRUTALISM',
    'SNIFF TEST',
    'WANT TO LEARN MORE?',
    'ANTI-TEMPLATE',
  ], 'docs/design.md'));

  const gotSoapBible = requireFile(repoRoot, 'docs/gotsoap/world-bible.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapBible, [
    'EROTIC ASPIRATION',
    'POTENTIAL CONVERT',
    'WITNESS AND RECRUITER',
    'WHAT GOT SOAP? FINDS FUNNY',
    'WHAT BREAKS THE ILLUSION',
    'UTILITY VOICE',
  ], 'docs/gotsoap/world-bible.md'));

  const gotSoapPrd = requireFile(repoRoot, 'docs/prd/PRD-gotsoap-web-v1.md', errors);
  errors.push(...missingRequiredMarkers(gotSoapPrd, [
    'ONE BUTTONDOWN AUDIENCE',
    'SNIFF TEST',
    'CWAAA_SITE_URL',
    'WANT TO LEARN MORE?',
    'SHOP',
    '/BROADCAST',
    '1-800-GOT-SOAP',
    'UNAVAILABLE CHECKOUT',
  ], 'docs/prd/PRD-gotsoap-web-v1.md'));

  const cwaaaReadme = requireFile(repoRoot, 'docs/cwaaa/README.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaReadme, [
    'CREDIBLE FICTIONAL ADVOCACY NONPROFIT',
    'SEPARATE FICTIONAL GOVERNMENT AGENCY',
    'DOES NOT CONTAIN OR OPERATE IT',
  ], 'docs/cwaaa/README.md'));

  const cwaaaBible = requireFile(repoRoot, 'docs/cwaaa/world-bible.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaBible, [
    'GOT SOAP? CAMPAIGNS',
    'CWAAA ADVOCATES AND FILES',
    'OFFICE OF LATHER COMPLIANCE REGULATES',
    'THE LATHER PLEDGE',
    'OBJECTIVE CANON',
    'NEVER MANUFACTURES FEAR',
    'ACCIDENTALLY REVEAL',
    'PHYSICAL SPACE',
    'EMAIL',
    'TELEPHONE',
    'EVENTS',
    'WHAT IT NEVER SAYS',
  ], 'docs/cwaaa/world-bible.md'));

  const cwaaaDesign = requireFile(repoRoot, 'docs/cwaaa/design.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaDesign, [
    'PARTICIPANT ADVOCACY FILES',
    'NOT POLICE EVIDENCE',
    'NEUTRAL CITATION',
  ], 'docs/cwaaa/design.md'));

  const cwaaaPrd = requireFile(repoRoot, 'docs/cwaaa/PRD-cwaaa-web-v1.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaPrd, [
    'IMMEDIATE PLEDGE RECEIPT',
    'ONE CURRENT-ISSUE NEWSLETTER',
    'MONTH AND YEAR',
    'NOT AN ONGOING',
  ], 'docs/cwaaa/PRD-cwaaa-web-v1.md'));

  const officeReadme = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/README.md',
    errors,
  );
  const officeDesign = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/design.md',
    errors,
  );
  const officePrd = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/PRD-office-v1.md',
    errors,
  );
  const officeCorpus = `${officeReadme}\n${officeDesign}\n${officePrd}`;
  errors.push(...missingRequiredMarkers(officeCorpus, [
    'ERROR STATES ONLY',
    'DELIBERATELY UNSPECIFIED',
    'FIRST ACCESS',
    'SAME-SESSION REFRESH',
    'LATER RETURN',
    'CONTINUED INTEREST',
    'BROWSER-LOCAL',
    'NO ORDINARY HOMEPAGE',
    'PLEASE REMAIN AVAILABLE',
  ], 'Office package'));

  const campaignPledge = parseJson(repoRoot, 'docs/contracts/pledge.v1.json', errors);
  const cwaaaPledge = parseJson(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json', errors);
  if (campaignPledge && cwaaaPledge) {
    const campaignPledgeDocument = read(repoRoot, 'docs/contracts/pledge.v1.json') ?? '';
    const cwaaaPledgeDocument = read(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json') ?? '';
    errors.push(...compareRawDocuments(campaignPledgeDocument, cwaaaPledgeDocument));
    if (campaignPledge.backend?.provider !== 'Buttondown') {
      errors.push('Pledge contract backend must be Buttondown.');
    }
    if (campaignPledge.backend?.audience !== 'one shared audience') {
      errors.push('Pledge contract must specify one shared audience.');
    }
  }

  const officeState = parseJson(
    repoRoot,
    'docs/office-of-lather-compliance/contracts/visit-state.v1.json',
    errors,
  );
  if (officeState) {
    if (officeState.jurisdiction !== 'deliberately unspecified') {
      errors.push('Office jurisdiction must remain deliberately unspecified.');
    }
    if (officeState.publicSurfaceModel !== 'error states only') {
      errors.push('Office public surface model must remain error states only.');
    }
    if (
      officeState.storage?.ipAddress !== false
      || officeState.storage?.fingerprinting !== false
      || officeState.storage?.serverPersistence !== false
    ) {
      errors.push('Office recognition must remain local, IP-free, and fingerprint-free.');
    }
    const stateIds = officeState.states?.map((state) => state.id) ?? [];
    const expected = [
      'first_access',
      'same_session_refresh',
      'later_return',
      'continued_interest',
    ];
    if (JSON.stringify(stateIds) !== JSON.stringify(expected)) {
      errors.push('Office visit-state sequence has drifted.');
    }
  }

  return errors;
}
