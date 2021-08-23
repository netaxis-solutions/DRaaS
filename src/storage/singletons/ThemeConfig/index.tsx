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

  getThemeConfig = async (): Promise<object> => {
    const queryId = PendingQueries.add("@themeLoader", null);

    return await fetch("/branding/default/theme.config.json")
      .then((data) => data.json())
      .then((data: object) => data)
      .catch(() => backupTheme)
      .then((theme: ThemeDefaultOptionsType | object) => {
        runInAction(() => {
          this.theme = theme;
          PendingQueries.remove("@themeLoader", queryId);
        });
        return this.theme;
      });
  };
}

export default new Theme();
