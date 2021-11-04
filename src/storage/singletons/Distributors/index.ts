import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";
import {
  DistributorItemType,
  DistributorsDataType
} from "utils/types/distributors";

class DistributorsStore {
  distributors: Array<DistributorItemType> = [];

  constructor() {
    makeObservable(this, {
      distributors: observable.ref
    });
  }

  getDistributorsData = async () => {
    try {
      const data: AxiosResponse<DistributorsDataType> = await request({
        route: `${configStore.config.draasInstance}/distributors`,
        loaderName: "@getDistributorsData"
      });
      const distributors = data.data.distributors;

      runInAction(() => {
        this.distributors = distributors;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new DistributorsStore();
