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

test("106539 - Details panel text overshooting control's bounds", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

//user scroll down and select "LM-13-01" 
    await test.step(`User scroll down and select "LM-13-01"  `, async () => {
        await dashBoardPage.scrollToElement(dashBoardPage.drillHoleSearchResult("LM-13-01"));
        await dashBoardPage.clickToElement(
          dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
        await dashBoardPage.pause(4000);
      });

//user scroll down and select "LM-11" 
    await test.step(`User scroll down and select "LM-11"  `, async () => {
        await dashBoardPage.scrollToElement(dashBoardPage.drillHoleSearchResult("LM-11"));
        await dashBoardPage.clickToElement(
        dashBoardPage.drillHoleSearchResult("LM-11")
        );
        await dashBoardPage.pause(4000);
    });

//snapshot and compare image
    await test.step(`Snapshot and compare image`, async () => {
        await drillHoleView.pause(4000);
        await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
        });
        await drillHoleView.pause(4000);
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
  });


});



