import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page";

let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
    baseURL = process.env.PROD_ENV;
} else {
    baseURL = process.env.DEV_ENV;
}
const urlInput = `${baseURL}/cswebapp/coreTrayView?depthFrom=218.605&depthTo=320.4&drillhole=WINU0725,LM-13-01,RD-239-GT&fsLocation=&layout=STACKEDSECTION&product=JA0480_WINU0725_mos-img-rgb-50u-ss&tray=JA0480_WINU0725_0001_20200920021130&panelState=[{"is3D":false}]`;
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
    await dashBoardPage.openBrowser(urlInput);

});
test.afterEach(async ({ browser }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.evaluate(() => window.sessionStorage.clear());
    await page.reload();
    // await browser.close();
});


test("114780 - Switch Drill Hole in Core Tray View not work", async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user changes to drill hole LM-13-01
    await test.step(`User changes drill hole LM-13-01`, async () => {
        await coreTrayViewPage.clickToElement(coreTrayViewPage.drillHoleText);
        await coreTrayViewPage.clickToElement(coreTrayViewPage.dynamicDrillHoleListView('LM-13-01'));
    });

    //expect the empty message is not displayed at drill hole LM-13-01 
    await test.step(`Expected the empty message is not displayed`, async () => {
        await coreTrayViewPage.waitForElement(
            coreTrayViewPage.noTrayForDrillHoleMessage,
            "hidden",
            30000
        )
    });

    //user snapshot and compare image drill hole LM-13-01  
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });


    //user changes to drill hole RD-239-GT
    await test.step(`User changes drill hole RD-239-GT`, async () => {
        await coreTrayViewPage.clickToElement(coreTrayViewPage.drillHoleText);
        await coreTrayViewPage.clickToElement(coreTrayViewPage.dynamicDrillHoleListView('RD-239-GT'));
    });

    //expect the empty message is not displayed at drill hole RD-239-GT 
    await test.step(`Expected the empty message is not displayed`, async () => {
        await coreTrayViewPage.waitForElement(
            coreTrayViewPage.noTrayForDrillHoleMessage,
            "hidden",
            30000
        )
    });

    //user snapshot and compare image drill hole RD-239-GT 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });

    //user changes to drill hole WNU0725
    await test.step(`User changes drill hole WNU0725`, async () => {
        await coreTrayViewPage.clickToElement(coreTrayViewPage.drillHoleText);
        await coreTrayViewPage.clickToElement(coreTrayViewPage.dynamicDrillHoleListView('WNU0725'));
    });

    //expect the empty message is not displayed at drill hole WNU0725
    await test.step(`Expected the empty message is not displayed`, async () => {
        await coreTrayViewPage.waitForElement(
            coreTrayViewPage.noTrayForDrillHoleMessage,
            "hidden",
            30000
        )
    });

    //user snapshot and compare image drill hole WNU0725 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });
});