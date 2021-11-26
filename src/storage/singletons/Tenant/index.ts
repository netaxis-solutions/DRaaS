import { makeObservable } from "mobx";

import { request } from "services/api";

import { TCreateTenant } from "utils/types/tenant";
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
}

export default new TenantStore();
