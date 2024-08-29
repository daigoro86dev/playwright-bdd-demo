import { APIRequestContext } from "playwright";
import BaseApiSteps from "./Base/BaseApiSteps";
import UserLoginRequest from "../../Common/Data/Dtos/UserLoginRequest";
import { expect } from "playwright/test";
import UserRegisterResDto from "../../Common/Data/Dtos/UserRegisterResDto";

export default class DemoApiSteps extends BaseApiSteps {
  constructor(apiRequestContext: APIRequestContext) {
    super(apiRequestContext);
  }

  async loginUser(username: string = 'demo', password: string = 'demo') {
    await this.runDemoApiHandler(async (_) => {
      const user = new UserLoginRequest();

      user.username = username;
      user.password = password;
      user.long_token = false;
      const res = await _.login(user);
      expect(res.statusCode).toBe(200);
      this.setStoreKeyVal("token", res.body?.token);
    });
  }

  async checkLoginToken() {
    const token = this.getStoreVal<string>("token");
    expect(token).not.toBe(null);
    expect(token.length).toBe(261);
  }

  async registerUser() {
    await this.runDemoApiHandler(async (_) => {
      const user = this.getFakeDataGenerator().getFakeUser();
      const res = await _.register(user);
      expect(res.statusCode).toBe(200);
      this.setStoreKeyVal<UserRegisterResDto>("registeredUser", res.body!);
    });
  }

  async checkRegisteredUser() {
    const user = this.getStoreVal<UserRegisterResDto>("registeredUser");
    expect(user).not.toBe(null);
  }
}