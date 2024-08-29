import { DataStoreValues } from "../../../Common/Core/DataStoreValues";
import ProjectDataStore from "../../../Common/Core/ProjectDataStore";
import FakeDataGenerator from "../../../Common/Data/Setup/FakeDataGenerator";

export default class BaseSteps {

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
    return FakeDataGenerator.GetInstance();
  }
}