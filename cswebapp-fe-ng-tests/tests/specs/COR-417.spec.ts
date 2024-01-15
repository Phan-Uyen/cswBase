import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";

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

test("72347 - Mineral map name translations do not work when Image Enhancement adjustments are made @drillhole @viewPanel", async ({ }, testInfo) => {
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

  //user selects category 
  await test.step(`User selects category`, async () => {
    await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
    await drillHoleView.pause(2000);
    await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType("Mineralogy"));
    await drillHoleView.pause(2000);
  });

  //user select midle menu dropdown
  await test.step(`User selects midle menu dropdown`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
    await drillHoleView.pause(2000);
  });

  //expect disable the"3D feature"
  await test.step(`Expect disable the 3D feature`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.midleSwitchTo3DModeBtn,
      "hidden",
      300000
    )
  });

  //expect the image enhacement is displayed
  await test.step(`Expect the image enhacement is displayed`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.midleUncheckedImageEnhancement,
      "visible",
      300000
    )
  });

  //user clicks on the "Image enhancement" checkbox
  await test.step(`User clicks on the "Image enhancement" checkbox`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleUncheckedImageEnhancement);
    await drillHoleView.pause(3000);
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



