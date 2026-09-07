import assert from "node:assert/strict";
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

let fontAudit;

try {
  fontAudit = await import("./font-audit.mjs");
} catch (error) {
  test("the font audit module exists", () => {
    assert.fail(`Unable to load font-audit.mjs: ${error.message}`);
  });
}

if (fontAudit) {
  const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
  const sourceFont = path.resolve(
    scriptDirectory,
    "../public/fonts/oswald-600.woff2",
  );
  const previewOnlyFont = path.resolve(
    scriptDirectory,
    "../public/fonts/marlin-sans-sq-regular.woff2",
  );
  const moanslightFont = path.resolve(
    scriptDirectory,
    "../public/fonts/Moanslight-Medium.woff2",
  );

  async function createFixture({ includeUnassignedFont = false } = {}) {
    const siteRoot = await mkdtemp(path.join(os.tmpdir(), "gotsoap-font-audit-"));
    const fontRoot = path.join(siteRoot, "public", "fonts");
    const configRoot = path.join(siteRoot, "config");
    const stylesRoot = path.join(siteRoot, "src", "styles");
    const layoutsRoot = path.join(siteRoot, "src", "layouts");

    await mkdir(fontRoot, { recursive: true });
    await mkdir(configRoot, { recursive: true });
    await mkdir(stylesRoot, { recursive: true });
    await mkdir(layoutsRoot, { recursive: true });
    await copyFile(sourceFont, path.join(fontRoot, "oswald-600.woff2"));
    await writeFile(
      path.join(siteRoot, "package.json"),
      `${JSON.stringify({ dependencies: {}, devDependencies: {} }, null, 2)}\n`,
    );
    await writeFile(
      path.join(siteRoot, "package-lock.json"),
      `${JSON.stringify({ lockfileVersion: 3, packages: {} }, null, 2)}\n`,
    );
    await writeFile(
      path.join(stylesRoot, "tokens.css"),
      "@font-face { font-family: 'Oswald'; src: url('/fonts/oswald-600.woff2') format('woff2'); }\n:root { font-synthesis: none; }\n",
    );
    await writeFile(
      path.join(layoutsRoot, "Base.astro"),
      'const preloadFonts = ["/fonts/oswald-600.woff2"];\n',
    );

    if (includeUnassignedFont) {
      await writeFile(
        path.join(fontRoot, "unassigned.woff2"),
        "This is intentionally not a valid font.",
      );
    }

    const manifest = {
      schemaVersion: 1,
      fontRoot: "public/fonts",
      outputs: {
        json: "reports/font-audit.json",
        markdown: "gotsoap/docs/font-binary-audit.md",
      },
      glyphSets: {
        coreLatin: "got soap?\nAV 0123456789 $38.00",
      },
      glyphAudit: {
        sharedSpecimenSet: "coreLatin",
      },
      openTypePolicy: {
        mode: "inventory-only",
        inventoryTags: [
          "kern",
          "liga",
          "clig",
          "calt",
          "dlig",
          "tnum",
          "pnum",
          "onum",
          "lnum",
          "case",
        ],
        tagPolicies: {
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
        },
        stylisticSets: "locked-off",
        swashes: "locked-off",
        alternates: "locked-off",
        swashFeatureTags: ["swsh", "cswh"],
        alternateFeatureTags: ["aalt", "salt", "nalt"],
        familyLocks: {
          "Marlin Sans SQ": {
            id: "marlin-canonical-punctuation",
            rule: "Marlin SQ punctuation remains canonical.",
          },
          Moanslight: {
            id: "moanslight-no-decorative-alternates",
            rule: "Moanslight does not gain decorative alternates.",
          },
        },
      },
      glyphCategories: {
        wordmarkQuestionMark: {
          label: "wordmark question mark",
          characters: "?",
        },
      },
      metricFallbackPolicy: {
        mode: "candidate-generation-only",
        calculationBasis: "x-height-ratio",
        approved: false,
        automaticallyApplied: false,
        browserProofRequired: [
          "stable line counts",
          "stable navigation width",
          "stable button dimensions",
          "no major paragraph reflow",
          "no broken crop",
          "no control movement during font swap",
        ],
        referenceProfiles: {
          "synthetic-narrow": {
            family: "Synthetic Narrow",
            source: {
              type: "test-fixture",
              version: "1",
            },
            metrics: {
              unitsPerEm: 1000,
              ascent: 900,
              descent: -200,
              lineGap: 100,
              capHeight: 700,
              xHeight: 500,
            },
          },
        },
        principalMatches: [
          {
            family: "Oswald",
            principalFile: "oswald-600.woff2",
            fallbackCandidates: [
              {
                family: "Synthetic Narrow",
                profileId: "synthetic-narrow",
              },
              {
                family: "Unresolved Narrow",
              },
            ],
          },
        ],
      },
      transferBudget: {
        unit: "bytes",
        thresholds: {
          targetBytes: 200000,
          failureBytes: 250000,
        },
        preloadCeilings: {
          ordinary: 3,
          rareDocumentedException: 4,
        },
        criticalFiles: ["oswald-600.woff2"],
        routeProfiles: [
          {
            id: "ordinary",
            label: "Ordinary route",
            files: ["oswald-600.woff2"],
          },
        ],
        rarePreloadException: null,
      },
      inspection: {
        glyphs: ["A", "x", "0", "?", "$"],
        layoutSamples: [
          {
            id: "kerning",
            text: "AV",
          },
          {
            id: "numerals",
            text: "0123456789",
          },
        ],
        kerningPairs: ["AV"],
        numerals: "0123456789",
      },
      families: [
        {
          declaredFamily: "Oswald",
          system: "gotsoap",
          role: "command",
          authority: "current",
          requiredGlyphSets: ["coreLatin"],
          files: [
            {
              file: "oswald-600.woff2",
              role: "hero command",
              declaredWeight: 600,
              declaredStyle: "normal",
              delivery: {
                preload: "global",
                fontDisplay: "swap",
                scope: "global",
              },
              expected: {
                familyName: "Oswald SemiBold",
                weightClass: 600,
                italic: false,
              },
            },
          ],
        },
      ],
      manualChecks: [
        {
          id: "license",
          status: "unresolved",
          note: "Binary inspection cannot establish distribution permission.",
        },
      ],
    };
    const manifestPath = path.join(configRoot, "font-manifest.json");
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    return { manifestPath, siteRoot };
  }

  test("calculates approved, critical, route, preload, and unassigned transfer bytes", () => {
    const budget = fontAudit.calculateTransferBudget({
      fonts: [
        { file: "a.woff2", binary: { bytes: 100000 } },
        { file: "b.woff2", binary: { bytes: 50000 } },
        { file: "c.woff2", binary: { bytes: 50001 } },
        { file: "d.woff2", binary: { bytes: 10000 } },
      ],
      directoryFileBytes: {
        "a.woff2": 100000,
        "b.woff2": 50000,
        "c.woff2": 50001,
        "d.woff2": 10000,
        "unassigned.woff2": 2000,
      },
      fontReferences: [
        { sourcePath: "src/layouts/Base.astro", file: "a.woff2", preload: true },
        { sourcePath: "src/layouts/Base.astro", file: "b.woff2", preload: true },
        { sourcePath: "src/layouts/Base.astro", file: "c.woff2", preload: true },
        { sourcePath: "src/styles/tokens.css", file: "unassigned.woff2", preload: false },
      ],
      policy: {
        unit: "bytes",
        thresholds: {
          targetBytes: 200000,
          failureBytes: 250000,
        },
        preloadCeilings: {
          ordinary: 3,
          rareDocumentedException: 4,
        },
        criticalFiles: ["a.woff2", "b.woff2", "c.woff2"],
        routeProfiles: [
          {
            id: "ordinary",
            label: "Ordinary route",
            files: ["a.woff2", "d.woff2"],
          },
        ],
        rarePreloadException: null,
      },
    });

    assert.deepEqual(budget.approved, {
      fileCount: 4,
      totalBytes: 210001,
    });
    assert.deepEqual(budget.critical, {
      files: ["a.woff2", "b.woff2", "c.woff2"],
      fileCount: 3,
      totalBytes: 200001,
      status: "warning",
    });
    assert.deepEqual(budget.actualPreloads, {
      files: ["a.woff2", "b.woff2", "c.woff2"],
      fileCount: 3,
      totalBytes: 200001,
      status: "pass",
      rareException: null,
    });
    assert.deepEqual(budget.likelyRouteProfiles, [
      {
        id: "ordinary",
        label: "Ordinary route",
        files: ["a.woff2", "d.woff2"],
        fileCount: 2,
        totalBytes: 110000,
      },
    ]);
    assert.deepEqual(budget.unassignedReferences, {
      files: ["unassigned.woff2"],
      totalBytes: 2000,
      references: [
        {
          sourcePath: "src/styles/tokens.css",
          file: "unassigned.woff2",
        },
      ],
    });
  });

  test("enforces every critical-byte and preload-count boundary", () => {
    const policy = {
      unit: "bytes",
      thresholds: {
        targetBytes: 200000,
        failureBytes: 250000,
      },
      preloadCeilings: {
        ordinary: 3,
        rareDocumentedException: 4,
      },
      criticalFiles: ["critical.woff2"],
      routeProfiles: [],
      rarePreloadException: null,
    };
    const makeBudget = ({ bytes, preloadCount, documented = false }) =>
      fontAudit.calculateTransferBudget({
        fonts: [{ file: "critical.woff2", binary: { bytes } }],
        directoryFileBytes: { "critical.woff2": bytes },
        fontReferences: Array.from({ length: preloadCount }, (_, index) => ({
          sourcePath: "src/preload-" + index + ".astro",
          file: "preload-" + index + ".woff2",
          preload: true,
        })),
        policy: {
          ...policy,
          rarePreloadException: documented
            ? {
                documented: true,
                note: "Owner-reviewed rare route.",
              }
            : null,
        },
      });

    assert.equal(makeBudget({ bytes: 200000, preloadCount: 3 }).critical.status, "pass");
    assert.equal(makeBudget({ bytes: 250000, preloadCount: 3 }).critical.status, "warning");
    assert.equal(makeBudget({ bytes: 250001, preloadCount: 3 }).critical.status, "fail");
    assert.equal(makeBudget({ bytes: 200000, preloadCount: 4 }).actualPreloads.status, "fail");
    assert.equal(
      makeBudget({ bytes: 200000, preloadCount: 4, documented: true }).actualPreloads.status,
      "documented-exception",
    );
    assert.equal(
      makeBudget({ bytes: 200000, preloadCount: 5, documented: true }).actualPreloads.status,
      "fail",
    );
  });

  test("audits WOFF2 metadata, metrics, glyphs, shaping, kerning, features, axes, and numerals", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const report = await fontAudit.auditFontManifest(fixture);
    const [font] = report.fonts;

    assert.equal(report.summary.totalFonts, 1);
    assert.equal(report.summary.errorCount, 0);
    assert.equal(report.summary.restrictedFontCount, 0);
    assert.equal(report.summary.status, "warning");
    assert.equal(report.summary.capabilityStatus, "supported");
    assert.deepEqual(report.transferBudget.approved, {
      fileCount: 1,
      totalBytes: 12740,
    });
    assert.deepEqual(report.transferBudget.critical, {
      files: ["oswald-600.woff2"],
      fileCount: 1,
      totalBytes: 12740,
      status: "pass",
    });
    assert.equal(report.transferBudget.actualPreloads.fileCount, 1);
    assert.deepEqual(report.transferBudget.unassignedReferences, {
      files: [],
      totalBytes: 0,
      references: [],
    });
    assert.equal(
      report.glyphAudit.sharedSpecimen,
      "got soap?\nAV 0123456789 $38.00",
    );
    assert.equal(report.manualChecks[0].status, "unresolved");
    assert.equal(font.binary.format, "WOFF2");
    assert.equal(font.binary.valid, true);
    assert.equal(font.structure.kind, "static");
    assert.equal(font.structure.outlineType, "TrueType");
    assert.ok(font.structure.tables.includes("glyf"));
    assert.ok(font.structure.tables.includes("GSUB"));
    assert.ok(font.structure.tables.includes("GPOS"));
    assert.equal(font.structure.tableCount, font.structure.tables.length);
    assert.equal(font.metadata.familyName, "Oswald SemiBold");
    assert.equal(font.metadata.weightClass, 600);
    assert.equal(font.metadata.italic, false);
    assert.ok(font.metadata.postscriptName);
    assert.ok(font.metrics.unitsPerEm > 0);
    assert.ok(font.metrics.ascent > 0);
    assert.ok(font.metrics.descent < 0);
    assert.ok(font.metrics.numGlyphs > 0);
    assert.ok(Array.isArray(font.openTypeFeatures));
    assert.ok(Array.isArray(font.openType.gsubFeatureTags));
    assert.ok(Array.isArray(font.openType.gposFeatureTags));
    assert.ok(font.openType.gsubFeatureTags.includes("liga"));
    assert.ok(font.openType.gposFeatureTags.includes("kern"));
    assert.equal(font.openType.inventoryOnly, true);
    assert.deepEqual(font.openType.automaticallyEnabled, []);
    assert.deepEqual(Object.keys(font.openType.features), [
      "kern",
      "liga",
      "clig",
      "calt",
      "dlig",
      "tnum",
      "pnum",
      "onum",
      "lnum",
      "case",
    ]);
    assert.deepEqual(font.openType.features.kern, {
      present: true,
      tables: ["GPOS"],
      policy: "natural-default",
      policyState: "available-natural-default",
    });
    assert.deepEqual(font.openType.features.liga, {
      present: true,
      tables: ["GSUB"],
      policy: "natural-default",
      policyState: "available-natural-default",
    });
    assert.deepEqual(font.openType.features.dlig, {
      present: false,
      tables: [],
      policy: "locked-off",
      policyState: "not-present",
    });
    assert.deepEqual(font.openType.features.tnum, {
      present: false,
      tables: [],
      policy: "support-proven-only",
      policyState: "not-present",
    });
    assert.deepEqual(font.openType.groups, {
      stylisticSets: [],
      swashes: [],
      alternates: [],
    });
    assert.equal(font.openType.familyLock, null);
    assert.equal(typeof font.variationAxes, "object");
    assert.equal(font.glyphCoverage.missingCount, 0);
    assert.equal(font.inspectedGlyphs.length, 5);
    assert.ok(font.inspectedGlyphs.every((glyph) => glyph.glyphId >= 0));
    assert.equal(font.layoutSamples.length, 2);
    assert.deepEqual(
      font.layoutSamples[0].glyphs.map((glyph) => glyph.glyphId).length,
      2,
    );
    assert.ok(font.layoutSamples[0].totalAdvance > 0);
    assert.equal(font.kerning.length, 1);
    assert.equal(typeof font.kerning[0].adjustment, "number");
    assert.equal(font.numerals.glyphs.length, 10);
    assert.equal(Object.keys(font.numerals.widths).length, 10);
    assert.equal(font.numerals.classification, "proportional");
    assert.equal(typeof font.numerals.tabularByDefault, "boolean");
    assert.deepEqual(font.delivery, {
      preload: "global",
      fontDisplay: "swap",
      scope: "global",
    });
    assert.deepEqual(font.authority, {
      status: "approved",
      source: "current",
    });
    assert.match(font.binary.sha256, /^[a-f0-9]{64}$/);
    assert.deepEqual(
      report.fallbackMetricAudit.browserProofRequired,
      [
        "stable line counts",
        "stable navigation width",
        "stable button dimensions",
        "no major paragraph reflow",
        "no broken crop",
        "no control movement during font swap",
      ],
    );
    assert.equal(report.fallbackMetricAudit.approved, false);
    assert.equal(report.fallbackMetricAudit.automaticallyApplied, false);
    assert.equal(report.fallbackMetricAudit.canonical, false);
    assert.deepEqual(
      report.fallbackMetricAudit.families[0].principalMetrics,
      {
        unitsPerEm: 1000,
        ascent: 1193,
        descent: -289,
        lineGap: 0,
        capHeight: 810,
        xHeight: 578,
      },
    );
    assert.deepEqual(
      report.fallbackMetricAudit.families[0].candidates[0],
      {
        family: "Synthetic Narrow",
        order: 1,
        metricProfileStatus: "available",
        profileId: "synthetic-narrow",
        source: {
          type: "test-fixture",
          version: "1",
        },
        referenceMetrics: {
          unitsPerEm: 1000,
          ascent: 900,
          descent: -200,
          lineGap: 100,
          capHeight: 700,
          xHeight: 500,
        },
        calculation: {
          basis: "x-height-ratio",
          sizeAdjustFactor: 1.156,
          descriptors: {
            "size-adjust": "115.60%",
            "ascent-override": "103.20%",
            "descent-override": "25.00%",
            "line-gap-override": "0.00%",
          },
        },
        authority: {
          status: "candidate-only",
          approved: false,
          automaticallyApplied: false,
          requiresBrowserProof: true,
        },
      },
    );
    assert.deepEqual(
      report.fallbackMetricAudit.families[0].candidates[1],
      {
        family: "Unresolved Narrow",
        order: 2,
        metricProfileStatus: "unresolved",
        profileId: null,
        source: null,
        referenceMetrics: null,
        calculation: null,
        authority: {
          status: "candidate-only",
          approved: false,
          automaticallyApplied: false,
          requiresBrowserProof: true,
        },
      },
    );

    const markdown = fontAudit.renderMarkdownReport(report);
    assert.match(markdown, /^# Got Soap\? Font Binary Audit/m);
    assert.match(markdown, /Oswald/);
    assert.match(markdown, /Manual authority checks/);
    assert.match(markdown, /Duplicate-file protection/);
    assert.match(markdown, /GSUB \/ GPOS/);
    assert.match(markdown, /OpenType inventory and locked policy/);
    assert.match(markdown, /automatically enables no OpenType features/i);
    assert.match(markdown, /Metric-adjusted fallback candidates/);
    assert.match(markdown, /not automatically canonical/i);
    assert.match(markdown, /115\.60%/);
    assert.match(markdown, /stable navigation width/);
    assert.match(markdown, /## Transfer budget/);
    assert.match(markdown, /Critical preload total/);
    assert.match(markdown, /## Family binary tables/);
    assert.match(markdown, /### Oswald/);
    assert.match(markdown, new RegExp(font.binary.sha256));
    assert.match(markdown, /units-per-em/i);
  });

  test("fails when an approved file is missing", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    await rm(path.join(fixture.siteRoot, "public", "fonts", "oswald-600.woff2"));

    await assert.rejects(
      () => fontAudit.auditFontManifest(fixture),
      /declared in the font manifest but missing/,
    );
  });

  test("fails when an approved file is not a valid WOFF2 binary", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    await writeFile(
      path.join(fixture.siteRoot, "public", "fonts", "oswald-600.woff2"),
      "not a WOFF2 binary",
    );

    await assert.rejects(
      () => fontAudit.auditFontManifest(fixture),
      /font|woff|format|buffer/i,
    );
  });

  test("fails only when a missing specimen glyph is assigned to the approved copy lane", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.glyphSets.coreLatin += " Ÿ";
    manifest.families[0].files[0].copyLaneCharacters = "Ÿ";
    await writeFile(fixture.manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    const report = await fontAudit.auditFontManifest(fixture);
    const restriction = report.findings.find(
      (finding) => finding.code === "copy-assignment-restriction",
    );
    const failure = report.findings.find(
      (finding) => finding.code === "copy-lane-glyph-missing",
    );

    assert.equal(restriction.severity, "restriction");
    assert.equal(failure.severity, "error");
    assert.deepEqual(
      report.fonts[0].glyphCoverage.copyLane.missingGlyphs.map((glyph) => glyph.unicode),
      ["U+0178"],
    );
    assert.equal(report.summary.status, "fail");
  });

  test("warns on metadata weight drift but fails contradictory style metadata", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.families[0].files[0].declaredWeight = 700;
    manifest.families[0].files[0].declaredStyle = "italic";
    await writeFile(fixture.manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    const report = await fontAudit.auditFontManifest(fixture);
    const weight = report.findings.find(
      (finding) => finding.code === "metadata-weight-mismatch",
    );
    const style = report.findings.find(
      (finding) => finding.code === "metadata-style-mismatch",
    );

    assert.equal(weight.severity, "warning");
    assert.equal(style.severity, "error");
  });

  test("fails static weight ranges and undocumented structure contradictions", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.families[0].files[0].declaredWeightRange = [500, 700];
    manifest.families[0].files[0].declaredStructure = "variable";
    await writeFile(fixture.manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    const report = await fontAudit.auditFontManifest(fixture);
    assert.equal(
      report.findings.find((finding) => finding.code === "static-weight-range").severity,
      "error",
    );
    assert.equal(
      report.findings.find((finding) => finding.code === "declared-structure-mismatch").severity,
      "error",
    );
  });

  test("warns when tabular numerals and optical sizing are unavailable", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const report = await fontAudit.auditFontManifest(fixture);
    const codes = report.findings.map((finding) => finding.code);

    assert.ok(codes.includes("tabular-numerals-unavailable"));
    assert.ok(codes.includes("optical-sizing-unavailable"));
  });

  test("warns when browser proof changes a paragraph by more than one line", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.metricFallbackPolicy.principalMatches[0].fallbackCandidates[0].browserProof = {
      paragraphLineDelta: 2,
      status: "review-required",
    };
    await writeFile(fixture.manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    const report = await fontAudit.auditFontManifest(fixture);
    const finding = report.findings.find(
      (entry) => entry.code === "fallback-paragraph-reflow",
    );

    assert.equal(finding.severity, "warning");
    assert.equal(finding.paragraphLineDelta, 2);
  });

  test("rejects fallback metric candidates being marked approved or automatically applied", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.metricFallbackPolicy.approved = true;
    manifest.metricFallbackPolicy.automaticallyApplied = true;
    await writeFile(
      fixture.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    await assert.rejects(
      () => fontAudit.auditFontManifest(fixture),
      /fallback metric candidates must remain unapproved and unapplied/i,
    );
  });

  test("keeps Moanslight stylistic sets and decorative alternates inventoried but off", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    await copyFile(
      moanslightFont,
      path.join(fixture.siteRoot, "public", "fonts", "oswald-600.woff2"),
    );
    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.glyphSets.coreLatin = "AV012";
    manifest.families[0].declaredFamily = "Moanslight";
    manifest.metricFallbackPolicy.principalMatches[0].family = "Moanslight";
    manifest.families[0].files[0].declaredWeight = 500;
    manifest.families[0].files[0].expected = {
      familyName: "Moanslight Medium",
      weightClass: 500,
      italic: false,
    };
    await writeFile(
      fixture.manifestPath,
      JSON.stringify(manifest, null, 2) + "\n",
    );

    const report = await fontAudit.auditFontManifest(fixture);
    const [font] = report.fonts;

    assert.deepEqual(font.openType.automaticallyEnabled, []);
    assert.deepEqual(font.openType.groups.stylisticSets, [
      {
        tag: "ss01",
        tables: ["GSUB"],
        policy: "locked-off",
        policyState: "present-kept-off",
      },
    ]);
    assert.deepEqual(
      font.openType.groups.alternates.map((feature) => feature.tag),
      ["aalt", "salt"],
    );
    assert.ok(
      font.openType.groups.alternates.every(
        (feature) =>
          feature.policy === "locked-off" &&
          feature.policyState === "present-kept-off",
      ),
    );
    assert.equal(
      report.findings.find(
        (finding) => finding.code === "unexpected-alternate-systems",
      ).severity,
      "warning",
    );
    assert.deepEqual(font.openType.familyLock, {
      id: "moanslight-no-decorative-alternates",
      rule: "Moanslight does not gain decorative alternates.",
      detectedLockedFeatureTags: ["aalt", "salt", "ss01"],
      authorizedFeatureTags: [],
    });
  });

  test("rejects automatic OpenType feature activation", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.openTypePolicy.automaticallyEnabled = ["dlig"];
    await writeFile(
      fixture.manifestPath,
      JSON.stringify(manifest, null, 2) + "\n",
    );

    await assert.rejects(
      () => fontAudit.auditFontManifest(fixture),
      /automaticallyEnabled must remain empty/,
    );
  });

  test("rejects drift from the locked discretionary-ligature policy", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.openTypePolicy.tagPolicies.dlig = "natural-default";
    await writeFile(
      fixture.manifestPath,
      JSON.stringify(manifest, null, 2) + "\n",
    );

    await assert.rejects(
      () => fontAudit.auditFontManifest(fixture),
      /dlig must remain locked-off/,
    );
  });

  test("renders each approved file's production role", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.families[0].files[0].role = "body";
    await writeFile(
      fixture.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    const report = await fontAudit.auditFontManifest(fixture);
    assert.equal(report.fonts[0].declared.role, "body");
    const markdown = fontAudit.renderMarkdownReport(report);
    assert.match(markdown, /\| body \|/);
  });

  test("surfaces preview-only embedding flags and demo font names", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    await copyFile(
      previewOnlyFont,
      path.join(fixture.siteRoot, "public", "fonts", "oswald-600.woff2"),
    );
    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.glyphSets.coreLatin = "AV012";
    manifest.families[0].declaredFamily = "Marlin Sans SQ";
    manifest.metricFallbackPolicy.principalMatches[0].family =
      "Marlin Sans SQ";
    manifest.families[0].files[0].declaredWeight = 400;
    manifest.families[0].files[0].expected = {
      familyName: "FSP DEMO - Marlin Sans SQ",
      weightClass: 400,
      italic: false,
    };
    await writeFile(
      fixture.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    const report = await fontAudit.auditFontManifest(fixture);
    const codes = report.findings.map((finding) => finding.code);

    assert.ok(codes.includes("preview-print-embedding"));
    assert.ok(codes.includes("demo-font-name"));
    assert.equal(report.summary.warningCount, 4);
    assert.ok(codes.includes("tabular-numerals-unavailable"));
    assert.ok(codes.includes("optical-sizing-unavailable"));
    assert.equal(report.summary.errorCount, 0);
    assert.deepEqual(report.fonts[0].openType.familyLock, {
      id: "marlin-canonical-punctuation",
      rule: "Marlin SQ punctuation remains canonical.",
      detectedLockedFeatureTags: [],
      authorizedFeatureTags: [],
    });
  });

  test("reports category-specific glyph gaps as copy-assignment restrictions", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.glyphSets.coreLatin =
      "got soap?\n“Clean.” DON’T\n$38.00 © ™ ®\n& ' ’ “ ” – — … × · é Ÿ";
    manifest.glyphCategories = {
      curlyQuotations: { label: "curly quotations", characters: "“”" },
      apostrophes: { label: "apostrophes", characters: "'’" },
      dashes: { label: "en and em dashes", characters: "–—" },
      ellipsis: { label: "ellipsis", characters: "…" },
      multiplicationSign: { label: "multiplication sign", characters: "×" },
      middleDot: { label: "middle dot", characters: "·" },
      currencySymbols: { label: "currency symbols", characters: "$" },
      copyrightTrademark: {
        label: "copyright and trademark marks",
        characters: "©™®",
      },
      accentedLatin: { label: "accented Latin characters", characters: "éŸ" },
      wordmarkQuestionMark: {
        label: "wordmark question mark",
        characters: "?",
      },
    };
    await writeFile(
      fixture.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    const report = await fontAudit.auditFontManifest(fixture);
    const [font] = report.fonts;
    const restriction = report.findings.find(
      (finding) => finding.code === "copy-assignment-restriction",
    );

    assert.equal(report.summary.status, "warning");
    assert.equal(report.summary.capabilityStatus, "restricted");
    assert.equal(report.summary.errorCount, 0);
    assert.equal(report.summary.restrictedFontCount, 1);
    assert.equal(font.glyphCoverage.assignment.status, "restricted");
    assert.deepEqual(font.glyphCoverage.assignment.restrictedCategories, [
      "accentedLatin",
    ]);
    assert.deepEqual(
      font.glyphCoverage.categories.accentedLatin.missingGlyphs,
      [
        {
          character: "Ÿ",
          codePoint: 376,
          unicode: "U+0178",
        },
      ],
    );
    assert.equal(
      font.glyphCoverage.categories.wordmarkQuestionMark.status,
      "supported",
    );
    assert.equal(restriction.severity, "restriction");
    assert.match(
      restriction.message,
      /cannot be assigned copy requiring the missing glyphs without an approved repair/,
    );

    const markdown = fontAudit.renderMarkdownReport(report);
    assert.match(markdown, /Glyph capability audit/);
    assert.match(markdown, /accented Latin characters/);
    assert.match(
      markdown,
      /unrelated supported uses are not automatically invalid/,
    );
  });

  test("inventories an unassigned WOFF2 without inspecting or rejecting it", async (context) => {
    const fixture = await createFixture({ includeUnassignedFont: true });
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.transferBudget.commercialFilePatterns = ["^unassigned\\.woff2$"];
    await writeFile(fixture.manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    const report = await fontAudit.auditFontManifest(fixture);

    assert.equal(report.summary.approvedProductionFonts, 1);
    assert.equal(report.summary.unassignedFonts, 1);
    assert.equal(report.summary.directoryFonts, 2);
    assert.equal(report.fonts.length, 1);
    assert.deepEqual(report.unassignedFonts, [
      {
        file: "unassigned.woff2",
        status: "unassigned",
        authority: "unassigned",
        authorizedForCss: false,
        authorizedForNetworkDelivery: false,
      },
    ]);
    assert.equal(
      report.findings.find(
        (finding) =>
          finding.file === "unassigned.woff2" &&
          finding.code === "unused-commercial-font-public",
      ).severity,
      "warning",
    );

    const markdown = fontAudit.renderMarkdownReport(report);
    assert.match(markdown, /Unassigned directory inventory/);
    assert.match(markdown, /not authorized for CSS declaration or network delivery/);
  });

  test("fails when different approved weights have identical hashes", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    await copyFile(
      sourceFont,
      path.join(fixture.siteRoot, "public", "fonts", "oswald-700.woff2"),
    );
    const manifest = JSON.parse(await readFile(fixture.manifestPath, "utf8"));
    manifest.families[0].files.push({
      file: "oswald-700.woff2",
      role: "rare command",
      declaredWeight: 700,
      declaredStyle: "normal",
      delivery: {
        preload: "route-conditional",
        fontDisplay: "fallback",
        scope: "route",
      },
      expected: {
        familyName: "Oswald SemiBold",
        weightClass: 600,
        italic: false,
      },
    });
    await writeFile(
      fixture.manifestPath,
      `${JSON.stringify(manifest, null, 2)}\n`,
    );

    const report = await fontAudit.auditFontManifest(fixture);
    const duplicateFinding = report.findings.find(
      (finding) => finding.code === "duplicate-approved-binary",
    );

    assert.equal(report.summary.status, "fail");
    assert.equal(report.summary.duplicateApprovedBinaries, 1);
    assert.equal(report.duplicateApprovedBinaries.length, 1);
    assert.deepEqual(report.duplicateApprovedBinaries[0].files, [
      "oswald-600.woff2",
      "oswald-700.woff2",
    ]);
    assert.deepEqual(report.duplicateApprovedBinaries[0].declaredWeights, [
      600,
      700,
    ]);
    assert.match(report.duplicateApprovedBinaries[0].sha256, /^[a-f0-9]{64}$/);
    assert.equal(duplicateFinding.severity, "error");
  });

  test("writes both deterministic report artifacts", async (context) => {
    const fixture = await createFixture();
    context.after(() => rm(fixture.siteRoot, { recursive: true, force: true }));

    const fixedProvenance = {
      ...fixture,
      auditTimestamp: "2026-07-30T12:34:56.000Z",
      sourceCommitSha: "0123456789abcdef0123456789abcdef01234567",
      workingTreeDirty: true,
    };
    const first = await fontAudit.writeAuditArtifacts(fixedProvenance);
    const second = await fontAudit.writeAuditArtifacts(fixedProvenance);

    assert.equal(first.json, second.json);
    assert.equal(first.markdown, second.markdown);
    assert.deepEqual(first.report.provenance, {
      auditTimestamp: "2026-07-30T12:34:56.000Z",
      sourceCommitSha: "0123456789abcdef0123456789abcdef01234567",
      workingTreeDirty: true,
    });
    assert.match(first.markdown, /2026-07-30T12:34:56\.000Z/);
    assert.match(first.markdown, /0123456789abcdef0123456789abcdef01234567/);
    assert.doesNotMatch(first.json, /generatedAt/);
  });
  test("locks the five principal fallback stacks as candidate-only", async () => {
    const siteRoot = path.resolve(scriptDirectory, "..");
    const manifestPath = path.join(siteRoot, "config", "font-manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

    assert.deepEqual(
      manifest.metricFallbackPolicy.principalMatches.map((match) => ({
        family: match.family,
        principalFile: match.principalFile,
        fallbacks: match.fallbackCandidates.map((candidate) => candidate.family),
      })),
      [
        {
          family: "Oswald",
          principalFile: "oswald-600.woff2",
          fallbacks: ["Arial Narrow", "Aptos Narrow"],
        },
        {
          family: "Behind The Nineties Sans",
          principalFile: "Behind-The-Nineties-Sans-Md.woff2",
          fallbacks: ["Aptos", "Arial"],
        },
        {
          family: "Moxie Twist",
          principalFile: "Moxie Twist.woff2",
          fallbacks: ["Didot", "Bodoni MT", "Georgia"],
        },
        {
          family: "Marlin Sans SQ",
          principalFile: "marlin-sans-sq-medium.woff2",
          fallbacks: ["Helvetica Neue", "Arial"],
        },
        {
          family: "Moanslight",
          principalFile: "Moanslight-Medium.woff2",
          fallbacks: ["Helvetica Neue", "Arial"],
        },
      ],
    );

    const report = await fontAudit.auditFontManifest({
      siteRoot,
      manifestPath,
    });
    const candidates = report.fallbackMetricAudit.families.flatMap(
      (family) => family.candidates,
    );

    assert.equal(
      candidates.filter(
        (candidate) => candidate.metricProfileStatus === "available",
      ).length,
      8,
    );
    assert.equal(
      candidates.filter(
        (candidate) => candidate.metricProfileStatus === "unresolved",
      ).length,
      3,
    );
    assert.ok(
      candidates.every(
        (candidate) =>
          candidate.authority.status === "candidate-only" &&
          candidate.authority.approved === false &&
          candidate.authority.automaticallyApplied === false &&
          candidate.authority.requiresBrowserProof === true,
      ),
    );
  });
}
