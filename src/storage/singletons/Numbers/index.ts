import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";

class NumbersStore {
  numbers: Array<any> = [];

  constructor() {
    makeObservable(this, {
      numbers: observable.ref,
    });
  }

  getNumbersData = async (tenantID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/entitlements`,
        loaderName: "@getNumbersData",
        payload: { tenantID },
      });
      const numbers = data.data.subscriptions;
      console.log(data);
      runInAction(() => {
        this.numbers = numbers;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  addNumbersData = async (tenantID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/entitlements`,
        loaderName: "@getNumbersData",
        method: "post",
        payload: {
          entitlement: 10,
          externalReference: "sdfsdf",
          licenseModelId: "27",
        },
      });
      const numbers = data.data.subscriptions;
      console.log(data);
      runInAction(() => {
        this.numbers = numbers;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new NumbersStore();
