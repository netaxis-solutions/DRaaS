import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";
import { t } from "services/Translation";
import { TMsTeamUserType } from "utils/types/msTeam";
import { successNotification } from "utils/functions/notifications";

class MsTeam {
  msTeamUsersList: Array<TMsTeamUserType> = [];
  isChecking: boolean = false;
  constructor() {
    makeObservable(this, {
      msTeamUsersList: observable.ref,
      isChecking: observable.ref,
    });
  }

  getMsTeamUsers = async (
    tenantID: string,
    subscriptionID: string,
    successCallback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      loaderName: "@getMsTeamUsers",
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamUsersList = data.data.users;

        runInAction(() => {
          this.msTeamUsersList = checkMsTeamUsersList;
        });
        successCallback && successCallback();
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
      loaderName: "@getMsTeamNumber",
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

  refreshMSTeamsUserStatus = (
    userId: string,
    newData: "yes" | "no" | "maybe",
  ) => {
    this.msTeamUsersList = this.msTeamUsersList.map(msTeamUser =>
      msTeamUser.msTeams.id === userId
        ? {
            ...msTeamUser,
            msTeams: {
              ...msTeamUser.msTeams,
              voiceEnabled: newData,
            },
          }
        : msTeamUser,
    );
  };

  checkIsMSTeamsUserVoiceEnabled = (
    tenantID: string,
    subscriptionID: string,
    msTeamsUID: string,
  ) => {
    runInAction(() => {
      this.isChecking = true;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users/${msTeamsUID}/check`,
    })
      .then((data: AxiosResponse<{ voiceEnabled: boolean }>) => {
        this.refreshMSTeamsUserStatus(
          msTeamsUID,
          data.data.voiceEnabled ? "yes" : "no",
        );
      })
      .finally(() => {
        runInAction(() => {
          this.isChecking = false;
        });
      });
  };
}

export default new MsTeam();
