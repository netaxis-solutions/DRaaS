import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Switch } from "react-router";
import RoutingConfig from "storage/singletons/RoutingConfig";

const ResellersList = lazy(() => import("./components/ResellersList"));
const DistributorsList = lazy(() => import("./components/DistributorsList"));
const TenantsList = lazy(() => import("./TenantsList"));

const Admin = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.adminDistributors}
        component={DistributorsList}
      />
      <Route
        exact
        path={allAvailvableRouting.adminResellers}
        component={ResellersList}
      />
      <Route
        exact
        path={allAvailvableRouting.adminTenants}
        component={TenantsList}
      />
      <Route
        exact
        path={allAvailvableRouting.adminRatePlan}
        component={() => <div>Billing</div>}
      />
    </Switch>
  );
};

export default observer(Admin);
