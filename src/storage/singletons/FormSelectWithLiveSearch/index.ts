import { makeAutoObservable, runInAction } from "mobx";

class FormSelectWithLiveSearchStorage {
  currentValue: { label: string; value: string } = { label: "", value: "" };

  constructor() {
    makeAutoObservable(this, {});
  }

  // set new current value to input
  setNewValue = (payload: string) => {
    runInAction(() => {
      this.currentValue = { label: payload, value: payload };
    });
  };

  // clean storage and remove old value
  cleanCurrentValue = () => {
    this.currentValue = { label: "", value: "" };
  };
}

export default new FormSelectWithLiveSearchStorage();
