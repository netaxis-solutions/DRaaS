import { makeAutoObservable, runInAction } from "mobx";
import Tenant from "../Tenant";

class BreadcrumbsStorage {
  customerLevels: any = [];

  constructor() {
    makeAutoObservable(this, {});
  }

  setCustomerLevel = async (payload: Array<any>) => {
    this.cleanBreadcrambsStorage();

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
    });
  };

  cleanBreadcrambsStorage = () => {
    this.customerLevels = [];
  };
}

export default new BreadcrumbsStorage();
