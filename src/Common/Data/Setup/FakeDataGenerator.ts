import { faker } from "@faker-js/faker";
import UserRegisterRequest from "../Dtos/UserRegisterRequest";

export default class FakeDataGenerator {

  private static instance: FakeDataGenerator;

  constructor() { }

  public static GetInstance() {
    if (!FakeDataGenerator.instance) {
      FakeDataGenerator.instance = new FakeDataGenerator();
    }
    return FakeDataGenerator.instance;
  }

  getFakeUser(): UserRegisterRequest {
    const user = new UserRegisterRequest();
    user.username = `${faker.person.firstName()}_${faker.number.int({ min: 100, max: 1000 })}`;
    user.password = faker.internet.password();
    user.email = faker.internet.email();
    return user;
  }
}