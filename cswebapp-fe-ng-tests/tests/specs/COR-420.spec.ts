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

test("84664 - Project details entries disappear when drillhole is selected @drillhole", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user selects frist project
  await test.step(`User selects frist project`, async () => {
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'Animikie')
    await dashBoardPage.waitForElement(
      dashBoardPage.projectSearchResult('Animikie'),
      "visible",
      300000
    )
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Animikie")
    );
  });

  //user selects second project 
  await test.step(`User selects second project `, async () => {
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, '58 North')
    await dashBoardPage.waitForElement(
      dashBoardPage.projectSearchResult('58 North'),
      "visible",
      300000
    )
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("58 North")
    );
    await dashBoardPage.pause(5000);
  });

  //expect two projects are displayed in detail list
  await test.step(`expect two projects are displayed in detail list`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.listProjectDetail('Animikie'),
      "visible",
      300000
    )
    await dashBoardPage.waitForElement(
      dashBoardPage.listProjectDetail('58 North'),
      "visible",
      300000
    )
  });

  //user select a drill hole 
  await test.step(`user select a drill hole `, async () => {
    await dashBoardPage.fillToElement(
      dashBoardPage.searchDrillHoleInput,
      "DLD-15-161A"
    );
    await dashBoardPage.waitForElement(
      dashBoardPage.drillHoleSearchResult("DLD-15-161A"),
      "visible",
      300000
    )
    await dashBoardPage.clickToElement(
      dashBoardPage.drillHoleSearchResult("DLD-15-161A")
    );
  });

  //expect selected drill hole is displayed at detail 
  await test.step(`Expect selected drill hole is displayed at detail `, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.listProjectDetail('DLD-15-161A'),
      "visible",
      300000
    )
  });

  //expect all selected project still are displayed at detail  
  await test.step(`Expect all selected project still are displayed at detail  `, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.listProjectDetail('Animikie'),
      "visible",
      2000
    )

    await dashBoardPage.waitForElement(
      dashBoardPage.listProjectDetail('58 North'),
      "visible",
      2000
    )
  });

});



