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
const depthFrom = "90.11";
const depthTo = "96.8566666666667";
const urlInput = `${baseURL}/cswebapp/dhviewer?drillhole=WINU0725&product=internal_depthscale_left_scroll,JA0480_WINU0725_mos-img-rgb-50u-ss,JA0480_WINU0725_mos-img-bnd-sp-2185-2165-kln-ss,internal_depthscale_right_scroll&layout=STACKEDSECTION&depthFrom=${depthFrom}&depthTo=${depthTo}&panelState=[{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false},{%22is3D%22:false}]`;
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

test("COR-269 - Core Photography / Mineralogy Product Alignment Test @test1 @drillhole @viewPanel", async ({}, testInfo) => {
  //set timeout 
  test.setTimeout(300000);

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

  //expect the backouground of WINU0725 drillhole is correctly displayed
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

  //user add a new page 
  await test.step(`User add a new panel `, async () => {
    await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    await drillHoleView.pause(5000);
  });

  
    //user selects category "Mineral Composition"
    await test.step(`User selects category "Mineral Composition"`, async () => {
      await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
      await drillHoleView.clickToElement(
        drillHoleView.dynamicCategoryType("Mineral Composition"));
      await drillHoleView.pause(10000);
    });

    //user selects category dropdown list 
    await test.step(`User selects category dropdown list `, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('3'));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('Kaolinite crystallinity'));
        await drillHoleView.pause(2000);
        await drillHoleView.reloadPage();
        await drillHoleView.pause(2000);
    });

  //user unzoom all on screen 
  await test.step(`User unzoom all on screen`, async () => {
    await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
    await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
    for (let i = 0; i < 5; i++) {
        console.log('count ', i)
        await drillHoleView.pause(2000);
        await page.mouse.wheel(0, 100);
        await drillHoleView.pause(5000);
      }
  });

  //user unzoom on screen 
  await test.step(`User zoom out on screen`, async () => {
    await drillHoleView.pause(5000);
    await drillHoleView.mouseMove(100, 200);
    for (let i = 0; i < 12; i++) {
      await drillHoleView.mouseMove(100, 200);
      await drillHoleView.pause(1000);
      await page.mouse.wheel(0, -50);
      await drillHoleView.pause(1000);
    }
    await drillHoleView.pause(2000);
  
  });

  //user selects layout dropdown
  await test.step(`User selects layout dropdown`, async () => {
    await drillHoleView.clickToElement(drillHoleView.layoutDropdown);
    await drillHoleView.clickToElement(drillHoleView.layoutDownHoleItem);
    await drillHoleView.pause(2000);
  });

  //user snapshot image and compare image 
  await test.step(`User snapshot image and compare image `, async () => {
    await testInfo.attach("layoutDownHoleItem", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  
    await drillHoleView.imageComparisons();
    await drillHoleView.pause(2000);
  });

  //user continutes to select layout dropdown 
  await test.step(`User continutes to select layout dropdown`, async () => {
    await drillHoleView.clickToElement(drillHoleView.layoutDropdown);
    await drillHoleView.clickToElement(drillHoleView.layoutStackedDownHoleItem);
    await drillHoleView.pause(2000);
  });

  //user compares image 
  await test.step(`User comapres image`, async () => {
    await testInfo.attach("layoutStackedDownHoleItem", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await drillHoleView.imageComparisons();
  });
  
});
