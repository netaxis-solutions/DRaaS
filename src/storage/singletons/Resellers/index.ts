import { makeObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import { request } from "services/api";
import configStore from "../Config";
import { ResellerItemType, ResellersDataType } from "utils/types/resellers";

class ResellersStore {
  resellers: Array<ResellerItemType> = [];

  constructor() {
    makeObservable(this, {
      resellers: observable.ref,
    });
  }

  getResellersData = async () => {
    try {
      const data: AxiosResponse<ResellersDataType> = await request({
        route: `${configStore.config.draasInstance}/resellers`,
        loaderName: "@getResellersData",
      });
      const resellers = data.data.resellers;

      runInAction(() => {
        this.resellers = resellers;
      });
    } catch (e) {
      console.log(e, "e");
    }
  };

  deleteResellers = async (
    selectedResellerIds: string[],
    callback?: () => void,
  ) => {
    try {
      await Promise.all(
        selectedResellerIds.map(uuid =>
          request({
            route: `${configStore.config.draasInstance}/resellers/${uuid}`,
            loaderName: "@deleteResellers",
            method: "delete",
          }),
        ),
      );
    } catch (e) {
      console.log("e", e);
    } finally {
      callback && callback();
    }
  };
}

export default new ResellersStore();
