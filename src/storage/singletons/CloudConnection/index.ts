import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { AxiosResponse } from "axios";

import MsTeamsAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import TableInfiniteScroll from "../TableInfiniteScroll";
import TablePagination from "../TablePagination";
import Login from "../Login";
import configStore from "../Config";
import {
  IStartOnboardingProccessData,
  IStartOnboardingProccess,
  IDeleteNumbers,
  IOcNumbers,
  IUsages,
  ICivicAddresses,
  INumberForCrate,
} from "utils/types/operatorConnection";
import {
  errorNotification,
  deleteNotification,
  successNotification,
} from "utils/functions/notifications";
import { NumberRangeArray } from "utils/types/operatorConnection";
import { request } from "services/api";
import { t } from "services/Translation";

class CloudConnection {
  isError: boolean = false;
  uncorrectInputData: string = "";
  numbers: IOcNumbers[] = [];
  freeNumbers: Array<string> = [];
  allowedUsages: IUsages[] = [];
  savedFirstStepsData: { id: string; condition: boolean } = {
    id: "",
    condition: false,
  };
  savedSecondStepsData: { country: string; id: string; code?: string } = {
    country: "",
    id: "",
  };
  civicAddresses: ICivicAddresses[] = [];
  civicError: boolean = false;
  numberRange: NumberRangeArray[] = [];
  checkedLength: number = 0;
  numbersForCreate: INumberForCrate[] = [];

