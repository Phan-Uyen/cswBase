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

test("84665 - Mineral Map option should not display when a product has an empty colour lookup table @drillhole @viewPanel", async ({ }, testInfo) => {
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

  //expect the backouground of LM-13-01 drillhole is correctly displayed
  await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
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

  //user clicks on "Menu list" dropdown 
  await test.step(`User clicks on "Menu list" dropdown `, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(3000);
  });

  //expect mineral checkbox isn't displayed when the colour lookup table is empty
  await test.step(`Expect mineral checkbox isn't displayed when the colour lookup table is empty`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.midleUncheckedMineralMap,
      "hidden",
      300000
    )
  });

  //user selects category 
  await test.step(`User selects category`, async () => {
    await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
    await drillHoleView.pause(2000);
    await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType("Mineralogy"));
    await drillHoleView.pause(2000);
  });

  //user clicks on "Menu list" dropdown 
  await test.step(`User clicks on "menu list" dropdown`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(3000);
  });

  //expect mineral checkbox is displayed when the colour lookup table isn't empty
  await test.step(`Expect mineral checkbox is displayed when the colour lookup table isn't empty`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.midleUncheckedMineralMap,
      "visible",
      300000
    )
  });

  //Expect user backs to dashboard page
  await test.step(`Expect user backs to dashboard page`, async () => {
    await dashBoardPage.clickToElement(dashBoardPage.dashboardTitle);
    await dashBoardPage.pause(2000);
  });

  //user accesses "Code Tray View" tab
  await test.step(`User accesses "Code Tray View" tabe`, async () => {
    await coreTrayView.clickToElement(coreTrayView.coreTrayViewTab);
    await coreTrayView.pause(3000);
  });

  //user clicks on "Menu items" dropdown at core tray view
  await test.step(`user clicks on "Menu items" dropdown at core tray view`, async () => {
    await coreTrayView.clickToElement(coreTrayView.dynamicItemproducType('0'));
    await coreTrayView.pause(2000);
  });

  //expect mineral checkbox is not displayed
  await test.step(`expect mineral checkbox is not displayed`, async () => {
    await coreTrayView.waitForElement(
      coreTrayView.uncheckedMineralMap,
      "hidden",
      30000
    )
  });
});



