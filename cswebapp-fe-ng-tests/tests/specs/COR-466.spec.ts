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

test("90267 - No warning message displayed when products rescan button is pressed", async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin mode button 
    await test.step(`User clicks on Admin mode button `, async () => {
        await dashBoardPage.clickToElement(dashBoardPage.adminModeBtn);
        await dashBoardPage.pause(10000);
    });

    //user clicks on Rescan button of product database 
    await test.step(`User clicks on Rescan button of product database `, async () => {
        await adminPage.clickToElement(adminPage.productDatabaseRescanBtn);
        await adminPage.pause(5000);

    });

    //expect confirm rescan message is displayed 
    await test.step(`Expect confirm rescan message is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.confirmRescanMessage,
            "visible",
            300000
        )

    });
});



