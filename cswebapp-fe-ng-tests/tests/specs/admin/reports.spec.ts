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

test('9113 - Verify click on Reports button and show @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //expect report type column is displayed
    await test.step(`Expect report type column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.reportsTypeColumn,
            "visible",
            300000
        )
    });

    //expect report status column is displayed
    await test.step(`Expect report status column is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.reportsStatusColumn,
            "visible",
            300000
        )
    });

    //expect report issue Date column is displayed
    await test.step(`Expect report issue Date column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.reportsIssuedDateColumn,
            "visible",
            300000
        )
    });

    //expect report drillhole id column is displayed
    await test.step(`Expect report drillhole id column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.reportsDrillHoleIdColumn,
            "visible",
            300000
        )
    });

    //expect job id column is displayed
    await test.step(`Expect job id column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.jobIdColumn,
            "visible",
            300000
        )
    });

    //expect finish date column is displayed
    await test.step(`Expect finish date column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.finishDateColumn,
            "visible",
            300000
        )
    });

    //expect creator column is displayed
    await test.step(`Expect creator column is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.creatorColumn,
            "visible",
            300000
        )
    });

    //expect report auto refresh button is displayed
    await test.step(`Expect report auto refresh button is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.reportsAutoRefreshBtn,
            "visible",
            300000
        )
    });


});

test('9114 - Verify click on Type dropdown and show @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on report type form 
    await test.step(`User clicks on report type from`, async () => {
        await adminPage.clickToElement(adminPage.reportsTypeForm);
        await adminPage.pause(5000)
    });

    //expect all report type product is displayed 
    await test.step(`Expect all report type product is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicReportTypeProduct('All'),
            "visible",
            300000
        )
    });

    //expect file tally report type product is displayed 
    await test.step(`Expect file tally report type product is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicReportTypeProduct('File Tally'),
            "visible",
            300000
        )
    });

    //expect product date report type product is displayed 
    await test.step(`Expect product date report type product is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicReportTypeProduct('Product Date'),
            "visible",
            300000
        )
    
    });

    //expect product region tally report type is displayed
    await test.step(`Expect product region tally report type is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicReportTypeProduct('Product Region Tally'),
            "visible",
            300000
        )
    
    });

});

test('9115 - Verify click on Type dropdown and show @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on status form 
    await test.step(`User clicks on status form`, async () => {
        await adminPage.clickToElement(adminPage.statusForm);
        await adminPage.pause(5000);
    });

    //expect All list types is displayed
     await test.step(`Expect All list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('All'),
            "visible",
            300000
        )
    });

    //expect deleted list types is displayed
     await test.step(`Expect deleted list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('Deleted'),
            "visible",
            300000
        )
    });

    //expect done list types is displayed
     await test.step(`Expect done list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('Done'),
            "visible",
            300000
        )
    });

    //expect failed list types is displayed
     await test.step(`Expect failed list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('Failed'),
            "visible",
            300000
        )
    });

    //expect queued list types is displayed
     await test.step(`Expect queued list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('Queued'),
            "visible",
            300000
        )
    });

    //expect processing list types is displayed
     await test.step(`Expect processing list types is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicStatusListItem('Processing'),
            "visible",
            300000
        )
    });
});

test('9116 - Verify search with exist input and show @admin @report @unstable', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //expect search report bar is displayed 
     await test.step(`Expect expect search report bar is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.searchReportBar,
            "visible",
            300000
        )
    });

    //user enters data in search report 
     await test.step(`User enters data in search report`, async () => {
        await adminPage.fillToElement(adminPage.searchReportBar, 'PRODUCT_DATE')
        await adminPage.pause(5000);
    });

    //expect the correctly result is displayed 
     await test.step(`Expect the correctly result is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicTypeListReport('PRODUCT_DATE'),
            "visible",
            300000
        )
    });
   

});

test('9117 - Verify search with no exist input and show @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //expect search report bar is displayed 
    await test.step(`Expect expect search report bar is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.searchReportBar,
            "visible",
            300000
        )
    });

    //user enters data in search report 
     await test.step(`User enters data no exist in search report`, async () => {
        await adminPage.fillToElement(adminPage.searchReportBar, 'rrrrr')
        await adminPage.pause(5000);
    });

    //expect the no data message is displayed  
     await test.step(`Expect the no data message is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.noDataReportMessage,
            "visible",
            300000
        )
    });  

});

