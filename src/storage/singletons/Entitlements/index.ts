import { computed, makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";
import {
  EntitlementsListType,
  EntitlementData,
  EntitlementsTypeListType,
  CreateNewEntitlement,
  AvailableEntitlements,
} from "utils/types/entitlements";
import { errorNotification } from "utils/functions/notifications";

class SubscriptionEntitlementsStore {
  entitlements: Array<EntitlementsListType> = [];
  entitlementTypes: Array<EntitlementsTypeListType> = [];
  filteredDataEntitlementTypes: Array<EntitlementsTypeListType> = [];
  availableEntitlements: AvailableEntitlements = {};

  constructor() {
    makeObservable(this, {
      entitlements: observable.ref,
      entitlementTypes: observable.ref,
      filteredDataEntitlementTypes: observable.ref,
      getAvailableEntitlements: computed,
    });
  }

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
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
        loaderName: "@getSubscriptionEntitlementsData",
        method: "post",
        payload,
      });
      this.getEntitlementTypes();
    } catch (e) {
      console.log(e);
    }
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
      console.log(e, "e");
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
