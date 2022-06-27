import { makeObservable, observable, runInAction } from "mobx";
// import { AxiosResponse } from "axios";

import MsTeamsAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import { request } from "services/api";
import Login from "../Login";
import configStore from "../Config";

class CloudConnection {
  isError: boolean = false;

  constructor() {
    makeObservable(this, {
      isError: observable,
    });
  }

  startOperatorConnectionOnboarding = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: any,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@startOperatroConnectionOnboarding",
      method: "post",
      payload,
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        runInAction(() => {
          this.isError = false;
        });
      })
      .catch(e => {
        runInAction(() => {
          this.isError = true;
        });
        console.error(e);
      });
  };

  unlinkOperatorConnection = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@unlinkOperatorConnection",
      method: "delete",
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
      })
      .catch(e => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        console.error(e);
      });
  };

  sendShortCode = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: any,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@sendShortCode",
      method: "put",
      payload,
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        runInAction(() => {
          this.isError = false;
        });
      })
      .catch(e => {
        runInAction(() => {
          this.isError = true;
        });
        console.error(e);
      });
  };

  setError = () => {
    this.isError = false;
  };
}

export default new CloudConnection();
