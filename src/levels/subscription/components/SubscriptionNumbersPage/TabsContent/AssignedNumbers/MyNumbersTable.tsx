import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, TableProps } from "react-table";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import NumbersStore from "storage/singletons/Numbers";
import EntitlementsStore from "storage/singletons/Entitlements";
import TablePagination from "storage/singletons/TablePagination";

import { PhoneNumberType } from "utils/types/numbers";

import { Plus, Trash } from "components/Icons";
import Table from "components/Table";
import SelectFromInventory from "./components/MultistepModal";
import DeleteNumberModal from "./components/DeleteModal";

const NumbersList: FC<{
  numbers: PhoneNumberType[];
}> = ({ numbers }) => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { clearPaginationData } = TablePagination;

  const {
    selectedRows,
    selectedRowsLength,
    selectedRowsValues,
    setSelectedRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const { getNumbersData, deassignNumbers } = NumbersStore;
  const {
    availableEntitlementsNumber,
    getEntitlements,
    setAvailableEntitlementsNumber,
  } = EntitlementsStore;

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID, () =>
      setAvailableEntitlementsNumber(),
    );

    return () => {
      getEntitlements(tenantID, subscriptionID, () =>
        setAvailableEntitlementsNumber(),
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbers]);

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
  };

  const handleDeleteItem = (props: any) => {
    setSelectedRows({ [props.row.index]: true });
    setSelectedRowsValues([props.row]);
    setModalToOpen("delete");
  };

  const successCallback = () => {
    getNumbersData(tenantID, subscriptionID);
    handleModalClose();
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

  return (
    <>
      <Table
        title={t("My numbers")}
        columns={columns}
        data={numbers}
        toolbarActions={toolbarActions}
        handleDeleteItem={handleDeleteItem}
        checkbox
        isRemovable
      />
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

export default observer(NumbersList);
