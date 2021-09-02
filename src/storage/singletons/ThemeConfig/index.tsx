import { makeObservable, observable, runInAction } from "mobx";
import get from "lodash/get";
import { createTheme } from "@material-ui/core/styles";

import PendingQueries from "storage/singletons/PendingQueries";
import backupTheme from "utils/constants/theme.assets";
import { deepClone } from "utils/functions/themeConfig";
import { ThemeDefaultOptionsType } from "utils/types/themeConfig";

class Theme {
  theme = {};

  get formattedTheme() {
    const paletteObj = {
      palette: deepClone(backupTheme.palette, get(this.theme, "palette", {})),
    };

    return createTheme(paletteObj);
  }

  constructor() {
    makeObservable(this, {
      theme: observable.ref,
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
        this.theme = backupTheme;
      });
    } finally {
      runInAction(() => {
        PendingQueries.remove("@themeLoader", queryId);
      });
    }
  };
}

export default new Theme();
