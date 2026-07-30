const FONTSOURCE_PREFIX = '@fontsource/';
const OWNER_APPROVAL =
  'Reintroduction requires explicit owner approval recorded in the font-delivery authority.';
const LOCAL_FONT_ROOT = '/fonts/';
const FONT_FILE_PATTERN = /(['"`])([^'"`\r\n]+?\.(?:woff2?|ttf|otf)(?:[?#][^'"`\r\n]*)?)\1/gi;
const REMOTE_FONT_PROVIDER_PATTERN =
  /(?:fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|use\.typekit\.com)/gi;

function collectFontsourceNames(value, names = new Set()) {
  if (!value || typeof value !== 'object') return names;

  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith(FONTSOURCE_PREFIX)) names.add(key);
    if (key === 'name' && typeof child === 'string' && child.startsWith(FONTSOURCE_PREFIX)) {
      names.add(child);
    }

    const packagePathMatch = key.match(/(?:^|\/)node_modules\/(@fontsource\/[^/]+)$/);
    if (packagePathMatch) names.add(packagePathMatch[1]);

    collectFontsourceNames(child, names);
  }

  return names;
}

function normalizePublicFontPath(path) {
  return path.replace(/\\/g, '/').replace(/^\/+/, '');
}

export function inspectFontPolicy({
  packageJson,
  packageLock,
  sourceFiles = [],
  publicFontFiles = [],
  approvedFontFiles,
  variableFontFiles = [],
  fontAuthorities = {},
  requireSynthesisLock = false,
  requiredPreloadFiles,
  prohibitedRuntimeFamilies = [],
  prohibitedRuntimeTokens = [],
  fontRolePolicy = {},
}) {
  const violations = [];
  const references = [];
  const manifestNames = collectFontsourceNames(packageJson);
  const lockNames = collectFontsourceNames(packageLock);
  const availableFonts = new Set(publicFontFiles.map(normalizePublicFontPath));
  const approvedFonts = approvedFontFiles
    ? new Set(approvedFontFiles.map(normalizePublicFontPath))
    : null;
  const variableFonts = new Set(variableFontFiles.map(normalizePublicFontPath));
  const authorities = new Map(
    Object.entries(fontAuthorities).map(([file, authority]) => [
      normalizePublicFontPath(file),
      {
        ...authority,
        sourcePaths: new Set(
          (authority.sourcePaths ?? []).map((sourcePath) => sourcePath.replace(/\\/g, '/')),
        ),
      },
    ]),
  );
  let hasSynthesisLock = false;

  for (const name of manifestNames) {
    violations.push(`package.json declares prohibited dependency ${name}. ${OWNER_APPROVAL}`);
  }

  for (const name of lockNames) {
    violations.push(`package-lock.json contains prohibited dependency ${name}. ${OWNER_APPROVAL}`);
  }

  for (const { path, text } of sourceFiles) {
    for (const token of prohibitedRuntimeTokens) {
      if (text.includes(token)) {
        violations.push(`${path} references ${token}, a prohibited runtime token.`);
      }
    }

    for (const familyMatch of text.matchAll(/\bfont-family\s*:\s*([^;}\r\n]+)/gi)) {
      const firstFamily = familyMatch[1]
        .split(',', 1)[0]
        .trim()
        .replace(/^['"]|['"]$/g, '');
      const prohibitedFamily = prohibitedRuntimeFamilies.find(
        (family) => family.toLowerCase() === firstFamily.toLowerCase(),
      );
      if (prohibitedFamily) {
        violations.push(
          `${path} declares ${prohibitedFamily}, a prohibited runtime family.`,
        );
      }
    }

    for (const blockMatch of text.matchAll(/\{([^{}]*)\}/g)) {
      const block = blockMatch[1];
      const roleMatch = block.match(/\bfont-family\s*:\s*var\(\s*(--font-[a-z0-9-]+)\s*\)/i);
      if (!roleMatch) continue;
      const role = roleMatch[1];
      const policy = fontRolePolicy[role];
      if (!policy) continue;
      const weightMatch = block.match(/\bfont-weight\s*:\s*(\d+)/i);
      if (weightMatch && !(policy.weights ?? []).includes(Number(weightMatch[1]))) {
        violations.push(
          `${path} ${role} role uses weight ${weightMatch[1]}, which is unsupported.`,
        );
      }
      const styleMatch = block.match(/\bfont-style\s*:\s*([a-z-]+)/i);
      if (styleMatch && !(policy.styles ?? ['normal']).includes(styleMatch[1].toLowerCase())) {
        violations.push(
          `${path} ${role} role uses style ${styleMatch[1]}, which is unsupported.`,
        );
      }
    }

    if (text.includes(FONTSOURCE_PREFIX)) {
      const names = [...text.matchAll(/@fontsource\/[a-z0-9-]+/gi)].map(([name]) => name);
      const detail = names.length ? [...new Set(names)].join(', ') : '@fontsource/*';
      violations.push(
        `${path} references prohibited Fontsource source ${detail}. ${OWNER_APPROVAL}`,
      );
    }

    const providers = [...text.matchAll(REMOTE_FONT_PROVIDER_PATTERN)].map(([provider]) => provider);
    for (const provider of new Set(providers)) {
      violations.push(
        `${path} references remote font provider ${provider}; all font delivery must resolve from site/public/fonts.`,
      );
    }

    if (/\blocal\s*\(/i.test(text)) {
      violations.push(
        `${path} uses local(); all font delivery must resolve from site/public/fonts.`,
      );
    }

    for (const match of text.matchAll(/\bfont-synthesis(?:-(?:weight|style))?\s*:\s*([^;}\r\n]+)/gi)) {
      const declaration = match[0].trim();
      const value = match[1].trim();
      if (/^none$/i.test(value)) hasSynthesisLock = true;
      if (!/^none$/i.test(value)) {
        violations.push(
          `${path} enables prohibited synthetic font behavior with ${declaration}.`,
        );
      }
    }

    for (const faceMatch of text.matchAll(/@font-face\s*\{([\s\S]*?)\}/gi)) {
      const block = faceMatch[1];
      const weightRange = block.match(/\bfont-weight\s*:\s*(\d+)\s+(\d+)/i);
      const source = block.match(/(['"])([^'"\r\n]+?\.(?:woff2?|ttf|otf)(?:[?#][^'"\r\n]*)?)\1/i);
      if (weightRange && source) {
        const assetPath = source[2].split(/[?#]/, 1)[0].replace(/\\/g, "/");
        const file = assetPath.startsWith(LOCAL_FONT_ROOT)
          ? normalizePublicFontPath(assetPath.slice(LOCAL_FONT_ROOT.length))
          : null;
        if (file && !variableFonts.has(file)) {
          violations.push(
            `${path} declares static ${source[2]} as font-weight range ${weightRange[1]} ${weightRange[2]}.`,
          );
        }
      }
    }

    for (const match of text.matchAll(FONT_FILE_PATTERN)) {
      const reference = match[2];
      const assetPath = reference.split(/[?#]/, 1)[0].replace(/\\/g, '/');

      if (!assetPath.startsWith(LOCAL_FONT_ROOT)) {
        violations.push(
          `${path} references font asset ${reference} outside /fonts/; all font delivery must resolve from site/public/fonts.`,
        );
        continue;
      }

      const publicRelativePath = normalizePublicFontPath(assetPath.slice(LOCAL_FONT_ROOT.length));
      const matchContext = text.slice(
        Math.max(0, match.index - 240),
        Math.min(text.length, match.index + match[0].length + 120),
      );
      references.push({
        sourcePath: path,
        reference,
        file: publicRelativePath || null,
        kind: path.toLowerCase().endsWith('.css') ? 'css' : 'source',
        preload:
          !path.toLowerCase().endsWith('.css') &&
          /\bpreload(?:Fonts?)?\b/i.test(matchContext),
      });
      if (
        !publicRelativePath ||
        publicRelativePath.split('/').includes('..') ||
        !availableFonts.has(publicRelativePath)
      ) {
        violations.push(
          `${path} references ${reference}, but ${publicRelativePath || '(empty path)'} was not found in site/public/fonts.`,
        );
      } else if (approvedFonts && !approvedFonts.has(publicRelativePath)) {
        violations.push(
          `${path} references ${reference}, which is unassigned and not authorized for CSS declaration or network delivery.`,
        );
      } else {
        const authority = authorities.get(publicRelativePath);
        const normalizedSourcePath = path.replace(/\\/g, '/');
        if (
          authority &&
          authority.sourcePaths.size > 0 &&
          !authority.sourcePaths.has(normalizedSourcePath)
        ) {
          violations.push(
            `${path} references ${reference}, but the ${authority.system} font authority does not allow that source scope.`,
          );
        }
      }
    }
  }

  if (requireSynthesisLock && !hasSynthesisLock) {
    violations.push('A repository-wide font-synthesis: none declaration is required.');
  }

  if (requiredPreloadFiles) {
    const actualPreloads = [
      ...new Set(references.filter((reference) => reference.preload).map((reference) => reference.file)),
    ].filter(Boolean).sort();
    const lockedPreloads = [...new Set(requiredPreloadFiles.map(normalizePublicFontPath))].sort();
    if (actualPreloads.join('\0') !== lockedPreloads.join('\0')) {
      violations.push(
        `Source preload set ${actualPreloads.join(", ") || "(empty)"} does not match the locked preload set ${lockedPreloads.join(", ") || "(empty)"}.`,
      );
    }
  }

  return {
    violations: [...new Set(violations)],
    references,
  };
}

export function collectFontPolicyViolations(inputs) {
  return inspectFontPolicy(inputs).violations;
}
