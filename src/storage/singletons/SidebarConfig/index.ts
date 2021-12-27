import { action, makeObservable, observable, runInAction } from "mobx";
import { TAddTenantValues } from "utils/types/tenant";
import Tenant from "../Tenant";

class SidebarConfig {
  chosenCustomerID = "";
  chosenCustomerData: TAddTenantValues | undefined = undefined;

  setChosenCustomer = async (id: string) => {
    const chosenCustomerData = await Tenant.getSpecificTenant({
      tenantID: id,
    });
    runInAction(() => {
      this.chosenCustomerID = id;
      this.chosenCustomerData = chosenCustomerData;
    });
  };

  clearChosenCustomer = () => {
    runInAction(() => {
      this.chosenCustomerID = "";
      this.chosenCustomerData = undefined;
    });
  };

  constructor() {
    makeObservable(this, {
      chosenCustomerID: observable,
      chosenCustomerData: observable,
      setChosenCustomer: action,
      clearChosenCustomer: action,
    });
  }
}

export default new SidebarConfig();
