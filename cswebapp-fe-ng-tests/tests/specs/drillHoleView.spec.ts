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

test('7591 - Verify click to "Drill Hole View" @drillhole', async ({ }, testInfo) => {
    //user clicks on Drill Hole View tab 
    await test.step(`User clicks on "Drill Hole View" tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    });
});

test('7592 - Verify show message "No drill holes selected for viewing. Select a drill hole from dashboard" @drillhole', async ({ }, testInfo) => {

    //user clicks on "Drill Hole View" tab 
    await test.step(`User clicks on "Drill Hole View" tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    });
    //expect the enpty message is correctly displayed 
    await test.step(`Expect the enpty message is correctly displayed `, async () => {
        await drillHoleView.clickToElement(drillHoleView.DRVEmptyMessage);
    });
});


test("26873 - Basic Viewing - Select 1 product for viewing and Image appears in one panel with both depth scales @drillhole", async ({ }, testInfo) => {

    //user search project 
    await test.step(`User search project`, async () => {
        await dashBoardPage.fillToElement(dashBoardPage.searchInput, "Animikie");
        await dashBoardPage.clickToElement(
            dashBoardPage.projectSearchResult("Animikie")
        );
    });

    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab 
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //expect the left and right scale is correctly displayed
    await test.step(`Expect the left and right scale is correctly displayed`, async () => {
        await drillHoleView.waitForElement(drillHoleView.leftScale,
             "visible",
              30000
              );

        await drillHoleView.waitForElement(
            drillHoleView.rightScale,
            "visible",
            30000
        );
    });

    //expect the status error is correctly displayed
    await test.step(`Expect the status error is correctly displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.statusError,
            "hidden",
            30000
        );
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(3000);
    });
});

test("26874 - Interactivity - Select 1 product for viewing; scroll wheel zoom @test2 @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab 
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user zoom out on screen 
    await test.step(`User zoom out on screen `, async () => {
        await drillHoleView.mouseMove(200, 500);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(5000);
            await page.mouse.wheel(0, -50);
        }
        await drillHoleView.pause(2000);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(200);
            await page.mouse.wheel(0, 100);
        }
    });

    //user snapshot and compare image 
    await test.step(`User zoom out on screen `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.imageComparisons();
    });
});



test("9404 - Verify clicking left mouse and drag in CorePhotography module @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab 
    await test.step(`User clicks on core tray view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user hover + mouseMove on screen
    await test.step(`User hover + mouseMove on screen`, async () => {
        await drillHoleView.mouseMove(200, 300);
        await drillHoleView.mouseDown();
        await drillHoleView.mouseMove(250, 300);
        await drillHoleView.mouseUp();
        await drillHoleView.pause(5000);
    });

    //user snapshot and compare image
    await test.step(`User snapshot and compare image`, async () => {
        await drillHoleView.waitForElement(drillHoleView.statusBarChild, "visible", 30000);
    });

    //expect the status bar child is displayed
    await test.step(`User snashot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });
});


test("26876 - Interactivity - Select 1 product for viewing; right click on imageInteractivity - Select 1 product for viewing; right click on image @test3 @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab 
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user hover + mouseMove on screen 
    await test.step(`User hover + mouseMove on screen `, async () => {
        await drillHoleView.pause(5000);
        await drillHoleView.mouseMove(200, 500);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(6000);
            await page.mouse.wheel(0, -50);
        }
        await drillHoleView.clickMouse(740, 400, "right");
    });

    //expect the context menu list and status bar are corectly displayed
    await test.step(`expect the context menu list and status bar are corectly displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.contextMenuList,
            "visible",
            300000
        );
    });
});
// });


test("26877 - Multiple panels (basic) - Select 3 products for viewing and Three images appear without error within 2 seconds without error messages @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab 
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on add panel button 
    await test.step(`User clicks on add panel button `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    });

    //user clicks on menu items list dropdown 
    await test.step(`User clicks on menu items list dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));
    });

    //user clicks on add panel button 
    await test.step(`User clicks on add panel button `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    });

    //user clicks on menu items list dropdown 
    await test.step(`User clicks on menu items list dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));

    });
    //expect the count of list panels is correctly
    await test.step(`Expect the count of list panels is correctly`, async () => {
        await drillHoleView.countElement(drillHoleView.listPanels, 5);
    });

    //user snapshot and compare image 
    await test.step(`Expect the count of list panels is correctly`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });
});


