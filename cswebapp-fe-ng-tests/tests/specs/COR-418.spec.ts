  import { test, expect, chromium, Browser, Page } from "@playwright/test";
  import LoginPage from "../pageObjects/login.page";
  import DashBoardPage from "../pageObjects/dashboard.page";
  import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
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

  test("84662 - Progress spinner on the log panel does not disappear when log is loaded in stacked downhole mode @drillhole @viewPanel", async ({ }, testInfo) => {
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

    //user clicks on drill hole view tab 
    await test.step(`User clicks on drill hole view tab`, async () => {
      await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
      await drillHoleView.pause(5000);
    });

    //user add a new panel 
    await test.step(`User clicks on add panel button`, async () => {
      await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
      await drillHoleView.pause(3000);
    });

    //user selects category
    await test.step(`User selects category`, async () => {
      await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
      await drillHoleView.pause(2000);
      await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType("Mineral Logs (45)"));
      await drillHoleView.pause(2000);
    });

    //user selects menu items list dropdown 
    await test.step(`User selects menu items list dropdown `, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('3'));
      await drillHoleView.pause(2000);
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('Log: __Sericite-illite index'));
      await drillHoleView.pause(4000);
    });

    //user changes layout to "Stacked down hole"
    await test.step(`User changes layout to "Stacked down hole"`, async () => {
      await drillHoleView.clickToElement(drillHoleView.layoutDropdown);
      await drillHoleView.pause(2000);
      await drillHoleView.clickToElement(drillHoleView.layoutStackedDownHoleItem);
      await drillHoleView.pause(5000);
    });

    //expect loading spinner is not displayed 
    await test.step(`Expect loading spinner is not displayed `, async () => {
      await drillHoleView.waitForElement(
        drillHoleView.loadingSpinner,
        "hidden",
        300000
      )
    });

    //user clicks on menu item type of panel 
    await test.step(`User clicks on menu item type of panel`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType('1'))
    });

    //user changes menu item to "Core profile"
    await test.step(`User changes menu item to Core profile`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('Core profile'))
    });

    //expect loading spinner is not displayed 
    await test.step(`Expect loading spinner is not displayed `, async () => {
      await drillHoleView.waitForElement(
        drillHoleView.loadingSpinner,
        "hidden",
        300000
      )
    });

    //user clicks on menu item type of panel 
    await test.step(`User clicks on menu item type of panel`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType('1'))
    });

    //user changes menu item to "False colour spectral image"
    await test.step(`User changes menu item to False colour spectral image`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('False colour spectral image'))
    });

    //expect loading spinner is not displayed 
    await test.step(`Expect loading spinner is not displayed `, async () => {
      await drillHoleView.waitForElement(
        drillHoleView.loadingSpinner,
        "hidden",
        300000
      )
    });

    //user clicks on menu item type of panel 
    await test.step(`User clicks on menu item type of panel`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType('1'))
    });

    //user changes menu item to "True colour spectral image"
    await test.step(`User changes menu item to False colour spectral image`, async () => {
      await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('True colour spectral image'))
    });

    //expect loading spinner is not displayed 
    await test.step(`Expect loading spinner is not displayed `, async () => {
      await drillHoleView.waitForElement(
        drillHoleView.loadingSpinner,
        "hidden",
        300000
      )
    });


  });



