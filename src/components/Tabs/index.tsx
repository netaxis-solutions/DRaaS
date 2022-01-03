<<<<<<< HEAD
=======
// import { useEffect } from "react";
// import { useParams } from "react-router";

import { Switch, Route } from "react-router-dom";

>>>>>>> tabs component created
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

const Tabs: React.FC<TabsProps> = ({ tabs, active, url, onTabChange }) => {
  const params = useParams<{ tabID: string }>();

  const { history } = RoutingConfig;

  const handleChange = useCallback(
    (_, tabID) => {
      if (onTabChange) {
        onTabChange(tabID);
      } else {
        const link = createLink({
          url: `${url}/${tabID}`,
          params: { ...params },
        });
        history.push(link);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTabChange, url],
  );

  const activeTab =
    (active === undefined ? params.tabID : active) || tabs[0]?.id;

  useEffect(() => {
    if (!params.tabID && url) {
      const link = createLink({
        url: `${url}/${tabs[0].id}`,
        params: { ...params },
      });
      history.replace(link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tabs.length > 1 ? (
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
  ) : null;
};

export default Tabs;
