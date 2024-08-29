import { Given, Then, When } from '../../Fixtures/BddFixtures/DemoFixture';

Given('I open demo url {string}', async ({ _ }, url) => {
  await _.demoSteps.openDemoUrl(url);
});

Given('I login through API with username {string} and password {string} credentials', async ({ _ }, username, password) => {
  await _.demoApiSteps.loginUser(username, password);
});

Given('I register through API', async ({ _ }) => {
  await _.demoApiSteps.registerUser();
});

Then('I check the login token', ({ _ }) => {
  _.demoApiSteps.checkLoginToken();
});

Then('I check the registered user', ({ _ }) => {
  _.demoApiSteps.checkRegisteredUser();
});

Then('I login with username {string} and password {string} credentials', async ({ _ }, username, password) => {
  await _.demoSteps.loginExistingUser(username, password);
});

When("I click the Create Account link", async ({ _ }) => {
  await _.demoSteps.clickCreateAccountLink();
});

Then("I register a new user", async ({ _ }) => {
  await _.demoSteps.registerUser();
});