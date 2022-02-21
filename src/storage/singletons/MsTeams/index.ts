import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";

class MsTeam {
  msTeamUsersList: any = [];

  constructor() {
    makeObservable(this, {
      msTeamUsersList: observable.ref,
    });
  }

  getMsTeamUsers = async (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      loaderName: "@getMsTeamAdmin",
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamUsersList = data.data;

        runInAction(() => {
          this.msTeamUsersList = checkMsTeamUsersList;
        });
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export default new MsTeam();
