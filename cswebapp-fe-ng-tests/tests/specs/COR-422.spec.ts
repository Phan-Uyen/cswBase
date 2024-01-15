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

test("84666 - Context menu issues @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);
  //========================================== Case 1 =====================================

  //search drill hole and clicking drill hole 
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

  //user zoom out on screen 
  await test.step(`User zoom out on screen `, async () => {
    for (let i = 0; i < 10; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
  });

  //user add a new panel 
  await test.step(`User add a new panel`, async () => {
    await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    await drillHoleView.pause(2000);
  });

  //select category "Mineral Logs"
  await test.step(`User selects category "Mineral Logs`, async () => {
    await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
    await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType("Mineral Logs"));
    await drillHoleView.pause(10000);
  });

  //user clicks right mouse on "Core Photography" panel 
  const corePhotoPanel = await page.locator('//div[@id="viewer2-panel_1"]');
  await corePhotoPanel.click({ button: 'right' })
  await drillHoleView.pause(50000);

  //expect the core image text content is displayed 
  await test.step(`Expect the core image text content is displayed`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.coreImageTextContent,
      "visible",
      300000
    )
  });

  await corePhotoPanel.click({ button: 'left' })
  await drillHoleView.pause(50000);

  //user clicks right mouse on "Mineral Log" panel 
  const mineralLogPanel = await page.locator('//div[@id="viewer2-panel_3"]');
  await mineralLogPanel.click({ button: 'right' })
  await drillHoleView.pause(2000);

  //expect the mineral log text content is displayed 
  await test.step(`Expect the mineral log text content is displayed`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.mineralLogTextContent,
      "visible",
      300000
    )
  });

  //expect the core image text content is displayed 
  await test.step(`Expect the core image text content is displayed`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.coreImageTextContent,
      "hidden",
      300000
    )
  });

  //expect the threshold menu sub is displayed
  await test.step(`Expect the threshold menu sub is displayed`, async () => {
    await drillHoleView.waitForElement(
      drillHoleView.thresholdMenuSub,
      "visible",
      300000
    )
  });



  //========================================== Case 2====================================

  //user hovers on "Threshold"
  await test.step(`User hovers on "Threshold"`, async () => {
    await drillHoleView.hoverToElement(drillHoleView.thresholdMenuSub);
    await drillHoleView.pause(2000);

  });
  //user fill data in Min field 
  await test.step(`User fill data in Min field `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicInputThreshold_min(3));
    await drillHoleView.pause(2000);
    await drillHoleView.fillToElement(drillHoleView.dynamicInputThreshold_min(3), '-1');

  });

  //user fill data in Max field 
  await test.step(`User fill data in Max field `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicInputThreshold_max(3));
    await drillHoleView.pause(2000);
    await drillHoleView.fillToElement(drillHoleView.dynamicInputThreshold_max(3), '6');
    await drillHoleView.pause(5000)

  });

  //get value Min an Max 
  const locatorMin = page.locator("//input[@id='threshold_min@viewer2-panel_3']");
  await expect(locatorMin).toHaveValue('-1');
  await drillHoleView.pause(3000)

  const locatorMax = page.locator("//input[@id='threshold_max@viewer2-panel_3']");
  await expect(locatorMax).toHaveValue('6');
  await drillHoleView.pause(3000)

});






