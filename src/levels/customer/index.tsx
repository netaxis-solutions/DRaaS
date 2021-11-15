import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

const Customer = () => {
  const { allAvailvableRouting } = RoutingConfig;

  return (
    <Switch>
      <Route
        exact
        path={allAvailvableRouting.customerSubscriptions}
        component={() => <div>customerSubscriptions</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.customerLocations}
        component={() => <div>customerLocations</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.customerRatePlan}
        component={() => <div>customerRatePlan</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.customerAdmins}
        component={() => <div>customerAdmins</div>}
      />
      <Route
        exact
        path={allAvailvableRouting.customerProfile}
        component={() => <div>customerProfile</div>}
      />
    </Switch>
  );
};

export default observer(Customer);
