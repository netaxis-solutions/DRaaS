import { makeAutoObservable, runInAction } from "mobx";
import {
  BreadcrumbsInfoType,
  TCustomerLevelBreadcrumbs,
} from "utils/types/components/breadcrumbs";

class BreadcrumbsStorage {
  customerLevels: TCustomerLevelBreadcrumbs = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setCustomerLevel = (breadcrumbsInfo: BreadcrumbsInfoType) => {
    this.cleanBreadcrambsStorage();

    const breadcrumbsArray = breadcrumbsInfo.filter(({ name }) => name);

    const result = breadcrumbsArray.reduce(
      (
        currentCustomers: TCustomerLevelBreadcrumbs,
        currentCustomer: { name: string; uuid: string },
        index,
        { length: arrayLength },
      ) => [
        ...currentCustomers,
        {
          name: currentCustomer.name || "",
          link: currentCustomer.uuid || "",
          disabled: arrayLength === index + 1,
        },
      ],
      [],
    );

    runInAction(() => {
      if (result) {
        this.customerLevels = result;
      }
      this.isLoading = false;
    });
  };

  setIsLoading = (isLoading = true) => {
    this.isLoading = isLoading;
  };

  cleanBreadcrambsStorage = () => {
    this.customerLevels = [];
  };
}

export default new BreadcrumbsStorage();
