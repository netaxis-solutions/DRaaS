export type SubscriptionLicensesItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type MsTeamsUsers = {
  assigned: number;
  inUse: number;
};

export type SipTrunkChannels = {
  assigned: number;
};

export type SubscriptionLicenseType = {
  msteams_users: MsTeamsUsers;
  siptrunk_channels: SipTrunkChannels;
};

export type EditLicensesPayload = {
  assigned: string;
};
