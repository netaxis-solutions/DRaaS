import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

import RoutingStore from "storage/singletons/RoutingConfig";
import { publicRoutes } from "utils/constants/routes";
import PrivateRoute from "components/PrivateRoute";
import Login from "levels/authorization/Login";
import Content from "levels";
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
      <PrivateRoute path="/" component={Content} />
      {/* <Redirect to={publicRoutes.login} /> */}
    </>
  );
};

export default Routes;
