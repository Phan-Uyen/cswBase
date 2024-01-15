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
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left,JA0480_WINU0725_mos-img-rgb-50u-ss,JA0480_WINU0725_mos-img-prf-gry-200u-ss,internal_depthscale_right_scroll&layout=DOWNHOLE&depthFrom=265.5&depthTo=335.3225&panelState=[{%22is3D%22:false},{%22is3D%22:true},{%22is3D%22:true},{%22is3D%22:false}]`;
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

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  drillHoleView = new DrillHoleViewPage(page);
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
test("COR-27018 - 3D mode does not initialise on 3D links @drillhole @view3DPanel @unstable", async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user opens url 
  await test.step(`User opens url`, async () => {
    await dashBoardPage.openBrowser(urlInput);
    await dashBoardPage.pause(5000);
  });

  //user selects unzoom all option 
  await test.step(`User selects unzoom all option`, async () => {
    await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
    await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
    for (let i = 0; i < 5; i++) {
        console.log('count ', i)
        await drillHoleView.pause(2000);
        await page.mouse.wheel(0, 100);
        await drillHoleView.pause(5000);
      }
  });

  //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
      await drillHoleView.pause(5000);
      await drillHoleView.imageComparisons();
    });

  //user select zoom out option 
    await test.step(`User snapshot and compare image`, async () => {
      await drillHoleView.pause(10000);
      await drillHoleView.mouseMove(760, 400);
        for (let i = 0; i < 30; i++) {
          await drillHoleView.mouseMove(100, 200);
          await drillHoleView.pause(1000);
          await page.mouse.wheel(0, -50);
          await drillHoleView.pause(1000);
            }
          await drillHoleView.pause(10000);
    });

  //expect the screen is switched to 3D mode 
    await test.step(`expect the screen is switched to 3D mode `, async () => {
      await drillHoleView.mouseMove(700, 400);
      await drillHoleView.pause(2000);
      await drillHoleView.keyboardDown('Control');
      await drillHoleView.pause(5000);
      await drillHoleView.mouseDown();
      await drillHoleView.pause(10000);
      await drillHoleView.mouseMove(760, 300);
      await drillHoleView.pause(15000); 
  });

  //user snapshot and compare image 
    await test.step(`user snapshot and compare image`, async () => {
      await testInfo.attach("unlock", {
        body: await page.screenshot(),
        contentType: "image/png",
          });
      await drillHoleView.imageComparisons();
      await drillHoleView.pause(10000);
  
  });
   
  });
  