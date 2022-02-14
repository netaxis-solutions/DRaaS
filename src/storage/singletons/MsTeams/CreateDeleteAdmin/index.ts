import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../../Config";
import { request } from "services/api";

class MsTeamAdmin {
  msTeamAdmin: any = {};
  checkMsTeamAdmin: any = {};
  checkMsTeamUsersList: any = [];
  isLoading: any = false;

  constructor() {
    makeObservable(this, {
      msTeamAdmin: observable.ref,
      checkMsTeamAdmin: observable.ref,
      checkMsTeamUsersList: observable.ref,
      isLoading: observable,
    });
  }

  getMsTeamAdmin = async (tenantID: string, subscriptionID?: string) => {
    this.isLoading = true;
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/admins`,
      loaderName: "@getMsTeamAdmin",
    })
      .then((data: AxiosResponse<any>) => {
        this.isLoading = false;
        const msTeamAdmin = data?.data;

        runInAction(() => {
          this.msTeamAdmin = msTeamAdmin;
        });
      })
      .catch(e => {
        console.log(e);
        this.msTeamAdmin = {};
      });
  };

  getMsTeamUsers = async (tenantID: string, subscriptionID?: string) => {
    this.isLoading = true;
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      loaderName: "@getMsTeamAdmin",
    })
      .then((data: AxiosResponse<any>) => {
        this.isLoading = false;
        const checkMsTeamUsersList = data?.data;

        runInAction(() => {
          this.checkMsTeamUsersList = checkMsTeamUsersList;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getCheckMsTeamAdmin = async (tenantID: string, subscriptionID?: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/check`,
      loaderName: "@getMsTeamAdmin",
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamAdmin = data?.data;

        runInAction(() => {
          this.checkMsTeamAdmin = checkMsTeamAdmin;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  createMsTeamAdmin = async (
    tenantID: string,
    subscriptionID?: string,
    payload?: any,
  ) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/admins`,
        loaderName: "@getMsTeamAdmin",
        method: "post",
        payload: {
          msUsername: payload?.msUsername,
          msPassword: payload?.msPassword,
        },
      });
      this.getMsTeamAdmin(tenantID, subscriptionID);
    } catch (e) {
      console.error(e);
    }
  };

  deleteMsTeamAdmin = async (
    tenantID: string,
    subscriptionID?: string,
    payload?: any,
  ) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/admins`,
        loaderName: "@getMsTeamAdmin",
        method: "delete",
        payload: {
          id: payload.id,
          msUsername: payload.msUsername,
        },
      });
      this.getMsTeamAdmin(tenantID, subscriptionID);
    } catch (e) {
      console.error(e);
    }
  };

  clearCashMsTeamAdmin = () => {
    runInAction(() => {
      this.msTeamAdmin = {};
    });
  };
}

export default new MsTeamAdmin();
