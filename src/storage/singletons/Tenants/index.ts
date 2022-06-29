import { makeAutoObservable, observable, runInAction, toJS } from "mobx";

import Login from "../Login";
import configStore from "../Config";
import PendingQueries from "../PendingQueries";
import TablePagination from "../TablePagination";
import TableInfiniteScroll from "../TableInfiniteScroll";

import { t } from "services/Translation";
import { request } from "services/api";
import { TenantItemType } from "utils/types/tenant";
import {
  deleteNotification,
  errorNotification,
} from "utils/functions/notifications";

type TTenantsData = {
  tenants: Array<TenantItemType>;
  page: number;
  pages: number;
  results: number;
  next: string;
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
      payload: {
        params: {
          page_size: 24,
          search: TablePagination.search,
        },
      },
    })
      .then((data: { data: TTenantsData }) => {
        runInAction(() => {
          TablePagination.getTableConfig(data.data);
          this.tenants = data.data.tenants;
        });
        TableInfiniteScroll.setNewToken(data.data.next);
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.tenants = [];
        });
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

  getMoreTenants = (token: string, setNewToken: (newToken: string) => void) => {
    request({
      route: `${configStore.config.draasInstance}/tenants`,
      payload: {
        params: {
          page_size: 24,
          next: token,
        },
      },
    })
      .then((data: { data: TTenantsData }) => {
        runInAction(() => {
          TablePagination.getTableConfig(data.data);
          this.tenants = toJS(this.tenants).concat(data.data.tenants);
        });
        setNewToken(data.data.next);
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.tenants = [];
        });
      });
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
    return this.tenantRights.find(
      (el: any) => el.name === "tenants.instance.delete",
    )?.allowed;
  }
}

export default new TenantsStore();
