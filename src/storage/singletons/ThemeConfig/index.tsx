import { makeObservable, observable, runInAction } from "mobx";
import { createTheme as createMuiTheme } from "@material-ui/core/styles";

import PendingQueries from "storage/singletons/PendingQueries";
import { defaultPalette } from "utils/constants/theme.assets";
import { createTheme } from "utils/functions/themeConfig";
import { ThemeDefaultOptionsType } from "utils/types/themeConfig";

class Theme {
  theme = {};
  defaultTheme = createMuiTheme();

  get formattedTheme() {
    return createTheme(this.theme, this.defaultTheme);
  }

  constructor() {
    makeObservable(this, {
      theme: observable.ref,
      defaultTheme: observable.ref,
    });
  }

  getThemeConfig = async (): Promise<void> => {
    const queryId = PendingQueries.add("@themeLoader", null);

    try {
      const data = await fetch("/branding/default/theme.config.json");
      const jsonResult: ThemeDefaultOptionsType = await data.json();

      runInAction(() => {
        this.theme = jsonResult;
      });
    } catch {
      runInAction(() => {
        this.theme = { palette: defaultPalette };
      });
    } finally {
      runInAction(() => {
        PendingQueries.remove("@themeLoader", queryId);
      });
    }
  };
}

export default new Theme();
