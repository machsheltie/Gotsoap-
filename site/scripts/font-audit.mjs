import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  stat,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import { inspectFontPolicy } from "./font-policy-check.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const defaultSiteRoot = path.resolve(scriptDirectory, "..");
const require = createRequire(import.meta.url);
const fontkitEntry = require.resolve("fontkit");
const fontkitPackagePath = path.resolve(
  path.dirname(fontkitEntry),
  "..",
  "package.json",
);
const GLYPH_ASSIGNMENT_POLICY =
  "A face cannot be assigned copy requiring a missing glyph without an approved repair; unrelated supported uses are not automatically invalid.";
const LOCKED_OPEN_TYPE_TAG_POLICIES = Object.freeze({
  kern: "natural-default",
  liga: "natural-default",
  clig: "natural-default",
  calt: "locked-off",
  dlig: "locked-off",
  tnum: "support-proven-only",
  pnum: "preserve-default",
  onum: "locked-off",
  lnum: "preserve-default",
  case: "locked-off",
});
const LOCKED_OPEN_TYPE_GROUP_POLICIES = Object.freeze({
  stylisticSets: "locked-off",
  swashes: "locked-off",
  alternates: "locked-off",
});
const REQUIRED_SWASH_FEATURE_TAGS = Object.freeze(["swsh", "cswh"]);
const REQUIRED_ALTERNATE_FEATURE_TAGS = Object.freeze([
  "aalt",
  "salt",
  "nalt",
]);
const REQUIRED_OPEN_TYPE_FAMILY_LOCKS = Object.freeze({
  "Marlin Sans SQ": "marlin-canonical-punctuation",
  Moanslight: "moanslight-no-decorative-alternates",
});

const LOCKED_BROWSER_PROOF_REQUIREMENTS = Object.freeze([
  "stable line counts",
  "stable navigation width",
  "stable button dimensions",
  "no major paragraph reflow",
  "no broken crop",
  "no control movement during font swap",
]);
const FALLBACK_METRIC_FIELDS = Object.freeze([
  "unitsPerEm",
  "ascent",
  "descent",
  "lineGap",
  "capHeight",
  "xHeight",
]);

function posixPath(value) {
  return value.split(path.sep).join("/");
}

function sortedObject(value) {
  return Object.fromEntries(
    Object.entries(value ?? {})
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [
        key,
        entry && typeof entry === "object" && !Array.isArray(entry)
          ? sortedObject(entry)
          : entry,
      ]),
  );
}

function featureTags(table) {
  return [
    ...new Set((table?.featureList ?? []).map((entry) => entry.tag)),
  ].sort();
}

function featurePolicyState(present, policy) {
  if (!present) return "not-present";
  if (policy === "locked-off") return "present-kept-off";
  if (policy === "natural-default") return "available-natural-default";
  if (policy === "support-proven-only") {
    return "available-support-proven-only";
  }
  if (policy === "preserve-default") return "available-preserve-default";
  return "available-inventory-only";
}

function inspectOpenTypePolicy({
  declaredFamily,
  gsubFeatureTags,
  gposFeatureTags,
  policy,
}) {
  const allFeatureTags = [...new Set([
    ...gsubFeatureTags,
    ...gposFeatureTags,
  ])].sort();
  const featureRecord = (tag, tagPolicy) => {
    const tables = [];
    if (gsubFeatureTags.includes(tag)) tables.push("GSUB");
    if (gposFeatureTags.includes(tag)) tables.push("GPOS");
    const present = tables.length > 0;

    return {
      present,
      tables,
      policy: tagPolicy,
      policyState: featurePolicyState(present, tagPolicy),
    };
  };
  const groupRecord = (tag, groupPolicy) => {
    const { present: _present, ...record } = featureRecord(tag, groupPolicy);
    return { tag, ...record };
  };
  const stylisticSets = allFeatureTags
    .filter((tag) => /^ss\d{2}$/.test(tag))
    .map((tag) => groupRecord(tag, policy.stylisticSets));
  const swashTags = new Set(policy.swashFeatureTags ?? []);
  const swashes = allFeatureTags
    .filter((tag) => swashTags.has(tag))
    .map((tag) => groupRecord(tag, policy.swashes));
  const alternateTags = new Set(policy.alternateFeatureTags ?? []);
  const alternates = allFeatureTags
    .filter((tag) => alternateTags.has(tag) || /^cv\d{2}$/.test(tag))
    .map((tag) => groupRecord(tag, policy.alternates));
  const features = Object.fromEntries(
    (policy.inventoryTags ?? []).map((tag) => [
      tag,
      featureRecord(tag, policy.tagPolicies?.[tag] ?? "inventory-only"),
    ]),
  );
  const configuredFamilyLock = policy.familyLocks?.[declaredFamily] ?? null;
  const detectedLockedFeatureTags = [...new Set([
    ...Object.entries(features)
      .filter(([, feature]) =>
        feature.present && feature.policy === "locked-off",
      )
      .map(([tag]) => tag),
    ...stylisticSets.map((feature) => feature.tag),
    ...swashes.map((feature) => feature.tag),
    ...alternates.map((feature) => feature.tag),
  ])].sort();

  return {
    inventoryOnly: policy.mode === "inventory-only",
    automaticallyEnabled: [],
    features,
    groups: {
      stylisticSets,
      swashes,
      alternates,
    },
    familyLock: configuredFamilyLock
      ? {
          ...configuredFamilyLock,
          detectedLockedFeatureTags,
          authorizedFeatureTags: [],
        }
      : null,
  };
}

function outlineType(tableTags) {
  if (tableTags.includes("glyf")) return "TrueType";
  if (tableTags.includes("CFF2")) return "CFF2";
  if (tableTags.includes("CFF ")) return "CFF";
  if (
    tableTags.includes("CBDT") ||
    tableTags.includes("EBDT") ||
    tableTags.includes("sbix")
  ) {
    return "bitmap";
  }
  return "unknown";
}

function codePointLabel(character) {
  const codePoint = character.codePointAt(0);
  return {
    character,
    codePoint,
    unicode: `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`,
  };
}

function uniqueCharacters(text) {
  return [...new Set([...text])].filter(
    (character) => !/[\p{Cc}\p{Cf}\p{Cs}\p{Zl}\p{Zp}]/u.test(character),
  );
}

function serializeBox(box) {
  if (!box) {
    return null;
  }

  return {
    minX: box.minX,
    minY: box.minY,
    maxX: box.maxX,
    maxY: box.maxY,
    width: box.width,
    height: box.height,
  };
}

function serializeGlyph(glyph, position = null) {
  return {
    glyphId: glyph.id,
    name: glyph.name ?? null,
    codePoints: glyph.codePoints ?? [],
    advanceWidth: glyph.advanceWidth,
    bbox: serializeBox(glyph.bbox),
    ...(position
      ? {
          position: {
            xAdvance: position.xAdvance,
            yAdvance: position.yAdvance,
            xOffset: position.xOffset,
            yOffset: position.yOffset,
          },
        }
      : {}),
  };
}

function layoutText(font, sample) {
  const run = font.layout(sample.text, sample.features);
  const glyphs = run.glyphs.map((glyph, index) =>
    serializeGlyph(glyph, run.positions[index]),
  );

  return {
    id: sample.id,
    text: sample.text,
    requestedFeatures: sample.features ?? [],
    script: run.script ?? null,
    language: run.language ?? null,
    direction: run.direction ?? null,
    appliedFeatures: Object.keys(run.features ?? {})
      .filter((feature) => run.features[feature])
      .sort(),
    totalAdvance: run.positions.reduce(
      (total, position) => total + position.xAdvance,
      0,
    ),
    glyphs,
  };
}

function inspectKerning(font, pair) {
  const unpositionedAdvance = font
    .glyphsForString(pair)
    .reduce((total, glyph) => total + glyph.advanceWidth, 0);
  const shaped = font.layout(pair);
  const positionedAdvance = shaped.positions.reduce(
    (total, position) => total + position.xAdvance,
    0,
  );

  return {
    pair,
    unpositionedAdvance,
    positionedAdvance,
    adjustment: positionedAdvance - unpositionedAdvance,
    glyphIds: shaped.glyphs.map((glyph) => glyph.id),
  };
}

