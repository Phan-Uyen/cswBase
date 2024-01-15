import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import CorePhotoPage  from "../pageObjects/corePhoto.page";
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
let dashBoardPage: DashBoardPage;
let corePhotoPage : CorePhotoPage

test.beforeAll(async ({}, testInfo) => {
  const browser = await chromium.launch();
  page = await browser.newPage();

  loginPage = new LoginPage(page);
  dashBoardPage = new DashBoardPage(page);
  corePhotoPage = new CorePhotoPage(page);

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

test('66239 - Verify the "Manage Models" " Manage Data Stores" and "+ Create New Pipeline" button is displayed at core photo page', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);
    
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
    });
  
    //expect the manage button is displayed
    await test.step(`Expect the manage button is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.manageModelBtn,
        "visible",
        300000
      )
    });

    //expect the manage data store button is displayed
    await test.step(`Expect the manage data store button is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.manageDataStoresBtn,
        "visible",
        300000
      )
    });

    //expect the create new pipeline is displayed 
    await test.step(`Expect the create new pipeline is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.createNewPipeline,
        "visible",
        300000
      )
    });
    });

test('66248 - Check user fillters "Pipeline ID" at core photo page - pending ', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

   //user clicks on "Core Photo" button  
   await test.step(`User clicks on Core Photo button`, async () => {
    await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
    await dashBoardPage.pause(5000);
  });

  //user filters pipeline ID 
  await test.step(`User filters pipeline ID`, async () => {
    await corePhotoPage.fillToElement(
      corePhotoPage.searchPipelineID,"200"
    )
    await corePhotoPage.pause(2000);
  });

  //expect the pipeline ID is correctly displayed 
    // await test.step(`Expect the pipeline ID is correctly displayed`, async () => {
    //     // await corePhotoPage.waitForElement(
    // //   corePhotoPage.dynamicValuePipelineID('200'),
    // //   "visible",
    // //   300000
  
    // });


  //pending 

    });

  test('66250 - Check user selects default source type @unstable', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

   //user clicks on "Core Photo" button  
   await test.step(`User clicks on Core Photo button`, async () => {
    await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn);
  });

    //user clicks on source type default field 
   await test.step(`User clicks on source type default field `, async () => {
    await corePhotoPage.clickToElement(corePhotoPage.sourceTypeField);
    await corePhotoPage.pause(2000);
  });

    //expect the All default source type is displayed  
   await test.step(`Expect the All default source type is displayed`, async () => {
    await corePhotoPage.waitForElement(
      corePhotoPage.dynamicSourceTypeList('All types'),
      "visible",
      300000
    )
  });

    //expect the Azure Blob Storage default source type is displayed  
    await test.step(`Expect the Azure Blob Storage default source type is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicSourceTypeList('Azure Blob Storage'),
        "visible",
        300000
      )
    });

    //expect the SMB Storage default source type is displayed  
    await test.step(`Expect the SMB Storage default source type is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicSourceTypeList('SMB Storage'),
        "visible",
        300000
      )
    })

    //expect the Local storage default source type is displayed  
    await test.step(`Expect the Local storage default source type is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicSourceTypeList('Local storage'),
        "visible",
        300000
      )
    })

    });

