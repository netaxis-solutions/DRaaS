import { FC } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  Column,
  useRowSelect,
  CellProps
} from "react-table";
import {
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox
} from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import clsx from "clsx";

import { TableData } from "utils/types/tableConfig/react-table-config";

import { useStyles } from "./styles";

interface TableProps {
  columns: Column<TableData>[];
  data: TableData[];
  checkbox: boolean;
}

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
    <div className={classes.wrapper}>
      <MaUTable {...getTableProps()} className={classes.root}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={clsx({
                    [classes.actionRow]: column.id === "actions"
                  })}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "<" : ">") : ""}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} className={classes.hover}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </div>
  );
};

export default Table;
