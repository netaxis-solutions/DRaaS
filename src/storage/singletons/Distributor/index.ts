import { makeObservable } from "mobx";

import { request } from "services/api";
import {
  TCreateDistributor,
  TDeleteDistributor,
} from "utils/types/distributor";
import { TEditDistributorPayload } from "utils/types/distributors";
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

  editDistributor = async ({
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    payload: TEditDistributorPayload;
    callback?: () => void;
  }) => {
    try {
      const payloadWidthMarkup = markup
        ? { ...payload, markup: Number(markup) }
        : { ...payload, markup: 0 };

      await request({
        route: `${configStore.config.draasInstance}/distributors/${uuid}`,
        loaderName: "@editDistributor",
        method: "put",
        payload: payloadWidthMarkup,
      });
      DistributorsStore.getDistributorsData();
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new DistributorStore();