test("26878 - Attached panels - Add three panel and zooming each of the panels causes remaining panels to move to the same location @zoom @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on add panel button 
    await test.step(`User clicks on add panel button  `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    });

    //user clicks on menu items list 
    await test.step(`User clicks on menu items list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));
    });

    //user clicks on add panel button 
    await test.step(`User clicks on add panel button  `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
    });

    //user clicks on menu items list 
    await test.step(`User clicks on menu items list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));
    });

    //expect the count of list panel is correctly displayed 
    await test.step(`User clicks on add panel button  `, async () => {
        await drillHoleView.countElement(drillHoleView.listPanels, 5);
    });

    //user snapshot and comapare image 
    await test.step(`User snapshot and comapare image `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

    //user hover + mouseMove on screen
    await test.step(`User hover + mouseMove on screen`, async () => {
        await drillHoleView.pause(5000);
        await drillHoleView.mouseMove(100, 200);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(5000);
            await page.mouse.wheel(0, -50);
        }
    });

    //user snapshot and comapare image 
    await test.step(`User snapshot and comapare image `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.imageComparisons();
    });

});

test("26879 - Multiple panels (complex) - Multiple panels (complex)	Select 30 products for viewing @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab
    await test.step(`User clicks drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user add multiple panels and count the panel
    await test.step(`User clicks on add panel button `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        //item 2
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        //item 3
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));

        //item 4
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("5"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("12")
        );

        //item 5
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicCategoryType("Mineralogy (21)")
        );
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("6"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("13")
        );

        //item 6
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("7"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("35")
        );

        //item 7
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("8"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("57")
        );

        //item 8
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("9"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("79")
        );

        //item 9
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("10")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("101")
        );

        //item 10
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("11")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("123")
        );

        //item 11
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("12")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("145")
        );

        //item 12
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("13")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("167")
        );

        //item 13
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("14")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("189")
        );

        //item 14
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("15")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("211")
        );

        //item 15
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("16")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("234")
        );

        //item 16
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("17")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("256")
        );

        //item 17
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("18")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("278")
        );

        //item 18
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("19")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("300")
        );

        //item 19
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("20")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("322")
        );

        //item 20
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("21")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("344")
        );

        //item 21
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("22")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("366")
        );

        //item 22
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("23")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("388")
        );

        //item 23
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("24")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("400")
        );

        //item 24
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("25")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("422")
        );

        //item 25
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("26")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("444")
        );

        //item 26
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("27")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("466")
        );

        //item 27
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("28")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("488")
        );

        //item 28
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("29")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("500")
        );

        //item 29
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("30")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("522")
        );

        //item 30
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("31")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("544")
        );

    });

    //expect the count of list panel is correctly displayed 
    await test.step(`Expect the count of list panel is correctly displayed `, async () => {
        await drillHoleView.countElement(drillHoleView.listPanels, 32);
    });

    //ser snapshot and compare image
    await test.step(`User snapshot and compare image `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });
});

test("26880 - Multiple panels responsiveness - Multiple panels responsiveness	Select 30 products for viewing @30products @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drill hole view tab 
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user add a new panel and count panel 
    await test.step(`Expect the total of list panel is correctly displayed `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        //item 3
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));

        //item 4
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("5"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("12")
        );

        //item 5
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicCategoryType("Mineralogy (21)")
        );
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("6"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("13")
        );

        //item 6
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("7"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("35")
        );

        //item 7
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("8"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("57")
        );

        //item 8
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("9"));
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("79")
        );

        //item 9
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("10")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("101")
        );

        //item 10
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("11")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("123")
        );

        //item 11
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("12")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("145")
        );

        //item 12
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("13")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("167")
        );

        //item 13
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("14")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("189")
        );

        //item 14
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("15")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("211")
        );

        //item 15
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("16")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("234")
        );

        //item 16
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("17")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("256")
        );

        //item 17
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("18")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("278")
        );

        //item 18
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("19")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("300")
        );

        //item 19
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("20")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("322")
        );

        //item 20
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("21")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("344")
        );

        //item 21
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("22")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("366")
        );

        //item 22
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("23")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("388")
        );

        //item 23
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("24")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("400")
        );

        //item 24
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("25")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("422")
        );

        //item 25
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("26")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("444")
        );

        //item 26
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("27")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("466")
        );

        //item 27
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("28")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("488")
        );

        //item 28
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("29")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("500")
        );

        //item 29
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("30")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("522")
        );

        //item 30
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductType("31")
        );
        await drillHoleView.clickToElement(
            drillHoleView.dynamicItemProductList("544")
        );
    });

    //expect the total of list panel is correctly displayed 
    await test.step(`Expect the total of list panel is correctly displayed `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

    await drillHoleView.countElement(drillHoleView.listPanels, 32);

    //user snapshot and compare image 
    await test.step(`User snaphshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

    //user zoom out on screeen 
    await test.step(`User zoom out on screen `, async () => {
        await drillHoleView.mouseMove(100, 200);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(5000);
            await page.mouse.wheel(0, -50);
        }
    });

    //user snapshot and compare image 
    await test.step(`User snaphshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

});

test('26881- Unlock panels - Select three products for viewing and click "unlock" on one panel @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //User adds a new panel 
    await test.step(`User adds a new panel `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.pause(3000);
    });

    //expect the total of list panel is correctly displayed
    await test.step(`Expect the total of list panel is correctly displayed`, async () => {
        await drillHoleView.countElement(drillHoleView.listPanels, 4);

    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

    //user ticks in link movement select box
    await test.step(`User ticks in link movement select box`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
        await drillHoleView.clickToElement(drillHoleView.linkMovementSelectBox);
    });

    //user zoom out on screen 
    await test.step(`User zoom out on screen`, async () => {
        await drillHoleView.pause(5000);
        await drillHoleView.mouseMove(100, 200);
        for (let i = 0; i < 2; i++) {
            await drillHoleView.pause(5000);
            await page.mouse.wheel(0, -50);
        }
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

});

test('26882 Unzoom panel - Select three products for viewing and click "unzoom" button @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user add a panel and view panel 
    await test.step(`User add a panel and view panel `, async () => {

        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));
        await drillHoleView.countElement(drillHoleView.listPanels, 5);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
        await drillHoleView.clickToElement(drillHoleView.unZoomSelectBox);
    });

    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });

    });
});

test('26883 - Unzoom all - Select three products for viewing and click the "unzoom all" option @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on core tray view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user add a new panel and view panel 
    await test.step(`User add a new panel and view panel`, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));
        await drillHoleView.countElement(drillHoleView.listPanels, 5);

        await drillHoleView.clickToElement(drillHoleView.viewerOptionMenu);
        await drillHoleView.clickToElement(drillHoleView.unZoomAllOption);
    });

    //user snapshot and comapre image
    await test.step(`User clicks on drill hole view tab `, async () => {

        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });


});

test('26884 - Select three products for viewing and click "close" on one panel @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drill hole view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on add a new panel button and view panel 
    await test.step(`User clicks on add a new panel button and view panel`, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));
        await drillHoleView.countElement(drillHoleView.listPanels, 5);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemMenu("1"));
        await drillHoleView.clickToElement(drillHoleView.closeSelectBox);
    });
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });

});

test("26885 - Select three products for viewing and switch between dashboard and viewer @drillhole", async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drill hole view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on add a new panel button and view panel 
    await test.step(`User clicks on add a new panel button and view panel `, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);

        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("3"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("2"));

        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductType("4"));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductList("7"));
        await drillHoleView.countElement(drillHoleView.listPanels, 5);

        await drillHoleView.clickToElement(dashBoardPage.dashboardTitle);
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
    });
});

test('7593 - Verify click category and show', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drill hole view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on select dropdown
    await test.step(`User clicks on select dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.pause(5000);
    });

    //the categories expect are displayed
    await test.step(`Expect the "Core Imagery" category is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicCategoryType('Core Imagery (4)'),
            "visible",
            300000
        )

    });

    await test.step(`Expect the "Mineral Composition (5)" category is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicCategoryType('Mineral Composition (5)'),
            "visible",
            300000
        )
    });

    await test.step(`Expect the "Mineral Composition Logs (14)" category is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicCategoryType('Mineral Composition Logs (14)'),
            "visible",
            300000
        )
    });

    await test.step(`Expect the "Mineral Logs (20)" category is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicCategoryType('Mineral Logs (20)'),
            "visible",
            300000
        )
    });

    await test.step(`Expect the "Mineralogy (21)" category is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicCategoryType('Mineralogy (21)'),
            "visible",
            300000
        )
    });

});

test('8954 - Verify click on Layout and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drill hole view tab
    await test.step(`User clicks on drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    await drillHoleView.clickToElement(drillHoleView.layoutDropdown);
    await drillHoleView.pause(2000);

    await test.step(`Expect the stacked by tray layout is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.layoutStackedByTrayItem,
            "visible",
            300000
        )

    });

    await test.step(`Expect the down hole layout is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.layoutDownHoleItem,
            "visible",
            300000
        )
    });

    await test.step(`Expect the stacked down hole layout is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.layoutStackedDownHoleItem,
            "visible",
            300000
        )

    });

});

test('8955 - Verify click on Drill Hole and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-03 drillhole 
    await test.step(`User search LM-13-03 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-03"
        );
    });

    //expect the LM-13-03 drillhole is displayed
    await test.step(`Expect the LM-13-03 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-03 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03")
        );
    });

    //search drill hole #2
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-03 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-03 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user accesses drill hole view tab
    await test.step(`User accesses drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user clicks on "Drill Hole"
    await test.step(`User clicks on "Drill Hole`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleText);
        await drillHoleView.pause(2000);
    });

    //expect the elements are displayed 
    await test.step(`Expect the LM-13-03 drillhole is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicDrillHoleItemView('LM-13-03'),
            "visible",
            300000
        )
    });

    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.dynamicDrillHoleItemView('LM-13-01'),
            "visible",
            300000
        )
    });
});

test('8956 - Verify click on Add one panel and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-03 drillhole 
    await test.step(`User search LM-13-03 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-03"
        );
    });

    //expect the LM-13-03 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-03 drillhole 
    await test.step(`User clicks on LM-13-03 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03")
        );
    });

    //expect the backouground of LM-13-03 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-03 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user add a new panel 
    await test.step(`User add a new panel`, async () => {
        await drillHoleView.clickToElement(drillHoleView.addPanelBtn);
        await drillHoleView.pause(2000);

    });

    //expect the total of value panel is displayed correctly
    await test.step(`Expect the total of value panel is displayed correctly`, async () => {
        await drillHoleView.countElement(drillHoleView.dynamicValuePanel(), 2);

    });
});

test('8961 - Verify click on Menu button and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-03 drillhole 
    await test.step(`User search LM-13-03 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-03"
        );
    });

    //expect the LM-13-03 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-03 drillhole 
    await test.step(`User clicks on LM-13-03 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03")
        );
    });

    //expect the backouground of LM-13-03 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-03 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicking menu btn
    await test.step(`User clicks on menu button`, async () => {
        await drillHoleView.clickToElement(drillHoleView.menuBtn);
        await drillHoleView.pause(2000);
    });

    //expect the elements are displayed 
    await test.step(`Expect the unzoom all menu is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.unzoomAllMenu,
            "visible",
            300000
        );
    });

    // await test.step(`Expect the restricted movement menu is displayed`, async () => {
    //     await drillHoleView.waitForElement(
    //         drillHoleView.restrictedMovementMenu,
    //         "visible",
    //         300000
    //     );

    // });
});

