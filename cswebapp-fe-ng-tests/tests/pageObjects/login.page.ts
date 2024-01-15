import { expect, Locator, Page } from "@playwright/test";
import CommonPage from "./page";

export default class LoginPage extends CommonPage {
  page: Page;
  constructor(page: Page) {
      super(page);
    this.page = page;
  }
  get userNameInput(): string {
    return "//input[@id='username'] | //input[@id='basic_username']";
  }

  get passwordInput(): string {
    return "//input[@id='password'] | //input[@id='basic_password']";
  }
  
  get signInInput(): string {
    return "//input[@id='signin'] | //span[text()='Sign In']//parent::button";
  }

  get errMessage(): string {
    return "//div[contains(text(), 'Invalid User')]";
  }

  get requiredMessage(){
    return "//div[contains(text(),'This field is required!')]";
  }

  get forgotpassswordLink(){
    return "//a[contains(text(),'Forgot password?')]//parent ::div[@id='signin-forgotten']"
  }


}