  constructor() {
    makeObservable(this, {
      isError: observable,
      uncorrectInputData: observable,
      numbers: observable,
      freeNumbers: observable,
      allowedUsages: observable,
      savedFirstStepsData: observable,
      civicAddresses: observable,
      civicError: observable,
      savedSecondStepsData: observable,
      numberRange: observable,
      numbersForCreate: observable,
      checkedLength: observable,

      startOperatorConnectionOnboarding: action,
      unlinkOperatorConnection: action,
      sendShortCode: action,
      setUncorrectInputData: action,
      setError: action,
      getOcNumbers: action,
      getOcFreeNumbers: action,
      getAllowUsages: action,
      setFirstStepsData: action,
      getCivicAddresses: action,
      setSecondStepData: action,
      getFreeNumbers: action,
      incrementCheckedLength: action,
      dicrementCheckedLength: action,
    });
  }

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#starting-the-onboarding-process
  // Start onboarding proccess and send Email \ Company \ Tenant
  startOperatorConnectionOnboarding = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: IStartOnboardingProccess,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@startOperatroConnectionOnboarding",
      method: "post",
      payload,
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        runInAction(() => {
          this.isError = false;
        });
      })
      .catch(e => {
        runInAction(() => {
          this.isError = true;
        });
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#unlinking-an-operator-connect-consent
  // Unlink user from MSteams
  unlinkOperatorConnection = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@unlinkOperatorConnection",
      method: "delete",
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
      })
      .catch(e => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#sending-the-onboarding-confirmation-code
  // Send short code from user email
  sendShortCode = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: IStartOnboardingProccessData,
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc`,
      loaderName: "@sendShortCode",
      method: "put",
      payload,
    })
      .then(() => {
        MsTeamsAdminStorage.getCheckMsTeamAdmin(tenantID, subscriptionID);
        runInAction(() => {
          this.isError = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.isError = true;
        });
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-the-list-of-phone-numbers-added-to-an-operator-connect-consent
  // get Numbers for Numbers table
  getOcNumbers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    const params = TablePagination.search
      ? {
          page_size: 24,
          search: TablePagination.search,
        }
      : { page_size: 24 };
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/numbers`,
      loaderName: "@getOcNumbers",
      payload: {
        params,
      },
    })
      .then(
        ({ data }: AxiosResponse<{ numbers: IOcNumbers[]; next: string }>) => {
          runInAction(() => {
            this.numbers = data.numbers;
          });
          TableInfiniteScroll.setNewToken(data.next);
        },
      )
      .catch(e => {
        errorNotification(e);
        this.numbers = [];
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-the-list-of-phone-numbers-added-to-an-operator-connect-consent
  // get Numbers for Numbers table and option for Infinity Scroll
  getMoreOCNumbers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    token: string,
    setNewToken: (newToken: string) => void,
  ) => {
    const params = TablePagination.search
      ? {
          page_size: 24,
          next: token,
          search: TablePagination.search,
        }
      : {
          page_size: 24,
          next: token,
        };
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/numbers`,
      payload: {
        params,
      },
    })
      .then(
        ({ data }: AxiosResponse<{ numbers: IOcNumbers[]; next: string }>) => {
          runInAction(() => {
            this.numbers = toJS(this.numbers).concat(data.numbers);
          });
          setNewToken(data.next);
        },
      )
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.numbers = [];
        });
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-the-list-of-free-phone-numbers-for-an-operator-connect-consent
  // get free numbers for Tabs - Users, Resource Account and Numbers
  getOcFreeNumbers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/free_numbers`,
      loaderName: "@getOcFreeNumbers",
    })
      .then(({ data }: AxiosResponse<{ freeNumbers: Array<string> }>) => {
        runInAction(() => {
          this.freeNumbers = data.freeNumbers;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-operator-connect-civic-addresses
  getCivicAddresses = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    runInAction(() => {
      this.civicError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/civic_addresses`,
      loaderName: "@getCivicAddresses",
    })
      .then(
        ({ data }: AxiosResponse<{ civicAddresses: ICivicAddresses[] }>) => {
          runInAction(() => {
            this.civicAddresses = data.civicAddresses;
            this.civicError = false;
          });
        },
      )
      .catch(() => {
        runInAction(() => {
          this.civicError = true;
        });
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#removing-phone-numbers-from-an-operator-connect-consent
  // Delete phone numbers
  deleteNumbers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payload: IDeleteNumbers[],
  ) => {
    runInAction(() => {
      this.isError = false;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/numbers`,
      loaderName: "@deleteNumbers",
      method: "delete",
      payload: { numbers: payload },
    })
      .then(() => {
        deleteNotification(t("Number(s) and range(s) successfully deleted"));
        this.getOcNumbers(tenantID, subscriptionID);
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-operator-connect-allowed-usages
  getAllowUsages = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/allowed_usages`,
      loaderName: "@getAllowUsages",
    })
      .then(({ data }: AxiosResponse<{ usages: IUsages[] }>) => {
        runInAction(() => {
          this.allowedUsages = data.usages;
        });
      })
      .catch(e => {
        errorNotification(e);
        this.allowedUsages = [];
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#get-operator-connect-allowed-usages
  getFreeNumbers = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/free_numbers?usage=${this.savedFirstStepsData.id}&country=${this.savedSecondStepsData.country}`,
      loaderName: "@getAllFreeNumbersLastStep",
    })
      .then(({ data }: AxiosResponse<{ freeNumbers: string[] }>) => {
        const formattedData = data.freeNumbers.map(
          (el: string, index: number) => {
            return {
              number: el,
              type: index % 5 ? (index % 4 ? "tollfree" : "geo") : "voip",
            };
          },
        );
        runInAction(() => {
          this.numbersForCreate = formattedData;
        });
      })
      .catch(e => {
        errorNotification(e);
        this.allowedUsages = [];
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/94_operator_connect.html#adding-phone-numbers-to-an-operator-connect-consent
  // Add new numbers to table MsTeams -> Numbers tab
  addNumbersOperatorConnect = (
    tenantID: string = Login.getExactLevelReference("tenant"),
    subscriptionID: string,
    payloadData: string[],
    successCallback?: () => void,
  ) => {
    const payload = this.savedSecondStepsData.id
      ? {
          civicAddressId: this.savedSecondStepsData.id,
          usage: this.savedFirstStepsData.id,
          numbers: payloadData,
        }
      : {
          usage: this.savedFirstStepsData.id,
          numbers: payloadData,
        };
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/oc/numbers`,
      loaderName: "@addNumbersOperatorConnect",
      method: "post",
      payload,
    })
      .then(() => {
        this.getOcNumbers(tenantID, subscriptionID);
        successNotification(t("Successfully added numbers range"));
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // Function for save Steps Data , this data will be use in request
  setFirstStepsData = (payload: { id: string; condition: boolean }) => {
    this.savedFirstStepsData = payload;
  };

  // Function for save Steps Data , this data will be use in request
  setSecondStepData = (payload: { country: string; id: string }) => {
    this.savedSecondStepsData = payload;
  };

  // Save input data for error page
  setUncorrectInputData = (payload: string) => {
    this.uncorrectInputData = payload;
  };

  // helper function
  incrementCheckedLength = (payload: number) => {
    this.checkedLength = this.checkedLength + payload;
  };

  // helper function
  dicrementCheckedLength = (payload: number) => {
    this.checkedLength = this.checkedLength - payload;
  };

  // Option for open error page
  setError = () => {
    this.isError = false;
  };

  // Clear Storage
  clearStorage = () => {
    this.isError = false;
    this.checkedLength = 0;
  };
}

export default new CloudConnection();
