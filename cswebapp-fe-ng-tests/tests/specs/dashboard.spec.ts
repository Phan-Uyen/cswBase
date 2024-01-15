import { test, expect, chromium , Page} from '@playwright/test';
import LoginPage from '../pageObjects/login.page';
import DashBoardPage from '../pageObjects/dashboard.page';
import DrillHoleViewPage from "../pageObjects/drillHoleView.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page";
const baseURL = "https://dev-react-aws.coreshed.com"
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
let coreTrayView: CoreTrayViewPage;

test.beforeAll(async ({ }) => { 
const browser = await chromium.launch();
page = await browser.newPage();

loginPage = new LoginPage(page)
dashBoardPage = new DashBoardPage(page)
drillHoleView = new DrillHoleViewPage(page);   
coreTrayView = new CoreTrayViewPage(page) 
});
test.beforeEach(async ({},testInfo) => {
    testInfo.setTimeout(testInfo.timeout + 60000);
    await loginPage.openBrowser('/');
    await loginPage.fillToElement(loginPage.userNameInput, userName)
    await loginPage.fillToElement(loginPage.passwordInput, password)
    await loginPage.clickToElement(loginPage.signInInput)
    expect(dashBoardPage.logo).toBeDefined()
    await dashBoardPage.waitForElement(
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


// test.describe('Project', async () => {
test('8881 - Verify that display button at the top of page @dashboard', async ({  }) => {
    await dashBoardPage.waitForElement(
        dashBoardPage.debugModeBtn,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.adminModeBtn,
        "visible",
        300000  
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.corePhotoBtn,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.reportBugBtn,
        "visible",
        300000
    )
});

test('8884 - Verify display 3 tab "Dashboard", "Drill Hole View", "Core Tray View" @dashboard', async ({  }) => {
    await dashBoardPage.waitForElement(
        dashBoardPage.dashboardTitle,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        drillHoleView.drillHoleViewTab,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        coreTrayView.coreTrayViewTab,
        "visible",
        300000
    )
});



test('7578 - Verify display "Name" and "Region" field @dashboard', async ({  }) => {
    //set timeout 
     test.setTimeout(300000);

    await dashBoardPage.waitForElement(
        dashBoardPage.projectLabel,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.nameLabel,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.regionLabel,
        "visible",
        300000
        )
    
});

test('7579 - Verify search with exit project (search name only) @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'Animikie')
    await dashBoardPage.waitForElement(
        dashBoardPage.projectSearchResult('Animikie'),
        "visible",
        300000
        )
});

test('7580 - Verify search no exit project', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'aaaaa')

    await dashBoardPage.waitForElement(
        dashBoardPage.nodataMessage,
        "visible",
        300000
        )
});

test('Verify display "Showing 1 to 1 of 1 entries (filtered from 19 total entries)"@dashboard ',async () => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.waitForElement(
        dashBoardPage.showingEntries,
        "visible",
        300000
        )
    });
// })


test('7581 - Verify display enough field',async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'Animikie')
    await dashBoardPage.clickToElement(dashBoardPage.projectSearchResult('Animikie'))
    // expect(dashBoardPage.projectIdField).toBeDefined()

    await dashBoardPage.waitForElement(
        dashBoardPage.projectNameField,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.projectDescriptionField,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.locationField,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.regionField,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.depositTypeField,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.recordLastUpdatedField,
        "visible",
        300000
    )
})

test('7582 - Verify show green when clicking the project @dashboard',async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'Animikie')
    await dashBoardPage.clickToElement(dashBoardPage.projectSearchResult('Animikie'))
    expect(await page.$eval(dashBoardPage.projectRow, e => getComputedStyle(e).backgroundColor)).toBe('rgb(108, 195, 81)');
    })


test('7583 - Verify search with exit drill hole (search name only) @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchDrillHoleInput, 'LM-13-01')
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleSearchResult('LM-13-01'),
        "visible",
        300000
        )
    
    })

test('7584 - Verify search with no exit drill hole @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.pause(3000);
    await dashBoardPage.fillToElement(dashBoardPage.searchDrillHoleInput, 'no data')
    await dashBoardPage.waitForElement(
        dashBoardPage.nodataDrillHoleMessage,
        "visible",
        300000
        )

    })

test('7585 - Verify display Name Start and End @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleNameLabel,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleStartLabel,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleEndLabel,
        "visible",
        300000
        )
    })

