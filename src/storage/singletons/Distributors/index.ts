import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import {
  DistributorItemType,
  DistributorsDataType,
} from "utils/types/distributors";
import configStore from "../Config";
import DistributorStore from "../Distributor";
import Login from "../Login";

class DistributorsStore {
  distributors: Array<DistributorItemType> = [];

  constructor() {
    makeAutoObservable(this, {
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

  get distributorRights() {
    return Login.userRights.filter((el: any) =>
      el.name.includes("distributors"),
    );
  }

  get isDistributorsCreatable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.create",
    )?.allowed;
  }

  get isDistributorsEditable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.instance.edit",
    )?.allowed;
  }

  get isDistributorDeletable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.instance.delete",
    )?.allowed;
  }
}

export default new DistributorsStore();
