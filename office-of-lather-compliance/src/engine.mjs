// Browser-local visit state for the Office, per docs/contracts/visit-state.v1.json.
// Pure: storage, time and randomness are injected. No DOM, no network.
export const KEY = 'olc.visit.v1';

const REFERENCE = '8804-X';
const TERMINAL_ID = /^LC-[0-9A-F]{4}-8804$/;
const PERSISTENT_FIELDS = ['firstContact', 'lastContact', 'returnSessionCount', 'lifetimeAccessCount', 'reference', 'terminalId'];
const SESSION_FIELDS = ['sessionId', 'sessionRefreshCount'];
const FALLBACK = { state: 'fallback', values: null };

function parseExact(raw, fields) {
  if (typeof raw !== 'string') return null;
  let value;
  try { value = JSON.parse(raw); } catch { return null; }
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return null;
  const keys = Object.keys(value);
  if (keys.length !== fields.length || !fields.every((f) => Object.hasOwn(value, f))) return null;
  return value;
}

const isIso = (s) => typeof s === 'string' && Number.isFinite(Date.parse(s)) && new Date(s).toISOString() === s;
const isCount = (n, min) => Number.isInteger(n) && n >= min;

export function parsePersistent(raw) {
  const r = parseExact(raw, PERSISTENT_FIELDS);
  if (!r) return null;
  if (!isIso(r.firstContact) || !isIso(r.lastContact)) return null;
  if (Date.parse(r.lastContact) < Date.parse(r.firstContact)) return null;
  if (!isCount(r.returnSessionCount, 0) || !isCount(r.lifetimeAccessCount, 1)) return null;
  if (r.reference !== REFERENCE || typeof r.terminalId !== 'string' || !TERMINAL_ID.test(r.terminalId)) return null;
  return r;
}

export function parseSession(raw) {
  const s = parseExact(raw, SESSION_FIELDS);
  if (!s) return null;
  if (typeof s.sessionId !== 'string' || s.sessionId === '' || !isCount(s.sessionRefreshCount, 0)) return null;
  return s;
}

export function randomHex(n) {
  const bytes = new Uint8Array(Math.ceil(n / 2));
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, n).toUpperCase();
}

export function access({ local, session, now, randomHex: hex }) {
  let persistentRaw, sessionRaw;
  try {
    persistentRaw = local.getItem(KEY);
    sessionRaw = session.getItem(KEY);
  } catch {
    return FALLBACK;
  }

  // Captured before any write: a marker created below never turns this access into a refresh.
  const priorSession = parseSession(sessionRaw);
  const markerExisted = priorSession !== null;
  const prior = parsePersistent(persistentRaw);
  const at = now().toISOString();

  let record, sessionRecord;
  if (prior === null) {
    record = { firstContact: at, lastContact: at, returnSessionCount: 0, lifetimeAccessCount: 1, reference: REFERENCE, terminalId: `LC-${hex(4)}-8804` };
    sessionRecord = { sessionId: hex(16), sessionRefreshCount: 0 };
  } else if (markerExisted) {
    record = { ...prior, lifetimeAccessCount: prior.lifetimeAccessCount + 1 };
    sessionRecord = { ...priorSession, sessionRefreshCount: priorSession.sessionRefreshCount + 1 };
  } else {
    // Stored records keep lastContact >= firstContact. A current clock earlier than first contact
    // clamps the stored value; the displayed current contact still uses the real clock (`at`).
    const lastContact = Date.parse(at) < Date.parse(prior.firstContact) ? prior.firstContact : at;
    record = { ...prior, returnSessionCount: prior.returnSessionCount + 1, lifetimeAccessCount: prior.lifetimeAccessCount + 1, lastContact };
    sessionRecord = { sessionId: hex(16), sessionRefreshCount: 0 };
  }

  // Overwrite, then prove it. Nothing that implies recording renders on unverified persistence.
  const persistentOut = JSON.stringify(record);
  const sessionOut = JSON.stringify(sessionRecord);
  try {
    local.setItem(KEY, persistentOut);
    session.setItem(KEY, sessionOut);
    if (local.getItem(KEY) !== persistentOut || session.getItem(KEY) !== sessionOut) return FALLBACK;
  } catch {
    return FALLBACK;
  }

  const values = { terminalId: record.terminalId, firstContact: record.firstContact, currentContact: at, count: record.lifetimeAccessCount };
  if (record.returnSessionCount >= 2) return { state: 'continued_interest', values };
  if (prior !== null && markerExisted) return { state: 'same_session_refresh', values };
  if (record.returnSessionCount === 1) return { state: 'later_return', values };
  return { state: 'first_access', values };
}
