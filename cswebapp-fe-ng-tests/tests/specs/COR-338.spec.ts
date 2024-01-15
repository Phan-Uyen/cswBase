import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
let baseURL: any;
if (process.env.NODE_ENV === "PROD") {
  baseURL = process.env.PROD_ENV;
} else {
  baseURL = process.env.DEV_ENV;
}
const inputUrl = `${baseURL}/cswebapp/dhviewer?drillhole=LM-13-01&product=internal_depthscale_left_scroll,JA0492_LM-13-01_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=61.8744000000589&depthTo=137.922000000131&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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

test.beforeAll(async ({ }, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  drillHoleView = new DrillHoleViewPage(page);
});

test.beforeEach(async ({ }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  await loginPage.openBrowser('/');
  await loginPage.fillToElement(loginPage.userNameInput, userName);
  await loginPage.fillToElement(loginPage.passwordInput, password);
  await loginPage.clickToElement(loginPage.signInInput);
  await dashBoardPage.pause(4000);
  await dashBoardPage.waitForElement(
    dashBoardPage.logo,
    "visible",
    300000
  )
  await dashBoardPage.openBrowser(inputUrl);

 
});

test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  await browser.close();
});

test("COR-338 - Image Server or Coreshed does not authorise mos-img-rgb-* products correctly @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user selects zoom out option
    await test.step(`User selects zoom out option`, async () => {
      await drillHoleView.pause(10000);
      await drillHoleView.mouseMove(760, 400);
        for (let i = 0; i < 5; i++) {
          await drillHoleView.mouseMove(100, 200);
          await drillHoleView.pause(1000);
          await page.mouse.wheel(0, -50);
          await drillHoleView.pause(1000);
              }
        await drillHoleView.pause(10000);
  
    });

    //ctrl + hover+ mouseMove to find "Depth" #1
    await test.step(`User ctrl + hover+ mouseMove to find "Depth" #1`, async () => {
      await drillHoleView.pause(5000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.keyboardDown('Shift');
      await drillHoleView.mouseMove(850, 300);
      await drillHoleView.pause(2000);
      await drillHoleView.mouseMove(950, 400);
      await drillHoleView.pause(5000);
    });

    //expect the element is correctly displayed #1
    await test.step(`Expect the element is correctly displayed #1`, async () => {
      await drillHoleView.pause(2000);
      await drillHoleView.countElement(drillHoleView.dynamicValueCommonSection('Depth'), 1);
    });

    //user accesses dashboard page 
    await test.step(`User accesses dashboard page `, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.dashboardTitle);
      await dashBoardPage.pause(2000); 
    });

  //user search LM-13-02 drillhole 
  await test.step(`User search LM-13-02 drillhole `, async () => {
    await dashBoardPage.fillToElement(
      dashBoardPage.searchDrillHoleInput,
      "LM-13-02"
    );
  });

  //expect the LM-13-02 drillhole is displayed
  await test.step(`Expect the LM-13-02 drillhole is displayed`, async () => {
    await dashBoardPage.waitForElement(
      dashBoardPage.drillHoleSearchResult("LM-13-02"),
      "visible",
      300000
    )

  });

  //user clicks on LM-13-02 drillhole 
  await test.step(`User clicks on LM-13-02 drillhole `, async () => {
    await dashBoardPage.clickToElement(
      dashBoardPage.drillHoleSearchResult("LM-13-02")
    );
  });

  //expect the backouground of LM-13-02 drillhole is correctly displayed
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

   //user ctrl + hover+ mouseMove to find "Depth" #2
   await test.step(`User ctrl + hover+ mouseMove to find "Depth" #2`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.mouseMove(850, 300);
    await drillHoleView.pause(2000);
    await drillHoleView.mouseMove(950, 400);
    await drillHoleView.pause(5000);
  })

 //expect the element is correctly displayed #2
  await test.step(`Expect the element is correctly displayed #2`, async () => {
    await drillHoleView.pause(2000);
    await drillHoleView.countElement(drillHoleView.dynamicValueCommonSection('Depth'), 1);

  });
 

});
