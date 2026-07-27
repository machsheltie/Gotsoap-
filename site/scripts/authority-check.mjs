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
console.log('- shared world canon and artifact continuity markers present');
console.log('- three-system ownership and per-system behavioral markers present');
console.log('- portable pledge contracts match exactly');
console.log('- Office jurisdiction, error-only surface, and local-state rules intact');
console.log('- IVR ambiguity and Office session-state rules intact');
