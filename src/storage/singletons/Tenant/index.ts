import { TEditTenantPayload } from 'utils/types/tenant';
import { makeObservable } from "mobx";

import { request } from "services/api";

import { TCreateTenant, TDeleteTenant } from "utils/types/tenant";
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

  editTenant = async ({
    payload: { uuid, ...payload },
    callback,
  }: {
    payload: TEditTenantPayload;
    callback?: () => void;
  }) => {
    try {
      payload.markup = payload.markup
        ? Number(payload.markup)
        : 0;
      await request({
        route: `${configStore.config.draasInstance}/tenants/${uuid}`,
        loaderName: "@editTenant",
        method: "put",
        payload,
      });
      TenantsStore.getTenantsData();
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new TenantStore();
