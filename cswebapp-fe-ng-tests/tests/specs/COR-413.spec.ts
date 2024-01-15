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

test("72340 - Stacked downhole ruler readings incorrect @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

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


  //user accesses view drill hole tab 
  await test.step(`User accesses view drill hole tab`, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(5000);
  });

  //user selects zoom out option 
  await test.step(`User selects zoom out option`, async () => {
    for (let i = 0; i < 7; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
  });

  //user ctrl + hover + moveMouse
  await test.step(`User selects zoom out option`, async () => {
    await drillHoleView.clickMouse(500, 400);
    await drillHoleView.pause(5000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.mouseMove(360, 200);
    await drillHoleView.pause(2000);
    await drillHoleView.mouseMove(700, 400);
    await drillHoleView.pause(3000);
  });

    //expect depth reading on the ruler is correctly displayed 
    await test.step(`Expect depth reading on the ruler is correctly displayed `, async () => {
      await drillHoleView.countElement(drillHoleView.dynamicValueDepth('220'), 1);
      await drillHoleView.pause(4000);
    })

});



