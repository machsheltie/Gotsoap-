/**
 * shop-assets.ts — the one slug → image binding for the faux shop.
 *
 * Sources are the CLEANED masters in assets/shop/web/ (generation artifact
 * removed by scripts/prep-shop-assets.mjs) — never the owner originals in
 * assets/shop/. Both shop pages import THIS map, so a product image can't
 * drift between the grid and its detail page. Keys must match
 * copy.ts shop.products[].slug; the pages throw at build if one is missing.
 */
import type { ImageMetadata } from 'astro';
import soap from '../assets/shop/web/soap.png';
import gotSoapTee from '../assets/shop/web/got-soap-tee.png';
import cleanSexyTee from '../assets/shop/web/clean-sexy-tee.png';
import hat from '../assets/shop/web/hat.png';
import effortBottle from '../assets/shop/web/effort-bottle.png';

export const SHOP_IMAGES: Record<string, ImageMetadata> = {
  soap,
  'got-soap-tee': gotSoapTee,
  'clean-sexy-tee': cleanSexyTee,
  hat,
  'effort-bottle': effortBottle,
};
