// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || '';

dotenv.config({
  path: path.resolve(
    __dirname,
    ENV ? `.env.${ENV}` : '.env'
  ),
});

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],

    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],

    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
      },
    ],
  ],

  use: {
    baseURL: 'https://demoqa.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Firefox can be enabled later
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // WebKit can be enabled later
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});