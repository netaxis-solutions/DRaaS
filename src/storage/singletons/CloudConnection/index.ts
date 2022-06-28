import { action, makeObservable, observable, runInAction } from "mobx";
// import { AxiosResponse } from "axios";

import MsTeamsAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import { request } from "services/api";
import Login from "../Login";
import configStore from "../Config";

class CloudConnection {
  isError: boolean = false;
  uncorrectInputData: string = "";

  constructor() {
    makeObservable(this, {
      isError: observable,
      uncorrectInputData: observable,

      startOperatorConnectionOnboarding: action,
      unlinkOperatorConnection: action,
      sendShortCode: action,
      setUncorrectInputData: action,
      setError: action,
    });
  }

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#starting-the-onboarding-process
  // Start onboarding proccess and send Email \ Company \ Tenant
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

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#unlinking-an-operator-connect-consent
  // Unlink user from MSteams
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

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#sending-the-onboarding-confirmation-code
  // Send short code from user email
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

  // Save input data for error page
  setUncorrectInputData = (payload: string) => {
    this.uncorrectInputData = payload;
  };

  // Option for open error page
  setError = () => {
    this.isError = false;
  };
}

export default new CloudConnection();
