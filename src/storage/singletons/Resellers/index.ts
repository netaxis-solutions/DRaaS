import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

import Login from "../Login";
import configStore from "../Config";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  ResellerItemType,
  ResellersDataType,
  TGetResellersList,
} from "utils/types/resellers";
import {
  deleteNotification,
  errorNotification,
} from "utils/functions/notifications";

class ResellersStore {
  resellers: Array<ResellerItemType> = [];

  constructor() {
    makeAutoObservable(this, {
      resellers: observable.ref,
    });
  }

  getResellersData = async ({ id }: TGetResellersList) => {
    const route = id
      ? `${configStore.config.draasInstance}/resellers?distributor_id=${id}`
      : `${configStore.config.draasInstance}/resellers`;
    try {
      const data: AxiosResponse<ResellersDataType> = await request({
        route,
        loaderName: "@getResellersData",
      });
      const resellers = data.data.resellers;

      runInAction(() => {
        this.resellers = resellers;
      });
    } catch (e) {
      errorNotification(e);
      runInAction(() => {
        this.resellers = [];
      });
    }
  };

  deleteResellers = async (
    selectedResellerIds: string[],
    callback?: () => void,
  ) => {
    Promise.all(
      selectedResellerIds.map(uuid =>
        request({
          route: `${configStore.config.draasInstance}/resellers/${uuid}`,
          loaderName: "@deleteResellers",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Resellers were successfully deleted!"));
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  get resellerRights() {
    return Login.userRights.filter((el: any) => el.name.includes("resellers"));
  }

  get isResellersCreatable() {
    return this.resellerRights.find((el: any) => el.name === "resellers.create")
      ?.allowed;
  }

  get isResellersEditable() {
    return this.resellerRights.find(
      (el: any) => el.name === "resellers.instance.edit",
    )?.allowed;
  }

  get isResellersDeletable() {
    return this.resellerRights.find(
      (el: any) => el.name === "resellers.instance.delete",
    )?.allowed;
  }
}

export default new ResellersStore();
