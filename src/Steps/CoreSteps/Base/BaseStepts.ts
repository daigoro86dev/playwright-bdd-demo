import { DataStoreValues } from "../../../Common/Core/DataStoreValues";
import ProjectDataStore from "../../../Common/Core/ProjectDataStore";
import FakeDataGenerator from "../../../Common/Data/Setup/FakeDataGenerator";

export default class BaseSteps {

  private fakeDataGenerator: FakeDataGenerator;

  protected getStoreVal<T>(key: DataStoreValues) {
    return ProjectDataStore.GetInstance().getStoreVal<T>(key);
  }

  protected setStoreKeyVal<T>(key: DataStoreValues, value: T) {
    return ProjectDataStore.GetInstance().setStoreKeyVal<T>(key, value);
  }

  protected getStoreMap() {
    return ProjectDataStore.GetInstance().getStoreMap();
  }

  protected getFakeDataGenerator() {
    this.fakeDataGenerator = new FakeDataGenerator();
    return this.fakeDataGenerator;
  }
}