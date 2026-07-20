/**
 * cg7-tests.mjs — acceptance tests for the CG7 killed-lines VALUE gate.
 *
 * These six tests are the contract from the six adversarial review rounds that
 * produced the gate (small-fixes-build.md Appendix A → cg7-promotion-order.md).
 * T2 is Sol's round-5 attack verbatim. Run:
 *
 *   node scripts/cg7-tests.mjs        (from site/, any Node >=22.6)
 *
 * Each test spawns the real copy-gates suite; CG7_COPY_TS / CG7_DIST point it at
 * generated fixtures. Only CG7 may fail in the red tests — a second failing gate
 * would mean the fixture leaked into another gate's input.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const DECK = readFileSync('src/content/copy.ts', 'utf8');
const KILLED_SENTENCE = 'A satirical spec campaign by Hope2 Studio.';
const work = mkdtempSync(join(tmpdir(), 'cg7-tests-'));

function runGates(env = {}) {
  // process.execPath (not 'node') so the suite runs on whichever Node invoked it —
  // that is how the 22.12.0 pinned-runtime verification was performed.
  const r = spawnSync(process.execPath, ['--experimental-strip-types', 'scripts/copy-gates.mjs'], {
    env: { ...process.env, ...env },
    encoding: 'utf8',
    shell: false,
  });
  return { code: r.status, out: (r.stdout || '') + (r.stderr || '') };
}

let failures = 0;
function check(name, cond, detail) {
  if (cond) console.log(`  ok    ${name}`);
  else { failures++; console.log(`  FAIL  ${name}\n        ${detail}`); }
}
function onlyCg7Failed(out) {
  return /DRIFTED: CG7\b/.test(out) && !/DRIFTED: .*CG[1-6]/.test(out);
}

/* T1 — real deck + real dist: green with exactly the two sanctioned exempts. */
{
  const { code, out } = runGates();
  check('T1 exit 0', code === 0, `exit=${code}`);
  check('T1 CG7 passes', /PASS\s+CG7/.test(out), out.match(/CG7.*/)?.[0]);
  check('T1 deck exempt is exactly about.credit', /exempt: deck:about\.credit, dist:dist\/about\/index\.html\)/.test(out),
    'expected exactly two exempts: deck:about.credit + dist:dist/about/index.html');
}

