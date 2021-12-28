export type SubscriptionLicensesItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type SubscriptionLicensesParams = {
  tenantID: string;
  subscriptionID: string;
};
