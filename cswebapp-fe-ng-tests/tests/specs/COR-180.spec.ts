import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
const baseURL = "https://dev-react-aws.coreshed.com";
let userName: any;
let password: any;
if (process.env.NODE_ENV === "PROD") {
  userName = process.env.USERNAME_PROD;
  password = process.env.PASSWORD_PROD;
} else {
  userName = process.env.USERNAME_DEV;
  password = process.env.PASSWORD_DEV;
}
let page: Page;
let loginPage: LoginPage;
let loginPage2: LoginPage;
let dashBoardPage: DashBoardPage;
let drillHoleView: DrillHoleViewPage;
let dashBoardPage2: DashBoardPage;
let drillHoleView2: DrillHoleViewPage;
let page1: Page;
let page2: Page;
let browserContext: BrowserContext;
test.beforeAll(async ({ }, testInfo) => {
  const browser = await chromium.launch();
  // page = await browser.newPage();
  browserContext = await browser.newContext();
  page1 = await browserContext.newPage();
  page2 = await browserContext.newPage();
  loginPage = new LoginPage(page1);
  loginPage2 = new LoginPage(page2);
  dashBoardPage = new DashBoardPage(page1);
  dashBoardPage2 = new DashBoardPage(page2);
  drillHoleView = new DrillHoleViewPage(page1);
  drillHoleView2 = new DrillHoleViewPage(page2);
});

test.beforeEach(async ({ }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  await loginPage.openBrowser('/');
  await loginPage.fillToElement(loginPage.userNameInput, userName);
  await loginPage.fillToElement(loginPage.passwordInput, password);
  await loginPage.clickToElement(loginPage.signInInput);
  await loginPage.pause(4000);
  await dashBoardPage.waitForElement(
    dashBoardPage.logo,
    "visible",
    300000
  )
});

test.afterEach(async ({ browser }) => {
  await page1.evaluate(() => window.localStorage.clear());
  await page1.evaluate(() => window.sessionStorage.clear());
  await page1.reload();
  await browser.close();
});

test("39278 - Coreshed Hi Def option in URL link @drillhole", async ({ }, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //bring to front
  await test.step(`Bring to front `, async () => {
    await page1.bringToFront();
  });

  //go to url 
    await test.step(`Go to Url`, async () => {
      await page1.goto('/');
    });

  //user search WINU0725 drillhole 
  await test.step(`User search WINU0725 drillhole `, async () => {
    await dashBoardPage.fillToElement(
      dashBoardPage.searchDrillHoleInput,
      "WINU0725"
    );
  });

  //expect the WINU0725 drillhole is displayed
  await test.step(`Expect the WINU0725 drillhole is displayed`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.drillHoleSearchResult("WINU0725"),
      "visible",
      300000
    )
  });

  //user clicks on WINU0725 drillhole 
  await test.step(`User clicks on WINU0725 drillhole `, async () => {
    await dashBoardPage.clickToElement(
      dashBoardPage.drillHoleSearchResult("WINU0725")
    );
  });

  //user clicks on drillhole view tab 
  await test.step(`User clicks on drillhole view tab `, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(10000);
  });

  //use ticks in high-definition checkbox 
  await test.step(`User ticks in high-definition checkbox `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
    await drillHoleView.clickToElement(drillHoleView.highDefinitionUnchecked);
    await drillHoleView.pause(2000);
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
    await drillHoleView.pause(2000);
  });

  //user copies url and paste to another tab 
  await test.step(`User copies url and paste to another tab `, async () => {
    const getUrl = page1.url();
    console.log(getUrl);
    await page2.bringToFront();
    await page2.goto(getUrl);
    await drillHoleView2.pause(3000);
  });

  //user snapshot and compare image
  await test.step(`User snapshot and compare image`, async () => {
    await drillHoleView2.pause(8000);
    await testInfo.attach("unlock", {
      body: await page2.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView2.pause(8000);
    await drillHoleView2.imageComparisons();
    await drillHoleView2.pause(2000);
  });

  //user accesses item menu and verify hight definition is ticked
  await test.step(`User accesses item menu and verify hight definition is ticked`, async () => {
    await drillHoleView2.clickToElement(drillHoleView2.dynamicItemMenu("1"));
    expect(dashBoardPage2.logo).toBeDefined();
    await drillHoleView2.waitForElement(
      drillHoleView2.highDefinitionChecked,
      "visible",
      3000
    );

  });
});
