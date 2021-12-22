import { makeObservable } from "mobx";

import { request } from "services/api";
import {
  TCreateResellerPayload,
  TEditResellerPayload,
} from "utils/types/resellers";
import configStore from "../Config";
import ResellersStore from "../Resellers";

class ResellerStore {
  constructor() {
    makeObservable(this, {});
  }

  createReseller = async ({
    payload,
    callback,
  }: {
    payload: TCreateResellerPayload;
    callback?: () => void;
  }) => {
    try {
      await request({
        route: `${configStore.config.draasInstance}/resellers`,
        loaderName: "@createReseller",
        method: "post",
        payload,
      });
      ResellersStore.getResellersData({});
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };

  editReseller = async ({
    payload: { uuid, ...payload },
    callback,
  }: {
    payload: TEditResellerPayload;
    callback?: () => void;
  }) => {
    try {
      const formattedPayload = {
        ...payload,
        markup: payload.markup ? Number(payload.markup) : 0,
      };
      await request({
        route: `${configStore.config.draasInstance}/resellers/${uuid}`,
        loaderName: "@editReseller",
        method: "put",
        payload: formattedPayload,
      });
      ResellersStore.getResellersData({});
      callback && callback();
    } catch (e) {
      console.log(e, "e");
    }
  };
}

export default new ResellerStore();