test('8963 - Verify click on Left menu icon and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-03 drillhole 
    await test.step(`User search LM-13-03 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-03"
        );
    });

    //expect the LM-13-03 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-03 drillhole 
    await test.step(`User clicks on LM-13-03 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-03")
        );
    });

    //expect the backouground of LM-13-03 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-03 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on left menu icon
    await test.step(`User clicks on left menu icon`, async () => {
        await drillHoleView.clickToElement(drillHoleView.leftMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //expect the elements are displayed 
    await test.step(`Expect the left unzoom button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftUnzoomBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left link movement button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftLinkMovementBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left transparentcy  button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftTransparencyBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left tray depths button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftTrayDepthsBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left tray IDs button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftTrayIDsBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left close button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftCloseBtn,
            "visible",
            300000
        )
    });
});

test('8964 - Verify click on Right menu icon and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(2000);

    });

    //expect the elements are displayed 
    await test.step(`Expect the right unzoom button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightUnzoomBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the right link movement button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightLinkMovementBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the right transparency button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightTransparencyBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the right tray depths button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightTrayDepthsBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the right tray IDs button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightTrayIDsBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the left close button is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.leftCloseBtn,
            "visible",
            300000
        )
    });

});

test('8965 - Verify click on Middle menu icon and show @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });


    //expect the elements are displayed 
    await test.step(`Expect the midle unzoom button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleUnzoomBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle link movement button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleLinkMovementBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle transparency button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleTransparencyBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle high definition button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleHighDefinitionBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle scale button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleScaleBarBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle region or tray button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleRegionOrTrayBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle title debug button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleTileDebugBtn,
            "visible",
            300000
        )
    });

    await test.step(`Expect the midle close button is displayed `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.midleCloseBtn,
            "visible",
            300000
        )
    });
});

test('8974 - Verify display Drill hole, Tray, Depth, ID at the bottom left of page @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //expected the status bar is displayed
    await test.step(`Expected the status bar is displayed`, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.statusBar,
            "visible",
            300000
        )
    });

});

test('65373 - Verify user selects item menu dropdown @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user selects category dropdown list
    await test.step(`User selects category dropdown list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.pause(2000);
        await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType('Mineralogy (21)'));
        await drillHoleView.pause(2000);
    });

    //user snapshot and compare image
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });

        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });

});

