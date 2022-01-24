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
      this.numbers = [];
      console.log(e, "e");
    }
  };

  getNumbersInventoryData = async (
    tenantID: string,
    subscriptionID: string,
  ) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/number_inventory`,
        loaderName: "@getNumbersData",
      });
      const numbers = data.data.numbers;

      runInAction(() => {
        this.numbers = numbers;
        console.log(this.numbers, "asdsafasdfsd");
      });
    } catch (e) {
      this.numbers = [];
      console.log(e, "ААААААААА");
    }
  };

  addNumber = async (
    tenantID: string,
    subscriptionID: string,
    payload: any = {
      countryCode: "+31",
      ranges: [[302869750, 302869751]],
    },
  ) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/numbers`,
        loaderName: "@postNumber",
        method: "post",
        payload,
      });
      runInAction(() => {
        this.getNumbersData(tenantID, subscriptionID);
        console.log(this.numbers, "asdsafasdfsd");
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
  testRequest = async () => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/number_inventory/suggestion?range_size=10&number_type=geo&country_code=31&number_of_results=10`,
        loaderName: "@postNumber",
      });
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new NumbersStore();
