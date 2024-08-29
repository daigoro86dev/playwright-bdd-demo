import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = process.env.NO_BDD === "1" ? "tests" : defineBddConfig({
  features: 'features/**/*.feature',
  // steps: ['src/Steps/**/*.ts', 'src/Fixtures/BddFixtures/**/*.ts'],
  steps: ['src/Steps/**/*.ts', 'src/Fixtures/HybridFixtures/**/*.ts'],
});

export default defineConfig({
  testDir: testDir,
  reporter: 'line',
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ]
});