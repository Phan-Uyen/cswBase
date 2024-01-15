import { test, expect, chromium, Browser, Page } from "@playwright/test";
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
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=51.50000000001046&depthTo=472.55000000000166&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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

test("38730 - Downhole and Stacked Downhole views not working @drillhole @viewPanel @unstable", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

  //user selects zoom out option
  await test.step(`User select zoom out option`, async () => {
    await drillHoleView.pause(10000);
    await drillHoleView.mouseMove(760, 400);
    for (let i = 0; i < 5; i++) {
      await drillHoleView.pause(2000);
      await page.mouse.wheel(0, -50);
    }
    await drillHoleView.pause(2000);
  });

  //user switch to 3D mode 
  await test.step(`User select zoom out option`, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
    await drillHoleView.pause(2000)
    await drillHoleView.clickToElement(drillHoleView.switchTo3DMode);
    await drillHoleView.pause(10000);
  });

  //user ctr + hover + mouseMove on screen 
  await test.step(`user ctr + hover + mouseMove on screen `, async () => {
    await drillHoleView.mouseMove(700, 400);
    await drillHoleView.pause(2000);
    await drillHoleView.keyboardDown('Control');
    await drillHoleView.pause(5000);
    await drillHoleView.mouseDown();
    await drillHoleView.pause(10000);
    await drillHoleView.mouseMove(800, 300);
    await drillHoleView.pause(15000);
  });

  //user snapshot and compare image 
  await test.step(`user snapshot and compare image`, async () => {
    //snapshot and compare image #1
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });

    await drillHoleView.imageComparisons();
    await drillHoleView.pause(5000);
    await drillHoleView.reloadPage();
  });


  //user changes to dropdown stacked down hole  
  await test.step(`user changes to dropdown stacked down hole  `, async () => {
    await drillHoleView.clickToElement(drillHoleView.layoutDropdown);
    await drillHoleView.clickToElement(drillHoleView.layoutStackedDownHoleItem);
    await drillHoleView.pause(2000);
  });

  //user switches to 3D mode 
  await test.step(`User switches to 3D mode `, async () => {
    await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
    await drillHoleView.pause(2000)
    await drillHoleView.clickToElement(drillHoleView.switchTo3DMode);
    await drillHoleView.pause(10000);
  });

  //user selects zoom out option 
  await test.step(`User selects zoom out option `, async () => {
    await drillHoleView.pause(10000);
    await drillHoleView.mouseMove(760, 400);
    for (let i = 0; i < 2; i++) {
      await drillHoleView.pause(2000);
      await page.mouse.wheel(0, -50);
    }
    await drillHoleView.pause(5000);
  });

  //user ctrl + mouseMove on screen 
  await test.step(`User ctrl + mouseMove on screen `, async () => {
    await drillHoleView.pause(10000);
    await drillHoleView.mouseMove(760, 400);
    for (let i = 0; i < 2; i++) {
      await drillHoleView.pause(2000);
      await page.mouse.wheel(0, -50);
    }
    await drillHoleView.pause(5000);
  });

  //ctrl + moveMouse 
  await drillHoleView.pause(5000);
  await drillHoleView.mouseMove(700, 400);
  await drillHoleView.pause(2000);
  await drillHoleView.keyboardDown('Control');
  await drillHoleView.pause(5000);
  await drillHoleView.mouseDown();
  await drillHoleView.pause(10000);
  await drillHoleView.mouseMove(800, 300);
  await drillHoleView.pause(5000);

  //user snapshot and compare image
  await test.step(`User snapshot and compare image #2`, async () => {
    await testInfo.attach("unlock", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });
});
