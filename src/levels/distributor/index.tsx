import { observer } from "mobx-react-lite";
import { lazy, useMemo } from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";

import RatePlans from "levels/admin/components/RatePlans";

const Resellers = lazy(() => import("levels/admin/components/ResellersList"));
const Tenants = lazy(() => import("levels/admin/components/TenantsList"));
const Admins = lazy(() => import("../admin/components/Admins"));

const Distributor = () => {
  const { allAvailvableRouting } = RoutingConfig;

  const routesForRedirect = useMemo(
    () => [
      {
        path: allAvailvableRouting.distributorResellers,
        to: allAvailvableRouting.distributorResellers,
      },
      {
        path: allAvailvableRouting.distributorTenants,
        to: allAvailvableRouting.distributorTenants,
      },
      {
        path: allAvailvableRouting.distributorLicenseConsumption,
        to: allAvailvableRouting.distributorLicenseConsumption,
      },
      {
        path: allAvailvableRouting.distributorRatePlan,
        to: allAvailvableRouting.distributorRatePlan,
      },
      {
        path: allAvailvableRouting.distributorAdmins,
        to: allAvailvableRouting.distributorAdmins,
      },
      {
        path: allAvailvableRouting.distributorProfile,
        to: allAvailvableRouting.distributorProfile,
      },
      {
        path: "",
        to: allAvailvableRouting.distributorTenants,
      },
    ],
    [allAvailvableRouting],
  );

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.distributorResellers}
        component={Resellers}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorTenants}
        component={Tenants}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorLicenseConsumption}
        component={() => <div>distributorLicenseConsumption</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorRatePlan}
        component={() => <RatePlans />}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorAdmins}
        component={Admins}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorProfile}
        component={() => <div>distributorProfile</div>}
      />

      {routesForRedirect.map(({ path, to }) => (
        <Redirect path={`${path}*`} to={to} />
      ))}
    </Switch>
  );
};

export default observer(Distributor);
