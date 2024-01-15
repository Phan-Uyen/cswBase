import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
const baseURL = "https://dev-react-aws.coreshed.com";
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
let loginPage2: LoginPage;
let dashBoardPage: DashBoardPage;
let drillHoleView: DrillHoleViewPage;
let dashBoardPage2: DashBoardPage;
let drillHoleView2: DrillHoleViewPage;
let page1: Page;
let page2: Page;
let browserContext: BrowserContext;

test.beforeAll(async ({ }, testInfo) => {
  const browser = await chromium.launch();
  // page = await browser.newPage();
  browserContext = await browser.newContext();
  page1 = await browserContext.newPage();
  page2 = await browserContext.newPage();
  loginPage = new LoginPage(page1);
  loginPage2 = new LoginPage(page2);
  dashBoardPage = new DashBoardPage(page1);
  dashBoardPage2 = new DashBoardPage(page2);
  drillHoleView = new DrillHoleViewPage(page1);
  drillHoleView2 = new DrillHoleViewPage(page2);
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
  await page1.evaluate(() => window.localStorage.clear());
  await page1.evaluate(() => window.sessionStorage.clear());
  await page1.reload();
  await browser.close();
});

test("39237 - React Coreshed links do not initialise app properly @drillhole @viewPanel", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //bring to front
  await test.step(`Bring to front `, async () => {
    await page1.bringToFront();
  });

  // //go to url 
  //   await test.step(`Go to Url`, async () => {
  //     await page1.goto('/');
  //   });


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
  //user clicks on drillhole view tab 
  await test.step(`User clicks on drillhole view tab `, async () => {
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(10000);
  });

  //user clicks on add panel button at tab 1
  await test.step(`User clicks on add panel button at tab 1`, async () => {
    await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    await drillHoleView.pause(2000);
  
  });

  //user zoom out screen
  await test.step(`User zoom out screen `, async () => {
    for (let i = 0; i < 10; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page1.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
  });

  //user ctrl + hover + mouseMove on screen  at tab 1
  await test.step(`User ctrl + hover + mouseMove on screen at tab 1`, async () => {
    await drillHoleView.clickMouse(500, 400);
    await drillHoleView.pause(5000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.keyboardDown('Shift');
    await drillHoleView.mouseMove(360, 150);
    await drillHoleView.pause(2000);
    await drillHoleView.mouseMove(460, 300);
  });

  //verify value common section is displayed in tab 1
  await drillHoleView.pause(2000);
  const countValueCommonSection1 = await drillHoleView.countElement(drillHoleView.dynamicValueCommonSection('Depth'), 2);
  await drillHoleView.pause(2000);

  //user copy url and go to tab 2
  await test.step(`User copies url and paste to another tab `, async () => {
    const getUrl = page1.url();
    console.log(getUrl);
    await page2.bringToFront();
    await page2.goto(getUrl);
    await drillHoleView2.pause(3000);
  });


  //user ctrl + hover + mouseMove on screen at tab 2
  await test.step(`User ctrl + hover + mouseMove on screen at tab 2`, async () => {
    await drillHoleView2.clickMouse(500, 400);
    await drillHoleView2.pause(5000);
    await drillHoleView2.keyboardDown('Control');
    await drillHoleView2.keyboardDown('Shift');
    await drillHoleView2.mouseMove(360, 150);
    await drillHoleView2.pause(2000);
    await drillHoleView2.mouseMove(460, 250);
  
  });

  //verify value common section is displayed in tab 2 
  await drillHoleView2.pause(2000);
  const countValueCommonSection2 = await drillHoleView2.countElement(drillHoleView2.dynamicValueCommonSection('Depth'), 2);

  //verify panel is correctly displayed at tab 2 
  await drillHoleView2.countElement(drillHoleView2.dynamicValuePanel(), 2);


  //Expect the value common section in tab1 and tab 2
    await test.step(`Expect the value common section in tab1 and tab 2`, async () => {
      expect(countValueCommonSection2).toEqual(countValueCommonSection1);
    });

  //
  

});

