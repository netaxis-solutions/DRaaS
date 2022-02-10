import React from "react";
import {
  Column,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
} from "react-table";

export type TableActionsType = {
  edit?: boolean;
  del?: boolean;
  save?: boolean;
  cancel?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
};

export type RawTableData = {
  readonly [key: string]: any;
};

export type TableData = RawTableData & {
  isRowDisabled: boolean;
};

export type ToolbarActionType = {
  id: string;
  icon: React.FC;
  onClick: () => void;
  title: string;
};
export type TableProps = {
  title: string;
  columns: Column<TableData>[];
  data: RawTableData[];
  checkbox?: boolean;
  toolbarActions?: Array<ToolbarActionType>;
  setModalToOpen?: (s: string) => void;
  setDefaultValues?: any;
  handleDeleteItem?: (props: any) => void;
  handleEditItem?: (props: any) => void;
  isEditable?: boolean;
  isRemovable?: boolean;
  radioButton?: boolean;
};

export type ToolbarType = {
  toolbarActions: Array<ToolbarActionType>;
  setGlobalFilter: (object: string) => void;
  value: string;
  title: string;
};

export type TableBodyType = {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<TableData> | undefined,
  ) => TableBodyProps;
  page: Row<TableData>[];
  prepareRow: (row: Row<TableData>) => void;
  radioButton?: boolean;
};

export type TableHeadType = {
  headerGroups: HeaderGroup<TableData>[];
};

export type TableSortPropsType = {
  column: HeaderGroup<TableData>;
};

export type PaginationDropdownType = {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
};

export type PaginationNavigationType = {
  previousPage: () => void;
  nextPage: () => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
  isRadioButton?: boolean;
};
export type RadioSelectRowType = {
  /*  Note
   *  We cannot predict the data type that we get
   *  with selected row. Therefore, we use any type
   *  for increasing flexibility and reusability
   */
  [key: string]: any;
};

export type TablePaginationType = PaginationDropdownType &
  PaginationNavigationType & {
    selectedRows: number;
    pageCount: number;
    pageNumber: number;
  };
