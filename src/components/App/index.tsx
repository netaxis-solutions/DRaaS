import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import ThemeStore from "storage/singletons/ThemeConfig";
import RoutingStore from "storage/singletons/RoutingConfig";
import MenuStore from "storage/singletons/Menu";
import ConfigStore from "storage/singletons/Config";
import Loader from "components/Loader";

import Routes from "components/Routes";
import i18n, { getSpecificLanguageTranslation } from "services/Translation";
import "services/Translation";

const App: React.FC = () => {
  const { getThemeConfig, formattedTheme } = ThemeStore;
  const { getRoutingConfig, setLoggedUser } = RoutingStore;
  const { getConfig, formattedConfig } = ConfigStore;
  const { setActiveMenu } = MenuStore;

  useEffect(() => {
    getThemeConfig();
    getRoutingConfig();
    getConfig();

    setLoggedUser("admin", "admin");
    setActiveMenu("adminCatalogue");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formattedConfig["name" as keyof object] &&
      i18n.changeLanguage("en", () =>
        getSpecificLanguageTranslation({
          name: formattedConfig["name" as keyof object],
          lng: "en",
          customTranslations:
            formattedConfig["customTranslations" as keyof object],
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedConfig]);

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
