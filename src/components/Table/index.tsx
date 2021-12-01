import { ChangeEvent, FC, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  CellProps,
  useFilters,
  useGlobalFilter,
} from "react-table";
import MaUTable from "@material-ui/core/Table";
import { observer } from "mobx-react-lite";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { TableProps } from "utils/types/tableConfig";
import { Checkbox } from "components/common/Form/FormCheckbox";
import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";
import Toolbar from "./components/Toolbar";
import Pagination from "./components/Pagination";
import { useStyles } from "./styles";

const Table: FC<TableProps> = ({
  title,
  columns,
  data,
  checkbox = false,
  toolbarActions,
}) => {
  const classes = useStyles();

  const {
    selectedRows,
    setSelectedRows,
    clearSelectedRows,
  } = TableSelectedRowsStore;

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
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
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
              Header: ({ getToggleAllPageRowsSelectedProps }) => {
                const {
                  checked = false,
                  onChange,
                } = getToggleAllPageRowsSelectedProps();
                const handleChange = (e: ChangeEvent<Element>, _: boolean) => {
                  onChange && onChange(e);
                };

                return <Checkbox checked={checked} onChange={handleChange} />;
              },
              Cell: ({ row }: CellProps<TableProps>) => {
                const {
                  checked = false,
                  onChange,
                } = row.getToggleRowSelectedProps();
                const handleChange = (e: ChangeEvent<Element>, _: boolean) => {
                  onChange && onChange(e);
                };

                return <Checkbox checked={checked} onChange={handleChange} />;
              },
            },
            ...columns,
          ])
        : hooks.visibleColumns.push(columns => [...columns]),
  );

  useEffect(() => {
    setSelectedRows(state.selectedRowIds);
    return () => {
      clearSelectedRows();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedRowIds]);

  useEffect(() => {
    return () => {
      if (Object.values(state.selectedRowIds).length) {
        state.selectedRowIds = {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows]);

  const deleteAvailable = Object.values(state.selectedRowIds).some(el => el);

  return (
    <>
      <Toolbar
        title={title}
        toolbarActions={
          deleteAvailable
            ? toolbarActions
            : toolbarActions.filter(el => el.id !== "delete")
        }
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
    </>
  );
};

export default observer(Table);
