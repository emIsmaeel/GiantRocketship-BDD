import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as dotenv from 'dotenv';

dotenv.config();

const testDir = defineBddConfig({
    importTestFrom: 'src/fixtures/fixtures.ts',
    paths: ['./src/features/contactUs.feature'],
    require: ['./src/steps/contactUs.ts'],
});

export default defineConfig({
    testDir,
    reporter: [
        ["html", { open: false }],
        [
            'allure-playwright',
            {
                detail: true,
                outputFolder: 'allure-results',
                suiteTitle: false,
            },
        ],
    ],
    timeout: 60000,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 10000,
        navigationTimeout: 30000,
        video: "on",
        screenshot: "on",
        contextOptions: {
            recordVideo: {
                dir: "./test-results/videos",
            },
        },
    },

    projects: [
        {
            name: 'GiantRocketship',
            use: { 
                ...devices['Desktop Chrome'],
                headless: true,
            },
        },
    ],
});
