import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import {
  DistributorItemType,
  DistributorsDataType,
} from "utils/types/distributors";
import configStore from "../Config";
import DistributorStore from "../Distributor";

class DistributorsStore {
  distributors: Array<DistributorItemType> = [];

  constructor() {
    makeObservable(this, {
      distributors: observable.ref,
    });
  }

  getDistributorsData = async () => {
    try {
      const data: AxiosResponse<DistributorsDataType> = await request({
        route: `${configStore.config.draasInstance}/distributors`,
        loaderName: "@getDistributorsData",
      });
      const distributors = data.data.distributors;

      runInAction(() => {
        this.distributors = distributors;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  deleteDistributors = async (
    selectedDistributorsIds: string[],
    callback?: () => void,
  ) => {
    try {
      await Promise.all(
        selectedDistributorsIds.map(uuid =>
          DistributorStore.deleteDistributor({ uuid }),
        ),
      );
    } catch (e) {
      console.log("e", e);
    } finally {
      callback && callback();
    }
  };

  get distributorsForResellerCreation() {
    return this.distributors.map((el: DistributorItemType) => ({
      label: el.name,
      value: el.name,
    }));
  }
}

export default new DistributorsStore();