test('66251 - Check user selects default status @unstable', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

   //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
    });

  //user clicks on status default field 
    await test.step(`User clicks  on status default field`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.statusField);
      await corePhotoPage.pause(2000);
    });

    //expect the "All Status" is correctly displayed 
    await test.step(`Expect the "All Status" is correctly displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicStatusList('All statuses'),
        "visible",
        300000
      )
    });

    //expect the "Inprogress" is correctly displayed 
    await test.step(`Expect the "Inprogress" is correctly displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicStatusList('Inprogress'),
        "visible",
        300000
      )
    });

    //expect the "Completed" is correctly displayed 
    await test.step(`Expect the "Completed" is correctly displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicStatusList('Completed'),
        "visible",
        300000
      )
    });
    
    //expect the "Failed" is correctly displayed 
    await test.step(`Expect the "Failed" is correctly displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicStatusList('Failed'),
        "visible",
        300000
      )
    });

    //expect the "Cancelled" is correctly displayed 
    await test.step(`Expect the "Cancelled" is correctly displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicStatusList('Cancelled'),
        "visible",
        300000
      )
    });
    
    });

  // test('70902 - Check user selects status default', async ({}, testInfo) => {
  // //set timeout 
  //   test.setTimeout(300000);

  // //open url 
  //   await dashBoardPage.openBrowser('/');
  //   await dashBoardPage.pause(5000);

  // //user clicks on "Core Photo" button 
  //   await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
  //   await dashBoardPage.pause(5000);
  
  // //user clicks on status default field 
  //   await corePhotoPage.clickToElement(corePhotoPage.statusField);
  //   await corePhotoPage.pause(2000);
  //       await corePhotoPage.clickToElement(corePhotoPage.dynamicStatusList('Inprogress'));
  //   await corePhotoPage.pause(5000);

  // //Get all the status Inprogress
  //  const results = await page.$$("xpath=//th[contains(text(),'Status')]//parent::tr//parent::thead//following-sibling::tbody//child::tr//child::td//span[contains(text(),'Inprogress')]");
   
  //  let allStatusAreInprogress = false;
  //  for (const result of results) {
  //    const status = await result.textContent();
  //    if (status == 'Inprogress') {
  //       allStatusAreInprogress = true;
  //    }
  //   }
  //   await expect(allStatusAreInprogress).toBeTruthy();

  //   });
  
  test('66252 - Check user selects default user @unstable', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

   //user clicks on "Core Photo" button  
   await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on user default field 
    await test.step(`User clicks on user field`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.userField);
      await corePhotoPage.pause(2000);
    });

    //expect the "All people" user list is displayed 
    await test.step(`Expect the "All people" user list is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicUserList('All people'),
        "visible",
        2000
      )
    });

    await test.step(`Expect the "Anh Doan" user list is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicUserList('Anh Doan'),
        "visible",
        2000
      )
    });

    });
  
  // test('66284 - CVerify displaying the "Total items" of core photo', async ({}, testInfo) => {
  // //set timeout 
  //   test.setTimeout(300000);

  // //open url 
  //   await dashBoardPage.openBrowser('/');
  //   await dashBoardPage.pause(5000);

  // //user clicks on "Core Photo" button 
  //   await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
  //   await dashBoardPage.pause(5000);

  // //expect the total items of core photo is displayed
  //   await corePhotoPage.waitForElement(
  //     corePhotoPage.totalItemOfCorePhoto,
  //     "visible",
  //     300000
  //   )
   
  
  //   });

// test('66281 - Verify the results are correctly displayed when user selects paging at core photo', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //open url 
//     await dashBoardPage.openBrowser('/');
//     await dashBoardPage.pause(5000);

//   //user clicks on "Core Photo" button 
//     await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
//     await dashBoardPage.pause(5000);

//   //user select pagination with 5 page option 
//     await corePhotoPage.clickToElement(corePhotoPage.selectPaginationCorePhoto);
//     await corePhotoPage.pause(2000);
//     await corePhotoPage.clickToElement(corePhotoPage.dynamicValuePaginationCorePhoto('5 / page')); 
//     await corePhotoPage.pause(3000)

//   //expect displaying 5 page 
//     await corePhotoPage.countElement(corePhotoPage.dataRowCorePhotoList,5);
//     await corePhotoPage.pause(2000);
//     });
  
//================================== Manage Models Section ===============================================

test('66290 - Verify the "Train New Model" button is displayed', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Models" button 
    await test.step(`User clicks on manage button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
      await corePhotoPage.pause(2000); 
  });
  
    //expect the train new model button 
    await test.step(`Expect the train new model button `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.trainnewModelBtn,
        "visible",
        300000
      )
      });
  });

  
test('66294 - Verify displaying correctly the "Total ietms" of model @pending', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Manage Models" button 
  await test.step(`User clicks on Manage Models button`, async () => {
    await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
    await corePhotoPage.pause(4000); 
});

  //expect the total item of manage model is displayed
  // await test.step(`Expect the total item of manage model is displayed`, async () => {
  //   await corePhotoPage.waitForElement(
  //     corePhotoPage.totalItemOfManageModel,
  //     "visible",
  //     300000
  //   )
  //   });
});

