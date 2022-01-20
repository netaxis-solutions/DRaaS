import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";
import {
  EntitlementsListType,
  EntitlementData,
} from "utils/types/entitlements";
import { errorNotification } from "utils/functions/notifications";

class SubscriptionEntitlementsStore {
  entitlements: EntitlementsListType[] = [];

  constructor() {
    makeObservable(this, {
      entitlements: observable.ref,
    });
  }

  getEntitlements = (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
      loaderName: "@getSubscriptionEntitlementsData",
    })
      .then(({ data }: AxiosResponse<EntitlementData>) => {
        runInAction(() => {
          this.entitlements = data.entitlements;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new SubscriptionEntitlementsStore();
