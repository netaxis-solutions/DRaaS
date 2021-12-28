import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useParams } from "react-router-dom";

import Subscriptions from "storage/singletons/Subscriptions";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddTenantSubscription from "./components/AddTenantSubscription";

const getTranslatedColumns = (t: TFunction) => [
  {
    Header: t("Name"),
    accessor: "name",
  },
  {
    Header: t("Billing ID"),
    accessor: "billingId",
  },
];

const SubscriptionsList: FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ tenantID: string }>();
  const [modalToOpen, setModalToOpen] = useState("");

  const { getSubscriptionsData, subscriptions } = Subscriptions;
  const { setSelectedRows } = TableSelectedRowsStore;

  const columns = useMemo(() => [...getTranslatedColumns(t)], [
    t,
    setSelectedRows,
  ]);

  useEffect(() => {
    getSubscriptionsData(params.tenantID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        // setModalToOpen("delete");
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

  return (
    <>
      <Table
        title={t("Subscriptions")}
        columns={columns}
        data={subscriptions}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && (
        <AddTenantSubscription handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(SubscriptionsList);
