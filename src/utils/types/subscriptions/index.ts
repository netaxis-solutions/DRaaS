import { TDeleteModalProps } from "../modal";

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

export type TDeleteSubscriptionsModalProps = TDeleteModalProps & {
  subscriptions: Array<SubscriptionItemType>;
};

export type SpecificSubscription = {
  id: number;
  name: string;
  billingId: string;
  licenses: {
    msTeamsUsers: number;
    sipTrunkChannels: number;
  };
  suspensionProfileId?: string;
  msteamsAdmin?: {
    msUsername: string;
    status: string;
  };
  msteamsTenant?: {
    id: string;
    mode: string;
  };
  numberOfUsers: number;
  numberOfTrunkgroups: number;
  phoneNumbers: {
    total: number;
    free?: number;
    linkedToUsers?: number;
    linkedToTrunkgroups?: number;
    linkedToOperatorConnect?: number;
  };
  isDeletable: boolean;
};
