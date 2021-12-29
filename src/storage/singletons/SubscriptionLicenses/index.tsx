import { makeObservable, observable, runInAction, computed } from "mobx";
import { AxiosResponse } from "axios";
import { chain } from "lodash";

import { request } from "services/api";
import configStore from "../Config";
import { SubscriptionLicensesType } from "utils/types/subscriptionLicenses";

class SubscriptionLicensesStore {
  licenses!: SubscriptionLicensesType;

  constructor() {
    makeObservable(this, {
      licenses: observable.ref,
      groupByType: computed,
    });
  }

  get groupByType() {
    return chain(this.licenses?.details)
      .groupBy(item => item.type)
      .map((value, key) => ({
        type: key,
        subRows: value,
      }))
      .value();
  }

  getSubscriptionLicensesData = async (
    tenantID: string,
    subscriptionID?: string,
  ) => {
    try {
      const payload = subscriptionID
        ? {
            tenantID,
            params: { subscriptionId: Number(subscriptionID) },
          }
        : { tenantID };

      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/licenses`,
        loaderName: "@getSubscriptionLicensesData",
        payload,
      });

      const licenses = data.data.licenses;

      runInAction(() => {
        this.licenses = licenses;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new SubscriptionLicensesStore();
