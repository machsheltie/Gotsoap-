/**
 * prep-shop-assets.mjs — faux-shop mockup hygiene (faux-shop order, Part 2
 * "build hygiene": the ✨ generation artifact must not ship).
 *
 * The five owner-delivered product mockups (src/assets/shop/*.png, 1024×1024)
 * carry a white four-point sparkle watermark near the bottom-right corner —
 * measured across all five at x 874–930 · y 877–930, always on clean studio
 * background. A rectangular crop cannot remove it without cutting the soap
 * bar (its right edge reaches x≈935), so the artifact is removed by PATCH:
 * the same-size background region directly below the sparkle is composited
 * over it. Grain and gradient continuity come free — same image, 80px shift.
 *
 * Originals are never modified (owner will swap higher-quality Photoshop
 * assets later). Cleaned masters land in src/assets/shop/web/<slug>.png and
 * are the ONLY shop images pages may import; Astro getImage() derives the
 * responsive AVIF/WebP at build per the CLAUDE.md asset rule.
 *
 *   node scripts/prep-shop-assets.mjs
 *
 * Idempotent: re-running overwrites the web/ masters from the originals.
 */

import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src/assets/shop';
const OUT = 'src/assets/shop/web';

/** original file → product slug (matches copy.ts shop.products[].slug). */
const PRODUCTS = {
  'gotsoapsoap.png': 'soap',
  'gotsoaphat.png': 'hat',
  'gotsoaptshirt1.png': 'got-soap-tee',
  'gotsoaptshirt2.png': 'clean-sexy-tee',
  'gotsoapwaterbottle.png': 'effort-bottle',
};

/** Sparkle patch box (union bbox + glow margin) and its clean donor region,
 * verified against all five mockups (see file header). */
const BOX_DEFAULT = { left: 860, top: 862, width: 84, height: 82 };
const DONOR_DEFAULT = { left: 860, top: 942, width: 84, height: 82 };

/* The bottle's watermark is the sparkle INSIDE a translucent gray rounded
 * chip (~858–950 × 876–964) that only shows against its mid-gray studio
 * background — invisible on the four near-white mockups. The default box
 * clips the chip and its below-donor samples the chip's own lower edge back
 * in, leaving a visible gray square. The chip also sits ON the backdrop's
 * wall-floor shadow band (a darker horizontal sweep, y≈860–930), so the
 * donor must come from the SAME ROWS — shifted left to x 700–832, clean
 * background clear of the bottle's cast shadow (which ends ≈x 690) — so the
 * band's vertical profile carries through the patch. */
const OVERRIDES = {
  'gotsoapwaterbottle.png': {
    box: { left: 836, top: 852, width: 132, height: 132 },
    donor: { left: 700, top: 852, width: 132, height: 132 },
  },
};

mkdirSync(OUT, { recursive: true });

/* Feathered alpha mask: a hard-edged donor rectangle reads as a faint seam on
 * the smooth studio gradient (verified visually on the soap mockup), so the
 * patch fades over its outer ~10px. The sparkle core sits ≥14px inside the
 * box on every image, safely under the fully-opaque center. */
async function featherMask(box) {
  const maskSvg = Buffer.from(
    `<svg width="${box.width}" height="${box.height}">` +
      `<rect x="10" y="10" width="${box.width - 20}" height="${box.height - 20}" fill="white"/></svg>`,
  );
  return sharp(maskSvg).blur(5).greyscale().raw().toBuffer();
}

/** Per-channel mean of the outer `ring`-px frame of a raw RGB region. */
function ringMean(buf, w, h, ring) {
  const sum = [0, 0, 0];
  let n = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x >= ring && x < w - ring && y >= ring && y < h - ring) continue;
      const i = (y * w + x) * 3;
      sum[0] += buf[i]; sum[1] += buf[i + 1]; sum[2] += buf[i + 2];
      n++;
    }
  }
  return sum.map((s) => s / n);
}

for (const [file, slug] of Object.entries(PRODUCTS)) {
  const src = join(SRC, file);
  const { box: BOX, donor: DONOR } = OVERRIDES[file] ?? { box: BOX_DEFAULT, donor: DONOR_DEFAULT };
  const mask = await featherMask(BOX);
  const donor = await sharp(src).extract(DONOR).removeAlpha().raw().toBuffer();
  /* Brightness-match the donor to the destination: the studio gradient makes
   * the donor region measurably brighter/darker than the sparkle area on some
   * mockups (the soap reads ~+3 levels), and a feathered edge cannot hide a
   * DC offset. Compare the two regions' border rings (the destination ring
   * excludes the sparkle core, which sits ≥14px inside) and shift per channel. */
  const dest = await sharp(src).extract(BOX).removeAlpha().raw().toBuffer();
  const dm = ringMean(dest, BOX.width, BOX.height, 8);
  const sm = ringMean(donor, DONOR.width, DONOR.height, 8);
  const offset = dm.map((d, i) => d - sm[i]);
  const patch = await sharp(donor, {
    raw: { width: DONOR.width, height: DONOR.height, channels: 3 },
  })
    .linear([1, 1, 1], offset)
    .joinChannel(mask, {
      raw: { width: BOX.width, height: BOX.height, channels: 1 },
    })
    .png()
    .toBuffer();
  await sharp(src)
    .composite([{ input: patch, left: BOX.left, top: BOX.top }])
    .png()
    .toFile(join(OUT, `${slug}.png`));
  console.log(`${file} → web/${slug}.png (sparkle patched, feathered)`);
}
