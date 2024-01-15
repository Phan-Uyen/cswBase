import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";

let userName: any;
let password: any;
if (process.env.NODE_ENV === "DEV") {
  userName = process.env.USERNAME_DEV;
  password = process.env.PASSWORD_DEV;
} else {
  userName = process.env.USERNAME_PROD;
  password = process.env.PASSWORD_PROD;
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

test("72106 - Project filters not working @dashboard", async ({ }, testInfo) => {
  //set timeout 
  test.setTimeout(300000);
  await dashBoardPage.pause(4000)

  // ======================================================= Case 1 ===================================================================
  //search project Ahafo and select 
  await test.step(`Search project Ahafo and select`, async () => {
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, "Ahafo");
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );
    await dashBoardPage.pause(5000);
  });

  ///save drill hole of first project in array 
  const result: string[] = []
  let listDrillHoleOfFirstProject = (await page.$$(dashBoardPage.listDrillHole));
  for (var i = 0; i < listDrillHoleOfFirstProject.length; i++) {
    const valueDrillHoleFirstProject: string = await listDrillHoleOfFirstProject[i].textContent() as string;
    result.push(valueDrillHoleFirstProject);
  }


  //user unselect Ahafo project and clear field search 
  await test.step(`User unselect Ahafo project and clear field search `, async () => {
    await dashBoardPage.clearValue(dashBoardPage.searchInput);
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Ahafo"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );
    await dashBoardPage.pause(5000);
  });

  //search project Agbaja and select 
  await test.step(`Search project Agbaja and select `, async () => {
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, "Agbaja");
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );
    await dashBoardPage.pause(4000)
  });

  //save drill hole of first project in array 
  let listDrillHoleOfSecondProject = (await page.$$(dashBoardPage.listDrillHole));
  for (var i = 0; i < listDrillHoleOfSecondProject.length; i++) {
    const valueDrillHoleSecondProject: string = await listDrillHoleOfSecondProject[i].textContent() as string;
    result.push(valueDrillHoleSecondProject);
  }
  await dashBoardPage.pause(2000);

  //user unselect Ahafo project and clear field search 
  await test.step(`User unselect Agbaja project and clear field search `, async () => {
    await dashBoardPage.clearValue(dashBoardPage.searchInput);
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Agbaja"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );
    await dashBoardPage.pause(5000);
  });

  //User select project "Agbaja" and "Ahafo" project
  await test.step(`User select project "Agbaja" and "Ahafo" project`, async () => {
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Agbaja"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Ahafo"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );

  });

  //create and save the drill holes of two project at the same time 
  const array: string[] = []
  let listDrillHole = (await page.$$(dashBoardPage.listDrillHole));
  for (var i = 0; i < listDrillHole.length; i++) {
    const valueDrillHole: string = await listDrillHole[i].textContent() as string;
    array.push(valueDrillHole);
  }
  //compare two arrays to equal 
    await dashBoardPage.reloadPage();
    await dashBoardPage.pause(4000)
    expect(result).toEqual(expect.arrayContaining(array));
    await dashBoardPage.pause(3000);

  await test.step(`User unselect Agbaja/Ahafo project and clear field search `, async () => {
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Agbaja"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );

    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Ahafo"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );
    await dashBoardPage.pause(5000);
  });


  //======================================================= Case 2 ===================================================================
  //search project Ahafo and unselect
  await test.step(`Search and clicking on project Ahafo and Agbaja`, async () => {
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Ahafo"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Agbaja"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );
    await dashBoardPage.pause(4000);
  });

  //search project Agbaja and unselect 
  await test.step(`Unselect all projects above`, async () => {
    //unselect Ahafo project
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Ahafo"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Ahafo")
    );
    //unselect Agbaja project 
    await dashBoardPage.scrollToElement(dashBoardPage.projectSearchResult("Agbaja"));
    await dashBoardPage.clickToElement(
      dashBoardPage.projectSearchResult("Agbaja")
    );
    await dashBoardPage.pause(5000);

  });

  //expect the full list drill holes is displayed after user unselect all the projects
  await test.step(`Expect the full list drill holes is displayed after user unselect all the projects`, async () => {
    await dashBoardPage.countElement(dashBoardPage.listDrillHole, 10221)
  });
});



