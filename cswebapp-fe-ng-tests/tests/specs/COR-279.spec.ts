import { test, expect, chromium, Browser, Page } from "@playwright/test";
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
const urlInput = `https://dev-enouvo-aws.coreshed.com/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-clm-phy-gtc-fpx-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=349.8&depthTo=352.3875&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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

  await test.step(`Open site Corescan`, async () => {
    await loginPage.openBrowser('/');
  });

  await test.step(`User enters valid username`, async () => {
    await loginPage.fillToElement(loginPage.userNameInput, userName);
  });

  await test.step(`User enters valid password`, async () => {
    await loginPage.fillToElement(loginPage.passwordInput, password);
  });

  await test.step(`User clicks on Login button`, async () => {
    await loginPage.clickToElement(loginPage.signInInput)
  });

  await test.step(`Expect logo corescan is displayed`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.logo,
      "visible",
      300000
    )
  });
});

test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  // await browser.close();
});

test("27016- Mineral map mineral not showing @drillhole @viewPanel", async ({}, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user opens url 
  await test.step(`User opens url`, async () => {
    await dashBoardPage.openBrowser(urlInput);
    await dashBoardPage.pause(5000)
  });

  //userctrl+shift and move mouse on image of the drillhole 
  await test.step(`User ctrl+shift and move mouse on image of the drillhole User opens url`, async () => {
    await drillHoleView.mouseMove(800, 210);
    await drillHoleView.pause(2000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.pause(5000);
    await drillHoleView.mouseDown();
    await drillHoleView.pause(10000);
    await drillHoleView.mouseMove(995, 215);
    await drillHoleView.pause(10000); 
  });

  //expect the mineral name is correctly displayed
  await test.step(`Expect the mineral name is correctly displayed`, async () => {
    const mineralName = await drillHoleView.dynamicValueMineralName('Biotite and chlorite');
    console.log('Mineral Name ', mineralName);
    await expect(mineralName).toContain('Biotite and chlorite');
    await drillHoleView.pause(5000);
  });

  //user snapshot and compare image 
  await test.step(`User snapshot and compare image `, async () => {
    await drillHoleView.pause(8000);
    await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
    });
    await drillHoleView.pause(8000);
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });
});