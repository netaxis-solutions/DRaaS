import { makeAutoObservable, runInAction } from "mobx";
import Tenant from "../Tenant";

class BreadcrumbsStorage {
  customerLevels: any = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setCustomerLevel = async (payload: Array<any>) => {
    this.cleanBreadcrambsStorage();
    this.isLoading = true;

    const subscription = await Tenant.getSpecificTenantSubscription(
      payload[0].uuid,
      payload[1],
    );

    const result = payload.reduce((currentCustomers, currentCustomer) => {
      currentCustomers = [
        ...currentCustomers,
        {
          name: currentCustomer.name || subscription?.name || "",
          link: currentCustomer.uuid || subscription?.name || "",
          disabled: currentCustomer.uuid ? false : true,
        },
      ];
      return currentCustomers;
    }, []);

    runInAction(() => {
      this.customerLevels = result;
      this.isLoading = false;
    });
  };

  setLoader = () => {
    this.isLoading = true;
  };

  cleanBreadcrambsStorage = () => {
    this.customerLevels = [];
  };
}

export default new BreadcrumbsStorage();
