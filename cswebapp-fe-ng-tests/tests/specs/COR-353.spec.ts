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
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=22BSRC034&product=internal_depthscale_left,JA0668_22BSRC034_mos-img-rgb-25u-ss;JA0668_22BSRC034_log-label-id,JA0668_22BSRC034_log-assay-Au-ppm,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=0.9873453431010337&depthTo=1.4752128226102934&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false,%22graphType%22:%22Graphic%20display%22,%22showDataValues%22:true,%22showScale%22:false,%22showScaleGrid%22:false,%22binningMode%22:%22none%22,%22mergeIdenticalFields%22:true},{%22is3D%22:false,%22graphType%22:%22Graphic%20display%22,%22showDataValues%22:true,%22showScale%22:false,%22showScaleGrid%22:false,%22binningMode%22:%22none%22,%22mergeIdenticalFields%22:true},{%22is3D%22:false}]`;
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
  await loginPage.pause(4000);
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

test("COR-353 - Coreshed FE not displaying proper log panel @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);
  drillHoleView.reloadPage()
  await drillHoleView.pause(4000);

  //user click on add panel button 
  await test.step(`User clicks on add panel button`, async () => {
    await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    await drillHoleView.pause(2000);
  });

  //expect the list elements is correctly displayed 
  await test.step(`Expect the list elements is correctly displayed`, async () => {
    //verify the au-ppm category is displayed
    await drillHoleView.waitForElement(drillHoleView.dynamiclogAuPpmCategory("5"), "visible", 2000)
    //verify the edit mode is not displayed 
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("5"));
    await drillHoleView.pause(2000);
    await drillHoleView.countElement(drillHoleView.editModeText, 0);
    await drillHoleView.pause(2000);
  });



});
