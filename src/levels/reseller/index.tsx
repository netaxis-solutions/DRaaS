import { lazy } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

import RatePlans from "levels/admin/components/RatePlans";

const Tenants = lazy(() => import("levels/admin/components/TenantsList"));
const Admins = lazy(() => import("../admin/components/Admins"));

const Reseller = () => {
  const { allAvailvableRouting } = RoutingConfig;

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
    </Switch>
  );
};

export default observer(Reseller);