test('65374 - Verify user selects menu dropdown list', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user selects menu dropdown list
    await test.step(`User selects menu dropdown list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('True colour spectral image'));
        await drillHoleView.pause(5000);

    });

    //snapshot and compare
    await test.step(`User selects menu dropdown list`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });

        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);

    });
});

test('65375 - Verify user selects the unzooom option @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //User zoom out on screen
    await test.step(`User zoom out on screen`, async () => {
        for (let i = 0; i < 5; i++) {
            await drillHoleView.mouseMove(100, 200);
            await drillHoleView.pause(1000);
            await page.mouse.wheel(0, -50);
            await drillHoleView.pause(1000);
        }
        await drillHoleView.pause(2000);
    });

    //user clicks on right menu icon
    await test.step(`User clicks on right menu icon`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user clicks on unzoom option 
    await test.step(`User clicks on unzoom option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUnzoomBtn);
        await drillHoleView.pause(2000);
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image `, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });

        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });
});

test('65376 - Verify user ticks the link movement checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks the link movement checkbox
    await test.step(`User ticks the link movement checkbox`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedLinkMovement);
        await drillHoleView.pause(2000);
    });

    //expect the link movement is ticked
    await test.step(`Expect the link movement is ticked`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedLinkMovement,
            "visible",
            300000
        )
    });
});

test('65378 - Verify user ticks the high definition checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks the high definition checkbox 
    await test.step(`User ticks the high definition checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedHighDefinition);
        await drillHoleView.pause(2000);
    });

    //expect the high definition is ticked
    await test.step(`Expect the high definition is ticked`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedHighDefinition,
            "visible",
            300000
        )
    });


});

