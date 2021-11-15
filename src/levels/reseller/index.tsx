import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

const Reseller = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.resellerCustomers}
        component={() => <div>resellerCustomers</div>}
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
