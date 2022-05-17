import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { CellProps, Row, TableProps } from "react-table";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NumbersStore from "storage/singletons/Numbers";
import RoutingConfig from "storage/singletons/RoutingConfig";
import EntitlementsStore from "storage/singletons/Entitlements";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { getIsLoading } from "utils/functions/getIsLoading";
import { TableData } from "utils/types/tableConfig";

import SelectFromInventory from "./components/MultistepModal";
import { InfoIcon, Plus, Trash } from "components/Icons";
import Tooltip from "components/Tooltip";
import CardWithButton from "components/CardForEmptyTable";
import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import DeleteNumberModal from "./components/DeleteModal";

import styles from "./styles";

const MyNumbers = () => {
  const { t } = useTranslation();

  const [modalToOpen, setModalToOpen] = useState("");

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const classes = styles();

  const { history } = RoutingConfig;

  const {
    numbers,
    getNumbersData,
    clearNumbers,
    deassignNumbers,
  } = NumbersStore;
  const {
    availableEntitlementsNumber,
    getEntitlements,
    setAvailableEntitlementsNumber,
  } = EntitlementsStore;

  const {
    selectedRows,
    selectedRowsLength,
    selectedRowsValues,
    setSelectedRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const { byFetchType } = PendingQueries;

  const {
    tablePageCounter,
    tablePageSize,
    search,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getNumbersData(tenantID, subscriptionID);
    return () => {
      clearNumbers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    clearNumbers,
    getNumbersData,
    subscriptionID,
    tenantID,
    search,
    tablePageSize,
    tablePageCounter,
  ]);

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID, () => {
      setAvailableEntitlementsNumber();
    });
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(
    () =>
      availableEntitlementsNumber
        ? [
            {
              id: "delete",
              title: t("Delete"),
              icon: Trash,
              onClick: () => {
                setModalToOpen("delete");
              },
            },
            {
              id: "add",
              title: t("Add"),
              icon: Plus,
              onClick: () => {
                setModalToOpen("add");
                clearPaginationData();
              },
            },
          ]
        : [
            {
              id: "delete",
              title: t("Delete"),
              icon: Trash,
              onClick: () => {
                setModalToOpen("delete");
              },
            },
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableEntitlementsNumber],
  );

  const columns = useMemo(
    () => [
      {
        Header: t("Country code"),
        accessor: "countryCode",
      },
      {
        Header: t("Number"),
        accessor: "nsn",
      },
      {
        Header: t("Number type"),
        accessor: "numberType",
      },
      {
        Header: t("Origin"),
        accessor: "source",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value === "number_inventory" ? "native" : "ported";
        },
      },
      {
        Header: t("Status"),
        accessor: "assigned",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value ? "connected" : "free";
        },
      },
    ],
    [t],
  );

  const handleModalClose = () => {
    getNumbersData(tenantID, subscriptionID);
    setModalToOpen("");
    clearPaginationData();
  };

  const handleDeleteItem = (props: any) => {
    setSelectedRows({ [props.row.index]: true });
    setSelectedRowsValues([props.row]);
    setModalToOpen("delete");
  };

  const successCallback = () => {
    getNumbersData(tenantID, subscriptionID);
    handleModalClose();
    getEntitlements(tenantID, subscriptionID, () => {
      setAvailableEntitlementsNumber();
    });
  };

  const handleDelete = () => {
    const numbersToDeassign = selectedRowsValues.reduce(
      (num: Array<{ countryCode: string; nsn: number }>, row) => [
        ...num,
        { countryCode: row.values.countryCode, nsn: Number(row.values.nsn) },
      ],
      [],
    );
    deassignNumbers(
      tenantID,
      subscriptionID,
      numbersToDeassign,
      successCallback,
    );
    successCallback();
  };

  const isAvailable = (row: Row<TableData>) => !row.original.assigned;

  const isRowSelectable = (_: boolean, row: Row<TableData>) => isAvailable(row);

  const isGeneralCheckboxSelected = (page: Row<TableData>[]) =>
    TableSelectedRowsStore.selectedRowsLength ===
      page.reduce((sum, curr) => (curr.original.assigned ? sum : sum + 1), 0) &&
    TableSelectedRowsStore.selectedRowsLength !== 0;

  const disabledNumberTooltip = {
    text: t(
      "You cannot delete number as long as you still have this number connected",
    ),
    filterConditions: (row: Row<TableData>) => !isAvailable(row),
  };

  const deleteDisabledCondition = (row: Row<TableData>) => !isAvailable(row);

  const isLoading = getIsLoading("@getNumbersData", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("My numbers")}
          columns={columns}
          checkbox
          actions={[true]}
        />
      ) : numbers.length ? (
        <>
          <Table
            title={t("My numbers")}
            columns={columns}
            data={numbers}
            toolbarActions={toolbarActions}
            handleDeleteItem={handleDeleteItem}
            deleteDisabledCondition={deleteDisabledCondition}
            tooltipTrashButton={disabledNumberTooltip}
            isCheckboxAvailable={isAvailable}
            isRowSelectable={isRowSelectable}
            isGeneralCheckboxSelected={isGeneralCheckboxSelected}
            checkbox
            isRemovable
          />
        </>
      ) : null}

      {numbers.length === 0 && !isLoading && (
        <>
          <div className={classes.noNumberText}>
            {t("You have no phone numbers added yet")}
          </div>
          <div className={classes.cardsWrapper}>
            <CardWithButton
              content={t("You can add numbers from inventory")}
              customEvent={() => setModalToOpen("add")}
              buttonName={t("Add from inventory")}
              icon={Plus}
              disabled={!availableEntitlementsNumber}
              tooltip={
                <>
                  {!availableEntitlementsNumber && (
                    <Tooltip
                      placement="right"
                      title={t(
                        "Sorry, you cannot add any numbers because you don't have any entitlements left",
                      )}
                    >
                      <InfoIcon className={classes.tooltipIcon} />
                    </Tooltip>
                  )}
                </>
              }
            />
            <CardWithButton
              content={t("You can port your numbers by adding porting request")}
              customEvent={() => history.push("porting")}
              buttonName={t("Add porting request")}
              icon={Plus}
            />
            <CardWithButton
              content={
                <div>
                  {t("You can add numbers from")}{" "}
                  <Link to={"reservedNumbers"} className={classes.link}>
                    {t("Reserved numbers")}
                  </Link>{" "}
                  {t("tab")}.
                </div>
              }
              withOutButton
            />
          </div>
        </>
      )}
      {modalToOpen === "add" && (
        <SelectFromInventory handleCancel={handleModalClose} />
      )}
      {modalToOpen === "delete" && (
        <DeleteNumberModal
          handleCloseModal={handleModalClose}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          numbers={numbers}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(MyNumbers);
