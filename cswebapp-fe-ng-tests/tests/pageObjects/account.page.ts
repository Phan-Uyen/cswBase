import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";


export default class AccountPage extends CommonPage{
    page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get accountLinkPage(){
        return"//div[@class='ant-row items-center ']";
    }

    get accountTitleText():string{
        return "//h2[contains(text(), 'Account Details')]"
    }

    get accountDetailText():string{
        return "//td[contains(text(), 'Username:')] | //p[contains(text(), 'Account Details')]"
    }

    get accountUserNameText():string{
        return "//td[contains(text(), 'Display Name:')] | //p[contains(text(), 'User Name')]"
    }

    get accountFirstNameText():string{
        return "//td[contains(text(), 'First Name:')] | //p[contains(text(), 'First Name')]"
    }

    get accountLastNameText():string {
        return "//td[contains(text(), 'Last Name:')] | //p[contains(text(), 'Last Name')]"
    }

    get accountEmailText():string{
        return "//td[contains(text(), 'Email:')] | //p[contains(text(), 'Email')]"
    }

    get accountCompanyText():string{
        return "//td[contains(text(), 'Company:')] | //p[contains(text(), 'Company')]"
    }

    get accountGroupText():string{
        return "//td[contains(text(), 'Groups:')] | //p[contains(text(), 'Group')]"
    }

    get accountDrillHolePermissionsText():string{
        return "//td[contains(text(), 'Drill Hole Permissions:')] | //p[contains(text(), 'Drill Hole Permissions')]"
    }

    get returnHomeBtn():string{
        return "//a[contains(text(), 'Return to Home')] | //h1[contains(text(), 'Return Home')]"
    }



}