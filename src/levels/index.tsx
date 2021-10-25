import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Switch, Route } from "react-router-dom";

import loginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";
import Loader from "components/Loader";
import MainLayout from "components/MainLayout";

const Content: React.FC = () => {
  const { getUserData } = loginStore;
  const { allAvailvableRouting } = RoutingConfig;

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    allAvailvableRouting && (
      <MainLayout>
        <Loader>
          <Switch>
            <Route
              exact
              path={allAvailvableRouting.customerSubscriptions}
              component={() => <div>customerSubscriptions</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.customerLocations}
              component={() => <div>customerLocations</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.customerRatePlan}
              component={() => <div>customerRatePlan</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.customerAdmins}
              component={() => <div>customerAdmins</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.customerProfile}
              component={() => <div>customerProfile</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.resellerCustomers}
              component={() => <div>resellerCustomers</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.resellerLicenseConsumption}
              component={() => <div>resellerLicenseConsumption</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.resellerRatePlan}
              component={() => <div>resellerRatePlan</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.resellerAdmins}
              component={() => <div>resellerAdmins</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.resellerProfile}
              component={() => <div>resellerProfile</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorResellers}
              component={() => <div>distributorResellers</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorCustomers}
              component={() => <div>distributorCustomers</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorLicenseConsumption}
              component={() => <div>distributorLicenseConsumption</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorRatePlan}
              component={() => <div>distributorRatePlan</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorAdmins}
              component={() => <div>distributorAdmins</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.distributorProfile}
              component={() => <div>distributorProfile</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.adminDistributors}
              component={() => <div>Catalogue</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.adminResellers}
              component={() => <div>adminResellers</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.adminCustomers}
              component={() => <div>Billing</div>}
            />
            <Route
              exact
              path={allAvailvableRouting.adminRatePlan}
              component={() => <div>Billing</div>}
            />
          </Switch>
        </Loader>
      </MainLayout>
    )
  );
};

export default observer(Content);
