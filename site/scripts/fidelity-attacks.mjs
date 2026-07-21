/**
 * fidelity-attacks.mjs — adversarial regression suite for fidelity-check.mjs.
 *
 * Re-runs the attack classes from Sol's four adversarial passes (v2, v3, v3.1,
 * v3.2 holds) plus the v3.3 padding/superstring/relocation set, as a
 * repeatable script instead of ad-hoc sabotage. Every attack must make the
 * checker report FAILURE with the correct exit code; the two controls must
 * pass with the correct exit code. Sabotage always runs through
 * FIDELITY_TEST_MODE=1 (proof mode rejects the overrides — that rejection is
 * itself attacks P2/P3).
 *
 * This is an attack CATALOG, not a completeness proof: it demonstrates the
 * defended classes stay defended. New attack ideas get added here after they
 * are tried, per the verification-artifact law (PROTOCOL.md).
 *
 *   node --experimental-strip-types scripts/fidelity-attacks.mjs
 *
 * Exit: 0 = every scenario behaved as required · 1 = at least one did not.
 * ATTACK_NODE=<path-to-node> overrides the node binary used for the checker
 * (for cross-version runs, e.g. Node 22.12 vs 24).
 */

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const NODE = process.env.ATTACK_NODE || process.execPath;
const CHECK = 'scripts/fidelity-check.mjs';
const PLAN = '../docs/copy/copy-correction-plan.md';
const COPY_TS = 'src/content/copy.ts';
const DIST = 'dist';
const BRAND = 'TEST MODE — NON-AUTHORITATIVE';

const planText = readFileSync(PLAN, 'utf8');
const copySrc = readFileSync(COPY_TS, 'utf8');
const deck = (await import(pathToFileURL(COPY_TS).href)).default;
const manifestRoutes = JSON.parse(readFileSync('scripts/route-manifest.json', 'utf8')).routes;

const tmp = mkdtempSync(join(tmpdir(), 'fidelity-attack-'));
const results = [];

function run(env) {
  const r = spawnSync(NODE, ['--experimental-strip-types', CHECK], {
    env: { ...process.env, ...env },
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '' };
}

function scenario(name, env, { exit, mustSee = [], channel = 'any', branded = null }) {
  const r = run(env);
  const text = r.stdout + r.stderr;
  const probs = [];
  if (r.status !== exit) probs.push(`exit ${r.status}, required ${exit}`);
  for (const s of mustSee) {
    const hay = channel === 'stderr' ? r.stderr : channel === 'stdout' ? r.stdout : text;
    if (!hay.includes(s)) probs.push(`missing "${s.slice(0, 60)}"`);
  }
  if (branded === true) {
    // Node-runtime warning lines (e.g. ExperimentalWarning on 22.x) are the
    // runtime's, not the checker's — outside the branding contract.
    const runtimeNoise = (l) => /^\(node:\d+\)/.test(l) || l.startsWith('(Use `node');
    const bad = [...r.stdout.split('\n'), ...r.stderr.split('\n')]
      .filter((l) => l.trim() !== '' && !runtimeNoise(l) && !l.startsWith(BRAND));
    if (bad.length) probs.push(`${bad.length} UNBRANDED line(s), e.g. "${bad[0].slice(0, 60)}"`);
  }
  if (branded === false && text.includes(BRAND)) probs.push('proof-mode output carries test-mode branding');
  results.push({ name, ok: probs.length === 0, probs });
  console.log(`  ${probs.length === 0 ? 'OK  ' : 'BAD '} ${name}${probs.length ? ' — ' + probs.join(' · ') : ''}`);
}

/* ---------- mutation helpers ---------------------------------------------- */

const once = (hay, needle) => hay.split(needle).length === 2;
function mutateDeck(name, fn) {
  const mutated = fn(copySrc);
  if (mutated === copySrc) throw new Error(`${name}: mutation was a no-op`);
  // .mts: explicit ESM — avoids Node 22's unbranded "Reparsing as ES module"
  // advisory for temp files outside the package's "type":"module" scope.
  const p = join(tmp, `${name}.mts`);
  writeFileSync(p, mutated);
  return p;
}
function writePlan(name, text) {
  const p = join(tmp, `${name}.md`);
  writeFileSync(p, text);
  return p;
}

// Target strings, taken from the live deck so the attack survives copy churn.
const finePrint = deck.crisis.finePrint;         // PRESENCE row `crisis.finePrint`
const whyKept = deck.about.why[1];               // UNCHANGED row `about.why[1]`
if (typeof finePrint !== 'string' || !once(copySrc, finePrint)) throw new Error('finePrint target not unique in source');
if (typeof whyKept !== 'string' || !once(copySrc, whyKept)) throw new Error('about.why[1] target not unique in source');

/* ---------- proof-mode seam attacks ---------------------------------------- */

console.log(`\nfidelity attack suite — checker: ${CHECK} · node: ${NODE}\n`);
console.log('— proof mode');

scenario('P1 control: clean proof run passes, unbranded, exit 0', {}, {
  exit: 0, mustSee: ['authoritative: yes', 'landed: 54/54'], channel: 'stdout', branded: false,
});
scenario('P2 override rejected: FIDELITY_PLAN in proof mode', { FIDELITY_PLAN: 'x.md' }, {
  exit: 1, mustSee: ['overrides are rejected'], channel: 'stderr',
});
scenario('P3 self-baseline rejected: FIDELITY_BASELINE_REF=HEAD in proof mode', { FIDELITY_BASELINE_REF: 'HEAD' }, {
  exit: 1, mustSee: ['overrides are rejected'], channel: 'stderr',
});

// P4: dirty working-tree plan must refuse to prove. Restore bytes in finally.
{
  const orig = readFileSync(PLAN);
  try {
    writeFileSync(PLAN, planText + '\n<!-- sabotage -->\n');
    scenario('P4 dirty artifact: uncommitted plan edit refused in proof mode', {}, {
      exit: 1, mustSee: ['differs from git HEAD'], channel: 'stderr',
    });
  } finally { writeFileSync(PLAN, orig); }
}

/* ---------- test-mode sabotage attacks ------------------------------------- */

console.log('— test mode (sabotage via overrides; exit contract 3=landed, 2=failed)');

const T = { FIDELITY_TEST_MODE: '1' };

scenario('T1 control: clean test run exits 3 (never 0), fully branded', T, {
  exit: 3, mustSee: ['landed: 54/54', 'authoritative: NO'], branded: true,
});

scenario('T2 truncated plan: §7 removed', {
  ...T, FIDELITY_PLAN: writePlan('truncated', planText.slice(0, planText.indexOf('## 7.'))),
}, { exit: 2, mustSee: ['FATAL'], branded: true });

{
  const rowLine = planText.split('\n').find((l) => l.includes('`crisis.finePrint`'));
  scenario('T3 padded plan: fabricated 55th row vs order-declared 54', {
    ...T, FIDELITY_PLAN: writePlan('padded', planText.replace(rowLine, rowLine + '\n' + rowLine.replace('crisis.finePrint', 'crisis.fakeSlot'))),
  }, { exit: 2, mustSee: ['54'], branded: true });
}

scenario('T4 padding: agreed text + appendix at its slot', {
  ...T, FIDELITY_COPY_TS: mutateDeck('padding', (s) => s.replace(finePrint, finePrint + ' Now with more lye.')),
}, { exit: 2, mustSee: ['NOT slot-bound'], branded: true });

scenario('T5 superstring: agreed text embedded mid-leaf', {
  ...T, FIDELITY_COPY_TS: mutateDeck('superstring', (s) => s.replace(finePrint, 'Sponsored disclosure. ' + finePrint)),
}, { exit: 2, mustSee: ['NOT slot-bound'], branded: true });

scenario('T6 relocation: agreed text moved out of its labeled slot', {
  ...T, FIDELITY_COPY_TS: mutateDeck('relocation', (s) =>
    s.replace(finePrint, 'Different text entirely.').replace(deck.crisis.exitCta, deck.crisis.exitCta + ' ' + finePrint)),
}, { exit: 2, mustSee: ['NOT slot-bound'], branded: true });

scenario('T7 roster: unapproved RC-999 added', {
  ...T, FIDELITY_COPY_TS: mutateDeck('roster', (s) =>
    s.replace('{ id: "RC-022"', '{ id: "RC-999", quote: `"Fake."`, name: "Fake, 99", status: "FAKE." },\n      { id: "RC-022"')),
}, { exit: 2, mustSee: ['UNAPPROVED file RC-999'], branded: true });

scenario('T8 INHERIT tamper: RC-058 no longer baseline-identical', {
  ...T, FIDELITY_COPY_TS: mutateDeck('inherit', (s) =>
    s.replace(/(id: "RC-058",[\s\S]*?status: ")([^"]*)/, '$1$2 (retouched)')),
}, { exit: 2, mustSee: ['RC-058 differs from baseline'], branded: true });

