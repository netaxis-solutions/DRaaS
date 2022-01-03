// import { useEffect } from "react";
// import { useParams } from "react-router";

import { Switch, Route } from "react-router-dom";

import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import MuiTabs from "@material-ui/core/Tabs";
import MuiTab from "@material-ui/core/Tab";
import createLink from "services/createLink";
import styles, { tabStyles } from "./styles";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { TabsProps } from "utils/types/tabs";

const CustomTab = withStyles(tabStyles)(MuiTab);
const CustomTabs = withStyles(styles)(MuiTabs);

const Tabs: React.FC<TabsProps> = ({ tabs, active, onTabChange }) => {
  const params = useParams<{ tabID: string }>();

  const { history } = RoutingConfig;
  const { allAvailvableRouting } = RoutingConfig;

  const handleChange = useCallback(
    // @ts-ignore
    (e, tabID) => {
      if (onTabChange) {
        onTabChange(tabID);
      } else {
        const url = createLink({
          url: `${allAvailvableRouting.subscriptionNumbers}/${tabID}`,
          params,
        });
        console.log("history pushed");
        history.push(url);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTabChange],
  );

  const activeTab =
    (active === undefined ? params.tabID : active) || tabs[0]?.id;

  useEffect(() => {
    if (!params.tabID) {
      const link = createLink({
        url: `${allAvailvableRouting.subscriptionNumbers}/${tabs[0].id}`,
        params,
      });
      history.replace(link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tabs.length > 1 ? (
    <>
      <CustomTabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        onChange={handleChange}
        aria-label="tabs"
      >
        {tabs.map((tab: any) => (
          <CustomTab
            key={tab.id}
            value={tab.id}
            label={tab.name}
            id={`scrollable-auto-tab-${tab.id}`}
            aria-controls={`scrollable-auto-tabpanel-${tab.id}`}
          />
        ))}
      </CustomTabs>
      <Switch>
        {tabs.map(({ id, ...props }: any) => (
          <Route
            exact
            key={id}
            path={`${allAvailvableRouting.subscriptionNumbers}/${id}`}
          >
            {props.component}
          </Route>
        ))}
        <Route path="*" />
      </Switch>
    </>
  ) : null;
};

export default Tabs;
