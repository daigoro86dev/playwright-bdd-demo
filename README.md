# Playwright BDD Demo

## Playwright Template Project with BDD

- This project is a variation of <https://github.com/daigoro86dev/playwright-starter> with Cucumber Integration through <https://vitalets.github.io/playwright-bdd/#/>.

### Installation

- Install **pnpm** <https://pnpm.io/installation> (plain npm or yarn are also supported but scripts will have to be adjusted)
- ```pnpm i```

### Execution

- Install browsers with ```pnpm exec playwright install```

- Using VS Code: install <https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright> and
use the test runner.

- Generate JS code from the .feature files ```pnpm exec bddgen```

- Using the CLI: ```pnpm exec bddgen && pnpm exec playwright test --grep "<test tag> or regex" --project=chrome```

### Project Structure

- Similar to <https://github.com/daigoro86dev/playwright-starter> with a few adjustments to support bddgen and feature files.
- This template also shows how the same codebase can be shared between BDD compliant tests and regular tests with minimal effort. In that case, it's possible to use a hybrid fixture that will extend a test object based on the **NO_BDD** environment value which supports both BDD and plain Playwright fixtures.