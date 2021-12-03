import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import { TenantItemType } from "utils/types/tenant";
import configStore from "../Config";
import TenantStore from "../Tenant";

type TTenantsData = {
  tenants: Array<TenantItemType>;
};
class TenantsStore {
  tenants: Array<TenantItemType> = [];

  constructor() {
    makeObservable(this, {
      tenants: observable.ref,
    });
  }

  getTenantsData = async () => {
    try {
      const data: AxiosResponse<TTenantsData> = await request({
        route: `${configStore.config.draasInstance}/tenants`,
        loaderName: "@getTenantsData",
      });
      const tenants = data.data.tenants;

      runInAction(() => {
        this.tenants = tenants;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  deleteTenants = async (
    selectedTenantsIds: string[],
    callback?: () => void,
  ) => {
    try {
      await Promise.all(
        selectedTenantsIds.map(uuid => TenantStore.deleteTenant({ uuid })),
      );
    } catch (e) {
      console.log("e", e);
    } finally {
      callback && callback();
    }
  };
}

export default new TenantsStore();
