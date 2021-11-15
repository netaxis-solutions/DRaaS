import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

const Distributor = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.distributorResellers}
        component={() => <div>distributorResellers</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.distributorCustomers}
        component={() => <div>distributorCustomers</div>}
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
