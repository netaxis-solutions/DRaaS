import { useEffect } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";

import RoutingStore from "storage/singletons/RoutingConfig";
import { publicRoutes } from "utils/constants/routes";
import PrivateRoute from "components/PrivateRoute";
import Login from "levels/authorization/Login";

const Routes: React.FC = () => {
  const { setHistory } = RoutingStore;
  const history = useHistory();

  useEffect(() => {
    setHistory(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Route path={publicRoutes.login} exact component={Login} />
      <PrivateRoute path="/" component={() => <div>Page</div>} />
      <Redirect to={publicRoutes.login} />
    </>
  );
};

export default Routes;
