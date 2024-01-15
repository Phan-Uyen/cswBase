import type { FullConfig } from '@playwright/test';
import { chromium } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
 
  // await page.context().storageState({ path: storageState as string });
  // await browser.close();
}

export default globalSetup;
