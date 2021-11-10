import { FC } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  CellProps,
  useFilters,
  useGlobalFilter
} from "react-table";
import Checkbox from "@material-ui/core/Checkbox";
import MaUTable from "@material-ui/core/Table";

import { TableProps } from "utils/types/tableConfig";
import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";
import Toolbar from "./components/Toolbar";
import Pagination from "./components/Pagination";
import { useStyles } from "./styles";

const Table: FC<TableProps> = ({
  title,
  columns,
  data,
  checkbox,
  toolbarActions
}) => {
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    state,
    setPageSize,
    pageCount,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks =>
      checkbox
        ? hooks.visibleColumns.push(columns => [
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
        : hooks.visibleColumns.push(columns => [...columns])
  );

  return (
    <div className={classes.tableWrapper}>
      <Toolbar
        title={title}
        toolbarActions={toolbarActions}
        setGlobalFilter={setGlobalFilter}
        value={state.globalFilter}
      />
      <MaUTable {...getTableProps()} className={classes.tableRoot}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          page={page}
        />
      </MaUTable>
      <Pagination
        selectedRows={Object.keys(state.selectedRowIds).length}
        pageSize={state.pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
        pageNumber={state.pageIndex + 1}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </div>
  );
};

export default Table;
