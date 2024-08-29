import { test as baseBdd } from 'playwright-bdd';
import { test as baseNotBdd } from 'playwright/test';

export default class MixedSupporterUtility {

  static GetBaseToExtend() {
    return process.env.NO_BDD === "1" ? baseNotBdd : baseBdd;
  }
}