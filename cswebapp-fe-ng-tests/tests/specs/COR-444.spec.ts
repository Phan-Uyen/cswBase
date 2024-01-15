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

test.beforeAll(async ({ }, testInfo) => {
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

test("90141 - Depth To in drill hole view tab are changed when the user re-loads page many times @drillhole", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //set timeout 
  test.setTimeout(300000);

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

  //expect the backouground of WINU0725 drillhole is correctly displayed
  await test.step(`Expect the backouground of WINU0725 drillhole is correctly displayed`, async () => {
    expect(
      await page.$eval(
        dashBoardPage.detailRow,
        (e) => getComputedStyle(e).backgroundColor
      )
    ).toBe("rgb(108, 195, 81)");
  });

  //user clicks on drill hole view tab 
  await test.step(`User clicks on drill hole view tab`, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(5000);
  });

  //getting url and compare url 
  await test.step(`User gets url and compare url `, async () => {
    const getUrlFirst = await page.url();
    await drillHoleView.pause(2000);
    await expect(getUrlFirst).toContain(`${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=51.5&depthTo=527.4&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]&hsi=`);
    await drillHoleView.pause(3000);
  });

  //load page and get url to compare
  await test.step(`Load page and get url to compare `, async () => {
    await page.reload();
    const getUrlSecond = await page.url();
    await drillHoleView.pause(2000);
    await expect(getUrlSecond).toContain(`${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=51.5&depthTo=527.4&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]&hsi=`);

  });
});