test('65379 - Verify user ticks the title debug checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });


    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks the title debug checkbox 
    await test.step(`User ticks the title debug checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedScaleBar);
        await drillHoleView.pause(2000);
    });

    //expect the title debug is ticked
    await test.step(`Expect the title debug is ticked`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedScaleBar,
            "visible",
            300000
        )
    });

});

test('65380 - Verify user ticks the title debug checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });


    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks the scale bar checkbox 
    await test.step(`User ticks the scale bar checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedTitleDebugCheckBox);
        await drillHoleView.pause(2000);
    });

    //expect the scale bar is ticked 
    await test.step(`Expect the scale bar is ticked `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedTitleDebugCheckBox,
            "visible",
            300000
        )
    });

});

test('65548 - Verify user ticks the region/tray checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks the scale bar checkbox 
    await test.step(`User ticks the scale bar checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedRegionTrayCheckBox);
        await drillHoleView.pause(2000);
    });

    //expect the scale bar is ticked 
    await test.step(`Expect the scale bar is ticked `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedRegionTrayCheckBox,
            "visible",
            300000
        )
    });


});

test('65381 - Verify user selects the close option @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });


    //user accesses drill hole view tab 
    await test.step(`User accesses drill hole view tab `, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(5000);
    });

    //user count the number of panel 
    await test.step(`User count the number of panel`, async () => {
        await drillHoleView.countElement(drillHoleView.dynamicValuePanel(), 1)
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user click the close option 
    await test.step(`User click the close option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleCloseBtn);
        await drillHoleView.pause(4000);
    });

    //expect the close option worked correctly 
    await test.step(`Expect the close option worked correctly `, async () => {
        await drillHoleView.countElement(drillHoleView.dynamicValuePanel(), 0);
    });

});

