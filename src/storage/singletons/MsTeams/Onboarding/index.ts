import { makeObservable, observable, runInAction, reaction } from "mobx";

import configStore from "../../Config";
import { request } from "services/api";
import { t } from "services/Translation";
import { successNotification } from "utils/functions/notifications";

const DEFAULT_STEPS_INTERVAL = 10000;
const HARDCODED_ID = "49fed14a-549a-48c4-98dd-14efe6454503";
const HARDCODED_SUBSCRIPTION_ID = "60";

class MsTeamOnboarding {
  transactionID: number = 0;
  checkOnboardingData: any = [];
  isRunning: boolean = false;
  isError: boolean = false;
  msTeamInterval: number = 0;

  constructor() {
    makeObservable(this, {
      checkOnboardingData: observable.ref,
      isRunning: observable.ref,
      isError: observable.ref,
      msTeamInterval: observable.ref,
      transactionID: observable.ref,
      clearStorage: true,
      currentStep: true,
      activeStep: true,
    });

    reaction(
      () => this.transactionID,
      transactionID => {
        if (transactionID > 0) {
          console.log("Initial checkOnBoarding");
          this.checkOnboarding(HARDCODED_ID, HARDCODED_SUBSCRIPTION_ID);
        }
      },
    );

    // @ts-ignore
    let checkingStepsTimer: Timeout = 0;

    reaction(
      () => this.isRunning,
      isRunning => {
        if (isRunning) {
          console.log("Starting interval");
          checkingStepsTimer = setInterval(() => {
            console.log("trulala");

            this.checkOnboarding(HARDCODED_ID, HARDCODED_SUBSCRIPTION_ID);
          }, this.msTeamInterval);
        } else {
          console.log("Stopping interval");
          clearInterval(checkingStepsTimer);
        }
      },
    );
  }

  get currentStep() {
    const { checkOnboardingData } = this;
    for (let i = checkOnboardingData.length; i--; ) {
      if (checkOnboardingData[i].executed) {
        return checkOnboardingData[i].step;
      }
    }
    return 0;
  }

  get activeStep() {
    return this.currentStep + (this.isRunning ? 1 : 5);
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
          this.msTeamInterval =
            configStore.config.msTeamInterval || DEFAULT_STEPS_INTERVAL;
        });
        if (!isRunning) {
          successNotification(t("MS Teams was linked to the platform"));
        }
      })
      .catch(e => {
        this.isError = true;
        console.log(e);
      });
  };

  startOnboarding = (tenantID: string, subscriptionID?: string) => {
    request({
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
