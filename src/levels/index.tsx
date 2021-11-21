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

const Content: React.FC = () => {
  const { getUserData } = loginStore;
  const { loggedInUserLevel } = RoutingConfig;

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    loggedInUserLevel && (
      <MainLayout>
        <Loader>
          <Switch>
            <Route
              path={urlStartString[loggedInUserLevel].tenant}
              component={Tenant}
            />
            {loggedInUserLevel !== "tenant" && (
              <Route
                path={urlStartString[loggedInUserLevel].reseller}
                component={Reseller}
              />
            )}
            {(loggedInUserLevel === "distributor" ||
              loggedInUserLevel === "admin") && (
              <Route
                path={urlStartString[loggedInUserLevel].distributor}
                component={Distributor}
              />
            )}
            <Route path={""} component={Admin} />
          </Switch>
        </Loader>
      </MainLayout>
    )
  );
};

export default observer(Content);