test('65383 - Verify user ticks the Tray depths checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
        await page.reload();
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks in Tray depths chekcbox
    await test.step(`User ticks in Tray depths chekcbox`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightUnCheckedTrayDepths);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(5000);
    });

    //expect Tray depths is ticked 
    await test.step(`Expect Tray depths is ticked `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightCheckedTrayDepths,
            "visible",
            300000
        )
    });

});

test('65384 - Verify user ticks the Tray IDs checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )
    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of WINU0725 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
        expect(
            await page.$eval(
                dashBoardPage.detailRow,
                (e) => getComputedStyle(e).backgroundColor
            )
        ).toBe("rgb(108, 195, 81)");
    });

    //user clicks on drillhole view tab 
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks in Tray IDs chekcbox 
    await test.step(`User ticks in Tray IDs chekcbox`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightUnCheckedTrayIDs);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon 
    await test.step(`User clicks on right menu icon `, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(5000);
    });

    //user ticks in Tray IDs checkbox 
    await test.step(`User ticks in Tray IDs checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightCheckedTrayIDs);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu
    await test.step(`User clicks on right menu`, async () => {
        await drillHoleView.clickToElement(drillHoleView.rightMenuDropdown)
        await drillHoleView.pause(5000);
    });

    //expect Tray IDs ticked 
    await test.step(`Expect Tray IDs ticked `, async () => {
        await drillHoleView.waitForElement(
            drillHoleView.rightUnCheckedTrayIDs,
            "visible",
            300000
        )
    });
});

test('65385 - Verify user switchs to 3D mode option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D Mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //expect the web is switched to 3D mode 
    await test.step(`Expect the web is switched to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleSwitchTo2DModeBtn,
            "visible",
            30000
        )
    });
});

test('65386 - Verify user switchs to 2D mode option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D Mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //expect the web is switched to 3D mode 
    await test.step(`Expect the web is switched to 3D mode `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //expect the web is switched to 2D mode again 
    await test.step(`Expect the web is switched to 2D mode again `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo2DModeBtn)
        await drillHoleView.pause(2000);

        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.waitForElement(
            drillHoleView.midleSwitchTo3DModeBtn,
            "visible",
            300000
        )
    });

});

test('65387 - Verify user selects the reset camera option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects reset camera option 
    await test.step(`User selects reset camera option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleResetCameraOption);
        await drillHoleView.pause(5000);
    });

    //user snapshot and compare image 
    await test.step(`User snapshot and compare image`, async () => {
        await testInfo.attach("unlock", {
            body: await page.screenshot(),
            contentType: "image/png",
        });
        await drillHoleView.pause(8000);
        await drillHoleView.imageComparisons();
        await drillHoleView.pause(2000);
    });
});

test('65388 - Verify user selects the down load image option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects download image option 
    await test.step(`User selects download image option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleDownloadImageOption);
        await drillHoleView.pause(5000);
    });
});

test('65389 - Verify user selects the turn shader on  @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects turn shader off option 
    await test.step(`User selects turn shader off option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleTurnShaderOnOption);
        await drillHoleView.pause(5000);
    });

    //expect the shader off option is selected 
    await test.step(`Expect the shader off option is selected `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.waitForElement(
            drillHoleView.midleTurnShaderOffOption,
            "visible",
            300000
        )
    });
});

test('65390 - Verify user selects the show null points option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects show null points option 
    await test.step(`User selects show null points option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleShowNullPointsOption);
        await drillHoleView.pause(5000);
    });

    //expect the show null points is selected 
    await test.step(`Expect the show null points is selected  `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.waitForElement(
            drillHoleView.midleHideNullPointsOption,
            "visible",
            300000
        )
    });

});

test('65391 - Verify user selects show title outline option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects show null points option 
    await test.step(`User selects show null points option`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleShowTitleOutline);
        await drillHoleView.pause(5000);
    });

    //expect the show title outline is selected
    await test.step(`Expect the show title outline is selected`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.waitForElement(
            drillHoleView.midleHideTitleOutline,
            "visible",
            300000
        )
    });
});

