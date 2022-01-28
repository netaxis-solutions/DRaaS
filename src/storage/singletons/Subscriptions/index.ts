import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import Login from "../Login";
import configStore from "../Config";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  SubscriptionItemType,
  SubscriptionsDataType,
  TCreateSubscriptionPayload,
} from "utils/types/subscriptions";
import {
  deleteNotification,
  errorNotification,
  successNotification,
} from "utils/functions/notifications";

class SubscriptionsStore {
  subscriptions: Array<SubscriptionItemType> = [];

  constructor() {
    makeAutoObservable(this, {
      subscriptions: observable.ref,
    });
  }

  getSubscriptionsData = (tenantId: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions`,
      loaderName: "@getSubscriptionsData",
    })
      .then((data: AxiosResponse<SubscriptionsDataType>) => {
        runInAction(() => {
          this.subscriptions = data.data.subscriptions;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.subscriptions = [];
        });
      });
  };

  cleanSubscriptionHistory = () => {
    this.subscriptions = [];
  };

  createSubscription = (
    tenantId: string,
    payload: TCreateSubscriptionPayload,
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions`,
      loaderName: "@postSubscriptionsData",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Subscription was successfully created!"));
        this.getSubscriptionsData(tenantId);
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  deleteSubscriptions = (
    tenantId: string,
    selectedSubscriptionsIds: string[],
    callback?: () => void,
  ) => {
    Promise.all(
      selectedSubscriptionsIds.map(subscriptionId =>
        request({
          route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}`,
          loaderName: "@deleteSubscriptions",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Subscriptions were successfully deleted!"));
      })
      .catch(e => {
        errorNotification(e);
      })
      .finally(() => {
        callback && callback();
      });
  };

  get subscriptionRights() {
    return Login.userRights.filter((el: any) =>
      el.name.includes("subscriptions"),
    );
  }

  get isSubscriptionsCreatable() {
    return this.subscriptionRights.find(
      (el: any) => el.name === "tenants.instance.subscriptions.create",
    )?.allowed;
  }

  get isSubscriptionsDeletable() {
    return this.subscriptionRights.find(
      (el: any) => el.name === "tenants.instance.subscriptions.instance.delete",
    )?.allowed;
  }

  get isSubscriptionsEditable() {
    return this.subscriptionRights.find(
      (el: any) => el.name === "tenants.instance.subscriptions.instance.edit",
    )?.allowed;
  }
}

export default new SubscriptionsStore();
