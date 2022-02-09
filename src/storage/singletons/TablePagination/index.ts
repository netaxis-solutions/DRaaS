import { makeAutoObservable, runInAction } from "mobx";
import _ from "lodash";

class TablePagination {
  tablePageCounter: number = 1;
  tablePageSize: number = 10;
  search: string = "";
  liveSearch: string = "";
  tableConfig: { page: number; pages: number } = { page: 1, pages: 1 };

  constructor() {
    makeAutoObservable(this);
  }

  tableNextPage = () => {
    if (this.tablePageCounter < this.tableConfig.pages) {
      this.tablePageCounter++;
    }
  };

  tablePrevPage = () => {
    if (this.tablePageCounter !== 1) {
      this.tablePageCounter--;
    }
  };

  tableLiveSearch = (payload: any) => {
    runInAction(() => {
      this.liveSearch = payload;
      this.tableSearch();
    });
  };

  tableSearch = _.debounce(() => {
    runInAction(() => {
      this.tablePageCounter = 1;
      this.search = this.liveSearch;
    });
  }, 1000);

  tableDropDown = (payload: number) => {
    this.tablePageSize = payload;
  };

  getTableConfig = (payload: any) => {
    runInAction(() => {
      this.tableConfig = { page: payload.page, pages: payload.pages };
    });
  };

  getMinPage = () => {
    if (this.tableConfig.page <= 1) {
      return true;
    } else return false;
  };

  getMaxPage = () => {
    if (this.tableConfig.page === this.tableConfig.pages) {
      return true;
    } else return false;
  };

  clearPaginationData = () => {
    runInAction(() => {
      this.tablePageCounter = 1;
      this.tablePageSize = 10;
      this.search = "";
      this.liveSearch = "";
      this.tableConfig = { page: 1, pages: 1 };
    });
  };
}

export default new TablePagination();
