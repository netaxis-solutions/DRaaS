import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ThemeStore from "storage/singletons/ThemeConfig";
import RoutingStore from "storage/singletons/RoutingConfig";
import ConfigStore from "storage/singletons/Config";
import TranslateStore from "storage/singletons/Translate";

import Routes from "components/Routes";
import i18n, { getSpecificLanguageTranslation } from "services/Translation";
import "services/Translation";

const App: React.FC = () => {
  const { getThemeConfig, formattedTheme } = ThemeStore;
  const { getRoutingConfig } = RoutingStore;
  const { language, changeLanguage } = TranslateStore;
  const { getConfig, formattedConfig } = ConfigStore;

  useEffect(() => {
    getRoutingConfig();
    getConfig();
    getThemeConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    changeLanguage(localStorage.getItem("i18nextLng") as any);
    formattedConfig["name" as keyof object] &&
      i18n.changeLanguage(language as string, () =>
        getSpecificLanguageTranslation({
          name: formattedConfig["name" as keyof object],
          lng: language as string,
          customTranslations:
            formattedConfig["customTranslations" as keyof object],
        }),
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedConfig, language]);

  return formattedConfig["name" as keyof object] ? (
    <MuiThemeProvider theme={formattedTheme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </MuiThemeProvider>
  ) : null;
};

export default observer(App);
