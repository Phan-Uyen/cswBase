import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=LM-13-01,WINU0725&product=internal_depthscale_left,JA0492_LM-13-01_mos-img-rgb-50u-ss;JA0492_LM-13-01_mos-img-prf-gry-200u-ss,JA0492_LM-13-01_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=96.4082400000918&depthTo=103.784400000099&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]&hsi=`;
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
let dashBoardPage: DashBoardPage;
let drillHoleView: DrillHoleViewPage;

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  drillHoleView = new DrillHoleViewPage(page);
});

test.beforeEach(async ({ }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  await loginPage.openBrowser('/');
  await loginPage.fillToElement(loginPage.userNameInput, userName);
  await loginPage.fillToElement(loginPage.passwordInput, password);
  await loginPage.clickToElement(loginPage.signInInput);
  await dashBoardPage.pause(3000);
  await dashBoardPage.waitForElement(
    dashBoardPage.logo,
    "visible",
    300000
  )
  await dashBoardPage.openBrowser(urlInput);
});

test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  await browser.close();
});

test("COR-292 - Stacked Mineral Highlighting Multiple Depth Rows with different values @drillhole @viewPanel", async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user ctr+ hover + mouseMove on screen 
    await test.step(`User ctr+ hover + mouseMove on screen `, async () => {
      await drillHoleView.clickMouse(500, 400);
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.mouseMove(400, 500);
      await drillHoleView.pause(2000);
      await drillHoleView.mouseMove(500, 450);
      await drillHoleView.pause(4000);
    });

    //expect depth beetween multiple rows to have the same value
    await test.step(`Expect depth beetween multiple rows to have the same value`, async () => {
      await drillHoleView.countElement(drillHoleView.dynamicValueDepth('324'), 2);
      await drillHoleView.pause(4000);
    });

    //user snapshot and compare image
    await test.step(`User snapshot and compare image`, async () => {
        await drillHoleView.pause(8000);
        await testInfo.attach("unlock", {
          body: await page.screenshot(),
          contentType: "image/png",
        });
        await drillHoleView.pause(4000);
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
      });
});
