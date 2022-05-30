import { action, makeObservable, observable, runInAction } from "mobx";
import configStore from "../Config";
import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";
import { TAddTenantValues } from "utils/types/tenant";

import Tenant from "../Tenant";
import BreadcrumbsStorage from "storage/singletons/Breadcrumbs";
import Login from "../Login";

type SpecificSubscription = {
  id: number;
  name: string;
  billingId: string;
  licenses: {
    msTeamsUsers: number;
    sipTrunkChannels: number;
  };
  suspensionProfileId?: string;
};

class SidebarConfig {
  chosenCustomerID = "";
  chosenCustomerData: TAddTenantValues | undefined = undefined;
  extraLevelID: string = "";
  extraLevelData: SpecificSubscription | undefined = undefined;
  isLoading = false;

  setChosenCustomer = async (
    id: string = Login.getExactLevelReference("tenant"),
    extraLevelID?: string,
  ) => {
    this.clearChosenCustomer();
    let chosenCustomerData = this.chosenCustomerData;
    BreadcrumbsStorage.setIsLoading();

    if (this.chosenCustomerID !== id) {
      runInAction(() => {
        this.isLoading = true;
      });
      chosenCustomerData = await Tenant.getSpecificTenant({
        tenantID: id,
      });
      runInAction(() => {
        this.isLoading = false;
      });
    }

    if (extraLevelID) {
      runInAction(() => {
        this.extraLevelID = extraLevelID;
        this.isLoading = true;
      });
      await this.getSpecificTenantSubscription(id, extraLevelID);
      runInAction(() => {
        this.isLoading = false;
      });
    } else {
      this.extraLevelID = "";
    }

    runInAction(() => {
      this.chosenCustomerID = id;
      this.chosenCustomerData = chosenCustomerData;
    });

    BreadcrumbsStorage.setCustomerLevel([
      {
        uuid: chosenCustomerData?.uuid || "",
        name: chosenCustomerData?.name || "",
      },
      {
        uuid: this.extraLevelID || "",
        name: this.extraLevelData?.name || "",
      },
    ]);
  };

  getSpecificTenantSubscription = async (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ): Promise<any | undefined> => {
    return request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}`,
      loaderName: "@getSpecificTenantSubscription",
    })
      .then(({ data }) => {
        runInAction(() => {
          this.extraLevelData = data;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  setExtraLevelID = (extraLevelID: string) => {
    this.extraLevelID = extraLevelID;
  };

  clearChosenCustomer = () => {
    runInAction(() => {
      this.chosenCustomerID = "";
      this.chosenCustomerData = undefined;
      this.extraLevelID = "";
      this.extraLevelData = undefined;
    });
  };

  constructor() {
    makeObservable(this, {
      chosenCustomerID: observable,
      chosenCustomerData: observable,
      extraLevelID: observable,
      isLoading: observable,
      extraLevelData: observable,
      setChosenCustomer: action,
      clearChosenCustomer: action,
      setExtraLevelID: action,
    });
  }
}

export default new SidebarConfig();
