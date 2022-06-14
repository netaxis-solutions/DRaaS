import { lazy, useEffect } from "react";
import { useHistory, useParams, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import RoutingConfig from "storage/singletons/RoutingConfig";

import createLink from "services/createLink";
import { t } from "services/Translation";
import { Tab } from "utils/types/tabs";

import Tabs from "components/Tabs";
import Loader from "components/Loader/Loader";

const MyNumbers = lazy(() => import("./TabsContent/AssignedNumbers/MyNumbers"));
const ReleasedNumbers = lazy(() => import("./TabsContent/ReleasedNumbers"));
const ReservedNumbers = lazy(() => import("./TabsContent/ReservedNumbers"));
const PortingRequests = lazy(() => import("./TabsContent/PortingRequests"));

const tabs: Tab[] = [
  {
    name: t("My numbers"),
    id: "myNumbers",
    component: () => <MyNumbers />,
  },
  {
    name: t("Released numbers"),
    id: "releasedNumbers",
    component: () => <ReleasedNumbers />,
  },
  {
    name: t("Reserved numbers"),
    id: "reservedNumbers",
    component: () => <ReservedNumbers />,
  },
  {
    name: t("Porting"),
    id: "porting",
    component: () => <PortingRequests />,
  },
];

const SubscriptionNumbersPage = () => {
  const history = useHistory();
  const params = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID?: string;
  }>();

  const { allAvailvableRouting } = RoutingConfig;

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionNumbers}/:tabID?`,
      params: {
        ...params,
        tabID,
      },
    });
    history.push(url);
  };

  useEffect(() => {
    if (!tabs.some(({ id }) => id === params.tabID)) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionNumbers}/:tabID?`,
        params: {
          ...params,
          tabID: tabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, params]);

  if (params.tabID === ":tabID") return <Loader />;
  return (
    <>
      <Tabs
        tabs={tabs}
        url={allAvailvableRouting.subscriptionNumbers}
        onTabChange={handleTabClick}
        active={params.tabID}
      />
      <Switch>
        {tabs.map(({ id, component: Component }: any) => (
          <Route
            exact
            key={id}
            path={`${allAvailvableRouting.subscriptionNumbers}/${id}`}
          >
            <Component />
          </Route>
        ))}
        <Route path="*" />
      </Switch>
    </>
  );
};

export default observer(SubscriptionNumbersPage);
