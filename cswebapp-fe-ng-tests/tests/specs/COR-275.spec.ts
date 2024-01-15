import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
let userName: any;
let password: any;
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
  await browser.close();
});

test("39413 - 3D panels load properly @drillhole @viewPanel @unstable", async ({ }, testInfo) => {
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

  //user clicks on drillhole view tab 
  await test.step(`User clicks on drillhole view tab `, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(10000);
  });

  //user selects "Switch to 3D Mode" on the top left drop down menu 
  await test.step(`User selects "Switch to 3D Mode" on the top left drop down menu`, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
    await drillHoleView.clickToElement(drillHoleView.switchTo3DMode);
    await drillHoleView.pause(4000);
  });

  //user zoom out on screen 
    await test.step(`User zoom out on screen `, async () => {
      await drillHoleView.pause(10000);
      await drillHoleView.mouseMove(760, 400);
      for (let i = 0; i < 3; i++) {
        await drillHoleView.pause(2000);
        await page.mouse.wheel(0, -50);
      }
      await drillHoleView.pause(2000);
    });
  
  //user ctr + hover + mouseMove on screen 
    await test.step(`user ctr + hover + mouseMove on screen `, async () => {
      await drillHoleView.mouseMove(700, 400);
      await drillHoleView.pause(2000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.pause(5000);
      await drillHoleView.mouseDown();
      await drillHoleView.pause(10000);
      await drillHoleView.mouseMove(760, 300);
      await drillHoleView.pause(15000);
      });

  //user snapshot and compare image 
  await test.step(`user snapshot and compare image `, async () => {
    await drillHoleView.pause(5000);
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });

});
