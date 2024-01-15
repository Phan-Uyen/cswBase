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
let urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=22BSRC034&product=internal_depthscale_left,JA0668_22BSRC034_mos-img-rgb-25u-ss;JA0668_22BSRC034_log-label-id,JA0668_22BSRC034_log-assay-Au-ppm,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=0.9873453431010337&depthTo=1.4752128226102934&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false,%22graphType%22:%22Graphic%20display%22,%22showDataValues%22:true,%22showScale%22:false,%22showScaleGrid%22:false,%22binningMode%22:%22none%22,%22mergeIdenticalFields%22:true},{%22is3D%22:false,%22graphType%22:%22Graphic%20display%22,%22showDataValues%22:true,%22showScale%22:false,%22showScaleGrid%22:false,%22binningMode%22:%22none%22,%22mergeIdenticalFields%22:true},{%22is3D%22:false}]`;
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

test.beforeAll(async ({ }, testInfo) => {
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
  await dashBoardPage.waitForElement(
    dashBoardPage.logo,
    "visible",
    300000
  )
});

test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  await browser.close();
});

test("39494 - Core photogarphy panel isn't created @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user opens url 
    await dashBoardPage.pause(3000);
    await dashBoardPage.openBrowser(urlInput);
    await dashBoardPage.pause(5000);

    //user ctrl + hover + mouseMove on screen
    await test.step(`User ctrl + hover + mouseMove on screen`, async () => {
    await drillHoleView.clickMouse(500,400);
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.mouseMove(360, 300);
      await drillHoleView.pause(2000);
      await drillHoleView.mouseMove(460,500);
      await drillHoleView.pause(5000);
    });

    //expect the count of range is correctly displayed
    await test.step(`Expect the count of range is correctly displayed`, async () => {
      await drillHoleView.pause(2000);
      await drillHoleView.countElement(drillHoleView.dynamicRangeValue('Range'), 1);
      await drillHoleView.pause(2000);
    });
});
