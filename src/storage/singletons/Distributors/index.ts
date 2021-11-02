import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import PendingQueries from "../PendingQueries";
import configStore from "../Config";

type TDistributorItem = {
  [key: string]: string | number;
};

type TDistributorsData = {
  distributors: Array<TDistributorItem>;
  page: number;
  pages: number;
  results: number;
};

class DistributorsStore {
  distributors: Array<TDistributorItem> = [];

  constructor() {
    makeObservable(this, {
      distributors: observable.ref,
    });
  }

  getDistributorsData = async () => {
    const queryId = PendingQueries.add('@getDistributorsData', null);

    try {
      const data: AxiosResponse<TDistributorsData> = await request({
        route: `${configStore.config.draasInstance}/distributors`
      });
      const distributors = data.data.distributors;
      console.log(distributors, 'distributors');

      runInAction(() => {
        this.distributors = distributors;
      });
    } catch (e) {
      console.log(e, 'e');
    } finally {
      runInAction(() => {
        PendingQueries.remove('@getDistributorsData', queryId);
      });
    }
  };
}

export default new DistributorsStore();
