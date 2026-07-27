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

export function validateOfficeStateContract(contract) {
  const errors = [];
  const expectedStateSelectionOrder = [
    'continued_interest',
    'same_session_refresh',
    'later_return',
    'first_access',
  ];
  const expectedStateIds = [
    'first_access',
    'same_session_refresh',
    'later_return',
    'continued_interest',
  ];
  const stateById = Object.fromEntries(
    (contract.states ?? []).map((state) => [state.id, state]),
  );
  const storage = contract.storage ?? {};
  const terminalIdentity = contract.terminalIdentity ?? {};
  const newSessionTransition = contract.newSessionTransition ?? {};
  const sameSessionTransition = contract.sameSessionTransition ?? {};

  if (contract.thresholds?.continuedInterestSession !== 3) {
    errors.push('Continued Interest must begin on the third distinct browser session.');
  }
  if (!contract.sessionRecord?.sessionRefreshCount) {
    errors.push('Office contract must define sessionRefreshCount.');
  }
  if (!contract.persistentRecord?.returnSessionCount) {
    errors.push('Office contract must define returnSessionCount.');
  }
  if (!contract.persistentRecord?.lifetimeAccessCount) {
    errors.push('Office contract must define lifetimeAccessCount.');
  }
  if (contract.referenceMeaning !== 'standing containment reference') {
    errors.push('8804-X must be a standing containment reference.');
  }
  if (contract.persistentRecord?.reference !== '8804-X') {
    errors.push('Office contract must retain standing containment reference 8804-X.');
  }
  if (
    ['cookies', 'ipAddress', 'fingerprinting', 'serverPersistence']
      .some((key) => storage[key] !== false)
  ) {
    errors.push('Office storage must disable cookies, IP addresses, fingerprinting, and server persistence.');
  }
  if (
    contract.rendering?.resolveBeforeReveal !== true
    || contract.rendering?.returningBrowserMayFlashFirstAccess !== false
  ) {
    errors.push('Office rendering must resolveBeforeReveal without a First Access flash.');
  }
  if (
    terminalIdentity.scope !== 'browser-local'
    || terminalIdentity.source !== 'locally generated fictional browser identifier'
    || terminalIdentity.fingerprinting !== false
  ) {
    errors.push('Office terminal identity must remain browser-local and fingerprint-free.');
  }
  if (
    contract.stateSelectionContext?.captureSessionMarkerBeforeTransition !== true
    || contract.stateSelectionContext?.newSession !== 'session marker was absent at start of access'
  ) {
    errors.push('Office state selection must capture new-session status before transition.');
  }
  if (newSessionTransition.beforeStateSelection !== true) {
    errors.push('Office new-session transition must run before pre-selection state resolution.');
  }
  if (
    newSessionTransition.returnSessionCount?.operation !== 'increment'
    || newSessionTransition.returnSessionCount?.amount !== 1
    || newSessionTransition.returnSessionCount?.oncePerNewSession !== true
  ) {
    errors.push('Office new-session transition must increment returnSessionCount exactly once.');
  }
  if (
    newSessionTransition.lifetimeAccessCount?.operation !== 'increment'
    || newSessionTransition.lifetimeAccessCount?.amount !== 1
  ) {
    errors.push('Office new-session transition must increment lifetimeAccessCount once.');
  }
  if (
    newSessionTransition.sessionRecord?.operation !== 'create'
    || newSessionTransition.sessionRecord?.sessionRefreshCount !== 0
  ) {
    errors.push('Office new-session transition must create a fresh session record.');
  }
  if (
    sameSessionTransition.returnSessionCount?.operation !== 'preserve'
    || sameSessionTransition.returnSessionCount?.increment !== false
  ) {
    errors.push('Office reloads must preserve returnSessionCount without incrementing it.');
  }
  if (
    JSON.stringify(contract.stateSelectionOrder) !== JSON.stringify(expectedStateSelectionOrder)
  ) {
    errors.push('Office state selection must prioritize Continued Interest, refresh, later return, then first access.');
  }
  if (
    JSON.stringify(contract.states?.map((state) => state.id)) !== JSON.stringify(expectedStateIds)
  ) {
    errors.push('Office contract must retain the four-state session progression.');
  }
  if (
    stateById.first_access?.selection?.persistentRecordExists !== false
    || stateById.same_session_refresh?.selection?.sessionMarkerExistedAtAccessStart !== true
    || stateById.same_session_refresh?.selection?.maximumReturnSessionCount !== 1
    || stateById.later_return?.selection?.newSession !== true
    || stateById.later_return?.selection?.postTransitionReturnSessionCount !== 1
    || stateById.continued_interest?.selection?.postTransitionReturnSessionCount?.minimum !== 2
  ) {
    errors.push('Office state selectors must use post-transition session counts deterministically.');
  }
  return errors;
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
  const officeBible = requireFile(
    repoRoot,
    'docs/office-of-lather-compliance/world-bible.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(officeBible, [
    '1961',
    'DELIBERATELY UNSPECIFIED',
    'STANDING CONTAINMENT REFERENCE',
    'VISITOR SUPPLIES THE FEAR',
    'INTENTIONALLY UNRESOLVED',
  ], 'Office world bible'));
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
    errors.push(...validateOfficeStateContract(officeState));
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
  }

  return errors;
}
