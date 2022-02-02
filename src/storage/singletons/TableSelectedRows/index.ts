import { isEmpty } from "lodash";
import { makeAutoObservable, observable } from "mobx";

import { RadioSelectRowType } from "utils/types/tableConfig";

class TableSelectedRows {
  selectedRows: {
    [key: string]: boolean;
  } = {};
  radioButtonValueInRow: RadioSelectRowType = {};
  selectedRowsValues: Array<{ [key: string]: any }> = [];

  constructor() {
    makeAutoObservable(this, {
      selectedRowsValues: observable.ref,
    });
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

  setSelectedRowsValues = (selectedValues: Array<{ [key: string]: any }>) => {
    this.selectedRowsValues = selectedValues;
  };

  clearSelectedRows = () => {
    this.selectedRows = {};
  };

  isRowSelected = () => {
    return !isEmpty(this.selectedRows);
  };

  get selectedRowsLength() {
    return Object.values(this.selectedRows).length;
  }
}

export default new TableSelectedRows();
