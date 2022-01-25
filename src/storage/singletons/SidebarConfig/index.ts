import { action, makeObservable, observable, runInAction } from "mobx";

import Tenant from "../Tenant";
import { TAddTenantValues } from "utils/types/tenant";

class SidebarConfig {
  chosenCustomerID = "";
  chosenCustomerData: TAddTenantValues | undefined = undefined;
  extraLevelID: string = "";
  isLoading = false;

  setChosenCustomer = async (id: string, extraLevelID?: string) => {
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
  };

  setExtraLevelID = (extraLevelID: string) => {
    this.extraLevelID = extraLevelID;
  };

  clearChosenCustomer = () => {
    runInAction(() => {
      this.chosenCustomerID = "";
      this.chosenCustomerData = undefined;
      this.extraLevelID = "";
    });
  };

  constructor() {
    makeObservable(this, {
      chosenCustomerID: observable,
      chosenCustomerData: observable,
      extraLevelID: observable,
      isLoading: observable,
      setChosenCustomer: action,
      clearChosenCustomer: action,
      setExtraLevelID: action,
    });
  }
}

export default new SidebarConfig();
