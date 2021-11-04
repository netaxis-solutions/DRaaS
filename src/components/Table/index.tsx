import { FC } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  CellProps
} from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import MaUTable from "@material-ui/core/Table";

import { TableProps } from "utils/types/tableConfig";
import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";

import { useStyles } from "./styles";

const Table: FC<TableProps> = ({ columns, data, checkbox }) => {
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) =>
      checkbox
        ? hooks.visibleColumns.push((columns) => [
            {
              id: "selection",
              Header: ({ getToggleAllPageRowsSelectedProps }) => (
                <Checkbox {...getToggleAllPageRowsSelectedProps()} />
              ),
              Cell: ({ row }: CellProps<TableProps>) => (
                <Checkbox {...row.getToggleRowSelectedProps()} />
              )
            },
            ...columns
          ])
        : hooks.visibleColumns.push((columns) => [...columns])
  );

  return (
    <div className={classes.tableWrapper}>
      <MaUTable {...getTableProps()} className={classes.tableRoot}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          page={page}
        />
      </MaUTable>
    </div>
  );
};

export default Table;
