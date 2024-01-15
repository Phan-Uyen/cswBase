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
if (process.env.NODE_ENV === "DEV") {
  userName = process.env.USERNAME_DEV;
  password = process.env.PASSWORD_DEV;
}
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

test('9108 -  Verify click on Users button and show @admin @user', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on User tab 
    await test.step(`User clicks on User tab`, async () => {
        await adminPage.clickToElement(adminPage.usersBtn);
        await adminPage.pause(2000);
    });

    //expect the firstname collumn is displayed 
    await test.step(`Expect the firstname collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.firstNameColumn,
            "visible",
            300000
        )

    });

    //expect the lastname collumn is displayed 
    await test.step(`Expect the lastname collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.lastnameColumn,
            "visible",
            300000
        )

    });

    //expect the username collumn is displayed 
    await test.step(`Expect the username collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.usernameColumn,
            "visible",
            300000
        )
    });

    //expect the email collumn is displayed 
    await test.step(`Expect the email collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.emailColumn,
            "visible",
            300000
        )
    });

    //expect the customer collumn is displayed 
    await test.step(`Expect the customer collumn is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.customerColumn,
            "visible",
            300000
        )
    });

    //expect the logged In collumn is displayed 
    await test.step(`Expect the logged In collumn is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.loggedInColumn,
            "visible",
            300000
        )
    });

    //expect the comments collumn is displayed 
    await test.step(`Expect the comments collumn is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.commentsColumn,
            "visible",
            300000
        )
    });

    //expect the comments collumn is displayed 
    await test.step(`Expect the comments collumn is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.actionColumn,
            "visible",
            300000
        )
    });

});

test('9110 - Verify that search with exit user @admin @user', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on User tab 
    await test.step(`User clicks on User tab`, async () => {
        await adminPage.clickToElement(adminPage.usersBtn);
        await adminPage.pause(2000);
    });

    //user searchs a exist uses
    await test.step(`User searchs a exist user`, async () => {
        await adminPage.fillToElement(adminPage.searchPlaceHolderText, 'Alexis');
        await adminPage.pause(2000);
    });

    //expect the firstname is correctly displayed 
    await test.step(`Expect the firstname is correctly displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicFirstNameColumn('Alexis'),
            "visible",
            300000
        )
    });
   
});

test('9111 - Verify that search with exit user @admin @user', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on User tab 
    await test.step(`User clicks on User tab`, async () => {
        await adminPage.clickToElement(adminPage.usersBtn);
        await adminPage.pause(2000);
    });


    //user searchs user with no exist user 
    await test.step(`User searchs user with no exist user`, async () => {
        await adminPage.fillToElement(adminPage.searchPlaceHolderText, 'helllloo');
        await adminPage.pause(2000);
    });

    //expect the no data message is correctly displayed 
    await test.step(`Expect the no data message is correctly displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.noDataMessage,
            "visible",
            300000
        )
    });
});


test('9112 - Verify click on Impersonate button and show @admin @user', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button`, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on User tab 
    await test.step(`User clicks on User tab`, async () => {
        await adminPage.clickToElement(adminPage.usersBtn);
        await adminPage.pause(2000);
    });

    //user clicks on Impersonate button
    await test.step(`User clicks on Impersonate button`, async () => {
        await adminPage.clickToElement(adminPage.impersonateBtn);
        await adminPage.pause(2000)
    });

    //expect the error message is correctly displayed 
    await test.step(`Expect the error message is correctly displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.errorMessage,
            "visible",
            300000
        )
    });
});

