import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import ReportBugPage from "../pageObjects/reportBug.page";

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
let reportBug: ReportBugPage

test.beforeAll(async ({ }, testInfo) => {
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    dashBoardPage = new DashBoardPage(page);
    drillHoleView = new DrillHoleViewPage(page);
    reportBug = new ReportBugPage(page);

});

test.beforeEach(async ({ }, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 60000);
    await loginPage.openBrowser('/');
    await loginPage.fillToElement(loginPage.userNameInput, userName);
    await loginPage.fillToElement(loginPage.passwordInput, password);
    await loginPage.clickToElement(loginPage.signInInput);
    await loginPage.pause(4000);
    await dashBoardPage.waitForElement(
        dashBoardPage.logo,
        "visible",
        300000
    )

});
test.afterEach(async ({ browser }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    // await browser.close();
});


test("114781 - Pressing the f key in the bug reporter toggles the full screen option", async ({ }, testInfo) => {
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
        await drillHoleView.pause(4000);
    });

    //user clicks on report bug button
    await test.step(`User clicks on report bug button`, async () => {
        await dashBoardPage.clickToElement(dashBoardPage.reportBugBtn);
        await dashBoardPage.pause(3000);
    });

    //user fill out data in error description 
    await test.step(`User fill out data in error description`, async () => {
        await reportBug.fillToElement(reportBug.errorDescriptionForm, "Testingffffff");
        await reportBug.pause(4000)
    });

    //expect the full screen option shouldn’t be toggled
    await test.step(`Snapshot and compare image`, async () => {
        await drillHoleView.pause(8000);
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.pause(8000);
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });

});