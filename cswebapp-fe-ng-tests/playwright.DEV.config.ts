import type { PlaywrightTestConfig } from "@playwright/test";
require('dotenv').config()
let baseURL : any 
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  retries: 2,
  use: {
    headless: false,
    // viewport: { width: 1280, height: 1080 },
    viewport: { width: 1920, height: 1080 },
    baseURL: baseURL,
    // storageState: "state.json",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 60000,
    navigationTimeout: 120000,
    // permissions: ["clipboard-read"],
    launchOptions: {
      args: ["--start-maximized"],
    },
    contextOptions: {
      permissions: ["clipboard-read", "clipboard-write",],
    },
  },
  fullyParallel: true,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 60000,
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      maxDiffPixels: 120000,
    },

    toMatchSnapshot: {
      // An acceptable ratio of pixels that are different to the total amount of pixels, between 0 and 1.
      maxDiffPixelRatio: 0.8,
    },
  },
  workers: 6,
  reporter: [
    ["list", { printSteps: true }],
    ["line"],
    ["dot"],
    ["html", { open: "never" }],
    ["junit", { outputFile: "junit/results.xml" }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "report",
        suiteTitle: true,
      },
    ],
  ],
  globalSetup: require.resolve("./tests/hook/globalSetup.ts"),
};

export default config;
