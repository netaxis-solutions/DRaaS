import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";
import { t } from "services/Translation";
import {
  deleteNotification,
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import { PostalCode, Location } from "utils/types/locations";

class SubscriptionProfileStore {
  subscriptionLocations: Array<Location> = [];
  postalCodes: Array<PostalCode> = [];
  postalCodesOptions: Array<{ value: number; label: string }> = [];

  constructor() {
    makeAutoObservable(this, {
      subscriptionLocations: observable.ref,
    });
  }

  getSubscriptionLocations = (tenantId: string, subscriptionId: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}/locations`,
      loaderName: "@getSubscriptionLocations",
    })
      .then((data: AxiosResponse<any>) => {
        runInAction(() => {
          this.subscriptionLocations = data.data.locations;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.subscriptionLocations = [];
        });
      });
  };

  changeSubscriptionProfile = (
    tenantId: string,
    subscriptionId: string,
    payload: {
      name?: string;
      billingId?: string;
      suspensionProfileId?: number;
    },
    successCallback?: () => void,
    errorCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}`,
      loaderName: "@changeSubscriptionProfile",
      method: "put",
      payload,
    })
      .then(() => {
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
        errorCallback && errorCallback();
      });
  };

  getPostalCodes = () => {
    request({
      route: `${configStore.config.draasInstance}/public/postal_codes`,
      loaderName: "@getPostalCodes",
    })
      .then((data: AxiosResponse<{ postalCodes: Array<PostalCode> }>) => {
        const postalCodes = data.data.postalCodes;

        runInAction(() => {
          this.postalCodes = postalCodes;
          this.postalCodesOptions = postalCodes.map(({ code, city, id }) => ({
            value: id,
            label: `${city} ${code}`,
          }));
        });
      })
      .catch(() => {
        this.postalCodes = [];
      });
  };

  postSubscriptionLocation = (
    tenantId: string,
    subscriptionId: string,
    payload: {
      street: string;
      number: string;
      postbox?: string;
      postalCodeId: number;
    },
    successCallback?: () => void,
    errorCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}/locations`,
      loaderName: "@postSubscriptionLocation",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Location successfully added"));
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
        errorCallback && errorCallback();
      });
  };

  deleteSubscriptionLocations = (
    tenantId: string,
    subscriptionId: string,
    selectedLocationsIds: number[],
    callback?: () => void,
  ) => {
    Promise.all(
      selectedLocationsIds.map(locationId =>
        request({
          route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}/locations/${locationId}`,
          loaderName: "@deleteSubscriptionLocations",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Locations were successfully deleted!"));
        callback && callback();
      })
      .catch(e => errorNotification(e));
  };

  modifySubscriptionLocations = (
    tenantId: string,
    subscriptionId: string,
    locationId: number,
    payload: Partial<{
      street: string;
      number: string;
      postbox: string;
      postalCodeId: number;
    }>,
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}/locations/${locationId}`,
      loaderName: "@modifySubscriptionLocations",
      method: "put",
      payload,
    })
      .then(() => {
        successNotification(t("Location were successfully changed!"));
        callback && callback();
      })
      .catch(e => errorNotification(e));
  };
}

export default new SubscriptionProfileStore();
