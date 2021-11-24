import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import { AnyKeyStringValueObjectType as TenantType } from "utils/types/common";
import configStore from "../Config";

type TTenantsData = {
  tenants: Array<TenantType>;
};
class TenantsStore {
  tenants: Array<TenantType> = [];

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
}

export default new TenantsStore();
