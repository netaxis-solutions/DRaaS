import { makeObservable } from "mobx";

import { request } from "services/api";
import { TCreateDistributor } from "utils/types/distributor";
import configStore from "../Config";
import DistributorsStore from "../Distributors";

class DistributorStore {
  constructor() {
    makeObservable(this, {});
  }

  createDistributor = async ({ payload, callback }: TCreateDistributor) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/distributors`,
        loaderName: "@createDistributor",
        method: "post",
        payload,
      });
      DistributorsStore.getDistributorsData();
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new DistributorStore();
