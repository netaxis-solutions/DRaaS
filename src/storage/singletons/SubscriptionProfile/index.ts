import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";

import { errorNotification } from "utils/functions/notifications";

class SubscriptionProfileStore {
  subscriptionLocations: any = [];

  constructor() {
    makeAutoObservable(this, {
      subscriptionLocations: observable.ref,
    });
  }

  getSubscriptionLocations = (tenantId: string, subscriptionId: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}/locations`,
      loaderName: "@getSubscriptionLocations",
    })
      .then((data: AxiosResponse<any>) => {
        console.log(data.data);
        runInAction(() => {
          this.subscriptionLocations = data.data.locations;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.subscriptionLocations = [];
        });
      });
  };
}

export default new SubscriptionProfileStore();
