import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page";
import AdminModePage from "../pageObjects/admin.page"
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
let adminPage: AdminModePage;

test.beforeAll(async ({ }, testInfo) => {
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    dashBoardPage = new DashBoardPage(page);
    drillHoleView = new DrillHoleViewPage(page);
    coreTrayView = new CoreTrayViewPage(page);
    adminPage = new AdminModePage(page);
});
test.beforeEach(async ({ }, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 60000);
    await test.step(`Open site Corescan`, async () => {
        await loginPage.openBrowser('/');
        await loginPage.pause(5000);
    });
});

test.afterEach(async ({ browser }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    // await browser.close();
});

test("113009 - Forgot password ? feature not working", async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);
    await test.step(`Expect the forgot password link is not displayed`, async () => {
        await loginPage.waitForElement(
            loginPage.forgotpassswordLink,
            "hidden",
            300000
        )
    });
});



