import { makeObservable } from "mobx";

import configStore from "../Config";
import ResellersStore from "../Resellers";
import TenantsStore from "../Tenants";
import DistributorsStore from "../Distributors";

import {
  TAddTenantValues,
  TCreateTenant,
  TDeleteTenant,
  TEditTenantPayload,
} from "utils/types/tenant";
import { request } from "services/api";

class TenantStore {
  constructor() {
    makeObservable(this, {});
  }

  get ownerOptions() {
    return [
      ...DistributorsStore?.distributors?.map(distributor => ({
        label: distributor.name,
        value: `${distributor.uuid}*distributor`,
        groupBy: `Distributor`,
      })),
      ...ResellersStore?.resellers?.map(reseller => ({
        label: reseller.name,
        value: `${reseller.uuid}*reseller`,
        groupBy: `Reseller`,
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
      const result = await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}`,
        loaderName: "@getSpecificTenant",
      });
      return result.data;
    } catch (e) {
      console.log(e);
    }
  };
  editTenant = async ({
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    payload: TEditTenantPayload;
    callback?: () => void;
  }) => {
    try {
      const formattedPayload = {
        ...payload,
        markup: markup ? Number(markup) : 0,
      };
      await request({
        route: `${configStore.config.draasInstance}/tenants/${uuid}`,
        loaderName: "@editTenant",
        method: "put",
        payload: formattedPayload,
      });
      TenantsStore.getTenantsData();
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new TenantStore();
