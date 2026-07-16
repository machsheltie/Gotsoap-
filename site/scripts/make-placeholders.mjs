/**
 * make-placeholders.mjs — token-only development stand-ins for the owner art.
 *
 * WHY
 * specs.md blocks production release on two Photoshop deliverables that only
 * Stacey can make (the text-free hero, the placement-hub installation). Rather
 * than let that block the BUILD, §3.1 explicitly permits a stand-in:
 *
 *   "A token-only development stand-in is allowed. Production must not use a
 *    canonical poster, a blurred canonical poster, or any baked-type image
 *    behind live hero type."
 *
 * So these are built from tokens.css values ONLY. No poster is sampled, cropped,
 * blurred, or referenced. They are deliberately, loudly fake — a placeholder that
 * could be mistaken for finished art is a placeholder that ships.
 *
 * They also carry information, because a flat grey box wastes the opportunity:
 *   - hero-*        marks the SUBJECT ZONE where the model will stand, so live
 *                   type can be positioned now without colliding with her art later.
 *   - placement-*   contains five real 4:5 rectangles at the exact coordinates in
 *                   src/content/placement-hub.ts, so §4.3 hotspots can be wired and
 *                   keyboard-tested against real numbers today. When the real
 *                   composite lands, ONLY those coordinates change.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Delete this script and src/assets/placeholder/ once the real art lands.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = 'src/assets/placeholder';
mkdirSync(OUT, { recursive: true });

/* Straight from tokens.css — the only palette allowed here. */
const T = {
  groutBlack: '#0e0e10',
  steamWhite: '#eceae4',
  smokeSlate: '#201f22',
  chromeMist: '#9a9aa2',
  marbleAmber: '#b8862e',
  latherWhite: '#ffffff',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Loud, unmissable "this is not art" treatment shared by every placeholder. */
const stamps = (w, h, label, note) => {
  const pad = Math.round(w * 0.02);
  const fs = Math.round(w * 0.014);
  return `
    <rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}"
          fill="none" stroke="${T.marbleAmber}" stroke-width="${Math.max(3, w * 0.002)}"
          stroke-dasharray="${w * 0.02} ${w * 0.01}"/>
    <text x="${pad * 2}" y="${pad * 2 + fs}" font-family="monospace" font-size="${fs}"
          font-weight="bold" fill="${T.marbleAmber}" letter-spacing="${fs * 0.12}">
      ${esc(label)}
    </text>
    <text x="${pad * 2}" y="${h - pad * 2}" font-family="monospace" font-size="${fs * 0.8}"
          fill="${T.marbleAmber}" opacity="0.85">
      ${esc(note)}
    </text>
    <text x="${w - pad * 2}" y="${h - pad * 2}" font-family="monospace" font-size="${fs * 0.8}"
          fill="${T.marbleAmber}" opacity="0.85" text-anchor="end">
      ${w} × ${h}  ·  NOT FINAL ART  ·  REPLACE BEFORE PRODUCTION
    </text>`;
};

/* ── The hero: Poster 1's world, text-free, restaged wide ──────────────────── */
/* Poster 1 is bright white tile + steam. The stand-in is porcelain: a warm
 * off-white tile ground with a grout grid, a steam gradient, and a marked
 * subject zone. It is intentionally EMPTY where the live "got soap?" type goes. */
function hero(w, h, name) {
  const tile = Math.round(w / (w > h ? 16 : 8));
  // Subject sits right-of-centre on the wide crop, centred on the portrait —
  // matching how a single figure reads in each aspect.
  const sw = w > h ? w * 0.26 : w * 0.44;
  const sh = sw * 1.9; // a standing figure is roughly 1:1.9 in its bounding box
  const sx = w > h ? w * 0.6 : (w - sw) / 2;
  const sy = h - sh - h * 0.06;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="steam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stop-color="${T.latherWhite}" stop-opacity="0.95"/>
        <stop offset="55%" stop-color="${T.steamWhite}"  stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${T.chromeMist}" stop-opacity="0.35"/>
      </linearGradient>
      <pattern id="grout" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse">
        <rect width="${tile}" height="${tile}" fill="none"/>
        <path d="M ${tile} 0 L 0 0 0 ${tile}" fill="none"
              stroke="${T.chromeMist}" stroke-opacity="0.28" stroke-width="2"/>
      </pattern>
    </defs>

    <rect width="${w}" height="${h}" fill="${T.steamWhite}"/>
    <rect width="${w}" height="${h}" fill="url(#grout)"/>
    <rect width="${w}" height="${h}" fill="url(#steam)"/>

    <!-- SUBJECT ZONE: where Stacey's figure will stand. Live type must not
         collide with this box. That is the whole reason it is drawn. -->
    <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="${sw * 0.06}"
          fill="${T.chromeMist}" fill-opacity="0.30"
          stroke="${T.groutBlack}" stroke-opacity="0.35"
          stroke-width="3" stroke-dasharray="18 12"/>
    <text x="${sx + sw / 2}" y="${sy + sh / 2}" font-family="monospace"
          font-size="${w * 0.013}" font-weight="bold" fill="${T.groutBlack}"
          fill-opacity="0.55" text-anchor="middle" letter-spacing="${w * 0.002}">
      SUBJECT ZONE
    </text>
    <text x="${sx + sw / 2}" y="${sy + sh / 2 + w * 0.022}" font-family="monospace"
          font-size="${w * 0.0095}" fill="${T.groutBlack}" fill-opacity="0.45"
          text-anchor="middle">
      figure lands here — keep live type clear
    </text>

    ${stamps(w, h, `PLACEHOLDER · ${name}`, 'token-only stand-in (specs.md §3.1) · text-free hero · Poster 1 world')}
  </svg>`;

  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`));
}

