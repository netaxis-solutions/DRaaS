import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";
import {
  SubscriptionItemType,
  SubscriptionsDataType,
} from "utils/types/subscriptions";

class SubscriptionsStore {
  subscriptions: Array<SubscriptionItemType> = [];

  constructor() {
    makeObservable(this, {
      subscriptions: observable.ref,
    });
  }

  getSubscriptionsData = async (tenantId: string) => {
    try {
      const data: AxiosResponse<SubscriptionsDataType> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions`,
        loaderName: "@getSubscriptionsData",
      });
      const subscriptions = data.data.subscriptions;

      runInAction(() => {
        this.subscriptions = subscriptions;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new SubscriptionsStore();
