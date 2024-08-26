import { Page } from "playwright";
import BasePageSteps from "./Base/BasePageSteps";

export default class DemoSteps extends BasePageSteps {
  constructor(page: Page) {
    super(page);
  }

  async openDemoUrl(url: string) {
    await this.runLoginPage(async (_) => {
      await _.goToLoginPage(url);
    });
  }

  async loginExistingUser(username: string, password: string) {
    await this.runLoginPage(async (_) => {
      await _.enterUsername(username);
      await _.enterPassword(password);
      await _.clickLoginButton();
    });
  }

}