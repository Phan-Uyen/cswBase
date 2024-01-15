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
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left_scroll,JA0480_WINU0725_mos-vec-gtc-testUpdated3-RqdCoreReg5VertexZVals-crg-dh,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=51.5&depthTo=527.4&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`; 

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

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  drillHoleView = new DrillHoleViewPage(page);
  coreTrayView = new CoreTrayViewPage(page)
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

test("53244 - Vector editing does not work @drillhole @viewPanel @unstable", async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //search drill hole and clicking drill hole 
    await dashBoardPage.fillToElement(
      dashBoardPage.searchDrillHoleInput,
      "WINU0725"
    );
  
    await dashBoardPage.waitForElement(
      dashBoardPage.drillHoleSearchResult("WINU0725"),
      "visible",
      300000
      )
      
    await dashBoardPage.clickToElement(
      dashBoardPage.drillHoleSearchResult("WINU0725")
    );
    expect(
      await page.$eval(
        dashBoardPage.detailRow,
        (e) => getComputedStyle(e).backgroundColor
      )
    ).toBe("rgb(108, 195, 81)");

  //user accesses view drill hole tab 
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(5000);

  //user selects category 
    await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
    await drillHoleView.clickToElement(
      drillHoleView.dynamicCategoryType("Geotechnical (12)")
    );
    
  //user selects menu item dropdown
    await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'));
    await drillHoleView.pause(3000);
    await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('Update2 Drill core regions'));
    await drillHoleView.pause(3000);



  //clicking "Edit Mode" checkbox 
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(2000);
    await drillHoleView.clickToElement(drillHoleView.midleEditModeUncheckbox)
    await drillHoleView.pause(5000)
    await drillHoleView.waitForElement(
        drillHoleView.leftBarEditMode,
        "visible",
         300000
    )

    //expect user can move on and draw square 
    await drillHoleView.clickToElement(drillHoleView.squareBtn);
    await drillHoleView.pause(2000);
    await drillHoleView.mouseMove(800, 300);
    await drillHoleView.pause(2000);
    await drillHoleView.clickMouse(800,300);
    await drillHoleView.pause(2000);
    await drillHoleView.mouseMove(900,500);
    await drillHoleView.pause(2000);
    await drillHoleView.clickMouse(900,500);
    await drillHoleView.pause(2000);

    //snapshot and compare image 
    await drillHoleView.pause(5000);
    await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
    });
    await drillHoleView.imageComparisons();

    //user clicks on "Undo" button 
    await drillHoleView.clickToElement(drillHoleView.undoBtn);
    await drillHoleView.pause(2000);

    //expect close edit mode panel when user unchecked "Edit Mode"
    await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
    await drillHoleView.pause(2000);
    await drillHoleView.clickToElement(drillHoleView.midleEditModeCheckedbox)
    await drillHoleView.pause(5000)
    await drillHoleView.waitForElement(
        drillHoleView.leftBarEditMode,
        "hidden",
        300000
    )
    
});