// test('66736 - Check user clicks on "X" icon at Manage Models modal', async ({}, testInfo) => {
//   //set timeout 
//     test.setTimeout(300000);

//   //open url 
//     await dashBoardPage.openBrowser('/');
//     await dashBoardPage.pause(5000);

//   //user clicks on "Core Photo" button 
//     await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
//     await dashBoardPage.pause(5000);

//   //user clicks on "Manage Models" button 
//     await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
//     await corePhotoPage.pause(4000); 
  
//   //user clicks on "X" icon at manage models button 
//     await corePhotoPage.clickToElement(corePhotoPage.closeManageModels);
//     await corePhotoPage.pause(2000);
  
//   //verify the "Manage Models" modal is closed 
//     await corePhotoPage.waitForElement(
//       corePhotoPage.trainnewModelBtn,
//       "hidden",
//       30000
//     )

//     await corePhotoPage.waitForElement(
//       corePhotoPage.manageModelBtn,
//       "visible",
//       30000
//     )

//   });

  test('66297 - Check user clicks on "Train New Model" button and Show', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Manage Models" button 
    await test.step(`User clicks on "Manage Models" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
      await corePhotoPage.pause(4000); 
  });

  //user clicks on "Train New Model" button 
    await test.step(`User clicks on "Trai New Model" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.trainnewModelBtn);
      await corePhotoPage.pause(2000); 
  });

  //expect the input train new model name is displayed 
    await test.step(`Expect the input train new model name is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.inputTrainNewModelName,
        "visible",
        300000
      )
  });

  // //expect the input parent field is displayed 
  //   await test.step(`Expect the input parent is displayed`, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.inputParent,
  //       "visible",
  //       300000
  //     )
  // });

  // //expect the input annotation data field is displayed
  //   await test.step(`Expect the input annotation data field is displayed`, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.inputAnnotationData,
  //       "visible",
  //       300000
  //     )
  //   });

  });


test('66298 - Check user clicks on "Cancel" button at Trai New Model modal', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Models" button  
    await test.step(`User clicks on "Manage Models" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
      await corePhotoPage.pause(4000); 
  });

   //user clicks on "Train New Model" button 
    await test.step(`User clicks on "Train New Model" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.trainnewModelBtn);
      await corePhotoPage.pause(4000); 
  });

   //user clicks on "Cancel" button at "Train New Model" modal 
     await test.step(`User clicks on "Cancel" button at "Train New Model" modal `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.cancelBtn);
      await corePhotoPage.pause(2000);
  });

  //expect the input train new model name is displayed 
    await test.step(`Expect the input train new model name is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.inputTrainNewModelName,
        "hidden",
        300000
      )
  });

  // //expect the input parent field is displayed 
  //   await test.step(`Expect the input parent is displayed`, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.inputParent,
  //       "hidden",
  //       300000
  //     )
  // });

  // //expect the input annotation data field is displayed
  //   await test.step(`Expect the input annotation data field is displayed`, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.inputAnnotationData,
  //       "hidden",
  //       300000
  //     )
  //   });

  //expect the train new Mode button
      await test.step(`Expect the input annotation data field is displayed`, async () => {
        await corePhotoPage.waitForElement(
          corePhotoPage.trainnewModelBtn,
          "visible",
          300000
        )
      });

    
  
  });

test('66299 - Check user clicks on "X" icon at Train New Model modal @incomplete', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Models" button  
    await test.step(`User clicks on "Manage Models" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
      await corePhotoPage.pause(4000); 
  });

   //user clicks on "Train New Model" button 
    await test.step(`User clicks on "Train New Model" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.trainnewModelBtn);
      await corePhotoPage.pause(4000); 
  });

//    //user clicks on "X" icon at "Train New Model" modal 
//      await test.step(`User clicks on "X" icon at "Train New Model" modal `, async () => {
//       await corePhotoPage.clickToElement(corePhotoPage.closeTrainNewModel);
//       await corePhotoPage.pause(4000); 
//   });
  
