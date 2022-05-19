import { makeObservable, observable, runInAction, action } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../../Config";
import Login from "storage/singletons/Login";

import { request } from "services/api";
import {
  TMsTeamAdmins,
  TMsTeamCheck,
  TMsTeamUserList,
} from "utils/types/msTeam";

class MsTeamAdmin {
  msTeamAdmin: TMsTeamAdmins = { id: null, msUsername: "" };
  checkMsTeamAdmin: TMsTeamCheck | null = null;
  checkMsTeamUsersList: TMsTeamUserList | [] = [];
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      msTeamAdmin: observable.ref,
      checkMsTeamAdmin: observable.ref,
      checkMsTeamUsersList: observable.ref,
      isLoading: observable,
      clearCacheMsTeamAdmin: action,
    });
  }

  getMsTeamAdmin = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
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
        console.error(e);
        this.msTeamAdmin = { id: null, msUsername: "" };
      });
  };

  getMsTeamUsers = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    this.isLoading = true;
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      loaderName: "@getMsTeamUsers",
    })
      .then((data: AxiosResponse<any>) => {
        this.isLoading = false;
        const checkMsTeamUsersList = data?.data;

        runInAction(() => {
          this.checkMsTeamUsersList = checkMsTeamUsersList;
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  getCheckMsTeamAdmin = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/status`,
      loaderName: "@getCheckMsTeamAdmin",
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamAdmin = data.data;

        runInAction(() => {
          this.checkMsTeamAdmin = checkMsTeamAdmin;
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  createMsTeamAdmin = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: any,
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
      this.getCheckMsTeamAdmin(tenantID, subscriptionID);
    } catch (e) {
      console.error(e);
    }
  };

  deleteMsTeamAdmin = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: any,
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

  clearCacheMsTeamAdmin = () => {
    this.msTeamAdmin = { id: null, msUsername: "" };
    this.checkMsTeamAdmin = null;
  };
}

export default new MsTeamAdmin();
