import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
const depthFrom = "20.13895077089982";
const depthTo = "20.93184927089982";
let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=JREP229-DLC18768-250nm-GT&product=internal_depthscale_left,JA0624_JREP229-DLC18768-250NM-GT_mos-img-rgb-50u-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-rbl-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-pos-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-rqd-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-ori-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-rbl-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-frc-dh,JA0624_JREP229-DLC18768-250NM-GT_mos-img-gtc-adv-hmp-dh;JA0624_JREP229-DLC18768-250NM-GT_mos-vec-gtc-adv-frc-dh,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=${depthFrom}&depthTo=${depthTo}&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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
  // await browser.close();
});

test("26964 - Stack panel mineral highlighting @test1", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user clicks on "UnzoomAll" option 
  await test.step(`User clicks on "UnzoomAll" option `, async () => {
    await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
    await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
    for (let i = 0; i < 5; i++) {
      console.log('count ', i)
      await drillHoleView.mouseMove(100, 700);
      await drillHoleView.pause(2000);
      await page.mouse.wheel(0, 100);
      await drillHoleView.pause(1000);
    }
  });

  //user clicks on "Zoomout" option 
  await test.step(`User zoom out on screen`, async () => {
    await drillHoleView.pause(5000);
    for (let i = 0; i < 4; i++) {
      await drillHoleView.mouseMove(100, 700);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
  });

  //user ctrl + shift + moveMouse on screen
  await test.step(`User ctrl + shift + moveMouse on screen`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.mouseMove(500, 400);
    await drillHoleView.pause(2000);
  });

  //snapshot and compare image
  await test.step(`Snapshot and compare image`, async () => {
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