scenario('T9 UNCHANGED tamper: about.why[1] edited', {
  ...T, FIDELITY_COPY_TS: mutateDeck('unchanged', (s) => s.replace(whyKept, whyKept + ' Also new.')),
}, { exit: 2, mustSee: ['differs from baseline'], branded: true });

// Dist attacks work on a throwaway copy.
const distCopy = join(tmp, 'dist');
cpSync(DIST, distCopy, { recursive: true });

{
  const victim = manifestRoutes[manifestRoutes.length - 1];
  const partial = join(tmp, 'dist-partial');
  cpSync(distCopy, partial, { recursive: true });
  rmSync(join(partial, victim));
  scenario(`T10 partial dist: manifest route ${victim} deleted`, { ...T, FIDELITY_DIST: partial }, {
    exit: 2, mustSee: ['PARTIAL/SUBSTITUTED'], branded: true,
  });
}

{
  const stub = join(tmp, 'dist-stub');
  cpSync(distCopy, stub, { recursive: true });
  writeFileSync(join(stub, 'index.html'), '<p>stub</p>');
  scenario('T11 stub page: index.html replaced by a 12-byte fragment', { ...T, FIDELITY_DIST: stub }, {
    exit: 2, mustSee: ['not a real document'], branded: true,
  });
}

{
  const leak = join(tmp, 'dist-leak');
  cpSync(distCopy, leak, { recursive: true });
  const home = join(leak, 'index.html');
  writeFileSync(home, readFileSync(home, 'utf8').replace('</body>', '<p>RC-014</p></body>'));
  scenario('T12 cut case-file RC-014 re-rendered on home', { ...T, FIDELITY_DIST: leak }, {
    exit: 2, mustSee: ['RC-014 still renders'], branded: true,
  });
}

/* ---------- verdict -------------------------------------------------------- */

const bad = results.filter((r) => !r.ok);
console.log(`\n  scenarios: ${results.length} · behaved: ${results.length - bad.length} · misbehaved: ${bad.length}\n`);
rmSync(tmp, { recursive: true, force: true });
process.exit(bad.length ? 1 : 0);
