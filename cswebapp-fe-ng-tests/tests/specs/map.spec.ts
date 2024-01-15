// import { test, expect, chromium, Browser, Page } from "@playwright/test";
// import LoginPage from "../pageObjects/login.page";
// import DashBoardPage from "../pageObjects/dashboard.page";
// import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
// const baseURL = "https://dev-react-aws.coreshed.com";
// let userName: any;
// let password: any;
// if (process.env.NODE_ENV === "DEV") {
//   userName = process.env.USERNAME_DEV;
//   password = process.env.PASSWORD_DEV;
// } else {
//   userName = process.env.USERNAME_PROD;
//   password = process.env.PASSWORD_PROD;
// }
// let page: Page;
// let loginPage: LoginPage;
// let dashBoardPage: DashBoardPage;

// test.beforeAll(async ({}, testInfo) => {
//   const browser = await chromium.launch();
//   page = await browser.newPage();

//   loginPage = new LoginPage(page);
//   dashBoardPage = new DashBoardPage(page);

// });
// test.beforeEach(async ({}, testInfo) => {
//   testInfo.setTimeout(testInfo.timeout + 60000);
//   await loginPage.openBrowser('/');
//   await loginPage.fillToElement(loginPage.userNameInput, userName);
//   await loginPage.fillToElement(loginPage.passwordInput, password);
//   await loginPage.clickToElement(loginPage.signInInput);
//   await dashBoardPage.waitForElement(
//     dashBoardPage.logo,
//     "visible",
//     300000
//     )
//   await dashBoardPage.waitForElement(
//     dashBoardPage.dashboardTitle,
//     "visible",
//     300000
//   );
//   // await page.pause()
// });
// test.afterEach(async ({ browser }) => {
//   await page.evaluate(() => window.localStorage.clear());
//   await page.evaluate(() => window.sessionStorage.clear());
//   await page.reload();
//   // await browser.close();
// });

// test('65011 - View creeen map when user selects full screen', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//     await dashBoardPage.pause(2000);

//   //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//    //snapshot and compare image 
//       await dashBoardPage.pause(5000);
//       await testInfo.attach("unlock", {
//           body: await page.screenshot(),
//           contentType: "image/png",
//       });
//       await dashBoardPage.imageComparisons();
//       await dashBoardPage.pause(2000);

//     });

// test('65012 - View screen map when user selects exis full screen', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//     await dashBoardPage.pause(2000);

//   //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//    //expect exit full screen button is displayed 
//    await dashBoardPage.waitForElement(
//     dashBoardPage.exitFullScreenBtn,
//     "visible",
//     20000
//    )

//   //user selects exit full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.exitFullScreenBtn);
//     await dashBoardPage.pause(2000);

//    //snapshot and compare image 
//    await dashBoardPage.pause(5000);
//    await testInfo.attach("unlock", {
//        body: await page.screenshot(),
//        contentType: "image/png",
//    });
//    await dashBoardPage.imageComparisons();
//    await dashBoardPage.pause(2000);

//     });

// test('65013 - View screen map when user selects zoom out', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//     await dashBoardPage.pause(2000);

//   //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//   //user clicks on zoom out button

//     await dashBoardPage.dblclickToElemnt(dashBoardPage.zoomOutBtn)
//     await dashBoardPage.pause(5000);

//    //snapshot and compare image 
//    await dashBoardPage.pause(5000);
//    await testInfo.attach("unlock", {
//        body: await page.screenshot(),
//        contentType: "image/png",
//    });
//    await dashBoardPage.imageComparisons();
//    await dashBoardPage.pause(2000);

//     });

// test('65182 - View screen map when user selects zoom in', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//     await dashBoardPage.pause(2000);

//   //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//   //user clicks on zoom out button

//     await dashBoardPage.dblclickToElemnt(dashBoardPage.zoomInBtn)
//     await dashBoardPage.pause(5000);
    
//    //snapshot and compare image 
//    await dashBoardPage.pause(5000);
//    await testInfo.attach("unlock", {
//        body: await page.screenshot(),
//        contentType: "image/png",
//    });
//    await dashBoardPage.imageComparisons();
//    await dashBoardPage.pause(2000);

//     });  

// test('65183 - View screen map with terrain', async ({}, testInfo) => {

//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//   await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//   await dashBoardPage.pause(2000);

//   //user selects terrain
//   await dashBoardPage.clickToElement(dashBoardPage.terrainCheckBox);
//   await dashBoardPage.pause(2000);

//    //user selects full screen map 
//    await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//    await dashBoardPage.pause(5000);

//    //snapshot and compare image 
//    await dashBoardPage.pause(5000);
//    await testInfo.attach("unlock", {
//        body: await page.screenshot(),
//        contentType: "image/png",
//    });
//    await dashBoardPage.imageComparisons();
//    await dashBoardPage.pause(2000);

//     });  

// test('65184 - View screen map without terrain', async ({}, testInfo) => {
//     //set timeout 
//       test.setTimeout(300000);

//     //user access map
//       await dashBoardPage.clickToElement(dashBoardPage.mapBtn);
//       await dashBoardPage.pause(2000);

//     //snapshot and compare image 
//       await dashBoardPage.pause(5000);
//       await testInfo.attach("unlock", {
//           body: await page.screenshot(),
//           contentType: "image/png",
//       });
//       await dashBoardPage.imageComparisons();
//       await dashBoardPage.pause(2000);

//     });



    
// test('65185 - View screen satellite with labbels', async ({}, testInfo) => {
//     //set timeout 
//     test.setTimeout(300000);

//     //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.satelliteBtn);
//     await dashBoardPage.pause(2000);

//     //user selects terrain
//     await dashBoardPage.clickToElement(dashBoardPage.labelsCheckBox);
//     await dashBoardPage.pause(2000);

//     //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//    //snapshot and compare image 
//    await dashBoardPage.pause(5000);
//    await testInfo.attach("unlock", {
//        body: await page.screenshot(),
//        contentType: "image/png",
//    });
//    await dashBoardPage.imageComparisons();
//    await dashBoardPage.pause(2000);

//     });  


// test('65189 - View screen satellite without labbels', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //user access map
//     await dashBoardPage.clickToElement(dashBoardPage.satelliteBtn);
//     await dashBoardPage.pause(2000);

//    //user selects full screen map 
//     await dashBoardPage.clickToElement(dashBoardPage.fullScreenBtn);
//     await dashBoardPage.pause(5000);

//    //snapshot and compare image 
//     await dashBoardPage.pause(5000);
//     await testInfo.attach("unlock", {
//         body: await page.screenshot(),
//         contentType: "image/png",
//     });
//     await dashBoardPage.imageComparisons();
//     await dashBoardPage.pause(2000);

//     });  

    

  