/* ── The placement hub: five installed posters on one locker-room wall ─────── */
/* Coordinates below are the SOURCE OF TRUTH for the §4.3 hotspots and are
 * mirrored into src/content/placement-hub.ts. Every rect is a true 4:5. */

const POSTERS = [
  { slug: 'confident-man', n: 1, title: 'A Clean Man Is A Confident Man' },
  { slug: 'soap-smoldering', n: 2, title: 'Soap-Smoldering' },
  { slug: 'unholy', n: 3, title: 'Unholy' },
  { slug: 'redemption', n: 4, title: 'The Redemption Ad' },
  { slug: 'thirst-announcement', n: 5, title: 'Public Thirst Announcement' },
];

/* x/y/w are % of the composite. h is derived from the 4:5 ratio + the aspect,
 * so the rectangles are geometrically exact, not eyeballed.
 * Staggered heights = believable installation, per §4.1 ("mounted to tile,
 * secured behind glass, fixed to a chrome rail"), not a grid. */
export const HOTSPOTS = {
  wide: [
    { x: 4.0, y: 18, w: 17.0 },
    { x: 24.0, y: 30, w: 15.0 },
    { x: 41.5, y: 12, w: 19.0 },
    { x: 63.0, y: 28, w: 15.5 },
    { x: 81.0, y: 16, w: 16.0 },
  ],
  // An INDEPENDENT arrangement, not a crop of the wide master (§4.1).
  portrait: [
    { x: 5.0, y: 5, w: 36.0 },
    { x: 55.0, y: 10, w: 34.0 },
    { x: 12.0, y: 36, w: 40.0 },
    { x: 60.0, y: 42, w: 32.0 },
    { x: 26.0, y: 70, w: 42.0 },
  ],
};

/** 4:5 → height as a % of the composite, given its pixel aspect. */
const h4x5 = (wPct, cw, ch) => (wPct / 100) * cw * 1.25 * (100 / ch);

