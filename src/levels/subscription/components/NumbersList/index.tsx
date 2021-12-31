// import { useEffect } from "react";
// import { useParams } from "react-router";
import NumbersStore from "storage/singletons/Numbers";
// const Numbers: React.FC<any> = ({}) => {
//   useEffect(() => {
//     addNumbersData(params.tenantID);
//     getNumbersData(params.tenantID);
//   }, []);
//   return <div>{}</div>;
// };

// export default Numbers;
import { createBrowserHistory } from "history";
import { Switch, Route } from "react-router-dom";

import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import MuiAppBar from "@material-ui/core/AppBar";
import MuiTabs from "@material-ui/core/Tabs";
import MuiTab from "@material-ui/core/Tab";
import createLink from "services/createLink";
import styles, { tabStyles } from "./styles";
import RoutingConfig from "storage/singletons/RoutingConfig";

const AppBar = withStyles(styles)(MuiAppBar);
const CustomTab = withStyles(tabStyles)(MuiTab);
const tabs = [
  {
    name: "shared:Users",
    id: "subscriptionUsers",
    component: <div>aaaa</div>,
  },
  {
    name: "shared:Groups",
    id: "groups",
    component: <div>aaaa</div>,
  },
  {
    name: "shared:Phone numbers",
    id: "phoneNumbers",
    component: <div>aaaa</div>,
  },
];

const Tabs = ({ url, active, onTabChange }: any) => {
  const params: any = useParams();
  const history = createBrowserHistory();
  const { addNumbersData, getNumbersData } = NumbersStore;
  const { allAvailvableRouting } = RoutingConfig;
  console.log(params);
  const handleChange = useCallback(
    (e, tabID) => {
      if (onTabChange) {
        onTabChange(tabID);
        console.log(e);
      } else {
        // const link = createLink({
        //   url,
        //   params: { ...params, tabID },
        // });
        // history.push(link);
        handleTabClick(tabID);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTabChange, url],
  );
  const handleTabClick = (tabID: any) => {
    console.log("asdsad", tabID);
    const url = createLink({
      url: `${allAvailvableRouting.subscriptionNumbers}/${tabID}`,
      params,
    });
    console.log(tabID);
    history.push(url);
  };
  const activeTab =
    (active === undefined ? params.tabID : active) || tabs[0]?.id;

  useEffect(() => {
    if (!params.tabID && url) {
      const link = createLink({
        url,
        params: { ...params, tabID: tabs[0].id },
      });
      history.replace(link);
    }
    addNumbersData(params.tenantID);
    getNumbersData(params.tenantID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tabs.length > 1 ? (
    <>
      <AppBar position="static" color="transparent">
        <MuiTabs
          indicatorColor="primary"
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
        </MuiTabs>
      </AppBar>
      <Switch>
        {tabs.map(({ id, ...props }: any) => (
          <Route
            exact
            key={id}
            path={`${allAvailvableRouting[id]}`}
            {...props}
          />
        ))}
        <Route path="*" />
      </Switch>
    </>
  ) : null;
};

export default Tabs;
