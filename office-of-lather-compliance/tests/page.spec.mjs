import { test, expect } from '@playwright/test';

const h1 = (page) => page.locator('h1');
const main = (page) => page.locator('main');
const FALLBACK_H1 = 'NOTICE OF ADMINISTRATIVE CONTAINMENT';

async function expectFallback(page) {
  await expect(h1(page)).toHaveText(FALLBACK_H1);
  await expect(main(page)).toContainText('Please remain available.');
  await expect(main(page)).not.toContainText('A log entry has been created.');
  await expect(main(page)).not.toContainText('RECORDING');
  await expect(main(page)).toBeVisible();
}

test('progression follows the session marker; count is every access', async ({ context }) => {
  const p1 = await context.newPage();
  await p1.goto('/');
  await expect(h1(p1)).toHaveText('NOTICE OF ADMINISTRATIVE CONTAINMENT');
  await expect(main(p1)).toContainText('A log entry has been created.');
  await p1.reload();
  await expect(h1(p1)).toHaveText('REFRESH REQUEST DENIED');

  const p2 = await context.newPage();                  // no opener: fresh sessionStorage
  await p2.goto('/records/1961/a?x=1');
  await expect(h1(p2)).toHaveText('NOTICE OF REPEAT ACCESS');
  await expect(main(p2)).toContainText(/Terminal ID: LC-[0-9A-F]{4}-8804/);
  await expect(main(p2)).toContainText(/First Contact: \d{4}-\d\d-\d\d \d\d:\d\d:\d\d/);
  await p2.reload();
  await expect(h1(p2)).toHaveText('REFRESH REQUEST DENIED');

  const p3 = await context.newPage();
  await p3.goto('/');
  await expect(h1(p3)).toHaveText('NOTICE OF CONTINUED INTEREST');
  await expect(main(p3)).toContainText('You have accessed this resource 5 times.');
  await p3.reload();
  await expect(h1(p3)).toHaveText('NOTICE OF CONTINUED INTEREST');
  await expect(main(p3)).toContainText('You have accessed this resource 6 times.');
});

test('the marker decides, not the tab', async ({ context }) => {
  const p1 = await context.newPage();
  await p1.goto('/');
  const [popup] = await Promise.all([p1.waitForEvent('popup'), p1.evaluate(() => { window.open('/', '_blank'); })]);
  await popup.waitForLoadState();
  const openerId = JSON.parse(await p1.evaluate(() => sessionStorage.getItem('olc.visit.v1'))).sessionId;
  const popupId = JSON.parse(await popup.evaluate(() => sessionStorage.getItem('olc.visit.v1'))).sessionId;
  const expected = openerId === popupId ? 'REFRESH REQUEST DENIED' : 'NOTICE OF REPEAT ACCESS';
  await expect(h1(popup)).toHaveText(expected);
});

test('a different browser profile starts at first access', async ({ browser }) => {
  const a = await browser.newContext();
  await (await a.newPage()).goto('/');
  const b = await browser.newContext();
  const page = await b.newPage();
  await page.goto('/');
  await expect(main(page)).toContainText('A log entry has been created.');
  await a.close(); await b.close();
});

test('JavaScript disabled shows the fallback', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto('/');
  await expectFallback(page);
  await ctx.close();
});

for (const [name, script] of [
  ['writes throw', () => { Storage.prototype.setItem = () => { throw new DOMException('denied', 'SecurityError'); }; }],
  ['reads throw', () => { Storage.prototype.getItem = () => { throw new DOMException('denied', 'SecurityError'); }; }],
  ['sessionStorage unavailable', () => { Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('denied', 'SecurityError'); } }); }],
]) {
  test(`storage failure (${name}) shows the fallback`, async ({ page }) => {
    await page.addInitScript(script);
    await page.goto('/');
    await expectFallback(page);
  });
}

test('blocked body script reveals the fallback', async ({ page }) => {
  await page.route('**/*', async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    headers['content-security-policy'] = headers['content-security-policy'].replace(/(script-src '[^']+') '[^']+'/, '$1');
    await route.fulfill({ response, headers });
  });
  await page.goto('/');
  await expectFallback(page);
});

