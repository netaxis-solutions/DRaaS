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
  SpecificResellerType,
  TCreateResellerPayload,
  TEditResellerPayload,
  TOwners,
} from "utils/types/resellers";

class ResellerStore {
  owners: Array<TOwners> = [];
  specificReseller?: SpecificResellerType;

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
      (
        owners: Array<{ label: string; value: string }>,
        currentOwner: TOwners,
      ) =>
        currentOwner.name
          ? [...owners, { label: currentOwner.name, value: currentOwner.uuid }]
          : owners,
      [],
    );
    return filteredData;
  }

  editReseller = ({
    resellerId,
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    resellerId: string;
    payload: Partial<TEditResellerPayload>;
    callback?: () => void;
  }) => {
    const formattedPayload = {
      ...payload,
      markup: markup ? Number(markup) : 0,
    };
    request({
      route: `${configStore.config.draasInstance}/resellers/${resellerId}`,
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

  getSpecificReseller = (resellerId: string, successCallback?: () => void) => {
    request({
      route: `${configStore.config.draasInstance}/resellers/${resellerId}`,
      loaderName: "@getSpecificReseller",
    }).then(({ data }: AxiosResponse<SpecificResellerType>) => {
      runInAction(() => {
        this.specificReseller = data;
      });
      successCallback && successCallback();
    });
  };
}

export default new ResellerStore();
