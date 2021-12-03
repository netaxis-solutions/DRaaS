import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";

import DistributorsStore from "storage/singletons/Distributors";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { DistributorItemType } from "utils/types/distributors";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";

import AddDistributor from "./components/AddDistributor";
import DeleteDistributorModal from "./components/DeleteDistributorModal";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Billing ID",
    accessor: "billingId",
  },
  {
    Header: "Tenants",
    accessor: "nbOfTenants",
  },
  {
    Header: "Markup, %",
    accessor: "markup",
  },
];

const Distributors: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const { t } = useTranslation();
  const {
    getDistributorsData,
    distributors,
    deleteDistributors,
  } = DistributorsStore;
  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;

  useEffect(() => {
    getDistributorsData();
  }, [getDistributorsData]);

  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        Header: t("Actions"),
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row: { index } }: CellProps<DistributorItemType>) => (
          <TableActions
            edit
            del
            onDelete={() => {
              setModalToOpen("delete");
              setSelectedRows({ [index]: true });
            }}
          />
        ),
      },
    ],
    [setSelectedRows, t],
  );

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
      },
    },
  ];

  const handleCloseModal = () => {
    setModalToOpen("");
  };
  const callback = () => {
    getDistributorsData();
    handleCloseModal();
  };
  const handleDelete = () => {
    const selectedDistributorIds = distributors.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);
    deleteDistributors(selectedDistributorIds, callback);
  };

  return (
    <>
      <Table
        title={t("Distributors")}
        columns={columnsWithActions}
        data={distributors}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && (
        <AddDistributor handleCancel={handleCloseModal} />
      )}
      {modalToOpen === "delete" && (
        <DeleteDistributorModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          distributors={distributors}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(Distributors);
