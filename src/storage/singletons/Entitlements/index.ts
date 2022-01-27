import { computed, makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import {
  EntitlementsListType,
  EntitlementData,
  EntitlementsTypeListType,
  CreateNewEntitlement,
  AvailableEntitlements,
} from "utils/types/entitlements";
import {
  deleteNotification,
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import { t } from "services/Translation/index";
import { request } from "services/api";

class SubscriptionEntitlementsStore {
  entitlements: Array<EntitlementsListType> = [];
  entitlementTypes: Array<EntitlementsTypeListType> = [];
  filteredDataEntitlementTypes: Array<EntitlementsTypeListType> = [];
  availableEntitlements: AvailableEntitlements = {};
  entitlementDeleteModalData!: EntitlementsListType;

  constructor() {
    makeObservable(this, {
      entitlements: observable.ref,
      entitlementTypes: observable.ref,
      filteredDataEntitlementTypes: observable.ref,
      getAvailableEntitlements: computed,
      entitlementDeleteModalData: observable.ref,
    });
  }

  setEntitlementDeleteModalData = (payload: EntitlementsListType) => {
    this.entitlementDeleteModalData = payload;
  };

  getEntitlements = (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
      loaderName: "@getSubscriptionEntitlementsData",
    })
      .then(({ data }: AxiosResponse<EntitlementData>) => {
        runInAction(() => {
          this.entitlements = data.entitlements;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.entitlements = [];
        });
      });
  };

  get getAvailableEntitlements() {
    return this.entitlements.reduce(
      (
        availableEntitlements: AvailableEntitlements,
        curr: EntitlementsListType,
      ) => {
        return {
          ...availableEntitlements,
          [curr.countryCode]: {
            ...availableEntitlements[curr.countryCode],
            [curr.numberType]: curr.entitlement - curr.assigned,
          },
        };
      },
      {},
    );
  }
  setAvailable = (availableEntitlements: AvailableEntitlements) => {
    this.availableEntitlements = availableEntitlements;
  };
  createEntitlement = async (
    tenantID: string,
    subscriptionID: string,
    payload: CreateNewEntitlement,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
      loaderName: "@getSubscriptionEntitlementsData",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Entitlement was successfully created!"));
        this.getEntitlementTypes();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  editEntitlement = (
    tenantID: string,
    subscriptionID: string,
    entitlementID: string,
    payload: { entitlement: string; entitlementID: string },
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements/${entitlementID}`,
      loaderName: "@putEntitlementData",
      method: "put",
      payload: { entitlement: Number(payload.entitlement) },
    })
      .then(() => {
        successNotification(t("Entitlement was successfully edited!"));
        this.getEntitlements(tenantID, subscriptionID);
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  deleteEntitlement = (
    tenantID: string,
    subscriptionID: string,
    selectedEntitlementsIds: string[],
    callback?: () => void,
  ) => {
    Promise.allSettled(
      selectedEntitlementsIds.map(id => {
        console.log("ID STORE", id);

        request({
          route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements/${id}`,
          loaderName: "@deleteEntitlements",
          method: "delete",
        });
      }),
    )
      .then(() => {
        deleteNotification(t("Entitlements were successfully deleted!"));
        this.getEntitlements(tenantID, subscriptionID);
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  getEntitlementTypes = async () => {
    try {
      /*  Note
       *  Type any was used for improve the flexibility of using this feature
       */
      const { data }: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/ref_data/entitlement_types`,
        loaderName: "@getEntitlementsTypeData",
      });

      const entitlementTypes = data.entitlementTypes;

      runInAction(() => {
        this.entitlementTypes = entitlementTypes;
      });
    } catch (e) {
      errorNotification(e);
    }
  };

  filteredEntitlementType = () => {
    const filteredData: EntitlementsTypeListType[] = this.entitlementTypes?.filter(
      (type: EntitlementsTypeListType) => {
        return !this.entitlements?.some((entitlement: EntitlementsListType) => {
          return entitlement.entitlementType === type.id;
        });
      },
    );
    runInAction(() => {
      this.filteredDataEntitlementTypes = filteredData;
    });
  };
}

export default new SubscriptionEntitlementsStore();
