import { APIRequestContext } from "playwright";
import BaseApiHandler from "./BaseApiHandler";
import DemoApiModule from "../Modules/DemoApiModule";
import UserLoginRequest from "../../Data/Dtos/UserLoginRequest";
import CustomResponse from "../Modules/CustomResponse";
import UserRegisterRequest from "../../Data/Dtos/UserRegisterRequest";

export default class DemoApiHandler extends BaseApiHandler {
  constructor(readonly apiRequestContext: APIRequestContext) {
    super(apiRequestContext);
    this.apiClient = this.setupClient(`https://try.vikunja.io`);
  }

  private async setupTemplateDemoApiModule<T>(fn: (m: DemoApiModule) => Promise<CustomResponse<T>>) {
    return await this.setupModule(DemoApiModule, async (m) => await fn(m));
  }

  async login(user: UserLoginRequest) {
    return await this.setupTemplateDemoApiModule(async (_) => await _.login(user));
  }

  async register(user: UserRegisterRequest) {
    return await this.setupTemplateDemoApiModule(async (_) => await _.register(user));
  }
}