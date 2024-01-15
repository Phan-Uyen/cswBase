import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";


export default class LogoutPage extends CommonPage{
    page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }
get logoutBtn(){
    return"//a[contains(text(),'Log Out')]//parent::div";
}

}