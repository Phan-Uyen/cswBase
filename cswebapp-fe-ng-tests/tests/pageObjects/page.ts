// playwright-dev-page.ts
import { expect, Locator, Page, Browser, BrowserContext } from "@playwright/test";

export default class CommonPage {
    page: Page;
    browser: Browser;
    browserContext: BrowserContext;
constructor(page: Page, browser: Browser) {
    this.page = page;
    this.browser = browser;
    }
  async openBrowser(url: string) {
    await this.page.goto(url);
  }

  async openNewTab(browser: Browser,url: string) {
    // const browser = await playwright.firefox.launch();
    const browserContext =  await browser.newContext();
    const page1 = await browserContext.newPage();
    await page1.goto(url);
    const page2 = await browserContext.newPage();
  }

  async clickToElement(element: string) {
    await this.pause(2000)
    // await this.page.locator(element).scrollIntoViewIfNeeded();
    await this.page.locator(element).click();
  }

  async dblclickToElemnt(element:string){
    await this.pause(2000);
    await this.page.locator(element).dblclick();

  }

  // async locator(element: string) {
  //   await this.page.locator(element);
  // }

  async countElement(element: string, count: number) {
    await expect(this.page.locator(element)).toHaveCount(count);
  }
  async fillToElement(element: string, text: string) {
    await this.page.locator(element).fill(text);
  }

  async clearValue(element: string) {
    await this.page.locator(element).clear();
  }

  async hoverToElement(element: string) {
    await this.page.locator(element).hover();
  }

  async dragToElement(element: string, elementTarget: string) {
    console.log('element ', element)
    console.log('elementTarget ', elementTarget)
    await this.page.locator(element).dragTo(this.page.locator(elementTarget), {force: true, targetPosition: {x: 100, y: 100}});
  }

  async dragAndDrop(
    selector: string,
    targetSelector: string
  ){
    // Get the source element
    const source = this.page.locator(selector);
  
    // Get the target element
    const target = this.page.locator(targetSelector);
  
    // Get the bounding boxes of the source and target elements
    const sourceBox = await source.boundingBox();
    const targetBox = await target.boundingBox();
  
    // Check that both bounding boxes exist
    if (!sourceBox || !targetBox) {
    throw new Error('Could not find source or target element');
    }

    // Calculate the center point of the source element
    const sourceX = sourceBox.x + sourceBox.width / 2;
    const sourceY = sourceBox.y + sourceBox.height / 2;
  
    // Calculate the center point of the target element
    const targetX = targetBox.x + targetBox.width / 2;
    const targetY = targetBox.y + targetBox.height / 2;
  
    // Drag and drop the source element to the target element
    await this.pause(5000);
    await this.page.mouse.move(sourceX, sourceY);
    await this.page.mouse.down();
    await this.pause(5000);
    await this.page.mouse.move(targetX, targetY);
    await this.pause(5000);
    await this.page.mouse.up();
  }

  async waitForElement(
    element: string,
    status: "attached" | "detached" | "visible" | "hidden",
    number: number
  ) {
    await this.page
      .locator(element)
      .waitFor({ state: status, timeout: number });
  }

  async verifyElementState(element: string, state: any) {
    if (state == "isEnabled") {
      await this.page.locator(element).isEnabled();
    } else if ("isChecked") {
      await this.page.locator(element).isChecked();
    } else if ("isDisabled") {
      await this.page.locator(element).isDisabled();
    } else if ("isEditable") {
      await this.page.locator(element).isEditable();
    } else if ("isHidden") {
      await this.page.locator(element).isHidden();
    } else {
      await this.page.locator(element).isVisible();
    }
  }

  async mouseWheel(deltaX: number, deltaY: number) {
    await this.page.mouse.wheel(deltaX, deltaY);
  }

  async mouseMove(deltaX: number, deltaY: number) {
    await this.page.mouse.move(deltaX, deltaY);
  }

  async keyboardDown(keyboard:string) {
    await this.page.keyboard.down(keyboard);
  }

  async keyboardUp(keyboard:string) {
    await this.page.keyboard.up(keyboard);
  }

  async keyboardPress(keyboard:string) {
    await this.page.keyboard.press(keyboard);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async pause(second: number) {
    await this.page.waitForTimeout(second);
  }
  

  async imageComparisons() {
    await this.pause(10000)
    await expect(this.page).toHaveScreenshot();
  }

  async clickMouse(x: number, y: number, position : "left" | "right" | "middle" | undefined = 'left') {
    await this.page.mouse.click(x,y, {button:position});
  }

  async mouseDown() {
    await this.page.mouse.down();
  }

  async mouseUp() {
    await this.page.mouse.up();
  }

  
async scrollToElement(element: string) {
  await this.pause(2000)
  await this.page.locator(element).scrollIntoViewIfNeeded();
}

  
}