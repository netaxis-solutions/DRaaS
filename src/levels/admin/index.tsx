import { observer } from "mobx-react-lite";
import { lazy, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router";
import RoutingConfig from "storage/singletons/RoutingConfig";
import BuildInfo from "./components/CurrentVersionInfo";
import RatePlans from "./components/RatePlans";

const ResellersList = lazy(() => import("./components/ResellersList"));
const DistributorsList = lazy(() => import("./components/DistributorsList"));
const TenantsList = lazy(() => import("./components/TenantsList"));
const Admins = lazy(() => import("./components/Admins"));

const Admin = () => {
  const { allAvailvableRouting } = RoutingConfig;

  const routesForRedirect = useMemo(
    () => [
      {
        path: allAvailvableRouting.systemDistributors,
        to: allAvailvableRouting.systemDistributors,
      },
      {
        path: allAvailvableRouting.systemResellers,
        to: allAvailvableRouting.systemResellers,
      },
      {
        path: allAvailvableRouting.systemTenants,
        to: allAvailvableRouting.systemTenants,
      },
      {
        path: allAvailvableRouting.systemRatePlan,
        to: allAvailvableRouting.systemRatePlan,
      },
      { path: "", to: allAvailvableRouting.systemTenants },
    ],
    [allAvailvableRouting],
  );

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.systemDistributors}
        component={DistributorsList}
      />
      <Route
        exact
        path={allAvailvableRouting.systemResellers}
        component={ResellersList}
      />
      <Route
        exact
        path={allAvailvableRouting.systemTenants}
        component={TenantsList}
      />
      <Route
        exact
        path={allAvailvableRouting.systemRatePlan}
        component={RatePlans}
      />
      <Route
        exact
        path={allAvailvableRouting.systemAdmins}
        component={Admins}
      />
      <Route exact path={"/info"} component={BuildInfo} />

      {routesForRedirect.map(({ path, to }) => {
        return <Redirect path={`${path}*`} to={to} />;
      })}
    </Switch>
  );
};

export default observer(Admin);
