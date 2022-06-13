import { makeAutoObservable, runInAction } from "mobx";

class FormSelectWithLiveSearchStorage {
  currentValue: { label: string; value: string } = { label: "", value: "" };

  constructor() {
    makeAutoObservable(this, {});
  }

  // set new current value to input
  setNewValue = (payload: { label: string; value: string }) => {
    runInAction(() => {
      this.currentValue = payload;
    });
  };

  // clean storage and remove old value
  cleanCurrentValue = () => {
    this.currentValue = { label: "", value: "" };
  };
}

export default new FormSelectWithLiveSearchStorage();
