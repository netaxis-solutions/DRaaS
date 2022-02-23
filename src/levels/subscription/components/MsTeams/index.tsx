import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import createLink from "services/createLink";

import { Tab } from "utils/types/tabs";
import { t } from "services/Translation";

import Tabs from "components/Tabs";
import Loader from "components/Loader/Loader";
import O365Tenant from "./components/O365Tanant";
import O365Admin from "./components/O365Admin";
import MsTeamsUsers from "./components/MsTeamsUsers";

const tabs = [
  {
    name: t("Users"),
    id: "msTeamsUsers",
    component: () => <MsTeamsUsers />,
  },
  {
    name: t("O365 Tenant"),
    id: "o365tenant",
    component: () => <O365Tenant />,
  },
  {
    name: t("Admin account"),
    id: "o365admin",
    component: () => <O365Admin />,
  },
];

const MSTeams: FC = () => {
  const history = useHistory();
  const params = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID?: string;
  }>();

  const { allAvailvableRouting } = RoutingConfig;

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionMSTeams}/:tabID?`,
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
        url: `${allAvailvableRouting.subscriptionMSTeams}/:tabID?`,
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
        url={allAvailvableRouting.subscriptionMSTeams}
        onTabChange={handleTabClick}
        active={params.tabID}
      />
      <Switch>
        {tabs.map(({ id, component: Component }: Tab) => (
          <Route
            exact
            key={id}
            path={`${allAvailvableRouting.subscriptionMSTeams}/${id}`}
          >
            <Component />
          </Route>
        ))}
        <Route path="*" />
      </Switch>
    </>
  );
};

export default observer(MSTeams);
