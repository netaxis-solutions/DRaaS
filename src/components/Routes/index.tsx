import { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import RoutingStore from "storage/singletons/RoutingConfig";
import { publicRoutes } from "utils/constants/routes";
import PrivateRoute from "components/PrivateRoute";

import Page from "./Page";

const Routes: React.FC = () => {
  const { setHistory } = RoutingStore;
  const history = useHistory();

  useEffect(() => {
    setHistory(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Route
        path={publicRoutes.login}
        exact
        component={() => <div> LOG IN</div>}
      />
      <PrivateRoute path="/" component={Page} />
      <Redirect to={publicRoutes.login} />
    </>
  );
};

export default Routes;
