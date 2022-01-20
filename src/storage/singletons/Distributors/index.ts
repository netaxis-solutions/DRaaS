import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { t } from "services/Translation";
import { request } from "services/api";
import {
  DistributorItemType,
  DistributorsDataType,
} from "utils/types/distributors";
import {
  deleteNotification,
  errorNotification,
} from "utils/functions/notifications";
import configStore from "../Config";
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
      errorNotification(e);
    }
  };

  deleteDistributors = (
    selectedDistributorsIds: string[],
    callback?: () => void,
  ) => {
    Promise.all(
      selectedDistributorsIds.map(uuid =>
        request({
          route: `${configStore.config.draasInstance}/distributors/${uuid}`,
          loaderName: "@deleteDistributors",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Distributors were successfully deleted!"));
        callback && callback();
      })
      .catch(e => errorNotification(e));
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
