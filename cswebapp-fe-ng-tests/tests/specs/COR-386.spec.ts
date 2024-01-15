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

test("65587 - Class Map View Filters @drillhole", async ({ }, testInfo) => {
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
    await drillHoleView.clickToElement(
      drillHoleView.dynamicCategoryType("Mineralogy (67)")
    );
    await drillHoleView.pause(2000);
  });

  //user selects menu items list dropdown 
  await test.step(`User selects menu items list dropdown `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'))
    await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('_Mineral class map'));
    await drillHoleView.pause(5000);
  });

  //user clicks on menu items list 
  await test.step(`User clicks on menu items list`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(2000);
  });

  //user ticks in Mineral map checkbox
  await test.step(`User ticks in Mineral map checkbox`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleUncheckedMineralMap);
    await drillHoleView.pause(5000);
  });

  //expect the title of Mineral Map is displayed 
  await test.step(`Expect the title of Mineral Map is displayed `, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.titleMineralClassMap,
      "visible",
      300000
    )
  });

  //user unselects all Mineral Map checkbox 
  await test.step(`User selects all Mineral Map checkbox `, async () => {
    await drillHoleView.clickToElement(drillHoleView.selectAllMineralMapCheckbox);
    await drillHoleView.pause(5000);
  });

  //user closes mineral map pop-up 
  await test.step(`User closes mineral map pop-up `, async () => {
    await drillHoleView.clickToElement(drillHoleView.closeMineralMapBtn);
    await drillHoleView.pause(5000);
  });

  //user snapshot and compare image 
  await test.step(`User snapshot and compare image `, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });

  //user clicks on menu items list 
  await test.step(`User clicks on menu items list`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(2000);
  });

  //user ticks in Mineral map checkbox
  await test.step(`User ticks in Mineral map checkbox`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleUncheckedMineralMap);
    await drillHoleView.pause(5000);
  });


  //user selects all Mineral Map checkbox 
  await test.step(`User selects all Mineral Map checkbox `, async () => {
    await drillHoleView.clickToElement(drillHoleView.selectAllMineralMapCheckbox);
    await drillHoleView.pause(5000);
  });

  //user closes mineral map pop-up 
  await test.step(`User closes mineral map pop-up `, async () => {
    await drillHoleView.clickToElement(drillHoleView.closeMineralMapBtn);
    await drillHoleView.pause(5000);
  });

  //user snapshot and compare image 
  await test.step(`Uer snapshot and compare image `, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });

  //user clicks on menu items list 
  await test.step(`User clicks on menu items list`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(2000);
  });

  //user ticks in Mineral map checkbox
  await test.step(`User ticks in Mineral map checkbox`, async () => {
    await drillHoleView.clickToElement(drillHoleView.midleUncheckedMineralMap);
    await drillHoleView.pause(5000);
  });

  //user unticks all mineral map
  await test.step(`User unticks all mineral map`, async () => {
    await drillHoleView.clickToElement(drillHoleView.selectAllMineralMapCheckbox);
    await drillHoleView.pause(5000);
  });

  //user ticks in one mineral  checkbox
  await test.step(`User ticks in Malachite checkbox`, async () => {
    await drillHoleView.clickToElement(drillHoleView.malachiteCheckbox);
    await drillHoleView.pause(5000);
  });

  //user closes mineral map pop-up 
  await test.step(`User closes mineral map pop-up `, async () => {
    await drillHoleView.clickToElement(drillHoleView.closeMineralMapBtn);
    await drillHoleView.pause(5000);
  });

  //user snapshot and compare image 
  await test.step(`Uer snapshot and compare image `, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });

});

