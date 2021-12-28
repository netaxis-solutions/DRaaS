export type SubscriptionItemType = {
  uuid: string;
  name: string;
  [key: string]: string | number;
};

export type SubscriptionsDataType = {
  subscriptions: Array<SubscriptionItemType>;
  page: number;
  pages: number;
  results: number;
};

export type TCreateSubscriptionPayload = {
  name: string;
  billingId: string;
};

export type AddSubscriptionFormPropsType = {
  handleCancel: () => void;
};
