import { observer } from "mobx-react-lite";
import { Route, Redirect } from "react-router";

import configStore from "storage/singletons/Config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { config } = configStore;

  return config.name ? (
    localStorage.getItem(`${config.name}_refreshToken`) ? (
      <Route {...rest}>
        <Component {...rest} />
      </Route>
    ) : (
      <Redirect to="/login" />
    )
  ) : null;
};

export default observer(PrivateRoute);
