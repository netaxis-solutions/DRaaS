import { makeAutoObservable, runInAction } from "mobx";
import Tenant from "../Tenant";
import {
  TCustomerLevelPayload,
  TCustomerLevelBreadcrumbs,
} from "utils/types/components/breadcrumbs";

class BreadcrumbsStorage {
  customerLevels: TCustomerLevelBreadcrumbs = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setCustomerLevel = async (payload: TCustomerLevelPayload) => {
    this.cleanBreadcrambsStorage();
    this.isLoading = true;

    const subscription = await Tenant.getSpecificTenantSubscription(
      payload[0].uuid,
      payload[1],
    );

    const result = payload.reduce(
      (
        currentCustomers: TCustomerLevelBreadcrumbs | undefined,
        currentCustomer: any,
      ) => {
        currentCustomers &&
          (currentCustomers = [
            ...currentCustomers,
            {
              name: currentCustomer.name || subscription?.name || "",
              link: currentCustomer.uuid || subscription?.name || "",
              disabled: currentCustomer.uuid ? false : true,
            },
          ]);

        return currentCustomers;
      },
      [],
    );

    runInAction(() => {
      if (result) {
        this.customerLevels = result;
      }
      this.isLoading = false;
    });
  };

  setIsLoading = () => {
    this.isLoading = true;
  };

  cleanBreadcrambsStorage = () => {
    this.customerLevels = [];
  };
}

export default new BreadcrumbsStorage();
