import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { chain } from "lodash";

import configStore from "../Config";
import LicensesStore from "../Licenses";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  SubscriptionLicenseType,
  MsTeamsUsersType,
} from "utils/types/licenses";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";

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
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/licenses`,
      loaderName: "@getSubscriptionLicensesData",
    })
      .then((data: AxiosResponse<any>) => {
        const licenses = data?.data;

        const formatLicenses: MsTeamsUsersType[] = chain(licenses)
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

  editLicense = async ({
    tenantID,
    subscriptionID,
    payload,
  }: {
    tenantID: string;
    subscriptionID: string;
    payload: MsTeamsUsersType;
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
