import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Switch } from "react-router";
import RoutingConfig from "storage/singletons/RoutingConfig";
import BuildInfo from "./components/CurrentVersionInfo";

const ResellersList = lazy(() => import("./components/ResellersList"));
const DistributorsList = lazy(() => import("./components/DistributorsList"));
const TenantsList = lazy(() => import("./components/TenantsList"));

const Admin = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.draas_system_adminDistributors}
        component={DistributorsList}
      />
      <Route
        exact
        path={allAvailvableRouting.draas_system_adminResellers}
        component={ResellersList}
      />
      <Route
        exact
        path={allAvailvableRouting.draas_system_adminTenants}
        component={TenantsList}
      />
      <Route
        exact
        path={allAvailvableRouting.draas_system_adminRatePlan}
        component={() => <div>Billing</div>}
      />
      <Route exact path={"/info"} component={BuildInfo} />
    </Switch>
  );
};

export default observer(Admin);
