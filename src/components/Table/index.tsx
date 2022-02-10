//@ts-nocheck
import { ChangeEvent, FC, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  CellProps,
  useFilters,
  useGlobalFilter,
  useRowState,
} from "react-table";
import MaUTable from "@material-ui/core/Table";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { RawTableData, TableData, TableProps } from "utils/types/tableConfig";
import { Checkbox } from "components/common/Form/FormCheckbox";
import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";
import Toolbar from "./components/Toolbar";
import Pagination from "./components/Pagination";
import TableActions from "components/Table/components/TableActions";
import { RadioButton } from "components/common/Form/FormRadioButton";
import { useStyles } from "./styles";

const Table: FC<
  TableProps & {
    customActions?: Array<any>;
    actionsDataFormatter?: (row: any, data: any) => any;
    disableRowCondition?: (rowData: any) => boolean;
  }
> = ({
  title,
  columns,
  data,
  checkbox = false,
  radioButton = false,
  toolbarActions,
  setModalToOpen,
  setDefaultValues,
  handleDeleteItem,
  handleEditItem,
  isEditable = false,
  isRemovable = false,
  customActions,
  actionsDataFormatter,
  disableRowCondition,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    selectedRows,
    setSelectedRows,
    clearSelectedRows,
    setRadioButtonValueInRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const formattedData: TableData[] = useMemo(
    () =>
      data.reduce(
        (result: Array<TableData>, rowData: RawTableData) => [
          ...result,
          {
            ...rowData,
            isRowDisabled:
              (disableRowCondition && disableRowCondition(rowData)) || false,
          },
        ],
        [],
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const {
    rows,
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
    setRowState,
  } = useTable(
    {
      columns,
      data: formattedData,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useRowState,
    hooks =>
      checkbox || radioButton
        ? hooks.visibleColumns.push(columns =>
            !isEditable && !isRemovable && !customActions
              ? [
                  {
                    id: "selection",
                    Header: ({ toggleRowSelected, page }) => {
                      let selectableRowsInCurrentPage = 0;
                      let selectedRowsInCurrentPage = 0;

                      page.forEach(row => {
                        row.isSelected && selectedRowsInCurrentPage++;
                        !row.original.isRowDisabled &&
                          selectableRowsInCurrentPage++;
                      });

                      let isSelected =
                        !!selectableRowsInCurrentPage &&
                        selectableRowsInCurrentPage ===
                          selectedRowsInCurrentPage;

                      const handleChange = () => {
                        page.forEach(row => {
                          !row.original.isRowDisabled &&
                            toggleRowSelected(row.id, !isSelected);
                        });
                      };

                      return radioButton ? null : (
                        <Checkbox
                          checked={isSelected}
                          disabled={!selectableRowsInCurrentPage}
                          onChange={handleChange}
                        />
                      );
                    },
                    Cell: ({
                      toggleRowSelected,
                      row,
                    }: CellProps<TableData>) => {
                      const {
                        checked = false,
                        onChange,
                      } = row.getToggleRowSelectedProps();

                      const handleChange = () => {
                        setSelectedRows({ [row.index]: true });
                        !row.original.isRowDisabled &&
                          toggleRowSelected(String(row.index));
                      };

                      const handleChangeRadio = (
                        e: ChangeEvent<Element>,
                        _: boolean,
                      ) => {
                        setSelectedRows({ [row.index]: true });
                        setRadioButtonValueInRows(row.original);
                        onChange && onChange(e);
                      };

                      return radioButton ? (
                        <RadioButton
                          checked={checked}
                          onChange={handleChangeRadio}
                        />
                      ) : (
                        <Checkbox
                          checked={row.isSelected}
                          disabled={row.original.isRowDisabled}
                          onChange={handleChange}
                        />
                      );
                    },
                  },
                  ...columns,
                ]
              : [
                  {
                    id: "selection",
                    Header: ({ toggleRowSelected, page }) => {
                      let selectableRowsInCurrentPage = 0;
                      let selectedRowsInCurrentPage = 0;

                      page.forEach(row => {
                        row.isSelected && selectedRowsInCurrentPage++;
                        !row.original.isRowDisabled &&
                          selectableRowsInCurrentPage++;
                      });

                      let isSelected =
                        !!selectableRowsInCurrentPage &&
                        selectableRowsInCurrentPage ===
                          selectedRowsInCurrentPage;

                      const handleChange = () => {
                        page.forEach(row => {
                          !row.original.isRowDisabled &&
                            toggleRowSelected(row.id, !isSelected);
                        });
                      };

                      return radioButton ? null : (
                        <Checkbox
                          checked={isSelected}
                          disabled={!selectableRowsInCurrentPage}
                          onChange={handleChange}
                        />
                      );
                    },
                    Cell: ({
                      toggleRowSelected,
                      row,
                    }: CellProps<TableData>) => {
                      const {
                        checked = false,
                        onChange,
                      } = row.getToggleRowSelectedProps();

                      const handleChange = () => {
                        !row.original.isRowDisabled &&
                          toggleRowSelected(String(row.index));
                      };

                      const handleChangeRadio = (
                        e: ChangeEvent<Element>,
                        _: boolean,
                      ) => {
                        setSelectedRows({ [row.index]: true });
                        onChange && onChange(e);
                      };

                      return radioButton ? (
                        <RadioButton
                          checked={checked}
                          onChange={handleChangeRadio}
                        />
                      ) : (
                        <Checkbox
                          checked={row.isSelected}
                          disabled={row.original.isRowDisabled}
                          onChange={handleChange}
                        />
                      );
                    },
                  },
                  ...columns,
                  {
                    Header: () => t("Actions"),
                    accessor: "actions",
                    disableSortBy: true,
                    Cell: (props: any) => {
                      if (props.state.rowState[props.row.index]?.isEditing) {
                        return (
                          <TableActions
                            save
                            cancel
                            onCancel={() => {
                              setRowState([props.row.index], {
                                isEditing: false,
                              });
                            }}
                          />
                        );
                      }

                      return (
                        <TableActions
                          edit={isEditable}
                          del={isRemovable}
                          customActions={
                            (actionsDataFormatter &&
                              actionsDataFormatter(props.row, customActions)) ||
                            customActions
                          }
                          rowData={props.row}
                          onDelete={() =>
                            handleDeleteItem && handleDeleteItem(props)
                          }
                          onEdit={() => {
                            handleEditItem && handleEditItem(props);
                            setRowState([props.row.index], {
                              isEditing: true,
                            });
                          }}
                        />
                      );
                    },
                  },
                ],
          )
        : hooks.visibleColumns.push(columns =>
            !isEditable && !isRemovable && !customActions
              ? [...columns]
              : [
                  ...columns,
                  {
                    Header: () => t("Actions"),
                    accessor: "actions",
                    disableSortBy: true,
                    Cell: (props: any) => {
                      if (props.state.rowState[props.row.index]?.isEditing) {
                        return (
                          <TableActions
                            save
                            cancel
                            onCancel={() => {
                              setRowState([props.row.index], {
                                isEditing: false,
                              });
                            }}
                          />
                        );
                      }
                      return (
                        <TableActions
                          edit={isEditable}
                          del={isRemovable}
                          customActions={
                            (actionsDataFormatter &&
                              actionsDataFormatter(props.row, customActions)) ||
                            customActions
                          }
                          rowData={props.row}
                          onDelete={() => {
                            setModalToOpen && setModalToOpen("delete");
                            setSelectedRows({ [props.row.index]: true });
                          }}
                          onEdit={() => {
                            setDefaultValues &&
                              setDefaultValues(props.row.original);
                            setRowState([props.row.index], {
                              isEditing: true,
                            });
                          }}
                        />
                      );
                    },
                  },
                ],
          ),
  );
  useEffect(() => {
    setSelectedRows(state.selectedRowIds);
    setSelectedRowsValues(rows.filter(row => row.id in state.selectedRowIds));
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
          toolbarActions
            ? deleteAvailable
              ? toolbarActions
              : toolbarActions.filter(el => el.id !== "delete")
            : []
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
          radioButton={radioButton}
        />
      </MaUTable>
      <Pagination
        selectedRows={Object.keys(state.selectedRowIds).length}
        isRadioButton={radioButton}
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
