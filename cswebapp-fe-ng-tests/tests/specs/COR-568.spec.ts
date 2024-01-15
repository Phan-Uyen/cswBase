import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page"
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
let coreTrayViewPage: CoreTrayViewPage;

test.beforeAll(async ({ }, testInfo) => {
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    dashBoardPage = new DashBoardPage(page);
    drillHoleView = new DrillHoleViewPage(page);
    coreTrayViewPage = new CoreTrayViewPage(page);
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

test("114802 - Clicking on the core tray view will affect the display of the drill hole view", async ({ }, testInfo) => {
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

    //user add a new panel #2
    await test.step(`User add a new panel`, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.pause(4000);
    });

    //user changes item of panel #2
    await test.step(`User change item of panel`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType('1'))
        await drillHoleView.pause(2000);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList('2'));
        await drillHoleView.pause(4000);
    });

    //user goes to "Core Tray View" tab 
    await test.step(`User goes to Core Tray View tab`, async () => {
         await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
        await coreTrayViewPage.pause(4000);
    });
    
    //user backs to Drill Hole tab
    await test.step(`User backs to drill hole tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //expect the selected panels are displayed correctly
    await test.step(`Expect the selected panels are displayed correctly`, async () => {
        await drillHoleView.countElement(drillHoleView.dynamicValuePanel(), 2);
        await drillHoleView.pause(3000); 
    });

    //expect the item of panel is displayed correctly 
    await test.step('Expect the item of panel is displayed correctly ',async()=>{
        await drillHoleView.countElement(drillHoleView.dynamicItemProductTypeList('Core photography'),1)
        await drillHoleView.pause(2000);
        await drillHoleView.countElement(drillHoleView.dynamicItemProductTypeList('Core profile'),1)
        await drillHoleView.pause(2000);
    })
});



