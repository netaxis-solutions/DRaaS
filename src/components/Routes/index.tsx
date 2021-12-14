import { useEffect } from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";

import RoutingStore from "storage/singletons/RoutingConfig";
import PrivateRoute from "components/PrivateRoute";
import Login from "levels/authorization/Login";
import Content from "levels";

const publicRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password/:oneTimeToken",
  "/two-factor",
];

const Routes: React.FC = () => {
  const { setHistory } = RoutingStore;
  const history = useHistory();

  useEffect(() => {
    setHistory(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route path={publicRoutes} exact component={Login} />
      <PrivateRoute path="/" component={Content} />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Routes;
