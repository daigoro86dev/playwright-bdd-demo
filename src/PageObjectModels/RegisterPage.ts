import { Page } from "playwright";
import LoginPage from "./LoginPage";

export default class RegisterPage extends LoginPage {
  constructor(public readonly page: Page) {
    super(page);
  }

  async goToRegisterPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterEmail(email: string) {
    await this.page.locator("#email").fill(email);
  }

  async clickCreatAccountButton() {
    await this.page.locator("#register-submit").click();
  }
}