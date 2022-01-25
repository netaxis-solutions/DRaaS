import { makeObservable } from "mobx";

import configStore from "../Config";
import DistributorsStore from "../Distributors";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import { TCreateDistributor } from "utils/types/distributor";
import { TEditDistributorPayload } from "utils/types/distributors";

class DistributorStore {
  constructor() {
    makeObservable(this, {});
  }

  createDistributor = ({ payload, callback }: TCreateDistributor) => {
    request({
      route: `${configStore.config.draasInstance}/distributors`,
      loaderName: "@createDistributor",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Distributor was successfully created!"));
        DistributorsStore.getDistributorsData();
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  editDistributor = ({
    payload: { uuid, markup, ...payload },
    callback,
  }: {
    payload: TEditDistributorPayload;
    callback?: () => void;
  }) => {
    const payloadWidthMarkup = markup
      ? { ...payload, markup: Number(markup) }
      : { ...payload, markup: 0 };

    request({
      route: `${configStore.config.draasInstance}/distributors/${uuid}`,
      loaderName: "@editDistributor",
      method: "put",
      payload: payloadWidthMarkup,
    })
      .then(() => {
        successNotification(t("Distributor was successfully edited!"));
        DistributorsStore.getDistributorsData();
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new DistributorStore();
