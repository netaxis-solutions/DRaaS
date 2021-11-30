import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import DistributorsStore from "storage/singletons/Distributors";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus } from "components/Icons";
import AddDistributor from "./components/AddDistributor";

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
  {
    Header: "Actions",
    accessor: "actions",
    disableSortBy: true,
    Cell: () => <TableActions edit del />,
  },
];

const Distributors: FC = () => {
  const { t } = useTranslation();
  const { getDistributorsData, distributors } = DistributorsStore;
  const [modalToOpen, setModalToOpen] = useState("");

  useEffect(() => {
    getDistributorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
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

  return (
    <>
      <Table
        title={t("Distributors")}
        columns={columns}
        data={distributors}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && (
        <AddDistributor handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(Distributors);
