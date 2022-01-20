import { makeAutoObservable, observable, runInAction } from "mobx";

import { t } from "services/Translation";
import { request } from "services/api";
import { TenantItemType } from "utils/types/tenant";
import {
  deleteNotification,
  errorNotification,
} from "utils/functions/notifications";
import configStore from "../Config";
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
    request({
      route: `${configStore.config.draasInstance}/tenants`,
    })
      .then((data: { data: TTenantsData }) => {
        runInAction(() => {
          this.tenants = data.data.tenants;
        });
      })
      .catch(e => {
        errorNotification(e);
      })
      .finally(() => {
        PendingQueries.remove("@getTenantsData", queryID);
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
  };

  deleteTenants = (selectedTenantsIds: string[], callback?: () => void) => {
    Promise.all(
      selectedTenantsIds.map(uuid =>
        request({
          route: `${configStore.config.draasInstance}/tenants/${uuid}`,
          loaderName: "@deleteTenants",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Tenants were successfully deleted!"));
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  get tenantRights() {
    return Login.userRights.filter((el: any) => el.name.includes("tenants"));
  }

  get isTenantsReadable() {
    return this.tenantRights.find(
      (el: any) => el.name === "tenants.instance.read",
    )?.allowed;
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
