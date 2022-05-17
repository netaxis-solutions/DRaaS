import { lazy, Suspense, useEffect, useMemo } from "react";
import { useHistory, useParams, Switch, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { TFunction } from "i18next";

import RoutingConfig from "storage/singletons/RoutingConfig";

import createLink from "services/createLink";
import { t } from "services/Translation";
import { Tab } from "utils/types/tabs";

import Tabs from "components/Tabs";
import TableSkeleton from "components/Table/Skeleton";

const Locations = lazy(() => import("./TabsContent/Locations"));
const Profile = lazy(() => import("./TabsContent/Profile"));

const getTranslatedColumns = (t: TFunction) => [
  {
    Header: t("Country"),
    accessor: "Country",
  },
  {
    Header: t("City"),
    accessor: "City",
  },
  {
    Header: t("Street"),
    accessor: "Street",
  },
  {
    Header: t("Number"),
    accessor: "Number",
  },
  {
    Header: t("Postbox"),
    accessor: "Postbox",
  },
  {
    Header: t("Postal code"),
    accessor: "Postal code",
  },
  {
    Header: t("Region"),
    accessor: "Region",
  },
];

const tabs: Tab[] = [
  {
    name: t("Profile"),
    id: "profile",
    component: () => <Profile />,
  },
  {
    name: t("Locations"),
    id: "locations",
    component: () => <Locations />,
  },
];

const SubscriptionTabs = () => {
  const history = useHistory();
  const params = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID?: string;
  }>();

  const { t } = useTranslation();
  const { allAvailvableRouting } = RoutingConfig;

  const skeletonColumns = useMemo(() => getTranslatedColumns(t), [t]);

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionProfile}/:tabID?`,
      params: {
        ...params,
        tabID,
      },
    });
    history.push(url);
  };

  useEffect(() => {
    if (params.tabID === ":tabID" && tabs && tabs.length) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionProfile}/:tabID?`,
        params: {
          ...params,
          tabID: tabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, params]);

  return (
    <>
      <Tabs
        tabs={tabs}
        url={allAvailvableRouting.subscriptionProfile}
        onTabChange={handleTabClick}
        active={params.tabID}
      />

      <Suspense
        fallback={
          <TableSkeleton title={t("Locations")} columns={skeletonColumns} />
        }
      >
        <Switch>
          {tabs.map(({ id, component: Component }: any) => (
            <Route
              exact
              key={id}
              path={`${allAvailvableRouting.subscriptionProfile}/${id}`}
            >
              <Component />
            </Route>
          ))}
          <Route path="*" />
        </Switch>
      </Suspense>
    </>
  );
};

export default observer(SubscriptionTabs);
