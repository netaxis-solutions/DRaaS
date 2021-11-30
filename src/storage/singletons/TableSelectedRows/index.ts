import { makeAutoObservable } from "mobx";

class TableSelectedRows {
  selectedRows: {
    [key: string]: boolean;
  } = {};
  singleSelectedRow: {
    [key: string]: any;
  } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRows = (selectedRows: Record<string, boolean>) => {
    this.selectedRows = selectedRows;
  };

  setSingleSelectedRow = (selectedRow: any) => {
    this.singleSelectedRow = selectedRow;
  };

  clearSelectedRows = () => {
    this.selectedRows = {};
    this.singleSelectedRow = null;
  };

  get selectedRowsLength() {
    return Object.values(this.selectedRows).length;
  }
}

export default new TableSelectedRows();