//    //expect the input train new model name is displayed 
//    await test.step(`Expect the input train new model name is not displayed`, async () => {
//     await corePhotoPage.waitForElement(
//       corePhotoPage.inputTrainNewModelName,
//       "hidden",
//       300000
//     )
// });

// //expect the input parent field is displayed 
//   await test.step(`Expect the input parent is displayed`, async () => {
//     await corePhotoPage.waitForElement(
//       corePhotoPage.inputParent,
//       "hidden",
//       300000
//     )
// });

// //expect the input annotation data field is displayed
//   await test.step(`Expect the input annotation data field is displayed`, async () => {
//     await corePhotoPage.waitForElement(
//       corePhotoPage.inputAnnotationData,
//       "hidden",
//       300000
//     )
//   });

// //expect the train new Mode button
//     await test.step(`Expect the input annotation data field is displayed`, async () => {
//       await corePhotoPage.waitForElement(
//         corePhotoPage.trainnewModelBtn,
//         "visible",
//         300000
//       )
//     });

  });

  test('66301 - Check user leaves all fields blank and clicking start button @corePhoto @', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Models" button  
    await test.step(`User clicks on "Manage Models" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
      await corePhotoPage.pause(4000); 
  });

   //user clicks on "Train New Model" button 
    await test.step(`User clicks on "Train New Mode" button  `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.trainnewModelBtn);
      await corePhotoPage.pause(4000); 
  });

    //user clicks on "Start" button is displayed at Train New Model modal 
     await test.step(`User clicks on "Start" button is displayed at Train New Model modal `, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.startBtn);
      await corePhotoPage.pause(2000);
    });

  //   //expect the empty error message train new mode name is displayed 
  //    await test.step(`Expect the empty error message train new mode name is displayed`, async () => {
  //     await corePhotoPage.pause(2000); await corePhotoPage.waitForElement(
  //       corePhotoPage.emptyErrorMessageTranNewModelName,
  //       "visible",
  //       30000
  //     )
  // });

  //   //expect the empty error messgage parent is displayed 
  //   await test.step(`Expect the empty error messgage parent is displayed `, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.emptyErrorMessageParent,
  //       "visible",
  //       30000
  //     )
  // });
    
  //   //expect the empty error messgage annotation data is displayed
  //   await test.step(`Expect the empty error messgage annotation data is displayed`, async () => {
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.emptyErrorMessageAnnotationData,
  //       "visible",
  //       30000
  //     )
  // });
    

  });

  // test('66293 - Verify the results are correctly displayed when user selects paging of manage model', async ({}, testInfo) => {
  //   //set timeout 
  //     test.setTimeout(300000);
  
  //   //open url 
  //     await dashBoardPage.openBrowser('/');
  //     await dashBoardPage.pause(5000);
  
  //   //user clicks on "Core Photo" button 
  //     await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
  //     await dashBoardPage.pause(5000);
    
  //   //user accesses "Manage Models" modal 
  //     await corePhotoPage.clickToElement(corePhotoPage.manageModelBtn);
  //     await corePhotoPage.pause(2000);
  
  //   //user select pagination with 5 page option 
  //     await corePhotoPage.clickToElement(corePhotoPage.selectPaginationManageModel);
  //     await corePhotoPage.pause(2000);
  //     await corePhotoPage.clickToElement(corePhotoPage.dynamicValuePaginationManageModel('5 / page')); 
  //     await corePhotoPage.pause(3000)
  
  //   //expect displaying 5 page 
  //     await corePhotoPage.countElement(corePhotoPage.dataRowManageModelList,5);
  //     await corePhotoPage.pause(2000);
  //     });

  //================================== Manage Data Stores ===============================================

  test('66382 - Check user clicks on "Manage Data Stores" button', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });
  
    //user clicks on "Manage Data Store" button 
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    
    //check expected element is displayed 
      await corePhotoPage.waitForElement(
        corePhotoPage.createDataStoresBtn,
        "visible",
        300000
      )
      });

  // test('66393 - Check user clicks on "X" icon at Manage Data store modal', async ({}, testInfo) => {
  //   //set timeout 
  //     test.setTimeout(300000);
  
  //   //open url 
  //     await dashBoardPage.openBrowser('/');
  //     await dashBoardPage.pause(5000);
  
  //   //user clicks on "Core Photo" button 
  //     await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
  //     await dashBoardPage.pause(5000);
  
  //   //user clicks on "Manage Data Store" button 
  //     await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
  //     await corePhotoPage.pause(4000); 
    
  //   //user clicks on "X" icon is displayed at "Manage Data Store" modal 
  //     await corePhotoPage.clickToElement(corePhotoPage.closeManageDataStoresModal);
  //     await corePhotoPage.pause(2000);
    
  //   //expect the "Manage Data Store" is closed 
  //     await corePhotoPage.waitForElement(
  //       corePhotoPage.createDataStoresBtn,
  //       "hidden",
  //       300000
  //     )
  //     });
  
  test('66386 - Verify displaying correctly  the "Total ietms" of manage data store @corePhoto @unstable', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
    });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //expect the total items of manage data store is displayed 
    await test.step(`Expect the total items of manage data store is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.totalItemOfManageDataStores,
        "visible",
        300000
      )
    });

  });

  test('66392 - Check user clicks on "Create Data Store" button at Manage Data Store modal', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //user clicks on "Create Data Store" button 
    await test.step(`User clicks on "Create Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createDataStoresBtn);
      await corePhotoPage.pause(2000);
    });

    //expect the 'Create New Local Store" modal is opened 
    await test.step(`Expect the 'Create New Local Store" modal is opened`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.inputEnterStoreName,
        "visible",
        300000
      )
  
    });
     
  });
  
  test('66394 - Check user clicks on "Cancel" button at Create New Local Store modal @corePhoto @unstable', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //user clicks on "Create Data Store" button 
    await test.step(`User clicks on "Create Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createDataStoresBtn);
      await corePhotoPage.pause(2000);
    });

    //user clicks on "Cancel" button at Create New Local modal 
      await corePhotoPage.clickToElement(corePhotoPage.cancelBtnCreateNewLocalStore);
      await corePhotoPage.pause(2000);

    //expect the 'Create New Local Store" modal is closed 
      await corePhotoPage.waitForElement(
        corePhotoPage.inputEnterStoreName,
        "hidden",
        300000
      )
    
      });

  test('66395 - Check user clicks on "X" icon at Create New Local Store @corePhoto @unstabl', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //user clicks on "Create Data Store" button 
    await test.step(`User clicks on "Create Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createDataStoresBtn);
      await corePhotoPage.pause(2000);
    });

    //pending

    // //user clicks on "X" icon at Create New Local modal user clicks on "X" icon at Create New Local modal 
    //   await test.step(`User clicks on "X" icon at Create New Local modal `, async () => {
    //     await corePhotoPage.clickToElement(corePhotoPage.closeCreateNewLocalStoreModal);
    //     await corePhotoPage.pause(2000);

    //   });

    // //expect the 'Create New Local Store" modal is closed
    //   await test.step(`expect the 'Create New Local Store" modal is closed`, async () => {
    //     await corePhotoPage.waitForElement(
    //       corePhotoPage.inputEnterStoreName,
    //       "hidden",
    //       300000
    //     )
      
    //   });


    
      });


  test('66396 - Check user fills in data for Enter Store name field @incomplete', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //user clicks on "Create Data Store" button 
    await test.step(`User clicks on "Create Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createDataStoresBtn);
      await corePhotoPage.pause(2000);
    });

    //user enters data for "Enter Store Name" field  
    await test.step(`user enters data for "Enter Store Name" field`, async () => {
      await corePhotoPage.fillToElement(
        corePhotoPage.inputEnterStoreName,"Testing"
      )
      await corePhotoPage.pause(4000);
    });

    //pending 
    });
  
   test('66397 - Verify user leaves Enter Store name field blank', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });

    //user clicks on "Create Data Store" button 
    await test.step(`User clicks on "Create Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createDataStoresBtn);
      await corePhotoPage.pause(2000);
    });

    //user leaves "Enter Store Name" filed and clicking "Save" butotn
    await test.step(`User leaves "Enter Store Name" filed and clicking "Save" butotn`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.saveBtnCreateNewLocalStore);
      await corePhotoPage.pause(2000);
    });

    
    //expect the empty error message enter store name is displayed 
    await test.step(`Expect the empty error message enter store name is displayed `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.emptyErrorMessageEnterStoreName,
        "visible",
        300000
      )
    });
      });

    test('66385 - Verify the results are correctly displayed when user selects paging of manage data store @corePhoto @unstable', async ({}, testInfo) => {
    //set timeout 
      test.setTimeout(300000);
  
    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Manage Data Store" button  
    await test.step(`User clicks on "Manage Data Store" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.manageDataStoresBtn);
      await corePhotoPage.pause(4000); 
    });
  
    //user select pagination with 5 page option 
    await test.step(`User selects pagination with 5 pages option`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.selectPaginationManageDataStore);
      await corePhotoPage.pause(2000);
    });

    //pending
      });
  
//================================== Create New pipeline ===============================================
  
test('66399 - Check user clicks on "+ Create New Pipeline" button', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Create New Pipeline" button 
    await test.step(`User clicks on "Create New Pipeline" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
      await corePhotoPage.pause(2000);
  });

  //Expect the back button create new pipeline is displayed
    await test.step(`Expect the back button create new pipeline is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.backBtnCreateNewPipeline,
        "visible",
        300000
      )
  });
 
   

    });

test('66400 - Check user clicks on "Back" button at add new data source page', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Create New Pipeline" button 
    await test.step(`User clicks on "Create New Pipeline" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
      await corePhotoPage.pause(2000);
    });

    //user clicks on "Back" button is displayed at "Create New PipeLine" page
    await test.step(`User clicks on "Back" button is displayed at "Create New PipeLine" page`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.backBtnCreateNewPipeline);
      await corePhotoPage.pause(2000);
    });

    //expect user out from "Create New PipeLine" page
    await test.step(`Expect user out from "Create New PipeLine" page`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.backBtnCreateNewPipeline,
        "hidden",
        300000
      )
    });
  });