function inspectNumerals(font, numerals, openTypeFeatures) {
  const defaultRun = font.layout(numerals);
  const defaultAdvances = defaultRun.positions.map(
    (position) => position.xAdvance,
  );
  const numeralCharacters = [...numerals];
  const widths = Object.fromEntries(
    numeralCharacters.map((character, index) => [
      character,
      defaultAdvances[index] ?? null,
    ]),
  );
  const tabularByDefault = new Set(defaultAdvances).size <= 1;
  const tnumAvailable = openTypeFeatures.includes("tnum");
  const tnumRun = tnumAvailable ? font.layout(numerals, ["tnum"]) : null;
  const tnumAdvances =
    tnumRun?.positions.map((position) => position.xAdvance) ?? [];

  return {
    text: numerals,
    widths,
    classification: tabularByDefault
      ? "apparently tabular"
      : "proportional",
    glyphs: defaultRun.glyphs.map((glyph, index) => ({
      character: numeralCharacters[index] ?? null,
      ...serializeGlyph(glyph, defaultRun.positions[index]),
    })),
    tabularByDefault,
    tabularFeatureAvailable: tnumAvailable,
    tabularWithFeature:
      tnumAvailable && new Set(tnumAdvances).size <= 1,
    proportionalFeatureAvailable: openTypeFeatures.includes("pnum"),
  };
}

function compareExpected(fontEntry, metadata) {
  const findings = [];

  for (const [field, expectedValue] of Object.entries(
    fontEntry.expected ?? {},
  )) {
    const actualValue = metadata[field];
    if (actualValue !== expectedValue) {
      findings.push({
        severity: "error",
        code: "metadata-mismatch",
        field,
        expected: expectedValue,
        actual: actualValue ?? null,
        message: `${fontEntry.file}: expected ${field} ${JSON.stringify(expectedValue)}, found ${JSON.stringify(actualValue ?? null)}.`,
      });
    }
  }

  return findings;
}

const FONT_SOURCE_EXTENSIONS = new Set([
  ".astro",
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

async function readJsonIfPresent(filePath, fallback = {}) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

async function listFontSourceFiles(rootDirectory, currentDirectory = rootDirectory) {
  let entries;
  try {
    entries = await readdir(currentDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const files = [];

  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const absolutePath = path.join(currentDirectory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFontSourceFiles(rootDirectory, absolutePath)));
    } else if (entry.isFile() && FONT_SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push({
        path: posixPath(path.relative(path.dirname(rootDirectory), absolutePath)),
        text: await readFile(absolutePath, "utf8"),
      });
    }
  }

  return files;
}

async function listWoff2Files(rootDirectory, currentDirectory = rootDirectory) {
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    const absolutePath = path.join(currentDirectory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listWoff2Files(rootDirectory, absolutePath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".woff2")) {
      files.push(posixPath(path.relative(rootDirectory, absolutePath)));
    }
  }

  return files;
}

function flattenManifestFonts(manifest) {
  const fonts = [];

  for (const family of manifest.families ?? []) {
    for (const file of family.files ?? []) {
      fonts.push({
        declaredFamily: family.declaredFamily,
        system: family.system,
        role: family.role,
        authority: family.authority,
        requiredGlyphSets: family.requiredGlyphSets ?? [],
        ...file,
        requiredGlyphSets:
          file.requiredGlyphSets ?? family.requiredGlyphSets ?? [],
      });
    }
  }

  return fonts.sort((left, right) => left.file.localeCompare(right.file));
}

function validateOpenTypePolicy(policy) {
  if (!policy || policy.mode !== "inventory-only") {
    throw new Error(
      "openTypePolicy.mode must remain inventory-only; the audit may not enable features.",
    );
  }

  if (
    "automaticallyEnabled" in policy &&
    (!Array.isArray(policy.automaticallyEnabled) ||
      policy.automaticallyEnabled.length > 0)
  ) {
    throw new Error(
      "openTypePolicy.automaticallyEnabled must remain empty.",
    );
  }

  const inventoryTags = policy.inventoryTags ?? [];
  for (const [tag, lockedPolicy] of Object.entries(
    LOCKED_OPEN_TYPE_TAG_POLICIES,
  )) {
    if (!inventoryTags.includes(tag)) {
      throw new Error(
        "openTypePolicy.inventoryTags must include " + tag + ".",
      );
    }
    if (policy.tagPolicies?.[tag] !== lockedPolicy) {
      throw new Error(
        "openTypePolicy.tagPolicies." +
          tag +
          " must remain " +
          lockedPolicy +
          ".",
      );
    }
  }

  for (const [group, lockedPolicy] of Object.entries(
    LOCKED_OPEN_TYPE_GROUP_POLICIES,
  )) {
    if (policy[group] !== lockedPolicy) {
      throw new Error(
        "openTypePolicy." + group + " must remain " + lockedPolicy + ".",
      );
    }
  }

  for (const tag of REQUIRED_SWASH_FEATURE_TAGS) {
    if (!(policy.swashFeatureTags ?? []).includes(tag)) {
      throw new Error(
        "openTypePolicy.swashFeatureTags must include " + tag + ".",
      );
    }
  }
  for (const tag of REQUIRED_ALTERNATE_FEATURE_TAGS) {
    if (!(policy.alternateFeatureTags ?? []).includes(tag)) {
      throw new Error(
        "openTypePolicy.alternateFeatureTags must include " + tag + ".",
      );
    }
  }

  for (const [family, id] of Object.entries(
    REQUIRED_OPEN_TYPE_FAMILY_LOCKS,
  )) {
    if (policy.familyLocks?.[family]?.id !== id) {
      throw new Error(
        "openTypePolicy.familyLocks[" + family + "] must retain " + id + ".",
      );
    }
  }
}

function validateMetricFallbackPolicy(policy, manifest) {
  if (
    policy?.mode !== "candidate-generation-only" ||
    policy?.calculationBasis !== "x-height-ratio"
  ) {
    throw new Error(
      "metricFallbackPolicy must use candidate-generation-only mode and x-height-ratio calculations.",
    );
  }

  if (policy.approved !== false || policy.automaticallyApplied !== false) {
    throw new Error(
      "Fallback metric candidates must remain unapproved and unapplied.",
    );
  }

  if (
    JSON.stringify(policy.browserProofRequired) !==
    JSON.stringify(LOCKED_BROWSER_PROOF_REQUIREMENTS)
  ) {
    throw new Error(
      "metricFallbackPolicy.browserProofRequired must retain the locked browser-proof checklist.",
    );
  }

  const profiles = policy.referenceProfiles ?? {};
  for (const [profileId, profile] of Object.entries(profiles)) {
    if (!profile.family || !profile.source || !profile.metrics) {
      throw new Error(
        `Fallback metric profile ${profileId} must define family, source, and metrics.`,
      );
    }

    for (const field of FALLBACK_METRIC_FIELDS) {
      if (!Number.isFinite(profile.metrics[field])) {
        throw new Error(
          `Fallback metric profile ${profileId} has an invalid ${field}.`,
        );
      }
    }

    if (
      profile.metrics.unitsPerEm <= 0 ||
      profile.metrics.ascent <= 0 ||
      profile.metrics.descent > 0 ||
      profile.metrics.lineGap < 0 ||
      profile.metrics.capHeight <= 0 ||
      profile.metrics.xHeight <= 0
    ) {
      throw new Error(
        `Fallback metric profile ${profileId} contains unusable vertical metrics.`,
      );
    }
  }

  const declaredFonts = flattenManifestFonts(manifest);
  const matchedFamilies = new Set();
  for (const match of policy.principalMatches ?? []) {
    if (matchedFamilies.has(match.family)) {
      throw new Error(`Duplicate fallback principal family ${match.family}.`);
    }
    matchedFamilies.add(match.family);

    const principal = declaredFonts.find(
      (font) => font.file === match.principalFile,
    );
    if (!principal || principal.declaredFamily !== match.family) {
      throw new Error(
        `${match.family} principal file ${match.principalFile} must be an approved file for that family.`,
      );
    }

    if (!Array.isArray(match.fallbackCandidates) || match.fallbackCandidates.length === 0) {
      throw new Error(`${match.family} must define fallback candidates.`);
    }

    for (const candidate of match.fallbackCandidates) {
      if (!candidate.family) {
        throw new Error(`${match.family} has an unnamed fallback candidate.`);
      }
      if (candidate.profileId) {
        const profile = profiles[candidate.profileId];
        if (!profile || profile.family !== candidate.family) {
          throw new Error(
            `${candidate.family} must reference a matching fallback metric profile.`,
          );
        }
      }
    }
  }

  if (matchedFamilies.size === 0) {
    throw new Error("metricFallbackPolicy must define principal matches.");
  }
}

