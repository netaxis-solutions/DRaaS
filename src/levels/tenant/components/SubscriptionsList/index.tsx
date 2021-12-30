import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { CellProps } from "react-table";
import { useParams, Link } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import Subscriptions from "storage/singletons/Subscriptions";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import createLink from "services/createLink";
import { SubscriptionItemType } from "utils/types/subscriptions";
import TableActions from "components/Table/components/TableActions";
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddTenantSubscription from "./components/AddTenantSubscription";

const getTranslatedColumns = (t: TFunction) => [
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
  const { allAvailvableRouting } = RoutingConfig;

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
        Cell: ({ row: { original } }: CellProps<SubscriptionItemType>) => {
          return (
            <Link
              to={createLink({
                url: allAvailvableRouting.subscriptionLicenses,
                params: {
                  tenantID: params.tenantID,
                  subscriptionID: original.id,
                },
              })}
            >
              {original.name}
            </Link>
          );
        },
      },
      ...getTranslatedColumns(t),
      {
        Header: t("Actions"),
        accessor: "actions",
        disableSortBy: true,
        Cell: (props: any) => {
          return (
            <TableActions
              edit
              del
              onDelete={() => {
                // setModalToOpen("delete");
                setSelectedRows({ [props.row.index]: true });
              }}
            />
          );
        },
      },
    ],
    [t, setSelectedRows, allAvailvableRouting, params.tenantID],
  );

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