test('a returning browser never paints the wrong notice', async ({ context }) => {
  const first = await context.newPage();
  await first.goto('/');
  const page = await context.newPage();
  await page.addInitScript(() => {
    window.__frames = [];
    const sample = () => {
      const m = document.querySelector('main');
      if (m) window.__frames.push({ hidden: getComputedStyle(m).visibility === 'hidden', text: m.textContent });
      if (window.__frames.length < 60) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto('/');
  await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
  const frames = await page.evaluate(() => window.__frames);
  for (const f of frames.filter((x) => !x.hidden)) {
    expect(f.text).not.toContain('NOTICE OF ADMINISTRATIVE CONTAINMENT');
  }
});

test('every path, including file-like ones, is the Office page with 403 and our headers', async ({ request }) => {
  for (const path of ['/', '/a/b/c?x=1', '/index.html', '/index.html?x=1', '/notice.html', '/notice.html?x=1', '/favicon.ico', '/robots.txt', '/.well-known/x']) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(403);
    expect(await res.text()).toContain('<title>OFFICE OF LATHER COMPLIANCE</title>');
    expect(res.headers()['x-robots-tag']).toBe('noindex, nofollow');
    expect(res.headers()['content-security-policy']).toContain("default-src 'none'");
  }
});

test('no requests leave the page, no cookies, no CSP violations', async ({ page, context, baseURL }) => {
  const requests = [];
  const violations = [];
  page.on('request', (r) => requests.push(r.url()));
  page.on('console', (m) => { if (/Content Security Policy/i.test(m.text())) violations.push(m.text()); });
  await page.goto('/deep/path');
  await page.reload();
  // Only the document itself (and the inline data: favicon, if the browser reports it).
  const doc = new URL('/deep/path', baseURL).href;
  expect(requests.every((u) => u.startsWith(doc) || u.startsWith('data:'))).toBe(true);
  expect(await context.cookies()).toEqual([]);
  expect(violations).toEqual([]);
});

test('narrow screen at 200% zoom does not scroll sideways', async ({ context }) => {
  const a = await context.newPage();
  await a.goto('/');
  const page = await context.newPage();
  await page.setViewportSize({ width: 160, height: 640 });   // 320px at 200% zoom
  await page.goto('/');
  await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('accessibility: one heading, timestamps as <time>, no live regions', async ({ context }) => {
  const a = await context.newPage();
  await a.goto('/');
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('main time')).toHaveCount(2);
  await expect(page.locator('[role=status], [role=alert], [aria-live]')).toHaveCount(0);
  await expect(page.locator('main')).toMatchAriaSnapshot(`
    - main:
      - paragraph
      - heading "NOTICE OF REPEAT ACCESS" [level=1]
      - paragraph
      - paragraph
      - paragraph
      - paragraph
  `);
});

test('forced colors keeps text visible', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/');
  const color = await page.locator('h1').evaluate((el) => getComputedStyle(el).color);
  expect(color).not.toBe('rgba(0, 0, 0, 0)');
  await expect(h1(page)).toBeVisible();
});

test('on a phone, administrative tokens never break inside', async ({ browser }) => {
  for (const width of [320, 390]) {
    const context = await browser.newContext();          // fresh profile per width: session 2 each time
    await context.newPage().then((p) => p.goto('/'));
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
    const tokens = await page.locator('.olc-keep').evaluateAll((els) => els.map((e) => ({ text: e.textContent, lines: e.getClientRects().length })));
    expect(tokens.map((t) => t.text)).toContain('Sub-Section 4');
    expect(tokens.length).toBe(6);
    for (const t of tokens) expect(t.lines, `${t.text} at ${width}px`).toBe(1);
    await context.close();
  }
});

test('doubled phone text size (Android text scaling) never scrolls sideways', async ({ browser }) => {
  for (const width of [320, 360, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 800 } });
    await (await ctx.newPage()).goto('/');
    const page = await ctx.newPage();
    await page.addInitScript(() => { document.addEventListener('DOMContentLoaded', () => { document.body.style.fontSize = '32px'; }); });
    await page.goto('/');
    await expect(h1(page)).toHaveText('NOTICE OF REPEAT ACCESS');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${width}px at 2x text`).toBeLessThanOrEqual(0);
    await ctx.close();
  }
});