function validateManifest(manifest) {
  if (manifest.schemaVersion !== 1) {
    throw new Error(
      `Unsupported font manifest schemaVersion ${JSON.stringify(manifest.schemaVersion)}; expected 1.`,
    );
  }

  if (!manifest.fontRoot || !manifest.outputs?.json || !manifest.outputs?.markdown) {
    throw new Error(
      "The font manifest must define fontRoot, outputs.json, and outputs.markdown.",
    );
  }

  validateOpenTypePolicy(manifest.openTypePolicy);
  validateMetricFallbackPolicy(manifest.metricFallbackPolicy, manifest);

  const transferBudget = manifest.transferBudget;
  if (
    !transferBudget ||
    transferBudget.unit !== "bytes" ||
    !Number.isFinite(transferBudget.thresholds?.targetBytes) ||
    !Number.isFinite(transferBudget.thresholds?.failureBytes) ||
    !Number.isInteger(transferBudget.preloadCeilings?.ordinary) ||
    !Number.isInteger(transferBudget.preloadCeilings?.rareDocumentedException) ||
    !Array.isArray(transferBudget.criticalFiles)
  ) {
    throw new Error("The font manifest must define a byte-based transferBudget policy.");
  }
  if (transferBudget.thresholds.targetBytes >= transferBudget.thresholds.failureBytes) {
    throw new Error("transferBudget targetBytes must be lower than failureBytes.");
  }
  if (transferBudget.preloadCeilings.ordinary >= transferBudget.preloadCeilings.rareDocumentedException) {
    throw new Error("The rare preload ceiling must be greater than the ordinary ceiling.");
  }

  const declaredFiles = flattenManifestFonts(manifest).map(
    (font) => font.file,
  );
  const duplicates = declaredFiles.filter(
    (file, index) => declaredFiles.indexOf(file) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(
      `Duplicate font manifest entries: ${[...new Set(duplicates)].join(", ")}.`,
    );
  }

  for (const family of manifest.families ?? []) {
    for (const setName of family.requiredGlyphSets ?? []) {
      if (!(setName in (manifest.glyphSets ?? {}))) {
        throw new Error(
          `${family.declaredFamily} references unknown glyph set ${setName}.`,
        );
      }
    }
    for (const font of family.files ?? []) {
      for (const setName of font.copyLaneGlyphSets ?? []) {
        if (!(setName in (manifest.glyphSets ?? {}))) {
          throw new Error(
            `${font.file} copy lane references unknown glyph set ${setName}.`,
          );
        }
      }
    }
  }
}

async function auditOneFont({
  absolutePath,
  fontEntry,
  glyphSets,
  glyphCategories,
  inspection,
  openTypePolicy,
}) {
  const contents = await readFile(absolutePath);
  const fileStats = await stat(absolutePath);
  const font = fontkit.openSync(absolutePath);
  const tableTags = Object.keys(font.directory?.tables ?? {}).sort();
  const variationAxes = sortedObject(font.variationAxes);
  const gsubFeatureTags = featureTags(font.GSUB);
  const gposFeatureTags = featureTags(font.GPOS);
  const openTypeAudit = inspectOpenTypePolicy({
    declaredFamily: fontEntry.declaredFamily,
    gsubFeatureTags,
    gposFeatureTags,
    policy: openTypePolicy,
  });
  const os2 = font["OS/2"] ?? {};
  const head = font.head ?? {};
  const post = font.post ?? {};
  const metadata = {
    familyName: font.familyName ?? null,
    subfamilyName: font.subfamilyName ?? null,
    fullName: font.fullName ?? null,
    postscriptName: font.postscriptName ?? null,
    version: font.version ?? null,
    copyright: font.copyright ?? null,
    trademark: font.trademark ?? null,
    designer: font.designer ?? null,
    manufacturer: font.manufacturer ?? null,
    weightClass: os2.usWeightClass ?? null,
    widthClass: os2.usWidthClass ?? null,
    italic: Boolean(
      os2.fsSelection?.italic ||
        os2.fsSelection?.oblique ||
        head.macStyle?.italic,
    ),
  };
  const openTypeFeatures = [...(font.availableFeatures ?? [])].sort();
  const categoryCharacters = Object.values(glyphCategories)
    .map((category) => category.characters ?? "")
    .join("");
  const requiredCharacters = uniqueCharacters(
    fontEntry.requiredGlyphSets
      .map((setName) => glyphSets[setName])
      .join("") + categoryCharacters,
  );
  const missingGlyphs = requiredCharacters
    .filter((character) => !font.hasGlyphForCodePoint(character.codePointAt(0)))
    .map(codePointLabel);
  const copyLaneCharacters = uniqueCharacters(
    (fontEntry.copyLaneGlyphSets ?? [])
      .map((setName) => glyphSets[setName])
      .join("") + (fontEntry.copyLaneCharacters ?? ""),
  );
  const copyLaneMissingGlyphs = copyLaneCharacters
    .filter((character) => !font.hasGlyphForCodePoint(character.codePointAt(0)))
    .map(codePointLabel);
  const categoryCoverage = Object.fromEntries(
    Object.entries(glyphCategories).map(([id, category]) => {
      const characters = uniqueCharacters(category.characters ?? "");
      const missing = characters
        .filter(
          (character) =>
            !font.hasGlyphForCodePoint(character.codePointAt(0)),
        )
        .map(codePointLabel);

      return [
        id,
        {
          label: category.label ?? id,
          characters,
          requiredCount: characters.length,
          presentCount: characters.length - missing.length,
          missingCount: missing.length,
          missingGlyphs: missing,
          status: missing.length > 0 ? "restricted" : "supported",
        },
      ];
    }),
  );
  const restrictedCategories = Object.entries(categoryCoverage)
    .filter(([, category]) => category.missingCount > 0)
    .map(([id]) => id);
  const categorizedCodePoints = new Set(
    Object.values(categoryCoverage).flatMap((category) =>
      category.characters.map((character) => character.codePointAt(0)),
    ),
  );
  const uncategorizedMissingGlyphs = missingGlyphs.filter(
    (glyph) => !categorizedCodePoints.has(glyph.codePoint),
  );
  if (uncategorizedMissingGlyphs.length > 0) {
    restrictedCategories.push("otherSpecimenCharacters");
  }
  const findings = compareExpected(fontEntry, metadata);
  const structureKind = Object.keys(variationAxes).length > 0 ? "variable" : "static";
  const declaredItalic = fontEntry.declaredStyle === "italic";

  if (
    Number.isFinite(fontEntry.declaredWeight) &&
    metadata.weightClass !== fontEntry.declaredWeight
  ) {
    findings.push({
      severity: "warning",
      code: "metadata-weight-mismatch",
      expected: fontEntry.declaredWeight,
      actual: metadata.weightClass,
      message: `${fontEntry.file}: metadata weight ${metadata.weightClass} differs from CSS mapping ${fontEntry.declaredWeight}.`,
    });
  }

  if (
    ["normal", "italic"].includes(fontEntry.declaredStyle) &&
    metadata.italic !== declaredItalic
  ) {
    findings.push({
      severity: "error",
      code: "metadata-style-mismatch",
      expected: fontEntry.declaredStyle,
      actual: metadata.italic ? "italic" : "normal",
      message: `${fontEntry.file}: metadata style ${metadata.italic ? "italic" : "normal"} contradicts assigned ${fontEntry.declaredStyle} style.`,
    });
  }

  if (
    fontEntry.declaredStructure &&
    fontEntry.declaredStructure !== structureKind &&
    !fontEntry.structureException?.approved
  ) {
    findings.push({
      severity: "error",
      code: "declared-structure-mismatch",
      expected: fontEntry.declaredStructure,
      actual: structureKind,
      message: `${fontEntry.file}: ${structureKind} binary is declared as ${fontEntry.declaredStructure} without a documented approved exception.`,
    });
  }

  if (structureKind === "static" && Array.isArray(fontEntry.declaredWeightRange)) {
    findings.push({
      severity: "error",
      code: "static-weight-range",
      declaredWeightRange: fontEntry.declaredWeightRange,
      message: `${fontEntry.file}: static binary cannot be declared as weight range ${fontEntry.declaredWeightRange.join("–")}.`,
    });
  }

  if (font.type !== "WOFF2") {
    findings.push({
      severity: "error",
      code: "invalid-woff2",
      actual: font.type,
      message: `${fontEntry.file}: approved production file is ${font.type}, not valid WOFF2.`,
    });
  }

  if (copyLaneMissingGlyphs.length > 0) {
    findings.push({
      severity: "error",
      code: "copy-lane-glyph-missing",
      missingGlyphs: copyLaneMissingGlyphs,
      message: `${fontEntry.file}: approved copy lane requires missing glyphs ${copyLaneMissingGlyphs.map((glyph) => glyph.unicode).join(", ")}.`,
    });
  }

  if (!openTypeFeatures.includes("tnum")) {
    findings.push({
      severity: "warning",
      code: "tabular-numerals-unavailable",
      message: `${fontEntry.file}: tabular numeral support is not proven.`,
    });
  }

  if (!("opsz" in variationAxes)) {
    findings.push({
      severity: "warning",
      code: "optical-sizing-unavailable",
      message: `${fontEntry.file}: optical sizing is unavailable.`,
    });
  }

  const missingMetricFields = ["capHeight", "xHeight"].filter(
    (field) => !Number.isFinite(font[field]),
  );
  if (missingMetricFields.length > 0) {
    findings.push({
      severity: "warning",
      code: "font-metrics-absent",
      fields: missingMetricFields,
      message: `${fontEntry.file}: ${missingMetricFields.join(" and ")} data is absent.`,
    });
  }

  const detectedAlternateTags = [
    ...openTypeAudit.groups.stylisticSets,
    ...openTypeAudit.groups.swashes,
    ...openTypeAudit.groups.alternates,
  ].map((feature) => feature.tag);
  const expectedAlternateTags = new Set(fontEntry.expectedAlternateTags ?? []);
  const unexpectedAlternateTags = detectedAlternateTags.filter(
    (tag) => !expectedAlternateTags.has(tag),
  );
  if (unexpectedAlternateTags.length > 0) {
    findings.push({
      severity: "warning",
      code: "unexpected-alternate-systems",
      featureTags: unexpectedAlternateTags,
      message: `${fontEntry.file}: unexpected alternate systems ${unexpectedAlternateTags.join(", ")} are present and remain locked off.`,
    });
  }

  if (os2.fsType?.viewOnly) {
    findings.push({
      severity: "warning",
      code: "preview-print-embedding",
      message: `${fontEntry.file}: OS/2 embedding flags permit preview/print use only; web distribution authority requires manual confirmation.`,
    });
  }

  const fontNames = [
    metadata.familyName,
    metadata.subfamilyName,
    metadata.fullName,
    metadata.postscriptName,
  ].filter(Boolean);
  if (fontNames.some((name) => /\bdemo\b/i.test(name))) {
    findings.push({
      severity: "warning",
      code: "demo-font-name",
      message: `${fontEntry.file}: internal metadata identifies this as a demo font; production authority requires manual confirmation.`,
    });
  }

  if (missingGlyphs.length > 0) {
    findings.push({
      severity: "restriction",
      code: "copy-assignment-restriction",
      missingGlyphs,
      restrictedCategories,
      uncategorizedMissingGlyphs,
      message: `${fontEntry.file} cannot be assigned copy requiring the missing glyphs without an approved repair; unrelated supported uses are not automatically invalid.`,
    });
  }

  return {
    file: fontEntry.file,
    declared: {
      family: fontEntry.declaredFamily,
      weight: fontEntry.declaredWeight ?? null,
      style: fontEntry.declaredStyle ?? null,
      system: fontEntry.system,
      role: fontEntry.role,
      authority: fontEntry.authority,
      requiredGlyphSets: fontEntry.requiredGlyphSets,
      copyLaneGlyphSets: fontEntry.copyLaneGlyphSets ?? [],
      copyLaneCharacters: fontEntry.copyLaneCharacters ?? "",
      structure: fontEntry.declaredStructure ?? null,
      weightRange: fontEntry.declaredWeightRange ?? null,
      note: fontEntry.note ?? null,
    },
    binary: {
      format: font.type,
      valid: font.type === "WOFF2",
      bytes: fileStats.size,
      sha256: createHash("sha256").update(contents).digest("hex"),
      embeddingFlags: {
        noEmbedding: os2.fsType?.noEmbedding ?? null,
        viewOnly: os2.fsType?.viewOnly ?? null,
        editable: os2.fsType?.editable ?? null,
        noSubsetting: os2.fsType?.noSubsetting ?? null,
        bitmapOnly: os2.fsType?.bitmapOnly ?? null,
      },
    },
    structure: {
      kind: structureKind,
      outlineType: outlineType(tableTags),
      tableCount: tableTags.length,
      tables: tableTags,
    },
    metadata,
    metrics: {
      unitsPerEm: font.unitsPerEm,
      ascent: font.ascent,
      descent: font.descent,
      lineGap: font.lineGap,
      capHeight: font.capHeight,
      xHeight: font.xHeight,
      italicAngle: font.italicAngle ?? post.italicAngle ?? null,
      underlinePosition: font.underlinePosition ?? post.underlinePosition ?? null,
      underlineThickness:
        font.underlineThickness ?? post.underlineThickness ?? null,
      numGlyphs: font.numGlyphs,
      bbox: serializeBox(font.bbox),
    },
    openTypeFeatures,
    openType: {
      gsubFeatureTags,
      gposFeatureTags,
      ...openTypeAudit,
    },
    variationAxes,
    namedVariations: sortedObject(font.namedVariations),
    glyphCoverage: {
      requiredCount: requiredCharacters.length,
      presentCount: requiredCharacters.length - missingGlyphs.length,
      missingCount: missingGlyphs.length,
      missingGlyphs,
      categories: categoryCoverage,
      copyLane: {
        characters: copyLaneCharacters,
        requiredCount: copyLaneCharacters.length,
        presentCount: copyLaneCharacters.length - copyLaneMissingGlyphs.length,
        missingCount: copyLaneMissingGlyphs.length,
        missingGlyphs: copyLaneMissingGlyphs,
        status: copyLaneMissingGlyphs.length > 0 ? "fail" : "pass",
      },
      assignment: {
        status: missingGlyphs.length > 0 ? "restricted" : "supported",
        requiresApprovedRepair: missingGlyphs.length > 0,
        restrictedCategories,
        uncategorizedMissingGlyphs,
        policy: GLYPH_ASSIGNMENT_POLICY,
      },
    },
    inspectedGlyphs: uniqueCharacters(inspection.glyphs.join("")).map(
      (character) => {
        const codePoint = character.codePointAt(0);
        const present = font.hasGlyphForCodePoint(codePoint);
        return {
          ...codePointLabel(character),
          present,
          ...serializeGlyph(font.glyphForCodePoint(codePoint)),
        };
      },
    ),
    layoutSamples: inspection.layoutSamples.map((sample) =>
      layoutText(font, sample),
    ),
    kerning: inspection.kerningPairs.map((pair) =>
      inspectKerning(font, pair),
    ),
    numerals: inspectNumerals(
      font,
      inspection.numerals,
      openTypeFeatures,
    ),
    delivery: {
      preload: fontEntry.delivery?.preload ?? null,
      fontDisplay: fontEntry.delivery?.fontDisplay ?? null,
      scope: fontEntry.delivery?.scope ?? null,
    },
    authority: {
      status: "approved",
      source: fontEntry.authority,
    },
    findings,
  };
}

