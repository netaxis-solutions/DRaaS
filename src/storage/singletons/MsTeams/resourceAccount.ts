import { makeObservable, observable, runInAction, action } from "mobx";
import { AxiosResponse } from "axios";

import configStore from "../Config";
import {
  TResourceAccountData,
  TCountryCode,
  TModifyResourceAccount,
  TCountryCodes,
  TCreateResourceAccountPayloadStorage,
} from "utils/types/resourceAccount";
import {
  deleteNotification,
  successNotification,
  errorNotification,
} from "utils/functions/notifications";
import Numbers from "../Numbers";
import { request } from "services/api";
import { t } from "services/Translation";

class ResourceAccount {
  resourceAccountsData: TResourceAccountData[] = [];
  countryCode: TCountryCode[] = [];
  isLoading: boolean = false;

  constructor() {
    makeObservable(this, {
      resourceAccountsData: observable.ref,
      countryCode: observable.ref,

      getCompleteMsTeamResourceAccounts: action,
      modifyMsTeamsResourceAccount: action,
      createMsTeamsResourceAccount: action,
      getCountryCode: action,
    });
  }
  // https://docs.netaxis.solutions/draas/provisioning/api/95_msteams.html#get-the-complete-ms-teams-resource-accounts-list
  // Get data for table in MSTeam -> Resource Account Tab

  getCompleteMsTeamResourceAccounts = (
    tenantID: string,
    subscriptionID: string,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/resource_accounts`,
      loaderName: "@getMsTeamResourceAccount",
    })
      .then(({ data }: AxiosResponse<any>) => {
        const resourceAccounts = data.resourceAccounts;
        runInAction(() => {
          this.resourceAccountsData = resourceAccounts;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/95_msteams.html#modify-a-ms-teams-resource-account
  // Modify Resource account in MsTeams Recource Account table
  modifyMsTeamsResourceAccount = (
    tenantID: string,
    subscriptionID: string,
    resourceAccountID: string,
    payload: TModifyResourceAccount,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/resource_accounts/${resourceAccountID}`,
      loaderName: "@modifyMsTeamResourceAccount",
      method: "put",
      payload,
    })
      .then(() => {
        successNotification(t("Resource Account successfully updated!"));
        this.getCompleteMsTeamResourceAccounts(tenantID, subscriptionID);
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/95_msteams.html#create-a-ms-teams-resource-account
  // Create new Resource Account. MsTeams -> Resource Account
  createMsTeamsResourceAccount = (
    tenantID: string,
    subscriptionID: string,
    payload: TCreateResourceAccountPayloadStorage,
    successCallback?: () => void,
  ) => {
    runInAction(() => {
      this.isLoading = true;
    });
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/resource_accounts`,
      loaderName: "@createMsTeamResourceAccount",
      method: "post",
      payload,
    })
      .then(() => {
        successNotification(t("Resource Account successfully added!"));
        successCallback && successCallback();
        this.getCompleteMsTeamResourceAccounts(tenantID, subscriptionID);
        Numbers.getFreeNumbers(tenantID, subscriptionID);
        runInAction(() => {
          this.isLoading = false;
        });
      })
      .catch(e => {
        errorNotification(e);
        runInAction(() => {
          this.isLoading = false;
        });
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/97_public_data.html#get-the-list-of-country-codes
  // Get Country Codes for Flags in Entitlements , MSTeams
  getCountryCode = () => {
    request({
      route: `${configStore.config.draasInstance}/public/country_codes`,
      loaderName: "@getCountryCode",
    })
      .then(({ data }: AxiosResponse<TCountryCodes>) => {
        const formatData = data.countryCodes
          .filter(el => el.isoCode)
          .map(el => ({ label: el.name, value: el.isoCode }));
        runInAction(() => {
          this.countryCode = formatData;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  // https://docs.netaxis.solutions/draas/provisioning/api/95_msteams.html#delete-an-existing-ms-teams-resource-account
  // Delete Resource Account in MsTeams -> Resource Account table
  deleteResourceAccount = (
    tenantID: string,
    subscriptionID: string,
    resourceAccountId: string,
    callback?: () => void,
  ) => {
    request({
      route: `${configStore.config.draasInstance}/tenants/${tenantID}/subscriptions/${subscriptionID}/msteams/resource_accounts/${resourceAccountId}`,
      loaderName: "@deleteResourceAccount",
      method: "delete",
    })
      .then(() => {
        deleteNotification(t("Resource Account successfully deleted!"));
        this.getCompleteMsTeamResourceAccounts(tenantID, subscriptionID);
        callback && callback();
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new ResourceAccount();
