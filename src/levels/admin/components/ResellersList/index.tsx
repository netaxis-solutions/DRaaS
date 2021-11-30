import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

import Resellers from "storage/singletons/Resellers";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";
import AddReseller from "./components/AddReseller";
import DeleteResellerModal from "./components/AddReseller/DeleteResellerModal";

const getTranslatedColumns = (t: TFunction) => [
  {
    Header: t("Name"),
    accessor: "name",
  },
  {
    Header: t("Billing ID"),
    accessor: "billingId",
  },
  {
    Header: t("Owner"),
    accessor: "owner.name",
  },
  {
    Header: t("Tenants"),
    accessor: "nbOfTenants",
  },
];
const ResellersList: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");

  const { getResellersData, resellers, deleteResellers } = Resellers;
  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;

  const columns = useMemo(
    () => [
      ...getTranslatedColumns(t),

      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
        Cell: (props: any) => {
          return (
            <TableActions
              edit
              del
              onDelete={() => {
                setModalToOpen("delete");
                setSelectedRows({ [props.row.index]: true });
              }}
            />
          );
        },
      },
    ],
    [t, setSelectedRows],
  );

  useEffect(() => {
    getResellersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    getResellersData();
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedResellerIds = resellers.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);

    deleteResellers(selectedResellerIds, callback);
  };

  return (
    <>
      <Table
        title={t("Resellers")}
        columns={columns}
        data={resellers}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && <AddReseller handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" && (
        <DeleteResellerModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          resellers={resellers}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(ResellersList);
