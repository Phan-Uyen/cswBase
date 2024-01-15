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

test('8997 - Verify click on Transfer button and show @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //expect the priority collumn is displayed 
    await test.step(`Expect the priority collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.priorityColumn,
            "visible",
            300000
        )
    });

    //expect the transfer type collumn is displayed 
    await test.step(`Expect the transfer type collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.transferTypeColumn,
            "visible",
            300000
        )
    });

    //expect the ID collumn is displayed 
    await test.step(`Expect the ID collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.idColumn,
            "visible",
            300000
        )

    });

    //expect the Added collumn is displayed 
    await test.step(`Expect the Added collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.addedColumn,
            "visible",
            300000
        )

    });

    //expect the transferred collumn is displayed 
    await test.step(`Expect the transferred collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.addedColumn,
            "visible",
            300000
        )

    });

    //expect the size collumn is displayed 
    await test.step(`Expect the size collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.sizeColumn,
            "visible",
            300000
        )

    });

    //expect the process collumn is displayed 
    await test.step(`Expect the process collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.processColumn,
            "visible",
            300000
        )
    });

    //expect the recipient collumn is displayed 
    await test.step(`Expect the recipient collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.recipient,
            "visible",
            300000
        )
    });

    //expect the recipient collumn is displayed 
    await test.step(`Expect the recipient collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.recipient,
            "visible",
            300000
        )
    });

    //expect the messsage collumn is displayed 
    await test.step(`Expect the message collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.messageColumn,
            "visible",
            300000
        )
    });
});

test('9001 - Verify when no data, display the text "No data available in table" @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //expect the no data transfer message is displayed 
    await test.step(`Expect the no data transfer message is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.noDataTransfer,
            "visible",
            300000
        )
    });

});

test('8999 - Verify list view display increase by Priority after click on Increase Priority button @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //User clicks on "Increase priority" button
    await test.step(`User clicks on "Increase priority" button`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //pemding
});

test('9000 - Verify list view display decrease by Priority after click on Decrease Priority button @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //User clicks on "Decrease Priority" button
    await test.step(`User clicks on "Decrease Priority" button`, async () => {
        await adminPage.clickToElement(adminPage.decreasePriority);
        await adminPage.pause(20000);

    });
});

test('9002 - Verify click on ReQueue All and show @unstable', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //User clicks on "ReQueue All" button
    await test.step(`User clicks on "ReQueue All" button`, async () => {
        await adminPage.clickToElement(adminPage.reQueueBtn);
        await adminPage.pause(20000);

    });

});

test('9003 - Verify click on Remove and show - @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //user clicks on "Remove" button
    await test.step(`User clicks on "Remove" button`, async () => {
        await adminPage.clickToElement(adminPage.removeBtn);
        await adminPage.pause(20000);

    });

});


test('9006 - Verify click on Failed radio button and show @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //user clicks on "Radio" button
    await test.step(`User clicks on "Radio" button`, async () => {
        await adminPage.clickToElement(adminPage.clickOnFailed);
        await adminPage.pause(20000);

    });

});

// test('9007 - Verify click on Clear All button and show', async ({}, testInfo) => {
//     //set timeout 
//         test.setTimeout(300000);

//     //user accesses admin mode 
//         await adminPage.clickToElement(adminPage.adminBtn);
//         await adminPage.pause(5000)

//     //expect the elements are displayed 
//     });

// test('9008 -  Verify click on Re-Queue button and show', async ({}, testInfo) => {
//     //set timeout 
//         test.setTimeout(300000);

//     //user accesses admin mode 
//         await adminPage.clickToElement(adminPage.adminBtn);
//         await adminPage.pause(5000)

//     //expect the elements are displayed 
//     });   

test('9009 - Verify click on Auto Refresh button and show @unstable @admin @transfer', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on accesses transfer tab 
    await test.step(`User clicks on accesses transfer tab`, async () => {
        await adminPage.clickToElement(adminPage.transfersBtn)
        await adminPage.pause(5000);

    });

    //user clicks on auto refresh transfer checkbox  
    await test.step(`User clicks on auto refresh transfer checkbox `, async () => {
        await adminPage.clickToElement(adminPage.autoRefreshBtn)
        await adminPage.pause(5000)

    });

    //expect the untick auto refresh checkbox transfer is displayed 
    await test.step(`Expect the untick auto refresh checkbox transfer is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.unTickAutoRefreshCheckboxTransfers,
            "visible",
            300000
        )

    });  
});