function findDuplicateApprovedBinaries(fonts) {
  const fontsByHash = new Map();

  for (const font of fonts) {
    const matches = fontsByHash.get(font.binary.sha256) ?? [];
    matches.push(font);
    fontsByHash.set(font.binary.sha256, matches);
  }

  return [...fontsByHash.entries()]
    .filter(([, matches]) => matches.length > 1)
    .map(([sha256, matches]) => ({
      sha256,
      files: matches.map((font) => font.file).sort(),
      declaredWeights: [
        ...new Set(matches.map((font) => font.declared.weight)),
      ].sort((left, right) => left - right),
      roles: matches
        .map((font) => font.declared.role)
        .filter(Boolean)
        .sort(),
    }))
    .sort((left, right) => left.sha256.localeCompare(right.sha256));
}

export function calculateTransferBudget({
  fonts,
  directoryFileBytes = {},
  fontReferences = [],
  externallyAssignedFiles = [],
  policy,
}) {
  const approvedBytes = new Map(
    fonts.map((font) => [font.file, font.binary.bytes]),
  );
  const externallyAssigned = new Set(externallyAssignedFiles);
  const sumFiles = (files) =>
    files.reduce(
      (total, file) => total + (directoryFileBytes[file] ?? approvedBytes.get(file) ?? 0),
      0,
    );
  const criticalFiles = [...policy.criticalFiles];
  const criticalTotalBytes = sumFiles(criticalFiles);
  const criticalStatus =
    criticalTotalBytes > policy.thresholds.failureBytes
      ? "fail"
      : criticalTotalBytes > policy.thresholds.targetBytes
        ? "warning"
        : "pass";
  const preloadFiles = [
    ...new Set(
      fontReferences
        .filter((reference) => reference.preload && reference.file)
        .map((reference) => reference.file),
    ),
  ].sort();
  const rareException = policy.rarePreloadException?.documented
    ? policy.rarePreloadException
    : null;
  const preloadStatus =
    preloadFiles.length <= policy.preloadCeilings.ordinary
      ? "pass"
      : preloadFiles.length === policy.preloadCeilings.rareDocumentedException && rareException
        ? "documented-exception"
        : "fail";
  const unassignedReferenceRows = fontReferences
    .filter(
      (reference) =>
        reference.file &&
        !approvedBytes.has(reference.file) &&
        !externallyAssigned.has(reference.file),
    )
    .map((reference) => ({
      sourcePath: reference.sourcePath,
      file: reference.file,
    }))
    .filter(
      (reference, index, rows) =>
        rows.findIndex(
          (candidate) =>
            candidate.sourcePath === reference.sourcePath &&
            candidate.file === reference.file,
        ) === index,
    )
    .sort(
      (left, right) =>
        left.file.localeCompare(right.file) ||
        left.sourcePath.localeCompare(right.sourcePath),
    );
  const unassignedFiles = [
    ...new Set(unassignedReferenceRows.map((reference) => reference.file)),
  ].sort();

  return {
    unit: policy.unit,
    thresholds: policy.thresholds,
    preloadCeilings: policy.preloadCeilings,
    approved: {
      fileCount: fonts.length,
      totalBytes: fonts.reduce(
        (total, font) => total + font.binary.bytes,
        0,
      ),
    },
    critical: {
      files: criticalFiles,
      fileCount: criticalFiles.length,
      totalBytes: criticalTotalBytes,
      status: criticalStatus,
    },
    actualPreloads: {
      files: preloadFiles,
      fileCount: preloadFiles.length,
      totalBytes: sumFiles(preloadFiles),
      status: preloadStatus,
      rareException,
    },
    likelyRouteProfiles: (policy.routeProfiles ?? []).map((profile) => ({
      id: profile.id,
      label: profile.label,
      files: [...profile.files],
      fileCount: profile.files.length,
      totalBytes: sumFiles(profile.files),
    })),
    unassignedReferences: {
      files: unassignedFiles,
      totalBytes: sumFiles(unassignedFiles),
      references: unassignedReferenceRows,
    },
  };
}

