import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class ReportBugPage extends CommonPage{
    page: Page;
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    get reportBugBtn():string{
        return "//b[contains(text(), 'Report Bug')]//parent::div | //span[contains(text(), 'Report Bug')]//parent::button"
    }

    get reportBugText():string{
        return "//div[contains(text(),'Report Bug')]"
    }

    get reportBugPopupCloseBtn():string{
        return "(//span[contains(text(), 'Close')]//parent::button)[1] | //button[contains(@aria-label, 'Close')]"
    }

    get errorTitleText():string{
        return "//label[contains(text(), 'Error title')] | //label[contains(text(), 'Error title')]"
    }

    get errorEmptyErrorTitle(){
        return"//div[contains(text(),'Please input your Error title!')]"
    }

    get errorTitleForm():string{
        return "//input[contains(@id, 'errorTitle')] | //input[contains(@id, 'basic_errorTitle')]"
    }

    get errorDescriptionText():string{
        return "//label[contains(text(), 'Error Description')] | //label[contains(text(), 'Error Description')]"
    }

    get errorEmptyErrorDescription(){
        return"//div[contains(text(),'Please input your Error Description!')]"
    }

    get errorDescriptionForm():string {
        return "//textarea[@id = 'errorDescription']"
    }

    get errorImage():string{
        return "//img[contains(@id, 'errorScreenshot')] | (//div[contains(text(), 'Report Bug')]//parent::div//following-sibling::div/form/div)[3]"
    }

    get closePopupBtn():string{
        return "//span[contains(text(),'Submit')]//parent::button//preceding-sibling::button"
    }

    get submitPopupBtn():string{
        return "//span[contains(text(),'Submit')]//parent::button"
    }

    get closeIconPopUp(){
        return"span[class='anticon anticon-close ant-modal-close-icon']";
    }



}