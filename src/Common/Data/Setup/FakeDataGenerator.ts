import { faker } from "@faker-js/faker";
import UserRegisterRequest from "../Dtos/UserRegisterRequest";

export default class FakeDataGenerator {

  constructor() { }

  getFakeUser(): UserRegisterRequest {
    const user = new UserRegisterRequest();
    user.username = `${faker.person.firstName()}_${faker.number.int({ min: 100, max: 1000 })}`;
    user.password = faker.internet.password();
    user.email = faker.internet.email();
    return user;
  }
}