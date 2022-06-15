import { makeObservable, observable, action, runInAction } from "mobx";
import { AxiosResponse } from "axios";
import { debounce } from "lodash";

import configStore from "../Config";
import Login from "../Login";

import { ResellerItemType } from "utils/types/resellers";
import { TenantItemType } from "utils/types/tenant";
import { DistributorItemType } from "utils/types/distributors";
import { IAdminsData, IAdminsCreateFormatter } from "utils/types/admins";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";

import { t } from "services/Translation";
import { request } from "services/api";

type IChooseLevel =
  | { [distributors: string]: DistributorItemType[] }
  | { [resellers: string]: ResellerItemType[] }
  | { [tenants: string]: TenantItemType[] };

class AdminsStorage {
  admins: IAdminsData[] = [];
  currentEntity: Array<{ label: string; value: string }> = [];
  liveSearch: string = "";
  currentLevel: "distributors" | "tenants" | "resellers" = "distributors";
  isCurrentAdminLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      admins: observable,
      currentEntity: observable,
      liveSearch: observable,
      isCurrentAdminLoading: observable,
      getAdmins: action,
      createAdminsTenantLevel: action,
      createAdminsResellerLevel: action,
      createAdminsDistributorLevel: action,
      clearStorage: action,
      clearSearch: action,
    });
  }

  // get all admins in level (doc don't ready)
  getAdmins = () => {
    request({
      route: `${configStore.config.draasInstance}/users`,
      loaderName: "@getAdmins",
    })
      .then(({ data: { users } }: AxiosResponse<{ users: IAdminsData[] }>) => {
        const admins = users;
        runInAction(() => {
          this.admins = admins;
        });
      })
      .catch(e => {
        errorNotification(e);
        this.admins = [];
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/03_tenants.html#create-an-administrator-account-for-a-tenant-structure

  createAdminsTenantLevel = (
    payload: IAdminsCreateFormatter,
    callback?: () => void,
  ) => {
    const tenantID = Login.getExactLevelReference("tenant");
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/admins`,
      loaderName: "@createAdminsTenantLevel",
      method: "post",
      payload,
    })
      .then(() => {
        callback && callback();
        this.getAdmins();
        successNotification(t("Admin successfully added"));
      })
      .catch(e => {
        errorNotification(e);
      });
  };
  // https://docs.netaxis.solutions/draas/provisioning/api/02_resellers.html#create-an-administrator-account-for-a-reseller-structure
  createAdminsResellerLevel = (
    payload: IAdminsCreateFormatter,
    callback?: () => void,
  ) => {
    const resellerID = Login.getExactLevelReference("reseller");
    request({
      route: `${configStore.config.draasInstance}/resellers/${resellerID}/admins`,
      loaderName: "@createAdminsResellerLevel",
      method: "post",
      payload,
    })
      .then(() => {
        callback && callback();
        this.getAdmins();
        successNotification(t("Admin successfully added"));
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/01_distributors.html#create-an-administrator-account-for-a-distributor-structure
  createAdminsDistributorLevel = (
    payload: IAdminsCreateFormatter,
    callback?: () => void,
  ) => {
    const distributorID = Login.getExactLevelReference("distributor");
    request({
      route: `${configStore.config.draasInstance}/distributors/${distributorID}/admins`,
      loaderName: "@createAdminsDistributorLevel",
      method: "post",
      payload,
    })
      .then(() => {
        callback && callback();
        this.getAdmins();
        successNotification(t("Admin successfully added"));
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // Wait implement in backend
  createAdminsSystemLevel = (
    payload: IAdminsCreateFormatter,
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/system/admins`,
      loaderName: "@createAdminsSystemLevel",
      method: "post",
      payload,
    })
      .then(() => {
        callback && callback();
        this.getAdmins();
        successNotification(t("Admin successfully added"));
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // get Reseller \ Distributor \ Tenant
  getCurrentEntity = (
    currentSelect: "distributors" | "tenants" | "resellers",
  ) => {
    runInAction(() => {
      this.isCurrentAdminLoading = true;
      this.currentEntity = [];
    });
    request({
      route: `${configStore.config.draasInstance}/${currentSelect}?search=${this.liveSearch}`,
      loaderName: "@getCurrentEntity",
      method: "get",
    })
      .then(({ data }: AxiosResponse<IChooseLevel>) => {
        const currentData = data[currentSelect];
        const formattingCurrentData = currentData.map(el => {
          return { label: el.name, value: el.uuid };
        });
        runInAction(() => {
          this.currentEntity = formattingCurrentData;
          this.isCurrentAdminLoading = false;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.isCurrentAdminLoading = false;
        });
      });
  };

  // Config for live search
  setSearchData = (
    payload: { label: string; value: string },
    currentLevel: "distributors" | "tenants" | "resellers",
  ) => {
    console.log(payload);
    runInAction(() => {
      this.currentLevel = currentLevel;
      this.liveSearch = payload.value;
      this.startSearch();
    });
  };

  // Config for live search
  startSearch = debounce(() => {
    this.getCurrentEntity(this.currentLevel);
  }, 500);

  // clear search
  clearSearch = () => {
    this.liveSearch = "";
  };

  // clear storage
  clearStorage = () => {
    this.admins = [];
    this.currentEntity = [];
  };
}

export default new AdminsStorage();
