import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { ENV } from './src/utils/env';

const testDir = defineBddConfig({
  importTestFrom: './src/fixtures/fixtures',
  paths: ['./src/features/**/*.feature'],
  require: ['./src/steps/**/*.ts'],
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  retries: ENV.CI ? 2 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      { detail: true, outputFolder: 'allure-results', suiteTitle: false }
    ],
  ],
  timeout: 60_000,
  use: {
    headless: ENV.CI || ENV.HEADLESS,
    baseURL: ENV.BASE_URL,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      recordVideo: { dir: './test-results/videos' },
    },
  },
  projects: [
    {
      name: 'GiantRocketship',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
