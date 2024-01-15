import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page";
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

test("53241- Browser refresh does not work on Core Tray View @coreTrayView", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user search LM-13-01 drillhole 
  await test.step(`User search LM-13-01 drillhole `, async () => {
    await dashBoardPage.fillToElement(
      dashBoardPage.searchDrillHoleInput,
      "LM-13-01"
    );
  });

  //expect the LM-13-01 drillhole is displayed
  await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.drillHoleSearchResult("LM-13-01"),
      "visible",
      300000
    )

  });

  //user clicks on LM-13-01 drillhole 
  await test.step(`User clicks on LM-13-01 drillhole `, async () => {
    await dashBoardPage.clickToElement(
      dashBoardPage.drillHoleSearchResult("LM-13-01")
    );
  });

  //expect the backouground of WINU0725 drillhole is correctly displayed
  await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
    expect(
      await page.$eval(
        dashBoardPage.detailRow,
        (e) => getComputedStyle(e).backgroundColor
      )
    ).toBe("rgb(108, 195, 81)");
  });

  //user clicks on core tray view tab 
  await test.step(`User clicks on core tray view tab `, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(10000);
  });

  //expect "Core Tray View" is correctly displayed 
  await test.step(`User clicks on core tray view tab `, async () => {
    await coreTrayView.countElement(drillHoleView.dynamicValuePanel(), 1)
    await coreTrayView.waitForElement(
      coreTrayView.footerErrTextStatus,
      "hidden",
      300000
    )
  });

  //reload page "Core Tray View" page and expect "Core Tray View" is correctly displayed
  await test.step(`Reload page "Core Tray View" page and expect "Core Tray View" is correctly displayed`, async () => {
    await page.reload();
    await coreTrayView.pause(2000);
    await coreTrayView.countElement(drillHoleView.dynamicValuePanel(), 1)
    await coreTrayView.waitForElement(
      coreTrayView.footerErrTextStatus,
      "hidden",
      300000
    )
  });
});

