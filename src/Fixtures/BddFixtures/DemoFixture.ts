import { test as base, createBdd } from 'playwright-bdd';
import DemoSteps from '../../Steps/CoreSteps/DemoSteps';
import DemoApiSteps from '../../Steps/CoreSteps/DemoApiSteps';

type DemoFixture = {
  _: { demoSteps: DemoSteps, demoApiSteps: DemoApiSteps }
};

export const test = base.extend<DemoFixture>({
  _: async ({ page, request }, use) => {
    await use({
      demoSteps: DemoSteps.Init(page),
      demoApiSteps: DemoApiSteps.Init(request)
    })
  }
});

export const { Given, When, Then } = createBdd(test);