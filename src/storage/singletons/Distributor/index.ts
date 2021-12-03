import { makeObservable } from "mobx";

import { request } from "services/api";
import {
  TCreateDistributor,
  TDeleteDistributor,
} from "utils/types/distributor";
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

  deleteDistributor = async ({ uuid, callback }: TDeleteDistributor) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/distributors/${uuid}`,
        loaderName: "@deleteDistributor",
        method: "delete",
      });
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new DistributorStore();
