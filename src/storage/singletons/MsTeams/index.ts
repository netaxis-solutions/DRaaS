import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";
import { t } from "services/Translation";
import { TMsTeamUserType } from "utils/types/msTeam";
import { successNotification } from "utils/functions/notifications";

class MsTeam {
  msTeamUsersList: Array<TMsTeamUserType> = [];

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
        const checkMsTeamUsersList = data.data.users;

        runInAction(() => {
          this.msTeamUsersList = checkMsTeamUsersList;
        });
      })
      .catch(e => {
        console.error(e);
        this.msTeamUsersList = [];
      });
  };

  editMsTeamsUserNumber = async (
    tenantID: string,
    subscriptionID: string,
    msTeamsUID: string,
    phoneNumber: string | null,
    successCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users/${msTeamsUID}`,
      loaderName: "@getMsTeamAdmin",
      method: "put",
      payload: {
        phoneNumber,
      },
    })
      .then(() => {
        runInAction(() => {
          this.getMsTeamUsers(tenantID, subscriptionID);
        });
        successCallback && successCallback();
        successNotification(t("Number successfully changed"));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export default new MsTeam();
