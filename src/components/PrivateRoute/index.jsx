import { observer } from "mobx-react-lite";
import { Route, Redirect } from "react-router";

import RoutingConfig from "storage/singletons/RoutingConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedInUserLevel } = RoutingConfig;

  return (
    <Route {...rest}>
      {loggedInUserLevel ? <Component {...rest} /> : <Redirect to="/login" />}
    </Route>
  );
};

export default observer(PrivateRoute);
