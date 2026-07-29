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
console.log('- CWAAA public-advocacy, route, material, and disclosure laws intact');
console.log('- Office deliberate under-design and browser-local state laws intact');
console.log('- Shop editorial-catalogue and unavailable-checkout laws intact');
console.log('- IVR deployment substitution and unresolved operational ownership intact');
