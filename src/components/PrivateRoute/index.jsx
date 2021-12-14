import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Route, Redirect } from "react-router";

import configStore from "storage/singletons/Config";
import loginStore from "storage/singletons/Login";
import { getToken } from "utils/functions/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { formattedConfig } = configStore;
  const { customLogoutLink } = loginStore;

  const token = useMemo(() => getToken(formattedConfig.name), [
    formattedConfig,
  ]);

  return formattedConfig.name ? (
    token ? (
      <Route {...rest}>
        <Component {...rest} />
      </Route>
    ) : (
      <Redirect to={customLogoutLink || "/login"} />
    )
  ) : null;
};

export default observer(PrivateRoute);
