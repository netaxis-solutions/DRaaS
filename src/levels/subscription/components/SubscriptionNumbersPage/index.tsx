import { useEffect } from "react";
import { useHistory, useParams, Switch, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";

import RoutingConfig from "storage/singletons/RoutingConfig";

import createLink from "services/createLink";
import { t } from "services/Translation";
import { Tab } from "utils/types/tabs";

import Tabs from "components/Tabs";
import Loader from "components/Loader/Loader";
import MyNumbers from "./TabsContent/AssignedNumbers/MyNumbers";
import ReservedNumbers from "./TabsContent/ReservedNumbers";

const tabs: Tab[] = [
  {
    name: t("My numbers"),
    id: "myNumbers",
    component: () => <MyNumbers />,
  },
  {
    name: t("Deleted numbers"),
    id: "deletedNumbers",
    component: () => <div>Deleted numbers</div>,
  },
  {
    name: t("Reserved numbers"),
    id: "reservedNumbers",
    component: () => <ReservedNumbers />,
  },
  {
    name: t("Porting"),
    id: "porting",
    component: () => <div>Porting</div>,
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
    if (params.tabID === ":tabID" && tabs && tabs.length) {
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
