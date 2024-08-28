import { test } from '../../src/Fixtures/RegularFixtures/DemoFixture';

test.describe('Demo site', () => {
  test('Login user', async ({ _ }) => {
    await _.demoSteps.openDemoUrl("https://try.vikunja.io/login");
    await _.demoSteps.loginExistingUser('demo', 'demo');
  });

  test('Login user through API', async ({ _ }) => {
    await _.demoApiSteps.loginUser();
    await _.demoApiSteps.checkLoginToken();
  });
});