function selectFallbackMetrics(metrics) {
  return Object.fromEntries(
    FALLBACK_METRIC_FIELDS.map((field) => [field, metrics[field]]),
  );
}

function formatMetricPercentage(ratio) {
  return `${(ratio * 100).toFixed(2)}%`;
}

function calculateFallbackDescriptors(principalMetrics, fallbackMetrics) {
  const principalXHeightRatio =
    principalMetrics.xHeight / principalMetrics.unitsPerEm;
  const fallbackXHeightRatio =
    fallbackMetrics.xHeight / fallbackMetrics.unitsPerEm;
  const sizeAdjustFactor = principalXHeightRatio / fallbackXHeightRatio;

  return {
    basis: "x-height-ratio",
    sizeAdjustFactor: Number(sizeAdjustFactor.toFixed(6)),
    descriptors: {
      "size-adjust": formatMetricPercentage(sizeAdjustFactor),
      "ascent-override": formatMetricPercentage(
        principalMetrics.ascent /
          principalMetrics.unitsPerEm /
          sizeAdjustFactor,
      ),
      "descent-override": formatMetricPercentage(
        Math.abs(principalMetrics.descent) /
          principalMetrics.unitsPerEm /
          sizeAdjustFactor,
      ),
      "line-gap-override": formatMetricPercentage(
        principalMetrics.lineGap /
          principalMetrics.unitsPerEm /
          sizeAdjustFactor,
      ),
    },
  };
}

function buildFallbackMetricAudit(policy, fonts) {
  const fontsByFile = new Map(fonts.map((font) => [font.file, font]));
  const candidateAuthority = {
    status: "candidate-only",
    approved: false,
    automaticallyApplied: false,
    requiresBrowserProof: true,
  };

  return {
    mode: policy.mode,
    calculationBasis: policy.calculationBasis,
    formula: {
      sizeAdjust:
        "(principal x-height / principal units-per-em) / (fallback x-height / fallback units-per-em)",
      ascentOverride:
        "(principal ascent / principal units-per-em) / size-adjust",
      descentOverride:
        "(absolute principal descent / principal units-per-em) / size-adjust",
      lineGapOverride:
        "(principal line-gap / principal units-per-em) / size-adjust",
    },
    approved: false,
    automaticallyApplied: false,
    canonical: false,
    browserProofRequired: [...policy.browserProofRequired],
    families: policy.principalMatches.map((match) => {
      const principalFont = fontsByFile.get(match.principalFile);
      const principalMetrics = selectFallbackMetrics(principalFont.metrics);

      return {
        family: match.family,
        principalFile: match.principalFile,
        principalMetrics,
        candidates: match.fallbackCandidates.map((candidate, index) => {
          const profile = candidate.profileId
            ? policy.referenceProfiles[candidate.profileId]
            : null;

          if (!profile) {
            return {
              family: candidate.family,
              order: index + 1,
              metricProfileStatus: "unresolved",
              profileId: null,
              source: null,
              referenceMetrics: null,
              calculation: null,
              ...(candidate.browserProof ? { browserProof: candidate.browserProof } : {}),
              authority: { ...candidateAuthority },
            };
          }

          const referenceMetrics = selectFallbackMetrics(profile.metrics);
          return {
            family: candidate.family,
            order: index + 1,
            metricProfileStatus: "available",
            profileId: candidate.profileId,
            source: profile.source,
            referenceMetrics,
            calculation: calculateFallbackDescriptors(
              principalMetrics,
              referenceMetrics,
            ),
            ...(candidate.browserProof ? { browserProof: candidate.browserProof } : {}),
            authority: { ...candidateAuthority },
          };
        }),
      };
    }),
  };
}

