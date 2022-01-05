export type SubscriptionLicensesItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type MsTeamsUsersType = {
  assigned: number;
  inUse: number;
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
  msteams_users: MsTeamsUsersType;
  siptrunk_channels: SipTrunkChannels;
};

export type EditLicensesPayload = {
  assigned: string;
};