/* T2 — Sol R5: template literal faking `export const about = {` + smuggled value. */
{
  const p = join(work, 'copy-t2.ts');
  const decoy = 'export const decoy = `\nexport const about = {\n` as string;\n';
  const smuggle = `  smuggled: \`${KILLED_SENTENCE}\`,\n`;
  writeFileSync(p, DECK.replace(/export const masthead = \{\n/, (m) => decoy + m + smuggle));
  const { code, out } = runGates({ CG7_COPY_TS: p });
  check('T2 exit 1', code === 1, `exit=${code}`);
  check('T2 violation at masthead.smuggled', /deck:(default\.)?masthead\.smuggled/.test(out), out.match(/CG7[\s\S]{0,200}/)?.[0]);
  check('T2 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T3 — path spoof: nested masthead.about.credit must NOT ride the exemption. */
{
  const p = join(work, 'copy-t3.ts');
  const spoof = `  about: { credit: \`${KILLED_SENTENCE}\` },\n`;
  writeFileSync(p, DECK.replace(/export const masthead = \{\n/, (m) => m + spoof));
  const { code, out } = runGates({ CG7_COPY_TS: p });
  check('T3 exit 1', code === 1, `exit=${code}`);
  check('T3 violation at masthead.about.credit', /deck:(default\.)?masthead\.about\.credit/.test(out), out.match(/CG7[\s\S]{0,200}/)?.[0]);
  check('T3 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T4 — value smuggled into masthead + home: two deck violations. */
{
  const p = join(work, 'copy-t4.ts');
  const smuggle = `  smuggled: \`${KILLED_SENTENCE}\`,\n`;
  writeFileSync(p, DECK
    .replace(/export const masthead = \{\n/, (m) => m + smuggle)
    .replace(/export const home = \{\n/, (m) => m + smuggle));
  const { code, out } = runGates({ CG7_COPY_TS: p });
  check('T4 exit 1', code === 1, `exit=${code}`);
  check('T4 two violations', /2 killed line\(s\) resurrected/.test(out) &&
    /deck:(default\.)?masthead\.smuggled/.test(out) && /deck:(default\.)?home\.smuggled/.test(out),
    out.match(/CG7[\s\S]{0,300}/)?.[0]);
  check('T4 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T5 — killed line rendered on a campaign page's built HTML; /about stays legal. */
{
  const d = join(work, 'dist-t5');
  mkdirSync(join(d, 'home'), { recursive: true });
  mkdirSync(join(d, 'about'), { recursive: true });
  writeFileSync(join(d, 'home', 'index.html'), `<html><body><p>${KILLED_SENTENCE}</p></body></html>`);
  writeFileSync(join(d, 'about', 'index.html'), `<html><body><p>fine print: ${KILLED_SENTENCE.toLowerCase()}</p></body></html>`);
  const { code, out } = runGates({ CG7_DIST: d });
  check('T5 exit 1', code === 1, `exit=${code}`);
  check('T5 dist violation at home, about exempt', /dist:.*dist-t5\/home\/index\.html/.test(out) &&
    !/dist:.*dist-t5\/about\/index\.html.*«/.test(out.split('DRIFTED')[0].match(/killed line\(s\) resurrected[\s\S]*/)?.[0] || ''),
    out.match(/CG7[\s\S]{0,300}/)?.[0]);
  check('T5 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T6 — unloadable deck (missing file / wrong runtime): explicit FAIL, never green. */
{
  const { code, out } = runGates({ CG7_COPY_TS: join(work, 'does-not-exist.ts') });
  check('T6 exit 1', code === 1, `exit=${code}`);
  check('T6 fails loud with UNLOADABLE', /FAIL\s+CG7/.test(out) && /UNLOADABLE/.test(out) && /Node >=23|--experimental-strip-types/.test(out),
    out.match(/CG7.*/)?.[0]);
  check('T6 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T7 — Sol R7: render-layer anchor attack. A campaign page nested at
 * campaign/about/index.html must NOT ride /about's exemption; only the
 * dist-root about/index.html is sanctioned. */
{
  const d = join(work, 'dist-t7');
  mkdirSync(join(d, 'about'), { recursive: true });
  mkdirSync(join(d, 'campaign', 'about'), { recursive: true });
  writeFileSync(join(d, 'about', 'index.html'), `<html><body><p>${KILLED_SENTENCE}</p></body></html>`);
  writeFileSync(join(d, 'campaign', 'about', 'index.html'), `<html><body><p>${KILLED_SENTENCE}</p></body></html>`);
  const { code, out } = runGates({ CG7_DIST: d });
  check('T7 exit 1', code === 1, `exit=${code}`);
  check('T7 nested campaign/about flagged', /dist:.*dist-t7\/campaign\/about\/index\.html/.test(out),
    out.match(/CG7[\s\S]{0,300}/)?.[0]);
  check('T7 root about NOT flagged', !out.includes('dist-t7/about/index.html'),
    'root about/index.html appeared as a violation — exemption broke the other way');
  check('T7 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

/* T8 — deck anchor attack (round-8 class sweep): a QUOTED key literally named
 * "about.credit" smuggled into the default aggregate must not collide with the
 * real about→credit chain. Paths are compared as key arrays, never joined strings. */
{
  const p = join(work, 'copy-t8.ts');
  const spoof = `  "about.credit": \`${KILLED_SENTENCE}\`,\n`;
  writeFileSync(p, DECK.replace(/const copy = \{\n/, (m) => m + spoof));
  const { code, out } = runGates({ CG7_COPY_TS: p });
  check('T8 exit 1', code === 1, `exit=${code}`);
  check('T8 violation at default."about.credit"', /deck:default\."about\.credit"/.test(out),
    out.match(/CG7[\s\S]{0,300}/)?.[0]);
  check('T8 only CG7 failed', onlyCg7Failed(out), 'another gate failed — fixture leaked');
}

rmSync(work, { recursive: true, force: true });
console.log(failures ? `\n  ${failures} check(s) FAILED` : '\n  all CG7 acceptance checks pass');
process.exit(failures ? 1 : 0);
