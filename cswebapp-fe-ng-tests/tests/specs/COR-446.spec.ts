import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page";
let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
let urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss,JA0480_WINU0725_mos-img-prf-gry-200u-ss,JA0480_WINU0725_log-sm-btt-25cm,JA0480_WINU0725_log-bnd-sp-1900B-2200B-ser-25cm,JA0480_WINU0725_log-sm-crb-fe-25cm,JA0480_WINU0725_log-sm-chr-25cm,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=51.5&depthTo=527.5&panelState=%5B%7B%22is3D%22:false%7D,%7B%22is3D%22:false%7D,%7B%22is3D%22:false%7D,%7B%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false%7D,%7B%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false%7D,%7B%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false%7D,%7B%22is3D%22:false,%22graphType%22:%22Bar%20graph%22,%22showDataValues%22:false,%22showScale%22:true,%22showScaleGrid%22:true,%22binningMode%22:%22max%22,%22mergeIdenticalFields%22:false%7D,%7B%22is3D%22:false%7D%5D&minColor=%23524997`; 

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
let coreTrayView: CoreTrayViewPage;

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  drillHoleView = new DrillHoleViewPage(page);
  coreTrayView = new CoreTrayViewPage(page)
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

test("90050 - Can't load URL @dashboard", async ({}, testInfo) => {
//set timeout 
    test.setTimeout(300000);

  //user opens url 
  await test.step(`User opens url`, async () => {
    await dashBoardPage.openBrowser(urlInput);
    await dashBoardPage.pause(5000);
  });
    
  //user snapshot and compare image 
  await test.step(`User snapshot and compare image`, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  
  });

  

});



