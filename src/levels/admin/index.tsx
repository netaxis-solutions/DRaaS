import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Switch } from "react-router";
import RoutingConfig from "storage/singletons/RoutingConfig";
import BuildInfo from "./components/CurrentVersionInfo";
import RatePlans from "./components/RatePlans";

const ResellersList = lazy(() => import("./components/ResellersList"));
const DistributorsList = lazy(() => import("./components/DistributorsList"));
const TenantsList = lazy(() => import("./components/TenantsList"));

const Admin = () => {
  const { allAvailvableRouting } = RoutingConfig;

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
      <Route exact path={"/info"} component={BuildInfo} />
    </Switch>
  );
};

export default observer(Admin);
