import { makeObservable, computed, observable, runInAction } from "mobx";
import mergeWith from "lodash/mergeWith";

import LoginStore from "../Login";
import PendingQueries from "storage/singletons/PendingQueries";
import { backupConfig } from "utils/constants/app.config.assets";
import { ConfigType } from "utils/types/config";
import { customizer } from "utils/functions/config";
import { getToken } from "utils/functions/storage";

class Config {
  config = {} as ConfigType;

  get formattedConfig() {
    return this.config.name
      ? mergeWith({}, backupConfig, this.config, customizer)
      : {};
  }

  constructor() {
    makeObservable(this, {
      config: observable.ref,
      ready: computed,
    });
  }

  get ready() {
    return !!Object.keys(this.config).length;
  }

  getConfig = async (): Promise<void> => {
    const queryId = PendingQueries.add("@configLoader", null);

    try {
      const data = await fetch("/configs/default/app.config.json");
      const jsonData: ConfigType = await data.json();
      const keepMeLoggedIn = getToken(jsonData.name);
      if (keepMeLoggedIn) {
        LoginStore.setKeepUserLoggenIn(keepMeLoggedIn === "true");
      } else if ("keepUserLoggedIn" in jsonData.authentication) {
        LoginStore.setKeepUserLoggenIn(
          jsonData.authentication.keepUserLoggedIn,
        );
      }

      runInAction(() => {
        this.config = jsonData;
      });
    } catch {
      runInAction(() => {
        this.config = backupConfig;
      });
    } finally {
      runInAction(() => {
        PendingQueries.remove("@configLoader", queryId);
      });
    }
  };
}

export default new Config();
