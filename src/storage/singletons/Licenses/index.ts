import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";
import {
  SubscriptionLicenseType,
  MsTeamsUsersType,
} from "utils/types/licenses";
import LicensesStore from "../Licenses";

class SubscriptionLicensesStore {
  licenses: SubscriptionLicenseType[] | MsTeamsUsersType[] = [];
  entitlements!: any;

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

      runInAction(() => {
        this.licenses = [licenses.msteams_users];
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
          msteams_users: {
            assigned: Number(payload.assigned),
          },
        },
      });

      LicensesStore.getSubscriptionLicensesData(tenantID, subscriptionID);
    } catch (e) {
      console.log(e, "e");
    }
  };

  getEntitlements = async (tenantID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/entitlements`,
        loaderName: "@getSubscriptionLicensesData",
      });

      const entitlements = data.data.entitlements;

      runInAction(() => {
        this.entitlements = entitlements;
        console.log("ENTITLEMENTS!!!", this.entitlements);
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new SubscriptionLicensesStore();
