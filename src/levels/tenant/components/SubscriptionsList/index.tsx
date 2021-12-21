import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useParams } from "react-router-dom";

import Subscriptions from "storage/singletons/Subscriptions";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";

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

  const { getSubscriptionsData, subscriptions } = Subscriptions;
  const { setSelectedRows } = TableSelectedRowsStore;

  const columns = useMemo(
    () => [
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
    [t, setSelectedRows],
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
        // setModalToOpen("add");
      },
    },
  ];

  return (
    <>
      <Table
        title={t("Subscriptions")}
        columns={columns}
        data={subscriptions}
        toolbarActions={toolbarActions}
        checkbox
      />
    </>
  );
};

export default observer(SubscriptionsList);
