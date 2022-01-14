export type SubscriptionLicensesItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type LicensesUserType = {
  assigned: number;
  inUse: number | string;
};

export type MsTeamsUsersType = LicensesUserType & {
  name: string;
};

export type LicensesSubmitEditItem = {
  tenantID: string;
  subscriptionID: number;
  payload: MsTeamsUsersType;
};

export type SipTrunkChannels = {
  assigned: number;
};

export type SubscriptionLicenseType = {
  msTeamsUsers: MsTeamsUsersType;
  sipTrunkChannels: SipTrunkChannels;
};

export type EditLicensesPayload = {
  assigned: string;
  name: string;
};
