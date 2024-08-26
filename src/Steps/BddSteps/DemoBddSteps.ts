import { Given, Then } from '../../Fixtures/DemoFixture';

Given('I open demo url {string}', async ({ _ }, url) => {
  await _.demoSteps.openDemoUrl(url);
});

Given('I login through API with username {string} and password {string} credentials', async ({ _ }, username, password) => {
  await _.demoApiSteps.loginUser(username, password);
});

Then('I check the login token', ({ _ }) => {
  _.demoApiSteps.checkLoginToken();
});

Then('I login with username {string} and password {string} credentials', async ({ _ }, username, password) => {
  await _.demoSteps.loginExistingUser(username, password);
});