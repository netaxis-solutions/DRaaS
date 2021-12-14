import { makeAutoObservable } from "mobx";

class TableSelectedRows {
  selectedRows: {
    [key: string]: boolean;
  } = {};
  editableRow: object = {};

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRows = (selectedRows: Record<string, boolean>) => {
    this.selectedRows = selectedRows;
  };

  clearSelectedRows = () => {
    this.selectedRows = {};
  };

  get selectedRowsLength() {
    return Object.values(this.selectedRows).length;
  }
  setEditableRow = (editableRow: object) => {
    this.editableRow = editableRow;
  };
}

export default new TableSelectedRows();