test('66402 - Check user clicks on "Cancel" button at add new data source page', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Create New Pipeline" button 
    await test.step(`User clicks on "Create New Pipeline" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
      await corePhotoPage.pause(2000);
    });

   //user clicks on "Cancel" button is displayed at "Create New PipeLine" page
    await test.step(`User clicks on "Cancel" button is displayed at "Create New PipeLine" page`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.cancelBtnCreateNewPipeline);
      await corePhotoPage.pause(2000);
    });

  //expect user out from "Create New PipeLine" page
    await test.step(`Expect user out from "Create New PipeLine" page`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.backBtnCreateNewPipeline,
        "hidden",
        300000
      )
    });

});

test('70962 - Verify check data default for source type', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Create New Pipeline" button 
    await test.step(`User clicks on "Create New Pipeline" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
      await corePhotoPage.pause(2000);
  });

  //User clicks on source type data
    await test.step(`User clicks on source type data`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.sourceTypeData);
      await corePhotoPage.pause(2000)
  });

    //expect the "Azure Blob Storage" source type data is displayed
    await test.step(`Expect the "Azure Blob Storage" source type data is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicDefaultSourceTypeList('Azure Blob Storage'),
        "visible",
        300000
      )
  });

    //expect the "SMB storage" source type data is displayed
    await test.step(`Expect the "SMB storage" source type data is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicDefaultSourceTypeList('SMB Storage'),
        "visible",
        300000
      )
  
  });

    //expect the "Local storage" source type data is displayed
    await test.step(`expect the "Local storage" source type data is displayed`, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicDefaultSourceTypeList('Local storage'),
        "visible",
        300000
      )
  });

    });