test('7586 - Verify show green when clicking the drill hole @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchDrillHoleInput, 'LM-13-01')
    await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult('LM-13-01'),
            "visible",
            300000
            )
    await dashBoardPage.clickToElement(dashBoardPage.drillHoleSearchResult('LM-13-01'))
    expect(await page.$eval(dashBoardPage.detailRow, e => getComputedStyle(e).backgroundColor)).toBe('rgb(108, 195, 81)');
    })

test('8914 - Verify show inactive entries when click on Show only inactive button @dashboard',async ({page}) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.waitForElement(
        dashBoardPage.showOnlyInactiveEntriesLabel,
        "visible",
        300000
        )
    await dashBoardPage.clickToElement(dashBoardPage.clickShowOnlyInactiveCheckbox)

    });

test('8915 - Verify showing entries number will changed when scroll @dashboard',async ({page}) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.pause(5000);
    await dashBoardPage.scrollToElement(dashBoardPage.drillHoleValue);
    await dashBoardPage.pause(2000);
    await dashBoardPage.waitForElement(
        dashBoardPage.showTheNumberOfEntriesText,
        "visible",
        300000
        )
    })

test('7587 - Verify show enough field @dashboard',async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'LM-13-01')
    await dashBoardPage.clickToElement(dashBoardPage.drillHoleSearchResult('LM-13-01'))
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleIdField,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleNameField,
        "visible",
        300000
        )
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleDescriptionField,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.corescanJobReferenceField,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.depthField,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.lengthField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.collarLocationField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.collarRLField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.collarAzimuthField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.collarInclinationField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleTypeField,
        "visible",
        300000
            )
    await dashBoardPage.waitForElement(
        dashBoardPage.dateDrilledField,
        "visible",
        300000
            )
    
    await dashBoardPage.waitForElement(
        dashBoardPage.dateScannedField,
        "visible",
        300000
            )

    await dashBoardPage.waitForElement(
        dashBoardPage.recordLastUpdatedField,
        "visible",
        300000
            )     

    })

test('7588 - Verify collapse drill hole detail @dashboard',async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.fillToElement(dashBoardPage.searchInput, 'LM-13-01')
    await dashBoardPage.clickToElement(dashBoardPage.drillHoleSearchResult('LM-13-01'))
    await dashBoardPage.waitForElement(
        dashBoardPage.drillholeDetailExpand,
        "visible",
        300000
        ) 
    })

test('8959 - Verify that add Drill hole into drill hole lists @incomplete @dashboard', async ({page}) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.clickToElement(dashBoardPage.drillHoleSearchResult('LM-13-01'))
    await dashBoardPage.clickToElement(dashBoardPage.drillHoleSearchResult('LM-13-02'))
    })

test('7589 - Verify inventory drop down', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.waitForElement(
        dashBoardPage.inventoryLabel,
        "visible",
        300000
        )
    await dashBoardPage.waitForElement(
        dashBoardPage.inventoryDropDown,
        "visible",
        300000
        )

    await dashBoardPage.clickToElement(dashBoardPage.inventoryDropDown);
    await dashBoardPage.pause(2000);

    await dashBoardPage.waitForElement(
        dashBoardPage.
        inventoryFirstItem,
        "visible",
        300000
        )

    await dashBoardPage.waitForElement(
        dashBoardPage.
        inventorySecondItem,
        "visible",
        300000
        )

    })

test('7590 - Verify display "Drill Holes", "Products" and "Archive Storage" detail @dashboard', async ({  }) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.pause(5000)

    await dashBoardPage.waitForElement(
        dashBoardPage.inventoryLabel,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intDrillHoleLabel,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intProductLabel,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intArchiveStorageLabel,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intDHDetail,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intTotalDetail,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intProductsDetail,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intStorageDetail,
        "visible",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.intArchiveStorageLabel,
        "visible",
        300000
    )
    })

test('8960 -COR-348 - Verify show "Drill holes" and "Total length" when clicking Drill Holes @dashboard', async ({page}) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.pause(5000);
    await dashBoardPage.waitForElement(
        dashBoardPage.showTheNumberOfEntriesText,
        "visible",
        300000
    )
    })

test('8885 - Verify that Project field is displayed', async ({page}) => {
    await dashBoardPage.openBrowser('/');
    await dashBoardPage.pause(5000);
    await dashBoardPage.waitForElement(
        dashBoardPage.dynamicProjectNameList('58 North'),
        "visible",
        300000
    )
    })

