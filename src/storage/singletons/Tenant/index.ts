import { makeObservable } from "mobx";

import { request } from "services/api";

import { TCreateTenant } from "utils/types/tenant";
import configStore from "../Config";

class TenantStore {
  constructor() {
    makeObservable(this, {});
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
