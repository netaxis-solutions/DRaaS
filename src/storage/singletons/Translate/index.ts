import { action, makeObservable, observable, runInAction } from "mobx";

class TranslateStore {
  language: string | null = "en";

  constructor() {
    makeObservable(this, {
      language: observable,
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
