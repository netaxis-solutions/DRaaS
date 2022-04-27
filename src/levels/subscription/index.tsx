import { lazy, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";
import { useParams } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SidebarConfig from "storage/singletons/SidebarConfig";

const SubscriptionNumbersPage = lazy(
  () => import("./components/SubscriptionNumbersPage"),
);
const Licenses = lazy(() => import("./components/Licenses"));
const MsTeams = lazy(() => import("./components/MsTeams"));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tenantID, params.subscriptionID]);

  useEffect(() => {
    setCurrentLevel("subscription");
    return () => {
      setCurrentLevel(loggedInUserLevel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserLevel]);

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
        path={allAvailvableRouting.subscriptionSIPTrunks}
        component={() => <div>subscriptionSIPTrunks</div>}
      />
      <Route
        exact
        path={`${allAvailvableRouting.subscriptionProfile}/:tabID?`}
        component={() => <SubscriptionProfile />}
      />
    </Switch>
  );
};

export default observer(Subscription);
