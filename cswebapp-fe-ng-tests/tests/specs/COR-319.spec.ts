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
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-hsi-660-560-468-500u-ss;JA0480_WINU0725_mos-img-prf-gry-200u-ss,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=246.24700060860596&depthTo=248.24507208187885&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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

test("39553 - Switching products in a rear panel stops rear panel from processing navigation events @drillhole @viewPanel @unstable", async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //expect two panels are switched to 3D Mode
    await test.step(`Expect two panels are switched to 3D Mode`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("2"));
      await drillHoleView.clickToElement(drillHoleView.switchTo3DMode);
      await dashBoardPage.pause(2000);
  
      await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
      await drillHoleView.clickToElement(drillHoleView.switchTo3DMode);
      await dashBoardPage.pause(2000);
    });
  
    //user ctrl + hover + mouseMove when panel 1 is True colour
    await test.step(`user ctrl + hover + mouseMove when panel 1 is True colour`, async () => {
      await drillHoleView.mouseMove(500, 600);
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.pause(5000);
      await drillHoleView.mouseDown();
      await drillHoleView.pause(5000);
      await drillHoleView.mouseMove(400, 500);
      await drillHoleView.pause(5000);
  
    });

    //usersnapshot and compare image
    await test.step(`user snapshot and compare image`, async () => {
      //snapshot when ctrl+hover 
      await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
      });
      await drillHoleView.imageComparisons();
      await drillHoleView.pause(5000);
      await drillHoleView.reloadPage();
  
    });
  
    //change panel 1 from True colour to False colour 
    await test.step(`Change panel 1 from True colour to False colour `, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'));
      await drillHoleView.pause(5000);
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('False colour spectral image'));
      await drillHoleView.pause(5000);
      await drillHoleView.reloadPage();
    });
  
     //user ctrl + hover after panel 1 switch from Tru colour to False colourusersnapshot and compare image
     await test.step(`User ctrl + hover after panel 1 switch from Tru colour to False colourusersnapshot and compare image`, async () => {
      await drillHoleView.mouseMove(500, 600);
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.pause(5000);
      await drillHoleView.mouseDown();
      await drillHoleView.pause(5000);
      await drillHoleView.mouseMove(400, 500);
      await drillHoleView.pause(5000);
    });

    //user snapshot and compare image
    await test.step(`user snapshot and compare image`, async () => {
      await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
      });
      await drillHoleView.imageComparisons();
    });

});
