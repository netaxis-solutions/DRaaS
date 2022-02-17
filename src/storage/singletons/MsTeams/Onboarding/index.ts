import { makeObservable, observable, runInAction } from "mobx";
// import { AxiosResponse } from "axios";

import configStore from "../../Config";
import { request } from "services/api";

class MsTeamOnboarding {
  transactionID: number = 0;
  checkOnboardingData: any = [];
  isRunning: boolean = true;

  constructor() {
    makeObservable(this, {
      checkOnboardingData: observable.ref,
      isRunning: observable.ref,
    });
  }

  checkOnboarding = async (tenantID: string, subscriptionID?: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard`,
    })
      .then((data: any) => {
        const isRunning = data?.data.running;
        const checkOnboardingData = data?.data.wizardSteps;

        runInAction(() => {
          this.isRunning = isRunning;
          this.checkOnboardingData = checkOnboardingData;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  startOnboarding = async (tenantID: string, subscriptionID?: string) => {
    await request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard`,
      method: "post",
    }).then((resp: any) => {
      const transactionID = resp.data.id;
      runInAction(() => {
        this.transactionID = transactionID;
      });
    });
  };

  clearStorage = () => {
    this.checkOnboardingData = [];
    this.isRunning = false;
  };
}

export default new MsTeamOnboarding();
