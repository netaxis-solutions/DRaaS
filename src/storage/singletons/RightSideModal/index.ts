import { makeAutoObservable, observable } from "mobx";

class RightSideModal {
  currentDelayedModalCloseAction: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      currentDelayedModalCloseAction: observable.ref,
    });
  }

  setCurrentModalCloseAction = (newCloseAction: () => void) => {
    this.currentDelayedModalCloseAction = newCloseAction;
  };

  clearRightSideModal = () => {
    this.currentDelayedModalCloseAction = () => {};
  };
}

export default new RightSideModal();
