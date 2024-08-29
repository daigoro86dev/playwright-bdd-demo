import { Page } from "playwright";
import BasePageSteps from "./Base/BasePageSteps";
import UserRegisterRequest from "../../Common/Data/Dtos/UserRegisterRequest";

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

  async clickCreateAccountLink() {
    await this.runLoginPage(async (_) => {
      await _.clickCreateAccountLink();
    });
  }

  async registerUser() {
    const user = this.getFakeDataGenerator().getFakeUser();
    await this.runRegisterPage(async (_) => {
      await _.enterUsername(user.username!);
      await _.enterEmail(user.email!);
      await _.enterPassword(user.password!);
      await _.clickCreatAccountButton();
    });
  }
}