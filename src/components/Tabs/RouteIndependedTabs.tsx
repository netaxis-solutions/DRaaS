import { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import MuiTabs from "@material-ui/core/Tabs";
import MuiTab from "@material-ui/core/Tab";

import { Tab } from "utils/types/tabs";

import styles, { tabStyles } from "./styles";

const CustomTab = withStyles(tabStyles)(MuiTab);
const CustomTabs = withStyles(styles)(MuiTabs);

const RouteIndependedTabs: React.FC<{ tabs: Tab[]; active?: string }> = ({
  tabs,
  active,
}) => {
  const [activeTab, setActiveTab] = useState(active || tabs[0]?.id);
  const ActiveContent =
    tabs.find(tab => tab.id === activeTab)?.component || tabs[0].component;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomTabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        aria-label="tabs"
      >
        {tabs.map((tab: any) => (
          <CustomTab
            key={tab.id}
            value={tab.id}
            label={tab.name}
            id={`scrollable-auto-tab-${tab.id}`}
            aria-controls={`scrollable-auto-tabpanel-${tab.id}`}
            onClick={_ => {
              setActiveTab(tab.id);
            }}
          />
        ))}
      </CustomTabs>
      <div>{<ActiveContent />}</div>
    </>
  );
};

export default RouteIndependedTabs;
