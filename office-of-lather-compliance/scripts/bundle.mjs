// Joins the src modules into one classic inline script. Refuses anything it cannot join safely,
// so a broken bundle stops the build instead of silently forcing every visitor onto the fallback.
const IMPORT = /^import\s+\{[^}]*\}\s+from\s+'[^']+';$/;
const EXPORT = /^export\s+(const|let|function|class)\s/;
const DECLARATION = /^(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/;

export function bundle(sources) {
  const seen = new Set();
  const bodies = sources.map((code) => code.split(/\r?\n/).filter((line) => {
    if (/^import\b/.test(line)) {
      if (!IMPORT.test(line)) throw new Error(`bundle: only single-line named imports are supported: ${line}`);
      return false;
    }
    return true;
  }).map((line) => {
    if (/^export\b/.test(line) && !EXPORT.test(line)) throw new Error(`bundle: only "export const|let|function|class" is supported: ${line}`);
    const out = line.replace(/^export\s+/, '');
    const name = out.match(DECLARATION)?.[1];
    if (name) {
      if (seen.has(name)) throw new Error(`bundle: top-level name "${name}" is declared in two modules`);
      seen.add(name);
    }
    return out;
  }).join('\n'));
  return `(() => {\n${bodies.join('\n')}\n})();`;
}
