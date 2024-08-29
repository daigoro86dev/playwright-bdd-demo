import { APIRequestContext } from '@playwright/test';
import AbstractModule from './AbstractModule';
import UserLoginRequest from '../../Data/Dtos/UserLoginRequest';
import UserLoginResDto from '../../Data/Dtos/UserLoginResDto';
import UserRegisterRequest from '../../Data/Dtos/UserRegisterRequest';
import UserRegisterResDto from '../../Data/Dtos/UserRegisterResDto';

export default class DemoApiModule extends AbstractModule {
  private readonly path = 'api/v1';

  constructor(apiRequestContext: APIRequestContext) {
    super(apiRequestContext);
  }

  async login(user: UserLoginRequest) {
    return await this.getCustomResponse<UserLoginResDto>(async () => await this.post(`${this.path}/login`, user));
  }

  async register(user: UserRegisterRequest) {
    return await this.getCustomResponse<UserRegisterResDto>(async () => await this.post(`${this.path}/register`, user));
  }
}