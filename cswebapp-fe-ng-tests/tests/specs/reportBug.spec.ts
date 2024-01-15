import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import ReportBugPage from "../pageObjects/reportBug.page"
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
let dashBoardPage: DashBoardPage;
let reportBugPage: ReportBugPage;

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  reportBugPage = new ReportBugPage(page);
});
test.beforeEach(async ({}, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 60000);
  await loginPage.openBrowser('/');
  await loginPage.fillToElement(loginPage.userNameInput, userName);
  await loginPage.fillToElement(loginPage.passwordInput, password);
  await loginPage.clickToElement(loginPage.signInInput);
  await dashBoardPage.waitForElement(
    dashBoardPage.logo,
    "visible",
    300000
    )
  await reportBugPage.waitForElement(
    dashBoardPage.dashboardTitle,
    "visible",
    300000
  );
  // await page.pause()
});
test.afterEach(async ({ browser }) => {
  await page.evaluate(() => window.localStorage.clear());
  await page.evaluate(() => window.sessionStorage.clear());
  await page.reload();
  // await browser.close();
});

test('9424 - Verify click on Report Bug button and show @reportBug', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user access report bug page 
  await reportBugPage.clickToElement(reportBugPage.reportBugBtn)
  await reportBugPage.pause(2000);

  //expect all elements related to report bug are displayed 
  await reportBugPage.waitForElement(
    reportBugPage.errorTitleText,
    "visible",
    300000
    )

  await reportBugPage.waitForElement(
    reportBugPage.errorDescriptionText,
    "visible",
    300000
    )

  await reportBugPage.waitForElement(
    reportBugPage.errorImage,
    "visible",
    300000
    )

  });

  test('9429 - Verify click on Submit button after insert all required forms @reportBug', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user access report bug page 
  await reportBugPage.clickToElement(reportBugPage.reportBugBtn)
  await reportBugPage.pause(2000);

  //fill all information required 
  await reportBugPage.fillToElement(reportBugPage.errorTitleForm,'Testing Error');
  await reportBugPage.fillToElement(reportBugPage.errorDescriptionForm,'Error Report');

  //user clicks on "Submit" button
  await reportBugPage.clickToElement(reportBugPage.submitPopupBtn);
  await reportBugPage.pause(2000);

  });

test('9430 - Verify click on X icon and show', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user access report bug page 
  await reportBugPage.clickToElement(reportBugPage.reportBugBtn)
  await reportBugPage.pause(2000);

  //user clicks on "X" icon on report bug pop-up 
  await reportBugPage.clickToElement(reportBugPage.closeIconPopUp);
  await reportBugPage.pause(2000);

  // expect the "Close" icon is not displayed 
  await reportBugPage.waitForElement(
    reportBugPage.closeIconPopUp,
    "hidden",
    300000
    )

  });

  test('9431 - Verify click on Close button and show @reportBug', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user access report bug page 
  await reportBugPage.clickToElement(reportBugPage.reportBugBtn)
  await reportBugPage.pause(2000);

  //user clicks on "Cancel" button at report bug pop-up 
  await reportBugPage.clickToElement(reportBugPage.closePopupBtn)
  await reportBugPage.pause(2000); 

  //expect the "Cancel" button is not displayed 
  await reportBugPage.waitForElement(
    reportBugPage.closePopupBtn,
    "hidden",
    300000
  )
  });


 test('9432 - Verify not input data but click on submit button @reportBug', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user access report bug page 
    await reportBugPage.clickToElement(reportBugPage.reportBugBtn)
    await reportBugPage.pause(2000);
  
    //user clicks on "Cancel" button at report bug pop-up 
    await reportBugPage.clickToElement(reportBugPage.submitPopupBtn)
    await reportBugPage.pause(2000); 
  
    //expect the error message is displayed 
    await reportBugPage.waitForElement(
      reportBugPage.errorEmptyErrorTitle,
      "visible",
      300000
    )
    await reportBugPage.waitForElement(
      reportBugPage.errorEmptyErrorDescription,
      "visible",
      300000
      )
    });

  





