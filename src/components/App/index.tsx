import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ThemeStore from "storage/singletons/ThemeConfig";
import RoutingStore from "storage/singletons/RoutingConfig";
import MenuStore from "storage/singletons/Menu";
import Loader from "components/Loader";

import Routes from "components/Routes";

const App: React.FC = () => {
  const { getThemeConfig, formattedTheme } = ThemeStore;
  const { getRoutingConfig, setLoggedUser, availableRouting } = RoutingStore;
  const { topMenu, setActiveMenu, sidebar } = MenuStore;

  useEffect(() => {
    getThemeConfig();
    getRoutingConfig();
    setLoggedUser("admin", "admin");
    setActiveMenu("adminCatalogue");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(
    "availableRouting",
    availableRouting,
    "topMenu",
    topMenu,
    "sidebar",
    sidebar
  );

  return (
    <ThemeProvider theme={formattedTheme}>
      <CssBaseline />
      <Loader />
      <Router>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default observer(App);
