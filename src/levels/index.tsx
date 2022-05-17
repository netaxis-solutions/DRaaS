import { lazy, Suspense, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route } from "react-router-dom";

import loginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { urlStartString } from "utils/constants/routes";
import MainLayout from "components/MainLayout";

import Admin from "./admin";
import Distributor from "./distributor";
import Reseller from "./reseller";
import Tenant from "./tenant";
import SuspenseLoader from "components/Loader/Loader";
import Loader from "components/Loader";

const Subscription = lazy(() => import("./subscription"));

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
        <Suspense fallback={<SuspenseLoader />}>
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
        </Suspense>
      </Loader>
    </MainLayout>
  ) : null;
};

export default observer(Content);
