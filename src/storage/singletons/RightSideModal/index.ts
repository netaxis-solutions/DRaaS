import { makeAutoObservable, observable } from "mobx";

class RightSideModal {
  currentDelayedModalCloseAction: (
    delayedCallback?: () => void,
  ) => void = () => {};
  isSubmitPending: boolean = false;

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

  // This action is setting if submit button is sended request
  setSubmitPending = (state = true) => {
    this.isSubmitPending = state;
  };
}

export default new RightSideModal();
