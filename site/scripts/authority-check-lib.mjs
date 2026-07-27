import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const IVR_SHA256 = '7748CEFCED4D671E57ACA64D4BA3852C693C068B89A982E2365E4FC3D6AF1AB0';

export function compareRawDocuments(left, right) {
  return Buffer.isBuffer(left) && Buffer.isBuffer(right) && left.equals(right)
    ? []
    : ['Portable pledge contracts do not match exactly as raw bytes.'];
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

function protectedUnresolvedContext(line) {
  const assertionStart = line.search(
    /\b(?:CWAAA|Office(?: of Lather Compliance)?)\b|Got Soap\?/i,
  );
  const context = assertionStart === -1 ? line : line.slice(0, assertionStart);
  return /\b(?:whether|intentionally unresolved|unresolved possibility|may wonder|allowed to wonder|does not|do not|never|must not|cannot|can't|forbidden|prohibited|no artifact|question)\b/i.test(context);
}

function matchingLines(text, pattern) {
  return text
    .split(/\r?\n/).flatMap((line) => line.split(/(?<!Got Soap\?)(?<=[.!?])\s+/))
    .filter((line) => pattern.test(line));
}

export function validatePathAwareCanon(path, text) {
  const errors = [];
  const lowerPath = path.toLowerCase().replaceAll('\\', '/');

  const isCwaaa = lowerPath.includes('/cwaaa/');
  const isGotSoap = lowerPath.includes('/gotsoap/')
    || lowerPath.endsWith('/prd/prd-gotsoap-web-v1.md')
    || lowerPath === 'docs/design.md';
  const isOffice = lowerPath.includes('/office-of-lather-compliance/');

  if (isCwaaa) {
    if (
      /\bCWAAA\b[^.\n]{0,100}\b(?:was\s+)?(?:established|founded|formed|has existed since|dates? to)\b[^.\n]{0,30}\b1961\b/i.test(text)
      || /\*\*Established:\*\*\s*1961\b/i.test(text)
    ) {
      errors.push(`${path}: CWAAA chronology must not assign 1961 to CWAAA.`);
    }
    for (const line of matchingLines(text, /\bCWAAA\s+(?:campaigns?|regulates?|claims?\s+jurisdiction|assumes?\s+jurisdiction)\b/i)) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bCWAAA\s+campaigns?\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not campaign; Got Soap? owns campaign authorship.`);
      }
      if (/\bCWAAA\s+regulates?\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not regulate; the Office owns regulation.`);
      }
      if (/\bCWAAA\s+(?:claims?|assumes?)\s+jurisdiction\b/i.test(line)) {
        errors.push(`${path}: CWAAA must not claim jurisdiction.`);
      }
    }
  }

  if (isGotSoap) {
    for (const line of matchingLines(text, /\bGot Soap\?\s+(?:regulates?|files?\s+findings)\b/i)) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bGot Soap\?\s+regulates?\b/i.test(line)) {
        errors.push(`${path}: Got Soap? must not regulate.`);
      }
      if (/\bGot Soap\?\s+files?\s+findings\b/i.test(line)) {
        errors.push(`${path}: Got Soap? must not file findings.`);
      }
    }
  }

  if (isOffice) {
    if (
      /\b(?:The\s+)?Office(?: of Lather Compliance)?\b[^.\n]{0,100}\b(?:was\s+)?(?:established|founded|formed|has existed since|dates? to)\b[^.\n]{0,30}\b2024\b/i.test(text)
      || /\*\*Established:\*\*\s*2024\b/i.test(text)
    ) {
      errors.push(`${path}: Office chronology must not assign 2024 to the Office.`);
    }
    for (const line of matchingLines(
      text,
      /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:campaigns?|owns?|files?|receives?|records?|enforces?|processes?)\b/i,
    )) {
      if (protectedUnresolvedContext(line)) continue;
      if (/\bOffice(?: of Lather Compliance)?\s+campaigns?\b/i.test(line)) {
        errors.push(`${path}: Office must not campaign.`);
      }
      if (/\bOffice(?: of Lather Compliance)?\s+owns?\s+(?:the\s+)?(?:Lather\s+)?Pledge\b/i.test(line)) {
        errors.push(`${path}: Office must not own the pledge.`);
      }
      if (/\bOffice(?: of Lather Compliance)?\s+(?:files?|receives?|records?|enforces?|processes?)\s+(?:the\s+)?(?:Lather\s+)?Pledge\b/i.test(line)) {
        errors.push(`${path}: Office must not file the pledge or control its data.`);
      }
    }
  }

  const relationshipPatterns = [
    /\bCWAAA\s+(?:is|serves as|functions as|acts as)\s+(?:an?\s+|the\s+)?(?:Office(?: of Lather Compliance)?(?:'s)?\s+)?(?:public-facing\s+(?:layer|front)|front|division|parent(?:\s+(?:agency|organization))?)/i,
    /\bCWAAA\s+(?:fronts for|is operated by|is a division of|is the parent of)\s+(?:the\s+)?Office\b/i,
    /\b(?:The\s+)?Office(?: of Lather Compliance)?\s+(?:operates|uses|controls)\s+CWAAA\s+as\s+(?:its\s+)?(?:public-facing\s+layer|front|division)/i,
  ];
  for (const line of text
    .split(/\r?\n/).flatMap((entry) => entry.split(/(?<!Got Soap\?)(?<=[.!?])\s+/))) {
    if (protectedUnresolvedContext(line)) continue;
    const match = relationshipPatterns.map((pattern) => line.match(pattern)).find(Boolean);
    if (match) {
      const label = /public-facing layer/i.test(match[0])
        ? 'public-facing layer'
        : /front/i.test(match[0])
          ? 'front'
          : /division/i.test(match[0])
            ? 'division'
            : 'parent';
      errors.push(`${path}: relationship mystery must not resolve CWAAA as the Office ${label}.`);
    }
  }

  const overResolvingRules = [
    {
      paths: ['/cwaaa/world-bible.md'],
      pattern: /\bnever\s+(?:a\s+regulator,\s+law-enforcement body,\s+or\s+)?a\s+government front\b/i,
      label: 'government front',
    },
    {
      paths: ['/cwaaa/world-bible.md'],
      pattern: /\bCWAAA\b[\s\S]{0,120}\bdoes not know\b[\s\S]{0,120}\b(?:Office|its)\s+internal systems\b/i,
      label: 'Office internal systems',
    },
    {
      paths: ['/cwaaa/readme.md', '/office-of-lather-compliance/readme.md'],
      pattern: /\bCWAAA\b[^.]{0,100}\bdoes not contain or operate\b/i,
      label: 'contain or operate',
    },
    {
      paths: ['agents.md'],
      pattern: /\b(?:CWAAA|It)\s+never\s+contains,\s+operates,\s+or\s+impersonates\s+the\s+Office\b/i,
      label: 'impersonates the Office',
    },
    {
      paths: ['/office-of-lather-compliance/world-bible.md'],
      pattern: /\b(?:The Office|It)\s+never[^.\n]{0,100}\bdispatches an assessor\b/i,
      label: 'dispatches an assessor',
    },
    {
      paths: ['/handoff.md'],
      pattern: /\b(?:CWAAA|It)\b[^.]{0,80}\bneither contains nor operates\b/i,
      label: 'neither contains nor operates',
    },
  ];
  for (const { paths, pattern, label } of overResolvingRules) {
    if (paths.some((suffix) => lowerPath.endsWith(suffix)) && pattern.test(text)) {
      errors.push(`${path}: over-resolves protected CWAAA/Office ambiguity via "${label}".`);
    }
  }

  if (lowerPath.endsWith('/1-800-got-soap-ivr-authority.md')) {
    if (/^\s*(?:(?:There is|The call (?:has|uses|includes))\s+(?:a\s+)?third Office voice\b|A third Office voice\b)/im.test(text)) {
      errors.push(`${path}: IVR authority must not add a third Office voice.`);
    }
    if (/^\s*(?:(?:There is|The caller hears)\s+an audible transfer\b|Voice [AB]\s+audibly transfers?\b)/im.test(text)) {
      errors.push(`${path}: IVR authority must not add an audible transfer.`);
    }
  }

  return errors;
}

export function validateIvrIntegrity(bytes) {
  if (bytes === null) return ['IVR integrity error: canonical PDF is missing.'];
  if (!Buffer.isBuffer(bytes) || bytes.length === 0) {
    return ['IVR integrity error: canonical PDF is empty.'];
  }
  const actual = createHash('sha256').update(bytes).digest('hex').toUpperCase();
  return actual === IVR_SHA256
    ? []
    : [`IVR integrity error: canonical PDF SHA-256 ${actual} does not match ${IVR_SHA256}.`];
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
  const firstAccessTransition = contract.firstAccessTransition ?? {};
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
  if (storage.session !== 'sessionStorage') {
    errors.push('Office storage.session must be sessionStorage.');
  }
  if (storage.persistent !== 'localStorage') {
    errors.push('Office storage.persistent must be localStorage.');
  }
  if (storage.namespace !== 'olc.visit.v1') {
    errors.push('Office storage namespace must be olc.visit.v1.');
  }
  if (storage.cookies !== false) {
    errors.push('Office storage cookies must remain false.');
  }
  if (storage.ipAddress !== false) {
    errors.push('Office storage ipAddress must remain false.');
  }
  if (storage.fingerprinting !== false) {
    errors.push('Office storage fingerprinting must remain false.');
  }
  if (storage.serverPersistence !== false) {
    errors.push('Office storage serverPersistence must remain false.');
  }
  if (contract.rendering?.resolveBeforeReveal !== true) {
    errors.push('Office rendering resolveBeforeReveal must remain true.');
  }
  if (contract.rendering?.returningBrowserMayFlashFirstAccess !== false) {
    errors.push('Office rendering returningBrowserMayFlashFirstAccess must remain false.');
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
  if (firstAccessTransition.requiresPersistentRecordAbsent !== true) {
    errors.push('Office first access must require an absent persistent record.');
  }
  if (firstAccessTransition.skipsNewSessionTransition !== true) {
    errors.push('Office first access must skip the new-session transition.');
  }
  if (firstAccessTransition.persistentRecord?.operation !== 'create') {
    errors.push('Office first access must create the persistent record.');
  }
  if (firstAccessTransition.persistentRecord?.returnSessionCount !== 0) {
    errors.push('Office first access must initialize returnSessionCount to 0.');
  }
  if (firstAccessTransition.persistentRecord?.lifetimeAccessCount !== 1) {
    errors.push('Office first access must initialize lifetimeAccessCount to 1.');
  }
  if (firstAccessTransition.sessionRecord?.operation !== 'create') {
    errors.push('Office first access must create the session record.');
  }
  if (firstAccessTransition.sessionRecord?.sessionRefreshCount !== 0) {
    errors.push('Office first access must initialize sessionRefreshCount to 0.');
  }
  if (newSessionTransition.beforeStateSelection !== true) {
    errors.push('Office new-session transition must run before pre-selection state resolution.');
  }
  if (newSessionTransition.requiresPersistentRecord !== true) {
    errors.push('Office new-session transition must require a persistent record.');
  }
  if (newSessionTransition.requiresSessionMarkerAbsentAtAccessStart !== true) {
    errors.push('Office new-session transition must require an absent session marker at access start.');
  }
  if (newSessionTransition.literalFirstAccessSkipsTransition !== true) {
    errors.push('Office literal first access must skip the new-session transition.');
  }
  if (newSessionTransition.returnSessionCount?.operation !== 'increment') {
    errors.push('Office new-session returnSessionCount operation must be increment.');
  }
  if (newSessionTransition.returnSessionCount?.amount !== 1) {
    errors.push('Office new-session returnSessionCount amount must be 1.');
  }
  if (newSessionTransition.returnSessionCount?.oncePerNewSession !== true) {
    errors.push('Office returnSessionCount must increment once per new session.');
  }
  if (newSessionTransition.lifetimeAccessCount?.operation !== 'increment') {
    errors.push('Office new-session lifetimeAccessCount operation must be increment.');
  }
  if (newSessionTransition.lifetimeAccessCount?.amount !== 1) {
    errors.push('Office new-session lifetimeAccessCount amount must be 1.');
  }
  if (newSessionTransition.sessionRecord?.operation !== 'create') {
    errors.push('Office new-session transition must create a fresh session record.');
  }
  if (newSessionTransition.sessionRecord?.sessionRefreshCount !== 0) {
    errors.push('Office new-session sessionRefreshCount must initialize to 0.');
  }
  if (sameSessionTransition.returnSessionCount?.operation !== 'preserve') {
    errors.push('Office same-session returnSessionCount operation must be preserve.');
  }
  if (sameSessionTransition.returnSessionCount?.increment !== false) {
    errors.push('Office same-session returnSessionCount increment must remain false.');
  }
  if (sameSessionTransition.sessionRefreshCount?.operation !== 'increment') {
    errors.push('Office same-session sessionRefreshCount operation must be increment.');
  }
  if (sameSessionTransition.sessionRefreshCount?.amount !== 1) {
    errors.push('Office same-session sessionRefreshCount amount must be 1.');
  }
  if (sameSessionTransition.lifetimeAccessCount?.operation !== 'increment') {
    errors.push('Office same-session lifetimeAccessCount operation must be increment.');
  }
  if (sameSessionTransition.lifetimeAccessCount?.amount !== 1) {
    errors.push('Office same-session lifetimeAccessCount amount must be 1.');
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

export function validatePledgeContract(contract) {
  const errors = [];
  const fulfillment = contract.fulfillment ?? {};
  const messages = fulfillment.messages ?? [];
  const receipt = messages[0] ?? {};
  const currentIssue = messages[1] ?? {};
  const consent = contract.consent ?? {};
  const futurePrograms = contract.futurePrograms ?? {};
  const privacy = contract.privacy ?? {};

  if (contract.owner !== 'CWAAA') {
    errors.push('Pledge contract owner must remain CWAAA.');
  }
  if (contract.backend?.provider !== 'Buttondown') {
    errors.push('Pledge contract backend must be Buttondown.');
  }
  if (contract.backend?.audience !== 'one shared audience') {
    errors.push('Pledge contract must specify one shared audience.');
  }
  if (fulfillment.author !== 'CWAAA') {
    errors.push('Pledge fulfillment author must be CWAAA.');
  }
  if (JSON.stringify(fulfillment.appliesToImplementations) !== JSON.stringify(['Got Soap?', 'CWAAA'])) {
    errors.push('Pledge fulfillment must cover Got Soap? and CWAAA in that order.');
  }
  if (fulfillment.totalMessages !== 2) {
    errors.push('Pledge fulfillment totalMessages must be exactly 2.');
  }
  if (messages.length !== 2) {
    errors.push('Pledge fulfillment must define exactly two message records.');
  }
  if (receipt.id !== 'pledgeReceipt') {
    errors.push('Pledge first message must be pledgeReceipt.');
  }
  if (receipt.sequence !== 1) {
    errors.push('Pledge pledgeReceipt sequence must be 1.');
  }
  if (receipt.delivery !== 'immediate') {
    errors.push('Pledge pledgeReceipt delivery must be immediate.');
  }
  if (receipt.maximumDeliveries !== 1) {
    errors.push('Pledge pledgeReceipt maximumDeliveries must be 1.');
  }
  if (receipt.consentWithdrawalMechanismRequired !== true) {
    errors.push('Pledge pledgeReceipt must provide consent withdrawal before the current issue.');
  }
  if (currentIssue.id !== 'currentIssue') {
    errors.push('Pledge second message must be currentIssue.');
  }
  if (currentIssue.sequence !== 2) {
    errors.push('Pledge currentIssue sequence must be 2.');
  }
  if (currentIssue.delivery !== 'separately after a configurable short delay') {
    errors.push('Pledge currentIssue must be delivered separately after a configurable short delay.');
  }
  if (currentIssue.maximumDeliveries !== 1) {
    errors.push('Pledge currentIssue maximumDeliveries must be 1.');
  }
  if (currentIssue.displayDateSource !== 'signup or send time') {
    errors.push('Pledge currentIssue display date must derive from signup or send time.');
  }
  if (currentIssue.preSendConsentCheckRequired !== true) {
    errors.push('Pledge currentIssue requires a pre-send consent check.');
  }
  if (currentIssue.suppressIfConsentWithdrawn !== true) {
    errors.push('Pledge currentIssue must be suppressed after consent withdrawal.');
  }
  if (currentIssue.unsubscribeMechanismRequired !== true) {
    errors.push('Pledge currentIssue must include a functioning unsubscribe mechanism.');
  }
  if (fulfillment.providerExtraMessageAllowed !== false) {
    errors.push('Pledge provider must not add a third message.');
  }
  if (fulfillment.ongoingSubscription !== false) {
    errors.push('Pledge ongoingSubscription must remain false.');
  }
  if (fulfillment.dripCampaign !== false) {
    errors.push('Pledge dripCampaign must remain false.');
  }
  if (consent.required !== true) {
    errors.push('Pledge consent must remain required.');
  }
  if (consent.disclosesExactlyTwoMessages !== true) {
    errors.push('Pledge consent must disclose exactly two messages.');
  }
  if (consent.disclosesImmediateReceipt !== true) {
    errors.push('Pledge consent must disclose the immediate receipt.');
  }
  if (consent.disclosesSeparateCurrentIssue !== true) {
    errors.push('Pledge consent must disclose the separately delivered current issue.');
  }
  if (consent.disclosesNoOngoingSubscription !== true) {
    errors.push('Pledge consent must disclose there is no ongoing subscription.');
  }
  if (consent.withdrawalBeforeCurrentIssueSuppressesDelivery !== true) {
    errors.push('Pledge consent withdrawal must suppress an unsent currentIssue.');
  }
  if (futurePrograms.requiresSeparateOwnerApproval !== true) {
    errors.push('Pledge future programs require separate owner approval.');
  }
  if (futurePrograms.requiresSeparateContract !== true) {
    errors.push('Pledge future programs require a separate contract.');
  }
  if (futurePrograms.requiresSeparateConsent !== true) {
    errors.push('Pledge future programs require separate consent.');
  }
  if (futurePrograms.altersFormCw1 !== false) {
    errors.push('Pledge future programs must not alter Form CW-1.');
  }
  if (privacy.analyticsMayReceiveFieldValues !== false) {
    errors.push('Pledge field values must not enter analytics.');
  }
  if (privacy.pledgeAndEmailValuesMayEnterAnalytics !== false) {
    errors.push('Pledge and email values must not enter analytics.');
  }
  if (privacy.retentionScope !== 'minimum Buttondown data needed to fulfill two messages and honor suppression') {
    errors.push('Pledge privacy must define minimum Buttondown retention.');
  }
  if (privacy.removeUnneededFulfillmentMetadataAfterCompletion !== true) {
    errors.push('Pledge unneeded fulfillment metadata must be removed after completion.');
  }
  if (privacy.suppressionRecordMayBeRetained !== true) {
    errors.push('Pledge suppression record may be retained to prevent accidental resend.');
  }
  if (privacy.additionalProviderAuthorized !== false) {
    errors.push('Pledge no additional provider is authorized.');
  }

  return errors;
}

function read(root, relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path, 'utf8') : null;
}

function readBuffer(root, relativePath) {
  const path = resolve(root, relativePath);
  return existsSync(path) ? readFileSync(path) : null;
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
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
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
    'FICTIONAL OWNER',
    'DOCUMENTATION AUTHORITY',
    'SHARED PLEDGE CORE',
  ], 'docs/world/artifact-continuity.md'));

  const ivrAuthority = requireFile(
    repoRoot,
    'docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(ivrAuthority, [
    'NUMBER LIVES ON GOT SOAP?',
    'TWO PRESENTED VOICES',
    'NO THIRD OFFICE VOICE',
    'NO AUDIBLE TRANSFER',
    'WE HAVE YOUR NUMBER',
    'SOMEONE IS ALREADY ON THEIR WAY',
    'INTENTIONAL WRONGNESS',
    'FIELD ASSESSORS',
    'THE HIDDEN BRANCH',
    'OFFICE AFTER-HOURS VOICEMAIL',
    'EVERYTHING IS NOTED',
    'BINDING',
  ], 'IVR authority'));

  errors.push(...validateIvrIntegrity(readBuffer(
    repoRoot,
    'docs/world/artifacts/1-800-GOT-SOAP-IVR-script.pdf',
  )));
  const liveDocuments = [
    'AGENTS.md',
    'CLAUDE.md',
    'docs/HANDOFF.md',
    'docs/design.md',
    'docs/prd/PRD-gotsoap-web-v1.md',
    'docs/strategy/participation-mechanics.md',
    'docs/strategy/cwaaa-divergence-roadmap.md',
  ];

  const liveDocumentContents = new Map();
  for (const path of liveDocuments) {
    const content = requireFile(repoRoot, path, errors);
    liveDocumentContents.set(path, content);
    errors.push(...findForbiddenAuthorityPhrases(content, path));
  }

  errors.push(...missingRequiredMarkers(liveDocumentContents.get('docs/HANDOFF.md') ?? '', [
    'AUTHORITY PRECEDENCE',
    '1. OWNER DECISIONS RECORDED IN `DOCS/HANDOFF.MD`',
    '2. `DOCS/WORLD/WORLD-BIBLE.MD`',
    '3. THE RELEVANT PER-SYSTEM WORLD BIBLE',
    '4. THE RELEVANT CURRENT DESIGN AUTHORITY AND PRD',
    '5. SHARED AND PER-SYSTEM MACHINE-READABLE CONTRACTS',
    '6. ARTIFACT BRIEFS AND COPY DECKS',
    '7. HISTORICAL DOCUMENTS',
    '`DOCS/GOTSOAP/WORLD-BIBLE.MD`',
    '`DOCS/OFFICE-OF-LATHER-COMPLIANCE/WORLD-BIBLE.MD`',
    'SHOP REMAINS CANONICAL',
    'UNAVAILABLE CHECKOUT',
    '`/BROADCAST`',
    'FULL-BLEED HOMEPAGE PREMIERE SEAM',
    'PHONE NUMBER IS OWNED BY GOT SOAP?',
    'TWO PRESENTED VOICES',
    'NO AUDIBLE TRANSFER',
    'OFFICE HAS EXISTED SINCE 1961',
    'CWAAA WAS ESTABLISHED IN 2024',
    'THIRD DISTINCT BROWSER SESSION',
  ], 'docs/HANDOFF.md'));

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
    'CWAAA AUTHORS FULFILLMENT FOR BOTH PUBLIC PLEDGE PRESENTATIONS',
    'EXACTLY TWO MESSAGES',
    'FUNCTIONING UNSUBSCRIBE',
    'MINIMUM BUTTONDOWN DATA',
  ], 'docs/prd/PRD-gotsoap-web-v1.md'));

  const cwaaaReadme = requireFile(repoRoot, 'docs/cwaaa/README.md', errors);
  errors.push(...missingRequiredMarkers(cwaaaReadme, [
    'CREDIBLE FICTIONAL ADVOCACY NONPROFIT',
    'LEGALLY SEPARATE FICTIONAL',
    'GOVERNMENT AGENCY',
    'PUBLIC SITE PRESENTS ONLY CWAAA',
    'AUTHORSHIP',
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
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
    'ONE SEPARATELY DELIVERED CURRENT ISSUE',
    'MONTH AND YEAR',
    'NOT AN ONGOING',
    'CWAAA AUTHORS FULFILLMENT FOR BOTH PUBLIC PLEDGE PRESENTATIONS',
    'EXACTLY TWO MESSAGES',
    'FUNCTIONING UNSUBSCRIBE',
    'MINIMUM BUTTONDOWN DATA',
  ], 'docs/cwaaa/PRD-cwaaa-web-v1.md'));

  const cwaaaMigration = requireFile(
    repoRoot,
    'docs/cwaaa/migration-manifest.md',
    errors,
  );
  errors.push(...missingRequiredMarkers(cwaaaMigration, [
    'GOTSOAP-WORLD-CANON.V1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
    'MOVEMENT UPDATES',
    'REQUIRED MIGRATION/COPY-LANE CORRECTION',
    'CWAAA FIELD ASSESSORS',
    'TARGET OWNERSHIP IS GOT SOAP?',
  ], 'docs/cwaaa/migration-manifest.md'));

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
    'SAME-SESSION REFRESH APPLIES ONLY WHILE',
    '`RETURNSESSIONCOUNT` IS BELOW `2`',
  ], 'Office package'));

  errors.push(...missingRequiredMarkers(officeReadme, [
    'GOTSOAP-WORLD-CANON.V1',
    'VERSION 1',
    'SOURCE COMMIT',
    'SUBORDINATE SNAPSHOT',
    'RESYNC',
  ], 'docs/office-of-lather-compliance/README.md'));

  const campaignPledge = parseJson(repoRoot, 'docs/contracts/pledge.v1.json', errors);
  const cwaaaPledge = parseJson(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json', errors);
  if (campaignPledge && cwaaaPledge) {
    const campaignPledgeDocument = readBuffer(repoRoot, 'docs/contracts/pledge.v1.json');
    const cwaaaPledgeDocument = readBuffer(repoRoot, 'docs/cwaaa/contracts/pledge.v1.json');
    errors.push(...compareRawDocuments(campaignPledgeDocument, cwaaaPledgeDocument));
    errors.push(...validatePledgeContract(campaignPledge));
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

  const pathAwareDocuments = new Map([
    ...liveDocumentContents,
    ['docs/world/WORLD-BIBLE.md', worldBible],
    ['docs/world/artifacts/1-800-GOT-SOAP-IVR-authority.md', ivrAuthority],
    ['docs/gotsoap/world-bible.md', gotSoapBible],
    ['docs/prd/PRD-gotsoap-web-v1.md', gotSoapPrd],
    ['docs/cwaaa/README.md', cwaaaReadme],
    ['docs/cwaaa/world-bible.md', cwaaaBible],
    ['docs/cwaaa/design.md', cwaaaDesign],
    ['docs/cwaaa/PRD-cwaaa-web-v1.md', cwaaaPrd],
    ['docs/cwaaa/migration-manifest.md', cwaaaMigration],
    ['docs/office-of-lather-compliance/README.md', officeReadme],
    ['docs/office-of-lather-compliance/world-bible.md', officeBible],
    ['docs/office-of-lather-compliance/design.md', officeDesign],
    ['docs/office-of-lather-compliance/PRD-office-v1.md', officePrd],
  ]);
  for (const [path, content] of pathAwareDocuments) {
    errors.push(...validatePathAwareCanon(path, content));
  }

  return errors;
}
