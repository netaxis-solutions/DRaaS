import { makeObservable, observable, runInAction } from "mobx";
import mergeWith from "lodash/mergeWith";

import PendingQueries from "storage/singletons/PendingQueries";
import { backupConfig } from "utils/constants/app.config.assets";
import { ConfigType } from "utils/types/config";
import { customizer } from "utils/functions/config";

class Config {
  config = {};

  get formattedConfig() {
    return mergeWith({}, backupConfig, this.config, customizer);
  }
  constructor() {
    makeObservable(this, {
      config: observable.ref,
    });
  }

  getConfig = async (): Promise<void> => {
    const queryId = PendingQueries.add("@configLoader", null);

    try {
      const data = await fetch("/configs/default/app.config.json");
      const jsonData: ConfigType = await data.json();

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
