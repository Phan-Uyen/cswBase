import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
const depthFrom = "87.52";
const depthTo = "446.615";
let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss;JA0480_WINU0725_log-bnd-sp-1800-1500-btt-mg-ss;JA0480_WINU0725_log-sm-btt-ss;JA0480_WINU0725_log-sm-chr-ss;JA0480_WINU0725_log-sm-chl-ss,JA0480_WINU0725_log-sm-chl-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=${depthFrom}&depthTo=${depthTo}&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false},{%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false},{%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false},{%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false},{%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false},{%22is3D%22:false}]`;

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
  // await browser.close();
});

test("COR-280 - Preserve Stacked Panel Mineral Highlighting Legacy behavior and improve formatting @drillhole @viewPanel", async ({}, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

 //user selects unzoom all option 
  await test.step(`User selects unzoom all option`, async () => {
    await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
    await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
    for (let i = 0; i < 5; i++) {
        console.log('count ', i)
        await drillHoleView.pause(2000);
        await page.mouse.wheel(0, 100);
        await drillHoleView.pause(5000);
      }
  });

  //user snapshot and compare image
   await test.step(`User snapshot and compare image`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.imageComparisons();
  });

  //user selects zoom out option
   await test.step(`User selects zoom out option`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.mouseMove(100, 200);
    for (let i = 0; i < 12; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
  });

  //user ctr+shift + mouseMove on screen 
   await test.step(`User ctr+shift + mouseMove on screen`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.reloadPage();
    await drillHoleView.pause(20000);
    await drillHoleView.mouseMove(550, 280);
    await drillHoleView.pause(5000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.mouseMove(320, 280);
    await drillHoleView.pause(5000);
  });

  //user snapshot and compare image  
   await test.step(`User snapshot and compare image  `, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
    
  });
  
});

