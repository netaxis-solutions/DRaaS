import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";
// import { SubscriptionLicensesParams } from "utils/types/subscriptionLicenses";

class SubscriptionLicensesStore {
  licenses: any;

  constructor() {
    makeObservable(this, {
      licenses: observable.ref,
    });
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
