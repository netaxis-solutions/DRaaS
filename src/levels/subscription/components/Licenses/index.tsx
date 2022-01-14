import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams, useHistory, Switch, Route } from "react-router-dom";

import RoutingConfig from "storage/singletons/RoutingConfig";
import createLink from "services/createLink";
import { Tab } from "utils/types/tabs";

import Tabs from "components/Tabs";
import Loader from "components/Loader/Loader";
import LicensesList from "./components/LicensesList";
import EntitlementList from "./components/EntitlementsList";

const tabs = [
  {
    name: "Licenses List",
    id: "licensesList",
    component: () => <LicensesList />,
  },
  {
    name: "Entitlements List",
    id: "entitlementsList",
    component: () => <EntitlementList />,
  },
];

const License: FC = () => {
  const history = useHistory();
  const params = useParams<{
    tenantID: string;
    subscriptionID: string;
    tabID?: string;
  }>();

  const { allAvailvableRouting } = RoutingConfig;

  useEffect(() => {
    if (params.tabID === ":tabID" && tabs && tabs.length) {
      const url = createLink({
        url: `${allAvailvableRouting.subscriptionLicenses}/:tabID?`,
        params: {
          ...params,
          tabID: tabs[0].id,
        },
      });
      history.replace(url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs, params]);

  const handleTabClick = (tabID: string) => {
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionLicenses}/:tabID?`,
      params: {
        ...params,
        tabID,
      },
    });
    history.push(url);
  };

  if (params.tabID === ":tabID") return <Loader />;
  return (
    <>
      <Tabs
        tabs={tabs}
        url={allAvailvableRouting.subscriptionLicenses}
        onTabChange={handleTabClick}
        active={params.tabID}
      />
      <Switch>
        {tabs.map(({ id, component: Component }: Tab) => (
          <Route
            exact
            key={id}
            path={`${allAvailvableRouting.subscriptionLicenses}/${id}`}
          >
            <Component />
          </Route>
        ))}
        <Route path="*" />
      </Switch>
    </>
  );
};

export default observer(License);