test('66739 - Check user can only select single data for source type', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

    //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

    //user clicks on "Create New Pipeline" button 
    await test.step(`User clicks on "Create New Pipeline" button`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
      await corePhotoPage.pause(2000);
  });

    //User clicks on source type data
    await test.step(`User clicks on source type data`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.sourceTypeData);
      await corePhotoPage.pause(2000)
  });

    //expect the "Azure Blob Storage" source type data is displayed
    await test.step(`expect the "Azure Blob Storage" source type data is displayed`, async () => {
      await corePhotoPage.clickToElement(corePhotoPage.dynamicDefaultSourceTypeList('Azure Blob Storage'))
      await corePhotoPage.pause(3000);
  });


    //expect hidden SMB Storage source 
    await test.step(`expect hidden SMB Storage source `, async () => {
      await corePhotoPage.waitForElement(
        corePhotoPage.dynamicDefaultSourceTypeList('SMB Storage'),
        "hidden",
        300000
      )
  });

  //expect hidden Local storage source 
  await test.step(`expect hidden Local storage source `, async () => {
    await corePhotoPage.waitForElement(
      corePhotoPage.dynamicDefaultSourceTypeList('Local storage'),
      "hidden",
      300000
    )
  });

  });

test('66740 - Verify inputting incorrect data for project ID @corePhoto @unstable', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Create New Pipeline" button 
  await test.step(`User clicks on "Create New Pipeline" button`, async () => {
    await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
    await corePhotoPage.pause(2000);
});

  //user enter invalid data for "Project ID"
  await test.step(`User enter invalid data for "Project ID"`, async () => {
    await corePhotoPage.fillToElement(corePhotoPage.inputProjectID,'11112');
    await corePhotoPage.pause(2000);
});

  //expect displaying an error message below "Project ID" field 
//   await test.step(`Expect displaying an error message below "Project ID" field `, async () => {
//     await corePhotoPage.waitForElement(
//       corePhotoPage.invalidErrorMessageProjectID,
//       "visible",
//       300000
//     )
// });
// 
});

  test('70966 - Check default data for ML Backend Engine field @incomplete', async ({}, testInfo) => {
  //set timeout 
    test.setTimeout(300000);

  //user clicks on "Core Photo" button  
    await test.step(`User clicks on Core Photo button`, async () => {
      await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
      await dashBoardPage.pause(5000);
  });

  //user clicks on "Create New Pipeline" button 
  await test.step(`User clicks on "Create New Pipeline" button`, async () => {
    await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
    await corePhotoPage.pause(2000);
});

  //user check data default for ML Backend Engine
  await test.step(`User check data default for ML Backend Engine`, async () => {
    await corePhotoPage.clickToElement(corePhotoPage.mlBackendEngineField);
    await corePhotoPage.pause(2000);
    // await corePhotoPage.waitForElement(
    //  corePhotoPage.dynamicMlBackendEngineList('2022.01.29.Proc'),
    //  "visible",
    //  300000
    // )
});
//pending

    });

  // test('70967 - Check user can select only ML Backend Engine', async ({}, testInfo) => {
  // //set timeout 
  //   test.setTimeout(300000);

  // //open url 
  //   await dashBoardPage.openBrowser('/');
  //   await dashBoardPage.pause(5000);

  // //user clicks on "Core Photo" button 
  //   await dashBoardPage.clickToElement(dashBoardPage.corePhotoBtn)
  //   await dashBoardPage.pause(5000);

  // //user clicks on "Create New Pipeline" button 
  //   await corePhotoPage.clickToElement(corePhotoPage.createNewPipeline);
  //   await corePhotoPage.pause(2000);

  // //user check data default for ML Backend Engine
  //  await corePhotoPage.clickToElement(corePhotoPage.mlBackendEngineField);
  //  await corePhotoPage.pause(2000);
  //  await corePhotoPage.clickToElement(corePhotoPage.dynamicMlBackendEngineList('2022.01.29.Proc'));
  
  // //expect only select one ML Backend Engine and hide another ML Backend Engine
  //  await corePhotoPage.waitForElement(
  //   corePhotoPage.dynamicMlBackendEngineList('2022.01.29.Raw'),
  //   "hidden",
  //   300000
  //  )
  //   });

