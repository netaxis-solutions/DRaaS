import { action, makeObservable, observable, runInAction } from "mobx";
class TranslateStore {
  language: string = "en";

  constructor() {
    makeObservable(this, {
      language: observable.ref,
      changeLanguage: action,
    });
  }

  changeLanguage = (value: string) => {
    runInAction(() => {
      this.language = value;
    });
  };
}

export default new TranslateStore();
