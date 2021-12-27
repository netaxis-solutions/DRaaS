import { makeObservable } from "mobx";

import { request } from "services/api";

import {
  TAddTenantValues,
  TCreateTenant,
  TDeleteTenant,
} from "utils/types/tenant";
import configStore from "../Config";
import ResellersStore from "../Resellers";
import TenantsStore from "../Tenants";

class TenantStore {
  constructor() {
    makeObservable(this, {});
  }

  get ownerOptions() {
    return [
      ...TenantsStore.tenants.map(tenant => ({
        label: tenant.name,
        value: `${tenant.uuid}*distributor`,
      })),
      ...ResellersStore.resellers.map(reseller => ({
        label: reseller.name,
        value: `${reseller.uuid}*reseller`,
      })),
    ];
  }

  createTenant = async ({ payload, callback }: TCreateTenant) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants`,
        loaderName: "@createTenant",
        method: "post",
        payload,
      });
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };

  deleteTenant = async ({ uuid, callback }: TDeleteTenant) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${uuid}`,
        loaderName: "@deleteDistributor",
        method: "delete",
      });
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };

  getTenantSubscriptions = async ({
    tenantID,
  }: {
    tenantID: string;
  }): Promise<Array<object> | undefined> => {
    try {
      const result: { data: { subscriptions: Array<object> } } = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions`,
      });
      return await result.data.subscriptions;
    } catch (e) {
      console.log(e);
    }
  };

  getSpecificTenant = async ({
    tenantID,
  }: {
    tenantID: string;
  }): Promise<TAddTenantValues | undefined> => {
    try {
      const result: { data: TAddTenantValues } = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}`,
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new TenantStore();
