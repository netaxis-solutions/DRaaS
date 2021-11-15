import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { Route, Switch } from "react-router";
import RoutingConfig from "storage/singletons/RoutingConfig";

const DistributorsList = lazy(() => import("levels/distributors"));

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
        component={() => <div>adminResellers</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.adminCustomers}
        component={() => <div>Billing</div>}
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
