import { test, expect, chromium, Browser, Page } from "@playwright/test";
import LoginPage from "../pageObjects/login.page";
import DashBoardPage from "../pageObjects/dashboard.page";
import CoreTrayViewPage from "../pageObjects/coreTrayView.page"

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
let coreTrayViewPage: CoreTrayViewPage;

test.beforeAll(async ({ }, testInfo) => {
    const browser = await chromium.launch();
    page = await browser.newPage();

    loginPage = new LoginPage(page);
    dashBoardPage = new DashBoardPage(page);
    coreTrayViewPage = new CoreTrayViewPage(page);

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

    test('8975 -  Verify if not select Drill Hole, display "No drill holes selected for viewing. Select a drill hole from dashboard..." @coreTrayView', async ({ }, testInfo) => {
        //set timeout 
        test.setTimeout(300000);

        //user clicks on core tray view tab 
        await test.step(`User clicks on core tray view tab `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(5000);
        });

        //expect the empty message is displayed 
        await test.step(`Expect the empty message is displayed `, async () => {
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.CTVEmptyMessage,
                "visible",
                300000)
        });

    });

    test('8976 - Verify click on Tray and show @coreTrayView', async ({ }, testInfo) => {
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

        //user clicks on core tray view tab 
        await test.step(`User clicks on core tray view tab `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(5000);
        });

        //user clicks on tray text 
        await test.step(`User clicks on tray text `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.trayText);
            await coreTrayViewPage.pause(2000);
        });

        //expect list tray view is correctly displayed
        await test.step(`Expect list tray view is correctly displayed`, async () => {
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.dynamicTrayListView('0001'),
                "visible",
                300000
            )
        });

    });

    test('8977 - Verify click on Base and show @coreTrayView', async ({ }, testInfo) => {
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

            //user access core view tray tab 
            await test.step(`User access core view tray tab`, async () => {
                await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
                await coreTrayViewPage.pause(2000);
            });

            //user clicks on Base 
            await test.step(`User clicks on Base `, async () => {
                await coreTrayViewPage.clickToElement(coreTrayViewPage.baseText);
                await coreTrayViewPage.pause(2000);

            });
            //expect the list of Base is correctly displayed
            await test.step(`Expect the list of Base is correctly displayed`, async () => {
                await coreTrayViewPage.waitForElement(
                    coreTrayViewPage.dynamicBaseListView('Iron oxide 900nm wavelength'),
                    "visible",
                    300000
                )
            });
      
    });

    test('8978 - Verify click on Overlay and show @coreTrayView', async ({ }, testInfo) => {
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //user clicks on Overlay
        await test.step(`user clicks on Overlay`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.overlayText);
            await coreTrayViewPage.pause(2000);
        });

        //expect the list of Overlay is correctly displayed 
        await test.step(`Expect the list of Overlay is correctly displayed`, async () => {
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.dynamicOverlayListView('Chlorite 2250nm wavelength'),
                "visible",
                300000
            )
        });
    });

    test('8979 - Verify click on Transparency and show @coreTrayView', async ({ }, testInfo) => {
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //verify user clicks on Transparency and show view Transparency 
        await coreTrayViewPage.clickToElement(coreTrayViewPage.transparencyText);
        await coreTrayViewPage.pause(2000);

    });

    test('8980 - Verify click on Drill Hole and show @coreTrayView', async ({ }, testInfo) => {
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


        //search drill hole 2 and clicking drill hole 
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //expect user clicks on Transparency and show view Transparency 
        await test.step(`Expect user clicks on Transparency and show view Transparency`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.drillHoleText);
            await coreTrayViewPage.pause(2000);

            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.dynamicDrillHoleListView('LM-13-01'),
                "visible",
                300000
            )

        });



    });

    test('8981 - Verify click on Menu icon and show @coreTrayView', async ({ }, testInfo) => {
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });


        //expect user clicks on Menu icon and oberser
        await test.step(`Expect user clicks on Menu icon and oberser`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.menuIcon);
            await coreTrayViewPage.pause(2000);
        });


        //expect the elemens are correctly displayed
        await test.step(`Expect the elemens are correctly displayed`, async () => {

            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.unZoomAllOption,
                "visible",
                300000
            )
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.fullSreenUnCheckedbox,
                "visible",
                300000
            )
        });
    });

    test('66127 - Verify user selects unzoom all option at core tray view page @coreTrayView', async ({ }, testInfo) => {
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
        await test.step(`Expect the backouground of WINU0725 drillhole is correctly displayed @incomplete`, async () => {
            expect(
                await page.$eval(
                    dashBoardPage.detailRow,
                    (e) => getComputedStyle(e).backgroundColor
                )
            ).toBe("rgb(108, 195, 81)");
        });

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //expect user clicks on Menu icon and observer
        await test.step(`Expectuser clicks on Menu icon and observer`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.menuIcon);
            await coreTrayViewPage.pause(2000);
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.unZoomAllOption,
                "visible",
                300000
            )
        });

        //user clicks on "Unzoom All" option 
        await coreTrayViewPage.clickToElement(coreTrayViewPage.unZoomAllOption);
        await coreTrayViewPage.pause(2000)

    });

    test('66128 - Verify user selects full screeen option at core tray view page @coreTrayView', async ({ }, testInfo) => {
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
        await test.step(`Expect the backouground of WINU0725 drillhole is correctly displayed @coreTrayView`, async () => {
            expect(
                await page.$eval(
                    dashBoardPage.detailRow,
                    (e) => getComputedStyle(e).backgroundColor
                )
            ).toBe("rgb(108, 195, 81)");
        });

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //user clicks on Menu icon and observer
        await test.step(`User clicks on Menu icon and observer`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.menuIcon);
            await coreTrayViewPage.pause(2000);
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.uncheckedFullScreen,
                "visible",
                300000
            )
        });

        //user clicks on "Full Screen" option 
        await test.step(`User clicks on "Full Screen" option`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.uncheckedFullScreen);
            await coreTrayViewPage.pause(20000);
        });

        //expect the Full Screen is selected and clicking unchecked Full Screen 
        await test.step(`Expect the Full Screen is selected and clicking unchecked Full Screen `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.menuIcon);
            await coreTrayViewPage.pause(2000);
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.checkedFullScreen,
                "visible",
                300000
            )
            await coreTrayViewPage.clickToElement(coreTrayViewPage.checkedFullScreen);
            await coreTrayViewPage.pause(2000);
        });
    });

    test('66130 - Verify users selects region tray option at core tray view page @coreTrayView', async ({ }, testInfo) => {
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });


        //user clicks on item produc type 
        await test.step(`User clicks on item produc type `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.dynamicItemproducType('0'));
            await coreTrayViewPage.pause(5000);
        });

        //user clicks on item produc type 
        await test.step(`User clicks on item produc type `, async () => {
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.uncheckedRegionTray,
                "visible",
                300000
            )
        });

        //user clicks on region tray checkbox 
        await test.step(`User clicks on region tray checkbox `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.uncheckedRegionTray);
            await coreTrayViewPage.pause(2000);
        });

        //user snapshot and compare image 
        await test.step(`User snapshot and compare image`, async () => {
            await coreTrayViewPage.pause(4000);
            await testInfo.attach("unlock", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
            await coreTrayViewPage.pause(4000);
            await coreTrayViewPage.imageComparisons();
            await coreTrayViewPage.pause(2000);
        });
    });

    test('66131 - Verify display Drill hole, Tray, Depth, ID at the bottom left of core tray view page @coreTrayView', async ({ }, testInfo) => {
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //expect the Drill hole, Tray, Depth, ID is displayed 
        await test.step(`Expect the Drill hole, Tray, Depth, ID is displayed `, async () => {
            await coreTrayViewPage.waitForElement(
                coreTrayViewPage.footerTextStatusInfo,
                "visible",
                2000
            )
        });

    });
    test('71438 - Check user selects "Image  Ehancement" option at Core Tray page @coreTrayView', async ({ }, testInfo) => {
        //set timeout 
        test.setTimeout(300000);

        //user search WINU0725 drillhole 
        await dashBoardPage.pause(3000);
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

        //user access core view tray tab 
        await test.step(`User access core view tray tab`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.coreTrayViewTab);
            await coreTrayViewPage.pause(2000);
        });

        //user accesses item list menu 
        await test.step(`User accesses item list menu`, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.dynamicItemproducType('0'));
            await coreTrayViewPage.pause(4000);
        });

        //user selects image enhancement option 
        await test.step(`User selects image enhancement option `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.imageEnhancementUnchecked);
            await coreTrayViewPage.pause(3000);
        });

        //user ticks in HSv view checkbox 
        await test.step(`User ticks in HSv view checkbox `, async () => {
            await coreTrayViewPage.clickToElement(coreTrayViewPage.hsvViewUnchecked);
            await coreTrayViewPage.pause(3000);
        });

        //user snapshot and comapre image
        await test.step(`User snapshot and comapre image`, async () => {
            await coreTrayViewPage.pause(5000);
            await testInfo.attach("unlock", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
            await coreTrayViewPage.pause(4000);
            await coreTrayViewPage.imageComparisons();
            await coreTrayViewPage.pause(2000);
        });

    });
