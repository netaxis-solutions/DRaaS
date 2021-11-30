import { makeAutoObservable } from "mobx";

class TableSelectedRows {
  selectedRows: {
    [key: string]: boolean;
  } = {};

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRows = (selectedRows: Record<string, boolean>) => {
    console.log(selectedRows);
    this.selectedRows = selectedRows;
  };

  clearSelectedRows = () => {
    this.selectedRows = {};
  };

  get selectedRowsLength() {
    return Object.values(this.selectedRows).length;
  }
}

export default new TableSelectedRows();
