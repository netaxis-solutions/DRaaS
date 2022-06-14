import { lazy, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";

import RatePlans from "levels/admin/components/RatePlans";

const Tenants = lazy(() => import("levels/admin/components/TenantsList"));
const Admins = lazy(() => import("../admin/components/Admins"));

const Reseller = () => {
  const { allAvailvableRouting } = RoutingConfig;

  const routesForRedirect = useMemo(
    () => [
      {
        path: allAvailvableRouting.resellerTenants,
        to: allAvailvableRouting.resellerTenants,
      },
      {
        path: allAvailvableRouting.resellerLicenseConsumption,
        to: allAvailvableRouting.resellerLicenseConsumption,
      },
      {
        path: allAvailvableRouting.resellerRatePlan,
        to: allAvailvableRouting.resellerRatePlan,
      },
      {
        path: allAvailvableRouting.resellerAdmins,
        to: allAvailvableRouting.resellerAdmins,
      },
      {
        path: allAvailvableRouting.resellerProfile,
        to: allAvailvableRouting.resellerProfile,
      },
      {
        path: "",
        to: allAvailvableRouting.resellerTenants,
      },
    ],
    [allAvailvableRouting],
  );

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.resellerTenants}
        component={Tenants}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerLicenseConsumption}
        component={() => <div>resellerLicenseConsumption</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerRatePlan}
        component={() => <RatePlans />}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerAdmins}
        component={Admins}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerAdmins}
        component={() => <div>resellerAdmins</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerProfile}
        component={() => <div>resellerProfile</div>}
      />

      {routesForRedirect.map(({ path, to }) => (
        <Redirect path={`${path}*`} to={to} />
      ))}
    </Switch>
  );
};

export default observer(Reseller);
