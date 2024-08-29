import { Page } from "playwright";
import BasePageDependency from "../../../Common/Core/BasePageDependency";
import { GenericPageConstructor } from "../../../Common/Core/GenericPageConstructor";
import BaseSteps from "./BaseStepts";
import LoginPage from "../../../PageObjectModels/LoginPage";
import RegisterPage from "../../../PageObjectModels/RegisterPage";

export default class BasePageSteps extends BaseSteps {
  constructor(private readonly page: Page) {
    super();
  }

  static Init<T extends BasePageSteps>(this: GenericPageConstructor<T>, page: Page): T {
    return new this(page) as T;
  }

  private async run<T extends BasePageDependency>(
    instanceType: new (page: Page) => T,
    fn: (p: T) => Promise<void>,
  ): Promise<void> {
    await fn(new instanceType(this.page));
  }

  protected async runLoginPage(fn: (p: LoginPage) => Promise<void>) {
    return await this.run(LoginPage, async (p) => fn(p));
  }

  protected async runRegisterPage(fn: (p: RegisterPage) => Promise<void>) {
    return await this.run(RegisterPage, async (p) => fn(p));
  }
}