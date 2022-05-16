import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { chain } from "lodash";

import Login from "../Login";
import configStore from "../Config";
import LicensesStore from "../Licenses";

import { t } from "services/Translation";
import { request } from "services/api";
import { LicenseType } from "utils/types/licenses";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";

class SubscriptionLicensesStore {
  licenses: LicenseType[] = [];

  constructor() {
    makeObservable(this, {
      licenses: observable.ref,
    });
  }

  // https://docs.netaxis.solutions/draas/provisioning/api/06_licenses.html#get-the-licenses-of-a-subscription
  // Get All Licenses in Subscription. Subscription level -> Licenses table
  getSubscriptionLicensesData = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID?: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/licenses`,
      loaderName: "@getSubscriptionLicensesData",
    })
      .then((data: AxiosResponse<any>) => {
        const licenses = data?.data;

        const formatLicenses: LicenseType[] = chain(licenses)
          .map((value, key) => ({
            name: String(key),
            inUse:
              Number(value.inUse) || Number(value.inUse) === 0
                ? value.inUse
                : "",
            assigned: Number(value.assigned),
          }))
          .value();

        runInAction(() => {
          this.licenses = formatLicenses;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.licenses = [];
        });
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/06_licenses.html#update-the-license-limits-of-a-subscription
  // Update Licenses in Subscription Licenses table
  editLicense = async ({
    tenantID = Login.getExactLevelReference("tenant"),
    subscriptionID,
    payload,
  }: {
    tenantID: string;
    subscriptionID: string;
    payload: LicenseType;
  }) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/licenses`,
      loaderName: "@putSubscriptionLicensesData",
      method: "put",
      payload: {
        [payload.name]: {
          assigned: Number(payload.assigned),
        },
      },
    })
      .then(() => {
        successNotification(t("License was successfully edited!"));
        LicensesStore.getSubscriptionLicensesData(tenantID, subscriptionID);
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new SubscriptionLicensesStore();
