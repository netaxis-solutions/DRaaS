import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { request } from "services/api";
import configStore from "../Config";
// import subscription from "levels/subscription";

class NumbersStore {
  numbers: Array<any> = [];

  constructor() {
    makeObservable(this, {
      numbers: observable.ref,
    });
  }

  getNumbersData = async (tenantID: string, subscriptionID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/numbers`,
        loaderName: "@getNumbersData",
      });
      const numbers = data.data.numbers;

      runInAction(() => {
        this.numbers = numbers;
        console.log(this.numbers, "asdsafasdfsd");
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  addNumber = async (
    tenantID: string,
    subscriptionID: string,
    payload: any = {
      countryCode: "+32",
      numbers: [25405220, 25405221],
      ranges: [
        [25405230, 25405239],
        [25405270, 25405279],
      ],
    },
  ) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/numbers`,
        loaderName: "@postNumber",
        method: "post",
        payload,
      });
      const numbers = data.data.numbers;

      runInAction(() => {
        this.numbers = numbers;
        console.log(this.numbers, "asdsafasdfsd");
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new NumbersStore();
