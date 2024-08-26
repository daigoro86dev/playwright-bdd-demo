import { APIRequestContext } from '@playwright/test';
import ApiClient from '../Clients/ApiClient';
import AbstractModule from '../Modules/AbstractModule';
import CustomResponse from '../Modules/CustomResponse';
import BaseApiHandlerDependency from '../../Core/BaseApiHandlerDependency';

export default class BaseApiHandler extends BaseApiHandlerDependency {
  protected apiClient?: ApiClient;

  constructor(public readonly apiRequestContext: APIRequestContext) {
    super(apiRequestContext);
  }

  async setupModule<T extends AbstractModule, K>(
    m: { new(apiRequestContext: APIRequestContext): T },
    fn: (m: T) => Promise<CustomResponse<K>>,
  ) {
    return fn(await this.apiClient!.setupModule(m));
  }

  setupClient(baseURL: string) {
    this.apiClient = new ApiClient(baseURL, this.apiRequestContext);
    return this.apiClient;
  }
}