test('8951 - Verify collapse project details @dashboard', async ({page}) => {
        //search project
            await dashBoardPage.fillToElement(dashBoardPage.searchInput,'Animikie');
            await dashBoardPage.pause(5000);

        //clicking on project 
        await dashBoardPage.clickToElement(
            dashBoardPage.projectSearchResult("Animikie")
        );
        await dashBoardPage.pause(5000);

        //user clicking collapse project detail 
        await dashBoardPage.clickToElement(dashBoardPage.collsapProjectDetail)
        await dashBoardPage.pause(5000); 

        //expect some elements will not be displayed 
        await dashBoardPage.waitForElement(
            dashBoardPage.projectDescriptionField,
            "hidden",
            300000
        )

        await dashBoardPage.waitForElement(
            dashBoardPage.customerIdField,
            "hidden",
            300000
        )

        await dashBoardPage.waitForElement(
            dashBoardPage.locationField,
            "hidden",
            300000
        )

        await dashBoardPage.waitForElement(
            dashBoardPage.regionField,
            "hidden",
            300000
        )

        await dashBoardPage.waitForElement(
            dashBoardPage.depositTypeField,
            "hidden",
            300000
        )

        await dashBoardPage.waitForElement(
            dashBoardPage.recordLastUpdatedField,
            "hidden",
            300000
        )
    })

test('8945 - Verify that be able to multiple select entry at entry list @dashboard', async ({page}) => {
    //search drill hole and clicking drill hole 1
    await dashBoardPage.fillToElement(
        dashBoardPage.searchDrillHoleInput,
        "WINU0725"
    );
    
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleSearchResult("WINU0725"),
        "visible",
        300000
        )
        
    await dashBoardPage.clickToElement(
        dashBoardPage.drillHoleSearchResult("WINU0725")
    );

    //search drill hole and clicking drill hole 2
    await dashBoardPage.fillToElement(
        dashBoardPage.searchDrillHoleInput,
        "LM-13-01"
    );
    
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleSearchResult("LM-13-01"),
        "visible",
        300000
        )
        
    await dashBoardPage.clickToElement(
        dashBoardPage.drillHoleSearchResult("LM-13-01") 
    );

    //user accesses drill hole view tab
    await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    await drillHoleView.pause(5000);

    //user clicking drill hole text 
    await drillHoleView.clickToElement(drillHoleView.drillHoleItem);
    await drillHoleView.pause(2000)

    // expect the elements are displayed 
    await drillHoleView.waitForElement(
        drillHoleView.dynamicDrillHoleItemView('LM-13-01'),
        "visible",
        300000
    )

    await drillHoleView.waitForElement(
        drillHoleView.dynamicDrillHoleItemView('WINU0725'),
        "visible",
        300000
    )

    })

test('8948 - Verify that when unselect entry at Drill Hole field, this entry is disappeared at Details field @dashboard', async ({page}) => {
    //search drill hole and clicking drill hole 1
    await dashBoardPage.fillToElement(
        dashBoardPage.searchDrillHoleInput,
        "WINU0725"
    );
    
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleSearchResult("WINU0725"),
        "visible",
        300000
        )
        
    await dashBoardPage.clickToElement(
        dashBoardPage.drillHoleSearchResult("WINU0725")
    );

    //unclick on drill hole 
    await drillHoleView.pause(2000);
    await dashBoardPage.clickToElement(
        dashBoardPage.drillHoleSearchResult("WINU0725")
    );
    await drillHoleView.pause(2000);

    //expect some elements will be hidden
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleIdField,
        "hidden",
        300000
    )
    
    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleNameField,
        "hidden",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.drillHoleDescriptionField,
        "hidden",
        300000
    )

    await dashBoardPage.waitForElement(
        dashBoardPage.corescanJobReferenceField,
        "hidden",
        300000
    )
    })

test('8952 - Verify collapse "Drill Holes", "Products", "Archive Storage" details @dashboard', async ({page}) => {
    //user clicks on "Drill Holes"
    await dashBoardPage.clickToElement(dashBoardPage.expandIntDrillHoles)
    await dashBoardPage.pause(2000);

    //expect collsap drill holes 
    await dashBoardPage.waitForElement(
        dashBoardPage.collapseIntDrillHoles,
        "visible",
        300000
    )

    //user clicks on "Products"
    await dashBoardPage.clickToElement(dashBoardPage.expandIntProducts)
    await dashBoardPage.pause(2000);

    //expect collsap products 
    await dashBoardPage.waitForElement(
        dashBoardPage.collapseIntProducts,
        "visible",
        300000
    )
    //user clicks on "Archive Storage"
    await dashBoardPage.clickToElement(dashBoardPage.expandArchiveStorage)
    await dashBoardPage.pause(2000);

    //expect collsap "Archive Storage" 
    await dashBoardPage.waitForElement(
        dashBoardPage.collapseArchiveStorage,
        "visible",
        300000
    )
    
    })





