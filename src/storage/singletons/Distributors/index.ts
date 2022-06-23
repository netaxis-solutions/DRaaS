import { makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { AxiosResponse } from "axios";

import Login from "../Login";
import configStore from "../Config";
import TablePagination from "../TablePagination";
import { t } from "services/Translation";
import { request } from "services/api";
import {
  DistributorItemType,
  DistributorsDataType,
} from "utils/types/distributors";
import {
  deleteNotification,
  errorNotification,
} from "utils/functions/notifications";

class DistributorsStore {
  distributors: Array<DistributorItemType> = [];

  constructor() {
    makeAutoObservable(this, {
      distributors: observable,
    });
  }

  getDistributorsData = (successCallback?: (token: string) => void) => {
    request({
      route: `${configStore.config.draasInstance}/distributors`,
      loaderName: "@getDistributorsData",
      payload: {
        params: {
          page_size: 24,
          search: TablePagination.search,
        },
      },
    })
      .then((data: AxiosResponse<DistributorsDataType>) => {
        const distributors = data.data.distributors;

        runInAction(() => {
          TablePagination.getTableConfig(data?.data);
          this.distributors = distributors;
        });
        successCallback && successCallback(data.data.next);
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.distributors = [];
        });
      });
  };

  getAdditionalDistributorsData = (
    token: string,
    setNewToken: (newToken: string) => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/distributors`,
      payload: {
        params: {
          next: token,
          page_size: 24,
          search: TablePagination.search,
        },
      },
    })
      .then((data: AxiosResponse<DistributorsDataType>) => {
        const distributors = data.data.distributors;
        const newToken = data.data.next;

        runInAction(() => {
          this.distributors = toJS(this.distributors).concat(distributors);
        });
        setNewToken(newToken);
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.distributors = [];
        });
      });
  };

  deleteDistributors = (
    selectedDistributorsIds: string[],
    callback?: () => void,
  ) => {
    Promise.all(
      selectedDistributorsIds.map(uuid =>
        request({
          route: `${configStore.config.draasInstance}/distributors/${uuid}`,
          loaderName: "@deleteDistributors",
          method: "delete",
        }),
      ),
    )
      .then(() => {
        deleteNotification(t("Distributors were successfully deleted!"));
        callback && callback();
      })
      .catch(e => errorNotification(e));
  };

  get distributorsForResellerCreation() {
    return this.distributors.map((el: DistributorItemType) => ({
      label: el.name,
      value: el.name,
    }));
  }

  get distributorRights() {
    return Login.userRights.filter((el: any) =>
      el.name.includes("distributors"),
    );
  }

  get isDistributorsCreatable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.create",
    )?.allowed;
  }

  get isDistributorsEditable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.instance.edit",
    )?.allowed;
  }

  get isDistributorDeletable() {
    return this.distributorRights.find(
      (el: any) => el.name === "distributors.instance.delete",
    )?.allowed;
  }
}

export default new DistributorsStore();
