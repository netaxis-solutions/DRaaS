import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import Login from "../Login";
import configStore from "../Config";
import TablePagination from "../TablePagination";

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

  getSubscriptionsData = (
    tenantId: string = Login.getExactLevelReference("tenant"),
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions`,
      loaderName: "@getSubscriptionsData",
      payload: {
        params: {
          page: TablePagination.tablePageCounter,
          page_size: TablePagination.tablePageSize,
          search: TablePagination.search,
        },
      },
    })
      .then((data: AxiosResponse<SubscriptionsDataType>) => {
        runInAction(() => {
          TablePagination.getTableConfig(data.data);
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
    tenantId: string = Login.getExactLevelReference("tenant"),
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
    tenantId: string = Login.getExactLevelReference("tenant"),
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

  deleteSubscription = (
    tenantId: string = Login.getExactLevelReference("tenant"),
    subscriptionId: string,
    successCallback: () => void,
    finalCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantId}/subscriptions/${subscriptionId}`,
      loaderName: "@deleteSubscriptions",
      method: "delete",
    })
      .then(() => {
        deleteNotification(t("Subscription were successfully deleted!"));
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
      })
      .finally(() => {
        finalCallback && finalCallback();
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
