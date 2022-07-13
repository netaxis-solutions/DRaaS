import { makeAutoObservable, runInAction } from "mobx";

class TableSearch {
  searchValue: string = "";
  searchValueRightTransfer: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = (newValue: string) => {
    runInAction(() => {
      this.searchValue = newValue;
    });
  };

  setSearchValueRightTransfer = (newValue: string) => {
    runInAction(() => {
      this.searchValueRightTransfer = newValue;
    });
  };

  clearTableSearch = () => {
    runInAction(() => {
      this.searchValue = "";
      this.searchValueRightTransfer = "";
    });
  };
}

export default new TableSearch();
