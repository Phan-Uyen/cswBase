import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../../pageObjects/login.page";
import DashBoardPage from "../../pageObjects/dashboard.page";
import AdminModePage from "../../pageObjects/admin.page";
let page: Page;
let loginPage: LoginPage;
let dashBoardPage: DashBoardPage;
let adminPage: AdminModePage;
let userName: any;
let password: any;
if (process.env.NODE_ENV === "PROD") {
  userName = process.env.USERNAME_PROD;
  password = process.env.PASSWORD_PROD;
} else {
  userName = process.env.USERNAME_DEV;
  password = process.env.PASSWORD_DEV;
}
test.beforeAll(async ({ }, testInfo) => {
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    dashBoardPage = new DashBoardPage(page);
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

test('8986 -  Verify click on Database button and show @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect csWebApp Version text is displayed
    await test.step(`Expect csWebApp Version text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.csWebAppVersionText,
            "visible",
            300000
        )
    });

    //expect customer database text is displayed
    await test.step(`Expect customer database text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.customerDatabaseText,
            "visible",
            300000
        )
    });

    //expect job database text is displayed
    await test.step(`Expect job database text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.jobDatabaseText,
            "visible",
            300000
        )
    });

    //expect product database text is displayed
    await test.step(`Expect product database text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.productDatabaseText,
            "visible",
            300000
        )
    });

    //expect project database text is displayed
    await test.step(`Expect project database text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.projectDatabaseText,
            "visible",
            300000
        )
    });

    //expect transfer app database text is displayed 
    await test.step(`Expect transfer app database text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.transferAppDatabaseText,
            "visible",
            300000
        )
    });

    //expect advanced product update text is displayed
    await test.step(`Expect advanced product update text is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.advancedProductUpdateText,
            "visible",
            300000
        )
    });
});

test('8987 - Verify click on Rescan button of Customer Database @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect customer database rescan button is displayed
    await test.step(`Expect customer database rescan button is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.customerDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on customer database rescan button 
    await test.step(`User clicks on customer database rescan button `, async () => {
        await adminPage.clickToElement(adminPage.customerDatabaseRescanBtn)
        await adminPage.pause(2000);

    });

});

test('8988 - Verify click on Rescan button of Drill Hole @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect drill hole database rescan button is displayed
    await test.step(`Expect drill hole database rescan button is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.drillHoleDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on drill hole database rescan button 
    await test.step(`User clicks on drill hole database rescan button `, async () => {
        adminPage.clickToElement(adminPage.drillHoleDatabaseRescanBtn)
        await adminPage.pause(2000)
    });

});

test('8989- Verify click on Rescan button of Job @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect job database button is displayed
    await test.step(`Expect job database button is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.jobDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on job Database button 
    await test.step(`User clicks on job Database button `, async () => {
        await adminPage.clickToElement(adminPage.jobDatabaseRescanBtn);
        await adminPage.pause(2000);

    });

});


test('8990- Verify click on Rescan button of Product Database @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });


    //expect product database rescan button is displayed
    await test.step(`Expect product database rescan button is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.productDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on product database rescan button 
    await test.step(`User clicks on product database rescan `, async () => {
        await adminPage.clickToElement(adminPage.productDatabaseRescanBtn);
        await adminPage.pause(2000);
    });
});

test('8991- Verify click on Rescan button of Project Database @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect project database is displayed
    await test.step(`Expect project database is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.projectDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on project database rescan button 
    await test.step(`User clicks on project database rescan `, async () => {
        await adminPage.clickToElement(adminPage.projectDatabaseRescanBtn);
        await adminPage.pause(2000);
    });
});

test('8992- Verify click on Rescan button of TransferApp Database @incomplete', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect transfer app database is displayed
    await test.step(`Expect transfer app database is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.transferAppDatabaseRescanBtn,
            "visible",
            300000
        )
    });

    //user clicks on transfer app database rescan button
    await test.step(`User clicks on transfer app database rescan button `, async () => {
        await adminPage.clickToElement(adminPage.transferAppDatabaseRescanBtn);
        await adminPage.pause(2000);
    });
});

test('8993- Verify click on Rescan button of Advance Product Update - @incomplete @admin @database', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //expect advanced product update button is displayed
    await test.step(`Expect advanced product update is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.advancedProductUpdateBtn,
            "visible",
            300000
        )
    });

    //user clicks on advanced product update button
    await test.step(`User clicks on advanced product update button`, async () => {
        await adminPage.clickToElement(adminPage.advancedProductUpdateBtn);
        await adminPage.pause(2000);
    
    });
});
