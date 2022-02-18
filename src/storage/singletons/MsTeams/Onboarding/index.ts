import { makeObservable, observable, runInAction } from "mobx";

import configStore from "../../Config";
import { request } from "services/api";
import { t } from "services/Translation";
import { successNotification } from "utils/functions/notifications";

class MsTeamOnboarding {
  transactionID: number = 0;
  checkOnboardingData: any = [];
  isRunning: boolean = true;
  isError: boolean = false;
  msTeamInterval: number = 17000;

  constructor() {
    makeObservable(this, {
      checkOnboardingData: observable.ref,
      isRunning: observable.ref,
      isError: observable.ref,
      msTeamInterval: observable.ref,
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
          this.isError = false;
          this.isRunning = isRunning;
          this.checkOnboardingData = checkOnboardingData;
          this.msTeamInterval = configStore.config.msTeamInterval;

          if (!isRunning) {
            successNotification(t("MS Teams was linked to the platform"));
          }
        });
      })
      .catch(e => {
        this.isError = true;
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
