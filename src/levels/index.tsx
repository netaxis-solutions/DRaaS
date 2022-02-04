import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route } from "react-router-dom";

import loginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { urlStartString } from "utils/constants/routes";
import Loader from "components/Loader";
import MainLayout from "components/MainLayout";

import Admin from "./admin";
import Distributor from "./distributor";
import Reseller from "./reseller";
import Tenant from "./tenant";
import Subscription from "./subscription";

const Content: React.FC = () => {
  const { getUserData, user } = loginStore;
  const { loggedInUserLevel } = RoutingConfig;

  useEffect(() => {
    !Object.keys(user).length && getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return loggedInUserLevel ? (
    <MainLayout>
      <Loader>
        <Switch>
          <Route
            path={urlStartString[loggedInUserLevel].subscription}
            component={Subscription}
          />
          <Route
            // @ts-ignore
            path={urlStartString[loggedInUserLevel].tenant}
            component={Tenant}
          />
          {loggedInUserLevel !== "tenant" && (
            <Route
              // @ts-ignore
              path={urlStartString[loggedInUserLevel].reseller}
              component={Reseller}
            />
          )}
          {(loggedInUserLevel === "distributor" ||
            loggedInUserLevel === "system") && (
            <Route
              path={urlStartString[loggedInUserLevel].distributor}
              component={Distributor}
            />
          )}
          <Route path={""} component={Admin} />
        </Switch>
      </Loader>
    </MainLayout>
  ) : null;
};

export default observer(Content);
