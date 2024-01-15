  import { test, expect, chromium, Page } from '@playwright/test';
  import LoginPage from '../pageObjects/login.page';
  import DashBoardPage from '../pageObjects/dashboard.page';

  let userName: any;
  let password: any;
  if (process.env.NODE_ENV === "PROD") {
    userName = process.env.USERNAME_PROD;
    password = process.env.PASSWORD_PROD;
  } else {
    userName = process.env.USERNAME_DEV;
    password = process.env.PASSWORD_DEV;
  }
  //let page : Page // neu dung page ngoai test thi moi can
  let loginPage: LoginPage;
  let dashBoardPage: DashBoardPage;

  test.beforeAll(async ({page }) => { 
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page)
    dashBoardPage = new DashBoardPage(page)
  });
  test.beforeEach(async ({}, testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 60000);
      // await loginPage.openBrowser('/');
      // await loginPage.fillToElement(loginPage.userNameInput, userName)
      // await loginPage.fillToElement(loginPage.passwordInput, password)
      // await loginPage.clickToElement(loginPage.signInInput)
      // expect(dashBoardPage.logo).toBeDefined()
      // await page.pause()
    });
    // test.afterEach(async ({ browser,page }) => {
    //   await page.evaluate(() => window.localStorage.clear());
    //   await page.evaluate(() => window.sessionStorage.clear());
    //   await page.reload();
    //   // await browser.close();
    // });

    test('7575 - Login successfully with correct username and password data', async ({  }) => {
      
      await test.step(`Open site Corescan`, async () => {
        await loginPage.openBrowser('/');
      });  

      await test.step(`User enters username`, async () => {
          await loginPage.fillToElement(loginPage.userNameInput, userName);
      });

      await test.step(`User enters password`, async () => {
        await loginPage.fillToElement(loginPage.passwordInput, password);
      });

      await test.step(`User clicks on Login button`, async () => {
        await loginPage.clickToElement(loginPage.signInInput)
      });
    
    await test.step(`Expect user login successfully`, async () => {
      await dashBoardPage.waitForElement(
        dashBoardPage.logo,
        "visible",
        300000
      );
  });

  });


  test('7576 - Login failed with incorrect username', async ({  }) => {
    await test.step(`Open site Corescan`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters inccorect username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, 'enouvo111');
    });

    await test.step(`User enters valid password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, password);
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInInput)
    });

    await test.step(`Expect error message is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.errMessage,
        "visible",
        300000
      );
    });
   
  });

  test('7577 - Login failed with incorrect password', async ({  }) => {
    await test.step(`Open site Corescan`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters valid username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, userName);
    });

    await test.step(`User enters invalid password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, 'thickbreakfuture');
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInInput)
    });

    await test.step(`Expect error message is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.errMessage,
        "visible",
        300000
      );
      
    });
    
  });

  test('64939 - Login failed with incorrect email and incorrect password @login', async ({  }) => {
    await test.step(`Open site Corescan`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters invalid username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, 'enouvo123');
    });

    await test.step(`User enters invalid password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, 'thickbreakfuture');
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInInput)
    });

    await test.step(`Expect error message is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.errMessage,
        "visible",
        300000
      );
      
    });
    
  });

  test('64940 - Login failed with empty username @login', async ({  }) => {
    await test.step(`Open site Corescan`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters empty data username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, '');
    });

    await test.step(`User enters empty data password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, password);
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInInput)
    });

    await test.step(`Expect error message is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.requiredMessage,
        "visible",
        300000
      );
      
    });
    
  });


  test('64941 - Login failed with empty password @login', async ({  }) => {
    await test.step(`Open site Corescan`, async () => {
      await loginPage.openBrowser('/');
    });  

    await test.step(`User enters empty data username`, async () => {
      await loginPage.fillToElement(loginPage.userNameInput, 'enouvo123');
    });

    await test.step(`User enters empty data password`, async () => {
      await loginPage.fillToElement(loginPage.passwordInput, '');
    });

    await test.step(`User clicks on Login button`, async () => {
      await loginPage.clickToElement(loginPage.signInInput)
    });

    await test.step(`Expect error message is displayed`, async () => {
      await loginPage.waitForElement(
        loginPage.requiredMessage,
        "visible",
        300000
      );
      
    });
    
  });


  