export async function auditFontManifest({
  siteRoot = defaultSiteRoot,
  manifestPath = path.join(siteRoot, "config", "font-manifest.json"),
  provenance = {
    auditTimestamp: null,
    sourceCommitSha: null,
    workingTreeDirty: null,
  },
} = {}) {
  const resolvedSiteRoot = path.resolve(siteRoot);
  const resolvedManifestPath = path.resolve(manifestPath);
  const manifestContents = await readFile(resolvedManifestPath, "utf8");
  const manifest = JSON.parse(manifestContents);
  validateManifest(manifest);

  const externalAuthorityRecords = await Promise.all(
    (manifest.externalAuthorities ?? []).map(async (authority) => {
      const externalManifestPath = path.resolve(resolvedSiteRoot, authority.manifest);
      const externalManifest = JSON.parse(await readFile(externalManifestPath, "utf8"));
      const files = flattenManifestFonts(externalManifest).map((font) => font.file);
      return {
        system: authority.system ?? externalManifest.system,
        manifest: posixPath(path.relative(resolvedSiteRoot, externalManifestPath)),
        sourcePaths: externalManifest.sourcePaths ?? [],
        files,
      };
    }),
  );
  const externalAssignedFiles = externalAuthorityRecords.flatMap((authority) => authority.files);

  const fontRoot = path.resolve(resolvedSiteRoot, manifest.fontRoot);
  const actualFiles = await listWoff2Files(fontRoot);
  const manifestFonts = flattenManifestFonts(manifest);
  const declaredFiles = manifestFonts.map((font) => font.file);
  const unknownCriticalFiles = manifest.transferBudget.criticalFiles.filter(
    (file) => !declaredFiles.includes(file),
  );
  if (unknownCriticalFiles.length > 0) {
    throw new Error(
      `transferBudget criticalFiles are not approved: ${unknownCriticalFiles.join(", ")}.`,
    );
  }
  for (const profile of manifest.transferBudget.routeProfiles ?? []) {
    const unknownProfileFiles = profile.files.filter((file) => !declaredFiles.includes(file));
    if (unknownProfileFiles.length > 0) {
      throw new Error(
        `transferBudget route ${profile.id} contains unapproved files: ${unknownProfileFiles.join(", ")}.`,
      );
    }
  }

  const externallyAssignedSet = new Set(externalAssignedFiles);
  const unassignedFonts = actualFiles
    .filter(
      (actualFile) =>
        !declaredFiles.includes(actualFile) && !externallyAssignedSet.has(actualFile),
    )
    .map((file) => ({
      file,
      status: "unassigned",
      authority: "unassigned",
      authorizedForCss: false,
      authorizedForNetworkDelivery: false,
    }));

  for (const declaredFile of declaredFiles) {
    if (!actualFiles.includes(declaredFile)) {
      throw new Error(
        `${declaredFile} is declared in the font manifest but missing from ${manifest.fontRoot}.`,
      );
    }
  }

  const fontkitPackage = JSON.parse(
    await readFile(fontkitPackagePath, "utf8"),
  );
  const fonts = [];

  for (const fontEntry of manifestFonts) {
    fonts.push(
      await auditOneFont({
        absolutePath: path.join(fontRoot, ...fontEntry.file.split("/")),
        fontEntry,
        glyphSets: manifest.glyphSets ?? {},
        glyphCategories: manifest.glyphCategories ?? {},
        inspection: manifest.inspection ?? {
          glyphs: [],
          layoutSamples: [],
          kerningPairs: [],
          numerals: "0123456789",
        },
        openTypePolicy: manifest.openTypePolicy ?? {
          mode: "inventory-only",
          inventoryTags: [],
          tagPolicies: {},
          stylisticSets: "locked-off",
          swashes: "locked-off",
          alternates: "locked-off",
          swashFeatureTags: [],
          alternateFeatureTags: [],
          familyLocks: {},
        },
      }),
    );
  }

  const directoryFileBytes = Object.fromEntries(
    await Promise.all(
      actualFiles.map(async (file) => [
        file,
        (await stat(path.join(fontRoot, ...file.split("/")))).size,
      ]),
    ),
  );
  const sourceFiles = await listFontSourceFiles(
    path.join(resolvedSiteRoot, "src"),
  );
  const campaignSourcePaths = manifest.sourcePaths ?? [];
  const fontAuthorities = Object.fromEntries([
    ...declaredFiles.map((file) => [
      file,
      { system: manifest.system ?? "gotsoap", sourcePaths: campaignSourcePaths },
    ]),
    ...externalAuthorityRecords.flatMap((authority) =>
      authority.files.map((file) => [
        file,
        { system: authority.system, sourcePaths: authority.sourcePaths },
      ]),
    ),
  ]);
  const fontPolicyInspection = inspectFontPolicy({
    packageJson: await readJsonIfPresent(path.join(resolvedSiteRoot, "package.json")),
    packageLock: await readJsonIfPresent(path.join(resolvedSiteRoot, "package-lock.json")),
    sourceFiles,
    publicFontFiles: actualFiles,
    approvedFontFiles: [...declaredFiles, ...externalAssignedFiles],
    variableFontFiles: manifestFonts
      .filter((font) => font.declaredStructure === "variable")
      .map((font) => font.file),
    fontAuthorities,
    requireSynthesisLock: true,
    requiredPreloadFiles: manifest.transferBudget.criticalFiles,
    prohibitedRuntimeFamilies: manifest.prohibitedRuntimeFamilies ?? [],
    prohibitedRuntimeTokens: manifest.prohibitedRuntimeTokens ?? [],
    fontRolePolicy: manifest.fontRolePolicy ?? {},
  });
  const transferBudget = calculateTransferBudget({
    fonts,
    directoryFileBytes,
    fontReferences: fontPolicyInspection.references,
    externallyAssignedFiles: externalAssignedFiles,
    policy: manifest.transferBudget,
  });
  const sourcePolicyFindings = fontPolicyInspection.violations.map((message) => ({
    file: "source-font-policy",
    severity: "error",
    code: "source-font-policy",
    message,
  }));
  const transferFindings = [];
  if (transferBudget.critical.status === "warning") {
    transferFindings.push({
      file: "transfer-budget",
      severity: "warning",
      code: "critical-preload-budget",
      message: `Critical preloads total ${transferBudget.critical.totalBytes} bytes, above the ${transferBudget.thresholds.targetBytes}-byte review target.`,
    });
  } else if (transferBudget.critical.status === "fail") {
    transferFindings.push({
      file: "transfer-budget",
      severity: "error",
      code: "critical-preload-budget",
      message: `Critical preloads total ${transferBudget.critical.totalBytes} bytes, above the ${transferBudget.thresholds.failureBytes}-byte production ceiling.`,
    });
  }
  if (transferBudget.actualPreloads.status === "fail") {
    transferFindings.push({
      file: "transfer-budget",
      severity: "error",
      code: "preload-count-ceiling",
      message: `Source declares ${transferBudget.actualPreloads.fileCount} font preloads; the ordinary ceiling is ${transferBudget.preloadCeilings.ordinary} and the documented rare ceiling is ${transferBudget.preloadCeilings.rareDocumentedException}.`,
    });
  }
  const actualCriticalFiles = [...transferBudget.actualPreloads.files].sort();
  const lockedCriticalFiles = [...transferBudget.critical.files].sort();
  if (JSON.stringify(actualCriticalFiles) !== JSON.stringify(lockedCriticalFiles)) {
    transferFindings.push({
      file: "transfer-budget",
      severity: "error",
      code: "critical-preload-set-mismatch",
      expected: lockedCriticalFiles,
      actual: actualCriticalFiles,
      message: `Source preload set ${actualCriticalFiles.join(", ") || "(empty)"} does not match the locked critical set ${lockedCriticalFiles.join(", ")}.`,
    });
  }

  const fallbackMetricAudit = buildFallbackMetricAudit(
    manifest.metricFallbackPolicy,
    fonts,
  );
  const fallbackFindings = fallbackMetricAudit.families.flatMap((family) =>
    family.candidates
      .filter((candidate) => candidate.browserProof?.paragraphLineDelta > 1)
      .map((candidate) => ({
        file: family.principalFile,
        severity: "warning",
        code: "fallback-paragraph-reflow",
        fallbackFamily: candidate.family,
        paragraphLineDelta: candidate.browserProof.paragraphLineDelta,
        message: `${family.family} fallback ${candidate.family} changes paragraph line count by ${candidate.browserProof.paragraphLineDelta}; review is required.`,
      })),
  );
  const commercialPatterns = (manifest.transferBudget.commercialFilePatterns ?? []).map(
    (pattern) => new RegExp(pattern, "i"),
  );
  const unusedCommercialFindings = unassignedFonts
    .filter((font) => commercialPatterns.some((pattern) => pattern.test(font.file)))
    .map((font) => ({
      file: font.file,
      severity: "warning",
      code: "unused-commercial-font-public",
      message: `${font.file}: unassigned commercial font remains publicly distributed.`,
    }));

  const duplicateApprovedBinaries = findDuplicateApprovedBinaries(fonts);
  const duplicateFindings = duplicateApprovedBinaries.map((duplicate) => ({
    file: duplicate.files.join(", "),
    severity: "error",
    code: "duplicate-approved-binary",
    sha256: duplicate.sha256,
    files: duplicate.files,
    declaredWeights: duplicate.declaredWeights,
    message:
      duplicate.files.join(", ") +
      " have the same SHA-256 but are assigned as distinct approved files" +
      (duplicate.declaredWeights.length > 1
        ? " across declared weights " + duplicate.declaredWeights.join(", ")
        : "") +
      ".",
  }));
  const findings = [
    ...fonts.flatMap((font) =>
      font.findings.map((finding) => ({
        file: font.file,
        ...finding,
      })),
    ),
    ...duplicateFindings,
    ...sourcePolicyFindings,
    ...transferFindings,
    ...fallbackFindings,
    ...unusedCommercialFindings,
  ].sort(
      (left, right) =>
        left.file.localeCompare(right.file) ||
        left.code.localeCompare(right.code),
    );
  const errorCount = findings.filter(
    (finding) => finding.severity === "error",
  ).length;
  const warningCount = findings.filter(
    (finding) => finding.severity === "warning",
  ).length;
  const restrictionCount = findings.filter(
    (finding) => finding.severity === "restriction",
  ).length;
  const restrictedFontCount = fonts.filter(
    (font) => font.glyphCoverage.assignment.status === "restricted",
  ).length;
  const sharedSpecimenSet = manifest.glyphAudit?.sharedSpecimenSet ?? null;

  return {
    schemaVersion: 1,
    manifestSha256: createHash("sha256")
      .update(manifestContents)
      .digest("hex"),
    fontkitVersion: fontkitPackage.version,
    provenance,
    source: {
      manifest: posixPath(
        path.relative(resolvedSiteRoot, resolvedManifestPath),
      ),
      fontRoot: manifest.fontRoot,
    },
    summary: {
      totalFonts: fonts.length,
      approvedProductionFonts: fonts.length,
      unassignedFonts: unassignedFonts.length,
      externalSystemFonts: externalAssignedFiles.length,
      directoryFonts: actualFiles.length,
      totalBytes: fonts.reduce(
        (total, font) => total + font.binary.bytes,
        0,
      ),
      errorCount,
      warningCount,
      restrictionCount,
      restrictedFontCount,
      duplicateApprovedBinaries: duplicateApprovedBinaries.length,
      unresolvedManualChecks: (manifest.manualChecks ?? []).filter(
        (check) => check.status === "unresolved",
      ).length,
      status:
        errorCount > 0
          ? "fail"
          : warningCount > 0 || restrictedFontCount > 0
            ? "warning"
            : "pass",
      capabilityStatus:
        restrictedFontCount > 0 ? "restricted" : "supported",
    },
    openTypePolicy: {
      ...(manifest.openTypePolicy ?? {}),
      automaticallyEnabled: [],
    },
    glyphAudit: {
      sharedSpecimenSet,
      sharedSpecimen: sharedSpecimenSet
        ? (manifest.glyphSets?.[sharedSpecimenSet] ?? null)
        : null,
      categories: manifest.glyphCategories ?? {},
      assignmentPolicy: GLYPH_ASSIGNMENT_POLICY,
    },
    fallbackMetricAudit,
    transferBudget,
    manualChecks: manifest.manualChecks ?? [],
    findings,
    fonts,
    duplicateApprovedBinaries,
    externalFontAuthorities: externalAuthorityRecords,
    unassignedPolicy: {
      defective: false,
      meaning: "Present in the font directory without an approved production role.",
      authorizedForCss: false,
      authorizedForNetworkDelivery: false,
    },
    unassignedFonts,
  };
}

