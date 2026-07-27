import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { collectAuthorityErrors } from './authority-check-lib.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..', '..');
const errors = collectAuthorityErrors(repoRoot);

if (errors.length) {
  console.error(`AUTHORITY CHECK: FAIL (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('AUTHORITY CHECK: PASS');
console.log('- shared canon, portability, artifact ownership, and HANDOFF precedence intact');
console.log('- path-aware chronology, role, and unresolved-relationship rules intact');
console.log('- portable pledge Buffers match and finite CWAAA fulfillment is intact');
console.log('- Office jurisdiction, error-only surface, storage, privacy, and state rules intact');
console.log('- IVR exact SHA-256, protected branches, two voices, and no-transfer ambiguity intact');
console.log('- IVR Office language/authority remains distinct from browser session state');
