import { makeAutoObservable, observable } from "mobx";

class RightSideModal {
  currentDelayedModalCloseAction: () => void = () => {};

  constructor() {
    makeAutoObservable(this, {
      currentDelayedModalCloseAction: observable.ref,
    });
  }

  // This action purpose is to save current modalClose function
  // for further global use
  setCurrentModalCloseAction = (newCloseAction: () => void) => {
    this.currentDelayedModalCloseAction = newCloseAction;
  };

  // This action purpose is to clear current modalClose function
  clearRightSideModal = () => {
    this.currentDelayedModalCloseAction = () => {};
  };
}

export default new RightSideModal();
