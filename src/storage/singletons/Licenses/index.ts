import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { chain } from "lodash";

import { request } from "services/api";
import configStore from "../Config";
import {
  SubscriptionLicenseType,
  MsTeamsUsersType,
} from "utils/types/licenses";
import LicensesStore from "../Licenses";

class SubscriptionLicensesStore {
  licenses: SubscriptionLicenseType[] | MsTeamsUsersType[] = [];

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
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/licenses`,
        loaderName: "@getSubscriptionLicensesData",
      });

      const licenses = data?.data;

      const formatLicenses: MsTeamsUsersType[] = chain(licenses)
        .map((value, key) => ({
          name: String(key),
          inUse:
            Number(value.inUse) || Number(value.inUse) === 0 ? value.inUse : "",
          assigned: Number(value.assigned),
        }))
        .value();

      runInAction(() => {
        this.licenses = formatLicenses;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  editLicense = async ({
    tenantID,
    subscriptionID,
    payload,
  }: {
    tenantID: string;
    subscriptionID: string;
    payload: MsTeamsUsersType;
  }) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/licenses`,
        loaderName: "@putSubscriptionLicensesData",
        method: "put",
        payload: {
          [payload.name]: {
            assigned: Number(payload.assigned),
          },
        },
      });

      LicensesStore.getSubscriptionLicensesData(tenantID, subscriptionID);
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new SubscriptionLicensesStore();
