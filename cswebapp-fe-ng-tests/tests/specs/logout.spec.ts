import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import LogoutPage from "../pageObjects/logout.page";
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
let logoutPage: LogoutPage;

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  logoutPage = new LogoutPage(page);
});
test.beforeEach(async ({}, testInfo) => {
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
  await test.step(`Expect dashboard title is displayed`, async () => {
    await logoutPage.waitForElement(
      dashBoardPage.dashboardTitle,
      "visible",
      300000
      );
  });
 
});

test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  // await browser.close();
});

test('52814 - Verify click on Log out and show @logOut', async ({}, testInfo) => {
    //set timeout 
        test.setTimeout(300000);

    //expect Log out button is displayed 
    await test.step(`Expect Logout button is displayed`, async () => {
      await logoutPage.waitForElement(
        logoutPage.logoutBtn,
        "visible",
        300000
    )
    });

    //user clicks on "Log out" button
    await test.step(`User clicks on Logout button`, async () => {
      await logoutPage.clickToElement(logoutPage.logoutBtn)
      await logoutPage.pause(5000);
    });
  
    //expect back to login page 
    await test.step(`Expect back user to login page`, async () => {
      await loginPage.waitForElement(
        loginPage.signInInput,
        "visible",
        300000
    )
    });
  

  });

  