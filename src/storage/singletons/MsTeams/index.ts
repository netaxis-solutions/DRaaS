import { makeObservable, observable, runInAction, toJS } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import Login from "../Login";
import TableInfiniteScroll from "../TableInfiniteScroll";
import TablePagination from "../TablePagination";

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

  getMsTeamUsers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,

    successCallback?: () => void,
  ) => {
    const params = TablePagination.search
      ? {
          page_size: 24,
          search: TablePagination.search,
        }
      : { page_size: 24 };

    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      loaderName: "@getMsTeamUsers",
      payload: {
        params,
      },
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamUsersList = data.data.users;

        runInAction(() => {
          this.msTeamUsersList = checkMsTeamUsersList;
        });
        successCallback && successCallback();
        TableInfiniteScroll.setNewToken(data.data.next);
      })
      .catch(e => {
        console.error(e);
        this.msTeamUsersList = [];
      });
  };

  getMoreMsTeamUsers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    token: string,
    setNewToken: (newToken: string) => void,
  ) => {
    const params = TablePagination.search
      ? {
          page_size: 24,
          next: token,
          search: TablePagination.search,
        }
      : {
          page_size: 24,
          next: token,
        };

    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/users`,
      payload: {
        params,
      },
    })
      .then((data: AxiosResponse<any>) => {
        const checkMsTeamUsersList = data.data.users;

        runInAction(() => {
          this.msTeamUsersList = toJS(this.msTeamUsersList).concat(
            checkMsTeamUsersList,
          );
        });

        setNewToken(data.data.next);
      })
      .catch(e => {
        console.error(e);
        this.msTeamUsersList = [];
      });
  };

  editMsTeamsUserNumber = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
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
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    msTeamsUID: string,
    finalCallback?: () => void,
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
        finalCallback && finalCallback();
      });
  };
}

export default new MsTeam();
