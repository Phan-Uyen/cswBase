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
let userName: any;
let password: any;
if (process.env.NODE_ENV === "PROD") {
  userName = process.env.USERNAME_PROD;
  password = process.env.PASSWORD_PROD;
} else {
  userName = process.env.USERNAME_DEV;
  password = process.env.PASSWORD_DEV;
}
const depthFrom = "91.1047200000867";
const depthTo = "101.498400000097";
const urlInput =`${baseURL}/cswebapp/dhviewer?drillhole=LM-13-01&product=internal_depthscale_left,JA0492_LM-13-01_mos-img-rgb-50u-ss;JA0492_LM-13-01_mos-img-prf-gry-200u-ss,JA0492_LM-13-01_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=91.1047200000867&depthTo=101.498400000097&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;

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
  await loginPage.pause(4000)
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

test("26965 - ctrl+shift+hover on multiple panels does not pop up context dialogs on all columns @drillhole @viewPanel", async ({}, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user select unzoom option 
    await test.step(`User select unzoom option`, async () => {
      await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
      await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
      for (let i = 0; i < 5; i++) {
        console.log('count ', i)
        await drillHoleView.pause(1000);
        await page.mouse.wheel(0, 100);
        await drillHoleView.pause(1000);
      }
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image `, async () => {
      await drillHoleView.imageComparisons();
    });

    //user selects zoom out option  
    await test.step(`User selects zoom out option`, async () => {
      await drillHoleView.pause(5000);
      for (let i = 0; i < 7; i++) {
        await drillHoleView.mouseMove(100, 200);
        await drillHoleView.pause(1000);
        await page.mouse.wheel(0, -50);
        await drillHoleView.pause(1000);
        }
        await drillHoleView.pause(5000);
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image `, async () => {
      await drillHoleView.imageComparisons();
    });

    //user ctrl + hover+ mouseMove on screen
    await test.step(`User ctrl + hover+ mouseMove on screen`, async () => {
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.mouseMove(260, 230);
      await drillHoleView.pause(2000);
      await drillHoleView.mouseMove(360, 400);
    });

    //Expect the count of element is correctly displayed
    await test.step(`Expect the count of element is correctly displayed`, async () => {
      await drillHoleView.pause(2000);
      await drillHoleView.countElement(drillHoleView.dynamicValueCommonSection('Depth'), 2);
    });  
});

