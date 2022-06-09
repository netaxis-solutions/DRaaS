import { lazy, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Redirect, Route, Switch } from "react-router";
import { useParams } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import SidebarConfig from "storage/singletons/SidebarConfig";
import Login from "storage/singletons/Login";

import RatePlans from "levels/admin/components/RatePlans";

const SubscriptionsList = lazy(() => import("./components/SubscriptionsList"));

const Tenant = () => {
  const params = useParams<{ tenantID: string }>();

  const {
    allAvailvableRouting,
    loggedInUserLevel,
    setCurrentLevel,
  } = RoutingConfig;
  const { setChosenCustomer } = SidebarConfig;
  const { getExactLevelReference } = Login;

  const routesForRedirect = useMemo(
    () => [
      {
        path: allAvailvableRouting.tenantSubscriptions,
        to: allAvailvableRouting.tenantSubscriptions,
      },
      {
        path: allAvailvableRouting.tenantRatePlan,
        to: allAvailvableRouting.tenantRatePlan,
      },
      {
        path: allAvailvableRouting.tenantProfile,
        to: allAvailvableRouting.tenantProfile,
      },
      {
        path: "/tenants/:tenantID",
        to: allAvailvableRouting.tenantSubscriptions,
      },
      {
        path: "",
        to: allAvailvableRouting.tenantSubscriptions,
      },
    ],
    [allAvailvableRouting],
  );

  useEffect(() => {
    setChosenCustomer(params.tenantID || getExactLevelReference("tenant"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.tenantID]);

  useEffect(() => {
    setCurrentLevel("tenant");
    return () => {
      setCurrentLevel(loggedInUserLevel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserLevel]);

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.tenantSubscriptions}
        component={() => <SubscriptionsList />}
      />
      <Route
        exact
        path={allAvailvableRouting.tenantRatePlan}
        component={() => <RatePlans />}
      />
      <Route
        exact
        path={allAvailvableRouting.tenantAdmins}
        component={() => <div>tenantAdmins</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.tenantProfile}
        component={() => <div>tenantProfile</div>}
      />

      {routesForRedirect.map(({ path, to }) => (
        <Redirect path={`${path}*`} to={to} />
      ))}
    </Switch>
  );
};

export default observer(Tenant);
