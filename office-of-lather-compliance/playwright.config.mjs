import { defineConfig } from '@playwright/test';

// BASE_URL points the suite at a deployed origin (Task 7) without editing this file.
const LOCAL = 'http://127.0.0.1:4317';
const baseURL = process.env.BASE_URL ?? LOCAL;

export default defineConfig({
  testDir: 'tests',
  workers: 1,
  fullyParallel: false,
  retries: 0,
  use: { baseURL, browserName: 'chromium' },
  projects: [
    { name: 'e2e', testMatch: 'page.spec.mjs' },
    { name: 'renders', testMatch: 'renders.spec.mjs' },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'node scripts/serve.mjs', url: LOCAL, reuseExistingServer: false },
});
