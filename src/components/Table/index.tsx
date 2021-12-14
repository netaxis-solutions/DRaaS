import {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
type EditableCell = {
  value: string;
  row: { index: number; [key: string]: any };
  cell: { column: { id: number } };
  updateMyData: (index: number, id: number, value: string) => void;
  [key: string]: any;
};

const EditableCell: React.FC<EditableCell> = ({
  value: initialValue,
  row: { index },
  cell: {
    column: { id },
  },
  updateMyData,
  ...rest
  // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  console.log(rest);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateMyData(index, id, e.target.value);
  };

  // We'll only update the external data when the input is blurred

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} />;
};
const defaultColumn = {
  Cell: EditableCell,
};

const Table: FC<TableProps> = ({
  title,
  columns,
  data,
  checkbox = false,
  toolbarActions,
}) => {
  const classes = useStyles();
  const ref: MutableRefObject<any> = useRef(data);

  const {
    selectedRows,
    setSelectedRows,
    clearSelectedRows,
    setEditableRow,
  } = TableSelectedRowsStore;

  useEffect(() => {
    ref.current = data;
  }, [data]);

  const updateMyData = (index: number, id: number, value: string) => {
    ref.current.forEach((_: object, curIndex: number) => {
      curIndex === index && (ref.current[curIndex][id] = value);
    });
  };

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
      defaultColumn,
      updateMyData,
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
      <button
        onClick={() => {
          console.log(ref.current);
        }}
      >
        CHECK
      </button>
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