test('9126 - Verify click on Create Report button and show @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //expect report creator text is displayed
    await test.step(`Expect report creator text is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.reportCreatorText,
            "visible",
            300000
        )
    }); 
    
    //expect job text is displayed
    await test.step(`Expect job text is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.jobText,
            "visible",
            300000
        )
    });  

    //expect drill hole text is displayed
    await test.step(`Expect drill hole text is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.drillHoleText,
            "visible",
            300000
        )
    });  

});

test('Verify that at Report Creator popup, click on Report Type drop down @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //open pop-up and clicking report type dropdown 
    await adminPage.clickToElement(adminPage.reportTypeForm)
    await adminPage.pause(2000);

    await adminPage.waitForElement(
        adminPage.dynamicReportTypeProduct('File Tally'),
        "visible",
        300000
    )

    await adminPage.waitForElement(
        adminPage.dynamicReportTypeProduct('Product Date'),
        "visible",
        300000
    )

    await adminPage.waitForElement(
        adminPage.dynamicReportTypeProduct('Product Region Tally'),
        "visible",
        300000
    )

});

test('9128 - Verify that at Report Creator popup, click on Job dropdown @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //user clicks on report type dropdown 
    await test.step(`User clicks on "Job" form`, async () => {
        await adminPage.clickToElement(adminPage.jobFrom)
        await adminPage.pause(5000);
    
    });

    //expect JM0001 job is displayed
    await test.step(`Expect JM0001 job is displayed`, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicJob('JM0001'),
            "visible",
            300000
        )
    
    });

});

test('9129 - Verify that at Report Creator popup, click on Drill Hole dropdown @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //user clicks on drill hole type 
    await test.step(`User clicks on drill hole type `, async () => {
        await adminPage.clickToElement(adminPage.drillHoleForm)
        await adminPage.pause(5000);
    
    });

    //expect all drill hole list is displayed 
    await test.step(`Expect all drill hole list is displayed `, async () => {
        await adminPage.waitForElement(
            adminPage.dynamicDrillHoleList('All'),
            "visible",
            300000
        )
    
    });
});

test('9130 -  Verify that at Report Creator popup, click on Create Report buton @incomplete @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

});

test('9132 - Verify that at Report Creator popup, click on Cancel button @admin @report', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //user clicks on cancel create report button 
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.cancelCreateReportBtnPopUp);
        await adminPage.pause(2000);
    
    });

    //expect the modal create report is closed 
    await test.step(`Expect the modal create report is closed `, async () => {
        await adminPage.waitForElement(
            adminPage.cancelCreateReportBtnPopUp,
            "hidden",
            300000
        )
    
    });

  
});

test('9133 - Verify that at Report Creator popup, click on X icon @admin @report ', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    //user clicks on "Create report" button
    await test.step(`User clicks on "Create report" button`, async () => {
        await adminPage.clickToElement(adminPage.createReportBtn);
        await adminPage.pause(5000);
    
    });

    //user clicks on close modal icon
    await test.step(`User clicks on close modal icon`, async () => {
        await adminPage.clickToElement(adminPage.closeModalIcon);
        await adminPage.pause(2000);
    
    });

    //expect the modal is closed 
    await test.step(`Expect the modal is closed `, async () => {
        await adminPage.waitForElement(
            adminPage.closeModalIcon,
            "hidden",
            300000
        )
    
    });

});

test('9135 - Verify click on Auto Refresh checkbox @admin @report @incomplete ', async ({ }, testInfo) => {
    //set timeout 
    test.setTimeout(300000);

    //user clicks on Admin Mode button 
    await test.step(`User clicks on Admin Mode button `, async () => {
        await adminPage.clickToElement(adminPage.adminBtn);
        await adminPage.pause(5000)
    });

    //user clicks on report tab
    await test.step(`User clicks on report tab`, async () => {
        await adminPage.clickToElement(adminPage.reportsBtn);
        await adminPage.pause(5000);
    });

    // //expect the untick refresh button is displayed 
    // await test.step(`Expect the untick refresh button is displayed `, async () => {
    //     await adminPage.clickToElement(adminPage.unTickAutoRefreshCheckbox);
    //     await adminPage.pause(5000);
    // });

    // //user clicks on report auto refresh button 
    // await test.step(`User clicks on report auto refresh button`, async () => {
    //     await adminPage.clickToElement(adminPage.unTickAutoRefreshCheckbox);
    //     await adminPage.pause(5000);
    // });

    // //expect untick auto refresh button
    // await test.step(`Expect untick auto refresh button`, async () => {
    //     await adminPage.clickToElement(adminPage.reportsAutoRefreshBtn);
    //     await adminPage.pause(5000);
    // });
});
