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
console.log('- three-system ownership markers present');
console.log('- Got Soap? anti-template and participation markers present');
console.log('- portable pledge contracts match exactly');
console.log('- Office jurisdiction, error-only surface, and local-state rules intact');
