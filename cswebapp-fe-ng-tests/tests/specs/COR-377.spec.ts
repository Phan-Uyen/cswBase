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

test("53321- Core Tray Viewer Region / Tray Overlay Viewer @coreTrayview", async ({ }, testInfo) => {
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

  //user accesses "Core Tray View" tab 
  await test.step(`User accesses "Core Tray View" tab `, async () => {
    await coreTrayView.clickToElement(coreTrayView.coreTrayViewTab)
    await coreTrayView.pause(5000);
  });

  //user clicks on item produc type 
  await test.step(`User clicks on item produc type `, async () => {
    await coreTrayView.clickToElement(coreTrayView.dynamicItemproducType('0'));
    await coreTrayView.pause(5000);
  });

  //expect region is displayed and user tick region checkbox 
  await test.step(`Expect region is displayed and user tick region checkbox `, async () => {
    await coreTrayView.waitForElement(
      coreTrayView.uncheckedRegionTray,
      "visible",
      300000
    )
    await coreTrayView.clickToElement(coreTrayView.uncheckedRegionTray);
  });

  //user snapshot and compare image 
  await test.step(`User snapshot adn compare image `, async () => {
    await coreTrayView.pause(5000);
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await coreTrayView.pause(2000);
    await coreTrayView.imageComparisons();
    await coreTrayView.pause(2000);
  });

  //expect the region checkbox is ticked 
  await test.step(`Expect the region checkbox is ticked `, async () => {
    await coreTrayView.clickToElement(coreTrayView.dynamicItemproducType('0'));
    await coreTrayView.waitForElement(
      coreTrayView.checkedRegionTray,
      "visible",
      30000
    )
  });
});

