import {
  Column,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps
} from "react-table";

export type TableActionsType = {
  edit?: boolean;
  del?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export type TableData = {
  readonly [key: string]: string | number;
};

export type TableProps = {
  columns: Column<TableData>[];
  data: TableData[];
  checkbox: boolean;
};

export type TableBodyType = {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<TableData> | undefined
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
