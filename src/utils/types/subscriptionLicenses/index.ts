export type SubscriptionLicensesItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type SubscriptionInLicenses = {
  id: number;
  name: string;
};

export type DetailsLicensesType = {
  id: number;
  quantity: number;
  subscription?: SubscriptionInLicenses;
  type: string;
};

export type CountLicensesType = {
  channels: {};
  teams: {};
};

export type TableWithExpanded = {
  type: string;
  subRows: DetailsLicensesType[];
};

export type SubscriptionLicensesType = {
  count: CountLicensesType[];
  details: DetailsLicensesType[];
};
