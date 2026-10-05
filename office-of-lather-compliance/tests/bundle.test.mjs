import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bundle } from '../scripts/bundle.mjs';

const a = "import { B } from './b.mjs';\nexport const A = 1;\nexport function f() { return A; }";
const b = 'export const B = 2;\nconst helper = 3;';

test('bundles single-line imports and named exports into one script', () => {
  const out = bundle([b, a]);
  assert.ok(!/^\s*(import|export)\s/m.test(out));
  assert.match(out, /^\(\(\) => \{\n/);
  assert.match(out, /const A = 1;/);
});

test('refuses a multi-line import instead of shipping a broken script', () => {
  const multi = "import {\n  B,\n} from './b.mjs';\nexport const A = B;";
  assert.throws(() => bundle([b, multi]), /import/i);
});

test('refuses export default and export lists', () => {
  assert.throws(() => bundle(['export default 1;']), /export/i);
  assert.throws(() => bundle(['const x = 1;\nexport { x };']), /export/i);
});

test('refuses two modules declaring the same top-level name', () => {
  assert.throws(() => bundle(['const helper = 1;', 'function helper() {}']), /helper/);
});
