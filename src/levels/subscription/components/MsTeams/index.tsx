import { observer } from "mobx-react-lite";
import { FC, lazy, useEffect, useMemo } from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";

import SubscriptionLicensesStore from "storage/singletons/Licenses";
import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import RoutingConfig from "storage/singletons/RoutingConfig";
import createLink from "services/createLink";

import { Tab } from "utils/types/tabs";
import { t } from "services/Translation";

import Tabs from "components/Tabs";

const O365Tenant = lazy(() => import("./components/O365Tanant"));
const O365Admin = lazy(() => import("./components/O365Admin"));
const MsTeamsUsers = lazy(() => import("./components/MsTeamsUsers"));
const ResourceAccount = lazy(() => import("./components/ResourceAccount"));

const tabs = [
  {
    name: t("Users"),
    id: "msTeamsUsers",
    component: () => <MsTeamsUsers />,
  },
  {
    name: t("Resource accounts"),
    id: "resourceAccounts",
    component: () => <ResourceAccount />,
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

  const { getSubscriptionLicensesData } = SubscriptionLicensesStore;
  const { getCheckMsTeamAdmin, checkMsTeamAdmin } = MsTeamAdminStorage;

  const filteredTabs = useMemo(() => {
    return checkMsTeamAdmin?.status === "onboarded"
      ? tabs
      : tabs.filter(el => el.id === "o365tenant" || el.id === "o365admin");
  }, [checkMsTeamAdmin]);

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
    getSubscriptionLicensesData(params.tenantID, params.subscriptionID);
    getCheckMsTeamAdmin(params.tenantID, params.subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!filteredTabs.some(({ id }) => id === params.tabID)) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionMSTeams}/:tabID?`,
        params: {
          ...params,
          tabID: filteredTabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, params]);

  return (
    <>
      <Tabs
        tabs={filteredTabs}
        url={allAvailvableRouting.subscriptionMSTeams}
        onTabChange={handleTabClick}
        active={params.tabID}
      />
      <Switch>
        {filteredTabs.map(({ id, component: Component }: Tab) => {
          return (
            <Route
              exact
              key={id}
              path={`${allAvailvableRouting.subscriptionMSTeams}/${id}`}
            >
              <Component />
            </Route>
          );
        })}
        <Route path="*" />
      </Switch>
    </>
  );
};

export default observer(MSTeams);
