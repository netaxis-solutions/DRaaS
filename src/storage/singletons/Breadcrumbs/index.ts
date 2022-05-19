import { makeAutoObservable, runInAction } from "mobx";
import {
  TCustomerLevelPayload,
  TCustomerLevelBreadcrumbs,
} from "utils/types/components/breadcrumbs";
import SidebarConfig from "../SidebarConfig";

class BreadcrumbsStorage {
  customerLevels: TCustomerLevelBreadcrumbs = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setCustomerLevel = async (payload: TCustomerLevelPayload) => {
    this.cleanBreadcrambsStorage();
    this.isLoading = true;

    const subscription = SidebarConfig.chosenCustomerData;

    const formatterBreadcrumbsRoute = payload.map(el => {
      if (typeof el == "string") {
        return { name: "", uuid: "" };
      } else return { name: el.name, uuid: el.uuid };
    });

    const result = formatterBreadcrumbsRoute.reduce(
      (
        currentCustomers: TCustomerLevelBreadcrumbs | undefined,
        currentCustomer: { name: string; uuid: string },
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
