import { makeObservable, observable, runInAction, action } from "mobx";
import { AxiosResponse } from "axios";

import Login from "../Login";
import configStore from "../Config";

import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";

class SipTrunksStore {
  sipTrunksGroup: any = [];
  specificSipTrunk: any = [];

  constructor() {
    makeObservable(this, {
      sipTrunksGroup: observable,
      specificSipTrunk: observable,

      getSipTrunksGroup: action,
      getSpecificSipTrunk: action,
    });
  }

  getSipTrunksGroup = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID?: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/trunkgroups`,
      loaderName: "@getSubscriptionLicensesData",
    })
      .then(({ data }: AxiosResponse<any>) => {
        runInAction(() => {
          this.sipTrunksGroup = data.trunkgroups;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.sipTrunksGroup = [];
        });
      });
  };

  getSpecificSipTrunk = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    trunkID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/trunkgroups/${trunkID}`,
      loaderName: "@getSubscriptionLicensesData",
    })
      .then(({ data }: AxiosResponse<any>) => {
        runInAction(() => {
          this.specificSipTrunk = data;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.specificSipTrunk = [];
        });
      });
  };
}

export default new SipTrunksStore();
