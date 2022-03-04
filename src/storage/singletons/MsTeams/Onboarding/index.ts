import { makeObservable, observable, runInAction, reaction } from "mobx";

import configStore from "../../Config";
import CreateDeleteAdmin from "../CreateDeleteAdmin";

import { request } from "services/api";
import { t } from "services/Translation";

import { successNotification } from "utils/functions/notifications";
import { TMsTeamOnboardingSteps } from "utils/types/msTeam";
import { AxiosResponse } from "axios";

const DEFAULT_STEPS_INTERVAL = 10000;


class MsTeamOnboarding {
  transactionID: number = 0;
  checkOnboardingData: Array<TMsTeamOnboardingSteps> = [];
  isRunning: boolean = false;
  isError: boolean = false;
  msTeamInterval: number = 0;
  currentStepTenant: {subscriptionID: string, tenantID: string} | null = null

  constructor() {
    makeObservable(this, {
      checkOnboardingData: observable.ref,
      isRunning: observable.ref,
      isError: observable.ref,
      msTeamInterval: observable.ref,
      transactionID: observable.ref,
      clearOnboardingProgress: true,
      currentStep: true,
      activeStep: true,
    });

    reaction(
      () => this.transactionID,
      transactionID => {
        if (transactionID > 0 ) {
          setTimeout(()=>{
            this.currentStepTenant &&  this.checkOnboarding(this.currentStepTenant.tenantID, this.currentStepTenant.subscriptionID);
            this.currentStepTenant && CreateDeleteAdmin.getCheckMsTeamAdmin(this.currentStepTenant.tenantID, this.currentStepTenant.subscriptionID);
          }, 3000)
        }
      },
    );

    // Must be left in order to work properly
    // @ts-ignore
    let checkingStepsTimer: Timeout = 0;

    reaction(
      () => this.isRunning,
      isRunning => {
        if (isRunning && !this.isError) {
          checkingStepsTimer = setInterval(() => {
            this.currentStepTenant &&
              this.checkOnboarding(
                this.currentStepTenant.tenantID,
                this.currentStepTenant.subscriptionID,
              );
          }, this.msTeamInterval);
        } else {
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

  currentStepTenantData = ( payload : {subscriptionID: string, tenantID: string} )=>{
    runInAction(()=>{
      this.currentStepTenant = payload
    })
  }

  checkOnboarding = async (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard`,
    })
      .then((data: AxiosResponse<any>) => {
        const isRunning = data.data.running;
        const checkOnboardingData = data.data.wizardSteps;
        
        runInAction(() => {
          this.isError = false;
          this.isRunning = isRunning;
          this.checkOnboardingData = checkOnboardingData;
          this.msTeamInterval =
            configStore.config.msTeamInterval || DEFAULT_STEPS_INTERVAL;
        });
        if (!isRunning && this.currentStep > 7) {
          successNotification(t("MS Teams was linked to the platform"));
        }
      })
      .catch(e => {
        this.isError = true;
        console.log(e);
      });
  };

  startOnboarding = (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/wizard`,
      loaderName:"@postStartOnboarding",
      method: "post",
    }).then((data: AxiosResponse<any>) => {
      const transactionID = data.data.id;
      
      runInAction(() => {
        this.transactionID = transactionID;
      });
      setTimeout(()=>{
        this.checkOnboarding(tenantID, subscriptionID)
        CreateDeleteAdmin.getCheckMsTeamAdmin(tenantID, subscriptionID);

      }, 5000)
    });
  };

  cleanUpOnboarding =  (tenantID: string, subscriptionID: string) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/unlink`,
      loaderName:"@unlinkOnboarding",
      method: "post",
    }).then(()=>{
      CreateDeleteAdmin.getCheckMsTeamAdmin(tenantID, subscriptionID)
    })
  };

  clearOnboardingProgress = () => {
    this.checkOnboardingData = [];
    this.isRunning = false;
    this.isError = false;
  };
}

export default new MsTeamOnboarding();
