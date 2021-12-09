import { observer } from "mobx-react-lite";
import { Route, Redirect } from "react-router";

import configStore from "storage/singletons/Config";
import { storageToManipulate } from "utils/functions/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { config, keepUserLoggedIn } = configStore;
  const refreshToken = storageToManipulate(keepUserLoggedIn).getItem(
    `${config.name}_refreshToken`,
  );

  return config.name ? (
    refreshToken ? (
      <Route {...rest}>
        <Component {...rest} />
      </Route>
    ) : (
      <Redirect to="/login" />
    )
  ) : null;
};

export default observer(PrivateRoute);
