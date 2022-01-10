import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";
import {
  EntitlementsListType,
  EntitlementData,
} from "utils/types/entitlements";

class SubscriptionEntitlementsStore {
  entitlements: EntitlementsListType[] = [];

  constructor() {
    makeObservable(this, {
      entitlements: observable.ref,
    });
  }

  getEntitlements = async (tenantID: string, subscriptionID: string) => {
    try {
      const { data }: AxiosResponse<EntitlementData> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
        loaderName: "@getSubscriptionEntitlementsData",
      });

      const entitlements = data.entitlements;

      runInAction(() => {
        this.entitlements = entitlements;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new SubscriptionEntitlementsStore();
