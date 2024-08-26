import { APIRequestContext } from '@playwright/test';
import BaseSteps from './BaseStepts';
import { GenericApiClientConstructor } from '../../../Common/Core/GenericApiClientConstructor';
import BaseApiHandlerDependency from '../../../Common/Core/BaseApiHandlerDependency';
import DemoApiHandler from '../../../Common/HttpClients/Handlers/DemoApiHandler';

export default class BaseApiSteps extends BaseSteps {
  constructor(private readonly apirequestContext: APIRequestContext) {
    super();
  }

  static Init<T extends BaseApiSteps>(this: GenericApiClientConstructor<T>, apiRequestContext: APIRequestContext): T {
    return new this(apiRequestContext) as T;
  }

  protected async run<T extends BaseApiHandlerDependency>(
    instanceType: new (apiRequestContext: APIRequestContext) => T,
    fn: (p: T) => Promise<void>,
  ): Promise<void> {
    await fn(new instanceType(this.apirequestContext));
  }

  protected async runDemoApiHandler(fn: (h: DemoApiHandler) => Promise<void>) {
    return await this.run(DemoApiHandler, async (h) => fn(h));
  }
}