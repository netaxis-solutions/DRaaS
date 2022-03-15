import { makeAutoObservable, runInAction } from "mobx";
import { debounce } from "lodash";

class TablePagination {
  tablePageCounter: number = 1;
  tablePageSize: number = 10;
  tablePageSizeWithoutPagination: number = 10;
  search: string = "";
  liveSearch: string = "";
  tableWithOutServerPagination: boolean = false;
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

  tableLiveSearch = (payload: string) => {
    runInAction(() => {
      this.liveSearch = payload;
      this.tableSearch();
    });
  };

  tableSearch = debounce(() => {
    runInAction(() => {
      this.tablePageCounter = 1;
      this.search = this.liveSearch;
    });
  }, 1000);

  setTableDropDown = (payload: number) => {
    runInAction(() => {
      this.tablePageSize = payload;
      this.tablePageCounter = 1;
    });
  };

  setTableDropDownWithoutPagination = (payload: number) => {
    runInAction(() => {
      this.tablePageSizeWithoutPagination = payload;
    });
  };

  getTableConfig = (payload: {
    page: number;
    pages: number;
    results: number;
    [key: string]: any;
  }) => {
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

  uploadTableConfig = (param?: boolean) => {
    this.tableWithOutServerPagination = param || false;
  };

  clearPaginationData = () => {
    runInAction(() => {
      this.tablePageCounter = 1;
      this.tablePageSize = 10;
      this.search = "";
      this.liveSearch = "";
      this.tableWithOutServerPagination = false;
      this.tableConfig = { page: 1, pages: 1 };
      this.tablePageSizeWithoutPagination = 10;
    });
  };

  clearTablePagesWithoutServerPaginations = (dataLengths: number) => {
    const param = Math.ceil(dataLengths / 10);
    if (param) {
      this.tableWithOutServerPagination = true;
    }
    const formatter = param === 0 ? 1 : param;
    this.tableConfig = { page: 1, pages: formatter };
  };
}

export default new TablePagination();
