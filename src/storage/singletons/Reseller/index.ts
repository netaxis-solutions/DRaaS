import { makeAutoObservable, observable, runInAction } from "mobx";
import { AxiosResponse } from "axios";

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
  owners: Array<{ id: number; name: string; uuid: string; type: string }> = [];

  constructor() {
    makeAutoObservable(this, {
      owners: observable.ref,
    });
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

  getListOwnersResellers = async () => {
    try {
      const data: AxiosResponse<any> = await request({
        route: `${configStore.config.draasInstance}/public/owners?level=reseller`,
        loaderName: "@getListOwners",
      });
      const owners = data.data.owners;
      runInAction(() => {
        this.owners = owners;
      });
    } catch (e) {
      console.error(e);
    }
  };

  get resellerOwners() {
    const filteredData = this.owners.reduce(
      (prev: any, cur: any) =>
        cur.name ? [...prev, { label: cur.name, value: cur.uuid }] : prev,
      [],
    );
    return filteredData;
  }

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
