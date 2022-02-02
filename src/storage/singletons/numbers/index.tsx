import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { request } from "services/api";
import configStore from "../Config";
import { errorNotification } from "utils/functions/notifications";
import {
  CountryCodeWithNSN,
  CountryCodeWithRanges,
  NumberRangesType,
  NumberSuggestionsType,
  PhoneNumberType,
} from "utils/types/numbers";

class NumbersStore {
  numbers: Array<PhoneNumberType> = [];
  numberInventory: Array<PhoneNumberType> = [];
  numberInventoryRanges: Array<NumberRangesType> = [];
  numberSuggestions: NumberSuggestionsType = [];

  constructor() {
    makeObservable(this, {
      numbers: observable.ref,
      numberInventory: observable.ref,
      numberInventoryRanges: observable.ref,
      numberSuggestions: observable.ref,
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
      });
    } catch (e) {
      this.clearNumbers();
      errorNotification(e);
    }
  };

  getNumbersInventoryRanges = async () => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/number_inventory/ranges`,
        loaderName: "@getNumbersData",
      });
      const ranges = data.data.ranges;

      runInAction(() => {
        this.numberInventoryRanges = ranges;
      });
    } catch (e) {
      this.numberInventoryRanges = [];
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
        this.numberInventory = numbers;
      });
    } catch (e) {
      this.numbers = [];
    }
  };

  addNumber = (
    tenantID: string = "0da9f1cc-6e8b-4eb8-8191-919b748b2772",
    subscriptionID: string = "58",
    payload: CountryCodeWithRanges = {
      countryCode: "+32",
      ranges: [[25409983, 25409992]],
    },
    successCallback: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/numbers`,
      loaderName: "@postNumber",
      method: "post",
      payload,
    })
      .then(() => {
        runInAction(() => {
          this.getNumbersData(tenantID, subscriptionID);
        });
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getNumberSuggestions = (params: any, callback?: any) => {
    request({
      route: `${configStore.config.draasInstance}/number_inventory/suggestion`,
      payload: { params },
    })
      .then(({ data }: any) => {
        this.numberSuggestions = data.suggestions;
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  deassignNumbers = (
    uuid: string,
    subId: string,
    numbers: CountryCodeWithNSN[],
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${uuid}/subscriptions/${subId}/numbers`,
      method: "delete",
      payload: { numbers },
    })
      .then(({ data }: any) => {
        this.numberSuggestions = data.suggestions;
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  clearNumbers = () => {
    this.numbers = [];
  };
}

export default new NumbersStore();
