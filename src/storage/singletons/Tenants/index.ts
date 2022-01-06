import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import { TenantItemType } from "utils/types/tenant";
import configStore from "../Config";
import TenantStore from "../Tenant";
// import Tenant from "../Tenant";
import PendingQueries from "../PendingQueries";
import Login from "../Login";

type TTenantsData = {
  tenants: Array<TenantItemType>;
};
class TenantsStore {
  tenants: Array<TenantItemType> = [];

  constructor() {
    makeAutoObservable(this, {
      tenants: observable.ref,
    });
  }

  getTenantsData = async () => {
    const queryID = PendingQueries.add("@getTenantsData", null);
    try {
      const data: AxiosResponse<TTenantsData> = await request({
        route: `${configStore.config.draasInstance}/tenants`,
      });

      // const tenants = await Promise.allSettled(
      //   data.data.tenants.map(async tenant => {
      //     const subscriptions = await Tenant.getTenantSubscriptions({
      //       tenantID: tenant.uuid,
      //     });

      //     return {
      //       ...tenant,
      //       subscriptions,
      //     };
      //   }),
      // );
      // const tenantsValue = await tenants.reduce((prev, { status, ...rest }) => {
      //   status === "fulfilled" && prev.push(rest["value" as keyof object]);
      //   return prev;
      // }, []);

      runInAction(() => {
        this.tenants = data.data.tenants;
      });
      PendingQueries.remove("@getTenantsData", queryID);
    } catch (e) {
      console.log(e, "e");
      PendingQueries.remove("@getTenantsData", queryID);
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

  get tenantRights() {
    return Login.userRights.filter((el: any) => el.name.includes("tenants"));
  }

  get isTenantsCreatable() {
    return this.tenantRights.find((el: any) => el.name === "tenants.create")
      ?.allowed;
  }

  get isTenantsEditable() {
    return this.tenantRights.find(
      (el: any) => el.name === "tenants.instance.edit",
    )?.allowed;
  }

  get isTenantsDeletable() {
    return this.tenantRights.find((el: any) => el.name === "tenants.delete")
      ?.allowed;
  }
}

export default new TenantsStore();