test('65392 - Verify user selects copy title copy option @drillhole @unstable', async ({ }, testInfo) => {
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
    await test.step(`User clicks on drillhole view tab`, async () => {
        await drillHoleView.clickToElement(drillHoleView.drillHoleViewTab);
        await drillHoleView.pause(10000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects show null points option 
    await test.step(`User selects show null points option `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleCopyTitleInforOption);
        await drillHoleView.pause(5000);
    });
});

test('65394 - Verify user selects the vis alg off option @drillhole @unstable', async ({ }, testInfo) => {
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

    //user clicks on right menu icon dropdown
    await test.step(`User clicks on right menu icon dropdown`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //switch to 3D mode 
    await test.step(`User switch to 3D mode`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleSwitchTo3DModeBtn);
        await drillHoleView.pause(5000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user selects show null points option 
    await test.step(`User selects show null `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleVisAlgOffOption);
        await drillHoleView.pause(5000);
    });

    //expect the vis alg off option is selected 
    await test.step(`Expect the vis alg off option is selected `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown);
        await drillHoleView.waitForElement(
            drillHoleView.midleVisAlgOnOption,
            "visible",
            300000
        )
    });
});

test('65396 - Verify user ticks the show border checkbox @drillhole', async ({ }, testInfo) => {
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

    //user selects category dropdown list 
    await test.step(`User selects category dropdown list `, async () => {
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType('Geotechnical (12)'));
        await drillHoleView.pause(2000);
    });

    //user selects category dropdown list 
    await test.step(`User selects category dropdown list `, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('Update2 Drill core regions'));
        await drillHoleView.pause(2000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
    });

    //user ticks in show border checkbox 
    await test.step(`User ticks in show border checkbox `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleCheckedShowBorder);
        await drillHoleView.pause(2000);
    });

    //expect the show border checkbox is not ticked 
    await test.step(`Expect the show border checkbox is not ticked `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleUncheckedShowBorder,
            "visible",
            300000
        )
    });
});

test('65549 - Verify user ticks the mineral map checkbox @drillhole', async ({ }, testInfo) => {
    //user search LM-13-01 drillhole 
    await test.step(`User search LM-13-01 drillhole `, async () => {
        await dashBoardPage.fillToElement(
            dashBoardPage.searchDrillHoleInput,
            "LM-13-01"
        );
    });

    //expect the LM-13-01 drillhole is displayed
    await test.step(`Expect the LM-13-01 drillhole is displayed`, async () => {
        await dashBoardPage.waitForElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01"),
            "visible",
            300000
        )

    });

    //user clicks on LM-13-01 drillhole 
    await test.step(`User clicks on LM-13-01 drillhole `, async () => {
        await dashBoardPage.clickToElement(
            dashBoardPage.drillHoleSearchResult("LM-13-01")
        );
    });

    //expect the backouground of LM-13-01 drillhole is correctly displayed
    await test.step(`Expect the backouground of LM-13-01 drillhole is correctly displayed`, async () => {
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

    //user selects category dropdown list 
    await test.step(`User selects category dropdown list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.categoryTypeDropDown);
        await drillHoleView.clickToElement(drillHoleView.dynamicCategoryType('Mineralogy (21)'));
        await drillHoleView.pause(2000);
    });

    //user select menu item list 
    await test.step(`User selects menu item list`, async () => {
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeLabel('1'));
        await drillHoleView.clickToElement(drillHoleView.dynamicItemProductTypeList('_Mineral class map'));
        await drillHoleView.pause(2000);
    });

    //user clicks on right menu icon dropdown 
    await test.step(`User clicks on right menu icon dropdown `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);

    });

    //user ticks in mineral map checkbox 
    await test.step(`User ticks in mineral map checkbox`, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleUncheckedMineralMap);
        await drillHoleView.pause(2000);
    });

    //expect the mineral map is ticked 
    await test.step(`Expect the mineral map is ticked `, async () => {
        await drillHoleView.clickToElement(drillHoleView.midleMenuDropdown)
        await drillHoleView.pause(2000);
        await drillHoleView.waitForElement(
            drillHoleView.midleCheckedMineralMap,
            "visible",
            300000
        )
    });
});

















