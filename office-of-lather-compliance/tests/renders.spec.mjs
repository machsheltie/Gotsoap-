import { test } from '@playwright/test';

const SIZES = { desktop: { width: 1280, height: 800 }, mobile: { width: 390, height: 844 } };
const out = (name) => `renders/${name}.png`;

for (const [size, viewport] of Object.entries(SIZES)) {
  test(`renders at ${size}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport });
    const shot = async (page, name) => page.screenshot({ path: out(`${name}-${size}`), fullPage: true });
    // Presentation only: fixed clocks so First and Secondary Contact visibly differ.
    const p1 = await ctx.newPage();
    await p1.clock.setFixedTime(new Date(2026, 8, 24, 22, 41, 7));
    await p1.goto('/');
    await shot(p1, '1-first-access');
    await p1.reload();
    await shot(p1, '2-refresh-denied');
    const p2 = await ctx.newPage();
    await p2.clock.setFixedTime(new Date(2026, 8, 29, 14, 7, 32));
    await p2.goto('/');
    await shot(p2, '3-repeat-access');
    const p3 = await ctx.newPage();
    await p3.clock.setFixedTime(new Date(2026, 9, 2, 9, 15, 48));
    await p3.goto('/');
    await shot(p3, '4-continued-interest');
    await ctx.close();

    const blocked = await browser.newContext({ viewport, javaScriptEnabled: false });
    const pf = await blocked.newPage();
    await pf.goto('/');
    await shot(pf, '5-fallback');
    await blocked.close();
  });
}
