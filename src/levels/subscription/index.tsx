import { lazy, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";
import { Redirect, useParams } from "react-router-dom";

import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import RoutingConfig from "storage/singletons/RoutingConfig";
import SidebarConfig from "storage/singletons/SidebarConfig";

const SubscriptionNumbersPage = lazy(
  () => import("./components/SubscriptionNumbersPage"),
);
const Licenses = lazy(() => import("./components/Licenses"));
const MsTeams = lazy(() => import("./components/MsTeams"));
const SipTrunks = lazy(() => import("./components/SipTrunks"));
const SipTrunkAdd = lazy(
  () => import("./components/SipTrunks/components/SipTrunkDetail"),
);
const SubscriptionProfile = lazy(
  () => import("./components/SubscriptionProfile"),
);

const Subscription = () => {
  const params = useParams<{ tenantID: string; subscriptionID: string }>();

  const {
    allAvailvableRouting,
    loggedInUserLevel,
    setCurrentLevel,
  } = RoutingConfig;
  const { setChosenCustomer } = SidebarConfig;

  useEffect(() => {
    setChosenCustomer(params.tenantID, params.subscriptionID);
    return () => MsTeamAdminStorage.clearCacheMsTeamAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tenantID, params.subscriptionID]);

  useEffect(() => {
    setCurrentLevel("subscription");
    return () => {
      setCurrentLevel(loggedInUserLevel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserLevel]);

  const routesForRedirect = useMemo(
    () => [
      {
        path: allAvailvableRouting.subscriptionLicenses,
        to: allAvailvableRouting.subscriptionLicenses,
      },
      {
        path: allAvailvableRouting.subscriptionNumbers,
        to: allAvailvableRouting.subscriptionNumbers,
      },
      {
        path: allAvailvableRouting.subscriptionMSTeams,
        to: allAvailvableRouting.subscriptionMSTeams,
      },
      {
        path: allAvailvableRouting.subscriptionSIPTrunks,
        to: allAvailvableRouting.subscriptionSIPTrunks,
      },
      {
        path: allAvailvableRouting.subscriptionProfile,
        to: allAvailvableRouting.subscriptionProfile,
      },
      {
        path: "/tenants/:tenantID/subscriptions/:subscriptionID",
        to: allAvailvableRouting.subscriptionLicenses,
      },
    ],
    [allAvailvableRouting],
  );

  return (
    <Switch>
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionLicenses}/:tabID?`}
        component={() => <Licenses />}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionNumbers}/:tabID?`}
        component={() => <SubscriptionNumbersPage />}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionMSTeams}/:tabID?`}
        component={() => <MsTeams />}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionSIPTrunks}`}
        component={() => <SipTrunks />}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionSIPTrunks}/:sipID/:tabID?`}
        component={() => <SipTrunkAdd />}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionProfile}/:tabID?`}
        component={() => <SubscriptionProfile />}
      />

      {routesForRedirect.map(({ path, to }) => (
        <Redirect path={`${path}*`} to={to} />
      ))}
    </Switch>
  );
};

export default observer(Subscription);
