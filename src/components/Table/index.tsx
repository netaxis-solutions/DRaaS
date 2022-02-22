import { ChangeEvent, FC, useEffect } from "react";
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

import { TableData, TableProps } from "utils/types/tableConfig";

import { Checkbox } from "components/common/Form/FormCheckbox";
import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";
import Toolbar from "./components/Toolbar";
import Pagination from "./components/Pagination";
import TableActions from "components/Table/components/TableActions";
import { RadioButton } from "components/common/Form/FormRadioButton";
import { useStyles } from "./styles";

const Table: FC<TableProps> = ({
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
  isCheckboxAvailable,
  isGeneralCheckboxSelected,
  selectAllRowCondition,
  editDisabledCondition,
  deleteDisabledCondition,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    selectedRows,
    setSelectedRows,
    setRadioButtonValueInRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

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
      data,
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
                      TableSelectedRowsStore.setIsChecked(
                        isGeneralCheckboxSelected
                          ? isGeneralCheckboxSelected(page)
                          : TableSelectedRowsStore.selectedRowsLength ===
                              page.length,
                      );

                      const handleChange = () => {
                        page.forEach(row => {
                          selectAllRowCondition
                            ? selectAllRowCondition(
                                TableSelectedRowsStore.isChecked,
                                row,
                              ) &&
                              toggleRowSelected(
                                row.id,
                                !TableSelectedRowsStore.isChecked,
                              )
                            : toggleRowSelected(
                                row.id,
                                !TableSelectedRowsStore.isChecked,
                              );
                        });
                      };

                      return radioButton ? null : (
                        <Checkbox
                          checked={TableSelectedRowsStore.isChecked}
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
                          isAvailable={isCheckboxAvailable}
                          row={row}
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
                    Header: ({ page, toggleRowSelected }) => {
                      TableSelectedRowsStore.setIsChecked(
                        isGeneralCheckboxSelected
                          ? isGeneralCheckboxSelected(page)
                          : TableSelectedRowsStore.selectedRowsLength ===
                              page.length,
                      );

                      const handleChange = () => {
                        page.forEach(row => {
                          selectAllRowCondition
                            ? selectAllRowCondition(
                                TableSelectedRowsStore.isChecked,
                                row,
                              ) &&
                              toggleRowSelected(
                                row.id,
                                !TableSelectedRowsStore.isChecked,
                              )
                            : toggleRowSelected(
                                row.id,
                                !TableSelectedRowsStore.isChecked,
                              );
                        });
                      };

                      return radioButton ? null : (
                        <Checkbox
                          checked={TableSelectedRowsStore.isChecked}
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
                          isAvailable={isCheckboxAvailable}
                          row={row}
                          onChange={handleChange}
                        />
                      );
                    },
                  },
                  ...columns,
                  {
                    Header: () => (
                      <div className={classes.actionsHeader}>
                        {t("Actions")}
                      </div>
                    ),
                    accessor: "actions",
                    disableSortBy: true,

                    Cell: (props: any) => {
                      if (props.state.rowState[props.row.index]?.isEditing) {
                        return (
                          <TableActions
                            save
                            cancel
                            rowData={props.row}
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
                          rowData={props.row}
                          editDisabled={editDisabledCondition}
                          deleteDisabled={deleteDisabledCondition}
                          customActions={
                            (actionsDataFormatter &&
                              customActions &&
                              actionsDataFormatter(props.row, customActions)) ||
                            customActions
                          }
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
                    Header: () => (
                      <div className={classes.actionsHeader}>
                        {t("Actions")}
                      </div>
                    ),
                    accessor: "actions",
                    disableSortBy: true,
                    Cell: (props: any) => {
                      if (props.state.rowState[props.row.index]?.isEditing) {
                        return (
                          <TableActions
                            save
                            cancel
                            rowData={props.row}
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
                          rowData={props.row}
                          editDisabled={editDisabledCondition}
                          deleteDisabled={deleteDisabledCondition}
                          customActions={
                            (actionsDataFormatter &&
                              customActions &&
                              actionsDataFormatter(props.row, customActions)) ||
                            customActions
                          }
                          onDelete={() => {
                            setModalToOpen &&
                              setModalToOpen("delete", props.row.original);
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
      TableSelectedRowsStore.clearSelectedRows();
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

  useEffect(() => {
    return () => {
      TableSelectedRowsStore.clearStorage();
    };
  }, []);
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
        checkbox={checkbox}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
      />
    </>
  );
};

export default observer(Table);