function escapeCell(value) {
  return String(value ?? "—")
    .replaceAll("|", "\\|")
    .replaceAll("\n", "<br>");
}

function table(headers, rows) {
  return [
    `| ${headers.map(escapeCell).join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map(
      (row) => `| ${row.map(escapeCell).join(" | ")} |`,
    ),
  ].join("\n");
}

export function renderMarkdownReport(report) {
  const glyphCategoryEntries = Object.entries(report.glyphAudit.categories);
  const formatMissingGlyphs = (glyphs) =>
    glyphs.length > 0
      ? glyphs
          .map((glyph) => `${glyph.character} (${glyph.unicode})`)
          .join(", ")
      : "supported";
  const glyphAuditRows = report.fonts.map((font) => [
    `\`${font.file}\``,
    font.glyphCoverage.assignment.status,
    ...glyphCategoryEntries.map(([id]) =>
      formatMissingGlyphs(
        font.glyphCoverage.categories[id]?.missingGlyphs ?? [],
      ),
    ),
    formatMissingGlyphs(
      font.glyphCoverage.assignment.uncategorizedMissingGlyphs,
    ),
  ]);
  const openTypeFeatureTags = report.openTypePolicy.inventoryTags ?? [];
  const fallbackMetricRows = report.fallbackMetricAudit.families.flatMap(
    (family) =>
      family.candidates.map((candidate) => [
        family.family,
        `\`${family.principalFile}\``,
        candidate.order,
        candidate.family,
        candidate.metricProfileStatus,
        candidate.calculation?.descriptors["size-adjust"] ?? "unresolved",
        candidate.calculation?.descriptors["ascent-override"] ?? "unresolved",
        candidate.calculation?.descriptors["descent-override"] ?? "unresolved",
        candidate.calculation?.descriptors["line-gap-override"] ?? "unresolved",
        candidate.authority.status,
      ]),
  );
  const formatOpenTypeFeature = (feature) =>
    feature.present
      ? "yes · " + feature.tables.join("+") + " · " + feature.policy
      : "no · " + feature.policy;
  const formatOpenTypeGroup = (features) =>
    features.length > 0
      ? features
          .map((feature) =>
            feature.tag +
            " (" +
            feature.tables.join("+") +
            " · " +
            feature.policy +
            ")",
          )
          .join(", ")
      : "none";
  const formatFamilyLock = (familyLock) =>
    familyLock
      ? familyLock.id +
        (familyLock.detectedLockedFeatureTags.length > 0
          ? "; detected and kept off: " +
            familyLock.detectedLockedFeatureTags.join(", ")
          : "; no locked feature tags detected")
      : "none";
  const codeValue = (value) =>
    String.fromCharCode(96) + value + String.fromCharCode(96);
  const familySections = [
    ...new Set(report.fonts.map((font) => font.declared.family)),
  ].flatMap((family) => {
    const familyFonts = report.fonts.filter(
      (font) => font.declared.family === family,
    );
    return [
      "### " + family,
      "",
      table(
        [
          "File",
          "SHA-256",
          "Bytes",
          "Internal identity",
          "Declared role",
          "Weight / style",
          "Metrics",
          "Glyph gaps",
          "OpenType features",
          "Variation",
          "Delivery",
        ],
        familyFonts.map((font) => [
          codeValue(font.file),
          codeValue(font.binary.sha256),
          font.binary.bytes,
          [
            font.metadata.familyName,
            font.metadata.subfamilyName,
            font.metadata.fullName,
            font.metadata.postscriptName,
          ].filter(Boolean).join(" / "),
          font.declared.role,
          font.metadata.weightClass + " / " + (font.metadata.italic ? "italic" : "normal"),
          [
            "units-per-em " + font.metrics.unitsPerEm,
            "ascent " + font.metrics.ascent,
            "descent " + font.metrics.descent,
            "line gap " + font.metrics.lineGap,
            "cap " + (font.metrics.capHeight ?? "absent"),
            "x-height " + (font.metrics.xHeight ?? "absent"),
            "bbox " + (font.metrics.bbox
              ? [font.metrics.bbox.minX, font.metrics.bbox.minY, font.metrics.bbox.maxX, font.metrics.bbox.maxY].join(",")
              : "absent"),
          ].join("; "),
          "specimen: " + formatMissingGlyphs(font.glyphCoverage.missingGlyphs) +
            "; copy lane: " + formatMissingGlyphs(font.glyphCoverage.copyLane?.missingGlyphs ?? []),
          font.openTypeFeatures.join(", ") || "none",
          Object.keys(font.variationAxes).length > 0
            ? Object.keys(font.variationAxes).join(", ")
            : "static; no axes",
          "preload " + font.delivery.preload + "; font-display " + font.delivery.fontDisplay + "; " + font.delivery.scope,
        ]),
      ),
      "",
    ];
  });
  const transfer = report.transferBudget;
  const lines = [
    "# Got Soap? Font Binary Audit",
    "",
    "> Generated by `npm run audit:fonts` from `site/config/font-manifest.json`.",
    "> This records binary facts and declared repository policy; it does not grant",
    "> font licenses or resolve owner approvals.",
    "",
    "Audit timestamp: " + (report.provenance?.auditTimestamp ?? "not captured"),
    "Source commit SHA: " + (report.provenance?.sourceCommitSha ?? "not captured"),
    "Working tree at audit: " + (
      report.provenance?.workingTreeDirty === null || report.provenance?.workingTreeDirty === undefined
        ? "not captured"
        : report.provenance.workingTreeDirty ? "dirty" : "clean"
    ),
    "",
    "## Result",
    "",
    table(
      [
        "Status",
        "Approved",
        "Unassigned",
        "Directory total",
        "Inspected bytes",
        "Errors",
        "Restricted faces",
        "Restrictions",
        "Duplicate binaries",
        "Manual checks unresolved",
      ],
      [
        [
          report.summary.status.toUpperCase(),
          report.summary.approvedProductionFonts,
          report.summary.unassignedFonts,
          report.summary.directoryFonts,
          report.summary.totalBytes,
          report.summary.errorCount,
          report.summary.restrictedFontCount,
          report.summary.restrictionCount,
          report.summary.duplicateApprovedBinaries,
          report.summary.unresolvedManualChecks,
        ],
      ],
    ),
    "",
    `Fontkit ${report.fontkitVersion} inspected the ${report.summary.approvedProductionFonts} approved production binaries.`,
    `The directory scan found ${report.summary.unassignedFonts} unassigned WOFF2 binaries under \`${report.source.fontRoot}\`.`,
    `The manifest fingerprint is \`${report.manifestSha256}\`.`,
    "",
    "## Transfer budget",
    "",
    table(
      ["Measure", "Files", "Bytes", "Status / ceiling"],
      [
        ["All approved assets", transfer.approved.fileCount, transfer.approved.totalBytes, "inventory"],
        [
          "Critical preload total",
          transfer.critical.fileCount,
          transfer.critical.totalBytes,
          transfer.critical.status + "; target ≤ " + transfer.thresholds.targetBytes + "; fail > " + transfer.thresholds.failureBytes,
        ],
        [
          "Actual source preloads",
          transfer.actualPreloads.fileCount,
          transfer.actualPreloads.totalBytes,
          transfer.actualPreloads.status + "; ordinary ceiling " + transfer.preloadCeilings.ordinary + "; rare documented ceiling " + transfer.preloadCeilings.rareDocumentedException,
        ],
        [
          "Unassigned files referenced by source",
          transfer.unassignedReferences.files.length,
          transfer.unassignedReferences.totalBytes,
          transfer.unassignedReferences.files.length > 0 ? "fail" : "pass",
        ],
      ],
    ),
    "",
    "Locked critical files: " + transfer.critical.files.map(codeValue).join(", ") + ".",
    "",
    "### Likely per-route font transfer",
    "",
    table(
      ["Route profile", "Files", "Compressed bytes"],
      transfer.likelyRouteProfiles.map((profile) => [
        profile.label,
        profile.files.map(codeValue).join(", "),
        profile.totalBytes,
      ]),
    ),
    "",
    "### Unassigned source references",
    "",
    transfer.unassignedReferences.references.length > 0
      ? table(
          ["Source", "Unassigned file"],
          transfer.unassignedReferences.references.map((reference) => [
            codeValue(reference.sourcePath),
            codeValue(reference.file),
          ]),
        )
      : "No CSS or source file references an unassigned font.",
    "",
    "## Metric-adjusted fallback candidates",
    "",
    "These generated percentages are candidate values only. They are not automatically canonical,",
    "approved, written to CSS, or applied to the browser bundle. An unresolved profile remains",
    "visible instead of receiving a substituted metric source.",
    "",
    "The calculation matches normalized x-height with `size-adjust`, then divides the principal",
    "ascent, absolute descent, and line gap by the adjusted em-square. Percentages are rounded",
    "to two decimal places for candidate CSS descriptors.",
    "",
    table(
      [
        "Campaign family",
        "Principal file",
        "Order",
        "Structural fallback",
        "Metric profile",
        "size-adjust",
        "ascent-override",
        "descent-override",
        "line-gap-override",
        "Authority",
      ],
      fallbackMetricRows,
    ),
    "",
    "Owner approval requires browser proof of every condition below:",
    "",
    ...report.fallbackMetricAudit.browserProofRequired.map(
      (requirement) => `- ${requirement}`,
    ),
    "",
    "## Manual authority checks",
    "",
    report.manualChecks.length > 0
      ? table(
          ["ID", "Status", "Note"],
          report.manualChecks.map((check) => [
            check.id,
            check.status,
            check.note,
          ]),
        )
      : "None declared.",
    "",
    "## Automated findings",
    "",
    report.findings.length > 0
      ? table(
          ["Severity", "File", "Code", "Finding"],
          report.findings.map((finding) => [
            finding.severity,
            finding.file,
            finding.code,
            finding.message,
          ]),
        )
      : "No automated errors, warnings, or restrictions.",
    "",
    "## OpenType inventory and locked policy",
    "",
    "This audit automatically enables no OpenType features. Feature presence is binary evidence,",
    "not CSS authorization; shaping and numeral checks are audit probes only.",
    "",
    "Common ligatures and kerning may remain at their natural defaults. Discretionary ligatures,",
    "contextual alternates, oldstyle figures, case alternates, stylistic sets, swashes, and alternate",
    "glyph systems stay off. Proportional and lining behavior preserves the face default. Tabular",
    "numerals require proven support before use. Marlin SQ punctuation remains canonical, and",
    "Moanslight receives no decorative alternates.",
    "",
    table(
      [
        "File",
        ...openTypeFeatureTags,
        "Stylistic sets",
        "Swashes",
        "Alternates",
        "Family lock",
      ],
      report.fonts.map((font) => [
        `\`${font.file}\``,
        ...openTypeFeatureTags.map((tag) =>
          formatOpenTypeFeature(font.openType.features[tag]),
        ),
        formatOpenTypeGroup(font.openType.groups.stylisticSets),
        formatOpenTypeGroup(font.openType.groups.swashes),
        formatOpenTypeGroup(font.openType.groups.alternates),
        formatFamilyLock(font.openType.familyLock),
      ]),
    ),
    "",
    "## Glyph capability audit",
    "",
    "Every approved face is tested against this shared campaign specimen:",
    "",
    "```text",
    report.glyphAudit.sharedSpecimen ?? "No shared specimen configured.",
    "```",
    "",
    `Policy: ${report.glyphAudit.assignmentPolicy}`,
    "",
    table(
      [
        "File",
        "Copy assignment",
        ...glyphCategoryEntries.map(([, category]) => category.label),
        "Other specimen gaps",
      ],
      glyphAuditRows,
    ),
    "",
    "## Duplicate-file protection",
    "",
    report.duplicateApprovedBinaries.length > 0
      ? table(
          ["SHA-256", "Approved files", "Declared weights"],
          report.duplicateApprovedBinaries.map((duplicate) => [
            `\`${duplicate.sha256}\``,
            duplicate.files.map((file) => `\`${file}\``).join(", "),
            duplicate.declaredWeights.join(", "),
          ]),
        )
      : "No approved files have identical SHA-256 hashes.",
    "",
    "## Family binary tables",
    "",
    "Each approved production family is rendered directly from the JSON audit record.",
    "",
    ...familySections,
    "## Approved production binary audit",
    "",
    table(
      [
        "Declared family",
        "File",
        "Production role",
        "Authority",
        "Internal family / subfamily",
        "Weight",
        "Style",
        "Bytes",
        "Glyph gaps",
        "Features",
        "Axes",
      ],
      report.fonts.map((font) => [
        font.declared.family,
        `\`${font.file}\``,
        font.declared.role,
        font.authority.status,
        `${font.metadata.familyName} / ${font.metadata.subfamilyName}`,
        font.metadata.weightClass,
        font.metadata.italic ? "italic" : "normal",
        font.binary.bytes,
        font.glyphCoverage.missingCount,
        font.openTypeFeatures.join(", ") || "none",
        Object.keys(font.variationAxes).join(", ") || "none",
      ]),
    ),
    "",
    "## Structure and delivery evidence",
    "",
    table(
      [
        "File",
        "WOFF2 validity",
        "Structure",
        "Outline",
        "Table inventory",
        "GSUB / GPOS",
        "Numerals",
        "Preload",
        "font-display",
        "Route/global",
      ],
      report.fonts.map((font) => [
        `\`${font.file}\``,
        font.binary.valid ? "valid" : "invalid",
        font.structure.kind,
        font.structure.outlineType,
        font.structure.tables.join(", "),
        `${font.openType.gsubFeatureTags.join(", ") || "none"} / ${font.openType.gposFeatureTags.join(", ") || "none"}`,
        font.numerals.classification,
        font.delivery.preload,
        font.delivery.fontDisplay,
        font.delivery.scope,
      ]),
    ),
    "",
    "## Unassigned directory inventory",
    "",
    "Unassigned does not mean defective. It means the file is present but is",
    "not authorized for CSS declaration or network delivery.",
    "",
    report.unassignedFonts.length > 0
      ? table(
          ["File", "Status", "CSS declaration", "Network delivery"],
          report.unassignedFonts.map((font) => [
            `\`${font.file}\``,
            font.status,
            font.authorizedForCss ? "authorized" : "not authorized",
            font.authorizedForNetworkDelivery
              ? "authorized"
              : "not authorized",
          ]),
        )
      : "No unassigned font binaries.",
    "",
    "## Inspection scope",
    "",
    "For each approved production binary, the JSON report records WOFF2 validity, its SHA-256 digest,",
    "internal names, declared role and authority, static/variable status, outline and table inventory,",
    "OS/2 weight and embedding flags, vertical and glyph metrics, separate GSUB and GPOS feature",
    "tags, inventory-only feature-policy comparisons, variation axes and named instances, categorized",
    "specimen coverage, selected glyph mappings,",
    "shaped layout samples, kerning deltas, numeral widths and classification, and declared delivery policy.",
    "Identical hashes across distinct approved files are an automated error.",
    "",
    "The JSON report is the machine-readable audit record:",
    "`site/reports/font-audit.json`.",
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function gitText(siteRoot, args) {
  try {
    return execFileSync("git", ["-C", siteRoot, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

export async function writeAuditArtifacts(options = {}) {
  const siteRoot = path.resolve(options.siteRoot ?? defaultSiteRoot);
  const manifestPath = path.resolve(
    options.manifestPath ??
      path.join(siteRoot, "config", "font-manifest.json"),
  );
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const sourceCommitSha =
    options.sourceCommitSha ?? gitText(siteRoot, ["rev-parse", "HEAD"]);
  const workingTreeStatus =
    options.workingTreeDirty === undefined
      ? gitText(siteRoot, ["status", "--porcelain", "--untracked-files=all"])
      : null;
  const provenance = {
    auditTimestamp: options.auditTimestamp ?? new Date().toISOString(),
    sourceCommitSha,
    workingTreeDirty:
      options.workingTreeDirty ??
      (workingTreeStatus === null ? null : workingTreeStatus.length > 0),
  };
  const report = await auditFontManifest({
    siteRoot,
    manifestPath,
    provenance,
  });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderMarkdownReport(report);
  const jsonPath = path.resolve(siteRoot, manifest.outputs.json);
  const markdownPath = path.resolve(siteRoot, manifest.outputs.markdown);

  await mkdir(path.dirname(jsonPath), { recursive: true });
  await mkdir(path.dirname(markdownPath), { recursive: true });
  await writeFile(jsonPath, json);
  await writeFile(markdownPath, markdown);

  return {
    report,
    json,
    markdown,
    jsonPath,
    markdownPath,
  };
}

const invokedAsScript =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedAsScript) {
  try {
    const result = await writeAuditArtifacts();
    const relativeJson = posixPath(
      path.relative(defaultSiteRoot, result.jsonPath),
    );
    const relativeMarkdown = posixPath(
      path.relative(defaultSiteRoot, result.markdownPath),
    );

    console.log(
      `Font audit ${result.report.summary.status}: ${result.report.summary.approvedProductionFonts} approved production fonts, ${result.report.summary.errorCount} errors, ${result.report.summary.restrictedFontCount} restricted; ${result.report.summary.unassignedFonts} unassigned.`,
    );
    console.log(`Wrote ${relativeJson} and ${relativeMarkdown}.`);

    if (result.report.summary.errorCount > 0) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`Font audit failed: ${error.message}`);
    process.exitCode = 1;
  }
}
