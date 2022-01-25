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
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddTenantSubscription from "./components/AddTenantSubscription";
import DeleteTenantSubscriptionsModal from "./components/DeleteTenantSubscriptions";

const getTranslatedColumns = (t: TFunction) => [
  {
    Header: t("Billing ID"),
    accessor: "billingId",
  },
];

const SubscriptionsList: FC = () => {
  const { t } = useTranslation();
  const { loggedInUserLevel, allAvailvableRouting } = RoutingConfig;
  const params = useParams<{ tenantID: string }>();
  const [modalToOpen, setModalToOpen] = useState("");

  const {
    subscriptions,
    getSubscriptionsData,
    deleteSubscriptions,
    isSubscriptionsCreatable,
    isSubscriptionsDeletable,
    cleanSubscriptionHistory,
    // isSubscriptionsEditable,
  } = Subscriptions;

  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;

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
    ],
    [t, allAvailvableRouting, params.tenantID],
  );

  useEffect(() => {
    getSubscriptionsData(params.tenantID);
    return function cleanup() {
      cleanSubscriptionHistory();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("subs", subscriptions);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isSubscriptionsDeletable) {
      actions.push({
        id: "delete",
        title: t("Delete"),
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isSubscriptionsCreatable) {
      actions.push({
        id: "add",
        title: t("Add"),
        icon: Plus,
        onClick: () => {
          setModalToOpen("add");
        },
      });
    }
    return actions;
  }, [isSubscriptionsCreatable, isSubscriptionsDeletable, t]);

  const avilableActions =
    loggedInUserLevel === "tenant" ? toolbarActions.slice(1) : toolbarActions;

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getSubscriptionsData(params.tenantID);
    handleCloseModal();
  };

  const handleDeleteItem = (props: any) => {
    setModalToOpen("delete");
    setSelectedRows({ [props.row.index]: true });
  };

  const handleDelete = () => {
    const selectedSubscriptionsIds = subscriptions.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(`${cur.id}`);
      return prev;
    }, [] as Array<string>);
    deleteSubscriptions(params.tenantID, selectedSubscriptionsIds, callback);
  };

  return (
    <>
      <Table
        title={t("Subscriptions")}
        columns={columns}
        data={subscriptions}
        toolbarActions={avilableActions}
        checkbox={isSubscriptionsDeletable}
        // isEditable={isSubscriptionsEditable}
        isRemovable={loggedInUserLevel !== "tenant" && isSubscriptionsDeletable}
        handleDeleteItem={handleDeleteItem}
      />
      {modalToOpen === "add" && (
        <AddTenantSubscription handleCancel={handleCloseModal} />
      )}

      {modalToOpen === "delete" && (
        <DeleteTenantSubscriptionsModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          subscriptions={subscriptions}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(SubscriptionsList);
