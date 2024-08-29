import DemoSteps from '../../Steps/CoreSteps/DemoSteps';
import DemoApiSteps from '../../Steps/CoreSteps/DemoApiSteps';
import MixedSupporterUtility from '../../Common/Infrastructure/MixedSupporterUtility';

type DemoFixture = {
  _: { demoSteps: DemoSteps, demoApiSteps: DemoApiSteps }
};

export const test = MixedSupporterUtility.GetBaseToExtend().extend<DemoFixture>({
  _: async ({ page, request }, use) => {
    await use({
      demoSteps: DemoSteps.Init(page),
      demoApiSteps: DemoApiSteps.Init(request)
    })
  }
});