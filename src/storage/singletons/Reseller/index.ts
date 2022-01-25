import { makeObservable } from "mobx";

import configStore from "../Config";
import ResellersStore from "../Resellers";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import {
  TCreateResellerPayload,
  TEditResellerPayload,
} from "utils/types/resellers";

class ResellerStore {
  constructor() {
    makeObservable(this, {});
  }

  createReseller = ({
    payload,
    callback,
  }: {
    payload: TCreateResellerPayload;
    callback?: () => void;
  }) => {
    request({
      route: `${configStore.config.draasInstance}/resellers`,
      loaderName: "@createReseller",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Reseller was successfully created!"));
        ResellersStore.getResellersData({});
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  editReseller = ({
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    payload: TEditResellerPayload;
    callback?: () => void;
  }) => {
    const formattedPayload = {
      ...payload,
      markup: markup ? Number(markup) : 0,
    };
    request({
      route: `${configStore.config.draasInstance}/resellers/${uuid}`,
      loaderName: "@editReseller",
      method: "put",
      payload: formattedPayload,
    })
      .then(() => {
        successNotification(t("Reseller was successfully edited!"));
        ResellersStore.getResellersData({});
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new ResellerStore();
