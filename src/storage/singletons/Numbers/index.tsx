import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { request } from "services/api";
import configStore from "../Config";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import {
  AssignReservedPayload,
  CountryCodeWithNSN,
  CountryCodeWithRanges,
  NumberRangesType,
  NumberSuggestionsType,
  PhoneNumberType,
  ReservedNumbers,
} from "utils/types/numbers";
import { t } from "services/Translation";

class NumbersStore {
  numbers: Array<PhoneNumberType> = [];
  numberInventory: Array<PhoneNumberType> = [];
  numberInventoryRanges: Array<NumberRangesType> = [];
  numberSuggestions: NumberSuggestionsType = [];
  reservedNumbers: ReservedNumbers[] = [];
  freeNumbers: Array<string> = [];
  constructor() {
    makeObservable(this, {
      numbers: observable.ref,
      numberInventory: observable.ref,
      numberInventoryRanges: observable.ref,
      numberSuggestions: observable.ref,
      reservedNumbers: observable.ref,
      freeNumbers: observable.ref,
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

  getFreeNumbers = (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/free_numbers`,
      loaderName: "@getFreeNumbers",
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.freeNumbers = data.data.freeNumbers;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getNumbersInventoryRanges = async () => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/public/number_inventory/ranges`,
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

  getReservedNumbers = async (tenantID: string, subscriptionID: string) => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/number_inventory`,
        loaderName: "@getReservedNumbersData",
        payload: { params: { status: "reserved" } },
      });
      const numbers = data.data.numbers;

      runInAction(() => {
        this.reservedNumbers = numbers;
      });
    } catch (e) {
      this.reservedNumbers = [];
    }
  };

  addNumber = (
    tenantID: string,
    subscriptionID: string,
    payload: CountryCodeWithRanges,
    successCallback?: () => void,
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
        successNotification(
          t("numbers and ranges were assigned", {
            numberAmount:
              payload.ranges.length *
              (payload.ranges[0][1] - payload.ranges[0][0] + 1),
            rangesAmount: payload.ranges.length,
          }),
        );
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  addReservedNumber = (
    tenantID: string,
    subscriptionID: string,
    payload: AssignReservedPayload,
    successCallback?: () => void,
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
        this.getReservedNumbers(tenantID, subscriptionID);
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getNumberSuggestions = (
    params: {
      numberType: string;
      countryCode: string;
      rangeSize: string;
      numberOfResults: string;
    },
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/public/number_inventory/suggestion`,
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
        successNotification(
          t("numbers and ranges were deleted", {
            numberAmount: numbers.length,
          }),
        );
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
