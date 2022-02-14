import { makeObservable, observable, runInAction } from "mobx";
// import { AxiosResponse } from "axios";

import configStore from "../../Config";
import { request } from "services/api";

class MsTeamOnboarding {
  checkOnboardingData: any = [];

  constructor() {
    makeObservable(this, {
      checkOnboardingData: observable.ref,
    });
  }

  checkOnboarding = async (tenantID: string, subscriptionID?: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard_check`,
    })
      .then((data: any) => {
        const checkOnboardingData = data?.data;

        runInAction(() => {
          this.checkOnboardingData = checkOnboardingData;
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  startOnboarding = async (tenantID: string, subscriptionID?: string) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard`,
        method: "post",
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export default new MsTeamOnboarding();
