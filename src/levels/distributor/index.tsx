import { observer } from "mobx-react-lite";
// import { lazy } from "react";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

// const Resellers = lazy(() => import("./components/Resellers"));

const Distributor = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.distributorResellers}
        // component={Resellers}
        component={() => <div>Distributor Resellers</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorTenants}
        component={() => <div>distributorTenants</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorLicenseConsumption}
        component={() => <div>distributorLicenseConsumption</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorRatePlan}
        component={() => <div>distributorRatePlan</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorAdmins}
        component={() => <div>distributorAdmins</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorProfile}
        component={() => <div>distributorProfile</div>}
      />
    </Switch>
  );
};

export default observer(Distributor);