function hub(cw, ch, key, name) {
  const tile = Math.round(cw / (cw > ch ? 22 : 10));

  const frames = POSTERS.map((p, i) => {
    const s = HOTSPOTS[key][i];
    const x = (s.x / 100) * cw;
    const y = (s.y / 100) * ch;
    const w = (s.w / 100) * cw;
    const h = w * 1.25; // 4:5, always
    const fs = Math.max(11, cw * 0.008);

    return `
      <g>
        <rect x="${x + 6}" y="${y + 8}" width="${w}" height="${h}"
              fill="${T.groutBlack}" fill-opacity="0.35"/>
        <rect x="${x}" y="${y}" width="${w}" height="${h}"
              fill="${T.chromeMist}" fill-opacity="0.9"
              stroke="${T.latherWhite}" stroke-opacity="0.6" stroke-width="3"/>
        <text x="${x + w / 2}" y="${y + h / 2 - fs}" font-family="monospace"
              font-size="${fs * 1.6}" font-weight="bold" fill="${T.groutBlack}"
              text-anchor="middle">${p.n}</text>
        <text x="${x + w / 2}" y="${y + h / 2 + fs}" font-family="monospace"
              font-size="${fs * 0.9}" fill="${T.groutBlack}" fill-opacity="0.8"
              text-anchor="middle">${esc(p.slug)}</text>
        <text x="${x + w / 2}" y="${y + h / 2 + fs * 2.4}" font-family="monospace"
              font-size="${fs * 0.72}" fill="${T.groutBlack}" fill-opacity="0.6"
              text-anchor="middle">4:5 · hotspot ${key}[${i}]</text>
      </g>`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${ch}">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stop-color="${T.steamWhite}"/>
        <stop offset="70%" stop-color="${T.chromeMist}" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="${T.smokeSlate}" stop-opacity="0.35"/>
      </linearGradient>
      <pattern id="wallTile" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse">
        <path d="M ${tile} 0 L 0 0 0 ${tile}" fill="none"
              stroke="${T.groutBlack}" stroke-opacity="0.16" stroke-width="2"/>
      </pattern>
    </defs>

    <rect width="${cw}" height="${ch}" fill="${T.steamWhite}"/>
    <rect width="${cw}" height="${ch}" fill="url(#wallTile)"/>
    <rect width="${cw}" height="${ch}" fill="url(#wall)"/>
    ${frames}
    ${stamps(cw, ch, `PLACEHOLDER · ${name}`, 'token-only stand-in (specs.md §4.1) · five 4:5 frames match placement-hub.ts')}
  </svg>`;

  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `${name}.jpg`));
}

/* ── emit ─────────────────────────────────────────────────────────────────── */

await Promise.all([
  hero(3200, 1800, 'hero-wide'),
  hero(1350, 2400, 'hero-portrait'),
  hub(3200, 1800, 'wide', 'placement-hub-wide'),
  hub(1350, 2400, 'portrait', 'placement-hub-portrait'),
]);

/* Mirror the hotspot geometry into the content module §4.3 asks for, so the
 * placeholder and the real hotspots can never silently drift apart. */
const ts = `/**
 * placement-hub.ts — hotspot geometry for the /psas installation (specs.md §4.3).
 *
 * GENERATED by scripts/make-placeholders.mjs. These percentages currently describe
 * the PLACEHOLDER composite in src/assets/placeholder/.
 *
 * When Stacey's real 3200×1800 + 1350×2400 compositions land, THIS FILE is the
 * only thing that changes: re-measure where each poster sits in her artwork and
 * update the percentages. Every hotspot, anchor, focus ring, and keyboard route
 * built against it keeps working untouched.
 *
 * Coordinates are % of the composite. Width is given; height is derived from the
 * canonical 4:5 ratio, so a hotspot can never drift out of the poster's shape.
 */

export interface Hotspot {
  /** Route slug — /psas/<slug>. */
  readonly slug: string;
  /** Full poster title. Becomes the anchor's accessible name (§4.3). */
  readonly title: string;
  /** Left edge, % of composite width. */
  readonly x: number;
  /** Top edge, % of composite height. */
  readonly y: number;
  /** Width, % of composite width. Height derives from 4:5. */
  readonly w: number;
}

/** Art-directed source → hotspots. The portrait is an INDEPENDENT arrangement,
 *  never a crop of the wide master (§4.1) — hence two separate coordinate sets. */
export const placementHub = {
  wide: [
${POSTERS.map((p, i) => {
  const s = HOTSPOTS.wide[i];
  return `    { slug: '${p.slug}', title: ${JSON.stringify(p.title)}, x: ${s.x}, y: ${s.y}, w: ${s.w} },`;
}).join('\n')}
  ],
  portrait: [
${POSTERS.map((p, i) => {
  const s = HOTSPOTS.portrait[i];
  return `    { slug: '${p.slug}', title: ${JSON.stringify(p.title)}, x: ${s.x}, y: ${s.y}, w: ${s.w} },`;
}).join('\n')}
  ],
} as const satisfies Record<'wide' | 'portrait', readonly Hotspot[]>;

/** Composite aspect ratios — reserve these to prevent layout shift (§11). */
export const compositeAspect = {
  wide: { w: 3200, h: 1800 },
  portrait: { w: 1350, h: 2400 },
} as const;

/** A hotspot's height in % of composite height, derived from the 4:5 ratio.
 *  Never hand-write a height: a wrong one silently misaligns the click target. */
export function hotspotHeight(w: number, source: 'wide' | 'portrait'): number {
  const a = compositeAspect[source];
  return ((w / 100) * a.w * 1.25 * 100) / a.h;
}
`;

writeFileSync('src/content/placement-hub.ts', ts);

console.log(`
  placeholders written → ${OUT}/
    hero-wide.jpg              3200 × 1800   subject zone marked
    hero-portrait.jpg          1350 × 2400   subject zone marked
    placement-hub-wide.jpg     3200 × 1800   5 × 4:5 frames
    placement-hub-portrait.jpg 1350 × 2400   5 × 4:5 frames (independent arrangement)

  hotspots written  → src/content/placement-hub.ts

  These are TOKEN-ONLY stand-ins (specs.md §3.1). Gate G14 fails the production
  build while any of them is still referenced.
`);
