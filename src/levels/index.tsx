import Loader from "components/Loader";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import loginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";

const Content = () => {
  const { getUserData } = loginStore;
  const { levelRoutes } = RoutingConfig;

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Loader>
      <Switch>
        <Route
          path={levelRoutes.get("adminCatalogue")}
          component={() => <div>adminCatalogue</div>}
        />
      </Switch>
    </Loader>
  );
};

export default observer(Content);
