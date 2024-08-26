import { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class LoginPage extends BasePage {

  constructor(public readonly page: Page) {
    super(page);
  }

  async goToLoginPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/login`);
  }

  async enterUsername(username: string) {
    await this.page.locator("#username").fill(username);
  }

  async enterPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(".base-button.base-button--type-button.button.is-primary").click();
  }
}