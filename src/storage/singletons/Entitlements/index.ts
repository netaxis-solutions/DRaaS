import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import { request } from "services/api";
import {
  EntitlementsListType,
  EntitlementData,
  EntitlementsTypeListType,
  CreateNewEntitlement,
} from "utils/types/entitlements";

class SubscriptionEntitlementsStore {
  entitlements: EntitlementsListType[] = [];
  entitlementTypes: EntitlementsTypeListType[] = [];
  filteredDataEntitlementTypes: EntitlementsTypeListType[] = [];

  constructor() {
    makeObservable(this, {
      entitlements: observable.ref,
      entitlementTypes: observable.ref,
      filteredDataEntitlementTypes: observable.ref,
    });
  }

  getEntitlements = async (tenantID: string, subscriptionID: string) => {
    try {
      const { data }: AxiosResponse<EntitlementData> = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/entitlements`,
        loaderName: "@getSubscriptionEntitlementsData",
      });

      const entitlements = data.entitlements;

      runInAction(() => {
        this.entitlements = entitlements;
      });
    } catch (e) {
      console.log(e, "e");
    }
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
       *  Can't add type because have additional nesting "data"
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
