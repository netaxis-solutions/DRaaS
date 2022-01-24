import { makeAutoObservable } from "mobx";

import { RadioSelectRowType } from "utils/types/tableConfig";

class TableSelectedRows {
  selectedRows: {
    [key: string]: boolean;
  } = {};
  radioButtonValueInRow: RadioSelectRowType = {};

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRows = (selectedRows: Record<string, boolean>) => {
    this.selectedRows = selectedRows;
  };

  clearSelectedRowsValue = () => {
    this.radioButtonValueInRow = {};
  };

  setRadioButtonValueInRows = (payload: RadioSelectRowType) => {
    this.radioButtonValueInRow = payload;
  };

  clearSelectedRows = () => {
    this.selectedRows = {};
  };

  get selectedRowsLength() {
    return Object.values(this.selectedRows).length;
  }
}

export default new TableSelectedRows();
