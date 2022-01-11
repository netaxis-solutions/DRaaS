import React from "react";
import {
  Column,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps,
} from "react-table";

import {
  SubscriptionLicenseType,
  MsTeamsUsersType,
} from "utils/types/licenses";
import { EntitlementsListType } from "../entitlements";

export type TableActionsType = {
  edit?: boolean;
  del?: boolean;
  save?: boolean;
  cancel?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
};

export type TableData =
  | {
      readonly [key: string]: string | number | ((object: object) => string);
    }
  | MsTeamsUsersType
  | SubscriptionLicenseType
  | EntitlementsListType;

export type ToolbarActionType = {
  id: string;
  icon: React.FC;
  onClick: () => void;
  title: string;
};
export type TableProps = {
  title: string;
  columns: Column<TableData>[];
  data: TableData[];
  checkbox?: boolean;
  toolbarActions?: Array<ToolbarActionType>;
  setModalToOpen?: (s: string) => void;
  setDefaultValues?: any;
  handleDeleteItem?: (props: any) => void;
  handleEditItem?: (props: any) => void;
  isEditable?: boolean;
  isRemovable?: boolean;
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
  page: Row[];
  prepareRow: (row: Row<TableData>) => void;
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
};

export type TablePaginationType = PaginationDropdownType &
  PaginationNavigationType & {
    selectedRows: number;
    pageCount: number;
    pageNumber: number;
  };
