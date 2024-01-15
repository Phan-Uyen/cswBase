import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import AccountPage from "../pageObjects/account.page"
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
let accountPage: AccountPage;

test.beforeAll(async ({ }, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  accountPage = new AccountPage(page);
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

test('9438 - Verify click on Account name and show @account', async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user access account detail page 
  await test.step(`User clicks on Account link `, async () => {
    await accountPage.clickToElement(accountPage.accountLinkPage);
    await accountPage.pause(2000);
  });

  //expected the element are correctly displayed 
  await test.step(`Expect account title text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountTitleText,
      "visible",
      300000);
  });

  await test.step(`Expect account detail text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountTitleText,
      "visible",
      300000);
  });

  await test.step(`Expect account username text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountUserNameText,
      "visible",
      300000);
  });

  await test.step(`Expect account firstname text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountFirstNameText,
      "visible",
      300000);
  });

  await test.step(`Expect account lastname text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountLastNameText,
      "visible",
      300000);
  });

  await test.step(`Expect account email text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountEmailText,
      "visible",
      300000);
  });

  await test.step(`Expect account company text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountCompanyText,
      "visible",
      300000);
  });

  await test.step(`Expect account group text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountGroupText,
      "visible",
      300000);
  });

  await test.step(`Expect account drill hole permissions text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountDrillHolePermissionsText,
      "visible",
      300000);
  });

  await test.step(`Expect account drill hole permissions text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountDrillHolePermissionsText,
      "visible",
      300000);
  });

  await test.step(`Expect return home text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.accountDrillHolePermissionsText,
      "visible",
      300000);
  });

});

test('9439 - Verify click on Return to Home and show @account', async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user access account detail page 
  await test.step(`User clicks on Account link `, async () => {
    await accountPage.clickToElement(accountPage.accountLinkPage);
    await accountPage.pause(2000);
  });

  //expect the "Return Home" button is displayed
  await test.step(`Expect the Return Home text is displayed `, async () => {
    await accountPage.waitForElement(
      accountPage.returnHomeBtn,
      "visible",
      300000);
  });

  //user clicks on "Return Home" button
  await test.step(`User clicks on Return Home button `, async () => {
    await accountPage.clickToElement(accountPage.returnHomeBtn);
    await accountPage.pause(2000);
  });

  //expect dashboard title is displauyed 
  await test.step(`Expect dashboard title is displayed`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.dashboardTitle,
      "visible",
      300000
    )
  });

});

