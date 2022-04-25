import { lazy } from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

const Tenants = lazy(() => import("levels/admin/components/TenantsList"));

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
        component={() => <div>resellerRatePlan</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.resellerAdmins}
        component={() => <div>resellerAdmins</div>}
      />
    </Switch>
  );
};

export default observer(Reseller);
