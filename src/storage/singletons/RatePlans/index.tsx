import { makeAutoObservable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";

import { request } from "services/api";

type RatePlan = {
  id: string;
  name: string;
  description: string;
};

type RatePlanDetails = {
  destination: string;
  startDate: string;
  national: {
    setup: number;
    duration: number;
  };
  international: {
    setup: number;
    duration: number;
  };
};

class RatePlans {
  ratePlans: Array<RatePlan> = [];
  currentRatePlan: Array<RatePlanDetails> = [];
  constructor() {
    makeAutoObservable(this);
  }

  //fetching rate plans for rateplans tabs
  getRatePlans = (successCallback?: () => void) => {
    request({
      route: `${configStore.config.draasInstance}/public/rate_plans`,
      loaderName: "@getRatePlans",
    })
      .then((data: AxiosResponse<{ ratePlans: Array<RatePlan> }>) => {
        const ratePlans = data.data.ratePlans;
        runInAction(() => {
          this.ratePlans = ratePlans;
        });
        successCallback && successCallback();
      })
      .catch(() => {
        this.ratePlans = [];
      });
  };

  //fetching detailed data about pricing for exact rate plan
  getSpecificRatePlan = (ratePlanId: string, successCallback?: () => void) => {
    request({
      route: `${configStore.config.draasInstance}/public/rate_plans/${ratePlanId}`,
      loaderName: "@getSpecificRatePlan",
    })
      .then((data: AxiosResponse<{ prices: Array<RatePlanDetails> }>) => {
        const ratePlans = data.data.prices;
        runInAction(() => {
          this.currentRatePlan = ratePlans;
        });
        successCallback && successCallback();
      })
      .catch(() => {
        this.currentRatePlan = [];
      });
  };

  //clearing current rate plan
  clearCurrentRatePlan = () => {
    this.currentRatePlan = [];
  };

  //clearing rate plan store
  clearRatePlansStore = () => {
    this.ratePlans = [];
    this.clearCurrentRatePlan();
  };
}

export default new RatePlans();
