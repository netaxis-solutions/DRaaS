import { makeAutoObservable } from "mobx";

class TableInfiniteScroll {
  currentToken: string | null = null;

  constructor() {
    makeAutoObservable(this, {});
  }

  setNewToken = (newToken: string) => {
    this.currentToken = newToken;
  };

  getNewTableData = (
    getNewDataCallback: (
      currentToken: string,
      setNewToken: (newToken: string) => void,
    ) => void,
  ) => {
    getNewDataCallback(this.currentToken || "", this.setNewToken);
  };
}

export default new TableInfiniteScroll();
