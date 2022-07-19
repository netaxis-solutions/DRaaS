import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";
import { useParams, Link } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import Subscriptions from "storage/singletons/Subscriptions";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";
import Login from "storage/singletons/Login";

import createLink from "services/createLink";
import { SubscriptionItemType } from "utils/types/subscriptions";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import { Plus } from "components/Icons";
import AddTenantSubscription from "./components/AddTenantSubscription";
import TableSkeleton from "components/Table/Skeleton";
import CardWithButton from "components/CardForEmptyTable";

import useStyles from "./styles";

const SubscriptionsList: FC = () => {
  const { t } = useTranslation();
  const { allAvailvableRouting } = RoutingConfig;
  const params = useParams<{ tenantID: string }>();
  const [modalToOpen, setModalToOpen] = useState("");
  const { getExactLevelReference } = Login;
  const tenantId = params.tenantID || getExactLevelReference("tenant");

  const classes = useStyles();

  const {
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const {
    subscriptions,
    isSubscriptionsCreatable,
    cleanSubscriptionHistory,
    getSubscriptionsData,
    getMoreSubscriptions,
    // isSubscriptionsEditable,
  } = Subscriptions;

  const { byFetchType } = PendingQueries;

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
                  tenantID: tenantId,
                  subscriptionID: original.id,
                },
              })}
              className={classes.link}
            >
              {original.name}
            </Link>
          );
        },
      },
      {
        Header: t("Billing ID"),
        accessor: "billingId",
        Cell: ({ value }) => <div className={classes.billingId}>{value}</div>,
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, allAvailvableRouting, tenantId],
  );

  useEffect(() => {
    getSubscriptionsData(tenantId);
    return () => cleanSubscriptionHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(() => {
    const actions = [];
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
  }, [isSubscriptionsCreatable, t]);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const isLoading = getIsLoading("@getSubscriptionsData", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Subscriptions")}
          columns={columns}
          //NOTE: uncoment this when isSubscriptionsEditable would be needed
          //actions={[isSubscriptionsEditable, isSubscriptionsDeletable]}
        />
      ) : subscriptions.length > 0 ? (
        <Table
          title={t("Subscriptions")}
          columns={columns}
          data={subscriptions}
          toolbarActions={toolbarActions}
          pageWithSidebarLayout
          infiniteScroll
          cardBasedLayout
          handleLoadNext={(token, setNewToken) => {
            getMoreSubscriptions(tenantId, token, setNewToken);
          }}
          // isEditable={isSubscriptionsEditable}
        />
      ) : (
        <div className={classes.emptyTableWrapper}>
          <CardWithButton
            content={t("You have no subscriptions added yet")}
            customEvent={() => setModalToOpen("add")}
            buttonName={t("Add new subscription")}
            icon={Plus}
          />
        </div>
      )}
      {modalToOpen === "add" && (
        <AddTenantSubscription handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(SubscriptionsList);
