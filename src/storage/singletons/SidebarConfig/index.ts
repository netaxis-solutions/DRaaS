import { action, makeObservable, observable, runInAction } from "mobx";
import configStore from "../Config";
import { request } from "services/api";
import { errorNotification } from "utils/functions/notifications";
import { TAddTenantValues } from "utils/types/tenant";
import { SubscriptionItemType } from "utils/types/subscriptions";

import Tenant from "../Tenant";
import BreadcrumbsStorage from "storage/singletons/Breadcrumbs";

class SidebarConfig {
  chosenCustomerID = "";
  chosenCustomerData: TAddTenantValues | undefined = undefined;
  extraLevelID: string = "";
  extraLevelData: SubscriptionItemType | undefined = undefined;
  isLoading = false;

  setChosenCustomer = async (id: string, extraLevelID?: string) => {
    this.clearChosenCustomer();
    let chosenCustomerData = this.chosenCustomerData;
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
    runInAction(() => {
      this.chosenCustomerID = id;
      this.chosenCustomerData = chosenCustomerData;
      if (extraLevelID) {
        this.extraLevelID = extraLevelID;
      } else {
        this.extraLevelID = "";
      }
    });
    BreadcrumbsStorage.setCustomerLevel([
      this.chosenCustomerData,
      this.extraLevelID,
    ]);
    if (this.extraLevelID) {
      this.getSpecificTenantSubscription(
        this.chosenCustomerID,
        this.extraLevelID,
      );
    }
  };

  getSpecificTenantSubscription = async (
    tenantID: string,
    subscriptionID: string,
  ): Promise<any | undefined> => {
    const result = await request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}`,
      loaderName: "@getSpecificTenantSubscription",
    }).catch(e => {
      errorNotification(e);
    });
    runInAction(() => {
      this.extraLevelData = result?.data;
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
