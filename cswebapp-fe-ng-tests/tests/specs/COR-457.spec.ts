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

test("90148 - Zoom In/Out Function Not Working @drillhole @viewPanel", async ({ }, testInfo) => {
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

  //user selects category "Mineral Logs"
  await test.step(`User selects category "Mineral Logs"`, async () => {
    await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
    await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType("Mineral Logs"));
    await drillHoleView.pause(5000);
  });

  //user selects zoom out option 
  await test.step(`User selects zoom out option `, async () => {
    for (let i = 0; i < 5; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
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

  //user selects unzoom all 
  await test.step(`User selects unzoom all option `, async () => {
    await drillHoleView.clickToElement(drillHoleView.menuItemSmallRightDropdown);
    await drillHoleView.clickToElement(drillHoleView.midleUnzoomBtn);
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

  //user clicks right mouse on "Mineral Log" panel 
  const mineralLogPanel = await page.locator('//div[@id="viewer2-panel_1"]');
  await mineralLogPanel.click({ button: 'right' })
  await drillHoleView.pause(2000);

  //user hovers on "Threshold"
  await test.step(`User hovers on "Threshold" `, async () => {
    await drillHoleView.hoverToElement(drillHoleView.thresholdMenuSub);
    await drillHoleView.pause(2000);
  });

  //User fills data in Max field 
  await test.step(`User fills data in Max field `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicInputThreshold_max(1))
    await drillHoleView.pause(4000);
    await drillHoleView.fillToElement(drillHoleView.dynamicInputThreshold_max(1), '6');
    await drillHoleView.pause(5000);
  });

  //clicking on panel 
  await mineralLogPanel.click({ button: 'left' });
  await drillHoleView.pause(2000);

  //user selects zoom out option 
  await test.step(`user selects zoom out option`, async () => {
    await drillHoleView.pause(5000);
    for (let i = 0; i < 7; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(4000);
  });


  //removing value in Threshold_max field
  await mineralLogPanel.click({ button: 'right' })
  await drillHoleView.pause(2000);

  //user hovers on "Threshold"
  await test.step(`user hovers on "Threshold"`, async () => {
    await drillHoleView.hoverToElement(drillHoleView.thresholdMenuSub);
    await drillHoleView.pause(2000);
  });

  //user clear data in Threshold_max field  
  await test.step(`user clear data in Threshold_max field `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicInputThreshold_max(1))
    await drillHoleView.pause(2000);
    await drillHoleView.clearValue(drillHoleView.dynamicInputThreshold_max(1));
    await drillHoleView.pause(5000);
  });

  //clicking on panel 
  await mineralLogPanel.click({ button: 'left' });
  await drillHoleView.pause(2000);

  //user selects zoom out option 
  await test.step(`user selects zoom out option`, async () => {
    await drillHoleView.pause(5000);
    for (let i = 0; i < 10; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(5000);
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



