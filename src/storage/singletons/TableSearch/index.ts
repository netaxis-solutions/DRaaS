import { makeAutoObservable, runInAction } from "mobx";

class TableSearch {
  searchValue: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = (newValue: string) => {
    runInAction(() => {
      this.searchValue = newValue;
    });
  };

  clearTableSearch = () => {
    runInAction(() => {
      this.searchValue = "";
    });
  };
}

export default new TableSearch();
